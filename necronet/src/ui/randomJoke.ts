import { Text } from 'pixi.js';

export async function createRandomJokeText(): Promise<Text> {
  const text = new Text({
    text: 'Loading joke...',
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
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();

    if (!data.error && data.joke) {
      text.text = data.joke;
    } else {
      text.text = 'No joke found 😢';
    }
  } catch (err) {
    text.text = 'Failed to fetch joke 😢';
    console.error(err);
  }

  return text;
}
