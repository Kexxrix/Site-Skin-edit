# ALDEBARAN 색상·카드 장식 폴리싱 변경 보고서

2026-09-23. 상태: 구현·로컬 검수·PUBLIC v18 배포·공개 화면 확인 완료. 다음 피드백 대기.

기준 PUBLIC v17/source `7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23`에서 출발했다. 이번 소스는 `bc52561601bb131c515533028336afbc16c9de17`이다.
공개 주소: https://aldebaran.kexxadrix.chatgpt.site/

## 변경한 파일

- `site/app/aldebaran.tokens.css`: 공통 주황 채움 텍스트 토큰을 #FFFFFF로 변경.
- `site/app/aldebaran-wog-r5.css`: 주황/노랑 전경색 역할 분리, 기존 노랑 배경과 SPORTS를 #FCD73E로 통일, 보유머니·계산 후 총당첨금 숫자 색상, 아이콘 예외, 카드 전용 장식 스타일 제거.
- `site/app/aldebaran-wog-r5.tsx`: 공용 카드 장식 이미지 렌더링 제거, 총당첨금 숫자를 단위와 분리하여 조건부 색상 적용.
- `AGENTS.md`, `STATE.md`, `DESIGN_SPEC.md`, `DECISIONS.md`: 최신 직접 지시와 실제 결과를 앞에 기록하고 이전 원문·증거 경로를 보존.
- `input/post-r15-polish-20260923/REQUEST.ko.md`: 이번 요청과 구현 작업에 전달된 추가 직접 지시 기록.
- 본 보고서 및 `runs/post-r15-polish-20260923/`: 검증·화면·배포 근거.

소스 차이는 3파일, 12줄 추가/11줄 삭제다. 새 의존성·데이터 변경·이미지 생성은 없다.

## 적용 내용

1. 주황색 채움 내부 텍스트를 흰색으로 변경했다. 좌측 충전/환전/고객센터, 주황 경기 수, 활성 마켓 필터, LV.0, BET/MAX, 선택 배당의 팀명/가격이 대상이다. 테두리만 주황인 영역은 기존 표현을 유지한다.
2. 헤더 NEW/LIVE, 좌측 LIVE, N+, 베팅하기 등 기존 노란 표면을 #FCD73E로 통일했다. 기존 검정 계열 글자 #171717과 비활성 구분을 유지했다.
3. 보유머니 숫자만 노랑, 총당첨금은 유효한 선택과 양수 입력 후 계산된 숫자만 노랑으로 표시한다. 초기 0원, 항목명과 단위 원은 기존 색상이다. 계산 함수와 표시 문자열은 유지했다.
4. SPORTS 라벨은 #FCD73E 배경과 검정 텍스트로 변경했다. 옆 제목·크기·위치·라운드는 유지했다.
5. 모든 종목의 공용 경기 카드에서 장식 이미지 요소와 전용 스타일을 제거했다. 장식 원본 파일과 다른 자산은 삭제하지 않았다.

### 구현 작업에서 받은 추가 직접 지시

- 좌측 주황 충전/환전/고객센터 3개 아이콘도 흰색으로 바꿨다. 이 3개만 처음의 아이콘 유지 규칙에 대한 최신 예외이며, 다른 아이콘 색상/치수는 유지했다.
- 팝업 금색 그라데이션/광택 제거 규칙은 출발 소스에 이미 있었다. 이번에는 공통 주황 전경색을 흰색으로 변경하고 기존 효과 제거 규칙을 재확인했다. 로컬 충전 팝업과 실제 공개 선택 내역 확인 팝업을 각각 확인했다.

## 실제 로컬 확인 결과

