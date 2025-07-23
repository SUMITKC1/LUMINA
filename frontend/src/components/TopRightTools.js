import React from 'react';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=ffffff&rounded=true';

const TopRightTools = ({ navigate }) => {
    // Try to get the profile image from localStorage (set after profile update)
    let profileImage = defaultAvatar;
    try {
        const userProfile = JSON.parse(localStorage.getItem('lumina_profile') || '{}');
        if (userProfile && userProfile.profileImage) {
            profileImage = userProfile.profileImage;
        }
    } catch (e) {}

    return (
        <div className="fixed top-8 right-8 bg-btgcream rounded-lg shadow-lg flex items-center space-x-4 px-4 py-2 z-50">
            {/* Notification */}
            <div
                className="group relative flex items-center cursor-pointer"
                onClick={() => navigate('/notifications')}
            >
                <span className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-125">notifications</span>
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Notifications
                </span>
            </div>
            {/* Add */}
            <div
                className="group relative flex items-center cursor-pointer"
                onClick={() => navigate('/postform')}
            >
                <span className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-125">edit</span>
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Add Post
                </span>
            </div>
            {/* Profile */}
            <div
                className="group relative flex items-center cursor-pointer"
                onClick={() => navigate('/profilepage')}
            >
                <span className="rounded-full text-white p-1 transition-transform duration-200 group-hover:scale-125 w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src={profileImage} alt="Profile" className="object-cover w-full h-full rounded-full" />
                </span>
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Profile
                </span>
            </div>
        </div>
    );
};

export default TopRightTools; 