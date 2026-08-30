import { Role, Team } from './Role';

/**
 * Interface for both AI bots and the human player
 */
export interface IBot {
  readonly id: string;
  readonly name: string;
  isHuman: boolean;
  
  // Current game state
  role: Role;
  team: Team;
  alive: boolean;
  
  // Personality traits (0-100)
  aggression: number;           // Likelihood to accuse someone unprompted
  bandwagoning: number;          // Likelihood to vote with majority
  grudge: number;                // How much to lower trust for voting against
  deception: number;             // Ability to hide true intentions (for werewolves)
  
  // Dynamic trust map: tracks trust towards each player
  trustMap: Record<string, number>;
  
  // Role-specific state
  hasSeerLookedAt: Set<string>;  // Seer: who they've looked at
  witchHasPoison: boolean;       // Witch: if they still have poison
  witchHasRevive: boolean;       // Witch: if they still have revive
  thiefHasSwapped: boolean;      // Thief: if they've swapped roles
  cupidoHasChosenPair: boolean;  // Cupido: if they've chosen love pair
  lovePartner?: string;          // If in love pair, partner's ID
  
  // Actions/voting
  nominatedPlayerId?: string;    // Who this bot wants to vote for
  currentVote?: string;          // Who this bot actually voted for (during voting phase)
}
