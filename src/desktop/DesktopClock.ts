import type { SystemClock } from './SystemClock';

export class DesktopClock {
    private readonly timeElement: HTMLElement;
    private readonly dateElement: HTMLElement;
    private readonly systemClock: SystemClock;
    private readonly timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    constructor(timeElement: HTMLElement, dateElement: HTMLElement, systemClock: SystemClock) {
        this.timeElement = timeElement;
        this.dateElement = dateElement;
        this.systemClock = systemClock;
    }

    start(): void {
        this.render();
        window.setInterval(() => this.render(), 1000);
    }

    render(): void {
        const now = this.systemClock.getNow();
        this.timeElement.textContent = this.timeFormatter.format(now);
        this.dateElement.textContent = toIsoDate(now);
    }
}

function toIsoDate(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
