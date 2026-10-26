from pathlib import Path
from datetime import datetime, timezone
from collections import Counter, defaultdict
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import zipfile

ROOT = Path('E:/codexwork/Site-Skin-edit')
REPO = Path('E:/codexwork/Site-Skin-edit-backups/20260911-203900/repository')
EVIDENCE = Path(__file__).parent
SNAPREL = 'backup/site-snapshots/20261026-project-sync'
SNAP = REPO / SNAPREL
BASE = '77b0cc029b253993e29fa212e4930489bc7fd35d'
CUTOFF = datetime.fromisoformat('2026-10-12T03:33:08+00:00').timestamp()
GH = 'C:/Program Files/GitHub CLI/gh.exe'
QA = Path('C:/Users/User/.codex/visualizations/2026/09/16/01a0a8e7-acda-7ab0-a42a-44beb1b41e50/titan-paperlogy-clone-20261026')
PRUNE = {'.git', 'node_modules', '.next', '.vinext', '.wrangler', 'dist', 'out', '.sites-runtime', '__pycache__', 'coverage', '.obsidian', '.venv', 'venv', '.cache', '.turbo', 'build-site'}
TEXT_EXT = {'.md', '.json', '.canvas', '.base', '.ts', '.tsx', '.js', '.cjs', '.mjs', '.css', '.html', '.svg', '.txt', '.toml', '.yml', '.yaml', '.log', '.py', '.ps1', '.sh', '.cmd', '.bat', '.patch', '.csv', '.xml', '.gitignore', '.gitattributes', '.env'}
PATTERNS = {
    'private_key': rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----',
    'github_token': rb'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b',
    'openai_key': rb'\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}\b',
    'jwt': rb'\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b',
    'bearer_literal': rb'(?i)Bearer\s+[A-Za-z0-9_-]{35,}',
    'aws_access_key': rb'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b',
    'google_api_key': rb'\bAIza[0-9A-Za-z_-]{35}\b',
    'telegram_bot_token': rb'\b[0-9]{8,12}:[A-Za-z0-9_-]{35}\b',
    'credential_url': rb'https?://[^\s/<>"\x27:]{1,100}:[^\s/<>"\x27@]{5,100}@',
}


def now():
    return datetime.now(timezone.utc).isoformat()


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def git(root, *args):
    env = os.environ.copy()
    env['GIT_OPTIONAL_LOCKS'] = '0'
    return subprocess.check_output(['git', '-c', 'safe.directory=' + root.as_posix(), '-c', 'maintenance.auto=false', '-c', 'gc.auto=0', '-c', 'core.quotepath=false', '-c', 'core.autocrlf=false', '-C', str(root), *args], env=env)


def tree(ref):
    result = {}
    for row in git(REPO, 'ls-tree', '-r', '-z', ref).split(b'\0'):
        if row:
            info, path = row.split(b'\t', 1)
            mode, kind, digest = info.decode().split()
            result[path.decode()] = {'sha': digest, 'mode': mode, 'type': kind}
    return result


def digest(path):
    before = path.stat()
    h256 = hashlib.sha256()
    hgit = hashlib.sha1(b'blob ' + str(before.st_size).encode() + b'\0')
    with path.open('rb') as stream:
        while chunk := stream.read(4 * 1024 * 1024):
            h256.update(chunk)
            hgit.update(chunk)
    after = path.stat()
    assert (before.st_size, before.st_mtime_ns) == (after.st_size, after.st_mtime_ns), 'File changed while reading: ' + str(path)
    return {'bytes': before.st_size, 'sha256': h256.hexdigest(), 'git_blob_sha1': hgit.hexdigest(), 'mtime_ns': before.st_mtime_ns}


def group(rel):
    parts = rel.split('/')
    return '/'.join(parts[:2]) if parts[0] in {'demo-sites', 'generated-images', 'exports', 'artifacts', 'docs', 'assets'} and len(parts) > 1 else parts[0]


