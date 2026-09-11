# Sources and implementation record

## Adobe animation presets

The installed After Effects Beta presets were actually applied, then shortened and customized to the absolute master frames. Their original `.ffx` files are not redistributed.

- `Text/Animate In/Straight In By Word.ffx` → `S07_Operations`, F228–232.
- `Text/Animate In/Stretch In Each Word.ffx` → `S07_refined`, F230–234.
- `Text/Scale/Scale In By Word.ffx` → `S08_Bets`, F279–284.

Installed root: `C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/Presets/`.
Successful application logs, property changes and the refined opacity fallback are recorded in `../preset-usage.json`.

## aftr wordReveal

- Author: Arman Luthra.
- Pinned commit: `628397d700d6282fe2be4d42f4a388392250947a`.
- [Definition, text.jsx lines 152–155](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/panel/jsx/commands/text.jsx#L152-L155).
- [MIT license at the same commit](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/LICENSE), notice retained in `aftr-MIT-LICENSE.txt`.

The definition's +80px position, opacity 0, words-based selector, Ease High 20 / Ease Low 100 informed the native `Sudden` / `odds` / `shift` animators. To meet the requested four-frame reveal and one-frame stagger, this implementation uses three one-word Text layers and an Amount envelope rather than the original longer Offset animation. This is a documented adaptation, not an exact preset import. No aftr panel or additional plugin was installed.

## User/local assets

Input paths and verified original hashes are listed in `../../source-manifest.json` and `../verification.json`. Existing models, recordings, guides and source AEP/MP4 were left unchanged. Guide layers are disabled, locked, and marked as guides. They are not rendered scene artwork.

## UI assistance

The Computer Use workflow was attempted briefly for the phone material selector and stopped when the target interaction repeatedly failed. The user completed the material selection. Subsequent native renders, save/reopen renders and screen changes at two times verified the connection. The requested red recording-dot cover is a native masked solid inside the screen composition, not a modification of the input recording.
