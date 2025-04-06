import { Application, Container, Graphics } from 'pixi.js';

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

// Draw Example Content
const circle = new Graphics();
circle.beginFill(0xffffff);
circle.drawCircle(0, 0, 50);
circle.endFill();
circle.x = GAME_WIDTH / 2;
circle.y = GAME_HEIGHT / 2;
gameContainer.addChild(circle);

// Resize & Center Function
function resize() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const scaleX = screenWidth / GAME_WIDTH;
  const scaleY = screenHeight / GAME_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  // Resize renderer to window
  app.renderer.resize(screenWidth, screenHeight);

  // Scale game visuals
  gameContainer.scale.set(scale);

  // Center game visuals
  gameContainer.x = (screenWidth - GAME_WIDTH * scale) / 2;
  gameContainer.y = (screenHeight - GAME_HEIGHT * scale) / 2;
}

// Initial & Dynamic Resize
resize();
window.addEventListener('resize', resize);
