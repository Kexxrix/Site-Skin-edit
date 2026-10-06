from pathlib import Path
import hashlib,json,os,re,collections,difflib
ROOT=Path(__file__).resolve().parents[1]
baseline=json.loads((ROOT/'before-files.json').read_text(encoding='utf-8'))
SITE=Path(baseline['target']);DARK=Path(baseline['reference_source'])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
changes=[]
for row in baseline['target_files']:
    path=SITE/row['path'];assert path.exists(),row['path']+' removed'
    if sha(path)!=row['sha256']:changes.append(row['path'])
for row in baseline['protected_original_files']:
    path=DARK/row['path'];assert path.exists() and sha(path)==row['sha256'],row['path']+' protected source changed'
allowed={'app/aldebaran-wog-r5.tsx','app/aldebaran-white.css'}
assert set(changes)==allowed,changes
before=json.loads((ROOT/'before-browser.json').read_text(encoding='utf-8'))
after=json.loads((ROOT/'after-browser.json').read_text(encoding='utf-8'))
assert before['text']==after['text'];assert before['selectionIds']==after['selectionIds']
outer_select=lambda x:x['class'] in ('ab5-header','ab5-center','ab5-rail ab5-scroll') or x['class'].startswith('ab5-quick-action') or x['class']=='ab5-bet-submit'
outer_before=[x for x in before['geometry'] if outer_select(x)];outer_after=[x for x in after['geometry'] if outer_select(x)]
assert outer_before==outer_after
file=SITE/'app/aldebaran-wog-r5.tsx';old=(ROOT/'before-source/app/aldebaran-wog-r5.tsx').read_text(encoding='utf-8');new=file.read_text(encoding='utf-8')
events=lambda text:collections.Counter(re.findall(r'\bon[A-Z]\w*=\{([^\n]*?)\}',text))
assert events(old)==events(new)
diff=''.join(difflib.unified_diff(old.splitlines(keepends=True),new.splitlines(keepends=True),fromfile='before/app/aldebaran-wog-r5.tsx',tofile='after/app/aldebaran-wog-r5.tsx'))
oldcss=(ROOT/'before-source/app/aldebaran-white.css').read_text(encoding='utf-8');newcss=(SITE/'app/aldebaran-white.css').read_text(encoding='utf-8')
diff+=''.join(difflib.unified_diff(oldcss.splitlines(keepends=True),newcss.splitlines(keepends=True),fromfile='before/app/aldebaran-white.css',tofile='after/app/aldebaran-white.css'))
(ROOT/'app-change.diff').write_text(diff,encoding='utf-8')
copies=json.loads((ROOT/'asset-copy-record.json').read_text(encoding='utf-8'))
for row in copies:assert sha(Path(row['source']))==row['sha256']==sha(Path(row['target']))
report={'changed_existing_files':changes,'changed_file_hashes':[{'path':p,'sha256':sha(SITE/p),'bytes':(SITE/p).stat().st_size} for p in changes],
        'protected_original_count':len(baseline['protected_original_files']),'protected_original_passed':True,
        'preexisting_target_assets_preserved':sum(x['path'].startswith('public/') for x in baseline['target_files']),
        'new_PNGs':len(copies),'asset_hashes_match':True,'body_text_identical':True,'selection_IDs_identical':True,
        'outer_geometry_identical':True,'outer_geometry_count':len(outer_before),'event_handlers_identical':True,
        'inner_changes':'Approved icons24px;icon-dependent tab widths/notice text positions/latest icon column only'}
(ROOT/'preservation-and-regression.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report))
