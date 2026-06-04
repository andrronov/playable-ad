import { ColorMatrixFilter, Graphics } from "pixi.js";
import gsap from "gsap";

export function playItemAnimation(item) {
  item.eventMode = "none";
  item.zIndex = 1000;

  createParticles(item);

  const colorFilter = new ColorMatrixFilter();
  colorFilter.brightness(1.5, false);
  item.filters = [colorFilter];

  const tl = gsap.timeline({
    onComplete: () => {
      item.visible = false;
    },
  });

  const startScaleX = item.scale.x;
  const startScaleY = item.scale.y;

  tl.to(item.scale, {
    x: startScaleX * 1.3,
    y: startScaleY * 1.3,
    duration: 0.2,
    ease: "power2.out",
  })
    .to(
      item,
      {
        rotation: Math.PI * 4,
        alpha: 0,
        duration: 0.6,
        ease: "power2.in",
      },
      "+=0.1",
    )
    .to(
      item.scale,
      {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "back.in(1.5)",
      },
      "<",
    );
}

function createParticles(item) {
  const parent = item.parent;
  if (!parent) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const p = new Graphics();

    p.circle(0, 0, 6).fill(0xffcc00);

    p.x = item.x;
    p.y = item.y;
    parent.addChild(p);

    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const distance = 80 + Math.random() * 50;

    gsap.to(p, {
      x: item.x + Math.cos(angle) * distance,
      y: item.y + Math.sin(angle) * distance,
      alpha: 0,
      scaleX: 0.1,
      scaleY: 0.1,
      duration: 0.65 + Math.random() * 0.3,
      ease: "power2.out",
      onComplete: () => {
        p.destroy();
      },
    });
  }
}

export function playTitleBannerAnimation(titleBanner) {
  titleBanner.scale.set(1);

  gsap.to(titleBanner.scale, {
    x: 1.075,
    y: 1.075,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
}

export function playSelectedItemTextAnimation(textSprite) {
  const colorFilter = new ColorMatrixFilter();
  colorFilter.brightness(2, false);
  textSprite.filters = [colorFilter];

  const tl = gsap.timeline();

  const currentScaleX = textSprite.scale.x;
  const currentScaleY = textSprite.scale.y;

  tl.to(textSprite.scale, {
    x: currentScaleX * 1.3,
    y: currentScaleY * 1.3,
    duration: 0.2,
    ease: "power2.out",
  })
    .to(
      textSprite.scale,
      {
        x: currentScaleX,
        y: currentScaleY,
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.1",
    )
    .to(
      textSprite,
      {
        alpha: 0.4,
        duration: 0.3,
      },
      "<",
    )
    .call(() => {
      textSprite.filters = null;
    });
}

export function toBlurTransition(titleBanner, selectBannerContainer) {
  gsap.to([titleBanner, selectBannerContainer], {
    alpha: 0,
    duration: 0.5,
    onComplete: () => {
      titleBanner.visible = false;
      selectBannerContainer.visible = false;
    },
  });
}

export function ctaAnimation(ctaContainer, logoSprite, btnSprite) {
  gsap.to(ctaContainer, {
    alpha: 1,
    duration: 0.8,
    onComplete: () => {
      gsap.to(logoSprite.scale, {
        x: 1.05,
        y: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(btnSprite.scale, {
        x: 1.1,
        y: 1.1,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    },
  });
}
