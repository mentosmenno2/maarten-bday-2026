import { BaseComponent } from './BaseComponent';
import { Team } from '../types/Role';
/**
 * Game over screen with win/loss message and video
 */
export declare class GameOverScreen extends BaseComponent {
    private team?;
    private showVideo;
    constructor();
    connectedCallback(): void;
    /**
     * Show game over screen
     */
    showGameOver(team: Team): void;
    private render;
    private attachEventListeners;
}
//# sourceMappingURL=GameOverScreen.d.ts.map