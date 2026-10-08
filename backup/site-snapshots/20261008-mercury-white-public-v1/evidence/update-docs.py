from pathlib import Path
import json, shutil

ROOT = Path('E:/codexwork/Site-Skin-edit')
PROJECT = ROOT/'demo-sites/mercury-white-20261007'
E = Path(__file__).parent
targets = ['README.md','00_프로젝트 홈.md','demo-sites/README.ko.md','demo-sites/mercury-white-20261007/STATE.md','demo-sites/mercury-white-20261007/INDEX.ko.md','demo-sites/mercury-white-20261007/AGENTS.md']
for rel in targets:
    dest = E/'docs-before'/rel
    assert not dest.exists(), dest
    dest.parent.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(ROOT/rel,dest)

def edit(path, old, new):
    text = path.read_text(encoding='utf-8')
    assert text.count(old) == 1, (path,old)
    path.write_text(text.replace(old,new),encoding='utf-8',newline='')

release = '''# MERCURY White — PUBLIC v1

2026-10-08 17:25:23 KST에 사용자 승인 상태를 별도 공개 사이트로 배포했다. 링크가 있으면 누구나 볼 수 있도록 공개하라는 후속 지시를 반영했다.

- 공개 주소: https://mercury-white.kexxadrix.chatgpt.site/
- 사이트 ID: `appgprj_6ac7523068808191aa0f1014883e0752`
- 저장 버전: v1 / `appgprj_6ac7523068808191aa0f1014883e0752~appgver_e991ccf82a608191afecc2b820724434`
- 배포 ID: `appgdep_6ac75355ae408191bd56f83e2dca519a`, 상태 `succeeded`, 접근 `public`.
- 배포 소스: `publish/site/`, 커밋 `694efe89b8f230030c21f554d674ab71617a60bc`.
- 로컬 작업 원본: `site/`, 기본 커밋 `b425507730a4f39dd393645ef4273653a7c13176`와 승인된 후속 미커밋 변경. 5418/PID41768 및 편집기 5417/PID35992를 유지했다.

배포에는 차콜 배지, Figma 아이콘, 활성 메뉴의 짙은 브론즈 글자, 최신 인기 게임 아이콘 및 종목 선택/해제 아이콘 색상까지 포함한다. 디자인·동작·이미지·승인 입력 팔레트는 새로 수정하지 않았다. 동결한 로컬 소스 345개가 그대로이며, 별도 배포 사본에서만 기존 의존성을 사용하는 Vite 호스팅 설정과 `.gitignore`를 조정하고 `.openai/hosting.json`을 추가했다.

## 검증

- 배포 사본에서 `npm run build`, `tsc --noEmit --incremental false` 통과.
- Sites 저장 v1, 배포 `succeeded`, 접근 `public`을 커넥터에서 확인.
- 터미널의 인증 없는 HTTP 요청은 403을 반환하여 이 경로의 공개 응답·배포 자산 해시 검증은 완료하지 못했다. 접근 정책 public과 실제 공개 URL의 브라우저 렌더를 확인한 사실과 구분한다. 403 요청은 재시도하거나 우회하지 않았다.
- 실제 공개 HTTPS 화면을 1927×932 기준으로 확인. Figma 아이콘 41곳, 메뉴 글자 `#6b481b`, 전체→축구→전체 선택 상태 복원 확인. 이미지 126개, 로딩 미완료 0개, 깨진 이미지 0개, 수집된 브라우저 오류·경고 0개. 기본 전체 종목/토론토 경기 화면으로 복원했다.
- 공개 화면에는 CSS·동작·저장소 오버라이드를 넣지 않았다. 임시 프록시 시작은 자동 승인에서 거절되어 재시도하지 않았고, 이미 열린 실제 공개 페이지를 검사했다. 외부 폰트 요청을 수동 재시도하지 않았다.
- 빌드의 기존 500 kB 청크 경고와 vinext 경로 분류 한계는 남아 있다. 공개 페이지에서 오류 화면은 관찰되지 않았다. 외부 폰트 제공·새 모바일 QA·전체 린트 통과를 이번 검증으로 주장하지 않는다.

## GitHub 보관

통합 저장소: https://github.com/Kexxrix/Site-Skin-edit

최신 수집 명세는 `backup/site-snapshots/20261008-mercury-white-public-v1/source-files.json`이다. 로컬 작업 원본·배포 사본·입력·문서·적격 QA 및 공개 검증 기록을 보관하며, 의존성·빌드·캐시·퇴역 실행 사본·비밀값·중복 압축 파일은 제외한다. 원본 소스 저장소의 브랜치·HEAD·remote 없음 상태는 유지하고 기존 통합 백업 checkout에서만 커밋·push한다. 이전 스냅샷과 다른 사이트의 파일은 삭제하지 않는다.

배포·검수 및 커밋 후 원격 검증 기록은 `E:/codexwork/Site-Skin-edit-backups/20261008-mercury-white-deploy/`에 둔다. `github-remote-verification.json`은 실제 완료 후 생성되는 최종 원격 결과다. 배포 소스 SHA와 통합 GitHub 백업 SHA는 서로 다르다.
'''
assert not (PROJECT/'RELEASE.ko.md').exists()
(PROJECT/'RELEASE.ko.md').write_text(release,encoding='utf-8')

