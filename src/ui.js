import { Assets, Container, Sprite } from "pixi.js";
import {
  ASSETS_ALIAS,
  TEXT_CONFIG,
  playTitleBannerAnimation,
  playSelectedItemTextAnimation,
  toBlurTransition,
  ctaAnimation,
} from "./config/index.js";

import titleBannerImg from "./assets/ui/title-banner.png";
import selectBannerImg from "./assets/ui/select-banner.png";
import appleTextImg from "./assets/ui/text/apple.png";
import birdTextImg from "./assets/ui/text/bird.png";
import bookTextImg from "./assets/ui/text/book.png";
import shoeTextImg from "./assets/ui/text/shoe.png";
import titleTextImg from "./assets/ui/text/title.png";
import playFreeTextImg from "./assets/ui/text/play-free.png";

import ctaButtonImg from "./assets/cta-button.png";
import logoImg from "./assets/logo.png";
import bgBlurImg from "./assets/bg-blur.jpg";

export function useUI() {
  let titleBanner;
  let selectBannerContainer;
  let selectBanner;
  let isPortrait;
  const uiTexts = {};

  let ctaContainer;
  let overlaySprite;
  let logoWrapper, logoSprite;
  let btnWrapper, btnSprite;

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
        alias: ASSETS_ALIAS.text.playFree,
        src: playFreeTextImg,
      },
      {
        alias: ASSETS_ALIAS.selectBanner,
        src: selectBannerImg,
      },
      {
        alias: ASSETS_ALIAS.ctaButton,
        src: ctaButtonImg,
      },
      {
        alias: ASSETS_ALIAS.logo,
        src: logoImg,
      },
      {
        alias: ASSETS_ALIAS.bgBlur,
        src: bgBlurImg,
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

    playTitleBannerAnimation(titleBanner, isPortrait);

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

    buildCtaScreen(app);
  }

  function buildCtaScreen(app) {
    ctaContainer = new Container();
    ctaContainer.visible = false;
    ctaContainer.alpha = 0;
    app.stage.addChild(ctaContainer);

    overlaySprite = new Sprite(Assets.get(ASSETS_ALIAS.bgBlur));
    overlaySprite.anchor.set(0.5);
    ctaContainer.addChild(overlaySprite);

    logoWrapper = new Container();
    ctaContainer.addChild(logoWrapper);

    logoSprite = new Sprite(Assets.get(ASSETS_ALIAS.logo));
    logoSprite.anchor.set(0.5);
    logoWrapper.addChild(logoSprite);

    btnWrapper = new Container();
    ctaContainer.addChild(btnWrapper);

    btnSprite = new Sprite(Assets.get(ASSETS_ALIAS.ctaButton));
    btnSprite.anchor.set(0.5);

    const btnTextSprite = new Sprite(Assets.get(ASSETS_ALIAS.text.playFree));
    btnTextSprite.anchor.set(0.5);
    btnSprite.addChild(btnTextSprite);

    btnSprite.eventMode = "static";
    btnSprite.cursor = "pointer";
    btnSprite.on("pointerdown", () => {
      console.log("clicked");
    });
    btnWrapper.addChild(btnSprite);
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

    if (ctaContainer) {
      ctaContainer.x = screenWidth / 2;
      ctaContainer.y = screenHeight / 2;

      if (overlaySprite) {
        const bgWidth = overlaySprite.texture.width;
        const bgHeight = overlaySprite.texture.height;
        const scaleX = screenWidth / bgWidth;
        const scaleY = screenHeight / bgHeight;
        overlaySprite.scale.set(Math.max(scaleX, scaleY));
      }

      const baseCtaWidth = 600;
      const ctaScale =
        screenWidth < baseCtaWidth ? screenWidth / baseCtaWidth : 1;

      logoWrapper.scale.set(isPortrait ? ctaScale - 0.275 : ctaScale);
      btnWrapper.scale.set(ctaScale);

      logoWrapper.y = isPortrait ? -150 : -205;
      btnWrapper.y = isPortrait ? 150 : 130;
    }

    titleBanner.scale.set(uiScale);
    selectBannerContainer.scale.set(uiScale);
  }

  function markItemAsFound(itemId) {
    const textSprite = uiTexts[itemId];
    if (!textSprite) return;

    playSelectedItemTextAnimation(textSprite);
  }

  function showCTA() {
    ctaContainer.visible = true;
    toBlurTransition(titleBanner, selectBannerContainer);
    ctaAnimation(ctaContainer, logoSprite, btnSprite);
  }

  return {
    loadUI,
    buildUI,
    resizeUI,
    markItemAsFound,
    showCTA,
  };
}
