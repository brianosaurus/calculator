# Change plan

Omitted sections: schema, migration, concurrency, observability, feature flag (CSS-only)

## 1-3. Approach

AR-011: The new CSS must use only gradient functions and palette variables, with no url(), @import or external font or image references (I-2). AR-012: AC-2 is verified only by reading getComputedStyle(body).backgroundPosition twice, 500ms apart, and asserting the two strings differ, independent of start offset.

Reduced-motion static state: with prefers-reduced-motion: reduce, body shows the keyframe-0% background-position (the base background-position declared on body) as a static background. Calculator opacity: the calculator background-color stays opaque brown (alpha 1) so the animated body never shows through; theme.spec.js asserts this.

In the body rule of src/theme.css, replace the background with oversized layered gradients (repeating-radial-gradient concentric rainbow rings plus conic-gradient swirl, using palette vars) with background-size ~200% and background-attachment fixed kept; add `@keyframes groovy` animating background-position (and slow rotation of conic layer is not needed) with `animation: groovy 20s linear infinite`. Animation must change the rendered background with attachment fixed, verified by a computed-style delta: getComputedStyle(body).backgroundPosition must differ between two samples taken apart in time. The ~200% background-size gives the shifted layers room to move, so the fixed viewport-anchored background visibly scrolls rather than staying static. Add `@media (prefers-reduced-motion: reduce) { body { animation: none; } }`. Alternative: animated ::before layer with transform (rejected: extra element/stacking risk); JS canvas (rejected: not pure CSS). Decision D-1: animate background-position on body since it keeps the existing test regex valid. The body computed backgroundImage must match /(radial|conic)-gradient/ and the existing theme test regex is unchanged (it is not edited). Restrictions R-1 (USER, request Constraints): pure CSS/no deps, mechanism DESIGN as above. R-2 (USER): reduced-motion disables animation, mechanism media query. R-3 (USER): keys/display unchanged; calculator keeps opaque brown background.

Keyframes: `@keyframes groovy` goes from `background-position: 0 0` (0%) to a shift of exactly one tile period of each layer (100%), so the 20s linear infinite loop is seamless. Layer tile periods must divide the 200% background-size so the 100% shift is an exact multiple per layer.

## 5. Not to modify
index.html, src logic, key/button/display rules, package.json.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `src/theme.css` | New animated body background, keyframes, reduced-motion media query | S-1, S-2 | Low | theme.spec.js, all e2e |
| `tests/e2e/theme.spec.js` | Keep regex; add animation assertion, a motion-over-time assertion (computed backgroundPosition strings differ between two samples 500ms apart, regardless of start offset) and reduced-motion assertion | AC-1..3 | Low | itself |

## Traceability

| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1, AC-2: design is concentric rings plus a conic swirl; motion is verified only via getComputedStyle(body).backgroundPosition differing between samples, not by any rendered-value comparison. | S-1 | I-1 | src/theme.css | theme.spec.js | Watch page moves smoothly |
| AC-3: under prefers-reduced-motion: reduce the body shows the static gradient at its base background-position (animationName none), and the media query applies live when the setting changes. | S-2 | I-1 | src/theme.css | theme.spec.js reduced-motion test | OS reduce-motion setting |
| AC-4 | S-3 | I-2, I-3 | none | npm test, npm run test:e2e, theme.spec.js: reduced-motion test asserts animationName none, stable backgroundPosition across two samples, and a change after flipping emulation to no-preference without reload, theme.spec.js: assert theme.css contains no url( or @import and the e2e test records no non-localhost requests | Keys readable |

## 16-17. Test strategy
Extend theme.spec.js; run baseline commands (npm test, npm run test:e2e) for regression.

## 18. Manual verification
Open app, confirm continuous motion and legibility; toggle reduced-motion.

## Implementation sequence

1. Add animated background, keyframes and reduced-motion rule to theme.css.
   Owns: `src/theme.css`
2. Extend theme e2e test with animation, change-over-time and reduced-motion assertions; under reduced motion also assert body background-position equals the base (keyframe-0%) value; assert the calculator computed background-color is opaque brown (alpha 1).
   Owns: `tests/e2e/theme.spec.js`
3. Write launch metadata `.uncle/launch.json` as {"kind":"webpage","command":["npm","run","dev"],"url":"http://127.0.0.1:5173"}.
   
   Steps 1 and 2 are independent files (test asserts only the contract above).
   Owns: `.uncle/launch.json`
   Depends on: 1

## Rollback plan
Revert src/theme.css and tests/e2e/theme.spec.js via git.

## 21. Scope cuts

Drop rainbow rings in favor of simpler animated stripes if contrast is poor. If the scope cut is taken, a conic-gradient layer must remain (AC-1 still requires a radial/conic gradient), and poor contrast means below WCAG AA 4.5:1 for text against the page background.

## 22. Risks

Subpixel background-position sampling could be identical if the animation is paused or not yet started. The motion test therefore runs with reducedMotion no-preference and waits until computed animationName != none. It then reads getComputedStyle(body).backgroundPosition twice, 500ms apart, and asserts the two strings differ. AC-2 passes only on that difference, regardless of animation start offset. The 20s linear cycle makes the 500ms delta nonzero.

## Adversarial review dispositions

| Finding | Disposition | Reason | Exact plan change |
|---|---|---|---|
| AR-001 | Accepted | Keyframe values and loop seam were unspecified; a seamless loop needs a shift of exactly one tile period per layer. | Add a keyframe/seamless-loop block to s1 specifying 0% at 0 0 and 100% shifted by one tile period per layer. |
| AR-002 | Accepted | AC-2 was ambiguous between two readings; the test should assert only computed backgroundPosition differs between samples. | Update s10.1 and s3.1.r2 so AC-2 passes only if computed backgroundPosition differs between two samples 500ms apart, independent of start offset. |
| AR-003 | Accepted | Reduced-motion static state and live media-query application were unspecified. | AC-3 traceability row now states the static base background-position and live application on setting change. |
| AR-004 | Accepted | Motion verification and design wording were ambiguous between 'rendered value' and 'waves/stripes'. | Traceability row s4.1.r1 now states motion is verified only via getComputedStyle(body).backgroundPosition and the design is concentric rings plus a conic swirl. |
| AR-005 | Accepted | The scope cut could remove the gradient AC-1 requires and 'poor contrast' lacked a threshold. | Section 21 (s9.1) now requires keeping a conic-gradient layer and defines poor contrast as below WCAG AA 4.5:1. |
| AR-006 | Accepted | Fixed attachment combined with animated background-position needed an explicit, testable guarantee. | Section 1-3 (s1.1) now requires the animation to change the rendered background with attachment fixed, verified by a computed backgroundPosition delta. |
| AR-007 | Accepted | The plan did not state what the existing regex matches; stating it removes ambiguity. | Section 1-3 (s1.1) now says body computed backgroundImage must match /(radial\|conic)-gradient/ and the existing regex is unchanged. |
| AR-008 | Accepted | The motion test needs explicit preconditions so the two samples are meaningful. | Risks (s10.1) now says the test uses reducedMotion no-preference, waits for animationName != none, and asserts two samples differ. |
| AR-009 | Accepted | R-3 claims opaque brown calculator but no test asserts it. | Extend step-2 so theme.spec.js asserts the calculator background-color is opaque brown. |
| AR-010 | Accepted | Reduced-motion static state was unspecified. | Section 1-3 now states reduced motion shows the keyframe 0% background-position as a static background. |
| AR-011 | Accepted | Plan only said pure CSS; no rule forbids url()/@import, which I-2 needs. | s1.1 now states new CSS uses only gradient functions and palette variables, with no url(), @import or external references. |
| AR-012 | Accepted | Test property for AC-2 was ambiguous; computed backgroundPosition string comparison is deterministic. | s1.1 and s10.1 now state the test reads getComputedStyle(body).backgroundPosition twice 500ms apart and asserts the strings differ. |
