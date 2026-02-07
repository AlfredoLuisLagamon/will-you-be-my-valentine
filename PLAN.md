# Plan: "Will You Be My Valentine?" Invite Website

## 1. Overview

A single-page, playful Valentine invite: a card with the question **"Will you be my valentine?"** and two buttons (**Yes** / **No**). Clicking **Yes** shows a success state ("Ohh yeah!" + GIF). The **No** button is intentionally unselectable: one **gimmick** is chosen at random on each page load and applied so that selecting No is impossible or always fails.

---

## 2. Goals

- **Clear UX**: One card, one question, two buttons; success state is obvious.
- **No path to "No"**: Exactly one gimmick active per load; that gimmick makes No impossible to successfully choose.
- **Random gimmick**: On load, pick one gimmick from a list of 6+ so each visit can feel different.
- **Lightweight**: Vanilla HTML/CSS/JS, no build step required (can add later if needed).
- **Maintainable**: Gimmicks implemented as a small set of modules/functions so adding or changing behavior is easy.

---

## 3. Gimmick List (Minimum 6)

Each gimmick is applied only to the **No** button (or its container). One is selected at random per page load.

| # | Gimmick | Short description | Main technique |
|---|--------|--------------------|----------------|
| 1 | **Run away** | No button moves to a new position on hover/click so the cursor never stays on it. | `mouseenter` / `mouseover` on No → set `position: absolute`, compute random safe (x,y) within viewport, apply with CSS `transition`. Keep position in outer scope (not inside handler). |
| 2 | **Fake progress modal** | Click No → modal opens: "Processing your answer..." with a progress bar that stalls before 100% then closes/cancels. | Click No → show modal, start interval that updates progress (e.g. 0→90% over 2–3s), then clear interval, set to 0 or close modal. No actual "No" confirmation. |
| 3 | **Swap places** | When the user hovers (or tries to click) No, the Yes and No buttons swap positions so they might hit Yes by mistake. | On `mouseenter` of No (or click): swap positions (e.g. swap `order`, or swap actual DOM positions / flex order). Optional: swap labels temporarily so it’s extra confusing. |
| 4 | **Shrinking button** | Each hover or click on No makes the button smaller until it’s nearly unclickable; optionally reset after a delay. | On `mouseenter` or `click`: reduce width/height or `transform: scale()`. Clamp minimum size (e.g. 10px). Optionally reset size after 1–2s. |
| 5 | **Countdown reset** | Click No → modal: "Are you sure? 5, 4, 3, 2, 1". When it reaches 1, countdown resets to 5 and repeats. | Modal with countdown; `setInterval` to decrement; at 0 or 1 reset to 5 and never confirm "No". |
| 6 | **Shake / vibrate** | No button shakes or jitters so it’s hard to click accurately. | CSS `@keyframes` shake (translateX) or small random position jitter via JS; apply class or inline animation on `mouseenter` / `click`. Cursor may slip off. |

**Random selection**: On DOM ready, `const gimmick = gimmicks[Math.floor(Math.random() * gimmicks.length)]` and call `gimmick.init(noButton, yesButton, cardContainer)` (or equivalent). No state shared between gimmicks.

---

## 4. Technical Approach

### 4.1 Stack

- **HTML**: One page; semantic structure (e.g. `main`, card, heading, two buttons, success block, modal placeholder).
- **CSS**: Layout (flex/grid), card styling, button styles, modal, progress bar, keyframe animations (shake, optional fade). Use CSS variables for theme (e.g. colors, radii).
- **JavaScript**: Vanilla only. No framework. One entry script that: (1) selects random gimmick, (2) initializes it, (3) wires Yes button to success state.

### 4.2 Run-away button (research-backed)

- Use **JavaScript** (not CSS-only): when the button moves, it leaves the cursor, so `:hover` would drop; JS keeps moving it on each `mouseenter`.
- **Scope**: Store current position (e.g. `left`, `top`) **outside** the event handler so it persists between events.
- **Position**: `position: absolute` on the No button; container `position: relative` with overflow handled so the button stays visible.
- **Random position**: `Math.random() * (max - min) + min` for x and y; constrain to viewport (or card) minus button size so it stays on-screen.
- **Smooth movement**: CSS `transition: left 0.2s, top 0.2s` (or similar) for a short, snappy move.

### 4.3 File structure (minimal and modular)

```
invite-meme/
├── index.html       # Structure: card, question, Yes/No, success block, modal
├── styles.css       # All styles (card, buttons, modal, progress, keyframes)
├── script.js        # App init: pick gimmick, wire Yes, mount gimmick
├── gimmicks.js      # Array of gimmick objects; each has id, name, init(noBtn, yesBtn, card)
├── PLAN.md          # This file
└── TODO.md          # Todo list
```

Optional later: split each gimmick into `gimmicks/run-away.js`, etc., and concatenate or load via modules.

### 4.4 Data flow

- **Yes click**: Hide card (or swap to success view), show "Ohh yeah!" + GIF. No backend.
- **No click/hover**: Handled entirely by the active gimmick (move button, show modal, swap, shrink, countdown, shake). No request; no persistence of "No".
- **Success GIF**: One predefined GIF (e.g. from GIPHY or self-hosted); URL in HTML or JS constant.

### 4.5 Accessibility and ethics

- **Purpose**: Clearly a joke invite; not a form or critical flow. No real "rejection" is stored or sent.
- **Avoid real dark patterns**: No fake system dialogs, no stealing clicks to external links. "No" is just visually/haptically hard or inconclusive.
- **Accessibility**: Keep contrast and focus states where possible; gimmicks may reduce keyboard usability for "No" by design (we can document that).

---

## 5. Success state

- **Trigger**: Click on **Yes**.
- **Content**: Text "Ohh yeah!" + one GIF (meme-style).
- **Implementation**: e.g. second "screen" in the same page (hidden by default) that becomes visible; or replace card content with success block. No routing.

---

## 6. Out of scope (for initial version)

- Backend or analytics.
- Multiple themes or languages.
- Sound (can be added later).
- Confetti or extra animations (optional enhancement).

---

## 7. Order of implementation (high level)

1. **Static page**: HTML + CSS for card, two buttons, success block, modal shell.
2. **Yes flow**: JS to show "Ohh yeah!" + GIF on Yes click.
3. **Gimmick harness**: In `script.js`, define `gimmicks` array and random selection; call `gimmick.init(noBtn, yesBtn, card)`.
4. **Implement gimmicks one by one** in `gimmicks.js`: run-away, fake progress, swap, shrink, countdown, shake.
5. **Test**: Load page multiple times to see different gimmicks; test Yes always works; test No never "succeeds".
6. **Polish**: Responsive layout, safe bounds for run-away, and any copy in the modals.

---

## 8. References

- Run-away button: [Stack Overflow – button runs away from cursor](https://stackoverflow.com/questions/57206591/how-can-i-make-a-button-that-runs-away-from-the-cursor) (variable scope, reading position from element or outer scope).
- Similar projects: ivysone/Will-you-be-my-Valentine, Lirobi/will-you-be-my-valentine (concept and UX only; we keep our own minimal structure and gimmick set).
