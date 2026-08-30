import { BaseComponent } from './BaseComponent';
import { ChatBox } from './ChatBox';
import { GamePhase } from '../types/GamePhase';
import { Player } from '../models/Player';
/**
 * Main game board component
 */
export class GameBoard extends BaseComponent {
    constructor() {
        super();
        Object.defineProperty(this, "gameEngine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "playerCards", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "chatBox", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "selectedPlayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    connectedCallback() {
        this.render();
        this.attachGlobalEventListeners();
    }
    /**
     * Initialize game board with game engine
     */
    setGameEngine(engine) {
        this.gameEngine = engine;
        this.render();
        this.updatePlayerCards();
    }
    render() {
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
              <div class="phase-badge" id="players-display">Spelers</div>
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
    `;
        this.setupChatBox();
        this.attachEventListeners();
    }
    setupChatBox() {
        const chatElement = this.shadowRoot?.querySelector('#chat-box');
        if (chatElement instanceof ChatBox) {
            this.chatBox = chatElement;
        }
    }
    attachEventListeners() {
        const votingBtn = this.shadowRoot?.querySelector('#voting-btn');
        votingBtn?.addEventListener('click', () => {
            if (this.gameEngine?.getPhase() === GamePhase.DAY_DISCUSSION) {
                this.gameEngine.advanceToVoting();
            }
        });
    }
    attachGlobalEventListeners() {
        this.onDocumentEvent('playerDied', (e) => {
            this.updatePlayerCards();
        });
        this.onDocumentEvent('playerExecuted', (e) => {
            this.updatePlayerCards();
        });
        this.onDocumentEvent('phaseChanged', (e) => {
            if (e instanceof CustomEvent) {
                this.updatePhaseDisplay(e.detail);
            }
        });
        this.onDocumentEvent('botChatMessage', (e) => {
            if (e instanceof CustomEvent) {
                const { playerId, playerName, message } = e.detail;
                this.chatBox?.addMessage(playerId, playerName, message);
            }
        });
    }
    updatePlayerCards() {
        if (!this.gameEngine)
            return;
        const players = this.gameEngine.getPlayers();
        const playersGrid = this.shadowRoot?.querySelector('#players-grid');
        if (!playersGrid)
            return;
        playersGrid.innerHTML = '';
        for (const player of players) {
            const card = document.createElement('player-card');
            const isHuman = player instanceof Player;
            const showRole = false; // Hidden until game over
            card.setPlayer(player, isHuman, showRole);
            playersGrid.appendChild(card);
            // Store reference for later
            this.playerCards.set(player.id, card);
            // Add selection listener for voting
            if (player.alive && !isHuman) {
                card.addEventListener('playerSelected', (e) => {
                    if (e instanceof CustomEvent) {
                        this.onPlayerSelected(e.detail.playerId);
                    }
                });
            }
        }
    }
    updatePhaseDisplay(detail) {
        const phaseDisplay = this.shadowRoot?.querySelector('#phase-display');
        if (phaseDisplay) {
            const phaseNames = {
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
                votingBtn.disabled = false;
                votingBtn.textContent = 'Stemming starten';
            }
            else if (detail.phase === GamePhase.VOTING) {
                votingBtn.disabled = true;
                votingBtn.textContent = 'Stem nu!';
            }
            else {
                votingBtn.disabled = true;
            }
        }
    }
    onPlayerSelected(playerId) {
        if (this.gameEngine?.getPhase() !== GamePhase.VOTING)
            return;
        // Clear previous selection
        if (this.selectedPlayerId && this.selectedPlayerId !== playerId) {
            this.playerCards.get(this.selectedPlayerId)?.resetSelection();
        }
        this.selectedPlayerId = playerId;
        this.gameEngine.playerVotes(playerId);
        // Update UI
        const votingBtn = this.shadowRoot?.querySelector('#voting-btn');
        if (votingBtn) {
            votingBtn.textContent = `Gestemd op: ${this.gameEngine.getPlayers().find(p => p.id === playerId)?.name}`;
        }
    }
}
customElements.define('game-board', GameBoard);
//# sourceMappingURL=GameBoard.js.map