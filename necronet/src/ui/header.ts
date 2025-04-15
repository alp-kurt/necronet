import { Container, Graphics, Text } from 'pixi.js';

/**
 * Creates the main header component for the game UI.
 *
 * - Displays a fixed header bar at the top of the screen.
 * - Contains a centered game title ("NecroNet").
 * - Clicking on the title will refresh the page (used for quick testing or restarting the game).
 *
 * @returns A PIXI Container containing the styled header.
 */
export function createHeader(): Container {
  const header = new Container();

  // Background bar
  const background = new Graphics();
  background.beginFill(0x101010);
  background.drawRect(0, 0, 1080, 60);
  background.endFill();
  header.addChild(background);

  // Title text
  const title = new Text({
    text: 'NecroNet',
    style: {
      fill: 0xffffff,
      fontSize: 28,
      fontFamily: 'monospace',
    },
  });

  // Center the text
  title.anchor.set(0.5);
  title.x = 1080 / 2;
  title.y = 60 / 2;

  // Make title interactive
  title.eventMode = 'static';
  title.cursor = 'pointer';
  title.on('pointerdown', () => {
    window.location.reload(); // Refresh the entire app
  });

  header.addChild(title);

  return header;
}
