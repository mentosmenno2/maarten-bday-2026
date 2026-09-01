# Windows XP Web Interface — Development Roadmap

## Doel van dit stappenplan

Bouw de Windows XP-webinterface **in kleine, afzonderlijk testbare stappen**.

Werk nooit meerdere grote onderdelen tegelijk uit.

Na iedere stap moet de applicatie:

* compileren;
* zonder console errors draaien;
* handmatig testbaar zijn;
* geen onafgemaakte half-implementaties bevatten.

## Algemene werkwijze

Voor iedere stap:

1. Bekijk eerst de bestaande code.
2. Verander alleen wat voor deze stap nodig is.
3. Houd bestaande functionaliteit werkend.
4. Voeg geen functionaliteit toe uit toekomstige stappen.
5. Gebruik TypeScript en SCSS.
6. Houd de implementatie zo simpel mogelijk.
7. Run de applicatie en controleer op fouten.
8. Geef na afloop een korte samenvatting.
9. Stop daarna.

Gebruik na iedere stap exact deze afsluiting:

```text
Stap voltooid.

Gewijzigde bestanden:
- ...

Toegevoegde functionaliteit:
- ...

Handmatig testen:
1. ...
2. ...
3. ...

Bekende beperkingen:
- ...

Wacht op mijn instructie voordat je verdergaat.
```

---

# Fase 1 — Projectbasis

## Stap 1 — Project initialiseren

Maak een minimale frontend-applicatie met:

* Vite
* TypeScript
* Sass

Gebruik geen frontend framework.

Gewenste basisstructuur:

```text
index.html
src/
├── main.ts
└── styles/
    └── main.scss
```

Zorg dat:

* `npm install` werkt;
* `npm run dev` werkt;
* TypeScript compileert;
* Sass geladen wordt;
* een simpele testtekst zichtbaar is.

Nog geen Windows XP-interface bouwen.

### Test

De browser moet een eenvoudige pagina tonen zonder errors.

---

# Fase 2 — Desktop

## Stap 2 — Fullscreen desktop

Maak de basisdesktop.

De pagina moet:

* volledige viewport gebruiken;
* geen standaard browsermarges hebben;
* niet scrollen;
* een desktopgebied bevatten;
* onderaan ruimte reserveren voor een toekomstige taskbar.

Maak een `.desktop` container.

Gebruik voorlopig een eenvoudige XP-achtige achtergrond.

De definitieve wallpaper kan later vervangen worden.

### Test

Controleer:

* desktop vult het hele scherm;
* geen horizontale of verticale scrollbar;
* resizing van het browservenster werkt.

---

## Stap 3 — Taskbar

Voeg onderaan een vaste taskbar toe.

De taskbar moet:

* volledige breedte gebruiken;
* onderaan staan;
* ongeveer 30–40 pixels hoog zijn;
* XP-achtig blauw zijn;
* boven de desktopbackground liggen.

Maak drie logische gebieden:

```text
[start] [open windows........................] [system tray]
```

Bijvoorbeeld:

```html
<div class="taskbar">
    <div class="taskbar__start"></div>
    <div class="taskbar__windows"></div>
    <div class="taskbar__tray"></div>
</div>
```

Nog geen functionaliteit toevoegen.

### Test

Controleer dat de taskbar:

* correct onderaan staat;
* niet meescrollt;
* netjes schaalt met het venster.

---

## Stap 4 — Start-knop

Voeg een XP-geïnspireerde Start-knop toe.

De knop moet:

* links in de taskbar staan;
* groen zijn;
* tekst `start` bevatten;
* hover-state hebben;
* pressed/active-state kunnen tonen.

Nog geen Start-menu implementeren.

Geef de knop een duidelijke selector of class voor latere TypeScript-functionaliteit.

### Test

Controleer:

* hover;
* actieve muisklik;
* layout in verschillende browserbreedtes.

---

# Fase 3 — Klok

## Stap 5 — Werkende klok

Maak een `DesktopClock`-functionaliteit.

De klok staat rechts in de taskbar.

Gebruik:

```ts
new Date()
```

De klok moet:

* lokale browsertijd gebruiken;
* `HH:mm` tonen;
* onmiddellijk bij page load correct zijn;
* minimaal één keer per seconde worden geüpdatet.

Maak bijvoorbeeld:

```text
src/
└── desktop/
    └── DesktopClock.ts
```

Houd de class klein.

