> 최신 완료 기준(2026-09-28): 상단 공지사항·이벤트게시판·출석체크·고객센터·이용규정의 아이콘 5개만 #FCD73E로 변경. PUBLIC v23 / source 6be8c176b374999501952d24520c8411b29b153f / 11:15:59 KST 같은 공개 주소 배포 succeeded. 아래 이전 본문은 원문 보존 이력이다.

- .ab5-notice-links svg의 color 한 속성만 추가. 기존 기본 텍스트 #F5F4F4 및 hover #FF641F, 아이콘12×12px/내부gap4px/메뉴gap14px/폰트·위치·기능 유지.
- 로컬1920·100%에서 5개 기본/hover color·stroke와 전후 geometry 및 실제 화면 확인. npm build1회 exit0, console error/warn0. 공개 브라우저 재검수와 사용자 탭 리로드는 하지 않았다.
- URL https://aldebaran.kexxadrix.chatgpt.site/ / deployment appgdep_6ab9cdcd29b88191901e97dcc6438c3e / version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_b18020b377348191b72cf159dde3bda5. 로컬·원격HEAD·저장SHA 일치, 작업 트리 clean.
- 작업 중 Sites helper 경로가 없어져 기존 Git/tar와 공식 Sites credential·save/deploy로 복구 배포했다. 원격 parent·승인1파일diff·build/archive 동일 소스 확인, credential은 메모리/stdin에만 사용. 재설치·새 배포시스템 없음. helper 설치 부재는 남아 있으므로 다음 배포 때 현재 경로 확인 필요.
- AGENTS 규칙 변경 없음. 거래·슬립·모바일·전체회귀 등 무관 검사 미실행. 기존 build 경고3종 유지. 범위 내 미완료 없음, 사용자 시각 승인 별도, 자동 후속 작업 없음.
- 보고서 CHANGE_REPORT_UTILITY_ICONS_20260928.ko.md. 증거 runs/utility-icon-color-20260928/implementation/completion-report.json, final-publication.json, after-1920.png 및 coordination/final.json.

---

> 최신 완료 기준: 노란색 UI·0경기 종목 추가 패키지 및 후속 상단 종목 호버 수정 완료. PUBLIC v22 / source fd3356b6b2814b269c81e3bec3112ff999a1570b / 2026-09-23 19:23:25 KST 배포 succeeded. 공개 주소 https://aldebaran.kexxadrix.chatgpt.site/ . 아래 기존 본문은 원문 보존 이력이며 이 기록과 CHANGE_REPORT_YELLOW_SPORTS_20260923.ko.md가 현재 결과다.

- LV/BET 노랑·검정, 비활성 베팅하기 opacity 1 및 기존 차단 유지, 선택·호버 종목 테두리/선택 숫자 칩 노랑 완료.
- 신규 포뮬라1·복싱·MMA·모터스포츠를 상단/좌측 공용 목록에 0경기로 추가. 크리켓은 실제 초과 폭 때문에 제외. 5종 원본 보존.
- 가용 1226px, 후보 5종 1252.171875px(26.171875px 초과), 최종 4종 1138px(88px 여유). 선택 34px override 제거로 공통 32px; 기타 치수 유지.
- 로컬 1920·100% 빈 상태/복귀/슬립·10,000원 보존/비활성 입력 차단/3상태 호버 통과. 공개 금액 미입력·정상·초과 활성 조건 확인과 원복 완료, 실제 제출 0. 타입/최종 build 통과.
- 경기 데이터 61건 및 SHA 보존, 최종 앱 작업 트리 clean. AGENTS 수정 없음.
- deployment appgdep_6ab3a88631f48191b53b76813ca4a2b6. version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_324986d32fcc819190c5376d6e1b27eb.
- 증거 runs/yellow-sports-20260923/implementation/completion-report.json, final-publication.json, public-final-1920.png 및 coordination/final.json.
- 범위 내 미완료 없음. 모바일/전체 회귀/실거래 미실행, 사용자 시각 승인 별도. 기존 build 경고 3종 유지. 다음 피드백 대기.

---

> 최신 최종 기준: 국가·리그 구분 이름의 폰트 크기를 12px→14px로 변경하여 우측 상세 경기 제목의 실제14px와 일치시켰다. PUBLICv21/source5b4a1476d757871932cd3378db8da9b9f266a6d0, 배포succeeded 2026-09-23 18:15:16KST. CSS1파일font-size속성만추가. #FCD73E/웨이트800/line18/헤더39/카운트10/국기치수/화살표/다른제목/SPORTS-LIVE1px유지. 로컬1920·100% 8헤더일치/잘림없음 및 build통과. 증거 runs/league-header-color-20260923/implementation/title-size/completion-report.json. 아래 이전기준은 보존 이력이며 다음 피드백을 기다린다.

> 최신 직접 지시: 노란 국가·리그 구분 이름의 글자 크기만 우측 상세 경기 제목과 같게 맞춘다. 실제 computed font-size 확인 후 적용한다. #FCD73E·웨이트·박스/간격·국기/카운트/화살표·카드내리그명·우측제목 및 다른 요소는 유지한다. 현재 구현·배포 진행 중.

> 최신 최종 기준: 사용자 확인 후 리그 구분 헤더 텍스트를 #FCD73E로 정정 완료(PUBLICv20/source14a1fd33b5c84912bd9d9ebc285557d4aa2632ab). #F1B000 지시는 이전 이력이다. CSS 색상 한 값만 변경했고 SPORTS/LIVE 1px보정 등 다른요소 유지. 로컬8헤더색상·실제화면·주변요소보존/필수build 통과. 같은공개주소배포 succeeded 2026-09-23 18:08:34KST. 증거 runs/league-header-color-20260923/implementation/final-color/completion-report.json. 다음피드백대기.

> 최신 사용자 확인 후 수정: 국가·리그 구분 헤더 이름 색상을 직전 #F1B000에서 노란 칩과 동일한 #FCD73E로 교체한다. 이 색상 한 속성만 변경하며 SPORTS/LIVE 1px 글자보정과 다른 모든 요소는 유지한다. 현재 구현·배포 진행 중.

> 최신 완료 기준(2026-09-23): PUBLICv19/source e4fbe01d95406961af2a3ba56689c9ed948d134c. 경기 목록 국가·리그 구분 이름만 #F1B000, 좌측 SPORTS/LIVE 텍스트만 아래1px 보정. 기존 flex중앙/상하padding0/line10.5 및 박스위치·크기·폰트·색·간격 유지. 8헤더/두라벨 로컬1920·100% 실측·화면 확인, 대표접기복구, tsc/build 통과. 동일공개주소 배포 succeeded 18:00:03KST. 데이터·카드내리그명·#FCD73E·다른요소 보존. 별도 공개브라우저 회귀 미실행. 보고서 CHANGE_REPORT_LEAGUE_LABELS_20260923.ko.md / 증거 runs/league-header-color-20260923/implementation/completion-report.json. 아래 이전 기록은 원문보존 이력. 다음 피드백 대기.

> 후속 추가 지시: 좌측 노란 SPORTS·LIVE 라벨의 텍스트만 가로/세로 중앙정렬한다. 실제 line-height·padding 확인 후 최소수정, 필요시 글자만 소폭 아래보정. 박스·폰트규격·주변간격·색상과 다른칩 유지. 브라우저100%에서 확인. 진행 중인 리그 구분 헤더 이름 #F1B000 변경과 함께 완료하고 범위를 넓히지 않는다.

> 최신 직접 지시(2026-09-23): 경기 목록 국가·리그 구분 헤더의 이름 텍스트만 #F1B000으로 변경한다. 경기 수·국기·화살표·배경·구분선·카드 내부 리그명·기존 #FCD73E 포인트와 모든 나머지 요소는 유지한다. 현재 단일항목 구현 진행 중이며 공개 완료는 후속 결과로 기록한다. 요청 input/league-header-color-20260923/REQUEST.ko.md / 증거 runs/league-header-color-20260923/. 아래 이전 완료 기록은 원문 보존 이력이다.

# 현재 STATE — 직접 폴리싱 완료 / PUBLIC v18

2026-09-23 17:10:23 KST 동일 PUBLIC 주소 배포 succeeded.

- URL https://aldebaran.kexxadrix.chatgpt.site
- source `bc52561601bb131c515533028336afbc16c9de17`; 기준 `7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23`.
- version `appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_72727a3f7ec4819187cd673704c939c3`.
- deployment `appgdep_6ab38958e5d481919a0a6dbfedc6a45a`.
- 소스3파일/12추가11삭제. 요청5항목 및 좌측3아이콘 후속예외 반영. 데이터/자산/다른사이트 미변경.
- 로컬1920 기본·선택·금액·팝업 및 국내61/해외61 카드 확인; 종목32/6/16/7, 배구0 빈상태. 장식0. N+79/80·선택해제·금액초기화 정상. 타입/build 통과.
- 주요 치수·폰트·간격 차이 없음. 총당첨금 숫자span으로 인라인 글자폭만 +1/64px, 문자열·계산·행·정렬 보존/인위보정없음.
- 실제 공개 선택내역확인 팝업의 #FF641F/#FFF, gradient/glow/pseudo없음 검증. 실제 제출0; 기존계정/잔액/keep 보존, 테스트입력/선택복원. 공개1920 화면을 조정담당도 열어 확인.
- 제한: 배구0은 공용렌더러/빈상태 확인. 모바일/전체회귀/실베팅제출/결제/계정생성 미실행. 기존 bundle-size/plugin-timing/route-classification 경고 지속, 신규 실패 없음. 사용자 시각승인 별도.
- 증거 `runs/post-r15-polish-20260923/implementation/completion-report.json`, `public/final-publication.json`, `public/confirmation-checks.json`, `public/public-final-1920.png`, `public/public-confirm-popup-1920.png`.
- 보고서 `CHANGE_REPORT_POST_R15_POLISH_20260923.ko.md`. 네 문서의 이전 원문은 coordination/previous-operating-documents.json 및 prefinal-operating-documents.json 보존. 다음 사용자 피드백 대기.

