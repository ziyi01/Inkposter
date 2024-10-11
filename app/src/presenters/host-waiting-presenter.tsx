import React from 'react';
// import components
import HostWaitingView from '../views/host-waiting';
import { UserModel } from '../userModel';
import { endGame } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface HostWaitingProps {
    model: UserModel;
}

const HostWaiting: React.FC<HostWaitingProps> = ({model}) => {

    return (
        <HostWaiting />
    );
}

export default HostWaiting;
