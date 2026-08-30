/**
 * Base Web Component class with common functionality
 */
export class BaseComponent extends HTMLElement {
    constructor() {
        super();
    }
    /**
     * Create and attach a shadow DOM
     */
    createShadowRoot() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        return this.shadowRoot;
    }
    /**
     * Add global styles to shadow DOM
     */
    addGlobalStyles(shadow) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/src/style.scss';
        shadow.appendChild(link);
    }
    /**
     * Dispatch a custom event
     */
    dispatchCustomEvent(name, detail) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }
    /**
     * Listen to document events
     */
    onDocumentEvent(eventName, handler) {
        document.addEventListener(eventName, handler);
    }
    /**
     * Remove document event listener
     */
    offDocumentEvent(eventName, handler) {
        document.removeEventListener(eventName, handler);
    }
}
//# sourceMappingURL=BaseComponent.js.map