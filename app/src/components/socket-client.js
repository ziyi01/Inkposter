import io from 'socket.io-client';
require('debug')('app:socket');

var socket = io();
var roomId = '';
debug('Socket: ' + socket);

// ------------------------------
// Client-side socket listeners
// ------------------------------
export function initSockets(model) {
    // Host-side listeners
    socket.on('room-created', (data) => {   // Server answer with roomID
        debug('Room created: ' + data.roomId);
        roomId = data.roomId;
    }); 
    socket.on('player-joined', (data) => {  // Player joined room
        debug('Player joined: ' + data.playerName);

    });
    socket.on('receive-canvas', (data) => { // Receive player canvas
        model.updateCanvas(data.playerName, data.canvas);
    });
    socket.on('receive-voting', (data) => { // Receive player vote
        model.updateVoting(data.playerName, data.vote, data.themeVote);
    });

    // Player-side listeners
    socket.on('game-started', (data) => {   // Player game started
        model.startGame(data.prompt);
    });
    socket.on('voting-ended', (data) => {   // Voting ended at the end of game
        model.endVoting(data.result);
    });

    // Error handling
    socket.on('room-not-found', (data) => {
        debug('Room not found: ' + data.roomId);
    });

    socket.on('player-count-error', (data) => { 
        debug('Player count error, player count at: ' + data.playerCount);
    });
}

// ------------------------------
// Export server-side socket emitters
// ------------------------------

// Host-side
export function hostRoom() {
    socket.emit('host-room');
}

export function startGame(players) {
    // A player has {playerName, prompt}, prompt is "Inkposter" if evil
    socket.emit('start-game', {roomId: roomId, players: players});
}

export function endGame() {
    socket.emit('end-game', {roomId: roomId});
}

export function closeGame() {
    socket.emit('close-game', {roomId: roomId});
}

// Player-side
export function joinRoom(roomId, playerName) {
    socket.emit('join-room', {roomId: roomId, playerName: playerName});
}

export function sendCanvas(playerName, canvas) {
    socket.emit('send-canvas', {roomId: roomId, playerName: playerName, canvas: canvas});
}

export function sendVoting(playerName, vote, themeVote) {
    socket.emit('send-voting', {roomId: roomId, playerName: playerName, vote: vote, themeVote: themeVote});
}