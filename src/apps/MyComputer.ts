import type { AppDefinition } from './appRegistry';

interface Drive {
    label: string;
    size?: string;
}

interface DriveGroup {
    heading: string;
    drives: Drive[];
}

const driveGroups: DriveGroup[] = [
    {
        heading: 'Hard Disk Drives',
        drives: [{ label: '(C:) Local Disk' }, { label: '(D:) Backup' }],
    },
    {
        heading: 'Devices with Removable Storage',
        drives: [
            { label: '(A:) 3½ Floppy', size: '3.14159265 MB' },
            { label: '(E:) CD Drive', size: '700 MB' },
        ],
    },
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

                const label = document.createElement('span');
                label.className = 'app-my-computer__drive-label';
                label.textContent = drive.label;
                item.append(label);

                if (drive.size) {
                    const size = document.createElement('span');
                    size.className = 'app-my-computer__drive-size';
                    size.textContent = drive.size;
                    item.append(size);
                }

                list.append(item);
            });

            container.append(groupHeading, list);
        });

        return container;
    },
};