---

> 현재 최종 기준: 2026-09-23 직접 폴리싱 완료 / PUBLIC v18 / source bc52561601bb131c515533028336afbc16c9de17. 주황 채움 글자 #FFFFFF, 기존 노랑 및 SPORTS 배경 #FCD73E/검정글자, 보유머니와 계산 후 총당첨금 숫자만 노랑, 공용 카드 장식 렌더링/전용 스타일 제거 완료. 추가 직접 지시로 좌측 주황 3버튼 아이콘만 흰색. 나머지 아이콘·치수·간격·웨이트·데이터·자산·동작 보존. 팝업 금색 효과 제거는 기존 규칙이며 실제 공개 선택 내역 확인 팝업에서 재검증했다. 아래 이전 진행 기록은 원문 보존 이력이다. 최종 보고서 CHANGE_REPORT_POST_R15_POLISH_20260923.ko.md. 다음 피드백 대기, 자동 후속 작업 없음.

> 추가 직접 지시 반영(구현 담당 전달): 좌측 충전·환전·고객센터 3개 주황 버튼 아이콘도 흰색으로 변경하며 이 3개만 기존 아이콘 유지의 예외다. 선택 내역 확인 팝업 버튼에 남은 금색 그라데이션·오버레이를 제거하고 기존 ALDEBARAN 버튼 스타일을 적용한다. 근거: runs/post-r15-polish-20260923/coordination/additional-direct-feedback.json.

# 현재 STATE — 직접 폴리싱 5항목 진행 중

출발 소스 7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23 / PUBLIC v17 / 현지 clean 확인. 현재는 구현 전이며 새 공개 버전은 완료 후 기록한다. 증거: runs/post-r15-polish-20260923/. 이전 네 문서 원문은 coordination/previous-operating-documents.json에 보존했다.

---

> 최신 작업 기준 / 2026-09-23 직접 폴리싱 지시: PUBLIC v17 완료본에서 주황 채움 텍스트 흰색(아이콘 제외), 기존 노란 배경 #FCD73E, 보유머니/계산 후 총당첨금 숫자만 노랑, SPORTS 노랑, 전 종목 카드 장식 이미지 렌더링/전용 스타일 제거의 다섯 항목만 적용한다. 레이아웃·치수·간격·웨이트·데이터·동작 및 다른 자산 보존. 상세 input/post-r15-polish-20260923/REQUEST.ko.md. 아래 이전 기준과 관측은 보존 이력이며 이 직접 지시가 충돌 부분에 우선한다. 기존 Sites 담당은 앱/한정검수/동일 공개주소 배포, 조정 담당은 네 운영 문서/보고서를 맡는다. 새 사이클/감사/범위 확장 없음.

# 현재 STATE — ALDEBARAN R15 완료 / PUBLIC v17

2026-09-23. R15-01~05 및 구현 중 사용자 직접 피드백을 반영·한정검증하고 동일 PUBLIC 주소에 배포했다. 구현 담당 완료/idle, 다음 피드백 대기. 아래 이전 진행기록과 관측은 원문 보존 이력이다.

- URL https://aldebaran.kexxadrix.chatgpt.site/ / succeeded 2026-09-23 16:10:28 KST.
- source `7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23` / 현지clean / PUBLICv17.
- version `appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_dff080e010a48191b9d5e4a118225fca`.
- deployment `appgdep_6ab37b51a63c819182f809026a660a54`.
- 61경기=축32/농6/야16/배0/하7. 4476마켓/11485선택. 기존1664선택ID·가격유지.1839단조비교PASS.
- 마켓최소/중앙값/최대: 축46/67/111,농51/82.5/115,야25/65/102,하51/65/79.115템플릿=73구현/41조건부제외/1별칭흡수.
- 베팅하기노랑/계정3열2행38px/사용자추가12px·16px/우측1903일치/중앙지원웨이트한단계·배당N+보호. 금일적중표시삭제/머니보너스박스제거. R14모양·자산보존.
- 최신직접지시: 사용자노출금지표현제거/MLB표기/팝업금색그라데이션·광택제거. 복합선택명치환결함보완.
- 로컬8경기10경로·61N+·배구빈상태슬립유지·23폰트PASS. 타입/buildPASS; 최초후추가수정에따른재빌드1회(총2회).
- 최종공개1920해외형·국내형·팝업확인/콘솔오류0. 국내61카드2열/상세0. 사용자미감승인별도.
- 한계: 선수·선발·토너먼트자료없는41유형제외,합성모델·24000샘플·단순화연장규칙. 실시간·정산엔진미구현. 실결제/신규계정/베팅제출/모바일/무관전체회귀미실행. chunk-size/plugin timing/route분류알림존재.
- 최종 보고서: CHANGE_REPORT_R15_20260923.ko.md.
- 증거: runs/r15/implementation/completion-report.json,final-publication.json,final-build.log,data-validation.json,font-weight-audit.json,ui-case-results.json; runs/r15/public/의최종3화면·측정.
- 운영4MD의이전원문과진행기록은coordination/previous-operating-documents.json 및prefinal-operating-documents.json에보존. 다른사이트/GitHub백업보존.

---

# 현재 STATE — ALDEBARAN R15 구현 진행 중

2026-09-23. R15-01~05 전체 작업을 기존 Sites 구현 담당에 전달했다. 완료 보고가 아니다. 현재 확인된 공개 결과는 R14 PUBLIC v15이며, R15 공개 버전/commit/배포 ID는 구현·검증 이후 기록한다.

- 기준 source: 35a63c764301efe7eb334d70ba9cf6599297bd37. 작업 시작 시 현지 clean 확인.
- 구현 담당: 스포츠 데모 01 대표 UI 제작 / 01a0a97b-1268-7cf3-8aad-ba460ecf4f98.
- 진행 기록: runs/r15/implementation/progress.json.
- 입력 무결성: manifest 17파일 바이트/SHA 일치, catalog 115ID 중복 없음.
- 조정 자료: runs/r15/coordination/intake.json, dispatch.json, acceptance-plan.json.
- 이전 네 운영 문서 전체 원문: runs/r15/coordination/previous-operating-documents.json. 아래 과거 관측 및 증거도 그대로 보존했다.
- R15의 경기 데이터/마켓 집계 변경은 R14 당시 데이터 보존 제한을 대체하며, R14 N+ 시각 표현과 배너는 유지한다.

---
> 최신 활성 기준: ALDEBARAN R15-01~05 (2026-09-23). 출발점은 R14 완료 PUBLIC v15 / source 35a63c764301efe7eb334d70ba9cf6599297bd37 및 이후 현지 변경이다. 아래 R14 이하 제한은 당시 이력이며 충돌 시 이번 R15 병합 사양이 우선한다. 베팅하기 색상, 61경기(축구32/농구6/야구16/배구0/하키7), 계정패널, 중앙 일반 글자 한 단계 감량, 실제 고유 상세 마켓 확장·N+ 집계를 적용한다. 실제 배당/N+ 웨이트·R14 모양·배너·프레임·기존 선택 규칙을 보존한다. 기존 Sites 구현 담당이 앱과 검수·배포를 맡고, 현재 조정 담당은 네 운영 문서와 기획 보고서를 맡는다. 새 감사/Jev/플러그인/의존성/모바일/다른 사이트/새 주기를 추가하지 않는다. 이번 입력: input/r15/ALDEBARAN_R15_POLISH_MARKETS/.
# 현재 STATE — ALDEBARAN R14 두 항목 완료 / PUBLIC v15

2026-09-23. R14숫자+버튼 및 우측배너원본6장교체를구현·한정검수하고같은공개주소에배포했다. R14는지시번호,PUBLICv15는실제배포번호다. 사용자시각피드백대기. 아래직전STATE는원문보존이력이다.

## 공개·소스

- URL https://aldebaran.kexxadrix.chatgpt.site/ / PUBLICv15 / succeeded 2026-09-23 12:51:59KST.
- source35a63c764301efe7eb334d70ba9cf6599297bd37,baseline0996e1cb909b69531064bed54911f3103ea0e47d,push완료/git clean.
- project appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_5563cc9f51e881919d104a21fe7ad0ef.
- deployment appgdep_6ab34ccbb5c08191b06649629311ca3c.

## 완료한 두 항목

