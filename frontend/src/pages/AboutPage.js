import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btgcream flex flex-col md:flex-row">
      {/* Left Navbar */}
      <nav className="fixed left-10 rounded-lg top-1/2 -translate-y-1/2 bg-btgcream w-[80px] h-[350px] shadow-lg p-4 flex flex-col items-center justify-center space-y-8 z-20">
        {/* Home Icon with expanding label and notch */}
        <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/home')}>
          <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">home</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
            <span className="text-gray-900 text-sm ml-2">Home</span>
          </div>
        </div>
        {/* Dashboard Icon with expanding label and notch */}
        <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/dashboardpage')}>
          <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">dashboard</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
            <span className="text-gray-900 text-sm ml-2">Dashboard</span>
          </div>
        </div>
        {/* About Icon with expanding label and notch */}
        <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/about')}>
          <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">page_info</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
            <span className="text-gray-900 text-sm ml-2">About</span>
          </div>
        </div>
        {/* Logout Icon with expanding label and notch */}
        <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/') }>
          <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">logout</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
            <span className="text-gray-900 text-sm ml-2">Logout</span>
          </div>
        </div>
      </nav>
      {/* Top Right Tools */}
      <div className="fixed top-8 right-8 bg-btgcream rounded-lg shadow-lg flex items-center space-x-4 px-4 py-2 z-50">
        <div className="group relative flex items-center cursor-pointer" onClick={() => navigate('/notifications')}>
          <span className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-125">notifications</span>
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Notifications</span>
        </div>
        <div className="group relative flex items-center cursor-pointer" onClick={() => navigate('/postform')}>
          <span className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-125">edit</span>
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Post</span>
        </div>
        <div className="group relative flex items-center cursor-pointer" onClick={() => navigate('/profilepage')}>
          <span className="material-symbols-outlined text-3xl rounded-full bg-btggreen text-white p-1 transition-transform duration-200 group-hover:scale-125">account_circle</span>
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Profile</span>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-[120px] md:pl-[140px] px-4 pb-8 w-full">
        <article className="flex ml-[-20px] max-w-6xl w-full bg-white/95 rounded-3xl shadow-2xl p-0 md:p-0 flex flex-col items-stretch gap-0 animate-fadein overflow-hidden">
          {/* Hero Section */}
          <header className="relative bg-gradient-to-r from-btgyellow/40 via-btgcream/80 to-btggreen/30 py-12 px-6 md:px-16 flex flex-col items-center text-center border-b border-btgcream">
            <span className="material-symbols-outlined text-6xl md:text-7xl text-btgorange animate-spin-slow mb-2">page_info</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-btggreen leading-tight mb-2">LUMINA: Empowering Students, Uniting Opportunities</h1>
            <p className="text-xl md:text-2xl text-gray-800 font-medium max-w-2xl mx-auto mb-4">LUMINA is a student-first platform designed to connect you with the people, projects, and opportunities that shape your future. We believe every student deserves a clear path to growth, collaboration, and success.</p>
            <blockquote className="italic text-btgorange text-lg font-semibold max-w-xl mx-auto mb-2 border-l-4 border-btggreen pl-4">“College is more than classes. It’s about finding your place, your people, and your purpose.”</blockquote>
          </header>

          {/* The Problem We Solve */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-white via-btgcream/60 to-btgyellow/20">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">warning</span>Why LUMINA?</h2>
            <p className="text-lg text-gray-800 mb-4">Today’s students face a maze of scattered information, missed opportunities, and disconnected communities. Finding the right club, project, or internship can feel like searching for a needle in a haystack. Many students want to get involved, but don’t know where to start—or who to ask.</p>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
              <li>Club fairs come and go, but information is quickly lost.</li>
              <li>Project and research opportunities are hidden in emails or word-of-mouth.</li>
              <li>Study groups, events, and startup teams are hard to discover and join.</li>
              <li>Students from underrepresented backgrounds often feel left out of key networks.</li>
            </ul>
            <p className="text-base text-gray-700 mt-4">LUMINA was created to break down these barriers and make college a place where everyone can thrive.</p>
          </section>

          {/* Our Solution & How LUMINA Works */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-btgcream/40 via-white to-btgyellow/10">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">lightbulb</span>How LUMINA Works</h2>
            <p className="text-lg text-gray-800 mb-4">LUMINA is your campus’s digital common room—a single, welcoming space where you can:</p>
            <ol className="list-decimal ml-6 text-gray-700 text-base mb-4">
              <li>Create a profile that highlights your interests, skills, and goals.</li>
              <li>Browse a curated feed of clubs, projects, research, internships, and events.</li>
              <li>Connect instantly with peers, mentors, and organizations.</li>
              <li>Join teams, apply for opportunities, or start your own initiatives.</li>
              <li>Track your growth, earn badges, and build your portfolio.</li>
            </ol>
            <div className="flex flex-col md:flex-row gap-6 mt-6 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-btggreen animate-bounce">explore</span>
                <span className="font-semibold text-btgorange">Explore</span>
                <span className="text-xs text-gray-600 text-center">Find all opportunities in one place</span>
              </div>
              <span className="material-symbols-outlined text-3xl text-gray-400">arrow_forward</span>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-btggreen animate-bounce">groups</span>
                <span className="font-semibold text-btgorange">Connect</span>
                <span className="text-xs text-gray-600 text-center">Meet collaborators, mentors, and friends</span>
              </div>
              <span className="material-symbols-outlined text-3xl text-gray-400">arrow_forward</span>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-btggreen animate-bounce">school</span>
                <span className="font-semibold text-btgorange">Learn</span>
                <span className="text-xs text-gray-600 text-center">Grow skills with structured tracks</span>
              </div>
              <span className="material-symbols-outlined text-3xl text-gray-400">arrow_forward</span>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-btggreen animate-bounce">trending_up</span>
                <span className="font-semibold text-btgorange">Grow</span>
                <span className="text-xs text-gray-600 text-center">Track progress, earn recognition</span>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-600 text-base italic">
              <span className="material-symbols-outlined align-middle text-btgorange">hub</span> <b>LUMINA is your all-in-one hub for student growth and opportunity.</b>
            </div>
          </section>

          {/* Key Features & Benefits */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-white via-btgcream/60 to-btgyellow/20">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">star</span>What Makes LUMINA Special?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">search</span> Opportunity Discovery</h3>
                <p className="text-gray-700">Browse and filter clubs, projects, startups, and research. No more FOMO—everything is in one place, always up to date.</p>
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">track_changes</span> Skill Development Tracks</h3>
                <p className="text-gray-700">Follow structured, habit-building progressions to master new skills. Turn learning into a daily adventure, not a chore.</p>
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">groups</span> Collaboration Tools</h3>
                <p className="text-gray-700">Match with projects and teams in real time. Find your crew, build something big, and make an impact together.</p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">menu_book</span> Knowledge Sharing</h3>
                <p className="text-gray-700">Access and contribute high-quality notes, study guides, and peer learning. Everyone levels up together.</p>
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">military_tech</span> Gamification</h3>
                <p className="text-gray-700">Earn points, badges, and streaks for every action. Stay motivated and celebrate your wins.</p>
                <h3 className="font-semibold text-btgorange text-lg flex items-center gap-1"><span className="material-symbols-outlined">diversity_3</span> Networking</h3>
                <p className="text-gray-700">Connect with peers, seniors, alumni, faculty, and industry pros. Grow your network, grow your future.</p>
              </div>
            </div>
          </section>

          {/* Success Stories & Use Cases */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-btgcream/40 via-white to-btgyellow/10">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">emoji_events</span>Real Student Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-btgyellow/20 rounded-xl p-6 shadow flex flex-col gap-2">
                <h4 className="font-bold text-btggreen">The shy freshman</h4>
                <p className="text-gray-700">Priya arrived on campus knowing no one. Through LUMINA, she found a coding club, joined a project, and discovered a supportive friend group that made college feel like home.</p>
              </div>
              <div className="bg-btgyellow/20 rounded-xl p-6 shadow flex flex-col gap-2">
                <h4 className="font-bold text-btggreen">The ambitious builder</h4>
                <p className="text-gray-700">Arjun wanted to launch a startup but didn’t know where to start. LUMINA connected him with co-founders, mentors, and even his first internship—all in one semester.</p>
              </div>
              <div className="bg-btgyellow/20 rounded-xl p-6 shadow flex flex-col gap-2">
                <h4 className="font-bold text-btggreen">The struggling student</h4>
                <p className="text-gray-700">Sara was falling behind in classes. She found study partners and shared notes through LUMINA, turning her grades around and regaining her confidence.</p>
              </div>
              <div className="bg-btgyellow/20 rounded-xl p-6 shadow flex flex-col gap-2">
                <h4 className="font-bold text-btggreen">The club leader</h4>
                <p className="text-gray-700">Rohan used LUMINA to recruit passionate members and run successful events, transforming his club into a campus powerhouse.</p>
              </div>
            </div>
          </section>

          {/* For Different Stakeholders */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-white via-btgcream/60 to-btgyellow/20">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">diversity_3</span>Who Benefits from LUMINA?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="font-bold text-btgorange mb-1">Students</h4>
                <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
                  <li>Prepare for careers, build skills, and succeed academically.</li>
                  <li>Find your community, mentors, and collaborators.</li>
                  <li>Access opportunities that match your goals and interests.</li>
                </ul>
                <h4 className="font-bold text-btgorange mb-1">Faculty</h4>
                <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
                  <li>Collaborate with students on research and projects.</li>
                  <li>Boost engagement and mentorship.</li>
                  <li>Launch new initiatives with student partners.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-btgorange mb-1">Clubs & Organizations</h4>
                <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
                  <li>Recruit members and promote events easily.</li>
                  <li>Collaborate on projects and share resources.</li>
                  <li>Build a vibrant, active community.</li>
                </ul>
                <h4 className="font-bold text-btgorange mb-1">Startups & Colleges</h4>
                <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
                  <li>Find talented student contributors and run impactful programs.</li>
                  <li>Foster innovation and community engagement.</li>
                  <li>Improve student outcomes and campus culture.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The LUMINA Difference */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-btgcream/40 via-white to-btgyellow/10">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">workspace_premium</span>What Sets LUMINA Apart?</h2>
            <blockquote className="italic text-btgorange text-lg font-semibold max-w-xl mx-auto mb-4 border-l-4 border-btggreen pl-4">“We’re not just another social network. We’re your launchpad for real growth.”</blockquote>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
              <li>Structured skill building, not just random activities—grow with purpose.</li>
              <li>Quality content curation and active community moderation.</li>
              <li>Long-term career impact, not just social networking.</li>
              <li>One-stop hub for all things student life and growth.</li>
            </ul>
          </section>

          {/* Our Vision & Mission */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-white via-btgcream/60 to-btgyellow/20">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">visibility</span>Our Vision & Mission</h2>
            <div className="flex flex-col md:flex-row gap-8 mt-6">
              <div className="flex-1">
                <h4 className="font-bold text-btgorange mb-1">Vision</h4>
                <p className="text-gray-700">To create connected, collaborative educational communities where every student can thrive—no matter their background or starting point.</p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-btgorange mb-1">Mission</h4>
                <p className="text-gray-700">To prepare students for successful, fulfilling careers through meaningful engagement, skill-building, and opportunity discovery—empowering the next generation of leaders and innovators.</p>
              </div>
            </div>
          </section>

          {/* Technology & Innovation */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-btgcream/40 via-white to-btgyellow/10">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">auto_awesome</span>Technology & Innovation</h2>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
              <li>Smart matching algorithms connect you to the best-fit opportunities and collaborators.</li>
              <li>AI-powered recommendations based on your interests and goals.</li>
              <li>Progress tracking and analytics to visualize your growth.</li>
              <li>Cross-institutional network potential—connect beyond your campus.</li>
            </ul>
          </section>

          {/* Getting Started */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-white via-btgcream/60 to-btgyellow/20">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">rocket_launch</span>Getting Started with LUMINA</h2>
            <ol className="list-decimal ml-6 text-gray-700 text-base mb-2">
              <li>Sign up and set up your profile in minutes.</li>
              <li>Browse opportunities, join clubs, and connect with peers right away.</li>
              <li>Start a skill track and earn your first badge in your first week!</li>
              <li>Check out community guidelines for a positive, supportive experience.</li>
            </ol>
            <p className="text-gray-700 text-base">Maximize your value: Stay curious, get involved, and help others grow!</p>
          </section>

          {/* Future Roadmap */}
          <section className="px-6 md:px-16 py-10 border-b border-btgcream bg-gradient-to-r from-btgcream/40 via-white to-btgyellow/10">
            <h2 className="text-2xl font-bold text-btggreen mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-btgorange">timeline</span>What’s Next for LUMINA?</h2>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-2">
              <li>Upcoming: More skill tracks, advanced collaboration tools, and a mobile app.</li>
              <li>Expansion to more colleges and universities.</li>
              <li>Integration with campus systems for a seamless experience.</li>
              <li>Continuous evolution based on student feedback and needs.</li>
            </ul>
          </section>

          {/* Call-to-Action */}
          <footer className="w-full flex flex-col items-center gap-2 py-10 bg-gradient-to-r from-btgyellow/40 via-btgcream/80 to-btggreen/30 animate-fadein border-t border-btgcream">
            <span className="text-2xl font-bold text-btgorange flex items-center gap-2 animate-bounceInUp">
              <span className="material-symbols-outlined text-3xl">celebration</span>
              Ready to Shine with LUMINA?
            </span>
            <p className="text-lg text-btggreen text-center font-semibold">Join LUMINA today and unlock your full potential. Your journey starts now!</p>
            <button
              className="mt-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg bg-btggreen hover:bg-btgorange text-lg transition-all duration-200 animate-popIn"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
            <div className="mt-6 text-center text-btgorange font-semibold text-lg">
              <span className="material-symbols-outlined align-middle text-2xl">favorite</span> Made with passion for learners everywhere.
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default AboutPage; 