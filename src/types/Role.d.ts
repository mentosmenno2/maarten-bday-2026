/**
 * Roles available in the game
 */
export declare enum Role {
    WEREWOLF = "werewolf",
    VILLAGER = "villager",
    SEER = "seer",
    WITCH = "witch",
    THIEF = "thief",
    CUPIDO = "cupido"
}
/**
 * Teams - used to determine win conditions and who can see whom
 */
export declare enum Team {
    WEREWOLVES = "werewolves",
    VILLAGERS = "villagers"
}
/**
 * Get the team for a given role
 */
export declare function getRoleTeam(role: Role): Team;
/**
 * Get the Dutch name for a role
 */
export declare function getRoleDutchName(role: Role): string;
/**
 * Get the icon filename for a role
 */
export declare function getRoleIcon(role: Role): string;
//# sourceMappingURL=Role.d.ts.map