# Defects

## Observed: heading wraps to 2 lines at 1280px desktop width (white-space: normal, h1 constrained to the 360px calculator width). Expected: single line with no wrapping. Not yet logged in DEFECTS.md; the driver should record it.

- **Status:** FAIL
- **Evidence:** Playwright measurements: h1 width 360px, height 148px, two client rects (top 103.5 and 177.5, each 74px high), white-space: normal, max-width 100%. Screenshot /tmp/mc200/s.png. git diff of src/theme.css shows '-white-space: nowrap' / '+white-space: normal' on .title.
- **Expected result:** Heading reads exactly 'Groovy Calculator!', is horizontally centered above the calculator, keeps the themed font and color, with no wrapping, clipping or overflow.
- **Actual result:** Text is exactly 'Groovy Calculator!' (one h1). It is centered: the h1 box spans 460-820px, center 640, which equals the viewport center and the calculator center (476-804px). Font is Fredoka, 'Baloo 2', Comfortaa, 'Trebuchet MS', sans-serif, color rgb(225,173,1) (--gold), 64px, text-align center. There is no horizontal overflow (scrollWidth 1280 = clientWidth 1280). However, the heading WRAPS onto two lines at desktop width. The h1 is 360px wide and 148px tall, and its text rects are two lines of 74px each, with line 1 at x 534-745 and line 2 at x 476-804. The working-tree diff to src/theme.css changes .title white-space from nowrap to normal, so the heading is allowed to wrap. This conflicts with the expected 'no wrapping'.
