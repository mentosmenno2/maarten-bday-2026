# Windows XP Web Interface — Copilot Development Instructions

## Doel

Bouw een **werkende, interactieve Windows XP-geïnspireerde desktopinterface** als webapplicatie.

Het doel is nadrukkelijk **niet** om Windows XP volledig na te bouwen.

De applicatie moet voelen als een kleine, geloofwaardige Windows XP-desktop waarop later eenvoudig persoonlijke easter eggs kunnen worden toegevoegd.

De interface moet volledig client-side werken.

## Harde eisen

* Gebruik **TypeScript**
* Gebruik **SCSS/Sass**
* Gebruik standaard **HTML + TypeScript + SCSS**
* Gebruik **geen React, Vue, Angular of andere frontend frameworks**
* Gebruik **geen backend**
* Gebruik **geen database**
* Gebruik **geen externe UI libraries**
* Houd de code eenvoudig en begrijpelijk
* Geen over-engineering
* Geen onnodige abstractions
* Geen complexe state-management libraries
* Geen Canvas; gebruik normale HTML-elementen
* De applicatie moet lokaal gestart kunnen worden met een normale development server

De belangrijkste prioriteit is:

> **Functionaliteit boven perfectie.**

Het moet daadwerkelijk aanvoelen als een kleine desktopomgeving en niet als een statische afbeelding van Windows XP.

---

# Visuele stijl

Maak de interface duidelijk geïnspireerd door Windows XP.

Gebruik onder andere:

* Blauwe XP-achtige taskbar
* Groene Start-knop
* Klassieke desktopiconen
* XP-achtige vensterranden
* Blauwe titelbalken
* Klassieke minimize/maximize/close-knoppen
* Startmenu met XP-achtige indeling
* Desktopachtergrond geïnspireerd door de klassieke Bliss-wallpaper

Gebruik waar mogelijk CSS/SCSS voor de interface.

Gebruik geen ingewikkelde afbeeldingen voor UI-elementen als deze eenvoudig met CSS kunnen worden gemaakt.

De interface hoeft geen pixel-perfecte kopie van Windows XP te zijn.

---

# Functionaliteit

De volgende functionaliteit is verplicht.

## 1. Desktop

Bij het openen van de applicatie verschijnt een volledige desktop.

De desktop bevat minimaal:

* Wallpaper
* Een aantal desktopiconen
* Taskbar
* Start-knop
* Klok

Voorbeeldiconen:

* My Computer
* My Documents
* Internet Explorer
* Recycle Bin

De iconen hoeven in eerste instantie geen echte bestanden of websites te vertegenwoordigen.

Ze mogen dummy-applicaties openen.

---

# 2. Taskbar

Onderaan het scherm staat een taskbar.

De taskbar moet:

* altijd onderaan blijven staan
* de volledige breedte gebruiken
* een Start-knop bevatten
* een systeemgedeelte aan de rechterkant bevatten
* de huidige tijd tonen

Wanneer vensters geopend zijn, moeten deze zichtbaar kunnen worden in de taskbar.

Bijvoorbeeld:

```text
[ Start ] [ My Computer ] [ Internet Explorer ]                         20:42
```

Klikken op een taskbar-item moet het bijbehorende venster activeren.

Als een venster geminimaliseerd is, moet klikken op het taskbar-item het venster weer herstellen.

---

# 3. Werkende klok

De klok rechtsonder moet de **echte huidige lokale tijd van de gebruiker** tonen.

Gebruik hiervoor JavaScript/TypeScript.

Gebruik bijvoorbeeld:

```ts
new Date()
```

De klok moet automatisch blijven bijwerken.

Update minimaal iedere seconde.

Gebruik de lokale tijdzone van de browser.

Toon bijvoorbeeld:

```text
20:42
```

De klok mag niet hardcoded zijn.

Bij het laden van de pagina moet direct de juiste tijd worden weergegeven.

---

# 4. Start-knop

De Start-knop moet daadwerkelijk werken.

Bij klikken:

