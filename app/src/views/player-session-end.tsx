import React from 'react';

interface PlayerSessionEndProps {
  message: string;  // Pre-computed message by the presenter
  handleQuit: () => void; // Function to handle the quit button
}

const PlayerSessionEnd: React.FC<PlayerSessionEndProps> = ({
  message,
  handleQuit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      {/* Result Message */}
      <h1 className="text-2xl font-bold mb-6">{message}</h1>

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

export default PlayerSessionEnd;
