"""One-time R9 synthetic snapshot authoring, not a browser/server odds engine.
Inputs are editorial demo scenarios, never estimates of real team strength.
Existing market indices, lines, outcome keys and selection IDs are retained.
"""
import json, math, hashlib
from pathlib import Path
from decimal import Decimal, ROUND_HALF_UP

ROOT = Path(__file__).resolve().parent
SITE = ROOT.parents[2] / 'site'
BASE = json.loads((ROOT / 'baseline.json').read_text(encoding='utf-8-sig'))['matches']
VERSION = 'aldebaran-prematch-r9-20260922'
MARGIN = .045

# Explicit fixture-specific (home mean, away mean) synthetic score assumptions.
# Basketball also specifies regulation margin SD and total SD.
INPUTS = {
 'record-401902644': (112.4,108.7,12.8,17.4),
 'record-401857190': (87.6,77.2,11.2,14.3),
 'record-401857191': (79.3,84.8,10.6,13.7),
 'record-401857192': (86.1,89.4,12.1,15.2),
 'record-401857193': (75.8,85.6,11.8,14.9),
 'record-401857194': (82.7,88.9,10.9,14.1),
 'record-401881922': (3.42,2.64),
 'record-401881923': (2.83,3.18),
 'record-401886427': (2.58,3.16),
 'record-401878099': (3.71,3.24),
 'record-401886258': (3.09,2.32),
 'record-401879412': (2.79,2.93),
 'record-401879652': (2.87,3.36),
 'record-401872932': (27.8,25.6),
 'record-401872933': (24.6,20.3),
 'record-401872937': (21.4,24.9),
 'record-401872939': (17.8,27.2),
 'record-401872946': (20.7,21.9),
 'record-401872936': (18.6,25.4),
 'record-401872935': (26.3,20.1),
 'record-401872938': (28.4,19.7),
 'record-401872934': (24.8,26.1),
 'record-401872940': (22.7,20.8),
 'record-401872941': (26.6,21.2),
 'record-401872944': (25.1,24.3),
 'record-401872943': (22.9,24.7),
 'record-401872942': (27.1,23.8),
 'record-401872945': (28.2,22.4),
 'record-401872947': (26.8,18.9),
 'record-401884790': (2.42,.81),
 'record-401879275': (1.21,1.83),
 'record-761815': (1.56,1.38),
 'record-401876453': (1.88,1.17),
 'record-401879269': (1.73,1.49),
 'record-401879274': (1.16,1.92),
 'record-401878778': (1.39,.96),
 'record-401879271': (2.21,.84),
 'record-401879270': (1.68,1.03),
 'record-761818': (1.19,1.86),
 'record-761819': (1.32,1.47),
 'record-761816': (1.64,1.77),
 'record-761817': (1.41,2.08),
 'record-761822': (1.67,1.28),
 'record-761820': (1.48,1.72),
 'record-761821': (1.93,1.65),
 'record-761823': (1.36,1.81),
 'record-761824': (1.79,1.13),
 'record-761826': (1.54,1.59),
 'record-761827': (1.82,1.36),
 'record-761825': (1.71,1.89),
 'record-761828': (1.95,1.74),
 'record-401884786': (1.57,1.46),
 'record-401884787': (1.97,1.42),
 'record-401884785': (1.38,1.31),
 'record-401884784': (1.61,1.24),
 'record-401884789': (1.86,1.91),
 'record-401876451': (1.12,1.53),
 'record-401876457': (1.31,1.04),
 'record-401876455': (.97,1.44),
 'record-401876454': (1.84,1.39),
 'record-401876450': (1.76,1.02),
}

def normalize(grid):
    mass = sum(p for h,a,p in grid)
    return [(h,a,p/mass) for h,a,p in grid]

def poisson(mean, maximum=32):
    values = [math.exp(-mean)]
    for n in range(1,maximum+1): values.append(values[-1]*mean/n)
    return values

def product(home, away):
    return normalize([(h,a,ph*pa) for h,ph in enumerate(home) for a,pa in enumerate(away) if ph*pa>0])

def basketball_grid(home, away, margin_sd, total_sd):
    team_sd = math.sqrt(margin_sd**2+total_sd**2)/2
    hs = range(max(0,math.floor(home-7*team_sd)),math.ceil(home+7*team_sd)+1)
    aws = range(max(0,math.floor(away-7*team_sd)),math.ceil(away+7*team_sd)+1)
    return normalize([(h,a,math.exp(-.5*(((h-a)-(home-away))/margin_sd)**2-.5*(((h+a)-(home+away))/total_sd)**2)) for h in hs for a in aws])

def football_points(mean):
    # Compound Poisson: scoring events of 7, 3 and 2 points (not soccer goals).
    # Mixture of touchdown/conversion packages, field goals and safeties.
    rates = {7:mean*.72/7,3:mean*.26/3,2:mean*.02/2}
    values = [math.exp(-sum(rates.values()))]
    for n in range(1,141):
        values.append(sum(k*rate*values[n-k] for k,rate in rates.items() if n>=k)/n)
    return values

