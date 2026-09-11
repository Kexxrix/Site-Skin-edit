from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).parent
frames = sorted(root.glob('sample-*.jpg'))
thumb_w, thumb_h = 582, 250
for batch, start in enumerate(range(0, len(frames), 9), 1):
    chunk = frames[start:start+9]
    sheet = Image.new('RGB', (thumb_w*3, (thumb_h+30)*3), '#272727')
    draw = ImageDraw.Draw(sheet)
    for i, frame in enumerate(chunk):
        im = Image.open(frame)
        im.thumbnail((thumb_w,thumb_h))
        x, y = (i%3)*thumb_w, (i//3)*(thumb_h+30)
        sheet.paste(im, (x,y+30))
        draw.text((x+10,y+7), f'{(start+i)*0.25:.2f}s | source frame {(start+i)*6}', fill='white')
    sheet.save(root/f'contact-{batch:02d}.jpg', quality=95)
