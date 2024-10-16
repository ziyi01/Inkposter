import React from 'react';
import { GiCharacter } from "react-icons/gi";
import Button from '../components/button';
import { Player } from '../components/playerInterface';

interface HostWaitingProps {
  code: string;
  players: Player[];
  handleStartGame: () => void;
}

const HostWaitingView: React.FC<HostWaitingProps> = ({ code, players, handleStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white text-center relative">
      <h1 className="text-xl text-gray-200 mt-2 p-3 bg-gray-800 rounded-md border border-sky-800 shadow-md top-8 absolute">
        Code to join: <span className="text-sky-400 font-bold">{code}</span>
      </h1>

      <h1 className="animate-pulse text-3xl font-bold shadow-md">Waiting for more players to join...</h1>
      

      {/* Player Avatars */}
      <div className="grid grid-cols-4 gap-6 my-8">
        {players.length > 0 ? (
          players.map((player) => (
            <div key={player.playerId}>
              <div className="w-24 h-24 bg-sky-400 rounded-lg shadow-md"><GiCharacter className="w-full h-full"/></div>
              <h4 className="mt-2 text-lg shadow-md">{player.name}</h4>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center shadow-md">No players joined yet</p>
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
