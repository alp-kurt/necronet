import { Container, Text, Graphics } from 'pixi.js';
import type { IScene } from '../core/IScene';
import type { SceneManager } from '../core/SceneManager';
import { TaskSelection } from './TaskSelection';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Config';
import { ConsentScene } from './ConsentScene';

/**
 * MainMenuScene
 *
 * Entry point of the game. Introduces the NecroNet platform and invites the player to begin.
 */
export class MainMenuScene implements IScene {
  container: Container;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();

    // Wrapper for vertical centering
    const contentWrapper = new Container();

    // Title
    const title = new Text({
      text: 'Welcome, Freelancer!',
      style: {
        fill: 0xffffff,
        fontSize: 60,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
    });
    title.anchor.set(0.5);
    title.x = GAME_WIDTH / 2;

    // Description
    const description = new Text({
      text:
        'NecroNet is the leading SaaS platform for soul collection.\n' +
        'Join our network, track the souls, and secure your revenue stream.\n\n' +
        'Your targets are waiting...',
      style: {
        fill: 0xaaaaaa,
        fontSize: 22,
        fontFamily: 'monospace',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 720,
      },
    });
    description.anchor.set(0.5);
    description.x = GAME_WIDTH / 2;

    // Start button
    const startButton = this.createStartButton('Enter NecroNet', () => {
      this.sceneManager.changeScene(ConsentScene);
    });
    startButton.x = (GAME_WIDTH - startButton.width) / 2;

    // Set Y positions relative to each other
    title.y = 0;
    description.y = title.y + 100;
    startButton.y = description.y + 160;

    // Add all to wrapper
    contentWrapper.addChild(title, description, startButton);

    // Vertically center the wrapper
    contentWrapper.y = (GAME_HEIGHT - (startButton.y + 60)) / 2;

    this.container.addChild(contentWrapper);
  }

  /**
   * Creates a styled interactive button.
   */
  private createStartButton(label: string, onClick: () => void): Container {
    const button = new Container();

    const background = new Graphics();
    background.beginFill(0x00ffcc);
    background.drawRoundedRect(0, 0, 320, 60, 12);
    background.endFill();
    background.eventMode = 'static';
    background.cursor = 'pointer';

    const text = new Text({
      text: label,
      style: {
        fill: 0x000000,
        fontSize: 24,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
    });
    text.anchor.set(0.5);
    text.x = 160;
    text.y = 30;

    background.on('pointerover', () => (background.tint = 0x00ccaa));
    background.on('pointerout', () => (background.tint = 0xffffff));
    background.on('pointerdown', onClick);

    button.addChild(background, text);
    return button;
  }

  onEnter() {
    console.log('[MainMenuScene] Entered');
  }

  onExit() {
    console.log('[MainMenuScene] Exited');
  }
}
