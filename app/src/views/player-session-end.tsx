import React from 'react';
import Button from '../components/button';

interface PlayerSessionEndProps {
  message: string;
  handleQuit: () => void; // Function to handle the quit button
}

const PlayerSessionEndView: React.FC<PlayerSessionEndProps> = ({
  message,
  handleQuit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white text-center">
      {/* Result Message */}
      <h1 className="text-2xl font-bold mb-6">{message}</h1>


      <p className="text-lg mb-8">You can find you game-stats on your profile.</p>

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