1. 추가베팅: 동적n+'+' 한문자열/한span12px700/line12/letter-spacing0/gap0. 화살표와이버튼미사용SVG규칙만제거. 높이24/radius5/padding0 5/min0/content폭/기존색·우측위치유지. 8+27.5625×24,10+33.390625×24/중앙·잘림없음/추가보정0px. 기존개수계산·정확한aria·노출/0개처리·inspect·keyboard·부모button제외보존. sourceletter-spacing0/브라우저직렬화normal.
2. 배너6장: site/public/banners/aldebaran/r14/Banner_01~06.png 새별도경로/306×61RGBA원본바이트/6SHA일치. 역할순서는고객센터/공식채널/이용안내/중계/라인업/미성년자. 기존306×60.625/aspect323:64/cover/gap4/radius4/HTML·스타일·동작유지. image→black40%한겹→HTMLtext,filter없음/아이콘0. 예전공유이미지보존.

앱CSS·TSX2파일5추가6삭제+원본PNG6개만변경. 좌측LIVE·헤더영상/로고·좌측카지노슬롯·다른UI/데이터/슬립/사이트/GitHub백업보존. 모바일상세진입은향후의도만문서에보존하고이번에모바일/반응형/새라우트개발없음.

## 검증 및 제한

로컬1920/100% 실제1/2자리라벨및6배너화면검토. 라벨·여백·Enter/Space·2자리클릭=기존inspect/슬립0,국내버튼원래0유지. 배너원본hash/역할/HTML/치수/단일overlay전후보존. type/build각1회·공식workflow exit0,diff check통과/git clean.

공개실측과1자리+6배너1920JPEG확인. 공개두자리시각근거는동일소스로컬결과재사용. 우측레일을내려배너캡처후상단복원. 기존사용자탭·입력·계정·슬립보존/결과tab1해외형/viewport override reset. localhost5303/PID26384유지.

전체회귀/다른viewport/모바일/계정·결제·베팅제출/배너목적지전체재방문미실행. 0개처리는소스보존만확인,합성fixture없음. 기존chunk-size/plugin-timing/unknown route경고유지,새실패없음. 사용자미감승인별도/자동다음사이클금지.

## 인계·증거

- CHANGE_REPORT_R14_20260923.ko.md: 두항목전후/매핑/파일/실측/검증/배포/한계/화면.
- input/r14/ALDEBARAN_R14_PLUS_BANNERS/: 원본패키지14파일hash/size확인.
- runs/r14/implementation/completion.json,evidence.json,asset-copy.json,before.json,after-european.json,build-and-package.log,one-digit-and-banners.jpg,two-digit-and-banners.jpg.
- runs/r14/public/native-publication.json,browser-confirmation.json,measurements.json,image-validation.json,plus-button-and-six-banners-1920.jpg.
- runs/r14/coordination/previous-operating-documents.json: 직전4MD원문.
- coordination/prefinal-operating-documents.json: R14시작·중간관측원문.
- coordination/final.json: 최종조정검토/원문보존/산출물확인.

---

# 직전 현지 STATE 원문 보존
# 현재 STATE — ALDEBARAN R13 두 항목 완료 / PUBLIC v14

2026-09-23. ALDEBARAN_R13_BUTTON_LIVE_FIX의 정확히2항목을 구현·한정검수하고 같은공개주소에 배포했다. R13은 작업지시번호이며 PUBLICv14는 실제배포번호다. 사용자시각피드백을 기다린다. 아래 이전STATE 원문은 보존이력이다.

## 공개·소스

- URL https://aldebaran.kexxadrix.chatgpt.site/ / PUBLICv14 / succeeded 2026-09-23 12:16:06KST.
- source0996e1cb909b69531064bed54911f3103ea0e47d, baseline74da3a356c7697d42641997a94025f0dccfef01b, push완료/git clean.
- project appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_9f71c0e50068819199afc6f867eee80b.
- deployment appgdep_6ab344647ab881918c4c055744658174.

## 완료한 두 항목

1. 추가베팅: 숫자전용span11px/700/line12, 전용SVG6×10/viewBox0 0 6 10/path M1 1 L5 5 L1 9/stroke1.25/round/currentColor/fillnone/aria-hidden true/focusable false. gap3/padding0 5/min-width0/content-width. 높이24/radius5/#F1B000/#171717/우측위치 보존. 실제8=28.09375×24,10=33.421875×24/중앙정렬/잘림없음.
2. 좌측최신인기게임 .ab5-latest .ab5-badge만 배경#F1B000/전경#171717. 기존34.703125×24, 폰트10.5/800/line10.5/padding0 6/radius4/위치/제목/게임목록 보존, border추가없음.

앱CSS·TSX 2파일만6추가4삭제. 미사용ChevronRight import제거. 공용도형/전역SVG·다른배지·직전7항목·폰트/데이터/배당/슬립/다른사이트/GitHub백업보존.

## 검증과 한계

1920/100% 로컬 실제숫자span·SVG영역·path잉크위치·여백·Enter/Space가 기존inspect로전환하고슬립0유지. 기존pointer-events:none 때문에SVG/path영역실제targetBUTTON이며 부모closest(button)제외보존. 국내형원래추가버튼0개유지/공유LIVE확인. 타입1회·build1회·공식workflow exit0, diff check·git clean.

공개 국내/해외2대상계산값+최종1920JPEG확인. 공개상세입력검사는 같은소스의 로컬결과를 재사용했고공개는모드이동만. 원래사용자공개탭·입력·선택보존, 결과tab1해외형/viewport override reset. preview5303/PID26384유지.

초기LIVE폭34.5는로딩중값, 안정화PUBLICv13의34.703125와최종동일. 임시잘림캡처는정상두자리전체화면으로교체. 최종image-validation 기록확인.

전체회귀/다른viewport/계정·결제·베팅제출미실행. 기존chunk-size/plugin-timing/unknown route분류경고유지. 구현미완료없음, 사용자시각승인별도. 자동다음사이클금지.

공식Sites helper가다시존재해재설치없이공식source/check/build/push/package와native save/deploy사용. 부재·복구원인미확인. 새의존성/remote-build fallback없음.

## 인계와 증거

- CHANGE_REPORT_R13_20260923.ko.md — 두항목전후/파일/실측/검증/배포/한계/화면.
- input/r13/ALDEBARAN_R13_BUTTON_LIVE_FIX/ — 원본패키지10파일hash/size확인.
- runs/r13/implementation/completion.json, evidence.json, before.json, after-european.json, after-domestic.json, build-and-package.log, two-digit-button.jpg.
- runs/r13/public/native-publication.json, browser-confirmation.json, image-validation.json, european-1920.jpg, domestic-1920.jpg.
- runs/r13/coordination/previous-operating-documents.json — 직전운영4MD원문.
- coordination/prefinal-operating-documents.json — R13시작/중간관측원문.
- coordination/final.json — 조정측최종검토/이전원문보존/산출물확인.

---

# 직전 현지 STATE 원문 보존
# 현재 STATE — ALDEBARAN 사용자 피드백 7항목 완료 / PUBLIC v13

2026-09-23. 기존 R12 공개 v12에서 이어서 지정7항목을 구현·한정 검수하고 같은 공개 주소에 배포했다. 사용자 시각 피드백을 기다린다. 아래 이전 R12 본문은 원문 보존 이력이며, 충돌 시 이 최신 절과 수정 보고서를 따른다. R13 기획 패키지를 부여한 것이 아니라 실제 Sites 공개 버전이13이다.

## 현재 공개·소스

- URL: https://aldebaran.kexxadrix.chatgpt.site/
- PUBLIC v13 / deployment succeeded, 2026-09-23 11:36:02 KST.
- source 74da3a356c7697d42641997a94025f0dccfef01b, 이전 c97d42c9630670780b26c2ba00541a4e7e69bd83. push 완료/작업트리 clean.
- project appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_89a515dea4e08191bf2519a1b4b75bc7.
- deployment appgdep_6ab33afd474081918dab9f113b0eac72.

## 완료 범위와 실측

1. 종목바와 양쪽 내용 영역 사이 외부 gap8px.
2. 중앙 경기 목록 padding0px 10px 10px.
3. 국가·리그제목39px. 좌우 heading y157~196, text-top167. 기존폰트 line-box center차0.25px.
4. VS #797979. 이전 #B7B7B7 추정은 폐기. 다른R12색 유지.
5. 일반UI user-select:none, 편집필드 text 예외. 실제mouse drag 선택0, 검색 선택·수정·원복 확인.
6. 해외형 경기 카드 비버튼 전체에서 기존 inspected 전환. 날짜·리그·엠블럼·기준값·여백·기존키보드 확인. 배당/추가베팅 버튼 제외 및 독립동작 보존. 국내형에는 원래없던 inspected/상세를 신설하지 않음.
7. 추가베팅 54px고정폭→content-width/min27px, height24px/padding0 2/radius5/우측끝 유지. '8'27.359375px, '10'33.109375px, 잘림없음.

app/aldebaran-wog-r5.css 및 app/aldebaran-wog-r5.tsx만 앱 수정(9추가/7삭제). 오른쪽 마켓 내부규격·배당데이터·자산·폰트·슬립·이력·다른사이트·GitHub백업은 보존. 외부gap으로 스크롤 가용높이8px감소는 요청범위.

## 검증 및 한계

타입1회/build1회 exit0. 배당1회toggle·해제중 기존상세와scroll266 유지, 추가베팅독립, accordion 및 해외독립/국내공동scroll 확인. 공개 국내/해외1920×1080/100%에서 변경규격과VS·버튼을 재확인하고 최종캡처를 검토했다. 상세입력검사는 같은소스의 로컬결과를 재사용했으며 공개에서는 모드전환만 수행했다. 기존공개탭 보존.

