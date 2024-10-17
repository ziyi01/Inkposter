import React from 'react';
import { BiCheck } from "react-icons/bi";
import { playerSession } from '../userModel';

interface HostVotingProps {
  playerCanvases: playerSession[];
  playerInfo: {[key: string]: [string, boolean]}; // key: playerId, values: [playerName, connection]
  timer: React.ReactNode;
}

const HostVotingView: React.FC<HostVotingProps> = ({ playerCanvases, playerInfo, timer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
      {/* Timer */}
      <div className="absolute top-4 right-4 text-2xl font-bold">
        {timer}
      </div>

      <h1 className='text-3xl font-bold mb-8'>
        Guess the theme!
      </h1>
      <h1 className='text-3xl font-bold mb-8'>
        Vote for the Inkposter!
      </h1>
      {/* Player Canvases */}
      <div className="grid grid-cols-4 gap-6">
        {playerCanvases.map(canvasData => (
          <div key={canvasData.playerId} className="flex flex-col items-center">
            <div
              className={`flex h-64 w-36 bg-gray-800 rounded-lg mb-2 shadow-md 
              ${playerInfo[canvasData.playerId][1]? 
                "bg-blend-normal" : 
                "bg-blend-overlay"}`}
              style={{ 
                backgroundImage: `url(${canvasData.canvas})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}>
              <p className="text-center place-self-center text-white font-bold">
                {playerInfo[canvasData.playerId][1]? "" : "Player Disconnected"}
                </p>
            </div>
            <p className="text-lg font-semibold">{playerInfo[canvasData.playerId][0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostVotingView;
