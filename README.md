# Maarten's Birthday 2026

Windows XP-achtige desktop in de browser (TypeScript + SCSS + Vite, geen framework).

## Ontwikkelen

```bash
npm install
npm run dev
```

## Easter egg toevoegen

Alles gebeurt in `src/easter-eggs/registerEasterEggs.ts`. Daar krijg je een context mee met
`windowManager`, `desktopElement`, `openApp`, `showDialog` en `registerApp`.

```ts
export function registerEasterEggs({ openApp, showDialog, registerApp, desktopElement }: EasterEggContext): void {
    registerApp({
        id: 'birthday',
        title: 'birthday.exe',
        createContent: () => {
            const element = document.createElement('p');
            element.textContent = 'Gefeliciteerd!';
            return element;
        },
    });

    desktopElement.addEventListener('dblclick', (event) => {
        if (event.target === desktopElement) {
            openApp('birthday');
        }
    });

    showDialog({ title: 'Windows', message: 'Er is post voor je.' });
}
```

Een nieuwe gewone app voeg je toe als bestand in `src/apps/` plus één regel in
`src/apps/registerDefaultApps.ts`.
