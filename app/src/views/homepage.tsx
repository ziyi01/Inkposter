import React from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from '../userModel';

interface HomePageProps {
  model: UserModel;
  isJoinInputVisible: boolean;
  onJoinClick: () => void;
  joinCode: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
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
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Color Your Friends Surprised!</h1>
        <h2 className="text-3xl font-semibold text-purple-300 mb-6">PLAY NOW</h2>

        {/* Remove absolute positioning here */}
        <div className="flex space-x-4 mb-8"> {/* Added margin-bottom for spacing */}
          <Link to="/host-game" className="text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition">
            Host Game
          </Link>
          {!isJoinInputVisible ? (
            <button
              onClick={onJoinClick}
              className="text-white bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
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
    </div>
  );
};

export default HomePage;
