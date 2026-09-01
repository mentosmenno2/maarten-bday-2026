import './styles/main.scss';
import { DesktopClock } from './desktop/DesktopClock';
import { DesktopIcons } from './desktop/DesktopIcons';
import { StartMenu } from './desktop/StartMenu';

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
}
