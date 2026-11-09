# Manual checklist

## Coverage: AC-1 look

### MC-101
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app at 1280px wide and look at the page, calculator, keys and heading. Take a screenshot.
- Expected result: The look is clearly 1960s psychedelic: vivid accents (magenta, cyan, violet, lime), a swirling animated gradient background, and bold, high-contrast keys with a glowing ring on the calculator.
- Actual result: 
- Status: NOT RUN

## Coverage: AC-3 320px

### MC-102
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Set the viewport to 320px wide and view the page. Check the heading and calculator, and try to scroll sideways.
- Expected result: The heading 'Groovy Calculator!' stays on one line. The calculator sits fully inside the viewport. There is no horizontal scrollbar, even with the borders, ring and glows.
- Actual result: 
- Status: NOT RUN

## Coverage: AC-4 legibility

### MC-103
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Look at every key variant (digit, operator, equals, clear, orange), the display and the heading, in the default state. Use a colour picker or devtools on the worst gradient spot under each label to check contrast.
- Expected result: Key labels and display text are at least 4.5:1 against the worst gradient stop under the text. The orange key meets 4.5:1, or is explicitly waived at 3:1. The display glow does not hurt legibility.
- Actual result: 
- Status: NOT RUN

## Coverage: SB-4 states

### MC-104
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Hover each key type, then Tab to focus keys with the keyboard, then press and hold a key. Compare against the key's default state.
- Expected result: Hover, focus-visible and pressed states are visibly distinct. Focus shows an outline of at least 2px that is clearly visible. The key does not change size or shift position. Contrast stays at least 4.5:1 in hover and focus.
- Actual result: 
- Status: NOT RUN

## Coverage: SI-3 reduced motion

### MC-105
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Emulate prefers-reduced-motion: reduce in the browser and reload. Watch the background and hover over the keys.
- Expected result: The background animation is stopped and key hover or focus changes do not animate. With reduced motion off, the background swirls.
- Actual result: 
- Status: NOT RUN

## Coverage: AC-2 behaviour

### MC-106
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator by clicking and by keyboard. Enter 12+30=, then 7/0=, then press Clear.
- Expected result: The results are 42, then the Error state, then a cleared display. Behaviour is the same as before the restyle.
- Actual result: 
- Status: NOT RUN

## Invariants

### MC-200
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app at 1280px width and use mouse and keyboard to perform several calculations (e.g. 12+7=, 9/0=, clear, decimals). Compare results with expected arithmetic and Error behavior.
- Expected result: All results are identical to the pre-restyle behavior: correct arithmetic, Error state on divide by zero, clear works, keyboard input works.
- Evidence to capture: Screenshots of display after each calculation and a note of inputs versus outputs.
- Actual result: 
- Status: NOT RUN

### MC-201
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Load the app at 1280px and view the whole page, including the heading, body background, calculator body, display and all key types, over several seconds.
- Expected result: The look is clearly 1960s psychedelic: vivid saturated magenta/cyan/violet/lime accents, an animated swirling gradient background, a rainbow ring on the calculator, bold contrasting keys; the original gold/green/orange/cream/brown colors are still present on keys, display and calculator.
- Evidence to capture: Full-page screenshot at 1280px plus a short note on the animation and accents seen.
- Actual result: 
- Status: NOT RUN

### MC-204
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Hover each key type, Tab through the keys, and press and hold a key with the mouse, watching key size and neighboring layout.
- Expected result: Hover, focus-visible and pressed states are visibly distinct, using glow, outline or filter. The focus outline is at least 2px and clearly visible against adjacent colors. The key's fill color, text color, size and position do not change and nothing shifts.
- Evidence to capture: Screenshots of hover, focus-visible and pressed states for at least two key types.
- Actual result: 
- Status: NOT RUN

### MC-205
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Emulate prefers-reduced-motion: reduce in browser dev tools, reload, then hover and focus keys and watch the background.
- Expected result: The background swirl is static, and hover and focus changes apply instantly with no animation or transition.
- Evidence to capture: Note of observed motion, or screenshots taken a few seconds apart showing an identical background.
- Actual result: 
- Status: NOT RUN

## Resources

### MC-301
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app in a browser with prefers-reduced-motion: reduce emulated. Watch the page background, then hover and click several keys.
- Expected result: The body background does not animate, and hovering or pressing keys causes no transitions or animations.
- Evidence to capture: Screenshots or a short note comparing two views of the page a few seconds apart under reduced motion, plus a note on the hover/press behavior.
- Actual result: 
- Status: NOT RUN

### MC-302
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Set the viewport to 320px wide. Load the app and look for a horizontal scrollbar. Scroll sideways, and check the heading and the calculator's borders, ring and glows.
- Expected result: There is no horizontal scroll. The heading 'Groovy Calculator!' stays on one line, and the calculator, with its borders and ring, sits fully inside the viewport.
- Evidence to capture: A 320px full-page screenshot and a note on whether any horizontal scroll or clipping appeared.
- Actual result: 
- Status: NOT RUN

### MC-303
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: At 1280px, with motion allowed, hover over each key type (digit, operator, equals, clear). Then Tab to the keys one at a time.
- Expected result: Each key shows a visible hover effect with no size or layout shift. The keyboard focus ring is clearly visible, at least 2px, and contrasts with its surroundings. Key labels stay legible in the default, hover and focus states.
- Evidence to capture: Screenshots of the default, hover and focus-visible states for at least one digit key, one operator key and the orange key, with a note on label legibility.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-401
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app at 1280px wide. Use the mouse to enter 12 + 7 = , then 9 ÷ 0 =, then press C. Then type 8 * 6 Enter on the keyboard and press Escape or Backspace.
- Expected result: Results are 19, then the Error state, then cleared display. The keyboard gives 48. Behavior matches the pre-restyle calculator in every case.
- Evidence to capture: Screenshots of the display after each step, plus a short note of the inputs and outputs.
- Actual result: 
- Status: NOT RUN

### MC-402
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Load the app at 1280px and view the heading 'Groovy Calculator!'. Resize to 320px wide and check for horizontal scrolling, including when a key is focused with Tab.
- Expected result: The heading stays on one line and is gold with a brown outline. There is no horizontal scrollbar at 320px, and the calculator, borders, ring and glows all stay inside the viewport.
- Evidence to capture: Screenshots at 1280px and 320px, and a note on whether a horizontal scrollbar appeared.
- Actual result: 
- Status: NOT RUN

### MC-403
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Look at the page at default viewport. Hover the mouse over each key type (digit, operator, equals, clear) and Tab through keys to see focus-visible.
- Expected result: The page is clearly psychedelic, with vivid magenta, cyan and violet accents and a swirling animated background. Keys keep their gold, green, orange and cream backgrounds. Hover and focus show a visible effect, a focus outline of at least 2px, and no key size or layout shift.
- Evidence to capture: Screenshots of the default view, a hovered key and a focused key.
- Actual result: 
- Status: NOT RUN

### MC-405
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Emulate prefers-reduced-motion: reduce in browser devtools. Reload, then hover and focus keys and watch the background.
- Expected result: The background does not animate and hover or focus changes appear instantly with no transitions. The calculator still works.
- Evidence to capture: A note or short recording showing a static background and instant hover and focus changes.
- Actual result: 
- Status: NOT RUN