Voorbeeldinterface:

```ts
export class DesktopClock {
    constructor(element: HTMLElement) {}

    start(): void {}
}
```

Gebruik bij voorkeur:

```ts
Intl.DateTimeFormat
```

of een eenvoudige eigen formatter.

### Test

Controleer:

* tijd klopt met de computer;
* minuten worden correct weergegeven;
* geen flits van lege of verkeerde tijd bij page load.

---

# Fase 4 — Start-menu

## Stap 6 — Start-menu markup

Maak eerst alleen de visuele structuur van het Start-menu.

Het menu moet linksboven de taskbar verschijnen.

Het bevat bijvoorbeeld:

```text
┌────────────────────────────┐
│ User                       │
├──────────────┬─────────────┤
│ Internet     │ My Computer │
│ Notepad      │ Documents   │
│              │ Control     │
│              │ Panel       │
├──────────────┴─────────────┤
│ Log Off       Turn Off     │
└────────────────────────────┘
```

Gebruik semantische buttons waar logisch.

Nog geen open/close-functionaliteit.

Het menu staat standaard verborgen.

---

## Stap 7 — Start-menu openen en sluiten

Implementeer de functionaliteit.

Maak bijvoorbeeld:

```text
src/
└── desktop/
    └── StartMenu.ts
```

Functionaliteit:

* Start-knop klikken → menu opent;
* nogmaals klikken → menu sluit;
* buiten het menu klikken → menu sluit;
* klikken binnen het menu sluit het menu niet automatisch;
* Escape → menu sluiten.

De Start-knop moet een actieve visuele state krijgen zolang het menu geopend is.

### Test

Test expliciet:

1. open;
2. close via Start;
3. close via desktop;
4. klik binnen menu;
5. Escape.

---

# Fase 5 — Desktopiconen

## Stap 8 — Desktopiconen tonen

Voeg vier desktopiconen toe:

* My Computer
* Internet Explorer
* Notepad
* Recycle Bin

Gebruik voorlopig eenvoudige icon placeholders.

Structuur bijvoorbeeld:

```html
<button class="desktop-icon" data-app-id="my-computer">
    <span class="desktop-icon__image"></span>
    <span class="desktop-icon__label">My Computer</span>
</button>
```

Positioneer ze linksboven onder elkaar.

### Test

Controleer:

* geen overlap;
* labels leesbaar;
* iconen reageren visueel op hover.

---

## Stap 9 — Icoonselectie

Implementeer eenvoudige desktopselectie.

Single click:

* selecteert een icoon;
* geselecteerd icoon krijgt XP-achtige highlight;
* klikken op lege desktop deselecteert alle iconen.

Nog geen applicaties openen.

### Test

Test selectie en deselectie.

---

# Fase 6 — Window systeem

## Stap 10 — Basis WindowManager

Maak nu pas het window-systeem.

Bestand:

```text
src/
└── window/
    └── WindowManager.ts
```

Maak een eenvoudige datastructuur zoals:

```ts
interface ManagedWindow {
    id: string;
    title: string;
    element: HTMLElement;
    minimized: boolean;
}
```

De `WindowManager` moet voorlopig alleen:

* een nieuw venster kunnen maken;
* het venster aan de desktop toevoegen;
* een titel tonen;
* een contentgebied tonen.

Maak bijvoorbeeld een tijdelijke publieke methode:

```ts
openWindow(
    id: string,
    title: string,
    content: HTMLElement
): void
```

Voeg tijdelijk één testknop toe om een demo-venster te openen.

Nog geen close/minimize/drag.

### Test

Klik op de testknop.

Er moet één venster verschijnen.

---

## Stap 11 — Voorkom dubbele vensters

Breid `WindowManager` uit.

Als:

```ts
openWindow("my-computer", ...)
```

twee keer wordt aangeroepen, mag er niet een tweede My Computer-venster ontstaan.

Als het al bestaat:

* breng het bestaande venster naar voren.

### Test

Open hetzelfde venster meerdere keren.

Er moet één instantie blijven.

---

# Fase 7 — Window focus

## Stap 12 — Actieve vensters en z-index

Implementeer window focus.

Wanneer een venster wordt aangeklikt:

* wordt het actief;
* komt het voor andere vensters;
* krijgt het een hogere `z-index`.

Gebruik een simpele teller:

```ts
private nextZIndex = 10;
```

Bij activeren:

