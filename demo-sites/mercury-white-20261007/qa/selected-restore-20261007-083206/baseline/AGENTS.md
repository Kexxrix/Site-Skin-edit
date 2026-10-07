# MERCURY White — local implementation

- Implement only this project's `site/` from editor commit `c5b033a3a714b94be846c62554823b773abe8329`.
- Approved input is `input/mercury-palette_98.json`, Library `libfile_e46130d040908191a3535e7306054b91`, v6, 3132 bytes. Preserve its bytes and use every setting as supplied. Do not substitute previous cream/polished presets or adjust HEX values for taste.
- Display only the site, with its fixed 1920px layout centered in wide windows and horizontally accessible in narrow windows. No editor, picker, development QA UI or empty editor lane.
- Preserve data, geometry, demo behavior and asset bytes. No actual transaction submission, remote push or deployment.
- Preserve original sites, both existing editors, existing persistent 5417 process, personal browser/storage/IAB and app/security/service/scheduler settings.
- Keep inputs and QA under this project, outside `site/`. A separate local Git repository/branch and port 5418 are used.
- Independent QA reviews the frozen implementation; QA findings and user approval are separate from implementation and technical checks.

## Approved follow-up: 2026-10-07 button readability

- The user approved the proposed button/level-chip polish with “진행해봐”. This authorizes derived CSS roles for solid cream normal buttons, light apricot selected states, darker orange borders, solid small chips, dark text/icons and thin top highlights.
- Preserve the approved v6 JSON and generated base theme CSS. Record the follow-up in `theme/mercury-white-button-polish.json`; do not overwrite the user input.
- Service gold PNG display changes require observed readability need. Nine labelled 16px icons were measured below 2.4:1 opaque-pixel median contrast; only their scoped display brightness was adjusted. Source PNG bytes and global v6 filter settings remain unchanged.
- The user explicitly approved “재시작해”; the 5418 process was restarted once at 08:23 UTC to activate the verified 697 build. Preserve the new sustained process thereafter. A separate persistent 5419 preview action was rejected by automatic approval review; do not retry or bypass it.
- Initial polished screenshots used temporary CSS injection in isolated contexts on f9. Final `production-*` screenshots and checks use the actually activated 697 production build with no CSS injection. Keep both evidence sets distinct.
