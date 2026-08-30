/**
 * Utility for building Dutch chat messages for bots
 * Uses 'Mad Libs' style templates based on bot behavior
 */
export class ChatTemplateBuilder {
    /**
     * Generate an accusation message
     */
    static buildAccusation(botName, targetName) {
        const templates = [
            `Ik vertrouw ${targetName} niet. Het stemgedrag was verdacht.`,
            `${targetName} gedraagt zich vreemd. Ik denk dat het een weerwolf is.`,
            `Waarom verdedigt iedereen ${targetName}? Ik vind ze verdacht.`,
            `${targetName} liegt, dat voel ik. Ze zijn geen dorp bewoner.`,
            `Dit wordt me te veel. ${targetName} is een weerwolf, zeker weten.`,
            `${targetName} zegt mooie woorden, maar ik geloof er niks van.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate a defense message
     */
    static buildDefense(botName) {
        const templates = [
            `Waarom kijken jullie naar mij? Ik ben onschuldig!`,
            `Dit is niet eerlijk! Ik ben een dorpeling, geen weerwolf!`,
            `Jullie hebben het mis. Ik zou nooit...`,
            `Ik zweer het, ik ben niet schuldig!`,
            `Kom op, mensen. Laten we logisch nadenken. Ik ben onschuldig!`,
            `Dit is absurd. Ik ben gewoon een dorpeling.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate a bandwagon message
     */
    static buildBandwagon(botName, targetName) {
        const templates = [
            `Ik ben het met jullie eens. ${targetName} is verdacht.`,
            `Ja, ${targetName} ziet er schuldig uit. Ik stem voor uitschakeling.`,
            `Goed punt. ${targetName} deed inderdaad raar.`,
            `Ik ga met de meerderheid mee. ${targetName} moet eruit.`,
            `${targetName} is het doel. Laten we stemmen.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate a suspicion message
     */
    static buildSuspicion(botName, targetName) {
        const templates = [
            `Hmm, ${targetName} zei iets raars.`,
            `${targetName} verdedigt zichzelf al. Verdacht.`,
            `Let op ${targetName}. Er klopt iets niet.`,
            `${targetName} spreekt te veel. Ze verbergen iets.`,
            `Ik hou ${targetName} in de gaten.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate a support message
     */
    static buildSupport(botName, targetName) {
        const templates = [
            `${targetName} spreekt de waarheid. Ik vertrouw hen.`,
            `${targetName} is duidelijk onschuldig. Volgende!`,
            `Ik geloof ${targetName}. Ze bedoelen het goed.`,
            `${targetName} is waarschijnlijk een dorpeling. Logisch.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate an analysis message
     */
    static buildAnalysis(botName, observedInfo) {
        const templates = [
            `Laten we even analyseren: ${observedInfo}`,
            `Denk erover na: ${observedInfo}`,
            `Op basis van wat we hebben gezien: ${observedInfo}`,
            `Het bewijs wijst op: ${observedInfo}`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Generate a morning reveal message
     */
    static buildMorningMessage(targetName, role) {
        const templates = [
            `${targetName} is dood! Ze waren een ${role}.`,
            `${targetName} is niet meer. Ze bleken een ${role} te zijn.`,
            `Nee! ${targetName} is vermoord. Ze waren een ${role}.`,
        ];
        return this.pickRandom(templates);
    }
    /**
     * Helper to pick random element from array
     */
    static pickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
//# sourceMappingURL=ChatTemplateBuilder.js.map