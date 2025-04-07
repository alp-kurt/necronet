import type { Application, Container } from 'pixi.js';
import type { IScene } from './IScene';

export class SceneManager {
  private app: Application;
  private root: Container;
  private currentScene: IScene | null = null;

  constructor(app: Application, root: Container) {
    this.app = app;
    this.root = root;
  }

  changeScene(newScene: IScene) {
    if (this.currentScene) {
      this.currentScene.onExit();
      this.root.removeChild(this.currentScene.container);
    }

    this.currentScene = newScene;
    this.root.addChild(newScene.container);
    this.currentScene.onEnter();
  }

  getCurrentScene(): IScene | null {
    return this.currentScene;
  }
}
