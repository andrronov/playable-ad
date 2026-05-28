import { Circle, Polygon } from "pixi.js";

export const ITEMS_CONFIG = [
  {
    id: "apple",
    texture: "apple",
    hitArea: new Circle(0, 0, 30),
    lx: 823,
    ly: 481,
    px: 866,
    py: 302,
  },
  {
    id: "book",
    texture: "book",
    hitArea: new Polygon([-66, 1, -76, -94, -6, -44, 84, 31, 79, 56]),
    lx: 582,
    ly: 931,
    px: 988,
    py: 757,
    alpha: 0.8,
  },
  {
    id: "bird",
    texture: "bird",
    hitArea: new Circle(0, 0, 40),
    lx: 800,
    ly: 51.5,
    alpha: 0.65,
  },
  {
    id: "shoe",
    texture: "shoe",
    hitArea: new Polygon([
      -65, -20, -40, -45, 20, -20, 65, -20, 60, 25, -10, 45,
    ]),
    lx: 758,
    ly: 734,
  },
];

export const COVERS_CONFIG = [
  { id: "chair", texture: "chair", lx: 1005.5, ly: 704.5, alpha: 1 },
  { id: "cage", texture: "cage", lx: 604.5, ly: 750.5, alpha: 1 },
  { id: "hat", texture: "hat", lx: 883, ly: 354.5, alpha: 1 },
];
