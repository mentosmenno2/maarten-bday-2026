import type { ShowDialog } from '../window/showDialog';

export interface StartMenuActions {
    openApp: (id: string) => void;
    showDialog: ShowDialog;
    onLogOff: () => void;
    onTurnOff: () => void;
}

export class StartMenu {
    private readonly menuElement: HTMLElement;
    private readonly buttonElement: HTMLElement;
    private readonly actions: StartMenuActions;

    constructor(menuElement: HTMLElement, buttonElement: HTMLElement, actions: StartMenuActions) {
        this.menuElement = menuElement;
        this.buttonElement = buttonElement;
        this.actions = actions;

        this.buttonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggle();
        });

        this.menuElement.addEventListener('click', (event) => {
            event.stopPropagation();

            const target = event.target as HTMLElement;
            const item = target.closest<HTMLElement>('.start-menu__item');

            if (item?.dataset.appId) {
                this.actions.openApp(item.dataset.appId);
                this.close();
                return;
            }

            const action = target.closest<HTMLElement>('.start-menu__action')?.dataset.action;

            if (action === 'log-off') {
                this.close();
                this.showLogOffDialog();
            }

            if (action === 'turn-off') {
                this.close();
                this.showTurnOffDialog();
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

    private showLogOffDialog(): void {
        this.actions.showDialog({
            title: 'Log Off Windows',
            message: 'Are you sure you want to log off?',
            buttons: [
                { label: 'Log Off', onClick: () => this.actions.onLogOff() },
                { label: 'Cancel' },
            ],
        });
    }

    private showTurnOffDialog(): void {
        this.actions.showDialog({
            title: 'Turn off computer',
            message: 'Are you sure you want to turn off your computer?',
            buttons: [
                { label: 'Turn Off', onClick: () => this.actions.onTurnOff() },
                { label: 'Cancel' },
            ],
        });
    }
}
