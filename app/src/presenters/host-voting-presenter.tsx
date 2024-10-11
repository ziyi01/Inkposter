import React from 'react';
// import components
import HostVotingView from '../views/host-voting';
import { UserModel } from '../userModel';
var debug = require('debug')('app:host-voting-presenter');

interface HostVotingProps {
    model: UserModel;
}

const HostVoting: React.FC<HostVotingProps> = ({model}) => {

    /*
    socket.on('receive-voting', (data) => { // Receive player vote
        model.updateVoting(data.playerName, data.vote, data.themeVote);
    });
    */

    return (
        <HostVotingView />
    );
}

export default HostVoting;
