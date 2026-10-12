# MERCURY White — local implementation and public release

## Latest user follow-up — restore component depth / 2026-10-12

- Latest header refinement supersedes the bronze detail header below: league headers now use a near-white cream relief and 9px horizontal padding, copied from the read-only SIRIUS `sirius-visual-depth.css` league rule. The detail-match header uses the exact previous league gold gradient and dark text. Card-top gold, all other controls/assets, geometry and user-selected match remain unchanged. Evidence: `qa/header-refine-20261012/`.
- Header-color follow-up: the user's three browser comments requested depth on league headers and color on the detail-match header and card top. The attached blue reference supplies the hierarchy; retain the current cream/gold/bronze palette. League headers and the existing 42px card metadata band use a light gold gradient; the detail header uses existing bronze/charcoal colors with cream text. Geometry, fonts, selected outlines, odds/buttons and both image-banner groups stay unchanged. Evidence: `qa/header-color-20261012/`; build and browser checks pass.
- Banner regression follow-up: exclude `.mc-banner-stack` from the common card gradient using a zero-specificity `:where(:not(...))` exclusion. Its original CSS background image must remain visible; captions use the existing warm cream #f5e8c5 on that dark image. Do not treat an `<img>`-only check as coverage of CSS background assets. All six right-hand banners and all six left service backgrounds were visually rechecked; evidence: `qa/banner-fix-20261012/`.
- The user requested restoring original MERCURY button/component depth while retaining the current white palette. This authorizes the scoped local CSS update and supersedes the older byte-preservation rule for this follow-up only. ALDEBARAN and SIRIUS are comparison references and remain untouched.
- Local `site/app/mercury-white.css` restores gradients, highlights and shallow bevels; `site/theme/mercury-white-button-polish.json` records the treatment. Preserve the base palette, generated theme CSS, icons, images, geometry, typography and demo logic.
- Build/typecheck pass. At 1920x940, 822 elements retain their geometry, text, text color, font, border color and pressed state; 126 images and 41 Figma icon render settings match the baseline. Selection, deselection, hover and keyboard focus checks pass. Evidence: `qa/depth-restore-20261012/`.
- Old 5417/5418 processes were no longer running when checked. Current local preview is `http://127.0.0.1:5418/`, vinext dev PID8444. The editor was not started. Do not treat historical PIDs below as current.
- PUBLIC v1 and `publish/site/` remain unchanged. No new commit, push or publication. User aesthetic approval is pending; see the newest `STATE.md` entry. External Typekit requests were excluded in the QA tab and were not retried.

## Current approved publication — 2026-10-08

- The user requested publishing the current MERCURY White skin and updating GitHub, then explicitly selected public access for anyone with the link. This supersedes the older no-deployment instructions below.
- PUBLIC v1: https://mercury-white.kexxadrix.chatgpt.site/ ; project `appgprj_6ac7523068808191aa0f1014883e0752`; deployment succeeded. Release checkout `publish/site/`, source commit `694efe89b8f230030c21f554d674ab71617a60bc`. See `RELEASE.ko.md`.
- Preserve approved local `site/` bytes, its b425 HEAD/branch/no-remotes state, and 5418/PID41768 plus editor 5417/PID35992. Hosting-only changes belong to the separate release checkout. Integrated GitHub backup commit/push is authorized; do not alter other sites.
- Latest public UI/HTTP/build evidence and final remote verification: `E:/codexwork/Site-Skin-edit-backups/20261008-mercury-white-deploy/`. Snapshot `backup/site-snapshots/20261008-mercury-white-public-v1/`. Earlier local-only records remain historical.


## Current authorized publication — 2026-10-12

- The user explicitly requested public deployment and a GitHub update after the latest local header refinement. This supersedes the historical local-only/no-publish records below.
- PUBLIC v2 succeeded at the existing public URL https://mercury-white.kexxadrix.chatgpt.site/ ; source commit `70e61703c766e50bcab920f4a2886a399badbf2f` in `publish/site/`. Preserve the existing site identity and audience. See `RELEASE.ko.md`.
- Keep all 345 frozen local source files, b425 HEAD/branch/no-remotes state and the existing local 5418 server/user selection unchanged. The release checkout received only the two current CSS/treatment-record files. Do not treat older PIDs as current.
- Build and typecheck pass; actual public 1927x932 render confirms refined headers, button depth, both banner groups, 126 loaded images and 41 Figma icons, with no new captured console errors/warnings. External Typekit was excluded for QA, then the temporary request block was removed. Do not retry previously restricted requests.
- Integrated GitHub update is authorized for MERCURY White and its navigation/evidence only. Snapshot `backup/site-snapshots/20261012-mercury-white-public-v2/`; external final proof `E:/codexwork/Site-Skin-edit-backups/20261012-mercury-white-deploy/`. Preserve other sites and previous snapshots.

## Latest user follow-up — selected sport icon colors / 2026-10-08