def capture_git(root):
    result = {'path': root.as_posix(), 'head': git(root, 'rev-parse', 'HEAD').decode().strip(), 'branch': git(root, 'branch', '--show-current').decode().strip(), 'remotes': git(root, 'remote', '-v').decode(), 'status': git(root, 'status', '--porcelain=v1', '-z').decode(), 'git_files': {}}
    gitdir = Path(git(root, 'rev-parse', '--absolute-git-dir').decode().strip())
    for name in ['HEAD', 'config', 'index', 'packed-refs']:
        p = gitdir / name
        if p.is_file():
            result['git_files'][name] = digest(p)['sha256']
    return result


def baseline(clean=True):
    assert git(REPO, 'rev-parse', 'HEAD').decode().strip() == BASE, 'Backup HEAD changed'
    assert git(REPO, 'branch', '--show-current').decode().strip() == 'main'
    assert git(REPO, 'remote', 'get-url', 'origin').decode().strip() == 'https://github.com/Kexxrix/Site-Skin-edit.git'
    assert git(REPO, 'ls-remote', 'origin', 'refs/heads/main').decode().split()[0] == BASE, 'Remote advanced'
    if clean:
        assert not git(REPO, 'status', '--porcelain').strip(), 'Backup checkout has pre-existing changes'


