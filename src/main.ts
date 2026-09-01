import './styles/main.scss';
import { DesktopClock } from './desktop/DesktopClock';

const clockElement = document.querySelector<HTMLElement>('.taskbar__clock');

if (clockElement) {
    new DesktopClock(clockElement).start();
}
