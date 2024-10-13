import { closeGame } from "./components/socket-client";

export type Player = {
    id: string;
    name: string;
}

export type playerSession = {
    id: string;
    prompt: string;
    role: string;
    canvas?: string; // Base64 encoded image
}

export type hostSession = {
    players: Player[];
    playersData: playerSession[];
    theme: string;
};

/**
 * Model in the MVP pattern for the application
 */
export class UserModel {
    id: string;
    name: string;
    host: boolean;
    roomId: string;
    sessionHost: hostSession;
    sessionPlayer: playerSession;

    constructor(id='', name='', host: boolean=false) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.roomId = ''; 
        this.sessionHost = {players: [], playersData: [], theme: ""};
        this.sessionPlayer = {id: "", prompt: "", role: ""}; 
    }

    // General functions
    login(id: string, playerName: string) {
        this.id = id;
        this.name = playerName;
    }
    
    setRoomId(roomId:string) {
        this.roomId = roomId;
    }

    // Host
    createHostSession(room:string) {
        if(this.roomId !== '') {
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

    addPlayer(playerId:string, playerName:string) {
        if(this.sessionHost) {
            this.sessionHost.players.push({"id": playerId, "name": playerName});
        }
    }

    getPlayerPrompts() {
        if(!this.host) {
            return [];
        }
        return this.sessionHost.playersData.map(player => {return {"playerId": player.id, "prompt": player.prompt}});
    }

    getPlayer(id:string):string {
        if(this.sessionHost) {
            const player = this.sessionHost.players.find(player => player.id === id);
            if(player) {
                return player.name
            }
        }
        return "None";
    }

    updateGame(theme:string, playerData:[]) { // Update host model theme and players
        if(this.sessionHost) {
            this.sessionHost.theme = theme;
            this.sessionHost.playersData = playerData;
        }
    }

    updateCanvas(playerId:string, canvas:string) { // Receives playerName and canvas-file
        if(this.sessionHost) {
            const player = this.sessionHost.playersData.find(player => player.id === playerId);
            if (player) {
                player.canvas = canvas;
            }
        }
    }

    updateVoting(playerId:string, vote:string, themeVote:string) { // Update model with voting results
        // TODO: Implement
    }

    resetHost() {
        this.host = false;
    }

    // Player
    startGamePlayer(prompt:string) { // Update model with prompt and role
        if(!this.host) { 
            this.sessionPlayer = {
                id: this.id,
                prompt: prompt,
                role: prompt !== '' ? "Innocent" : "Inkposter"
            }
        }
    }
}