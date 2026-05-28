import { ColorMatrixFilter } from "pixi.js";
import gsap from "gsap";

export function playItemAnimation(item) {
  item.eventMode = "none";
  item.zIndex = 1000;

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
