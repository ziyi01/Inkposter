// props needed: themes, players, onSubmitGuess (handler, send theme and player guess)
import React, { useState } from 'react';
import Button from '../components/button';
import { Player } from '../components/playerInterface';

interface PlayerVotingProps {
  playerId: string;
  themes: string[];
  players: Player[];
  onLeaveClick: () => void;
  onSubmitGuess: (selectedInkposter: string, selectedTheme: string) => void; // Submission handler
}

const PlayerVotingView: React.FC<PlayerVotingProps> = ({ playerId, themes, players, onLeaveClick, onSubmitGuess }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);   // Track the selected theme
  const [selectedInkposter, setSelectedInkposter] = useState<string | null>(null); // Track the selected player (Inkposter)

  // Handle submission when both a theme and an Inkposter are selected
  const handleSubmit = () => {
    if (selectedTheme && selectedInkposter) {
      onSubmitGuess(selectedInkposter, selectedTheme);
    } else {
      alert('Please select both a theme and an Inkposter!');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-white p-8 pt-16 relative">

      {/* Leave Game */}
      <button
        className="bg-red-500 text-white py-1 px-2 rounded absolute top-4 left-4"
        onClick={onLeaveClick}
      >
        Leave Game
      </button>

      {/* Guess the Theme Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Guess the Theme</h1>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme, index) => (
            <button
              key={index}
              className={`py-4 px-8 rounded-md bg-gray-300 text-black font-semibold ${selectedTheme === theme ? 'scale-110' : 'transition-all duration-300 hover:scale-110'}`}
              onClick={() => setSelectedTheme(theme)}  // Set the selected theme
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Vote for the Inkposter Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Vote for the Inkposter</h1>
        <div className="grid grid-cols-4 gap-4">
          {players.map((player, playerId) => (
            <div
              key={playerId}
              className={`flex flex-col items-center ${selectedInkposter === player.playerId ? 'scale-110' : 'transition-all duration-300 hover:scale-110'}`}
              onClick={() => setSelectedInkposter(player.playerId)}  // Set the selected Inkposter
              style={{ cursor: 'pointer' }}
            >
              <img
                /*src={/player.profilePicture}*/
                alt={`${player.name}'s profile`}
                className="w-24 h-24 rounded-md mb-2 bg-blue-400"
              />
              <p>{player.playerId === `${playerId}` ? `${player.name} (You)` : player.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="py-1 px-2 rounded absolute top-4 right-4 bg-blue-500 hover:bg-blue-600"
        type="button"
        onClick={handleSubmit}
      >
        Submit Guess
      </Button>
    </div>
  );
};

export default PlayerVotingView;


