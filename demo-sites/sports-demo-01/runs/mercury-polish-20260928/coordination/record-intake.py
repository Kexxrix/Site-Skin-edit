import hashlib, json, subprocess
from pathlib import Path
from datetime import datetime, timezone

base = Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01')
out = base / 'runs/mercury-polish-20260928/coordination'
package = base / 'input/mercury-polish-20260928/MERCURY_POLISH_20260928'
git_exe = 'C:/Program Files/Git/cmd/git.exe'
def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def git(root, *args):
    return subprocess.check_output([git_exe, '-c', 'safe.directory='+str(root), '-C', str(root), *args], text=True, encoding='utf-8').strip()
def snapshot(root):
    files = git(root, 'ls-files').splitlines()
    return {'root':str(root), 'head':git(root,'rev-parse','HEAD'), 'status':git(root,'status','--short'), 'trackedHashes':{f:sha(root/f) for f in files if (root/f).is_file()}}

prior = {}
for name in ['AGENTS.md','STATE.md','DESIGN_SPEC.md','DECISIONS.md']:
    path = base/name
    prior[name] = {'sha256':sha(path),'text':path.read_text(encoding='utf-8-sig')}
backup = out/'operating-documents-before.json'
if backup.exists():
    raise RuntimeError('Existing intake evidence; inspect before rerunning')
backup.write_text(json.dumps(prior,ensure_ascii=False,indent=2),encoding='utf-8')
manifest=json.loads((package/'reference-data/asset-manifest.json').read_text(encoding='utf-8-sig'))
assets=[]
for asset in manifest['assets']:
    actual=sha(package/asset['file'])
    if actual != asset['sha256']:
        raise RuntimeError('Asset mismatch: '+asset['file'])
    assets.append({'file':asset['file'],'sha256':actual,'matchesManifest':True,'alphaBounds':asset['alpha_bbox_xyxy']})
