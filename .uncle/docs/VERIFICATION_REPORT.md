# Verification report

## Findings

### MC-101

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium at 1280x800, printed the DOM, read computed styles and bounding boxes of the heading, and took a screenshot.
- **Expected result:** A heading reading exactly "Groovy" above the calculator card, horizontally centered over it, bold rounded retro font in gold with dark outline and orange glow.
- **Actual result:** DOM has <h1 class="title">Groovy</h1> immediately before .calculator. Heading center x=640, card center x=640. Heading bottom y=214.5, card top y=230.5, so it sits above the card. font-weight 700, font-family Fredoka, "Baloo 2", Comfortaa, "Trebuchet MS", sans-serif. color rgb(225,173,1) (gold). text-shadow has four 2px dark brown rgb(59,35,20) offsets (outline) plus rgb(204,85,0) 18px blur (orange glow). In the screenshot the heading looks bold and rounded, gold with a dark outline and a glow. The rendered font may be a fallback if Fredoka is not installed.
- **Defects:** None

### MC-102

- **Action:** Took screenshots of the same page at about 0s, 5s and 10s while the background animated, and viewed all three.
- **Expected result:** Groovy title readable against the background in all three screenshots; background animation and calculator centering look unchanged.
- **Actual result:** The background visibly changed between the three shots (concentric rings, then a different ring phase, then a diamond/warped pattern), so the animation is running. The gold title with its dark outline and glow stayed legible in all three. The calculator card stayed centered at the same position (x 460-820, y 231-660) in every shot. The elapsed time of about 10s is an approximation of the full cycle, since the cycle length was not measured.
- **Defects:** None

### MC-103

- **Action:** Loaded http://127.0.0.1:5173 in Playwright Chromium at 320x640, measured .title and .calculator rects, then attempted horizontal scroll to x=1000.
- **Expected result:** The title stays on a single line, is no wider than the card, stays centered over it, and there is no horizontal scrollbar or clipping.
- **Actual result:** Title white-space nowrap, height 47px at 40px font (single line), width 131.7px vs card 294.4px; title center x=159.99 vs card center x=159.99; scrollWidth 320 = clientWidth 320; scrollX stayed 0 after scrollTo(1000,0); title spans 94-226px, within the viewport.
- **Defects:** None

### MC-104

- **Action:** Set viewport to 1280x300 in the same browser session, scrolled to top and then to the bottom, measuring title and key rects.
- **Expected result:** The title is not clipped at the top, and scrolling vertically reveals the whole calculator including the bottom row of keys.
- **Actual result:** At scroll top the title spans y=16 to 90 (fully visible, not clipped). Page scrollHeight is 551 vs a 300px viewport, so it scrolls; at the bottom (scrollY=251) all 18 keys are laid out and the lowest key bottom is 268, within the 300px viewport.
- **Defects:** None

### MC-105

- **Action:** In Playwright at 1280x800 against http://127.0.0.1:5173, clicked 12 + 7 =, cleared, typed 8*3 + Enter on keyboard, cleared, entered 15 digits and read display font size and h1 title.
- **Expected result:** Results 19 and 24, display updates, font shrinks for long input, title unchanged.
- **Actual result:** Display showed 19 and 24. After 15 digits, display showed 123456789012 (12-digit cap) and font-size shrank from 2.6rem to 1.6rem. Title h1.title was 'Groovy' before and after.
- **Defects:** None

### MC-201

- **Action:** At 1280x800, clicked 12 + 7 =, C, 9 * 3 =, C, then typed 5*4 + Enter on keyboard.
- **Expected result:** Display 19, then 27, then cleared; keyboard yields 20.
- **Actual result:** Display showed 19, then 0 after clear, 27 and then 0 after clear, then 20 from keyboard entry. The multiply key is labelled '*' rather than 'x'.
- **Defects:** None

### MC-202

- **Action:** Loaded http://127.0.0.1:5173 at 1280x800 in Playwright, clicked digit keys 1-9,1-5 one at a time and read the .display text, computed font size and scrollWidth/clientWidth after each press.
- **Expected result:** Display font shrinks stepwise (approx 2.6, 2, 1.6rem), text stays inside the display; Groovy heading unaffected.
- **Actual result:** Font size 41.6px (2.6rem) for 1-8 digits, 32px (2rem) for 9-10 digits, 25.6px (1.6rem) for 11-12 digits. Input capped at 12 digits (123456789123). scrollWidth equalled clientWidth (328) at every length, so no overflow. The .title still read 'Groovy'.
- **Defects:** None

