import { BaseComponent } from './BaseComponent';
/**
 * Chat display component for bot discussions
 */
export declare class ChatBox extends BaseComponent {
    private messages;
    constructor();
    connectedCallback(): void;
    /**
     * Add a message to the chat (prepended for newest first)
     */
    addMessage(playerId: string, playerName: string, message: string): void;
    /**
     * Clear all messages
     */
    clearMessages(): void;
    private render;
    private getChatType;
    private escapeHtml;
}
//# sourceMappingURL=ChatBox.d.ts.map