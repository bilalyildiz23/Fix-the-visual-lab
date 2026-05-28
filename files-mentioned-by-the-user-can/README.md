# Fix the Visual Lab

A small local React game for the workshop "Can a Visual Trick You?"

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL in the browser, usually:

```text
http://localhost:5173
```

## Edit the workshop content

Level titles, repair actions, feedback text, starting scores and score changes are in:

```text
src/levels.ts
```

The visual layouts are in:

```text
src/components/HypeJumpChart.tsx
src/components/BudgetPieFight.tsx
src/components/NotificationWall.tsx
src/components/StoryVisual.tsx
```

## Change scoring

Each level has `baseScores`. Correct choices and repair actions can have a `scoreDelta`.

```ts
baseScores: { clarity: 48, trust: 38, audience: 68, message: 46 }
scoreDelta: { trust: 38, clarity: 8, message: 10 }
```

Scores are capped at 100%.

## Classroom use

For self-guided use, students can go through the cases on their own device or in small groups. Cases can have different steps:

1. Pick a diagnosis in `Spot it`.
2. Choose a headline, audience, message or fair comparison.
3. Try repairs in `Fixes`.

The final screen shows a small lab report with their diagnosis choices. Use that report for discussion after everyone has played.

The local `C:\...` HTML file only opens on the teacher laptop. To let everyone open it, publish the folder as a static site, for example with GitHub Pages or Netlify, or run it on a local network during class.
