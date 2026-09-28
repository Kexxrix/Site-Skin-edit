import hashlib
import json
import subprocess
from datetime import datetime
from pathlib import Path

base = Path(__file__).resolve().parent
intake = json.loads((base / 'intake.json').read_text(encoding='utf-8-sig'))
docs = json.loads((base / 'operating-documents-before.json').read_text(encoding='utf-8-sig'))
git = 'C:/Program Files/Git/cmd/git.exe'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def repository(name):
    prior = intake[name]
    root = Path(prior['root'])
    modified, missing = [], []
    for name, digest in prior['trackedHashes'].items():
        path = root / name
        if not path.is_file():
            missing.append(name)
        elif sha(path).lower() != digest.lower():
            modified.append(name)
    def run(*args):
        return subprocess.check_output([git, '-c', f'safe.directory={root.as_posix()}', '-C', str(root), *args], text=True).strip()
    return {'root': str(root), 'baselineFiles': len(prior['trackedHashes']), 'changed': modified, 'missing': missing, 'head': run('rev-parse', 'HEAD'), 'baselineHead': prior['head'], 'status': run('status', '--short')}

report = {'at': datetime.now().astimezone().isoformat(), 'aldebaran': repository('aldebaran'), 'mercury': repository('mercury')}
project = Path(intake['mercury']['root']).parent
report['operatingDocumentHistoryPreserved'] = {
    name: (project / name).read_text(encoding='utf-8-sig').endswith(record['text'])
    for name, record in docs.items()
}
report['aldebaranUnchanged'] = not report['aldebaran']['changed'] and not report['aldebaran']['missing'] and report['aldebaran']['head'] == report['aldebaran']['baselineHead'] and report['aldebaran']['status'] == intake['aldebaran']['status']
(base / 'preservation-check.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