data={'at':datetime.now(timezone.utc).isoformat(),'inputZip':'D:/WebDL/MERCURY_POLISH_20260928.zip','zipSha256':sha('D:/WebDL/MERCURY_POLISH_20260928.zip'),'task':str(package/'01_CODEX_TASK.md'),'assets':assets,'mercury':snapshot(base/'site'),'aldebaran':snapshot(base.parent/'sports-demo-03/site'),'implementationThread':'01a0a97b-1268-7cf3-8aad-ba460ecf4f98'}
(out/'intake.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
common='''# 최신 작업 기준 — MERCURY POLISH / 2026-09-28

사용자가 `MERCURY_POLISH_20260928.zip`의 `01_CODEX_TASK.md` 실행을 지시했다. [최신 지시서](input/mercury-polish-20260928/MERCURY_POLISH_20260928/01_CODEX_TASK.md)가 이번 범위의 기준이다. 아래 이전 이력·관측·증거 경로는 보존하되, 과거 77경기·3마켓·기존 팔레트 고정 조건은 이번 범위에서 대체한다.

- MERCURY PUBLIC v10 / 현지 HEAD `af940990c2939a94ebdb89204c2e92ce881275c3`에서 이어 간다. 기존 미추적 `tsconfig.tsbuildinfo`를 보존한다.
- 구조·데이터·리그·마켓·동작·치수는 최신 ALDEBARAN을 따른다. 참조 시작 HEAD `6be8c176b374999501952d24520c8411b29b153f`, clean 상태. ALDEBARAN과 Figma는 읽기 전용이다.
- 색상·gradient는 Figma `cQpTC1jE82WL3h6zdXNx2Q / 243:4`를 따른다. Figma에 남은 77경기·고정3+·스코어·구종목은 콘텐츠 기준이 아니다.
- 현재 화면은 전체61 = 축구32+농구6+야구16+배구0+아이스하키7+포뮬라1/복싱/MMA/모터스포츠 각0이다. 실제 공급 데이터·검색·필터·집계를 함께 연결한다. 헤더 E스포츠 메뉴는 보존한다.
- 61경기, 종목별 확장마켓·필터·라인·안내·선택ID·실제 N+ 집계를 ALDEBARAN에서 읽어 이식한다. 숫자·배당을 임의 생성하거나 표본 값을 하드코딩하지 않는다.
- 제공 PNG 5개 원본 바이트·비율·알파를 보존하고 기존 골드 아이콘과 함께 매핑한다. MERCURY 로고·브랜드·사진·배너는 보존한다.
- 일반 경기 카드 중앙은 VS, 이전 스코어/7회초/종료 부가표시만 참조 일반 카드에 맞춘다. 원본 결과/과거 정산을 변조하지 않는다.
- 계정·머니·과거내역을 유지하며 맞지 않는 이전 슬립은 기존 사용 불가/제거 흐름으로 처리한다. 저장소 전체 초기화 금지.
- 기존 Sites 구현 담당 `01a0a97b-1268-7cf3-8aad-ba460ecf4f98`가 소스·자산·검증·배포를 단독 담당한다. 조정 담당은 운영문서4개·Figma 읽기근거·참조보존·결과 취합을 담당한다. 새 구현자/별도독립감사/WOG/이미지생성/재설치/새 테스트체계를 추가하지 않는다.
- 1920×1080 CSS viewport/100%/폰트로드 상태로 배색·버튼·아이콘·VS·종목·N+·필터·선택/해제/교체·슬립·금액·비활성·독립스크롤을 확인한다. 최종 베팅 확정은 실행하지 않는다.
- 타입검사/빌드 후 같은 MERCURY 공개 URL에 반영하고 공개 핵심변경을 재확인한다. 기록은 STATE와 `runs/mercury-polish-20260928/`의 JSON/스크린샷에 남긴다. 별도 운영 MD나 다음 사이클을 만들지 않는다.

'''
extra={
'AGENTS.md':'',
'STATE.md':'''## 현재 실행 상태

- 입력 ZIP SHA-256: `364bb93961baa8f90bad45eb9947c60678534b908d0b08aaae4c526467b3384e`.
- 입력 PNG 5개 SHA-256 모두 manifest와 일치. 이전 운영문서 전체 본문·해시는 `runs/mercury-polish-20260928/coordination/operating-documents-before.json`에 보존했다.
- 기존 Sites 담당에 지시서 전체 구현·검수·기존 공개주소 배포를 배정했다. 현재 구현 진행 중이며 아직 이번 변경의 완료/배포 성공으로 판단하지 않는다.
- 시작 상태와 ALDEBARAN 추적 파일 해시: `runs/mercury-polish-20260928/coordination/intake.json`.

''',
'DESIGN_SPEC.md':'''## 이번 색상과 재질

- 바탕 #050505, 헤더 #0B0B0B 단색, 보조/목록 #090909, 패널 #141414, 마켓헤더 #1C1C1C, 평면버튼 #292929, 경계 #3B3B3B.
- 강조 #FFCD55, 연골드 #FFE6A3, 배지 #FF9124, 미선택 배당 #81FFFF, 주요 글자 #FFFFFF, 밝은 면 글자 #171717. SPORTS/LIVE/LV/BET/NEW/N+/선택종목숫자 배지는 주황색 역할이다.
- 골드 버튼: `linear-gradient(180deg, #FFEDC0 0%, #FFCD55 50%, #AF800D 100%)`. 충전/환전/고객센터, 선택 마켓필터, MAX, 베팅하기에 적용한다.
- 회색 배당/금액 추가 버튼: `linear-gradient(0deg, #292929 0%, #585858 71.635%, #585858 100%)`. 일반 퀵메뉴/비선택 필터/계정 버튼은 평면이다.
- 선택 배당은 hover/focus/pressed에서도 골드면+어두운 팀명/배당을 유지하고, 해제 시 청록 배당을 복원한다. 비활성 베팅하기는 골드 형태와 검정 글자, 실제 disabled를 함께 유지한다. 잠긴 배당의 잠금 구분은 유지한다.
- 크기·간격·글자 크기/웨이트·정렬·스크롤은 현재 ALDEBARAN 대응 요소 기준. 원본 PNG 광학적 중앙은 wrapper/offset으로 조절하되 자르거나 늘이지 않는다.

''',
'DECISIONS.md':'''## 이번 확정 우선순위

1. 최신 사용자 지시와 이번 패키지 범위.
2. 구조·종목·61경기·리그·마켓·동작은 현재 ALDEBARAN.
3. 색상·gradient는 Figma 243:4와 확인된 값.
4. 나머지는 MERCURY 브랜드 자산과 정상 동작.

종전 77경기/3마켓/기존 팔레트 고정은 과거 완료 기록으로 보존하며 이번 구현에 강제하지 않는다. ALDEBARAN의 #FCD73E 및 주황색 내부 흰글자 규칙을 이번 MERCURY에 일괄 적용하지 않는다. 정지 Figma의 스코어·3+·구종목을 콘텐츠로 복제하지 않는다.

'''}
for name in prior:
    path=base/name
    old=path.read_bytes()
    prefix=(common+extra[name]+'---\n\n').encode('utf-8')
    path.write_bytes(prefix+old)
print(json.dumps({'assetsVerified':len(assets),'aldebaranFiles':len(data['aldebaran']['trackedHashes']),'documentsUpdated':list(prior)},ensure_ascii=False))
