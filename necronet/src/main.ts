import { Application, Container } from 'pixi.js';
import { Resizer } from './resizer';
import { createUserDisplay } from './ui/userDisplay';
import { createFetchUserButton } from './ui/fetchUserButton';
import { createRandomJokeText } from './ui/randomJoke';
import { createRandomFactText } from './ui/randomFact';

const GAME_WIDTH = 1080;
const GAME_HEIGHT = 1080;

const app = new Application();

await app.init({
  backgroundColor: 0x1e1e1e,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});

document.body.appendChild(app.canvas);

// Scene Container
const gameContainer = new Container();
app.stage.addChild(gameContainer);

// Resizer
new Resizer(app, gameContainer, GAME_WIDTH, GAME_HEIGHT);

// Display: Avatar + NameText
const { nameText, avatarSpriteRef } = createUserDisplay(gameContainer, GAME_WIDTH);

const jokeText = await createRandomJokeText();
jokeText.x = GAME_WIDTH / 2;
jokeText.y = 600;
gameContainer.addChild(jokeText);

const factText = await createRandomFactText();
factText.x = GAME_WIDTH / 2;
factText.y = 680; 

gameContainer.addChild(factText);


// Button
const fetchButton = createFetchUserButton({
  container: gameContainer,
  gameWidth: GAME_WIDTH,
  nameText,
  avatarSpriteRef,
});

gameContainer.addChild(fetchButton);