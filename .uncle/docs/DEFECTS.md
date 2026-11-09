# Defects

## None

- **Status:** BLOCKED-HUMAN
- **Evidence:** No live observation was recorded. No driver or automated result was cited as covering this row.
- **Expected result:** Motion is continuous and smooth with groovy rings and swirl in orange, gold, brown, green and cream, and no visible jump or seam at the loop restart.
- **Actual result:** Not observed. Whether the motion is smooth, whether the colours look right, and whether the loop restart shows a seam are human visual judgments over about 20 seconds. I did not make them and did not infer them from other results.

## None filed; C/backspace (3.85:1) and = (4.08:1) key text contrast below 4.5:1 (pre-existing key colors, unchanged by this work)

- **Status:** FAIL
- **Evidence:** Computed-style contrast table from .uncle/tests/mc302.mjs; screenshots /tmp/mc302a.png and /tmp/mc302b.png; git diff HEAD of src/theme.css shows only body background/animation changed, key colors pre-existing.
- **Expected result:** Calculator stays an opaque brown panel, background never shows through, display/key text readable at >=4.5:1 against own background, key colors and layout match existing look.
- **Actual result:** Calculator panel background is opaque rgb(59,35,20) (brown), opacity 1; display cream on its bg. Key colors and layout unchanged from HEAD (.key-op gold/brown, .key-equals green/cream, .key-clear orange/cream are not in the diff). Measured contrast: digit keys 13.05:1, operator keys 7.09:1, display text passes, BUT clear (C) and backspace keys (cream on orange) = 3.85:1 and equals (cream on green) = 4.08:1, both below the 4.5:1 AA threshold stated in the expected result.

## None

- **Status:** BLOCKED-HUMAN
- **Evidence:** None. No screen recording or notes were captured.
- **Expected result:** Background moves continuously and smoothly with 70s-style rings and swirl, with no visible jump, flicker, or seam at loop restart, and no stutter in calculator interaction.
- **Actual result:** Not observed. A scripted check cannot judge perceived smoothness or a loop-restart seam, so no PASS is claimed.
