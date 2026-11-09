## AR-001: AC-3 requires a warm color of 'gold/cream/orange' but the plan chooses --gold and a 'cream-free' glow, and AC-3's test o

- Severity: HIGH
- References: CHANGE_SPEC AC-3 vs CHANGE_PLAN s1 ('--gold fill ... cream-free warm glow') and AC-3 verification ('color is not brown').
- Failure: AC-3 requires a warm color of 'gold/cream/orange' but the plan chooses --gold and a 'cream-free' glow, and AC-3's test only checks 'color is not brown'. The color rule is ambiguous and the test can't confirm it. Plan sentence: 'The title color is exactly var(--gold); the test asserts computed color equals the resolved --gold value, and cream is not used.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-002: The 320px no-overflow requirement conflicts with the plan's scope cut allowing it to be skipped if flaky, so AC-4 is bot

- Severity: HIGH
- References: CHANGE_SPEC AC-4 and §7 (320px must not overflow) vs CHANGE_PLAN §21 'Skip the 320px overflow check if flaky'.
- Failure: The 320px no-overflow requirement conflicts with the plan's scope cut allowing it to be skipped if flaky, so AC-4 is both mandatory and optional. Plan sentence: 'The 320px overflow check is mandatory and not skippable; if it fails, fix the CSS.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-003: The width of .app and the title's wrapping behavior at 320px are unspecified.

- Severity: MEDIUM
- References: CHANGE_PLAN §10 'min(92vw, 360px)-compatible'; the spec AC-2 centering test is silent on title width.
- Failure: The width of .app and the title's wrapping behavior at 320px are unspecified. The plan says 'min(92vw, 360px)-compatible' and the title clamp is 2.5rem to 4rem. 'Groovy' may overflow or wrap, and it is unclear whether the title is capped to the card width. Plan sentence: '.app has width min(92vw,360px); the title is on a single line (white-space:nowrap) and its width never exceeds .app.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-004: The viewport height case is unspecified.

- Severity: MEDIUM
- References: CHANGE_PLAN §1 and §3 ('body centering ... centered as a group'); the spec only covers horizontal overflow (AC-4).
- Failure: The viewport height case is unspecified. Adding the h1 and a gap to a body that vertically centers the card may push the group off-screen or clip it on short viewports, and there's no statement on scrolling or on the title being cut off above the fold. Plan sentence: 'On viewports shorter than the group, the page scrolls and neither the title nor the calculator is clipped.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-005: The AC-3 'dark text-shadow or outline' check is only 'non-empty text-shadow', and the legibility claim relies on an assu

- Severity: MEDIUM
- References: CHANGE_SPEC AC-3 verification and §15 assumption vs CHANGE_PLAN §1 (outline plus warm glow).
- Failure: The AC-3 'dark text-shadow or outline' check is only 'non-empty text-shadow', and the legibility claim relies on an assumption. The plan does not say what happens if the text-shadow color is not --brown, or whether the glow counts. Plan sentence: 'text-shadow must include a --brown layer; the test asserts the computed text-shadow contains the resolved --brown color.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-006: The rollback and file lists conflict: §14 says 'Revert the three files', while R-2 allows only Calculator.jsx and CSS ed

- Severity: LOW
- References: CHANGE_PLAN §14 and R-2 vs the change-impact table, which lists three files including a test file.
- Failure: The rollback and file lists conflict: §14 says 'Revert the three files', while R-2 allows only Calculator.jsx and CSS edits and §5 forbids other changes. Test file edits appear to be counted ambiguously. Plan sentence: 'The three files are Calculator.jsx, theme.css and theme.spec.js; the existing display/data-key hooks must remain on .calculator descendants.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-007: Plan wraps .calculator in div.app but never says whether existing body/.calculator CSS (centering, width, margins) still

- Severity: HIGH
- References: CHANGE_PLAN s1, s8, s19 (Risks); CHANGE_SPEC S4.
- Failure: Plan wraps .calculator in div.app but never says whether existing body/.calculator CSS (centering, width, margins) still applies. Settle: 'body keeps flex centering with .app as its sole child; .calculator CSS is unchanged.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-008: Spec S4 says the calculator stays centered, but the title shifts the card down; no tolerance is given for existing tests

- Severity: MEDIUM
- References: CHANGE_SPEC S4 vs CHANGE_PLAN s5 forbidding edits to other e2e specs.
- Failure: Spec S4 says the calculator stays centered, but the title shifts the card down; no tolerance is given for existing tests. Settle: 'The group is centered; any existing e2e assertion on absolute calculator position is updated in theme.spec.js only.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-009: Short or landscape viewports: title plus card may exceed viewport height with overflow unspecified, so the top could be

