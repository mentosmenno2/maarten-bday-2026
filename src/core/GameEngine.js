import { GamePhase } from '../types/GamePhase';
import { Role, Team } from '../types/Role';
import { Bot } from '../models/Bot';
import { Player } from '../models/Player';
import { Difficulty, getDifficultyConfig } from '../models/Difficulty';
import { Randomizer } from '../utils/Randomizer';
/**
 * Main game engine - controls game state, phases, and flow
 */
export class GameEngine {
    constructor() {
        Object.defineProperty(this, "currentPhase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GamePhase.INIT
        });
        Object.defineProperty(this, "players", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "difficulty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Difficulty.MEDIUM
        });
        Object.defineProperty(this, "dayNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nightNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "deadThisNight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "executedThisDay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.player = new Player();
    }
    /**
     * Start a new game with selected difficulty
     */
    startGame(difficulty) {
        this.difficulty = difficulty;
        this.currentPhase = GamePhase.SETUP;
        this.dayNumber = 0;
        this.nightNumber = 0;
        this.deadThisNight = [];
        this.executedThisDay = undefined;
        this.setupPlayers();
        this.assignRoles();
        this.initializeTrustMaps();
        this.dispatchEvent('gameStarted', { players: this.players });
        this.transitionToPhase(GamePhase.NIGHT);
    }
    /**
     * Create bot players
     */
    setupPlayers() {
        this.players = [this.player];
        const config = getDifficultyConfig(this.difficulty);
        const botNames = [
            'Anna', 'Bert', 'Carla', 'Daan', 'Emma',
            'Frank', 'Greta', 'Hein', 'Ilse', 'Jan',
        ];
        for (let i = 0; i < config.botCount; i++) {
            const bot = new Bot(`bot-${i}`, botNames[i], Role.VILLAGER);
            this.players.push(bot);
        }
    }
    /**
     * Assign roles randomly to all players
     */
    assignRoles() {
        const config = getDifficultyConfig(this.difficulty);
        const allRoles = [];
        // Add werewolves
        for (let i = 0; i < config.werewolfCount; i++) {
            allRoles.push(Role.WEREWOLF);
        }
        // Add special roles
        const specialRoles = [Role.SEER, Role.WITCH, Role.THIEF, Role.CUPIDO];
        let specialIndex = 0;
        while (allRoles.length < this.players.length - 1) {
            if (specialIndex < specialRoles.length) {
                allRoles.push(specialRoles[specialIndex++]);
            }
            else {
                allRoles.push(Role.VILLAGER);
            }
        }
        // Add one more villager for the human player
        allRoles.push(Role.VILLAGER);
        // Shuffle and assign
        const shuffledRoles = Randomizer.shuffle(allRoles);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].role = shuffledRoles[i];
        }
        // Set up werewolf relationships
        const werewolves = this.players.filter(p => p.role === Role.WEREWOLF);
        for (const werewolf of werewolves) {
            for (const other of werewolves) {
                if (other.id !== werewolf.id) {
                    // Werewolves know each other and trust each other fully
                    werewolf.trustMap[other.id] = 100;
                }
            }
        }
    }
    /**
     * Initialize trust maps for all players
     */
    initializeTrustMaps() {
        const playerIds = this.players.map(p => p.id);
        for (const player of this.players) {
            player.initializeTrustMap(playerIds);
        }
    }
    /**
     * Transition to next game phase
     */
    transitionToPhase(phase) {
        this.currentPhase = phase;
        this.dispatchEvent('phaseChanged', { phase, day: this.dayNumber, night: this.nightNumber });
        switch (phase) {
            case GamePhase.NIGHT:
                this.handleNightPhase();
                break;
            case GamePhase.MORNING:
                this.handleMorningPhase();
                break;
            case GamePhase.DAY_DISCUSSION:
                this.handleDayDiscussionStart();
                break;
            case GamePhase.VOTING:
                this.handleVotingPhase();
                break;
            case GamePhase.EXECUTION:
                this.handleExecutionPhase();
                break;
            case GamePhase.GAME_OVER:
                this.handleGameOver();
                break;
            default:
                break;
        }
    }
    /**
     * Handle night phase - special roles perform actions
     */
    handleNightPhase() {
        this.nightNumber++;
        this.deadThisNight = [];
        this.dispatchEvent('nightStarted', { nightNumber: this.nightNumber });
        // TODO: Implement night actions (Seer looks, Witch acts, etc.)
        // For now, simulate night duration
        setTimeout(() => {
            this.transitionToPhase(GamePhase.MORNING);
        }, 2000);
    }
    /**
     * Handle morning phase - reveal deaths
     */
    handleMorningPhase() {
        this.dispatchEvent('morningStarted', { deadPlayers: this.deadThisNight });
        // Mark dead players
        for (const deadId of this.deadThisNight) {
            const deadPlayer = this.players.find(p => p.id === deadId);
            if (deadPlayer) {
                deadPlayer.die();
            }
        }
        // Check win conditions
        if (this.checkWinConditions()) {
            this.transitionToPhase(GamePhase.GAME_OVER);
        }
        else {
            this.dayNumber++;
            setTimeout(() => {
                this.transitionToPhase(GamePhase.DAY_DISCUSSION);
            }, 2000);
        }
    }
    /**
     * Start day discussion phase
     */
    handleDayDiscussionStart() {
        this.dispatchEvent('dayDiscussionStarted', { dayNumber: this.dayNumber });
        // Bots will chat during this phase
        // This phase lasts until player initiates voting
    }
    /**
     * Advance to voting phase
     */
    advanceToVoting() {
        if (this.currentPhase === GamePhase.DAY_DISCUSSION) {
            this.transitionToPhase(GamePhase.VOTING);
        }
    }
    /**
     * Handle voting phase
     */
    handleVotingPhase() {
        this.dispatchEvent('votingStarted', {});
        // Bots make their votes
        for (const player of this.players) {
            if (player instanceof Bot) {
                player.currentVote = this.determineVoteTarget(player);
            }
        }
        // Wait for human player to vote
        // This is handled by UI components
    }
    /**
     * Human player votes
     */
    playerVotes(targetId) {
        this.player.currentVote = targetId;
        // If all players have voted, proceed to execution
        if (this.allPlayersVoted()) {
            setTimeout(() => {
                this.transitionToPhase(GamePhase.EXECUTION);
            }, 1000);
        }
    }
    /**
     * Check if all alive players have voted
     */
    allPlayersVoted() {
        const alivePlayers = this.players.filter(p => p.alive);
        return alivePlayers.every(p => p.currentVote !== undefined);
    }
    /**
     * Handle execution phase
     */
    handleExecutionPhase() {
        const votes = this.countVotes();
        const executedVote = votes[0];
        const executedId = executedVote?.[0];
        if (executedId) {
            this.executedThisDay = executedId;
            const executed = this.players.find(p => p.id === executedId);
            if (executed) {
                executed.die();
                this.dispatchEvent('playerExecuted', { playerId: executedId, role: executed.role });
            }
        }
        // Check win conditions
        if (this.checkWinConditions()) {
            this.transitionToPhase(GamePhase.GAME_OVER);
        }
        else {
            // Reset votes for next round
            for (const player of this.players) {
                player.currentVote = undefined;
            }
            setTimeout(() => {
                this.transitionToPhase(GamePhase.NIGHT);
            }, 2000);
        }
    }
    /**
     * Count votes and return sorted by vote count
     */
    countVotes() {
        const voteCount = {};
        for (const player of this.players) {
            if (player.alive && player.currentVote) {
                voteCount[player.currentVote] = (voteCount[player.currentVote] || 0) + 1;
            }
        }
        return Object.entries(voteCount)
            .sort((a, b) => b[1] - a[1]);
    }
    /**
     * Determine who a bot should vote for
     */
    determineVoteTarget(bot) {
        const alivePlayers = this.players.filter(p => p.alive && p.id !== bot.id);
        if (alivePlayers.length === 0)
            return '';
        // Sort by trust (lowest trust = most likely to vote for)
        const sorted = [...alivePlayers].sort((a, b) => {
            const trustA = bot.trustMap[a.id] || 50;
            const trustB = bot.trustMap[b.id] || 50;
            return trustA - trustB;
        });
        // Higher bandwagoning = vote for lowest trust
        // Lower bandwagoning = more random
        if (Randomizer.checkProbability(bot.bandwagoning)) {
            return sorted[0].id;
        }
        else {
            return Randomizer.pickRandom(alivePlayers).id;
        }
    }
    /**
     * Check win conditions
     */
    checkWinConditions() {
        const alive = this.players.filter(p => p.alive);
        const werewolves = alive.filter(p => p.role === Role.WEREWOLF);
        const villagers = alive.filter(p => p.role !== Role.WEREWOLF);
        // Villagers win - all werewolves dead
        if (werewolves.length === 0) {
            this.dispatchEvent('gameWon', { team: Team.VILLAGERS, dayNumber: this.dayNumber });
            return true;
        }
        // Werewolves win - equal or outnumber villagers
        if (werewolves.length >= villagers.length) {
            this.dispatchEvent('gameWon', { team: Team.WEREWOLVES, dayNumber: this.dayNumber });
            return true;
        }
        return false;
    }
    /**
     * Handle game over state
     */
    handleGameOver() {
        this.dispatchEvent('gameEnded', {});
    }
    /**
     * Reset game for a new round
     */
    reset() {
        this.currentPhase = GamePhase.INIT;
        this.dayNumber = 0;
        this.nightNumber = 0;
        this.deadThisNight = [];
        this.executedThisDay = undefined;
        for (const player of this.players) {
            player.reset();
        }
        this.player.reset();
        this.dispatchEvent('gameReset', {});
    }
    /**
     * Dispatch a custom event
     */
    dispatchEvent(eventName, detail) {
        document.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
    // Getters
    getPhase() {
        return this.currentPhase;
    }
    getPlayers() {
        return this.players;
    }
    getPlayer() {
        return this.player;
    }
    getAlivePlayers() {
        return this.players.filter(p => p.alive);
    }
    getDayNumber() {
        return this.dayNumber;
    }
    getNightNumber() {
        return this.nightNumber;
    }
}
//# sourceMappingURL=GameEngine.js.map