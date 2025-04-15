import { Text } from 'pixi.js';

/**
 * Creates a `Text` object containing a randomly fetched fact from the `uselessfacts.jsph.pl` API.
 *
 * This function performs the following:
 * - Initializes a placeholder loading text.
 * - Fetches a random useless fact in English.
 * - If the response contains a fact, displays it.
 * - If the response is invalid or fetch fails, shows an error or fallback message.
 *
 * @returns A `Promise<Text>` that resolves to a PixiJS `Text` object with the fact content.
 */
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
