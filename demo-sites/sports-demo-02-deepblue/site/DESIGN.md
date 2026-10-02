---
name: "SIRIUS Deepblue"
description: "Navy sports ledger with white information and champagne selections."
colors:
  night-canvas: "#070f27"
  navy-panel: "#101f3d"
  recessed-field: "#08162f"
  raised-top: "#243d61"
  raised-middle: "#1b3152"
  raised-base: "#12233f"
  white-copy: "#f3f7ff"
  muted-copy: "#b6c8e1"
  champagne: "#efd497"
  odds-gold: "#f5dca4"
  action-top: "#f8e6b6"
  action-middle: "#ead097"
  action-base: "#cda861"
  gold-ink: "#10203a"
  divider: "#365174"
  disabled-copy: "#9cb1cf"
typography:
  body:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: 1.5
  panel-title:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: "18px"
  label:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: "18px"
  market-rule:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
  odds:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "16px"
    fontWeight: 900
    lineHeight: "21px"
  slip-rule:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "18px"
  photo-label:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: "20px"
    letterSpacing: "-0.025em"
  photo-label-expanded:
    fontFamily: "\"Pretendard JP\", \"Noto Sans JP\", \"Noto Sans KR\", \"Malgun Gothic\", sans-serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: "30px"
    letterSpacing: "-0.025em"
rounded:
  identity-backplate: "3px"
  control: "4px"
  sheet: "5px"
  center-surface: "6px"
  photo-menu: "7px"
  market-group: "8px"
  browse: "10px"
spacing:
  choice-gap: "4px"
  compact-gap: "6px"
  pane-gap: "8px"
  rail-gap: "10px"
  card-padding: "12px"
components:
  button-raised:
    textColor: "{colors.white-copy}"
    rounded: "{rounded.control}"
    padding: "0 8px"
    height: "28px"
  button-gold:
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "38px"
  odds-choice:
    textColor: "{colors.white-copy}"
    rounded: "{rounded.control}"
    padding: "0 9px"
    height: "36px"
  odds-choice-selected:
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.control}"
    padding: "0 9px"
    height: "36px"
  search-field:
    backgroundColor: "{colors.recessed-field}"
    textColor: "{colors.white-copy}"
    rounded: "{rounded.sheet}"
    padding: "0 7px 0 5px"
    height: "38px"
  navigation-item:
    textColor: "{colors.white-copy}"
    typography: "{typography.navigation}"
    rounded: "{rounded.control}"
    padding: "0 4px"
    height: "44px"
  sport-chip:
    textColor: "{colors.white-copy}"
    rounded: "{rounded.control}"
    padding: "4px 8px"
    height: "32px"
  match-card:
    backgroundColor: "{colors.navy-panel}"
    textColor: "{colors.white-copy}"
    rounded: "{rounded.control}"
    padding: "12px"
    height: "228px"
---

# Design System: SIRIUS Deepblue

## Overview

**Creative North Star: "The SIRIUS Night Ledger"**

The SIRIUS deepblue sibling carries the existing SIRIUS navy, white and gold identity into the completed white app's dense desktop layout. Its visual character is a night sports ledger: quiet navy sheets, readable white information, formed numerical controls and champagne selections. The approved change is surface color and independent brand imagery; the confirmed spatial hierarchy and interactions remain the incumbent system.

Depth comes from a consistent upper light source, subtle navy gradients, inset field wells and short ambient shadows. Photographic service menus retain their existing metallic captions and decorative hover animation. Team crests, country flags and service photographs preserve their identities; dark crests receive light backplates. The generated gold symbol, gold wordmark and abstract navy/gold header are separate image files, while navigation and other UI copy remain real text.

**Key Characteristics:**

- Fixed desktop sports workspace with independently scrolling rails and match panes.
- Navy sheets, recessed entry wells and raised navy controls.
- Champagne numerical emphasis and dark ink on selected gold controls.
- One inherited Pretendard JP family for Korean UI, scores, odds and money.
- Independent gold branding over a continuous abstract header image.

This is a merge/refresh of the copied SIRIUS intent seed, grounded in the sibling's current CSS. Sources: `app/typography.css`, `app/sirius-sports.css`, `app/sirius-header-revision.css`, `app/sirius-left-menu.css`, `app/sirius-left-refinement.css`, `app/sirius-visual-depth.css`, and the final overrides in `app/sirius-deepblue-skin.css`. The approved direction is recorded in [surface-contract.md](../runs/deepblue-20261002/surface-contract.md). Component dimensions come from the incumbent sheets; final deepblue paint overrides take precedence over historical declarations.

## Colors

The palette combines a near-black navy canvas, stepped navy material surfaces, clear white copy and a restrained champagne hierarchy. Frontmatter contains the normative reused values; gradient composition and shadows are carried in the sidecar. Sidecar tonal ramps are synthesized OKLCH swatch previews, not additional shipped color tokens.

### Primary

