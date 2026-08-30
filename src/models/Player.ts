import { IPlayer } from '../types/IPlayer';
import { Role, Team, getRoleTeam } from '../types/Role';

/**
 * Represents the human player in the game
 */
export class Player implements IPlayer {
  readonly id = 'human-player';
  readonly name: string;
  readonly isHuman = true as const;
  
  role: Role;
  team: Team;
  alive = true;
  
  // Players don't have personality traits (it's the human!)
  aggression = 0;
  bandwagoning = 0;
  grudge = 0;
  deception = 0;
  
  // Trust tracking - human player can see votes and chat
  trustMap: Record<string, number> = {};
  
  // Role-specific state
  hasSeerLookedAt: Set<string> = new Set();
  witchHasPoison = true;
  witchHasRevive = true;
  thiefHasSwapped = false;
  cupidoHasChosenPair = false;
  lovePartner?: string;
  
  // Actions
  nominatedPlayerId?: string;
  currentVote?: string;

  constructor(name: string = 'Jij', role: Role = Role.VILLAGER) {
    this.name = name;
    this.role = role;
    this.team = getRoleTeam(role);
  }

  /**
   * Initialize trust map with all players at neutral trust (50)
   */
  initializeTrustMap(playerIds: string[]): void {
    this.trustMap = {};
    for (const id of playerIds) {
      if (id !== this.id) {
        this.trustMap[id] = 50; // Neutral trust
      }
    }
  }

  /**
   * Adjust trust towards a player (human player can manually adjust)
   */
  adjustTrust(playerId: string, delta: number): void {
    if (this.trustMap[playerId] !== undefined) {
      this.trustMap[playerId] = Math.max(0, Math.min(100, this.trustMap[playerId] + delta));
    }
  }

  /**
   * Mark player as dead
   */
  die(): void {
    this.alive = false;
  }

  /**
   * Reset for a new game
   */
  reset(role: Role = Role.VILLAGER): void {
    this.alive = true;
    this.role = role;
    this.team = getRoleTeam(role);
    this.trustMap = {};
    this.hasSeerLookedAt = new Set();
    this.witchHasPoison = true;
    this.witchHasRevive = true;
    this.thiefHasSwapped = false;
    this.cupidoHasChosenPair = false;
    this.lovePartner = undefined;
    this.nominatedPlayerId = undefined;
    this.currentVote = undefined;
  }
}
