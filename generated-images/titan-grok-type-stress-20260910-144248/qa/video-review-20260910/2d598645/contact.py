from pathlib import Path
from PIL import Image, ImageDraw
root=Path(__file__).parent
frames=sorted(root.glob('sample-*.jpg'))
for page,start in enumerate(range(0,len(frames),9),1):
    sheet=Image.new('RGB',(1746,840),'#272727')
    d=ImageDraw.Draw(sheet)
    for i,p in enumerate(frames[start:start+9]):
        im=Image.open(p).resize((582,250))
        x,y=i%3*582,i//3*280
        sheet.paste(im,(x,y+30))
        d.text((x+10,y+8),f'{(start+i)/4:.2f}s | frame {(start+i)*6}',fill='white')
    sheet.save(root/f'contact-{page:02d}.jpg',quality=95)
frames=sorted(root.glob('detail-*.png'))
indices=[16,18,20,22,24,90,92,94,96,98,100,102]
sheet=Image.new('RGB',(1746,1120),'#272727')
d=ImageDraw.Draw(sheet)
for i,p in enumerate(frames):
    im=Image.open(p).resize((582,250))
    x,y=i%3*582,i//3*280
    sheet.paste(im,(x,y+30))
    d.text((x+10,y+8),f'{indices[i]/24:.3f}s | frame {indices[i]}',fill='white')
sheet.save(root/'detail-contact.jpg',quality=96)
