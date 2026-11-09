# Verification report

## Findings

### MC-101

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (reducedMotion no-preference) via temporary script .uncle/tests/mc101.cjs; sampled document.getAnimations() and screenshots every 5s for ~31s (past one 20s loop); inspected computed body styles and src/theme.css keyframes.
- **Expected result:** Groovy 70s background of concentric rings and conic swirl in orange, gold, brown, green, cream moves continuously and smoothly, with no visible jump or seam at loop restart.
- **Actual result:** Body has animation 'groovy' (20s linear infinite, running) over repeating-radial-gradient plus conic-gradient layers. currentTime advanced steadily (33, 5250, 10516, 15716, 20949, 26149, 31349 ms) and wrapped past 20000 while still running. Screenshots at successive times differ (motion present) and show concentric rings and swirl in orange/gold/green with brown calculator and cream display. Keyframes move background-position 0 0 -> 200% 200% / -200% -200% with background-size 200% 200%, which shifts exactly one tile width (2 viewports) per loop, so the loop is seamless by construction. Limitation: headless run, no continuous video; smoothness judged from linear timing and sampled frames, not a human viewing.
- **Defects:** None

### MC-102

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (Playwright), then without reloading emulated prefers-reduced-motion: reduce and back to no-preference, sampling body computed animation-name and background-position over 1s each.
- **Expected result:** With reduce on, the background stops and shows a static gradient. With reduce off, the motion resumes without a reload.
- **Actual result:** Baseline: animation 'groovy', background-position advanced (2.17% -> 12.5% in 1s). Reduce: animation-name 'none', background-position 0px 0px, 0px 0px unchanged after 1s (static gradient). Back to no-preference: animation 'groovy' again, position advanced 0% -> 10.33% in 1s, no reload.
- **Defects:** None

### MC-103

- **Action:** Loaded http://127.0.0.1:5173/ in headless Chromium (Playwright, normal motion), inspected DOM and computed styles, clicked 1,2,+,3,= then C then 9,*,8,= and took a screenshot (/tmp/mc103.png).
- **Expected result:** Calculator stays on an opaque brown background, animation never shows through; display and key text readable, key colors and layout unchanged; calculations correct.
- **Actual result:** Computed .calculator background-color rgb(59,35,20), opacity 1, no backdrop-filter, no background-image. Display is cream rgb(255,241,208) with dark brown text; keys keep orange/gold/cream/green colors with readable text. Animated ring background is visible only outside the calculator panel in the screenshot. 12+3= displayed 15; 9*8= displayed 72.
- **Defects:** None

### MC-200

- **Action:** Opened http://127.0.0.1:5173 in headless Chromium with normal motion (reducedMotion=no-preference); clicked keys for 12+7=, C, 9*8=, then typed 5+3 + Enter and Escape via keyboard; read display and key layout.
- **Expected result:** Calculator arithmetic, display output and key layout behave exactly as before; no logic regressions.
- **Actual result:** 12+7= displayed 19; C reset to 0; 9*8= displayed 72; keyboard 5+3 Enter displayed 8; Escape reset to 0. Key layout order: C, ⌫, /, *, 7, 8, 9, -, 4, 5, 6, +, 1, 2, 3, =, 0, . (18 keys).
- **Defects:** None

### MC-202

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (Playwright script .uncle/tests/mc202.cjs) instead of a visible devtools panel, reloaded, waited 3s while the background animated, and recorded all network requests and console/page errors.
- **Expected result:** Only same-origin localhost requests appear; no external fonts, images or CDN requests, and no console errors.
- **Actual result:** All 28 recorded requests (initial load plus reload) were to http://127.0.0.1:5173 (index, vite client, main.jsx, Calculator.jsx, theme.css, engine.js, keymap.js, and react deps). No external hosts. Zero console errors or page errors.
- **Defects:** None

### MC-203

- **Action:** Playwright Chromium against http://127.0.0.1:5173: emulated prefers-reduced-motion: reduce, loaded page, sampled body computed style at load and after 10s; then emulated no-preference without reload and sampled at once and after 1.5s.
- **Expected result:** Under reduce, the gradient background is static and still visible (not blank); after switching back, the background begins moving again without reload.
- **Actual result:** Under reduce: animation-name none, background-position '0px 0px, 0px 0px' at load and after 10s (static); background-image remained repeating-radial-gradient (not blank). After switching to no-preference without reload: animation-name groovy, background-position 0.167% -> 16.67% over 1.5s (moving).
- **Defects:** None

