// props needed: themes, players, onSubmitGuess (handler, send theme and player guess)
import React, { useState } from 'react';

interface Player {
  name: string;
  profilePicture: string;
}

interface PlayerVotingProps {
  themes: string[];  // Array of six themes
  players: Player[]; // Array of players
  onSubmitGuess: (selectedTheme: string, selectedInkposter: string) => void; // Submission handler
}

const PlayerVoting: React.FC<PlayerVotingProps> = ({ themes, players, onSubmitGuess }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);   // Track the selected theme
  const [selectedInkposter, setSelectedInkposter] = useState<string | null>(null); // Track the selected player (Inkposter)

  // Handle submission when both a theme and an Inkposter are selected
  const handleSubmit = () => {
    if (selectedTheme && selectedInkposter) {
      onSubmitGuess(selectedTheme, selectedInkposter);
    } else {
      alert('Please select both a theme and an Inkposter!');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      {/* Guess the Theme Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Guess the Theme</h1>
        <div className="grid grid-cols-3 gap-4">
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
        <h1 className="text-2xl font-bold mb-4">Vote for the Inkposter</h1>
        <div className="flex gap-8 justify-center">
          {players.map((player, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${selectedInkposter === player.name ? 'scale-110' : 'transition-all duration-300 hover:scale-110'}`}
              onClick={() => setSelectedInkposter(player.name)}  // Set the selected Inkposter
              style={{ cursor: 'pointer' }}
            >
              <img
                src={player.profilePicture}
                alt={`${player.name}'s profile`}
                className="w-24 h-24 rounded-md mb-2 bg-blue-400"
              />
              <p>{player.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md"
      >
        Submit Guess
      </button>
    </div>
  );
};

export default PlayerVoting;


