import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import { fetchRandomUserWithAvatar } from '../utils/fetchUser';

interface Props {
  container: Container;
  gameWidth: number;
  nameText: Text;
  avatarSpriteRef: { current: Sprite | null };
}

/**
 * Creates a button labeled "Fetch Random User" that, when clicked,
 * fetches a fake user from randomuser.me and displays their name and avatar.
 *
 * This utility is primarily intended for **testing and prototyping** purposes
 * to quickly visualize dynamic user data and validate rendering logic.
 *
 * @param container - The PIXI container to which the avatar sprite will be added.
 * @param gameWidth - The width of the game scene, used for centering UI elements.
 * @param nameText - A reference to the text component that will display the user's name.
 * @param avatarSpriteRef - A mutable reference object to keep track of the current avatar sprite.
 * @returns A PIXI Container containing the styled fetch button.
 */
export function createFetchUserButton({
  container,
  gameWidth,
  nameText,
  avatarSpriteRef,
}: Props): Container {
  const wrapper = new Container();

  // Create the graphical button
  const button = new Graphics();
  button.fill({ color: 0x3333ff }).roundRect(0, 0, 300, 60, 15);
  button.eventMode = 'static';
  button.cursor = 'pointer';

  // Label
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

  // Center the wrapper horizontally
  wrapper.x = gameWidth / 2 - 150;
  wrapper.y = 320;
  wrapper.addChild(button);

  // On click, fetch a new user and display it
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
