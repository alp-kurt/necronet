import { Container, Graphics, Text } from 'pixi.js';
import type { IScene } from '../core/IScene';
import type { SceneManager } from '../core/SceneManager';
import { GameScene } from './GameScene';
import { GAME_WIDTH } from '../core/Config';

export class MainMenuScene implements IScene {
  container: Container;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();

    // Title
    const title = new Text({
      text: 'Welcome Freelancer!',
      style: {
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'monospace',
        align: 'center',
      },
    });
    title.anchor.set(0.5);
    title.x = GAME_WIDTH / 2;
    title.y = 200;
    this.container.addChild(title);

    // Description
    const description = new Text({
      text: 'NecroNet is the leading SaaS solution\n for soul collection.\n \nJoin our system, track down the souls, and collect them to make money!',
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
    description.y = 320;
    this.container.addChild(description);

    // Text-style Start Button
    const startButton = new Text({
      text: 'Click here to start earning...',
      style: {
        fill: 0x00ffcc,
        fontSize: 28,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
    });
    startButton.anchor.set(0.5);
    startButton.x = GAME_WIDTH / 2;
    startButton.y = 460;
    startButton.eventMode = 'static';
    startButton.cursor = 'pointer';
    startButton.on('pointerdown', () => {
      this.sceneManager.changeScene(new GameScene());
    });

    this.container.addChild(startButton);
  }

  onEnter() {
    console.log('[MainMenuScene] Entered');
  }

  onExit() {
    console.log('[MainMenuScene] Exited');
  }
}
