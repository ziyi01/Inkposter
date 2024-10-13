import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePageView from '../views/homepage';
import { UserModel } from '../userModel';

import { joinRoom } from '../components/socket-client';

interface HomePageProps {
  model: UserModel;
}

const HomePagePresenter: React.FC<HomePageProps> = ({ model }) => {
  const navigate = useNavigate();
  const [isJoinInputVisible, setIsJoinInputVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinClick = () => {
    setIsJoinInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh
    console.log('Join Code:', joinCode);
    setIsJoinInputVisible(false);

    //game logic
    joinRoom(joinCode, "me");
    navigate('/player-waiting');
  };

  return (
    <HomePageView
      model={model}
      isJoinInputVisible={isJoinInputVisible}
      onJoinClick={handleJoinClick}
      joinCode={joinCode}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default HomePagePresenter;
