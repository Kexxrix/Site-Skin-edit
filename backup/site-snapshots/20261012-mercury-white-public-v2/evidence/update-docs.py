from pathlib import Path
import hashlib, json

ROOT = Path('E:/codexwork/Site-Skin-edit')
EVIDENCE = Path(__file__).parent
PROJECT = 'demo-sites/mercury-white-20261007/'
PUB = json.loads((EVIDENCE/'publication.json').read_text(encoding='utf-8'))
assert PUB['status'] == 'succeeded' and PUB['version'] == 2
SHA = PUB['source_commit']
SNAP = 'backup/site-snapshots/20261012-mercury-white-public-v2/'
RECORDS = []

def edit(rel, transform):
    p = ROOT/rel
    original = p.read_bytes()
    assert original == (EVIDENCE/'docs-before'/rel).read_bytes(), rel
    text = original.decode('utf-8')
    newline = '\r\n' if '\r\n' in text else '\n'
    result = transform(text, newline).encode('utf-8')
    assert result != original
    p.write_bytes(result)
    RECORDS.append({'path':rel, 'before_sha256':hashlib.sha256(original).hexdigest(), 'after_sha256':hashlib.sha256(result).hexdigest()})

def prepend(prefix):
    return lambda text, nl: prefix.replace('\n', nl) + text

release = f'''# MERCURY White — PUBLIC v2

2026-10-12 12:29:18 KST에 최신 로컬 입체감·헤더·배너 수정본을 기존 공개 사이트에 배포했다. 사용자의 공개 배포 및 GitHub 업데이트 지시에 따라 기존 public 접근을 유지했다.

- 공개 주소: https://mercury-white.kexxadrix.chatgpt.site/
- 사이트 ID: `{PUB['project_id']}`
- 저장 버전: v2 / `{PUB['version_id']}`
- 배포 ID: `{PUB['deployment_id']}`, 상태 `succeeded`, 접근 `public`.
- 배포 소스: `publish/site/`, 커밋 `{SHA}`.
- 반영 범위: 버튼·카드 입체감, 밝은 크림 리그 헤더와 좌우 9px 패딩, 골드 경기 제목과 42px 카드 상단, 오른쪽 배너 배경 및 크림색 설명 복원.
- 이번 배포에서는 로컬 원본 345개 파일을 그대로 유지하고, 배포 사본의 `app/mercury-white.css`와 `theme/mercury-white-button-polish.json` 두 파일만 최신 원본과 동기화했다. 호스팅 설정·의존성·자산·동작은 변경하지 않았다.

## v2 검증 및 GitHub 보관

- 배포 사본의 `npm run build`와 `tsc --noEmit --incremental false` 통과. Sites v2 저장과 배포 성공을 확인했다.
- 실제 공개 HTTPS 화면 1927×932에서 헤더 색상·9px 패딩·버튼 입체감·42px 카드 띠와 양쪽 배너를 확인했다. 이미지 126개 정상, Figma 아이콘 41곳, 새로 수집된 콘솔 오류·경고 0개다.
- 공개 페이지에 CSS·동작·저장소 오버라이드를 넣지 않았다. 외부 Typekit은 기존 제한에 따라 검수 탭에서 요청 전 제외했으며 캡처 후 임시 차단 설정을 해제했다. 외부 폰트 제공과 모바일 재검수는 이번 검증에 포함하지 않는다. 과거 실패한 터미널 무인증 요청은 반복하지 않았다.
- 기존 큰 청크·vinext 경로 분류 경고는 유지된다. 현재 로컬 5418 개발 서버를 재시작하지 않았고 사용자 로컬 탭의 선택 상태도 유지했다.
- 통합 GitHub 수집 기준: `{SNAP}source-files.json`. 소스·자산·입력·운영 문서·적격 QA 및 배포 증거를 기존 저장소에 업데이트한다. 다른 사이트와 이전 스냅샷은 보존한다.
- 공개 화면·빌드·타입·원격 검증 근거: `E:/codexwork/Site-Skin-edit-backups/20261012-mercury-white-deploy/`. 최종 GitHub 결과는 커밋·push 후 생성하는 `github-remote-verification.json`을 따른다. 배포 소스 SHA와 통합 GitHub SHA는 구분한다.

---

'''
edit(PROJECT+'RELEASE.ko.md', prepend(release))

