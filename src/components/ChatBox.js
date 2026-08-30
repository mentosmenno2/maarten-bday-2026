import { BaseComponent } from './BaseComponent';
/**
 * Chat display component for bot discussions
 */
export class ChatBox extends BaseComponent {
    constructor() {
        super();
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    connectedCallback() {
        this.render();
    }
    /**
     * Add a message to the chat (prepended for newest first)
     */
    addMessage(playerId, playerName, message) {
        this.messages.unshift({
            playerId,
            playerName,
            message,
            timestamp: Date.now(),
        });
        // Keep only last 20 messages
        if (this.messages.length > 20) {
            this.messages.pop();
        }
        this.render();
    }
    /**
     * Clear all messages
     */
    clearMessages() {
        this.messages = [];
        this.render();
    }
    render() {
        const shadow = this.createShadowRoot();
        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          font-family: var(--font-family);
        }

        .chat-header {
          padding: var(--spacing-md);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          background: rgba(51, 51, 51, 0.6);
        }

        .chat-header h3 {
          color: var(--color-accent);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: rgba(51, 51, 51, 0.3);
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 3px;
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }

        .message {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-sm);
          background: rgba(51, 51, 51, 0.4);
          border-left: 3px solid var(--color-secondary);
          border-radius: 4px;
          font-size: var(--font-size-sm);
          animation: slideInUp var(--transition-normal);
        }

        .message.accusation {
          border-left-color: var(--color-danger);
        }

        .message.defense {
          border-left-color: var(--color-success);
        }

        .message.bandwagon {
          border-left-color: var(--color-warning);
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .message-player {
          font-weight: var(--font-weight-bold);
          color: var(--color-accent);
        }

        .message-text {
          color: #ccc;
          line-height: 1.4;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #666;
          font-size: var(--font-size-sm);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <div class="chat-container">
        <div class="chat-header">
          <h3>💬 Dagdiscussie</h3>
        </div>
        <div class="chat-messages">
          ${this.messages.length === 0
            ? '<div class="empty-state">Wachten op bots om te spreken...</div>'
            : this.messages.map(msg => `
              <div class="message ${this.getChatType(msg.message)}">
                <div class="message-header">
                  <span class="message-player">${msg.playerName}</span>
                </div>
                <div class="message-text">${this.escapeHtml(msg.message)}</div>
              </div>
            `).join('')}
        </div>
      </div>
    `;
    }
    getChatType(message) {
        if (message.includes('vertrouw') || message.includes('verdacht') || message.includes('schuldig')) {
            return 'accusation';
        }
        else if (message.includes('onschuldig') || message.includes('onschuldi')) {
            return 'defense';
        }
        else if (message.includes('eens') || message.includes('mee')) {
            return 'bandwagon';
        }
        return '';
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
customElements.define('chat-box', ChatBox);
//# sourceMappingURL=ChatBox.js.map