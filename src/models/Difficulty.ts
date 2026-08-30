/**
 * Game difficulty levels
 */
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

/**
 * Configuration for each difficulty level
 */
export interface DifficultyConfig {
  botCount: number;
  werewolfCount: number;
  traitMultiplier: number;    // Multiply bot traits by this (1.0 = normal)
  chatFrequency: number;       // How often bots chat (0-1)
  votingDelay: number;         // Milliseconds delay before bots vote
  dutchName: string;
  description: string;
}

/**
 * Get configuration for a difficulty level
 */
export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  const configs: Record<Difficulty, DifficultyConfig> = {
    [Difficulty.EASY]: {
      botCount: 4,
      werewolfCount: 1,
      traitMultiplier: 0.7,
      chatFrequency: 0.3,
      votingDelay: 2000,
      dutchName: 'Makkelijk',
      description: 'Simpele tegenstanders met voorspelbare strategieën',
    },
    [Difficulty.MEDIUM]: {
      botCount: 6,
      werewolfCount: 2,
      traitMultiplier: 1.0,
      chatFrequency: 0.6,
      votingDelay: 1500,
      dutchName: 'Normaal',
      description: 'Evenwichtige tegenstanders met variabele strategieën',
    },
    [Difficulty.HARD]: {
      botCount: 8,
      werewolfCount: 3,
      traitMultiplier: 1.3,
      chatFrequency: 0.8,
      votingDelay: 1000,
      dutchName: 'Moeilijk',
      description: 'Slimme tegenstanders die samenwerken en tactisch stemmen',
    },
  };
  
  return configs[difficulty];
}
