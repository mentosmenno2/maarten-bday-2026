import { playSound } from '../audio/SoundPlayer';

export interface WindowOptions {
    width?: number;
    height?: number;
    controls?: boolean;
    centered?: boolean;
}

interface ManagedWindow {
    id: string;
    title: string;
    element: HTMLElement;
    taskbarButton: HTMLButtonElement;
    minimized: boolean;
    restoreBounds: { left: string; top: string; width: string; height: string } | null;
}

export class WindowManager {
    private readonly areaElement: HTMLElement;
    private readonly taskbarElement: HTMLElement;
    private readonly windows = new Map<string, ManagedWindow>();
    private nextZIndex = 10;
    private nextOffset = 0;
    private activeWindowId: string | null = null;

    constructor(areaElement: HTMLElement, taskbarElement: HTMLElement) {
        this.areaElement = areaElement;
        this.taskbarElement = taskbarElement;
    }

    openWindow(id: string, title: string, content: HTMLElement, options: WindowOptions = {}): void {
        if (this.windows.has(id)) {
            this.activate(id);
            return;
        }

        const element = this.createWindowElement(id, title, content, options);
        element.addEventListener('pointerdown', () => this.activate(id));

        const taskbarButton = this.createTaskbarButton(id, title);

        this.areaElement.append(element);
        this.taskbarElement.append(taskbarButton);
        this.windows.set(id, { id, title, element, taskbarButton, minimized: false, restoreBounds: null });
        this.activate(id);
    }

    closeWindow(id: string): void {
        const managedWindow = this.windows.get(id);

        if (!managedWindow) {
            return;
        }

        managedWindow.element.remove();
        managedWindow.taskbarButton.remove();
        this.windows.delete(id);

        if (this.activeWindowId === id) {
            this.activeWindowId = null;
        }
    }

    closeAllWindows(): void {
        [...this.windows.keys()].forEach((id) => this.closeWindow(id));
    }

    activate(id: string): void {
        const managedWindow = this.windows.get(id);

        if (!managedWindow) {
            return;
        }

        if (managedWindow.minimized) {
            managedWindow.minimized = false;
            managedWindow.element.hidden = false;
            playSound('restore');
        }

        if (this.activeWindowId === id) {
            return;
        }

        if (this.activeWindowId) {
            const previousWindow = this.windows.get(this.activeWindowId);
            previousWindow?.element.classList.remove('window--active');
            previousWindow?.taskbarButton.classList.remove('taskbar-button--active');
        }

        managedWindow.element.classList.add('window--active');
        managedWindow.taskbarButton.classList.add('taskbar-button--active');
        managedWindow.element.style.zIndex = String(this.nextZIndex++);
        this.activeWindowId = id;
    }

    minimizeWindow(id: string): void {
        const managedWindow = this.windows.get(id);

        if (!managedWindow || managedWindow.minimized) {
            return;
        }

        managedWindow.minimized = true;
        managedWindow.element.hidden = true;
        managedWindow.element.classList.remove('window--active');
        managedWindow.taskbarButton.classList.remove('taskbar-button--active');
        playSound('minimize');

        if (this.activeWindowId === id) {
            this.activeWindowId = null;
        }
    }

    toggleMaximize(id: string): void {
        const managedWindow = this.windows.get(id);

        if (!managedWindow) {
            return;
        }

        const { element } = managedWindow;

        if (managedWindow.restoreBounds) {
            Object.assign(element.style, managedWindow.restoreBounds);
            managedWindow.restoreBounds = null;
            element.classList.remove('window--maximized');
            return;
        }

        managedWindow.restoreBounds = {
            left: element.style.left,
            top: element.style.top,
            width: element.style.width,
            height: element.style.height,
        };

        element.style.left = '0px';
        element.style.top = '0px';
        element.style.width = `${this.areaElement.clientWidth}px`;
        element.style.height = `${this.areaElement.clientHeight}px`;
        element.classList.add('window--maximized');
    }

