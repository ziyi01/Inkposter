import io from 'socket.io-client';
var debug = require('debug')('app:socket');

export const socket = io();
debug('Socket: ' + socket);

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

export function startGame(roomId:string, players: {playerName: string, prompt: string}[]) {
    // A player has {playerName, prompt}, prompt is '' or "inkposter" if evil
    socket.emit('start-game', {roomId: roomId, players: players});
}

export function votingEnded(roomId:string, result:string) {
    socket.emit('end-voting', {roomId: roomId, result: result});
}

export function endGame(roomId:string) {
    socket.emit('end-game', {roomId: roomId});
}

export function closeGame(roomId:string) {
    socket.emit('close-game', {roomId: roomId});
}

// Player-side
export function joinRoom(roomId:string, playerName:string) {
    socket.emit('join-room', {roomId: roomId, playerName: playerName});
}

export function sendCanvas(roomId:string, playerName:string, canvas:string) {
    socket.emit('send-canvas', {roomId: roomId, playerName: playerName, canvas: canvas});
}

export function sendVoting(roomId:string, playerName:string, vote:string, themeVote:string) {
    socket.emit('send-voting', {roomId: roomId, playerName: playerName, vote: vote, themeVote: themeVote});
}