def inventory():
    baseline()
    assert not SNAP.exists(), 'Snapshot destination collision'
    base = tree(BASE)
    records, excluded, unchanged, findings, repos, archives = [], [], [], [], [], []
    forced = {'titan_promotion', 'demo-sites/luna-goldflow-20261020', 'demo-sites/titan-paperlogy-20261026', 'assets/fonts'}
    for parent in ['generated-images', 'exports', 'artifacts', 'docs/figma', 'docs/figma-qa']:
        for p in (ROOT / parent).iterdir():
            date = re.search(r'20\d{6}', p.name)
            if p.is_dir() and date and date.group() >= '20261012':
                forced.add(p.relative_to(ROOT).as_posix())
    candidates = []
    for folder, dirs, files in os.walk(ROOT):
        current = Path(folder)
        kept = []
        for name in sorted(dirs):
            p = current / name
            rel = p.relative_to(ROOT).as_posix()
            if name == '.git':
                repos.append(current)
            reason = None
            if name in PRUNE or name.startswith('runtime-'):
                reason = 'Git metadata, installed dependencies, build output, cache, or local editor state'
            elif rel == 'qa-tools':
                reason = 'Installed third-party QA tooling; project QA results are collected separately'
            elif p.is_symlink():
                reason = 'External symlink target is not followed'
            if reason:
                excluded.append({'path': rel + '/', 'reason': reason})
            else:
                kept.append(name)
        dirs[:] = kept
        for name in sorted(files):
            p = current / name
            rel = p.relative_to(ROOT).as_posix()
            stat = p.stat()
            selected = rel in base or stat.st_mtime >= CUTOFF or any(rel == prefix or rel.startswith(prefix + '/') for prefix in forced)
            if not selected:
                excluded.append({'path': rel, 'reason': 'Untracked in prior backup and older than requested period', 'bytes': stat.st_size})
                continue
            reason = None
            if name.startswith('.env') or p.suffix.lower() in {'.pem', '.key', '.pfx', '.p12'} or name in {'.npmrc', '.netrc', 'credentials.json', 'cookies.json'}:
                reason = 'Local environment or authentication material'
            elif p.suffix.lower() in {'.jsonl', '.pyc', '.tmp', '.tsbuildinfo', '.pid'} or name in {'next-env.d.ts', '.DS_Store', 'Thumbs.db'}:
                reason = 'Raw tool log, temporary state, or generated build cache'
            elif name.lower().endswith(('.zip', '.tar', '.tar.gz', '.tgz', '.7z')):
                reason = 'Archive pending duplicate-content assessment'
                archives.append({'source_path': p.as_posix(), 'path': rel, 'bytes': stat.st_size})
            elif p.is_symlink():
                reason = 'External symlink target is not followed'
            if reason:
                excluded.append({'path': rel, 'reason': reason, 'bytes': stat.st_size})
                continue
            candidates.append((p, rel, 'project'))
    qa_names = ['comparison-' + str(w) + '.json' for w in [360, 375, 390, 414, 600, 768, 820, 1024, 1200, 1280, 1440, 1920]]
    qa_names += ['faq-final.json', 'final-desktop.png', 'final-mobile.png', 'final-contact-mobile.png', 'final-platform-viewport.png', 'final-portfolio.png', 'final-support.png', 'final-preview.png', 'source-desktop.png', 'source-mobile.png', 'source-sha256.json']
    for name in qa_names:
        candidates.append((QA / name, 'demo-sites/titan-paperlogy-20261026/qa/' + name, 'Paperlogy external QA evidence'))
    text_count = 0
    for index, (p, rel, origin) in enumerate(candidates):
        info = digest(p)
        rec = {'source_path': p.as_posix(), 'path': rel, 'origin': origin, **info}
        if base.get(rel, {}).get('sha') == info['git_blob_sha1']:
            unchanged.append(rec)
            continue
        assert info['bytes'] < 100 * 1024 * 1024, 'Oversized non-archive file: ' + rel
        rec['change'] = 'updated' if rel in base else 'added'
        rec['group'] = group(rel)
        if p.suffix.lower() in TEXT_EXT or p.name.startswith('.'):
            text_count += 1
            data = p.read_bytes()
            for label, pattern in PATTERNS.items():
                if re.search(pattern, data):
                    findings.append({'path': rel, 'pattern': label})
        records.append(rec)
        if index and index % 2000 == 0:
            print(json.dumps({'progress': index, 'candidates': len(candidates)}), flush=True)
    repo_state = [capture_git(p) for p in sorted(set(repos))]
    counts = defaultdict(lambda: {'added': 0, 'updated': 0, 'bytes': 0})
    for rec in records:
        counts[rec['group']][rec['change']] += 1
        counts[rec['group']]['bytes'] += rec['bytes']
    summary = {'captured_at_utc': now(), 'baseline_commit': BASE, 'cutoff_utc': '2026-10-12T03:33:08Z', 'source_root': ROOT.as_posix(), 'backup_checkout': REPO.as_posix(), 'changed_files': len(records), 'unchanged_files_verified': len(unchanged), 'added': sum(r['change'] == 'added' for r in records), 'updated': sum(r['change'] == 'updated' for r in records), 'bytes_to_collect': sum(r['bytes'] for r in records), 'groups': dict(counts), 'removed_paths': [], 'deployment_performed': False}
    scan = {'text_files_scanned': text_count, 'patterns': list(PATTERNS), 'findings': findings, 'limits': 'Strong-pattern scan and explicit filename exclusions, not a universal guarantee.'}
    write(EVIDENCE / 'inventory.json', {'summary': summary, 'records': records, 'unchanged': unchanged, 'excluded': excluded, 'archives': archives, 'scan': scan, 'source_git_state': repo_state, 'force_complete_groups': sorted(forced)})
    write(EVIDENCE / 'inventory-summary.json', summary)
    write(EVIDENCE / 'content-scan.json', scan)
    print(json.dumps({**summary, 'scan_findings': findings, 'archive_candidates': len(archives), 'excluded_entries': len(excluded)}, ensure_ascii=False, indent=2), flush=True)