def overtime(grid, home_chance, win_points, tie_retention=0):
    result=[]
    for h,a,p in grid:
        if h!=a: result.append((h,a,p))
        else:
            if tie_retention: result.append((h,a,p*tie_retention))
            result.extend([(h+win_points,a,p*(1-tie_retention)*home_chance),(h,a+win_points,p*(1-tie_retention)*(1-home_chance))])
    return normalize(result)

def grids(match, values):
    sport=match['sport']; home,away=values[:2]
    if sport=='soccer':
        full=product(poisson(home),poisson(away)); period=product(poisson(home*.5),poisson(away*.5))
        model='independent-poisson-goals'; share=.5
        rules={'full':'정규시간 90분 · 추가시간 포함 · 연장 제외','period':'전반 45분 · 추가시간 포함','overtime':'excluded'}
    elif sport=='hockey':
        regulation=product(poisson(home),poisson(away))
        full=overtime(regulation,home/(home+away),1);period=product(poisson(home/3),poisson(away/3))
        model='poisson-regulation-goals-with-OT-shootout-tiebreak';share=1/3
        rules={'full':'연장·승부치기 포함 · 승부치기 승리 1골 반영','period':'1피리어드 20분 · 승패 무승부 반환','overtime':'tied regulation split by relative scoring means; winning side credited one goal'}
    elif sport=='basketball':
        regulation=basketball_grid(home,away,*values[2:]); full=overtime(regulation,home/(home+away),2)
        period=basketball_grid(home*.25,away*.25,values[2]*.5,values[3]*.5)
        model='discrete-joint-normal-margin-total-with-OT-tiebreak';share=.25
        rules={'full':'연장 포함','period':('1쿼터 12분' if match['leagueKey']=='nba' else '1쿼터 10분')+' · 승패 무승부 반환','overtime':'synthetic tied regulation resolution: winner credited two points; not a fitted overtime model'}
    elif sport=='american-football':
        regulation=product(football_points(home),football_points(away))
        full=overtime(regulation,home/(home+away),3,.09)
        period=product(football_points(home*.5),football_points(away*.5))
        model='compound-poisson-7-3-2-point-events-with-OT-tie-mixture';share=.5
        rules={'full':'연장 포함 · 승패 무승부 반환','period':'전반 30분 · 승패 무승부 반환','overtime':'synthetic tied regulation: 9% stays tied; otherwise winner credited three points'}
    else: raise ValueError('No authorized prematch model for '+sport)
    inputs={'homeMean':home,'awayMean':away,'expectedRegulationTotal':round(home+away,4),'expectedRegulationMargin':round(home-away,4),'periodShare':share,'assumptionKind':'editorial-synthetic-not-team-analysis'}
    if sport=='basketball': inputs.update(marginSD=values[2],totalSD=values[3])
    if sport=='american-football': inputs.update(pointShares={'touchdown7':.72,'fieldGoal3':.26,'safety2':.02},overtimeTieRetention=.09)
    return full,period,model,inputs,rules

def settle(value, line=0):
    # Quarter lines split the stake equally over the two adjacent half lines.
    quarter=round(line*4)
    lines=[math.floor(line*2)/2,math.ceil(line*2)/2] if quarter%2 else [line]
    win=sum(1 for part in lines if value+part>1e-9)/len(lines)
    lose=sum(1 for part in lines if value+part< -1e-9)/len(lines)
    return win,lose,1-win-lose

def quoted(w,l,r,margin):
    if w<=0: raise ValueError('Zero win mass')
    # Charge the same margin only to the exposed (non-refunded) stake.
    raw=(w+l)/(w*(1+margin))
    cents=int((Decimal(str(raw))*100).quantize(Decimal('1'),rounding=ROUND_HALF_UP))
    if cents<=100: raise ValueError('Scenario outside quote range')
    return cents

def distributions(grid):
    tables={key:{} for key in ('margin','total','home','away','parity','both-score')}
    for h,a,p in grid:
        for key,value in zip(tables,(h-a,h+a,h,a,(h+a)%2,int(h>0 and a>0))):
            tables[key][value]=tables[key].get(value,0)+p
    return tables

