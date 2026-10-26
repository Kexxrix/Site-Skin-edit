import json
from pathlib import Path

root = Path(__file__).parent
verification = json.loads((root / 'verification.json').read_text(encoding='utf-8'))
target = root.parent / 'bit365-figma-20261012-184651' / 'state.json'
state = json.loads(target.read_text(encoding='utf-8-sig'))
state['sportsReplacement'] = {'directory': str(root), 'verification': str(root / 'verification.json'),
                            'components': verification['components'], 'galleryId': verification['galleryId'],
                            'screens': verification['audit']['screens']}
target.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding='utf-8')
print('Sports replacement state saved')