* opent het Start-menu
* opnieuw klikken sluit het Start-menu
* klikken buiten het Start-menu sluit het menu

De Start-knop moet visueel veranderen wanneer het menu geopend is.

---

# 5. Start-menu

Maak een XP-geïnspireerd Start-menu.

Het menu moet minimaal bevatten:

### Bovenkant

Een gebruikersnaam en eenvoudige avatar/place-holder.

Bijvoorbeeld:

```text
Menno
```

### Programma's

Bijvoorbeeld:

```text
Internet Explorer
My Computer
Notepad
Control Panel
```

Deze items mogen eenvoudige demo-applicaties openen.

### Onderkant

Bijvoorbeeld:

```text
Log Off
Turn Off Computer
```

Deze hoeven geen echte systeemacties uit te voeren.

Ze mogen bijvoorbeeld een eenvoudige dialoog tonen.

Het belangrijkste is dat het menu interactief en geloofwaardig werkt.

---

# 6. Vensters

Dit is een belangrijk onderdeel.

Vensters moeten daadwerkelijk functioneren.

Een venster moet minimaal:

* geopend kunnen worden
* gesloten kunnen worden
* geminimaliseerd kunnen worden
* verplaatst kunnen worden
* naar voren gehaald kunnen worden wanneer erop geklikt wordt

Een venster bestaat minimaal uit:

```text
┌─────────────────────────────────────┐
│ My Computer             _ □ X       │
├─────────────────────────────────────┤
│                                     │
│             Content                 │
│                                     │
└─────────────────────────────────────┘
```

## Close

Klik op `X`:

* venster verdwijnt
* bijbehorend taskbar-item verdwijnt

## Minimize

Klik op `_`:

* venster wordt verborgen
* taskbar-item blijft bestaan
* klikken op het taskbar-item herstelt het venster

## Maximize

Maximize is **optioneel**, maar als het eenvoudig te implementeren is mag dit worden toegevoegd.

Als maximize wordt geïmplementeerd:

* venster vult het beschikbare desktopgebied
* opnieuw klikken herstelt de oorspronkelijke grootte en positie

---

# 7. Vensters verplaatsen

Vensters moeten met de muis kunnen worden versleept.

Alleen de titelbalk moet hiervoor worden gebruikt.

Bijvoorbeeld:

```text
mousedown op titlebar
    ↓
mousemove
    ↓
update left/top
    ↓
mouseup
```

Het venster mag niet buiten het zichtbare desktopgebied kunnen verdwijnen.

De taskbar moet buiten het verplaatsbare gebied blijven.

Gebruik geen externe drag-and-drop library.

Implementeer dit eenvoudig met Pointer Events of Mouse Events.

Bij voorkeur Pointer Events.

---

# 8. Vensters activeren

Wanneer meerdere vensters open zijn:

* klikken op een venster brengt het naar voren
* het actieve venster krijgt de hoogste `z-index`
* het actieve venster moet visueel herkenbaar zijn

Gebruik hiervoor een eenvoudige z-index teller.

Bijvoorbeeld:

```ts
let nextZIndex = 10;
```

Wanneer een venster actief wordt:

```ts
windowElement.style.zIndex = String(nextZIndex++);
```

Maak dit niet ingewikkelder dan nodig.

---

# 9. Demo-applicaties

Maak minimaal deze demo-applicaties:

## My Computer

Opent een XP-achtig venster.

Toon bijvoorbeeld:

```text
My Computer

Hard Disk Drives

(C:) Local Disk

Devices with Removable Storage

(A:) Floppy Disk
```

Dit is alleen visuele inhoud.

## Internet Explorer

Open een venster met eenvoudige fake browserinhoud.

Bijvoorbeeld:

```text
Address: http://birthday.local/

--------------------------------

Welcome to the Internet
```

Het hoeft geen echte browser te zijn.

## Notepad

Open een eenvoudig Notepad-achtig venster.

Gebruik een `<textarea>` zodat de gebruiker daadwerkelijk tekst kan typen.

---

# 10. Desktopiconen

Desktopiconen moeten dubbelklik ondersteunen.

