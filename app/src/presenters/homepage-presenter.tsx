import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePageView from '../views/homepage';
import { UserModel } from '../userModel';
import ProfileNavBar from '../components/navbar';

import { joinRoom, socket } from '../components/socket-client';
import Cookies from 'js-cookie';
const debug = require('debug')('app:homepage-presenter');

interface HomePageProps {
    model: UserModel;
}

const HomePagePresenter: React.FC<HomePageProps> = ({ model }) => {

  const navigate = useNavigate();
  const [isJoinInputVisible, setIsJoinInputVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    fillModelData();

    socket.on('room-joined', (data) => {
      debug("Room joined:", data.roomId);
      model.setRoomId(data.roomId);
      navigate('/player');
    });

    socket.on('room-not-found', (data) => {
      debug("Room not found:", data.roomId);
      alert("Room not found.\nCheck that you have the correct code!");
    });

    socket.on('session-already-started', (data) => {
      debug("Session already started:", data.roomId);
      alert("Game already in session! Join the next one :)");
    });

    socket.on('room-full', (data) => {
      debug("Room full:", data.roomId);
      alert("Room full!");
    });

    socket.on('player-exists', () => {  // Player join error
      alert('Player already exists in session');
    });
    
    return () => {
      socket.off('room-joined');
      socket.off('room-not-found');
      socket.off('session-already-started');
      socket.off('room-full');
      socket.off('player-exists');
    }
  }, []);

  const fillModelData = async () => {
    if (Cookies.get('uniqueId') !== model.playerId && Cookies.get('uniqueId') !== undefined) {
      await model.login(Cookies.get('uniqueId')!);
    }
  }

  const handleJoinClick = () => {

    setIsJoinInputVisible(true);
  };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh
    debug('Join Code:', joinCode);
    setIsJoinInputVisible(false);
    
    //game logic
    joinRoom(joinCode, model.playerId, model.name);
  };

  return (
    <>
    <ProfileNavBar/>
        <HomePageView
        model={model}
        isJoinInputVisible={isJoinInputVisible}
        onJoinClick={handleJoinClick}
        joinCode={joinCode}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        />
    </>

  );
};

export default HomePagePresenter;
