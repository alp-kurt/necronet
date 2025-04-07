import { Container } from 'pixi.js';
import { IScene } from '../core/IScene';
import { createUserDisplay } from '../ui/userDisplay';
import { createFetchUserButton } from '../ui/fetchUserButton';
import { createRandomJokeText } from '../ui/randomJoke';
import { createRandomFactText } from '../ui/randomFact';
import { createRandomExcuseText } from '../ui/randomExcuse';
import { GAME_WIDTH, GAME_HEIGHT } from '../core/Config';

export class GameScene implements IScene {
  container: Container;

  constructor() {
    this.container = new Container();
    this.init();
  }

  async init() {
    const { nameText, avatarSpriteRef } = createUserDisplay(this.container, GAME_WIDTH);

    const jokeText = await createRandomJokeText();
    jokeText.x = GAME_WIDTH / 2;
    jokeText.y = 600;
    this.container.addChild(jokeText);

    const factText = await createRandomFactText();
    factText.x = GAME_WIDTH / 2;
    factText.y = 680;
    this.container.addChild(factText);

    const excuseText = await createRandomExcuseText();
    excuseText.x = GAME_WIDTH / 2;
    excuseText.y = 760;
    this.container.addChild(excuseText);

    const fetchButton = createFetchUserButton({
      container: this.container,
      gameWidth: GAME_WIDTH,
      nameText,
      avatarSpriteRef,
    });

    this.container.addChild(fetchButton);
  }

  onEnter() {
    console.log('[GameScene] Entered');
  }

  onExit() {
    console.log('[GameScene] Exited');
  }
}
