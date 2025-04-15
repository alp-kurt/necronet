import { Container, Sprite, Text } from 'pixi.js';

/**
 * Creates and renders the user's display in the game scene.
 *
 * This function adds a name text element and an avatar sprite centered within the given container.
 * It also returns references so that the UI elements can be updated externally.
 *
 * @param container - The PixiJS container where the display elements will be added.
 * @param gameWidth - The width of the game screen, used for horizontal centering.
 * @returns An object containing:
 *   - `nameText`: A PixiJS `Text` element used to show the user's name.
 *   - `avatarSpriteRef`: A mutable reference to the `Sprite`, wrapped in an object so its texture can be updated later.
 */
export function createUserDisplay(container: Container, gameWidth: number) {
  const nameText = new Text({
    text: 'Click the button to fetch a name!',
    style: {
      fill: 0xffffff,
      fontSize: 32,
      fontFamily: 'monospace',
    },
  });
  nameText.anchor.set(0.5);
  nameText.x = gameWidth / 2;
  nameText.y = 220;

  // Create the avatar sprite and position it
  const avatarSprite = new Sprite();
  avatarSprite.anchor.set(0.5);
  avatarSprite.x = gameWidth / 2;
  avatarSprite.y = 360;

  // Ref to allow external mutation (e.g. changing avatar texture)
  const avatarSpriteRef: { current: Sprite | null } = { current: avatarSprite };

  // Add both elements to the container
  container.addChild(nameText, avatarSprite);

  return { nameText, avatarSpriteRef };
}