기존chunk-size/plugin-timing 경고와vinext route classification unknown이 남음. 전체회귀/다른화면폭/모든입력필드/실계정·결제·베팅제출은 미실행. 사용자 미감승인 대기. 추가사이클 자동시작금지.

Sites helper 폴더 부재의 원인은 미확인. 기존R12 archive구조와현빌드대조 후 native source push/save/deploy로 해결. 재설치·의존성추가·remote-build fallback없음. preview http://localhost:5303/ 유지.

## 기획 인계 및 증거

- CHANGE_REPORT_POST_R12_20260923.ko.md: 7항목전후/원인/영향/검증/배포/한계/최종화면.
- input/post-r12-alignment-20260923/REQUEST.ko.md 및 참조원본복사11개: 사용자추가지시 추적.
- runs/post-r12-alignment-20260923/implementation/completion.json, evidence.json, final-measurements.json.
- runs/post-r12-alignment-20260923/public/browser-confirmation.json, european-1920.jpg, domestic-1920.jpg, image-validation.json.
- runs/post-r12-alignment-20260923/coordination/previous-operating-documents.json: 이전4문서원문.
- coordination/prefinal-operating-documents.json: 진행중추가지시·중간확인 기록원문.
- coordination/final.json: 조정측최종검토/원문보존/산출물검증.

---

# 이전 R12 STATE 원문 보존
# ALDEBARAN — R12 배색·중앙 영역 폴리싱 현재 상태

## 현재 결과

**R12 지정 4개 변경의 구현·한정 검증·같은 공개 주소 PUBLIC v12 배포·국내/해외 1920 화면 확인을 완료했다.** 앱 변경은 CSS 한 파일이다. 기존 구현 담당의 완료 보고를 인계받았으며 다음 폴리싱을 시작하지 않고 사용자 피드백을 기다린다. 기술 확인과 최종 사용자 미감 승인은 구분한다.

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 프로젝트: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/
- 변경 소스: site/app/aldebaran-wog-r5.css (9 insertions / 6 deletions)
- 실제 출발: b7782ba699fdb4aaa9a59513bbc745bee8727f06 / clean / PUBLIC v11. 이후 사용자 변경을 reset하거나 덮어쓰지 않았다.
- 완료 source: c97d42c9630670780b26c2ba00541a4e7e69bd83 / working tree clean
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_21c6cd595d3081918039d13ca728360d / version_number 12
- deployment: appgdep_6ab26be25548819186582fd6d9c3258e / succeeded / 2026-09-22 20:52:27 KST
- 실제 배포 증거: runs/r12/public/publication.json
- 구현 완료 기록: runs/r12/implementation/completion.json
- 조정 완료 기록: runs/r12/coordination/final.json
- R12는 지시 번호다. 위 공개 version12는 별도 조회에서 확인한 실제 값이다. 패키지 작성자의 R11 식별자 공백을 현지 완료 이력으로 대체해 보완했으며 과거 기록은 아래 원문으로 보존했다.

## 완료한 네 변경

1. 역할별 색: 중앙 경기 카드/상세 마켓 일반 실제 배당 #50DCD9, 핸디캡·득점 기준값 #B7B7B7, 헤더 NEW/LIVE 및 추가베팅 면 #F1B000. 노란 면의 전경은 기존 #171717을 보존해 fallback #141515를 새로 강제하지 않았다. 브랜드·VS·선택 #FF641F 유지. 선택 배당은 기존 주황 면/짙은 글자 유지. 시간·팀명·잔액·슬립 등으로 전역 색 변경을 확대하지 않았다.
2. 중앙 종목바: #191919 면과 inset 0 -1px 0 #383838 하단선. 기존 좌표·높이·내용별 폭·간격·20/14/12px 규격·선택 동작 유지.
3. 중앙 경기 목록: 공통 컨테이너 #191919 면, 기존 radius8px/투명 border 유지, 가시 외곽선·그림자 없음. 리그/카드/선택 프레임 보존. 국내형 두 열 공통 목록에도 적용.
4. 중앙 상세 마켓: 큰 바탕 transparent, 기존 1px border 공간에 #383838 한 겹 외곽선. 경기명·시간→필터→전체 목록을 연결했다. 우측 기존 radius8px 유지(새 사용자 확정 수치로 취급하지 않음). 헤더/필터의 접합 중복선은 기존 공간을 보존한 채 투명화. 내부 카드 면·프레임·1px 주황 강조와 스크롤 유지.

## 확인 결과와 증거

- 입력 manifest14개 크기/SHA 일치, 참조5장 실제 확인. 참조의 주황 배당/기준값보다 최종 문서 배색을 우선했고 크롭·확대율·편집기 UI를 CSS 치수로 복제하지 않았다. runs/r12/coordination/intake.json, dispatch.json.
- 전후 중앙 컨테이너/종목버튼 좌표와 크기 동일, 배당/기준값 문자열·주변 잔액 표현 동일. 두 모드 일반 배당은 청록, 기준값은 회색. 근거: runs/r12/implementation/before.json, after-european.json, after-domestic.json, ui-verification.json.
- 선택 배당의 주황 면 rgb(255,100,31)/짙은 전경 rgb(23,23,23), 경기 카드와 상세 마켓 동기화 확인. 임시 로컬 선택은 해제했다. selected-state.json, european-selected.png.
- 추가베팅으로 NHL 이동/경기 보기로 NBA 복귀, 마켓 접기·복귀 및 핸디캡 필터 통과. 해외형 list0/market258→list1080/market258 독립 이동, 국내형 두 열 동일1080 공동 이동 확인. ui-verification.json.
- 타입 검사: node node_modules/typescript/bin/tsc --noEmit --incremental false / 1회 / exit0.
- 기존 build: node C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js run build / 1회 / exit0. 재실행·설치 없음. publication.json의 checks.
- 공개 한정 확인: 배당 rgb(80,220,217), 기준값 rgb(183,183,183), NEW rgb(241,176,0), 목록 rgb(25,25,25), 마켓외곽 1px rgb(56,56,56), 1920×1080/scale1. 로컬 정밀 검사는 공개에서 반복하지 않았다. runs/r12/public/browser-confirmation.json.
- 최종 해외형: runs/r12/public/aldebaran-r12-european-1920.png (PNG1920×1080).
- 최종 국내형: runs/r12/public/aldebaran-r12-domestic-1920.jpg (JPEG1920×1080).
- 담당과 조정 작업 모두 위 최종 공개 이미지를 확인했다. 일부 임시 캡처의 부분 repaint 잔상은 완전한 최종 캡처로 해결했으며 앱 수정/추가 build의 근거로 삼지 않았다. 최종 증거는 completion.json의 screenshots만 사용한다.

## 보존·미실행·남은 판단

- 1920 고정 레이아웃, 종목 가변폭·20/14/12 규격, 해외 독립/국내 공동 스크롤, 경기/배당/표시 정밀도/선택ID/슬립/저장·이력 로직을 보존했다.
- 헤더 원본 WebM·워드마크·로고판, 우측 배너40%와 정렬, 최신 CASINO/SLOT, 내부 카드/마켓 프레임, 현재 폰트/모든 프로덕션 자산은 변경하지 않았다. 별도 전달한 D드라이브 DIN OTF를 R12에 새로 적용하지 않았다.
- 기존 공개 사용자 탭은 그대로 두고 별도 확인 화면에서 모드 전환만 했다. 선택/금액/계정/내역 조작 없음. 기존 5303 서버 PID39172 유지, 임시 viewport 복원.
- 기존 빌드 chunk-size/plugin-timing 경고 및 vinext route classification unknown 표시는 남았다. 공개 반영/두 모드 화면은 별도로 확인했다. 확인 범위의 미해결 결함은 보고되지 않았다.
- 전체 회귀·모바일/타 브라우저·인증/계정 생성/결제/실제 베팅 제출은 미실행이다. 무관한 R11 영상/배너 정밀검사도 반복하지 않았다. 최종 미감 승인은 사용자에게 남는다.
- 새 자산/폰트/의존성·플러그인·전체 자동 polish·WOG/Figma 재조사·별도 QA/Jev·다른 사이트·공개 GitHub 백업 동기화는 하지 않았다.
- 담당: 기존 작업 01a0a97b-1268-7cf3-8aad-ba460ecf4f98(스포츠 데모 01 대표 UI 제작)가 구현/Sites/검증/배포. 조정 작업은 운영4문서/coordination 및 제공 증거 확인만 수행, 앱 수정·build·브라우저 QA를 중복 실행하지 않았다.
- 조정 작업에 공개 주소 열기를 요청한 결과 queued였다. 전경 표시 완료라고 단정하지 않는다.
- 종료 후 사용자 피드백 대기. 자동 다음 사이클 없음.

---

## 이전 STATE 원문 — R11까지의 현지 관측과 증거 보존
# ALDEBARAN — R11 헤더·UI 현재 상태

## 현재 결과

