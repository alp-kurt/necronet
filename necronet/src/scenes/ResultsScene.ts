import { Container, Text } from 'pixi.js';
import { IScene } from '../core/IScene';
import { GAME_WIDTH } from '../core/Config';
import { TaskSelection } from './TaskSelection';
import type { SceneManager } from '../core/SceneManager';
import { LastActionStore } from '../core/LastActionStore';

/**
 * ResultsScene
 *
 * Displays a different message depending on the player's last action:
 * - If the soul was killed, a message of harvesting appears.
 * - If the soul was released, a message of mercy appears.
 * After a short delay, returns to TaskSelection.
 */
export class ResultsScene implements IScene {
  container: Container;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();

    const action = LastActionStore.get();

    const message = action === 'killed'
      ? '☠️ \nThe soul has been harvested...\nYour credits will be increased soon...'
      : action === 'released'
      ? '🙏 \nThe soul has been released...\n You better have a good reason to do this...'
      : '🤔 Something mysterious happened...\nReturning to task list...';

    const text = new Text({
      text: message,
      style: {
        fill: 0x00ffcc,
        fontSize: 28,
        fontFamily: 'monospace',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: GAME_WIDTH - 100,
      },
    });
    text.anchor.set(0.5);
    text.x = GAME_WIDTH / 2;
    text.y = 300;

    this.container.addChild(text);

    setTimeout(() => {
      LastActionStore.clear(); // Clean it up for next round
      this.sceneManager.changeScene(TaskSelection);
    }, 3000);
  }

  onEnter() {
    console.log('[ResultsScene] Entered');
  }

  onExit() {
    console.log('[ResultsScene] Exited');
  }
}