state = f'''# MERCURY White — PUBLIC v2 배포 / 2026-10-12

- [공개 사이트](https://mercury-white.kexxadrix.chatgpt.site/)에 최신 로컬 수정본을 PUBLIC v2로 배포했다. 배포 `succeeded`, 기존 public 접근 유지, 완료 2026-10-12 12:29:18 KST.
- 버튼 입체감, 크림 리그 헤더·9px 패딩, 골드 경기 제목·카드 상단, 오른쪽 배너 배경·설명을 반영했다. 별도 배포 사본 `publish/site/`의 소스 커밋은 `{SHA}`다.
- 배포 사본에서 CSS와 파생 기록 두 파일만 갱신했으며 로컬 원본 345개 파일·기본 HEAD·브랜치·remote 없음 상태는 유지했다. 로컬 5418 서버와 사용자 선택도 변경하지 않았다.
- 빌드·타입 검사 통과. 실제 공개 1927×932 화면에서 최신 헤더·버튼·양쪽 배너, 정상 이미지 126개와 Figma 아이콘 41곳을 확인했다. 새 콘솔 오류·경고 0개다. 외부 Typekit 제공과 새 모바일 QA는 검증하지 않았으며 기존 빌드 경고는 남아 있다.
- [배포 기록](RELEASE.ko.md), 통합 GitHub 수집 기준 `{SNAP}`, 최종 증거 `E:/codexwork/Site-Skin-edit-backups/20261012-mercury-white-deploy/`를 따른다. 아래 로컬만 수정·미배포 표현과 PUBLIC v1은 당시 이력이다.

---

'''
edit(PROJECT+'STATE.md', prepend(state))

agent_entry = f'''## Current authorized publication — 2026-10-12

- The user explicitly requested public deployment and a GitHub update after the latest local header refinement. This supersedes the historical local-only/no-publish records below.
- PUBLIC v2 succeeded at the existing public URL https://mercury-white.kexxadrix.chatgpt.site/ ; source commit `{SHA}` in `publish/site/`. Preserve the existing site identity and audience. See `RELEASE.ko.md`.
- Keep all 345 frozen local source files, b425 HEAD/branch/no-remotes state and the existing local 5418 server/user selection unchanged. The release checkout received only the two current CSS/treatment-record files. Do not treat older PIDs as current.
- Build and typecheck pass; actual public 1927x932 render confirms refined headers, button depth, both banner groups, 126 loaded images and 41 Figma icons, with no new captured console errors/warnings. External Typekit was excluded for QA, then the temporary request block was removed. Do not retry previously restricted requests.
- Integrated GitHub update is authorized for MERCURY White and its navigation/evidence only. Snapshot `{SNAP}`; external final proof `E:/codexwork/Site-Skin-edit-backups/20261012-mercury-white-deploy/`. Preserve other sites and previous snapshots.

'''
def add_agent(text,nl):
    title,rest=text.split(nl,nl.count('\n'))
    return title+nl+nl+agent_entry.replace('\n',nl)+rest.lstrip('\r\n')
edit(PROJECT+'AGENTS.md', add_agent)

