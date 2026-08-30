/**
 * Utility functions for randomization and probability
 */
export declare class Randomizer {
    /**
     * Get a random integer between min (inclusive) and max (exclusive)
     */
    static getRandomInt(min: number, max: number): number;
    /**
     * Get a random element from an array
     */
    static pickRandom<T>(array: T[]): T;
    /**
     * Pick multiple random elements without replacement
     */
    static pickMultiple<T>(array: T[], count: number): T[];
    /**
     * Shuffle an array in place (Fisher-Yates)
     */
    static shuffle<T>(array: T[]): T[];
    /**
     * Check if a probability (0-100) occurs
     */
    static checkProbability(percentage: number): boolean;
    /**
     * Get a random value between min and max
     */
    static getRandomValue(min: number, max: number): number;
}
//# sourceMappingURL=Randomizer.d.ts.map