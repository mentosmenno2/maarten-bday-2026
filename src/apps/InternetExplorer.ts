import type { AppDefinition } from './appRegistry';

export const internetExplorerApp: AppDefinition = {
    id: 'internet-explorer',
    title: 'Internet Explorer',
    createContent(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'app-internet-explorer';

        const toolbar = document.createElement('div');
        toolbar.className = 'app-internet-explorer__toolbar';
        ['Back', 'Forward', 'Stop', 'Refresh', 'Home'].forEach((label) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'app-internet-explorer__toolbar-button';
            button.textContent = label;
            toolbar.append(button);
        });

        const addressBar = document.createElement('div');
        addressBar.className = 'app-internet-explorer__address-bar';

        const addressLabel = document.createElement('span');
        addressLabel.textContent = 'Address';

        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.className = 'app-internet-explorer__address';
        addressInput.value = 'http://birthday.local/';

        addressBar.append(addressLabel, addressInput);

        const page = document.createElement('div');
        page.className = 'app-internet-explorer__page';

        const heading = document.createElement('h1');
        heading.textContent = 'Welcome to the Internet';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'You have reached birthday.local. Please wait while the 56k modem finishes dialing.';

        page.append(heading, paragraph);
        container.append(toolbar, addressBar, page);

        return container;
    },
};
