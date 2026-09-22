from pathlib import Path
p=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site/app/page.tsx')
s=p.read_text(encoding='utf8')
old='<span>{market.name} · {pick.label}<b>{priceText(pick.price)}</b></span>'
new='<span>{market.name} · {pick.label}{s.marketIndex===1&&market.line?` ${market.line}`:\'\'}<b>{priceText(pick.price)}</b></span><small className="confirm-rule">{market.rule}</small>'
assert s.count(old)==1
p.write_text(s.replace(old,new),encoding='utf8')
p=p.with_name('globals.css')
s=p.read_text(encoding='utf8')
s+='\n.confirm-picks .confirm-rule {display:block;margin-top:4px;font-size:12px;line-height:18px;color:var(--muted-foreground);}\n'
p.write_text(s,encoding='utf8')
print('Q07-P2: confirmation line and settlement rule restored; pick mapping unchanged.')