def assess():
    plan = read(EVIDENCE / 'inventory.json')
    base = tree(BASE)
    by_hash = defaultdict(list)
    for rec in plan['records'] + plan['unchanged']:
        by_hash[(rec['bytes'], rec['sha256'])].append(rec['path'])
    expanded_patterns = {
        'basic_auth_literal': rb'(?i)Basic\s+[A-Za-z0-9+/]{28,}={0,2}',
        'credential_assignment': rb'''(?i)(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|secret_access_key|password)["\x27\s]*[:=]\s*["\x27]([^"\x27\s]{16,})["\x27]''',
        'signed_cloud_url': rb'(?i)(?:X-Amz-Signature|X-Goog-Signature|AWSAccessKeyId)=[A-Za-z0-9%]{16,}',
    }
    additional = []
    for rec in plan['records']:
        p = Path(rec['source_path'])
        if p.suffix.lower() not in TEXT_EXT and not p.name.startswith('.'):
            continue
        data = p.read_bytes()
        for label, pattern in expanded_patterns.items():
            if re.search(pattern, data):
                additional.append({'path': rec['path'], 'pattern': label})
    report = []
    for archive in plan['archives']:
        p = Path(archive['source_path'])
        info = digest(p)
        result = {**archive, **info, 'entries': []}
        if base.get(archive['path'], {}).get('sha') == info['git_blob_sha1']:
            result['status'] = 'Already backed up byte-identically in baseline; retained unchanged'
            report.append(result)
            continue
        if zipfile.is_zipfile(p):
            handle = zipfile.ZipFile(p)
            entries = [(item.filename, item.file_size, item) for item in handle.infolist() if not item.is_dir()]
            opener = handle.open
        else:
            handle = tarfile.open(p, 'r:*')
            entries = [(item.name, item.size, item) for item in handle.getmembers() if item.isfile()]
            opener = handle.extractfile
        with handle:
            for name, size, item in entries:
                h = hashlib.sha256()
                with opener(item) as stream:
                    while chunk := stream.read(4 * 1024 * 1024):
                        h.update(chunk)
                matches = by_hash.get((size, h.hexdigest()), [])
                result['entries'].append({'entry': name, 'bytes': size, 'sha256': h.hexdigest(), 'matching_repository_paths': matches[:8]})
        result['unmatched_entries'] = [i['entry'] for i in result['entries'] if not i['matching_repository_paths']]
        result['status'] = 'All file contents already collected separately' if not result['unmatched_entries'] else 'Contains unique historical files requiring retention'
        report.append(result)
        print(json.dumps({'archive': archive['path'], 'files': len(result['entries']), 'unmatched': len(result['unmatched_entries'])}), flush=True)
    write(EVIDENCE / 'archive-assessment.json', {'archives': report})
    write(EVIDENCE / 'additional-content-scan.json', {'patterns': list(expanded_patterns), 'findings': additional})
    print(json.dumps({'additional_findings': additional, 'archives': [{'path': r['path'], 'status': r['status'], 'unmatched_entries': r.get('unmatched_entries', [])} for r in report]}, ensure_ascii=False, indent=2))


def prepare():
    plan = read(EVIDENCE / 'inventory.json')
    additional = read(EVIDENCE / 'additional-content-scan.json')
    assert not plan['scan']['findings'] and not additional['findings']
    archive_report = read(EVIDENCE / 'archive-assessment.json')
    for rec in archive_report['archives']:
        unmatched = rec.get('unmatched_entries', [])
        assert all(p.startswith('dist/') for p in unmatched), 'Unique non-build content in archive: ' + rec['path']
        if unmatched:
            rec['status'] = 'Source and asset contents separately collected; unique generated dist files excluded by existing backup policy'
        rec['original_retained_locally'] = True
    archive_by_path = {r['path']: r for r in archive_report['archives']}
    for item in plan['excluded']:
        name = Path(item['path']).name
        if name.startswith('.env'):
            item['reason'] = 'Local environment or authentication material'
        if item['path'] in archive_by_path:
            item['reason'] = archive_by_path[item['path']]['status']
            item['sha256'] = archive_by_path[item['path']]['sha256']
    plan['scan']['additional_patterns'] = additional['patterns']
    plan['scan']['additional_findings'] = additional['findings']
    plan['archives'] = archive_report['archives']
    plan['summary']['archive_policy'] = 'Existing byte-identical archives retained; new duplicate source/assets archives excluded after entry SHA-256 comparison; generated dist entries excluded.'
    plan['summary']['excluded_by_reason'] = dict(Counter(r['reason'] for r in plan['excluded']))
    plan['summary']['scope'] = 'Files added or changed since the 2026-10-12 backup, plus complete LUNA, Paperlogy clone, TITAN source and local font groups; previous backup-only files retained.'
    write(EVIDENCE / 'approved-plan.json', plan)
    print(json.dumps({'ready': True, 'changed_files': len(plan['records']), 'bytes': plan['summary']['bytes_to_collect'], 'credential_findings': 0, 'archives_reviewed': len(plan['archives'])}))


