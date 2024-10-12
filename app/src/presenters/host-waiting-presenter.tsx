import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostWaitingView from '../views/host-waiting';
import { UserModel } from '../userModel';
import { hostRoom, startGame, socket } from '../components/socket-client';
var debug = require('debug')('app:host-waiting-presenter');

interface HostWaitingProps {
    model: UserModel;
}

const HostWaiting: React.FC<HostWaitingProps> = ({model}) => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        // Host-side listeners
        socket.on('room-created', (data) => {   // Server answer with roomID
            debug('Room created: ' + data.roomId);
            setRoomCode(data.roomId);
            model.roomId = data.roomId;
        }); 
        socket.on('player-joined', (data) => {  // Player joined room
            debug('Player joined: ' + data.playerName);
            model.addPlayer(data.playerName);
            setPlayerCount(playerCount + 1);
        });
        socket.on('player-count-error', (data) => { 
            debug('Player count error, player count at: ' + data.playerCount);
        });
        hostRoom();
        model.createHostSession(model.roomId);
    }, []);

    async function startGameHost() { // Callback called when host presses start game
        // Validate player count
        if(playerCount < 3) {
            alert('Need at least 3 players to start game!');
            return;
        }
        // TODO: await Generate openAI
        // Process openAI and update model with theme
        
        model.updateGame("sea", []) // Mock theme
        startGame(roomCode, model.sessionHost?.playersData); 
        navigate('/host-ingame'); // Redirect to host-game
    }

    return <div>
        <HostWaitingView roomId={roomCode} players={[]} onStartGame={startGameHost} />;
    </div>
}

export default HostWaiting;
