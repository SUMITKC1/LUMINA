import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password, name, email, college, year } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username, password, name, email, college, year });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ success: true, token, user: { id: user._id, username: user.username, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Save a post to user's savedPosts
router.post('/savePost', async (req, res) => {
  try {
    const { username, postId } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.savedPosts.includes(postId)) {
      user.savedPosts.push(postId);
      await user.save();
    }
    res.json({ success: true, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Unsave a post from user's savedPosts
router.post('/unsavePost', async (req, res) => {
  try {
    const { username, postId } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
    await user.save();
    res.json({ success: true, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get a user's saved posts (populated)
router.get('/savedPosts/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('savedPosts');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get a user's timeline tasks
router.get('/timelineTasks/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, timelineTasks: user.timelineTasks || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Update a user's timeline tasks
router.post('/timelineTasks', async (req, res) => {
  try {
    const { username, tasks } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.timelineTasks = tasks;
    await user.save();
    res.json({ success: true, timelineTasks: user.timelineTasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get a user's schedule
router.get('/schedule/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, schedule: user.schedule || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Update a user's schedule
router.post('/schedule', async (req, res) => {
  try {
    const { username, schedule } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.schedule = schedule;
    await user.save();
    res.json({ success: true, schedule: user.schedule });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Update user profile
router.put('/updateProfile', async (req, res) => {
  try {
    const { username, firstName, lastName, email, college, year, password, profileImage } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (firstName || lastName) user.name = `${firstName || ''} ${lastName || ''}`.trim();
    if (email) user.email = email;
    if (college) user.college = college;
    if (year) user.year = year;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (password) user.password = password;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get user profile by username
router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    // Split name into first and last for frontend convenience
    let firstName = '', lastName = '';
    if (user.name) {
      const parts = user.name.split(' ');
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }
    res.json({
      success: true,
      user: {
        username: user.username,
        firstName,
        lastName,
        email: user.email,
        college: user.college,
        year: user.year,
        profileImage: user.profileImage || '',
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Get notifications for a user
router.get('/notifications/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, notifications: user.notifications || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

export default router; 