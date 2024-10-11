export type playerSession = {
    playerName: string;
    prompt: string;
    role: string;
    canvas?: string; // Base64 encoded image
}

export type hostSession = {
    players: playerSession[];
    theme: string;
};

/**
 * Model in the MVP pattern for the application
 */
export class UserModel {
    id: number | undefined;
    name: string | undefined;
    host: boolean;
    roomId: string | undefined;
    sessionHost: hostSession | undefined;
    sessionPlayer: playerSession | undefined;

    constructor(id=undefined, name=undefined, host: boolean=false) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.roomId = undefined; 
        this.sessionHost = undefined;
        this.sessionPlayer = undefined; 
    }

    login(id: number, playerName: string) {
        this.id = id;
        this.name = playerName;
    }
    
    createHostSession(room:string) {
        this.host = true;
        this.roomId = room
        this.sessionHost = {
            players: [],
            theme: ""
        } as hostSession;
    }

    getRoom() {
        if (!this.roomId) {
            throw Error("No room ID found");
        }
        return this.roomId;
    }

    updateGame() { // Update theme and players

    }

    updateCanvas() { // Receives playerName and canvas-file

    }

    updateVoting() {

    }

    startGameHost() {
        
    }

    startGamePlayer() {

    }

    endVoting() {

    }
}