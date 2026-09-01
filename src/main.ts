import './styles/main.scss';
import { registerApp } from './apps/appRegistry';
import { createOpenApp } from './apps/openApp';
import { registerDefaultApps } from './apps/registerDefaultApps';
import { BootFlow } from './boot/BootFlow';
import { createOpenDateTimeWindow } from './desktop/DateTimeWindow';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';
import { SystemClock } from './desktop/SystemClock';
import { registerEasterEggs } from './easter-eggs/registerEasterEggs';
import { WindowManager } from './window/WindowManager';
import { createShowDialog } from './window/showDialog';

registerDefaultApps();

const clockButtonElement = document.querySelector<HTMLElement>('.taskbar__clock');
const clockTimeElement = document.querySelector<HTMLElement>('.taskbar__clock-time');
const clockDateElement = document.querySelector<HTMLElement>('.taskbar__clock-date');

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
    clockButtonElement &&
    clockTimeElement &&
    clockDateElement &&
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

    const systemClock = new SystemClock();
    const desktopClock = new DesktopClock(clockTimeElement, clockDateElement, systemClock);
    desktopClock.start();

    const openDateTimeWindow = createOpenDateTimeWindow(
        windowManager,
        systemClock,
        showDialog,
        () => desktopClock.render(),
    );
    clockButtonElement.addEventListener('click', () => openDateTimeWindow());

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
