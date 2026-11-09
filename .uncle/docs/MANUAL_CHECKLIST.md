# Manual checklist

## Coverage

### MC-102
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Look at the heading on the page and judge its font, color and centering. Compare with the earlier "Groovy" look described in the baseline: styled font and color, centered above the calculator.
- Expected result: The heading keeps the same font, color and horizontal centering above the calculator. Only the three trailing periods are new.
- Evidence to capture: Screenshot of the heading region and a short note on the font, color and centering.
- Actual result: 
- Status: NOT RUN

### MC-103
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Use the calculator by clicking buttons to compute 7 x 6, then type 12+3 and press Enter on the keyboard.
- Expected result: The results are 42 and 15, and the heading still shows "Groovy..." unchanged.
- Evidence to capture: Screenshot of the display showing each result.
- Actual result: 
- Status: NOT RUN

## invariants

### MC-200
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open the running application in a browser and look at the heading above the calculator; compare its font, color, size and horizontal centering with the previously known look (same decorative font, same color, centered over the calculator).
- Expected result: The heading reads "Groovy..." with the same font, color and centering as before; only the three trailing periods are new, with no space before them, and the heading remains a visible level-1 heading above the calculator.
- Evidence to capture: Screenshot of the page header showing the heading text and styling.
- Actual result: 
- Status: NOT RUN

### MC-201
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: In the running application, click the calculator keys to compute 7 + 5 = and then press keyboard keys to compute 9 * 3 Enter, then clear.
- Expected result: The display shows 12 and then 27, and clearing resets it; arithmetic and keyboard input behave exactly as before the heading change.
- Evidence to capture: Screenshot or written note of the display values after each calculation and after clear.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-402
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: In the loaded app, use the calculator with mouse and keyboard: enter 12 + 7 = and then 9 x 6 =, and clear.
- Expected result: Results are 19 and 54, keyboard input works, and clear resets the display. The heading change does not affect the layout or behavior of the calculator.
- Evidence to capture: Screenshot of the display after each calculation and a note of the results.
- Actual result: 
- Status: NOT RUN
