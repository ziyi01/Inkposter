import React from 'react';

const PlayerWaiting: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold animate-pulse">
        Waiting for host to start game...
      </h1>
    </div>
  );
};

export default PlayerWaiting;