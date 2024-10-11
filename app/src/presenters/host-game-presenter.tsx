import React from 'react';
// import components
import HostGameView from '../views/host-game';
import { UserModel } from '../userModel';
import { endGame } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface HostGameProps {
    model: UserModel;
}

const HostGame: React.FC<HostGameProps> = ({model}) => {

    return (
        <HostGameView />
    );
}

export default HostGame;
