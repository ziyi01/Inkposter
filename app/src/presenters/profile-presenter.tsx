import React, { useState } from 'react';
import ProfilePageView from '../views/profile';
import NavBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

interface ProfilePresenterProps {
  handleLogout: (isAuthenticated: boolean) => void; // Define the handleLogout prop
}

const ProfilePagePresenter: React.FC<ProfilePresenterProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [name] = useState<string>('John Doe'); // Use state for the name
  const points = [
    { title: 'Point 1', value: 'Value 1' },
    { title: 'Point 2', value: 'Value 2' },
    { title: 'Point 3', value: 'Value 3' },
    { title: 'Point 4', value: 'Value 4' },
  ];

  const onLogout = () => {
    handleLogout(false);
    navigate("/login");
  };

  return (
    <div>
      <ProfilePageView
        name={name} // Pass the name variable here
        points={points} // Pass the points array here
        onLogout={onLogout} // Pass the handleLogout function here
      />
    </div>
  );
};

export default ProfilePagePresenter;
