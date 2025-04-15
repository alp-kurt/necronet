import type { Application, Container } from 'pixi.js';

/**
 * Resizer is a utility class that handles responsive resizing and centering
 * of a PixiJS application and its root container based on the browser window size.
 *
 * It maintains the aspect ratio using the given base width and height, scales and centers
 * the content, and provides layout callbacks for any additional UI updates.
 */
export class Resizer {
  private app: Application;
  private container: Container;
  private baseWidth: number;
  private baseHeight: number;
  private layoutCallbacks: (() => void)[] = [];

  /**
   * Creates a new Resizer instance.
   *
   * @param app - The PixiJS application instance
   * @param container - The root container to scale and center
   * @param baseWidth - The original design width (e.g., 960)
   * @param baseHeight - The original design height (e.g., 540)
   */
  constructor(app: Application, container: Container, baseWidth: number, baseHeight: number) {
    this.app = app;
    this.container = container;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  /**
   * Adds a callback that is executed every time the screen is resized.
   * Useful for repositioning UI elements based on new dimensions.
   *
   * @param callback - A function to be called after resize
   */
  addLayoutCallback(callback: () => void) {
    this.layoutCallbacks.push(callback);
    callback(); // Run once initially
  }

  /**
   * Internal method that recalculates scale and positioning
   * based on current window size, preserving aspect ratio.
   */
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

    this.layoutCallbacks.forEach(cb => cb());

    console.log('[Resizer] Resized to:', screenWidth, screenHeight, 'Scale:', scale.toFixed(2));
  };
}
