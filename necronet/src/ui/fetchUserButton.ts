import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import { fetchRandomUserWithAvatar } from '../utils/fetchUser';

interface Props {
  container: Container;
  gameWidth: number;
  nameText: Text;
  avatarSpriteRef: { current: Sprite | null };
}

export function createFetchUserButton({
  container,
  gameWidth,
  nameText,
  avatarSpriteRef,
}: Props): Container {
  const wrapper = new Container();

  const button = new Graphics();
  button.fill({ color: 0x3333ff }).roundRect(0, 0, 300, 60, 15);
  button.eventMode = 'static';
  button.cursor = 'pointer';

  const buttonText = new Text({
    text: 'Fetch Random User',
    style: {
      fill: 0xffffff,
      fontSize: 24,
      fontFamily: 'monospace',
    },
  });
  buttonText.anchor.set(0.5);
  buttonText.x = button.width / 2;
  buttonText.y = button.height / 2;
  button.addChild(buttonText);

  // Position the wrapper instead of the button
  wrapper.x = gameWidth / 2 - 150;
  wrapper.y = 320;
  wrapper.addChild(button);

  button.on('pointerdown', async () => {
    nameText.text = 'Fetching...';

    try {
      const { fullName, avatarTexture } = await fetchRandomUserWithAvatar();

      nameText.text = fullName;

      if (avatarSpriteRef.current) {
        avatarSpriteRef.current.destroy(true);
        container.removeChild(avatarSpriteRef.current);
      }

      const avatar = new Sprite(avatarTexture);
      avatar.anchor.set(0.5);
      avatar.width = 128;
      avatar.height = 128;
      avatar.x = gameWidth / 2;
      avatar.y = 100;

      avatarSpriteRef.current = avatar;
      container.addChildAt(avatar, 0);
    } catch (err) {
      nameText.text = 'Failed to fetch user';
      console.error(err);
    }
  });

  return wrapper;
}