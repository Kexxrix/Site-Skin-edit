# SIRIUS — R8 Impeccable + Jev 통합 운영

## 단회 polish 실사용 테스트 종료 — 2026-09-21

- 이번 사용자 직접 지시로 QA 담당이 설치된 `site/.agents/skills/impeccable/SKILL.md`의 polish 한 차례를 구현·기본 확인·기존 PUBLIC v8 배포까지 수행했다. 아래 R8의 설정 전용/UI 수정 금지는 이번 명시 범위에서만 대체됐으며 아래 기록은 당시 이력으로 보존한다.
- 변경은 중앙 섹션 제목의 영문 보조명에 한정했다. 헤더·좌우 레일·경기 행·배당·숫자·자산·기능·승인 모션은 수정하지 않았다. 설치/초기화/연결 재시험, 다른 디자인 명령과 전수 감사는 수행하지 않았다.
- Jev는 새 revision의 `#live .title-plate`, 1920×1080, initial만 측정했다. 후보0·보류8이며 보류는 오류나 승인으로 전환하지 않았다. 기존 보류6은 별도 과거 스냅샷으로 유지한다.
- 결과는 [STATE.md](STATE.md)와 [실행 기록](runs/polish-20260921-165020/completion.json)에 연결한다. 이번 테스트는 종료하며 사용자 시각 피드백을 기다린다. 추가 polish나 상시 전수 QA를 자동 재개하지 않고 별도 QA 스레드의 기존 중단 원칙을 유지한다.

## R8 인계 마감 — 사용 준비 완료, 2026-09-21

- 현재 요청은 기존 설치 인계와 스킬 인식·PRODUCT 형식 경고 정리까지다. 설치 래퍼/연결 시험/동일 결과 재전달을 다시 실행하지 않는다. 사이트 코드·스타일·자산·다섯 디자인 명령·audit/critique/detect·빌드·배포·commit/push는 시작하지 않는다.
- 현재 Codex 데스크톱 번들의 읽기 전용 skills/list(forceReload=true)에서 앱 cwd E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site의 impeccable이 enabled=true, scope=repo, errors=[]로 확인됐다. 앱에 설치된 원문을 유지하며 상위 워크스페이스나 전역으로 재설치/복제/링크하지 않는다.
- 상위 E:/codexwork/Site-Skin-edit cwd에는 앱 하위 스킬이 자동 목록에 나타나지 않는 것이 확인됐다. 상위 진행/구현 작업에서 필요할 때는 [설치된 SKILL.md](site/.agents/skills/impeccable/SKILL.md)를 명시적으로 읽고 실제 명령의 cwd를 SIRIUS site로 지정한다. 현재 열린 채팅의 선택기 표시나 핫 리로드까지 확인한 것으로 보고하지 않는다.
- [PRODUCT.md](site/PRODUCT.md)에 설치된 reference/init.md가 요구하는 product-schema 1 HTML 주석 한 줄만 추가했다. 기존 본문은 그대로 보존했다. 변경된 입력으로 context --target app/page.tsx를 한 번 실행해 종료0·legacy 경고 없음·기존 buildPath=code를 확인했다. 이는 남은 형식 경고 검증이며 설치·Jev 연결 시험 재실행이 아니다. init/document/설계 명령은 실행하지 않았다.
- 자동 hook.enabled=false와 다른 설정·스킬 원문을 유지한다. 설치된 skill 4.3.1, 엔진0.1.5, 설치 CLI4.1.0의 기존 증거는 재사용한다.
- 다음 실제 변경 작업은 해당 부위의 orchestration-summary.json을 먼저 읽고 counts/status/unverified/omitted_issues를 확인한다. 통과 목록·전체 raw 결과를 기본으로 재독하지 않는다. 필요한 candidate의 근거, 누락·모순에 관련된 증거만 선택적으로 열고 실제 결함인지 판단한다.
- 기존 연결 시험은 139문항→33관계, 일차 제외/통과27·수정후보0·보류6, omitted_issues=0이다. 보류6건은 모두 unverified로 유지하며 확정 결함·수정 지시·통과로 바꾸지 않는다. 이번 인계에서 후보별 원본 증거는 열지 않았고 시험/API/브라우저를 재호출하지 않았다. 당시 스냅샷이며 현재 공개 사이트나 source revision의 자동 보증이 아니다.
- [이번 준비 확인 기록](runs/r8/readiness-20260921-164034/readiness.json), [스킬 인식](runs/r8/readiness-20260921-164034/skill-discovery-desktop.json), [PRODUCT 형식 확인](runs/r8/readiness-20260921-164034/context-after-product-format.txt), [수정 전 문서·맥락](runs/r8/readiness-20260921-164034/before.json)을 보존한다. 기존 설치/시험/공개v7·증거와 전달 ZIP은 덮어쓰지 않는다.
- 이번 단계는 사용 준비 완료로 종료한다. 사이트 수정·다섯 디자인 명령·배포를 시작하려면 별도 사용자 지시가 필요하다.

