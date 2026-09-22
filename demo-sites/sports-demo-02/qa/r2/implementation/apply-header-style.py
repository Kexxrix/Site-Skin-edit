from pathlib import Path
import re
root=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site')
p=root/'app/globals.css'
s=p.read_text(encoding='utf8')
start=s.index('.topbar {')
end=s.index('.workspace {',start)
s=s[:start]+'''/* HEADER R2: both rows share the original 100px header allocation. */
.topbar {height:var(--header-height);flex:0 0 var(--header-height);position:relative;z-index:10;background:linear-gradient(#0d1739,#060a2a 60%);}
.brand-row {height:var(--brand-row-height);display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:24px;padding:0 22px;border-bottom:1px solid #233456;}
.brand {display:flex;align-items:center;gap:8px;}
.brand-symbol {width:32px;height:32px;object-fit:contain;flex:none;}
.sirius-wordmark {width:100.67px;aspect-ratio:1741 / 588;overflow:hidden;flex:none;}
.sirius-wordmark img {display:block;width:100%;height:auto;max-width:none;}
.header-notice {display:flex;align-items:center;gap:9px;min-width:0;width:fit-content;max-width:100%;padding:4px 0;border:0;background:none;color:#afbcd4;font-size:12px;text-align:left;}
.header-notice>span {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.header-notice svg {width:13px;height:13px;color:var(--gold);}
.header-notice b {color:var(--gold);font-weight:500;letter-spacing:.04em;}
.header-notice:hover {color:var(--ivory);}
.header-account {display:flex;align-items:center;justify-content:flex-end;gap:8px;min-width:0;}
.header-account .btn {min-width:76px;}
.session-label {color:var(--gold-light);font-size:13px;display:flex;align-items:center;gap:6px;}
.status-dot {width:5px;height:5px;background:var(--gold);border-radius:50%;}
.menu-row {height:var(--menu-row-height);display:flex;justify-content:center;background:#0b1633;border-bottom:1px solid #233456;}
.primary-nav {position:relative;display:flex;gap:40px;height:100%;}
.nav-group {position:relative;display:flex;height:100%;align-items:center;}
.nav-group+.nav-group::before {content:'';position:absolute;left:-20px;top:14px;height:16px;width:1px;background:#2a3a59;}
.primary-nav [data-main-menu] {display:flex;align-items:center;justify-content:center;width:144px;height:100%;padding:0;border:0;border-radius:0;background:none;color:#c2cce0;font-size:16px;font-weight:700;white-space:nowrap;transition:background 180ms,color 180ms,box-shadow 100ms;}
.nav-sport {display:flex;align-items:center;width:144px;height:100%;}
.nav-sport [data-main-menu] {width:112px;}
.primary-nav [data-main-menu]:hover {background:#ffffff05;color:#fff;}
.primary-nav [data-main-menu][aria-pressed=true] {color:var(--gold-light);}
.primary-nav [data-main-menu]:active {background:#0002;box-shadow:inset 0 2px 5px #0006;}
.primary-nav button:focus-visible {outline-offset:-4px;}
.nav-indicator {position:absolute;left:0;bottom:0;height:2px;background:var(--gold);pointer-events:none;transition:transform 180ms ease,width 180ms ease;}
.sports-trigger {display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:3px;background:none;color:#afbcd4;}
.sports-trigger:hover,.sports-trigger[aria-expanded=true] {background:#ffffff09;color:var(--gold-light);}
.sports-trigger svg {width:14px;height:14px;transition:rotate 180ms;}
.sports-trigger[aria-expanded=true] svg {rotate:180deg;}
.isolate:has(> .sports-disclosure) {z-index:20;}
.sports-disclosure {width:680px;max-width:calc(100vw - 24px);padding:12px;border:1px solid #293b5d;border-top:2px solid var(--gold);border-radius:0 0 5px 5px;background:#0d1836;color:#fff;box-shadow:0 12px 24px #0008;}
.header-sports {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;}
.header-sports button {display:flex;align-items:center;gap:10px;min-height:42px;padding:7px 12px;border:1px solid transparent;border-radius:3px;background:transparent;color:#c2cce0;font-size:14px;text-align:left;}
.header-sports button:first-child {grid-column:1/-1;border-bottom-color:#293b5d;}
.header-sports button:hover {background:#18294e;color:#fff;}
.header-sports button[aria-pressed=true] {border-color:#71603d;background:#152444;color:var(--gold-light);}
.header-sports button:active {box-shadow:inset 0 2px 5px #0007;}
.main-footer i {display:inline-block;height:9px;width:1px;background:#435a80;}
''' +s[end:]
s=s.replace('--header-height:68px;--notice-height:32px;','--brand-row-height:56px;--menu-row-height:44px;--header-height:calc(var(--brand-row-height) + var(--menu-row-height));')
for line in [
'.topbar {background:linear-gradient(#0d1739,#060a2a 60%);}',
'.header-rail {box-shadow:none;height:2px;}',
'.header-rail::after {display:none;}',
'.primary-nav button {color:#c2cce0;transition-duration:160ms;}',
'.primary-nav button:hover,.primary-nav button[aria-pressed=true] {background:linear-gradient(#1d315b,#101d42);box-shadow:inset 0 1px #fce1a438;}',
'.primary-nav button:focus-visible {outline-offset:-6px;}'
]: s=s.replace(line+'\n','')
s=s.replace('.header-rail::after,.live-dot {animation:none;}', '.live-dot {animation:none;}')
palette={'#0b173c':'#060e2d','#101d42':'#091332','#14244d':'#0c183c','#0d1938':'#08122e','#0a1633':'#060e25','#14213e':'#0b1630','#263b63':'#18294e','#1b2c4d':'#12203e','#21365d':'#172a4d','#192d54':'#142347','#132448':'#0e1b39','#132348':'#0d1936','#20365f':'#17294a','#243b65':'#192d50','#17294d':'#10203e','#172b51':'#10203c','#1b2e55':'#122344','#344e7b':'#243b62','#253c63':'#1b3052','#30476e':'#24395e','#23385e':'#1a2d4e','#2d4065':'#233354','#425a82':'#334a70','#3e537b':'#30456a','#293b5e':'#202e4d','#33476d':'#293a5b','#48638e':'#38527b','#344d76':'#2b4065','#243759':'#1d2f4e'}
def tones(css):
    def replace(m):
        return m[1]+re.sub(r'#[0-9a-fA-F]{6}\b',lambda c:palette.get(c[0].lower(),c[0]),m[2])
    return re.sub(r'((?<![-\w])(?:background(?:-color)?|border(?:-(?:top|bottom|left|right))?(?:-color)?|box-shadow):)([^;{}]+)',replace,css)
s=tones(s)
for name,value in {'background':'#060e2d','card':'#091332','popover':'#091332','secondary':'#18294e','muted':'#0b1630','accent':'#18294e','border':'#233354','input':'#233354','sidebar':'#091332'}.items():
    s=re.sub(r'--'+name+r':#[0-9a-fA-F]{6}', '--'+name+':'+value,s)
p.write_text(s,encoding='utf8')
p=root/'app/match-list.css';p.write_text(tones(p.read_text(encoding='utf8')),encoding='utf8')
p=root/'app/page.tsx';s=p.read_text(encoding='utf8')
s=s.replace("onClick={()=>setOverlay({kind:'info',title:'1:1 문의'", "onClick={()=>showOverlay({kind:'info',title:'1:1 문의'")
s=s.replace("onClick={()=>setOverlay({kind:'info',title:'공지사항'", "onClick={()=>showOverlay({kind:'info',title:'공지사항'")
p.write_text(s,encoding='utf8')
print('R2 header layout and navy surfaces applied; asset/data/font files unchanged.')
