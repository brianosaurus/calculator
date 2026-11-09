# Manual checklist

### MC-101
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app at a default desktop viewport and look at the page.
- Expected result: A visible heading reading exactly "Groovy" appears above the calculator card, horizontally centered over it, in a bold rounded retro font in gold with a dark outline and orange glow.
- Actual result: 
- Status: NOT RUN

### MC-102
- Exclusive resources: none
- Depends on: none
- Exact action: Watch the animated background across a full cycle, capturing screenshots at roughly 0%, 50% and 100% of the cycle.
- Expected result: The Groovy title is readable against the background in all three screenshots, and the background animation and calculator centering look unchanged.
- Actual result: 
- Status: NOT RUN

### MC-103
- Exclusive resources: none
- Depends on: none
- Exact action: Resize the viewport to 320x640 and view the page, then scroll horizontally.
- Expected result: The title stays on a single line, is no wider than the card, stays centered over it, and there is no horizontal scrollbar or clipping.
- Actual result: 
- Status: NOT RUN

### MC-104
- Exclusive resources: none
- Depends on: none
- Exact action: Set the viewport to 1280x300 and scroll the page from top to bottom.
- Expected result: The title is not clipped at the top, and scrolling vertically reveals the whole calculator including the bottom row of keys.
- Actual result: 
- Status: NOT RUN

### MC-105
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator by clicking keys (e.g. 12 + 7 =) and typing on the keyboard (e.g. 8 * 3 Enter), including a long number so the display font shrinks.
- Expected result: Results are correct (19 and 24), the display updates normally, the font shrinks for long input, and the title remains in place and unchanged.
- Actual result: 
- Status: NOT RUN

### MC-201
- Exact action: Open the app at the default desktop viewport and use the mouse to enter 12 + 7 = then 9 x 3 =, and clear; also type 5 * 4 Enter on the keyboard.
- Expected result: Display shows 19, then 27, then cleared; keyboard entry yields 20. Calculator arithmetic and display updates behave exactly as before the Groovy heading was added.
- Evidence to capture: Screenshots of the display after each result and a note of values observed.
- Actual result: 
- Status: NOT RUN

### MC-202
- Exact action: Enter a long number (about 12+ digits) via keys and watch the display text size at each length.
- Expected result: The display font still shrinks stepwise as text grows (approx 2.6, 2, 1.6rem) and text remains inside the display; the Groovy heading is unaffected.
- Evidence to capture: Screenshots at short, medium and long input lengths.
- Actual result: 
- Status: NOT RUN

### MC-203
- Exact action: Open the app at a desktop viewport and inspect the page visually for several seconds.
- Expected result: The animated multi-color 70s background still animates unchanged, and the Groovy heading plus calculator card are centered together as a group horizontally and vertically, with the card keeping its brown themed styling.
- Evidence to capture: Two screenshots a few seconds apart showing the background changing and the group centered.
- Actual result: 
- Status: NOT RUN

### MC-204
- Exact action: Set the viewport to 320x640 and view the page; try scrolling horizontally and operate a few calculator keys.
- Expected result: No horizontal scrollbar or sideways scrolling, the word Groovy fits on one line within the card width and is centered above the calculator, and keys remain usable.
- Evidence to capture: Screenshot at 320x640 and a note whether horizontal scroll was possible.
- Actual result: 
- Status: NOT RUN

### MC-205
- Exact action: Set the viewport to a short landscape size such as 1280x300 and scroll vertically through the page.
- Expected result: The Groovy heading is fully visible at the top of the page (not clipped above the fold), and scrolling reveals the entire calculator including the bottom row of keys.
- Evidence to capture: Screenshots at scroll top and scroll bottom.
- Actual result: 
- Status: NOT RUN

### MC-206
- Exact action: Look at the heading with the animated background at roughly the start, middle and end of its cycle (take three screenshots spaced across the cycle).
- Expected result: The gold Groovy heading with dark brown outline and orange glow, in the theme's rounded font, is readable in all three screenshots and sits above (not inside) the brown calculator card.
- Evidence to capture: Three screenshots with the approximate time offsets and a readability pass/fail note.
- Actual result: 
- Status: NOT RUN

### MC-301
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app in a browser at a default desktop viewport and look at the page without interacting.
- Expected result: A bold, gold "Groovy" heading in the theme's rounded retro font appears centered directly above the brown calculator card, with a dark outline and orange glow, and the animated background is unchanged.
- Actual result: 
- Status: NOT RUN

### MC-302
- Exclusive resources: none
- Depends on: none
- Exact action: Capture three screenshots of the page at about 0%, 50% and 100% of the background animation cycle, with the viewport unchanged.
- Expected result: The "Groovy" title is readable against the background in all three screenshots.
- Actual result: 
- Status: NOT RUN

### MC-303
- Exclusive resources: none
- Depends on: none
- Exact action: Resize the browser to 320x640 and view the page, then scroll horizontally.
- Expected result: The title stays on one line, is not clipped, is centered over the card, and the page has no horizontal scrollbar.
- Actual result: 
- Status: NOT RUN

### MC-304
- Exclusive resources: none
- Depends on: none
- Exact action: Resize the browser to a short viewport (about 1280x300) and scroll vertically from top to bottom.
- Expected result: The title is fully visible at the top, the page scrolls vertically, and the whole calculator can be reached with nothing clipped.
- Actual result: 
- Status: NOT RUN

### MC-305
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator by clicking keys and typing on the keyboard, e.g. 12 + 7 = and a long number entry.
- Expected result: Arithmetic gives correct results, the display updates and shrinks its font as before, and the heading does not move or interfere.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-400
- Required for acceptance: YES
- Exact action: Open the app in a browser at default desktop size and use the mouse to compute 12 + 7 = then 9 x 3 =, then use the keyboard to enter 8 / 2 Enter, and type a very long number so the display text grows.
- Expected result: Each result is correct (19, 27, 4), the display updates, and the font shrinks for long input exactly as before the change.
- Evidence to capture: Screenshots of the display after each calculation and after the long entry, with the observed values.
- Actual result: 
- Status: NOT RUN

### MC-401
- Required for acceptance: YES
- Exact action: Load the app at default desktop size and watch the page background for about 10 seconds; look at the Groovy title and calculator together.
- Expected result: The multi-color animated background still moves smoothly, and the title plus calculator card are centered together as a group with the card styling (brown card, buttons) unchanged.
- Evidence to capture: Two screenshots several seconds apart showing the background changed and the group stayed centered.
- Actual result: 
- Status: NOT RUN

### MC-402
- Required for acceptance: YES
- Exact action: Resize the browser viewport to 320x640 and look at the page, trying to scroll sideways; then use a few calculator keys.
- Expected result: No horizontal scrollbar or sideways scrolling appears, the Groovy title is on one line and not wider than the card, and the keys still work.
- Evidence to capture: Screenshot at 320x640 and a note on whether horizontal scrolling was possible.
- Actual result: 
- Status: NOT RUN

### MC-403
- Required for acceptance: YES
- Exact action: Resize the viewport to a short landscape size such as 1280x300 and scroll the page vertically from top to bottom.
- Expected result: The Groovy title is fully visible at the top, nothing is clipped, and scrolling reveals the whole calculator including the bottom row of keys, which stay clickable.
- Evidence to capture: Screenshots at scroll top and scroll bottom.
- Actual result: 
- Status: NOT RUN
