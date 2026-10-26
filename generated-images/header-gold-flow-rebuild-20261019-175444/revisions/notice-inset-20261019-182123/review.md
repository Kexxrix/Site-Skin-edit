# Recessed notice revision

- Added a native gradient fill, upper inner shadow and lower inner highlight to the notice instances within all six Gold Flow header variants.
- Notice external bounds remain 845 x 28 at x281/y30. Added 14px inner horizontal padding and R14 corners to reproduce the reference's inset well. Header remains 1920 x 88; all outer group bounds and text copy unchanged.
- Dark skin uses a translucent black well; white skin uses a softer warm gray well with a pale lower reflection.
- Shared notice main components were left unchanged; source fingerprints before/after match. The styling is scoped to the current three Gold Flow header families.
- Verified propagation to all six complete screen instances. Static message text is 296px wide within a 753px viewport. The single-message structure and existing motion definitions were not edited; animation playback was not retested in this styling revision.
- Visual PASS: reviewed six native-size header strips and representative dark/white full-screen compositions. No clipped static text, overlapping groups or unintended layout movement observed.
- No new image generation, source image changes or website code changes.
