import React, { useState } from 'react';

interface ProfilePageProps {
  handleLogout: () => void;
}

// Update the React.FC type to include ProfilePageProps
const ProfilePage: React.FC<ProfilePageProps> = ({ handleLogout }) => {
  const [name, setName] = useState<string>('John Doe');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
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
