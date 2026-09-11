from pathlib import Path
import subprocess, json, csv, hashlib
from PIL import Image, ImageStat

root = Path(__file__).parent
source = Path('D:/WebDL/grok-ba08ecc8-52f4-4422-b14f-5527715f84d2.mp4')
source_hash_before = hashlib.sha256(source.read_bytes()).hexdigest()
probe = json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,avg_frame_rate,duration,nb_frames','-of','json',str(source)], text=True))
stream = probe['streams'][0]
width, height = stream['width'], stream['height']
num, den = map(int, stream['avg_frame_rate'].split('/'))
fps = num / den
frame_bytes = width*height*3
process = subprocess.Popen(['ffmpeg','-v','error','-i',str(source),'-map','0:v:0','-f','rawvideo','-pix_fmt','rgb24','-'], stdout=subprocess.PIPE)
rows = []
while True:
    raw = process.stdout.read(frame_bytes)
    if not raw: break
    if len(raw) != frame_bytes: raise RuntimeError(f'Incomplete frame {len(rows)}: {len(raw)} bytes')
    im = Image.frombytes('RGB',(width,height),raw)
    extrema = im.getextrema()
    means = ImageStat.Stat(im).mean
    n = len(rows)
    rows.append({'frame_zero_based':n,'time_seconds':round(n/fps,9),'rgb_max':max(v[1] for v in extrema),'rgb_min':min(v[0] for v in extrema),'mean_rgb_brightness_0_255':sum(means)/3,'mean_r':means[0],'mean_g':means[1],'mean_b':means[2]})
process.stdout.close()
if process.wait() != 0: raise RuntimeError('ffmpeg decode failed')

def runs_for(threshold):
    runs=[]
    start=None
    for i,row in enumerate(rows+[{'rgb_max':256}]):
        passing=row['rgb_max']<=threshold
        if passing and start is None: start=i
        if not passing and start is not None:
            end=i-1
            runs.append({'first_frame_inclusive':start,'last_frame_inclusive':end,'frame_count':end-start+1,'start_seconds_inclusive':start/fps,'last_frame_timestamp_seconds':end/fps,'end_seconds_exclusive':i/fps,'duration_seconds':(end-start+1)/fps,'max_rgb_in_run':max(r['rgb_max'] for r in rows[start:i]),'max_mean_rgb_brightness_in_run':max(r['mean_rgb_brightness_0_255'] for r in rows[start:i])})
            start=None
    return runs

source_hash_after=hashlib.sha256(source.read_bytes()).hexdigest()
result={
    'source':str(source),
    'source_sha256_before':source_hash_before,
    'source_sha256_after':source_hash_after,
    'source_hash_unchanged':source_hash_before==source_hash_after,
    'method':'Sequential FFmpeg video-stream RGB24 decode. rgb_max is the maximum of every R/G/B channel value in a whole frame. Mean RGB brightness is the arithmetic mean of all channel values, range 0-255; it is not perceptual luma. Frame numbering is zero-based; intervals use the first frame timestamp inclusive and the timestamp after the last passing frame exclusive.',
    'width':width,'height':height,'fps':fps,'decoded_frames':len(rows),'decoded_duration_seconds':len(rows)/fps,
    'thresholds':{'exact_black_rgb_max_eq_0':runs_for(0),'near_black_rgb_max_le_3_including_exact_black':runs_for(3),'looser_rgb_max_le_8_including_exact_black':runs_for(8)},
    'frames':rows,
    'scope':'Numerical whole-frame blackness only. This does not independently assess title spelling, graphic occlusion, visual quality, or prompt compliance.'
}
(root/'blackout-metrics.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
with (root/'frame-brightness.csv').open('w',newline='',encoding='utf-8-sig') as f:
    writer=csv.DictWriter(f,fieldnames=list(rows[0]))
    writer.writeheader(); writer.writerows(rows)
summary={k:v for k,v in result.items() if k!='frames'}
print(json.dumps(summary,ensure_ascii=False,indent=2))
print('Adjacent transition samples:')
for row in rows:
    i=row['frame_zero_based']
    if any(abs(i-r['first_frame_inclusive'])<=2 or abs(i-r['last_frame_inclusive'])<=2 for r in result['thresholds']['near_black_rgb_max_le_3_including_exact_black']):
        print(json.dumps(row))
