import { IPlayer } from '../types/IPlayer';
import { Role, Team } from '../types/Role';
/**
 * Represents the human player in the game
 */
export declare class Player implements IPlayer {
    readonly id = "human-player";
    readonly name: string;
    readonly isHuman: true;
    role: Role;
    team: Team;
    alive: boolean;
    aggression: number;
    bandwagoning: number;
    grudge: number;
    deception: number;
    trustMap: Record<string, number>;
    hasSeerLookedAt: Set<string>;
    witchHasPoison: boolean;
    witchHasRevive: boolean;
    thiefHasSwapped: boolean;
    cupidoHasChosenPair: boolean;
    lovePartner?: string;
    nominatedPlayerId?: string;
    currentVote?: string;
    constructor(name?: string, role?: Role);
    /**
     * Initialize trust map with all players at neutral trust (50)
     */
    initializeTrustMap(playerIds: string[]): void;
    /**
     * Adjust trust towards a player (human player can manually adjust)
     */
    adjustTrust(playerId: string, delta: number): void;
    /**
     * Mark player as dead
     */
    die(): void;
    /**
     * Reset for a new game
     */
    reset(role?: Role): void;
}
//# sourceMappingURL=Player.d.ts.map