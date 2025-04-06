import { Text } from 'pixi.js';

export async function createRandomFactText(): Promise<Text> {
  const text = new Text({
    text: 'Loading fact...',
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
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const data = await response.json();

    if (data?.text) {
      text.text = data.text;
    } else {
      text.text = 'No fact found 😢';
    }
  } catch (err) {
    text.text = 'Failed to fetch fact 😢';
    console.error(err);
  }

  return text;
}