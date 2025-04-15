import { Container, Graphics, Text } from 'pixi.js';
import { GAME_WIDTH } from '../core/Config';

/**
 * Creates a stylized action button with background, text, and hover behavior.
 *
 * @param label - Button label text
 * @param y - Vertical position in scene
 * @param handler - Function to run when clicked
 * @returns A `Container` with interactive button visuals and logic
 */
export function createActionButton(label: string, y: number, handler: () => void): Container {
  const buttonContainer = new Container();

  const width = 360;
  const height = 56;

  const background = new Graphics();
  background.beginFill(0x2c2c2c);
  background.drawRoundedRect(0, 0, width, height, 12);
  background.endFill();

  const text = new Text({
    text: label,
    style: {
      fill: 0xffffff,
      fontSize: 22,
      fontFamily: 'monospace',
      fontWeight: 'bold',
    },
  });
  text.anchor.set(0.5);
  text.x = width / 2;
  text.y = height / 2;

  buttonContainer.x = (GAME_WIDTH - width) / 2;
  buttonContainer.y = y;
  buttonContainer.eventMode = 'static';
  buttonContainer.cursor = 'pointer';

  buttonContainer.on('pointerdown', handler);
  buttonContainer.on('pointerover', () => {
    background.tint = 0x555555;
  });
  buttonContainer.on('pointerout', () => {
    background.tint = 0xffffff;
  });

  buttonContainer.addChild(background, text);

  return buttonContainer;
}
