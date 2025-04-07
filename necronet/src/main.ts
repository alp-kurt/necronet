import { Application, Container } from 'pixi.js';
import { Resizer } from './resizer';
import { createHeader } from './ui/header';
import { createFooter } from './ui/footer';
import { SceneManager } from './core/SceneManager';
import { MainMenuScene } from './scenes/MainMenuScene';
import { GAME_WIDTH, GAME_HEIGHT } from './core/Config';

(async () => {
  const app = new Application();

  await app.init({
    backgroundColor: 0x1e1e1e,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.body.appendChild(app.canvas);

  // Containers
  const gameContainer = new Container(); // Scaled game content
  const uiContainer = new Container();   // Fixed layout UI (header, footer)

  app.stage.addChild(gameContainer);
  app.stage.addChild(uiContainer);

  // Scene manager controls active game state
  const sceneManager = new SceneManager(app, gameContainer);
  sceneManager.changeScene(new MainMenuScene(sceneManager));

  // Header & Footer
  const header = createHeader();
  const footer = createFooter();
  uiContainer.addChild(header);
  uiContainer.addChild(footer);

  // Resize-aware layout for UI
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

  // Resizer scales only the game container (not UI)
  new Resizer(app, gameContainer, GAME_WIDTH, GAME_HEIGHT);
})();
