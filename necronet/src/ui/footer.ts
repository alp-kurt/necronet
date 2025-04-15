import { Container, Graphics, Text } from 'pixi.js';
import { trackEvent } from '../firebase';
/**
 * Creates the game footer.
 *
 * - Displays a dark bar at the bottom of the screen.
 * - Shows creator attribution text ("Made by Alp Kurt").
 * - The text links to the creator's personal website (https://alpkurt.com)
 *   and sends a Google Analytics event when clicked.
 */
export function createFooter(): Container {
  const footer = new Container();

  // Background bar
  const background = new Graphics();
  background.beginFill(0x101010);
  background.drawRect(0, 0, 1080, 60); 
  background.endFill();
  footer.addChild(background);

  // Creator text with link
  const creditText = new Text({
    text: 'Made by Alp Kurt',
    style: {
      fill: 0xffffff,
      fontSize: 16,
      fontFamily: 'monospace',
    },
  });
  creditText.anchor.set(0.5);
  creditText.x = 1080 / 2;
  creditText.y = 60 / 2;
  creditText.eventMode = 'static';
  creditText.cursor = 'pointer';

  creditText.on('pointerdown', () => {
    trackEvent('footer_link_clicked', { label: 'alpkurt.com' }); // Track custom event
    window.open('https://alpkurt.com', '_blank');
  });

  footer.addChild(creditText);

  return footer;
}