이번 R8은 설치·설정·Jev 결과 전달만 수행합니다. 사이트 소스·스타일·자산·배포 변경, bolder/layout/typeset/harden/polish 다섯 명령, 전수 audit/critique/detect 자동 실행은 하지 않습니다. 아래 보존된 R7 지시는 완료된 당시 이력이며 현재 실행 명령이 아닙니다. R7 PUBLIC v7 완료와 사용자 피드백 대기 상태를 유지합니다.

## 역할과 중복 QA 제거

- Impeccable은 구현 담당 Codex의 부위별 디자인 수정 지침입니다. Jev와 직접 통신하는 공식 연동 기능이 있다는 뜻은 아닙니다.
- 기존 Jev 모델 jev-1.13.0에 DOM·computed style·측정값을 전달합니다. Jev가 스크린샷을 본다고 보고하지 않습니다. Jev는 적용 대상·예외·충분성·불일치를 분류하고 숫자 계산과 결과 조합은 코드가 담당합니다.
- 구조 수집은 한 번만 하고 같은 증거를 Impeccable 전수 audit/critique/detect, Codex 전수 브라우저 감사, 별도 QA 작업으로 반복하지 않습니다. 설치된 스킬 원문은 수정하지 않으며 자동 hook을 끕니다. 도구가 제안하는 자동 검사보다 현재 프로젝트 범위가 우선합니다.
- 빌드·타입 검사·변경 동작의 짧은 확인은 기존 담당자가 유지합니다. Jev는 이를 대신하지 않습니다. 이미 수집한 화면을 공유하고 후보·누락·모순만 필요한 영역으로 확인합니다.
- candidate는 수정 지시가 아닙니다. Codex는 원본 증거와 승인 의도를 확인하고 실제 결함만 국소 수정합니다. unverified/failed/not_run은 pass가 아닙니다.
- 수정 후 변경 부위와 영향을 받는 검사만 한 번 다시 합니다. 입력·버전·상태·viewport·질문 은행·관측 증거가 같은 완료 검사는 재사용합니다. 현재 도구는 원격 URL과 소스 revision 연결 및 캐시 최신성을 자동 증명하지 못하므로 담당자가 같은 버전인지 확인해야 합니다.
- --from-run은 저장한 관측 전달이며 현재 사이트 재검증이 아닙니다. 통과 목록을 다시 읽거나 같은 API를 재호출하지 않습니다. 별도 QA 작업은 중단을 유지하고 사용자 최종 미감 판단은 보존합니다.
- 자동 수정 루프·전체 사이트 PASS·정확도/절감률 추정·새 이미지/폰트·commit/push를 추가하지 않습니다.

## 설치와 결과 전달

설치 시작점: 패키지 setup/Install-Integrated.ps1 -WorkspaceRoot E:/codexwork/Site-Skin-edit.
SIRIUS 앱 로컬 Codex provider/project/--no-hooks, buildPath=code, hook.enabled=false만 병합합니다. 다른 설정·hook은 보존합니다. Git 안전 경로는 명령 한 번의 -c로만 지정하며 전역 설정은 바꾸지 않습니다. 기존 skill이 있으면 강제 재설치하지 않습니다.

setup/Connect-Jev.mjs는 동봉한 jev/runtime을 워크스페이스 qa-tools/jev에 연결합니다. 같은 파일은 재사용하고 다른 기존 버전은 덮어쓰지 않습니다. Node>=22.18, Chrome, Codex 번들 Playwright가 필요합니다. 기존 루트 .env의 TYPESAFE_API_KEY만 읽습니다. 키/.env는 패키지에 포함하지 않습니다. 런타임 연결 검사는 API를 호출하지 않습니다.

jev/handoff-template.json을 복사해 task_id/revision/preview_url/changed_files/selector/viewport를 실제 값으로 채웁니다. state=initial만 자동 실행합니다. checks의 structure 외 항목은 unverified로 전달합니다. 템플릿과 어댑터는 프로젝트 소유 계약이며 Jev 공식 API가 아닙니다.

- node qa-tools/jev/handoff.mjs <job.json> --check : 입력 검사, API 호출 없음.
- node qa-tools/jev/handoff.mjs <job.json> --run : 선택 영역 수집 → Jev → 코드 종합 → 결과 파일.
- node qa-tools/jev/handoff.mjs <job.json> --from-run <run-directory> : 같은 대상·viewport·상태의 저장된 결과 전달. API/브라우저 재호출 없음. historical_snapshot_only이며 현재 revision 검증이 아님.