### MC-203

- **Action:** At 1280x800 read computed styles and bounding boxes for body, .title and .calculator, and sampled body background-position twice 3s apart.
- **Expected result:** Animated multi-color background still animates; Groovy heading and card are centered together as a group horizontally and vertically; card keeps brown styling.
- **Actual result:** Body has animation 'groovy' with a repeating-radial-gradient of gold/orange colors. background-position moved from 20.832% to 50.997% over 3s, so it is animating. Title box x=534.7, w=210.7 (center 640). Card x=460, w=360 (center 640). Group spans y=140.5 to y=659.5 (center 400 in the 800px viewport). Card background rgb(59,35,20), brown.
- **Defects:** None

### MC-204

- **Action:** Playwright at http://127.0.0.1:5173 with viewport 320x640: measured H1 'Groovy' box, document scrollWidth vs clientWidth, attempted scrollTo(500,0), and clicked 7 + 8 = keys.
- **Expected result:** No horizontal scrolling, Groovy on one line within the card width and centered above the calculator, keys remain usable.
- **Actual result:** H1 Groovy is on 1 line, spans x=94.2..225.8 (center 160.0 = viewport center 160), height 47. scrollWidth 320 = clientWidth 320; scrollX stayed 0 after scrollTo(500,0). Keys 7,+,8,= produced display 15.
- **Defects:** None

### MC-205

- **Action:** Playwright at 1280x300 viewport: measured H1 and last key row at scroll top and after scrollTo(0,100000); took screenshots.
- **Expected result:** Groovy heading fully visible at top, not clipped; scrolling reveals the whole calculator including bottom key row.
- **Actual result:** At scrollY=0 the H1 spans y=16..90 (inside 300px viewport), fully visible. Page is scrollable (scrollHeight 551). At bottom (scrollY=251) the last key row spans y=214..268, inside the viewport. No horizontal overflow (scrollWidth 1280).
- **Defects:** None

### MC-206

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (1280x800) and took three screenshots at t=0s, ~4s and ~8s, reading computed styles of the heading. The animation cycle length was not measured, so the offsets are approximate.
- **Expected result:** Gold Groovy heading with dark brown outline and orange glow, in the theme's rounded font, readable in all three screenshots and above (not inside) the brown card.
- **Actual result:** H1.title 'Groovy': color rgb(225,173,1) (gold), font Fredoka (rounded), weight 700, text-shadow of rgb(59,35,20) at 4 offsets (dark brown outline) plus rgb(204,85,0) 18px glow (orange). Its box y=140.5-214.5 sits above the .calculator card (y=230.5) and card.contains(h) is false. I viewed the t=4s screenshot and the heading was clearly readable against the swirling background. I did not open the t=0s and t=8s screenshots, so readability at those offsets rests on the identical computed styles.
- **Defects:** None

### MC-301

- **Action:** Opened the app at 1280x800 without interacting, inspected the screenshot and the heading and card bounding boxes.
- **Expected result:** Bold gold 'Groovy' heading in the rounded retro font, centered directly above the brown calculator card, with dark outline and orange glow, and the animated background unchanged.
- **Actual result:** Heading is bold (700), gold, Fredoka, with brown outline and orange glow. Heading center x = 534.67+210.66/2 = 640, matching the card center 460+180 = 640. It sits directly above the card (bottom 214.5 vs card top 230.5). The screenshot shows the animated concentric orange/green/gold background intact. The background was not compared against a prior baseline beyond visual inspection.
- **Defects:** None

### MC-302

- **Action:** Loaded http://127.0.0.1:5173 at 1280x800 with Playwright; captured three screenshots at t≈0s, 4s, 8s of the animated background (/tmp/w7_0.png, w7_1.png, w7_2.png); viewed first and last, which show visibly different background ring positions, and measured the h1.title.
- **Expected result:** The "Groovy" title is readable against the background in all three screenshots.
- **Actual result:** Gold (rgb 225,173,1) Groovy title with dark outline/orange glow is legible in the 0s and 8s screenshots, whose backgrounds differ (ring centre moved from bottom-right to top-left). Title geometry was identical in all three captures (x 534.7-745.3, centred at 640).
- **Defects:** None

### MC-303

