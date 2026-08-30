import { IBot } from '../types/IBot';
import { Role, Team, getRoleTeam } from '../types/Role';

/**
 * Represents an AI bot in the game
 */
export class Bot implements IBot {
  readonly id: string;
  readonly name: string;
  isHuman = false;
  
  role: Role;
  team: Team;
  alive = true;
  
  // Personality traits (0-100)
  aggression: number;
  bandwagoning: number;
  grudge: number;
  deception: number;
  
  // Trust tracking
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

  constructor(id: string, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.team = getRoleTeam(role);
    
    // Initialize personality traits based on role
    // Werewolves are more aggressive
    if (role === Role.WEREWOLF) {
      this.aggression = 60 + Math.random() * 30;   // 60-90
      this.bandwagoning = 40 + Math.random() * 30; // 40-70
      this.grudge = 50 + Math.random() * 30;       // 50-80
      this.deception = 70 + Math.random() * 25;    // 70-95
    } else {
      // Villagers are more cautious
      this.aggression = 30 + Math.random() * 40;   // 30-70
      this.bandwagoning = 45 + Math.random() * 35; // 45-80
      this.grudge = 30 + Math.random() * 40;       // 30-70
      this.deception = 20 + Math.random() * 40;    // 20-60
    }
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
    
    // If werewolf, boost trust for other werewolves
    if (this.role === Role.WEREWOLF) {
      // This will be set by GameEngine after all bots know each other
    }
  }

  /**
   * Adjust trust towards a player
   */
  adjustTrust(playerId: string, delta: number): void {
    if (this.trustMap[playerId] !== undefined) {
      this.trustMap[playerId] = Math.max(0, Math.min(100, this.trustMap[playerId] + delta));
    }
  }

  /**
   * Mark this bot as dead
   */
  die(): void {
    this.alive = false;
  }

  /**
   * Reset for a new game
   */
  reset(): void {
    this.alive = true;
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
