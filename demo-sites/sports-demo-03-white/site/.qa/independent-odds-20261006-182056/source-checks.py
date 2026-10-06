from pathlib import Path
import json,hashlib,difflib,re,datetime,sys,subprocess,time,collections
Q=Path(__file__).resolve().parent;SITE=Q.parent.parent
B=Path('E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/odds-text-20261006-v1')
OLD=SITE/'.qa/independent-v3-20261006-175132'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
baseline=json.loads((B/'baseline-files.json').read_text(encoding='utf-8-sig'))
stage=sys.argv[1] if len(sys.argv)>1 else 'start'
r={'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'stage':stage,'target':str(SITE),'git_exists':(SITE/'.git').exists()}
for key,base in [('site_files',SITE),('protected_original_files',Path(baseline['protected_original']))]:
    files=[dict(x,current_sha256=sha(base/x['path'])) for x in baseline[key]]
    r[key]={'count':len(files),'unchanged':sum(x['sha256']==x['current_sha256'] for x in files),'changed':[x for x in files if x['sha256']!=x['current_sha256']]}
    r[key+'_hashes']={x['path']:x['current_sha256'] for x in files}
r['fixed_source']={name:{'hash':sha(SITE/name),'bytes':(SITE/name).stat().st_size,'matches':sha(SITE/name)==h and (SITE/name).stat().st_size==n} for name,h,n in [('app/aldebaran-white.css','fe1d52fa8eecba060ccf3ad50ec8b7ed29795b97e7236bebfab56067a2940c1f',8062),('app/page.tsx','a3b76f3c0a5acee702f08f1beb11217ec19bbb147482a5c9a2ebce9702c0ff15',10379),('app/aldebaran-wog-r5.tsx','5a3c1b4d65f6455831b70aa7945bdcc9dbf6b147c7b405d0911af2e04d9e655e',29631)]}
v3=json.loads((OLD/'static-end.json').read_text(encoding='utf8'))
r['icons_unchanged_from_prior_independent_QA']={a['name']:sha(SITE/'public/icons/aldebaran-simple-v3-20261006'/a['name'])==a['sha256'] for a in v3['new_assets']}
oldcss=(B/'before-app/aldebaran-white.css').read_bytes();newcss=(SITE/'app/aldebaran-white.css').read_bytes()
marker1=b'/* New graphite PNGs';marker2=b'.aldebaran-white :is(.ab5-user-actions svg'
block=lambda b:b[b.index(marker1):b.index(marker2)]
r['icon_css_exact_bytes']=block(oldcss)==block(newcss)
oldpage=(B/'before-app/page.tsx').read_bytes();newpage=(SITE/'app/page.tsx').read_bytes()
restored=newpage.replace(b'<span className="ab5-summary-odds">{total.displayOdds}</span>',b'{total.displayOdds}').replace(b'<span className="ab5-summary-odds">{priceText(receipt.odds)}</span>',b'{priceText(receipt.odds)}')
r['page_outside_two_inline_spans_byte_identical']=restored==oldpage
clean=lambda b:re.sub(r'/\*.*?\*/','',b.decode('utf-8-sig'),flags=re.S)
def noncolors(b):
    out=[]
    for selector,body in re.findall(r'([^{}]+)\{([^{}]*)\}',clean(b)):
        declarations=[d.strip() for d in body.split(';') if d.strip() and not re.match(r'(color|--ab5-odds)\s*:',d.strip())]
        if declarations:out.append((selector.strip(),declarations))
    return out
r['noncolor_css_declarations_identical']=noncolors(oldcss)==noncolors(newcss)
if stage=='start':
    for name in ['aldebaran-white.css','page.tsx']:
        old=(B/'before-app'/name).read_text(encoding='utf-8-sig');new=(SITE/'app'/name).read_text(encoding='utf-8-sig')
        (Q/(name+'.diff')).write_text(''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='before/'+name,tofile='current/'+name)),encoding='utf8')
else:
    first=json.loads((Q/'source-start.json').read_text(encoding='utf8'))
    r['unchanged_during_qa']={key:first[key+'_hashes']==r[key+'_hashes'] for key in ['site_files','protected_original_files']}
(Q/('source-'+stage+'.json')).write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in r.items() if not k.endswith('_hashes')},ensure_ascii=False,indent=2))
