import React, { useEffect, useState } from 'react';

// import components
import HostVotingView from '../views/host-voting';
import { UserModel } from '../userModel';
import { votingEnded, socket } from '../components/socket-client';
var debug = require('debug')('app:host-voting-presenter');

interface HostVotingProps {
    model: UserModel;
}

const HostVoting: React.FC<HostVotingProps> = ({model}) => {
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        socket.on('receive-voting', (data) => { // Receive player vote
            model.updateVoting(data.playerId, data.vote, data.themeVote);
            setVoteCount(voteCount + 1);
            if(voteCount === model.sessionHost?.playersData.length) {
                votingEnded(model.roomId, "results"); // TODO: Process results
            }
        });

        return () => {
            socket.off('receive-voting');
        }
    }, []);
    /*
    */

    return (
        <HostVotingView />
    );
}

export default HostVoting;
