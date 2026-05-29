# Playable Ad: Find the Hidden Objects

A responsive, single-file interactive playable ad. Built with **PixiJS** for WebGL rendering and **GSAP** for smooth animations.

## 🚀 Key Features & Technical Decisions

- **Single-File Build:** Configured Webpack 5 to inline all scripts, styles, and Base64-encoded assets into a single `index.html` file.
- **Strict Asset Optimization:** Pre-compressed and optimized all graphic assets (PNG/JPEG) to meet ad network limits. The final production build weighs only **1.5 MB**.
- **Fully Responsive (Adaptive Canvas):** The game seamlessly adapts to both Portrait and Landscape orientations. The background uses a "cover" scaling logic, while UI elements and hidden objects dynamically reposition and scale based on the screen's aspect ratio.
- **Idle Timer (Hint System):** Implemented an inactivity tracking system. If the player is idle for 5 seconds (no successful or missed clicks), the first unfound item on the screen highlights and pulsates.
- **Precise Click Areas (Hitboxes):** Used PixiJS geometry (`Circle` and `Polygon`) to create custom `hitArea` boundaries for objects, ensuring transparent pixels don't block clicks or trigger false positives.

## 🛠️ Tech Stack

- **Engine:** PixiJS (v8)
- **Animations:** GSAP (Timeline, Tweens, DelayedCalls)
- **Bundler:** Webpack 5 (with `html-inline-script-webpack-plugin`)
- **Languages:** JavaScript (ES6+), CSS3

## 💻 How to Run Locally

### 1. Install Dependencies

Ensure you have Node.js installed, then run:

```bash
npm install
```

### 2. Development Mode

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at http://localhost:3000 (or another port specified in the console).

### 3. Production Build

To build the production-ready version of the app:

```bash
npm run build
```

The compiled `index.html` will be created in the `/dist` directory. You can open this file directly in any browser without a local server.

## 🎮 Gameplay Flow

- 1. Init: The game starts immediately with a pulsing title.
- 2. Core Loop: The player finds and clicks on hidden objects. Found items trigger a scale-and-spin disappearance animation on the canvas and get crossed out/dimmed in the UI panel.
- 3. Endgame (CTA): Once all 4 items are found, the UI gracefully fades out, the background blurs, and the final Call-To-Action screen (Logo + pulsating "Play Free" button) appears.
