# Subtle-depth signup button

- Updated only the BlackGold and WhiteGold Join masters in P17/07BRoomy/AccountButton: 573:5693 and 573:5770. Reuse inspection showed their direct instances in the page-17/page-18 comparison component scope.
- Replaced the high-contrast six-stop metallic fill with a gentle three-stop gold gradient (#EAC371 / #E4BB65 / #DDB15B). Preserved the underlying gold variable paint.
- Reduced the outer shadow from 4px blur, 2px Y, 22% black to 1px blur, 1px Y, 10% black. Added only an 18% white 1px upper inner highlight; softened the bright border to muted gold.
- Preserved 90x44 bounds, R6 radius bindings, text, font size, line height and placement. Login and Anonymous action masters were checked unchanged.
- Verified propagation in all ten currently existing Roomy/GoldFlow/video comparison screens inspected. Historical user frame 618:65586 was already absent at this check and was skipped; this revision did not delete or recreate it.
- Visual PASS: native-size dark and white header renders inspected for reduced depth, readable labels, spacing and clipping. No further visual repair required.
- No new image generation, layout changes, interaction changes or website code changes.
