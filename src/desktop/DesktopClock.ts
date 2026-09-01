export class DesktopClock {
    private readonly element: HTMLElement;
    private readonly formatter = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    constructor(element: HTMLElement) {
        this.element = element;
    }

    start(): void {
        this.render();
        window.setInterval(() => this.render(), 1000);
    }

    private render(): void {
        this.element.textContent = this.formatter.format(new Date());
    }
}
