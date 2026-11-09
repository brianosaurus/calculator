## AR-001: The plan keeps fixed attachment and animates background-position but gives no keyframe values, so the loop seam is unspe

- Severity: HIGH
- References: CHANGE_PLAN Approach: 'background-size ~200% and background-attachment fixed kept; add @keyframes groovy animating background-position'.
- Failure: The plan keeps fixed attachment and animates background-position but gives no keyframe values, so the loop seam is unspecified. Say: `@keyframes groovy goes from background-position 0 0 to a shift of exactly one tile period of each layer, so the 20s loop is seamless.`
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-002: AC-2 allows two readings: 'backgroundPosition or rendered value differs'.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-2; CHANGE_PLAN Risks: 'test samples after 500ms with 20s cycle'.
- Failure: AC-2 allows two readings: 'backgroundPosition or rendered value differs'. Say: `AC-2 passes only if computed backgroundPosition differs between two samples 500ms apart, regardless of animation start offset.`
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-003: Reduced-motion static state is unspecified (which position is shown), and so is live toggling.

- Severity: MEDIUM
- References: CHANGE_PLAN media query 'animation: none'; AC-3 asserts only animationName 'none'.
- Failure: Reduced-motion static state is unspecified (which position is shown), and so is live toggling. Say: `Under prefers-reduced-motion: reduce the body shows the static gradient at its base background-position, and the media query applies live when the setting changes.`
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-004: Spec says 'rings / waves' and a 'rendered value' sample; plan says rings, swirl and stripes.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-2 and 'rings / waves'; CHANGE_PLAN scope cut 'stripes'.
- Failure: Spec says 'rings / waves' and a 'rendered value' sample; plan says rings, swirl and stripes. Say: `Motion is verified only via getComputedStyle(body).backgroundPosition; design is concentric rings plus a conic swirl.`
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-005: The stripes scope cut may remove the radial/conic gradient that AC-1 requires, and 'poor contrast' has no threshold.

- Severity: LOW
- References: CHANGE_PLAN 21 Scope cuts vs CHANGE_SPEC AC-1.
- Failure: The stripes scope cut may remove the radial/conic gradient that AC-1 requires, and 'poor contrast' has no threshold. Say: `If the scope cut is taken, a conic-gradient layer must remain, and poor contrast means below WCAG AA 4.5:1 for text against the page background.`
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-006: The plan keeps background-attachment: fixed while animating body background-position, and never says whether the fixed l

- Severity: HIGH
- References: CHANGE_PLAN s1.1: 'background-size ~200% and background-attachment fixed kept' and 'animating background-position'.
- Failure: The plan keeps background-attachment: fixed while animating body background-position, and never says whether the fixed layer visibly moves or how the ~200% size behaves. Settle with: 'Animation must change the rendered background with attachment fixed, verified by a computed-style delta.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-007: The plan says the existing theme test regex stays valid but never states what it matches.

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 D-1 against CHANGE_SPEC AC-1.
- Failure: The plan says the existing theme test regex stays valid but never states what it matches. The new repeating-radial plus conic gradients may not satisfy it. Settle with: 'Body computed backgroundImage must match /(radial|conic)-gradient/ and the existing regex is unchanged.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-008: AC-2 samples backgroundPosition about 500ms apart, but nothing says the test runs with no-preference motion or waits for

- Severity: MEDIUM
- References: CHANGE_PLAN s10.1 and CHANGE_SPEC AC-2.
- Failure: AC-2 samples backgroundPosition about 500ms apart, but nothing says the test runs with no-preference motion or waits for the animation to start. Settle with: 'The motion test uses reducedMotion no-preference, waits for animationName != none, and asserts the two samples differ.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-009: R-3 says the calculator keeps an opaque brown background, but no test asserts it, so the animated body could show throug

- Severity: MEDIUM
- References: CHANGE_PLAN s1.1 R-3; CHANGE_SPEC AC-4 'unchanged'.
- Failure: R-3 says the calculator keeps an opaque brown background, but no test asserts it, so the animated body could show through. Settle with: 'The calculator background-color stays opaque brown and is asserted in theme.spec.js.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-010: Under reduced motion the plan sets animation: none but never says which background-position is shown.

- Severity: LOW
- References: CHANGE_PLAN s1.1 reduced-motion media query.
- Failure: Under reduced motion the plan sets animation: none but never says which background-position is shown. Settle with: 'With reduced motion, body shows the keyframe-0% background-position as a static background.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-011: The plan says the page makes no external requests (I-2), but it doesn't say how the CSS is kept free of url() or @import

- Severity: LOW
- References: CHANGE_SPEC I-2 says there are no external requests. CHANGE_PLAN s1 only says "pure CSS/no deps", and no test checks it.
- Failure: The plan says the page makes no external requests (I-2), but it doesn't say how the CSS is kept free of url() or @import references. Add this sentence: "The new CSS must use only gradient functions and palette variables, with no url(), @import or external font or image references."
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-012: AC-2 allows two readings: 'backgroundPosition or rendered value differs'.

- Severity: HIGH
- References: CHANGE_SPEC AC-2 'backgroundPosition or rendered value differs'; plan s10 risk.
- Failure: AC-2 allows two readings: 'backgroundPosition or rendered value differs'. Computed backgroundPosition can be identical if the sampling lands on the same value, and the plan never says whether the tested property is the computed backgroundPosition. Settle with: 'The test reads getComputedStyle(body).backgroundPosition twice 500ms apart and asserts the two strings differ.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## Overall assessment

Review findings require disposition.
