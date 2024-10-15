import React from 'react';
import Button from '../components/button';
import { Player } from '../components/playerInterface';


interface HostSessionEndViewProps {
  inkposter: string;
  inkposterVotedOut: boolean;
  correctTheme: string;
  voteResults: { playerId: string; name: string; voteCount: number; themeGuess: string; }[];
  onEndSession: () => void; // Callback for when the player clicks "End Session"
}

const HostSessionEndView: React.FC<HostSessionEndViewProps> = ({
  inkposter,
  inkposterVotedOut,
  correctTheme,
  voteResults,
  onEndSession,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white px-8 py-4">

      {/* Inkposter Section */}
      <h1 className="text-2xl font-bold mb-2">
        <span className="text-red-500">{inkposter}</span> was the inkposter.
      </h1>
      <p className="text-lg mb-6">
        {inkposterVotedOut? "Inkposter was voted out!" : "Inkposter won!"}
      </p>

      {/* Theme Section */}
      <h2 className="text-2xl font-bold mb-2">
        The theme was <span className="text-red-500">{correctTheme}</span>.
      </h2>
      <p className="text-lg mb-6">
        It wasn't that difficult.
      </p>

      {/* Results Table */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Results</h3>
        <div className="grid grid-cols-3 text-left mb-4">
          <span className="font-bold">Player</span>
          <span className="font-bold">Votes</span>
          <span className="font-bold">Guess</span>
        </div>
        {voteResults.map((player) => (
          <div key={player.playerId} className="grid grid-cols-3 mb-2">
            <span>{player.name}</span>
            <span>{player.voteCount}</span>
            <span>{player.themeGuess}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
         {/* 
        <Button onClick={onPlayAgain}>
          Play again
        </Button>
         */}
        
        <Button onClick={onEndSession}>
          End Session
        </Button>
      </div>
    </div>
  );
};

export default HostSessionEndView;

