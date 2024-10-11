import React from 'react';

// Define the Player type
interface Player {
    id: number;
    name: string;
}

const players: Player[] = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
];

const HostGameView: React.FC = () => {
  return (
    <div>
      <h1>Draw!</h1>
      <div style={styles.gameBoard}>
        {players.map((player) => (
          <div key={player.id} style={styles.playerSquare}>
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles using a JavaScript object for inline CSS
const styles = {
  gameBoard: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  playerSquare: {
    width: '100px',
    height: '100px',
    margin: '10px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    border: '2px solid black',
  },
};

export default HostGameView;
