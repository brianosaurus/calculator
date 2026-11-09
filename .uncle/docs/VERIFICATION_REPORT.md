# Verification report

## Findings

### MC-101

- **Action:** Loaded http://127.0.0.1:5173/ in headless Chromium via Playwright, read h1 elements and page HTML/body text, and took a screenshot.
- **Expected result:** The single level-1 heading reads exactly 'Groovy Calculator!' with no trailing '...' and the old text 'Groovy...' appears nowhere on the page.
- **Actual result:** Exactly one h1 with text 'Groovy Calculator!'. Page HTML does not contain 'Groovy...'. Body text begins 'Groovy Calculator!' followed by the calculator display and buttons.
- **Defects:** None

### MC-103

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (Playwright) at 375x700 viewport and measured heading and layout geometry via DOM.
- **Expected result:** The heading 'Groovy Calculator!' stays fully visible and centered, does not clip or cause horizontal scrolling, and the calculator layout is unchanged.
- **Actual result:** H1 text 'Groovy Calculator!' spans x=15..360 (center 187.5 = viewport center 187.5); scrollWidth 345 == clientWidth 345 (no clipping); document scrollWidth 375 == clientWidth 375 (no horizontal scroll); calculator container x=31..344, within the viewport and symmetric. No screenshot taken; calculator layout was checked by bounds only, not compared against a baseline.
- **Defects:** None

### MC-104

- **Action:** Drove http://127.0.0.1:5173 in headless Playwright: clicked 7, +, 5, =; then clicked C. Looked for a theme control.
- **Expected result:** Calculator computes 12, clears correctly, any theme switch works, heading remains 'Groovy Calculator!' and styled consistently.
- **Actual result:** Display showed 12 after equals and 0 after clear. Heading text was 'Groovy Calculator!' before, after equals and after clear, with identical style each time (Fredoka font stack, rgb(225,173,1), 64px). No theme control exists in the UI (0 matches, no buttons other than keypad), so no theme switch was applicable.
- **Defects:** None

### MC-200

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium at 1280x800 and read the DOM and computed styles of the single h1 (.title). Measured text, font, color, size, alignment, bounding boxes and per-line text rects, and captured a full-page screenshot at /tmp/mc200/s.png.
- **Expected result:** Heading reads exactly 'Groovy Calculator!', is horizontally centered above the calculator, keeps the themed font and color, with no wrapping, clipping or overflow.
- **Actual result:** Text is exactly 'Groovy Calculator!' (one h1). It is centered: the h1 box spans 460-820px, center 640, which equals the viewport center and the calculator center (476-804px). Font is Fredoka, 'Baloo 2', Comfortaa, 'Trebuchet MS', sans-serif, color rgb(225,173,1) (--gold), 64px, text-align center. There is no horizontal overflow (scrollWidth 1280 = clientWidth 1280). However, the heading WRAPS onto two lines at desktop width. The h1 is 360px wide and 148px tall, and its text rects are two lines of 74px each, with line 1 at x 534-745 and line 2 at x 476-804. The working-tree diff to src/theme.css changes .title white-space from nowrap to normal, so the heading is allowed to wrap. This conflicts with the expected 'no wrapping'.
- **Defects:** Observed: heading wraps to 2 lines at 1280px desktop width (white-space: normal, h1 constrained to the 360px calculator width). Expected: single line with no wrapping. Not yet logged in DEFECTS.md; the driver should record it.

### MC-201

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (Playwright) at 375x667 viewport and measured the h1 and page width; saved screenshot /tmp/mc201.png.
- **Expected result:** The heading 'Groovy Calculator!' remains centered and fully visible above the calculator without horizontal scrolling or layout breakage.
- **Actual result:** h1 text 'Groovy Calculator!', text-align center, bounding box left 15 / right 360 (symmetric 15px margins in 375px viewport); documentElement scrollWidth 375 == clientWidth 375 (no horizontal scroll); calculator box spans x 31-344, centered within the viewport.
- **Defects:** None

### MC-202

- **Action:** Loaded http://127.0.0.1:5173 in headless Playwright, clicked 1,2,+,7,= then the C (clear) button, reading the h1 and display after each step; searched the DOM for any theme control.
- **Expected result:** Arithmetic, clear and theme behavior work as before; heading stays 'Groovy Calculator!' throughout; display shows 19 after 12 + 7 =.
- **Actual result:** Initial: h1 'Groovy Calculator!', display 0. After 12+7=: display 19, h1 unchanged. After clear: display 0, h1 unchanged. No theme control exists in the page DOM (0 matches), so no theme toggle was available to exercise; the check allows this ('if present').
- **Defects:** None

### MC-402

- **Action:** Drove http://127.0.0.1:5173 with Playwright: clicked 7 + 5 = and read the display; clicked C and read the display; clicked 1 . 5 * 4 = and read the display.
- **Expected result:** Results are 12 and 6, and clear resets the display; calculator behavior is unaffected by the heading change.
- **Actual result:** 7+5= displayed 12; C reset the display to 0; 1.5*4= displayed 6.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | Playwright output: h1=['Groovy Calculator!'], count=1, hasOld=false. Screenshot at /tmp/mc101/s.png. |
| MC-103 | YES | PASS | Script .uncle/tests/mc103.mjs output: {"tag":"H1","text":"Groovy Calculator!","l":15,"r":360,"sw":345,"cw":345,"docSW":375,"docCW":375,"calc":[31,344]} |
| MC-104 | YES | PASS | Playwright run output; screenshot after calculation at /tmp/mc104.png; script .uncle/tests/mc104.cjs. Theme note: no theme control present. |
| MC-200 | YES | FAIL | Playwright measurements: h1 width 360px, height 148px, two client rects (top 103.5 and 177.5, each 74px high), white-space: normal, max-width 100%. Screenshot /tmp/mc200/s.png. git diff of src/theme.css shows '-white-space: nowrap' / '+white-space: normal' on .title. |
| MC-201 | YES | PASS | Playwright measurement JSON: {text:'Groovy Calculator!',left:15,right:360,textAlign:'center',scrollWidth:375,clientWidth:375,calc:[31,344]}; screenshot /tmp/mc201.png (not visually inspected; geometry-based). |
| MC-202 | YES | PASS | Observed values: [init, 'Groovy Calculator!', '0'], [after 12+7=, 'Groovy Calculator!', '19'], [after clear, 'Groovy Calculator!', '0'], theme controls count 0. Screenshot of the result at /tmp/mc202/result.png. |
| MC-402 | YES | PASS | Playwright script .uncle/tests/mc402.mjs read the display (data-testid=display) and printed ['12','0','6']. The first run had a selector bug (unescaped '.' in a regex), which I corrected once. That was a script error, not an application defect. |
