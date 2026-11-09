# Manual checklist

## Coverage

### MC-101
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the running app in a browser and look at the page heading above the calculator.
- Expected result: The single level-1 heading reads exactly 'Groovy Calculator!' with no trailing '...' and the old text 'Groovy...' appears nowhere on the page.
- Evidence to capture: Screenshot of the loaded page showing the heading, plus the heading's text as read from the page.
- Actual result: 
- Status: NOT RUN

### MC-103
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Resize the browser to a narrow mobile width (about 375px) and view the heading and calculator.
- Expected result: The heading 'Groovy Calculator!' stays fully visible and centered, does not clip or cause horizontal scrolling, and the calculator layout is unchanged.
- Evidence to capture: Screenshot at narrow width showing the heading and calculator.
- Actual result: 
- Status: NOT RUN

### MC-104
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator: enter 7 + 5 and press equals, then press clear; also switch the theme if a theme control exists.
- Expected result: The calculator computes 12, clears correctly, and any theme switch works, with the heading text remaining 'Groovy Calculator!' and styled consistently throughout.
- Evidence to capture: Screenshot after the calculation showing the result 12 and the heading, plus a note on theme behavior.
- Actual result: 
- Status: NOT RUN

## Invariants

### MC-200
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the running app in a browser at desktop width and look at the heading above the calculator, comparing its font, color, size and horizontal centering against the calculator body.
- Expected result: The heading reads exactly 'Groovy Calculator!', is horizontally centered above the calculator, and keeps the same themed font and color styling as before the text change, with no wrapping, clipping or overflow.
- Evidence to capture: Screenshot of the full page showing the heading and calculator, plus a note of the visible heading text.
- Actual result: 
- Status: NOT RUN

### MC-201
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Narrow the browser viewport to a phone width (about 375px) and reload, then view the heading and calculator layout.
- Expected result: The heading 'Groovy Calculator!' remains centered and fully visible above the calculator without horizontal scrolling or layout breakage.
- Evidence to capture: Screenshot at 375px width showing the heading and calculator.
- Actual result: 
- Status: NOT RUN

### MC-202
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: In the app, perform a few calculations by clicking buttons (for example 12 + 7 =, then clear) and toggle any theme control if present.
- Expected result: Calculator arithmetic, clear and theme behavior work as before, and the heading text stays 'Groovy Calculator!' throughout.
- Evidence to capture: Screenshot of the displayed result (19) and the heading after the interactions, with notes on any anomalies.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-402
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator: enter 7 + 5 = and then clear; try a multi-digit and decimal operation such as 1.5 * 4 =.
- Expected result: Results are 12 and 6, and clear resets the display; calculator behavior is unaffected by the heading change.
- Evidence to capture: Screenshot or notes of display values after each operation.
- Actual result: 
- Status: NOT RUN
