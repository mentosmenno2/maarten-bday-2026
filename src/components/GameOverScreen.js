import { BaseComponent } from './BaseComponent';
import { Team } from '../types/Role';
/**
 * Game over screen with win/loss message and video
 */
export class GameOverScreen extends BaseComponent {
    constructor() {
        super();
        Object.defineProperty(this, "team", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "showVideo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    connectedCallback() {
        this.render();
    }
    /**
     * Show game over screen
     */
    showGameOver(team) {
        this.team = team;
        this.showVideo = true;
        this.render();
    }
    render() {
        const shadow = this.createShadowRoot();
        const isVillagerWin = this.team === Team.VILLAGERS;
        const videoSrc = isVillagerWin
            ? '/src/assets/videos/win-villager.mp4'
            : (this.team === Team.WEREWOLVES ? '/src/assets/videos/win-wolf.mp4' : '');
        const isHumanWin = this.team !== undefined;
        shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 10000;
          font-family: var(--font-family);
          animation: fadeIn var(--transition-normal);
        }

        .game-over-container {
          text-align: center;
          max-width: 600px;
          padding: var(--spacing-2xl);
        }

        .video-container {
          margin-bottom: var(--spacing-2xl);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
        }

        video {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          display: block;
        }

        .result-text {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-lg);
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .result-text.win {
          color: var(--color-success);
        }

        .result-text.loss {
          color: var(--color-danger);
        }

        .details {
          background: rgba(51, 51, 51, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          font-size: var(--font-size-lg);
          color: var(--color-light);
        }

        .details p {
          margin: var(--spacing-sm) 0;
        }

        .emoji {
          font-size: 60px;
          margin-bottom: var(--spacing-md);
        }

        .button-group {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        button {
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-lg);
          border: none;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          font-weight: var(--font-weight-bold);
        }

        .btn-play-again {
          background: linear-gradient(135deg, var(--color-accent) 0%, #c49a1f 100%);
          color: #000;
        }

        .btn-play-again:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.4);
        }

        .btn-menu {
          background: rgba(212, 175, 55, 0.1);
          color: var(--color-accent);
          border: 2px solid var(--color-accent);
        }

        .btn-menu:hover {
          background: rgba(212, 175, 55, 0.2);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>

      <div class="game-over-container">
        ${isHumanWin && this.showVideo && videoSrc
            ? `
            <div class="video-container">
              <video autoplay loop controls>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          `
            : ''}

        <div class="emoji">
          ${isHumanWin
            ? (this.team === Team.VILLAGERS ? '🎉' : '🐺')
            : '😱'}
        </div>

        <div class="result-text ${isHumanWin ? 'win' : 'loss'}">
          ${isHumanWin
            ? (this.team === Team.VILLAGERS ? 'Je hebt gewonnen!' : 'Weerwolven winnen!')
            : 'Je hebt verloren!'}
        </div>

        <div class="details">
          ${isHumanWin
            ? this.team === Team.VILLAGERS
                ? '<p>De dorpelingen hebben alle weerwolven verslagen!</p><p>🎊 Goed werk, agent! 🎊</p>'
                : '<p>De weerwolven hebben de meerderheid bereikt!</p><p>🐺 Jij bent een weerwolf! 🐺</p>'
            : '<p>De weerwolven hebben gewonnen...</p><p>Probeer het opnieuw!</p>'}
        </div>

        <div class="button-group">
          <button class="btn-play-again">Opnieuw spelen</button>
          <button class="btn-menu">Terug naar Menu</button>
        </div>
      </div>
    `;
        this.attachEventListeners();
    }
    attachEventListeners() {
        const playAgainBtn = this.shadowRoot?.querySelector('.btn-play-again');
        const menuBtn = this.shadowRoot?.querySelector('.btn-menu');
        playAgainBtn?.addEventListener('click', () => {
            this.dispatchCustomEvent('playAgain', {});
        });
        menuBtn?.addEventListener('click', () => {
            this.dispatchCustomEvent('backToMenu', {});
        });
    }
}
customElements.define('game-over-screen', GameOverScreen);
//# sourceMappingURL=GameOverScreen.js.map