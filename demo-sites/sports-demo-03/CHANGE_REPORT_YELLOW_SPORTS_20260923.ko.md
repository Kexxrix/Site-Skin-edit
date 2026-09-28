# ALDEBARAN 노란색 UI·종목 추가 및 호버 수정 보고

완료: PUBLIC v22 / 2026-09-23 19:23:25 KST 배포 succeeded.
공개 주소: https://aldebaran.kexxadrix.chatgpt.site/

## 변경 파일

프로젝트 기준 경로: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/

- site/app/aldebaran-wog-r5.css: LV/BET 색상, 비활성 베팅하기 밝기, 종목 선택·호버 테두리와 숫자 칩, 선택 탭 높이 수정.
- site/app/aldebaran-wog-r5.tsx: 상단·좌측 공용 종목 목록에 4종 추가, 0경기 종목 선택과 빈 상태 처리.
- site/public/sports/aldebaran/image_Sports_Aldebaran-10.png ~ -13.png: 제공 원본 4개를 변환 없이 추가.
- STATE.md / DESIGN_SPEC.md / DECISIONS.md: 이번 최종 결과를 앞에 추가하고 이전 원문·증거 경로 보존.
- 이 보고서와 runs/yellow-sports-20260923/의 작업·검증 기록.

## 적용 내용

1. LV.0·BET 칩을 배경 #FCD73E / 글자 #171717로 변경했다. 박스 크기·글꼴·정렬은 유지했다.
2. 베팅하기 버튼의 비활성 opacity만 0.48에서 1로 변경했다. 활성·비활성 모두 밝은 노랑과 검정 계열 글자·아이콘을 유지하며, disabled 속성·유효성 검사·안내·실행 차단은 보존했다. 다른 비활성 버튼의 opacity는 유지했다.
3. 상단 종목의 선택 테두리·숫자 칩은 #FCD73E, 선택 숫자는 #171717로 변경했다. 후속 직접 지시에 따라 호버 테두리도 #FCD73E로 변경했다. 비선택 숫자 칩 #484848, 탭 바탕·이름·아이콘·1px 테두리는 유지했다.
4. 선택 전후 치수를 같게 하라는 패키지 C 기준에 맞춰 기존 선택 상태에만 있던 34px 높이 override를 제거했다. 공통 높이 32px를 사용하며 기존 폭·패딩·폰트·간격은 유지했다.
5. 포뮬라1 → 복싱 → MMA → 모터스포츠를 상단과 기존 좌측 인기 스포츠 리스트에 같은 순서로 추가했다. 모두 0경기이며 별도 종목 ID를 사용한다. 선택 시 “등록된 경기가 없습니다.”를 표시하고 이전 경기·상세 마켓을 남기지 않는다.

## 종목 채택과 폭 실측

1920×1080 CSS px, 브라우저 배율 100%, DPR 1, 지정 폰트 로드 완료 상태에서 측정했다.

| 항목 | 측정 |
|---|---:|
| 가용 폭 | 1226px |
| 후보 5종 모두 배치한 폭 | 1252.171875px |
| 초과 폭 | 1252.171875 − 1226 = 26.171875px |
| 크리켓만 제외한 최종 폭 | 1138px |
| 최종 여유 | 1226 − 1138 = 88px |

패키지 우선순위에 따라 마지막 후보인 크리켓만 제외했다. 버튼·폰트·간격 축소, 가로 스크롤 추가, 줄바꿈, 말줄임, 잘라내기는 적용하지 않았다. 5종 최초 측정 당시 선택 탭만 34px였으며 최종 측정은 전부 32px로 정정된 값이다.

제공 PNG 5개는 모두 256×256 RGBA이며 manifest의 바이트 수·SHA-256과 일치했다. 채택 4개는 원본 바이트 그대로 사용한다. 공통 슬롯(상단 20px / 좌측 22px)과 contain 비율을 유지했으며 F1의 가로형, MMA의 세로형 도형이 잘리지 않는 것을 실제 화면에서 확인했다. 크리켓 원본은 입력 패키지에 보존했고 시험용 앱 복사본만 제거했다.

## 실제 검증 결과

