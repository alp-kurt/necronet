import { Application, Container } from 'pixi.js';
import { Resizer } from './resizer';
import { createUserDisplay } from './ui/userDisplay';
import { createFetchUserButton } from './ui/fetchUserButton';
import { createRandomJokeText } from './ui/randomJoke';
import { createRandomFactText } from './ui/randomFact';
import { createRandomExcuseText } from './ui/randomExcuse';
import { createHeader } from './ui/header';
import { createFooter } from './ui/footer';

const GAME_WIDTH = 1080;
const GAME_HEIGHT = 1080;

const app = new Application();

await app.init({
  backgroundColor: 0x1e1e1e,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});

document.body.appendChild(app.canvas);

// Separate containers
const gameContainer = new Container(); // Scaled container
const uiContainer = new Container();   // Fixed UI container

app.stage.addChild(gameContainer);
app.stage.addChild(uiContainer);

// Header & Footer — now attached to UI container
const header = createHeader();
const footer = createFooter();
uiContainer.addChild(header);
uiContainer.addChild(footer);

// Resize-aware layout for header & footer (fixed to screen)
function layoutUI() {
  header.x = 0;
  header.y = 0;
  header.width = window.innerWidth;

  footer.x = 0;
  footer.y = window.innerHeight - 60;
  footer.width = window.innerWidth;
}

window.addEventListener('resize', layoutUI);
layoutUI(); // Run once

// Resizer for the game container only
const resizer = new Resizer(app, gameContainer, GAME_WIDTH, GAME_HEIGHT);

// Display: Avatar + NameText
const { nameText, avatarSpriteRef } = createUserDisplay(gameContainer, GAME_WIDTH);

// Joke
const jokeText = await createRandomJokeText();
jokeText.x = GAME_WIDTH / 2;
jokeText.y = 600;
gameContainer.addChild(jokeText);

// Fact
const factText = await createRandomFactText();
factText.x = GAME_WIDTH / 2;
factText.y = 680;
gameContainer.addChild(factText);

// Excuse
const excuseText = await createRandomExcuseText(); 
excuseText.x = GAME_WIDTH / 2;
excuseText.y = 760;
gameContainer.addChild(excuseText);

// Button
const fetchButton = createFetchUserButton({
  container: gameContainer,
  gameWidth: GAME_WIDTH,
  nameText,
  avatarSpriteRef,
});
gameContainer.addChild(fetchButton);
