import express from 'express';
import Post from '../models/Post';
import User from '../models/User';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, category, slides, author, content } = req.body;
    // Validation for slides
    let finalSlides = slides;
    if (!Array.isArray(finalSlides) || finalSlides.length === 0) {
      // Fallback: if old 'content' is present, convert to a single text slide
      if (typeof content === 'string' && content.trim()) {
        finalSlides = [{ type: 'text', content: content.trim() }];
      } else {
        return res.status(400).json({ success: false, message: 'Slides are required and must be a non-empty array.' });
      }
    }
    // Validate each slide
    for (const slide of finalSlides) {
      if (!slide.type || !['image', 'text'].includes(slide.type) || typeof slide.content !== 'string') {
        return res.status(400).json({ success: false, message: 'Each slide must have a valid type (image/text) and content.' });
      }
    }
    const post = new Post({ title, category, slides: finalSlides, author });
    await post.save();

    // In-app notification: Add to all users
    const users = await User.find();
    const notificationMsg = `New post by ${author}`;
    for (const user of users) {
      user.notifications = user.notifications || [];
      user.notifications.unshift({ message: notificationMsg, date: new Date() });
      // Keep only the latest 20 notifications
      if (user.notifications.length > 20) user.notifications = user.notifications.slice(0, 20);
      await user.save();
    }

    // Email notification: Send to all users
    // (Configure your SMTP credentials in .env)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: users.map(u => u.email),
      subject: 'New Post on LUMINA',
      text: `A new post was created by ${author} on LUMINA. Check it out on the homepage!`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error('Email notification error:', e);
    }

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('POST /api/posts error:', err); // Log error to terminal
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get all posts or posts by author
router.get('/', async (req, res) => {
  try {
    const { author } = req.query;
    let posts;
    if (author) {
      posts = await Post.find({ author }).sort({ createdAt: -1 });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    await Post.findByIdAndDelete(id);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

export default router; 