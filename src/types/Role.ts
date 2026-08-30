/**
 * Roles available in the game
 */
export enum Role {
  WEREWOLF = 'werewolf',
  VILLAGER = 'villager',
  SEER = 'seer',
  WITCH = 'witch',
  THIEF = 'thief',
  CUPIDO = 'cupido',
}

/**
 * Teams - used to determine win conditions and who can see whom
 */
export enum Team {
  WEREWOLVES = 'werewolves',
  VILLAGERS = 'villagers',
}

/**
 * Get the team for a given role
 */
export function getRoleTeam(role: Role): Team {
  return role === Role.WEREWOLF ? Team.WEREWOLVES : Team.VILLAGERS;
}

/**
 * Get the Dutch name for a role
 */
export function getRoleDutchName(role: Role): string {
  const names: Record<Role, string> = {
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
export function getRoleIcon(role: Role): string {
  return `${role}.png`;
}
