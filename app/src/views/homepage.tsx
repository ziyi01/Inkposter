import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

  const [isJoinInputVisible, setIsJoinInputVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinClick = () => setIsJoinInputVisible(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJoinCode(e.target.value);
    const handleInputBlur = () => {
      setIsJoinInputVisible(false);
      console.log('join Code:', joinCode)
    };

  return (
    <div className="home-page min-h-screen bg-gray-800 relative">
      {/* Profile Button */}
      <div className="absolute top-4 left-4">
        <Link to="/profile" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Profile
        </Link>
      </div>
      
      {/* Settings Button 
      <div className="absolute top-4 right-4">
        <Link to="/settings" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Settings
        </Link>
      </div>
      */}

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
         {/* Join Game Button/Input Toggle */}
         {!isJoinInputVisible ? (
          <button
            onClick={handleJoinClick}
            className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Join Game
          </button>
        ) : (
          <input
            type="text"
            value={joinCode}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
            className="px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Enter game code"
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
