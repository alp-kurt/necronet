// scenes/ConsentScene.ts
import { Container, Graphics, Text } from 'pixi.js';
import type { IScene } from '../core/IScene';
import type { SceneManager } from '../core/SceneManager';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Config';
import { TaskSelection } from './TaskSelection';

/**
 * ConsentScene
 * 
 * Informs the player about Google Analytics and public 3rd-party APIs,
 * and presents two buttons: Accept or Refuse. This scene appears before
 * the game starts and is intended to provide light legal clarity.
 */
export class ConsentScene implements IScene {
  container: Container;

  constructor(private sceneManager: SceneManager) {
    this.container = new Container();

    const group = new Container();
    group.x = GAME_WIDTH / 2;

    // Title
    const title = new Text({
      text: 'Before You Continue...',
      style: {
        fill: 0xffffff,
        fontSize: 40,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        align: 'center',
      },
    });
    title.anchor.set(0.5);
    title.y = 0;
    group.addChild(title);

    // Info
    const info = new Text({
      text:
        'NecroNet uses Google Analytics to understand engagement,\n' +
        'and relies on public 3rd-party APIs to retrieve peoples data.\n\n' +
        'We don’t control what those services do, and we’re not liable\n' +
        'for how those people talk to you or they log data.\n\n' +
        'NecroNet is purely for fun, and providing you extra income...',
      style: {
        fill: 0xaaaaaa,
        fontSize: 20,
        fontFamily: 'monospace',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 800,
      },
    });
    info.anchor.set(0.5);
    info.y = title.y + 100;
    group.addChild(info);

    // Buttons
    const acceptBtn = this.createButton('✅ Accept & Continue', () => {
      this.sceneManager.changeScene(TaskSelection);
    });

    const refuseBtn = this.createButton('❌ Refuse & Refresh', () => {
      location.reload();
    });

    acceptBtn.y = info.y + 180;
    refuseBtn.y = acceptBtn.y + 80;

    group.addChild(acceptBtn, refuseBtn);

    // Center group
    group.pivot.set(0, group.height / 2);
    group.y = GAME_HEIGHT / 2;

    this.container.addChild(group);
  }

  private createButton(label: string, handler: () => void): Container {
    const btn = new Container();

    const bg = new Graphics();
    bg.beginFill(0x222222);
    bg.drawRoundedRect(0, 0, 320, 60, 12);
    bg.endFill();
    bg.eventMode = 'static';
    bg.cursor = 'pointer';

    const text = new Text({
      text: label,
      style: {
        fill: 0xffffff,
        fontSize: 20,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
    });
    text.anchor.set(0.5);
    text.x = 160;
    text.y = 30;

    btn.addChild(bg, text);
    btn.x = -160;

    bg.on('pointerover', () => (bg.tint = 0x444444));
    bg.on('pointerout', () => (bg.tint = 0xffffff));
    bg.on('pointerdown', handler);

    return btn;
  }

  onEnter() {
    console.log('[ConsentScene] Entered');
  }

  onExit() {
    console.log('[ConsentScene] Exited');
  }
}
