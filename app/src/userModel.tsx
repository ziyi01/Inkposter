import { closeGame } from "./components/socket-client";

export type playerSession = {
    playerName: string;
    prompt: string;
    role: string;
    canvas?: string; // Base64 encoded image
}

export type hostSession = {
    players: string[];
    playersData: playerSession[];
    theme: string;
};

/**
 * Model in the MVP pattern for the application
 */
export class UserModel {
    id: number | undefined;
    name: string | undefined;
    host: boolean;
    roomId: string;
    sessionHost: hostSession | undefined;
    sessionPlayer: playerSession | undefined;

    constructor(id=undefined, name=undefined, host: boolean=false) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.roomId = ''; 
        this.sessionHost = undefined;
        this.sessionPlayer = undefined; 
    }

    login(id: number, playerName: string) {
        this.id = id;
        this.name = playerName;
    }
    
    createHostSession(room:string) {
        if(this.roomId != '') {
            closeGame(this.roomId);
        }

        this.host = true;
        this.roomId = room
        this.sessionHost = {
            players: [],
            playersData: [],
            theme: ""
        };
    }

    addPlayer(playerName:string) {
        if(this.sessionHost) {
            this.sessionHost.players.push(playerName);
        }
    }

    updateGame(theme:string, playerData:[]) { // Update host model theme and players
        if(this.sessionHost) {
            this.sessionHost.theme = theme;
            this.sessionHost.playersData = playerData;
        }
    }

    updateCanvas(playerName:string, canvas:string) { // Receives playerName and canvas-file
        if(this.sessionHost) {
            const player = this.sessionHost.playersData.find(player => player.playerName === playerName);
            if (player) {
                player.canvas = canvas;
            }
        }
    }

    updateVoting() { // Update model with voting results

    }

    startGamePlayer() { // Update model with prompt and role
        if(!this.host) {

        }
    }

    endVoting() { //

    }
}