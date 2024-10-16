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

  function getMessage(): string {
    if (!model.sessionPlayer.inkposter) {
      if ((model.sessionHost.theme === model.sessionPlayer.ownVote) && model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme correct AND you guys caught the Inkposter, good job!';
      }
      if ((model.sessionHost.theme === model.sessionPlayer.ownVote) && !model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme correct! Too bad you guys didn\'t catch the Inkposter.';
      }
      if (!(model.sessionHost.theme === model.sessionPlayer.ownVote) && model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme wrong but you guys caught the Inkposter, so at least you did something right!';
      }
      return 'You guessed the theme wrong AND you guys didn\'t catch the Inkposter, better luck next time.';
    } else {
      // Player is the inkposter
      if ((model.sessionHost.theme === model.sessionPlayer.ownVote) && model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme correct! Too bad you were voted out.';
      }
      if ((model.sessionHost.theme === model.sessionPlayer.ownVote) && !model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme correct AND you were not caught, good job!';
      }
      if (!(model.sessionHost.theme === model.sessionPlayer.ownVote) && !model.sessionHost.inkposterVotedOut) {
        return 'You guessed the theme wrong but you were not caught, so at least you did something right!';
      }
      return 'You guessed the theme wrong AND you were caught, better luck next time!';
    }
  } 


  useEffect(() => {
    socket.on('game-closed', () => { // Receive signal from server/host that game ended
      alert("Host has ended game!");
      model.reset();
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
      <PlayerSessionEndView message={getMessage()} handleQuit={handleConfirmLeave}/>
    </div>
  );
}

export default PlayerEnd;