def index(text,nl):
    end=text.index('## 최초 등록한 화면 기준')
    old_prefix=text[:end]
    current=f'''# MERCURY White — PUBLIC v2

로컬 등록일: 2026-10-07. 최신 공개 배포일: 2026-10-12. 사용자의 후속 지시에 따라 현재 입체감·헤더·배너 수정본을 **MERCURY White PUBLIC v2**로 배포했다. [공개 화면](https://mercury-white.kexxadrix.chatgpt.site/)과 [배포 기록](RELEASE.ko.md)을 따른다.

최신 상태: 버튼·카드 입체감, 크림 리그 헤더와 좌우 9px 패딩, 골드 경기 제목·카드 상단, 오른쪽 배너 배경과 설명을 반영했다. 빌드·타입·실제 공개 브라우저 검수를 통과했다. [최신 STATE](STATE.md)를 따른다. 로컬 원본 파일과 [5418 미리보기](http://127.0.0.1:5418/)는 유지한다.

공개 기준: 배포 사본 `publish/site/`의 소스 SHA `{SHA}`, PUBLIC v2 `succeeded`. 통합 GitHub 수집 기준은 `{SNAP}`이다. 원본 앱 HEAD는 후속 미커밋 변경을 포함한 기본 커밋이며, 배포 소스 SHA와 통합 GitHub SHA는 별개다. 아래 최초 등록 검증은 당시 기록이다.

| 항목 | 현재 기준 |
| --- | --- |
| 관리명 | MERCURY White / 머큐리 화이트 |
| 로컬 화면 | http://127.0.0.1:5418/ |
| 브라우저 제목 | MERCURY · 화이트 |
| 앱 경로 | `E:/codexwork/Site-Skin-edit/demo-sites/mercury-white-20261007/site` |
| 앱 기본 커밋 | `b425507730a4f39dd393645ef4273653a7c13176` + 후속 작업 파일 |
| 앱 브랜치 | `mercury-white-20261007` |
| 공개 상태 | PUBLIC v2 · https://mercury-white.kexxadrix.chatgpt.site/ |
| 배포 사본 | `publish/site/` · `{SHA}` |
| GitHub 보관 | 기존 `Kexxrix/Site-Skin-edit`, `demo-sites/mercury-white-20261007/` |

'''
    return current.replace('\n',nl)+text[end:]
edit(PROJECT+'INDEX.ko.md',index)

def section(body):
    def transform(text,nl):
        start=text.index('## MERCURY White 공개')
        end=text.index(nl+'## ',start)
        return text[:start]+body.replace('\n',nl).rstrip('\r\n')+nl+text[end:]
    return transform

edit('README.md',section(f'''## MERCURY White 공개 — 2026-10-12

[MERCURY White PUBLIC v2](https://mercury-white.kexxadrix.chatgpt.site/) / [배포 기록](demo-sites/mercury-white-20261007/RELEASE.ko.md) / [로컬 화면](http://127.0.0.1:5418/) / [현재 운영 상태](demo-sites/mercury-white-20261007/STATE.md).

최신 버튼 입체감·크림 리그 헤더·골드 경기 제목 및 카드 상단·배너 복원을 공개 사이트에 반영했다. PUBLIC v2, 배포 `succeeded`, 배포 소스 `{SHA}`. 원본 로컬 작업과 다른 사이트는 유지하며 [최신 GitHub 수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/main/{SNAP}source-files.json)에 소스·자산·입력·검수·배포 기록을 보관한다.
'''))

edit('demo-sites/README.ko.md',section(f'''## MERCURY White 공개 — 2026-10-12

[MERCURY White PUBLIC v2](https://mercury-white.kexxadrix.chatgpt.site/)에 최신 입체감·헤더·배너 수정본을 배포했다. 배포 상태 `succeeded`, 기존 public 접근 정책 유지. [배포 기록](mercury-white-20261007/RELEASE.ko.md), [최신 STATE](mercury-white-20261007/STATE.md), 배포 사본 `mercury-white-20261007/publish/site/`, 배포 소스 `{SHA}`를 기준으로 한다.

로컬 원본 345개와 현재 5418 서버 및 다른 사이트는 유지했다. 빌드·타입 검사와 실제 공개 브라우저 1927×932 화면을 확인했고 이미지 126개 정상, Figma 아이콘 41곳, 새 콘솔 오류·경고 0개다. 외부 Typekit 제공·새 모바일 QA는 검증 범위에서 제외했다. 최신 통합 GitHub 보관 명세는 `{SNAP}`이다.
'''))

def home(text,nl):
    old='MERCURY White · PUBLIC v1 · 로컬 5418'
    old2='MERCURY White 최신 상태 · 2026-10-08 공개 완료'
    assert text.count(old)==1 and text.count(old2)==1
    return text.replace(old,'MERCURY White · PUBLIC v2 · 로컬 5418').replace(old2,'MERCURY White 최신 상태 · 2026-10-12 공개 완료')
edit('00_프로젝트 홈.md',home)
(EVIDENCE/'docs-verification.json').write_text(json.dumps(RECORDS,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'updated_files':len(RECORDS),'paths':[r['path'] for r in RECORDS]},ensure_ascii=False))