```ts
windowElement.style.zIndex = String(this.nextZIndex++);
```

Geef actieve en inactieve titlebars een iets andere stijl.

### Test

Open minimaal drie vensters en klik ertussen.

Het aangeklikte venster moet steeds bovenop komen.

---

# Fase 8 — Window sluiten

## Stap 13 — Close button

Voeg rechtsboven een XP-achtige close button toe:

```text
X
```

Klikken:

* verwijdert het venster;
* verwijdert het uit WindowManager-state;
* ruimt event listeners op waar nodig.

### Test

Open → sluit → open opnieuw.

Dit moet onbeperkt blijven werken.

---

# Fase 9 — Taskbar window buttons

## Stap 14 — Geopende vensters in taskbar

Wanneer een venster geopend wordt, maak een taskbar button.

Bijvoorbeeld:

```text
[ My Computer ]
```

De button moet:

* titel van het venster tonen;
* verdwijnen wanneer het venster sluit;
* active-state tonen als dit het actieve venster is.

Nog geen minimizefunctionaliteit.

### Test

Open en sluit meerdere vensters en controleer de taskbar.

---

# Fase 10 — Minimaliseren

## Stap 15 — Minimize button

Voeg een minimize-knop toe:

```text
_
```

Wanneer erop wordt geklikt:

* wordt het venster verborgen;
* blijft het geregistreerd;
* blijft de taskbar button bestaan;
* krijgt `minimized` de waarde `true`.

Klik vervolgens op de taskbar button:

* venster wordt opnieuw zichtbaar;
* venster wordt actief;
* `minimized` wordt `false`.

### Test

Test:

1. openen;
2. minimaliseren;
3. taskbar blijft zichtbaar;
4. herstellen;
5. opnieuw minimaliseren.

---

## Stap 16 — Taskbar button gedrag

Maak het gedrag iets natuurlijker.

Wanneer je op de taskbar button van het **actieve zichtbare venster** klikt:

* minimaliseer het venster.

Wanneer het venster:

* geminimaliseerd is;
* of niet actief is;

dan:

* toon het venster;
* maak het actief.

### Test

Het moet ongeveer als Windows aanvoelen.

---

# Fase 11 — Vensters verplaatsen

## Stap 17 — Dragging via titlebar

Maak vensters draggable.

Gebruik bij voorkeur Pointer Events:

```text
pointerdown
pointermove
pointerup
```

Alleen de titlebar mag draggable zijn.

Niet draggable:

* close button;
* minimize button;
* window content.

Tijdens dragging:

* venster volgt de pointer;
* venster wordt actief.

Gebruik geen externe libraries.

### Test

Open meerdere vensters en sleep ze onafhankelijk rond.

---

## Stap 18 — Dragging begrenzen

Voorkom dat een venster volledig buiten beeld wordt gesleept.

Minimaal moet:

* titlebar bereikbaar blijven;
* venster niet onder de taskbar verdwijnen.

Houd de berekening simpel.

Perfect gedrag aan iedere schermrand is niet nodig.

### Test

Probeer een venster langs alle vier de randen te slepen.

---

# Fase 12 — Applicaties

## Stap 19 — App registry

Maak een simpele manier om apps te definiëren.

Bijvoorbeeld:

```ts
interface AppDefinition {
    id: string;
    title: string;
    createContent(): HTMLElement;
}
```

En:

```ts
const apps = new Map<string, AppDefinition>();
```

Doel:

Een app openen moet uiteindelijk zo simpel zijn als:

```ts
openApp("notepad");
```

of vergelijkbaar.

Geen ingewikkeld dependency-injection-systeem bouwen.

---

## Stap 20 — My Computer

Maak de eerste echte app.

`MyComputer.ts`

Toon bijvoorbeeld:

```text
My Computer

Files Stored on This Computer

Hard Disk Drives
[C:] Local Disk

Devices with Removable Storage
[A:] 3½ Floppy
```

Alles is fake.

Gebruik normale HTML.

### Test

Open vanuit een tijdelijke trigger.

---

## Stap 21 — Recycle Bin

Maak:

```text
RecycleBin.ts
```

Begin met:

```text
Recycle Bin

No items.
```

Structureer de content zo dat later eenvoudig fake bestanden toegevoegd kunnen worden.

Bijvoorbeeld:

```ts
const items = [];
```

of een vergelijkbare simpele datastructuur.

---