- **Action:** Set the viewport to 320x640, measured the title and card bounding boxes, attempted window.scrollTo(100,0) and read scrollX, scrollWidth and clientWidth, and viewed the screenshot /tmp/w7_small.png.
- **Expected result:** The title stays on one line, is not clipped, is centered over the card, and the page has no horizontal scrollbar.
- **Actual result:** Title is a single line (height 47px, x 94.2-225.8, width 131.7, centre 160.0). Card spans x 12.8-307.2 (centre 160.0, width 294.4), so the title is narrower than the card and centred over it. scrollWidth 320 equals clientWidth 320, and scrollX stayed 0 after scrolling right. The screenshot shows the whole title with no clipping.
- **Defects:** None

### MC-304

- **Action:** Loaded http://127.0.0.1:5173/ in Playwright Chromium at 1280x300, scrolled to bottom and back to top, measuring the title and key rectangles (script .uncle/tests/mc304.cjs).
- **Expected result:** The title is fully visible at the top, the page scrolls vertically, and the whole calculator can be reached with nothing clipped.
- **Actual result:** scrollHeight 551 > viewport 300, so the page scrolls vertically. Title top = 16px at scrollY 0 (fully visible, same after scrolling back). At the bottom (scrollY 251) the lowest key bottom is 268 of 300, so every key is reachable. Leftmost key/display edge is at x=476, so nothing is clipped horizontally.
- **Defects:** None

### MC-305

- **Action:** At 1280x900, clicked 1, 2, +, 7, = then typed 123456789012 via keyboard (after pressing 'c' to clear), then typed +5= and compared the title position before and after.
- **Expected result:** Arithmetic gives correct results, the display updates and shrinks its font as before, and the heading does not move or interfere.
- **Actual result:** 12+7= displayed 19 (font 41.6px). Typed 123456789012 displayed in full (font 25.6px, smaller). +5= gave 123456789017, which is correct. Title top shifted by 2.4px between the short and long entries. This is a centering side effect: the display's min-height 4.2rem is exceeded at the larger font, so the display height changes with the font size. The heading never overlapped or interfered with the calculator. I treated the shift as pre-existing display-shrink behaviour, not a heading defect.
- **Defects:** None

### MC-400

- **Action:** Drove http://127.0.0.1:5173 in headless Chromium at 1280x800: clicked 12 + 7 =, cleared, clicked 9 * 3 =, cleared, typed 8/2 + Enter on keyboard, cleared, then typed digits up to 19 characters while reading the display's font-size.
- **Expected result:** Results 19, 27, 4; display updates; font shrinks for long input as before.
- **Actual result:** Displays read 19, 27, 4; clear returned 0. Font-size was 2.6rem at 0 and 5 digits, 2rem at 10 digits, 1.6rem at 12 digits (input capped at 12 chars). Display scrollWidth equals clientWidth (328/328), so text stays inside.
- **Defects:** None

### MC-401

- **Action:** Loaded the app at 1280x800 and sampled the body's background-position and the title/card geometry at 0s, 5s and 10s. Screenshots at 0s and 5s were saved to /tmp/mc401a.png and /tmp/mc401b.png but not visually reviewed.
- **Expected result:** Multi-color animated background still moves; title and card are centered together as a group; card styling (brown card, buttons) unchanged.
- **Actual result:** Animation 'groovy' is active and background-position advanced from 14.17% to 66.33% to 118.50%. Title center x and card center x are both 640, which is the viewport center at width 1280. The title+card group's vertical midpoint is 400, which is the viewport midpoint at height 800. Card background is rgb(59,35,20) (brown) and the digit key background is rgb(255,241,208) (cream).
- **Defects:** None

### MC-402

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium at 320x640, attempted scrollTo(500,0), measured widths, clicked 7,+,5,= keys.
- **Expected result:** No horizontal scroll, Groovy title on one line and not wider than card, keys work.
- **Actual result:** documentElement scrollWidth=320=clientWidth, body scrollWidth=320, scrollX stayed 0 after scrollTo(500,0). h1 40px, white-space nowrap, width 131.7 (x 94-226) inside card (x 12.8-307.2); h1 scrollWidth=clientWidth=132. Keys 7,+,5,= produced display 12.
- **Defects:** None

### MC-403

