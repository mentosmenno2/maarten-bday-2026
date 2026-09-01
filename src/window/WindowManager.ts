interface ManagedWindow {
    id: string;
    title: string;
    element: HTMLElement;
    minimized: boolean;
}

export class WindowManager {
    private readonly areaElement: HTMLElement;
    private readonly windows = new Map<string, ManagedWindow>();
    private nextZIndex = 10;
    private nextOffset = 0;
    private activeWindowId: string | null = null;

    constructor(areaElement: HTMLElement) {
        this.areaElement = areaElement;
    }

    openWindow(id: string, title: string, content: HTMLElement): void {
        const existingWindow = this.windows.get(id);

        if (existingWindow) {
            this.activate(id);
            return;
        }

        const element = this.createWindowElement(title, content);
        element.addEventListener('pointerdown', () => this.activate(id));

        this.areaElement.append(element);
        this.windows.set(id, { id, title, element, minimized: false });
        this.activate(id);
    }

    activate(id: string): void {
        const managedWindow = this.windows.get(id);

        if (!managedWindow || this.activeWindowId === id) {
            return;
        }

        if (this.activeWindowId) {
            this.windows.get(this.activeWindowId)?.element.classList.remove('window--active');
        }

        managedWindow.element.classList.add('window--active');
        managedWindow.element.style.zIndex = String(this.nextZIndex++);
        this.activeWindowId = id;
    }

    private createWindowElement(title: string, content: HTMLElement): HTMLElement {
        const element = document.createElement('div');
        element.className = 'window';
        element.style.left = `${40 + this.nextOffset}px`;
        element.style.top = `${40 + this.nextOffset}px`;
        this.nextOffset = (this.nextOffset + 24) % 120;

        const titlebar = document.createElement('div');
        titlebar.className = 'window__titlebar';

        const titleElement = document.createElement('span');
        titleElement.className = 'window__title';
        titleElement.textContent = title;
        titlebar.append(titleElement);

        const contentElement = document.createElement('div');
        contentElement.className = 'window__content';
        contentElement.append(content);

        element.append(titlebar, contentElement);

        return element;
    }
}
