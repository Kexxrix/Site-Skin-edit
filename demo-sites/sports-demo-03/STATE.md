> 현재 활성 기준: ALDEBARAN_R6_PREMATCH_MODES (2026-09-22). 문서 끝 R6 변경분이 충돌하는 R5 이하 지시보다 우선하며 이전 구현·배포 이력은 보존합니다.

# ALDEBARAN — WOG LAYOUT R5 현재 상태

## 현재 결과

**R5 전체 화면 이식·한정 구현 확인·동일 주소 PUBLIC v5 배포와 실제 공개 화면 확인 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 상태: succeeded / public
- 성공 시각: 2026-09-22 13:17:55 KST / 04:17:55 UTC
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_cb5f3333a81881919fb804a83b033d60 (v5)
- deployment: appgdep_6ab20161f73c8191971759d1f74bf3a1
- commit / remote HEAD: e8ad227b0536d1852627e3be79e3c24b857571e0 / clean
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- 시작점: get_site PUBLIC v4 / source-open 2da6c55d2395beb2ae0046c8421aa4d3b4ddef08 / dirty 없음.

기존272/1280/320,632/16/632,104px헤더,공통 중앙 스크롤,큰 트래커 우선은 이번 R5 전체 범위에서 교체했다. 과거 실제 완료 내용은 아래 원문 이력으로 보존하며 현재 활성 규칙으로 재적용하지 않는다.

## 구현 결과

고정1920 셸에서 헤더62+공지36, 본문320/1244/320, 중앙609/8/609를 적용했다. ALDEBARAN 무광 차콜·플랫 주황·흰 글자, 승인 레터링과 기존 Pretendard JP 계열·아이콘·사진을 사용한다. 원본 WOG의 골드/광택/사자 로고·사용자 정보는 이식하지 않았다. 좁은 창은 전체 캔버스 가로 접근이며 모바일 재설계는 하지 않았다.

- 헤더10메뉴와 NEW/LIVE/활성 아이콘, 움직이는 공지와 고정5메뉴.
- 좌측12퀵메뉴,200×116/98×116의 기존 카지노·슬롯 사진,검색2줄,종목→국가→리그,최신 인기5경기.
- 중앙 왼쪽6종목탭/8칸 배열,리그별 카드와 기본 배당3줄. 오른쪽 선택 경기 제목/5필터/접이식 상세마켓. 종목별8또는10그룹과 복수 핸디/총점 라인 구성. 첫 LIVE 야구 경기에는10그룹 중8개 활성,이미 지난 첫5이닝2그룹은 잠김으로 구분한다.
- 좌레일·경기목록·상세마켓·우레일의4개 독립 scroller. 종목바와 경기제목/마켓필터는 스크롤 밖에 고정. 다른 경기 선택은 왼쪽 유지/오른쪽0,같은 경기·배당 선택은 양쪽 위치 유지.
- 우측 계정정보/6서비스,기존 계산·데모 처리와 연결된 슬립,저장 유지 토글/전체삭제/폴더수/금액·빠른금액·한도,역할별6배너.
- 기존 목적지 및 내용 있는 로컬 로비/게시물·상세/출석/문의/프로필/금융 데모 안내를 연결했다. 임의 연락처나 실제 외부 거래 API를 만들지 않았다.
- 큰 트래커는 기본 화면에 마운트하지 않는다. R4 트래커 소스/기존 match-motion 코드는 보존했다.

## 변경 파일

앱 소스7개:
- site/app/aldebaran-wog-r5.tsx — R5 전체 화면 구성과 컨트롤 연결
- site/app/aldebaran-wog-r5.css — 고정 치수·정보 밀도·스크롤·상태 표현
- site/app/demo-data.ts — 기존 데이터와 R5 마켓 연결
- site/app/layout.tsx — R5 스타일 연결
- site/app/page.tsx — 기존 상태·핸들러와 R5 화면 연결
- site/app/wog-market-data.ts — 종목별 안정적 로컬 상세마켓 보완
- site/app/wog-service-views.tsx — 서비스별 내용 있는 데모 보기

조정 작업은 운영4문서 AGENTS/STATE/DESIGN_SPEC/DECISIONS와 입력·결과 JSON만 갱신했다. 별도 QA/Jev/새사이트/이미지생성/새설치/새테스트스위트는 추가하지 않았다.

## 실제 검증 — 한정된 변경 확인

- npm run build1회 exit0. 빌드에 타입 검사가 없어 tsc --noEmit --incremental false1회 별도 실행,exit0.
- 로컬1920×1080 실제 측정: 헤더98(62+36),좌x8/중앙x338/우x1592,폭320/1244/320. 중앙 패널x347/964,y114,폭609/609,높이946. 카드587×228,기본배당36px/상세34px,라벨12px/배당14px.
- 헤더10/공지5/퀵12/사진2/종목탭6/배너6. 이미지 깨짐0,중첩button0,콘솔warning/error0.
- 오른쪽480 스크롤 때 왼쪽0 유지,왼쪽326으로 이동해도 오른쪽480 유지. 상단 컨트롤 좌표 유지.
- 다른 경기 실제 클릭: 왼쪽174→174,오른쪽480→0. 같은 경기 및 배당 선택/해제:174/480 유지. 좌우 동일ID 강조와 슬립1폴더/해제0 연결 확인.
- 리그·마켓 접기와 마켓 inert,검색1경기/0경기 시 상세비움,카지노 이미지→3항목 로비→읽을 수 있는 상세1개 확인.
- 공개는 native succeeded 응답과 실제 canonical root의 R5 화면으로 확인. 초기 기존 탭에 캐시된R4가 보였으나 강력 새로고침 후R5 표시를 확인했고,1920×1080 초기 화면1장만 저장했다. 영구 브라우저 설정은 바꾸지 않았다.
- 공개 정밀 DOM 치수는 재측정하지 않았다. 위 정밀 수치는 로컬 관찰이며 공개는 화면 확인 증거다.

## 데이터·자산·다른 사이트 보존

원천77경기의 기존 필드/점수/상태/모든 기존마켓·선택ID와 정책/저장 namespace aldebaran-frame-r1-v1을 유지했다. 첫 경기는 record-401816943,1:1의 기존 LIVE 야구다. 보완 배당은 안정적인 로컬 데모이며 실제 실시간 피드로 주장하지 않는다. 원천JSON/폰트/기존match-motion 및 자산을 보존했다. MERCURY/SIRIUS 추적567파일 해시 변경0.

