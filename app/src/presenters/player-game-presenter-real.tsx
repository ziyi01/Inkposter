import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerGameView from '../views/player-game';
import { UserModel } from '../userModel';
import { sendCanvas, socket } from '../components/socket-client';
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
    function onDraw(canvas:string) {
        sendCanvas(model.roomId, model.name, canvas);
    }

    return <div>
        {/* Merge with other presenter and view */}
    </div>
}

export default PlayerGame;