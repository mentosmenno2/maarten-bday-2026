import type { AppDefinition } from './appRegistry';

const DEFAULT_URL = 'https://mpsijm.ddns.net/menno/2025/';

export const internetExplorerApp: AppDefinition = {
    id: 'internet-explorer',
    title: 'Internet Explorer',
    windowOptions: { width: 720, height: 520 },
    createContent(): HTMLElement {
        const history: string[] = [DEFAULT_URL];
        let historyIndex = 0;

        const container = document.createElement('div');
        container.className = 'app-internet-explorer';

        const toolbar = document.createElement('div');
        toolbar.className = 'app-internet-explorer__toolbar';

        const backButton = createToolbarButton('back', 'Back');
        const forwardButton = createToolbarButton('forward', 'Forward');
        const stopButton = createToolbarButton('stop', 'Stop');
        const refreshButton = createToolbarButton('refresh', 'Refresh');
        const homeButton = createToolbarButton('home', 'Home');
        toolbar.append(backButton, forwardButton, stopButton, refreshButton, homeButton);

        const addressBar = document.createElement('form');
        addressBar.className = 'app-internet-explorer__address-bar';

        const addressLabel = document.createElement('span');
        addressLabel.textContent = 'Address';

        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.className = 'app-internet-explorer__address';
        addressInput.value = DEFAULT_URL;

        const goButton = document.createElement('button');
        goButton.type = 'submit';
        goButton.className = 'app-internet-explorer__go';
        goButton.textContent = 'Go';

        addressBar.append(addressLabel, addressInput, goButton);

        const statusBar = document.createElement('div');
        statusBar.className = 'app-internet-explorer__status';
        statusBar.textContent = 'Done';

        const frame = document.createElement('iframe');
        frame.className = 'app-internet-explorer__frame';
        frame.title = 'Internet Explorer';
        frame.src = DEFAULT_URL;

        const updateNavigationState = (): void => {
            backButton.disabled = historyIndex === 0;
            forwardButton.disabled = historyIndex === history.length - 1;
        };

        const navigateTo = (url: string, addToHistory: boolean): void => {
            statusBar.textContent = `Opening ${url}...`;
            frame.src = url;
            addressInput.value = url;

            if (addToHistory) {
                history.splice(historyIndex + 1, history.length);
                history.push(url);
                historyIndex = history.length - 1;
            }

            updateNavigationState();
        };

        frame.addEventListener('load', () => {
            statusBar.textContent = 'Done';
        });

        backButton.addEventListener('click', () => {
            if (historyIndex > 0) {
                historyIndex -= 1;
                navigateTo(history[historyIndex], false);
            }
        });

        forwardButton.addEventListener('click', () => {
            if (historyIndex < history.length - 1) {
                historyIndex += 1;
                navigateTo(history[historyIndex], false);
            }
        });

        stopButton.addEventListener('click', () => {
            statusBar.textContent = 'Stopped';
        });

        refreshButton.addEventListener('click', () => {
            navigateTo(history[historyIndex], false);
        });

        homeButton.addEventListener('click', () => {
            navigateTo(DEFAULT_URL, true);
        });

        addressBar.addEventListener('submit', (event) => {
            event.preventDefault();
            const url = normalizeUrl(addressInput.value);

            if (url) {
                navigateTo(url, true);
            }
        });

        updateNavigationState();
        container.append(toolbar, addressBar, frame, statusBar);

        return container;
    },
};

function createToolbarButton(name: string, label: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `app-internet-explorer__toolbar-button app-internet-explorer__toolbar-button--${name}`;
    button.title = label;

    const icon = document.createElement('span');
    icon.className = 'app-internet-explorer__toolbar-icon';

    const text = document.createElement('span');
    text.textContent = label;

    button.append(icon, text);

    return button;
}

function normalizeUrl(value: string): string | null {
    const trimmed = value.trim();

    if (!trimmed) {
        return null;
    }

    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
