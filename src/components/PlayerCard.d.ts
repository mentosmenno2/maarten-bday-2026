import { BaseComponent } from './BaseComponent';
import { IBot } from '../types/IBot';
/**
 * Player card displaying a single player's info
 */
export declare class PlayerCard extends BaseComponent {
    private player;
    private isHuman;
    private isSelected;
    private showRole;
    constructor();
    connectedCallback(): void;
    /**
     * Set the player data to display
     */
    setPlayer(player: IBot, isHuman?: boolean, showRole?: boolean): void;
    /**
     * Toggle selection state
     */
    toggleSelection(): void;
    /**
     * Get selection state
     */
    isPlayerSelected(): boolean;
    /**
     * Reset selection
     */
    resetSelection(): void;
    /**
     * Attach click listener to card
     */
    private attachClickListener;
    private render;
}
//# sourceMappingURL=PlayerCard.d.ts.map