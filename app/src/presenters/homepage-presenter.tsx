import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePageView from '../views/homepage';
import { UserModel } from '../userModel';

import { joinRoom, socket } from '../components/socket-client';
const debug = require('debug')('app:homepage-presenter');

interface HomePageProps {
  model: UserModel;
}

const HomePagePresenter: React.FC<HomePageProps> = ({ model }) => {
  const navigate = useNavigate();
  const [isJoinInputVisible, setIsJoinInputVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    socket.on('room-joined', (data) => {
      debug("Room joined:", data.roomId);
      model.setRoomId(data.roomId);
      navigate('/player/game');
    });

    return () => {
      socket.off('room-joined');
    }
  }, []);

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
    joinRoom(joinCode, model.playerId, model.name);
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
