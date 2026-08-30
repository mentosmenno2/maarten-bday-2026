import { Bot } from '../models/Bot';
import { IBot } from '../types/IBot';

/**
 * Handles voting logic and bot voting behavior
 */
export class VotingSystem {
  /**
   * Calculate which player a bot should vote for
   * Based on: trust map, aggression, bandwagoning, grudge
   */
  static calculateBotVote(
    voter: Bot,
    possibleTargets: IBot[],
    currentVoteTally: Record<string, number>
  ): string {
    if (possibleTargets.length === 0) return '';

    // If werewolf, never vote for fellow werewolves unless they're losing
    if (voter.role === 'werewolf') {
      const werewolves = possibleTargets.filter(p => p.role === 'werewolf');
      const nonWerewolves = possibleTargets.filter(p => p.role !== 'werewolf');

      // Check if any werewolf is already getting most votes
      const mostVotedId = Object.entries(currentVoteTally).sort((a, b) => b[1] - a[1])[0]?.[0];
      const mostVotedIsWerewolf = possibleTargets.find(p => p.id === mostVotedId)?.role === 'werewolf';

      if (!mostVotedIsWerewolf && nonWerewolves.length > 0) {
        // Vote for a non-werewolf
        return this.selectTargetByTrust(voter, nonWerewolves, currentVoteTally);
      }
    }

    return this.selectTargetByTrust(voter, possibleTargets, currentVoteTally);
  }

  /**
   * Select a vote target based on trust and behavior
   */
  private static selectTargetByTrust(
    voter: Bot,
    targets: IBot[],
    currentVoteTally: Record<string, number>
  ): string {
    // Calculate suspicion score for each target
    const suspicionScores = targets.map(target => {
      const trust = voter.trustMap[target.id] ?? 50;
      let suspicion = 100 - trust; // Lower trust = higher suspicion

      // Factor in current vote tally (bandwagoning)
      const votes = currentVoteTally[target.id] ?? 0;
      if (votes > 0) {
        suspicion += voter.bandwagoning * (votes / 5); // Weight by bandwagoning trait
      }

      return { id: target.id, suspicion };
    });

    // Sort by suspicion (descending)
    suspicionScores.sort((a, b) => b.suspicion - a.suspicion);

    // Introduce randomness based on aggression
    if (Math.random() < voter.aggression / 100) {
      // Aggressive = vote for most suspicious
      return suspicionScores[0].id;
    } else {
      // More cautious = pick from top 3 randomly
      const topCandidates = suspicionScores.slice(0, Math.min(3, suspicionScores.length));
      const pick = topCandidates[Math.floor(Math.random() * topCandidates.length)];
      return pick.id;
    }
  }

  /**
   * Update trust based on voting behavior
   */
  static updateTrustAfterVote(
    voters: IBot[],
    votedFor: string,
    executed: boolean
  ): void {
    for (const voter of voters) {
      if (!(voter instanceof Bot)) continue;

      // If someone voted for someone else who turned out to be good, lower their trust
      if (executed) {
        const executedPlayer = voters.find(p => p.id === votedFor);
        if (executedPlayer && executedPlayer.role !== 'werewolf') {
          // Reduce trust for voters who voted for an innocent
          for (const v of voters) {
            if (v.currentVote === votedFor && v.role !== 'werewolf') {
              voter.adjustTrust(v.id, -voter.grudge / 2);
            }
          }
        }
      }
    }
  }
}
