# Site-Skin-edit — TITAN 제작 자료

## 사이트 현재 현황 — 2026-10-02 인계 기준

| 사이트 | 공개 완료 기준 | 최신 운영 문서 |
| --- | --- | --- |
| [MERCURY](https://mercury.kexxadrix.chatgpt.site/) | PUBLIC v25 · 제공 PNG 20종 및 금색 버튼 3개의 검정 아이콘 복원 | [STATE](demo-sites/sports-demo-01/STATE.md) |
| [SIRIUS](https://sirius.kexxadrix.chatgpt.site/) | PUBLIC v9 · 승인된 Speedwagon 화이트 앱 이관 | [STATE](demo-sites/sports-demo-02/STATE.md) |
| [SIRIUS-2](https://sirius-2.kexxadrix.chatgpt.site/) | PUBLIC v1 · 승인된 Speedwagon 딥블루 앱을 별도 공개 사이트로 이관 | [STATE](demo-sites/sports-demo-02-deepblue/STATE.md) |

세 사이트의 공개 배포는 완료 기록상 `succeeded`다. 앱 경로·소스 커밋·서로 다른 Sites 프로젝트 ID·검증 근거·남은 항목은 [사이트 목록과 인계 현황](demo-sites/README.ko.md)을 따른다. ALDEBARAN·TITAN과 기존 원본은 이번 이관에서 변경하지 않았다.

**2026-10-02 통합 GitHub 백업 기준은 MERCURY v25·SIRIUS 화이트 v9·SIRIUS-2 딥블루 v1이다.** 세 앱의 소스·자산·설정·입력·검수 및 최신 관리 문서를 함께 보관한다. [파일별 수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/main/backup/site-snapshots/20261002-mercury-sirius-variants/source-files.json)와 [스냅샷 기록](https://github.com/Kexxrix/Site-Skin-edit/tree/main/backup/site-snapshots/20261002-mercury-sirius-variants)을 따른다. Sites 배포 소스 SHA와 통합 GitHub 커밋은 구분하며, 기존 v24 / `573c236` 기록은 아래 당시 이력으로 보존한다.

이번 백업은 최신 사용자 지시에 따라 기존 저장소에 소스·문서·근거를 동기화하는 작업이다. 앱 코드·디자인·서버·공개 배포는 변경하지 않고 이미 통과한 빌드·브라우저 QA를 재사용한다. 기존 백업 체크아웃에 남아 있던 문서 3개는 스냅샷의 `prior-uncommitted-documents/`에 원문 그대로 보존했다.

## 이전 MERCURY 기준 기록 — PUBLIC v24 / 2026-10-01

[MERCURY 인덱스](demo-sites/sports-demo-01/INDEX.ko.md)와 [최신 STATE](demo-sites/sports-demo-01/STATE.md)에서 시작한다. 정적 헤더 배경·금색 종목 아이콘 10개는 PUBLIC v23, 워드마크 v3는 PUBLIC v24에 반영했다.

- 앱 소스: `8385d4bbc74394006db637e87466f4a171f6e02d` / 작업 브랜치 `mercury-variation`.
- GitHub 백업: `573c2367112bc11dd476faee25b64d806247f379` / [2026-10-01 수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/573c2367112bc11dd476faee25b64d806247f379/backup/site-snapshots/20261001-mercury-v24/source-files.json).
- 백업 경로는 통합 저장소의 `backup/site-snapshots/20261001-mercury-v24/`다. 수집 당시 323개 파일 SHA-256 검증 기록과 이번 문서 갱신은 구분한다. 배포·기술 확인과 사용자 최종 디자인 수용도 별도 상태다.

아래 TITAN 제작 자료 안내는 기존 기록으로 보존한다.

이 저장소는 `E:/codexwork/Site-Skin-edit`에서 진행 중인 사이트·TITAN 영상 제작 자료의 백업입니다. 영상의 원본, 가이드 이미지, 실제 프롬프트, AE 프로젝트와 제작 스크립트, 출력 영상, 실패·수정·검증 기록을 함께 보존합니다.

**처음 읽는 분은 [영상 제작 인덱스](docs/video-production/README.ko.md)에서 시작하십시오.** 현재 제작은 원래 작업 환경과 담당 작업에서 계속합니다. 이 백업은 별도 GPT 작업이 흐름을 이해하고 감사·방법론 연구를 수행하기 위한 자료입니다.

- [상세 제작 이력](docs/video-production/HISTORY.ko.md)
- [현재 제작 범위와 공식 AE 마커](docs/video-production/CURRENT-STATE.ko.md)
- [구현 방법, 검증 범위, 실패에서 얻은 교훈](docs/video-production/WORKFLOW-AND-LESSONS.ko.md)
- [감사·연구 작업용 인계문](docs/video-production/AUDIT-HANDOFF.ko.md)
- [자료별 진입점과 백업 설명](docs/video-production/ASSET-CATALOG.ko.md)

각 실행 폴더의 기존 보고서는 **작성 당시 상태**를 기록합니다. 옛 `pending`, 중단 지시, 씬 별칭을 현재 실행 상태로 해석하지 마십시오. 공식 AE 마커는 **06 Sportsbook / 07 Operations, refined / 08 Sudden odds shift**이며, 09 Bets auto-blocked는 이어지는 결과 마커입니다. 폴더 이름의 `04-06`은 과거 가이드 묶음 별칭입니다.

완료한 생성, 기술 검증 통과, 사용자 검토 통과, 최종 영상·사이트 채택은 서로 다른 상태입니다. 백업에 포함됐다는 사실은 최종 채택을 뜻하지 않습니다. 백업 파일 목록·SHA-256·수집 시점·외부 참조 매핑은 저장소의 `backup/`에 기록됩니다.
