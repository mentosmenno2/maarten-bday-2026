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
  protected createShadowRoot(): ShadowRoot {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    return this.shadowRoot!;
  }

  /**
   * Add global styles to shadow DOM
   */
  protected addGlobalStyles(shadow: ShadowRoot): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/style.scss';
    shadow.appendChild(link);
  }

  /**
   * Dispatch a custom event
   */
  protected dispatchCustomEvent(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  /**
   * Listen to document events
   */
  protected onDocumentEvent(eventName: string, handler: (event: Event) => void): void {
    document.addEventListener(eventName, handler);
  }

  /**
   * Remove document event listener
   */
  protected offDocumentEvent(eventName: string, handler: (event: Event) => void): void {
    document.removeEventListener(eventName, handler);
  }
}
