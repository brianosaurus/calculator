# Change Plan
Omitted sections: Schema, Migration, Concurrency, Feature flags, Observability (CSS-only)

## 1-3. Approach

Edit only `src/theme.css`. Keep the 5 palette vars and every computed bg/color the theme tests need (key background-color stays gold/green/orange/cream; calculator brown; display cream). Add psychedelic look additively: new vars (--magenta #FF1493, --cyan #00E5FF, --violet #7B2FF7, --lime), layered background-image gradients on keys (background-image does not alter computed background-color), thick contrasting borders, glow box-shadows on calculator/keys, rainbow gradient border ring on calculator, text-shadow glow on display.
Decision D-1: body background-image keeps exactly two layers (conic + radial), each with background-size 200% 200%, and the `groovy` keyframe is unchanged (T-9f whole-tile shifts); no extra body layers are added. Retune colors only, by adding vivid stops within those two layers.
Decision D-2: keep Fredoka-first font stack and no web fonts (T-9 forbids external requests); groovy feel via weight, letter-spacing, rounded radius.
Decision D-3: keep .title color #E1AD01, brown in shadow, clamp size, nowrap; add colored glow layers to text-shadow.
Alternatives: rewrite palette entirely (breaks T-9/T-10b, would need test edits, rejected); web font (breaks no-external-request invariant, rejected).

Decision D-4 (interactive states): hover, focus-visible, active and disabled styles change only box-shadow, outline, filter and background-image; never background-color, color, size, margin or border width, so there is no size or layout shift and T-9 computed-color tests are unaffected. focus-visible shows an outline of at least 2px with >=3:1 contrast against adjacent colors.
Decision D-5 (sizing): borders and the rainbow ring are drawn inside the existing box (box-sizing: border-box, no added outer width). Glow box-shadows are not layout-affecting and must not cause horizontal scroll; at 320px document scrollWidth must be <= clientWidth.
Decision D-6 (contrast): contrast on key labels and the display text is measured against the worst (lowest-contrast) gradient stop under the text, not just the flat background-color, and must be >=4.5:1 in default, hover and focus-visible states. Text-shadow glow gives no contrast credit and must not reduce legibility.
Decision D-7 (no external references): theme.css must contain no url(), @import or external references of any kind (no data: URIs); every effect is pure CSS gradients and shadows.

## 5. Not to modify
`src/engine.js`, `src/keymap.js`, `src/Calculator.jsx`, `index.html`, tests, package files.

## 8. Interfaces
None.

## 10. Compatibility

Additive CSS; selectors unchanged. Contrast rule (AC-4/SI-2): key labels and display text must be >=4.5:1. Contrast is measured on the computed text color against the worst-case gradient stop under each label (and the flat computed background-color), in default, hover and focus-visible states; text-shadow glow never counts toward contrast and the display glow must not reduce legibility. Orange key: the existing cream on #CC5500 is ~4.2:1 and fails, so darken the orange key background (e.g. ~#B84D00, ~5:1 vs cream) or its label colour to reach >=4.5:1 while T-9 computed colours still pass (adjust T-9 orange expectations only if pinned). If T-9 pins both orange colours, the orange key only is explicitly exempted from AC-4 (RELAXED to >=3:1 for large bold label text) and that waiver is recorded in the spec. Other keys keep their palette colours.

## 12. Error behavior

None; existing reduced-motion rule retained. All new transitions and animations (including hover/focus transitions) are disabled under prefers-reduced-motion: reduce.

## Change-impact table
| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `src/theme.css` | Add vivid accent vars, gradients, borders, glows, hover/focus styles | Psychedelic look | Theme computed-style tests | theme.spec.js, e2e, vitest |

## Traceability

| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 passes when theme.css defines --magenta, --cyan, --violet and --lime, and each is referenced by at least one gradient, border or box-shadow (checked by grep), plus screenshot review. | SB-1, SB-4 | SI-1 | theme.css | T-9 | Screenshot |
| AC-2 | SB-2 | - | none | npm test, e2e specs | - |
| AC-3 | SB-3 | SI-1 | theme.css | T-10b/c/d | 320px view: no horizontal overflow (scrollWidth <= clientWidth) with borders, focus ring and glows applied; borders and ring fit inside the box (border-box, no added width) |
| Key labels and display text have contrast >= 4.5:1, measured against the worst-case gradient stop under the text in default, hover and focus-visible states; text-shadow glow is not counted. The orange key background/text is darkened to meet 4.5:1 against cream while T-9 still passes; only if T-9 pins both of its colours is the orange key explicitly exempted (relaxed to >= 3:1) and the waiver recorded. | SB-1 | SI-2 | theme.css | Computed-contrast check of every key variant and display (>=4.5:1; orange keys >=3:1 only if waived per s4.1) | Contrast check at worst gradient stop in default/hover/focus-visible states, including the orange key |
| AC-5 | SB-2 | SI-1 | theme.css | all | git diff |

## 16-17. Test strategy

No new committed tests; existing suites are the regression net (commands in baseline verification_commands). Not a bug fix. Add these non-committed verification checks (grep or throwaway browser script): (1) `grep -nE 'url\(|@import|http' src/theme.css` returns no matches; (2) grep that theme.css defines --magenta, --cyan, --violet and --lime and each is referenced by a gradient, border or box-shadow (AC-1); (3) at a 320px viewport, document scrollWidth <= clientWidth and the calculator box lies within the viewport, plus grep for box-sizing: border-box; (4) with prefers-reduced-motion: reduce emulated, computed transition-duration is 0s and animation-name is none on body and keys; (5) computed background-color and color are unchanged on hover and focus-visible, and the focus-visible outline width is >=2px; (6) body background-image has exactly two layers, each background-size 200% 200%, and `git diff` of the groovy keyframe is empty; (7) a throwaway script computes the WCAG contrast ratio from computed color and background-color for every key variant and the display, asserting >=4.5:1 (or the recorded orange waiver threshold).

## 18. Manual verification

Run `npm run dev`, view at 1280px and 320px, confirm look and legibility, no horizontal scroll at 320px, and visible hover/focus-visible states; also toggle prefers-reduced-motion and confirm new transitions stop.

## Restrictions

| ID | Source | Reqs | Property | Mechanism | CAP | Phase |
|---|---|---|---|---|---|---|
| R-1 | USER request Constraints | AC-2 | Do not change logic files | Only theme.css owned | CAP-CSS | CODING |
| R-2 | REPOSITORY tests/e2e/theme.spec.js | AC-5 | Palette/font/title/gradient invariants | Additive CSS (D-1..D-4); no url()/@import/data: URIs; feasibility: inspected T-9, T-10b, T-9f | CAP-CSS | CODING |
| R-3 | USER request | AC-5 | No new dependencies | No package edits | CAP-CSS | CODING |

## Implementation sequence

1. Restyle `src/theme.css` per approach and decisions D-1..D-5. Add hover/focus-visible/active/disabled styles that change only box-shadow, outline, filter and background-image; never background-color, color, size, layout or border width (keeps T-9 computed colors intact, no size shift). Focus-visible shows an outline of at least 2px with >=3:1 contrast. Keep borders inside the box (border-box) and keep glows from causing horizontal scroll at 320px.
   Owns: `src/theme.css`

## Rollback
`git checkout src/theme.css`.

## 21. Scope cuts
Drop extra decorative layers/hover effects before touching any invariant.

## 22. Risks

T-9f tile math: body background-image stays exactly two layers, each background-size 200% 200%, and the groovy keyframe is unchanged. Live verification: none needing credentials.

## Adversarial review dispositions

| Finding | Disposition | Reason | Exact plan change |
|---|---|---|---|
| AR-001 | Accepted | Real conflict: kept orange #CC5500 with cream is ~4.2:1, below the 4.5:1 AC-4/SI-2 floor. | s4.1 now requires the orange key text/background adjusted to reach 4.5:1 with T-9 still passing; if T-9 pins both, the orange key is explicitly exempted (RELAXED to 3:1) and recorded. |
| AR-002 | Accepted | Gradient layers, glows and hover/focus states can lower effective contrast beyond computed colors. | s4.1 and AC-4 now measure contrast against the worst gradient stop under each label, in default/hover/focus-visible states, and the display glow must not reduce legibility. |
| AR-003 | Accepted | Hover/focus-visible/active/disabled states were unspecified and could shift layout or break color tests. | Added D-4 to s1 and updated step-1: states change only shadow/outline/filter/background-image, no size shift, focus outline >=3:1. |
| AR-004 | Accepted | Thick borders, ring and glows could cause 320px horizontal overflow without a sizing rule. | Added D-5 to s1 and AC-3 manual check: border-box, no added width, no horizontal scroll at 320px. |
| AR-005 | Accepted | New hover transitions or animations must respect reduced motion; plan was silent. | s5.1 now requires all new transitions/animations be disabled under prefers-reduced-motion: reduce. |
| AR-006 | Accepted | Plan kept orange at ~4.2:1, contradicting AC-4/SI-2 (>=4.5:1). | s4.1 and AC-4 now require darkening the orange key to >=4.5:1 against cream, with T-9 orange expectations adjusted only if pinned. |
| AR-007 | Accepted | Gradients and glows can lower effective contrast while computed background-color is unchanged, so measurement must cover them. | Added decision D-4 to s1 and extended AC-4 requirement to measure worst gradient stop and exclude text-shadow credit. |
| AR-008 | Accepted | Unconstrained hover/focus styles could break computed-color tests or shift layout. | Added decision D-5 to s1 and constrained step-1 to hover/focus-visible changing only box-shadow, outline, background-image and filter. |
| AR-009 | Accepted | Thick borders and a ring could widen boxes and overflow at 320px; a sizing rule is needed. | Add sizing rule to s1.1 and 320px no-overflow criterion to AC-3. |
| AR-010 | Accepted | New hover transitions or animations need explicit reduced-motion handling beyond the body rule. | Update s5.1 so all new transitions/animations are disabled under prefers-reduced-motion: reduce. |
| AR-011 | Accepted | Plan only forbade external requests for fonts; url()/@import were unaddressed. | Added a no url()/@import/data: URI rule to s1.1 approach and to restriction R-2. |
| AR-012 | Accepted | Orange key at ~4.2:1 contradicts AC-4/SI-2 (>=4.5:1) and nothing automated checks it. | Rewrote s4.1 to darken orange key to >=4.5:1 (T-9 permitting, else relax to 3:1 for orange) and AC-4 to cite a computed-contrast check. |
| AR-013 | Accepted | The 'keep as is if base unchanged' wording contradicts AC-4/SI-2; a recorded waiver or a fix must be explicit. | s4.1 now states the orange key is adjusted to reach 4.5:1 or AC-4 is waived for orange keys and the waiver recorded in the spec. |
| AR-014 | Accepted | A concrete, checkable pass criterion for AC-1 removes reliance on subjective wording. | AC-1 requirement gains an objective rule: four accent vars defined and each referenced by a gradient, border or box-shadow. |
| AR-015 | Accepted | Hover/focus-visible needs a pass criterion that protects T-9 computed colors. | Step 1 text now constrains hover/focus-visible to box-shadow/outline/filter/background-image with a >=2px focus outline. |
| AR-016 | Accepted | Contrast method and states were unspecified and 'pink-free' was undefined. | s4.1 rewritten: contrast measured on computed color vs flat background-color in default, hover and focus states; text-shadow glow excluded. |
| AR-017 | Accepted | The plan says both 'extra body gradient layers' and 'both layers', leaving layer count ambiguous and T-9f tile math at risk. | Edit s1.1 to fix body background-image at exactly two layers at 200% 200% with unchanged groovy keyframe, and s14.1 to match. |
