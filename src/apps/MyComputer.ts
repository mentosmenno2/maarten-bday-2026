import type { AppDefinition } from './appRegistry';

interface DriveGroup {
    heading: string;
    drives: string[];
}

const driveGroups: DriveGroup[] = [
    { heading: 'Hard Disk Drives', drives: ['(C:) Local Disk', '(D:) Backup'] },
    { heading: 'Devices with Removable Storage', drives: ['(A:) 3½ Floppy', '(E:) CD Drive'] },
];

export const myComputerApp: AppDefinition = {
    id: 'my-computer',
    title: 'My Computer',
    createContent(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'app-my-computer';

        const heading = document.createElement('h1');
        heading.className = 'app-my-computer__heading';
        heading.textContent = 'Files Stored on This Computer';
        container.append(heading);

        driveGroups.forEach((group) => {
            const groupHeading = document.createElement('h2');
            groupHeading.className = 'app-my-computer__group';
            groupHeading.textContent = group.heading;

            const list = document.createElement('ul');
            list.className = 'app-my-computer__list';

            group.drives.forEach((drive) => {
                const item = document.createElement('li');
                item.className = 'app-my-computer__drive';
                item.textContent = drive;
                list.append(item);
            });

            container.append(groupHeading, list);
        });

        return container;
    },
};
