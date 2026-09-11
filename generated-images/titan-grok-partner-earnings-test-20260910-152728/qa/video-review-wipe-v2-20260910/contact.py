from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math
root = Path(__file__).resolve().parent
frames = sorted((root/'frames').glob('sample-*.png'))
out=Image.new('RGB',(1920,232*math.ceil(len(frames)/4)),'#252525')
draw=ImageDraw.Draw(out)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',19)
for i,p in enumerate(frames):
    im=Image.open(p).convert('RGB').resize((480,206),Image.Resampling.LANCZOS)
    x,y=(i%4)*480,(i//4)*232
    out.paste(im,(x,y+26))
    draw.text((x+6,y+3),f'frame {i*6} / {i*.25:.2f}s',fill='white',font=font)
out.save(root/'contact.png')