### MC-204

- **Action:** Read the MC-204 row from MANUAL_CHECKLIST.json. I did not watch the background through a loop, because that needs a person to judge motion in real time.
- **Expected result:** Motion is continuous and smooth with groovy rings and swirl in orange, gold, brown, green and cream, and no visible jump or seam at the loop restart.
- **Actual result:** Not observed. Whether the motion is smooth, whether the colours look right, and whether the loop restart shows a seam are human visual judgments over about 20 seconds. I did not make them and did not infer them from other results.
- **Defects:** None

### MC-301

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (normal motion, 900x700). Read computed styles of body; took 7 screenshots over ~27s (t=0 plus every 4.5s); then paused the CSS animation via the Web Animations API and compared frames at currentTime 0, 10000, 19990 and 20000ms to check the loop wrap. No video was watched by a human.
- **Expected result:** Groovy 70s background (concentric rings plus conic swirl in orange, gold, brown, green, cream) moves continuously and smoothly, and the loop wraps at 20s without a visible jump or seam.
- **Actual result:** Body has animation 'groovy' 20s linear infinite, with background layers repeating-radial-gradient (gold/orange/green) and conic-gradient (orange/green/brown). Background-size is 200% 200%. All 7 screenshots over ~27s differ (hashes 7f3a04d0 46ec1b44 ae0d84aa 0de3532a b5e19561 6be388b8 9dff0fc7), so it moves continuously. Keyframes run background-position 0 0 to 200% 200% on the radial layer and -200% -200% on the conic layer. At 200% size that shift is exactly one tile width, so the wrap is seamless. The rendered frame at 20000ms (fb272972) is identical to the frame at 0ms (fb272972), while 19990ms differs (842acc41). Smoothness is judged from linear timing and distinct frames only, not from video.
- **Defects:** None

### MC-302

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium (normal motion), computed styles/contrast for the calculator, display and every key, and took screenshots 7s apart (different animation phases). Compared key colors with HEAD theme.css.
- **Expected result:** Calculator stays an opaque brown panel, background never shows through, display/key text readable at >=4.5:1 against own background, key colors and layout match existing look.
- **Actual result:** Calculator panel background is opaque rgb(59,35,20) (brown), opacity 1; display cream on its bg. Key colors and layout unchanged from HEAD (.key-op gold/brown, .key-equals green/cream, .key-clear orange/cream are not in the diff). Measured contrast: digit keys 13.05:1, operator keys 7.09:1, display text passes, BUT clear (C) and backspace keys (cream on orange) = 3.85:1 and equals (cream on green) = 4.08:1, both below the 4.5:1 AA threshold stated in the expected result.
- **Defects:** None filed; C/backspace (3.85:1) and = (4.08:1) key text contrast below 4.5:1 (pre-existing key colors, unchanged by this work)

### MC-303

- **Action:** Loaded http://127.0.0.1:5173 in Playwright Chromium with reducedMotion=reduce emulated, took screenshots 5s apart and read computed body styles, then switched emulation to no-preference without reloading and sampled again. OS-level setting not toggled; browser media-feature emulation used.
- **Expected result:** With reduce motion on, the gradient background is static. After switching it off, it animates without reload.
- **Actual result:** Reduce: animation-name none, background-position 0px 0px, 0px 0px at t=0 and t=5s; screenshots byte-identical. After switching to no-preference without reload: animation-name groovy, background-position 15.665% -> 36.4983% over 2s, i.e. moving.
- **Defects:** None

### MC-304

