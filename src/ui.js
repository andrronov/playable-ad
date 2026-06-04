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
  let titleWrapper, titleBanner;
  let selectBannerContainer;
  let selectBanner;
  let isPortrait;
  const uiTexts = {};

  let ctaContainer;
  let overlaySprite;
  let logoWrapper, logoSprite;
  let btnWrapper, btnSprite;

  function initSprite(alias, container = undefined, anchor = [0.5]) {
    const sprite = new Sprite(Assets.get(alias));
    sprite.anchor.set(...anchor);

    if (container) {
      container.addChild(sprite);
    }

    return sprite;
  }
  function initContainer(parent) {
    const container = new Container();
    parent.addChild(container);

    return container;
  }

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
    const uiContainer = initContainer(app.stage);
    isPortrait = app.screen.height > app.screen.width;

    titleWrapper = initContainer(uiContainer);

    titleBanner = initSprite(ASSETS_ALIAS.titleBanner, titleWrapper, [0.5, 0]);

    const titleText = initSprite(ASSETS_ALIAS.text.title, titleBanner);
    titleText.x = 0;
    titleText.y = titleBanner.height / 1.75;

    playTitleBannerAnimation(titleBanner);

    selectBannerContainer = initContainer(app.stage);
    selectBanner = initSprite(
      ASSETS_ALIAS.selectBanner,
      selectBannerContainer,
      [0.5, 1],
    );

    TEXT_CONFIG.forEach((config) => {
      const textSprite = initSprite(config.texture, selectBannerContainer);
      textSprite.x = config.x;
      textSprite.y = config.y;

      uiTexts[config.id] = textSprite;
    });

    buildCtaScreen(app);
  }

  function buildCtaScreen(app) {
    ctaContainer = initContainer(app.stage);
    ctaContainer.visible = false;
    ctaContainer.alpha = 0;

    overlaySprite = initSprite(ASSETS_ALIAS.bgBlur, ctaContainer);
    logoWrapper = initContainer(ctaContainer);
    logoSprite = initSprite(ASSETS_ALIAS.logo, logoWrapper);
    btnWrapper = initContainer(ctaContainer);
    btnSprite = initSprite(ASSETS_ALIAS.ctaButton, btnWrapper);
    initSprite(ASSETS_ALIAS.text.playFree, btnSprite);

    btnSprite.eventMode = "static";
    btnSprite.cursor = "pointer";
    btnSprite.on("pointerdown", () => {
      console.log("clicked");
    });
  }

  function resizeUI(screenWidth, screenHeight) {
    isPortrait = screenHeight > screenWidth;

    titleWrapper.x = screenWidth / 2;
    titleWrapper.y = Math.max(15, screenHeight * 0.02);

    const titleWidth = titleBanner.texture.width;
    const titleHeight = titleBanner.texture.height;

    const maxTitleWidth = screenWidth * 0.9;
    const maxTitleHeight = screenHeight * 0.18;

    const scaleTitleX = maxTitleWidth / titleWidth;
    const scaleTitleY = maxTitleHeight / titleHeight;

    const finalTitleScale = Math.min(scaleTitleX, scaleTitleY, 1.2);
    titleWrapper.scale.set(finalTitleScale);

    const bgWidth = selectBanner.texture.width;
    const bgHeight = selectBanner.texture.height;

    selectBannerContainer.x = screenWidth / 2;
    selectBannerContainer.y = screenHeight;

    if (isPortrait) {
      selectBanner.scale.y = 2.5;
      const actualBgHeight = bgHeight * 1.6;

      const maxBottomWidth = screenWidth * 0.95;
      const maxBottomHeight = screenHeight * 0.22;

      const scaleBottomX = maxBottomWidth / bgWidth;
      const scaleBottomY = maxBottomHeight / actualBgHeight;

      const finalBottomScale = Math.min(scaleBottomX, scaleBottomY, 0.95);
      selectBannerContainer.scale.set(finalBottomScale);

      TEXT_CONFIG.forEach((config, index) => {
        const textSprite = uiTexts[config.id];

        textSprite.scale.set(2);

        const col = index % 2;
        const row = Math.floor(index / 2);

        textSprite.x = col === 0 ? -(bgWidth * 0.25) : bgWidth * 0.25;
        textSprite.y =
          row === 0 ? -(actualBgHeight * 0.825) : -(actualBgHeight * 0.3);
      });
    } else {
      selectBanner.scale.y = 1;

      const maxBottomWidth = screenWidth * 0.95;
      const maxBottomHeight = screenHeight * 0.18;

      const scaleBottomX = maxBottomWidth / bgWidth;
      const scaleBottomY = maxBottomHeight / bgHeight;

      const finalBottomScale = Math.min(scaleBottomX, scaleBottomY - 0.1, 1);
      selectBannerContainer.scale.set(finalBottomScale);

      const widthOffsets = [-0.3, -0.1, 0.1, 0.3];

      TEXT_CONFIG.forEach((config, index) => {
        const textSprite = uiTexts[config.id];
        textSprite.scale.set(1);

        textSprite.x = bgWidth * widthOffsets[index];
        textSprite.y = -(bgHeight * 0.375);
      });
    }

    if (ctaContainer) {
      ctaContainer.x = screenWidth / 2;
      ctaContainer.y = screenHeight / 2;

      if (overlaySprite) {
        const bgWidthCTA = overlaySprite.texture.width;
        const bgHeightCTA = overlaySprite.texture.height;
        const scaleX = screenWidth / bgWidthCTA;
        const scaleY = screenHeight / bgHeightCTA;
        overlaySprite.scale.set(Math.max(scaleX, scaleY));
      }

      const maxLogoWidth = screenWidth * 0.95;
      const maxLogoHeight = screenHeight * (isPortrait ? 0.4 : 0.5);

      const logoScaleX = maxLogoWidth / logoSprite.texture.width;
      const logoScaleY = maxLogoHeight / logoSprite.texture.height;

      const finalLogoScale = Math.min(logoScaleX, logoScaleY, 1.25);
      logoWrapper.scale.set(finalLogoScale);

      const maxBtnWidth = screenWidth * (isPortrait ? 0.65 : 0.75);
      const maxBtnHeight = screenHeight * 0.15;

      const btnScaleX = maxBtnWidth / btnSprite.texture.width;
      const btnScaleY = maxBtnHeight / btnSprite.texture.height;

      const finalBtnScale = Math.min(btnScaleX, btnScaleY, 1);
      btnWrapper.scale.set(finalBtnScale);

      logoWrapper.y = -(screenHeight * 0.2);
      btnWrapper.y = screenHeight * 0.2;
    }
  }

  function markItemAsFound(itemId) {
    const textSprite = uiTexts[itemId];
    if (!textSprite) return;

    playSelectedItemTextAnimation(textSprite);
  }

  function showCTA() {
    ctaContainer.visible = true;
    toBlurTransition(titleWrapper, selectBannerContainer);
    ctaAnimation(ctaContainer, logoSprite, btnSprite);
  }

  const getSelectBannerContainer = () => selectBannerContainer;

  return {
    loadUI,
    buildUI,
    resizeUI,
    markItemAsFound,
    showCTA,
    getSelectBannerContainer,
  };
}
