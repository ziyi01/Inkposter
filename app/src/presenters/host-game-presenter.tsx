import React from 'react';
import HostGameView from '../views/host-game';
import { UserModel } from '../userModel';

interface HostGameProps {
    model: UserModel;
}

const HostGame: React.FC<HostGameProps> = ({model}) => {
    // TODO: Socket logic with player-game-presenter

    return (
        <HostGameView />
    );
}

export default HostGame;