- **Action:** Loaded http://127.0.0.1:5173 in headless Playwright with the background animation running (1 CSS animation, repeating-radial-gradient body background). Clicked 1,2,+,7,= then C; typed 12+7= on the keyboard; pressed Escape. Recorded calculator bounding box before/after, layout-shift total, and all network requests.
- **Expected result:** Math, key presses and display updates work as before; no flicker, lag or layout shift; no external resource requests.
- **Actual result:** Display read 19 after click entry, 0 after C, 19 after keyboard entry, 0 after Escape. Calculator bounding box unchanged. Layout-shift total 0 over 1.5s. All 14 requests were to 127.0.0.1:5173 (page, vite client, modules, src/theme.css); none external. Responsiveness was immediate in the script. Flicker is a subjective visual judgment that headless automation cannot fully make; no layout or display anomalies were measured.
- **Defects:** None

### MC-401

- **Action:** Loaded http://127.0.0.1:5173 in Chromium (Playwright, reducedMotion=no-preference), confirmed the body 'groovy' animation was running, then clicked keypad buttons with the mouse: 12+7=, 9*8=, C, 1.5+2.25=, 5-8=, +3= (on the -3 result), 9/4=, 1-2-3 then backspace. Script: .uncle/tests/mc401.mjs
- **Expected result:** Every calculation gives the same correct result as before; display updates and clear work normally while the background animates.
- **Actual result:** 12+7=19; 9*8=72; C gave 0; 1.5+2.25=3.75; 5-8=-3; -3+3=0; 9/4=2.25; 123 then backspace gave 12. Background animation 'groovy' on BODY (document.getAnimations() count 1) was active before and after the sequence.
- **Defects:** None

### MC-402

- **Action:** Drove http://127.0.0.1:5173 with Playwright keyboard presses (page focused, no clicks) and read the display (data-testid=display) after each step: 1,2,+,3 then Enter, Backspace, Escape; separately 7,*,6,Enter; separately 1,2,3,Backspace.
- **Expected result:** Keyboard input behaves as before: digits and operators register, Enter evaluates, Backspace and Escape edit and clear.
- **Actual result:** 1,2,+,3 showed 3; Enter showed 15; Backspace on the evaluated result left 15 (unchanged); Escape showed 0; 7,*,6,Enter showed 42; 1,2,3 showed 123 and Backspace gave 12.
- **Defects:** None

### MC-404

- **Action:** Read the checklist row. No live viewing was performed: the row needs a person to watch about 30 seconds of animation, including one 20s loop boundary, and judge smoothness, seam, flicker and stutter.
- **Expected result:** Background moves continuously and smoothly with 70s-style rings and swirl, with no visible jump, flicker, or seam at loop restart, and no stutter in calculator interaction.
- **Actual result:** Not observed. A scripted check cannot judge perceived smoothness or a loop-restart seam, so no PASS is claimed.
- **Defects:** None

### MC-405

- **Action:** Used Playwright (Chromium) against http://127.0.0.1:5173 with prefers-reduced-motion emulated as 'reduce' on load; sampled body computed animation and background-position twice 1.5s apart; pressed 7 + 8 = on the calculator; then switched emulation to no-preference without reloading and sampled again after 1.5s. Screenshots /tmp/mc405/static.png and moving.png. Emulation stands in for the OS toggle.
- **Expected result:** With reduce on, the background is static at its base position and the calculator still works; turning it off starts the animation live without a reload.
- **Actual result:** Reduce on: animation-name none, background-position '0px 0px, 0px 0px' at both samples (static); 7+8= displayed 15. After switching to no-preference with no reload: animation-name groovy, background-position moved 0.333% -> 15.67% (and -0.333% -> -15.67% for the second layer), so the animation started live.
- **Defects:** None

