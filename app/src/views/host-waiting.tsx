import React from 'react';
import Button from '../components/button';
import { Player } from '../components/playerInterface';

interface HostWaitingProps {
  code: string;
  players: Player[];
  handleStartGame: () => void;
}

const HostWaitingView: React.FC<HostWaitingProps> = ({ code, players, handleStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white text-center">
      <h1 className="animate-pulse text-2xl font-bold">Waiting for more players to join...</h1>
      <h2 className="text-xl mt-2">
        Code to join: <span className="text-sky-400">{code}</span>
      </h2>

      {/* Player Avatars */}
      <div className="flex justify-center gap-6 my-8">
        {players.length > 0 ? (
          players.map((player) => (
            <div key={player.playerId} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-sky-400 rounded-lg"></div>
              <h4 className="mt-2 text-lg">{player.name}</h4>
            </div>
          ))
        ) : (
          <p>No players joined yet</p>
        )}
      </div>

      {/* Start Game Button */}
      <Button
        onClick={handleStartGame}
      >
        Start Game
      </Button>
    </div>
  );

}

export default HostWaitingView;
