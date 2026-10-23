<div align="center">

# 🏝️ Build a Lighthouse — 3D Isometric CSS Game

**An extraordinary pure CSS 3D isometric time-management and building puzzle game.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Pure CSS Logic](https://img.shields.io/badge/Logic-Pure_CSS_State_Machine-ff69b4.svg)](#-under-the-hood-how-it-works)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)](#-getting-started)

<p align="center">
  <a href="#-about-the-game">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-how-to-play">How to Play</a> •
  <a href="#-under-the-hood-how-it-works">Under the Hood</a> •
  <a href="#-controls--shortcuts">Controls</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-license">License</a>
</p>

---

</div>

## 📖 About The Game

**Build a Lighthouse** (House Build Game) is an interactive, browser-based 3D isometric puzzle game. 

You find yourself on a tranquil, low-poly island surrounded by open seas. But peace won't last long—as the sun charts its descent toward the horizon, darkness approaches. Without a beacon to illuminate the rocky coastline, incoming trade ships will wreck upon the shoals!

Your mission: **Assemble the lighthouse before nightfall arrives.**

Every isometric building block, shadow, day-to-night lighting shift, and win/loss condition is powered by an astonishing **pure CSS state machine** that pushes browser capabilities to their absolute limits.

---

## ✨ Key Features

- **🎨 Pure CSS 3D Isometric Engine**: True depth, volume, isometric projection, and dynamic shadow rendering built with zero canvas, zero WebGL, and zero 3D libraries.
- **🌅 Real-Time Day / Night Cycle**: The sun crosses the sky in real-time, casting lengthening shadows and shifting ambient environmental hues from warm daylight to deep sunset and dangerous dusk.
- **🕹️ State Machine via CSS Combinators**: The entire gameplay rule set, tile validation, and win/lose triggers run through radio button groups and general sibling selectors (`~`).
- **💡 Working Lighthouse Beam**: Completing the correct tower structure triggers an animated 360° rotating spotlight with lens flare and surface light reflections.
- **⚙️ Graphics Fidelity Switcher**:
  - **Very Pretty**: Enhanced post-processing, soft lighting, bloom, and reflections.
  - **Quite Pretty**: Optimized performance mode for lower-powered devices.
- **🔊 Procedural Sound Effects**: Native Web Audio API procedural synthesis that generates gentle ambient ocean waves, tactile block placement snaps, and a victory fanfare with zero external audio assets.
- **⚡ Lightweight & Instant Load**: 100% dependency-free vanilla web architecture.

---

## 🎮 How to Play

### 🎯 Objective
Construct the central lighthouse tower before sunset completes. If night falls before the beacon shines, a shipwreck occurs and it's **Game Over**!

### 🏗️ Building Rules
1. **Explore the Grid**: The island features an isometric 4×4 building grid.
2. **Select Structures**: Click tiles to cycle between grassy foundations, residential houses, and utility sheds.
3. **The Blueprint**: The lighthouse requires a precise structural alignment stacked along the central island axis:
   - Combine the right sequence of sheds and houses in the vertical column.
   - Balance the island's landscape before time expires.
4. **Victory**: When the final tier is correctly positioned, the lighthouse activates, firing a rotating beacon across the sea to guide the sailors safely home!

---

## 🔬 Under the Hood: How It Works

This project is a showcase of what CSS can achieve without requiring JavaScript execution loops for game mechanics:

### 1. The Checkbox / Radio State Machine
All game states are tracked through hidden HTML radio inputs:
```html
<input type="radio" name="r23" id="cb23" class="hs house row4 col1" />
<input type="radio" name="r23" id="cb23s" class="hs shed row4 col1" />
<input type="radio" name="r23" id="ncb23" class="row4 col1" />
```
The game engine leverages the CSS General Sibling Combinator (`~`) to match complex relational patterns:
```css
/* Activate Lighthouse Beam when exact column combination is satisfied */
.hs.house.row4.col2:checked ~ 
.hs.shed.row3.col2:checked ~ 
.hs.house.row2.col2:checked ~ 
.hs.shed.row1.col2:checked ~ div.lh light {
  display: block;
  animation: lighthouseBeam 6s linear infinite;
}
```

### 2. 3D Isometric Projection
Using CSS 3D transforms (`rotateX`, `rotateZ`, and `translate3d`), flat 2D HTML elements are projected into an isometric playing field with authentic depth sorting and face shading.

### 3. Dynamic Atmospheric Lighting
CSS keyframe animations progressively adjust the `filter: hue-rotate()` and ambient color overlays from daylight blues to fiery sunset reds and twilight indigos.

---

## ⌨️ Controls & Shortcuts

| Action | Control | Description |
| :--- | :--- | :--- |
| **Build / Cycle Tile** | <kbd>Left Click</kbd> / <kbd>Tap</kbd> | Place or change structure on an island tile |
| **Restart Game** | <kbd>R</kbd> | Instantly reload the game and restart the timer |
| **Mute / Unmute Audio** | <kbd>M</kbd> | Toggle ocean soundscape & building sound effects |
| **Toggle Graphics** | In-Game Menu | Switch between *Very Pretty* and *Quite Pretty* |

---

## 🚀 Getting Started

No compilation, bundler, or package installation required!

### Method 1: Direct File Launch
1. Clone the repository:
   ```bash
   git clone https://github.com/pabitralenka07/House_build-game.git
   cd House_build-game
   ```
2. Open `index.html` directly in any modern browser:
   - **macOS**: `open index.html`
   - **Linux**: `xdg-open index.html`
   - **Windows**: `start index.html`

### Method 2: Local HTTP Server (Recommended)
Running through a local web server ensures optimal audio and font rendering:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js npx
npx serve .
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 Project Structure

```text
House_build-game/
├── index.html        # Game layout, isometric tiles & CSS state inputs
├── style.css         # Complete CSS 3D engine, animations & game logic
├── script.js         # Procedural Web Audio API soundscape & shortcuts
├── LICENSE           # MIT License
└── README.md         # Project documentation & gameplay guide
```

---

## 🌐 Browser Compatibility

| Browser | Support | Notes |
| :--- | :---: | :--- |
| **Google Chrome** | ✅ 100% | Full 3D acceleration and Web Audio support |
| **Mozilla Firefox** | ✅ 100% | Full support for 3D transforms and keyframes |
| **Apple Safari** | ✅ 100% | Hardware-accelerated CSS rendering |
| **Microsoft Edge** | ✅ 100% | Chromium engine optimal performance |

---

## 🤝 Contributing

Contributions, bug reports, and creative enhancements are always welcome!

1. Fork the Project (`https://github.com/pabitralenka07/House_build-game/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Crafted with ❤️ by **[Pabitra Lenka](https://github.com/pabitralenka07)**

⭐ If you enjoyed this CSS game, please consider giving the repo a star!

</div>
