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
    fake_themes: string[];
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
        this.sessionHost = {players: [], playersData: [], theme: "", fake_themes: []};
        this.sessionPlayer = {playerName: "", prompt: "", role: ""}; 
    }

    login(id: number, playerName: string) {
        this.id = id;
        this.name = playerName;
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
            theme: "",
            fake_themes: []
        };
    }

    addPlayer(playerName:string) {
        if(this.sessionHost) {
            this.sessionHost.players.push(playerName);
        }
    }

    updateGame(theme:string, fake_themes:string[], playerData:playerSession[]) { // Update host model theme and players
        if(this.sessionHost) {
            this.sessionHost.theme = theme;
            this.sessionHost.fake_themes = fake_themes;
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