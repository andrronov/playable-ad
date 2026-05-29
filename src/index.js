import "./style.css";
import { Application, Container, Sprite, Assets } from "pixi.js";
import { useUI } from "./ui.js";
import { useIdleHint } from "./idle-hint.js";
import {
  ITEMS_CONFIG,
  COVERS_CONFIG,
  ASSETS_ALIAS,
  IS_DEV,
  playItemAnimation,
} from "./config/index.js";

import bgImg from "./assets/bg.jpg";

import appleImg from "./assets/items/apple.png";
import bookImg from "./assets/items/book.png";
import birdImg from "./assets/items/bird.png";
import shoeImg from "./assets/items/shoe.png";

import chairImg from "./assets/covers/chair.png";
import cageImg from "./assets/covers/cage.png";
import hatImg from "./assets/covers/hat.png";

(async () => {
  const app = new Application();
  const { loadUI, buildUI, resizeUI, markItemAsFound, showCTA } = useUI();
  const { startIdleTimer, unfoundItems, removeItem, itemSprites } =
    useIdleHint();

  await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x111111,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    resizeTo: window,
  });

  if (IS_DEV) {
    window.__PIXI_APP__ = app;
  }

  document.body.appendChild(app.canvas);

  await Assets.load([
    { alias: ASSETS_ALIAS.bg, src: bgImg },
    { alias: ASSETS_ALIAS.apple, src: appleImg },
    { alias: ASSETS_ALIAS.book, src: bookImg },
    { alias: ASSETS_ALIAS.bird, src: birdImg },
    { alias: ASSETS_ALIAS.shoe, src: shoeImg },
    { alias: ASSETS_ALIAS.chair, src: chairImg },
    { alias: ASSETS_ALIAS.cage, src: cageImg },
    { alias: ASSETS_ALIAS.hat, src: hatImg },
  ]);
  await loadUI();

  const appContainer = new Container();
  app.stage.addChild(appContainer);
  buildUI(app);

  const bgSprite = new Sprite(Assets.get(ASSETS_ALIAS.bg));
  bgSprite.eventMode = "static";
  bgSprite.on("pointerdown", () => {
    startIdleTimer();
  });
  appContainer.addChild(bgSprite);

  const activeItems = [];

  function placeSprite(item, config, clickable) {
    item.lx = config.lx;
    item.ly = config.ly;
    item.px = config.px ?? config.lx;
    item.py = config.py ?? config.ly;
    item.alpha = config.alpha ?? 0.9;

    item.anchor.set(0.5);

    if (clickable) {
      item.eventMode = "static";
      item.cursor = "pointer";

      if (config.hitArea) {
        item.hitArea = config.hitArea;
      }
    }

    appContainer.addChild(item);
  }

  ITEMS_CONFIG.forEach((config) => {
    const item = new Sprite(Assets.get(config.texture));
    itemSprites[config.id] = item;

    item.on("pointerdown", () => {
      playItemAnimation(item);
      markItemAsFound(config.id);

      removeItem(config.id);
      startIdleTimer();

      if (unfoundItems.length === 0) {
        setTimeout(() => {
          showCTA();
        }, 750);
      }
    });

    placeSprite(item, config, true);
    activeItems.push(item);
  });
  COVERS_CONFIG.forEach((config) => {
    const item = new Sprite(Assets.get(config.texture));

    placeSprite(item, config, false);
    activeItems.push(item);
  });

  function resize() {
    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const bgWidth = bgSprite.texture.width;
    const bgHeight = bgSprite.texture.height;

    appContainer.x = screenWidth / 2;
    appContainer.y = screenHeight / 2;

    appContainer.pivot.x = bgWidth / 2;
    appContainer.pivot.y = bgHeight / 2;

    const scaleX = screenWidth / bgWidth;
    const scaleY = screenHeight / bgHeight;
    const scale = Math.max(scaleX, scaleY);
    appContainer.scale.set(scale);

    const isPortrait = screenHeight > screenWidth;

    activeItems.forEach((item) => {
      item.x = isPortrait ? item.px : item.lx;
      item.y = isPortrait ? item.py : item.ly;
    });

    resizeUI(screenWidth, screenHeight);
  }

  resize();
  startIdleTimer();
  window.addEventListener("resize", resize);
})();
