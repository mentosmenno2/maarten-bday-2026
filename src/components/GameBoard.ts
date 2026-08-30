import { BaseComponent } from './BaseComponent';
import { PlayerCard } from './PlayerCard';
import { ChatBox } from './ChatBox';
import { GamePhase } from '../types/GamePhase';
import { GameEngine } from '../core/GameEngine';
import { Bot } from '../models/Bot';
import { Player } from '../models/Player';

/**
 * Main game board component
 */
export class GameBoard extends BaseComponent {
  private gameEngine: GameEngine | null = null;
  private playerCards: Map<string, PlayerCard> = new Map();
  private chatBox: ChatBox | null = null;
  private selectedPlayerId: string | null = null;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
    this.attachGlobalEventListeners();
  }

  /**
   * Initialize game board with game engine
   */
  setGameEngine(engine: GameEngine): void {
    this.gameEngine = engine;
    this.render();
    this.updatePlayerCards();
  }

  private render(): void {
    const shadow = this.createShadowRoot();
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          font-family: var(--font-family);
        }

        .game-container {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          height: 100%;
          max-height: 100vh;
          overflow: hidden;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          overflow-y: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .header h1 {
          color: var(--color-accent);
          font-size: var(--font-size-xl);
          margin: 0;
        }

        .phase-info {
          display: flex;
          gap: var(--spacing-md);
          font-size: var(--font-size-sm);
          color: #ccc;
        }

        .phase-badge {
          background: rgba(212, 175, 55, 0.2);
          padding: 4px 12px;
          border-radius: var(--border-radius-full);
          border: 1px solid rgba(212, 175, 55, 0.4);
        }

        .players-section {
          flex: 1;
          overflow-y: auto;
          padding-right: var(--spacing-sm);
        }

        .players-section::-webkit-scrollbar {
          width: 6px;
        }

        .players-section::-webkit-scrollbar-track {
          background: rgba(51, 51, 51, 0.3);
        }

        .players-section::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 3px;
        }

        .players-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: var(--spacing-md);
        }

        .actions {
          display: flex;
          gap: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        button {
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-base);
          border: none;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          font-weight: var(--font-weight-medium);
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          flex: 1;
        }

        .btn-primary:hover:not(:disabled) {
          background: #a80000;
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          padding-left: var(--spacing-md);
          border-left: 1px solid rgba(212, 175, 55, 0.2);
          overflow: hidden;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          height: 100%;
        }

        #players-display {
          background: rgba(212, 175, 55, 0.2);
          color: #ccc;
          border: 1px solid rgba(212, 175, 55, 0.4);
          cursor: pointer;
          padding: 4px 12px;
          border-radius: var(--border-radius-full);
          transition: all var(--transition-normal);
          font-size: var(--font-size-sm);
        }

        #players-display:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: rgba(212, 175, 55, 0.6);
          color: var(--color-accent);
        }

        /* Player List Modal */
        .players-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .players-modal.show {
          display: flex;
        }

        .players-modal-content {
          background: rgba(26, 26, 26, 0.95);
          border: 2px solid var(--color-accent);
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-lg);
          max-width: 400px;
          max-height: 70vh;
          overflow-y: auto;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .players-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        }

        .players-modal-header h2 {
          color: var(--color-accent);
          margin: 0;
          font-size: var(--font-size-lg);
        }

        .players-modal-close {
          background: none;
          border: none;
          color: var(--color-accent);
          font-size: var(--font-size-xl);
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .players-modal-close:hover {
          color: #fff;
        }

        .player-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .player-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background: rgba(51, 51, 51, 0.5);
          border-radius: var(--border-radius-md);
          border-left: 3px solid transparent;
        }

        .player-item.alive {
          border-left-color: var(--color-success);
        }

        .player-item.dead {
          border-left-color: var(--color-danger);
          opacity: 0.6;
        }

        .player-item.human {
          border-left-color: var(--color-accent);
        }

        .player-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .player-name {
          color: var(--color-light);
          font-weight: var(--font-weight-medium);
        }

        .player-role {
          color: #aaa;
          font-size: var(--font-size-xs);
        }

        .player-status {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .player-status.alive {
          color: var(--color-success);
        }

        .player-status.dead {
          color: var(--color-danger);
        }

        @media (max-width: 1200px) {
          .game-container {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }
        }
      </style>

      <div class="game-container">
        <div class="main-content">
          <div class="header">
            <h1>🐺 Weerwolven van Wakkerdam</h1>
            <div class="phase-info">
              <div class="phase-badge" id="phase-display">Laden...</div>
              <button class="phase-badge" id="players-display">Spelers</button>
            </div>
          </div>

          <div class="players-section">
            <div class="players-grid" id="players-grid">
              <!-- Player cards will be inserted here -->
            </div>
          </div>

          <div class="actions">
            <button class="btn-primary" id="voting-btn" disabled>Stemming starten</button>
          </div>
        </div>

        <div class="sidebar">
          <div class="sidebar-section">
            <chat-box id="chat-box"></chat-box>
          </div>
        </div>
      </div>

      <!-- Players List Modal -->
      <div class="players-modal" id="players-modal">
        <div class="players-modal-content">
          <div class="players-modal-header">
            <h2>Spelers</h2>
            <button class="players-modal-close" id="modal-close">×</button>
          </div>
          <div class="player-list" id="player-list">
            <!-- Player items will be inserted here -->
          </div>
        </div>
      </div>
    `;

    this.setupChatBox();
    this.attachEventListeners();
  }

  private setupChatBox(): void {
    const chatElement = this.shadowRoot?.querySelector('#chat-box');
    if (chatElement instanceof ChatBox) {
      this.chatBox = chatElement;
    }
  }

  private attachEventListeners(): void {
    const votingBtn = this.shadowRoot?.querySelector('#voting-btn');
    votingBtn?.addEventListener('click', () => {
      if (this.gameEngine?.getPhase() === GamePhase.DAY_DISCUSSION) {
        this.gameEngine.advanceToVoting();
      }
    });

    // Players modal
    const playersBtn = this.shadowRoot?.querySelector('#players-display');
    playersBtn?.addEventListener('click', () => {
      this.openPlayersModal();
    });

    const modalClose = this.shadowRoot?.querySelector('#modal-close');
    modalClose?.addEventListener('click', () => {
      this.closePlayersModal();
    });

    const modal = this.shadowRoot?.querySelector('#players-modal');
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closePlayersModal();
      }
    });
  }

  private attachGlobalEventListeners(): void {
    this.onDocumentEvent('playerDied', (e) => {
      this.updatePlayerCards();
      this.updatePlayersList();
    });

    this.onDocumentEvent('playerExecuted', (e) => {
      this.updatePlayerCards();
      this.updatePlayersList();
    });

    this.onDocumentEvent('phaseChanged', (e: Event) => {
      if (e instanceof CustomEvent) {
        this.updatePhaseDisplay(e.detail);
        this.updatePlayersList();
      }
    });

    this.onDocumentEvent('botChatMessage', (e: Event) => {
      if (e instanceof CustomEvent) {
        const { playerId, playerName, message } = e.detail;
        this.chatBox?.addMessage(playerId, playerName, message);
      }
    });
  }

  private updatePlayerCards(): void {
    if (!this.gameEngine) return;

    const players = this.gameEngine.getPlayers();
    const playersGrid = this.shadowRoot?.querySelector('#players-grid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';

    for (const player of players) {
      const card = document.createElement('player-card') as PlayerCard;
      const isHuman = player instanceof Player;
      const showRole = false; // Hidden until game over
      
      card.setPlayer(player, isHuman, showRole);
      playersGrid.appendChild(card);

      // Store reference for later
      this.playerCards.set(player.id, card);

      // Add selection listener for voting on any alive player
      if (player.alive) {
        card.addEventListener('playerSelected', (e) => {
          if (e instanceof CustomEvent) {
            this.onPlayerSelected(e.detail.playerId);
          }
        });
      }
    }

    // Update player list in modal
    this.updatePlayersList();
  }

  private updatePlayersList(): void {
    if (!this.gameEngine) return;

    const playerList = this.shadowRoot?.querySelector('#player-list');
    if (!playerList) return;

    playerList.innerHTML = '';

    const players = this.gameEngine.getPlayers();
    for (const player of players) {
      const isHuman = player instanceof Player;
      const item = document.createElement('div');
      item.className = `player-item ${player.alive ? 'alive' : 'dead'} ${isHuman ? 'human' : ''}`;
      
      const roleName = this.getRoleName(player.role);
      const statusText = player.alive ? '✓ Leeft' : '✗ Dood';
      const playerLabel = isHuman ? ' (Jij)' : '';

      item.innerHTML = `
        <div class="player-info">
          <div class="player-name">${player.name}${playerLabel}</div>
          <div class="player-role">${roleName}</div>
        </div>
        <div class="player-status ${player.alive ? 'alive' : 'dead'}">
          ${statusText}
        </div>
      `;
      playerList.appendChild(item);
    }
  }

  private getRoleName(role: string): string {
    const roleNames: Record<string, string> = {
      'werewolf': '🐺 Weerwolf',
      'villager': '👤 Dorpeling',
      'seer': '🔮 Ziener',
      'witch': '🧙 Heks',
      'thief': '🤝 Dief',
      'cupido': '💘 Cupido',
    };
    return roleNames[role] || role;
  }

  private openPlayersModal(): void {
    const modal = this.shadowRoot?.querySelector('#players-modal');
    if (modal) {
      modal.classList.add('show');
    }
  }

  private closePlayersModal(): void {
    const modal = this.shadowRoot?.querySelector('#players-modal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  private updatePhaseDisplay(detail: any): void {
    const phaseDisplay = this.shadowRoot?.querySelector('#phase-display');
    if (phaseDisplay) {
      const phaseNames: Record<string, string> = {
        [GamePhase.NIGHT]: '🌙 Nacht',
        [GamePhase.MORNING]: '☀️ Morgen',
        [GamePhase.DAY_DISCUSSION]: '💬 Dagdiscussie',
        [GamePhase.VOTING]: '🗳️ Stemming',
        [GamePhase.EXECUTION]: '⚰️ Executie',
        [GamePhase.GAME_OVER]: '🏁 Spel Voorbij',
      };
      phaseDisplay.textContent = phaseNames[detail.phase] || detail.phase;
    }

    const playersDisplay = this.shadowRoot?.querySelector('#players-display');
    if (playersDisplay && this.gameEngine) {
      const alive = this.gameEngine.getAlivePlayers().length;
      playersDisplay.textContent = `${alive} spelers`;
    }

    const votingBtn = this.shadowRoot?.querySelector('#voting-btn');
    if (votingBtn) {
      if (detail.phase === GamePhase.DAY_DISCUSSION) {
        (votingBtn as HTMLButtonElement).disabled = false;
        (votingBtn as HTMLButtonElement).textContent = 'Stemming starten';
      } else if (detail.phase === GamePhase.VOTING) {
        (votingBtn as HTMLButtonElement).disabled = true;
        (votingBtn as HTMLButtonElement).textContent = 'Stem nu!';
      } else {
        (votingBtn as HTMLButtonElement).disabled = true;
      }
    }
  }

  private onPlayerSelected(playerId: string): void {
    if (this.gameEngine?.getPhase() !== GamePhase.VOTING) return;
    
    // Don't allow voting for yourself
    const player = this.gameEngine.getPlayers().find(p => p instanceof Player);
    if (playerId === player?.id) return;

    // Clear previous selection
    if (this.selectedPlayerId && this.selectedPlayerId !== playerId) {
      this.playerCards.get(this.selectedPlayerId)?.resetSelection();
    }

    this.selectedPlayerId = playerId;
    this.gameEngine.playerVotes(playerId);

    // Update UI
    const votingBtn = this.shadowRoot?.querySelector('#voting-btn');
    if (votingBtn) {
      (votingBtn as HTMLButtonElement).textContent = `Gestemd op: ${this.gameEngine.getPlayers().find(p => p.id === playerId)?.name}`;
    }
  }
}

customElements.define('game-board', GameBoard);
