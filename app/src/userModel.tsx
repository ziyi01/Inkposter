export type playerSession = {
    playerName: string;
    prompt: string;
    role: string;
    canvas?: string; // Base64 encoded image
}

export type hostSession = {
    sessionID: string;
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
    sessionHost: hostSession | undefined;
    sessionPlayer: playerSession | undefined;

    constructor(id=undefined, name=undefined, host: boolean=false) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.sessionHost = undefined;
        this.sessionPlayer = undefined; 
    }

    login(id: number, playerName: string) {
        this.id = id;
        this.name = playerName;
    }
    
    /**
     * TODO: Create functions to add sessions for host and player
     */
}