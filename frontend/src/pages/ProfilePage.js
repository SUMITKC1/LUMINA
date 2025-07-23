import React, { useEffect, useState } from 'react';
import { getPostsByAuthor, getSavedPosts, deletePost, updateProfile, getProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TopRightTools from '../components/TopRightTools';
import Slider from 'react-slick';
import ClickSpark from '../components/ClickSpark';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=ffffff&rounded=true';

const Arrow = ({ className, style, onClick, direction }) => (
    <button
        type="button"
        onClick={onClick}
        className={`slick-arrow z-10 absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-4' : 'right-4'} bg-white bg-opacity-60 hover:bg-opacity-90 shadow rounded-full w-10 h-10 flex items-center justify-center transition-all border border-gray-200 opacity-0 group-hover:opacity-100`}
        style={{ ...style, display: 'flex', pointerEvents: 'auto' }}
        aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    >
        {direction === 'left' ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        )}
    </button>
);

// Update SlideCarousel to accept a 'saved' prop and use bg-btgcream for text slides if saved
const SlideCarousel = ({ slides, titleSlideIdx, postTitle }) => {
    if (!slides || slides.length === 0) return null;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        cssEase: 'linear',
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
    };
    // Animation for slide content (copied from HomePage)
    const contentVariants = {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    return (
        <div className="w-full aspect-w-16 aspect-h-7 overflow-hidden group relative">
            <Slider {...settings} className="w-full h-full">
                {slides.map((slide, index) => (
                    <div key={index} className={`w-full h-full min-h-[350px] flex items-center justify-center${slide.type === 'text' ? ' bg-btgcream rounded-md' : ''}`}>
                        {slide.type === 'image' ? (
                            <motion.img
                                src={slide.content}
                                alt={`slide-${index}`}
                                className="object-cover w-full h-full"
                                initial="initial"
                                animate="animate"
                                variants={contentVariants}
                            />
                        ) : (
                            <motion.div
                                className="w-full h-full flex flex-col items-center justify-center text-center"
                                style={{ color: '#222' }}
                                initial="initial"
                                animate="animate"
                                variants={contentVariants}
                            >
                                {slide.isTitle && (
                                    <h2 className="text-3xl font-bold italic mb-2">{postTitle}</h2>
                                )}
                                <span className="text-xl font-semibold">{slide.content}</span>
                            </motion.div>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Update PostCard to accept a 'saved' prop
function PostCard({ post, onDelete }) {
    const titleSlideIdx = post.slides.findIndex(slide => slide.type === 'text' && slide.isTitle);
    return (
        <div className="relative w-[600px] max-w-full mx-auto my-12">
            {/* Category, author, date OUTSIDE the card */}
            <div className="flex flex-col bg-btggreen rounded-md md:flex-row justify-between items-center mb-2 px-2">
                <div className="flex flex-col items-start">
                    <span className="italic text-gray-900">{post.category}</span>
                </div>
                <div className="flex flex-col items-end ">
                    <span className="text-gray-500">{post.author}</span>
                    <span className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            {/* Carousel card - no border, shadow, or color */}
            <div className="overflow-hidden rounded-md">
                <SlideCarousel slides={post.slides} titleSlideIdx={titleSlideIdx} postTitle={post.title} />
            </div>
            {/* Delete Button (if onDelete provided) - moved to bottom right below the carousel */}
            {onDelete && (
                <div className="flex justify-end mt-2">
                    <button
                        className="bg-white/80 hover:bg-red-100 text-btgorange hover:text-red-600 rounded-full p-2 shadow transition-all"
                        title="Delete post"
                        onClick={() => onDelete(post._id)}
                    >
                        <span className="material-symbols-outlined text-2xl">delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        college: '',
        year: '',
        profileImage: '',
    });
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        college: '',
        year: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
    });
    const [editError, setEditError] = useState('');
    const [editLoading, setEditLoading] = useState(false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('my'); // 'my' or 'saved'

    useEffect(() => {
        const storedUsername = localStorage.getItem('btg_username') || '';
        setUsername(storedUsername);
        if (!storedUsername) {
            setError('You must be logged in to view your profile.');
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                // Fetch my posts
                const myPostsRes = await getPostsByAuthor(storedUsername);
                if (myPostsRes.success) {
                    setPosts(myPostsRes.posts);
                } else {
                    setError(myPostsRes.message || 'Failed to fetch posts');
                }
                // Fetch saved posts from backend
                const savedRes = await getSavedPosts(storedUsername);
                if (savedRes.success) {
                    setSavedPosts(savedRes.savedPosts);
                } else {
                    setSavedPosts([]);
                }
                // Fetch user profile from backend
                const profileRes = await getProfile(storedUsername);
                if (profileRes.success && profileRes.user) {
                    setProfile(profileRes.user);
                    localStorage.setItem('lumina_profile', JSON.stringify(profileRes.user));
                }
            } catch (err) {
                setError('Server error. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetch saved posts whenever the tab is switched to 'saved'
    useEffect(() => {
        if (activeTab === 'saved' && username) {
            const fetchSavedPosts = async () => {
                const savedRes = await getSavedPosts(username);
                if (savedRes.success) {
                    setSavedPosts(savedRes.savedPosts);
                } else {
                    setSavedPosts([]);
                }
            };
            fetchSavedPosts();
        }
    }, [activeTab, username]);

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
        const res = await deletePost(postId);
        if (res.success) {
            setPosts(posts => posts.filter(p => p._id !== postId));
            navigate('/home', { state: { refresh: true } });
        } else {
            alert(res.message || 'Failed to delete post.');
        }
    };

    const handleEditProfile = () => {
        setEditData(prev => ({
            ...prev,
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            username: username || '',
            email: profile.email || '',
            college: profile.college || '',
            year: profile.year || '',
            profileImage: profile.profileImage || '',
            password: '',
            confirmPassword: '',
        }));
        setShowEdit(true);
    };
    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setEditData(d => ({ ...d, profileImage: ev.target.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setEditData(d => ({ ...d, [name]: value }));
        }
        if (editError) setEditError('');
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError('');
        if (editData.password && editData.password !== editData.confirmPassword) {
            setEditError('Passwords do not match');
            setEditLoading(false);
            return;
        }
        try {
            const res = await updateProfile({
                username: editData.username,
                firstName: editData.firstName,
                lastName: editData.lastName,
                email: editData.email,
                college: editData.college,
                year: editData.year,
                password: editData.password,
                profileImage: editData.profileImage,
            });
            if (res.success) {
                setProfile({
                    firstName: editData.firstName,
                    lastName: editData.lastName,
                    email: editData.email,
                    college: editData.college,
                    year: editData.year,
                    profileImage: editData.profileImage,
                });
                localStorage.setItem('lumina_profile', JSON.stringify({
                    username: editData.username,
                    firstName: editData.firstName,
                    lastName: editData.lastName,
                    email: editData.email,
                    college: editData.college,
                    year: editData.year,
                    profileImage: editData.profileImage,
                }));
                setShowEdit(false);
            } else {
                setEditError(res.message || 'Failed to update profile');
            }
        } catch (err) {
            setEditError('Server error. Please try again.');
        } finally {
            setEditLoading(false);
        }
    };

    if (!username) {
        return (
            <div className="min-h-screen bg-btggreen flex items-center justify-center">
                <Navbar navigate={navigate} />
                <TopRightTools navigate={navigate} />
                <div className="bg-btgcream p-8 rounded-xl shadow-lg text-center">
                    <h2 className="font-amatic text-4xl text-btggreen mb-4">Profile</h2>
                    <div className="text-red-600 text-lg">You must be logged in to view your profile.</div>
                </div>
            </div>
        );
    }

    return (
        <ClickSpark sparkColor='#F0A04B' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-btggreen flex flex-col items-center pt-24">
                <Navbar navigate={navigate} />
                <TopRightTools navigate={navigate} />
                {/* Profile Info */}
                <div className="bg-btgcream rounded-xl shadow-lg p-8 w-[400px] flex flex-col items-center mb-12">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-white flex items-center justify-center">
                        <img src={profile.profileImage || defaultAvatar} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                    <div className="font-amatic text-4xl text-btggreen mb-2">{username}</div>
                    <button className="bg-btgyellow text-btggreen px-4 py-2 rounded-md font-semibold shadow hover:bg-btgorange transition-colors" onClick={handleEditProfile}>Edit Profile</button>
                </div>
                {showEdit && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <form className="bg-white rounded-lg shadow-xl p-8 w-[400px] flex flex-col gap-4 relative" onSubmit={handleEditSubmit}>
                            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowEdit(false)}>&times;</button>
                            <div className="flex flex-col items-center mb-2">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-2">
                                    <img src={editData.profileImage || defaultAvatar} alt="Profile" className="object-cover w-full h-full" />
                                </div>
                                <input type="file" name="profileImage" accept="image/*" onChange={handleEditChange} className="text-xs" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" name="firstName" value={editData.firstName} onChange={handleEditChange} placeholder="First Name" className="border px-2 py-1 rounded" required />
                                <input type="text" name="lastName" value={editData.lastName} onChange={handleEditChange} placeholder="Last Name" className="border px-2 py-1 rounded" required />
                            </div>
                            <input type="text" name="username" value={editData.username} onChange={handleEditChange} placeholder="Username" className="border px-2 py-1 rounded" required disabled />
                            <input type="email" name="email" value={editData.email} onChange={handleEditChange} placeholder="Email" className="border px-2 py-1 rounded" required />
                            <input type="text" name="college" value={editData.college} onChange={handleEditChange} placeholder="College/University" className="border px-2 py-1 rounded" />
                            <select name="year" value={editData.year} onChange={handleEditChange} className="border px-2 py-1 rounded">
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="5">5th Year</option>
                            </select>
                            <input type="password" name="password" value={editData.password} onChange={handleEditChange} placeholder="New Password" className="border px-2 py-1 rounded" />
                            <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={handleEditChange} placeholder="Confirm Password" className="border px-2 py-1 rounded" />
                            {editError && <div className="text-red-600 text-sm">{editError}</div>}
                            <button type="submit" className="bg-btggreen text-white py-2 rounded hover:bg-btgorange transition-colors font-semibold" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
                        </form>
                    </div>
                )}
                {/* Tabs for My Posts and Saved Posts */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors duration-200 ${activeTab === 'my' ? 'bg-btgyellow text-btggreen shadow' : 'bg-btgcream text-gray-500'}`}
                        onClick={() => setActiveTab('my')}
                    >
                        My Posts
                    </button>
                    <button
                        className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors duration-200 ${activeTab === 'saved' ? 'bg-btgyellow text-btggreen shadow' : 'bg-btgcream text-gray-500'}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        Saved Posts
                    </button>
                </div>
                {/* Posts Section */}
                <div className="w-full max-w-2xl">
                    {loading && <div className="text-btggreen text-lg">Loading posts...</div>}
                    {error && <div className="text-red-600 text-lg mb-4">{error}</div>}
                    {activeTab === 'my' && (
                        <>
                            <h2 className="font-amatic text-3xl text-btggreen mb-6 text-center">My Posts</h2>
                            {posts.length === 0 && !loading && <div className="text-gray-500 text-center">No posts yet.</div>}
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
                            ))}
                        </>
                    )}
                    {activeTab === 'saved' && (
                        <>
                            <h2 className="font-amatic text-3xl text-btggreen mb-6 text-center">Saved Posts</h2>
                            {savedPosts.length === 0 && !loading && <div className="text-gray-500 text-center">No saved posts yet.</div>}
                            {savedPosts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </ClickSpark>
    );
};

export default ProfilePage;