state = '''# MERCURY White — PUBLIC v1 배포 / 2026-10-08

- 현재 공개 주소: https://mercury-white.kexxadrix.chatgpt.site/ . 링크가 있으면 누구나 볼 수 있는 PUBLIC v1이며 배포 상태는 `succeeded`다.
- 현재 승인된 아이콘 선택 색상까지 포함하여 배포했다. 배포 전 동결한 로컬 소스 345개는 그대로이며 기존 5418/PID41768, 5417/PID35992를 유지했다.
- 별도 배포 사본은 `publish/site/`, 소스 커밋 `694efe89b8f230030c21f554d674ab71617a60bc`다. 이 사본에만 호스팅 어댑터 설정·ignore·Sites 연결 파일을 추가했다.
- 빌드·타입 검사 통과. 실제 공개 화면에서 이미지 126개 정상, Figma 아이콘 41곳 및 전체/축구 아이콘 선택 상태를 확인했다. Sites public 설정과 실제 공개 브라우저 표시를 확인했다. 터미널 무인증 요청은 403으로 제한되어 별도 기록했다.
- 최신 인계는 [RELEASE.ko.md](RELEASE.ko.md), 통합 GitHub 수집 기준은 `backup/site-snapshots/20261008-mercury-white-public-v1/`이다. 아래의 미배포·등록만 수행했다는 표현은 당시 이력이며 이번 배포 지시로 대체됐다.

---

'''
p=PROJECT/'STATE.md'; p.write_text(state+p.read_text(encoding='utf-8'),encoding='utf-8')
p=PROJECT/'AGENTS.md'
scope='''## Current approved publication — 2026-10-08

- The user requested publishing the current MERCURY White skin and updating GitHub, then explicitly selected public access for anyone with the link. This supersedes the older no-deployment instructions below.
- PUBLIC v1: https://mercury-white.kexxadrix.chatgpt.site/ ; project `appgprj_6ac7523068808191aa0f1014883e0752`; deployment succeeded. Release checkout `publish/site/`, source commit `694efe89b8f230030c21f554d674ab71617a60bc`. See `RELEASE.ko.md`.
- Preserve approved local `site/` bytes, its b425 HEAD/branch/no-remotes state, and 5418/PID41768 plus editor 5417/PID35992. Hosting-only changes belong to the separate release checkout. Integrated GitHub backup commit/push is authorized; do not alter other sites.
- Latest public UI/HTTP/build evidence and final remote verification: `E:/codexwork/Site-Skin-edit-backups/20261008-mercury-white-deploy/`. Snapshot `backup/site-snapshots/20261008-mercury-white-public-v1/`. Earlier local-only records remain historical.

'''
edit(p,'# MERCURY White — local implementation\n\n','# MERCURY White — local implementation and public release\n\n'+scope)
p=PROJECT/'INDEX.ko.md'
edit(p,'# MERCURY White — 정식 로컬 등록','# MERCURY White — PUBLIC v1')
edit(p,'등록일: 2026-10-07. 사용자가 현재 로컬 구현을 **MERCURY White**로 등록하고 최신 상태를 GitHub에 보관하도록 요청했다. **Sites 등록과 공개 배포는 하지 않는다.**','로컬 등록일: 2026-10-07. 공개 배포일: 2026-10-08. 사용자의 후속 배포 지시에 따라 현재 승인 상태를 **MERCURY White PUBLIC v1**으로 공개했다. [공개 화면](https://mercury-white.kexxadrix.chatgpt.site/)과 [배포 기록](RELEASE.ko.md)을 따른다.')
old='최신 로컬 변경: 2026-10-08 종목 탭의 선택 아이콘은 어둡게, 선택 해제 시 원래 금색으로 복원되도록 적용했다. 전체 탭도 동일한 상태 전환을 따른다. 앞선 메뉴 가독성·최신 인기 게임 아이콘 수정은 유지한다. 5418은 PID41768이며 앱 변경은 미커밋 상태다. GitHub `11f6f9d`는 배지·Figma·이후 변경 전 백업이다. [최신 STATE](STATE.md)와 [이번 검수](qa/sport-icon-state-20261008/browser-verification.json)를 우선한다. 아래 수집·검증 항목은 등록 당시 기록이다.'
new='최신 상태: 2026-10-08 종목 선택 아이콘 색상과 앞선 메뉴 가독성·최신 인기 게임 아이콘 수정까지 배포했다. 로컬 5418/PID41768과 원본 미커밋 변경은 유지한다. 배포 사본 `publish/site/`의 소스 SHA는 `694efe89b8f230030c21f554d674ab71617a60bc`이며 통합 GitHub 수집 기준은 `backup/site-snapshots/20261008-mercury-white-public-v1/`이다. [최신 STATE](STATE.md)와 [RELEASE](RELEASE.ko.md)를 우선한다. 아래 최초 등록 검증은 당시 기록이다.'
edit(p,old,new)
edit(p,'| 공개 상태 | 미등록·미배포, 새 Sites 프로젝트 ID와 공개 URL 없음 |','| 공개 상태 | PUBLIC v1 · https://mercury-white.kexxadrix.chatgpt.site/ |\n| 배포 사본 | `publish/site/` · `694efe89b8f230030c21f554d674ab71617a60bc` |')
edit(p,'## 등록한 화면 기준','## 최초 등록한 화면 기준 — 2026-10-07 이력')
edit(p,'## 검증과 기록','## 최초 등록 검증과 기록 — 2026-10-07 이력')

