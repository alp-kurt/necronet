import { Text } from 'pixi.js';

export async function createRandomExcuseText(): Promise<Text> {
  const text = new Text({
    text: 'Loading excuse...',
    style: {
      fill: 0xffffff,
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: 400,
      fontFamily: 'monospace',
    },
  });
  text.anchor.set(0.5);

  try {
    const response = await fetch('https://excuser-three.vercel.app/v1/excuse');
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0 && data[0].excuse) {
      text.text = data[0].excuse;
    } else {
      text.text = 'No excuse found';
    }
  } catch (err) {
    text.text = 'Failed to fetch excuse';
    console.error(err);
  }

  return text;
}