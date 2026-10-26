from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).parent
source = Image.open(root / 'overview-all.png').convert('RGB')
for group in range(4):
    sheet = Image.new('RGB', (1920, 850), '#252525')
    draw = ImageDraw.Draw(sheet)
    for offset in range(5):
        index = group * 5 + offset
        draw.text((8, offset * 170 + 2), f'WHITE GOLD {index+1:02}', fill='#d8c898')
        top = 246 + index * 232
        crop = source.crop((2104, top, 4024, top + 140))
        sheet.paste(crop, (0, offset * 170 + 20))
    sheet.save(root / f'white-contact-{group+1}.png')