R11 지정 4개 변경을 기존 PUBLIC v10 위에 구현하고 같은 공개 주소의 **PUBLIC v11**로 배포했다. 빌드·타입 검사 및 변경 부위의 로컬 한정 검증을 통과했고, 공개 국내형/해외형 1920 화면과 영상 재생을 확인했다. 구현 담당의 최종 완료 기록을 인계받았고 해당 작업은 idle/completed 상태다. 요청 범위 작업을 종료하고 사용자 피드백을 기다린다. 추가 기능·새 디자인 사이클은 시작하지 않는다.

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- 소스: b7782ba699fdb4aaa9a59513bbc745bee8727f06
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_620ae816cf588191bfb88cd824f5629e / version_number 11
- deployment: appgdep_6ab259f62d3081918f06bb389c013214 / succeeded / 2026-09-22 19:35:58 KST
- 배포 근거: runs/r11/public/publication.json
- 최종 인계: runs/r11/implementation/completion.json. 앱/원격 source clean, archive 원본3개 SHA 일치·임시 HTML 부재 확인. 조정 완료: runs/r11/coordination/final.json.
- 로컬 캡처 API의 실제 JPEG 형식에 맞춰 이번 QA 파일 4개의 확장자만 정정했다. 최종 공개 캡처 2개는 PNG1920×1080이다. 파일 bytes/형식은 completion.json의 verification.screenshots에 기록했다.
- 남은 경고: 기존 빌드 chunk-size/plugin-timing advisory. 이번 변경 범위의 미해결 결함은 발견되지 않았으며 최종 미감 판단은 사용자에게 남긴다.
- 실제 출발점: PUBLIC v10, 9f32fe625a8f1f0441e4714382515c19af136d03, clean, owner 확인. 패키지에 적힌 v9는 오래된 이력으로만 보존했으며 reset하지 않았다.

## 완료한 변경

1. 우측 배너 6개: 기존 배경 위에 검정 alpha 0.4 한 겹을 적용했다. HTML 텍스트의 밝기·17/11px 글자·2px 간격·가운데 정렬, 306×60.625 외곽과 클릭은 유지했다. 헤더/좌측 사진에는 이 효과를 적용하지 않았다.
2. 중앙 종목바: 중앙 부모와 바 상단 padding을 각각 8→0으로 줄였다. 선택 탭 y122→106, 좌우 레일 y105는 유지. 버튼은 내용 폭+양옆 8px+내부 gap 8px, 배지는 양옆 4px로 구현했다. 이는 제안값 중 채택한 구현값이다. 기존 고정폭/세 자리 예약을 해제하고 20/14/12px 요소, 기본32/선택34px 높이와 선택 표현은 유지했다.
3. 헤더: 제공 WebM 원본 1개를 1920×62 메뉴행에 적용했다. 공지행 36px·로고 x24/폭182px·메뉴 위치 유지. 자동재생/loop/muted/playsInline, controls 없음, pointer-events:none. 로고 장식판 폭260px/검정 alpha0.5/사선32px/주황 밑줄228×1px, N 오른쪽 하단 여유22px. 기존 정적 배경과 reduced-motion 대응 유지.
4. 좌측 CASINO/SLOT: 이번 ZIP 원본 2개로 교체했다. 원본200×116/97×116, 버튼200×116/98×116, contain·접근 이름·클릭 유지. 별도 HTML 라벨·어두운 막을 추가하지 않았다.

## 검증과 증거

- 원본 3자산 복사 전후 크기/SHA 일치: runs/r11/implementation/assets.json. 이미지 생성·재인코딩 없음.
- WebM SHA256: 6EDEDCA659B6713E21AB5B8D99DAA88DAE2383968D4B65AD1A9E586E837DE16E
- CASINO SHA256: F14FD48A9FF194AD28268C95A400CD433A211D941B550B8C89AFFC125FE706B3
- SLOT SHA256: C559FDDC58E7B7D73E0AF9DDD546A02587CBB0456AA0F494ADB8B613C8BAEB71
- 로컬 한정 검증: runs/r11/implementation/ui-verification.json. 배너 그룹 중심 오차0, 카지노/슬롯 클릭, 농구6 필터, 해외형 독립/국내형 공통 스크롤, 모드 복원 통과. console error/warn 0.
- 영상: duration14.536s, 한 인스턴스, muted=true/paused=false/readyState4. 실제 14.4243→0.855652 및 13.803337→0.201032 반복 관측. reduced-motion에서는 비디오0/정적 배경 및 메뉴 동작 확인, 에뮬레이션 해제 후 재생 복원. 근거: runs/r11/implementation/video-verification.json. 무음은 브라우저 미디어 속성 확인이며 물리 스피커 청취 시험을 뜻하지 않는다.
- 숫자 0/7/32/128의 내용별 폭·높이·padding 확인: runs/r11/implementation/count-preview.json, count-preview.jpg. 임시 HTML은 증거 폴더에만 보존하고 site/public에서 제거했다. 운영 경기 데이터에는 넣지 않았다.
- 기존 빌드 1회, 필수 타입 검사 1회, diff check 모두 exit0. 설치·재빌드 없음. runs/r11/implementation/source.json, build.log.
- 공개: runs/r11/public/browser-confirmation.json. 국내형61카드, 기존 선택2건/인증/슬립유지/금액/이력 보존. 영상 9.787978→10.810024→11.821513 진행, muted=true/paused=false. 요청대로 상세 로컬 시험을 공개에서 전부 반복하지 않았다.
- 최종 공개 캡처: runs/r11/public/european-1920.png, domestic-1920.png. 1920×1080 full clip으로 저장하고 실제 이미지를 확인했다. 초기 불완전 repaint 캡처는 최종 증거로 사용하지 않는다.
- 우측 배너 6개 로컬 캡처: runs/r11/implementation/banners-six-1920.jpg. 공개 CSS에 같은 0.4 레이어 6개 반영 확인.

## 보존·작업 경계

- R10 중앙 외곽 투명/내부 카드 프레임/시장1px 강조/배너 정렬, 기존 글꼴·아이콘·팀명·로고·모티프, 경기·배당·선택·슬립·이력과 두 모드 스크롤을 유지했다.
- 이전 원본·출력·증거, MERCURY/SIRIUS, 공개 GitHub 백업은 변경하지 않았다.
- 새 QA/Jev·WOG/Figma 재조사·이미지 생성/변환·의존성 설치·전체 기능 재감사는 실행하지 않았다. 이번 범위 밖 전체 회귀/타 브라우저·기기 검증은 미실행이다.
- 기존 구현 담당 01a0a97b-1268-7cf3-8aad-ba460ecf4f98가 앱·Sites·구현·배포를 수행했다. 조정 작업은 운영 문서/coordination 기록과 제공 증거 확인만 담당했다.
- 운영 문서의 과거 본문은 runs/r11/coordination/previous-operating-documents.json에도 원문 그대로 보존했다.
- 공개 탭19의 이 작업 내 열기 요청은 queued로 반환됐다. 전경 표시 완료로 단정하지 않는다.
- 최종 보고 후 사용자 피드백을 기다린다. 다음 사이클을 자동 시작하지 않는다.

---

## 이전 STATE 원문 — R10까지의 현지 관측과 증거 보존
# ALDEBARAN — R10 UI·이미지 현재 상태

## 현재 결과

**R10 지정6개 UI 변경·한정 검증·기존 주소 PUBLIC v10 배포 완료. 공개 국내/해외1920 화면과 안내배너6개 전체 화면 확인 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 공개 상태: PUBLIC / succeeded
- 배포 성공: 2026-09-22 18:27:13 KST / 09:27:13.486520 UTC
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_146cf4bc79108191baa32e7c67a6aeac (v10)
- deployment: appgdep_6ab249de73508191a94c6a05b758ff00
- commit: 9f32fe625a8f1f0441e4714382515c19af136d03 / clean
- 시작점: PUBLIC v9 / c566f060ec024b2178b873624e345029dea79a2a / clean. 현재 checkout을 열고 이후 수정이 없는 것을 확인했으며 reset하지 않았다.
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- GitHub 공개 백업의 ALDEBARAN은 이전 v6 시점이며 이번에도 갱신하지 않았다. 최신 Sites 소스를 백업으로 대체하지 않는다.

## 지정6개 구현 결과

1. 첫 고객센터 img_banner_01은 보존하고 나머지5배너에 img_banner_03~07 원본을 공식채널/이용안내/중계/라인업/미성년자안내 순으로 적용했다. 기존 문구·전체 클릭영역·목적지는 유지하고 별도 아이콘과19배지를 제거했다.
2. 카지노/슬롯 사진버튼에 완성PNG200×116/97×116을 원본 그대로 적용했다. 버튼 외곽200×116/98×116과 접근이름/클릭은 유지한다. contain으로 글자 전체를 보이게 하고 별도 HTML라벨을 제거했다. 다른 라운지에서 사용하는 기존 사진export는 유지했다.
3. 중앙 종목버튼은 기존 외곽좌표/가변폭/높이와 숫자배지35.71875px 폭을 유지하면서 내부만 아이콘20×20/종목명14/경기수12 CSS px로 조정했다. 좌측레일 글자·아이콘은 대상이 아니다.
4. 중앙 전체surface와 큰pane의 배경·보이는외곽선만 투명하게 했다. DOM/grid/padding/border공간/좌표/크기/overflow/스크롤주체를 보존했다. 리그/경기/세부마켓 프레임과 좌우레일은 유지했다.
5. 세부마켓 왼쪽 주황선을3px에서1px로 줄였다. 왼쪽padding10→12px로 제목 위치를 보존했으며 펼침/접힘 모두 동일하다. 다른 주황선과 카드테두리는 유지했다.
6. 배너6개는 제목/설명 사이 실측간격7→2px, 묶음세로중앙오차0px로 정렬했다. 기존17px/11px 폰트·색·좌측padding12px·외곽306×60.625px는 유지했다. gap2px는 패키지 제안에서 고른 구현값이며 사용자 고정수치로 기록하지 않는다.

