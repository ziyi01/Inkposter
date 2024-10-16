import { closeGame } from "./components/socket-client";
import { Player } from "./components/playerInterface";
import { ensureUserExistsDB, getUserDB, getUserStatsDB, updatePreviousThemesDB, addSessionResultsDB } from "./components/server-requests";
import { StringMappingType } from "typescript";
var debug = require('debug')('app:userModel');

export type playerSession = {
    playerId: string;
    prompt: string;
    inkposter: boolean;
    canvas?: string; // Base64 encoded image
    ownVote?: string
}

export type hostSession = {
    players: Player[];
    playersData: playerSession[];
    theme: string;
    fake_themes: string[];
    inkposterId: string;
    voteResults: { playerId: string, playerName:string, voteCount: number, themeGuess: string }[];
    inkposterVotedOut: boolean;
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
    previousThemes: string[];
    profileStats: {innocent: {wins: number, losses: number}, inkposter: {wins:number, losses: number}};

    constructor(playerId='', name='', host: boolean=false) {
        this.playerId= playerId;
        this.name = name;
        this.host = host;
        this.roomId = ''; 
        this.sessionHost = {players: [], playersData: [], theme: "", fake_themes: [], inkposterId:"", voteResults: [], inkposterVotedOut: false};
        this.sessionPlayer = { playerId: "", prompt: "", inkposter: false }; 
        this.previousThemes = [];
        this.profileStats = {innocent: {wins: 0, losses: 0}, inkposter: {wins: 0, losses: 0}}
    }

    mockLogin(playerId: string, username: string) {
        this.playerId = playerId;
        this.name = username;
    }

    async login(playerId: string) {
        this.playerId = playerId;
        try {
            // check if user exists or create
            await ensureUserExistsDB(playerId);
            
            // get persisted userdata
            const userData = await getUserDB(playerId);
            const userStats = await getUserStatsDB(playerId);

            debug("userData: ", userData);
            debug("userStats: ", userStats);

            // set data in model
            this.name = userData.username;
            this.previousThemes = userData.previousThemes;
            this.profileStats = userStats.scores;

        } catch (err) {
            debug("Error during database communication: ", err);
            // TODO alert? redirect? Or is that handled somewhere else?
        }
    }
    
    setRoomId(roomId:string) {
        this.roomId = roomId;
    }

    // Host
    createHostSession(room:string) {
        if(this.roomId !== '') {
            closeGame(this.roomId);
        }
        
        this.reset();
        this.host = true;
        this.roomId = room
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

    getAllPlayers():Player[] {
        return this.sessionHost.players;
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

            this.previousThemes.push(theme);
            updatePreviousThemesDB(this.playerId, theme).catch(handleErr); // not crucial, only to make generated params better
        }

        function handleErr(err:Error) {
            debug("Persist failed: ", err);
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

    initVoting() {
        this.sessionHost.voteResults = this.getAllPlayers().map((player) => {
            return {
                playerId: player.playerId,
                playerName: player.name,
                voteCount: 0,
                themeGuess: "-"
            }
        });

        debug("Init sessionHost.voteResult as: ", this.sessionHost.voteResults);
    }

    updateVoting(playerId:string, votePlayer:string, voteTheme:string) { // Update model with voting results
        const voterIndex = this.sessionHost.voteResults.findIndex(player => player.playerId === playerId);
        const votedForIndex = this.sessionHost.voteResults.findIndex(player => player.playerId === votePlayer);

        // update own guess
        this.sessionHost.voteResults[voterIndex] = { 
            playerId: this.sessionHost.voteResults[voterIndex].playerId, 
            playerName: this.sessionHost.voteResults[voterIndex].playerName,
            voteCount: this.sessionHost.voteResults[voterIndex].voteCount, 
            themeGuess: voteTheme, 
        };
        
        // update voteCount for the player that this player voted for
        this.sessionHost.voteResults[votedForIndex] = { 
            playerId: this.sessionHost.voteResults[votedForIndex].playerId, 
            playerName: this.sessionHost.voteResults[votedForIndex].playerName,
            voteCount: this.sessionHost.voteResults[votedForIndex].voteCount + 1, 
            themeGuess: this.sessionHost.voteResults[votedForIndex].themeGuess 
        };

        debug("Results after ", playerId, "'s vote: ", this.sessionHost.voteResults);
    }

    setOwnVote(voteTheme: string) {
        this.sessionPlayer.ownVote = voteTheme;
    }

    calculateFinalResult() {
        var highestVoteCount = 0;
        var inkposterVotedOut;
        
        // find highest voteCountt
        this.sessionHost.voteResults.forEach(player => {
            if (player.voteCount > highestVoteCount) {
                highestVoteCount = player.voteCount;
            }
        });

        // find all players with that voteCount
        const highestVoteCounts = this.sessionHost.voteResults.filter(player => player.voteCount === highestVoteCount);

        if (highestVoteCounts.length > 1) { 
            inkposterVotedOut = false
            debug("Several players have the same highest vote: ", highestVoteCount);

        } else if (highestVoteCounts[0].playerId !== this.sessionHost.inkposterId) {
            inkposterVotedOut = false; 
            debug("Player ", highestVoteCounts[0].playerId, " with highest vote ", highestVoteCount, " not inkposter");

        } else {
            inkposterVotedOut = true;
            debug("Player ", highestVoteCounts[0].playerId, " with highest vote ", highestVoteCount, " was inkposter");
        }
        
        debug("Inkposter voted out: ", inkposterVotedOut);
        this.sessionHost.inkposterVotedOut = inkposterVotedOut;
        return inkposterVotedOut;
    }

    setProfileStats(inkposterVotedOut: boolean) {
        var newInnocentWins = this.profileStats.innocent.wins;
        var newInnocentLoss = this.profileStats.innocent.losses;
        var newInkposterWin = this.profileStats.inkposter.wins;
        var newInkposterLoss = this.profileStats.inkposter.losses;

        if (!this.sessionPlayer.inkposter && inkposterVotedOut) {
            newInnocentWins = newInnocentWins + 1;
        } else if (!this.sessionPlayer.inkposter && !inkposterVotedOut) {
            newInnocentLoss = newInnocentLoss + 1;
        } else if (this.sessionPlayer.inkposter && !inkposterVotedOut) {
            newInkposterWin = newInkposterWin + 1;
        } else if (this.sessionPlayer.inkposter && inkposterVotedOut) {
            newInkposterLoss = newInkposterLoss + 1;
        }

        this.profileStats = {
            innocent: {
                wins: newInnocentWins,
                losses: newInnocentLoss
            },
            inkposter:
            {
                wins: newInkposterWin,
                losses: newInkposterLoss
            }
        }

        addSessionResultsDB(this.playerId, this.profileStats, "placeholder.png").catch(handleErr);

        function handleErr(err:Error) {
            debug("Something went wrong: ", err);
            alert("Results could not be saved to database.");
        }
    }

    reset() {
        this.host = false;
        this.sessionHost = {players: [], playersData: [], theme: "", fake_themes: [], inkposterId: "", voteResults: [], inkposterVotedOut: false};
        this.sessionPlayer = {playerId: "", prompt: "", inkposter: false};
    }

    // Player
    startGamePlayer(prompt:string, inkposter:boolean, players:Player[], theme:string, fake_themes:string[]) { // Update model with prompt and role
        if(!this.host) { 
            this.sessionPlayer = {
                playerId: this.playerId,
                prompt: prompt,
                inkposter: inkposter
            }

            this.sessionHost.players = players;
            this.sessionHost.theme = theme;
            this.sessionHost.fake_themes = fake_themes;
        }
    }
}