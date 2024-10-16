import React, { useState } from 'react';
import ProfilePageView from '../views/profile';
import { UserModel } from '../userModel';

interface ProfilePresenterProps {
  handleLogout: () => void; // Define the handleLogout prop
  model: UserModel;
}

const ProfilePagePresenter: React.FC<ProfilePresenterProps> = ({ handleLogout, model }) => {
  const points = [
    { title: 'Wins as innocent', value: model.profileStats.innocent.wins.toString() },
    { title: 'Losses as innocent', value: model.profileStats.innocent.losses.toString() },
    { title: 'Wins as Inkposter', value: model.profileStats.inkposter.wins.toString() },
    { title: 'Losses as Inkposter', value: model.profileStats.inkposter.losses.toString() },
  ];

  return (
    <>
      <ProfilePageView
        name={model.name} // Pass the name variable here
        points={points} // Pass the points array here
        onLogout={handleLogout} // Pass the handleLogout function here
      />
    </>
  );
};

export default ProfilePagePresenter;