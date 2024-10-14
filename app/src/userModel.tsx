import { closeGame } from "./components/socket-client";
import { Player }  from "./components/playerInterface";

export type playerSession = {
    playerId: string;
    prompt: string;
    role: string;
    canvas?: string; // Base64 encoded image
}

export type hostSession = {
    players: Player[];
    playersData: playerSession[];
    theme: string;
    fake_themes: string[];
};

/**
 * Model in the MVP pattern for the application
 */
export class UserModel {
    playerId: string;
    name: string;
    host: boolean;
    roomId: string;
    sessionHost: hostSession;
    sessionPlayer: playerSession;

    constructor(playerId='', name='', host: boolean=false) {
        this.playerId= playerId;
        this.name = name;
        this.host = host;
        this.roomId = ''; 
        this.sessionHost = {players: [], playersData: [], theme: "", fake_themes: []};
        this.sessionPlayer = {playerId: "", prompt: "", role: ""}; 
    }

    // General functions
    login(playerId: string, playerName: string) {
        this.playerId = playerId;
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
        this.reset();
    }

    addPlayer(playerId:string, playerName:string) { // Add player to host session
        if(this.sessionHost) {
            this.sessionHost.players.push({"playerId": playerId, "name": playerName, "connection": true});
        }
    }

    removePlayer(playerId:string) { // Remove player from host session
        if(this.sessionHost) {
            const playerIndex = this.sessionHost.players.findIndex(player => player.playerId === playerId);
            if(playerIndex !== -1) {
                this.sessionHost.players.splice(playerIndex, 1);
            }
        }
    }

    // or we could just add it as a part of host-session and add it at param-generation? 
    getPlayerPrompts() {
        if(!this.host) {
            return [];
        }
        return this.sessionHost.playersData.map(player => {return {"playerId": player.playerId, "prompt": player.prompt}});
    }

    getPlayer(playerId:string):string {
        if(this.sessionHost) {
            const player = this.sessionHost.players.find(player => player.playerId === playerId);
            if(player) {
                return player.name
            }
        }
        return "None";
    }

    disconnectedPlayer(playerId:string) { // Set disconnected player's connection to false, use mid-game
        if(this.sessionHost) {
            const player = this.sessionHost.players.find(player => player.playerId === playerId);
            if(player) {
                player["connection"] = false;
            }
        }
    }

    updateGame(theme:string, fake_themes:string[], playerData:playerSession[]) { // Update host model theme and players
        if(this.sessionHost) {
            this.sessionHost.theme = theme;
            this.sessionHost.fake_themes = fake_themes;
            this.sessionHost.playersData = playerData;
        }
    }

    updateCanvas(playerId:string, canvas:string) { // Receives playerName and canvas-file
        if(this.sessionHost) {
            const player = this.sessionHost.playersData.find(player => player.playerId === playerId);
            if (player) {
                player.canvas = canvas;
            }
        }
    }

    updateVoting(playerId:string, vote:string, themeVote:string) { // Update model with voting results
        // TODO: Implement
    }

    reset() {
        this.host = false;
        this.sessionHost = {players: [], playersData: [], theme: "", fake_themes: []};
        this.sessionPlayer = {playerId: "", prompt: "", role: ""};
    }

    // Player
    startGamePlayer(prompt:string) { // Update model with prompt and role
        if(!this.host) { 
            this.sessionPlayer = {
                playerId: this.playerId,
                prompt: prompt,
                role: prompt !== '' ? "Innocent" : "Inkposter"
            }
        }
    }
}