## AR-001: AC-4/SI-2 require contrast >= 4.5:1 on key text, but the plan keeps the existing orange key (#CC5500 vs cream, ~4.2:1).

- Severity: HIGH
- References: CHANGE_PLAN s4.1 states orange #CC5500 vs cream ~4.2 is existing and kept; CHANGE_SPEC AC-4 and SI-2 require >= 4.5:1 for key text.
- Failure: AC-4/SI-2 require contrast >= 4.5:1 on key text, but the plan keeps the existing orange key (#CC5500 vs cream, ~4.2:1). Both cannot hold. Plan should say: 'Orange key text or background is changed so contrast is >= 4.5:1 while T-9 computed colors still pass; if T-9 pins both, AC-4 is amended to exempt the orange key.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-002: Contrast is only checked manually on 'computed colors', so gradient layers, text-shadow glows and hover/focus states are

- Severity: MEDIUM
- References: CHANGE_SPEC AC-4 verification is 'Manual contrast check of computed colors'; plan adds key background-image gradients and a display text-shadow glow (s1.1).
- Failure: Contrast is only checked manually on 'computed colors', so gradient layers, text-shadow glows and hover/focus states are not covered. Plan should say: 'Contrast is measured against the worst-case pixel of the gradient under the text, and also in hover and focus-visible states; the display glow must not reduce legibility.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-003: SB-4 hover/focus-visible styling is unspecified for disabled keys, the pressed state, and the focus indicator, and wheth

- Severity: MEDIUM
- References: CHANGE_SPEC SB-4 says only 'Visible hover and focus-visible styling'; plan step 1 says 'add hover/focus-visible styles' with no state detail.
- Failure: SB-4 hover/focus-visible styling is unspecified for disabled keys, the pressed state, and the focus indicator, and whether it may shift layout. Plan should say: 'Hover and focus-visible change only color, shadow or outline, with no size or layout shift; the focus outline has >= 3:1 contrast; disabled and active states follow the same rules.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-004: AC-3 requires no horizontal overflow at 320px, but the plan adds thick borders, a rainbow ring and glow shadows with no

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 adds thick borders, a rainbow ring and glow box-shadows; AC-3 verification is the theme.spec.js heading checks, which may not cover calculator overflow.
- Failure: AC-3 requires no horizontal overflow at 320px, but the plan adds thick borders, a rainbow ring and glow shadows with no sizing rule. Plan should say: 'Borders and rings are drawn inside the existing box (box-sizing: border-box, no added width), and glow shadows may not cause horizontal scroll at 320px.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-005: SI-3 (reduced motion) is retained, but the plan never says whether new effects such as hover transitions or added animat

- Severity: LOW
- References: CHANGE_SPEC SI-3 covers 'body' only; CHANGE_PLAN s5.1 says 'reduced-motion rule retained' while step 1 adds hover styles.
- Failure: SI-3 (reduced motion) is retained, but the plan never says whether new effects such as hover transitions or added animation must also respect prefers-reduced-motion. Plan should say: 'All new transitions and animations are disabled under prefers-reduced-motion: reduce.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-006: Contrast requirement conflicts with the retained orange key.

- Severity: HIGH
- References: CHANGE_PLAN s4.1 (orange #CC5500 vs cream ~4.2, keep as is) vs CHANGE_SPEC AC-4 and SI-2 (>=4.5:1, no RELAXED invariants).
- Failure: Contrast requirement conflicts with the retained orange key. AC-4/SI-2 demand >=4.5:1 on key text, but the plan keeps cream on #CC5500 at ~4.2. Settle with: 'The orange key must be changed to reach >=4.5:1 while theme tests still pass; otherwise AC-4 is recorded as RELAXED for that key.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-007: Contrast on keys and display is unspecified under gradient layers and text-shadow glow.

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 (layered background-image on keys, text-shadow glow); AC-4 verifies 'computed colors' only.
- Failure: Contrast on keys and display is unspecified under gradient layers and text-shadow glow. Gradients can lower effective contrast while computed background-color stays unchanged. Settle with: 'Contrast is measured against the worst gradient stop under each label and the display text, and must be >=4.5:1.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-008: Hover and focus-visible states are unspecified.

- Severity: MEDIUM
- References: CHANGE_SPEC SB-4 (verification 'Manual'); CHANGE_PLAN s11 step 1.
- Failure: Hover and focus-visible states are unspecified. They could change key background-color or size, breaking computed-color tests or shifting layout at 320px. Settle with: 'Hover/focus-visible styles change only box-shadow, outline, background-image and filter, never background-color, color, size or border width.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-009: The rainbow border ring and thick key borders could enlarge box dimensions and overflow at 320px, and the plan doesn't s

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 (thick borders, rainbow gradient ring); AC-3 checks only the heading.
- Failure: The rainbow border ring and thick key borders could enlarge box dimensions and overflow at 320px, and the plan doesn't say they must fit. Settle with: 'Borders and rings must not increase outer width; use box-sizing:border-box, and scrollWidth must be <= clientWidth at 320px.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-010: Reduced-motion behavior is unspecified for any new animation or hover transitions, since SI-3 covers only body.

- Severity: LOW
- References: CHANGE_SPEC SI-3 (scope: body); CHANGE_PLAN s5.1.
- Failure: Reduced-motion behavior is unspecified for any new animation or hover transitions, since SI-3 covers only body. Settle with: 'Any new animation or transition is disabled under prefers-reduced-motion.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-011: The plan forbids external requests only for web fonts.

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 D-2 ("no web fonts (T-9 forbids external requests)") and CHANGE_SPEC section 14 non-goals. Neither covers url() or @import for images or other assets.
- Failure: The plan forbids external requests only for web fonts. It never says whether the new gradients, glows and borders may use url() references or data: URIs. The sentence to add is: "theme.css must contain no url(), @import or external references of any kind; every effect is pure CSS gradients and shadows."
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-012: AC-4/SI-2 require contrast >=4.5:1 but there is no automated check, and the plan concedes orange #CC5500 vs cream is ~4.

- Severity: HIGH
- References: CHANGE_PLAN s4.1 'orange #CC5500 vs cream ~4.2 is existing... keep as is'; traceability AC-4 tests '-'. CHANGE_SPEC AC-4 requires >=4.5:1.
- Failure: AC-4/SI-2 require contrast >=4.5:1 but there is no automated check, and the plan concedes orange #CC5500 vs cream is ~4.2 (fails). Say: 'Every key variant and the display must meet 4.5:1 computed contrast; orange key colors are adjusted to meet it, or AC-4 is explicitly relaxed to 3:1 for orange keys.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-013: The plan says to keep orange as is if the base is unchanged, while the spec has no exception.

- Severity: MEDIUM
- References: CHANGE_PLAN s4.1 'keep as is if base unchanged' versus CHANGE_SPEC AC-4 and SI-2 with no exception.
- Failure: The plan says to keep orange as is if the base is unchanged, while the spec has no exception. Say: 'If the orange key base color is unchanged, AC-4 is waived for orange keys and the waiver is recorded in the spec.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-014: AC-1/SB-1 ('clearly psychedelic', 'vivid saturated') are subjective, and the only automated check is a grep.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-1 verification 'Screenshot review... grep theme.css'; traceability AC-1 test T-9 covers only existing invariants.
- Failure: AC-1/SB-1 ('clearly psychedelic', 'vivid saturated') are subjective, and the only automated check is a grep. Say: 'AC-1 passes when theme.css defines --magenta, --cyan, --violet and --lime, and each is referenced by at least one gradient, border or box-shadow.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-015: SB-4 hover/focus-visible has no pass criterion, and a hover that changes computed background-color could break the T-9 k

- Severity: MEDIUM
- References: CHANGE_SPEC SB-4 verification 'Manual'; CHANGE_PLAN Implementation step 1 'add hover/focus-visible styles' with no constraints.
- Failure: SB-4 hover/focus-visible has no pass criterion, and a hover that changes computed background-color could break the T-9 key color tests. Say: 'Hover/focus-visible changes only box-shadow/outline/filter/background-image, never background-color or color, and focus-visible shows an outline of at least 2px.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-016: Display text-shadow glow and gradient layers can reduce legibility, 'pink-free backgrounds' is undefined, and the states

- Severity: MEDIUM
- References: CHANGE_PLAN s4.1 'dark text on gold/cream/pink-free backgrounds'; s1.1 'text-shadow glow on display'.
- Failure: Display text-shadow glow and gradient layers can reduce legibility, 'pink-free backgrounds' is undefined, and the states for the contrast check are unspecified. Say: 'Contrast is measured on computed color against flat background-color in default, hover and focus states; text-shadow glow does not count.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-017: D-1 says 'extra body gradient layers' but also 'both layers' at 200% 200%, so the layer count is ambiguous and T-9f tile

- Severity: LOW
- References: CHANGE_PLAN s1.1 'extra body gradient layers' versus D-1 'both layers'; s14.1 T-9f risk.
- Failure: D-1 says 'extra body gradient layers' but also 'both layers' at 200% 200%, so the layer count is ambiguous and T-9f tile math is at risk. Say: 'Body background-image keeps exactly two layers, each background-size 200% 200%, and the groovy keyframe is unchanged.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## Overall assessment

Review findings require disposition.
