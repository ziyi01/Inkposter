import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerVotingView from '../views/player-voting';
import { UserModel } from '../userModel';
import { sendVoting, socket } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface PlayerVotingProps {
    model: UserModel;
}

const PlayerVoting: React.FC<PlayerVotingProps> = ({model}) => {
    const [voted, setVoted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('voting-ended', (data) => {  // Voting ended at the end of game
            model.setResult(data.result); // TODO: Implement setResult in UserModel for player-end
        });
    }, []);

    function onVote(votePlayer: string, voteTheme: string) {
        sendVoting(model.roomId, model.name, votePlayer, voteTheme);
        setVoted(true);
    }

    return <PlayerVotingView onVote={onVote}/> // TODO: Implement onVote in view
}

export default PlayerVoting;