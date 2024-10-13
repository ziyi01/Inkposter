import React from 'react';

interface HostGameViewProps {
  playerCanvas: {} // Change in presenter to fit Player[]
  timer: number; // Timer passed from the presenter
}

const HostGameView: React.FC<HostGameViewProps> = ({ playerCanvas, timer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* Timer */}
      <div className="absolute top-4 right-4 text-2xl font-bold">
        {timer > 0 
          ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
          : '0:00'}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Draw!</h1>

      {/* Player Canvases */}
      <div className="flex gap-6">
        {Object.entries(playerCanvas).map(([playerName, canvasData]) => (
          <div key={playerName} className="flex flex-col items-center">
            <div
              className="w-64 h-40 bg-sky-400 rounded-lg mb-2"
              style={{ 
                backgroundImage: `url(${canvasData})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            />
            <p className="text-lg font-semibold">{playerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostGameView;