출력 handoffs/<id>/orchestration-summary.json을 먼저 읽습니다. 후보/보류 최대20건과 omitted_issues, 전체 delivery.json 경로가 있습니다. 누락 표시를 무시하지 말고 필요할 때만 전체 결과를 읽습니다. delivery.json은 문제 위치/selector/관측값/로컬 조합 이유/원본 기록·해시/미지원 범위/실측 시간을 전달합니다. Jev는 서술형 이유를 반환하지 않습니다.

실패는 failed로 남기며 자동 재시도하지 않습니다. max_tokens_exceeded는 총 비용이 아니라 요청 크기 제한입니다. 범위를 작게 나누거나 연구용 complete-captured.mjs --single로 누락 질문만 보충합니다. 이미 유효한 답을 원하는 결과가 나올 때까지 다시 묻지 않습니다. 이 보충 기능은 기본 자동 경로에 연결하지 않았습니다.

상태창 5299는 현재 설치된 기존 도구입니다. 실행 버튼의 기본 SIRIUS .slip 범위는 그대로이므로 변경 부위 검수에는 위 CLI로 selector를 명시합니다. 다른 머신에 상태창/브라우저 의존성까지 자동 설치한다고 가정하지 않습니다.



---

## 보존된 R7 이하 기록 — 당시 실행 지시는 현재 비활성

# SIRIUS — R7 작업 공통 규칙

문서 세트: **RIGHT RAIL VISUAL ALIGNMENT R7 · 2026-09-18**

## 우선순위와 대상

- 최신 사용자 지시 → R7 확정 범위 → 디자인 시작값 → 충돌하지 않는 이전 기준 순서다.
- 사용자는 ‘오른쪽 레일도 전체적으로 왼쪽 레일과 같은 문법으로 변경’하라고 지시했다. **R6의 오른쪽 변경 금지는 이번 범위에서 대체된다.** 별도 허락을 다시 묻지 않는다.
- AGENTS → STATE → DESIGN_SPEC 순서로 읽고 DECISIONS로 이력을 확인한다. 운영 MD는 이 네 개만 사용한다. 별도 README/HANDOFF/QA 문서는 만들지 않는다.
- 대상 앱: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site/`
- 공개: https://sirius.kexxadrix.chatgpt.site/
- project_id: `appgprj_6aacb6c2a38881918bd8a324fa9c5b54`. 현지 설정과 대조하고 기존 공개사이트를 갱신한다.
- 현지 최신 코드와 실제 변경·배포 이력에서 이어 작업한다. 패키지의 준비 단계 기록으로 현지 완료 정보를 덮어쓰지 않는다.

## 이번 범위

오른쪽 계정 패널, 빈/선택된 베팅슬립, 금액 입력·금액 버튼·합계·베팅 버튼, 고객센터, 기존 이벤트 배너에 R6 왼쪽의 모서리·표면·경계·타이포그래피·버튼 위계를 적용한다.

- 오른쪽 폭320px와 계정→슬립→고객센터→이벤트 배너 순서를 유지한다. 왼쪽272px로 맞춰 줄이지 않는다.
- 스타일은 오른쪽 루트 `.sirius-right-r7` 아래로 제한한다. 전역 `.panel`/`.btn`/`.num`/input 규칙으로 왼쪽·헤더·중앙까지 변경하지 않는다.
- 현재 왼쪽 디자인이 기준이다. 공유 토큰이 있으면 재사용하고, 없으면 필요한 값만 오른쪽에 연결한다. 전역 디자인 시스템 재구축은 하지 않는다.
- 슬립의 선택·제거·단일/다중 표시·금액·MAX·증액·초기화·계산·인증·비활성 조건·확인창·이력·저장 상태는 기존 구현을 이어 쓴다. 시각 변경 때문에 베팅 로직을 새로 만들지 않는다.
- 기존 한글 폰트와 DIN, 아이콘, 오른쪽 사진을 재사용한다. 새 자산 생성·외부 이미지 편집 플러그인·폰트 다운로드는 하지 않는다.
- 하단 이벤트 배너는 기존1개를16:9로 정리한다. 내부 CTA를 없애고 전체 클릭으로 기존 동작을 연결한다. 오른쪽 배너3개 추가나 사진 교체는 하지 않는다.
- MERCURY 전체, SIRIUS 왼쪽 R6·헤더·중앙 경기 목록과 승인된 모션은 보존한다.

## 진행 방식

기존 진행/구현 스레드를 계속 사용한다. **별도 검수 스레드는 사용자 재개 지시 전까지 중단**이다. 구현 담당이 통상 빌드와 변경 부분의 짧은 확인을 마치면 기존 공개사이트에 바로 반영하고 사용자 피드백을 받는다. 독립 감사·전수 QA·PASS 표·WOG 비교·추가 승인 단계를 만들지 않는다.

이 기획 대화가 Windows 소스를 구현하거나 배포했다고 기록하지 않는다. 실제 변경·배포 식별자·남은 문제만 STATE에 간단히 기록하고 다음 작업으로 자동 진행하지 않는다.
