import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <div className="mb-4 flex justify-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <label htmlFor="upload" className="absolute inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer rounded-full">
              <span className="text-white">Edit</span>
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>

        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
