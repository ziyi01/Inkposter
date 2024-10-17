import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostVotingView from '../views/host-voting';
import { UserModel } from '../userModel';
import { votingEnded, socket } from '../components/socket-client';
import Timer from '../components/timer';
var debug = require('debug')('app:host-voting-presenter');

interface HostVotingProps {
    model: UserModel;
}

const HostVoting: React.FC<HostVotingProps> = ({model}) => {
    const [voteCount, setVoteCount] = useState(0);
    const navigate = useNavigate();

    const playerInfo = model.sessionHost.players.reduce((acc: {[key: string]: [string, boolean]}, player) => {
        acc[player.playerId] = [player.name, player.connection];
        return acc;
      }, {});


    useEffect(() => {
        model.initVoting();

        socket.on('receive-voting', (data) => { // Receive player vote
            debug("Recieved vote from", data.playerId, "vote:", data.votePlayer, "guess:", data.voteTheme);
            model.updateVoting(data.playerId, data.votePlayer, data.voteTheme);

            setVoteCount(voteCount => {
                const newVoteCount = voteCount + 1;

                debug("voteCount: ", newVoteCount);
                if (newVoteCount === model.sessionHost?.playersData.length) {
                    const finalResult = model.calculateFinalResult();
                    votingEnded(model.roomId, finalResult);
                    navigate('/host/results');
                }

                return newVoteCount;
              });
        });

        return () => {
            socket.off('receive-voting');
        }
    }, []);

  const handleTimerEnd = () => {
    debug("Timer ended, navigating to results");
    const finalResult = model.calculateFinalResult();
    votingEnded(model.roomId, finalResult);
    navigate('/host/results');
  };

    return (
        <HostVotingView playerCanvases={model.sessionHost.playersData}
        playerInfo={playerInfo}
        timer={<Timer
              initialTime={60}
              onTimerEnd={handleTimerEnd}
            />}
        />
    );
}

export default HostVoting;
