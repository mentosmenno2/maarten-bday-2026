import { getApp } from './appRegistry';
import type { WindowManager } from '../window/WindowManager';

export function createOpenApp(windowManager: WindowManager): (id: string) => void {
    return (id: string): void => {
        const app = getApp(id);

        if (!app) {
            return;
        }

        windowManager.openWindow(app.id, app.title, app.createContent());
    };
}
