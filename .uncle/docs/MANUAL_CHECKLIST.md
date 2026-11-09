# Manual checklist

### MC-101
- Depends on: none
- Exact action: Open the app in a browser with normal motion and watch the page background for about 30 seconds.
- Expected result: A groovy 70s background of concentric rings and a conic swirl in orange, gold, brown, green and cream moves continuously and smoothly, with no visible jump or seam when the loop restarts.
- Actual result: 
- Status: NOT RUN

### MC-102
- Depends on: none
- Exact action: With the app open, enable the OS or browser reduce-motion setting (or emulate prefers-reduced-motion: reduce) without reloading, then toggle it back to no-preference.
- Expected result: With reduce on, the background stops and shows a static gradient. With reduce off, the motion resumes without a reload.
- Actual result: 
- Status: NOT RUN

### MC-103
- Depends on: none
- Exact action: Look at the calculator, display and keys over the animated background, then use the calculator for a few operations (e.g. 12+3=).
- Expected result: The calculator stays on an opaque brown background, so the animation never shows through. Display and key text are readable, key colors and layout look unchanged, and the calculations are correct.
- Actual result: 
- Status: NOT RUN

### MC-200
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app in a normal-motion browser, press several keys (digits, operators, equals, clear) and compute e.g. 12+7= and 9*8=.
- Expected result: Calculator arithmetic, display output and key layout behave exactly as before; no logic regressions.
- Actual result: 
- Status: NOT RUN

### MC-202
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app with browser devtools Network panel visible, reload, and watch requests while the background animates.
- Expected result: Only same-origin localhost requests appear; no external fonts, images or CDN requests, and no console errors.
- Actual result: 
- Status: NOT RUN

### MC-203
- Exclusive resources: none
- Depends on: none
- Exact action: Enable the OS or devtools prefers-reduced-motion: reduce setting, reload, and observe the page for 10 seconds; then switch it back to no-preference without reloading.
- Expected result: Under reduce, the gradient background is static and still visible (not blank); after switching back, the background begins moving again without reload.
- Actual result: 
- Status: NOT RUN

### MC-204
- Exclusive resources: none
- Depends on: none
- Exact action: With normal motion, watch the background through at least one full loop (about 20 seconds), including the loop restart point.
- Expected result: Motion is continuous and smooth with groovy rings and swirl in orange, gold, brown, green and cream, and no visible jump or seam at the loop restart.
- Actual result: 
- Status: NOT RUN

## resources

### MC-301
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the running app in a normal-motion browser and watch the page background for about 30 seconds, including past one full 20s loop.
- Expected result: The groovy 70s background (concentric rings plus conic swirl in orange, gold, brown, green, cream) moves continuously and smoothly, and the loop wraps without a visible jump or seam.
- Evidence to capture: Screen recording or timed screenshots spanning more than 20 seconds, plus a note on smoothness and any seam at the loop point.
- Actual result: 
- Status: NOT RUN

### MC-302
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: With motion allowed, inspect the calculator, display and keys against the animated background while it cycles through its brightest and darkest regions.
- Expected result: The calculator stays an opaque brown panel, the animated background never shows through it, and display and key text remain clearly readable (at least WCAG AA 4.5:1 against its own background). Key colors and layout match the existing look.
- Evidence to capture: Two or more screenshots at different animation phases showing the full calculator, with readability notes.
- Actual result: 
- Status: NOT RUN

### MC-303
- Required for acceptance: YES
- Exclusive resources: browser:system
- Depends on: none
- Exact action: Turn on the OS or browser reduce-motion setting and reload the page, then watch for 10 seconds. Toggle the setting back off without reloading and watch again.
- Expected result: With reduce motion on, the gradient background is static and does not move. After switching it off, the background starts animating without a reload.
- Evidence to capture: Two screenshots about 5 seconds apart under reduce-motion, showing they are identical, plus a note or recording showing motion resuming after the toggle.
- Actual result: 
- Status: NOT RUN

### MC-304
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator while the background animates: click keys and type with the keyboard to run a few calculations (for example 12+7=, then clear).
- Expected result: Calculator math, key presses and display updates work as before. The animation causes no flicker, lag or layout shift, and the page makes no visible requests for external resources.
- Evidence to capture: Screenshot of the display showing a correct result during animation, plus a note on responsiveness and any flicker.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-401
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the app with normal motion and use the mouse to enter and evaluate several calculations (e.g. 12+7=, 9*8=, clear, decimals, negative numbers).
- Expected result: Every calculation gives the same correct result as before; display updates and clear work normally while the background animates.
- Evidence to capture: Screenshot or notes of inputs with displayed results.
- Actual result: 
- Status: NOT RUN

### MC-402
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Type calculations on the physical keyboard (digits, operators, Enter, Backspace, Escape) with the page focused.
- Expected result: Keyboard input behaves as before: digits and operators register, Enter evaluates, Backspace and Escape edit and clear.
- Evidence to capture: Notes or screenshot of keystrokes and display results.
- Actual result: 
- Status: NOT RUN

### MC-404
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Watch the page background for about 30 seconds at normal motion, including across one loop boundary of the 20s cycle.
- Expected result: Background moves continuously and smoothly with 70s-style rings and swirl, with no visible jump, flicker, or seam at loop restart, and no stutter in calculator interaction.
- Evidence to capture: Short screen recording or notes on smoothness and the loop seam.
- Actual result: 
- Status: NOT RUN

### MC-405
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Enable the OS or browser reduce-motion setting, reload the page, then turn it off again without reloading and watch the page.
- Expected result: With reduce on, the background is static at its base position and the calculator still works; turning it off starts the animation live without a reload.
- Evidence to capture: Screenshots of the static state and the moving state, with notes on the setting toggle.
- Actual result: 
- Status: NOT RUN

### MC-406
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Load the app, resize the window to narrow and wide sizes, scroll if possible, and check the browser console and network panel.
- Expected result: The background fills the viewport at all sizes with no blank or tiled gaps and the layout is unchanged. There are no console errors and no non-localhost requests for images, fonts, or styles.
- Evidence to capture: Screenshots at two sizes plus the console and network panel observations.
- Actual result: 
- Status: NOT RUN
