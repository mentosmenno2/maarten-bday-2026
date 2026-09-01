const DOUBLE_TAP_THRESHOLD_MS = 400;

export class DesktopIcons {
    private readonly areaElement: HTMLElement;
    private readonly openApp: (id: string) => void;
    private lastClickedIcon: HTMLElement | null = null;
    private lastClickedAt = 0;

    constructor(areaElement: HTMLElement, openApp: (id: string) => void) {
        this.areaElement = areaElement;
        this.openApp = openApp;

        // 'click' fires for both mouse and touch, unlike 'dblclick' on touch devices.
        this.areaElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const icon = target.closest<HTMLElement>('.desktop-icon');

            if (!icon) {
                this.clearSelection();
                return;
            }

            this.select(icon);

            const now = Date.now();
            const isDoubleClick = icon === this.lastClickedIcon && now - this.lastClickedAt < DOUBLE_TAP_THRESHOLD_MS;

            this.lastClickedIcon = icon;
            this.lastClickedAt = now;

            if (isDoubleClick && icon.dataset.appId) {
                this.lastClickedAt = 0;
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
