import { Texture } from 'pixi.js';

/**
 * Fetches a random user's name and generates a unique avatar texture using DiceBear.
 *
 * This function uses the `randomuser.me` API to get a name, then uses that name to
 * create a unique avatar using DiceBear's "notionists" avatar style.
 * The avatar image is converted into a PixiJS `Texture` for rendering in the game.
 *
 * @returns A Promise that resolves to an object containing:
 *  - `fullName`: The randomly generated full name (first + last)
 *  - `avatarTexture`: A PixiJS texture generated from the DiceBear avatar
 */
export async function fetchRandomUserWithAvatar(): Promise<{
  fullName: string;
  avatarTexture: Texture;
}> {
  const userRes = await fetch('https://randomuser.me/api/');
  const userData = await userRes.json();
  const user = userData.results[0];
  const fullName = `${user.name.first} ${user.name.last}`;

  const encodedName = encodeURIComponent(fullName);
  const timestamp = Date.now();
  const avatarUrl = `https://api.dicebear.com/8.x/notionists/png?seed=${encodedName}&t=${timestamp}`;

  const avatarRes = await fetch(avatarUrl);
  const avatarBlob = await avatarRes.blob();
  const bitmap = await createImageBitmap(avatarBlob);
  const avatarTexture = Texture.from(bitmap);

  return { fullName, avatarTexture };
}
