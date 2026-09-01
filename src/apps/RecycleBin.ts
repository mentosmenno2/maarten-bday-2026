import duckIconUrl from '../assets/icons/duck.png';
import type { AppContext, AppDefinition } from './appRegistry';

export const recycleBinApp: AppDefinition = {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    createContent({ showDialog }: AppContext): HTMLElement {
        const container = document.createElement('div');
        container.className = 'app-recycle-bin';

        const menubar = document.createElement('div');
        menubar.className = 'app-recycle-bin__menubar';

        const emptyButton = document.createElement('button');
        emptyButton.type = 'button';
        emptyButton.className = 'app-recycle-bin__menubar-button';
        emptyButton.textContent = 'Empty Recycle Bin';
        menubar.append(emptyButton);

        const body = document.createElement('div');
        body.className = 'app-recycle-bin__body';

        const renderDuck = (): void => {
            body.replaceChildren();

            const item = document.createElement('div');
            item.className = 'app-recycle-bin__item';

            const icon = document.createElement('span');
            icon.className = 'app-recycle-bin__item-icon';
            icon.style.backgroundImage = `url('${duckIconUrl}')`;

            const label = document.createElement('span');
            label.className = 'app-recycle-bin__item-label';
            label.textContent = 'duck.exe';

            item.append(icon, label);
            body.append(item);
        };

        const renderEmpty = (): void => {
            body.replaceChildren();

            const empty = document.createElement('p');
            empty.className = 'app-recycle-bin__empty';
            empty.textContent = 'Recycle Bin is empty.';
            body.append(empty);
        };

        emptyButton.addEventListener('click', () => {
            renderEmpty();
            showDialog({ title: 'Recycle Bin', message: 'What the duck?!' });
        });

        renderDuck();
        container.append(menubar, body);

        return container;
    },
};
