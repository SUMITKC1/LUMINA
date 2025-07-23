import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import ClickSpark from '../components/ClickSpark';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log('Login attempt:', formData);
        try {
            const response = await login(formData);
            if (response.success) {
                // Save username to localStorage
                localStorage.setItem('btg_username', formData.username);
                console.log('Login successful! Navigating to homepage...');
                navigate('/home');
            } else {
                setError(response.message || 'Invalid username or password');
                console.log('Login failed:', response.message);
            }
        } catch (err) {
            setError('Server error. Please try again later.');
            console.log('Login failed - server error', err);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <ClickSpark sparkColor='#393E46' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btggreen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                    <h2 className="text-3xl font-bold text-btggreen mb-6 text-center">
                        Login to LUMINA
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="text-btggreen text-sm mb-2">{error}</div>
                        )}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-btggreen mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btggreen focus:border-transparent text-btggreen"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-btggreen mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btggreen focus:border-transparent text-btggreen"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-btggreen text-white py-2 px-4 rounded-md hover:bg-btgyellow hover:text-btggreen transition-colors duration-200 font-semibold"
                        >
                            Login
                        </button>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <p className="text-sm text-btggreen">
                            Don't have an account?{' '}
                            <button 
                                onClick={handleSignup}
                                className="text-btggreen hover:text-btgyellow font-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </ClickSpark>
    );
};

export default LoginPage; 