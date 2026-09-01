export interface BootScreens {
    container: HTMLElement;
    powerOff: HTMLElement;
    booting: HTMLElement;
    login: HTMLElement;
}

const BOOT_DURATION_MS = 2600;
const RESTART_DELAY_MS = 1400;

export class BootFlow {
    private readonly screens: BootScreens;
    private timerId: number | null = null;

    constructor(screens: BootScreens) {
        this.screens = screens;
        this.showPowerOff();
    }

    showPowerOff(): void {
        this.clearTimer();
        this.setActiveScreen(this.screens.powerOff);
    }

    startBooting(): void {
        this.clearTimer();
        this.setActiveScreen(this.screens.booting);
        this.timerId = window.setTimeout(() => this.showLogin(), BOOT_DURATION_MS);
    }

    showLogin(): void {
        this.clearTimer();
        this.setActiveScreen(this.screens.login);
    }

    showDesktop(): void {
        this.clearTimer();
        this.screens.container.hidden = true;
    }

    logOff(): void {
        this.showLogin();
    }

    turnOff(): void {
        this.showPowerOff();
    }

    restart(): void {
        this.showPowerOff();
        this.timerId = window.setTimeout(() => this.startBooting(), RESTART_DELAY_MS);
    }

    private setActiveScreen(screen: HTMLElement): void {
        this.screens.container.hidden = false;
        [this.screens.powerOff, this.screens.booting, this.screens.login].forEach((element) => {
            element.hidden = element !== screen;
        });
    }

    private clearTimer(): void {
        if (this.timerId !== null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}
