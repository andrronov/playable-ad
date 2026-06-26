import { Circle, Polygon } from "pixi.js";

export const ASSETS_ALIAS = {
  bg: "bg",
  bgBlur: "bg-blur",
  logo: "logo",
  ctaButton: "cta-button.png",
  apple: "apple.png",
  book: "book.png",
  bird: "bird.png",
  shoe: "shoe.png",
  chair: "chair.png",
  cage: "cage.png",
  hat: "hat.png",
  titleBanner: "title-banner.png",
  selectBanner: "select-banner.png",
  text: {
    apple: "apple-text.png",
    book: "book-text.png",
    bird: "bird-text.png",
    shoe: "shoe-text.png",
    title: "title-text.png",
    playFree: "play-free-text.png",
  },
  atlas: {
    gameplay: "gameplay-atlas",
    ui: "ui-atlas",
  },
};

export const ITEMS_CONFIG = [
  {
    id: "apple",
    texture: ASSETS_ALIAS.apple,
    hitArea: new Circle(0, 0, 30),
    lx: 823,
    ly: 481,
  },
  {
    id: "book",
    texture: ASSETS_ALIAS.book,
    hitArea: new Polygon([-56, 0, -56, -74, -1, -34, 54, 31, 69, 46]),
    lx: 559,
    ly: 717,
    px: 968,
    py: 762,
  },
  {
    id: "bird",
    texture: ASSETS_ALIAS.bird,
    hitArea: new Circle(0, 0, 40),
    lx: 1335,
    ly: 423,
    px: 973,
    py: 302,
    alpha: 0.8,
  },
  {
    id: "shoe",
    texture: ASSETS_ALIAS.shoe,
    hitArea: new Polygon([
      -65, -20, -40, -45, 20, -20, 65, -20, 60, 25, -10, 45,
    ]),
    lx: 770,
    ly: 744,
  },
];

export const COVERS_CONFIG = [
  { id: "chair", texture: ASSETS_ALIAS.chair, lx: 1005.5, ly: 704.5, alpha: 1 },
  { id: "cage", texture: ASSETS_ALIAS.cage, lx: 604.5, ly: 750.5, alpha: 1 },
  { id: "hat", texture: ASSETS_ALIAS.hat, lx: 883, ly: 354.5, alpha: 1 },
];

export const TEXT_CONFIG = [
  { id: "apple", texture: ASSETS_ALIAS.text.apple, x: -400, y: -50 },
  { id: "book", texture: ASSETS_ALIAS.text.book, x: -125, y: -50 },
  { id: "bird", texture: ASSETS_ALIAS.text.bird, x: 125, y: -50 },
  { id: "shoe", texture: ASSETS_ALIAS.text.shoe, x: 400, y: -50 },
];

export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEV = process.env.NODE_ENV === "development";
