import io from 'socket.io-client';
import { Player, PlayerCanvas } from "./playerInterface";
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

export function startGame(roomId:string, players: {playerId: string, prompt: string, inkposter: boolean}[], playersToClient:Player[], theme:string, fake_themes:string[]) {
    socket.emit('start-game', {roomId: roomId, players: players, playersToClient: playersToClient, theme:theme, fake_themes:fake_themes});
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
export function joinRoom(roomId:string, playerId:string, playerName:string) {
    socket.emit('join-room', {roomId: roomId, playerId: playerId, playerName: playerName});
}

export function sendCanvas(roomId:string, playerId:string, canvas:string) {
    socket.emit('send-canvas', {roomId: roomId, playerId: playerId, canvas: canvas});
}

export function sendVoting(roomId:string, playerId:string, votePlayer:string, voteTheme:string) {
    socket.emit('send-voting', {roomId: roomId, playerId: playerId, votePlayer: votePlayer, voteTheme: voteTheme});
}

export function quitGame(roomId:string, playerId:string) {
    socket.emit('quit-game', {roomId: roomId, playerId: playerId});
}