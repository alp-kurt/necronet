import { Container, Graphics } from 'pixi.js';

export function createFooter(): Container {
  const footer = new Container();

  const background = new Graphics();
  background.beginFill(0x101010);
  background.drawRect(0, 0, 1080, 60); 
  background.endFill();

  footer.addChild(background);
  return footer;
}
