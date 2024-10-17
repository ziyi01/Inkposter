// props needed: themes, players, onSubmitGuess (handler, send theme and player guess)
import React, { useState } from 'react';
import { BiCheck } from "react-icons/bi";
import { GiCharacter } from "react-icons/gi";
import Button from '../components/button';
import { Player } from '../components/playerInterface';

interface PlayerVotingProps {
  playerId: string;
  themes: string[];
  players: Player[];
  voted: boolean;
  onLeaveClick: () => void;
  onSubmitGuess: (selectedInkposter: string, selectedTheme: string) => void; // Submission handler
}

const PlayerVotingView: React.FC<PlayerVotingProps> = ({ playerId, themes, players, voted, onLeaveClick, onSubmitGuess }) => {
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
        <p className="drop-shadow-md">Leave Game</p>
      </button>

      {/* Submit Button */}
      <Button
        className={`py-1 px-2 rounded absolute top-4 right-4 ${
          voted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
        type="button"
        onClick={handleSubmit}
        disabled={voted} // Disable the button if voted is true
      >
        <p className="drop-shadow-md">Submit Guess</p>
      </Button>

      {/* Guess the Theme Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Guess the Theme</h1>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`relative py-4 px-8 rounded-md bg-gray-400 font-semibold
                          ${selectedTheme === theme ?
                            "scale-110 bg-sky-500" :
                            "transition-all duration-300 hover:scale-110"}`}
              onClick={() => setSelectedTheme(theme)}  // Set the selected theme
              disabled={voted} // Disable the button if voted is true
            >
              {voted && selectedTheme === theme && (
                <span className="absolute -top-2 -left-2">
                  <BiCheck color="green" className="size-7 bg-white rounded-full drop-shadow-md"/>
                </span>
              )}
              <p className="drop-shadow-sm">{theme}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Vote for the Inkposter Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Vote for the Inkposter</h1>
        <div className="grid grid-cols-4 gap-4">
          {players.map((player, playerId) => (
            <button
              key={playerId}
              className={`flex flex-col items-center
                          ${selectedInkposter === player.playerId ?
                            "scale-110" :
                            "transition-all duration-300 hover:scale-110"}
                        `}
              onClick={() => setSelectedInkposter(player.playerId)}  // Set the selected Inkposter
              disabled={voted} // Disable the button if voted is true
            >
              <div className={`w-24 h-24 bg-gray-400 rounded-lg drop-shadow-md 
                              ${selectedInkposter === player.playerId ?
                              "bg-sky-500" : ""}`}>
                <GiCharacter className="w-full h-full"/>
              </div>
              <p>{player.playerId === `${playerId}` ? `${player.name} (You)` : player.name}</p>
              {voted && selectedInkposter === player.playerId && (
                <span className="absolute -top-2 -left-2">
                  <BiCheck color="green" className="size-7 bg-white rounded-full drop-shadow-md"/>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerVotingView;


