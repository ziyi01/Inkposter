import io from 'socket.io-client';
var debug = require('debug')('app:socket');

export const socket = io();
debug('Socket: ' + socket);

// ------------------------------
// Client-side socket listeners
// ------------------------------
export function initSockets(model) {
    // Player-side listeners
    socket.on('game-started', (data) => {   // Player game started
        model.startGamePlayer(data.prompt);
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

export function closeConnection() {
    socket.close();
}

// ------------------------------
// Export server-side socket emitters
// ------------------------------

// Host-side
export function hostRoom() {
    socket.emit('host-room');
}

export function startGame(roomId, players) {
    // A player has {playerName, prompt}, prompt is "Inkposter" if evil
    socket.emit('start-game', {roomId: roomId, players: players});
}

export function endGame(roomId) {
    socket.emit('end-game', {roomId: roomId});
}

export function closeGame(roomId) {
    socket.emit('close-game', {roomId: roomId});
}

// Player-side
export function joinRoom(roomId, playerName) {
    socket.emit('join-room', {roomId: roomId, playerName: playerName});
}

export function sendCanvas(roomId, playerName, canvas) {
    socket.emit('send-canvas', {roomId: roomId, playerName: playerName, canvas: canvas});
}

export function sendVoting(roomId, playerName, vote, themeVote) {
    socket.emit('send-voting', {roomId: roomId, playerName: playerName, vote: vote, themeVote: themeVote});
}