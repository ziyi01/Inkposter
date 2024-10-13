import React from 'react';

interface PlayerGameViewProps {
  canvas: React.ReactNode;
}

const PlayerGameView: React.FC<PlayerGameViewProps> = ({ canvas }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      {/* Word */}
      <h1 className="text-3xl font-bold mb-4">
        Your word is <span className="text-red-500">sun</span>
      </h1>
      <h2 className="text-lg mb-8">(You are the inkposter?)</h2>

      {/* Canvas Section */}
      <div>
        {canvas}
      </div>
      
    </div>
  );
};

export default PlayerGameView;

