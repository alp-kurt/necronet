import { Container, Sprite, Text } from 'pixi.js';

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

  const avatarSpriteRef: { current: Sprite | null } = { current: null };

  container.addChild(nameText);
  return { nameText, avatarSpriteRef };
}
