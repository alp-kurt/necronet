// main.js
import * as PIXI from 'pixi.js';

// Create app
const app = new PIXI.Application({
  
  // Make it responsive
  resizeTo: window, 
 
  backgroundColor: 0x1e1e1e, 
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});

// Add canvas to DOM
document.body.appendChild(app.view);

// Example graphic
const circle = new PIXI.Graphics();
circle.beginFill(0xffffff);
circle.drawCircle(0, 0, 50);
circle.endFill();
circle.x = app.renderer.width / 2;
circle.y = app.renderer.height / 2;

app.stage.addChild(circle);

// Resize handler
window.addEventListener('resize', () => {
  circle.x = app.renderer.width / 2;
  circle.y = app.renderer.height / 2;
});
