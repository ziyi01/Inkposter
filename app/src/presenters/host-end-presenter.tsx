import React from 'react';
// import components
import HostEndView from '../views/host-game';
import { UserModel } from '../userModel';
import { closeGame } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface HostSessionEndProps {
    model: UserModel;
}

const HostSessionEnd: React.FC<HostSessionEndProps> = ({model}) => {

    return (
        <HostEndView />
    );
}

export default HostSessionEnd;
