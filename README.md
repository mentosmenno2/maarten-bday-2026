# 🐺 Weerwolven van Wakkerdam - Single Player Edition

A web-based, single-player version of the classic Dutch social deduction game "Weerwolven van Wakkerdam" (Werewolves of Millers Hollow). Play against rules-based AI bots with strategic depth and dynamic difficulty levels.

## 🎮 Features

- **Single-Player vs AI:** Play against intelligent bot opponents with personality traits
- **Multiple Roles:** Classic roles (Werewolf, Villager) plus special roles (Seer, Witch, Thief, Cupido)
- **Difficulty Levels:** Choose from Easy, Medium, or Hard to adjust bot behavior and count
- **Rules-Based Chat:** Bots use strategic discussion and accusation patterns (no LLM)
- **Dynamic Voting:** AI makes decisions based on trust, behavioral patterns, and grudges
- **Dark, Atmospheric UI:** Built with native Web Components for maximum performance
- **100% Client-Side:** No server required, plays entirely in your browser

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd /path/to/maarten-bday-2026
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- **Vite** - Fast build tool and dev server
- **TypeScript** - For type-safe JavaScript
- **SCSS** - For styling

### 3. Verify Project Structure

The project should have this structure after setup:

```
maarten-bday-2026/
├── src/
│   ├── assets/          # Images, videos, audio
│   │   ├── images/
│   │   │   └── role-icons/  # Role avatars
│   │   ├── videos/      # Game outcome videos
│   │   └── audio/       # Sound effects (optional)
│   ├── components/      # Web Components
│   ├── core/            # Game logic
│   ├── models/          # Data classes
│   ├── types/           # Interfaces & Enums
│   ├── utils/           # Helper functions
│   ├── main.ts          # Entry point
│   └── style.scss       # Global styles
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies & scripts
└── README.md            # This file
```

## 💻 Development

### Start Development Server

```bash
npm run dev
```

This will:
- Start a local dev server (typically at `http://localhost:5173`)
- Enable hot module replacement (HMR) for instant updates
- Watch for TypeScript and SCSS changes

### Watch Mode

The dev server automatically watches all files. Simply save your changes and the browser will refresh.

## 🏗️ Building for Production

### Create Optimized Build

```bash
npm run build
```

This will:
- Compile TypeScript in strict mode
- Bundle all components and assets
- Minify JavaScript and CSS
- Output to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

This serves the `dist/` folder locally to test the optimized build.

## 📦 Deployment

After running `npm run build`, the contents of the `dist/` directory can be deployed to any static hosting service:

- **Vercel** - Zero-config deployment
- **Netlify** - Drag-and-drop or git integration
- **GitHub Pages** - Free static hosting
- **Any web server** - Just serve the `dist/` files

## 🎯 Game Rules

### Roles

| Role | Team | Ability |
|------|------|---------|
| **Werewolf** | Evil | Knows other werewolves; tries to eliminate villagers |
| **Villager** | Good | No special ability; votes to eliminate werewolves |
| **Seer** | Good | Sees one player's true role each night |
| **Witch** | Good | Can poison one player (eliminate) or revive one dead player per game |
| **Thief** | Good | Sees two role cards and can swap their role with one |
| **Cupido** | Good | Creates a love pair; if one dies, the other dies too |

### Game Flow

1. **Setup Phase** - Choose difficulty, roles are assigned randomly
2. **Night Phase** - Special roles perform their actions (Seer looks, Witch acts, etc.)
3. **Morning Phase** - Any night deaths are revealed
4. **Day Discussion** - Players discuss and chat about who they think is suspicious
5. **Voting Phase** - Players vote to eliminate someone
6. **Execution** - The player with the most votes is eliminated
7. **Game Over** - When all werewolves are dead (villagers win) or werewolves ≥ villagers (werewolves win)

### Win Conditions

- **Villagers Win:** All werewolves are eliminated
- **Werewolves Win:** Werewolves equal or outnumber villagers at the start of a day phase

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type-check without building
npm run type-check
```

## 📁 Project Structure Details

### `/src/types/`
Enums and interfaces: `GamePhase`, `Role`, `IBot`, `IPlayer`

### `/src/models/`
Data classes: `Bot.ts`, `Player.ts` with trait systems

### `/src/core/`
Game logic: `GameEngine.ts` (state machine), `VotingSystem.ts`, `NightPhaseSystem.ts`, `DifficultyConfig.ts`

### `/src/components/`
Native Web Components (Custom Elements):
- `GameBoard.ts` - Main game board
- `PlayerCard.ts` - Individual player UI
- `ChatBox.ts` - Discussion messages
- `GameOverScreen.ts` - Win/loss screens
- `DifficultySelector.ts` - Difficulty selection UI

### `/src/utils/`
Helpers: `Randomizer.ts`, `ChatTemplateBuilder.ts`, etc.

### `/src/main.ts`
Entry point: Initializes components, starts the game engine

## 🎨 Styling

The project uses **SCSS** with:
- CSS Grid/Flexbox for layout
- CSS variables for theming
- Dark, atmospheric color scheme
- Responsive design for all screen sizes

Global styles are in `src/style.scss`. Each component can have scoped styles via `<style>` tags within Web Components.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will try the next available port. Check terminal output for the actual URL.

### TypeScript Errors
Run `npm run type-check` to see all type issues before building.

### Build Fails
- Clear `node_modules/` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Ensure Node.js version is v16+: `node --version`

### Videos Not Playing
Verify video files exist in `src/assets/videos/`:
- `lose.mp4` - Player loss screen
- `win-villager.mp4` - Villager victory
- `win-wolf.mp4` - Werewolf victory

## 📝 License

This project is built for educational and entertainment purposes.

## 🎉 Have Fun!

Enjoy playing Weerwolven van Wakkerdam against clever AI opponents! May your deduction skills be sharp and your votes be true.

---

**Need help?** Check the `ai-instructions.md` for detailed game architecture and implementation notes.
