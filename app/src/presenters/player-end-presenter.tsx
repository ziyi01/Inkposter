import React, { useEffect } from 'react';
import { socket, quitGame } from '../components/socket-client';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../userModel';
import PlayerSessionEndView from '../views/player-session-end';
const debug = require('debug')('app:player-end-presenter');

interface PlayerEndProps {
  model: UserModel;
}

const PlayerEnd: React.FC<PlayerEndProps> = ({model}) => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('game-closed', () => { // Receive signal from server/host that game ended
      // TODO: User feedback that host has ended the game
      navigate('/homepage');

      return () => {
        socket.off('game-closed');
      }
    });
  }, []); 

  const handleConfirmLeave = () => {
    debug('Player has confirmed to leave the game.');
    quitGame(model.roomId, model.playerId);
    navigate('/homepage')
  };

  return (
    <div>
      <PlayerSessionEndView handleQuit={handleConfirmLeave}/>
    </div>
  );
}

export default PlayerEnd;
