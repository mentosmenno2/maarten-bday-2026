import './styles/main.scss';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';
import { WindowManager } from './window/WindowManager';

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

if (desktopAreaElement) {
    new DesktopIcons(desktopAreaElement);

    const windowManager = new WindowManager(desktopAreaElement);

    // Tijdelijke testknoppen, worden verwijderd zodra apps gekoppeld zijn.
    ['A', 'B', 'C'].forEach((name) => {
        const testButton = document.createElement('button');
        testButton.className = 'window-test-button';
        testButton.textContent = `Testvenster ${name}`;
        testButton.addEventListener('click', () => {
            const content = document.createElement('p');
            content.textContent = `Dit is testvenster ${name}.`;
            windowManager.openWindow(`test-window-${name}`, `Testvenster ${name}`, content);
        });
        desktopAreaElement.append(testButton);
    });
}
