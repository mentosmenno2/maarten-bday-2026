import { Role, getRoleTeam } from '../types/Role';
/**
 * Represents the human player in the game
 */
export class Player {
    constructor(name = 'Jij', role = Role.VILLAGER) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'human-player'
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
            value: true
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
        // Players don't have personality traits (it's the human!)
        Object.defineProperty(this, "aggression", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "bandwagoning", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "grudge", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "deception", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // Trust tracking - human player can see votes and chat
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
        this.name = name;
        this.role = role;
        this.team = getRoleTeam(role);
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
    }
    /**
     * Adjust trust towards a player (human player can manually adjust)
     */
    adjustTrust(playerId, delta) {
        if (this.trustMap[playerId] !== undefined) {
            this.trustMap[playerId] = Math.max(0, Math.min(100, this.trustMap[playerId] + delta));
        }
    }
    /**
     * Mark player as dead
     */
    die() {
        this.alive = false;
    }
    /**
     * Reset for a new game
     */
    reset(role = Role.VILLAGER) {
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
//# sourceMappingURL=Player.js.map