## Stap 22 — Internet Explorer

Maak een fake Internet Explorer venster.

Het bevat:

* toolbar;
* adresbalk;
* contentgebied.

Voorbeeldadres:

```text
http://birthday.local/
```

Content:

```text
Welcome to the Internet
```

Het is geen echte browser.

Geen iframe nodig.

---

## Stap 23 — Notepad

Maak een Notepad-achtig venster.

Het bevat:

* simpele menubalk;
* grote `<textarea>`.

De gebruiker moet daadwerkelijk kunnen typen.

Maak de textarea groot genoeg om het grootste deel van het venster te vullen.

Geen save/load-functionaliteit.

---

# Fase 13 — Apps koppelen aan desktop

## Stap 24 — Desktopiconen openen apps

Koppel de bestaande iconen aan de App Registry.

Gebruik dubbelklik.

Voorbeeld:

```text
My Computer → my-computer
Internet Explorer → internet-explorer
Notepad → notepad
Recycle Bin → recycle-bin
```

Single click moet nog steeds alleen selecteren.

### Test

Voor ieder icoon:

1. single click → selecteren;
2. double click → openen;
3. opnieuw double click → geen dubbele instantie.

---

# Fase 14 — Apps koppelen aan Start-menu

## Stap 25 — Start-menu applicaties

Maak de volgende Start-menu items functioneel:

* Internet Explorer
* Notepad
* My Computer
* Recycle Bin

Bij klikken:

* open betreffende app;
* sluit Start-menu.

### Test

Open iedere app zowel via desktop als Start-menu.

---

# Fase 15 — Dialogen

## Stap 26 — XP dialog component

Maak een eenvoudige herbruikbare dialoogfunctie.

Bijvoorbeeld:

```ts
showDialog({
    title: "Windows",
    message: "Something happened.",
    buttons: [...]
});
```

Dialoog moet gebruikmaken van hetzelfde window-systeem waar mogelijk.

Ondersteun minimaal:

```text
[ OK ]
```

En optioneel:

```text
[ Yes ] [ No ]
```

Dit wordt later gebruikt voor easter eggs.

Houd de API eenvoudig.

---

## Stap 27 — Turn Off Computer

Maak `Turn Off Computer` in Start-menu functioneel.

Niet echt afsluiten.

Toon bijvoorbeeld een XP-achtige dialog:

```text
Turn off computer

What do you want the computer to do?

[ Stand By ] [ Turn Off ] [ Restart ]
```

De knoppen mogen voorlopig alleen een grappige of simpele melding tonen.

---

## Stap 28 — Log Off

Maak `Log Off` functioneel.

Toon alleen een fake bevestigingsdialoog.

Geen echte gebruikersaccounts bouwen.

---

# Fase 16 — Optionele maximize

## Stap 29 — Maximize

Voer deze stap alleen uit als de voorgaande functionaliteit stabiel is.

Voeg een maximize button toe.

Bij maximize:

* sla vorige positie op;
* sla vorige grootte op;
* vul beschikbare desktopruimte;
* blijf boven de taskbar.

Bij opnieuw klikken:

* herstel vorige positie;
* herstel vorige grootte.

Als deze stap veel extra complexiteit veroorzaakt, mag hij worden overgeslagen.

---

# Fase 17 — Visuele afwerking

## Stap 30 — XP window styling

Verbeter alleen de styling.

Focus op:

* blauwe titlebars;
* Windows XP-achtige gradient;
* borders;
* controls;
* font sizes;
* padding;
* button states.

Verander geen window-logica.

---

## Stap 31 — Start-menu styling

Maak het Start-menu duidelijk XP-geïnspireerd.

Focus op:

* blauwe header;
* twee kolommen;
* witte linkerzijde;
* lichtblauwe rechterzijde;
* blauwe footer;
* hover states.

Verander geen functionaliteit.

---

## Stap 32 — Taskbar styling

Werk de taskbar af.

Focus op:

* groene Start-knop;
* XP-blauwe balk;
* taskbar buttons;
* systeemtray;
* klok;
* actieve/inactieve app buttons.

---

## Stap 33 — Desktopiconen afwerken

Verbeter:

* spacing;
* icon sizes;
* selected state;
* labels;
* text shadow;
* hover states.

Gebruik nog steeds eenvoudige assets/placeholders waar nodig.

---

# Fase 18 — Opruimen

## Stap 34 — Console en TypeScript controle

