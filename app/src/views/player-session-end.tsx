import React from 'react';
import Button from '../components/button';

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
      <Button
        onClick={handleQuit}
      >
        Quit
      </Button>
    </div>
  );
};

export default PlayerSessionEndView;
