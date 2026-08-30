import { IBot } from '../types/IBot';
import { Role, Team } from '../types/Role';
/**
 * Represents an AI bot in the game
 */
export declare class Bot implements IBot {
    readonly id: string;
    readonly name: string;
    isHuman: boolean;
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
    constructor(id: string, name: string, role: Role);
    /**
     * Initialize trust map with all players at neutral trust (50)
     */
    initializeTrustMap(playerIds: string[]): void;
    /**
     * Adjust trust towards a player
     */
    adjustTrust(playerId: string, delta: number): void;
    /**
     * Mark this bot as dead
     */
    die(): void;
    /**
     * Reset for a new game
     */
    reset(): void;
}
//# sourceMappingURL=Bot.d.ts.map