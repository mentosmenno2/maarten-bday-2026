import type { AppDefinition } from './appRegistry';

export const notepadApp: AppDefinition = {
    id: 'notepad',
    title: 'Untitled - Notepad',
    createContent(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'app-notepad';

        const menubar = document.createElement('div');
        menubar.className = 'app-notepad__menubar';
        ['File', 'Edit', 'Format', 'View', 'Help'].forEach((label) => {
            const item = document.createElement('span');
            item.className = 'app-notepad__menu-item';
            item.textContent = label;
            menubar.append(item);
        });

        const textarea = document.createElement('textarea');
        textarea.className = 'app-notepad__textarea';
        textarea.spellcheck = false;

        container.append(menubar, textarea);

        return container;
    },
};
