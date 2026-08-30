import { BaseComponent } from './BaseComponent';
import { Difficulty, getDifficultyConfig } from '../models/Difficulty';

/**
 * Difficulty selection screen
 */
export class DifficultySelector extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    const shadow = this.createShadowRoot();
    shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%);
          font-family: var(--font-family);
        }

        .container {
          text-align: center;
          max-width: 600px;
          padding: var(--spacing-2xl);
        }

        h1 {
          color: var(--color-accent);
          font-size: var(--font-size-2xl);
          margin-bottom: var(--spacing-lg);
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .subtitle {
          color: var(--color-light);
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-2xl);
          opacity: 0.8;
        }

        .difficulty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .difficulty-button {
          padding: var(--spacing-lg);
          background: rgba(51, 51, 51, 0.6);
          border: 2px solid transparent;
          border-radius: var(--border-radius-lg);
          color: var(--color-light);
          cursor: pointer;
          transition: all var(--transition-normal);
          text-align: center;
        }

        .difficulty-button:hover {
          border-color: var(--color-accent);
          background: rgba(51, 51, 51, 0.9);
          transform: scale(1.05);
        }

        .difficulty-button .title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-sm);
          color: var(--color-accent);
        }

        .difficulty-button .description {
          font-size: var(--font-size-sm);
          color: #999;
        }

        .info-box {
          background: rgba(139, 0, 0, 0.1);
          border: 1px solid rgba(139, 0, 0, 0.3);
          border-radius: var(--border-radius-md);
          padding: var(--spacing-md);
          margin-top: var(--spacing-lg);
          font-size: var(--font-size-sm);
          color: #ccc;
        }
      </style>

      <div class="container">
        <h1>🐺 Weerwolven van Wakkerdam</h1>
        <p class="subtitle">Kies je moeilijkheidsgraad</p>

        <div class="difficulty-grid">
          ${Object.values(Difficulty).map(diff => {
            const config = getDifficultyConfig(diff as Difficulty);
            return `
              <button class="difficulty-button" data-difficulty="${diff}">
                <div class="title">${config.dutchName}</div>
                <div class="description">${config.description}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="info-box">
          <p>💡 Moeilijkere niveaus hebben meer spelers, sterkere bots en meer kletsen.</p>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const buttons = this.shadowRoot?.querySelectorAll('.difficulty-button');
    buttons?.forEach(button => {
      button.addEventListener('click', (e) => {
        const difficulty = (e.currentTarget as HTMLElement).getAttribute('data-difficulty');
        this.dispatchCustomEvent('difficultySelected', { difficulty });
      });
    });
  }
}

customElements.define('difficulty-selector', DifficultySelector);
