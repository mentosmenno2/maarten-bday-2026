import type { WindowManager } from '../window/WindowManager';

export interface DialogButton {
    label: string;
    onClick?: () => void;
}

export interface DialogOptions {
    title: string;
    message: string;
    buttons?: DialogButton[];
}

export type ShowDialog = (options: DialogOptions) => void;

let dialogCount = 0;

export function createShowDialog(windowManager: WindowManager): ShowDialog {
    return ({ title, message, buttons = [{ label: 'OK' }] }: DialogOptions): void => {
        const id = `dialog-${++dialogCount}`;

        const container = document.createElement('div');
        container.className = 'dialog';

        const messageElement = document.createElement('p');
        messageElement.className = 'dialog__message';
        messageElement.textContent = message;

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

        container.append(messageElement, buttonBar);

        windowManager.openWindow(id, title, container, {
            width: 320,
            height: 150,
            controls: false,
            centered: true,
        });
    };
}
