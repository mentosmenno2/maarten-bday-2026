import { playSound } from '../audio/SoundPlayer';
import type { WindowManager } from '../window/WindowManager';

export interface DialogButton {
    label: string;
    onClick?: () => void;
}

export interface DialogOptions {
    title: string;
    message: string;
    icon?: string;
    buttons?: DialogButton[];
}

export type ShowDialog = (options: DialogOptions) => void;

let dialogCount = 0;

export function createShowDialog(windowManager: WindowManager): ShowDialog {
    return ({ title, message, icon, buttons = [{ label: 'OK' }] }: DialogOptions): void => {
        const id = `dialog-${++dialogCount}`;

        playSound('dialog');

        const container = document.createElement('div');
        container.className = 'dialog';

        const body = document.createElement('div');
        body.className = 'dialog__body';

        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.className = 'dialog__icon';
            iconElement.style.backgroundImage = `url('${icon}')`;
            body.append(iconElement);
        }

        const messageElement = document.createElement('p');
        messageElement.className = 'dialog__message';
        messageElement.textContent = message;
        body.append(messageElement);

        const buttonBar = document.createElement('div');
        buttonBar.className = 'dialog__buttons';

        buttons.forEach((button) => {
            const buttonElement = document.createElement('button');
            buttonElement.type = 'button';
            buttonElement.className = 'dialog__button';
            buttonElement.textContent = button.label;
            buttonElement.addEventListener('click', () => {
                windowManager.closeWindow(id);
                button.onClick?.();
            });
            buttonBar.append(buttonElement);
        });

        container.append(body, buttonBar);

        windowManager.openWindow(id, title, container, {
            width: 320,
            height: 150,
            controls: false,
            centered: true,
        });
    };
}
