import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePageView from '../views/homepage';
import { UserModel } from '../userModel';

// import socket fns
import { joinRoom } from '../components/socket-client';
interface HomePageProps {
   model: UserModel;
}

const HomePagePresenter: React.FC<HomePageProps> = ({ model }) => {

  const [isJoinInputVisible, setIsJoinInputVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinClick = () => { 
    setIsJoinInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value);
  };

  const handleInputBlur = () => {
    setIsJoinInputVisible(false);
    console.log('Join Code:', joinCode);
    //game logic here

  };

  return (
    <HomePageView
        model={model}
        isJoinInputVisible={isJoinInputVisible}
        onJoinClick={handleJoinClick}
        joinCode={joinCode}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
    />
  );

};

export default HomePagePresenter;

