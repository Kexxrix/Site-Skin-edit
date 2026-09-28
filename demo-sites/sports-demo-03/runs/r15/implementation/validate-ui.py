import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
load=lambda n:json.loads((ROOT/n).read_text(encoding='utf-8-sig'))
before=load('font-baseline.json')['rows'];after={r['selector']:r for r in load('font-after.json')['rows']}
protected={'.ab5-primary-markets .ab5-odd-value','.ab5-market-rows .ab5-odd-value','.ab5-market-open__count','.ab5-menu-item','.ab5-sport-label','.ab5-user-actions button'}
faces=[400,500,700,800,900];rows=[]
for old in before:
    new=after[old['selector']];weight=int(old['weight']);keep=old['selector'] in protected
    expected=weight if keep or weight<=400 else max(w for w in faces if w<weight)
    # Declared 850 actually selects loaded face 900. The next loaded face is 800.
    assert int(new['weight'])==expected,(old['selector'],weight,new['weight'],expected)
    for key in ['font','lineHeight','color']:
        assert old[key]==new[key],(old['selector'],key,old[key],new[key])
    if old['selector']!='.ab5-user-actions button':assert old['size']==new['size']
    rows.append(dict(role=old['selector'],selector=old['selector'],beforeResolvedWeight=weight,afterResolvedWeight=int(new['weight']),protected=keep,exception='lowest loaded face 400 preserved' if weight==400 else '850 resolves to installed 900; changed to next face 800' if weight==850 else '950 declared / installed face 900; protected unchanged' if weight==950 else '',sizeBefore=old['size'],sizeAfter=new['size']))
(ROOT/'font-weight-audit.json').write_text(json.dumps({'loadedWeights':faces,'rows':rows},ensure_ascii=False,indent=2),encoding='utf-8')
cases=load('ui-case-results.json')
for r in cases:
    c=r['case'];s=r['selected'];u=r['deselected']
    assert s['detail']==c['fixtureId'] and s['rows']==c['count']
    targeted=[p for p in s['slip'] if p['id'].startswith(c['fixtureId']+':') or p['id'].startswith(c['fixtureId']+'-')]
    assert len(targeted)==1 and c['name'] in targeted[0]['text'] and c['rule'] in targeted[0]['text']
    assert targeted[0]['id'] not in [p['id'] for p in u['slip']]
counts=load('empty-counts-flow.json');fixture_counts={r['fixtureId']:r['marketCount'] for r in load('market-inventory.json')}
assert len(counts['allCounts']['cards'])==61
for c in counts['allCounts']['cards']:assert c['count']==fixture_counts[c['id']] and f"전체 마켓 {c['count']}개 보기" in c['label']
assert counts['empty']['detail']=='' and counts['empty']['rows']==0 and counts['empty']['title']=='경기 없음'
assert counts['beforeEmpty']['slip']==counts['empty']['slip']==counts['restored']['slip']
print(json.dumps({'passed':True,'fontRoles':len(rows),'representativeFixtures':len({r['case']['fixtureId'] for r in cases}),'marketSelectionPaths':len(cases),'all61BadgeCountsMatch':True,'volleyballEmptyAndSelectionPreserved':True,'note':'An independently added baseball selection appeared during the browser checks and was preserved. Deselect assertions concern only the selection made by each check.'}))