## 전후 치수 확인

1920×1080/scale1에서 수정 전후 동일한 외곽 치수:

| 대상 | 전후 동일 크기 |
| --- | --- |
| 전체 선택탭 | 139.375×34px |
| 축구/농구/야구/배구 기본탭 | 각각137.375×32px |
| 아이스하키 기본탭 | 178.859375×32px |
| 숫자배지 폭 | 35.71875px |
| 중앙 공통 종목바 | 1226×50px |
| 큰 중앙surface | 1244×964px, x338/y105 |
| 해외형 각pane | 609×896px, x347 및 x964/y164 |
| 마켓 제목 | x989/y272.5, 펼침·접힘 동일 |

종목별 가변폭을 가장 긴 버튼 폭으로 통일하지 않았고 런타임 DOM 측정/ResizeObserver를 추가하지 않았다. 국내형 공동1스크롤·해외형 독립2스크롤 및 모드복원을 유지한다. 제공 회색 도식은 제거범위 참조로만 사용하고 실제색/치수로 복제하지 않았다.

## 변경 파일

앱9파일(화면/스타일2개와 원본PNG7개):
- site/app/aldebaran-wog-r5.css
- site/app/aldebaran-wog-r5.tsx
- site/public/banners/aldebaran/btn_image_casino.png
- site/public/banners/aldebaran/btn_image_slot.png
- site/public/banners/aldebaran/img_banner_03.png
- site/public/banners/aldebaran/img_banner_04.png
- site/public/banners/aldebaran/img_banner_05.png
- site/public/banners/aldebaran/img_banner_06.png
- site/public/banners/aldebaran/img_banner_07.png

기존 구현 담당01a0a97b-1268-7cf3-8aad-ba460ecf4f98가 앱 checkout·Sites·한정확인·배포를 소유했다. 조정 작업은 운영4문서와 runs/r10/coordination 기록을 갱신했다. 조정 작업에서 앱/빌드/정밀UI 시험을 별도로 재실행하지 않았다.

## 실제 검증

- 입력20파일의 manifest 크기·SHA256 일치. 원본7이미지 실제치수와 적용사본 바이트 일치. 첫배너01과 이전자산 보존.
- 기존 타입검사1회 exit0, 실제 완료build1회 exit0. 변경되지 않은 통과검사는 재사용했다.
- Windows npm shim 경로/만료된source인증/Windows드라이브를원격으로오인한tar 포장 문제는 도구 실행방법을 보완해 복구했다. 정상build 뒤 포장만 재시도했으며 새설치나 재빌드를 하지 않았다. 근거: runs/r10/implementation/source.json.
- 한정 로컬 UI 확인: 사진 두 라운지 클릭, 농구6필터, 마켓 접기/펼치기, 해외리스트/상세 독립스크롤, 국내공동스크롤, 모드별위치복원 통과. 콘솔error/warn0.
- 종목6버튼 x/y/w/h 전후동일, 내부20/14/12px, 안쪽프레임동일, 제목좌표와1px강조선, 배너6개 정렬·중복아이콘0을 확인했다.
- PUBLIC 배포native succeeded와 실제공개 반영·국내/해외1920 캡처·배너6개 전체캡처를 확인했다. 공개에서 로컬의 정밀시험을 반복하지 않았다.
- 배너 전체캡처는 우측레일에 키보드포커스를 주고 End로 이동해 확보했다. 해당 세션의 좌표wheel은 우측레일을 이동시키지 못했다. 공개 캡처에서는6개가모두완전히보이며 이 관찰만으로 일반 사용자 휠 결함을 확정하지 않는다.
- 기존 공개 데모 인증/슬립 상태를 유지했다. 마지막 탭18은 공개 해외형/우레일상단이며 임시viewport override를 해제했다.
- 기존 chunk-size 권고 경고는 남아 있다. 이번 범위 밖 최적화는 추가하지 않았다.

## 증거 경로

- 입력: input/aldebaran-r10-ui-assets-package/ALDEBARAN_R10_UI_ASSETS/
- 입력확인/이전문서: runs/r10/coordination/intake.json, previous-operating-documents.json
- 최종 구현보고: runs/r10/implementation/completion.json
- 전후UI/대표동작: runs/r10/implementation/before.json, ui-verification.json
- 원본자산/소스/빌드: runs/r10/implementation/assets.json, source.json, build.log
- 배포/실제공개관찰: runs/r10/public/publication.json, browser-confirmation.json
- 공개해외형: runs/r10/public/european-1920.jpg
- 공개국내형: runs/r10/public/domestic-1920.jpg
- 공개배너전체: runs/r10/public/banners-six-1920.jpg
- 조정작업 최종기록: runs/r10/coordination/final.json

## 보존·남은 항목

현재1920고정·헤더·폰트·원본스포츠아이콘/팀엠블럼/카드motif·R9경기/배당/selectionID/슬립/저장소스·기존공개데모상태를 보존했다. 배당모델/주력핸디캡은 변경하지 않았다. MERCURY/SIRIUS·GitHub백업·기존5303서버를 유지했다. 이전 운영4문서 전체 원문과 증거 경로도 보존한다.

지정범위에서 미완료 구현이나 미해결 결함은 발견되지 않았다. 사용자 최종 미감 승인은 대기다. 모바일·전체회귀/Jev·실제인증/금융/베팅제출은 미검증이며 이번 범위에 포함하지 않았다. WOG/Figma재조사·새설치·이미지생성·별도QA·추가폴리싱·자동다음사이클은 수행하지 않는다. 사용자 피드백을 기다린다.

---

## R9 이하 실제 기록 — 이전 원문 보존

# ALDEBARAN — R9 UI·배당 현재 상태

## 현재 결과

**R9 지정 구현·한정 검증·기존 주소 PUBLIC v9 배포와 국내/해외 1920 화면 확인 완료. 사용자 피드백 대기.**

- 공개 URL: https://aldebaran.kexxadrix.chatgpt.site/
- 공개 상태: public / succeeded
- 배포 성공: 2026-09-22 16:27:21 KST / 07:27:21.586008 UTC
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_fde4ce0432a481918e4c9c10bb7d89e6 (v9)
- deployment: appgdep_6ab22dc4550c8191960ddeccddea19ff
- commit / remote HEAD: c566f060ec024b2178b873624e345029dea79a2a / clean
- 시작점: PUBLIC v8 / 4759aae04293e80c9dc3c60658ab97297118dbb0 / clean
- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/
- GitHub 공개 백업은 ALDEBARAN v6 시점이다. R9로 갱신하지 않았으며 이를 최신 Sites 소스와 혼동하지 않는다.

## 구현 결과

1. GNB 비활성 8개도 #f5f4f4/opacity1로 표시하고 disabled 동작은 유지했다. hover 색 변화 제거, 선택 주황 글자/하단2px선과 focus-visible·NEW/LIVE 유지.
2. 로고 원본·182px 폭·x24를 유지했다. 장식 폭만242px로 늘리고 GNB 그리드는 이동하지 않았다.
3. 공지행 우측5유틸리티의 글자·아이콘을 밝게 표시했다.
4. 중앙1226px 공통 종목바를 높이50px로 적용했다. 6개 가변폭 탭은 아이콘→종목명→실제경기수, 기본32/선택34px, grow·shrink0, 숫자최소3ch이며 이전104px 래퍼를 제거했다. 해외609/8/609 독립2스크롤·국내1226 공통1스크롤 유지.
5. CASINO/SLOT의 검은 라벨바를 제거하고 원본 사진·구도·문구·클릭을 유지했다. 라벨 이미지는 만들지 않았다.
6. 첫 텔레그램 고객센터만 동봉306×61 PNG를 그대로 적용했다. 기존 두줄문구·17px제목을 유지하고 별도 헤드셋을 제거했다. 두번째 공식채널은 유지했다.
7. 예정61경기에 고정 합성 스냅샷을 연결했다. 카드·상세·슬립은 같은 데이터를 참조하며 stable selection ID 2,176개와 기존 복원 정책·과거 영수증 가격 문자열을 보존했다. 신규 선택/영수증에는 출처·버전 메타데이터를 기록한다.

## 데이터 모델과 한계

