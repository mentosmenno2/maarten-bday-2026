/**
 * Game difficulty levels
 */
export declare enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
/**
 * Configuration for each difficulty level
 */
export interface DifficultyConfig {
    botCount: number;
    werewolfCount: number;
    traitMultiplier: number;
    chatFrequency: number;
    votingDelay: number;
    dutchName: string;
    description: string;
}
/**
 * Get configuration for a difficulty level
 */
export declare function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig;
//# sourceMappingURL=Difficulty.d.ts.map