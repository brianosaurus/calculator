# Change plan

Omitted sections: Schema, Migration, Concurrency, Feature flag, Observability (none apply)

## 1. Selected technical approach

In `Calculator.jsx`, wrap the existing `div.calculator` and a new `<h1 className="title">Groovy</h1>` in a `div.app` column container. Style `.app` (flex column, centered, gap) and `.title` in `theme.css` using `--font`, weight 700, large size via clamp, with fill color exactly `var(--gold)` and a `text-shadow` that includes a `var(--brown)` outline layer plus an orange glow layer. Cream is not used.

Existing layout CSS is retained: body keeps its flex centering with `.app` as its sole child, and the `.calculator` CSS (width, margins, colors) is unchanged. `.app` only stacks the title and card and centers them as a group.

## 2. Alternatives
(a) Pseudo-element on `.calculator::before`: would sit inside the brown card, not above it. (b) Static h1 in index.html: outside React root, breaks flex centering. (c) Change body to column: affects the whole page.

## 3. Why selected
Smallest change; keeps body centering and the background untouched; title and card centered as a group.

## 4. Components to modify
See the change-impact table.

## 5. Not to modify

`src/engine.js`, `src/keymap.js`, `src/main.jsx`, `index.html`, body background and keyframes, existing e2e specs other than theme.spec.js.

The title group (title plus card) is centered. Any existing e2e assertion on the absolute position of the calculator is updated in `tests/e2e/theme.spec.js` only; other specs are not edited.

## 6. Data/state flow
None; static markup.

## 8. Interface changes
New DOM: `.app` wrapper and `h1.title`. `.calculator` and its test hooks are unchanged.

## 10. Compatibility

Narrow widths: `.title` font-size uses clamp(2.5rem, 12vw, 4rem); `.app` is no narrower than the existing `.calculator` width (and at most min(92vw, 360px)), with no horizontal overflow. The 320px overflow check is mandatory and may not be skipped; fix flakiness by waiting for layout to settle. Short or landscape viewports: when the viewport is shorter than the title-plus-card group, the page scrolls vertically and no content (title or calculator) is clipped.

## 12. Error and recovery
Font fallback via the existing stack.

## 14. Rollback

Revert the three files: `src/Calculator.jsx`, `src/theme.css` and `tests/e2e/theme.spec.js`. The existing display/data-key hooks stay on `.calculator` descendants throughout.

## 16. Automated-test strategy

Add tests to `tests/e2e/theme.spec.js` for AC-1, AC-2, AC-3 and the 320px overflow check in AC-4. AC-2 centering (within 2px) is checked at the default viewport and at 320px, reading bounding boxes after the page has loaded. AC-3 asserts the title's computed color equals the resolved value of `--gold` (read from the root computed style), that the computed text-shadow contains the resolved `--brown` color (the glow alone does not satisfy this), that its computed font-family equals that of `.calculator`, and that its computed font-size is between 40px and 64px. The AC-4 overflow check is mandatory and not skippable (if it fails, fix the CSS): it asserts document.documentElement.scrollWidth <= document.documentElement.clientWidth at a 320x640 viewport, and that the title is single-line with width never exceeding `.app` (width min(92vw,360px)). On a short viewport (e.g. 1280x300) the title is not clipped above the fold and the page scrolls so the calculator is fully reachable. Decision D1: put them in the existing theme spec because it already covers styling.

## 17. Regression strategy
Run the baseline commands (vitest, build, playwright) before and after.

## 18. Manual verification

Manual check: capture screenshots of the title at 0%, 50% and 100% of the background animation cycle. Pass if the title is readable in each of the three screenshots.

## Restrictions

| ID | source_kind | Source | Reqs | Property | Mechanism | Rationale | CAP | Phase |
|---|---|---|---|---|---|---|---|---|
| R-1 | USER | CHANGE_REQUEST Constraints | AC-3 | Font/color match the 70s theme | Reuse --font and palette vars | Consistency; no new assets | CAP-css | CODING |
| R-2 | USER | CHANGE_REQUEST Out of Scope | AC-4 | No logic or background change; only these three files change | Edit only Calculator.jsx markup, new CSS rules in theme.css, and the new heading tests in theme.spec.js | Scope | CAP-scope | CODING |
| R-3 | DESIGN | Feasibility: theme.css:1-8, Calculator.jsx:43 inspected | AC-2 | Centered above card; title never wider than .app; on viewports shorter than the group the page scrolls vertically and neither title nor calculator is clipped | Flex-column wrapper; .app width min(92vw,360px); h1.title white-space:nowrap, max-width 100% of .app; body uses min-height with safe centering so overflow scrolls instead of clipping | Revisable | CAP-layout | CODING |

Live verification (LIVE_VERIFICATION): `npx playwright test` after implementation; needs installed Playwright browsers and no secrets.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `src/Calculator.jsx` | Wrap in div.app, add h1.title | Render heading | Layout change | e2e specs |
| `src/theme.css` | Add .app and .title rules | Style heading | Narrow-width overflow | theme.spec.js |
| `tests/e2e/theme.spec.js` | Add heading tests | Verify AC-1..AC-4 | Low | self |

## Traceability

| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S1 | V3 | Calculator.jsx | theme.spec.js heading visible | Open app |
| AC-2 | S1 | V3 | Calculator.jsx, theme.css | theme.spec.js bounding boxes: h1 and .calculator horizontal centers within 2px, checked at the default viewport and at 320px, read after the page has loaded | Look |
| AC-3 | S2 | V3 | theme.css | theme.spec.js computed style: color equals resolved --gold value and is not brown, theme.spec.js computed text-shadow contains the resolved --brown color, theme.spec.js computed style: font-family equals .calculator's; font-size between 40px and 64px | Screenshots at 0%, 50%, 100% of animation cycle; title readable in each |
| AC-4 | S3, S4 | V1, V2 | all | vitest, playwright, build, theme.spec.js 320px overflow check (mandatory, not skippable): at 320x640 document.documentElement.scrollWidth <= document.documentElement.clientWidth and title box width <= .app width, theme.spec.js: at 1280x300 title top >= 0 and page scrolls to reveal calculator bottom | Use calculator |

## Implementation sequence

1. Markup and styles: wrap in `div.app`, add `h1.title`, add `.app`/`.title` CSS (one logical edit across two files).
   IDs: R-1, R-2, R-3
   Owns: `src/Calculator.jsx`, `src/theme.css`
2. Tests: add heading assertions to the theme spec, written against the contract (h1 role heading name Groovy, `.calculator` selector) independent of step 1's code.
   Owns: `tests/e2e/theme.spec.js`
3. Verify only: run the baseline commands (vitest, build, playwright, including existing e2e specs) before and after. This step owns no files; any failure is fixed by returning to step 1 (src/Calculator.jsx, src/theme.css) or step 2 (tests/e2e/theme.spec.js). Other e2e specs are not edited; an absolute-position assertion broken by the layout shift is resolved only in theme.spec.js or the CSS.
   Depends on: 1, 2

## 21. Scope cuts

No cuts to the 320px overflow check for AC-4: it is mandatory and may not be skipped. If it is flaky, fix the flakiness by waiting for layout to settle before measuring. AC-1..AC-4 all stay.

## 22. Risks
Existing e2e specs may assume layout positions; step 3 would reveal this. No blocking decisions.

## Adversarial review dispositions

| Finding | Disposition | Reason | Exact plan change |
|---|---|---|---|
| AR-001 | Accepted | Color rule was ambiguous and the test could not confirm it. | s1.1 fixes fill to --gold and orange glow; s11.1 and AC-3 test assert computed color equals resolved --gold. |
| AR-002 | Accepted | AC-4 requires the 320px check, so it cannot be optional. | s11.1 and AC-4 state the 320px overflow check is mandatory and not skippable; fix CSS if it fails. |
| AR-003 | Accepted | Title width and wrapping at 320px were unspecified; a concrete rule is needed. | AC-4 and R-3 now state .app width min(92vw,360px), nowrap title never wider than .app. |
| AR-004 | Accepted | Short-viewport behavior was unspecified and could clip the title. | AC-4, R-2 and s11.1 now require vertical scrolling with no clipping on short viewports, with a test. |
| AR-005 | Accepted | A non-empty text-shadow check cannot confirm the dark outline; asserting the --brown color makes legibility testable. | Updated AC-3 tests and s11.1 so the test asserts computed text-shadow contains the resolved --brown color. |
| AR-006 | Accepted | Rollback said 'three files' without naming them, and R-2 omitted the test file. | Rewrote s10.1 to name the three files and R-2 to allow the theme.spec.js edit and keep hooks on .calculator descendants. |
| AR-007 | Accepted | The plan did not say whether existing body and .calculator CSS still applies after wrapping. | Section 1 now states body keeps flex centering with .app as its sole child and .calculator CSS is unchanged. |
| AR-008 | Accepted | The title shifts the card down, so existing absolute-position assertions need a tolerance rule. | Section 5 now states the group is centered and any absolute-position assertion is updated in theme.spec.js only. |
| AR-009 | Accepted | Short viewports could clip the title or card; overflow behavior was unspecified. | Section 10 (s8.1) now states the page scrolls vertically below group height with no clipping. |
| AR-010 | Accepted | The 320px check is the sole width verification for AC-4 and the width was ambiguous. | Section 10 (s8.1) makes the 320px check mandatory and sets .app no narrower than the .calculator width. |
| AR-011 | Accepted | 'Cream-free glow' was ambiguous against the spec's allowed gold/cream/orange palette. | s1.1 now states: title fill is --gold and the glow is orange. |
| AR-012 | Accepted | Skipping the 320px check if flaky contradicts AC-4, which requires it. | s18.1 now makes the 320px overflow check mandatory and non-skippable; flakiness is fixed, not skipped. |
| AR-013 | Accepted | The test needs an exact, checkable color assertion so code and test agree. | Edited s1.1 and s11.1 to fix fill to var(--gold) and assert computed color equals resolved --gold and text-shadow contains --brown. |
| AR-014 | Accepted | The 320px check is required by AC-4 and cannot be skippable. | Edited s18.1 to make the 320px overflow check mandatory, fixing flakiness by waiting for layout to settle. |
| AR-015 | Accepted | Viewport widths and timing for the AC-2 centering check were unspecified. | AC-2 row and s11.1 now require the check at the default viewport and 320px, with boxes read after page load. |
| AR-016 | Accepted | AC-4 did not name the measured element, so hidden overflow could pass. | AC-4 row and s11.1 now assert document.documentElement.scrollWidth <= clientWidth at 320x640. |
| AR-017 | Accepted | Legibility had no sampling points or pass criterion. | Section 18 now requires screenshots at 0%, 50%, 100% of the cycle; AC-3 manual row updated. |
| AR-018 | Accepted | Font and size were never asserted by a test. | Section 16 and AC-3 tests now assert font-family equals .calculator's and font-size is 40-64px. |
