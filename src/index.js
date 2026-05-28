import "./style.css";
import {
  Application,
  Container,
  Sprite,
  Assets,
  Polygon,
  Circle,
} from "pixi.js";

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
  await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x111111,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    resizeTo: window,
  });

  window.__PIXI_APP__ = app;

  document.body.appendChild(app.canvas);

  await Assets.load([
    { alias: "bg", src: bgImg },
    { alias: "apple", src: appleImg },
    { alias: "book", src: bookImg },
    { alias: "bird", src: birdImg },
    { alias: "shoe", src: shoeImg },
    { alias: "chair", src: chairImg },
    { alias: "cage", src: cageImg },
    { alias: "hat", src: hatImg },
  ]);

  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  const bgSprite = new Sprite(Assets.get("bg"));
  worldContainer.addChild(bgSprite);

  const itemsConfig = [
    {
      id: "apple",
      texture: "apple",
      hitArea: new Circle(50, 50, 40),
      lx: 818,
      ly: 252,
    },
    {
      id: "book",
      texture: "book",
      hitArea: new Polygon([5, 5, 20, -50, 100, 20, 195, 75, 75, 150]),
      lx: 867,
      ly: 694,
    },
    {
      id: "bird",
      texture: "bird",
      hitArea: new Circle(50, 50, 40),
      lx: 746,
      ly: 13,
      alpha: 0.65,
    },
    {
      id: "shoe",
      texture: "shoe",
      hitArea: new Polygon([0, 70, 10, -50, 80, 20, 150, 85, 165, 120]),
      lx: 691,
      ly: 677,
    },
  ];
  const coversConfig = [
    { id: "chair", texture: "chair", lx: 877, ly: 588 },
    { id: "cage", texture: "cage", lx: 467, ly: 681 },
    { id: "hat", texture: "hat", lx: 811, ly: 286 },
  ];

  const activeItems = [];

  function placeSprite(item, config, clickable) {
    item.lx = config.lx;
    item.ly = config.ly;
    item.px = config.px ?? config.lx;
    item.py = config.py ?? config.ly;
    item.alpha = config.alpha ?? 0.9;

    if (clickable) {
      item.eventMode = "static";
      item.cursor = "pointer";

      if (config.hitArea) {
        item.hitArea = config.hitArea;
      }
    }

    worldContainer.addChild(item);
  }

  itemsConfig.forEach((config) => {
    const item = new Sprite(Assets.get(config.texture));

    item.on("pointerdown", () => {
      //
    });

    placeSprite(item, config, true);
    activeItems.push(item);
  });

  coversConfig.forEach((config) => {
    const item = new Sprite(Assets.get(config.texture));
    placeSprite(item, config, false);
    activeItems.push(item);
  });

  function resize() {
    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const bgWidth = bgSprite.texture.width;
    const bgHeight = bgSprite.texture.height;

    worldContainer.x = screenWidth / 2;
    worldContainer.y = screenHeight / 2;

    worldContainer.pivot.x = bgWidth / 2;
    worldContainer.pivot.y = bgHeight / 2;

    const scaleX = screenWidth / bgWidth;
    const scaleY = screenHeight / bgHeight;
    const scale = Math.max(scaleX, scaleY);
    worldContainer.scale.set(scale);

    const isPortrait = screenHeight > screenWidth;

    activeItems.forEach((item) => {
      item.x = isPortrait ? item.px : item.lx;
      item.y = isPortrait ? item.py : item.ly;
    });
  }

  resize();
  window.addEventListener("resize", resize);
})();