def market_prices(match, market, index, full, period):
    key=market.get('key',''); line_text=market.get('line')
    line=float(line_text.replace('홈 ','').replace('−','-')) if line_text is not None else None
    is_period=key.startswith(('first-quarter','first-half','first-period'))
    grid=period if is_period else full
    if index==0 or key.endswith('-result'): family='result'
    elif index==1 or key.endswith('-total'): family='total'
    elif index==2 or key=='full-handicap': family='handicap'
    elif key=='full-odd-even': family='parity'
    elif key=='both-teams-score': family='both-score'
    elif key=='first-scoring-team': family='first-score'
    else: raise ValueError('Unmodeled market '+key)
    result=[]
    for p,pick in enumerate(market['picks']):
        w=l=r=0.
        if family=='first-score':
            hmean,amean=INPUTS[match['id']][:2]; blank=math.exp(-hmean-amean)
            probability=[(1-blank)*hmean/(hmean+amean),blank,(1-blank)*amean/(hmean+amean)][p]
            w,l=probability,1-probability
        else:
            dimension='margin' if family in ('result','handicap') else ('home' if 'home-total' in key else 'away' if 'away-total' in key else 'total') if family=='total' else family
            for value,mass in grid[dimension].items():
                if family=='result':
                    if len(market['picks'])==3:
                        yes=(value>0,value==0,value<0)[p];rw,rl,rr=(1.,0.,0.) if yes else (0.,1.,0.)
                    else: rw,rl,rr=settle(value*(1 if p==0 else -1))
                elif family=='handicap':
                    rw,rl,rr=settle(value,line)
                    if p==1: rw,rl=rl,rw
                elif family=='total':
                    rw,rl,rr=settle(value,-line)
                    if pick['label']=='언더': rw,rl=rl,rw
                else:
                    yes=value==1
                    if p==1: yes=not yes
                    rw,rl,rr=(1.,0.,0.) if yes else (0.,1.,0.)
                w+=mass*rw;l+=mass*rl;r+=mass*rr
        result.append({'winStake':w,'loseStake':l,'refundStake':r})
    scope='period' if is_period else 'full'
    team='home' if 'home-total' in key else 'away' if 'away-total' in key else 'both'
    return result,scope,family,line,team

def build():
    if set(INPUTS)!={m['id'] for m in BASE}: raise ValueError('Fixture assumption coverage mismatch')
    snapshot={'datasetVersion':VERSION,'sourceKind':'synthetic-model','margin':MARGIN,'fixtures':{}}
    audit=[]
    for match in BASE:
        full,period,model,inputs,rules=grids(match,INPUTS[match['id']])
        full,period=distributions(full),distributions(period)
        pending=[market_prices(match,old,index,full,period) for index,old in enumerate(match['markets'])]
        maximum=max(q['winStake']/(q['winStake']+q['loseStake']) for row,*_ in pending for q in row)
        # One fixture-wide overround, reduced for extreme legacy lines so every
        # rounded decimal quote remains >1 without independently capping prices.
        if maximum>=1/1.006: raise ValueError('Scenario too extreme: '+match['id'])
        margin=math.floor(min(MARGIN,(1/(maximum*1.006)-1)*.9)*1e8)/1e8
        inputs['pricingMargin']=margin
        markets=[]
        for index,(old,pending_row) in enumerate(zip(match['markets'],pending)):
            prices,scope,family,line,team=pending_row
            for q in prices:
                q['priceCents']=quoted(q['winStake'],q['loseStake'],q['refundStake'],margin)
                q['price']=q['priceCents']/100
            market={**old,'rule':rules[scope],'period':scope,'settlement':'quarter-split; integer-push; half-line-no-push','sourceKind':'synthetic-model','datasetVersion':VERSION,
                    'picks':[{**pick,'price':price['price'],'priceCents':price['priceCents']} for pick,price in zip(old['picks'],prices)]}
            if family=='total' or family=='handicap': market['rule']+=' · 정수 환급 / 쿼터 분할'
            if family not in ('total','handicap','result'): market['settlement']='full-win-or-loss'
            markets.append(market)
            audit.append({'fixtureId':match['id'],'sport':match['sport'],'index':index,'key':old.get('key'),'scope':scope,'family':family,'team':team,'line':line,'margin':margin,'labels':[p['label'] for p in old['picks']],'outcomes':prices})
        snapshot['fixtures'][match['id']]={'fixtureId':match['id'],'sport':match['sport'],'model':model,'modelInputs':inputs,'rules':rules,'sourceKind':'synthetic-model','datasetVersion':VERSION,'markets':markets}
    target=SITE/'app/prematch-odds-r9.json'
    target.write_text(json.dumps(snapshot,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/'pricing-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/'model.json').write_text(json.dumps({'datasetVersion':VERSION,'sourceKind':'synthetic-model','margin':MARGIN,'generator':str(Path(__file__)),'baselineSha256':hashlib.sha256((ROOT/'baseline.json').read_bytes()).hexdigest(),'snapshotSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'notes':['Explicit per-fixture editorial assumptions; not team analysis or provider odds.','All markets share the same full/period score distributions.','Soccer 90-minute Poisson; hockey regulation Poisson plus a winning goal; basketball joint score-margin/total normal plus tied-game resolution; NFL compound scoring events and OT/tie mixture.','Periods scale the same expected scoring and variance assumptions; OT resolution is a deliberately simplified synthetic scenario.','Integer pushes and quarter stake splits priced on exposed stake; no intermediate parlay rounding.','Market indices, key/line/outcome keys preserved from v8; no fallback for missing prematch fixtures.'],'fixtureCount':len(BASE),'marketCount':len(audit)},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'fixtures':len(BASE),'markets':len(audit),'output':str(target),'bytes':target.stat().st_size}))

if __name__=='__main__': build()
