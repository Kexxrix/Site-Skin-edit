import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3")
observations={
"action-withdraw": {
"actual_16px":"up arrow and thin U remain identifiable; extremely small size suppresses tonal details",
"actual_24px":"up arrow direction and thin U read immediately on white, off-white and orange backgrounds",
"actual_32px":"simple up arrow and U role remains clear",
"style":"single graphite family, nearly flat matte, restrained weak shading; no pedestal or accent color",
},
"action-message": {
"actual_16px":"closed envelope remains identifiable; transparent V is weaker at this size",
"actual_24px":"closed envelope and clean V flap hint read immediately on white, off-white and orange backgrounds",
"actual_32px":"envelope and V remain clear",
"style":"single graphite family, nearly flat matte, no protruding letter, seal, badge or lower X diagonals",
}}
for name,obs in observations.items():
    p=root/"refs"/f"{name}-generation.json"
    record=json.loads(p.read_text(encoding="utf-8"))
    record["visual_review"]={
      "result":"passed with recorded minor alpha note",
      "actual_sizes":[16,24,32],
      "backgrounds":["#FFFFFF","#F2F3F4","#EA981B"],
      "observations":obs,
      "evidence":str(root/"qa"/"action-withdraw-message-small-sizes.png"),
      "review_record":str(root/"qa"/"action-withdraw-message-review.ko.md"),
      "iterations":1,
      "clear_visual_defects":"none observed at native sizes",
      "alpha_note":"a few 1/255 alpha pixels outside primary silhouette enlarge nonzero bbox; >=2 alpha bbox hugs silhouette; not visible in native-size bright-background QA; source alpha preserved",
      "css_mask_validation":"not tested",
    }
    record["status"]["visual_review"]="passed candidate"
    p.write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
qa=root/"qa"/"action-withdraw-message-small-sizes.png"
sheet=Image.open(qa).convert("RGB")
draw=ImageDraw.Draw(sheet)
draw.rectangle((0,0,779,34),fill="#E3E5E8")
font=ImageFont.truetype(r"C:/Windows/Fonts/arial.ttf",14)
draw.text((14,10),"Native pixels + nearest enlargement (16px: 4x; 24/32px: 2x)",font=font,fill="#26313B")
sheet.save(qa,format="PNG")
print("Visual review recorded for both icons. No asset pixels changed.")

