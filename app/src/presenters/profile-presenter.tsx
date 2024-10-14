import React, { useState } from 'react';
import ProfilePageView from '../views/profile';
import { UserModel } from '../userModel';
import ProfileNavBar from '../components/navbar';

interface ProfilePagePresenterProps {
  model: UserModel;
  handleLogout: () => void;
}

const ProfilePagePresenter: React.FC<ProfilePagePresenterProps> = ({ model, handleLogout }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfileVisible((prev) => !prev);
  };

  return (
    <>
      <ProfileNavBar />
      <button
        onClick={toggleProfilePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Profile
      </button>

      {isProfileVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <ProfilePageView handleLogout={handleLogout} />
        </div>
      )}
    </>
  );
};

export default ProfilePagePresenter;