- Selected sport-tab icons darken; deselected icons restore their original gold. All uses the gold atlas when idle and its existing dark trophy only when selected. CSS-only change; keep sidebar/latest icons, source images, data, geometry and earlier follow-ups intact.
- Current 5418 PID41768 supersedes PID24972; editor 5417/PID35992 is unchanged. Build and all ten tab state checks pass at 1927x932. Evidence: `qa/sport-icon-state-20261008/` and newest `STATE.md`. Temporary QA tab/server closed; user tab untouched. No commit/push/deployment.

## Latest user follow-up — menu readability and latest-game icons / 2026-10-08

- Browser comments requested improving the active menu label and updating the missed latest-game icons. Active labels now use solid dark bronze #6b481b without the blurred shadow, retaining the gold underline. Five latest-game rows use the shared Figma SportIcon at their original 14px size. Preserve these changes and all prior unrelated styling.
- Current 5418 PID24972 supersedes PID40968. Editor 5417/PID35992 remains unchanged. No commit, push or deployment.
- Evidence: `qa/readability-latest-20261008/` and newest `STATE.md`. Build/typecheck, 1927x932 visual inspection and three isolated UI interactions pass. User tab was only read for the before screenshot. Temporary QA tab/server are closed.

## Latest user follow-up — Figma icons and colors / 2026-10-08

- The user requested applying the updated Figma frame `333:2` to the local white site. Exact atlas crops replace 36 displayed icons; changed chip, active control, card outline and header label colors follow Figma. Original images and the v6 palette remain intact.
- Current 5418 runtime is PID40968, superseding PID18312 below. Editor 5417/PID35992 remains unchanged. No new commit, push or public deployment was made.
- Latest evidence and limitations: `qa/figma-sync-20261008/change-record.json`, `final-verification.json`, and `STATE.md`. Build/typecheck and six isolated interaction checks pass; whole-project lint retains 39 existing errors with no new diagnostics. Temporary QA server and tabs were closed.

## Latest approved follow-up — warm charcoal badges / 2026-10-07

- The user approved applying the warm charcoal preview. Only `.mc-shell .mc-badge` labels SPORTS/LIVE/LV.0/BET change to background `#36312b`, text `#f5e8c5`, inset edge `#806c49`. Preserve counts, header chips, selected controls, geometry, assets and original v6 JSON.
- Current local source is base commit `b425507730a4f39dd393645ef4273653a7c13176` plus two uncommitted files: `app/mercury-white.css` and `theme/mercury-white-button-polish.json` v4. No new commit, GitHub push or deployment was made for this follow-up.
- Applying the approved change required one 5418 restart. Current PID18312 supersedes PID23780; preserve it and editor 5417/PID35992. Prior b425 dist is retained under `qa/badge-charcoal-20261007-101259/runtime-retired-b425/dist/`. This follow-up supersedes the completed registration-only preservation scope below.
- Build and eight browser checks pass; evidence is `qa/badge-charcoal-20261007-101259/`. External Typekit requests were blocked before transmission in isolated QA; do not retry them. Personal browser/IAB/storage and all other servers remain untouched.

## Current registration scope — 2026-10-07

- The user registered this implementation as MERCURY White and explicitly requested the latest local state and GitHub backup, without deployment. Current entry point: `INDEX.ko.md`; latest source: `b425507730a4f39dd393645ef4273653a7c13176`.
- Only the existing integrated GitHub backup checkout may be committed and pushed for this registration. Keep the local app's branch, source bytes, no-remotes state and running 5418 server unchanged. Do not register a Sites project, add hosting configuration, publish or restart any server.
- The original implementation instructions below remain applicable except that the explicitly requested integrated GitHub backup is authorized.

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

## Latest feedback: restore selected controls only

- The user requested the selected buttons retain the brighter f9/v6 appearance, while keeping the current nonselected gradient readability fixes.
- Selected sport/odds/market controls at `aria-pressed=true` must reproduce approved v6 normal/hover/focus, including its original focus shadow. Counts and small badges retain the readable solid polish, even inside selected sports.
- Latest source is `22bba115d3df595c968f32c2ed8ba802ef454ad0`. The authorized follow-up restart activated only 5418 at 08:40 UTC; preserve its new sustained PID36312 and the existing 5417 PID35992.
- Latest evidence is `qa/selected-restore-20261007-083206/`; previous f9/697 archives and runtime builds remain preserved. The new example PNG transfer failed once through the supported Library helper; do not repeat or bypass it.

## Latest approved card/services follow-up

- Source `b425507730a4f39dd393645ef4273653a7c13176` supersedes22. Preserve 5418 PID23780/start08:56:03UTC and 5417 PID35992.
- Only whole selected/inspected match-card outline and three left primary services changed. Services reuse actual header gradient in normal/hover/focus. Preserve v6 selected controls, other readable buttons/chips and immutable approved v6 JSON.
- Evidence qa/card-outline-service-20261007-085124/; 8 production checks pass. Reuse unchanged type/lint inputs. No new ZIP; hashes in final-source.json.
- Attachment pixels unavailable and external font WinError10013 blocked. Do not retry failed transfers/external request or bypass restrictions.
