import { createRandomFactText } from '../ui/randomFact';
import { createRandomExcuseText } from '../ui/randomExcuse';
import { createRandomJokeText } from '../ui/randomJoke';
import type { Text } from 'pixi.js';
import type { PersonalityType } from '../core/Person';

/**
 * Returns a Pixi.Text object based on the provided personality type.
 *
 * @param type - The personality type of the person
 */
export async function getTextForPersonality(type: PersonalityType): Promise<Text> {
  switch (type) {
    case 'Smart Asshole':
      return await createRandomFactText();
    case 'Simple Soul':
      return await createRandomExcuseText();
    case 'Shameless Humorist':
      return await createRandomJokeText();
    case 'Normie':
    default:
      const options = [createRandomFactText, createRandomExcuseText, createRandomJokeText];
      const randomFn = options[Math.floor(Math.random() * options.length)];
      return await randomFn();
  }
}
