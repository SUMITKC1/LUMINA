import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Mumbai'); // Default location
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Weather icons mapping
  const getWeatherIcon = (condition) => {
    const icons = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'thunderstorm': '⛈️',
      'drizzle': '🌦️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️',
      'smoke': '🌫️',
      'dust': '🌫️',
      'sand': '🌫️',
      'ash': '🌫️',
      'squall': '💨',
      'tornado': '🌪️'
    };
    return icons[condition] || '🌤️';
  };

  // Get weather data from OpenWeatherMap API
  const fetchWeather = async () => {
    try {
      setLoading(true);
      const apiKey = 'c3cda732d5591c76eb3a85fc97a1164b';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      const weatherData = {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(data.main.feels_like)
      };
      
      setWeather(weatherData);
    } catch (err) {
      // setError('City not found or network error'); // Original code had this line commented out
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setLocation(searchInput.trim());
      setShowSearch(false);
      setSearchInput('');
    }
  };

  const handleClickOutside = (e) => {
    if (showSearch && !e.target.closest('.weather-widget')) {
      setShowSearch(false);
      setSearchInput('');
    }
  };

  useEffect(() => {
    if (showSearch) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSearch]);

  if (loading) {
    return (
      <div className="bg-btgyellow/80 rounded-xl shadow p-4 flex flex-col min-h-[110px] position-absolute ml-[100px] animate-pulse">
        
        <div className="flex items-center justify-center flex-1">
          <div className="text-4xl animate-spin">🌤️</div>
        </div>
      </div>
    );
  }

  

      return (
      <div className="weather-widget bg-btgcream/90 rounded-xl shadow p-4 flex flex-col min-h-[110px] position-absolute ml-[100px] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {weather?.condition === 'rain' && (
            <div className="rain-container">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="rain-drop"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
          {weather?.condition === 'snow' && (
            <div className="snow-container">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="snowflake"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

              {/* Weather content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-btggreen hover:text-btgorange transition-colors"
              title="Search location"
            >
              <span className="material-symbols-outlined text-sm">search</span>
            </button>
            <button 
              onClick={fetchWeather}
              className="text-btggreen hover:text-btgorange transition-colors"
              title="Refresh weather"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
            </button>
          </div>
          
          {showSearch && (
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 rounded-lg border border-btggreen px-2 py-1 text-xs bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-btgyellow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                  if (e.key === 'Escape') setShowSearch(false);
                }}
                autoFocus
              />
              <button
                onClick={handleSearch}
                className="bg-btggreen text-white rounded-lg px-2 py-1 text-xs hover:bg-btgyellow hover:text-btggreen transition-colors"
              >
                Search
              </button>
            </div>
          )}
        
                  {weather && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-4xl animate-pulse ">
                  {getWeatherIcon(weather.condition)}
                </div>
                <div>
                  <div className=" flex text-3xl font-bold text-gray-900">
                    {weather.temperature}°C
                  </div>
                  <div className="text-sm text-gray-900 capitalize">
                    {weather.condition}
                  </div>
                </div>
              </div>
              
              <div className="text-right text-xs text-gray-700">
                <div>Feels like {weather.feelsLike}°C</div>
                <div>Humidity {weather.humidity}%</div>
                <div>Wind {weather.windSpeed} km/h</div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default WeatherWidget; 