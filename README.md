# Գտնված երազ — a small letter for you

A tiny, personal website reached by scanning the QR code in an envelope. It opens on a
starry Armenian night with a vintage cassette recorder. Tap it, the song starts, and you
drift into a handwritten-feeling letter, the two stickers from the envelope, and a little
"pass the kindness on" moment.

Nothing to buy, nothing to sign up for.

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4
- Motion (`motion/react`) for transitions; star twinkle, butterfly wings, reels and
  sticker float are plain CSS animations
- Fonts are self-hosted via Fontsource (Lora, Noto Serif Armenian, Caveat), so there are
  no external requests

## Assets

| File | Used for |
| --- | --- |
| `src/assets/audio/gtnvac-eraz.mp3` | The song (original file, untouched) |
| `src/assets/stickers/gtnvac-eraz.png` | Sticker 1 — Գտնված երազ (original file) |
| `src/assets/stickers/armenian-bmw.webp` | Sticker 2 — The Armenian BMW (original file) |

The files are imported, so Vite fingerprints them (`/assets/name-hash.ext`) and they can
be cached long-term. The BMW file has wide transparent margins. The page frames it with
CSS only and never edits the image itself.

## How the music works

- One `<audio>` element is mounted at the app root and never unmounted, so the song never
  restarts between the entrance and the letter. It loops quietly while you read.
- Playback starts only from the tap on the recorder, which satisfies iOS Safari and
  Android Chrome autoplay rules.
- If playback fails (no connection, blocked), a message appears with **Try again** and
  **Continue without music**. On a very slow connection, after 6 seconds you can go in
  and the song catches up when it loads.
- A small Play/Pause control sits in the bottom-right corner. The Media Session API adds
  lock-screen controls.

## Accessibility

- With `prefers-reduced-motion` on, butterflies stay still, stars stop twinkling, parallax
  is off, and Motion transitions are reduced.
- The recorder is a real `<button>` with an accessible label. The music control uses
  `aria-pressed`. Kindness ideas are announced through a polite live region.
- Ink-on-paper and moonlight-on-navy text both have high contrast. Body text is 17.5px or
  larger on phones.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Deploy

### Vercel
1. Push this repo to GitHub.
2. On vercel.com, choose **Add New → Project** and import the repo.
3. Vercel detects Vite. `vercel.json` already sets `npm run build` → `dist` and long-term
   caching for `/assets/*`. Click **Deploy**.

Or from the CLI: `npx vercel --prod`.

### Netlify
1. On app.netlify.com, choose **Add new site → Import an existing project** and pick the repo.
2. `netlify.toml` already sets build command `npm run build` and publish directory
   `dist`. Click **Deploy**.

Or drag the `dist/` folder onto https://app.netlify.com/drop after running `npm run build`.

### QR code
Point the QR code at the deployed URL, for example `https://your-site.vercel.app`. Keep
the URL short so the code stays easy to scan.

## Credits

Song: «Գիշերվա աստղազարդ նկարում» by Ruben Hakhverdyan, covered by Vahag Rush.
Stickers and idea: just another Armenian 💙
