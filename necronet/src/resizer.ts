import type { Application, Container } from 'pixi.js';

export class Resizer {
  private app: Application;
  private container: Container;
  private baseWidth: number;
  private baseHeight: number;

  constructor(app: Application, container: Container, baseWidth: number, baseHeight: number) {
    this.app = app;
    this.container = container;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;

    this.resize(); // Initial resize
    window.addEventListener('resize', this.resize); // Bind resize
  }

  private resize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scaleX = screenWidth / this.baseWidth;
    const scaleY = screenHeight / this.baseHeight;
    const scale = Math.min(scaleX, scaleY);

    this.app.renderer.resize(screenWidth, screenHeight);
    this.container.scale.set(scale);

    this.container.x = (screenWidth - this.baseWidth * scale) / 2;
    this.container.y = (screenHeight - this.baseHeight * scale) / 2;

    console.log('[Resizer] Resized to:', screenWidth, screenHeight, 'Scale:', scale.toFixed(2));
  };
}
