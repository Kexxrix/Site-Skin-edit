# Video and banner layout revision

- User source: frame 618:65586, 07B 동영상베너. Original frame preserved unchanged (digest d42315a).
- New screen: 624:45881, in section 624:45880 on comparison page 347:553.
- Independent banner masters: 623:5570 / 623:5582 / 623:5594 on component page 435:14043. Shared Roomy banner masters preserved.
- Kept the existing left banner stack and right native video arrangement. All three banner artworks now fit their exact 3:1 source ratio at 523 x 174.333px. The vertical stack and video both measure 547px high, with 12px spacing between banners and columns.
- Preserved video paint, filters, scale mode and videoHash. The video panel is resized to 1057 x 547px; its visible crop changes with the revised panel ratio. No video transcoding, media replacement or image generation.
- Native editable text and CTA layers retained. Title 26px, description 13px, button text 14px; no text trim. Independent dark gradient on the left supports readable copy while retaining the full image.
- Initial rendered review found orphaned final syllables caused by the inherited 260px copy max-width. Increased only the new copy containers to 304px, yielding 272px text width and one-line descriptions on all three banners. Final artwork subjects and labels remain clearly visible.
- Structural PASS: source frame and shared masters unchanged; header/sidebar unchanged; all sections below the hero retain their internal structure and content, moving down through auto-layout. All three banner copy stacks fit their bounds without overlaps.
- Visual PASS: final hero and complete screen screenshots inspected after the copy-width correction. Earlier screenshots are retained as diagnostic evidence; hero-final.png and screen-final.png are authoritative.
- Video playback was not tested; verification covers the Figma layout render and native VIDEO paint preservation. No website code changes.
