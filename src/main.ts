import './styles/main.scss';
import { registerApp } from './apps/appRegistry';
import { createOpenApp } from './apps/openApp';
import { registerDefaultApps } from './apps/registerDefaultApps';
import { BootFlow } from './boot/BootFlow';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';
import { registerEasterEggs } from './easter-eggs/registerEasterEggs';
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

const bootScreensElement = document.querySelector<HTMLElement>('[data-boot-screens]');
const powerOffScreenElement = document.querySelector<HTMLElement>('[data-screen="power-off"]');
const bootingScreenElement = document.querySelector<HTMLElement>('[data-screen="booting"]');
const loginScreenElement = document.querySelector<HTMLElement>('[data-screen="login"]');
const powerOnButtonElement = document.querySelector<HTMLElement>('[data-action="power-on"]');
const logInButtonElement = document.querySelector<HTMLElement>('[data-action="log-in"]');

if (
    desktopAreaElement &&
    taskbarWindowsElement &&
    bootScreensElement &&
    powerOffScreenElement &&
    bootingScreenElement &&
    loginScreenElement &&
    powerOnButtonElement &&
    logInButtonElement
) {
    const windowManager = new WindowManager(desktopAreaElement, taskbarWindowsElement);
    const openApp = createOpenApp(windowManager);
    const showDialog = createShowDialog(windowManager);

    const bootFlow = new BootFlow({
        container: bootScreensElement,
        powerOff: powerOffScreenElement,
        booting: bootingScreenElement,
        login: loginScreenElement,
    });

    powerOnButtonElement.addEventListener('click', () => bootFlow.startBooting());
    logInButtonElement.addEventListener('click', () => bootFlow.showDesktop());

    new DesktopIcons(desktopAreaElement, openApp);

    if (startMenuElement && startButtonElement) {
        new StartMenu(startMenuElement, startButtonElement, {
            openApp,
            showDialog,
            onLogOff: () => {
                windowManager.closeAllWindows();
                bootFlow.logOff();
            },
            onTurnOff: () => {
                windowManager.closeAllWindows();
                bootFlow.turnOff();
            },
        });
    }

    registerEasterEggs({
        windowManager,
        desktopElement: desktopAreaElement,
        openApp,
        showDialog,
        registerApp,
    });
}
