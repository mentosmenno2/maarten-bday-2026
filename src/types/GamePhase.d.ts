/**
 * Game phase/state in the game flow
 */
export declare enum GamePhase {
    INIT = "init",
    DIFFICULTY_SELECT = "difficulty_select",
    SETUP = "setup",
    NIGHT = "night",
    MORNING = "morning",
    DAY_DISCUSSION = "day_discussion",
    VOTING = "voting",
    EXECUTION = "execution",
    GAME_OVER = "game_over"
}
/**
 * Get the Dutch name for a game phase
 */
export declare function getPhaseDutchName(phase: GamePhase): string;
//# sourceMappingURL=GamePhase.d.ts.map