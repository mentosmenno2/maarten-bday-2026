import './styles/main.scss';
import { createOpenApp } from './apps/openApp';
import { registerDefaultApps } from './apps/registerDefaultApps';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';
import { WindowManager } from './window/WindowManager';
import { createShowDialog } from './window/showDialog';

registerDefaultApps();

const clockElement = document.querySelector<HTMLElement>('.taskbar__clock');

if (clockElement) {
    new DesktopClock(clockElement).start();
}

const startMenuElement = document.querySelector<HTMLElement>('.start-menu');
const startButtonElement = document.querySelector<HTMLElement>('.start-button');
const desktopAreaElement = document.querySelector<HTMLElement>('.desktop__area');
const taskbarWindowsElement = document.querySelector<HTMLElement>('.taskbar__windows');

if (desktopAreaElement && taskbarWindowsElement) {
    const windowManager = new WindowManager(desktopAreaElement, taskbarWindowsElement);
    const openApp = createOpenApp(windowManager);
    const showDialog = createShowDialog(windowManager);

    new DesktopIcons(desktopAreaElement, openApp);

    if (startMenuElement && startButtonElement) {
        new StartMenu(startMenuElement, startButtonElement, openApp, showDialog);
    }
}
