import { Role, getRoleTeam } from '../types/Role';
/**
 * Represents an AI bot in the game
 */
export class Bot {
    constructor(id, name, role) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isHuman", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "team", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "alive", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        // Personality traits (0-100)
        Object.defineProperty(this, "aggression", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bandwagoning", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "grudge", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deception", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Trust tracking
        Object.defineProperty(this, "trustMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        // Role-specific state
        Object.defineProperty(this, "hasSeerLookedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "witchHasPoison", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "witchHasRevive", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "thiefHasSwapped", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "cupidoHasChosenPair", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lovePartner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Actions
        Object.defineProperty(this, "nominatedPlayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "currentVote", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.role = role;
        this.team = getRoleTeam(role);
        // Initialize personality traits based on role
        // Werewolves are more aggressive
        if (role === Role.WEREWOLF) {
            this.aggression = 60 + Math.random() * 30; // 60-90
            this.bandwagoning = 40 + Math.random() * 30; // 40-70
            this.grudge = 50 + Math.random() * 30; // 50-80
            this.deception = 70 + Math.random() * 25; // 70-95
        }
        else {
            // Villagers are more cautious
            this.aggression = 30 + Math.random() * 40; // 30-70
            this.bandwagoning = 45 + Math.random() * 35; // 45-80
            this.grudge = 30 + Math.random() * 40; // 30-70
            this.deception = 20 + Math.random() * 40; // 20-60
        }
    }
    /**
     * Initialize trust map with all players at neutral trust (50)
     */
    initializeTrustMap(playerIds) {
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
    adjustTrust(playerId, delta) {
        if (this.trustMap[playerId] !== undefined) {
            this.trustMap[playerId] = Math.max(0, Math.min(100, this.trustMap[playerId] + delta));
        }
    }
    /**
     * Mark this bot as dead
     */
    die() {
        this.alive = false;
    }
    /**
     * Reset for a new game
     */
    reset() {
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
//# sourceMappingURL=Bot.js.map