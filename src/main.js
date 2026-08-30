import { GameEngine } from './core/GameEngine';
import { GamePhase } from './types';
import { ChatTemplateBuilder } from './utils/ChatTemplateBuilder';
import { Randomizer } from './utils/Randomizer';
/**
 * Main application entry point
 */
class WeerwolvenApp {
    constructor() {
        Object.defineProperty(this, "gameEngine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "currentScreen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'menu'
        });
        Object.defineProperty(this, "difficultySelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "gameBoard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "gameOverScreen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // Bot chat system
        Object.defineProperty(this, "chatInterval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.setupApp();
    }
    setupApp() {
        const appDiv = document.querySelector('#app');
        if (!appDiv) {
            console.error('App container not found!');
            return;
        }
        // Create main screen elements
        this.difficultySelector = document.createElement('difficulty-selector');
        this.gameBoard = document.createElement('game-board');
        this.gameOverScreen = document.createElement('game-over-screen');
        appDiv.appendChild(this.difficultySelector);
        appDiv.appendChild(this.gameBoard);
        appDiv.appendChild(this.gameOverScreen);
        // Hide game and gameover screens initially
        this.gameBoard.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        // Attach event listeners
        this.attachEventListeners();
        // Start with menu
        this.showMenu();
    }
    attachEventListeners() {
        // Difficulty selection
        this.difficultySelector?.addEventListener('difficultySelected', (e) => {
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
        document.addEventListener('gameWon', (e) => {
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
        document.addEventListener('phaseChanged', (e) => {
            if (e instanceof CustomEvent && e.detail.phase !== GamePhase.DAY_DISCUSSION) {
                this.stopBotChat();
            }
        });
    }
    showMenu() {
        this.currentScreen = 'menu';
        this.hideAllScreens();
        this.difficultySelector.classList.remove('hidden');
    }
    startGame(difficulty) {
        this.currentScreen = 'game';
        this.hideAllScreens();
        this.gameBoard.classList.remove('hidden');
        // Create new game engine
        this.gameEngine = new GameEngine();
        this.gameBoard.setGameEngine(this.gameEngine);
        // Start the game
        this.gameEngine.startGame(difficulty);
        // Announce start
        console.log(`🎮 Game started on ${difficulty} difficulty!`);
    }
    showGameOver() {
        this.currentScreen = 'gameover';
        this.hideAllScreens();
        this.gameOverScreen.classList.remove('hidden');
    }
    showGameOverWithTeam(team) {
        this.showGameOver();
        this.gameOverScreen.showGameOver(team);
    }
    resetGame() {
        if (this.gameEngine) {
            this.gameEngine.reset();
            this.showMenu();
        }
    }
    hideAllScreens() {
        this.difficultySelector.classList.add('hidden');
        this.gameBoard.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
    }
    startBotChat() {
        if (!this.gameEngine)
            return;
        const config = this.gameEngine.getPlayers().length > 6
            ? { frequency: 0.7, interval: 2000 }
            : { frequency: 0.5, interval: 3000 };
        this.chatInterval = setInterval(() => {
            this.generateBotChatMessage();
        }, config.interval);
    }
    stopBotChat() {
        if (this.chatInterval) {
            clearInterval(this.chatInterval);
            this.chatInterval = null;
        }
    }
    generateBotChatMessage() {
        if (!this.gameEngine)
            return;
        const aliveBots = this.gameEngine.getAlivePlayers()
            .filter(p => p.constructor.name === 'Bot' && p.alive);
        if (aliveBots.length === 0)
            return;
        // Random bot speaks
        const speaker = Randomizer.pickRandom(aliveBots);
        const otherPlayers = this.gameEngine.getAlivePlayers()
            .filter(p => p.id !== speaker.id);
        if (otherPlayers.length === 0)
            return;
        let message = '';
        const rand = Math.random();
        if (rand < speaker.aggression / 100) {
            // Accuse someone
            const target = Randomizer.pickRandom(otherPlayers);
            message = ChatTemplateBuilder.buildAccusation(speaker.name, target.name);
        }
        else if (rand < (speaker.aggression + 30) / 100) {
            // Bandwagon
            const target = Randomizer.pickRandom(otherPlayers);
            message = ChatTemplateBuilder.buildBandwagon(speaker.name, target.name);
        }
        else if (rand < (speaker.aggression + 60) / 100) {
            // Defend
            message = ChatTemplateBuilder.buildDefense(speaker.name);
        }
        else {
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
//# sourceMappingURL=main.js.map