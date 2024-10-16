import React from 'react';

interface PlayerGameViewProps {
  canvas: React.ReactNode;
  onLeaveClick: () => void;
  prompt: string;
  name: string;
  inkposter: boolean;
}

const PlayerGameView: React.FC<PlayerGameViewProps> = ({ canvas, onLeaveClick, prompt, name,inkposter }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white p-8 pt-16 relative">
      {/* Leave Game */}
      <button
        className="bg-red-500 text-white py-1 px-2 rounded absolute top-4 left-4"
        onClick={onLeaveClick}
      >
        Leave Game
      </button>

      {/* Word */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        {name}, your word is <span className="text-red-500">{prompt}</span>
      </h1>
      {inkposter && (<h2 className="text-lg font-semibold mb-2">You are the <span className="text-red-500">inkposter</span></h2>)}

      {/* Canvas Section */}
      <div>
        {canvas}
      </div>
      
    </div>
  );
};

export default PlayerGameView;

