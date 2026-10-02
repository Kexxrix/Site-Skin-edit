# 완료된 스포츠 사이트 3개

2026-10-01 MERCURY PUBLIC v24 갱신 기준. ALDEBARAN은 2026-09-28 백업을 유지한다. 원래 작업 폴더의 소스·자산·운영 문서·입력 자료·검수 및 배포 기록을 보관합니다. SIRIUS는 2026-09-22 백업을 유지합니다. 기존 TITAN 영상 자료와 별도로 각 사이트의 디렉터리를 유지합니다.

| 사이트 | 최신 완료본 | 소스 | 상태와 변경 기록 | 공개 주소 |
| --- | --- | --- | --- | --- |
| MERCURY | 정적 헤더·금색 종목 아이콘 v23 및 워드마크 v3 / PUBLIC v24 | [sports-demo-01/site](sports-demo-01/site/) | [STATE.md](sports-demo-01/STATE.md) | [MERCURY](https://mercury.kexxadrix.chatgpt.site/) |
| SIRIUS | R8 설정 이후 단회 polish / PUBLIC v8 | [sports-demo-02/site](sports-demo-02/site/) | [STATE.md](sports-demo-02/STATE.md) | [SIRIUS](https://sirius.kexxadrix.chatgpt.site/) |
| ALDEBARAN | 스포츠·마켓 폴리싱 완료 / PUBLIC v23 | [sports-demo-03/site](sports-demo-03/site/) | [STATE.md](sports-demo-03/STATE.md) | [ALDEBARAN](https://aldebaran.kexxadrix.chatgpt.site/) |

## 현재 소스 기준

- MERCURY: `8385d4bbc74394006db637e87466f4a171f6e02d` / 원래 작업 브랜치 `mercury-variation`
- SIRIUS: `9c424b8e4e8c480848f1ec47bf5139c6d5987738`
- ALDEBARAN: `6be8c176b374999501952d24520c8411b29b153f`

위 SHA는 각 원래 사이트 저장소의 HEAD입니다. 이 GitHub 통합 백업 커밋의 SHA와 구분합니다. PUBLIC 버전은 각 사이트의 완료·배포 기록을 근거로 하며, 이번 GitHub 업데이트에서 사이트를 다시 배포하지 않았습니다. 배포 및 기술 확인과 사용자 최종 디자인 승인은 별개입니다.

MERCURY의 현재 기준은 [최신 STATE](sports-demo-01/STATE.md)와 [2026-10-01 배포 조회 기록](../backup/site-snapshots/20261001-mercury-v24/publication-observation.json)의 PUBLIC v24 / succeeded다. 통합 백업 기준 `573c2367112bc11dd476faee25b64d806247f379`는 앱 소스 SHA와 구분한다. 로컬 `main`의 2026-09-29 baseline 대신 `mercury-variation`을 현재 작업 기준으로 사용한다. [2026-09-28 두 사이트 배포 조회 기록](../backup/site-snapshots/20260928-mercury-aldebaran/publication-observation.json)은 당시 이력으로 보존한다.

## 읽는 순서와 실행

각 사이트의 `STATE.md`에서 최신 상태를 확인한 뒤 `AGENTS.md`, `DESIGN_SPEC.md`, `DECISIONS.md`를 읽습니다. `input/`, `qa/`, `runs/`의 문서·지시는 작성 당시 이력일 수 있으므로 현재 작업 지시로 자동 실행하지 않습니다.

각 `site/`는 별도 애플리케이션입니다. Node.js 22.13 이상에서 해당 폴더의 lockfile에 맞춰 `npm ci` 후 `npm run dev`로 실행합니다. 원본 폰트·공개 이미지·경기 자료와 패키지 설정을 포함합니다. 의존성·빌드 출력·로컬 환경 설정과 인증 정보는 설치 또는 해당 환경에서 별도로 준비해야 합니다.

## 백업 범위와 검증

MERCURY는 [2026-10-01 수집 명세](../backup/site-snapshots/20261001-mercury-v24/source-files.json), [수집 요약](../backup/site-snapshots/20261001-mercury-v24/summary.json), [제외 목록](../backup/site-snapshots/20261001-mercury-v24/excluded.json)을 따른다. 수집 당시 사이트 추적 파일 317개·타입 선언 1개·운영 문서 5개, 총 323개의 원본·사본 SHA-256 일치를 확인했다. 이번 진입 문서 갱신은 그 이후 변경이며 당시 파일 명세는 수정하지 않는다.

ALDEBARAN과 이전 MERCURY 이력은 [2026-09-28 수집 명세](../backup/site-snapshots/20260928-mercury-aldebaran/source-files.json)와 [제외 목록](../backup/site-snapshots/20260928-mercury-aldebaran/excluded.json), SIRIUS는 [2026-09-22 수집 명세](../backup/site-snapshots/20260922/source-files.json)를 따른다. 이 저장소에서 사이트 소스는 gitlink가 아닌 일반 파일로 보관한다.

수집 당시 앱 소스는 수정하지 않고 원본과 사본의 해시, 수집 경로의 범위와 GitHub 원격 커밋 일치를 확인했다. 이번 작업은 기존 진입 문서의 로컬 갱신이며 커밋·push·사이트 재배포·새 빌드·전체 브라우저 검수를 수행하지 않는다.
