import { GamePhase } from '../types/GamePhase';
import { Bot } from '../models/Bot';
import { Player } from '../models/Player';
import { Difficulty } from '../models/Difficulty';
/**
 * Main game engine - controls game state, phases, and flow
 */
export declare class GameEngine {
    private currentPhase;
    private players;
    private player;
    private difficulty;
    private dayNumber;
    private nightNumber;
    private deadThisNight;
    private executedThisDay?;
    constructor();
    /**
     * Start a new game with selected difficulty
     */
    startGame(difficulty: Difficulty): void;
    /**
     * Create bot players
     */
    private setupPlayers;
    /**
     * Assign roles randomly to all players
     */
    private assignRoles;
    /**
     * Initialize trust maps for all players
     */
    private initializeTrustMaps;
    /**
     * Transition to next game phase
     */
    transitionToPhase(phase: GamePhase): void;
    /**
     * Handle night phase - special roles perform actions
     */
    private handleNightPhase;
    /**
     * Handle morning phase - reveal deaths
     */
    private handleMorningPhase;
    /**
     * Start day discussion phase
     */
    private handleDayDiscussionStart;
    /**
     * Advance to voting phase
     */
    advanceToVoting(): void;
    /**
     * Handle voting phase
     */
    private handleVotingPhase;
    /**
     * Human player votes
     */
    playerVotes(targetId: string): void;
    /**
     * Check if all alive players have voted
     */
    private allPlayersVoted;
    /**
     * Handle execution phase
     */
    private handleExecutionPhase;
    /**
     * Count votes and return sorted by vote count
     */
    private countVotes;
    /**
     * Determine who a bot should vote for
     */
    private determineVoteTarget;
    /**
     * Check win conditions
     */
    private checkWinConditions;
    /**
     * Handle game over state
     */
    private handleGameOver;
    /**
     * Reset game for a new round
     */
    reset(): void;
    /**
     * Dispatch a custom event
     */
    private dispatchEvent;
    getPhase(): GamePhase;
    getPlayers(): (Bot | Player)[];
    getPlayer(): Player;
    getAlivePlayers(): (Bot | Player)[];
    getDayNumber(): number;
    getNightNumber(): number;
}
//# sourceMappingURL=GameEngine.d.ts.map