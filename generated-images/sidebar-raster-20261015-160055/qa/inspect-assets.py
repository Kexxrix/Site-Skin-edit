from PIL import Image
from pathlib import Path
import hashlib,json
rows=[]
for p in sorted(Path(r'E:/codexwork/Site-Skin-edit/generated-images/sidebar-raster-20261015-160055/results').glob('*.png')):
 im=Image.open(p); im.load(); a=im.getchannel('A')
 rows.append({'file':p.name,'format':im.format,'size':list(im.size),'mode':im.mode,'alpha':list(a.getextrema()),'bbox':list(a.getbbox()),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size})
print(json.dumps(rows))
