import React from 'react';
import { PlayerCanvas } from '../components/playerInterface';

interface HostGameViewProps {
  playerCanvas: PlayerCanvas[]
  timer: React.ReactNode;
}

const HostGameView: React.FC<HostGameViewProps> = ({ playerCanvas, timer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
      {/* Timer */}
      <div className="absolute top-4 right-4 text-2xl font-bold shadow-md">
        {timer}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 shadow-md">Draw!</h1>

      {/* Player Canvases */}
      <div className="grid grid-cols-4 gap-6">
        {playerCanvas.map(canvasData => (
          <div key={canvasData.playerId} className="flex flex-col items-center">
            <div
              className={`flex h-64 w-36 bg-gray-800 rounded-lg mb-2 shadow-md ${canvasData.connection? "bg-blend-normal" : "bg-blend-overlay"}`}
              style={{ 
                backgroundImage: `url(${canvasData.canvas})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
              }}
            >
              <p className="text-center place-self-center text-white font-bold">{canvasData.connection? "" : "Player Disconnected"}</p>
            </div>
            <p className="text-lg font-semibold shadow-md">{canvasData.playerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostGameView;
