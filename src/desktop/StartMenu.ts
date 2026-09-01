export class StartMenu {
    private readonly menuElement: HTMLElement;
    private readonly buttonElement: HTMLElement;
    private readonly openApp: (id: string) => void;

    constructor(menuElement: HTMLElement, buttonElement: HTMLElement, openApp: (id: string) => void) {
        this.menuElement = menuElement;
        this.buttonElement = buttonElement;
        this.openApp = openApp;

        this.buttonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggle();
        });

        this.menuElement.addEventListener('click', (event) => {
            event.stopPropagation();

            const target = event.target as HTMLElement;
            const item = target.closest<HTMLElement>('.start-menu__item');

            if (item?.dataset.appId) {
                this.openApp(item.dataset.appId);
                this.close();
            }
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
