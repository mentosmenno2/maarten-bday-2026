/**
 * Roles available in the game
 */
export var Role;
(function (Role) {
    Role["WEREWOLF"] = "werewolf";
    Role["VILLAGER"] = "villager";
    Role["SEER"] = "seer";
    Role["WITCH"] = "witch";
    Role["THIEF"] = "thief";
    Role["CUPIDO"] = "cupido";
})(Role || (Role = {}));
/**
 * Teams - used to determine win conditions and who can see whom
 */
export var Team;
(function (Team) {
    Team["WEREWOLVES"] = "werewolves";
    Team["VILLAGERS"] = "villagers";
})(Team || (Team = {}));
/**
 * Get the team for a given role
 */
export function getRoleTeam(role) {
    return role === Role.WEREWOLF ? Team.WEREWOLVES : Team.VILLAGERS;
}
/**
 * Get the Dutch name for a role
 */
export function getRoleDutchName(role) {
    const names = {
        [Role.WEREWOLF]: 'Weerwolf',
        [Role.VILLAGER]: 'Dorpeling',
        [Role.SEER]: 'Ziener',
        [Role.WITCH]: 'Heks',
        [Role.THIEF]: 'Dief',
        [Role.CUPIDO]: 'Cupido',
    };
    return names[role];
}
/**
 * Get the icon filename for a role
 */
export function getRoleIcon(role) {
    return `${role}.png`;
}
//# sourceMappingURL=Role.js.map