import type { AppDefinition } from './appRegistry';

interface RecycleBinItem {
    name: string;
    originalLocation: string;
}

// Later kunnen hier fake bestanden bij voor easter eggs.
const items: RecycleBinItem[] = [];

export const recycleBinApp: AppDefinition = {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    createContent(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'app-recycle-bin';

        if (items.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'app-recycle-bin__empty';
            empty.textContent = 'No items.';
            container.append(empty);

            return container;
        }

        const list = document.createElement('ul');
        list.className = 'app-recycle-bin__list';

        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.className = 'app-recycle-bin__item';
            listItem.textContent = `${item.name} — ${item.originalLocation}`;
            list.append(listItem);
        });

        container.append(list);

        return container;
    },
};
