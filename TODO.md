# Todo: "Will You Be My Valentine?" Invite

## Phase 1: Static page and Yes flow

- [ ] **1.1** Create `index.html`
  - [ ] Semantic structure: `main`, card container, heading "Will you be my valentine?", two buttons (Yes, No)
  - [ ] Success block (hidden by default): "Ohh yeah!" + placeholder for GIF
  - [ ] Modal container (hidden): for progress bar and countdown gimmicks
  - [ ] Link `styles.css` and `script.js`
- [ ] **1.2** Create `styles.css`
  - [ ] Layout: center card on page (flex/grid)
  - [ ] Card: background, padding, border-radius, shadow
  - [ ] Buttons: distinct styles for Yes vs No; No button suitable for absolute positioning when needed
  - [ ] Success block: layout for text + GIF
  - [ ] Modal: overlay, content box, progress bar (empty/fill), countdown text
  - [ ] CSS variables for colors/fonts (optional)
  - [ ] Shake keyframes for gimmick #6
- [ ] **1.3** Wire Yes button in `script.js`
  - [ ] On Yes click: hide card (or switch view), show success block with "Ohh yeah!" and GIF
  - [ ] Choose one GIF (e.g. GIPHY embed or static URL) and add to HTML/JS

## Phase 2: Gimmick harness

- [ ] **2.1** Create `gimmicks.js`
  - [ ] Define `gimmicks` array: each item `{ id, name, init(noButton, yesButton, card) }`
  - [ ] Stub all 6 gimmicks so `init` runs without errors (e.g. no-op or `console.log`)
- [ ] **2.2** In `script.js`
  - [ ] On DOM ready: get references to No button, Yes button, card (or container)
  - [ ] Select random gimmick: `gimmicks[Math.floor(Math.random() * gimmicks.length)]`
  - [ ] Call `gimmick.init(noBtn, yesBtn, card)`
  - [ ] Ensure Yes button still works (not overridden by gimmick)

## Phase 3: Implement each gimmick

- [ ] **3.1** Gimmick 1 – Run away
  - [ ] On `mouseenter` (and optionally `click`) on No: compute random (x,y) within safe bounds (viewport/card minus button size)
  - [ ] Store position in outer scope or read from element; set `noBtn.style.left`, `noBtn.style.top`; ensure No has `position: absolute` and container `position: relative`
  - [ ] Add short CSS transition on left/top for smooth move
- [ ] **3.2** Gimmick 2 – Fake progress modal
  - [ ] On No click: show modal with text "Processing your answer..." and progress bar
  - [ ] Start interval: increase progress (e.g. 0→90%) over 2–3s, then stop and close modal (or reset progress); never set 100% or confirm No
- [ ] **3.3** Gimmick 3 – Swap places
  - [ ] On `mouseenter` (or click) on No: swap positions of Yes and No (e.g. swap order in DOM or flex order / grid column)
  - [ ] Optional: swap button text temporarily so "No" appears where "Yes" was
- [ ] **3.4** Gimmick 4 – Shrinking button
  - [ ] On `mouseenter` or `click` on No: reduce size (width/height or `transform: scale(...)`) with a minimum (e.g. 10px or scale 0.1)
  - [ ] Optional: reset size after timeout so it doesn’t stay tiny forever (still never confirm No)
- [ ] **3.5** Gimmick 5 – Countdown reset
  - [ ] On No click: show modal "Are you sure? 5" then 4, 3, 2, 1 via interval
  - [ ] When count hits 0 or 1: reset to 5 and repeat (or close modal and reset); never confirm No
- [ ] **3.6** Gimmick 6 – Shake / vibrate
  - [ ] On `mouseenter` or `click` on No: add class that applies CSS shake animation (or apply small random translate in JS)
  - [ ] Ensure button stays in layout but is hard to click (cursor slips off)

## Phase 4: Integration and polish

- [ ] **4.1** Ensure only one gimmick runs: no duplicate listeners; gimmick `init` only attaches its own listeners
- [ ] **4.2** Safe bounds: run-away and any position-based gimmicks respect viewport/card and don’t push No off-screen permanently
- [ ] **4.3** Modal reuse: same modal DOM for progress and countdown; show/hide and swap content in JS
- [ ] **4.4** Responsive: test card and buttons on small viewport; run-away bounds use innerWidth/innerHeight
- [ ] **4.5** Final GIF: replace placeholder with chosen meme GIF (e.g. GIPHY link or asset)

## Phase 5: Verify and document

- [ ] **5.1** Manual test: reload page multiple times; confirm different gimmicks appear (or shuffle and test each)
- [ ] **5.2** Confirm Yes always shows success; No never completes a real "No" path
- [ ] **5.3** Optional: add 1–2 lines in README on how to add a new gimmick (implement object in `gimmicks.js`, add to array)

---

## Checklist summary

| Phase | Description |
|-------|-------------|
| 1 | Static page + Yes flow |
| 2 | Gimmick harness + random pick |
| 3 | All 6 gimmicks implemented |
| 4 | Integration and polish |
| 5 | Test and document |