첨부 참조PNG 실제1916×941,작성 단계 관측1363×936,이번 구현 목표 및 로컬측정/공개캡처1920×1080을 구분한다. WOG 재로그인/전체 원본 재탐색 없이 제공PNG/치수/계약을 사용했다. manifest17파일 바이트와SHA256 검증 통과. 승인 레터링1101×120 원본을 유지했다.

## 미완료·미검증·종료

한정 확인에서 확정된 미완료 항목은 없다. 최종 시각 수용은 사용자 판단을 기다린다.

미검증: 실제 베팅 제출,인증·금융 전체 회귀,모든 메뉴 상태,출석/문의/슬립유지의 새로고침 후 저장 회귀,모바일/전면 미감 감사. 이 항목들을 PASS로 보고하지 않는다. 실제 거래와 외부 생중계 피드는 이번 범위가 아니다.

작업용 서버 종료,브라우저 tab15 공개 주소 유지·viewport복원 완료. 기존v4를 계속 보는 탭은 강력 새로고침이 필요할 수 있다. 다음 사이클/별도QA/보완안을 자동 시작하지 않는다.

## 증거·담당

- 입력: input/aldebaran-wog-layout-r5-package/ALDEBARAN_WOG_LAYOUT_R5/
- 입력SHA256: AD6BC93D071DB676668E8526B28C894ECF8CACC9D23D6BC53E99846506F4DA0A
- 입력/자산: runs/r5/coordination/intake.json,asset-intake.json
- 이전 네 문서 원문: runs/r5/coordination/previous-operating-documents.json
- 구현·결과 요약: runs/r5/public/completion.json
- 배포 원본 응답: runs/r5/public/publication.json
- 로컬 검증: runs/r5/implementation/basic-observation.json,build.log,typecheck.log
- 원천·보존: runs/r5/implementation/data-connection.json,preservation.json,source.json
- 공개 첫 화면: runs/r5/public/aldebaran-r5-initial-1920x1080.jpg (JPEG,1920×1080,194243bytes)
- 캡처SHA256: e18c1d9bb1ade67a77da25c3bbc590d19915113c6ce96210df2131d06350c8bd
- 공개 확인/배포용묶음: runs/r5/public/first-screen.json,archive.json
- 조정 최종 기록: runs/r5/coordination/final.json
- 기존 구현 담당01a0a97b-1268-7cf3-8aad-ba460ecf4f98는 source/Sites/검증/배포를 수행했다. 조정자는 네문서와 결과를 정리하고 저장된 공개1장을 확인했으며 앱검증·공개캡처를 중복하지 않았다.

도구 경로 복구 기록: 시작 source-open은 설치된Sites0.1.70을 사용했다. 진행 중 그 설치 경로가 사라져 남아 있던bundled0.1.57 절차로 검증된묶음과native save/deploy를 완료했다. 새설치/새등록은 하지 않았다. 상세는completion.json의toolingRecovery를 따른다.

---

## R4 이하 실제 완료 이력 — 아래 원문과 증거 경로 보존

# ALDEBARAN — CENTER R4 현재 상태

## 현재 결과

**CENTER R4와 미반영 HEADER R3.1 구현·한정 검증·동일 주소 PUBLIC v4 배포 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 배포 상태: succeeded / public
- 성공 시각: 2026-09-21 20:37:15 KST / 2026-09-21 11:37:15 UTC
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_6e57aa7f95ec8191bfaedd85dbf1f7d8 (v4)
- deployment: appgdep_6ab116da5c3081918b6b19b31fa3a645
- source commit: 2da6c55d2395beb2ae0046c8421aa4d3b4ddef08 / push succeeded / clean
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- **이전 중앙 비움 조건은 R4에서 해제했다.** 아래 R3 이하 완료 기록과 기존 증거는 원문으로 보존한다.

## 구현 결과

기존 중앙1280px 안에 632px 두 열과16px 간격을 적용했다. 왼쪽 단일 카드 열은 바깥 로고–안쪽 팀명–중앙VS/점수, 기본 배당2~3개로 구성했다. 경기 선택과 배당 선택은 독립된 형제 컨트롤이며, 좌우 같은 배당은 기존 선택ID와 슬립 action을 공유한다. 경기 전환으로 다른 슬립 선택을 지우지 않는다.

오른쪽은 선택 경기 트래커, 경기/통계/타임라인 세 탭, 실제 마켓 필터와 세부 배당 순서다. 공식 Sportradar 데모는 구조 참고로 직접1회 관찰했고, 구현은 자체 React/SVG/CSS와 안정적인 경기ID 기반 데모 보완이다. API/iframe/위젯 캡처를 사용하지 않았다. 축구 예정 경기는 필드와 대기 상태를 표시하고, 비축구는 해당 점수·이닝/쿼터·통계로 바뀐다. LIVE 상황은4초 주기의 제한된 데모 단계이며 원천 점수는 바꾸지 않는다.

헤더 R3.1은 브랜드 패딩0/레터링 중심142, 부모의 연속 중립 공지선, 선택 메뉴의 작은 사선 모서리·얇은 테두리, hover/focus 주황 표시를 적용했다. 총 높이104와 외곽 레일·프레임은 유지했다.

## 실제 데이터와 보완 구분

- 기존 원천77경기의 필드·점수·상태, 기존3마켓·배당ID 및 원천 JSON/이미지 바이트를 보존했다.
- LIVE는 야구3경기뿐이며 첫 유효 LIVE 야구 record-401816943을 기본 선택한다. 축구32/농구6은 예정 상태를 유지했다.
- 축구32경기에 전반 승무패와 첫 득점 팀(무득점 포함)2개씩, 총64개의 데모 추가 마켓만 보완했다.
- 실제 기록의0:3은 카드와 트래커에 표시됨을 확인했다. 실제 LIVE 야구는 단계가 변하는 동안6:3 점수 유지와 통계 탭에서 단계 정지를 확인했다.
- 실제 LIVE 축구 원천이 없어 해당 경기의 렌더 모션은 미검증이다. 별도의 메모리 계산1회에서0:3/63분에 맞는 이벤트·통계 일관성만 확인했으며 실제 피드/렌더 증거가 아니다.

