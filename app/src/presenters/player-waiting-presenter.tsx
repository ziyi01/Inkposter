import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerWaitingView from '../views/player-waiting';
import { UserModel } from '../userModel';
import { socket } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface PlayerWaitingProps {
    model: UserModel;
}

const PlayerWaiting: React.FC<PlayerWaitingProps> = ({model}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-started', (data) => {   // Player game started
            debug("Recieved prompt:", data.prompt);
            model.startGamePlayer(data.prompt);
            navigate('/player/game');
        });
        socket.on('host-left', () => {  // Host left room
            model.reset();
            navigate('/');
        });

        return () => {
            socket.off('game-started');
        };
    },[]);

    return <div>
        <PlayerWaitingView />
        Socket: {socket.id}
    </div>
}

export default PlayerWaiting;