import { Container } from 'pixi.js';

export interface IScene {
  container: Container;
  onEnter(): void;
  onExit(): void;
}
