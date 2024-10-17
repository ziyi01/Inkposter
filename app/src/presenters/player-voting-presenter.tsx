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
    const [themes, setThemes] = useState<string[]>(() => {
        return [model.sessionHost.theme, ...model.sessionHost.fake_themes].sort(() => Math.random() - 0.5);
    });

    useEffect(() => {
        socket.on('voting-ended', (data) => {  // Voting ended at the end of game
            debug("set inkposterVotedOut in model: ", data.inkposterVotedOut);
            model.sessionHost.inkposterVotedOut = (data.inkposterVotedOut);
            model.setProfileStats(data.inkposterVotedOut);
            navigate('/player/results');
        });

        socket.on('host-left', () => {  // Host left room
            model.reset();
            alert("Host disconnected.");
            navigate('/');
        });

        return () => {
            socket.off('voting-ended');
            socket.off('host-left');
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
        model.setOwnVote(voteTheme);
        setVoted(true);
    }

    return <div>
        <PlayerVotingView
            playerId={model.playerId}
            themes={themes}
            players={model.sessionHost.players}
            voted={voted}
            onLeaveClick={handleLeaveClick}
            onSubmitGuess={onVote}
        />
        <Popup
            ref={popupRef}
            title="Leave Game?"
            message="Are you sure you want to leave the game? This action cannot be undone."
            onConfirm={handleConfirmLeave}
        />
    </div>
}

export default PlayerVoting;