## 앱 변경 파일 — 기존4개, 신규3개

- site/app/page.tsx — 중앙 목록/상세 마운트, 단일 경기 선택ID/필터 fallback, 기존 슬립·더보기/접기/맨위 연결
- site/app/layout.tsx — R4 중앙 CSS import
- site/app/demo-data.ts — 원천값/기존ID 유지, 축구 데모 추가 마켓2개 연결
- site/app/aldebaran-header-r2.css — 기존 파일명 유지, 미반영 R3.1 보정
- site/app/aldebaran-center-r4.tsx — 공유 팀/점수행, 자체 트래커/3탭/마켓필터·배당
- site/app/aldebaran-center-r4.css — 동등 두 열, 기존 색/폰트와 스크롤, 긴 이름·점수 공간
- site/app/tracker-demo.ts — 안정적인 경기ID 기반 데모 통계·이벤트·추가 배당

운영 네 문서와 runs/r4 입력·결과 기록을 갱신했다. 새 의존성/폰트/플러그인/이미지/테스트 스위트/독립 QA 작업은 추가하지 않았다.

## 한정 검증 결과

- 최종 build1회와 tsc --noEmit --incremental false: exit0. 콘솔 warning/error 기록0.
- 로컬1920×912: 중앙632+16+632, 레일 x12/296/1588 및 폭272/1280/320, 레터링 중심142. 최초 트래커 아래 첫 마켓 하단은 야구785/축구830.5로 화면 안에 완전히 노출됐다. 중첩 button0개.
- 좌측 기본 배당 선택→우측 동일 선택 상태, 경기 전환→트래커/점수/마켓 전환과 기존 슬립 유지, 우측 세부 배당→기존 슬립 추가를 확인했다.2.125 정밀도와 추가 마켓 선택도 확인했다.
- 예정 축구 필드/3탭/마켓필터, 농구에서 축구필드 제거, 검색 후 유효 선택 유지/0결과 양쪽 비움, 더보기12/접기6/맨위와 경기 선택 유지 확인.
- 긴 팀명/108:102는 TeamRow props만 일시 교체한 표시 검사다. 트래커 점수109.375px가96px칸을 넘는 문제를120px로 수정해 재확인했다. 카드94.34375px는96px칸에 수용. 전체 팀명 title과 말줄임 확인. 원천 데이터/저장값은 바꾸지 않았고 임시코드는 SHA256 일치로 복원했다.
- 음수 데모 통계는 unsigned seed 연산으로 수정했고, 미정/합계0 통계는 중립 막대로 정리했다.
- 공개 화면은 native 접근성 읽기와 실제1920×912 스크린샷1장으로 확인했다. 로컬의 정밀 DOM 수치를 공개에서 측정한 것으로 주장하지 않는다.

## 보존·미검증·남은 판단

MERCURY/SIRIUS HEAD·기존 dirty 상태·파일을 보존했다. 기존 레일·저장 namespace·계정/슬립 계산·폰트/로고/사진/배너/favicon·기존 모션 구현도 유지했다. 최신 첨부 레이아웃 이미지는 열거나 분석/픽셀 추출/전달하지 않았다.

실제 인증/베팅/금융 거래, 전체 슬립·세션 회귀, 모바일 재설계, 실제 스포츠 피드, 전 종목 상세 필드 애니메이션은 범위 밖이며 검증하지 않았다. 숨김 페이지/reduced-motion은 소스 lifecycle만 검토했고 브라우저 에뮬레이션은 하지 않았다. 실제 LIVE 축구 모션·공개 정밀 DOM·최종 시각 수용은 미검증/사용자 판단 사항이다.

작업용5287 서버 중지와 브라우저 viewport 복원 완료. 다음 부위/다음 사이클은 시작하지 않았다.

## 증거와 담당

- 기존 구현 담당: 01a0a97b-1268-7cf3-8aad-ba460ecf4f98 — 앱·Sites·참조 관찰·한정 검증·배포
- 오케스트레이션: 운영4문서·입력 보존·결과 요약. 별도 브라우저 감사/동일 테스트 반복 없음.
- 입력: input/aldebaran-center-r4-package/ALDEBARAN_CENTER_R4/
- 입력 검증12/12: runs/r4/coordination/intake.json
- 이전 네 문서 원문: runs/r4/coordination/previous-operating-documents.json
- 결과 요약: runs/r4/public/completion.json
- 배포 원본 응답: runs/r4/public/publication.json
- 로컬 관찰: runs/r4/implementation/basic-observation.json
- 데이터 연결·임시 표시·보존: runs/r4/implementation/data-connection.json, temporary-display.json, preservation.json
- 공식 구조 참고: runs/r4/implementation/reference-observation.json
- 공개 첫 화면: runs/r4/public/aldebaran-r4-initial-1920x912.jpg (1920×912,158036 bytes)
- 공개 캡처 SHA256: 79A6F6599D6B4D42F1E4B4B401FAF623B10F3B04A9584E1422EBAB1F386071B3
- 공개 확인: runs/r4/public/first-screen.json, capture.json
- 최종 조정 기록: runs/r4/coordination/final.json
- 시간 표기: completion.json의 successUTC 값은 +09:00 offset 문자열이므로, 위 UTC는 원본 publication 응답을 UTC로 변환해 기록했다.

---

## R3 이하 완료 이력 — 아래 과거 실제 기록과 증거는 원문 보존

# ALDEBARAN — HEADER R3 현재 상태

## 현재 상태

**HEADER R3 구현·기본 확인·동일 주소 PUBLIC v3 배포 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 배포 결과: succeeded / 접근 공개
- 성공 시각: 2026-09-21 19:43:49 KST (2026-09-21 10:43:49 UTC)
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- 현재 R3 방향은 사용자 입력 기준이며 실제 공개 결과의 최종 디자인 수용은 사용자 피드백 대기다. 다음 부위나 다음 사이클은 시작하지 않았다.

## 변경 결과

