/**
 * Utility functions for randomization and probability
 */
export class Randomizer {
    /**
     * Get a random integer between min (inclusive) and max (exclusive)
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * Get a random element from an array
     */
    static pickRandom(array) {
        if (array.length === 0) {
            throw new Error('Cannot pick from empty array');
        }
        return array[this.getRandomInt(0, array.length)];
    }
    /**
     * Pick multiple random elements without replacement
     */
    static pickMultiple(array, count) {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }
    /**
     * Shuffle an array in place (Fisher-Yates)
     */
    static shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.getRandomInt(0, i + 1);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    /**
     * Check if a probability (0-100) occurs
     */
    static checkProbability(percentage) {
        return Math.random() * 100 < percentage;
    }
    /**
     * Get a random value between min and max
     */
    static getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }
}
//# sourceMappingURL=Randomizer.js.map