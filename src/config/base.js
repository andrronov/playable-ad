import { Circle, Polygon } from "pixi.js";

export const ASSETS_ALIAS = {
  bg: "bg",
  bgBlur: "bg-blur",
  logo: "logo",
  ctaButton: "cta-button",
  apple: "apple",
  book: "book",
  bird: "bird",
  shoe: "shoe",
  chair: "chair",
  cage: "cage",
  hat: "hat",
  titleBanner: "title-banner",
  selectBanner: "select-banner",
  text: {
    apple: "apple-text",
    book: "book-text",
    bird: "bird-text",
    shoe: "shoe-text",
    title: "title-text",
    playFree: "play-free-text",
  },
};

export const ITEMS_CONFIG = [
  {
    id: "apple",
    texture: ASSETS_ALIAS.apple,
    hitArea: new Circle(0, 0, 30),
    lx: 823,
    ly: 481,
    px: 866,
    py: 302,
  },
  {
    id: "book",
    texture: ASSETS_ALIAS.book,
    hitArea: new Polygon([-66, 1, -76, -94, -6, -44, 84, 31, 79, 56]),
    lx: 582,
    ly: 931,
    px: 988,
    py: 757,
    alpha: 0.8,
  },
  {
    id: "bird",
    texture: ASSETS_ALIAS.bird,
    hitArea: new Circle(0, 0, 40),
    lx: 1495,
    ly: 185,
    px: 768,
    py: 39.5,
    alpha: 0.65,
  },
  {
    id: "shoe",
    texture: ASSETS_ALIAS.shoe,
    hitArea: new Polygon([
      -65, -20, -40, -45, 20, -20, 65, -20, 60, 25, -10, 45,
    ]),
    lx: 758,
    ly: 734,
  },
];

export const COVERS_CONFIG = [
  { id: "chair", texture: ASSETS_ALIAS.chair, lx: 1005.5, ly: 704.5, alpha: 1 },
  { id: "cage", texture: ASSETS_ALIAS.cage, lx: 604.5, ly: 750.5, alpha: 1 },
  { id: "hat", texture: ASSETS_ALIAS.hat, lx: 883, ly: 354.5, alpha: 1 },
];

export const TEXT_CONFIG = [
  { id: "apple", texture: ASSETS_ALIAS.text.apple, x: -275, y: -50 },
  { id: "book", texture: ASSETS_ALIAS.text.book, x: -85, y: -50 },
  { id: "bird", texture: ASSETS_ALIAS.text.bird, x: 85, y: -50 },
  { id: "shoe", texture: ASSETS_ALIAS.text.shoe, x: 275, y: -50 },
];