헤더의 엠블럼 DOM만 제거하고 승인 레터링 원본을 축소·중앙 정렬했다. 브랜드 오른쪽과 전체 높이 주황선은 왼쪽 레일 외곽 끝에 맞췄다. 공지는 NOTICE/본문 텍스트 한 줄로 줄였고 장식 아이콘은 제거했다. 일곱 메뉴는 중앙 콘텐츠 폭 안에, 기존 계정 버튼은 같은 아래 행의 오른쪽 레일 위에 배치했다. 현재 비대칭 2단 구성·색상·버튼 표현·상태와 핸들러를 유지했다.

본문 값은 바꾸지 않고 같은 CSS 변수를 헤더 grid와 공유했다. 좌표 보정 JavaScript, resize listener, 눈대중 transform, 잘라 숨기는 overflow는 추가하지 않았다. 헤더 전용 기존 CSS 파일명은 유지하고 충돌하는 R2 규칙을 교체했다.

## 앱 변경 파일 — 기존 3개

- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/page.tsx — Header wordmark only, notice text only, existing account branch moved beside menu; unused Bell import removed; other body code unchanged
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-header-r2.css — Existing stylesheet retained; shared grid tracks align wordmark/divider, 28px notice, seven menu buttons and right account controls; header remains 104px
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/globals.css — Existing body dimensions represented by shared CSS variables: edge12 gap12 center1280; left272 right320 unchanged

추가 앱 파일은 없다. root 네 운영 문서는 R3 변경분을 병합했고 과거 실제 완료 기록은 아래와 DECISIONS에 유지했다. 엠블럼 파일/favicon, 레터링 원본, 폰트·사진·배너, 레일 내용과 슬립, 기존 데이터/저장 키/기능, 빈 중앙은 보존했다.

## 실제 정렬 — 로컬 1920×912에서 측정

| 항목 | 확인값 |
| --- | --- |
| 총 헤더 | 높이 104px 유지 |
| 공지 / 아래 메뉴·계정 행 | 28px / 76px |
| 브랜드 오른쪽 / 왼쪽 레일 오른쪽 | 모두 x=284 |
| 주황선 | 폭1px, 높이104px, top0/bottom0, 오른쪽 경계284 |
| 레터링 | 216×23.53125px, x40/y40.234375, 원본 비율/필터 없음 |
| 레터링 가로 중심 | 40+216/2=148, 레일 중심 (12+284)/2=148 |
| 헤더 엠블럼 / 공지 아이콘 | 각각 DOM 0개 |
| 공지 | 1개, 글자12px, 텍스트 클릭 동작 보존 |
| 메뉴 영역 | x296~1576, 폭1280, 일곱 메뉴 |
| 메뉴 버튼 | 높이42px, 너비 약172.57px, 사이간격8px |
| 이벤트 hover 버튼 | 오른쪽1563.984375 ≤ 중앙끝1576, 전체 상자 포함 |
| 계정 영역 | x1588~1908, 폭320, 아래 행 y28~104 |
| 회원가입 오른쪽 끝 | x1908, 오른쪽 레일 끝과 일치 |
| 본문 | x12/296/1588, 폭272/1280/320, y116/높이784 유지 |
| 중앙 main | 자식0개 유지 |

브라우저 서브픽셀 반올림을 포함한 관측값이다. 구현 시작값과 실제 로컬 측정, 사용자 최종 미감 승인은 구분한다.

## 실제 확인 범위

- npm run build: exit0. 증거 runs/r3/implementation/build.log.
- TypeScript tsc --noEmit --incremental false: exit0. 무출력 성공이며 별도 로그 파일은 없다.
- 레터링 중심·비율, 주황선 경계/상하 접점, 공지와 계정 분리, 일곱 메뉴/이벤트 실제 hover 상자, 본문 위치·빈 중앙 확인.
- 대표 스포츠 메뉴 전환 후 실시간 스포츠로 복귀, 옮긴 공지의 기존 모달, 계정의 기존 로컬 데모 로그인/로그아웃 분기 확인 후 게스트 초기 상태로 복원.
- 로컬 브라우저 warn/error 로그 없음. 실제 인증·금융 거래는 하지 않았다.
- 구현/확인 뒤 작업이 배포 전에 종료되어 동일 담당에 남은 배포만 재개했다. 기술적 차단은 없었으며 추가 소스 수정이나 이미 통과한 검사 반복 없이 같은 결과를 배포했다.

## 공개 확인과 제한

같은 Site의 PUBLIC v3 succeeded를 확인했고 native 브라우저 접근성 정보와 실제 시각 캡처로 새 헤더 및 본문 보존 상태를 확인했다. **공개 정밀 DOM 좌표는 조회하지 않았다. 위 정확한 치수는 로컬 근거다.**

- R3 최초 공개 화면 정확히1장: runs/r3/public/aldebaran-r3-initial-1920x912.jpg
- 크기: 1920×912, 83,921 bytes, JPEG
- SHA-256: 741BA06A717596AE025C792138FE271406D5B60A737735AC83BC815AAC148CE7
- 오케스트레이션은 이 한 장을 재사용해 결과를 확인했으며 별도 감사나 추가 캡처를 하지 않았다.
- 기존 브라우저 탭을 재사용하고 viewport를 복원했다. 구현 담당이 직접 시작한 5287 서버만 종료했다.

## 배포 식별자와 보존

| 항목 | 값 |
| --- | --- |
| 시작 HEAD | 1f46b8a2daab755bfcad99d258e7c970a3177c19, clean |
| 최종 commit | f036dc20bdf5d9ddbd00e809690261e49345d3b1, push succeeded, clean |
| Project | appgprj_6ab0f3255cdc819180a427bf6d0846f4 |
| Version | appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_f49c675bd16c8191a9bd8fe265b14a12 |
| Deployment | appgdep_6ab10a4e1ff08191ad6ba7b60b2f0e4c |
| 상태/접근 | succeeded / public |
| 성공 시각 | 2026-09-21 19:43:49 KST |

MERCURY/SIRIUS의 기존 HEAD·dirty 및 1842개 보호 파일 해시 보존 기록을 확인했다. 두 기존 사이트는 수정하거나 재배포하지 않았다. ALDEBARAN 본문 값·빈 중앙·폰트/자산 원본·기능/데이터는 보존했다.

## 입력과 증거