- datasetVersion: aldebaran-prematch-r9-20260922 / sourceKind: synthetic-model
- 축구32·농구6·하키7·미식축구16 = 61경기, 1,040마켓·2,176선택. 원천77개와 예정 필터를 보존했으며 예정경기가 없는 야구/배구를 만들지 않았다.
- 경기별 fixtureId/sport/rules/modelInputs/sourceKind/datasetVersion을 기록한다. 축구90분 Poisson, 하키 정규시간 Poisson+연장 승리득점, 농구 점수차/총점 결합분포+동점 해소, 미식축구 득점사건 합성+연장/무승부 시나리오를 구분한다. 전반/쿼터/연장은 명시적으로 단순화한 모델이다.
- 실제 제공사 배당·관측된 팀 전력·통계 적합 모델이 아닌 경기별 수기 합성 가정이다. 렌더/필터/모드/재로드마다 새 가격을 생성하지 않는다.
- 기본 배열 [결과,총점,핸디]와 기존 시장 키/라인을 유지했다. 모든 가격은 유한수·1초과·소수2자리의 확정값이며 정수 환급/쿼터 분할 정산을 반영한다. 결합 계산 중간 반올림은 없다.
- 기본 margin 상한0.045. 기존 극단 기준점 때문에 일부 경기만 경기 전체 margin을 낮추고 modelInputs에 기록했다. 개별 가격 cap을 적용하지 않았다. margin은 실제 수익률 보장이 아니다.
- snapshot SHA256: 5eced5028e18b083fc951dce3dbe90e486089ba53a0a35d44399aa81639b605e
- 첫 배너 SHA256: 19e33f3146e6a2ba14e6120322d04e3ac1dc9ddc67518acdcc9cf19554710529 (원본과 바이트 동일)

## 검증 결과와 증거

- 자료 검증1회 PASS: 61경기 누락 없음, 기존 선택ID2,176개 동일, 동일 사건76건·단조관계488건·환급45마켓 확인, findings0. 기본 결과/총점/핸디 가격 묶음60/54/57종, 최대 반복2, 확정 가격 범위1.01~77.09.
- 타입 검사: 최초 배너 JSX 오타를 해당 원인만 수정한 뒤 최종 exit0. 기존 통과 결과 재사용.
- npm run build: 1회 exit0. 500kB 초과 chunk 권고 경고가 있으며 이번 범위 밖 코드분할은 하지 않았다.
- 로컬 대표 동작: 해외 독립스크롤·국내 공통스크롤·모드별 위치복원, 농구6↔전체61, 카드/상세/슬립1.56 일치, 5,000원×1.56=7,800원, 유지ON 재로드 선택·금액·출처버전 복원 확인.
- 공개 화면: 국내/해외 모두1920×1080, 61카드, 공통바1226×50, R9 출처/버전·대표가격 반영 확인. 로드 완료 후 이미지 누락0, 콘솔error/warn0.
- 공개 캡처는 기존 데모 계정 상태를 유지한 화면이다. 신규 인증·충전·환전·베팅 전송은 수행하지 않았다. public 접근 설정과 실제 화면 관찰은 확인했으며 새 익명 세션 인증 검사는 수행하지 않았다.
- 구현 담당 보고: runs/r9/implementation/completion.json
- 자료/모델: runs/r9/implementation/data-validation.json, model.json, pricing-audit.json
- UI/흐름: runs/r9/implementation/ui-verification.json, changed-flow.json
- 실제 첫 배너 화면: runs/r9/implementation/banner-full.jpg (초기 banner.jpg 잘못된 clip은 채택 증거가 아니다)
- 배포/공개 관찰: runs/r9/public/publication.json, browser-verification.json
- 공개 해외형: runs/r9/public/european-1920.jpg
- 공개 국내형: runs/r9/public/domestic-1920.jpg

## 변경 파일과 보존

앱6파일:
- site/app/aldebaran-wog-r5.css — 지정 UI 표현/종목바/배너 스타일
- site/app/aldebaran-wog-r5.tsx — 공통 종목바·라벨·배너와 출처 속성
- site/app/demo-data.ts — 61경기 고정 자료 연결·메타데이터
- site/app/page.tsx — 신규 선택/영수증 출처·버전 기록
- site/app/prematch-odds-r9.json — 고정 합성 배당 스냅샷
- site/public/banners/aldebaran/img_banner_01.png — 첨부 원본 그대로

기존 구현 담당 01a0a97b-1268-7cf3-8aad-ba460ecf4f98가 앱·Sites·검증·배포를 수행했다. 조정 작업은 운영4문서와 runs/r9/coordination 기록을 갱신했다. 입력13파일 manifest의 크기/SHA256을 확인했다. 이전 운영4문서 전체 원문은 runs/r9/coordination/previous-operating-documents.json 및 각 문서 이력에 보존한다.

MERCURY·SIRIUS·GitHub 백업·기존 이미지/아이콘01~09·카드 배경 motif·폰트·기존 공개 데모 계정/저장 이력은 변경하지 않았다. 기존5303 서버를 재사용했고 종료하지 않았다. 별도QA/Jev/새테스트스위트/새설치/새사이트/이미지생성/전체polish는 하지 않았다.

## 보류·미검증·다음 단계

- R9 지정 구현 중 남은 항목: 없음. 가변폭 종목 버튼의 최종 미감 수용은 사용자 판단 대기.
- 라벨 이미지 제작 및 두번째 배너 변경은 이번 범위 밖이며 후속 제공/지시 대기.
- 미검증: 광범위 회귀·모바일·Jev·인증/실제 금융·베팅 전송. 과거 영수증은 소스 차이로 보존을 확인했으며 거래 생성/가격 재계산 시험은 하지 않았다.
- 기술·화면 확인은 사용자 디자인 승인과 구분한다. 자동 다음 사이클을 시작하지 않고 피드백을 기다린다.

---

## R6·v8 이하 실제 기록 — 아래 원문과 증거 경로 보존

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

## 종목 아이콘 교체 — 2026-09-22

- 사용자 첨부 image_Sports_Aldebaran-01~08.png를 public/sports/aldebaran/에 원본 바이트 그대로 복사하고 SHA-256 일치를 확인했다. 매핑: 01농구, 02축구, 03배구, 04야구, 05미식축구, 06아이스하키, 07E스포츠, 08테니스.
- app/demo-data.ts에 일반 종목 아이콘 매핑을 분리했다. 기존 match.sportLogo와 카드 배경 경로는 유지했다. app/aldebaran-wog-r5.tsx의 해외형 GNB와 최신 인기 경기 목록이 새 매핑을 사용하며, 종목 탭·왼쪽 리스트에는 sportMenu를 통해 적용된다.
- CSS, 표시 크기, 61경기 데이터, 배당/모드/스크롤, 팀 엠블럼, 기존 배경 이미지, MERCURY/SIRIUS는 변경하지 않았다. 원본 이미지 편집·리사이즈·재생성 없음. 현재 종목 탭에 없는 E스포츠·테니스는 매핑과 파일만 준비하고 UI 항목을 추가하지 않았다.
- 타입 검사와 기존 build 각각1회 통과. 로컬1920 화면 확인, 농구 필터6경기 정상, 콘솔error/warn0. 공개 화면 새 아이콘16곳 로드, 전체 이미지 오류0, 카드 배경145×145·opacity0.09와 기존 경로 확인. 근거 runs/icons-20260922/.
- source 98d094c3cb537818b19f3493eabaefc2f2936bc6, 동일 원격HEAD 및 clean 확인. PUBLIC v7, version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_28b4665c7384819192dc714b4dc89fd3, deployment appgdep_6ab217b409b48191a8ebd3c891591da9, succeeded 2026-09-22T05:53:13.790569+00:00. 기존 URL https://aldebaran.kexxadrix.chatgpt.site/ 유지.
- 확인 범위 내 잔여 결함 없음. 이번 요청은 아이콘 교체이며 전체 회귀·모바일 검사·GitHub 백업 재갱신은 수행하지 않았다.

## ALL 아이콘·슬립 토글·상단 활성 메뉴 수정 — 2026-09-22

- 사용자 첨부 image_Sports_Aldebaran-09.png를 동일 이름으로 public/sports/aldebaran에 복사했다. SHA-256 701696253704D0ECC80B74A1974C14DBF18E9AD614D50905085457F1E22EB5A1 일치. app/demo-data.ts의 all 매핑과 sportMenu 연결만 바꾸어 전체 탭에서 원본 ALL을24×24로 표시한다.
- 슬립 On 상태에서 공유 Switch의 CSS translate(22−2=20px)와 ALDEBARAN transform(24px)가 함께 적용돼 총44px 이동했고 손잡이가 오른쪽으로17px 돌출됐다. app/aldebaran-wog-r5.css에서 ALDEBARAN 손잡이 translate를 Off0/On24px로 단일화하고 중복 transform을 제거했다. 최종 On은 오른쪽·상하3px, Off는 왼쪽·상하3px 여백이다. 공용 Switch 및 슬립 상태 로직은 유지했다.
- 추가 사용자 지시에 따라 상단 메뉴 아이콘 표시/hover 등장 효과와 활성 글자 하단 이동 규칙을 제거했다. 대기/활성 글자 y19·높이24 유지, 활성 글자 #ff641f와 하단2px 강조선만 적용된다. NEW/LIVE 배지와 메뉴 기능은 유지했다.
- 변경 소스2파일 + 원본 PNG1개. 타입 검사와 build 각각1회 통과. 로컬 포인터 Off/Space On, 국내·해외 모드 전환 후 글자 정렬 확인. 공개1920 화면에서 ALL 로드·On 손잡이3px 여백·활성 글자 정렬·이미지 오류0·콘솔error/warn0 확인. 최초 공개 탐색의 브라우저 캐시를 갱신한 뒤 최신 표시를 검증했다.
- source4759aae04293e80c9dc3c60658ab97297118dbb0, 원격HEAD 일치/clean. PUBLIC v8, version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_ff9b85f5a3b08191804e17801c85be4a, deployment appgdep_6ab219a0a90081919448bd3a65b24055, succeeded 2026-09-22T06:01:22.463340+00:00. 기존 https://aldebaran.kexxadrix.chatgpt.site/ 유지.
- 근거 runs/all-icon-switch-20260922/{before,local,public,source,publication}.json 및 local.jpg/public.jpg. 기존 카드 배경·종목8아이콘·데이터·배당·다른 사이트·GitHub 백업은 변경하지 않았다. 확인 범위 내 미해결 결함 없음. 전체 회귀/모바일/최종 미감 승인은 별도다.


