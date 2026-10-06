# ALDEBARAN 두 번째 스킨 — 화이트 페이지 추가 준비

> 이 문서는 배포 전 준비 이력이다. 2026-10-06 후속 요청으로 ALDEBARAN-2 PUBLIC v1 배포를 완료했다. 현재 URL·소스·GitHub 보관 기준은 [RELEASE.ko.md](RELEASE.ko.md)를 따른다.

## 확정 기준 — 2026-10-06

사용자가 현재 로컬 화면을 ALDEBARAN의 두 번째 스킨으로 결정했다. 현재 외관을 유지해 원본 다크와 분리된 페이지로 추가한다. 이번 작업 범위는 GitHub·로컬·호스팅 현황 확인과 추가 준비이며, Git commit/push와 신규 사이트 등록·배포는 실행하지 않았다.

- 관리명: **ALDEBARAN White**. SIRIUS-2와 같은 명명 방식의 등록 후보는 **ALDEBARAN-2**, slug 후보는 `aldebaran-2`다. 아직 예약하거나 등록한 이름·주소가 아니다.
- 현재 소스: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site`.
- 현재 로컬: [화이트 스킨](http://127.0.0.1:5384/).
- 원본 다크: [기존 ALDEBARAN](https://aldebaran.kexxadrix.chatgpt.site). 이 사이트의 연결을 화이트에 재사용하지 않는다.
- 확정 외관: 밝은 회색 바탕, v3 스포츠·기능·상태 PNG 18종, 주요 아이콘 24px, 흑연 배당 `#41433F`, 선택 배당 `#2B2B27`, 보유머니와 활성 당첨금 `#FF641F`.
- 당첨금 0의 기존 비강조 상태, 팝업·내역의 별도 금액 색상, 로고·영상·배너·팀 로고·작은 조작 아이콘·계산과 이벤트 처리 방식은 유지했다.

## 현재 상태

| 대상 | 직접 확인한 결과 |
| --- | --- |
| 통합 GitHub `Kexxrix/Site-Skin-edit` | `main` = `05e24e2b3c4545c09649091021cccb62d85bab4f`; 로컬 백업 HEAD와 원격 `ls-remote` 일치 |
| 통합 백업 체크아웃 | `E:/codexwork/Site-Skin-edit-backups/20260911-203900/repository`; 검사 당시 변경 파일 없음 |
| 화이트 GitHub 포함 여부 | 해당 커밋에 `demo-sites/sports-demo-03-white` 없음. 현재 확정본은 아직 GitHub 백업 전 |
| 원본 ALDEBARAN 로컬 | HEAD `6be8c176b374999501952d24520c8411b29b153f`, 변경 파일 없음. 기존 기준 317개 파일 SHA-256 일치 |
| 원본 ALDEBARAN Sites | active/public, 최신 버전 23, 기존 주소 유지 |
| 화이트 Sites | 로컬 `.openai/hosting.json`은 `{"d1":null,"r2":null}`. 프로젝트 ID 없음. 소유 사이트 목록에서 별도 ALDEBARAN 화이트/2 사이트 없음 |
| SIRIUS 분리 기준 | SIRIUS와 SIRIUS-2는 별도 프로젝트. SIRIUS-2는 active/public, 최신 버전 1 |

## 검증과 준비 자료

근거 폴더: `E:/codexwork/Site-Skin-edit-backups/20261006-aldebaran-white-release-prep-184711`.

- `source-manifest.json`: 앱 소스·설정·자산 359개, 57,178,062 bytes의 개별 SHA-256. 실행 중 재검사에서 같은 내용인지 확인한다.
- `ALDEBARAN-White-source.zip`: 위 359개 파일을 원본 바이트로 보관한 추가 준비용 소스 묶음. Sites에 업로드할 최종 배포 아카이브와는 구분한다.
- `source-package-verification.json`: ZIP 재열기, 파일 수·각 SHA-256 및 원본 일치 확인.
- `checks-result.json`, `typecheck.log`, `build.log`: 현재 확정 소스에서 `tsc --noEmit --incremental false`와 `npm run build` exit 0.
- `browser-check.json`, `current-local.jpg`: 인앱 로컬에서 화이트 테마·v3 18종·주황 보유머니·흑연 배당, 이미지 166개 정상 로딩, 콘솔 warning/error 0 확인.
- `original-preservation.json`, `sites-status.json`, `github-status.json`: 원본 파일·기존 Sites 연결·원격 Git 상태 근거.
- 직전 금액 변경의 활성 당첨금 검증: `E:/codexwork/Site-Skin-edit-backups/20261006-aldebaran-white-reopen-125324/money-keycolor-1791279787507.jpg`. `100,000 × 1.56 = 156,000` 표시와 금액 색 `#FF641F`를 확인했으며 거래 제출은 하지 않았다.
- 앞선 v3 아이콘과 배당 글자색 독립 검수는 `site/.qa/independent-v3-20261006-175132/REPORT.ko.md`와 `site/.qa/independent-odds-20261006-182056/REPORT.ko.md`에 있다. 이번 금액 색 변경 전 검수라는 차이를 유지한다.

소스 묶음에는 `node_modules`, 빌드 결과 `dist`, `.next`, `.vinext`, `.wrangler`, `.qa`, `next-env.d.ts`, `*.tsbuildinfo`를 넣지 않는다. 기존 검사 자료는 원래 위치에서 보존한다. GitHub 반영 시 앱 소스와 검수·원본 생성 이력은 각각 명시적으로 포함 목록을 정한다.

## 실제 추가 단계의 순서

1. `source-manifest.json`과 현재 앱의 해시를 다시 비교한다. 변경된 파일이 있으면 이번 사용자 확정본과의 차이를 확인한다.
2. 기존 원본·다른 스킨과 분리된 새 ALDEBARAN 화이트 사이트를 한 번만 등록하고, 반환된 새 ID만 화이트의 `.openai/hosting.json`에 연결한다. 실제 등록명·주소·공개 범위는 등록 단계에서 확정한다.
3. 연결된 정확한 소스를 Sites 소스 저장소에 기록하고, 해당 소스에서 검증된 최종 배포 아카이브를 만든다. 현재 준비용 ZIP을 바로 배포 가능한 저장 버전으로 간주하지 않는다.
4. 저장 버전·배포 성공·실제 사이트 주소를 확인한다. 기존 ALDEBARAN과 SIRIUS 두 사이트는 그대로 보존한다.
5. GitHub 백업을 수행하는 단계에서는 기존 통합 체크아웃의 변경 상태를 재확인하고, 화이트 소스·관련 문서·검증 근거를 명세대로 추가한 뒤 원격 트리까지 확인한다. 새 독립 GitHub 저장소는 필요하지 않다.

## 남아 있는 제한

- 신규 등록·GitHub 반영·공개 배포는 아직 미실행이다. 현재 준비 자료에 새 프로젝트 ID나 확정 공개 URL은 없다.
- 기존 큰 chunk 경고와 vinext 경로 분류 안내가 빌드에 남아 있다. 이 준비 작업에서 앱 구조를 바꾸지 않았다.
- 기존 lint 진단은 앞선 독립 검수 기록대로 남아 있으므로 전체 lint 통과로 표기하지 않는다. 이번에는 소스 변경 없이 현재 타입 검사와 빌드를 확인했다.
- 고정 1920px 레이아웃, 외부 Adobe 폰트 로딩 방식은 기존 조건이다. 현재 인앱 확인과 과거 격리 Chrome의 외부 폰트 412 기록은 서로 다른 환경의 결과다.
