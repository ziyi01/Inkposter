import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerWaitingView from '../views/player-waiting';
import { UserModel } from '../userModel';
import { quitGame, socket } from '../components/socket-client';
import Popup from '../components/popup';
var debug = require('debug')('app:host-game-presenter');

interface PlayerWaitingProps {
    model: UserModel;
}

const PlayerWaiting: React.FC<PlayerWaitingProps> = ({model}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-started', (data) => {   // Player game started
            debug("Recieved prompt:", data.prompt);
            model.startGamePlayer(data.prompt);
            navigate('/player/ingame');
        });
        socket.on('host-left', () => {  // Host left room
            model.reset();
            navigate('/');
        });

        return () => {
            socket.off('game-started');
        };
    },[]);

    // Popup
    const popupRef = useRef<any>(null);

    const handleLeaveClick = () => {
      if (popupRef.current) {
        popupRef.current.openPopup();
      }
    };

    const handleConfirmLeave = () => {
      console.log('Player has confirmed to leave the game.');
      quitGame(model.roomId, model.playerId);
      navigate('/homepage')
    };

    return <div>
        <PlayerWaitingView onLeaveClick={handleLeaveClick}/>
        <Popup
            ref={popupRef}
            title="Leave Game?"
            message="Are you sure you want to leave the game? This action cannot be undone."
            onConfirm={handleConfirmLeave}
        />
    </div>
}

export default PlayerWaiting;