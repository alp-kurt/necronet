import { Container, Text, Graphics } from 'pixi.js';
import { Person } from '../core/Person';
import { getIntroNarrationPart1, getIntroNarrationPart2, getTypeSetupNarration } from '../utils/narrationUtils';
import { getTextForPersonality } from './personalityContent';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Config';

/**
 * Creates and manages a narration sequence with click-to-continue behavior.
 * 
 * This sequence displays narrative lines about a given person in multiple steps.
 * It supports both full narration (intro + type-based) and a shorter version 
 * (only type-based), with each line displayed on click. A temporary overlay 
 * ensures consistent click handling without interfering with other UI elements.
 *
 * @param container - The PixiJS container to render the narration in.
 * @param person - The character/person whose data will drive the narration.
 * @param existingText - Optional existing Text instance to reuse.
 * @param onlyFinalLines - If true, skips the intro narration and only shows personality-based lines.
 * @returns A Promise that resolves with the final `Text` object once the narration finishes.
 */
export async function createNarrationSequence(
  container: Container,
  person: Person,
  existingText?: Text,
  onlyFinalLines: boolean = false
): Promise<Text> {
  // Main narration text
  const narrationText = existingText || new Text({
    text: '',
    style: {
      fill: 0xffffff,
      fontSize: 24,
      fontFamily: 'monospace',
      wordWrap: true,
      wordWrapWidth: GAME_WIDTH - 60,
    },
  });

  narrationText.anchor.set(0.5);
  narrationText.x = GAME_WIDTH / 2;
  narrationText.y = 500;

  // Optional "Click to continue..." helper
  const clickHint = new Text({
    text: 'Click to continue...',
    style: {
      fill: 0xaaaaaa,
      fontSize: 16,
      fontFamily: 'monospace',
      fontStyle: 'italic',
    },
  });
  clickHint.anchor.set(0.5);
  clickHint.x = GAME_WIDTH / 2;
  clickHint.y = narrationText.y + 60;

  if (!existingText) {
    container.addChild(narrationText);
  }

  // Invisible overlay to capture all screen clicks during narration
  const overlay = new Graphics();
  overlay.beginFill(0x000000, 0); // Fully transparent
  overlay.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  overlay.endFill();
  overlay.eventMode = 'static';
  overlay.cursor = 'pointer';
  container.addChild(overlay);

  // Choose narration steps
  const steps: (() => Promise<string> | string)[] = onlyFinalLines
    ? [
        () => getTypeSetupNarration(person),
        () => getTextForPersonality(person.type).then(t => t.text),
      ]
    : [
        () => getIntroNarrationPart1(person),
        () => getIntroNarrationPart2(person),
        () => getTypeSetupNarration(person),
        () => getTextForPersonality(person.type).then(t => t.text),
      ];

  let currentStep = 0;

  return new Promise((resolve) => {
    const showNext = async () => {
      const isLastStep = currentStep === steps.length - 1;

      if (currentStep < steps.length) {
        const content = await steps[currentStep++]();
        narrationText.text = content;

        if (!isLastStep && !container.children.includes(clickHint)) {
          container.addChild(clickHint);
        } else if (isLastStep && container.children.includes(clickHint)) {
          container.removeChild(clickHint);
        }
      } else {
        // Clean up once sequence is complete
        container.removeChild(overlay);
        if (container.children.includes(clickHint)) {
          container.removeChild(clickHint);
        }
        resolve(narrationText);
      }
    };

    overlay.on('pointerdown', showNext);
    showNext();
  });
}
