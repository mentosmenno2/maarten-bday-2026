# Single-Player "Weerwolven van Wakkerdam" (Werewolves of Millers Hollow)

## 1. Project Overview

We are building a web-based, single-player version of the social deduction game "Weerwolven van Wakkerdam" (Werewolves of Millers Hollow). The human player plays against rules-based AI bots. Since there is no physical body language to observe, the game relies on logic, voting pattern analysis, and rules-based chat behavior to deduce who the werewolves are.

## 2. Tech Stack & Strict Constraints

* **Environment:** Vite.
* **Language:** TypeScript (Strict mode enabled).
* **UI/Front-end:** Native Web Components (Custom Elements) and SCSS.
* **Frameworks:** **STRICTLY PROHIBITED.** Do not use React, Vue, Svelte, or any other UI framework.
* **Back-end:** None. The game runs 100% client-side in the browser. No LLM APIs are used.
* **Naming Conventions:**
* One class per file.
* File names for Classes and Interfaces must be `PascalCase` (e.g., `GameEngine.ts`, `IBot.ts`).
* Functions, methods, and variables must be `camelCase`.


* **Language requirement:** The codebase and comments must be in English. All user-facing strings, UI text, and chat templates must be in **Dutch**.

## 3. Folder Structure

Generate and strictly adhere to the following directory structure:

```text
/src
  /assets         # Contains images, icons, and videos (werewolf_win.mp4, villager_win.mp4)
  /components     # Native Web Components (e.g., ChatBox.ts, PlayerAvatar.ts, GameOverScreen.ts)
  /core           # Game loop and core systems (GameEngine.ts, VotingSystem.ts)
  /models         # Data classes (Bot.ts, Player.ts)
  /types          # Interfaces and Enums (Roles.ts, GamePhase.ts, IBot.ts)
  /utils          # Helper functions (Randomizer.ts)
  main.ts         # Entry point, initializes components and the game engine
style.scss         # Global SCSS (use CSS Grid/Flexbox and variables)
index.html        # Basic layout structure

```

## 4. Core Architecture & State Management

### A. The State Machine (`GameEngine.ts`)

The game is controlled by a State Machine utilizing a `GamePhase` Enum:
`INIT`, `NIGHT`, `MORNING`, `DAY_DISCUSSION`, `VOTING`, `EXECUTION`, `GAME_OVER`.
The `GameEngine` class manages the current state. When transitioning, the engine pauses if user input is required (e.g., during day discussion/voting) or calculates logic in the background (e.g., during the night).

### B. Event-Driven UI

Because we use Native Web Components without a framework, state management relies on the native `EventTarget` API.

* When the engine updates data (e.g., a player dies, a phase changes), it fires a `CustomEvent` globally. Example: `document.dispatchEvent(new CustomEvent('playerDied', { detail: { id: 1 } }))`.
* Web Components listen to these events via `document.addEventListener` and update their own DOM accordingly.

## 5. Bot Logic & Data Models

Every character (bots and the human player) implements a shared interface `IBot`.

### Bot Traits (Range 0 - 100)

* **Aggression:** Probability of accusing someone unprompted in chat.
* **Bandwagoning:** Probability of voting for the current most popular target rather than choosing independently.
* **Grudge:** Determines how severely the bot lowers `trust` towards someone who votes against them.
* **Trust Map:** A `Record<string, number>` tracking the bot's trust level towards every other player ID.

### The "Werewolf Tell" (Bot Behavior Override)

Werewolves know who the other werewolves are. Their algorithm forces them to:

1. Artificially keep `Trust` high for fellow werewolves.
2. Never vote for fellow werewolves, *unless* the fellow werewolf is already receiving the majority of votes (to blend in).
3. When a bot is assigned an evil role, slightly alter their base traits (e.g., +20% aggression) so observant players can notice behavioral shifts.

## 6. Chat & Discussion System (Rules-Based)

Do not use AI/LLMs. The chat system uses string templates ('Mad Libs' style) based on variables.

* During `DAY_DISCUSSION`, bots periodically send messages.
* Based on their `Trust Map` and traits, they decide to *Accuse*, *Defend*, or *Bandwagon*.
* **Dutch String Examples required in code:**
* *Accusing:* "Ik vertrouw [PlayerName] voor geen meter, zijn stemgedrag gisteren was verdacht."
* *Defending:* "Waarom kijken jullie naar mij? Ik heb niets gedaan!"
* *Bandwagoning:* "Ik ben het met de groep eens, [PlayerName] is verdacht."



## 7. Game Over, Win Conditions & Reset Logic

Once the `GameEngine` determines a faction has won (all werewolves are dead OR werewolves equal/outnumber villagers), transition to `GamePhase.GAME_OVER`.

### A. Role Reveal

The engine fires `new CustomEvent('revealAllRoles')`. The UI must catch this and update all player cards on the board so every secret role becomes visible to the player.

### B. Win/Loss UI & Video Playback

Include a `<game-over-screen>` Web Component.

1. **Player Loses (Any Role):** Show a static screen with the text: *"Je hebt verloren"*. No video plays.
2. **Player Wins as Werewolf:** Show and autoplay `werewolf_win.mp4` (from `/assets`) prominently on the screen.
3. **Player Wins as Villager:** Show and autoplay `villager_win.mp4` (from `/assets`).

### C. Reset Mechanism

After the video or the loss screen, display an **"Opnieuw spelen"** (Play Again) button.

* Clicking this triggers the `reset()` method in `GameEngine`.
* The engine clears the current players, generates new bot instances (assigning new roles and traits), clears the UI chat log, and resets the phase to `INIT`.

## 8. Implementation Steps for the AI Assistant

Please build the codebase step-by-step following this sequence:

1. **Phase 1: Types & Models.** Create the base interfaces, Enums (`Role`, `GamePhase`), and the `Bot.ts` / `Player.ts` classes including traits.
2. **Phase 2: Game Engine.** Build `GameEngine.ts` (the State Machine handling transitions and CustomEvents).
3. **Phase 3: Voting & Logic.** Implement `VotingSystem.ts` where bots calculate their targets based on traits, grudge, and trust.
4. **Phase 4: Chat Simulator.** Build the rules-based system that constructs Dutch sentences based on bot state.
5. **Phase 5: Web Components.** Write the native custom elements (`<game-board>`, `<player-card>`, `<chat-box>`, `<game-over-screen>`) and wire up event listeners.
6. **Phase 6: Integration.** Connect everything in `main.ts` and apply global styling in `style.css`.

**Acknowledge these instructions and start by executing Phase 1.**