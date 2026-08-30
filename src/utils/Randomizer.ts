/**
 * Utility functions for randomization and probability
 */
export class Randomizer {
  /**
   * Get a random integer between min (inclusive) and max (exclusive)
   */
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Get a random element from an array
   */
  static pickRandom<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick from empty array');
    }
    return array[this.getRandomInt(0, array.length)];
  }

  /**
   * Pick multiple random elements without replacement
   */
  static pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Shuffle an array in place (Fisher-Yates)
   */
  static shuffle<T>(array: T[]): T[] {
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
  static checkProbability(percentage: number): boolean {
    return Math.random() * 100 < percentage;
  }

  /**
   * Get a random value between min and max
   */
  static getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