- **Champagne:** brand emphasis, focus outlines, active browse hierarchy and league headings.
- **Odds Gold:** available odds, balance values and important slip totals.
- **Action Gold:** a three-stop upper-to-lower gradient using Action Top, Action Middle and Action Base for selected odds, selected sport/market tabs and primary actions. Gold Ink supplies readable copy on these controls.

### Neutral

- **Night Canvas:** the page and space around the workspace.
- **Navy Panel:** match sheets, rail sheets, market groups and dialogs. The source also retains slightly darker supporting pane surfaces; these are contextual surface variations rather than a replacement canvas token.
- **Recessed Field:** search and stake entry wells.
- **Raised Navy:** Raised Top, Raised Middle and Raised Base form the ordinary control gradient.
- **White Copy / Muted Copy:** main identity and action labels versus secondary schedules, rules and metadata.
- **Divider / Disabled Copy:** structural separation and visibly unavailable choices.

**The Gold State Rule.** Gold identifies selected numerical choices, selected tabs, key actions and existing brand hierarchy. Ordinary control surfaces remain navy.

## Typography

**UI, Body and Numerical Font:** Pretendard JP with Noto Sans JP, Noto Sans KR, Malgun Gothic and sans-serif fallbacks. Locally supplied font weights are 400, 500, 700, 800 and 900; font synthesis is disabled. The separate score and display-family variables in the base stylesheet are historical options, not the active sports-workspace family.

**Character:** compact, bold Korean interface labels and aligned numerals share one voice. Role weight and spacing establish hierarchy instead of adding a new display face.

### Hierarchy

- **Navigation:** bold category labels across the continuous header (17px, 800, inherited 1.5 line-height).
- **Panel title:** selected-match headings (15px, 800, 18px line-height).
- **Body:** the shell's inherited base (16px, 400, 1.5 line-height); dense components use their explicit smaller roles.
- **Label:** primary choice labels (13px, 700, 18px line-height); expanded market rows use weight 500 and 16px line-height.
- **Odds:** numerical choices (16px, 900, 21px line-height); detail-row odds use 20px line-height.
- **Market rule:** explanation below market groups (13px, 500, 18px line-height).
- **Slip rule:** wrapped market explanation inside the slip (12px, 500, 18px line-height).
- **Photo menu label:** inherited metallic captions (17px, 800, 20px line-height, -0.025em); expanded captions grow to 23px with 30px line-height.
- **Supporting numerals:** scores retain 20px/800 with 26px line-height; balances use 18px/800, stake input uses 18px/800. Tabular numerals remain on the numerical roles that declare them.

**The Shared Voice Rule.** Scores, odds, balances and UI labels inherit the shipped UI family. Preserve tabular numerals on numerical roles; the historical DIN proposal is not the current type system.

## Layout

The shipped shell is a fixed 1920px desktop workspace with a continuous 140px header. The body keeps 320px left rail, 1244px center and 320px right rail, 10px outer column gaps and 8px horizontal padding. The center surface holds two 609px panes with an 8px gap. Component and row spacing uses the observed 4px, 6px and 8px intervals; match cards keep 12px padding and a 228px height.

Header category navigation is a centered 1244px by 44px grid of ten equal columns with 4px gaps. Branding remains in the left 280px by 96px slot: the gold symbol displays at 48px square and the gold wordmark displays at 218px width inside a 90px crop. Utilities and account actions remain in their existing right-side positions. The abstract header art stays at its native 1920px by 140px size, with a darker central veil supporting clear navigation text.

The header and body occupy the viewport height; rails, fixture lists and market details scroll independently. Below 1920px, the shell retains its desktop width and horizontal scrolling exposes either rail; the existing 1919px breakpoint reserves 16px of viewport height for that horizontal scrollbar. No mobile rearrangement is established by this skin.

The final layout comparison matched all measured elements against the white sibling in the 1920px initial, photo-hover and leave states and the 1366px left/right views. The parent also confirmed final fonts, asset loading and readability after the applied web-asset revision. This documentation records the shared geometry; [layout-comparison.json](../runs/deepblue-20261002/layout-comparison.json) and [the final rendered frame](../runs/deepblue-20261002/deepblue-final-1920.png) carry the QA evidence.

## Elevation & Depth

Navy tonal layering combines with short ambient shadows, formed borders and inset field wells. Controls remain raised at rest; hover changes their surface and border, while selected gold states preserve a clear dark label. Match sheets carry a shallow shadow and a separate header strip; inspected sheets gain a champagne border. Portalled dialogs retain stronger ambient depth and the existing blurred overlay.

### Shadow Vocabulary

- **Raised control:** `inset 0 1px 0 #ffffff14, 0 2px 3px #00081770`.
- **Rail sheet:** `0 3px 7px #00081766`.
- **Recessed well:** `inset 0 2px 4px #00081766, inset 0 -1px 0 #ffffff0b`.
- **Selected gold:** `inset 0 1px 0 #fff2cc99, 0 2px 3px #00081766`.
- **Dialog:** `0 18px 55px #00081799, inset 0 1px 0 #ffffff12`.

