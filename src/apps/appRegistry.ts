export interface AppDefinition {
    id: string;
    title: string;
    windowOptions?: { width?: number; height?: number };
    createContent(): HTMLElement;
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
