import type { ShowDialog } from '../window/showDialog';

export interface AppContext {
    showDialog: ShowDialog;
}

export interface AppDefinition {
    id: string;
    title: string;
    windowOptions?: { width?: number; height?: number };
    createContent(context: AppContext): HTMLElement;
}

const apps = new Map<string, AppDefinition>();

export function registerApp(app: AppDefinition): void {
    apps.set(app.id, app);
}

export function getApps(): AppDefinition[] {
    return [...apps.values()];
}

export function getApp(id: string): AppDefinition | undefined {
    return apps.get(id);
}
