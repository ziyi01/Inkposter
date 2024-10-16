import { closeGame } from "./components/socket-client";
import { ensureUserExistsDB, getUserDB, getUserStatsDB } from "./server-requests";
var debug = require('debug')('app:userModel');

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
    name: string;
    host: boolean;
    roomId: string;
    sessionHost: hostSession;
    sessionPlayer: playerSession;

    constructor(id=undefined, name='', host: boolean=false) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.roomId = ''; 
        this.sessionHost = {players: [], playersData: [], theme: ""};
        this.sessionPlayer = {playerName: "", prompt: "", role: ""}; 
    }

    async login(id: number,) {
        this.id = id;
        try {
            // check if user exists or create
            await ensureUserExistsDB(id);
            
            // get persisted userdata
            const userData = await getUserDB(id);
            const userStats = await getUserStatsDB(id);

            debug("userData: ", userData);
            debug("userStats: ", userStats);

            // set data in model
            this.name = userData.username;
            // !!! add after merge: this.previousThemes = userData.previousThemes;

            // !!! add after merge: this.playerStats.scores = userStats.scores;
        } catch {
            // if ok, get user!
        }
    }
    
    setRoomId(roomId:string) {
        this.roomId = roomId;
    }

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

    updateVoting(playerName:string, vote:string, themeVote:string) { // Update model with voting results
        // TODO: Implement
    }

    startGamePlayer(prompt:string) { // Update model with prompt and role
        if(!this.host) { 
            this.sessionPlayer = {
                playerName: this.name,
                prompt: prompt,
                role: prompt !== '' ? "Innocent" : "Inkposter"
            }
        }
    }
}