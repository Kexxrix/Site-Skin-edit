"""Preserve 18 source PNGs in <=8MiB parts plus one complete derivative package."""
from datetime import datetime,timezone
import hashlib,io,json,zipfile
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
MAX=8*1024*1024
BUDGET=int(7.25*1024*1024)
def load(path):return json.loads((ROOT/path).read_text(encoding='utf-8'))
def digest(data):return hashlib.sha256(data).hexdigest()
def write_new(path,value):
    with (ROOT/path).open('x',encoding='utf-8') as file:json.dump(value,file,ensure_ascii=False,indent=2)

technical=load('qa/technical-complete.json')
aligned=load('qa/aligned-export-validation.json')
reused=load('refs/reused-assets.json')
retained=load('refs/retained-page-sources.json')['assets']
generated={path.stem.removesuffix('-generation'):json.loads(path.read_text(encoding='utf-8')) for path in (ROOT/'refs').glob('*-generation.json')}
assert len(generated)==8
copied={Path(row['target']).stem:row for row in reused}
page={row['name']:row for row in retained}
aligned_by_name={row['name']:row for row in aligned['assets']}
assets=[]
for row in technical['assets']:
    name=row['name'];source=ROOT/'results'/(name+'.png');raw=source.read_bytes()
    assert digest(raw)==row['sha256']
    asset={**row,'final_path':str(source),'aligned_exports':aligned_by_name[name],
           'generation_complete':True,'static_technical_validation':'passed','static_role_validation':'24/32px passed;16px limitations documented',
           'user_final_approval':False,'site_adoption':False,'strict_source_alpha_cleanliness':'low-alpha residuals preserved where present;not asserted spotless',
           'CSS_mask_validation':'not applied or tested'}
    if name in generated:
        asset.update({'method':'built-in image_gen independent PNG','local_new_generation':True,'provenance':generated[name],
                      'actual_prompt':'prompts/'+name+'.txt','original_tool_output_path':None,
                      'original_tool_output_path_reason':'Embedded PNG data URL was returned;no original filesystem path supplied'})
        logs=generated[name]
        source_hash=logs.get('source_sha256') or logs.get('before_storage_sha256') or logs.get('sha256_before')
        saved_hash=logs.get('final_sha256') or logs.get('after_storage_sha256') or logs.get('sha256_after')
        assert source_hash==row['sha256'] and saved_hash==row['sha256'],name+' generation hash'
    elif name in copied:
        assert copied[name]['sha256']==row['sha256'] and copied[name]['hash_match']
        assert digest(Path(copied[name]['source']).read_bytes())==row['sha256']
        asset.update({'method':'exact copy of prior prepared original','local_new_generation':False,'provenance':copied[name],
                      'original_tool_output_path':None,'original_tool_output_path_reason':'Existing source provenance is in prior v2 run.json;this run copied it unchanged'})
    elif name in page:
        assert page[name]['sha256']==row['sha256'] and page[name]['byte_size']==len(raw)
        asset.update({'method':'exact Page MCP ImageContent byte copy','local_new_generation':False,'provenance':page[name],
                      'original_tool_output_path':None,'original_tool_output_path_reason':'Cloud original Page bytes supplied by parent;generator filesystem path not supplied'})
    else:raise AssertionError(name+' unaccounted source')
    assets.append(asset)
assert len(assets)==18

parts=[];current=[];bytes_used=0
for path in sorted((ROOT/'results').glob('*.png')):
    if current and bytes_used+path.stat().st_size>BUDGET:
        parts.append(current);current=[];bytes_used=0
    current.append(path);bytes_used+=path.stat().st_size