def verify_source_state(plan, full_hash=False):
    checked, changed = 0, []
    for rec in plan['records'] + plan['unchanged']:
        p = Path(rec['source_path'])
        stat = p.stat()
        if full_hash or (stat.st_size, stat.st_mtime_ns) != (rec['bytes'], rec['mtime_ns']):
            if digest(p)['sha256'] != rec['sha256']:
                changed.append(rec['source_path'])
        checked += 1
    assert not changed, {'source_files_changed_since_capture': changed}
    git_states = [capture_git(Path(r['path'])) for r in plan['source_git_state']]
    assert git_states == plan['source_git_state'], 'Original repository state changed since capture'
    return {'source_files_verified': checked, 'verification': 'SHA-256 for all files' if full_hash else 'Captured SHA-256 plus unchanged size/mtime; changed stat requires SHA-256', 'original_repositories_verified': len(git_states), 'source_git_state_unchanged': True, 'source_files_unchanged': True, 'source_mutations_performed': False, 'deployment_performed': False}


def stage():
    baseline()
    assert not SNAP.exists(), 'Snapshot destination collision'
    plan = read(EVIDENCE / 'approved-plan.json')
    verify_source_state(plan)
    staged_paths = set()
    for index, rec in enumerate(plan['records']):
        source = Path(rec['source_path'])
        destination = REPO / rec['path']
        assert destination.resolve().is_relative_to(REPO.resolve()) and not destination.is_symlink()
        assert digest(source)['sha256'] == rec['sha256'], rec['path']
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
        assert digest(destination)['sha256'] == rec['sha256'], rec['path']
        staged_paths.add(rec['path'])
        if index and index % 500 == 0:
            print(json.dumps({'copied': index, 'total': len(plan['records'])}), flush=True)
    SNAP.mkdir(parents=True, exist_ok=False)
    original_readme = ROOT / 'README.md'
    navigation_copy = SNAP / 'source-navigation/README.md'
    navigation_copy.parent.mkdir()
    shutil.copyfile(original_readme, navigation_copy)
    summary = {**plan['summary'], 'snapshot_created_at_utc': now(), 'source_git_repositories': len(plan['source_git_state']), 'backup_status': 'Prepared and technically verified before commit; final GitHub receipt is stored outside this snapshot.'}
    write(SNAP / 'source-files.json', {'captured_at_utc': plan['summary']['captured_at_utc'], 'baseline_commit': BASE, 'files': plan['records'], 'unchanged_files': plan['unchanged'], 'navigation_derivation': {'path': 'README.md', 'original_source_path': original_readme.as_posix(), 'original_sha256': digest(original_readme)['sha256'], 'preserved_original_path': navigation_copy.relative_to(REPO).as_posix(), 'change': 'Backup-only introduction added; original working README untouched'}})
    write(SNAP / 'summary.json', summary)
    write(SNAP / 'excluded.json', {'entries': plan['excluded'], 'notes': 'No excluded original was removed or changed. Existing backup-only files remain available. This is a scoped update after the 2026-10-12 baseline.'})
    write(SNAP / 'content-scan.json', plan['scan'])
    write(SNAP / 'archive-assessment.json', {'archives': plan['archives']})
    write(SNAP / 'source-git-state.json', {'repositories': plan['source_git_state'], 'note': 'Read-only state capture; no commits, resets, cleans, pulls or configuration changes were made in these source repositories.'})
    (SNAP / 'evidence').mkdir()
    shutil.copyfile(Path(__file__), SNAP / 'evidence/backup.py')
    backup_readme = '''# 2026-10-26 프로젝트 추가 백업

기준 커밋은 `77b0cc029b253993e29fa212e4930489bc7fd35d`(2026-10-12)입니다. 이 기록은 원본 작업 폴더를 읽어 별도 백업 체크아웃에 수집한 자료이며, 원본 코드·Git 상태·서버·공개 배포를 변경하지 않았습니다.

## 포함 범위

- LUNA의 로컬 소스, 공개용 소스 사본, 원본·웹용 미디어, 로고, 네 가지 화면 검수와 기존 배포 기록.
- TITAN Paperlogy 복제본의 전체 소스·폰트·자산·라이선스, 12개 화면 폭 비교와 모바일 FAQ 검수 자료.
- TITAN 원본의 현재 소스와 폰트 준비, 인계 자료, 영상 제작 문서의 후속 변경.
- BIT365/Figma 작업 문서·이미지·내보내기, 사이드바·헤더·테마 이미지의 프롬프트·결과·검수 기록, 공용 폰트 자료.
- 이전 백업의 파일은 삭제하지 않습니다. 같은 경로의 최신 내용은 이전 버전을 Git 이력에 보존하며 갱신합니다.

## 검증 자료

- `source-files.json`: 파일별 원본 경로, 보관 경로, 바이트 수, SHA-256, Git blob SHA-1 및 변경 여부.
- `summary.json`: 수집 범위와 그룹별 파일 수·용량.
- `source-git-state.json`: 원본 저장소들의 HEAD·브랜치·작업 상태와 Git 메타데이터 해시.
- `content-scan.json`: 파일명 제외와 자격증명 패턴 검사 결과.
- `excluded.json`: 수집 제외 목록과 이유. 기존 기준일보다 오래된 미백업 파일은 이번 요청 범위에 자동 추가하지 않습니다.
- `archive-assessment.json`: ZIP/TAR 내부 파일과 별도 수집본의 SHA-256 대조. TITAN 인계 ZIP의 모든 파일 내용이 별도로 포함됩니다. LUNA 배포 묶음의 소스·자산도 포함되며, 고유한 `dist` 빌드 산출물만 기존 정책에 따라 제외합니다.

`node_modules`, Git 메타데이터, 캐시·빌드 결과, 로컬 인증 설정, 원시 도구 로그, 중복 배포 압축은 업로드하지 않습니다. 원본은 로컬에 유지합니다. 백업 포함은 사용자 디자인 승인이나 새 배포를 의미하지 않습니다. Paperlogy의 중간 화면 비교 기록은 해당 시점 자료이며 최종 FAQ 결과는 `faq-final.json`과 복제본의 `README.PAPERLOGY.ko.md`를 따릅니다.
'''
    (SNAP / 'README.ko.md').write_text(backup_readme, encoding='utf-8')
    intro = ('## 최신 프로젝트 백업 — 2026-10-26\n\n'
             '2026-10-12 이후의 작업을 수집했습니다. LUNA, TITAN Paperlogy 복제본, Figma·BIT365 내보내기와 생성 이미지, TITAN 인계·폰트·제작 문서를 포함합니다. 원본 작업과 기존 배포는 유지했습니다.\n\n'
             f'[백업 범위와 검증 기록]({SNAPREL}/README.ko.md) · [파일별 수집 명세]({SNAPREL}/source-files.json) · [제외 목록]({SNAPREL}/excluded.json)\n\n'
             '아래 내용은 기존 백업 이력입니다. 이 안내는 GitHub 백업 사본에만 추가했으며 로컬 작업 README는 수정하지 않았습니다.\n\n---\n\n')
    (REPO / 'README.md').write_bytes(intro.encode('utf-8') + original_readme.read_bytes())
    staged_paths.add('README.md')
    for p in SNAP.rglob('*'):
        if p.is_file():
            staged_paths.add(p.relative_to(REPO).as_posix())
    expected = {p: digest(REPO / p) for p in sorted(staged_paths)}
    for rel in expected:
        p = REPO / rel
        if p.suffix.lower() in TEXT_EXT or p.name.startswith('.'):
            for label, pattern in PATTERNS.items():
                assert not re.search(pattern, p.read_bytes()), {'path': rel, 'pattern': label}
    write(EVIDENCE / 'staged-plan.json', {'paths': expected, 'summary': summary})
    pathspec = EVIDENCE / 'staging-paths.bin'
    pathspec.write_bytes(b'\0'.join(p.encode('utf-8') for p in sorted(staged_paths)) + b'\0')
    git(REPO, '--literal-pathspecs', 'add', '-f', '--pathspec-from-file=' + str(pathspec), '--pathspec-file-nul')
    print(json.dumps({'staged_files': len(expected), 'original_files_collected': len(plan['records']), 'bytes_copied': summary['bytes_to_collect']}), flush=True)


