import React from 'react';

interface PlayerGameViewProps {
  onLeaveClick: () => void;
}

const PlayerWaiting: React.FC<PlayerGameViewProps> = ({onLeaveClick}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white relative">

      {/* Leave Game */}
      <button
        className="bg-red-500 text-white py-1 px-2 rounded absolute top-4 left-4"
        onClick={onLeaveClick}
      >
        Leave Game
      </button>

      {/* Text */}
      <h1 className="text-3xl font-bold animate-pulse text-center">
        Waiting for host to start game...
      </h1>
    </div>
  );
};

export default PlayerWaiting;