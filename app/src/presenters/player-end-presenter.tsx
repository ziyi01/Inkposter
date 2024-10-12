import React, { useEffect } from 'react';
import { socket } from '../components/socket-client';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../userModel';

interface PlayerEndProps {
  model: UserModel
}

const PlayerEnd: React.FC<PlayerEndProps> = (model) => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('game-closed', () => { // Receive signal from server/host that game ended
      // TODO: User feedback that host has ended the game
      navigate('/homepage');
    });
  }, []); 


  return (
    <div>
      {/* Component logic will go here */}
    </div>
  );
}

export default PlayerEnd;
