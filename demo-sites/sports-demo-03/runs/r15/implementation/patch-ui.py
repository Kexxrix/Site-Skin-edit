from pathlib import Path
import re
root=Path(__file__).resolve().parents[3]/'site/app'
p=root/'aldebaran-wog-r5.tsx'
s=p.read_text(encoding='utf-8')
replacements={
 '<p>{market.name} {market.line}</p>':'<p>{market.name} {market.line}<small className="ab5-slip-market-rule">{market.rule}</small></p>',
 '<strong>검색 결과가 없습니다</strong>':'<strong>{sport===\'volleyball\'?\'경기 없음\':\'검색 결과가 없습니다\'}</strong>',
 "'선택할 경기가 없습니다'":"sport==='volleyball'?'경기 없음':'선택할 경기가 없습니다'",
 '<strong>표시할 상세 마켓이 없습니다</strong>':'<strong>{sport===\'volleyball\'?\'경기 없음\':\'표시할 상세 마켓이 없습니다\'}</strong>',
 '{groups.length}개 마켓 그룹':'{match.markets.length}개 마켓 · {groups.length}개 그룹',
 '<div className="ab5-balance-row"><span>금일 적중</span><strong className="ab5-balance-value">0 <small>원</small></strong></div>':'',
 '<div className="ab5-market-rows">{group.rows.map':'<div className="ab5-market-rule">{match.markets[group.rows[0]].rule}</div><div className="ab5-market-rows">{group.rows.map',
 'title={<span>{group.name}<small>':'title={<span title={group.name}>{group.name}<small>',
}
for old,new in replacements.items():
    assert s.count(old)==1,(old,s.count(old))
    s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
p=root/'aldebaran-wog-r5.css';s=p.read_text(encoding='utf-8')
# Next installed face, once per original resolved role. 400 is the lowest installed face.
weights={'.ab5-league-head':(900,800),'.ab5-card-time':(800,700),'.ab5-card-league':(800,700),'.ab5-team':(900,800),'.ab5-score':(900,800),'.ab5-odd-label':(850,800),'.ab5-market-name':(700,500),'.ab5-market-line':(900,800),'.ab5-match-title':(800,700),'.ab5-match-start':(700,500),'.ab5-market-tabs button':(800,700),'.ab5-market-head':(900,800),'.ab5-market-rows .ab5-odd-label':(700,500),'.ab5-line-box':(900,800),'.ab5-league-label small,.ab5-market-head small':(500,400)}
for selector,(before,after) in weights.items():
    pattern=r'(?m)^'+re.escape(selector)+r' \{([^}]+)\}'
    found=list(re.finditer(pattern,s));target=[m for m in found if re.search(r'font-weight:\s*'+str(before)+r';',m[1])]
    assert len(target)==1,selector
    m=target[0];text=re.sub(r'font-weight:\s*'+str(before)+r';','font-weight: '+str(after)+';',m[0]);s=s[:m.start()]+text+s[m.end():]
rules={
 '.ab5-user':'height: auto;',
 '.ab5-balances':'height: 100px; display: grid; grid-template-rows: repeat(2,minmax(0,1fr)); gap: 0;',
 '.ab5-balance-row':'display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 10px; border: 0; border-radius: 0; background: transparent; font-size: 14px;',
 '.ab5-user-actions':'height: 88px; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); grid-template-rows: 38px 38px; gap: 4px; padding-top: 8px;',
 '.ab5-user-actions button':'display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 6px; border: 1px solid var(--ab5-line); border-radius: 5px; padding: 0 4px; background: var(--ab5-control); color: var(--ab5-text); font-size: 14px; font-weight: 600; line-height: 20px; white-space: nowrap;',
 '.ab5-user-actions svg':'width: 18px; height: 18px; flex: 0 0 18px; color: var(--ab5-accent);',
}
for selector,body in rules.items():
    pattern=r'(?m)^'+re.escape(selector)+r' \{[^}]+\}'
    # Remove obsolete duplicate height override as part of this same account change.
    matches=list(re.finditer(pattern,s));assert matches,selector
    s=re.sub(pattern,lambda m:selector+' { '+body+' }' if m.start()==matches[0].start() else '',s)
pattern=r'(?m)^\.ab5-bet-submit \{[^}]+\}'
s=re.sub(pattern,lambda m:m[0].replace('var(--ab5-accent)','var(--ab5-small-accent)'),s)
s+='''\n/* R15 account rows and expanded market choices; existing preview geometry stays fixed. */
.ab5-balance-row:first-child { border-bottom: 1px solid var(--ab5-line); }
.ab5-shell .ab5-bet-submit:not(:disabled):hover { border-color: var(--ab5-small-accent); }
.ab5-many-line { grid-column: 1 / -1; text-align: center; }
.ab5-row-many .ab5-odd-label { white-space: normal; line-height: 1.3; }
.ab5-row-many .ab5-odd { min-height: 34px; height: auto; padding-block: 7px; }
.ab5-market-rule { padding: 5px 10px 0; font-size: 11px; font-weight: 400; line-height: 16px; color: var(--ab5-muted); }
.ab5-market-head>span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ab5-market-head small { flex: 0 0 auto; }
.ab5-slip-market-rule { display: block; }
.ab5-center-grid .ab5-empty strong, .ab5-center-grid .ab5-empty .ab5-small-action { font-weight: 500; }
'''
p.write_text(s,encoding='utf-8')
print('Patched requested UI and supported font weights')
