# 완료된 스포츠 사이트 3개

2026-09-22 기준. 원래 작업 폴더의 최신 소스·자산·운영 문서·입력 자료·검수 및 배포 기록을 보관합니다. 기존 TITAN 영상 자료와 별도로 각 사이트의 디렉터리를 유지합니다.

| 사이트 | 최신 완료본 | 소스 | 상태와 변경 기록 | 공개 주소 |
| --- | --- | --- | --- | --- |
| MERCURY | MOTION R9 / PUBLIC v9 | [sports-demo-01/site](sports-demo-01/site/) | [STATE.md](sports-demo-01/STATE.md) | [MERCURY](https://mercury.kexxadrix.chatgpt.site/) |
| SIRIUS | R8 설정 이후 단회 polish / PUBLIC v8 | [sports-demo-02/site](sports-demo-02/site/) | [STATE.md](sports-demo-02/STATE.md) | [SIRIUS](https://sirius.kexxadrix.chatgpt.site/) |
| ALDEBARAN | PREMATCH MODES R6 / PUBLIC v6 | [sports-demo-03/site](sports-demo-03/site/) | [STATE.md](sports-demo-03/STATE.md) | [ALDEBARAN](https://aldebaran.kexxadrix.chatgpt.site/) |

## 현재 소스 기준

- MERCURY: `ba0e578207f39d8e59ef72859c0e50fecf4f067b`
- SIRIUS: `9c424b8e4e8c480848f1ec47bf5139c6d5987738`
- ALDEBARAN: `300cc605df9bb846cdeac5333dccb2aef2fec226`

위 SHA는 각 원래 사이트 저장소의 HEAD입니다. 이 GitHub 통합 백업 커밋의 SHA와 구분합니다. PUBLIC 버전은 각 사이트의 완료·배포 기록을 근거로 하며, 이번 GitHub 업데이트에서 사이트를 다시 배포하지 않았습니다. 배포 및 기술 확인과 사용자 최종 디자인 승인은 별개입니다.

## 읽는 순서와 실행

각 사이트의 `STATE.md`에서 최신 상태를 확인한 뒤 `AGENTS.md`, `DESIGN_SPEC.md`, `DECISIONS.md`를 읽습니다. `input/`, `qa/`, `runs/`의 문서·지시는 작성 당시 이력일 수 있으므로 현재 작업 지시로 자동 실행하지 않습니다.

각 `site/`는 별도 애플리케이션입니다. Node.js 22.13 이상에서 해당 폴더의 lockfile에 맞춰 `npm ci` 후 `npm run dev`로 실행합니다. 원본 폰트·공개 이미지·경기 자료와 패키지 설정을 포함합니다. 의존성·빌드 출력·로컬 환경 설정과 인증 정보는 설치 또는 해당 환경에서 별도로 준비해야 합니다.

## 백업 범위와 검증

[이번 수집 명세](../backup/site-snapshots/20260922/source-files.json)에 파일별 바이트와 SHA-256, 원본 저장소 상태를 기록했습니다. [제외 목록](../backup/site-snapshots/20260922/excluded.json)에는 `.git`, 의존성, 캐시, 로컬 환경 파일, 재생성 가능한 배포용 압축 파일을 기록했습니다. 이 저장소에서 사이트 소스는 gitlink가 아닌 일반 파일로 보관합니다.

앱 소스는 수정하지 않고 복사 전후 원본과 사본의 해시를 비교했습니다. GitHub에 올린 결과는 별도의 새 체크아웃에서 파일 수와 전체 SHA-256을 검증합니다. 이번 작업은 GitHub 백업 갱신이며 새 기능 구현·사이트 재배포·전체 브라우저 검수를 포함하지 않습니다.