Controleer volledige applicatie.

Er mogen geen:

* console errors;
* TypeScript errors;
* Sass errors;
* ongebruikte tijdelijke testknoppen;
* debug logs;

meer aanwezig zijn.

Verwijder tijdelijke code uit eerdere stappen.

---

## Stap 35 — Responsiviteit desktopresoluties

Test minimaal:

```text
1280 × 720
1366 × 768
1920 × 1080
```

Los alleen duidelijke layoutproblemen op.

Geen mobiele versie bouwen.

---

# Fase 19 — Easter egg voorbereiding

## Stap 36 — Centrale Easter Egg-entrypoint

Maak één duidelijk bestand:

```text
src/
└── easter-eggs/
    └── registerEasterEggs.ts
```

Dit bestand hoeft nog geen echte easter eggs te bevatten.

Het moet een logische plek zijn waar later easter eggs geregistreerd kunnen worden.

Bijvoorbeeld:

```ts
export function registerEasterEggs(context: EasterEggContext): void {
    // Easter eggs will be added here later.
}
```

Geef alleen de werkelijk nuttige afhankelijkheden mee.

Bijvoorbeeld:

```ts
interface EasterEggContext {
    windowManager: WindowManager;
    desktopElement: HTMLElement;
}
```

Niet onnodig uitbreiden.

---

## Stap 37 — Eenvoudige API voor easter eggs

Controleer of easter eggs eenvoudig dingen kunnen doen zoals:

```ts
openApp("notepad");
```

```ts
showDialog(...);
```

```ts
desktopElement.addEventListener(...);
```

En eventueel:

```ts
windowManager.openWindow(...);
```

Documenteer kort hoe een nieuwe easter egg toegevoegd kan worden.

---

# Fase 20 — Eindcontrole

## Stap 38 — Complete functionele test

Loop handmatig deze checklist door.

### Desktop

* [ ] Desktop vult scherm
* [ ] Wallpaper werkt
* [ ] Desktopiconen zichtbaar
* [ ] Taskbar zichtbaar

### Tijd

* [ ] Lokale tijd klopt
* [ ] Tijd update automatisch

### Start

* [ ] Start-menu opent
* [ ] Start-menu sluit
* [ ] Klik buiten menu sluit menu
* [ ] Escape sluit menu

### Windows

* [ ] Venster openen
* [ ] Venster sluiten
* [ ] Venster minimaliseren
* [ ] Venster herstellen
* [ ] Venster verslepen
* [ ] Venster activeren
* [ ] Meerdere vensters werken
* [ ] Z-index werkt

### Taskbar

* [ ] Open venster verschijnt
* [ ] Gesloten venster verdwijnt
* [ ] Geminimaliseerd venster blijft zichtbaar
* [ ] Taskbar button herstelt venster

### Apps

* [ ] My Computer
* [ ] Internet Explorer
* [ ] Notepad
* [ ] Recycle Bin

### Desktopiconen

* [ ] Single click selecteert
* [ ] Double click opent
* [ ] Geen dubbele appinstanties

### Start-menu

* [ ] Apps openen vanuit Start

### Easter eggs

* [ ] Nieuwe interacties zijn eenvoudig toe te voegen
* [ ] Dialog API beschikbaar
* [ ] WindowManager eenvoudig bereikbaar

---

# Belangrijk voor iedere volgende opdracht

Wanneer ik zeg:

```text
Voer stap 17 uit.
```

voer dan **alleen stap 17** uit.

Lees daarvoor:

* deze roadmap;
* de huidige projectcode;
* eventueel direct afhankelijke eerdere stappen.

Voer geen toekomstige stappen alvast uit.

Als je merkt dat een eerdere stap een bug bevat die deze stap blokkeert:

1. los alleen die specifieke blocker op;
2. vermeld expliciet welke eerdere code je hebt aangepast;
3. ga daarna verder met de gevraagde stap.

Geen grote refactors uitvoeren zonder noodzaak.

---

# Prioriteiten

Gebruik altijd deze volgorde:

```text
1. Werkt het?
2. Is het eenvoudig?
3. Is de code begrijpelijk?
4. Ziet het er goed genoeg uit?
5. Is het pixel-perfect?
```

Pixel-perfect Windows XP nabouwen is **geen doel**.

Een goed werkende interface waarop later leuke easter eggs gebouwd kunnen worden is het doel.
