import { Application, Container, Graphics } from 'pixi.js';
import { Resizer } from './resizer';

// Default Resolution
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

// Create Pixi Application
const app = new Application({
  backgroundColor: 0x1e1e1e,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});
await app.init();
document.body.appendChild(app.canvas);

// Create Game Container
const gameContainer = new Container();
app.stage.addChild(gameContainer);

// Example Graphic
const circle = new Graphics();
circle.beginFill(0xffffff);
circle.drawCircle(0, 0, 50);
circle.endFill();
circle.x = GAME_WIDTH / 2;
circle.y = GAME_HEIGHT / 2;
gameContainer.addChild(circle);

// Use Resizer
new Resizer(app, gameContainer, GAME_WIDTH, GAME_HEIGHT);
