import React from 'react';
import Button from '../components/button';

interface Player {
  name: string;
  profilePicture: string;
  votesAsInkposter: number; // Number of players that voted this player as inkposter
  guessedTheme: string; // What theme this player guessed
}

interface HostSessionEndProps {
  inkposter: Player; // The actual inkposter player
  majorityVotedInkposter: boolean; // Whether the majority guessed the inkposter
  playerWon: boolean; // Whether the local player won or not
  playerIsInkposter: boolean; // Whether the local player was the inkposter
  correctTheme: string; // The actual correct theme of the game
  inkposterTheme: string; // The inkposter's theme
  playerGuessedThemeCorrect: boolean; // Whether the local player guessed the theme correctly
  players: Player[]; // The list of players, with their votes and guesses
  onPlayAgain: () => void; // Callback for when the player clicks "Play Again"
  onEndSession: () => void; // Callback for when the player clicks "End Session"
}

const HostSessionEnd: React.FC<HostSessionEndProps> = ({
  inkposter,
  majorityVotedInkposter,
  playerIsInkposter,
  playerWon,
  correctTheme,
  inkposterTheme,
  playerGuessedThemeCorrect,
  players,
  onPlayAgain,
  onEndSession,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white px-8 py-4">
      {/* Inkposter Section */}
      <h1 className="text-2xl font-bold mb-2">
        <span className="text-red-500">{inkposter.name}</span> was the inkposter.
      </h1>
      <p className="text-lg mb-6">
        {playerIsInkposter
          ? playerWon
            ? "Good job fooling your friends!"
            : "Better luck next time."
          : playerWon
          ? "Good job finding the inkposter!"
          : "Better luck next time."}
      </p>

      {/* Theme Section */}
      <h2 className="text-2xl font-bold mb-2">
        The theme was <span className="text-red-500">{correctTheme}</span>.
      </h2>
      <p className="text-lg mb-6">
        {playerGuessedThemeCorrect ? (
          "Good job!"
        ) : (
          <>
            Seriously? It wasn't that difficult. The inkposter had the theme{" "}
            <span className="text-red-500">{inkposterTheme}</span>.
          </>
        )}
      </p>

      {/* Results Table */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Results</h3>
        <div className="grid grid-cols-3 text-left mb-4">
          <span className="font-bold">Player</span>
          <span className="font-bold">Votes</span>
          <span className="font-bold">Guess</span>
        </div>
        {players.map((player) => (
          <div key={player.name} className="grid grid-cols-3 mb-2">
            <span>{player.name}</span>
            <span>{player.votesAsInkposter}</span>
            <span>{player.guessedTheme}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={onPlayAgain}
        >
          Play again
        </Button>
        <Button
          onClick={onEndSession}
        >
          End Session
        </Button>
      </div>
    </div>
  );
};

export default HostSessionEnd;

