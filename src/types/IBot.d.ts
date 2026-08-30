import { Role, Team } from './Role';
/**
 * Interface for both AI bots and the human player
 */
export interface IBot {
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
}
//# sourceMappingURL=IBot.d.ts.map