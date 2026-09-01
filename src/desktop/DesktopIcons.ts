export class DesktopIcons {
    private readonly areaElement: HTMLElement;

    constructor(areaElement: HTMLElement) {
        this.areaElement = areaElement;

        this.areaElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const icon = target.closest<HTMLElement>('.desktop-icon');

            if (icon) {
                this.select(icon);
                return;
            }

            this.clearSelection();
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