- Severity: MEDIUM
- References: CHANGE_PLAN s8 and CHANGE_SPEC s7 cover only width.
- Failure: Short or landscape viewports: title plus card may exceed viewport height with overflow unspecified, so the top could be clipped. Settle: 'Below group height the page scrolls vertically and no content is clipped.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-010: The 320px overflow check is cut as 'skip if flaky' though it is the sole width verification for AC-4; the width 'min(92v

- Severity: MEDIUM
- References: CHANGE_PLAN s21 vs CHANGE_SPEC AC-4; s8.
- Failure: The 320px overflow check is cut as 'skip if flaky' though it is the sole width verification for AC-4; the width 'min(92vw,360px)-compatible' is ambiguous. Settle: 'The 320px check is mandatory; .app is no narrower than the existing .calculator width.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-011: 'Cream-free glow' conflicts with the spec's allowed 'gold/cream/orange'.

- Severity: LOW
- References: CHANGE_PLAN s1 vs CHANGE_SPEC AC-3.
- Failure: 'Cream-free glow' conflicts with the spec's allowed 'gold/cream/orange'. Settle: 'Title fill is --gold; glow is orange.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-012: Plan has two readings on 320px overflow check: AC-4 requires it, but plan section 21 lets it be skipped if flaky.

- Severity: LOW
- References: CHANGE_SPEC AC-4 requires a 320px scrollWidth check; CHANGE_PLAN section 21 says 'Skip the 320px overflow check if flaky'.
- Failure: Plan has two readings on 320px overflow check: AC-4 requires it, but plan section 21 lets it be skipped if flaky. This is a verification gap, not a security flaw. Settle it with: 'The 320px overflow check is mandatory and may not be skipped; fix the flake instead.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-013: AC-3 says the heading color must be a warm palette color and 'not brown', but the plan sets fill to --gold and does not

- Severity: HIGH
- References: CHANGE_SPEC AC-3 ('color is not brown'); CHANGE_PLAN s1.1 (--gold fill, --brown shadow).
- Failure: AC-3 says the heading color must be a warm palette color and 'not brown', but the plan sets fill to --gold and does not say how the test identifies it. Without an exact assertion, the code and the test can disagree. Settle it with: 'The test asserts computed color equals the resolved value of --gold (rgb of the palette var), and text-shadow contains the --brown color.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-014: The plan's scope-cuts section lets the 320px overflow check be skipped 'if flaky', but AC-4 requires it and the spec say

- Severity: HIGH
- References: CHANGE_PLAN section 21 (skip 320px check) against CHANGE_SPEC AC-4 and section 7.
- Failure: The plan's scope-cuts section lets the 320px overflow check be skipped 'if flaky', but AC-4 requires it and the spec says narrow viewports must not overflow. The two statements cannot both hold. Settle it with: 'The 320px overflow check is mandatory and may not be skipped; fix flakiness by waiting for layout to settle.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-015: AC-2 centering is checked within 2px, but the plan never says at which viewport widths or whether the animated backgroun

- Severity: MEDIUM
- References: CHANGE_SPEC AC-2 (2px tolerance); CHANGE_PLAN section 10 (clamp and min(92vw,360px) widths).
- Failure: AC-2 centering is checked within 2px, but the plan never says at which viewport widths or whether the animated background can shift the boxes. Settle it with: 'Check AC-2 at the default viewport and at 320px, using bounding boxes read after the page has loaded.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-016: AC-4 says 'scrollWidth <= clientWidth' without naming the element: document, body or .app.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-4 verification; CHANGE_PLAN section 16.
- Failure: AC-4 says 'scrollWidth <= clientWidth' without naming the element: document, body or .app. A hidden overflow on .app would pass if the wrong element is measured. Settle it with: 'Assert document.documentElement.scrollWidth <= clientWidth at a 320x640 viewport.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-017: The legibility requirement is only manual ('across the animation cycle'), with no stated automated check, pass criterion

- Severity: MEDIUM
- References: CHANGE_PLAN section 18; CHANGE_SPEC AC-3 ('manual visual check').
- Failure: The legibility requirement is only manual ('across the animation cycle'), with no stated automated check, pass criterion, or number of animation phases to sample. Settle it with: 'Manual check records screenshots at 0%, 50% and 100% of the animation cycle and passes if the title is readable in each.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-018: The plan says 'theme font stack' but gives the test no expected font-family string, and the clamp title size is never as

- Severity: LOW
- References: CHANGE_SPEC AC-3; CHANGE_PLAN section 10 (clamp(2.5rem,12vw,4rem)).
- Failure: The plan says 'theme font stack' but gives the test no expected font-family string, and the clamp title size is never asserted. Settle it with: 'The test asserts the title's computed font-family equals that of .calculator and that its font-size is between 40px and 64px.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## Overall assessment

Review findings require disposition.
