import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import PlayerVotingView from '../views/player-voting';
import { UserModel } from '../userModel';
import { sendVoting, quitGame, socket } from '../components/socket-client';
import Popup from '../components/popup';
var debug = require('debug')('app:player-voting-presenter');

interface PlayerVotingProps {
    model: UserModel;
}

const PlayerVoting: React.FC<PlayerVotingProps> = ({model}) => {
    const [voted, setVoted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('voting-ended', (data) => {  // Voting ended at the end of game
            // model.setResult(data.result); // TODO: Implement setResult in UserModel for player-end
        });
        socket.on('host-left', () => {  // Host left room
            model.reset();
            navigate('/');
        });

        return () => {
            socket.off('voting-ended');
        }
    }, []);

   // Popup
   const popupRef = useRef<any>(null);

   const handleLeaveClick = () => {
     if (popupRef.current) {
       popupRef.current.openPopup();
     }
   };

   const handleConfirmLeave = () => {
     debug('Player has confirmed to leave the game.');
     quitGame(model.roomId, model.playerId);
     navigate('/homepage')
   };

    function onVote(votePlayer: string, voteTheme: string) {
        debug(model.playerId, "vote:", votePlayer, "guess:", voteTheme);
        sendVoting(model.roomId, model.playerId, votePlayer, voteTheme);
        setVoted(true);
    }

    return <div>
        <PlayerVotingView
            playerId={model.playerId}
            themes={[model.sessionHost.theme, ...model.sessionHost.fake_themes]}
            players={model.sessionHost.players}
            onLeaveClick={handleLeaveClick}
            onSubmitGuess={onVote}
        />
        <Popup
            ref={popupRef}
            title="Leave Game?"
            message="Are you sure you want to leave the game? This action cannot be undone."
            onConfirm={handleConfirmLeave}
        />
    </div> // TODO: Implement onVote in view
}

export default PlayerVoting;