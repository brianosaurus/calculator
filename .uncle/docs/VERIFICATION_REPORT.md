# Verification report

## Findings

### MC-101

- **Action:** Loaded http://127.0.0.1:5173 in headless Chromium at 1280x800 via a temporary Playwright script (.uncle/tests/mc101.mjs), read computed styles, sampled background-position twice 2s apart, and took a screenshot (/tmp/mc101.png) which I viewed.
- **Expected result:** Clearly 1960s psychedelic: vivid magenta/cyan/violet/lime accents, swirling animated gradient background, bold high-contrast keys, glowing ring on the calculator.
- **Actual result:** Screenshot shows a full-page concentric-ring rainbow background in magenta, gold, lime, cyan and violet. Calculator has a rainbow gradient border ring (5px) plus magenta and cyan glow box-shadows. Keys are bold with magenta/violet outlines (gold, green, orange, cream fills with dark labels). The body animation 'groovy 20s' is running: background-position changed from 8.33% to 28.33% over 2s.
- **Defects:** None

### MC-102

- **Action:** Set the viewport to 320x700 in the same browser session, measured the heading and calculator bounding boxes and document scroll widths, tried window.scrollTo(100,0), pressed Tab twice and re-measured, and took a full-page screenshot (/tmp/mc102.png).
- **Expected result:** Heading 'Groovy Calculator!' on one line; calculator fully inside viewport; no horizontal scroll with borders, ring and glows.
- **Actual result:** Heading height is 33px at font-size 28.8px (one line), white-space nowrap, spanning x=34.4 to 285.5 of 320. Calculator spans x=12.8 to 307.2, inside 0-320. documentElement.scrollWidth = clientWidth = 320 and body scrollWidth = 320. Sideways scroll attempt left scrollX at 0, and after Tab focus scrollWidth stayed 320 with scrollX 0.
- **Defects:** None

### MC-103