### MC-406

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium at 400x700 and 1600x900; read computed body/html styles, scroll dimensions, console errors, and all network request URLs via a temporary Playwright script (.uncle/tests/mc406.cjs). No screenshots were taken.
- **Expected result:** Background fills the viewport at all sizes with no gaps, layout unchanged, no console errors, no non-localhost requests.
- **Actual result:** At both sizes body has a repeating-radial-gradient background (size 200% 200%, repeat) and body height equals the viewport (700/700, 900/900). Scroll width equals viewport width (400/400, 1600/1600), so there is no horizontal overflow. 0 console or page errors. 30 requests were made, all to 127.0.0.1, none external. Layout unchanged was judged only from the absence of overflow and the body height; it was not compared against a baseline and no screenshots were captured.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | Animation timeline sampled: groovy running, duration 20000, iterations infinite; screenshots /tmp/mc101_0..6.png (mc101_2 viewed: rings and swirl in orange, gold, green, brown, cream); src/theme.css lines 24-34. |
| MC-102 | YES | PASS | Script .uncle/tests/mc102.cjs output: reduce -> ['none','running','0px 0px, 0px 0px'], reduce+1s unchanged; off -> ['groovy',...], off+1s '10.3327% 10.3327%, -10.3327% -10.3327%'. CSS in src/theme.css has @media (prefers-reduced-motion: reduce){body{animation:none}}. Emulation used rather than OS setting; visual look not human-inspected. |
| MC-103 | YES | PASS | Playwright output: '12+3= 15', '9*8= 72', calculator style [rgb(59, 35, 20), 1, none]; screenshot /tmp/mc103.png shows opaque brown panel over rings. Script: .uncle/tests/mc103.cjs and mc103b.cjs. |
| MC-200 | YES | PASS | Temporary script .uncle/tests/mc200.mjs output: '12+7=19 / C=0 / 9*8=72 / kbd5+3=8 / esc=0' and key list above; selectors taken from the rendered DOM (.key, data-key, data-testid=display). No prior-layout baseline was compared beyond expected standard calculator layout and arithmetic results. |
| MC-202 | YES | PASS | Playwright output: reqs all prefixed http://127.0.0.1:5173/; errs=[] |
| MC-203 | YES | PASS | Script .uncle/tests/mc203.cjs output: {a:[none,'0px 0px, 0px 0px',repeating-radial-gradient],c:[none,same,same],d:[groovy,'0.167% 0.167%, -0.167% -0.167%'],e:[groovy,'16.6663% 16.6663%, -16.6663% -16.6663%']}; screenshot /tmp/mc203.png taken under reduce but not visually inspected (visibility inferred from computed background-image). |
| MC-204 | YES | BLOCKED-HUMAN | No live observation was recorded. No driver or automated result was cited as covering this row. |
| MC-301 | YES | PASS | Scripts .uncle/tests/mc301.mjs and mc301b.mjs; screenshots /tmp/mc301_0..6.png; src/theme.css lines 15-34. Computed animation: groovy 20s linear infinite. |
| MC-302 | YES | FAIL | Computed-style contrast table from .uncle/tests/mc302.mjs; screenshots /tmp/mc302a.png and /tmp/mc302b.png; git diff HEAD of src/theme.css shows only body background/animation changed, key colors pre-existing. |
| MC-303 | YES | PASS | Script .uncle/tests/mc303.mjs output: {"a":["0px 0px, 0px 0px","none"],"c":["0px 0px, 0px 0px","none"],"identical":true,"d":["15.665% 15.665%, ...","groovy"],"e":["36.4983% 36.4983%, ...","groovy"]} |
| MC-304 | YES | PASS | Output: out=[19,0,19,0], same-rect=true, layout-shift=0, requests all local. Screenshot at /tmp/mc304.png. Script at .uncle/tests/mc304.mjs. |
| MC-401 | YES | PASS | Script console output: anims ['BODY:groovy','BODY:groovy','total:1']; 12+7= "19"; 9*8= "72"; clear "0"; 1.5+2.25= "3.75"; 5-8= "-3"; neg+3= "0"; 9/4= "2.25"; bksp "12"; anims after same as before. |
| MC-402 | YES | PASS | Observed display values: 3 -> 15 -> 15 -> 0; 42; 123 -> 12. Scripted run, no screenshot. 'As before' was judged on behavior only, not compared to the pre-change build; Backspace on a result being a no-op is plausible existing behavior. |
| MC-404 | YES | BLOCKED-HUMAN | None. No screen recording or notes were captured. |
| MC-405 | YES | PASS | Script output: a=[none,0px 0px,0px 0px], a2 identical, display '15', m1=[groovy,0.333%...], m2=[groovy,15.6657%...]. Screenshots static.png and moving.png in /tmp/mc405. Real OS settings toggle was not used; emulated media feature instead. |
| MC-406 | YES | PASS | Script output JSON: errs=[], ext=[], n=30; sh/ih and sw/iw match at both viewports; bg is a CSS gradient (no image/font/style fetches). |