---

# R15 최신 변경분 — 이전 관측과 증거는 위에 보존

# ALDEBARAN R15 — 작업 인계 상태

작성일: 2026-09-23. 상태: 통합 작업지시 리소스 준비 완료 / 앱 구현 전.

## 출발점

사용자가 R14 숫자+ 버튼과 신규 안내 배너 6장 반영 완료를 확인했다. 그 이후 수집한 ‘베팅하기 버튼 색상 변경’부터 ‘종목별 마켓 확장’까지를 이번 작업으로 통합한다.

Windows 프로젝트: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/

앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/

공개 주소: https://aldebaran.kexxadrix.chatgpt.site/

이전 보고서에서 확인한 앱 파일은 site/app/aldebaran-wog-r5.css와 site/app/aldebaran-wog-r5.tsx다. 현재 파일 구조와 데이터 생성부는 구현 담당자가 현지에서 확인한다. 파일명에 wog가 남아 있다고 WOG를 다시 참조하라는 뜻은 아니다.

마지막 별도 배포 보고서의 PUBLIC v13/commit 74da3a356c7697d42641997a94025f0dccfef01b는 R13·R14 이전 이력이다. 이번 출발점의 배포 버전이나 commit으로 단정하지 않는다. R14 후 현재 값은 현지에서 기록한다.

## 이번 작업

| ID | 변경 | 현재 상태 |
| --- | --- | --- |
| R15-01 | 베팅하기 버튼 노랑 | 구현 대기 |
| R15-02 | 실제 경기 61개와 종목 수 일치, 배구 경기 없음 | 구현 대기 |
| R15-03 | 우측 계정 패널의 낮은 가로형 버튼·박스 정리 | 구현 대기 |
| R15-04 | 중앙 일반 텍스트 웨이트 한 단계 감량, 배당/N+ 제외 | 구현 대기 |
| R15-05 | 4개 종목 마켓 확장·경기별 변주·실제 개수 집계 | 구현 대기 |

## 보존할 완료 기준

- 1920 고정 틀, 해외형 좌측 경기/우측 상세 독립 스크롤, 국내형 공동 스크롤.
- 헤더 WebM/로고 처리, 좌측 CASINO/SLOT 이미지, R14 안내 배너 6장·HTML 문구·중앙 정렬·검정 40% 오버레이 한 겹.
- 종목바의 약한 배경과 하단 선, 왼쪽 경기 영역의 #191919/8px 라운드, 오른쪽 상세의 투명 영역과 단일 외곽선, 내부 카드 프레임.
- 종목바 아래 8px, 왼쪽 목록 패딩 위 0px/나머지 10px, 리그 제목 39px, 마켓 제목 왼쪽 주황선 1px.
- 브랜드/선택 #FF641F, 실제 배당 #50DCD9, 기준값 #B7B7B7, VS #797979, NEW/LIVE/N+ 노랑 #F1B000.
- N+는 한 문자열·한 라벨, 기존 폰트 12px/700, 높이 24px/라운드 5px/좌우 패딩 각 5px/내용 기반 폭/우측 정렬.
- UI 텍스트 선택 방지와 입력 예외, 팀 이미지 드래그 방지, 해외형 카드의 비버튼 영역 클릭과 배당/추가마켓 버튼 이벤트 분리.
- 계정 데이터·검색·메뉴·기존 선택/저장 동작. 단, 이번 요청에 해당하는 경기 데이터/마켓 수/일반 웨이트/계정 구성은 사양에 따라 변경한다.

## 제공 리소스

운영 문서 4개, 붙여넣기용 START_HERE.ko.txt, 작업 계약 JSON, 마켓 생성 계획 JSON, 조사 원문과 115개 템플릿 JSON, 완료 보고 JSON 템플릿, 참조 이미지 6장과 매핑을 포함한다.

템플릿 수는 축구 35 + 농구 24 + 야구 25 + 아이스하키 31 = 115다. 이는 재사용 유형 목록이며 한 경기의 제공 수를 뜻하지 않는다. 원본 참조 이미지는 편집 없이 포함했다.

패키지 작성 중 파일 존재·참조 매핑·JSON·템플릿 ID·합계·ZIP 무결성을 확인했다. 앱 코드·현재 DOM·실제 배당·빌드·배포·시각 적용 결과는 이 단계에서 검증하지 않았다. 구현 결과는 현지 작업 후 기록한다.

## R15 구현 중 사용자 직접 피드백 — 계정 패널 보완

2026-09-23 구현 담당 task(01a0a97b-1268-7cf3-8aad-ba460ecf4f98)가 수신해 전달한 추가 사용자 요청을 반영한다. R15 패키지의 시작값보다 이 직접 피드백이 우선한다.

- 보유머니·보너스 행 우측 padding 10px을 0으로 줄여 정보수정 및 하단 버튼의 우측 경계와 맞춘다. 나머지 계정 내부 여백은 유지한다.
- 6개 계정 동작 버튼 글자 14px → 12px, 아이콘 18px → 16px.
- 버튼 높이 38px, 버튼 간격 4px, 아이콘/글자 간격 6px, 3열×2행, 계정 패널 높이 244px를 유지한다.
- 잔액·계정·동작은 보존한다. 이번 관측 시 데이터 검사 통과, 최종 화면/타입/build/배포는 진행 중이다.

## R15 중간 검증 관측 — 구현 반영 후 한정 화면 검수 중

`runs/r15/implementation/data-validation.json`의 현재 검사 결과: 61경기(축구32/농구6/야구16/배구0/하키7), 마켓4476, 선택지11485, 기존 정상 경기 선택ID1664개 보존, 제거NFL16개, 기준값·배당 방향 비교1767개, 오류0. 카탈로그73구현/41제외/1별칭흡수. 선수40개는 확인 로스터 없음, 진출1개는 토너먼트정보 없음, 첫이닝득점 여부는0.5총점별칭으로 한 번만 포함한다.

이는 데이터 검사 결과이며 최종 배포 완료를 의미하지 않는다. 로컬 중간 `current-1920.jpg`에서 61/32/6/16/0/7, 계정 가로버튼·행, 늘어난 상세마켓을 확인했다. 이후 추가 계정 글자12px/아이콘16px/우측정렬 보완 및 실제 대표선택 검수가 진행 중이다. 최종 source·배포·전체 검수 결과는 완료 시 상단에 기록한다.

## R15 최종 공개 검수 보완과 직접 사용자 표현 지시

2026-09-23 16:04경 구현 담당을 통해 받은 최신 사용자 직접 지시: ALDEBARAN 사용자 노출 문구에서 ‘데모’ 표현을 사용하지 않는다. MLB 리그 표기를 포함한 사용자 노출 문구를 확인하여 제거한다. 기존 데이터의 합성 성격은 내부 문서와 검증 보고에 사실대로 기록하며 실시간·실거래 서비스로 거짓 표시하지 않는다. 이번 지시는 사용자 UI 문구에 적용하며 과거 원문 기록/증거 경로/코드 파일명을 삭제하거나 불필요하게 변경하지 않는다.

공개 중간 v16/source0a7db51cc50c78a8a04318102faa7a307cfe6c4c/deployment appgdep_6ab379469ea481918a204acb00235cc0/16:01:48KST 성공 후, 복합 선택명(홈 / 원정, 홈 또는 무, 승리차)이 일반 팀명 치환 때문에 잘리는 결함을 발견했다. 구현 담당이 해당 치환과 위 사용자 문구 지시를 보완하고 영향 부위를 재검수·재빌드·같은 공개 주소에 배포한다. v16은 이번 최종 완료 버전으로 단정하지 않는다.

데이터·폰트 입력이 동일한 통과 검사는 재사용하고, 수정된 선택명·표현·최종 소스/산출물 일치와 배포 결과만 확인한다.

## R15 사용자 추가 지시 — 팝업 버튼 잔여 스타일 제거

2026-09-23 기존 구현 담당이 직접 받은 최신 사용자 지시로, ALDEBARAN 팝업 버튼에 남아 있던 WOG 금색 그라데이션·광택을 제거한다. 기존 ALDEBARAN 평면 주황 버튼 색과 동작을 유지하고 기본/hover/active/focus 상태를 확인한다. 새 버튼 디자인 체계나 다른 사이트 수정은 하지 않는다.

구현 담당이 PUBLIC v17 / source7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23 / deployment appgdep_6ab37b51a63c819182f809026a660a54 / 2026-09-23 16:10:28KST 성공을 보고했다. 최종 상세 완료 기록은 root 검토 후 STATE 상단과 R15 수정 보고서에 기록한다.
