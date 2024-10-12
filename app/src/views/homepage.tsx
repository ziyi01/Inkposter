import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page min-h-screen bg-blue-300 relative">
      {/* Profile Button */}
      <div className="absolute top-4 left-4">
        <Link to="/profile" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Profile
        </Link>
      </div>
      
      {/* Settings Button */}
      <div className="absolute top-4 right-4">
        <Link to="/settings" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Settings
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">I</h1>
        </div>
      </div>

      {/* Host and Join Game Buttons */}
      <div className="absolute bottom-4 left-4 flex space-x-4">
        <Link to="/host-game" className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
          Host Game
        </Link>
        <Link to="/join-game" className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition">
          Join Game
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
