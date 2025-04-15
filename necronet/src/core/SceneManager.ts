import type { Application, Container } from 'pixi.js';
import type { IScene } from './IScene';

/**
 * SceneManager is responsible for managing the lifecycle and transitions
 * between different scenes (views or pages) in a PixiJS application.
 *
 * It ensures that only one scene is active at a time and provides methods to:
 * - Switch between scenes
 * - Properly dispose of old scenes
 * - Inject itself into scene constructors if needed
 */
export class SceneManager {
  private app: Application;
  private root: Container;
  private currentScene: IScene | null = null;

  /**
   * Constructs the SceneManager with a PixiJS Application and a root container
   * where all scene contents will be attached.
   *
   * @param app - The PixiJS Application instance
   * @param root - The root container for managing scenes
   */
  constructor(app: Application, root: Container) {
    this.app = app;
    this.root = root;
  }

  /**
   * Overload 1: Directly accepts an instantiated scene object.
   * Overload 2: Accepts a scene constructor and injects the SceneManager into it.
   *
   * @param scene - Either an instance of IScene or a class constructor accepting SceneManager
   */
  changeScene(scene: IScene): void;
  changeScene<T extends IScene>(SceneConstructor: new (sceneManager: SceneManager) => T): void;
  changeScene(arg: IScene | (new (sceneManager: SceneManager) => IScene)) {
    // Cleanup the current scene
    if (this.currentScene) {
      this.currentScene.onExit();
      this.root.removeChild(this.currentScene.container);
    }

    // Support both pre-instantiated scenes or SceneManager-injected constructors
    const newScene =
      typeof arg === 'function' ? new arg(this) : arg;

    this.currentScene = newScene;
    this.root.addChild(newScene.container);
    this.currentScene.onEnter();
  }

  /**
   * Returns the currently active scene (if any).
   */
  getCurrentScene(): IScene | null {
    return this.currentScene;
  }
}
