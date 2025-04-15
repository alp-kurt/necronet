import { Text } from 'pixi.js';

/**
 * Creates a `Text` object containing a randomly fetched single-line joke
 * from the `jokeapi.dev` API.
 *
 * This function performs the following:
 * - Displays a placeholder "Loading joke..." message.
 * - Fetches a random joke (type: single) from the API.
 * - If successful and not an error response, updates the text.
 * - Falls back to a default message if the API call fails or returns no content.
 *
 * @returns A `Promise<Text>` that resolves to a PixiJS `Text` object with the joke.
 */
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
