import React, { useState } from 'react';

interface ProfilePageProps {
  handleLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ handleLogout }) => {
  const [name, setName] = useState<string>('John Doe');

  // Sample data for points and their values
  const points = [
    { title: 'Point 1', value: 'Value 1' },
    { title: 'Point 2', value: 'Value 2' },
    { title: 'Point 3', value: 'Value 3' },
    { title: 'Point 4', value: 'Value 4' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Profile</h2>
        <div className="mb-6 text-center text-white">
          <h3 className="text-2xl text-white font-semibold mb-6">{name}</h3>
        </div>
        
        {/* Tracking Points Boxes */}
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
      
      <div className="absolute top-0 right-0 p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-150"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
