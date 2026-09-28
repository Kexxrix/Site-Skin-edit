# ALDEBARAN 색상·카드 장식 및 후속 아이콘 수정 완료

PUBLIC v18 · https://aldebaran.kexxadrix.chatgpt.site

- 소스: bc52561601bb131c515533028336afbc16c9de17
- 배포: appgdep_6ab38958e5d481919a0a6dbfedc6a45a / succeeded / 2026-09-23T08:10:23.363961+00:00
- 기준: PUBLIC v17 / 7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23

## 변경 파일
- app/aldebaran-wog-r5.css: 주황 전경 흰색, 노랑 #FCD73E, SPORTS·보유금액 색, 카드 장식 CSS 제거, 좌측 주황 3버튼 아이콘 흰색. 나머지 아이콘 기존색 유지.
- app/aldebaran-wog-r5.tsx: 공용 카드 장식 img 제거, 총당첨금 숫자만 span으로 분리.
- app/aldebaran.tokens.css: 공용 주황 전경 흰색.

## 실제 변경과 기존 규칙 재확인
팝업의 금색 background-image/box-shadow 제거는 v17에 이미 반영된 규칙이며 이번에 다시 추가한 수정이 아니다. 이번 토큰 변경으로 팝업 주황 버튼 글자는 흰색이다. 로컬 충전 팝업과 별도로 PUBLIC v18의 실제 ‘선택 내역 확인’ 팝업을 열어 확인했다. ‘베팅 확인’은 누르지 않았다.

## 검증
- 기존 tsc --noEmit --incremental false 및 npm run build 통과. 3파일만 변경, source checkout clean.
- style-comparison.json: 기존 캡처 대상의 치수·간격·폰트 차이 없음. 의도된 아이콘 차이는 좌측 주황 세 버튼만.
- 국내61/해외61 카드 전용 장식0. 축구32/농구6/야구16/하키7의 배경이미지 none. 배구0 빈 상태; 공용 렌더러 적용은 소스로 확인.
- 선택/해제·N+79/80 상세 열기·금액입력/초기화 확인. 10,000 × 1.56 = 15,600, 표시 문자열은 ‘15,600 원’으로 동일.
- 숫자 span 분리 후 텍스트 자체 폭은 52.671875→52.6875px(+1/64px). 행 치수·우측정렬·폰트·계산·표기 동일. 고정폭/미세좌표 보정 없음. 초기 ‘0 원’ 폭도 동일.
- 로컬 충전 버튼 기본/hover/active/focus에서 gradient와 glow none. PUBLIC 실제 선택 확인 버튼: #FF641F / #FFF, background-image:none, box-shadow:none, before/after content:none.
- 로컬 및 PUBLIC 콘솔 error/warn 없음. 1920×1080 실제 캡처 저장.
- 공개의 기존 로그인·잔액890,000원·슬립유지 true 유지. 임시 선택·금액은 원복했고 기존 사용자 탭은 새로고침하지 않았다. 로컬 GUEST·잔액1,000,000원·빈 선택/금액도 유지.

## 증거
- implementation/style-comparison.json, payout-selection-flow.json, popup-states.json, interaction-checks.json, source.diff, build.log
- implementation/local-final-1920.png, local-domestic-1920.png, local-calculated-1920.png, local-popup-1920.png
- public/styles.json, confirmation-checks.json, public-final-1920.png, public-confirm-popup-1920.png, final-publication.json

## 변경하지 않은 범위와 한계
데이터·계산·원본자산·폰트·다른 사이트·GitHub 백업·조정 담당 운영 문서 보존. 모바일/전체 회귀/실제 제출은 검수 범위 밖. 배구 카드 실화면은 경기0이므로 미검증. build의 기존 큰 bundle·plugin timing·vinext route 분류 경고는 비차단이다.

