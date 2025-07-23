import React from 'react';

const Navbar = ({ navigate }) => (
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
);

export default Navbar; 