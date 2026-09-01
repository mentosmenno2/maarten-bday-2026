import successIconUrl from '../assets/icons/success.png';
import heartsIconUrl from '../assets/icons/hearts.png';
import type { ShowDialog } from '../window/showDialog';
import type { WindowManager } from '../window/WindowManager';
import type { SystemClock } from './SystemClock';

const WINDOW_ID = 'date-time-properties';

export function createOpenDateTimeWindow(
    windowManager: WindowManager,
    systemClock: SystemClock,
    showDialog: ShowDialog,
    onDateChanged: () => void,
): () => void {
    return (): void => {
        windowManager.closeWindow(WINDOW_ID);

        const container = document.createElement('div');
        container.className = 'date-time-window';

        const label = document.createElement('label');
        label.className = 'date-time-window__label';
        label.textContent = 'Date:';

        const input = document.createElement('input');
        input.type = 'date';
        input.className = 'date-time-window__input';
        input.value = toDateInputValue(systemClock.getNow());
        label.append(input);

        const syncButton = document.createElement('button');
        syncButton.type = 'button';
        syncButton.className = 'date-time-window__sync-button';
        syncButton.textContent = 'Sync with time.windows.com';
        syncButton.addEventListener('click', () => {
            input.value = toDateInputValue(new Date());
        });

        const buttons = document.createElement('div');
        buttons.className = 'date-time-window__buttons';

        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.className = 'date-time-window__button';
        confirmButton.textContent = 'Confirm';

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className = 'date-time-window__button';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => windowManager.closeWindow(WINDOW_ID));

        confirmButton.addEventListener('click', () => {
            if (!input.value) {
                return;
            }

            const [year, month, day] = input.value.split('-').map(Number);
            systemClock.setDate({ year, month, day });
            onDateChanged();
            windowManager.closeWindow(WINDOW_ID);

            if (month === 9 && day === 5) {
                showDialog({
                    title: 'Windows',
                    message: 'Happy Birthday, Maarten!',
                    icon: successIconUrl,
                });
            } else if (year === 2026 && month === 8 && day === 12) {
                showDialog({
                    title: 'Windows',
                    message: 'Congratulations on your engagement!',
                    icon: heartsIconUrl,
                });
            }
        });

        buttons.append(confirmButton, cancelButton);
        container.append(label, syncButton, buttons);

        windowManager.openWindow(WINDOW_ID, 'Date and Time Properties', container, {
            width: 300,
            height: 170,
            controls: false,
            centered: true,
        });
    };
}

function toDateInputValue(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
