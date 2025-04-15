import { Container, Graphics, Text } from 'pixi.js';
import { IScene } from '../core/IScene';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Config';
import { PeopleList } from '../ui/peopleList';
import { SelectedPersonStore } from '../core/SelectedPersonStore';
import type { SceneManager } from '../core/SceneManager';
import { GameScene } from './GameScene';
import { trackEvent } from '../firebase';

/**
 * TaskSelection scene allows the player to view a list of randomly generated users
 * and select one to begin the next part of the game (e.g., soul collection).
 * The selected person is stored in SelectedPersonStore.
 */
export class TaskSelection implements IScene {
  container: Container;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();

    // Create and add the interactive people list
    const peopleList = new PeopleList();
    peopleList.x = (GAME_WIDTH - 800) / 2;
    peopleList.y = 100;
    this.container.addChild(peopleList);

    // Create and configure the "Go" button
    const goButton = new Graphics();
    goButton.beginFill(0x00cc66);
    goButton.drawRect(0, 0, 200, 50);
    goButton.endFill();
    goButton.x = (GAME_WIDTH - 200) / 2;
    goButton.y = GAME_HEIGHT - 100;
    goButton.eventMode = 'static';
    goButton.cursor = 'pointer';

    const buttonText = new Text({
      text: 'Go →',
      style: {
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'monospace',
      },
    });
    buttonText.anchor.set(0.5);
    buttonText.x = 100;
    buttonText.y = 25;
    goButton.addChild(buttonText);

    goButton.on('pointerdown', () => {
      const selected = SelectedPersonStore.get();
      if (selected) {
        trackEvent('task_initiated');
        this.sceneManager.changeScene(GameScene);
      } else {
        console.warn('[TaskSelection] No selected person found.');
      }
    });

    this.container.addChild(goButton);
  }

  onEnter() {
    console.log('[TaskSelection] Entered');
  }

  onExit() {
    console.log('[TaskSelection] Exited');
  }
}