if current:parts.append(current)
assert len(parts)==2
source_plan=[{'file':f'ALDEBARAN-v3-source-part{idx:02d}.zip','originals':[path.name for path in paths]} for idx,paths in enumerate(parts,1)]
manifest={'schema_version':3,'topic':'aldebaran-simple-v3','completed_utc':datetime.now(timezone.utc).isoformat(),
    'output_root':str(ROOT),'destination_basis':'Latest instruction:new version folder;prior v2 preserved',
    'source_thread_id':'01a0fa9a-9258-700d-8ddb-f84cf481c01a','source_page_id':'page_47645aed071c81918769018d818cb7f0',
    'status':'18-candidate set production/static QA/local preservation complete',
    'counts':{'independent_originals':18,'new_builtin_imagegen_outputs_this_resume':8,'reused_or_Page_copied_originals':10,
              'source_regeneration_for_retained_items':0,'native_size_derivatives':72,'aligned_size_derivatives':72,
              'native_16_24_32_derivatives':54,'aligned_16_24_32_derivatives':54,'preview_256px_derivatives':36},
    'source_bytes':sum(row['bytes'] for row in assets),'assets':assets,
    'generation_tool':'image_gen.imagegen built-in only','prompt_directory':'prompts',
    'parallel_production_groups':['mono_arrows_mail:2','mono_support_calendar_bell:3','gift_ticket_helmet:3'],
    'source_preservation':'Exact-byte copying/saving with matching SHA256;no prior originals overwritten/deleted',
    'native_export_method':'LANCZOS RGBA full-canvas resampling',
    'aligned_export_method':'Functions:geometric transparent canvas alignment to15% nominal long-axis padding,alpha32 bbox+2% guard;source pixels untouched. Sports:exact native derivative byte copy',
    'technical_validation':'source/decode/alpha/size/hash,derivatives,actual-size QA passed;archive evidence in package-index.json',
    'visual_review':'Actual16/24/32px native+aligned and nearest3x reviewed on white,panel,orange;24px role priority met',
    'remaining_user_review':['Final aesthetics and balance of the complete18 candidates','16px fine cues:gift loop/MMA finger holes/F1 details/ticket notches','Actual site adoption and CSS mask behavior if requested'],
    'user_final_approval':False,'site_adoption':False,'site_code_changed':False,'local_server_or_old_browser_opened':False,
    'additional_paid_API_or_package_install':False,'security_settings_changed':False,'failed_Library_download_retries':0,
    'latest_QA_Page_uploads':load('refs/latest-QA-page-uploads.json'),
    'Page_body_edited_by_this_task':False,'packages':{'limit_bytes':MAX,'sources':source_plan,
                                                  'derivatives':'ALDEBARAN-v3-18-icons-apply.zip','validation':'package-index.json outside archives'}
}
write_new('run.json',manifest)
common=[ROOT/name for name in ('README.ko.md','ROLE-MAP.ko.md','run.json')]
packages=[]
def make_zip(name,files,kind):
    destination=ROOT/name
    files=sorted(set(files))
    with zipfile.ZipFile(destination,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for path in files:
            assert ROOT in path.resolve().parents
            archive.write(path,path.relative_to(ROOT).as_posix())
    assert destination.stat().st_size<=MAX,name+' over limit'
    with zipfile.ZipFile(destination) as archive:
        assert archive.testzip() is None
        for path in files:
            data=archive.read(path.relative_to(ROOT).as_posix())
            assert digest(data)==digest(path.read_bytes())
            if path.suffix.lower()=='.png':
                with Image.open(io.BytesIO(data)) as png:png.verify()
    info={'file':name,'kind':kind,'path':str(destination),'bytes':destination.stat().st_size,
          'MiB':round(destination.stat().st_size/(1024*1024),3),'sha256':digest(destination.read_bytes()),
          'under_8MiB':True,'entries':len(files),'CRC':'passed','source_entry_hashes':'all match','PNG_decode':'passed',
          'files':[path.relative_to(ROOT).as_posix() for path in files]}
    packages.append(info)
for idx,paths in enumerate(parts,1):make_zip(source_plan[idx-1]['file'],common+paths,'original-source-part')
apply_files=common.copy()
for directory in ('exports','prompts','qa','tools'):
    apply_files.extend(path for path in (ROOT/directory).rglob('*') if path.is_file() and '__pycache__' not in path.parts)
apply_files.extend((ROOT/'refs').glob('*.json'))
make_zip('ALDEBARAN-v3-18-icons-apply.zip',apply_files,'complete-derivatives-QA-and-records')
write_new('package-index.json',{'schema_version':1,'original_count':18,'all_originals_accounted_for':True,
                               'all_packages_under_8MiB':True,'packages':packages})
print(json.dumps([{'file':p['file'],'bytes':p['bytes'],'MiB':p['MiB'],'sha256':p['sha256'],'entries':p['entries']} for p in packages]))
