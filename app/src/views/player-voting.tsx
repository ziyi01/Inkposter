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
    <div className="player-voting">
      {/* Guess the Theme Section */}
      <div className="guess-theme-section">
        <h1>Guess the Theme</h1>
        <ul className="theme-list">
          {themes.map((theme, index) => (
            <li
              key={index}
              className={`theme-item ${selectedTheme === theme ? 'selected' : ''}`}
              onClick={() => setSelectedTheme(theme)}  // Set the selected theme
              style={{ cursor: 'pointer', fontWeight: selectedTheme === theme ? 'bold' : 'normal' }}
            >
              {theme}
            </li>
          ))}
        </ul>
      </div>

      {/* Vote for the Inkposter Section */}
      <div className="vote-inkposter-section">
        <h1>Vote for the Inkposter</h1>
        <div className="players-list">
          {players.map((player, index) => (
            <div
              key={index}
              className={`player-item ${selectedInkposter === player.name ? 'selected' : ''}`}
              onClick={() => setSelectedInkposter(player.name)}  // Set the selected Inkposter
              style={{ cursor: 'pointer', border: selectedInkposter === player.name ? '2px solid blue' : 'none' }}
            >
              <img
                src={player.profilePicture}
                alt={`${player.name}'s profile`}
                className="player-profile-picture"
              />
              <p>{player.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        Submit Guess
      </button>
    </div>
  );
};

export default PlayerVoting;

