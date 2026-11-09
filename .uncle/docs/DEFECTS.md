# Defects

## New: reduced-motion '.key{transition:none}' (theme.css:42) is overridden by later '.key' transition (theme.css:121); move media block after the .key rules.

- **Status:** FAIL
- **Evidence:** Computed styles: reduce {anim:none, keyTrans:'0.15s, 0.15s box-shadow, filter'}; no-preference {anim:groovy 20s, keyTrans:'0.15s, 0.15s box-shadow, filter'}. Script: .uncle/tests/mc105.mjs
- **Expected result:** With reduce: background animation stopped and key hover/focus changes do not animate. With reduce off, background swirls.
- **Actual result:** Background animation is correct: reduce -> animation-name none; no-preference -> groovy 20s. But key transitions are NOT disabled under reduce: computed .key transition-duration is 0.15s (box-shadow, filter), same as no-preference. Cause: src/theme.css line 42 '.key { transition: none; }' inside the reduced-motion media query (line 40) comes before the base '.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }' at line 121 with equal specificity, so the later rule wins.

## Pressed state shifts the key down 1px (src/theme.css:135 `.key:active` translateY(1px)). Behaviour is inherited from the original CSS; no DEFECTS.md ID assigned by this worker.

- **Status:** FAIL
- **Evidence:** Computed outline on focus: 'solid 3px rgb(0,229,255)' for all four key types, :focus-visible true. Pressed transform matrix(1,0,0,1,0,1) and rect y +1 for all four types. Widths and heights are identical across states.
- **Expected result:** Hover, focus-visible and pressed states are visibly distinct (glow/outline/filter). Focus outline at least 2px and clearly visible. Key fill, text colour, size and position do not change; nothing shifts.
- **Actual result:** Hover: cyan 2px ring plus 14px magenta glow plus saturate(1.4), versus the default violet ring and 4px magenta drop shadow. Focus-visible: solid 3px cyan outline plus magenta ring and lime glow. All three states are distinct and fill and text colours are unchanged. Size is unchanged, and x/y are unchanged in hover and focus. Pressed: the hover glow plus transform translateY(1px), so the key's bounding-box y moves by 1px (digit 425 to 426, operator 354 to 355, equals 565 to 566, clear 354 to 355). The expectation that position does not change is not met in the pressed state. The rule `.key:active { transform: translateY(1px); }` (src/theme.css:135) is inherited from the pre-restyle CSS (HEAD line 108).

## Reduced-motion `.key { transition: none }` at src/theme.css:42 is overridden by the later `.key` transition at :121; move the reduced-motion block after it. No DEFECTS.md ID assigned by this worker.

- **Status:** FAIL
- **Evidence:** Under reduce: keys report transitionDuration '0.15s, 0.15s'; cmp of /tmp/rm0.png and /tmp/rm1.png gives SAME; src/theme.css:40-43 versus :121 (cascade order).
- **Expected result:** Background swirl is static. Hover and focus changes apply instantly with no animation or transition.
- **Actual result:** Background: body animation-name is none and background-position is unchanged at t0 and t+3s, and the two screenshots 2s apart are byte-identical, so the background is static (pass). Keys: computed transition-duration is still '0.15s, 0.15s' (box-shadow, filter) in every state under reduce, so hover and focus changes are animated. The reduced-motion block (src/theme.css:42 `.key { transition: none; }`) is overridden by the later, equal-specificity `.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }` at src/theme.css:121, which sits outside the media query. The instant-change requirement is not met.

## New: reduced-motion .key transition override is overridden by later .key rule (src/theme.css:42 vs :121)

- **Status:** FAIL
- **Evidence:** Observed values: 18 buttons, transitionDuration '0.15s, 0.15s'; getAnimations() = 0 idle, 2 during hover+press; bg position unchanged after 3s. src/theme.css lines 40-43 and 121.
- **Expected result:** Body background does not animate, and hovering or pressing keys causes no transitions or animations.
- **Actual result:** Body background is static (animation-name none, background-position 0px 0px, 0px 0px both at load and after 3s). But keys still have transition-duration 0.15s (box-shadow, filter), and hovering/pressing a key produced 2 running transitions in document.getAnimations(), so the key hover/press transition is not disabled. Cause: in src/theme.css the reduced-motion rule `.key { transition: none; }` (line 42) comes before the base `.key { transition: box-shadow 0.15s ease, filter 0.15s ease; }` (line 121) with equal specificity, so the later rule wins.

## New: reduced-motion .key transition:none in src/theme.css:42 is overridden by later transition at :121 (observed 0.15s, expected 0s)

- **Status:** FAIL
- **Evidence:** Node output: {"anim":[],"running":0,"mq":true,"trans":[18 x BUTTON.key ... '0.15s, 0.15s']}. grep of src/theme.css: line 40-43 media block sets .key transition none; line 121 sets transition 0.15s.
- **Expected result:** The background does not animate and hover or focus changes appear instantly with no transitions. The calculator still works.
- **Actual result:** Background: no CSS animations on any element (animationName none) and document.getAnimations().length === 0, so the background is static (OK). Transitions: all 18 button.key elements still report computed transition-duration '0.15s, 0.15s' (box-shadow and filter) under reduced motion, so hover/focus changes are NOT instant. The reduced-motion rule '.key { transition: none; }' (src/theme.css line 42) is overridden by the later transition declaration at src/theme.css line 121 ('transition: box-shadow 0.15s ease, filter 0.15s ease;'), which comes after the media block in source order. Calculator key buttons are present; no arithmetic functional check was performed in this run.
