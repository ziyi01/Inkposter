import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerGameView from '../views/player-game';
import { UserModel } from '../userModel';
import { sendCanvas, socket } from '../components/socket-client';
import Canvas from '../components/canvas';
import Popup from '../components/popup';
import { disconnect } from 'process';
var debug = require('debug')('app:player-game-presenter');

interface PlayerGameProps {
    model: UserModel;
}

const PlayerGame: React.FC<PlayerGameProps> = ({model}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-ended', () => { // Receive signal from server/host that game ended
            navigate('/player/voting');
        });
      socket.on('host-left', () => {  // Host left room
        debug("Host left");
        model.reset();
        navigate('/');
      });

        return () => {
            socket.off('game-ended');
        }
    }, []); 
    
    // Popup
    const popupRef = useRef<any>(null);

    const handleLeaveClick = () => {
      if (popupRef.current) {
        popupRef.current.openPopup();
      }
    };

    const handleConfirmLeave = () => {
      console.log('Player has confirmed to leave the game.');
      navigate('/homepage')
      // Perform leave action, such as navigating or notifying the server
    };

    // TODO: Implement sendCanvas function to pass to sketch-canvas in view
    function onDraw(canvasDataURL:string) {
        sendCanvas(model.roomId, model.name, canvasDataURL);
    }

    return <div>
        <PlayerGameView canvas={<Canvas onDraw={onDraw}/>} onLeaveClick={handleLeaveClick}/>
        <Popup
        ref={popupRef}
        title="Leave Game?"
        message="Are you sure you want to leave the game? This action cannot be undone."
        onConfirm={handleConfirmLeave}
      />
    </div>
}

export default PlayerGame;