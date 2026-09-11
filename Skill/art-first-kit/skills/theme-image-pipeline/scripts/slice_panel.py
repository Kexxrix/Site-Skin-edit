"""Export a horizontal three-slice panel and a portable browser sizing tool."""
import argparse
import base64
import hashlib
import io
import json
import math
from pathlib import Path

from PIL import Image


def geometry(size, width, height, left, right):
    source_width, source_height = size
    if min(width, height, left, right) < 1:
        raise ValueError("Width, height, and both cap widths must be positive integers.")
    if left + right >= source_width:
        raise ValueError("The source must have a nonempty middle slice.")
    if width > 8192 or height > 4096 or width * height > 16_777_216:
        raise ValueError("Output limit: 8192x4096 and 16 million pixels.")
    scaled_left = math.floor(left * height / source_height + 0.5)
    scaled_right = math.floor(right * height / source_height + 0.5)
    if min(scaled_left, scaled_right) < 1:
        raise ValueError("The height is too small to retain both end caps.")
    if width <= scaled_left + scaled_right:
        raise ValueError(f"Width must be at least {scaled_left + scaled_right + 1}px at this height.")
    return scaled_left, scaled_right


def render_panel(source, width, height, left, right):
    """Scale caps uniformly with height; stretch only the middle horizontally."""
    dl, dr = geometry(source.size, width, height, left, right)
    sw, sh = source.size
    output = Image.new("RGBA", (width, height))
    regions = [((0, 0, left, sh), (dl, height), 0),
               ((left, 0, sw - right, sh), (width - dl - dr, height), dl),
               ((sw - right, 0, sw, sh), (dr, height), width - dr)]
    for box, size, x in regions:
        piece = source.crop(box)
        if piece.size != size:
            piece = piece.resize(size, Image.Resampling.LANCZOS)
        # A masked paste would apply alpha twice. Copy the RGBA pixels directly.
        output.paste(piece, (x, 0))
    return output


def png_bytes(image):
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def export(source_path, out_dir, widths, height, left, right):
    source_bytes = source_path.read_bytes()
    with Image.open(io.BytesIO(source_bytes)) as image:
        source = image.convert("RGBA")
    height = source.height if height is None else height
    widths = list(dict.fromkeys(widths))
    for width in widths:
        geometry(source.size, width, height, left, right)
    files = {"source.png": png_bytes(source)}
    sw, sh = source.size
    slices = {"left": (0, 0, left, sh), "middle": (left, 0, sw - right, sh),
              "right": (sw - right, 0, sw, sh)}
    for name, box in slices.items():
        files[f"slices/{name}.png"] = png_bytes(source.crop(box))
    outputs = []
    for width in widths:
        name = f"panel-{width}x{height}.png"
        files[name] = png_bytes(render_panel(source, width, height, left, right))
        outputs.append({"file": name, "width": width, "height": height,
                        "ratio": width / height, "sha256": hashlib.sha256(files[name]).hexdigest()})
    manifest = {"source": str(source_path.resolve()), "source_sha256": hashlib.sha256(source_bytes).hexdigest(),
                "source_size": [sw, sh], "left": left, "right": right,
                "slices": slices, "outputs": outputs,
                "method": "3-slice; end caps scale uniformly with height, middle stretches horizontally",
                "limitation": "Middle texture changes horizontally; minimum width is scaled caps plus one pixel.",
                "user_accepted": False}
    config = {"source": "data:image/png;base64," + base64.b64encode(files["source.png"]).decode(),
              "name": source_path.name, "left": left, "right": right,
              "width": widths[0], "height": height}
    template = Path(__file__).with_name("app-template.html").read_text(encoding="utf-8")
    files["panel-sizer.html"] = template.replace("__PANEL_CONFIG__", json.dumps(config).replace("</", "<\\/")).encode("utf-8")
    files["slices.json"] = json.dumps(manifest, ensure_ascii=False, indent=2).encode("utf-8")
    files["panel.css"] = f"""/* Three images in order: slices/left.png, middle.png, right.png. */
.panel {{ --panel-height: 64px; display: flex; width: 320px; height: var(--panel-height);
  min-width: calc(var(--panel-height) * {(left + right) / sh:.8f} + 1px); }}
.panel > img {{ display: block; height: 100%; object-fit: fill; }}
.panel > img:first-child {{ width: calc(var(--panel-height) * {left / sh:.8f}); flex: none; }}
.panel > img:nth-child(2) {{ width: 0; min-width: 0; flex: 1; }}
.panel > img:last-child {{ width: calc(var(--panel-height) * {right / sh:.8f}); flex: none; }}
""".encode("utf-8")
    collisions = [str(out_dir / name) for name in files if (out_dir / name).exists()]
    if collisions:
        raise FileExistsError("Refusing to overwrite existing outputs: " + ", ".join(collisions))
    for name, data in files.items():
        path = out_dir / name
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("xb") as stream:
            stream.write(data)
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Tightly trimmed panel image")
    parser.add_argument("--out-dir", type=Path, required=True)
    parser.add_argument("--left", type=int, required=True, help="Left cap width in source pixels")
    parser.add_argument("--right", type=int, required=True, help="Right cap width in source pixels")
    parser.add_argument("--width", type=int, action="append", required=True)
    parser.add_argument("--height", type=int)
    args = parser.parse_args()
    try:
        result = export(args.source, args.out_dir, args.width, args.height, args.left, args.right)
    except (ValueError, OSError) as exc:
        parser.exit(2, f"Error: {exc}\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
