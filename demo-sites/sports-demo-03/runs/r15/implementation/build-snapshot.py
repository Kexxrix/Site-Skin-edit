"""Author deterministic R15 demo data, using R9 score models and stable legacy IDs.
No live schedule, roster, provider feed, transaction, or settlement engine.
"""
import copy, importlib.util, json, math, random, statistics
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[2]
SITE = PROJECT / 'site'
INPUT = PROJECT / 'input/r15/ALDEBARAN_R15_POLISH_MARKETS/resources'
VERSION = 'aldebaran-prematch-r15-20260923'
spec = importlib.util.spec_from_file_location('r9', PROJECT / 'runs/r9/implementation/build-snapshot.py')
r9 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r9)
old = json.loads((SITE / 'app/prematch-odds-r9.json').read_text(encoding='utf-8'))
records = json.loads((SITE / 'app/match-records.json').read_text(encoding='utf-8'))
catalog = json.loads((INPUT / 'market-catalog.json').read_text(encoding='utf-8'))['templates']
labels = {t['id']: t['label_ko'] for t in catalog}
audit, skipped = [], []

def seed_for(value):
    return sum((i+1)*ord(c) for i,c in enumerate(value))

def dump(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':'))+'\n', encoding='utf-8')

def numeric(text):
    return float(text.replace('홈 ', '').replace('−', '-')) if text is not None else None