- 로컬: 신규 4종의 상단·좌측 선택, 기존 배구 0경기, 국내형 포뮬라1 빈 상태를 확인했다. 빈 상태에서 경기 카드·상세 마켓이 0이고 이전 상세 경기 ID가 제거됐다.
- 목록 복귀: 농구 6경기 / 전체 61경기 정상 복귀. 전체 수는 32 + 6 + 16 + 0 + 7 = 61로 유지됐다.
- 슬립: 종목 이동 중 테스트 선택 1개와 10,000원 입력이 보존됐다. 검증 후 테스트 선택·금액·스크롤을 복원했다.
- 비활성 버튼: 네이티브 마우스 입력은 동작을 실행하지 않았고 키보드 Tab은 비활성 버튼을 건너뛰었다. 기본·호버·누름 상태의 노랑·검정 및 opacity 1을 확인했다.
- 추가 호버: 선택된 전체 / 비선택 축구 / 신규 포뮬라1에서 테두리 #FCD73E, 두께 1px, 높이 32px를 확인했다. 비선택 숫자 칩은 회색 그대로다.
- 공개: 기존 세션에서 금액 미입력 시 비활성, 10,000원 입력 시 활성, 100,001원 입력 시 한도 초과 비활성을 확인했다. 안내 문구와 노랑·검정 색상이 유지됐다. 계정·잔액·슬립 유지 설정 및 기존 선택·입력 상태를 복원했다.
- 조정 담당도 로컬 호버·빈 상태·최종 공개 1920 화면을 직접 열어 검토했다. 공개 최종 캡처는 우측 레일이 스크롤된 상태로 LV가 보이지 않으며, LV는 별도 로컬 화면과 computed style 근거로 확인했다.
- 타입 검사: node node_modules/typescript/bin/tsc --noEmit 통과. 이후 호버 전용 CSS 수정에서는 앞선 타입 검사를 재사용했다.
- 최종 npm run build 통과, exit 0. 공개 페이지 콘솔 오류·경고 0.
- 데이터 파일 SHA-256은 기존과 동일하고 앱 작업 트리는 clean이다.

## 최종 배포

- 출발: PUBLIC v21 / source 5b4a1476d757871932cd3378db8da9b9f266a6d0
- 최종: PUBLIC v22 / source fd3356b6b2814b269c81e3bec3112ff999a1570b
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_324986d32fcc819190c5376d6e1b27eb
- deployment: appgdep_6ab3a88631f48191b53b76813ca4a2b6
- native 상태: succeeded / 2026-09-23T10:23:25.339377+00:00
- 최종 배포용 archive: runs/yellow-sports-20260923/implementation/aldebaran-yellow-sports-final.tar.gz
- 이전 hover 수정 전 archive는 배포 최종본으로 사용하지 않았다.
- 사용자가 열어둔 공개 탭은 강제로 새로고침하지 않았다. 확인용 임시 탭은 닫았다.

## 보존·미검증·남은 판단

- 경기·마켓·배당·선택 ID, 검증·제출 핸들러, 나머지 버튼과 좌측 레일 호버, 원본 자산, MERCURY·SIRIUS·타이탄은 수정하지 않았다.
- AGENTS.md는 운영 규칙 변경이 없어 수정하지 않았다. 이번 현재 결과는 STATE/DESIGN_SPEC/DECISIONS의 최상단과 이 보고서를 기준으로 본다.
- 실제 베팅 제출·결제·계정 생성은 0회다. 모바일·무관한 전체 회귀는 범위 밖으로 실행하지 않았다.
- 기존 build의 bundle-size / plugin-timings / vinext route-classification 경고는 유지된다. 새로운 build 실패는 없다.
- build 로그는 도구 출력 제한에 따른 발췌본이며 성공 종료·최종 source/archive 기록은 보존했다.
- 범위 내 미완료 항목은 없다. 사용자 최종 시각 승인과 크리켓의 추후 추가 여부는 별도 판단이며 자동 후속 작업은 시작하지 않는다.

## 증거

runs/yellow-sports-20260923/implementation/:
completion-report.json, completion-report.ko.md, final-publication.json, final-build-output-excerpt.log,
five-candidate-width.json, final-width.json, geometry-comparison.json, navigation-flow.json,
disabled-and-domestic.json, disabled-styles.json, hover-before.json, hover-after.json,
public-active-disabled-checks.json, public-final-state.json, public-console.json,
local-final-1920.png, zero-sport-slip-preserved-1920.png, hover-final-1920.png, public-final-1920.png.

runs/yellow-sports-20260923/coordination/:
intake.json, previous-operating-documents.json, asset-visual-inventory.json, fixture-baseline.json,
tab-height-decision.json, additional-hover-request.json, preservation-check.json,
zero-state-visual-review.json, final-visual-review.json, final.json.
