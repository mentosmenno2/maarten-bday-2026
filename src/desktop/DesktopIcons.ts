export class DesktopIcons {
    private readonly areaElement: HTMLElement;
    private readonly openApp: (id: string) => void;

    constructor(areaElement: HTMLElement, openApp: (id: string) => void) {
        this.areaElement = areaElement;
        this.openApp = openApp;

        this.areaElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const icon = target.closest<HTMLElement>('.desktop-icon');

            if (icon) {
                this.select(icon);
                return;
            }

            this.clearSelection();
        });

        this.areaElement.addEventListener('dblclick', (event) => {
            const target = event.target as HTMLElement;
            const icon = target.closest<HTMLElement>('.desktop-icon');

            if (icon?.dataset.appId) {
                this.openApp(icon.dataset.appId);
            }
        });
    }

    private select(icon: HTMLElement): void {
        this.clearSelection();
        icon.classList.add('desktop-icon--selected');
    }

    private clearSelection(): void {
        this.areaElement
            .querySelectorAll('.desktop-icon--selected')
            .forEach((icon) => icon.classList.remove('desktop-icon--selected'));
    }
}