- 입력 ZIP: D:/WebDL/ALDEBARAN_HEADER_R3.zip
- ZIP SHA-256: 3E326BE9DAD8946F9188A4A82C0E556022738B98E74E8F64A501ABC646EB599D
- 원본: input/aldebaran-header-r3-package/ALDEBARAN_HEADER_R3/
- 매니페스트15개 해시 일치, 기존 wordmark 원본 동일. 다섯 참고 이미지는 설명/정렬 자료로 확인했고 가이드선을 새 UI로 복제하지 않았다.
- 이전 네 문서: runs/r3/coordination/previous-operating-documents.json
- 접수/진행/재개 기록: runs/r3/coordination/intake.json, dispatch.json, resume.json
- 시작 기준점: runs/r3/implementation/baseline.json
- 로컬 결과: runs/r3/implementation/basic-observation.json
- 보존 결과: runs/r3/implementation/preservation.json
- 배포 원본 응답: runs/r3/public/publication.json
- 공개 첫 화면: runs/r3/public/first-screen.json
- 최종 상세 결과: runs/r3/public/completion.json

기존 구현 작업 01a0a97b-1268-7cf3-8aad-ba460ecf4f98이 앱·Sites·기본 확인·배포를 맡고, 오케스트레이션 01a0a8e7-acda-7ab0-a42a-44beb1b41e50이 운영 문서·입력·결과 정리를 맡았다.

## 미검증·남은 판단

- 요청된 범위에서 남은 구현 장애는 보고되지 않았다. 실제 공개 디자인 수용은 사용자에게 남긴다.
- 공개 정밀 DOM 치수, 모바일, 전체 로그인/세션 조합, 전체 슬립/계산/거래, 중앙 카드·트래커·전체 모션은 확인하지 않았다.
- 별도 QA 작업, Jev, 다섯 디자인 명령, 전체 폴리싱, 새 테스트 파일/라이브러리/폰트/이미지 생성·설치는 하지 않았다.
- 중앙 구현이나 레일 개편으로 자동 진행하지 않는다.

---

## R2 및 R1 완료 이력 — 아래 실제 기록과 증거는 과거 완료본으로 보존

# ALDEBARAN — HEADER R2 현재 상태

## 현재 상태

**HEADER R2 구현·기본 검증·같은 주소 PUBLIC v2 배포 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 공개 버전: v2, PUBLIC / deployment succeeded
- 배포 성공 시각: 2026-09-21 18:47:07 KST
- 기존 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- 신규 복제·프로젝트 등록 없이 기존 ALDEBARAN에 적용했다.
- 1번 비대칭 헤더 방향과 현재 배색은 입력 문서의 승인 기준이다. 이번 실제 공개 결과의 미감 수용은 사용자 피드백 대기이며 후속 작업은 시작하지 않는다.

## R2 실제 변경

왼쪽 브랜드가 두 행 전체 높이를 차지하고 오른쪽 위에 기존 공지·계정 버튼, 아래에 기존 일곱 메뉴를 배치했다. 공지 노드/핸들러를 이동해 옛 별도 공지 행과 빈 공간을 제거했다. 기존 메뉴 상태·클릭·계정 로그인 분기·브랜드 목적지를 재사용했고 선택 메뉴는 주황 단색/짙은 글자로 표시한다. 헤더 높이는 한 변수로 부모 flex 가용 높이에 반영했다.

앱 변경은 세 파일이다. page.tsx에서 Header 함수 밖 내용은 동일하며 기존 레일·빈 중앙·배너·폰트·배색·로고 바이트·저장 키·데이터·계산·모션은 유지했다.

- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-header-r2.css
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/layout.tsx
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/page.tsx

운영 네 문서에는 R2를 우선 병합했고 아래 R1 실제 완료·배포 기록을 원문 보존했다. 원본 패키지와 문서 백업은 input/runs 안에 보관한다.

## 로컬 실제 치수와 동작

| 항목 | 확인값 |
| --- | --- |
| 확인 viewport | 1920×912, 기존 높이 유지 |
| 헤더 | 1920×104 |
| 브랜드 영역 | 344×104 |
| 오른쪽 상단 / 하단 | 1576×46 / 1576×58 |
| 엠블럼 / 워드마크 | 44×44 / 248×27.015625, 원본 비율/필터 없음 |
| 메뉴 | 기존 순서 7개, 각 180×42, 간격 8 |
| 공지 | 1개, 옛 noticebar 0개 |
| 좌/중앙/우 | x 12/296/1588, 폭 272/1280/320 유지 |
| 내용 시작/가용 높이 | y116 = 헤더104+여백12, 높이784 |
| 중앙 main | 자식 0개 유지 |

- npm run build: exit 0.
- tsc --noEmit --incremental false: exit 0.
- 스포츠 메뉴로 전환 후 실시간 스포츠 복귀, 비어 있지 않은 검색어와 금액 입력값 유지 확인.
- 이동한 공지가 기존 공지 모달을 여는 것 확인.
- 기존 로컬 데모 계정의 로그인/로그아웃 분기 연결 확인 후 게스트로 복귀. 실제 인증·금융 거래는 수행하지 않았다.
- 로컬 브라우저 warn/error 로그 없음. 로고 잘림과 공지 중복/옛 빈 띠 없음.

## PUBLIC 확인과 한계

같은 Sites 프로젝트의 v2 deployment succeeded를 확인했다. 공개 최초 화면에서 native 접근성 정보와 시각 캡처로 새 비대칭 헤더, 로고, 일곱 메뉴, 공지/계정 및 빈 중앙을 확인했다. PUBLIC DOM bridge가 null을 반환하여 공개 정밀 DOM 측정은 하지 못했다. 위 치수는 로컬 측정값이며 공개 재측정 PASS로 기록하지 않는다.

- 최초 공개 화면: runs/r2/public/aldebaran-r2-initial-1920x912.jpg
- 저장한 R2 공개 캡처: 정확히 1장, 1920×912
- SHA-256: 82eb7ec724ec206a69d53262f21f6b7e45d0a4cbd6a33c1d5159622d0c98371d
- 최초 불완전 캡처는 저장하지 않았고 viewport 재적용 후 정상 전체 화면만 보존했다. 오케스트레이션은 이 캡처를 읽고 추가 캡처/감사를 하지 않았다.

