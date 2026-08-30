import { BaseComponent } from './BaseComponent';
import { IBot } from '../types/IBot';
import { getRoleDutchName, getRoleIcon } from '../types/Role';

/**
 * Player card displaying a single player's info
 */
export class PlayerCard extends BaseComponent {
  private player: IBot | null = null;
  private isHuman = false;
  private isSelected = false;
  private showRole = false;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
  }

  /**
   * Set the player data to display
   */
  setPlayer(player: IBot, isHuman = false, showRole = false): void {
    this.player = player;
    this.isHuman = isHuman;
    this.showRole = showRole;
    this.render();
    this.attachClickListener();
  }

  /**
   * Toggle selection state
   */
  toggleSelection(): void {
    if (this.player?.alive) {
      this.isSelected = !this.isSelected;
      this.render();
      if (this.isSelected) {
        this.dispatchCustomEvent('playerSelected', { playerId: this.player.id });
      }
    }
  }

  /**
   * Get selection state
   */
  isPlayerSelected(): boolean {
    return this.isSelected;
  }

  /**
   * Reset selection
   */
  resetSelection(): void {
    this.isSelected = false;
    this.render();
  }

  /**
   * Attach click listener to card
   */
  private attachClickListener(): void {
    const card = this.shadowRoot?.querySelector('.card');
    if (card && this.player?.alive) {
      card.addEventListener('click', () => this.toggleSelection());
    }
  }

  private render(): void {
    if (!this.player) return;

    const shadow = this.createShadowRoot();
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: ${this.player.alive 
            ? 'rgba(51, 51, 51, 0.8)' 
            : 'rgba(51, 51, 51, 0.4)'};
          border: 2px solid ${this.isSelected 
            ? 'var(--color-accent)' 
            : 'rgba(212, 175, 55, 0.2)'};
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-md);
          cursor: ${this.player.alive ? 'pointer' : 'default'};
          transition: all var(--transition-normal);
          text-align: center;
          font-family: var(--font-family);
          position: relative;
          opacity: ${this.player.alive ? '1' : '0.6'};
        }

        .card:hover {
          ${this.player.alive 
            ? 'border-color: var(--color-accent); box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);' 
            : ''}
        }

        .card.selected {
          border-color: var(--color-accent);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--spacing-md);
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          position: relative;
          overflow: hidden;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar.dead::after {
          content: '⚰️';
          position: absolute;
          font-size: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-light);
          margin-bottom: var(--spacing-sm);
        }

        .role {
          font-size: var(--font-size-sm);
          color: var(--color-accent);
          margin-bottom: var(--spacing-sm);
          min-height: 20px;
        }

        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: var(--border-radius-full);
          font-size: 12px;
          font-weight: var(--font-weight-bold);
          margin: 2px;
        }

        .badge-human {
          background: rgba(139, 0, 0, 0.3);
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }

        .badge-dead {
          background: rgba(100, 100, 100, 0.5);
          color: #999;
          border: 1px solid #666;
        }

        .trust-meter {
          margin-top: var(--spacing-md);
          font-size: var(--font-size-xs);
          color: #999;
        }

        .trust-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 4px;
        }

        .trust-fill {
          height: 100%;
          background: linear-gradient(90deg, 
            var(--color-danger) 0%, 
            var(--color-warning) 50%, 
            var(--color-success) 100%);
          transition: width var(--transition-normal);
        }

        .status {
          font-size: var(--font-size-xs);
          color: #999;
          margin-top: var(--spacing-sm);
        }
      </style>

      <div class="card ${this.isSelected ? 'selected' : ''}">
        <div class="avatar ${!this.player.alive ? 'dead' : ''}">
          ${this.player.role ? `<img src="/src/assets/images/role-icons/${getRoleIcon(this.player.role)}" alt="${this.player.role}" />` : ''}
        </div>

        <div class="name">${this.player.name}</div>

        ${this.showRole && this.player.alive 
          ? `<div class="role">${getRoleDutchName(this.player.role)}</div>` 
          : ''}

        ${this.isHuman ? '<div class="badge badge-human">👤 Jij</div>' : ''}
        ${!this.player.alive ? '<div class="badge badge-dead">⚰️ Dood</div>' : ''}

        ${!this.isHuman && this.showRole
          ? `<div class="trust-meter">
              Vertrouwen
              <div class="trust-bar">
                <div class="trust-fill" style="width: ${this.player.trustMap[this.player.id] || 50}%"></div>
              </div>
            </div>`
          : ''}

        ${!this.player.alive ? '<div class="status">Uit het spel</div>' : ''}
      </div>
    `;
  }
}

customElements.define('player-card', PlayerCard);
