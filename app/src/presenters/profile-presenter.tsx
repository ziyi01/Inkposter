import React, { useState } from 'react';
import ProfilePageView from '../views/profile';
import NavBar from '../components/navbar';

interface ProfilePresenterProps {
  handleLogout: () => void; // Define the handleLogout prop
}

const ProfilePagePresenter: React.FC<ProfilePresenterProps> = ({ handleLogout }) => {
  const [name] = useState<string>('John Doe'); // Use state for the name
  const points = [
    { title: 'Point 1', value: 'Value 1' },
    { title: 'Point 2', value: 'Value 2' },
    { title: 'Point 3', value: 'Value 3' },
    { title: 'Point 4', value: 'Value 4' },
  ];

  return (
    <>
      <ProfilePageView
        name={name} // Pass the name variable here
        points={points} // Pass the points array here
        onLogout={handleLogout} // Pass the handleLogout function here
      />
    </>
  );
};

export default ProfilePagePresenter;
