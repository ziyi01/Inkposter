import React from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostEndView from '../views/host-session-end';
import { UserModel } from '../userModel';
import { closeGame } from '../components/socket-client';
var debug = require('debug')('app:host-end-presenter');

interface HostSessionEndProps {
    model: UserModel;
}

const HostSessionEnd: React.FC<HostSessionEndProps> = ({model}) => {
    const navigate = useNavigate();

    function onEndGame() {
        closeGame(model.roomId); // Close the socket room if the host ends the game
        model.reset();
        navigate('/homepage'); // Navigate to the homepage
    }

    return (
        <div>
            {/* Display HostEndView */}
        </div>
    );
}

export default HostSessionEnd;