## 버전과 보존 결과

| 항목 | 값 |
| --- | --- |
| 시작 HEAD | 676aeaafceeb820d23b5af2b23f8e4179daee380, clean |
| 최종 commit | 1f46b8a2daab755bfcad99d258e7c970a3177c19, clean |
| Project | appgprj_6ab0f3255cdc819180a427bf6d0846f4 |
| Version | appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_5bc4085716808191857fa382ec722d8a |
| Deployment | appgdep_6ab0fd087e1c81919d7561e095b2f5b5 |
| 성공 시각 | 2026-09-21 18:47:07 KST |

MERCURY/SIRIUS의 HEAD·기존 dirty 상태와 보호 파일 1842개 해시를 보존했다. 기존 두 사이트는 수정/재배포하지 않았다. ALDEBARAN에서 헤더 밖 페이지 내용과 테마·로고·배너·데이터 파일은 보존했다.

## 입력·담당·증거

- 입력 ZIP: D:/WebDL/ALDEBARAN_HEADER_R2.zip
- ZIP SHA-256: 916C9D287F141223616224CB1E011C45412159DCE34BB7654AB996F60FF9F049
- 원본: input/aldebaran-header-r2-package/ALDEBARAN_HEADER_R2/
- START_HERE → AGENTS → STATE → DESIGN_SPEC → DECISIONS 순서 확인. 매니페스트 11개 해시와 기존 승인 PNG 2개 동일 확인; 재복사하지 않았다.
- 구현 담당: 기존 작업 01a0a97b-1268-7cf3-8aad-ba460ecf4f98. 앱·Sites·빌드·변경 헤더 확인·배포.
- 오케스트레이션: 01a0a8e7-acda-7ab0-a42a-44beb1b41e50. 입력·운영 네 문서·결과 정리.
- runs/r2/coordination/intake.json: 입력 검증/적용 경로
- runs/r2/coordination/previous-operating-documents.json: R1 최신 네 문서 원문
- runs/r2/implementation/baseline.json: 시작 HEAD/dirty/보호 파일 기준점
- runs/r2/implementation/build.log: 빌드 출력
- runs/r2/implementation/basic-observation.json: 로컬 실측/대표 조작/콘솔
- runs/r2/implementation/preservation.json: 변경/보호 대상 확인
- runs/r2/public/archive-validation.json: 배포 아카이브 검증
- runs/r2/public/first-screen.json: 공개 화면 확인
- runs/r2/public/completion.json: 최종 결과·배포·보존·미검증 항목

## 남은 판단·미검증

- 요청된 확인 범위에서 남은 구현 장애는 보고되지 않았다. 미감 판단은 사용자 피드백을 기다린다.
- PUBLIC 정밀 DOM 측정은 위 도구 제한으로 미검증이며 화면/접근성 확인과 구분한다.
- 모바일, 전체 로그인/세션 조합, 전체 슬립·계산·거래 회귀, 중앙 카드·트래커·전체 모션은 범위 밖으로 재검증하지 않았다.
- 별도 QA 작업/Jev/전면 폴리싱/새 이미지·아이콘/새 라이브러리는 수행하지 않았다.
- 중앙 카드·트래커와 레일 개편으로 자동 확장하지 않는다.

---

## R1 완료 이력 — 아래 기록과 증거는 과거 완료본으로 보존

# ALDEBARAN — 현재 상태와 실행 기록

## 현재 상태

**FRAME R1 구현·기본 검증·별도 공개 배포 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 공개 버전: v1, PUBLIC / 배포 상태 succeeded
- 배포 성공: 2026-09-21 18:15:16 KST
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- 앱 제목: ALDEBARAN · 스포츠
- 사용자 미감 승인은 미확정. 자동으로 다음 회차를 시작하지 않는다.

## 이번 결과

최신 현지 MERCURY 프레임을 별도 앱으로 복제하고 승인 로고 2개, 무광 차콜·주황·흰색 UI를 적용했다. 헤더·공지·좌우 레일의 구조, 기존 폰트·사진·조작·스크롤 체계를 유지했다. 중앙 main은 자식 0개와 빈 텍스트로 렌더하며 안내 문구나 스켈레톤이 없다. **빈 중앙은 R1 정상 완료 조건이다.**

- 승인 PNG를 바이트 그대로 사용했다. 표시값: 엠블럼 36×36px, 워드마크 208×22.65625px. 원본 400×400 / 1101×120 비율과 알파 여백을 보존했다.
- 메타데이터·브랜드 접근성 이름·favicon·저장 키·Sites 프로젝트·소스 저장소를 분리했다. 기존 사용자 저장값은 삭제하거나 이관하지 않았다.
- 기존 중앙 데이터·모션 모듈은 보존하고 중앙 JSX·BackToTop은 마운트하지 않는다. 중앙 전용 실행은 중단했다.
- 기존 금색 종목 PNG에만 grayscale(1)을 적용했다. 브랜드·사진에는 필터가 없다.

## 입력과 담당

- 입력: D:/WebDL/ALDEBARAN_FRAME_R1.zip
- 입력 SHA-256: 9684DAD3610529EF95642046988EA0C6F4F49EFA11959E5AF64DCF82796F4C20
- 원본 보존: input/aldebaran-frame-r1-package/ALDEBARAN_FRAME_R1/
- START_HERE → AGENTS → STATE → DESIGN_SPEC → DECISIONS 순서로 확인했다. 매니페스트 15개 파일 SHA-256이 일치했다.
- 새 sports-demo-03은 시작 전에 존재하지 않았다. 운영 문서는 AGENTS / STATE / DESIGN_SPEC / DECISIONS 네 개만 사용한다.
- 구현: 기존 작업 「스포츠 데모 01 대표 UI 제작」, 01a0a97b-1268-7cf3-8aad-ba460ecf4f98. 앱·Sites·빌드·기본 확인·배포 담당.
- 오케스트레이션: 01a0a8e7-acda-7ab0-a42a-44beb1b41e50. 접수·운영 문서·결과 정리 담당. 공개 캡처 1장을 재사용해 결과를 읽었으며 추가 감사/캡처는 하지 않았다.

## 원본과 보존 결과

