/**
 * Utility for building Dutch chat messages for bots
 * Uses 'Mad Libs' style templates based on bot behavior
 */
export declare class ChatTemplateBuilder {
    /**
     * Generate an accusation message
     */
    static buildAccusation(botName: string, targetName: string): string;
    /**
     * Generate a defense message
     */
    static buildDefense(botName: string): string;
    /**
     * Generate a bandwagon message
     */
    static buildBandwagon(botName: string, targetName: string): string;
    /**
     * Generate a suspicion message
     */
    static buildSuspicion(botName: string, targetName: string): string;
    /**
     * Generate a support message
     */
    static buildSupport(botName: string, targetName: string): string;
    /**
     * Generate an analysis message
     */
    static buildAnalysis(botName: string, observedInfo: string): string;
    /**
     * Generate a morning reveal message
     */
    static buildMorningMessage(targetName: string, role: string): string;
    /**
     * Helper to pick random element from array
     */
    private static pickRandom;
}
//# sourceMappingURL=ChatTemplateBuilder.d.ts.map