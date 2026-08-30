import { BaseComponent } from './BaseComponent';
import { GameEngine } from '../core/GameEngine';
/**
 * Main game board component
 */
export declare class GameBoard extends BaseComponent {
    private gameEngine;
    private playerCards;
    private chatBox;
    private selectedPlayerId;
    constructor();
    connectedCallback(): void;
    /**
     * Initialize game board with game engine
     */
    setGameEngine(engine: GameEngine): void;
    private render;
    private setupChatBox;
    private attachEventListeners;
    private attachGlobalEventListeners;
    private updatePlayerCards;
    private updatePhaseDisplay;
    private onPlayerSelected;
}
//# sourceMappingURL=GameBoard.d.ts.map