import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClickSpark from '../components/ClickSpark';
import TopRightTools from '../components/TopRightTools';
import { useEffect, useState } from 'react';
import { getNotifications } from '../services/api';

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const username = localStorage.getItem('btg_username') || '';
        if (!username) {
            setError('You must be logged in to view notifications.');
            setLoading(false);
            return;
        }
        getNotifications(username).then(res => {
            if (res.success) setNotifications(res.notifications);
            else setError(res.message || 'Failed to fetch notifications');
        }).catch(() => setError('Server error')).finally(() => setLoading(false));
    }, []);

    return (
        <ClickSpark sparkColor='#F0A04B' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btgcream">
                {/* Centered top heading */}
                <div className="w-full flex justify-center  mb-8">
                    <div className="flex mt-12 font-amatic text-6xl text-gray-900 text-center">
                        Notifications
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
                <div className="flex flex-col items-center mt-32">
                    {loading && <div className="text-btggreen text-lg">Loading notifications...</div>}
                    {error && <div className="text-red-600 text-lg mb-4">{error}</div>}
                    {!loading && !error && notifications.length === 0 && (
                        <div className="text-gray-500 text-center">No notifications yet.</div>
                    )}
                    {!loading && !error && notifications.length > 0 && (
                        <ul className="w-full max-w-xl bg-white rounded-lg shadow p-6 mt-4">
                            {notifications.map((n, i) => (
                                <li key={i} className="border-b last:border-b-0 py-3 flex flex-col">
                                    <span className="text-btggreen font-semibold">{n.message}</span>
                                    <span className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-8 text-sm text-gray-600 text-center max-w-xl">
                        You will also receive an email notification at your registered email address when a new post is created.
                    </div>
                </div>
            </div>
        </ClickSpark>
    );
};

export default NotificationsPage; 