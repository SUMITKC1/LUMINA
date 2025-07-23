import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClickSpark from '../components/ClickSpark';
import FadeContent from '../components/FadeContent';
const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Login clicked - navigating to login page');
        navigate('/login');
    };

    const handleSignup = () => {
        console.log('Signup clicked - navigating to signup page');
        navigate('/signup');
    };

    return (
        <ClickSpark
            sparkColor='#393E46'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={3000}
        >
            {/* LUMINA heading */}
            <div
                className="min-h-screen flex flex-col"
                style={{
                    backgroundImage: "url('/LUMINA.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex-1 p-8">
                    {/* login and signup buttons */}
                    <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
                        {<div className="flex justify-start items-center space-x-6 mt-[500px] ml-[100px]">
                            <button
                                onClick={handleLogin}
                                className="px-8 py-3 bg-white  font-semibold font-libertinus  rounded-md hover:bg-pink-500 hover:text-white transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleSignup}
                                className="px-8 py-3 bg-gray-900 text-white  font-semibold rounded-md hover:bg-pink-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </div>}
                    </FadeContent>
                </div>
            </div>
        </ClickSpark>
    );
};

export default LandingPage; 