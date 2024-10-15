const debug = require('debug')('server:socket');
let roomData = {};

module.exports.initSockets = function(socket, io){
  
    // ------------------------------
    // Server-side socket listeners
    // ------------------------------
    socket.on('host-room', () => { // Host create room
        
        // Initialise room
        const roomId = require('crypto').randomBytes(2).toString('hex'); // Create room ID
        roomData[roomId] = {
            host: socket,
            playerCount: 0,
            playerSocket: []
        };
        debug('Room created: ' + roomId);
        debug('Host: ' + roomData[roomId].host.toString());
        
        socket.join(roomId);
        socket.emit('room-created', {roomId: roomId});
    });
    
    socket.on('join-room', (data) => {  // Player join room
        if(io.sockets.adapter.rooms.get(data.roomId) === undefined || roomData[data.roomId] === undefined){ // may be redundant
            socket.emit('room-not-found', {roomId: data.roomId});
            return;
        }

        debug('Player joined: ' + data.playerId + "room" + data.roomId);
        socket.join(data.roomId);
        socket.emit('room-joined', {roomId: data.roomId});
        roomData[data.roomId].playerCount++;
        roomData[data.roomId].playerSocket.push({socket: socket, playerId: data.playerId});
        roomData[data.roomId].host.emit('player-joined', {playerId: data.playerId, playerName: data.playerName});

        debug(data.playerId, "joined with socket", socket.id);
    });

    socket.on('start-game', (data) => { // Host start game  

        if(roomData[data.roomId].playerCount < 3){
            roomData[data.roomId].host.emit('player-count-error', {playerCount: roomData[data.roomId].playerCount});
            return
        }

        for (let i = 0; i < data.players.length; i++){
            const player = roomData[data.roomId].playerSocket[i];
            const playerData = data.players.find((e) => e.playerId == player.playerId);

            debug("Attempting to connect", player.playerId);

            if (playerData) {
                debug("Emit game-started to", player.playerId);
                player.socket.emit('game-started', {prompt: playerData.prompt, inkposter:playerData.inkposter,  players:data.playersToClient, theme:data.theme, fake_themes:data.fake_themes});
            } else {
                debug("Failed to emit game-started to", player.playerId);
            }
            
        }
    });

    socket.on('send-canvas', (data) => { // Player send canvas
        debug("Canvas recieved from" + data.playerId);
        roomData[data.roomId].host.emit('receive-canvas', {playerId: data.playerId, canvas: data.canvas});
    });

    socket.on('send-voting', (data) => { // Player send canvas
        debug("Vote recieved from" + data.playerId);
        roomData[data.roomId].host.emit('receive-voting', {playerId: data.playerId, votePlayer: data.votePlayer, voteTheme: data.voteTheme});
    });

    socket.on('end-game', (data) => { // Host end game
        io.to(data.roomId).emit('game-ended');
    });

    socket.on('end-voting', (data) => { // Host end voting
        socket.broadcast.to(data.roomId).emit('voting-ended', {result: data.result});
    });

    socket.on('close-game', (data) => { // Host disconnect server
        try {     
            const c = io.sockets.adapter.rooms.get(data.roomId);
            c.forEach(function(s){
                const clientSocket = io.sockets.sockets.get(s);
                clientSocket.emit('game-closed');
                clientSocket.leave(data.roomId);
            });
            delete roomData[data.roomId];
        } catch (err) {
            debug(err + ' error when deleting room ' + data.roomId);
        }
    });

    socket.on('disconnect', () => { // Player closes 
        for (const room in roomData) {
            // Host left logic
            if (roomData[room].host.id === socket.id) {
                io.to(room).emit('host-left'); // Notify players
                delete roomData[room]; // Clean up the room data
                break;
            }

            // Player left
            const player = roomData[room].playerSocket.find((e) => e.socket.id == socket.id);
            if(player && roomData[room]){
                roomData[room].playerCount--;
                roomData[room].playerSocket.splice(roomData[room].playerSocket.indexOf(player), 1); // delete player
                roomData[room].host.emit('player-left', {playerId: player.playerId});
                debug(player.playerId, "left room", room);
                break;
            }
        }
    });

    socket.on('quit-game', (data) => {
        debug(data.playerId, "left room", data.roomId);
        if (roomData[data.roomId]) {
            roomData[data.roomId].host.emit('player-left', {playerId: data.playerId});
            socket.leave(data.roomId);
        }
    });
    
}