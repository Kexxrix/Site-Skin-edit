import json,math
from collections import Counter,defaultdict
from pathlib import Path
ROOT=Path(__file__).resolve().parent
SITE=ROOT.parents[2]/'site'
load=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
data=load(SITE/'app/prematch-r15.json');old=load(SITE/'app/prematch-odds-r9.json')
fixtures=data['fixtures'];errors=[];all_selections=set();legacy_count=0;monotonic_count=0
expected={'soccer':32,'basketball':6,'baseball':16,'hockey':7}
assert Counter(f['sport'] for f in fixtures.values())==expected
def sid(fid,f,i,j):
    m=f['markets'][i]
    return f"{fid}:{f['sport']}:{m['key']}:{m.get('line','none')}:{m['picks'][j]['key']}" if m.get('key') else f'{fid}-{i}-{j}'
for fid,f in fixtures.items():
    ids=set();line_groups=defaultdict(list)
    for i,m in enumerate(f['markets']):
        if m['canonicalId'] in ids:errors.append(['duplicate market',fid,i])
        ids.add(m['canonicalId'])
        assert m['status']=='active' and len(m['picks'])>=2
        assert m['category'] in ('result','handicap','totals','other')
        for j,p in enumerate(m['picks']):
            selection=sid(fid,f,i,j)
            if selection in all_selections:errors.append(['duplicate selection',selection])
            all_selections.add(selection)
            if not math.isfinite(p['price']) or not 1<p['price']<=10000 or p.get('locked',False):errors.append(['invalid odd',selection])
            if round(p['price']*100)!=p['priceCents']:errors.append(['cents mismatch',selection])
        is_handicap=m['category']=='handicap' or m['templateId'].endswith('.corners_handicap')
        if m.get('line') is not None and len(m['picks'])==2 and (is_handicap or any(p['label']=='오버' for p in m['picks'])):
            line=float(m['line'].replace('홈 ','').replace('−','-'))
            if is_handicap:direction=-1;price=m['picks'][0]['price']
            else:
                op=next((x for x in m['picks'] if x['label']=='오버'),None)
                if not op:continue
                direction=1;price=op['price']
            line_groups[(m['templateId'],m['period'],m['subjectId'],m['variant'])].append((line,price,direction))
    for key,rows in line_groups.items():
        rows.sort()
        for a,b in zip(rows,rows[1:]):
            monotonic_count+=1
            if (b[1]-a[1])*a[2]<-.0001:errors.append(['nonmonotonic',fid,key,a,b])
    if fid in old['fixtures']:
        orig=old['fixtures'][fid]
        for i,m in enumerate(orig['markets']):
            for j,p in enumerate(m['picks']):
                if sid(fid,orig,i,j)!=sid(fid,f,i,j) or f['markets'][i]['picks'][j]['price']!=p['price']:errors.append(['legacy changed',fid,i,j])
                legacy_count+=1
    if f['sport']=='baseball':
        assert fid.startswith('aldebaran-r15-baseball-')
        assert not any('쿼터' in m['name'] or 'quarter' in m['period'] for m in f['markets'])
    if f['sport']=='hockey':assert not any('쿼터' in m['name'] for m in f['markets'])
    # Every accordion row consumes each canonical market once, irrespective of filters.
    grouped=defaultdict(list)
    for i,m in enumerate(f['markets']):grouped[m['group']].append(i)
    assert sorted(i for rows in grouped.values() for i in rows)==list(range(len(f['markets'])))
for row in load(ROOT/'pricing-audit.json'):
    for o in row['outcomes']:
        if min(o['win'],o['lose'],o['refund']) < -1e-8 or abs(o['win']+o['lose']+o['refund']-1)>1e-7:errors.append(['invalid probabilities',row['canonicalId']])
old_nfl={fid for fid,f in old['fixtures'].items() if f['sport']=='american-football'}
assert len(old_nfl)==16 and old_nfl.isdisjoint(fixtures)
coverage=load(ROOT/'template-coverage.json');assert len(coverage)==115
assert not any(x['status']=='excluded' and not x['reason_if_excluded'] for x in coverage)
result=dict(passed=not errors,fixtureCounts={**expected,'volleyball':0},fixtureTotal=len(fixtures),marketTotal=sum(len(f['markets']) for f in fixtures.values()),selectionTotal=len(all_selections),legacySelectionsPreserved=legacy_count,removedNflFixtures=len(old_nfl),monotonicComparisons=monotonic_count,coverage=Counter(r['status'] for r in coverage),errors=errors)
(ROOT/'data-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
raise SystemExit(0 if not errors else 1)