Bijvoorbeeld:

* dubbelklik My Computer → My Computer opent
* dubbelklik Internet Explorer → Internet Explorer opent
* dubbelklik Notepad → Notepad opent
* dubbelklik Recycle Bin → Recycle Bin opent

Single click mag het icoon selecteren.

Zorg ervoor dat dubbelklikken niet meerdere instanties van hetzelfde venster opent.

Als een applicatie al geopend is, moet deze naar voren worden gehaald.

---

# 11. Recycle Bin

Maak een eenvoudige Recycle Bin-applicatie.

Deze hoeft niets echt te verwijderen.

Het venster kan bijvoorbeeld tonen:

```text
Recycle Bin

No items.
```

Maak de architectuur echter zo dat ik later eenvoudig fake bestanden kan toevoegen.

Dit is belangrijk omdat ik later mogelijk een easter egg in de Recycle Bin wil stoppen.

---

# 12. Vensterbeheer

Gebruik een eenvoudige centrale manier om geopende applicaties bij te houden.

Bijvoorbeeld conceptueel:

```ts
interface WindowState {
    id: string;
    title: string;
    minimized: boolean;
    element: HTMLElement;
}
```

Maak dit echter niet groter of ingewikkelder dan noodzakelijk.

Ik wil later makkelijk nieuwe easter eggs/apps kunnen toevoegen.

Het moet bijvoorbeeld eenvoudig zijn om iets te kunnen doen als:

```ts
openWindow("secret-app");
```

of:

```ts
openWindow("birthday.exe");
```

---

# 13. Architectuur

Houd de projectstructuur klein.

Een mogelijke structuur:

```text
src/
├── main.ts
├── desktop/
│   ├── Desktop.ts
│   ├── Taskbar.ts
│   ├── StartMenu.ts
│   └── Clock.ts
├── window/
│   └── WindowManager.ts
├── apps/
│   ├── MyComputer.ts
│   ├── InternetExplorer.ts
│   ├── Notepad.ts
│   └── RecycleBin.ts
└── styles/
    ├── main.scss
    ├── desktop.scss
    ├── taskbar.scss
    ├── start-menu.scss
    └── window.scss
```

Deze structuur is een voorbeeld.

Als een eenvoudiger structuur logischer is, kies de eenvoudigere structuur.

**Maak niet voor ieder klein UI-element een aparte class.**

---

# 14. TypeScript

Gebruik duidelijke namen.

Goed:

```ts
WindowManager
StartMenu
Taskbar
DesktopClock
```

Vermijd namen zoals:

```ts
Manager
Helper
Utils
Thing
Data
Stuff
```

Gebruik expliciete types.

Vermijd waar mogelijk:

```ts
any
```

Gebruik `private` waar dit logisch is.

Houd classes klein.

Een class moet één duidelijke verantwoordelijkheid hebben.

---

# 15. SCSS

Gebruik SCSS.

Organiseer styles logisch.

Bijvoorbeeld:

```scss
.desktop {
}

.taskbar {
}

.start-menu {
}

.window {
}

.window__titlebar {
}

.window__content {
}
```

Gebruik bij voorkeur BEM-achtige naamgeving.

Vermijd extreem diepe selectors.

---

# 16. Easter egg-vriendelijke architectuur

Dit project wordt later gebruikt voor persoonlijke easter eggs.

Daarom moet het eenvoudig zijn om nieuwe interacties toe te voegen.

Ik wil bijvoorbeeld later zelf kunnen toevoegen:

```ts
desktopElement.addEventListener("click", ...)
```

of:

```ts
openWindow("secret.exe");
```

of:

```ts
showDialog(...)
```

Maak daarom geen systeem waarbij iedere applicatie hardcoded in tientallen bestanden geregistreerd moet worden.

Een nieuwe easter egg moet relatief eenvoudig toe te voegen zijn.

---

# 17. Dialogen

Maak eventueel een kleine herbruikbare XP-achtige dialog.

Bijvoorbeeld:

