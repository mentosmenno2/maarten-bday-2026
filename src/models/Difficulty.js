/**
 * Game difficulty levels
 */
export var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "easy";
    Difficulty["MEDIUM"] = "medium";
    Difficulty["HARD"] = "hard";
})(Difficulty || (Difficulty = {}));
/**
 * Get configuration for a difficulty level
 */
export function getDifficultyConfig(difficulty) {
    const configs = {
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
//# sourceMappingURL=Difficulty.js.map