import base64, hashlib, io, json
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3").resolve()
expected_root = Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3").resolve()
assert root == expected_root and root.is_dir()
reference = {
    "page_id": "page_47645aed071c81918769018d818cb7f0",
    "reference": "library-file:fde1_bGliZmlsZV95Z1l2cVF0T001WXVWSFpHeUJDZTFR_FileDrive_0981513dfcb08191b072af9fa2582442",
    "sha256": "bf07e48a3bd6d21f6d8eca98c3bc1c2a42720dd6ddf9e462e2cf094e54aa3833",
    "role": "edit target for withdrawal; style reference only for message",
}
names = ("action-withdraw", "action-message")
sizes = (16, 24, 32)
all_records = {}
for name in names:
    payload_file = root / "refs" / f"{name}-tool-payload.base64"
    data = base64.b64decode(payload_file.read_text(encoding="utf-8").strip(), validate=True)
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    before_hash = hashlib.sha256(data).hexdigest()
    target = root / "results" / f"{name}.png"
    assert target.parent.resolve().is_relative_to(root)
    with target.open("xb") as handle:
        handle.write(data)
    after = target.read_bytes()
    after_hash = hashlib.sha256(after).hexdigest()
    assert before_hash == after_hash
    with Image.open(io.BytesIO(after)) as check:
        assert check.format == "PNG"
        check.verify()
    with Image.open(target) as image:
        image.load()
        assert image.mode == "RGBA"
        rgba = image.copy()
    alpha = rgba.getchannel("A")
    extrema = alpha.getextrema()
    assert extrema == (0,255)
    bbox = alpha.getbbox()
    bbox32 = alpha.point(lambda a: 255 if a >= 32 else 0).getbbox()
    w,h=rgba.size
    assert all(alpha.getpixel(p) == 0 for p in ((0,0),(w-1,0),(0,h-1),(w-1,h-1)))
    opaque_colors = [pixel[:3] for pixel in rgba.getdata() if pixel[3] == 255]
    median_rgb = [sorted(p[c] for p in opaque_colors)[len(opaque_colors)//2] for c in range(3)]
    exports=[]
    for size in sizes:
        small=rgba.resize((size,size), Image.Resampling.LANCZOS)
        dest=root / "exports" / str(size) / f"{name}.png"
        dest.parent.mkdir(parents=True,exist_ok=True)
        with dest.open("xb") as handle:
            small.save(handle, format="PNG")
        with Image.open(dest) as check:
            check.load()
            assert check.mode == "RGBA" and check.size == (size,size)
        exports.append({"path": str(dest), "size": [size,size], "byte_size": dest.stat().st_size, "sha256": hashlib.sha256(dest.read_bytes()).hexdigest()})
    record={
        "icon": name,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "tool": "image_gen.imagegen",
        "tool_mode": "built-in",
        "original_tool_output_path": None,
        "tool_output_transport": "embedded data:image/png;base64 URL; tool returned no local original path",
        "local_storage_operation": "exact byte decode from returned base64; no re-encode or color/alpha editing",
        "tool_payload_base64": str(payload_file),
        "final_path": str(target),
        "prompt_path": str(root/"prompts"/f"{name}.txt"),
        "prompt_sha256": hashlib.sha256((root/"prompts"/f"{name}.txt").read_bytes()).hexdigest(),
        "input_reference": reference,
        "before_storage_sha256": before_hash,
        "after_storage_sha256": after_hash,
        "byte_size": len(data),
        "format": "PNG",
        "mode": "RGBA",
        "size": list(rgba.size),
        "alpha_extrema": list(extrema),
        "alpha_bbox_nonzero": list(bbox),
        "alpha_bbox_at_least_32": list(bbox32),
        "corner_alpha": [0,0,0,0],
        "opaque_median_rgb": median_rgb,
        "exports": exports,
        "technical_validation": "passed PNG signature, PNG decode/readability, RGBA, genuine alpha range and transparent corners, exact SHA256 byte preservation, size exports",
        "visual_review": "pending actual 16/24/32px viewing",
        "status": {"generation":"complete","technical_validation":"passed","user_approval":"pending","site_adoption":"not applied"},
    }
    record_path=root/"refs"/f"{name}-generation.json"
    with record_path.open("x",encoding="utf-8") as handle:
        json.dump(record,handle,ensure_ascii=False,indent=2)
        handle.write("\n")
    all_records[name]=record

colors=[("white","#FFFFFF"),("off-white","#F2F3F4"),("orange","#EA981B")]
font=ImageFont.truetype(r"C:/Windows/Fonts/arial.ttf",14)
smallfont=ImageFont.truetype(r"C:/Windows/Fonts/arial.ttf",12)
sheet=Image.new("RGB",(780,490),"#E3E5E8")
draw=ImageDraw.Draw(sheet)
draw.text((14,10),"Native pixels + 4x nearest enlargement; original alpha preserved",font=font,fill="#26313B")
for c,(label,color) in enumerate(colors):
    x=120+c*220
    draw.text((x+10,40),label,font=font,fill="#26313B")
row=0
for name in names:
    for size in sizes:
        y=65+row*68
        draw.text((10,y+18),f"{name.split('-')[-1]} {size}px",font=smallfont,fill="#26313B")
        with Image.open(root/"exports"/str(size)/f"{name}.png") as image:
            icon=image.copy()
        for c,(_,color) in enumerate(colors):
            x=120+c*220
            cell=Image.new("RGBA",(212,64),color)
            cell.alpha_composite(icon,(25+(32-size)//2, (64-size)//2))
            zoom=icon.resize((size*4,size*4),Image.Resampling.NEAREST)
            if zoom.height>64:
                # Larger diagnostic is displayed in a separate sheet below; keep this sheet at native size.
                zoom=icon.resize((size*2,size*2),Image.Resampling.NEAREST)
            cell.alpha_composite(zoom,(92,(64-zoom.height)//2))
            sheet.paste(cell.convert("RGB"),(x,y))
        row+=1
qa=root/"qa"/"action-withdraw-message-small-sizes.png"
with qa.open("xb") as handle:
    sheet.save(handle,format="PNG")
print(json.dumps({"records":all_records,"qa_sheet":str(qa)},ensure_ascii=False,indent=2))