- **Action:** Set viewport to 1280x300, captured top screenshot, scrolled to bottom, captured screenshot, clicked keys 2,0,. and = after scrolling to bottom.
- **Expected result:** Title fully visible at top, nothing clipped, scrolling reveals whole calculator including bottom key row, keys clickable.
- **Actual result:** Title rect top=16,bottom=90 at scroll top (fully visible). Page scrollHeight 551 vs viewport 300; scrolled to y=251 (max). Bottom row key '0' at top 214 bottom 268 within 300px viewport; clicking 2,0,. changed display to '20.' and = click succeeded.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | Computed-style and bounding-box JSON output from .uncle/tests/mc101.cjs; screenshot /tmp/mc_0.png viewed. |
| MC-102 | YES | PASS | Screenshots /tmp/mc_0.png, /tmp/mc_1.png, /tmp/mc_2.png viewed. |
| MC-103 | YES | PASS | Script .uncle/tests/mc103.cjs output: 320 {t:[94.16,225.83,131.67,47], c:[12.8,307.19,294.39], sw:320, cw:320, tcenter:159.99, ccenter:159.99, ws:nowrap}; scrollX 0 |
| MC-104 | YES | PASS | Script output: top [16,90]; bottom {maxBottom:268,minTop:-43,n:18,vh:300,sy:251,sh:551}. minTop -43 is only the scrolled-off top keys at the bottom scroll position. |
| MC-105 | YES | PASS | Script .uncle/tests/run.mjs output: a=19, b=24, fsBefore=2.6rem, fsAfter=1.6rem, title0=Groovy, title1=Groovy. No screenshots taken. |
| MC-201 | YES | PASS | Script output: a=19, clr1=0, c=27, clr2=0, e=20. No screenshots taken, values were read from the display element. |
| MC-202 | YES | PASS | Playwright log: '12345678'->41.6px; '123456789'->32px; '12345678912'->25.6px; sw=cw=328 throughout. Screenshot saved at /tmp/a.png. |
| MC-203 | YES | PASS | Playwright output: title [534.67,140.5,210.66,74]; calculator [460,230.5,360,429] bg rgb(59, 35, 20); background-position 20.832% then 50.997%, animationName groovy. No separate pair of screenshots was taken; the animation was verified through computed-style sampling. |
| MC-204 | YES | PASS | Script /tmp/mc/t.mjs and /tmp/mc/k.mjs output; screenshot /tmp/mc/a.png; 18 buttons present, last button bottom 550 < 640. |
| MC-205 | YES | PASS | Script /tmp/mc/t.mjs output; screenshots /tmp/mc/top.png and /tmp/mc/bot.png. |
| MC-206 | YES | PASS | .uncle/tests/w6/s0.png, s1.png, s2.png; computed-style JSON from the script. Only s1.png was visually inspected. |
| MC-301 | YES | PASS | .uncle/tests/w6/s1.png screenshot; bounding-box and computed-style JSON. |
| MC-302 | YES | PASS | Screenshots /tmp/w7_0.png and /tmp/w7_2.png inspected visually; DOM: <h1 class="title">Groovy</h1> above .calculator. The middle screenshot was captured but not viewed; only measured geometry was checked for it. Cycle length was not measured, so the three shots are spaced ~4s apart and not verified as exactly 0/50/100% of the cycle. |
| MC-303 | YES | PASS | Playwright measurements and the screenshot /tmp/w7_small.png; script at .uncle/tests/w7/p.mjs. |
| MC-304 | YES | PASS | Playwright measurements: sh=[551,300], titleTop=16, scrollY=251, keys bottom 268/300, minLeft=476, overflow-y visible on html and body. |
| MC-305 | YES | PASS | Playwright output: d1='19', fsShort=41.6px, d2='123456789012', fsLong=25.6px, d3='123456789017', titleMoved=2.41px. theme.css: .display min-height 4.2rem, padding 12px 14px; Calculator.jsx size logic 2.6rem/2rem/1.6rem. |
| MC-400 | YES | PASS | Playwright script .uncle/tests/run.mjs output: a=19, b=27, c=4, fs0=2.6rem, fs5=2.6rem, fs10=2rem, fs19=1.6rem, t19=123456789012, fits=[328,328]. |
| MC-401 | YES | PASS | Playwright computed styles and bounding rects from .uncle/tests/run.mjs: g1, g2 and g3 values. Smoothness of the motion was judged only from the position changes, not by eye. |
| MC-402 | YES | PASS | Screenshot /tmp/mc402.png; script .uncle/tests/mc402.cjs and mc2.cjs output as above. |
| MC-403 | YES | PASS | Screenshots /tmp/mc403top.png and /tmp/mc403bot.png; scripts in .uncle/tests/. Note: screenshots were captured but not visually inspected; verdict is from DOM measurements and click results. |
