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
        roomData[data.roomId].host.emit('player-joined', {playerName: data.playerName});

        debug(data.playerName, "joined with socket", socket.id);
    });

    socket.on('start-game', (data) => { // Host start game  

        // ??? this caused playerSocket to be wiped out, I don't understand the purpose
        /* 
        roomData[data.roomId] = {
            players: data.players
        }
        */

        if(roomData[data.roomId].playerCount < 3){
            roomData[data.roomId].host.emit('player-count-error', {playerCount: roomData[data.roomId].playerCount});
            return
        }

        for(let i = 0; i < data.players.length; i++){
            const player = roomData[data.roomId].playerSocket[i]; //playerSocket[i]; <-- playerSocket is not defined
            player.socket.emit(
                'game-started', {prompt: data.players.find((e) => e.playerName == player.playerName).prompt});
                //'game-started', {prompt: "test"});
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
        try {     
            const c = io.sockets.adapter.rooms.get(data.roomId);
            c.forEach(function(s){
                const clientSocket = io.sockets.sockets.get(s);
                clientSocket.emit('game-closed');
                clientSocket.leave(data.roomId);
                console.log(clientSocket)
            });
            delete roomData[data.roomId];
        } catch (err) {
            debug(err + ' error when deleting room ' + data.roomId);
        }
    });
}