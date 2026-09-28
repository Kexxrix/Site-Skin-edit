"""Offline synthetic soccer examples; not live odds or a production pricing engine.
Run with Python 3 standard library only. Output is illustrative and has no real fixture IDs.
"""
from decimal import Decimal, ROUND_HALF_UP
from math import exp, factorial
from pathlib import Path
import json

MARGIN = 0.045  # illustrative overround setting, not a market-wide factual standard

def make_grid(home, away):
    grid = [(h, a, exp(-home) * home**h / factorial(h)
             * exp(-away) * away**a / factorial(a))
            for h in range(21) for a in range(21)]
    mass = sum(p for _, _, p in grid)
    return [(h, a, p / mass) for h, a, p in grid]

def quote(probability):
    value = Decimal(str(1 / (probability * (1 + MARGIN)))).quantize(
        Decimal('0.01'), rounding=ROUND_HALF_UP)
    if value <= 1:
        raise ValueError('Probability too extreme for this simple margin rule')
    return {'price': float(value), 'priceCents': int(value * 100),
            'display': f'{value:.2f}', 'modelProbability': round(probability, 10)}

def profile(key, home, away):
    grid = make_grid(home, away)
    def prob(predicate):
        return sum(p for h, a, p in grid if predicate(h, a))
    markets = []
    def add(key, line, outcomes):
        quoted = [{'key': name, **quote(prob(predicate))} for name, predicate in outcomes]
        markets.append({'key': key, 'line': line, 'period': 'full-time',
                        'settlement': '90min-including-stoppage-excluding-extra-time',
                        'outcomes': quoted,
                        'roundedImpliedProbabilitySum': round(sum(1/o['price'] for o in quoted), 6)})
    add('result-1x2', None, [('home', lambda h,a:h>a), ('draw', lambda h,a:h==a), ('away', lambda h,a:h<a)])
    for line in [-1.5, -0.5, 0.5, 1.5]:
        add('asian-handicap', line, [('home', lambda h,a,l=line:h+l>a), ('away', lambda h,a,l=line:h+l<a)])
    for line in [1.5, 2.5, 3.5]:
        add('total-goals', line, [('under', lambda h,a,l=line:h+a<l), ('over', lambda h,a,l=line:h+a>l)])
    for side in ['home', 'away']:
        for line in [0.5, 1.5]:
            add(side+'-team-total', line,
                [('under', lambda h,a,l=line,s=side:(h if s=='home' else a)<l),
                 ('over', lambda h,a,l=line,s=side:(h if s=='home' else a)>l)])
    add('both-teams-to-score', None, [('yes', lambda h,a:h>0 and a>0), ('no', lambda h,a:h==0 or a==0)])
    return {'exampleId': key, 'isSynthetic': True, 'realFixtureId': None,
            'homeGoalsMean': home, 'awayGoalsMean': away, 'targetOverround': MARGIN,
            'markets': markets}

def validate(examples):
    for example in examples:
        markets = example['markets']
        for market in markets:
            assert abs(sum(o['modelProbability'] for o in market['outcomes'])-1) < 1e-8
            assert all(o['priceCents'] > 100 and o['display'].count('.') == 1
                       and len(o['display'].split('.')[1]) == 2 for o in market['outcomes'])
        totals = [m for m in markets if m['key']=='total-goals']
        handicaps = [m for m in markets if m['key']=='asian-handicap']
        for left, right in zip(totals, totals[1:]):
            assert left['outcomes'][0]['price'] >= right['outcomes'][0]['price']
            assert left['outcomes'][1]['price'] <= right['outcomes'][1]['price']
        for left, right in zip(handicaps, handicaps[1:]):
            assert left['outcomes'][0]['price'] >= right['outcomes'][0]['price']
        result = next(m for m in markets if m['key']=='result-1x2')
        half = next(m for m in handicaps if m['line']==-0.5)
        assert result['outcomes'][0]['price'] == half['outcomes'][0]['price']

if __name__ == '__main__':
    examples = [profile('illustrative-home-favourite', 1.85, 0.95),
                profile('illustrative-balanced', 1.35, 1.25),
                profile('illustrative-away-favourite', 0.95, 1.75)]
    validate(examples)
    output = {'purpose': 'Illustrative consistent synthetic odds; never rotate these three profiles across all fixtures.',
              'method': 'Independent Poisson score grid 0..20, normalized; decimal O=1/(p*(1+m)); round half up to 2 decimals.',
              'limits': 'Soccer 90-minute and half-point examples only; not fitted to real teams; no push/quarter settlement; not a live provider.',
              'examples': examples}
    path = Path(__file__).with_name('odds-soccer-examples.json')
    path.write_text(json.dumps(output, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({'output': path.name, 'profiles': len(examples),
                      'markets': sum(len(e['markets']) for e in examples),
                      'checks': 'probability sums, finite positive quotes, monotonic lines, same event same quote'}, ensure_ascii=False))
