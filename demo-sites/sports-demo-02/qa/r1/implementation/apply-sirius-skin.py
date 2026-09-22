from pathlib import Path
import re,shutil,json,hashlib
root=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site')
css=root/'app/globals.css'
s=css.read_text(encoding='utf-8')
# Retire only selectors for the replaced card presentation.
lines=s.splitlines()
prefixes=('.card-grid ','.match-batches ','.match-batch ','.match-batch>','@starting-style {.match-batch','@media(prefers-reduced-motion:reduce){.match-batch','.match-card ','.match-card:hover ','.match-meta ','.live-chip ','.match-card[data-state=in]','.league-name ','.match-meta time ','.source-button ','.source-button svg ','.matchup ','.matchup-team ','.matchup-team strong ','.matchup-center ','.matchup-status ','.score ','.score strong ','.score>span ','.markets ','.market-row ','.market-row.three-way ','.market-reference ','.market-reference>span ','.market-reference small ','.market-reference b ')
s='\n'.join(line for line in lines if not line.startswith(prefixes))+'\n'
colors={'#050505':'#0b173c','#f5f1e8':'#ffffff','#141414':'#101d42','#171717':'#101a34','#292929':'#263b63','#1c1c1c':'#14213e','#b8b5ad':'#afbcd4','#ffe6a3':'#fce1a4','#f3a298':'#f58c96','#3b3b3b':'#2d4065','#d9ad43':'#d7b96c','#78511c':'#af8e45','#f5eedf':'#ffffff','#202020':'#1b2c4d','#0b0b0b':'#060a2a','#c6c4bf':'#c2cce0','#303030':'#2d4065','#101010':'#0d1938','#5a5a5a':'#435a80','#626262':'#425a82','#181818':'#132348','#333':'#2d4065','#555':'#425a82','#353535':'#30476e','#080808':'#07132d','#282828':'#23385e','#9b864f':'#7386a7','#e6bb55':'#e7cb88','#d4a038':'#d7b96c','#f6d786':'#f0d795','#886123':'#af8e45','#93641e':'#af8e45','#f3cc72':'#edd398','#858585':'#7d90b1','#383838':'#2d4065','#a8a69e':'#afbcd4','#757575':'#788aad','#646464':'#425a82','#090909':'#0a1633','#aaa':'#afbcd4','#929292':'#8b9ebf','#6f6f6f':'#7589ae','#232323':'#20365f','#2b2b2b':'#243b65','#1d1d1d':'#17294d','#121212':'#0d1938','#090909e8':'#07142ce8','#090909a6':'#07142ca6','#c7c4bc':'#c4cfe3','#8a887f':'#93a6c7','#343434':'#2d4065','#8e8c86':'#93a6c7','#131313':'#13254a','#222':'#21365d','#919191':'#7d90b1','#92908a':'#93a6c7','#1b1b1b':'#0d1938','#a5a39b':'#afbcd4','#1e1e1e':'#172b51','#191919':'#15264a','#4c4433':'#33476d','#aaa79e':'#afbcd4','#3a3528':'#2d4065','#161616':'#14264c','#8b877d':'#8b9ebf','#51442a':'#33476d','#666':'#48638e','#96938a':'#9dacce','#444':'#344d76','#111':'#101d42','#cbc7bd':'#c4cfe3'}
s=re.sub(r'#[0-9a-fA-F]{3,8}\b',lambda m:colors.get(m[0].lower(),m[0]),s)
s=s.replace('.brand-wordmark {width:144px;height:42px;object-fit:contain;flex:none;}','.sirius-wordmark {width:124.36px;aspect-ratio:1741 / 588;overflow:hidden;flex:none;}\n.sirius-wordmark img {display:block;width:100%;height:auto;max-width:none;}')
s=s.replace('.logo-slot.logo-backed {background:var(--ivory);}', '.logo-slot.logo-backed {background:#f5eedf;}')
s+='''
/* SIRIUS surfaces retain the original fixed shell and rail geometry. */
.topbar {background:linear-gradient(#0d1739,#060a2a 60%);}
.header-rail {box-shadow:none;height:2px;}
.header-rail::after {display:none;}
.primary-nav button {color:#c2cce0;transition-duration:160ms;}
.primary-nav button:hover,.primary-nav button[aria-pressed=true] {background:linear-gradient(#1d315b,#101d42);box-shadow:inset 0 1px #fce1a438;}
.panel {box-shadow:inset 0 1px #ffffff08,0 3px 8px #030b1d38;}
.panel-heading {background:linear-gradient(#192d54,#132448);}
.btn {background:linear-gradient(#263b63,#1b2c4d);border-color:#425a82;border-bottom-color:#243759;box-shadow:inset 0 1px #ffffff24,inset 0 -1px #07132d,0 2px 4px #0003;}
.btn:hover:not(:disabled) {background:linear-gradient(#344e7b,#253c63);border-color:#748bab;box-shadow:inset 0 1px #ffffff33,inset 0 -1px #07132d;}
.btn.gold {background:linear-gradient(#fce1a4,#e6ca87 52%,#d7b96c);border-color:#efd695;border-bottom-color:#af8e45;color:#101a34;box-shadow:inset 0 1px #fff4d1,inset 0 -1px #af8e45,0 2px 4px #0004;}
.btn.gold:hover:not(:disabled) {background:linear-gradient(#ffedc6,#efd79e 52%,#e0c27c);box-shadow:inset 0 1px #fff8e8,inset 0 -1px #af8e45;}
.btn:active:not(:disabled),.btn[data-pressed]:not(:disabled),.btn.gold:active:not(:disabled),.btn.gold[data-pressed]:not(:disabled) {box-shadow:inset 0 3px 8px #07132d80;}
.btn:disabled {background:#14213e;color:#7d90b1;border-color:#2d4065;box-shadow:none;}
.section-title {background:#0d1938;border-bottom:1px solid #2d4065;margin-bottom:0;}
.title-plate {height:47px;border:0;border-radius:0;background:none;box-shadow:none;padding:0 12px;}
.title-plate h2 {font-size:19px;}
.section-kicker {font-size:13px;color:#afbcd4;}
.title-right {background:none;}
.btn.more-button {background:linear-gradient(#263b63,#1b2c4d);border-color:#425a82;color:#fff;}
button:focus-visible,a:focus-visible,input:focus-visible,[tabindex]:focus-visible,.btn:focus-visible,.odd:focus-visible {outline:2px solid #fce1a4;outline-offset:3px;box-shadow:0 0 0 2px #060a2a;}
.primary-nav button:focus-visible {outline-offset:-6px;}
.btn.gold:focus-visible,.odd[aria-pressed=true]:focus-visible {outline-color:#fff;box-shadow:0 0 0 2px #060a2a;}
[data-slot=dialog-overlay] {background:#03091dcc!important;}
'''
css.write_text(s,encoding='utf-8')
p=root/'app/page.tsx';s=p.read_text(encoding='utf-8').replace('MERCURY','SIRIUS')
s=s.replace('<img className="brand-symbol" src="/branding/mercury-emblem.png" width="1138" height="1100" alt=""/><img className="brand-wordmark" src="/branding/mercury-wordmark.png" width="1798" height="526" alt="SIRIUS"/>','<img className="brand-symbol" src="/branding/sirius-symbol.png" width="640" height="640" alt=""/><span className="sirius-wordmark"><img src="/branding/sirius-wordmark.png" width="1741" height="704" alt="SIRIUS"/></span>')
s=s.replace("${market.line?' '+market.line:''}","${m===1&&market.line?' '+market.line:''}")
s=s.replace('<span className="pick-label">{pick.label}{m===1&&<small> {market.line}</small>}</span>','<span className={`pick-label ${m!==0?\'with-line\':\'\'}`}>{m===2?<>{p===0?\'홈\':\'원정\'}<small>{pick.label.split(\' \').slice(1).join(\' \')}</small></>:<>{pick.label}{m===1&&<small>{market.line}</small>}</>}</span>')
p.write_text(s,encoding='utf-8')
p=root/'app/layout.tsx';s=p.read_text(encoding='utf-8').replace('MERCURY','SIRIUS').replace("'/favicon.svg'","'/branding/sirius-symbol.png'");p.write_text(s,encoding='utf-8')
p=root/'app/match-list.css';s=p.read_text(encoding='utf-8-sig').replace('color:#afbcd4;color:#afbcd4;','color:#afbcd4;')
s+='''
.row-market .odd {position:relative;}
.row-market .pick-label.with-line {display:flex;flex-direction:column;align-items:flex-start;line-height:13px;}
.row-market .pick-label.with-line small {font-size:12px;font-weight:500;}
.row-market .odd[aria-pressed=true] .pick-check {position:absolute;right:2px;top:2px;width:8px!important;height:8px!important;}
@keyframes sirius-live-breathe {0%,100%{opacity:.5;}50%{opacity:1;}}
.live-label .live-dot {animation:sirius-live-breathe 2.4s ease-in-out infinite;box-shadow:none;}
@media(prefers-reduced-motion:reduce){.live-label .live-dot {animation:none;}}
'''
p.write_text(s,encoding='utf-8')
for name in ('sirius-symbol.png','sirius-wordmark.png'):shutil.copyfile(root.parent/'assets/branding'/name,root/'public/branding'/name)
# Preserve source evidence for the reused, stopped progress snapshots.
p=root/'app/live-snapshots.json';snapshots=json.loads(p.read_text(encoding='utf-8'))
sources=root.parent/'qa/r1/implementation/sources';sources.mkdir(exist_ok=True)
for item in snapshots.values():
    original=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01')/item['sourceFile']
    target=sources/original.name
    if not target.exists():shutil.copyfile(original,target)
    if hashlib.sha256(target.read_bytes()).hexdigest()!=item['sourceSha256']:raise RuntimeError('Snapshot source hash mismatch')
    item['sourceFile']='qa/r1/implementation/sources/'+target.name
p.write_text(json.dumps(snapshots,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('SIRIUS skin and identity applied; supplied branding and progress evidence copied unchanged.')
