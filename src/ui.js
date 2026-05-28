import { Assets, Container, Sprite } from "pixi.js";
import gsap from "gsap";
import { ASSETS_ALIAS, TEXT_CONFIG } from "./config/index.js";

import titleBannerImg from "./assets/ui/title-banner.png";
import selectBannerImg from "./assets/ui/select-banner.png";
import appleTextImg from "./assets/ui/text/apple.png";
import birdTextImg from "./assets/ui/text/bird.png";
import bookTextImg from "./assets/ui/text/book.png";
import shoeTextImg from "./assets/ui/text/shoe.png";
import titleTextImg from "./assets/ui/text/title.png";

export function useUI() {
  let titleBanner;
  let selectBannerContainer;
  let selectBanner;
  let isPortrait;
  const uiTexts = {};

  async function loadUI() {
    await Assets.load([
      {
        alias: ASSETS_ALIAS.titleBanner,
        src: titleBannerImg,
      },
      {
        alias: ASSETS_ALIAS.text.apple,
        src: appleTextImg,
      },
      {
        alias: ASSETS_ALIAS.text.bird,
        src: birdTextImg,
      },
      {
        alias: ASSETS_ALIAS.text.book,
        src: bookTextImg,
      },
      {
        alias: ASSETS_ALIAS.text.shoe,
        src: shoeTextImg,
      },
      {
        alias: ASSETS_ALIAS.text.title,
        src: titleTextImg,
      },
      {
        alias: ASSETS_ALIAS.selectBanner,
        src: selectBannerImg,
      },
    ]);
  }

  function buildUI(app) {
    const uiContainer = new Container();
    app.stage.addChild(uiContainer);

    titleBanner = new Sprite(Assets.get(ASSETS_ALIAS.titleBanner));
    titleBanner.anchor.set(0.5, 0);
    uiContainer.addChild(titleBanner);

    const titleText = new Sprite(Assets.get(ASSETS_ALIAS.text.title));
    titleBanner.addChild(titleText);
    titleText.anchor.set(0.5);
    titleText.x = 0;
    titleText.y = titleBanner.height / 1.75;

    isPortrait = app.screen.height > app.screen.width;

    gsap.to(titleBanner.scale, {
      x: isPortrait ? titleBanner.scale.x - 0.25 : titleBanner.scale.x * 1.1,
      y: isPortrait ? titleBanner.scale.y - 0.25 : titleBanner.scale.y * 1.1,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    selectBannerContainer = new Container();
    app.stage.addChild(selectBannerContainer);
    selectBanner = new Sprite(Assets.get(ASSETS_ALIAS.selectBanner));
    selectBanner.anchor.set(0.5, 1);
    selectBannerContainer.addChild(selectBanner);

    TEXT_CONFIG.forEach((config) => {
      const textSprite = new Sprite(Assets.get(config.texture));
      selectBannerContainer.addChild(textSprite);
      textSprite.anchor.set(0.5);
      textSprite.x = config.x;
      textSprite.y = config.y;

      uiTexts[config.id] = textSprite;
    });
  }

  function resizeUI(screenWidth, screenHeight) {
    titleBanner.x = screenWidth / 2;
    titleBanner.y = 20;

    const baseUiWidth = 500;
    const uiScale = screenWidth < baseUiWidth ? screenWidth / baseUiWidth : 1;

    isPortrait = screenHeight > screenWidth;

    const bgWidth = selectBanner.texture.width;

    const maxBottomWidth = screenWidth * 0.95;
    const bottomScale = maxBottomWidth < bgWidth ? maxBottomWidth / bgWidth : 1;

    selectBannerContainer.scale.set(bottomScale);
    selectBannerContainer.x = screenWidth / 2;
    selectBannerContainer.y = screenHeight;

    if (isPortrait) {
      selectBanner.scale.y = 1.45;

      TEXT_CONFIG.forEach((config, index) => {
        const textSprite = uiTexts[config.id];

        const col = index % 2;
        const row = Math.floor(index / 2);

        textSprite.x = col === 0 ? -120 : 120;
        textSprite.y = row === 0 ? -110 : -40;
      });
    } else {
      selectBanner.scale.y = 1;

      TEXT_CONFIG.forEach((config) => {
        const textSprite = uiTexts[config.id];
        textSprite.scale.set(1);
        textSprite.x = config.x;
        textSprite.y = config.y;
      });
    }

    titleBanner.scale.set(uiScale);
    selectBannerContainer.scale.set(uiScale);
  }

  return {
    loadUI,
    buildUI,
    resizeUI,
  };
}
