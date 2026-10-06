# ALDEBARAN White — ALDEBARAN-2 public skin

- 2026-10-06: the user approved the current white skin and requested publication followed by GitHub backup. The local-only restrictions from the initial task are superseded. Current release details are in `RELEASE.ko.md` and the newest section of `STATE.md`.

- Current task: preserve the original ALDEBARAN v23 app and implement a separate light-gray/graphite skin here. The user's current request supersedes historical ALDEBARAN color and deployment instructions.
- Only `site/` is the editable application. Never edit `../sports-demo-03/` or the other demos. This app has its own Sites source repository; keep it separate from the integrated GitHub backup checkout and other skin projects.
- Preserve existing layout, dimensions, typography, navigation, data, selection IDs, calculations, and behavior. The attached screenshot is mood reference only, not a geometry or exact color specification.
- Use light neutral gray surfaces, dark graphite text instead of black, and the existing orange brand accent. Replace unreadable yellow/cyan text. Adapt icon and chip colors where needed while preserving their geometry and meaning.
- Reuse existing fonts, components, dependencies, and assets where they fit. New raster generation is allowed only for genuinely necessary skin assets; follow root generated-image storage and review rules. Do not overwrite originals.
- `.openai/hosting.json` belongs only to ALDEBARAN-2, project `appgprj_6ac4c6462e4c81919e10f7f4f91adacf`. Preserve its public audience and never substitute the original ALDEBARAN project ID.
- Validate original-source preservation using `input/source-baseline.json`, browser screenshots and computed colors, representative interactions, and the existing build/type tooling. Keep subjective user approval separate from technical QA.
- Implementation and independent QA have separate owners. QA reports findings; only the implementation owner edits app code.
