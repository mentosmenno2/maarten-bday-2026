/**
 * Game phase/state in the game flow
 */
export var GamePhase;
(function (GamePhase) {
    GamePhase["INIT"] = "init";
    GamePhase["DIFFICULTY_SELECT"] = "difficulty_select";
    GamePhase["SETUP"] = "setup";
    GamePhase["NIGHT"] = "night";
    GamePhase["MORNING"] = "morning";
    GamePhase["DAY_DISCUSSION"] = "day_discussion";
    GamePhase["VOTING"] = "voting";
    GamePhase["EXECUTION"] = "execution";
    GamePhase["GAME_OVER"] = "game_over";
})(GamePhase || (GamePhase = {}));
/**
 * Get the Dutch name for a game phase
 */
export function getPhaseDutchName(phase) {
    const names = {
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
//# sourceMappingURL=GamePhase.js.map