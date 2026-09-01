import type { AppDefinition } from '../apps/appRegistry';
import type { ShowDialog } from '../window/showDialog';
import type { WindowManager } from '../window/WindowManager';

export interface EasterEggContext {
    windowManager: WindowManager;
    desktopElement: HTMLElement;
    openApp: (id: string) => void;
    showDialog: ShowDialog;
    registerApp: (app: AppDefinition) => void;
}

/**
 * Plek voor persoonlijke easter eggs. Voorbeelden:
 *
 *   showDialog({ title: 'Birthday.exe', message: 'Gefeliciteerd!' });
 *   openApp('notepad');
 *   registerApp({ id: 'secret', title: 'secret.exe', createContent: () => document.createElement('div') });
 *   desktopElement.addEventListener('dblclick', () => openApp('secret'));
 */
export function registerEasterEggs(_context: EasterEggContext): void {
    // Easter eggs komen hier.
}
