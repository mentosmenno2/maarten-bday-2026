import { Bot } from '../models/Bot';
import { IBot } from '../types/IBot';
/**
 * Handles voting logic and bot voting behavior
 */
export declare class VotingSystem {
    /**
     * Calculate which player a bot should vote for
     * Based on: trust map, aggression, bandwagoning, grudge
     */
    static calculateBotVote(voter: Bot, possibleTargets: IBot[], currentVoteTally: Record<string, number>): string;
    /**
     * Select a vote target based on trust and behavior
     */
    private static selectTargetByTrust;
    /**
     * Update trust based on voting behavior
     */
    static updateTrustAfterVote(voters: IBot[], votedFor: string, executed: boolean): void;
}
//# sourceMappingURL=VotingSystem.d.ts.map