import React from 'react';

interface PlayerSessionEndProps {
  handleQuit: () => void; // Function to handle the quit button
}

const PlayerSessionEndView: React.FC<PlayerSessionEndProps> = ({
  handleQuit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white text-center">
      {/* Result Message */}
      <h1 className="text-2xl font-bold mb-6">LÄGG TILL TEXT FÖR RESULTAT HÄR</h1>

      {/* Waiting Message */}
      <p className="text-lg mb-8 animate-pulse">Waiting for the host to start a new game...</p>

      {/* Quit Button */}
      <button
        onClick={handleQuit}
        className="bg-sky-400 text-white rounded-full py-3 px-8 text-lg"
      >
        Quit
      </button>
    </div>
  );
};

export default PlayerSessionEndView;
