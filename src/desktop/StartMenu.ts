import type { ShowDialog } from '../window/showDialog';

export class StartMenu {
    private readonly menuElement: HTMLElement;
    private readonly buttonElement: HTMLElement;
    private readonly openApp: (id: string) => void;
    private readonly showDialog: ShowDialog;

    constructor(
        menuElement: HTMLElement,
        buttonElement: HTMLElement,
        openApp: (id: string) => void,
        showDialog: ShowDialog,
    ) {
        this.menuElement = menuElement;
        this.buttonElement = buttonElement;
        this.openApp = openApp;
        this.showDialog = showDialog;

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
        this.showDialog({
            title: 'Log Off Windows',
            message: 'Are you sure you want to log off?',
            buttons: [
                {
                    label: 'Log Off',
                    onClick: () =>
                        this.showDialog({
                            title: 'Windows',
                            message: 'Menno mag blijven. Uitloggen is geannuleerd.',
                        }),
                },
                { label: 'Cancel' },
            ],
        });
    }

    private showTurnOffDialog(): void {
        const respond = (message: string) => () => this.showDialog({ title: 'Windows', message });

        this.showDialog({
            title: 'Turn off computer',
            message: 'What do you want the computer to do?',
            buttons: [
                { label: 'Stand By', onClick: respond('De computer heeft even geen zin.') },
                { label: 'Turn Off', onClick: respond('Deze computer laat zich niet uitzetten.') },
                { label: 'Restart', onClick: respond('Herstarten duurt ongeveer 25 jaar.') },
            ],
        });
    }
}