| 대상 | 시작/종료 HEAD | 기존 미커밋 상태 | 결과 |
| --- | --- | --- | --- |
| MERCURY sports-demo-01 | ba0e578207f39d8e59ef72859c0e50fecf4f067b | untracked tsconfig.tsbuildinfo | HEAD·dirty·파일 보존 |
| SIRIUS sports-demo-02 | 9c424b8e4e8c480848f1ec47bf5139c6d5987738 | untracked .agents/, .impeccable/, DESIGN.md, PRODUCT.md | HEAD·dirty·파일 보존 |

구현 담당이 원본 소스·문서·자산의 1842개 파일 해시를 비교했고 변화/추가가 없었다. 두 기존 공개 사이트는 재배포하지 않았다. 새 앱은 .git·node_modules·빌드/캐시·비밀 환경파일·기존 hosting 연결을 복제하지 않았다. 새 저장소는 최종 clean 상태다.

## 실제 변경 파일

아래는 MERCURY 복제본 대비 앱 변경 파일이다. root 운영 문서 네 개와 input/runs 기록은 이 신규 프로젝트 안에 별도로 추가·갱신했다.

- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/layout.tsx
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/page.tsx
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/demo-data.ts
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-frame.css
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran.tokens.css
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran.surfaces.css
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/public/assets/branding/aldebaran-emblem.png
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/public/assets/branding/aldebaran-wordmark.png
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/.gitignore
- E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/.openai/hosting.json

기존 package.json/lockfile, 폰트 런타임, match-motion.tsx, motion.css, typography.css, match-records.json, live-snapshots.json은 원본과 동일하다. demo-data.ts의 변경은 저장 키 분리다.

## 검증 결과

- npm run build: exit 0.
- tsc --noEmit --incremental false: exit 0.
- 로컬 1920×940 화면: 헤더 68px / 공지 32px, 좌측 272px / 중앙 1280px / 우측 320px. 로고 로딩·비율·헤더 잘림 없음, 차콜/주황 표면과 레일 배치 확인.
- 메뉴 1회, 종목 필터·검색·초기화, 슬립 금액 입력·초기화 확인. 조작 후 main 자식 0개, 가시 텍스트 없음, BackToTop 없음. 무선택 슬립의 제출 버튼 비활성 유지.
- 로컬 브라우저 warn/error 로그 없음.
- 별도 PUBLIC 배포 succeeded 및 공개 첫 화면 DOM·시각 확인. 제목 ALDEBARAN · 스포츠, 두 PNG 로딩, main 자식 0개 확인.
- 공개 캡처 1장: runs/r1/public/aldebaran-r1-initial-1920x940.jpg
- 캡처 SHA-256: a1307ec38a2ab870ab5436ec53b9845d4bfdcf513b81cb4662b58cb49bd5b498

## 배포 식별자

| 항목 | 값 |
| --- | --- |
| URL | https://aldebaran.kexxadrix.chatgpt.site/ |
| Project | appgprj_6ab0f3255cdc819180a427bf6d0846f4 |
| Commit | 676aeaafceeb820d23b5af2b23f8e4179daee380 |
| Version | appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_cf0bf6e1f38881918ef8fadd822e46df |
| Deployment | appgdep_6ab0f5891b2c8191becd5839e2933f29 |
| 완료 시각 | 2026-09-21 18:15:16 KST |

## 증거 경로

- runs/r1/coordination/intake.json: 압축·경로·매니페스트 검증
- runs/r1/implementation/baseline.json: 원본 기준점과 보호 대상 해시
- runs/r1/implementation/logo-copy.json: 승인 로고 바이트 보존
- runs/r1/implementation/build.log: 빌드 출력
- runs/r1/implementation/basic-observation.json: 로컬 화면/대표 조작/콘솔
- runs/r1/implementation/changes-and-preservation.json: 변경 파일·빌드/타입 결과·보존 검증
- runs/r1/public/archive-validation.json: 배포 아카이브 내용 확인
- runs/r1/public/first-screen.json: 공개 첫 화면 DOM/시각 확인
- runs/r1/public/completion.json: 구현 담당의 최종 결과와 배포 식별자
- runs/r1/coordination/state-before-final.json: 최종 갱신 직전 진행 상태 보존

## 해결한 실행 문제

- 최초 작업 전송이 실행 결과 없이 종료되어 같은 담당에 재개 지시했고 정상 진행했다.
- 최초 Git push HTTP 500은 원격 미반영 확인 후 재시도로 해결했다.
- 실행 중 Sites 0.1.65 파일 경로가 소실되어 남아 있던 공식 bundled Sites 0.1.57 패키징 helper를 읽고 사용했다. 아카이브 검증과 실제 배포가 성공했다. 이 경로 변화는 향후 Sites 작업 시작 시 현지 설치 상태를 다시 확인할 사항이다.
- 첫 screenshot wrapper의 오래된 화면 응답은 채택하지 않고 문서화된 브라우저 screenshot API로 확인된 첫 화면 1장만 저장했다.

## 남은 판단과 미검증

- 확인 범위 안에서 남은 구현 결함은 보고되지 않았다. 최종 미감·로고 표시 크기 승인은 사용자 피드백 대상이다.
- 모바일, 전면 회귀, 배당 곱셈, 실제 베팅 제출, 트래커, 전체 모션, 전 종목·전 상태는 이번 확인 범위에서 제외했다.
- 별도 QA 작업, Jev, 전면 감사, 다섯 디자인 명령, json-render 설치, 이미지 생성은 실행하지 않았다.
- 공개 확인은 첫 화면에 한정된다. 대표 조작 검증은 로컬 구현에서 수행했다.

## 다음 회차 방향 — 실행하지 않음

- 중앙 왼쪽 경기 카드 / 오른쪽 선택 경기 트래커 구성을 후속 지시로 검토한다.
- 트래커 아래 상세 시장과 연동 범위는 후속에 확정한다.
- 입력 references/02-future-central-layout.png, 03-future-match-tracker.png와 DESIGN_SPEC의 참조 URL은 미래 참고로만 보관한다.
- 헤더·레일 구조 개편은 별도 사용자 피드백 후 진행한다.

---

# ALDEBARAN R6 — 인계 상태

