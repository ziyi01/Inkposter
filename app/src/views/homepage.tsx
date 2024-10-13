import React from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from '../userModel';

interface HomePageProps {
  model: UserModel;
  isJoinInputVisible: boolean;
  onJoinClick: () => void;
  joinCode: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void; // Add this prop
}

const HomePage: React.FC<HomePageProps> = ({
  model,
  isJoinInputVisible,
  onJoinClick,
  joinCode,
  onInputChange,
  onSubmit,
}) => {
  
  return (
    <div className="home-page min-h-screen bg-gray-800 relative">
      <div className="absolute top-4 left-4">
        <Link to="/profile" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
          Profile
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">I</h1>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-4">
        <Link to="/host-game" className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
          Host Game
        </Link>
        {!isJoinInputVisible ? (
          <button
            onClick={onJoinClick}
            className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Join Game
          </button>
        ) : (
          <form onSubmit={onSubmit} className="flex">
            <input
              type="text"
              value={joinCode}
              onChange={onInputChange}
              autoFocus
              className="px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter game code"
            />
            <button
              type="submit"
              className="ml-2 text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;
