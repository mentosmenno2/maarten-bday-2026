/**
 * Base Web Component class with common functionality
 */
export declare class BaseComponent extends HTMLElement {
    constructor();
    /**
     * Create and attach a shadow DOM
     */
    protected createShadowRoot(): ShadowRoot;
    /**
     * Add global styles to shadow DOM
     */
    protected addGlobalStyles(shadow: ShadowRoot): void;
    /**
     * Dispatch a custom event
     */
    protected dispatchCustomEvent(name: string, detail?: unknown): void;
    /**
     * Listen to document events
     */
    protected onDocumentEvent(eventName: string, handler: (event: Event) => void): void;
    /**
     * Remove document event listener
     */
    protected offDocumentEvent(eventName: string, handler: (event: Event) => void): void;
}
//# sourceMappingURL=BaseComponent.d.ts.map