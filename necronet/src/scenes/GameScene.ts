import { Container, Text } from 'pixi.js';
import { IScene } from '../core/IScene';
import { GAME_WIDTH } from '../core/Config';
import { SelectedPersonStore } from '../core/SelectedPersonStore';
import type { Person } from '../core/Person';
import { FetchedPeopleStore } from '../core/FetchedPeopleStore';
import { ResultsScene } from './ResultsScene';
import type { SceneManager } from '../core/SceneManager';
import { createNarrationSequence } from '../ui/createNarrationSequence';
import { LastActionStore } from '../core/LastActionStore';
import { createPersonHeader } from '../ui/createPersonHeader';
import { createActionButton } from '../ui/createActionButton';
import { logEvent } from 'firebase/analytics';
import { trackEvent } from '../firebase';

/**
 * GameScene
 *
 * The core interaction scene where players meet a randomly selected soul.
 * Players can observe the soul’s personality, read a contextual narration,
 * and decide what to do with the soul (kill, release, or give another chance).
 */
export class GameScene implements IScene {
  container: Container;
  private narrationTextRef: Text | null = null;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();
    this.init();
  }

  /**
   * Initializes the scene: loads person, displays UI, handles buttons and narration.
   */
  async init() {
    const selected: Person | null = SelectedPersonStore.get();

    if (!selected) {
      const warning = new Text({
        text: 'No person selected.',
        style: { fill: 0xff5555, fontSize: 32, fontFamily: 'monospace' },
      });
      warning.anchor.set(0.5);
      warning.x = GAME_WIDTH / 2;
      warning.y = 200;
      this.container.addChild(warning);
      return;
    }

    // Display soul info
    createPersonHeader(this.container, selected);

    // Begin narration
    this.narrationTextRef = await createNarrationSequence(this.container, selected);

    // Button base vertical position
    const baseY = 700;

    // Kill (Track: soul_killed)
    const killBtn = createActionButton('💀 Take their soul', baseY, () => {
      trackEvent('soul_killed');
      LastActionStore.set('killed');
      FetchedPeopleStore.removePerson(selected.id);
      SelectedPersonStore.clear();
      this.sceneManager.changeScene(ResultsScene);
    });

    // Release (Track: soul_released)
    const releaseBtn = createActionButton('🙌 Release Them', baseY + 60, () => {
      trackEvent('soul_released');
      LastActionStore.set('released');
      FetchedPeopleStore.removePerson(selected.id);
      SelectedPersonStore.clear();
      this.sceneManager.changeScene(ResultsScene);
    });

    // Another Chance (Track: soul_given_another_chance)
    const retryBtn = createActionButton('🔁 Give Another Chance', baseY + 120, async () => {
      trackEvent('soul_given_another_chance');
      if (this.narrationTextRef) {
        this.narrationTextRef.text = '';
        this.narrationTextRef.eventMode = 'static';
        this.narrationTextRef.cursor = 'pointer';
      }
      this.narrationTextRef = await createNarrationSequence(
        this.container,
        selected,
        this.narrationTextRef ?? undefined,
        true 
      );
       
    });

    this.container.addChild(killBtn, releaseBtn, retryBtn);
  }

  /** Called when scene becomes active */
  onEnter() {
    console.log('[GameScene] Entered');
  }

  /** Called when scene is replaced or exited */
  onExit() {
    console.log('[GameScene] Exited');
  }
}
