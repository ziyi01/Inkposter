import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import HostWaitingView from '../views/host-waiting';
import { UserModel, playerSession } from '../userModel';
import { hostRoom, startGame, socket } from '../components/socket-client';
import { Player } from '../components/playerInterface';
import server from '../server-requests';

var debug = require('debug')('app:host-waiting-presenter');

interface HostWaitingProps {
    model: UserModel;
}

const HostWaiting: React.FC<HostWaitingProps> = ({model}) => {
    const navigate = useNavigate();
    const [players, setPlayers]  = useState<Player[]>([]);
    const [roomCode, setRoomCode] = useState<string>('');
    
    useEffect(() => {
        // Host-side listeners
        socket.on('room-created', (data) => {   // Server answer with roomID
            debug('Room created: ' + data.roomId);
            setRoomCode(data.roomId);
            model.roomId = data.roomId;
        }); 
        socket.on('player-joined', async (data) => {  // Player joined room
            await model.addPlayer(data.playerId, data.playerName);
            setPlayers([...model.sessionHost.players]);
            debug('Player joined: ' + data.playerName);
        });
        socket.on('player-left', async (data) => {  // Player left room
            model.removePlayer(data.playerId); // Should just be removed if player left
            setPlayers([...model.sessionHost.players]);
            debug("Player left: " + data.playerId);
        });
        socket.on('player-count-error', (data) => { // Player count error from server 
            debug('Player count error, player count at: ' + data.playerCount);
        });

        hostRoom();
        model.createHostSession(model.roomId);

        return () => {
            socket.off('room-created');
            socket.off('player-joined');
            socket.off('player-count-error');
            socket.off('player-left');
        };
    }, []);

    async function startGameHost() { // Callback called when host presses start game
        // Validate player count
        
        if(model.sessionHost.players.length < 3) {
            alert('Need at least 3 players to start game!');
            return;
        }

        /*
        model.updateGame("ocean", [], []);
        startGame(roomCode, model.sessionHost?.playersData); 
        navigate('/host-ingame'); // Redirect to host-game
        */
        server.getGeneratedSessionParams("").then(startGameACB).catch(handleError);
    }

    function startGameACB(sessionParams :{real_theme:string, fake_themes:string[], real_prompts:string[], imposter_prompt:string}) {
        // Randomize inkpostor index
        var imposterIndex = getRandomInt(model.sessionHost.players.length);
        
        // Map prompts and roles to players
        var playerData = [];
        var real_prompt_count = 0;
        for (let i = 0; i < model.sessionHost.players.length ; i++) {
            var playerId = model.sessionHost.players[i].playerId;
            var role;
            var prompt;

            if (i === imposterIndex) {
                role = "Inkposter";
                prompt = sessionParams.imposter_prompt;
            } else {
                role = "Innocent";
                prompt = sessionParams.real_prompts[real_prompt_count];
                real_prompt_count++;
            }
        
            playerData.push({playerId: playerId, prompt: prompt, role: role, connection: true});
        }

        model.updateGame(sessionParams.real_theme, sessionParams.fake_themes, playerData);
        startGame(roomCode, model.sessionHost?.playersData); 

        navigate('/host-ingame'); // Redirect to host-game
    }

    // returns random int, range [0, max)
    function getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
      }

    function handleError(e:Error) {
        // TODO! Alert user that somehting went wrong and they should try again (most probably wrong syntax from openai)
        debug("Something went wrong", e);
    }

    return <div>
        <HostWaitingView code={roomCode} players={players} handleStartGame={startGameHost} />;
    </div>
}

export default HostWaiting;