- 사용자 보고: R5 구현이 완료됐다.
- 새 피드백: 배당2자리, 예정 경기 VS, 팀명 확대/엠블럼 복구/홈 표식 숨김, 로고 잘림 수정, 헤더 시각 효과 보류, 국내형/해외형만 전환, 국내형2열 공동 스크롤.
- R5가 최종 규격 통과했다는 승인은 아직 없다. MERCURY/SIRIUS 이식은 대기한다.
- 본 패키지는 사용자 피드백과 이전 R5 계약을 근거로 만든 변경 지시서다. 최신 공개 화면 재실측, 현지 소스 확인, 원인 진단, 구현·빌드·배포는 이 자료 작성 단계에서 수행하지 않았다.
- R6는 지시 패키지 번호다. 기존 실제 버전·commit·deployment ID는 현지 기록을 보존하고 완료 후 실제 값만 추가한다.

## 구현 순서

1. 현재 소스/운영 문서와 배당 formatter, 카드, 헤더, mode/스크롤 상태 위치를 읽는다.
2. 배당 표시·예정 데이터·팀 행과 로고 잘림을 필요한 부분만 수정한다.
3. 현재 해외형을 보존하면서 국내형 공동 scroller와 2열 카드 grid를 추가하고 GNB 두 항목만 연결한다.
4. 기존 빌드 한 번과 아래 짧은 확인 후 기존 ALDEBARAN 배포 흐름을 따른다.

## 변경 확인

별도 QA 스레드가 아니다. 이미 빌드에 포함된 타입 검사를 다시 반복하지 않는다.

- 해외형/국내형1920 초기 화면 각1장: 로고 전체, 확대된 팀명·양쪽 엠블럼·VS, 배당 두 자리.
- 해외형 오른쪽만 스크롤해 왼쪽 위치 유지 확인 → 국내형에서는 어느 열 위에서 내려도 양쪽이 함께 움직이는지 확인.
- 국내형→해외형 전환으로 목록/선택 경기 위치 복원, 슬립/입력금액 유지 확인.
- 두 모드에서 기본 배당 선택/해제 대표1회, 국내형에 상세 진입 버튼이 없고 GNB 나머지 항목이 이동하지 않는지 확인.

헤더 효과 재설계, 전체 미감 재감사, 다른 사이트 수정, 실베팅 제출은 수행하지 않는다. 최종 미감/규격 통과 여부는 사용자 판단으로 남긴다.


## 현지 R6 적용 완료 — 2026-09-22

- START_HERE부터 지정 순서로 읽고 패키지 7파일의 바이트·SHA-256을 확인했다. 기존 R5에만 증분 적용했으며 운영4문서의 이전 원문은 runs/r6/implementation/previous-operating-documents.json에 보존했다.
- 소스 변경5파일: app/aldebaran-wog-r5.tsx(공통 카드, 팀 엠블럼, 모드/검색/스크롤, GNB), app/aldebaran-wog-r5.css(팀15px·28px 엠블럼·56px VS·국내2열·로고클립), app/demo-data.ts(예정61경기 파생·배당2자리), app/page.tsx(개별/총배당 원값 기록과 표시), app/wog-service-views.tsx(레일 진입점·배당 안내).
- raw fixture77개와 모든 마켓/선택ID/DEMO정책은 R5와 일치. state=pre이고 미종료인61개만 두 모드에서 사용한다. 원래 수집된 정적 데모 일정이며 실제 최신 일정/중계를 의미하지 않는다. 야구 예정 데이터는0개라 카운트0을 유지했다.
- 기존 로고 SHA-256이 동봉 승인 원본과 일치. 자연크기1101×120, 표시182×19.828. 부모220×62의 사선clip이 마지막 글자를 잘랐으며 동일 장식의 pseudo-element에만clip을 옮겨 원본/헤더크기를 유지했다.
- 국내형 카드587×228·열간30·팀행38·기본배당36, 리그별 행 우선 배치.61ID 중복0·실제 중앙scroller1·상세버튼0·종목바1. 해외형 중앙scroller2 유지.122팀로고 로드 성공.
- 로컬 대표 동작: 해외 오른쪽224 이동 시 왼쪽0. 다른 경기 선택 후 왼쪽407/오른쪽0. 이후407/224→국내0→국내407/815→해외407/224와 선택경기 복원. 국내 재진입815. 선택ID와 입력5,000 유지. 두 모드 선택/해제, 비활성 GNB 클릭/Enter/Space 무이동 및 Tab 시8항목을 건너 로그인으로 이동 확인. 국내 검색 바이에른1경기/카운트1. 콘솔error0.
- 배당예:3.243→3.24,3.246→3.25,3.2→3.20,2→2.00. 원값2.125×2.125=4.515625→4.52; 5,000원 기준 예상22,578원은 R5와 동일. 기존 기록은 보존하고 새 기록은 개별/총배당 원값을 저장한다.
- 최종 타입검사/빌드 통과. 최초 성공 빌드 뒤 기록의 원값 보존과 잘못된 배당 표시 처리를 보완하여 빌드를1회 더 수행했다(총2회). 재귀 formatter 반환 타입 오류는 명시적 string으로 수정한 뒤 최종 타입검사 통과. 새 테스트 스위트/별도QA/Jev/추가설치/이미지생성 없음.
- commit300cc605df9bb846cdeac5333dccb2aef2fec226. 실제 PUBLIC v6, version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_0b8459b229ec8191a993261e2868df50, deployment appgdep_6ab20da4b960819190f6d4ed9462ab39, succeeded 2026-09-22T05:10:17.416163+00:00. 기존 project/공개범위/주소 https://aldebaran.kexxadrix.chatgpt.site/ 유지.
- 공개 canonical URL에서 해외/국내 각각1920×1080 초기화면1장 저장. 공개61카드·2/1 scroller·8비활성·이미지오류0 확인. 경로 runs/r6/public/aldebaran-r6-european-1920x1080.jpg 및 aldebaran-r6-domestic-1920x1080.jpg.
- 확정 미완료 없음. MERCURY/SIRIUS, 원본 이미지/폰트, 미요청 헤더 시각 효과는 변경하지 않았다. 실거래/전체 인증·서비스 회귀/모바일/최종 미감 승인은 검사하지 않았으며 사용자 판단으로 남긴다. 상세 근거 runs/r6/public/completion.json.
