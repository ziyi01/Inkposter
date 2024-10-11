var debug = require('debug')('server:socket');
var roomData = {};

module.exports.initSockets = function(socket, io){
    
    // ------------------------------
    // Server-side socket listeners
    // ------------------------------
    socket.on('host-room', () => { // Host create room
        
        // Initialise room
        roomId = require('crypto').randomBytes(2).toString('hex'); // Create room ID
        roomData[roomId] = {
            host: socket,
            playerCount: 0,
            playerSocket: []
        };
        debug('Room created: ' + roomId);
        debug('Host: ' + socket.id);
        
        socket.join(roomId);
        socket.emit('room-created', {roomId: roomId});
    });
    
    socket.on('join-room', (data) => {  // Player join room
        if(roomData[data.roomId] === undefined){
            socket.emit('room-not-found', {roomId: data.roomId});
            return;
        }
        socket.join(data.roomId);
        roomData[data.roomId].playerCount++;
        roomData[data.roomId].playerSocket.push({socket: socket, playerName: data.playerName});
        roomData.host.emit('player-joined', {playerName: data.playerName});
    });

    socket.on('start-game', (data) => { // Host start game  
        roomData[data.roomId] = {
            players: data.players
        }

        if(roomData[data.roomId].playerCount < 3){
            roomData[data.roomId].host.emit('player-count-error', {playerCount: roomData[data.roomId].playerCount});
            return
        }

        for(let i = 0; i < data.players.length; i++){
            const player = playerSocket[i];
            roomData[data.roomId].player.socket.emit(
                'game-started', {prompt: data.players[i].find((e) => e.playerName == player.playerName).prompt
                });
        }
    });

    socket.on('send-canvas', (data) => { // Player send canvas
        roomData[data.roomId].host.emit('receive-canvas', {playerName: data.playerName, canvas: data.canvas});
    });

    socket.on('end-game', (data) => { // Host end game
        io.to(data.roomId).emit('game-ended');
    });

    socket.on('send-voting', (data) => { // Player send votes
        roomData[data.roomId].host.emit('receive-voting', {playerName: data.playerName, vote: data.vote, themeVote: data.themeVote});
    });

    socket.on('end-voting', (data) => { // Host end voting
        socket.broadcast.to(data.roomId).emit('voting-ended', {result: data.result});
    });

    socket.on('close-game', (data) => { // Host disconnect server
        io.sockets.clients(data.roomId).forEach(function(s){
            s.leave(data.roomId);
        });
        delete roomData[data.roomId];
    });
}