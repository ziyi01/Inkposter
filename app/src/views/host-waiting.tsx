import React from 'react';

interface HostWaitingViewProps {
  roomId: string;
  players: string[];
  onStartGame: () => void;
}

const HostWaitingView: React.FC<HostWaitingViewProps> = ({ roomId, players, onStartGame }) => {
  return (
    <div>
      Join room: {roomId}
      {players.map((name) => name)}
      <button onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );

}

export default HostWaitingView;
