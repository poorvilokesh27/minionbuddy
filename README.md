# Minion Companion

A text-chat companion with mood detection, minion-voice replies, typing
animations, and auto-generated memes. Fully client-side — no API keys,
no backend, no cost.

## Project structure

```
minion-companion/
├── index.html          # page markup + minion SVGs
├── package.json        # npm scripts + Vite dev dependency
├── src/
│   ├── main.js          # wires everything together (event listeners)
│   ├── style.css        # all styling + minion CSS animations
│   ├── sentiment.js      # local mood detection (happy/sad/angry/neutral/question)
│   ├── replies.js         # minion-style reply templates per mood
│   ├── voice.js           # text-to-speech via Web Speech API
│   ├── meme.js             # canvas-based meme generator
│   └── stage.js             # minion animation state machine
└── README.md
```

## How to run (in VS Code)

1. Install [Node.js](https://nodejs.org/) (v18 or later) if you don't have it.
2. Open this folder in VS Code.
3. Open a terminal in VS Code (`` Ctrl+` ``) and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL it prints (usually `http://localhost:5173`) in your browser.

That's it — no API keys, no `.env` file needed.

## Building for deployment (turning it into a real website)

```bash
npm run build
```

This creates a `dist/` folder with the finished static site. You can
upload that folder to any free static host:

- **GitHub Pages** — push `dist/` to a `gh-pages` branch
- **Netlify** — drag-and-drop the `dist/` folder at app.netlify.com/drop
- **Vercel** — `vercel deploy` from inside `dist/`

Once it's hosted at a live URL, you can turn it into an installable
Android APK using [PWABuilder](https://www.pwabuilder.com/) — paste
your live URL and it packages an APK for you.

## How each feature works (for your project report)

| Feature | File | Technique |
|---|---|---|
| Mood detection | `sentiment.js` | Local word-lexicon scoring (positive/negative word lists) — no external NLP API |
| Reply generation | `replies.js` | Template bank keyed by detected mood, randomized with Minionese phrases |
| Typing animation | `stage.js` + CSS in `style.css` | State machine (`idle → typing → paused → sent → celebrate`) driven by `input`/`focus`/`blur` events |
| Voice | `voice.js` | Browser's native `SpeechSynthesis` API, pitch raised to 1.9x for a squeaky minion tone |
| Meme generator | `meme.js` | HTML5 `<canvas>` drawing: mood-based color palette + hand-drawn minion doodle + wrapped caption text, exported as a downloadable PNG |

## Possible upgrades (future scope)

- Swap `generateReply()` in `replies.js` to call an LLM API (OpenAI/Claude/Gemini) for smarter, less repetitive replies
- Swap the lexicon-based `analyzeSentiment()` for a small trained sentiment classifier (adds real ML depth for placements)
- Add a PWA manifest + service worker so it installs as an app icon directly from the browser
