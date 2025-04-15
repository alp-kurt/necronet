import { Container, Sprite, Text, Texture } from 'pixi.js';
import type { Person } from '../core/Person';
import { GAME_WIDTH } from '../core/Config';

/**
 * Renders the visual header for a person inside a given container.
 * This includes:
 * - Avatar (fetched and rendered as a Sprite)
 * - Full name (Text)
 * - Personality type (Text, styled as italic and secondary)
 *
 * @param container - The container where elements will be added.
 * @param person - The person whose details will be displayed.
 */
export async function createPersonHeader(container: Container, person: Person): Promise<void> {
  // Avatar
  const avatarSprite = new Sprite();
  avatarSprite.anchor.set(0.5);
  avatarSprite.x = GAME_WIDTH / 2;
  avatarSprite.y = 180;
  avatarSprite.width = 180;
  avatarSprite.height = 180;
  container.addChild(avatarSprite);

  try {
    const res = await fetch(person.avatarUrl);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    avatarSprite.texture = Texture.from(bitmap);
  } catch (err) {
    console.warn('[Header] Failed to load avatar:', err);
  }

  // Name
  const nameText = new Text({
    text: person.fullName,
    style: {
      fill: 0xffffff,
      fontSize: 36,
      fontFamily: 'monospace',
      fontWeight: 'bold',
    },
  });
  nameText.anchor.set(0.5);
  nameText.x = GAME_WIDTH / 2;
  nameText.y = avatarSprite.y + avatarSprite.height / 2 + 20;
  container.addChild(nameText);

  // Type
  const typeText = new Text({
    text: person.type,
    style: {
      fill: 0xaaaaaa,
      fontSize: 22,
      fontFamily: 'monospace',
      fontStyle: 'italic',
    },
  });
  typeText.anchor.set(0.5);
  typeText.x = GAME_WIDTH / 2;
  typeText.y = nameText.y + 36;
  container.addChild(typeText);
}