```text
┌───────────────────────────────┐
│ Birthday.exe              X   │
├───────────────────────────────┤
│                               │
│ Something went wrong.         │
│                               │
│                  [ OK ]       │
└───────────────────────────────┘
```

Dit wordt later waarschijnlijk veel gebruikt voor easter eggs.

Maak de dialog simpel en herbruikbaar.

---

# 18. Geen echte Windows-functionaliteit

De applicatie mag **niets aan het echte besturingssysteem veranderen**.

Dus:

* geen echte bestanden verwijderen
* geen echte shutdown
* geen registry
* geen OS-integratie
* geen systeemcommando's
* geen filesystem API tenzij later expliciet gevraagd

Alles is fake en draait binnen de browser.

---

# 19. Responsive gedrag

De belangrijkste target is een desktopbrowser.

Optimaliseer voor:

* Chrome
* Edge
* Firefox

Mobiele ondersteuning is niet belangrijk.

De desktop moet echter wel netjes blijven functioneren bij verschillende desktopresoluties.

---

# 20. Ontwikkelproces

Werk stap voor stap.

**Niet meteen honderden regels code genereren.**

Gebruik deze volgorde:

### Stap 1 — Basis

Maak:

* project
* desktop
* wallpaper
* taskbar
* Start-knop
* klok

Stop en controleer of dit werkt.

### Stap 2 — Start-menu

Voeg het werkende Start-menu toe.

Test:

* openen
* sluiten
* klikken buiten menu
* interactie met items

### Stap 3 — WindowManager

Implementeer:

* openen
* sluiten
* minimaliseren
* activeren
* z-index

Test uitgebreid.

### Stap 4 — Dragging

Voeg verplaatsbare vensters toe.

Test:

* slepen
* meerdere vensters
* vensters activeren
* grenzen van desktop

### Stap 5 — Demo-apps

Voeg toe:

* My Computer
* Internet Explorer
* Notepad
* Recycle Bin

### Stap 6 — Afwerking

Verbeter:

* XP-look
* hover states
* active states
* borders
* shadows
* fonts
* iconen
* taskbar buttons

### Stap 7 — Easter egg-ready

Controleer dat het eenvoudig is om:

* nieuwe applicaties toe te voegen
* nieuwe dialogen toe te voegen
* click handlers toe te voegen
* verborgen interacties toe te voegen

---

# Belangrijke regel voor Copilot

**Als een functie niet noodzakelijk is voor bovenstaande requirements, implementeer hem dan niet.**

Niet toevoegen:

* accounts
* routing
* backend
* databases
* persistence
* ingewikkelde dependency injection
* state management
* Redux
* React
* drag-and-drop libraries
* volledige browserfunctionaliteit
* echte filesystemfunctionaliteit
* complexe accessibility-frameworks

Dit is een **klein birthday-project**, geen productieapplicatie.

---

# Definition of Done

Het project is klaar wanneer ik in mijn browser:

1. Een XP-achtige desktop zie.
2. De echte huidige tijd zie.
3. Op Start kan klikken.
4. Een werkend Start-menu krijg.
5. Een applicatie vanuit Start kan openen.
6. Een applicatie via een desktopicoon kan openen.
7. Vensters kan verplaatsen.
8. Vensters kan minimaliseren.
9. Geminimaliseerde vensters via de taskbar kan herstellen.
10. Vensters kan sluiten.
11. Meerdere vensters tegelijk kan openen.
12. Tussen vensters kan klikken om ze naar voren te brengen.
13. Notepad daadwerkelijk tekst kan laten bevatten.
14. De interface zonder backend werkt.
15. Ik eenvoudig nieuwe easter eggs kan programmeren.

## Belangrijk

**Test iedere stap voordat je doorgaat naar de volgende stap.**

Wanneer een stap klaar is, geef kort aan:

* wat er is geïmplementeerd
* welke bestanden zijn gewijzigd
* hoe ik het kan testen
* eventuele bekende beperkingen

Ga daarna pas verder wanneer ik daarom vraag.

Begin nu met **Stap 1 — Basisdesktop, taskbar, Start-knop en werkende klok**.
