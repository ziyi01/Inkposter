import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerGameView from '../views/player-game';
import { UserModel } from '../userModel';
import { sendCanvas, socket } from '../components/socket-client';
import Canvas from '../components/canvas';
var debug = require('debug')('app:player-game-presenter');

interface PlayerGameProps {
    model: UserModel;
}

const PlayerGame: React.FC<PlayerGameProps> = ({model}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-ended', () => { // Receive signal from server/host that game ended
            navigate('/player-voting');
        });
    }, []); 

    // TODO: Implement sendCanvas function to pass to sketch-canvas in view
    function onDraw(canvasDataURL:string) {
        sendCanvas(model.roomId, model.name, canvasDataURL);
    }

    return <div>
        <PlayerGameView canvas={<Canvas onDraw={onDraw}/>}/>
    </div>
}

export default PlayerGame;