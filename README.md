# BTG (Bridge The Gap) - Student Engagement Platform

## 🎯 Mission
BTG aims to bridge the gap between students and meaningful engagement opportunities by providing a centralized platform for discovery, collaboration, and growth within the college ecosystem.

## 🚀 Features

### Core Pillars
- **Home**: Article creation, engagement, and content moderation
- **Explore**: Discover clubs, projects, startups, and communities
- **Notes**: High-quality academic notes with freemium model
- **Profiles**: Gamified user profiles with achievements and levels

### Key Capabilities
- User authentication with college email verification
- Content creation and moderation system
- Real-time engagement (likes, comments, shares)
- Club and project discovery/joining
- Achievement and gamification system
- Responsive mobile-first design

## 🛠 Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Socket.io-client for real-time features
- React Hook Form for forms
- React Toastify for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time communication
- Cloudinary for file uploads
- Rate limiting and validation

## 📁 Project Structure
```
btg-website/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express backend
├── shared/           # Shared types and utilities
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd btg-website
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Backend environment variables
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment variables
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

4. **Start Development Servers**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

### Database Setup
```bash
# Start MongoDB (if local)
mongod

# Run migrations (if any)
npm run migrate
```

## 🎨 Design System

### Color Palette
- Primary: #2563eb (Blue)
- Secondary: #7c3aed (Purple)
- Success: #059669 (Green)
- Warning: #d97706 (Orange)
- Error: #dc2626 (Red)
- Neutral: #6b7280 (Gray)

### Typography
- Headers: Inter/Poppins (Bold)
- Body: Inter/Open Sans (Regular)
- Code: Fira Code (Monospace)

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- XSS and CSRF protection

## 📊 Gamification System

### Point System
- Article Creation: 50 points
- Article Like: 5 points
- Comment: 10 points
- Club Join: 25 points
- Project Contribution: 100 points
- Note Upload: 30 points
- Profile Completion: 20 points

### Levels & Badges
- Levels: 1-50 (exponential progression)
- Badges: Writer, Collaborator, Leader, Mentor, Expert
- Achievements: First Article, 100 Likes, Project Completed

## 🚀 Deployment

### Production Environment
- MongoDB Atlas for database
- Cloudinary for file storage
- Environment-specific configurations
- Error monitoring with Sentry

### CI/CD Pipeline
- GitHub Actions for automated testing
- Automated deployment on push to main
- Environment-specific configurations

## 📈 Success Metrics

### User Engagement
- Daily/Monthly active users
- Content creation rates
- User retention (1-day, 7-day, 30-day)
- Session duration and page views

### Content Quality
- Article engagement rates
- Note download/rating metrics
- Project completion rates
- Community participation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@btg-platform.com or join our Discord community.

---

**Built with ❤️ for students, by students** 