import { GameEngine } from './core/GameEngine';
import { Difficulty } from './models/Difficulty';
import { GamePhase, Team } from './types';
// Side-effect imports for Web Components registration
import './components/DifficultySelector';
import './components/GameBoard';
import './components/GameOverScreen';
import { ChatTemplateBuilder } from './utils/ChatTemplateBuilder';
import { Randomizer } from './utils/Randomizer';

/**
 * Main application entry point
 */
class WeerwolvenApp {
  private gameEngine: GameEngine | null = null;
  private currentScreen: 'menu' | 'game' | 'gameover' = 'menu';
  private difficultySelector: HTMLElement | null = null;
  private gameBoard: HTMLElement | null = null;
  private gameOverScreen: HTMLElement | null = null;

  constructor() {
    this.setupApp();
  }

  private setupApp(): void {
    const appDiv = document.querySelector('#app');
    if (!appDiv) {
      console.error('App container not found!');
      return;
    }

    // Create main screen elements
    this.difficultySelector = document.createElement('difficulty-selector') as DifficultySelector;
    this.gameBoard = document.createElement('game-board') as GameBoard;
    this.gameOverScreen = document.createElement('game-over-screen') as GameOverScreen;

    appDiv.appendChild(this.difficultySelector);
    appDiv.appendChild(this.gameBoard);
    appDiv.appendChild(this.gameOverScreen);

    // Hide game and gameover screens initially
    (this.gameBoard as HTMLElement).classList.add('hidden');
    (this.gameOverScreen as HTMLElement).classList.add('hidden');

    // Attach event listeners
    this.attachEventListeners();

    // Start with menu
    this.showMenu();
  }

  private attachEventListeners(): void {
    // Difficulty selection
    this.difficultySelector?.addEventListener('difficultySelected', (e: Event) => {
      if (e instanceof CustomEvent) {
        this.startGame(e.detail.difficulty);
      }
    });

    // Game over actions
    this.gameOverScreen?.addEventListener('playAgain', () => {
      this.resetGame();
    });

    this.gameOverScreen?.addEventListener('backToMenu', () => {
      this.showMenu();
    });

    // Game events
    document.addEventListener('gameEnded', () => {
      this.showGameOver();
    });

    document.addEventListener('gameWon', (e: Event) => {
      if (e instanceof CustomEvent) {
        const team = e.detail.team;
        setTimeout(() => {
          this.showGameOverWithTeam(team);
        }, 2000);
      }
    });

    // Chat system - bots generate messages during day discussion
    document.addEventListener('dayDiscussionStarted', () => {
      this.startBotChat();
    });

    document.addEventListener('phaseChanged', (e: Event) => {
      if (e instanceof CustomEvent && e.detail.phase !== GamePhase.DAY_DISCUSSION) {
        this.stopBotChat();
      }
    });
  }

  private showMenu(): void {
    this.currentScreen = 'menu';
    this.hideAllScreens();
    (this.difficultySelector as HTMLElement).classList.remove('hidden');
  }

  private startGame(difficulty: Difficulty): void {
    this.currentScreen = 'game';
    this.hideAllScreens();
    (this.gameBoard as HTMLElement).classList.remove('hidden');

    // Create new game engine
    this.gameEngine = new GameEngine();
    (this.gameBoard as any).setGameEngine(this.gameEngine);

    // Start the game
    this.gameEngine.startGame(difficulty);

    // Announce start
    console.log(`🎮 Game started on ${difficulty} difficulty!`);
  }

  private showGameOver(): void {
    this.currentScreen = 'gameover';
    this.hideAllScreens();
    (this.gameOverScreen as HTMLElement).classList.remove('hidden');
  }

  private showGameOverWithTeam(team: Team): void {
    this.showGameOver();
    (this.gameOverScreen as any).showGameOver(team);
  }

  private resetGame(): void {
    if (this.gameEngine) {
      this.gameEngine.reset();
      this.showMenu();
    }
  }

  private hideAllScreens(): void {
    (this.difficultySelector as HTMLElement).classList.add('hidden');
    (this.gameBoard as HTMLElement).classList.add('hidden');
    (this.gameOverScreen as HTMLElement).classList.add('hidden');
  }

  // Bot chat system
  private chatInterval: NodeJS.Timeout | null = null;

  private startBotChat(): void {
    if (!this.gameEngine) return;

    const config = this.gameEngine.getPlayers().length > 6
      ? { frequency: 0.7, interval: 2000 }
      : { frequency: 0.5, interval: 3000 };

    this.chatInterval = setInterval(() => {
      this.generateBotChatMessage();
    }, config.interval);
  }

  private stopBotChat(): void {
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
      this.chatInterval = null;
    }
  }

  private generateBotChatMessage(): void {
    if (!this.gameEngine) return;

    const aliveBots = this.gameEngine.getAlivePlayers()
      .filter(p => p.constructor.name === 'Bot' && p.alive);

    if (aliveBots.length === 0) return;

    // Random bot speaks
    const speaker = Randomizer.pickRandom(aliveBots);
    const otherPlayers = this.gameEngine.getAlivePlayers()
      .filter(p => p.id !== speaker.id);

    if (otherPlayers.length === 0) return;

    let message = '';
    const rand = Math.random();

    if (rand < speaker.aggression / 100) {
      // Accuse someone
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildAccusation(speaker.name, target.name);
    } else if (rand < (speaker.aggression + 30) / 100) {
      // Bandwagon
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildBandwagon(speaker.name, target.name);
    } else if (rand < (speaker.aggression + 60) / 100) {
      // Defend
      message = ChatTemplateBuilder.buildDefense(speaker.name);
    } else {
      // Suspicion
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildSuspicion(speaker.name, target.name);
    }

    // Dispatch chat message event
    document.dispatchEvent(new CustomEvent('botChatMessage', {
      detail: {
        playerId: speaker.id,
        playerName: speaker.name,
        message,
      },
    }));
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎲 Weerwolven van Wakkerdam initializing...');
  new WeerwolvenApp();
  console.log('✅ Game ready!');
});
