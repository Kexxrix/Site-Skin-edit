from pathlib import Path

root = Path(__file__).resolve().parents[3] / 'site'
css = root / 'app/aldebaran-wog-r5.css'
text = css.read_bytes().decode('utf-8')
text = text.replace('--ab5-on-accent: #171717; --ab5-odds: #50dcd9; --ab5-small-accent: #f1b000;', '--ab5-on-accent: #ffffff; --ab5-on-yellow: #171717; --ab5-odds: #50dcd9; --ab5-small-accent: #fcd73e;')
for selector in ['.ab5-menu-badge', '.ab5-market-open', '.ab5-latest .ab5-badge', '.ab5-bet-submit']:
    lines = text.splitlines(keepends=True)
    text = ''.join(line.replace('color: var(--ab5-on-accent)', 'color: var(--ab5-on-yellow)') if line.startswith(selector+' {') else line for line in lines)
text = text.replace('.ab5-latest .ab5-badge {', '.ab5-sports-summary .ab5-badge, .ab5-latest .ab5-badge {')
text = text.replace('.ab5-balance-value { color: var(--ab5-accent);', '.ab5-balance-value { color: var(--ab5-small-accent);')
text = '\n'.join(line for line in text.split('\n') if not line.startswith('.ab5-card-motif {') and not line.startswith('.ab5-card>div,.ab5-card>button {'))
text = text.replace('.ab5-quick-action svg {', '.ab5-quick-action.primary svg, .ab5-odd[aria-pressed="true"] svg { color: var(--ab5-on-yellow); }\n.ab5-quick-action svg {')
text += '\n.ab5-payout-value { color: var(--ab5-small-accent); }\n.aldebaran-site :is([data-ab-control="primary"], .ab5-service-primary) svg { color: #171717; }\n'
css.write_bytes(text.encode('utf-8'))
tsx = root / 'app/aldebaran-wog-r5.tsx'
text = tsx.read_bytes().decode('utf-8')
text = text.replace('    <img className="ab5-card-motif" src={match.sportLogo} alt=""/>\r\n', '').replace('    <img className="ab5-card-motif" src={match.sportLogo} alt=""/>\n', '')
old = "data-total-odds={label==='총 배당'?'':undefined}>{value}</strong>"
new = "data-total-odds={label==='총 배당'?'':undefined}>{label==='총 당첨금'?<><span className={selected.length>0&&checked.value>0?'ab5-payout-value':undefined}>{moneyText(total.potential)}</span>{' '}<span>원</span></>:value}</strong>"
assert old in text
text = text.replace(old,new)
tsx.write_bytes(text.encode('utf-8'))
print('Updated color roles, payout-number span, and removed card motif rendering/styles.')
