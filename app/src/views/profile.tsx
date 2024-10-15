import React from 'react';
import { Link } from 'react-router-dom';

// Define the props interface
interface ProfilePageViewProps {
  name: string; // Expected name prop
  points: { title: string; value: string }[]; // Expected points prop
  onLogout: () => void; // Expected onLogout prop
}

const ProfilePageView: React.FC<ProfilePageViewProps> = ({ name, points, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="absolute top-8 left-0 p-4"> {/* Adjusted the top positioning */}
        <Link to="/homepage">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-150">
            Back
          </button>
        </Link>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Link to="/homepage" className="text-4xl font-bold text-center text-white mb-4 block">
          INKPOSTER
        </Link>

        <h2 className="text-xl font-bold mb-4 text-center text-white">Profile</h2>
        <div className="mb-6 text-center text-white">
          <h3 className="text-2xl text-white font-semibold mb-6">{name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-gray-600 border border-gray-300 rounded-lg p-6 shadow-md flex flex-col items-center justify-center"
            >
              <h4 className="text-lg text-white font-medium mb-2">{point.title}</h4>
              <p className="text-2xl text-white font-bold">{point.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-8 right-0 p-4">
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-150"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePageView;
