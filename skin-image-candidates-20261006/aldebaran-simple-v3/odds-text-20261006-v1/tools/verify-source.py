from pathlib import Path
import hashlib,json,re,difflib
ROOT=Path(__file__).resolve().parents[1];baseline=json.loads((ROOT/'baseline-files.json').read_text(encoding='utf-8'));SITE=Path(baseline['site']);DARK=Path(baseline['protected_original'])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
changed=[]
for row in baseline['site_files']:
    file=SITE/row['path'];assert file.exists(),row['path']+' removed'
    if sha(file)!=row['sha256']:changed.append(row['path'])
assert set(changed)=={'app/aldebaran-white.css','app/page.tsx'},changed
for row in baseline['protected_original_files']:assert sha(DARK/row['path'])==row['sha256'],row['path']
old=(ROOT/'before-app/aldebaran-white.css').read_text(encoding='utf-8');new=(SITE/'app/aldebaran-white.css').read_text(encoding='utf-8')
def css_rules(text):
    text=re.sub(r'/\*.*?\*/','',text,flags=re.S);rules={}
    for selector,body in re.findall(r'([^{}]+)\{([^{}]*)\}',text):
        rules[' '.join(selector.split())]={k.strip():v.strip() for part in body.split(';') if ':' in part for k,v in [part.split(':',1)]}
    return rules
a,b=css_rules(old),css_rules(new);changes=[]
for selector in sorted(a.keys()|b.keys()):
    oldprops=a.get(selector,{});newprops=b.get(selector,{})
    for prop in oldprops.keys()|newprops.keys():
        if oldprops.get(prop)!=newprops.get(prop):
            assert prop in {'color','--ab5-odds'},(selector,prop)
            changes.append({'selector':selector,'property':prop,'before':oldprops.get(prop),'after':newprops.get(prop)})
marker='/* New graphite PNGs';end='.aldebaran-white :is(.ab5-user-actions svg'
oldicons=old[old.index(marker):old.index(end)];newicons=new[new.index(marker):new.index(end)];assert oldicons==newicons
pagebefore=(ROOT/'before-app/page.tsx').read_bytes();pageafter=(SITE/'app/page.tsx').read_bytes()
inverse=pageafter.replace(b'<strong><span className="ab5-summary-odds">{total.displayOdds}</span> /',b'<strong>{total.displayOdds} /').replace(b'{moneyText(receipt.stake)} \xc3\x97 <span className="ab5-summary-odds">{priceText(receipt.odds)}</span></span>',b'{moneyText(receipt.stake)} \xc3\x97 {priceText(receipt.odds)}</span>')
assert inverse==pagebefore,'Page bytes outside two wrappers changed'
assert sha(SITE/'app/aldebaran-wog-r5.tsx')=='5a3c1b4d65f6455831b70aa7945bdcc9dbf6b147c7b405d0911af2e04d9e655e'
copies=json.loads((ROOT.parent/'application-20261006-v1/asset-copy-record.json').read_text(encoding='utf-8'))
for row in copies:assert sha(Path(row['source']))==sha(Path(row['target']))==row['sha256']
diff=''.join(difflib.unified_diff(old.splitlines(keepends=True),new.splitlines(keepends=True),fromfile='before/aldebaran-white.css',tofile='after/aldebaran-white.css'))
diff+=''.join(difflib.unified_diff(pagebefore.decode('utf-8').splitlines(keepends=True),pageafter.decode('utf-8').splitlines(keepends=True),fromfile='before/page.tsx',tofile='after/page.tsx'))
(ROOT/'text-color.diff').write_text(diff,encoding='utf-8')
report={'changed_files':[{'path':p,'sha256':sha(SITE/p),'bytes':(SITE/p).stat().st_size} for p in changed],
        'CSS_changed_properties_only':changes,'background_layout_font_changes':False,'icon_CSS_block_byte_identical':True,
        'approved_icons_hash_identical':18,'approved_r5_TSX_hash_identical':True,'other_current_site_files_preserved':len(baseline['site_files'])-2,
        'dark_original_files_preserved':len(baseline['protected_original_files']),'page_bytes_outside_two_inline_wrappers_identical':True,
        'data_strings_calculations_handlers_unchanged':True,'new_git_commits_deployment':False}
(ROOT/'source-preservation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='CSS_changed_properties_only'}))