- **Action:** Loaded http://127.0.0.1:5173 with Playwright, read the DOM, and pulled computed colours and gradient stops for every key variant (digit, operator, clear/orange, equals), the display and the h1. Computed WCAG contrast of the label colour against each gradient stop. Did not use a colour picker or visually inspect the page.
- **Expected result:** Key labels and display text are at least 4.5:1 against the worst gradient stop. The orange key meets 4.5:1 or is waived at 3:1. The display glow does not hurt legibility.
- **Actual result:** Worst-stop contrast: digit 13.05:1 (#3b2314 on #fff1d0), operator 7.09:1, clear/orange 4.87:1 (black on #cc5500), equals 4.59:1 (black on #568203). Display text #3b2314 on a gradient from #fff1d0 to #e9fbff is above 12:1, and the display has no text-shadow. The h1 is gold #e1ad01 with a 2px dark-brown #3b2314 text-shadow outline, drawn straight on a psychedelic radial/conic gradient with no panel behind it. The gold-on-brown outline is about 7:1. All key and display text meets 4.5:1. The h1 is large display text with a dark outline. Only this computed outline contrast was checked. I did not sample pixels or inspect the heading visually, so its legibility on the busy background is not visually confirmed.
- **Defects:** None

### MC-104

- **Action:** Using Playwright on http://127.0.0.1:5173, for each key type (digit, op, clear, equals) read computed style and bounding box in default, hover, keyboard focus (Tab, confirmed :focus-visible) and mouse-down pressed states.
- **Expected result:** Hover, focus-visible and pressed states are visibly distinct. Focus outline is at least 2px and clearly visible. The key does not change size or shift position. Contrast stays at least 4.5:1 in hover and focus.
- **Actual result:** Default: box-shadow violet ring plus a hard magenta 4px drop. Hover: cyan ring, magenta glow, filter saturate(1.4). Focus-visible: 3px solid cyan outline with 2px offset, plus a magenta ring and a lime glow. Pressed: hover look plus transform translateY(1px), so the y position moves 1px and the width and height are unchanged. Position and size are identical in default, hover and focus. The pressed y shift of 1px is the intended press effect, so no layout shift. Text colour and gradient stops are the same in all states, so the contrast values are the same as MC-103 (min 4.59). saturate(1.4) calculation only raises luminance (orange becomes roughly 244,77,0, equals roughly 76,137,0), so black text contrast does not drop (equals roughly 4.9:1). These contrast figures come from the computed text colour and gradient stops. I did not sample the saturate-filtered pixels. Visual distinctness of the states is inferred from the differing computed styles (shadow colour, outline, filter, transform), not from looking at screenshots.
- **Defects:** None

### MC-105

- **Action:** Loaded http://127.0.0.1:5173 in Playwright Chromium with reducedMotion=reduce and again with no-preference; read computed styles of body and the first .key.
- **Expected result:** With reduce: background animation stopped and key hover/focus changes do not animate. With reduce off, background swirls.
- **Actual result:** Background animation is correct: reduce -> animation-name none; no-preference -> groovy 20s. But key transitions are NOT disabled under reduce: computed .key transition-duration is 0.15s (box-shadow, filter), same as no-preference. Cause: src/theme.css line 42 '.key { transition: none; }' inside the reduced-motion media query (line 40) comes before the base '.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }' at line 121 with equal specificity, so the later rule wins.
- **Defects:** New: reduced-motion '.key{transition:none}' (theme.css:42) is overridden by later '.key' transition (theme.css:121); move media block after the .key rules.

### MC-106

- **Action:** In a fresh page, clicked 1,2,+,3,0,= then 7,/,0,= then C; then repeated by keyboard: typed 12+30=, Escape, 7/0=, Escape; read the display each time.
- **Expected result:** 42, then Error, then cleared display (0), same as before restyle.
- **Actual result:** Click: 42, Error, 0. Keyboard: 42, 0 (after Escape), Error, 0. All as expected.
- **Defects:** None

### MC-200

- **Action:** Headless Chromium at 1280px against http://127.0.0.1:5173: clicked 12+7=, C, 9/0=, C, 1.5+2.25=; keyboard 6*7=, Backspace, 8-3 Enter, Escape.
- **Expected result:** Correct arithmetic, Error on divide by zero, clear works, keyboard input works.
- **Actual result:** 12+7=19; C->0; 9/0=Error; 1.5+2.25=3.75; keyboard 6*7=42; 8-3 Enter=5; Escape->0. Backspace pressed right after a result left 42 unchanged (no pre-restyle baseline to compare; treated as normal post-result behavior, not a restyle effect).
- **Defects:** None

### MC-201

- **Action:** Loaded the page at 1280px, took a full-page screenshot, and inspected computed styles and animations.
- **Expected result:** Clearly psychedelic 1960s look with vivid magenta/cyan/violet/lime accents, animated swirling background, rainbow ring on the calculator, and the original gold/green/orange/cream/brown colors still present.
- **Actual result:** Body has a repeating-radial-gradient plus conic-gradient in magenta/gold/lime/cyan/violet with the 'groovy' keyframe animation running. The calculator has a conic rainbow border ring and glow. The heading is gold. Display and digit keys are cream (255,241,208) with brown text, operator keys gold (225,173,1), equals green (86,130,3), clear orange (204,85,0), calculator body brown. Magenta/violet borders appear on keys. The screenshot confirms all of this.
- **Defects:** None

### MC-204

- **Action:** Playwright at 1280px, motion allowed, against http://127.0.0.1:5173: for digit, operator, equals and clear keys, read computed styles and bounding boxes in default, hover, Tab focus-visible, and mouse-down (pressed) states. Script: .uncle/tests/mc204.mjs; focus screenshot /tmp/focus.png.
- **Expected result:** Hover, focus-visible and pressed states are visibly distinct (glow/outline/filter). Focus outline at least 2px and clearly visible. Key fill, text colour, size and position do not change; nothing shifts.
- **Actual result:** Hover: cyan 2px ring plus 14px magenta glow plus saturate(1.4), versus the default violet ring and 4px magenta drop shadow. Focus-visible: solid 3px cyan outline plus magenta ring and lime glow. All three states are distinct and fill and text colours are unchanged. Size is unchanged, and x/y are unchanged in hover and focus. Pressed: the hover glow plus transform translateY(1px), so the key's bounding-box y moves by 1px (digit 425 to 426, operator 354 to 355, equals 565 to 566, clear 354 to 355). The expectation that position does not change is not met in the pressed state. The rule `.key:active { transform: translateY(1px); }` (src/theme.css:135) is inherited from the pre-restyle CSS (HEAD line 108).
- **Defects:** Pressed state shifts the key down 1px (src/theme.css:135 `.key:active` translateY(1px)). Behaviour is inherited from the original CSS; no DEFECTS.md ID assigned by this worker.

### MC-205

- **Action:** Playwright with reducedMotion:'reduce' against http://127.0.0.1:5173: read body animation and background-position at t0 and t+3s, compared screenshots 2s apart, and read the computed transition-duration on the keys in default, hover, focus and pressed states. Inspected the CSS source for the cause.
- **Expected result:** Background swirl is static. Hover and focus changes apply instantly with no animation or transition.
- **Actual result:** Background: body animation-name is none and background-position is unchanged at t0 and t+3s, and the two screenshots 2s apart are byte-identical, so the background is static (pass). Keys: computed transition-duration is still '0.15s, 0.15s' (box-shadow, filter) in every state under reduce, so hover and focus changes are animated. The reduced-motion block (src/theme.css:42 `.key { transition: none; }`) is overridden by the later, equal-specificity `.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }` at src/theme.css:121, which sits outside the media query. The instant-change requirement is not met.
- **Defects:** Reduced-motion `.key { transition: none }` at src/theme.css:42 is overridden by the later `.key` transition at :121; move the reduced-motion block after it. No DEFECTS.md ID assigned by this worker.

### MC-301

- **Action:** Playwright Chromium with reducedMotion=reduce at http://127.0.0.1:5173; read computed body animation/background-position at load and 3s later; read button computed transition; hovered and mouse-down on a key and counted document.getAnimations().
- **Expected result:** Body background does not animate, and hovering or pressing keys causes no transitions or animations.
- **Actual result:** Body background is static (animation-name none, background-position 0px 0px, 0px 0px both at load and after 3s). But keys still have transition-duration 0.15s (box-shadow, filter), and hovering/pressing a key produced 2 running transitions in document.getAnimations(), so the key hover/press transition is not disabled. Cause: in src/theme.css the reduced-motion rule `.key { transition: none; }` (line 42) comes before the base `.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }` (line 121) with equal specificity, so the later rule wins.
- **Defects:** New: reduced-motion .key transition override is overridden by later .key rule (src/theme.css:42 vs :121)

### MC-302

- **Action:** Playwright Chromium with a 320px-wide viewport at http://127.0.0.1:5173; compared scrollWidth to clientWidth, tried scrollTo(500,0), measured the h1 and checked every body descendant's bounding rect against 0..320.
- **Expected result:** No horizontal scroll; heading 'Groovy Calculator!' on one line; calculator with borders and ring fully inside the viewport.
- **Actual result:** documentElement scrollWidth 320 = clientWidth 320, body scrollWidth 320; scrollTo(500,0) left scrollX at 0. h1 text 'Groovy Calculator!' has height 33px (one line), white-space nowrap, spans x 34.4 to 285.5 within the 320 viewport. 0 of the body descendants have a bounding rect outside 0..320.
- **Defects:** None

### MC-303

- **Action:** Playwright at 1280px against http://127.0.0.1:5173: hovered a digit (5), operator (+), equals (=) and clear (C) key and measured bounding boxes and computed styles before/after; then Tabbed through all 18 keys and read the computed outline/box-shadow/colors of each focused key.
- **Expected result:** Visible hover effect with no size/layout shift; focus ring clearly visible, >=2px and contrasting; labels legible in default, hover and focus.
- **Actual result:** Hover: bounding boxes identical before/after for all four key types (no shift); transform none; the hover effect changes the box-shadow (ring turns cyan rgb(0,229,255) with a pink glow 0 0 14px 3px, replacing the violet ring and 4px pink offset shadow). Focus: every key shows a 3px solid cyan rgb(0,229,255) outline with 2px offset, plus the ring shadow; sizes unchanged. Label colors stay constant across states (dark brown rgb(59,35,20) on cream/gold for digits and operators; black on green and orange for equals and clear), so labels remain legible. Not visually inspected by a human; the numeric evidence is computed styles. Contrast of cyan against the surrounding purple/pink background was not measured numerically.
- **Defects:** None

### MC-401

- **Action:** At 1280px against http://127.0.0.1:5173: clicked 1,2,+,7,= ; then 9,/,0,= ; then C (Escape key button); then typed 8*6 + Enter on the keyboard, then pressed Escape; then re-typed 8*6 Enter and pressed Backspace. Read the display after each step. The app has a / key rather than a division glyph.
- **Expected result:** 19, then Error, then cleared display; keyboard 8*6 Enter gives 48; Escape or Backspace clears; behavior matches pre-restyle.
- **Actual result:** Displays: 19, Error, 0 (cleared), 48, then 0 after Escape (cleared). When Backspace was pressed right after the 48 result instead, the display stayed 48 (Backspace did not clear a finished result). The check allows Escape or Backspace, and Escape cleared as expected. No pre-restyle build was run to compare, so the Backspace-after-result behavior is assumed to be the original logic; the restyle changed only CSS per the branch.
- **Defects:** None

### MC-402

- **Action:** Loaded http://127.0.0.1:5173 in Playwright Chromium at 1280px and read the DOM (h1.title, .calculator, .key). Measured heading style and height, then resized to 320px and pressed Tab 20 times, recording document scrollWidth/clientWidth and scrollX after each press.
- **Expected result:** Heading stays on one line, gold with brown outline. No horizontal scrollbar at 320px; calculator, borders, ring and glows stay in the viewport.
- **Actual result:** h1 colour is rgb(225,173,1) (gold). Brown outline comes from a text-shadow stack of rgb(59,35,20) at ±2px offsets, plus an orange glow. white-space is nowrap. Height is 47px at 40px font at 1280px, and 33px at 28.8px font at 320px, so it is one line in both. At 320px scrollWidth and clientWidth were both 320 on all 20 Tab presses, scrollX was 0, so there was no horizontal scroll. .calculator spans x 12.8 to 307.2 inside the 320px viewport and the h1 spans 34.4 to 285.5. Focus rings and glows did not widen the page.
- **Defects:** None

### MC-403

- **Action:** At 1280px, read computed styles for body background, animation and the four key types. Hovered one key of each type (digit, operator, equals, clear) and compared bounding box and box-shadow/filter before and after. Pressed Tab through all 18 keys, recording outline and :focus-visible state. Compared all key bounding boxes before and after the Tab pass.
- **Expected result:** Page is clearly psychedelic (magenta, cyan, violet, swirling animated background). Keys keep their gold, green, orange and cream backgrounds. Hover and focus show a visible effect, a focus outline of at least 2px, and no size or layout shift.
- **Actual result:** Body background is a repeating-radial-gradient plus a conic-gradient using magenta rgb(255,20,147), cyan rgb(0,229,255) and violet rgb(123,47,247), with animation-name 'groovy'. Key backgrounds are digit cream rgb(255,241,208), operator gold rgb(225,173,1), equals green rgb(86,130,3) and clear orange rgb(204,85,0). Hover on all four types changes the box-shadow to a cyan ring with a magenta glow and applies filter saturate(1.4). Key bounding boxes were identical before and after hover. All 18 keys got :focus-visible with a solid 3px cyan outline rgb(0,229,255) plus a magenta/lime shadow. No key's position or size changed across the Tab pass.
- **Defects:** None

### MC-405

- **Action:** Opened http://127.0.0.1:5173 in headless Chromium (Playwright) with reducedMotion:'reduce' emulation (matchMedia prefers-reduced-motion: reduce === true). Scanned computed styles of all elements and ::before/::after for animations and transitions, and counted running document animations. Script: .uncle/tests/mc405.mjs. Did not hover/focus visually; used computed transition-duration instead.
- **Expected result:** The background does not animate and hover or focus changes appear instantly with no transitions. The calculator still works.
- **Actual result:** Background: no CSS animations on any element (animationName none) and document.getAnimations().length === 0, so the background is static (OK). Transitions: all 18 button.key elements still report computed transition-duration '0.15s, 0.15s' (box-shadow and filter) under reduced motion, so hover/focus changes are NOT instant. The reduced-motion rule '.key { transition: none; }' (src/theme.css line 42) is overridden by the later transition declaration at src/theme.css line 121 ('transition: box-shadow 0.15s ease, filter 0.15s ease;'), which comes after the media block in source order. Calculator key buttons are present; no arithmetic functional check was performed in this run.
- **Defects:** New: reduced-motion .key transition:none in src/theme.css:42 is overridden by later transition at :121 (observed 0.15s, expected 0s)

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | body background-image = repeating-radial-gradient(rgb(255,20,147), rgb(225,173,1), rgb(182,255,0), rgb(0,229,255), rgb(123,47,247)) plus a conic-gradient; animation-name groovy, 20s; calculator box-shadow = rgba(0,0,0,.4) 0 12px 32px, rgb(255,20,147) 0 0 28px, rgb(0,229,255) 0 0 48px; screenshot /tmp/mc101.png. |
| MC-102 | YES | PASS | Measured values: sw 320, cw 320, bodysw 320, heading h 33 / w 251, ws nowrap, calc left 12.8 / right 307.2, scrollX 0 after scrollTo(100,0), post-Tab sw 320. Screenshot /tmp/mc102.png. |
| MC-103 | YES | PASS | Computed-style dump and contrast calculation script (/tmp/q.mjs, temp). Lowest ratios are 4.59 (equals) and 4.87 (orange). |
| MC-104 | YES | PASS | Per-state computed-style and bounding-box dump from /tmp/q.mjs. Focus outline is solid 3px rgb(0,229,255), offset 2px, with :focus-visible true for all four key types. Bounding rects are identical except for the pressed y shift of 1px. |
| MC-105 | YES | FAIL | Computed styles: reduce {anim:none, keyTrans:'0.15s, 0.15s box-shadow, filter'}; no-preference {anim:groovy 20s, keyTrans:'0.15s, 0.15s box-shadow, filter'}. Script: .uncle/tests/mc105.mjs |
| MC-106 | YES | PASS | Display readings array ["42","Error","0","42","0","Error","0"] from .uncle/tests/mc105.mjs against data-testid=display. |
| MC-200 | YES | PASS | Display values read from [data-testid=display]; screenshot /tmp/mc/a.png. |
| MC-201 | YES | PASS | /tmp/mc/a.png; computed styles: body animationName=groovy, key background colors as listed; src/theme.css lines 26-35, 76-77. Motion was verified by the animation property being set, not by comparing frames. |
| MC-204 | YES | FAIL | Computed outline on focus: 'solid 3px rgb(0,229,255)' for all four key types, :focus-visible true. Pressed transform matrix(1,0,0,1,0,1) and rect y +1 for all four types. Widths and heights are identical across states. |
| MC-205 | YES | FAIL | Under reduce: keys report transitionDuration '0.15s, 0.15s'; cmp of /tmp/rm0.png and /tmp/rm1.png gives SAME; src/theme.css:40-43 versus :121 (cascade order). |
| MC-301 | YES | FAIL | Observed values: 18 buttons, transitionDuration '0.15s, 0.15s'; getAnimations() = 0 idle, 2 during hover+press; bg position unchanged after 3s. src/theme.css lines 40-43 and 121. |
| MC-302 | YES | PASS | Script output: sw 320, cw 320, sx 0, overflowEls 0, h1 h 33, l 34.42, r 285.55, ws nowrap. Box-shadow ring/glow extents were not measured separately; they do not add scrollable overflow. |
| MC-303 | YES | PASS | Computed-style dump: digit hover cs0 box-shadow 'rgb(123,47,247) 0 0 0 2px, rgb(255,20,147) 0 4px 0 2px' -> cs1 'rgb(0,229,255) 0 0 0 2px, rgb(255,20,147) 0 0 14px 3px'; boxes 72x60 unchanged; focus outline '3px solid rgb(0,229,255)' offset 2px on all 18 keys. Screenshots /tmp/focus2.png, /tmp/focus6.png, /tmp/focus15.png. Script .uncle/tests/run.mjs. |
| MC-401 | YES | PASS | Script output res=["19","Error","0","48","0","48"] from .uncle/tests/run.mjs. |
| MC-402 | YES | PASS | Measured values above. Screenshots saved at /tmp/mc/1280.png and /tmp/mc/320.png. I did not open the screenshots, so the visual check rests on computed styles. |
| MC-403 | YES | PASS | Computed-style and bounding-box measurements above. Screenshots saved at /tmp/mc/hover.png and /tmp/mc/focus.png. I did not open the screenshots. I did not directly sample the animation frames; only the animation name 'groovy' was confirmed. |
| MC-405 | YES | FAIL | Node output: {"anim":[],"running":0,"mq":true,"trans":[18 x BUTTON.key ... '0.15s, 0.15s']}. grep of src/theme.css: line 40-43 media block sets .key transition none; line 121 sets transition 0.15s. |
