# Verification report

## Findings

### MC-102

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium, inspected the h1 and read its computed styles and geometry; took a screenshot at /tmp/mc102/s.png.
- **Expected result:** The heading keeps the same font, color and horizontal centering above the calculator. Only the three trailing periods are new.
- **Actual result:** h1.title text is 'Groovy...'. Font is Fredoka, 'Baloo 2', Comfortaa, 'Trebuchet MS', sans-serif. Color is rgb(225,173,1), size 64px, text-align center. Heading center x=640 matches the viewport center (640) and its parent's center. The heading bottom (174.5) is above the first calculator button top (292.5). The styling is the decorative font, color and centering described in the baseline, and only the trailing periods are new.
- **Defects:** None

### MC-103

- **Action:** In Playwright at http://127.0.0.1:5173, clicked buttons 7, *, 6, = and read the display; then cleared with C, typed 12+3 on the keyboard and pressed Enter, read the display and heading.
- **Expected result:** The results are 42 and 15, and the heading still shows "Groovy..." unchanged.
- **Actual result:** Display showed 42 after 7*6=, then 15 after typing 12+3 and Enter. The h1 heading read "Groovy..." throughout.
- **Defects:** None

### MC-200

- **Action:** Loaded http://127.0.0.1:5173 in headless Playwright and read the h1's text and computed styles and bounding box; checked git diff of src/Calculator.jsx for the heading change. Did not take a screenshot or compare against a rendered before-image.
- **Expected result:** Heading reads "Groovy..." with the same font, color and centering as before; only the three trailing periods are new, with no space before them; still a visible h1 above the calculator.
- **Actual result:** h1.title text is exactly "Groovy..." (no space). Computed font-family Fredoka, "Baloo 2", Comfortaa, "Trebuchet MS", sans-serif; color rgb(225,173,1); font-size 64px; text-align center; display block; visibility visible. Box x=503, width=274, so its center is 640, which is half of the 1280px viewport width. The diff changes only the text, from <h1 className="title">Groovy</h1> to <h1 className="title">Groovy...</h1>. The diff has no style or class changes in Calculator.jsx.
- **Defects:** None

### MC-201

- **Action:** Via Playwright against http://127.0.0.1:5173: clicked 7, +, 5, = and read display; pressed Escape (clear) then typed keyboard 9, *, 3, Enter and read display; clicked C key and read display.
- **Expected result:** Display shows 12, then 27, and clearing resets it.
- **Actual result:** Display read 0 initially, 12 after 7+5=, 27 after keyboard 9*3 Enter, and 0 after clicking C.
- **Defects:** None

### MC-402

- **Action:** Drove http://127.0.0.1:5173 with Playwright (script .uncle/tests/mc402.mjs): clicked 1,2,+,7,= with mouse; clicked C; typed 9*6 then Enter on keyboard; pressed Escape; typed 12+7= on keyboard; clicked C.
- **Expected result:** Results are 19 and 54, keyboard input works, clear resets display; heading change does not affect calculator layout or behavior.
- **Actual result:** Mouse 12+7= showed 19; C reset to 0; keyboard 9*6 Enter showed 54; Escape reset to 0; keyboard 12+7= showed 19; C reset to 0. Heading renders 'Groovy...' and calculator renders normally (360x429 box at x=460,y=190.5) with all keys functional.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-102 | YES | PASS | Computed style and bounding-box output from the Playwright script; screenshot /tmp/mc102/s.png. I did not compare against a pre-change render, only against the baseline description. |
| MC-103 | YES | PASS | Script output: A 42, B 15, H ['Groovy...']. Screenshots /tmp/mc/a.png and /tmp/mc/b.png. The multiply button is labelled "*" in the UI, so I clicked that. |
| MC-200 | YES | PASS | Playwright output: {"t":"Groovy...","ff":"Fredoka, ...","col":"rgb(225, 173, 1)","fs":"64px","ta":"center","vis":"visible","rect":[502.97,274.06],"vw":1280}; git diff line pair for the h1. No screenshot taken. |
| MC-201 | YES | PASS | Playwright script /tmp/mc201/p.cjs output: init 0; a 12; b 27; c 0 (read from [data-testid=display]). No screenshot taken. |
| MC-402 | YES | PASS | Playwright output: {mouse:19, clear1:0, kbMid:6, kb:54, clear2:0, kb2:19, clear3:0, box:{x:460,y:190.5,width:360,height:429}}. DOM: h1.title 'Groovy...' above .calculator. No screenshot taken. |