p=ROOT/'README.md'
edit(p,'## MERCURY White 로컬 등록 — 2026-10-07','## MERCURY White 공개 — 2026-10-08')
edit(p,'[머큐리 화이트 인덱스](demo-sites/mercury-white-20261007/INDEX.ko.md) / [로컬 화면](http://127.0.0.1:5418/) / [현재 운영 상태](demo-sites/mercury-white-20261007/STATE.md).','[MERCURY White PUBLIC v1](https://mercury-white.kexxadrix.chatgpt.site/) / [배포 기록](demo-sites/mercury-white-20261007/RELEASE.ko.md) / [로컬 화면](http://127.0.0.1:5418/) / [현재 운영 상태](demo-sites/mercury-white-20261007/STATE.md).')
edit(p,'최신 앱 소스는 `b425507730a4f39dd393645ef4273653a7c13176`이며 기존 통합 GitHub에 소스·자산·입력·검수 기록을 보관한다. [수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/main/backup/site-snapshots/20261007-mercury-white-local/source-files.json)를 따른다. **이번 등록은 로컬·GitHub 대상이며 Sites 등록과 공개 배포는 하지 않는다.** 기존 공개 사이트와 다른 작업은 유지한다.','승인된 최신 화이트 스킨을 링크 공개 방식으로 배포했다. PUBLIC v1, 배포 `succeeded`, 배포 소스 `694efe89b8f230030c21f554d674ab71617a60bc`. 원본 로컬 작업과 기존 공개 사이트는 유지하며 [최신 GitHub 수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/main/backup/site-snapshots/20261008-mercury-white-public-v1/source-files.json)에 소스·자산·입력·검수·배포 기록을 보관한다.')
p=ROOT/'00_프로젝트 홈.md'
edit(p,'MERCURY White · 로컬 정식 등록 · 5418','MERCURY White · PUBLIC v1 · 로컬 5418')
edit(p,'MERCURY White 최신 상태 · b425507 · 공개 배포 보류','MERCURY White 최신 상태 · 2026-10-08 공개 완료')
p=ROOT/'demo-sites/README.ko.md'
t=p.read_text(encoding='utf-8'); start=t.index('## MERCURY White 정식 로컬 등록'); end=t.index('## ALDEBARAN 두 번째 스킨 공개')
t=t[:start]+'''## MERCURY White 공개 — 2026-10-08

[MERCURY White PUBLIC v1](https://mercury-white.kexxadrix.chatgpt.site/)을 별도 화이트 스킨으로 공개했다. 배포 상태 `succeeded`, 링크가 있으면 누구나 볼 수 있는 접근 정책이다. [배포 기록](mercury-white-20261007/RELEASE.ko.md), [최신 STATE](mercury-white-20261007/STATE.md), 배포 사본 `mercury-white-20261007/publish/site/`, 배포 소스 `694efe89b8f230030c21f554d674ab71617a60bc`를 기준으로 한다.

로컬 원본 345개 파일과 5418/PID41768, 편집기 5417/PID35992 및 기존 MERCURY 공개 사이트는 유지한다. 빌드·타입 검사·공개 설정·실제 공개 브라우저 화면을 확인했다. 터미널 무인증 HTTP 검사는 403 응답으로 제한됐다. 최신 통합 GitHub 보관 명세는 `backup/site-snapshots/20261008-mercury-white-public-v1/`이다.

'''+t[end:]
p.write_text(t,encoding='utf-8')
print(json.dumps({'updated':targets,'created':'demo-sites/mercury-white-20261007/RELEASE.ko.md'},ensure_ascii=False))
