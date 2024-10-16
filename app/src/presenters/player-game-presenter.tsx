import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerGameView from '../views/player-game';
import { UserModel } from '../userModel';
import { sendCanvas, quitGame, socket } from '../components/socket-client';
import Canvas from '../components/canvas';
import Popup from '../components/popup';
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
        alert("Host disconnected.");
        navigate('/');
      });

        return () => {
          socket.off('game-ended');
          socket.off('host-left');
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
      debug('Player has confirmed to leave the game.');
      quitGame(model.roomId, model.playerId);
      navigate('/homepage')
    };

    // TODO: Implement sendCanvas function to pass to sketch-canvas in view
    function onDraw(canvasDataURL:string) {
        sendCanvas(model.roomId, model.playerId, canvasDataURL);
    }

    return <div>
        <PlayerGameView
            canvas={<Canvas onDraw={onDraw}/>}
            onLeaveClick={handleLeaveClick}
            prompt={model.sessionPlayer.prompt}
            name={model.name}
            inkposter={model.sessionPlayer.inkposter}
        />
        <Popup
            ref={popupRef}
            title="Leave Game?"
            message="Are you sure you want to leave the game? This action cannot be undone."
            onConfirm={handleConfirmLeave}
        />
    </div>
}

export default PlayerGame;