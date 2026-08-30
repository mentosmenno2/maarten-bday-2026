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
    this.difficultySelector = document.createElement('difficulty-selector');
    this.gameBoard = document.createElement('game-board');
    this.gameOverScreen = document.createElement('game-over-screen');

    if (this.difficultySelector) appDiv.appendChild(this.difficultySelector);
    if (this.gameBoard) appDiv.appendChild(this.gameBoard);
    if (this.gameOverScreen) appDiv.appendChild(this.gameOverScreen);

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
  private botMentions: Record<string, number> = {}; // Track how many times each bot was mentioned

  private startBotChat(): void {
    if (!this.gameEngine) return;

    // Limit chat messages: stop after 8 messages or if only 2 players left
    let messageCount = 0;
    const maxMessages = Math.min(8, Math.max(3, this.gameEngine.getAlivePlayers().length - 1));
    
    const config = this.gameEngine.getPlayers().length > 6
      ? { frequency: 0.7, interval: 2000 }
      : { frequency: 0.5, interval: 3000 };

    this.chatInterval = setInterval(() => {
      if (messageCount >= maxMessages) {
        this.stopBotChat();
        return;
      }
      this.generateBotChatMessage();
      messageCount++;
    }, config.interval);
  }

  private stopBotChat(): void {
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
      this.chatInterval = null;
    }
    this.botMentions = {};
  }

  private generateBotChatMessage(): void {
    if (!this.gameEngine) return;

    const alivePlayers = this.gameEngine.getAlivePlayers();
    const aliveBots = alivePlayers.filter(p => p.constructor.name === 'Bot' && p.alive);

    if (aliveBots.length === 0 || alivePlayers.length < 2) return;

    // Random bot speaks
    const speaker = Randomizer.pickRandom(aliveBots);
    const otherPlayers = alivePlayers.filter(p => p.id !== speaker.id);

    if (otherPlayers.length === 0) return;

    let message = '';
    const rand = Math.random() * 100;
    
    // Non-overlapping probability ranges
    const accuseChance = speaker.aggression * 0.4;  // 0-40% chance to accuse
    const bandwagonChance = (100 - speaker.aggression) * 0.2; // Up to 20% to bandwagon
    const suspicionChance = 30; // Up to 30% to express suspicion
    const defenseChance = 100 - accuseChance - bandwagonChance - suspicionChance;

    if (rand < accuseChance) {
      // Accuse someone
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildAccusation(speaker.name, target.name);
      this.botMentions[target.id] = (this.botMentions[target.id] || 0) + 1;
    } else if (rand < accuseChance + bandwagonChance) {
      // Bandwagon - only if someone has been accused
      if (Object.keys(this.botMentions).length > 0) {
        const mostMentioned = Object.entries(this.botMentions)
          .sort((a, b) => b[1] - a[1])[0][0];
        const targetPlayer = alivePlayers.find(p => p.id === mostMentioned);
        if (targetPlayer) {
          message = ChatTemplateBuilder.buildBandwagon(speaker.name, targetPlayer.name);
        } else {
          const target = Randomizer.pickRandom(otherPlayers);
          message = ChatTemplateBuilder.buildSuspicion(speaker.name, target.name);
        }
      } else {
        const target = Randomizer.pickRandom(otherPlayers);
        message = ChatTemplateBuilder.buildSuspicion(speaker.name, target.name);
      }
    } else if (rand < accuseChance + bandwagonChance + suspicionChance) {
      // Suspicion about someone
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildSuspicion(speaker.name, target.name);
    } else if (Object.keys(this.botMentions).some(id => id === speaker.id)) {
      // Only defend if the speaker has been mentioned
      message = ChatTemplateBuilder.buildDefense(speaker.name);
    } else {
      // Default to suspicion if nothing else fits
      const target = Randomizer.pickRandom(otherPlayers);
      message = ChatTemplateBuilder.buildSuspicion(speaker.name, target.name);
    }

    if (message) {
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
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎲 Weerwolven van Wakkerdam initializing...');
  new WeerwolvenApp();
  console.log('✅ Game ready!');
});
