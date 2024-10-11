import React from 'react';
// import components
import HostVotingView from '../views/host-waiting';
import { UserModel } from '../userModel';
import {  } from '../components/socket-client';
var debug = require('debug')('app:host-voting-presenter');

interface HostVotingProps {
    model: UserModel;
}

const HostVoting: React.FC<HostVotingProps> = ({model}) => {

    return (
        <HostVotingView />
    );
}

export default HostVoting;
