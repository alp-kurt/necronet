import { Texture } from 'pixi.js';

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