- 1920×1080 로컬 화면과 computed style 확인: 주요 주황 텍스트 #FFFFFF, 노란 배경 #FCD73E, 노랑 내부 #171717.
- 주요 치수·폰트·간격 비교 결과 차이 없음. 아이콘 차이는 요청된 좌측 3개 전경색뿐이며 20×20 크기는 유지.
- 총당첨금 초기 `0 원`은 기존 #F5F4F4. 입력 `10,000` × 배당 `1.56` = `15,600 원`; 숫자 #FCD73E / 단위 #F5F4F4. 선택 배당의 팀명과 가격은 좌우 모두 #FFFFFF.
- 숫자 span 분리로 총당첨금 인라인 문자열 폭만 52.671875→52.6875px(+0.015625px, 1/64px) 차이가 있다. 문자열·계산·폰트·높이·행 크기·오른쪽 정렬은 유지했으며 임의 보정은 넣지 않았다.
- 해외형 종목별 카드: 축구32/농구6/야구16/하키7 모두 장식0/배경 이미지 none. 국내형 61개도 장식0. 배구는 원래 0경기여서 빈 상태를 확인했고 공용 렌더러에서 장식을 제거했다.
- 선택·해제·금액 입력/초기화와 N+79/80 전환 정상. 테스트 후 기존 빈 선택/입력과 경기 상태 복원. 브라우저 기록 오류0.
- 충전 팝업 기본/hover/active/focus 상태에서 background-image:none, box-shadow:none, 흰색 글자 확인. 버튼을 제출하지 않았다.
- 타입 검사/build 통과. 공식 Sites 워크플로가 검사·빌드·패키징을 마쳤고 구현 담당 완료 보고서에 결과가 기록되어 있다.
- 조정 담당도 실제 로컬 계산 화면과 충전 팝업 스크린샷을 열어 검토했다.

## 보존 및 미실행

레이아웃·치수·간격·폰트 웨이트·카드 단색/테두리/라운드, 61경기/4476마켓/11485선택, 선택 및 금액 계산을 유지했다. `demo-data.ts`, `prematch-r15.json`은 시작 SHA-256과 일치한다. 팀/리그/국기/종목 아이콘, 헤더 영상, 카지노/슬롯 이미지와 서비스 배너, 다른 사이트는 유지했다.

실제 베팅 제출·결제·새 계정 생성, 모바일 및 무관한 전체 회귀 검사는 수행하지 않았다. 사용자 미감 승인은 별도이며 자동으로 다음 작업을 시작하지 않는다.

## 증거 경로

- `runs/post-r15-polish-20260923/implementation/`: before/after.json, style-comparison.json, payout-selection-flow.json, interaction-checks.json, popup-states.json, local-calculated-1920.png, local-domestic-1920.png, local-popup-1920.png.
- `runs/post-r15-polish-20260923/coordination/`: intake.json, data-preservation.json, local-visual-review.json, additional-direct-feedback.json, previous-operating-documents.json.
- `runs/post-r15-polish-20260923/public/`: 최종 공개 증거 저장 위치.

## 최종 공개 및 인계

- 공개 v18: https://aldebaran.kexxadrix.chatgpt.site
- 배포 성공: 2026-09-23 17:10:23 KST.
- source: `bc52561601bb131c515533028336afbc16c9de17`.
- version: `appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_72727a3f7ec4819187cd673704c939c3`.
- deployment: `appgdep_6ab38958e5d481919a0a6dbfedc6a45a`.
- 실제 공개 화면에서 색상과 장식 제거를 확인했다. 로그인된 기존 상태로 테스트 선택 1건/10,000 입력 후 선택 내역 확인 팝업까지 열어 버튼의 #FF641F/#FFFFFF, background-image:none, box-shadow:none, 가상요소없음을 측정했다. 베팅 확인 버튼은 제출하지 않았다.
- 테스트 선택·입력 복원, 기존 로그인·잔액·슬립 유지 상태 보존. 기존 사용자 공개 탭을 새로고침하지 않았고 임시 QA 탭을 닫았다.
- 조정 담당도 최종 공개 전체 화면과 선택 내역 확인 팝업의 실제 저장 화면을 열어 시각 검토했다.
- 기존 빌드 알림(bundle-size, plugin timing, route static classification)은 남아 있으나 이번 검사·배포 실패는 없다.
- 모든 요청 항목 완료. 모바일·실거래·무관 전체 회귀는 이번 범위 밖이다. 배구는 실경기 0건으로 실제 카드 화면 대신 공용 렌더러 제거와 빈 상태를 확인했다.

최종 증거: `implementation/completion-report.json`, `public/final-publication.json`, `public/confirmation-checks.json`, `public/public-final-1920.png`, `public/public-confirm-popup-1920.png` (모두 runs/post-r15-polish-20260923/ 아래).
