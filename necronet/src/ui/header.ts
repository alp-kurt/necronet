// ui/header.ts
import { Container, Graphics, Text } from 'pixi.js';

export function createHeader(): Container {
  const header = new Container();

  // Background bar
  const background = new Graphics();
  background.beginFill(0x101010);
  background.drawRect(0, 0, 1080, 60);
  background.endFill();
  header.addChild(background);

  // Title text
  const title = new Text({
    text: 'NecroNet',
    style: {
      fill: 0xffffff,
      fontSize: 28,
      fontFamily: 'monospace',
    },
  });

  // Center the text
  title.anchor.set(0.5);
  title.x = 1080 / 2;
  title.y = 60 / 2;

  header.addChild(title);

  return header;
}
