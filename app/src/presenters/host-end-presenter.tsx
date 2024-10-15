import React from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostSessionEndView from '../views/host-session-end';
import { UserModel } from '../userModel';
import { closeGame } from '../components/socket-client';

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
            <HostSessionEndView
                inkposter={model.getPlayer(model.sessionHost.inkposterId)}
                inkposterVotedOut={model.sessionHost.inkposterVotedOut}
                correctTheme={model.sessionHost.theme}
                voteResults={model.sessionHost.voteResults}
                onEndSession={onEndGame}/>
        </div>
    );
}

export default HostSessionEnd;
