import './styles/main.scss';
import { getApps } from './apps/appRegistry';
import { createOpenApp } from './apps/openApp';
import { registerDefaultApps } from './apps/registerDefaultApps';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';
import { WindowManager } from './window/WindowManager';

registerDefaultApps();

const clockElement = document.querySelector<HTMLElement>('.taskbar__clock');

if (clockElement) {
    new DesktopClock(clockElement).start();
}

const startMenuElement = document.querySelector<HTMLElement>('.start-menu');
const startButtonElement = document.querySelector<HTMLElement>('.start-button');

if (startMenuElement && startButtonElement) {
    new StartMenu(startMenuElement, startButtonElement);
}

const desktopAreaElement = document.querySelector<HTMLElement>('.desktop__area');
const taskbarWindowsElement = document.querySelector<HTMLElement>('.taskbar__windows');

if (desktopAreaElement && taskbarWindowsElement) {
    new DesktopIcons(desktopAreaElement);

    const windowManager = new WindowManager(desktopAreaElement, taskbarWindowsElement);
    const openApp = createOpenApp(windowManager);

    // Tijdelijke triggers, worden vervangen door de desktopiconen in stap 24.
    getApps().forEach((app) => {
        const testButton = document.createElement('button');
        testButton.className = 'window-test-button';
        testButton.textContent = app.title;
        testButton.addEventListener('click', () => openApp(app.id));
        desktopAreaElement.append(testButton);
    });
}