    private createWindowElement(id: string, title: string, content: HTMLElement, options: WindowOptions): HTMLElement {
        const element = document.createElement('div');
        element.className = 'window';

        if (options.width) {
            element.style.width = `${options.width}px`;
        }

        if (options.height) {
            element.style.height = `${options.height}px`;
        }

        if (options.centered) {
            element.classList.add('window--centered');
        } else {
            element.style.left = `${40 + this.nextOffset}px`;
            element.style.top = `${40 + this.nextOffset}px`;
            this.nextOffset = (this.nextOffset + 24) % 120;
        }

        const titlebar = document.createElement('div');
        titlebar.className = 'window__titlebar';

        const titleElement = document.createElement('span');
        titleElement.className = 'window__title';
        titleElement.textContent = title;

        const controls = document.createElement('div');
        controls.className = 'window__controls';

        if (options.controls !== false) {
            const minimizeButton = document.createElement('button');
            minimizeButton.type = 'button';
            minimizeButton.className = 'window__control window__control--minimize';
            minimizeButton.title = 'Minimize';
            minimizeButton.textContent = '_';
            minimizeButton.addEventListener('click', () => this.minimizeWindow(id));

            const maximizeButton = document.createElement('button');
            maximizeButton.type = 'button';
            maximizeButton.className = 'window__control window__control--maximize';
            maximizeButton.title = 'Maximize';
            maximizeButton.textContent = '□';
            maximizeButton.addEventListener('click', () => this.toggleMaximize(id));

            controls.append(minimizeButton, maximizeButton);
        }

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'window__control window__control--close';
        closeButton.title = 'Close';
        closeButton.textContent = '✕';
        closeButton.addEventListener('click', () => this.closeWindow(id));
        controls.append(closeButton);

        titlebar.append(titleElement, controls);
        this.makeDraggable(element, titlebar);

        const contentElement = document.createElement('div');
        contentElement.className = 'window__content';
        contentElement.append(content);

        element.append(titlebar, contentElement);

        return element;
    }

    private makeDraggable(element: HTMLElement, titlebar: HTMLElement): void {
        titlebar.addEventListener('pointerdown', (event: PointerEvent) => {
            if ((event.target as HTMLElement).closest('.window__control')) {
                return;
            }

            // Gecentreerde vensters staan via transform gepositioneerd; zet ze eerst om naar left/top.
            if (element.classList.contains('window--centered')) {
                const rect = element.getBoundingClientRect();
                const areaRect = this.areaElement.getBoundingClientRect();
                element.classList.remove('window--centered');
                element.style.left = `${rect.left - areaRect.left}px`;
                element.style.top = `${rect.top - areaRect.top}px`;
            }

            const startX = event.clientX;
            const startY = event.clientY;
            const startLeft = element.offsetLeft;
            const startTop = element.offsetTop;

            titlebar.setPointerCapture(event.pointerId);

            const onPointerMove = (moveEvent: PointerEvent): void => {
                const left = startLeft + moveEvent.clientX - startX;
                const top = startTop + moveEvent.clientY - startY;

                element.style.left = `${this.clampLeft(left, element)}px`;
                element.style.top = `${this.clampTop(top)}px`;
            };

            const onPointerUp = (): void => {
                titlebar.removeEventListener('pointermove', onPointerMove);
                titlebar.removeEventListener('pointerup', onPointerUp);
                titlebar.removeEventListener('pointercancel', onPointerUp);
            };

            titlebar.addEventListener('pointermove', onPointerMove);
            titlebar.addEventListener('pointerup', onPointerUp);
            titlebar.addEventListener('pointercancel', onPointerUp);
        });
    }

    // Houd altijd een stuk titelbalk binnen het desktopgebied bereikbaar.
    private clampLeft(left: number, element: HTMLElement): number {
        const minLeft = 40 - element.offsetWidth;
        const maxLeft = this.areaElement.clientWidth - 40;

        return Math.min(Math.max(left, minLeft), maxLeft);
    }

    private clampTop(top: number): number {
        const maxTop = this.areaElement.clientHeight - 26;

        return Math.min(Math.max(top, 0), maxTop);
    }

    private createTaskbarButton(id: string, title: string): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'taskbar-button';
        button.textContent = title;
        button.addEventListener('click', () => {
            if (this.activeWindowId === id) {
                this.minimizeWindow(id);
                return;
            }

            this.activate(id);
        });

        return button;
    }
}
