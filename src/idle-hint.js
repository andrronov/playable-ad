import { ColorMatrixFilter } from "pixi.js";
import gsap from "gsap";
import { ITEMS_CONFIG } from "./config/index.js";

export function useIdleHint() {
  let unfoundItems = ITEMS_CONFIG.map((config) => config.id);
  const itemSprites = {};
  let idleTimer = null;
  let hintTween = null;

  function resetHintState() {
    if (hintTween) {
      hintTween.kill();
      hintTween = null;
    }
    unfoundItems.forEach((id) => {
      const sprite = itemSprites[id];
      if (sprite) {
        sprite.scale.set(1);
        sprite.filters = null;
      }
    });
  }

  function removeItem(id) {
    const index = unfoundItems.indexOf(id);
    if (index !== -1) {
      unfoundItems.splice(index, 1);
    }
  }

  function startIdleTimer() {
    resetHintState();
    if (idleTimer) idleTimer.kill();

    if (unfoundItems.length === 0) return;

    idleTimer = gsap.delayedCall(5, () => {
      showHint();
    });
  }

  function showHint() {
    const targetId = unfoundItems[0];
    const targetSprite = itemSprites[targetId];

    if (!targetSprite) return;

    const glowFilter = new ColorMatrixFilter();
    glowFilter.brightness(1.5, false);
    targetSprite.filters = [glowFilter];

    hintTween = gsap.to(targetSprite.scale, {
      x: 1.15,
      y: 1.15,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  return {
    startIdleTimer,
    resetHintState,
    showHint,
    itemSprites,
    removeItem,
    unfoundItems,
  };
}