def half_lines(mean, count, step=1):
    center = math.floor(mean)+.5
    return sorted({round(center+(i-count//2)*step, 1) for i in range(count) if center+(i-count//2)*step >= .5})

def selection_id(match, i, p):
    m = match['markets'][i]
    return f"{match['id']}:{match['sport']}:{m['key']}:{m.get('line','none')}:{m['picks'][p]['key']}" if m.get('key') else f"{match['id']}-{i}-{p}"

# Independent, explicitly synthetic MLB fixtures. Only existing baseball team/logo records are reused.
teams = list({t['id']: t for m in records if m['sport']=='baseball' for t in [m['home'],m['away']]}.values())
assert len(teams) >= 16
baseballs = []
for i in range(16):
    day = 24+i//8
    home, away = teams[(2*i)%len(teams)], teams[(2*i+1)%len(teams)]
    match = dict(id=f'aldebaran-r15-baseball-{i+1:02}', sourceEventId='', section='soon', sport='baseball', league='MLB', leagueKey='mlb',
                 home=home, away=away, leagueLogo='/sports/r6/leagues/baseball/mlb.png', sportLogo='/sports/r8/mercury-baseball.png',
                 state='pre', completed=False, statusCode='STATUS_SCHEDULED', statusDetail='예정', score=['0','0'],
                 startUtc=f'2026-09-{day:02}T{(i%8):02}:00:00Z', timeLabel=f'09.{day:02} {9+i%8:02}:00', timeZone='Asia/Seoul',
                 sourceUrl='', sourceCollectedDate='', sourceFileMtimeUtc='', sourceSha256='', sourceFile='', sourceMode='synthetic-demo', oddsMode='demo')
    baseballs.append(match)

class Builder:
    def __init__(self, match):
        self.match = match
        self.sport = match['sport']
        self.prefix = 'ice_hockey' if self.sport=='hockey' else self.sport
        self.seed = seed_for(match['id'])
        self.profile = ['compact','standard','extended'][self.seed%3]
        self.extended = self.profile=='extended'
        self.compact = self.profile=='compact'
        self.inputs = copy.deepcopy(old['fixtures'][match['id']]['modelInputs']) if match['id'] in old['fixtures'] else dict(homeMean=3.45+(self.seed%13)*.11, awayMean=3.05+(self.seed%17)*.12, pricingMargin=.025)
        self.h, self.a = self.inputs['homeMean'], self.inputs['awayMean']
        self.margin = self.inputs['pricingMargin']
        self.cache, self.markets, self.identities = {}, [], set()
        self.capabilities = dict(profile=self.profile, assignment='fixture-id deterministic demo variation', regulationFormat='90 minutes' if self.sport=='soccer' else '4 quarters' if self.sport=='basketball' else '9 innings' if self.sport=='baseball' else '3 periods',
                                 corners=self.sport=='soccer' and not self.compact, cards=self.sport=='soccer', shots=self.sport=='soccer' and self.extended,
                                 hits=self.sport=='baseball' and not self.compact, verifiedRoster=False, verifiedStarter=False, knockout=False,
                                 statisticsSource='explicit synthetic assumptions; not observed statistics')
        self.periods = ['regulation','first_half','second_half'] if self.sport=='soccer' else ['full_game','first_half','quarter_1','quarter_2','quarter_3','quarter_4']+(['second_half'] if not self.compact else []) if self.sport=='basketball' else ['full_game','first_5_innings']+([] if self.compact else ['first_3_innings','first_7_innings']) if self.sport=='baseball' else ['full_game','regulation','period_1','period_2','period_3']
        self.capabilities['periods'] = self.periods
        self.capabilities['mainLineCount'] = 3 if self.compact else 5 if not self.extended else 7
        self.capabilities['periodLineCount'] = 1 if self.compact else 3
        self.capabilities['teamLineCount'] = 3 if self.extended else 1

    def period(self, p):
        if p=='full_game': return (1, '전체', '연장 포함' if self.sport!='hockey' else '연장·슛아웃 포함 · 슛아웃 승리 1골')
        if p=='regulation': return (1, '정규시간', {'soccer':'90분·추가시간 포함 · 연장 제외','hockey':'정규 60분 · 연장·슛아웃 제외','basketball':'정규 4쿼터 · 연장 제외','baseball':'정규 9이닝 · 연장 제외'}[self.sport])
        if p.endswith('_half'): return (.5, '전반' if p=='first_half' else '후반', '해당 하프 · 연장 제외')
        if p.startswith('quarter_'): return (.25, p[-1]+'쿼터', ('12분' if self.match['leagueKey']=='nba' else '10분')+' · 해당 쿼터 · 연장 제외')
        if p.startswith('period_'): return (1/3, p[-1]+'피리어드', '해당 피리어드 20분 · 연장 제외')
        if p.startswith('first_'): return (int(p.split('_')[1])/9, '첫 '+p.split('_')[1]+'이닝', '1회부터 '+p.split('_')[1]+'회까지 · 연장 제외')
        if p.startswith('inning_'): return (1/9, p.split('_')[1]+'회', '단일 '+p.split('_')[1]+'회 초·말 합계 · 연장 제외')
        raise ValueError(p)

    def grid(self, p):
        if p in self.cache: return self.cache[p]
        share, _, _ = self.period(p)
        grid = r9.basketball_grid(self.h*share,self.a*share,self.inputs['marginSD']*math.sqrt(share),self.inputs['totalSD']*math.sqrt(share)) if self.sport=='basketball' else r9.product(r9.poisson(self.h*share),r9.poisson(self.a*share))
        if p=='full_game': grid = r9.overtime(grid,self.h/(self.h+self.a),2 if self.sport=='basketball' else 1)
        self.cache[p] = grid
        return grid

    def table(self, p, dim='total'):
        return r9.distributions(self.grid(p))[dim]

    def identity(self, kind, p, subject='both', line=None, variant=''):
        # Semantic identity, separate from stable legacy selection keys/indices.
        canonical = kind
        if kind.endswith('draw_no_bet'):
            canonical = self.prefix+'.asian_handicap' if self.sport=='soccer' else self.prefix+'.puck_line'
            line = 0.
        if kind=='baseball.first_inning_score': canonical='baseball.inning_total'; p='inning_1'; line=.5
        scope=self.period(p)[2]
        if variant in ('초','말'):scope=f'단일 {p.split("_")[1]}회 {variant} · '+('원정팀' if subject=='away' else '홈팀')+' 공격만'
        return '|'.join(map(str,[self.match['id'],canonical,p,scope,subject,'' if line is None else float(line),variant]))

    def add(self, kind, p, outcomes, subject='both', line=None, variant='', category='other', extra_rule='', name=None, legacy=None):
        identity=self.identity(kind,p,subject,line,variant)
        if identity in self.identities: return
        # No individually capped odds and no impossible/tiny-probability placeholders.
        prices=[]
        for label,w,l,r in outcomes:
            try: cents=r9.quoted(w,l,r,self.margin)
            except ValueError:
                skipped.append(dict(fixtureId=self.match['id'],templateId=kind,period=p,line=line,reason='unquotable outcome probability')); return
            if not 100<cents<=1000000:
                skipped.append(dict(fixtureId=self.match['id'],templateId=kind,period=p,line=line,reason='quote outside demo range 1.01..10000')); return
            prices.append(cents)
        if not 2<=len(outcomes): return
        share, period_label, scope=self.period(p)
        if variant in ('초','말'):
            period_label+=' '+variant
            scope=f'단일 {p.split("_")[1]}회 {variant} · '+('원정팀' if subject=='away' else '홈팀')+' 공격만'
        if variant=='card-count': extra_rule='경고·직접 퇴장 각 1장 · 두 번째 경고 중복 제외'
        title=name or labels.get(kind,kind)
        team_label=self.match[subject]['name']+' · ' if subject in ('home','away') else ''
        group=f'{kind}:{p}:{subject}:{variant}'
        market=dict(name=f'{period_label} · {team_label}{title}',rule=scope+(' · '+extra_rule if extra_rule else ''),key=group,group=group,category=category,
                    picks=[dict(label=o[0],key=str(i),price=cents/100,priceCents=cents) for i,(o,cents) in enumerate(zip(outcomes,prices))])
        if line is not None: market['line']=str(line)
        if legacy is not None:
            market=copy.deepcopy(legacy)
            # Legacy prices and stable keys are preserved; new markets use the same model inputs.
            market['category']=category
        market.update(canonicalId=identity,templateId=kind,period=p,settlementScope=scope,subjectId=subject,status='active',variant=variant)
        self.markets.append(market);self.identities.add(identity)
        audit.append(dict(fixtureId=self.match['id'],canonicalId=identity,templateId=kind,period=p,subject=subject,line=line,outcomes=[dict(label=o[0],win=o[1],lose=o[2],refund=o[3]) for o in outcomes],legacy=legacy is not None))

    def categorical(self, kind, p, values, **kwargs):
        total=sum(values.values())
        self.add(kind,p,[(label,w/total,1-w/total,0) for label,w in values.items()],**kwargs)

    def binary(self, kind,p,prob,**kwargs):
        self.add(kind,p,[('예',prob,1-prob,0),('아니오',1-prob,prob,0)],**kwargs)

    def result(self,kind,p,three=False,**kwargs):
        t=self.table(p,'margin');h=sum(v for k,v in t.items() if k>0);a=sum(v for k,v in t.items() if k<0);d=t.get(0,0)
        out=[('홈',h,1-h,0),('무',d,1-d,0),('원정',a,1-a,0)] if three else [('홈',h,a,d),('원정',a,h,d)]
        self.add(kind,p,out,category='result',extra_rule='' if three else '동점 환불',variant='3way' if three else '2way-refund',**kwargs)

    def lines(self,kind,p,lines,dim='total',subject='both',grid=None,category='totals',variant=''):
        t=r9.distributions(grid)[dim] if grid is not None else self.table(p,dim)
        for line in lines:
            w=l=r=0
            for value,mass in t.items():
                rw,rl,rr=r9.settle(value,line if dim=='margin' else -line)
                w+=mass*rw;l+=mass*rl;r+=mass*rr
            outcomes=[('홈',w,l,r),('원정',l,w,r)] if dim=='margin' else [('언더',l,w,r),('오버',w,l,r)]
            self.add(kind,p,outcomes,subject=subject,line=line,category=category,variant=variant,extra_rule='정수 동점 환불')

    def legacy(self):
        if self.match['id'] not in old['fixtures']: return
        for index,m in enumerate(old['fixtures'][self.match['id']]['markets']):
            k=m.get('key','');p='regulation' if self.sport=='soccer' else 'full_game';subject='both';line=numeric(m.get('line'));variant='';category='other'
            if k.startswith('first-half'): p='first_half'
            if k.startswith('first-quarter'): p='quarter_1'
            if k.startswith('first-period'): p='period_1'
            if index==0 or k.endswith('result'):
                kind='result_3way' if self.sport=='soccer' else 'moneyline' if self.sport=='basketball' or p=='full_game' else 'period_result'
                variant='3way' if len(m['picks'])==3 else '2way-refund';category='result'
            elif index==2 or k=='full-handicap':kind={'soccer':'asian_handicap','basketball':'spread','hockey':'puck_line'}[self.sport];category='handicap'
            elif index==1 or k.endswith('total'):
                subject='home' if 'home-total' in k else 'away' if 'away-total' in k else 'both'
                kind=('team_total_points' if subject!='both' else 'total_points') if self.sport=='basketball' else ('team_total_goals' if subject!='both' else 'period_total_goals' if self.sport=='hockey' and p!='full_game' else 'total_goals');category='totals'
            elif k=='full-odd-even':kind='goals_odd_even' if self.sport!='basketball' else 'points_odd_even'
            elif k=='first-scoring-team':kind='first_team_to_score'
            elif k=='both-teams-score':kind='btts'
            else:raise ValueError(k)
            tid=self.prefix+'.'+kind
            identity=self.identity(tid,p,subject,line,variant)
            assert identity not in self.identities
            new=copy.deepcopy(m);new.update(canonicalId=identity,templateId=tid,period=p,settlementScope=self.period(p)[2],subjectId=subject,status='active',variant=variant,category=category,group=f'{tid}:{p}:{subject}:{variant}')
            self.markets.append(new);self.identities.add(identity)

    def scores(self, kind, p, dim=None, subject='both'):
        grid=self.grid(p); values=Counter()
        for h,a,w in grid:
            n=h if dim=='home' else a if dim=='away' else h+a
            label=(f'{h} : {a}' if h<=3 and a<=3 else '기타 스코어') if dim is None else str(n) if n<7 else '7+'
            values[label]+=w
        self.categorical(kind,p,values,subject=subject)

    def simulation(self):
        # Joint period samples, never a product of overlapping outcome odds.
        rng=random.Random(self.seed); n=24000; periods=4 if self.sport=='basketball' else 2 if self.sport=='soccer' else 9 if self.sport=='baseball' else 3
        def poisson(lam):
            limit=math.exp(-lam); prod=1.;k=0
            while prod>limit:prod*=rng.random();k+=1
            return k-1
        out={k:Counter() for k in ['combo','highest','half','periodwins','wirehome','wireaway','first','last','race2','race3']}
        sign=lambda h,a:'홈' if h>a else '원정' if h<a else '무'
        for _ in range(n):
            hs=[];aws=[]
            for q in range(periods):
                if self.sport=='basketball':
                    total=rng.gauss((self.h+self.a)/4,self.inputs['totalSD']/2);margin=rng.gauss((self.h-self.a)/4,self.inputs['marginSD']/2)
                    h=max(0,round((total+margin)/2));a=max(0,round((total-margin)/2))
                else:h=poisson(self.h/periods);a=poisson(self.a/periods)
                hs.append(h);aws.append(a)
            h,a=sum(hs),sum(aws); fh,fa=(sum(hs[:5]),sum(aws[:5])) if self.sport=='baseball' else (sum(hs[:periods//2]),sum(aws[:periods//2]))
            if h==a and self.sport in ('basketball','baseball'): 
                if rng.random()<self.h/(self.h+self.a):h+=2 if self.sport=='basketball' else 1
                else:a+=2 if self.sport=='basketball' else 1
            out['combo'][sign(fh,fa)+' / '+sign(h,a)]+=1
            totals=[x+y for x,y in zip(hs,aws)];win=[i for i,x in enumerate(totals) if x==max(totals)]
            out['highest'][str(win[0]+1) if len(win)==1 else '동률']+=1
            out['half']['전반' if sum(totals[:2])>sum(totals[2:]) else '후반' if sum(totals[:2])<sum(totals[2:]) else '동률']+=1
            hw=sum(x>y for x,y in zip(hs,aws));aw=sum(x<y for x,y in zip(hs,aws));out['periodwins'][sign(hw,aw)]+=1
            for side in ['home','away']:
                yes=all((sum(hs[:q+1])>sum(aws[:q+1])) if side=='home' else (sum(aws[:q+1])>sum(hs[:q+1])) for q in range(periods))
                out['wire'+side]['예' if yes else '아니오']+=1
            events=[]
            for x,y in zip(hs,aws):
                # Baseball away team bats first; goal sports use exchangeable event order within each period.
                part=['원정']*y+['홈']*x
                if self.sport!='baseball':rng.shuffle(part)
                events.extend(part)
            out['first'][events[0] if events else '득점 없음']+=1;out['last'][events[-1] if events else '득점 없음']+=1
            for target in [2,3]:
                counts=Counter();winner='미달'
                for event in events:
                    counts[event]+=1
                    if counts[event]>=target:winner=event;break
                out['race'+str(target)][winner]+=1
        return out

    def build(self):
        self.legacy();pre=self.prefix;full='regulation' if self.sport=='soccer' else 'full_game';main=self.capabilities['mainLineCount'];sub=self.capabilities['periodLineCount'];tc=self.capabilities['teamLineCount']
        # First three rows for new baseball fixtures preserve the existing preview layout order.
        if self.sport=='baseball':
            self.result(pre+'.moneyline',full)
            self.lines(pre+'.total_runs',full,half_lines(self.h+self.a,1))
            self.lines(pre+'.run_line',full,[-1.5],dim='margin',category='handicap')
        for p in self.periods:
            if self.sport=='hockey' and p=='regulation':continue
            share=self.period(p)[0]; count=main if p==full else sub
            result_kind={'soccer':'result_3way','basketball':'moneyline','baseball':'moneyline','hockey':'moneyline' if p==full else 'period_result'}[self.sport]
            self.result(pre+'.'+result_kind,p,self.sport=='soccer' or (self.sport=='hockey' and p!=full))
            handicap_kind={'soccer':'asian_handicap','basketball':'spread','baseball':'run_line','hockey':'puck_line' if p==full else 'period_handicap'}[self.sport]
            center=math.floor(-(self.h-self.a)*share)+.5
            self.lines(pre+'.'+handicap_kind,p,[center+(i-count//2) for i in range(count)],dim='margin',category='handicap')
            total_kind={'soccer':'total_goals','basketball':'total_points','baseball':'total_runs','hockey':'total_goals' if p==full else 'period_total_goals'}[self.sport]
            self.lines(pre+'.'+total_kind,p,half_lines((self.h+self.a)*share,count,2 if self.sport=='basketball' else 1))
            for side,mean in [('home',self.h),('away',self.a)]:
                if self.sport=='baseball' and p not in ('full_game','first_5_innings'):continue
                team_kind={'soccer':'team_total_goals','basketball':'team_total_points','baseball':'team_total_runs','hockey':'team_total_goals' if p==full else 'period_team_total'}[self.sport]
                self.lines(pre+'.'+team_kind,p,half_lines(mean*share,tc),dim=side,subject=side)
            if self.sport=='soccer':
                t=self.table(p,'margin');h=sum(v for k,v in t.items() if k>0);d=t.get(0,0);a=1-h-d
                if p!='second_half':
                    self.add(pre+'.double_chance',p,[('홈 또는 무',h+d,a,0),('홈 또는 원정',h+a,d,0),('무 또는 원정',d+a,h,0)],category='result')
                    self.add(pre+'.draw_no_bet',p,[('홈',h,a,d),('원정',a,h,d)],category='result',extra_rule='동점 환불')
                self.binary(pre+'.btts',p,sum(w for h,a,w in self.grid(p) if h>0 and a>0))
                if p!='second_half':self.scores(pre+'.correct_score',p)
        joint=self.simulation()
        if self.sport in ('soccer','basketball','baseball'):
            tid=pre+('.double_result' if self.sport=='baseball' else '.half_full_result')
            self.categorical(tid,full,joint['combo'],extra_rule=('첫 5이닝(무 포함) / 연장 포함 최종' if self.sport=='baseball' else '전반(무 포함) / '+self.period(full)[2]))
        if self.sport=='soccer':
            for line in [-2,-1,1]:
                vals=Counter()
                for value,mass in self.table(full,'margin').items():vals['홈' if value+line>0 else '무' if value+line==0 else '원정']+=mass
                self.categorical(pre+'.european_handicap',full,vals,line=line,category='handicap')
            self.scores(pre+'.exact_total_goals',full,'total')
            for side,other in [('home','away'),('away','home')]:self.binary(pre+'.team_clean_sheet',full,self.table(full,other).get(0,0),subject=side)
            self.statistics()
        elif self.sport=='basketball':
            self.categorical(pre+'.highest_scoring_half','regulation',joint['half'],extra_rule='정규시간 하프 비교 · 동률 별도')
            self.categorical(pre+'.highest_scoring_quarter','regulation',{('동률' if k=='동률' else k+'쿼터'):v for k,v in joint['highest'].items()},extra_rule='정규 4쿼터 · 동률 별도')
            for side in ['home','away']:self.categorical(pre+'.wire_to_wire','regulation',joint['wire'+side],subject=side,extra_rule='매 쿼터 종료 누적 점수 리드 · 동점은 아니오')
        elif self.sport=='baseball':
            innings=[1,5] if self.compact else [1,2,3,5,7] if not self.extended else list(range(1,10))
            self.capabilities['singleInnings']=innings
            for inning in innings:
                p='inning_'+str(inning)
                self.result(pre+'.inning_result',p,True)
                self.lines(pre+'.inning_total',p,[.5,1.5] if self.extended else [.5])
                if inning in [1,5]:self.scores(pre+'.inning_correct_score',p)
                if not self.compact:
                    for side,half in [('away','초'),('home','말')]:self.lines(pre+'.half_inning_total',p,[.5],dim=side,subject=side,variant=half)
            # NRFI/YRFI is represented by inning_1 total 0.5, not a duplicate.
            self.categorical(pre+'.first_team_to_score','regulation',joint['first'],extra_rule='무득점 포함')
            self.categorical(pre+'.last_team_to_score','regulation',joint['last'],extra_rule='무득점 포함')
            for target in [2,3]:self.categorical(pre+'.race_to_runs','regulation',joint['race'+str(target)],line=target,extra_rule='미달 포함')
            vals=Counter()
            for h,a,w in self.grid(full):vals[('홈' if h>a else '원정')+(' 1~2점' if abs(h-a)<=2 else ' 3~4점' if abs(h-a)<=4 else ' 5점 이상')]+=w
            self.categorical(pre+'.winning_margin',full,vals)
            self.categorical(pre+'.highest_scoring_inning','regulation',{('동률' if k=='동률' else k+'회'):v for k,v in joint['highest'].items()},extra_rule='동률 별도')
            t=self.table(full,'parity');self.categorical(pre+'.runs_odd_even',full,{'홀':t.get(1,0),'짝':t.get(0,0)})
            if self.capabilities['hits']:
                vals=Counter()
                for h,a,w in r9.product(r9.poisson(self.h*1.9),r9.poisson(self.a*1.9)):vals['홈' if h>a else '무' if h==a else '원정']+=w
                self.categorical(pre+'.team_most_hits',full,vals,extra_rule='합성 팀 안타 모델 · 동률 별도')
        else:
            p='regulation';self.result(pre+'.regulation_result',p,True)
            t=self.table(p,'margin');h=sum(v for k,v in t.items() if k>0);d=t.get(0,0);a=1-h-d
            self.add(pre+'.draw_no_bet',p,[('홈',h,a,d),('원정',a,h,d)],category='result',extra_rule='동점 환불')
            self.add(pre+'.double_chance',p,[('홈 또는 무',h+d,a,0),('홈 또는 원정',h+a,d,0),('무 또는 원정',d+a,h,0)],category='result')
            for line in [-1,1]:
                vals=Counter()
                for v,w in t.items():vals['홈' if v+line>0 else '무' if v+line==0 else '원정']+=w
                self.categorical(pre+'.puck_line_3way',p,vals,line=line,category='handicap')
            for line in [math.floor(self.h+self.a),math.ceil(self.h+self.a)]:
                vals=Counter()
                for v,w in self.table(p).items():vals['미만' if v<line else '정확히' if v==line else '초과']+=w
                self.categorical(pre+'.total_3way',p,vals,line=line,category='totals')
            self.scores(pre+'.exact_total_goals',p,'total')
            for side in ['home','away']:
                self.scores(pre+'.team_exact_goals',p,side,side)
                vals=Counter()
                for v,w in self.table(full,side).items():vals['홀' if v%2 else '짝']+=w
                self.categorical(pre+'.team_goals_odd_even',full,vals,subject=side)
            for kind,key in [('first_team_to_score','first'),('last_team_to_score','last'),('most_periods_won','periodwins')]:self.categorical(pre+'.'+kind,p,joint[key],extra_rule='동률/무득점 별도')
            for target in [2,3]:self.categorical(pre+'.race_to_goals',p,joint['race'+str(target)],line=target,extra_rule='미달 포함')
            self.categorical(pre+'.highest_scoring_period',p,{('동률' if k=='동률' else k+'피리어드'):v for k,v in joint['highest'].items()},extra_rule='동률 별도')
            self.binary(pre+'.tied_after_regulation',p,d)
        return self.markets

    def statistics(self):
        pre=self.prefix;p='regulation'
        for stat,enabled,means,counts in [('corners',self.capabilities['corners'],(4.4+(self.seed%7)*.22,3.8+(self.seed%11)*.19),3),('cards',True,(1.5+(self.seed%5)*.16,1.7+(self.seed%7)*.13),1 if self.compact else 3),('shots',self.capabilities['shots'],(11+(self.seed%7),9+(self.seed%5)),3),('shots_on_target',self.capabilities['shots'],(3.3+(self.seed%7)*.2,2.7+(self.seed%5)*.25),3)]:
            if not enabled:continue
            h,a=means;grid=r9.product(r9.poisson(h,60),r9.poisson(a,60))
            total_kind=stat+'_total' if stat in ('corners','cards') else 'match_'+stat
            team_kind='team_'+stat
            for scope in (['regulation','first_half','second_half'] if stat=='corners' and self.extended else [p]):
                share=self.period(scope)[0];g=grid if share==1 else r9.product(r9.poisson(h*share),r9.poisson(a*share))
                self.lines(pre+'.'+total_kind,scope,half_lines((h+a)*share,counts),grid=g,category='other',variant='card-count' if stat=='cards' else '')
                if stat=='corners' and scope!='second_half':self.lines(pre+'.corners_handicap',scope,[-1.5,-.5,.5],dim='margin',grid=g,category='other')
            for side,mean in [('home',h),('away',a)]:self.lines(pre+'.'+team_kind,p,half_lines(mean,3 if self.extended else 1),dim=side,subject=side,grid=grid,category='other',variant='card-count' if stat=='cards' else '')
            if stat=='corners':
                vals=Counter()
                for x,y,w in grid:vals['홈' if x>y else '무' if x==y else '원정']+=w
                self.categorical(pre+'.corners_most',p,vals)
            if stat=='cards':
                blank=math.exp(-h-a)
                self.categorical(pre+'.first_card_team',p,{'홈':(1-blank)*h/(h+a),'원정':(1-blank)*a/(h+a),'카드 없음':blank},extra_rule='경고·퇴장 각 1장 · 두 번째 경고 중복 제외')
                self.binary(pre+'.red_card',p,1-math.exp(-(.12+(self.seed%4)*.03)),extra_rule='직접 퇴장 또는 두 번째 경고 퇴장')

fixtures=[m for m in records if m['state']=='pre' and not m['completed'] and m['sport'] in ('soccer','basketball','hockey')]+baseballs
snapshot=dict(datasetVersion=VERSION,sourceKind='synthetic-model',fixtures={},baseballFixtures=baseballs)
inventory=[]
for m in fixtures:
    b=Builder(m);markets=b.build();m={**m,'markets':markets}
    snapshot['fixtures'][m['id']]=dict(sport=m['sport'],modelInputs=b.inputs,capabilities=b.capabilities,markets=markets)
    inventory.append(dict(fixtureId=m['id'],sport=m['sport'],league=m['league'],profile=b.profile,familyCount=len({x['templateId'] for x in markets}),marketCount=len(markets),selectionCount=sum(len(x['picks']) for x in markets),displayedBadgeCount=len(markets),detailMarketCount=len(markets),countMatches=True,playerMarketsPresent=False))
    print(m['id'],m['sport'],b.profile,len(markets),flush=True)
coverage=[]
for t in catalog:
    ids=[fid for fid,f in snapshot['fixtures'].items() if any(m['templateId']==t['id'] for m in f['markets'])]
    alias=t['id']=='baseball.first_inning_score'
    reason='' if ids else 'Represented once by baseball.inning_total / inning_1 / 0.5 (NRFI/YRFI alias)' if alias else 'No knockout bracket metadata in these fixtures' if t['id']=='soccer.to_qualify' else 'No verified fixture roster / starting pitcher / starting goalie snapshot; player identities not invented'
    coverage.append(dict(templateId=t['id'],status='implemented' if ids else 'alias_deduplicated' if alias else 'excluded',fixtureCount=len(ids) if not alias else 16,reason_if_excluded=reason))
summaries=[]
for sport in ['soccer','basketball','baseball','hockey']:
    counts=[r['marketCount'] for r in inventory if r['sport']==sport]
    summaries.append(dict(sport=sport,fixtureCount=len(counts),minMarkets=min(counts),medianMarkets=statistics.median(counts),maxMarkets=max(counts),distinctMarketCounts=sorted(set(counts))))
dump(SITE/'app/prematch-r15.json',snapshot)
dump(ROOT/'market-inventory.json',inventory);dump(ROOT/'template-coverage.json',coverage);dump(ROOT/'sport-summary.json',summaries);dump(ROOT/'pricing-audit.json',audit);dump(ROOT/'omitted-quotes.json',skipped)
print(json.dumps(summaries))