**The Upper Light Rule.** Raised controls carry a lighter top edge and a darker base; entry wells use inset shadows. Keep this depth direction consistent across the dense workspace.

## Shapes

Compact rounded rectangles follow functional density: controls and match cards use 4px corners; rail sheets, search fields and selection blocks use 5px; the center surface uses 6px; photo menus use 7px; panes and market groups use 8px; browse containers and stake fields use 10px. Light crest backplates use 3px corners. Existing switch tracks and circular identity fallbacks keep their purpose-specific silhouettes.

Borders define dense groups and states. Preserve container clipping, text ellipsis on concise labels and wrapping on market explanations. Metal-like text gradients belong to the existing photographic menu labels and brand treatment; they are not the ordinary text style.

## Components

### Buttons

Formed controls share the navy gradient, white copy, darker lower border and shallow raised shadow. Small actions keep their incumbent dimensions (28px height, 0 8px padding); header account actions use 38px height and 0 12px padding. Primary actions and selected controls use the three-stop gold gradient with Gold Ink. The source contains action-specific hover variations; keep those variants rather than deriving a single universal gold hover. Disabled submit controls stay navy with Disabled Copy and no active gold treatment. Focus uses a 2px champagne outline; outline position remains component-specific.

### Chips

Sport tabs are compact controls (32px height, 4px corners, 4px 8px padding). Selected sport and market tabs use gold with dark ink. Their count badges remain distinct: navy with light gold on selection, darker navy with light copy at rest. Browse selection uses raised navy and champagne text rather than filling the whole tree with gold.

### Cards / Containers

Match cards are navy sheets with a separate top strip, shallow ambient shadow and preserved team/score layout. An inspected match gains a champagne outline and an inspected label; this state remains distinct from a selected numerical choice. Market groups keep 8px corners and flat group interiors. Rail sheets remain 320px wide; summary and entry areas are recessed within them.

### Inputs / Fields

Search fields use the recessed field surface, a navy border and inset depth (38px height, 5px corners). Stake fields retain their existing right-aligned numerical entry (40px height, 10px corners). Focus brightens the border/outline to champagne. Invalid stake fields retain a rose border and alert text on a dark rose well; communicate the state with the existing explanation, not color alone.

### Navigation

Ten category labels remain real text in the fixed header grid. Default text is white; the active page uses a formed navy surface, gold text and a gold bottom inset. Hover uses a brighter navy surface with gold text, and focus retains a champagne outline. Utility links preserve their underline hover. Navigation geometry remains fixed during all states.

### Odds Choices

The primary numerical buttons keep 36px height, 4px corners, 0 9px padding and a two-column label/value layout. Available values use Odds Gold over raised navy. Hover lifts the navy tone and warms the border. Selected choices use gold with dark text for label, value and SVG, and retain that state on hover/focus. Disabled choices use muted navy and Disabled Copy at full opacity. Expanded detail choices keep their incumbent 34px height and permit wrapped labels where their existing component supports it.

### Photographic Service Menu

The six existing menu photographs and separate promotion images remain intact. Photo menu items expand from 44px to 116px, grow their metallic labels and retain the light sweep, particles and title-enter animation. Height/caption movement uses the observed 360ms easing; the decorative sweep and particles remain component-specific. Reduced motion removes transitions/effects, and forced colors restore plain readable labels and visible borders.

### Brand Image Layer

Independent gold symbol and wordmark PNGs and the navy/gold header background are applied to the existing slots. [applied-assets-final.json](../runs/deepblue-20261002/applied-assets-final.json) records the current web copies and provenance; the v02 header is applied under the stable app URL. Generated asset completion, technical validation and final user approval remain separate states.

## Do's and Don'ts

### Do:

- **Do** preserve the verified white sibling's geometry, scrolling, labels and interactions when extending this skin.
- **Do** use navy for ordinary controls, champagne values for available odds and dark ink for selected gold controls.
- **Do** keep Korean labels and numerical values in the inherited UI family with their observed role sizes.
- **Do** retain photographic identities, team crests and country flags; use the existing light crest backplate for dark identity assets.
- **Do** keep the gold logos and abstract header as independent image layers and navigation as text.
- **Do** retain reduced-motion and forced-color accommodations where the existing components provide them.

### Don't:

- **Don't** treat old header heights, DIN typography or other unreconciled seed values as shipped tokens.
- **Don't** flatten raised controls and recessed fields into one undifferentiated surface.
- **Don't** replace unavailable numerical data with invented scores, odds or placeholder zero values.
- **Don't** treat generated asset completion or technical validation as final user approval of those assets.

Not canonized or repaired: PRODUCT.md's pre-existing `impeccable:product-schema 1` stamp is outside this documentation-only boundary. Historical DIN and obsolete header/layout proposals were reconciled as seed history, not promoted to new rules. Dormant legacy kicker/eyebrow selectors are not part of this documented component vocabulary. No UI, source, configuration, asset, build or deployment change is made by this documenter pass.