def verify(mode):
    plan = read(EVIDENCE / 'approved-plan.json')
    staged = read(EVIDENCE / 'staged-plan.json')
    base = tree(BASE)
    if mode == 'staged':
        current = {}
        for row in git(REPO, 'ls-files', '-s', '-z').split(b'\0'):
            if row:
                info, path = row.split(b'\t', 1)
                file_mode, sha, stage_no = info.decode().split()
                assert stage_no == '0'
                current[path.decode()] = {'sha': sha, 'mode': file_mode, 'type': 'blob'}
        commit = None
    else:
        commit = git(REPO, 'rev-parse', 'HEAD').decode().strip()
        assert git(REPO, 'rev-parse', 'HEAD^').decode().strip() == BASE
        assert not git(REPO, 'status', '--porcelain').strip(), 'Backup checkout is not clean'
        current = tree('HEAD')
    for path, info in staged['paths'].items():
        assert current[path]['sha'] == info['git_blob_sha1'], path
        assert digest(REPO / path)['sha256'] == info['sha256'], path
    assert set(base) <= set(current), 'Previous backup paths were removed'
    changed = {p for p in current if current[p] != base.get(p)}
    assert changed == set(staged['paths']), {'unexpected': sorted(changed - set(staged['paths'])), 'not_changed': sorted(set(staged['paths']) - changed)}
    for p in set(base) - changed:
        assert current[p] == base[p], p
    preserved = verify_source_state(plan, full_hash=mode == 'staged')
    result = {'verified_at_utc': now(), 'mode': mode, 'commit': commit, 'baseline_commit': BASE, 'changed_files': len(changed), 'added_files': len(set(current) - set(base)), 'updated_files': len(changed & set(base)), 'previous_entries_unchanged': len(set(base) - changed), 'remote_entries': len(current), 'no_deletions': True, 'all_expected_blobs_match': True, 'preservation': preserved}
    if mode == 'remote':
        assert git(REPO, 'ls-remote', 'origin', 'refs/heads/main').decode().split()[0] == commit
        ref = json.loads(subprocess.check_output([GH, 'api', 'repos/Kexxrix/Site-Skin-edit/git/ref/heads/main']))
        assert ref['object']['sha'] == commit
        remote = json.loads(subprocess.check_output([GH, 'api', 'repos/Kexxrix/Site-Skin-edit/git/trees/' + commit + '?recursive=1']))
        assert not remote.get('truncated'), 'GitHub tree was truncated'
        remote_tree = {i['path']: {'sha': i['sha'], 'mode': i['mode'], 'type': i['type']} for i in remote['tree'] if i['type'] != 'tree'}
        assert remote_tree == current, 'Remote tree differs from committed backup'
        result.update({'remote_verified': True, 'github_complete_tree_verified': True, 'backup_checkout_clean': True, 'commit_url': 'https://github.com/Kexxrix/Site-Skin-edit/commit/' + commit})
    write(EVIDENCE / ('github-' + mode + '-verification.json'), result)
    print(json.dumps(result, ensure_ascii=False, indent=2), flush=True)


if __name__ == '__main__':
    action = sys.argv[1]
    if action in {'staged', 'committed', 'remote'}:
        verify(action)
    else:
        {'inventory': inventory, 'assess': assess, 'prepare': prepare, 'stage': stage}[action]()
