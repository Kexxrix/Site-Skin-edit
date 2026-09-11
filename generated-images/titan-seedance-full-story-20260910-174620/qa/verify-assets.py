from pathlib import Path
import hashlib
import json
import zipfile
from PIL import Image

root = Path(__file__).resolve().parents[1]
names = ['01-meet-titan','02-core-development','03-development-products-bridge','04-core-products','05-controls','06-records-bridge','07-partner-records','08-titan-solution']
saved = [json.loads(line) for line in (root/'qa/saved-outputs.jsonl').read_text(encoding='utf-8-sig').splitlines() if line.strip()]
assert len(saved) == 8
saved_by_name = {row['file']: row for row in saved}
def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()
technical = []
assert sorted(p.name for p in (root/'results').glob('*.png')) == [n+'.png' for n in names]
for name in names:
    path = root/'results'/f'{name}.png'
    with Image.open(path) as img:
        img.load()
        width, height = img.size
        fmt = img.format
        assert fmt == 'PNG'
        assert abs(width-height*16/9) <= 1, (name, width, height)
    digest = sha(path)
    assert digest == saved_by_name[path.name]['sha256'].lower()
    technical.append({'file':path.name,'bytes':path.stat().st_size,'format':fmt,'width':width,'height':height,'sha256':digest,'readable':True,'aspect_ratio_16_9_with_one_pixel_rounding':True})
assert len({r['sha256'] for r in technical}) == 8
sources = json.loads((root/'sources/reference-manifest.json').read_text(encoding='utf-8-sig'))
for source in sources['references']:
    assert sha(Path(source['absolute_path'])) == source['sha256'].lower()

archive = root/'titan-seedance-8-images.zip'
assert not archive.exists(), 'Do not overwrite an existing archive'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as out:
    for name in names:
        path = root/'results'/f'{name}.png'
        out.write(path,path.name)
with zipfile.ZipFile(archive) as check:
    assert check.testzip() is None
    assert check.namelist() == [n+'.png' for n in names]
    for record in technical:
        assert hashlib.sha256(check.read(record['file'])).hexdigest() == record['sha256']

prompt = (root/'prompts/09-seedance-full-video.txt').read_text(encoding='utf-8')
for number in range(1,9):
    assert prompt.count(f'@Image{number}') == 1
for text in ['MEET','TITAN','CORE SYSTEMS','BUILT IN-HOUSE','CONTROLS','REFINED IN PRACTICE','PARTNER EARNINGS','AUTO-CALCULATED & RECORDED','SOLUTION','16:9','12-second']:
    assert text in prompt
assert '21:9' not in prompt
report = {'image_count':8,'independent_hashes':8,'all_readable':True,'all_16_9_with_one_pixel_rounding':True,'dimensions_note':'1672x941 is a 16:9 canvas rounded to integer pixels; 1672-941*16/9=-0.888889 pixels. No dimensions were enforced or resized.','source_hashes_unchanged':len(sources['references']),'zip_entries':8,'zip_hashes_match':True,'prompt_reference_tags_in_order':list(range(1,9)),'video_submitted':False,'results':technical}
(root/'qa/verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

ref_paths = {r['id']:r['absolute_path'] for r in sources['references']}
asset_path = lambda n: str(root/'results'/f'{names[n-1]}.png')
lineage = {1:[],2:[asset_path(1),ref_paths['development-planning-photo']],3:[asset_path(2),asset_path(4)],4:[asset_path(1),ref_paths['cat-village-tablet'],ref_paths['cobalt-sportsbook-phone']],5:[asset_path(4),ref_paths['cobalt-sportsbook-phone']],6:[asset_path(7),asset_path(5)],7:[asset_path(1)],8:[asset_path(1)]}
reviews = [
    'MEET and TITAN correct; generous full-bleed studio; black type unobscured. Decorative silver sheet extends beyond image by design.',
    'CORE SYSTEMS and BUILT IN-HOUSE correct; two developers, pointing hand and monitor relationship legible; principal faces and hands uncut.',
    'Same staged people stay in receding photo panel; separate tablet and phone present; title correct. Photo-panel edge reaches top; faces and complete devices are inside 16:9. Extra 2.34:1 center crop could trim device lower edges.',
    'CAT VILLAGE cat/game tablet and separate navy sportsbook phone recognizable, complete and unoccluded; main title correct. Small source UI text is regenerated, not a pixel-perfect capture.',
    'Exact controls headline; violet signal reaches a closed lock in lower-right dimmed cell while neighbors remain lit. This is an explanatory overlay, not a captured admin action.',
    'Exact two-line earnings title maintained; mint records float toward three aligned groups below title; no cash or invented amounts.',
    'Exact two-line earnings title with hyphen and ampersand; three orderly record groups; no title occlusion or transfer claim.',
    'TITAN and SOLUTION correct; MEET removed; visual TITAN anchor and white studio match opening. Actual loop motion untested.'
]
run = json.loads((root/'run.json').read_text(encoding='utf-8-sig'))
run['status'] = 'eight_images_reviewed_video_prompt_ready_video_not_generated'
run['references'] = sources['references']
run['assets'] = []
for i, record in enumerate(technical,1):
    run['assets'].append({'id':f'{i:02d}','role':run['requested_roles_and_counts'][i-1]['role'],'file':asset_path(i),'prompt':str(root/'prompts'/f'{names[i-1]}.txt'),'reference_attachment_order':lineage[i],'tool_reference_mechanism':'referenced_image_paths' if lineage[i] else 'none_brand_new','storage':saved_by_name[record['file']],'generated':True,'qa_pass':True,'selected_by_agent':True,'accepted_by_user':False,'adopted':False,'visual_review':reviews[i-1],'technical':record})
run['counts'] = {'attempted':8,'generated':8,'failed':0,'skipped':0,'qa_pass':8,'selected_by_agent':8,'accepted_by_user':0,'rejected':0,'adopted':0}
run['shared_visual_rules']['inferred_from_selected_references'] = ['Black or white condensed sans-serif main headlines','Photographic office, pale product studio, violet controls, teal records, pearl-white brand bookends','Each scene has distinct materials; paired scenes share reference lineage']
run['video'].update({'status':'not_submitted','prompt':str(root/'prompts/09-seedance-full-video.txt'),'settings':str(root/'prompts/09-seedance-settings.md'),'reference_attachment_order':[asset_path(i) for i in range(1,9)],'native_output_verified':False})
run['remaining_limits'] = ['Small product-screen text differs from source captures','Story reference images are not verified hard timestamp keyframes','Actual video motion, text retention, 12-second duration and loop remain untested','Site display at a wider ratio could add cropping; site not modified']
run['next_action'] = 'Deliver eight images and the final video prompt. No video upload or generation has been performed.'
(root/'run.json').write_text(json.dumps(run,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False))
