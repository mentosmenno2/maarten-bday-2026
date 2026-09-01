export class StartMenu {
    private readonly menuElement: HTMLElement;
    private readonly buttonElement: HTMLElement;

    constructor(menuElement: HTMLElement, buttonElement: HTMLElement) {
        this.menuElement = menuElement;
        this.buttonElement = buttonElement;

        this.buttonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggle();
        });

        this.menuElement.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        document.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        });
    }

    get isOpen(): boolean {
        return !this.menuElement.hidden;
    }

    open(): void {
        this.menuElement.hidden = false;
        this.buttonElement.classList.add('start-button--open');
    }

    close(): void {
        this.menuElement.hidden = true;
        this.buttonElement.classList.remove('start-button--open');
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}
