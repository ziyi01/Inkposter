import React from 'react';
import { playerSession } from '../userModel';

interface HostVotingProps {
  playerCanvases: playerSession[];
  playerNames: {[key: string]: string};
  timer: React.ReactNode;
}

const HostVoting: React.FC<HostVotingProps> = ({ playerCanvases, playerNames, timer }) => {
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
              className="h-64 w-36 bg-sky-400 rounded-lg mb-2"
              style={{ 
                backgroundImage: `url(${canvasData.canvas})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            />
            <p className="text-lg font-semibold">{playerNames[canvasData.playerId]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostVoting;
