from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
FILE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site/app/page.tsx')
before=FILE.read_bytes()
assert before==(ROOT/'before-app/page.tsx').read_bytes(),'Concurrent source change;inspect before editing'
replacements=[(b'<strong>{total.displayOdds} /',b'<strong><span className="ab5-summary-odds">{total.displayOdds}</span> /'),
              (b'{moneyText(receipt.stake)} \xc3\x97 {priceText(receipt.odds)}</span>',b'{moneyText(receipt.stake)} \xc3\x97 <span className="ab5-summary-odds">{priceText(receipt.odds)}</span></span>')]
after=before
for old,new in replacements:
    assert after.count(old)==1,(old,after.count(old))
    after=after.replace(old,new)
FILE.write_bytes(after)
record={'file':str(FILE),'before_sha256':hashlib.sha256(before).hexdigest(),'after_sha256':hashlib.sha256(after).hexdigest(),
        'operation':'Two inline wrappers only for odds inside mixed money/odds text;original bytes/newlines outside replacements unchanged'}
(ROOT/'markup-change.json').write_text(json.dumps(record,indent=2),encoding='utf-8')
print(json.dumps(record))
