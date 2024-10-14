import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostGameView from '../views/host-game';
import { UserModel } from '../userModel';
import { endGame, socket } from '../components/socket-client';
import Timer from '../components/timer';
import { PlayerCanvas } from '../components/playerInterface';
var debug = require('debug')('app:host-game-presenter');

interface HostGameProps {
    model: UserModel;
}

const HostGame: React.FC<HostGameProps> = ({model}) => {
  /**
   * Example base64
   * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
  */
   const navigate = useNavigate();
   const [playerCanvas, setCanvas] = useState<PlayerCanvas[]>([]); // Filled with base64-encoded images 

   useEffect(() => {
    // Update when model.updateCanvas is called from player
    socket.on('receive-canvas', (data) => { // Receive a player's canvas
      model.updateCanvas(data.playerId, data.canvas); 
      setCanvas([...playerCanvas, {"playerId": data.playerId, playerName: model.getPlayer(data.playerId), "canvas": data.canvas, "connection": true}]);
    });
     socket.on('player-left', async (data) => {  // Player left room
      model.disconnectedPlayer(data.playerId);
      debug("Player left mid-game: " + data.playerId);
      const index = playerCanvas.findIndex(player => player.playerName === model.getPlayer(data.playerId));
      setCanvas([...playerCanvas.splice(index, 1, {"playerId": data.playerId, playerName: model.getPlayer(data.playerId), "canvas": "", "connection": false})]);
    });

    return () => {
      socket.off('receive-canvas');
    }
    }, []);

  // Navigate to the voting screen when the timer ends
  const handleTimerEnd = useCallback(() => {
    endGame(model.roomId);
    navigate('/host/voting');
  }, [model.roomId, navigate]);

  return (
    <div>
      <HostGameView 
        playerCanvas={playerCanvas}
        timer={
          <Timer
            initialTime={120}
            onTimerEnd={handleTimerEnd}
          />
        }
      />
      Canvas: {playerCanvas.toString()}
    </div>
  );
}

export default HostGame;
