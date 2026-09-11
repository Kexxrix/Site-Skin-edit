import json,re,hashlib
from pathlib import Path
root=Path(r'E:/codexwork/Site-Skin-edit/generated-images/titan-korean-sequence-20260910-190140')
meta=json.loads((root/'run.json').read_text(encoding='utf-8-sig'))
specs={
'01':('01-intro',[]),
'02':('02-core-systems',['results/01-intro.png']),
'03':('03-directly',['results/02-core-systems.png']),
'04':('04-developed',['results/03-directly.png']),
'05':('05-cat-village-device-only',['qa/superseded/05-cat-village-with-podium.png']),
'06':('06-sportsbook-device-only',['qa/superseded/06-sportsbook-with-podium.png']),
'07':('07-operations-retry-01',['qa/rejected/07-operations-attempt-01.png']),
'08':('08-odds-shift',['results/07-operations.png']),
'09':('09-auto-block',['results/08-odds-shift.png']),
'10':('10-limit-change',['results/07-operations.png'])
}
for asset in meta['assets']:
    scene=asset['file'][:2];prompt,refs=specs[scene]
    asset['scene_id']=scene
    asset['prompt_path']=str(root/'prompts'/f'{prompt}.txt')
    asset['reference_images']=[{'path':str(root/r),'sha256':hashlib.sha256((root/r).read_bytes()).hexdigest()} for r in refs]
    asset['generation_tool']='Codex built-in image_gen'
meta['prior_attempt_records']=[
 'qa/rejected/05-attempt-01.json',
 'qa/rejected/07-attempt-01.json',
 'qa/superseded/device-podium-revision.json'
]
meta['prior_generation_lineage']=[
 {'scene':'05','stage':'initial','prompt':'prompts/05-cat-village.txt','references':['results/04-developed.png','../titan-video-frames-20260909-174303/sources/cat-village-tablet-character.png'],'output':'qa/rejected/05-cat-village-attempt-01.png'},
 {'scene':'05','stage':'layout_correction','prompt':'prompts/05-cat-village-retry-01.txt','references':['qa/rejected/05-cat-village-attempt-01.png'],'output':'qa/superseded/05-cat-village-with-podium.png'},
 {'scene':'06','stage':'initial','prompt':'prompts/06-sportsbook.txt','references':['qa/superseded/05-cat-village-with-podium.png','../titan-video-frames-20260909-174303/sources/chosen-sportsbook-phone.png'],'reference_path_note':'05 was in results at generation time; now archived after user revision.','output':'qa/superseded/06-sportsbook-with-podium.png'},
 {'scene':'07','stage':'initial','prompt':'prompts/07-operations.txt','references':['results/02-core-systems.png','results/06-sportsbook.png'],'output':'qa/rejected/07-operations-attempt-01.png'}
]
(root/'run.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
text=(root/'english-storyboard-v2.md').read_text(encoding='utf-8')
links=re.findall(r'\]\(([^)]+)\)',text)
local=[x for x in links if not x.startswith(('https://','http://'))]
missing=[x for x in local if not (root/x).resolve().exists()]
rows=re.findall(r'^\| (\d\d) \| (\d+\.\d+)–(\d+\.\d+) \|',text,re.M)
timeline=[(i,float(s),float(e)) for i,s,e in rows]
sequential=all(timeline[i][2]==timeline[i+1][1] for i in range(len(timeline)-1))
qa={'document':'english-storyboard-v2.md','rows':len(rows),'scene_ids':[i for i,_,_ in timeline],'timing_start':timeline[0][1],'timing_end':timeline[-1][2],'timing_sum':round(sum(e-s for _,s,e in timeline),3),'timing_continuous':sequential,'local_links':len(local),'missing_local_links':missing,'existing_png_count':len(list((root/'results').glob('*.png'))),'english_png_count':0,'image_generation_prohibited':True}
(root/'qa'/'english-storyboard-validation.json').write_text(json.dumps(qa,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(qa,ensure_ascii=False))
assert len(rows)==16 and sequential and qa['timing_sum']==20 and not missing

