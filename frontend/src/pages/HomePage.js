import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts, savePost, unsavePost } from '../services/api';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import ClickSpark from '../components/ClickSpark';
import TopRightTools from '../components/TopRightTools';

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const SlideCarousel = ({ slides, titleSlideIdx, postTitle }) => {
    if (!slides || slides.length === 0) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false, // Turn off auto carousel
        fade: true, // Use slick's built-in fade
        cssEase: 'linear',
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
    };

    // Animation for slide content
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

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await getPosts();
                if (response.success) {
                    setPosts(response.posts);
                } else {
                    setError(response.message || 'Failed to fetch posts');
                }
            } catch (err) {
                setError('Server error. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Refresh posts if navigated with refresh flag
    useEffect(() => {
        if (location.state && location.state.refresh) {
            const fetchPosts = async () => {
                setLoading(true);
                setError('');
                try {
                    const response = await getPosts();
                    if (response.success) {
                        setPosts(response.posts);
                    } else {
                        setError(response.message || 'Failed to fetch posts');
                    }
                } catch (err) {
                    setError('Server error. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            fetchPosts();
            // Remove the refresh flag so it doesn't keep reloading
            navigate('/home', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    // Helper to check if a post is saved (now from state)
    const [savedPostIds, setSavedPostIds] = useState([]);
    const username = localStorage.getItem('btg_username') || '';

    useEffect(() => {
        // Fetch saved posts from backend on mount
        const fetchSaved = async () => {
            if (!username) return;
            const res = await import('../services/api').then(m => m.getSavedPosts(username));
            if (res.success) {
                setSavedPostIds(res.savedPosts.map(p => p._id));
            }
        };
        fetchSaved();
    }, [username]);

    const isPostSaved = (postId) => savedPostIds.includes(postId);

    // Toggle save/unsave post using backend
    const handleToggleSavePost = async (post) => {
        if (!username) return;
        let updated;
        if (isPostSaved(post._id)) {
            const res = await unsavePost(username, post._id);
            if (res.success) updated = res.savedPosts;
        } else {
            const res = await savePost(username, post._id);
            if (res.success) updated = res.savedPosts;
        }
        if (updated) setSavedPostIds(updated.map(id => id.toString ? id.toString() : id));
    };

    return (
        <ClickSpark sparkColor='#F0A04B' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btgcream">
                {/* Centered top heading */}
                <div className="w-full flex justify-center absolute top-[50px] left-0">
                    <div className="font-amatic text-6xl text-gray-900 text-center">
                        Feed
                    </div>
                </div>
                {/* navbar */}
                <nav className="fixed left-10 rounded-lg top-1/2 -translate-y-1/2 bg-btgcream w-[80px] h-[350px] shadow-lg p-4 flex flex-col items-center justify-center space-y-8">
                    {/* Home Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/home')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">home</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            {/* Notch */}
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
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">info</span>
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
                {/* top right action bar */}
                <TopRightTools navigate={navigate} />
                {/* articles feed */}
                <div className="flex flex-col items-center justify-center min-h-screen pt-32 pb-16 w-full overflow-y-auto">
                    {loading && <div className="text-btggreen text-lg">Loading posts...</div>}
                    {error && <div className="text-red-600 text-lg mb-4">{error}</div>}
                    {posts.map((post) => {
                        // Find the first text slide marked as title
                        const titleSlideIdx = post.slides.findIndex(slide => slide.type === 'text' && slide.isTitle);
                        return (
                            <div key={post._id} className="relative w-[600px] max-w-full mx-auto my-12">
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
                                {/* Action buttons outside, bottom left, below the card */}
                                <div className="flex items-center space-x-6 mt-4 ml-2">
                                    {/* Like */}
                                    <button className="group flex flex-col items-center focus:outline-none" onClick={() => handleToggleSavePost(post)}>
                                        <span className={`material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-125 ${isPostSaved(post._id) ? 'text-btggreen' : 'text-gray-900'}`}>{isPostSaved(post._id) ? 'favorite' : 'favorite_border'}</span>
                                        <span className={`text-xs mt-1 ${isPostSaved(post._id) ? 'text-gray-900' : 'text-gray-900'}`}>Save Post</span>
                                    </button>
                                   
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ClickSpark>
    );
};

export default HomePage; 