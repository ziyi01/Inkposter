import React from 'react';
import { PlayerCanvas } from '../components/playerInterface';

interface HostVotingProps {
  playerCanvas: PlayerCanvas[];
}

const HostVoting: React.FC<HostVotingProps> = ({ playerCanvas }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
      <h1>
        Guess the theme!
      </h1>
      <h1>
        Vote for the Inkposter!
      </h1>
      {/* Player Canvases */}
      <div className="grid grid-cols-4 gap-6">
        {playerCanvas.map(canvasData => (
          <div key={canvasData.playerId} className="flex flex-col items-center">
            <div
              className="h-64 w-36 bg-sky-400 rounded-lg mb-2"
              style={{ 
                backgroundImage: `url(${canvasData.canvas})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            />
            <p className="text-lg font-semibold">{canvasData.playerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostVoting;
