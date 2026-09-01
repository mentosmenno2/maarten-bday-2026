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
    private readonly dateFormatter = new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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
        this.dateElement.textContent = this.dateFormatter.format(now);
    }
}
