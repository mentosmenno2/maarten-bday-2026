/**
 * Game phase/state in the game flow
 */
export enum GamePhase {
  INIT = 'init',
  DIFFICULTY_SELECT = 'difficulty_select',
  SETUP = 'setup',
  NIGHT = 'night',
  MORNING = 'morning',
  DAY_DISCUSSION = 'day_discussion',
  VOTING = 'voting',
  EXECUTION = 'execution',
  GAME_OVER = 'game_over',
}

/**
 * Get the Dutch name for a game phase
 */
export function getPhaseDutchName(phase: GamePhase): string {
  const names: Record<GamePhase, string> = {
    [GamePhase.INIT]: 'Initialisatie',
    [GamePhase.DIFFICULTY_SELECT]: 'Moeilijkheidsgraad selecteren',
    [GamePhase.SETUP]: 'Rollen verdelen',
    [GamePhase.NIGHT]: 'Nacht',
    [GamePhase.MORNING]: 'Morgen',
    [GamePhase.DAY_DISCUSSION]: 'Dagdiscussie',
    [GamePhase.VOTING]: 'Stemming',
    [GamePhase.EXECUTION]: 'Executie',
    [GamePhase.GAME_OVER]: 'Spel voorbij',
  };
  return names[phase];
}
