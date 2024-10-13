import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerWaitingView from '../views/player-waiting';
import { UserModel } from '../userModel';
import { joinRoom, socket } from '../components/socket-client';
var debug = require('debug')('app:host-game-presenter');

interface PlayerWaitingProps {
    model: UserModel;
}

const PlayerWaiting: React.FC<PlayerWaitingProps> = ({model}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-started', (data) => {   // Player game started
            model.startGamePlayer(data.prompt);
            navigate('/player-game');
        });
        
        // Error handling, redirect to homepage
        socket.on('room-not-found', (data) => {
            debug('Room not found: ' + data.roomId);
            navigate('/homepage');
        });

    },[]);

    return <div>
        <PlayerWaitingView />
        Socket: {socket.id}
    </div>
}

export default PlayerWaiting;