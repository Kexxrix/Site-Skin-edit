# MERCURY — 현재 상태

문서 세트: **MVP R6 · 2026-09-17**  
STATUS: **전체 구현·독립 WOG 감사·F01/F02 보완·재확인·공개 v5 배포 완료**  
DESIGN_APPROVAL: 사용자 최종 디자인 수용은 별도. 다음 사이클은 시작하지 않는다.

## 1. 최종 공개와 소스

- 공개 주소: https://mercury.kexxadrix.chatgpt.site/ · 로그인 없는 public.
- 공개 버전 **v5**, 배포 상태 **succeeded**, 2026-09-17 **13:19:22 KST**. 공개 최종 검사·정리 완료 13:23 KST.
- 소스 루트: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site`.
- project_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`.
- 최종 sourceId: `a3bef90ec3c36b3d9568fb5466a4a82336667b7335aae7ee8ec7e2b2f88ee1be` (129파일).
- commit: `48a02462ffa0a98e8dc3b60fcf54286b1ac21783`.
- version_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_2f31cd73a78881918e232d3c419bdcc4`.
- deployment_id: `appgdep_6aab6a40238c8191aae7a9737b74fc33`.
- [배포 응답](qa/r6/public-v5/deployment.json), [종료 기록](qa/r6/public-v5/completion.json), [최종 공개 화면](qa/r6/public-v5/public-full-1920.jpg).
- 공개 CSS SHA `3404ef1c4d91998626dfad990838bfffb020ec788fc76c336ef1521d0fa9b166`가 독립 감사한 production build와 바이트 일치했다. [익명 HTTP·CSS 대응](qa/r6/public-v5/anonymous-http.json).

## 2. 완료한 구현과 변경 파일

- 1920 고정 셸·272/1280/320 열·독립 스크롤 유지. 초과폭2560에서도 셸1920/x320. 헤더68·공지32·실제 콘텐츠 높이를 사용한다.
- 원형 심볼을 헤더 레터링 왼쪽에 원본 비율로 결합, 사이드바 전용 패널 제거. 중립 블랙/그레이 면·골드 강조·아이보리 역할, 단일 헤더 레일·제목판 접합 적용.
- 세 분류 각3개 총9개의 실제 대진을 동일284px 카드로 구현. 팀·상태·점수는 같은 바닥면, 마켓 설명은 평면 정보, 배당은 조작 버튼으로 구분했다.
- 검색·종목 필터·초기화·0결과, 선택/재클릭/동일 경기 교체/잠금/개별·전체삭제, 가상 로그인/로그아웃, 금액 검증·빠른추가·MAX·확인·브라우저 체험내역 저장/복원, 서비스·메뉴·출처 안내 완료.
- 가상 잔액1,000,000원, 회당1,000~100,000원 및 잔액 범위, 최근30개 내역. 실제 거래·정산·개인정보 입력은 없다.
- 계산은 중간 반올림 없이 수행. 1.84×1.56=2.8704 → 표시2.870, 10,000×2.8704=28,704원.
- 소스 변경: [page.tsx](site/app/page.tsx), [globals.css](site/app/globals.css), [demo-data.ts](site/app/demo-data.ts), [layout.tsx](site/app/layout.tsx), [button.tsx](site/components/ui/button.tsx).
- 신규 데이터: [match-records.json](site/app/match-records.json), [sport-menu.json](site/app/sport-menu.json). 신규 원본 스포츠 자산35개는 `site/public/sports/r6/`.
- 루트 운영 문서 AGENTS/STATE/DESIGN_SPEC/DECISIONS를 R6로 반영했다. [입력 원본](input/mercury-mvp-r6-package/MERCURY_MVP_R6/STATE.md)과 제공 자산은 그대로 보존했다. ZIP SHA `2C57D9021D2168483BEC7E9ED1B46BD7697A3EB172ADC978E4987652986195A9`.
- 이전 16% 시작/36% 중단/사용량 조회 실패 정지/대표 요소 하나 후 정지는 최신 사용자 지시로 폐기했다. 새 감시 시스템이나 자동 다음 사이클을 만들지 않았다.

## 3. 실제 역할과 독립 감사

- 진행: `01a0a8e7-acda-7ab0-a42a-44beb1b41e50` / 데모 사이트 전체 오케스트레이션. 문서·배정·결과 통합.
- 구현·Sites 배포: 기존 `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작. Site 소유권 유지.
- 독립 감사: 실제 신규 작업 `01a0ad4e-4703-7e60-a0aa-b3da5b765769` / MERCURY R6 독립 품질 감사. 읽기·직접 관찰·증거 수집만, 소스/사양/배포 수정 없음.
- WOG 직접 관찰: 12:00~12:07 KST, https://wog-1000.com/ , 1920×940/DPR1/zoom1. 서비스·헤더·배당 hover/눌림·종목 펼침·중앙 스크롤 확인. 외형·색·배치·자산·코드는 복제하지 않았다. WOG 배당 클릭 후 슬립 변화 미관찰은 기능 정상의 근거로 쓰지 않았다.
- [초기 감사](qa/r6/audit/initial-20260917/initial-audit.json) I01~I08: 혼합 팔레트/심볼 위치/중복 레일/정보 박스/카드·가상대진 혼재/사이드 패널/눌림 이동/데모 기능 미구현. 전체 구현에서 보완하고 감사자가 해소를 확인했다.
- [전체 Q01~Q10 감사](qa/r6/audit/full-1a3f550f/full-audit.json), 시작·종료129파일 일치. 당시 sourceId `1a3f550fdfd5fdfe99a6e4747e329e4536d86c01eae22806d9901269896bc790`.
- **F01:** 골드 CTA hover가 pressed 음영을 덮는 CSS 우선순위 문제. 골드 pressed 선택자 두 개만 추가. [변경](qa/r6/implementation/F01-source-delta.json), [독립 재확인](qa/r6/audit/recheck-5c032b0e/recheck-result.json). 서비스·가입·슬립·모달4군 직접 확인, 12:54:46~13:00:26 KST129파일 일치.
- **F02:** 공개 v4에서 production CSS 최적화 이후 공통 Button의1px 이동 유틸이 남음. [공개 v4 독립 재현](qa/r6/audit/F02-public-v4/finding-F02.json). 개발 화면 통과를 공개 통과로 확대하지 않고 완료를 보류했다.
- 공통 Button의 `active:not-aria-[haspopup]:translate-y-px` 한 토큰만 제거. [변경·원인](qa/r6/implementation/F02-source-delta.json), [실제 production Worker 자체 검사](qa/r6/implementation/F02-production-checks.json).
- [F02 독립 production 재확인](qa/r6/audit/recheck-a3bef90e/recheck-result.json): 5277의 실제 dist Worker에서 서비스·일반배당 held pointer 좌표/크기 동일, deltaY0, translate/transform none, F01 음영 유지. 시작13:12:43·종료13:14:48 KST129파일 모두 최종sourceId와 일치.
- 최종 독립 판정: **A 사양 준수 / B 직접 본 WOG의 정렬·재질·위계·상태 품질 대비 완성도 / C 로컬 데모 기능 모두 통과**, 열린 결함0. 기존 통과 증거는 재사용하고 변경 영향만 재검사했다.

## 4. 검증과 공개 결과

- [기술검사](qa/r6/implementation/technical-checks.json): TypeScript/build 통과, 변경 앱 lint0. F01/F02 후 build 통과, F02 변경 Button 파일 lint 통과.
- [계산17검사](qa/r6/implementation/calculation-check.json), [자체 브라우저 기능](qa/r6/implementation/browser-checks.json), [치수·상태](qa/r6/implementation/geometry.json), [폰트](qa/r6/implementation/font-checks.json).
- Pretendard JP·DIN 실제 글리프, Omnigothic Adobe custom glyph·로딩 확인. Adobe client useEffect 초기화 해결 보존. 일본어 문구가 없어 Heisei 실제 일본어 글리프는 해당 없음.
- [실제 경기 출처](qa/r6/implementation/data-provenance.json), [35개 자산 대응](qa/r6/implementation/asset-mapping.json). 진행 담당도 사용9경기의 원본SHA/홈원정ID/시각/상태·점수/로고 경로를 [직접 대조](qa/r6/coordination/selected-data-check.json)해 일치를 확인했다. 전체678개 재수집·재조사는 하지 않았다.
- 공개 v5: 인증/쿠키 없는 GET200,9카드 모두284px, 이미지46개 정상, 깨짐0, 검색1결과, 조합2개 총배당2.870/예상28,704원, 콘솔오류0. [실제 공개 스모크](qa/r6/public-v5/browser-smoke.json).
- 공개 service/odds held pointer 모두 deltaY0·translate/transform none·F01 inset 유지. 공개CSS와 감사productionCSS SHA 일치, 최종source129파일 대응 확인.
- [공개 화면 조건](qa/r6/public-v5/capture-layout.json): viewport1920×940, shell940, 중앙816. 상단부터 실시간·마감임박·인기경기 순서이며 각 제목판48px.
- 임시 production5277은 구현자가 소유한 실행만 종료했고 listener 없음 확인. 기존5276와 TITAN3000 유지. 구현 작업의 기존 Site탭에 공개URL을 유지하고 viewport override·임시 제어를 해제했다. 구현 작업이 비활성 화면이므로 open_in_codex 전달은 queued이며, 현재 진행 작업의 전면 탭이 자동 전환됐다는 뜻은 아니다. 이 문서와 종료 답변의 공개URL로 바로 접속할 수 있다.

## 5. 보존·한계·다음 판단

- [R5 현지 STATE 원문](input/mercury-mvp-r5/STATE.md), [R5 최종 소스검사](input/mercury-mvp-r5/evidence/step-01/final-checks.json), [R5 최종 브라우저](input/mercury-mvp-r5/evidence/step-01/browser-verification-final.json), [R5 기본 화면](input/mercury-mvp-r5/evidence/step-01/final-basic-1920.jpg), [R5 선택 화면](input/mercury-mvp-r5/evidence/step-01/final-selected-1920.jpg) 보존.
- [이전 공개 v3 배포](input/mercury-mvp-r5/evidence/public-step-01/deployment-result.json), [이전 HTTP](input/mercury-mvp-r5/evidence/public-step-01/http-verification.json), [이전 공개 화면](input/mercury-mvp-r5/evidence/public-step-01/public-browser.jpg), R2 및 원래 ZIP/자산도 보존했다. 과거 예산·보류 문장은 현재 규칙이 아니다.
- [R6 첫 전체 화면](qa/r6/implementation/checkpoint-01-full.jpg), [9경기 선택 하단](qa/r6/implementation/nine-picks-lower.jpg), [확인창](qa/r6/implementation/confirmation.jpg), [중간 공개 v4](qa/r6/public/deployment.json)와 F02 실패 관측도 보존했다.
- TITAN/HADES, 기존 의존성·lock·Sites 프로젝트·브랜드 원본·등록 폰트 파일은 유지했다. 기존 untracked `tsconfig.tsbuildinfo`도 보존. 새 이미지 생성 없음.
- 데이터는 **2026.09.16 정적 수집 기록**, 현재 실시간 경기·배당이 아니다. 실제 거래·모바일 재배치는 범위 밖이다.
- 전체 저장소 lint19개는 변경 앱/Button 밖의 기존 항목이다. 기존 외부 Adobe 폰트 로딩 의존성은 유지한다. 이번 범위에서 관련 없는 의존성 교체나 전면 정리는 하지 않았다.
- F01 일부 원본 캡처는 도구의 축소 표면1920×703이므로 DOM1920×940과 구분 기록했다. F02 및 최종 공개는 원본1920×940 증거를 확보했다. raw CDP held-release와 일반 클릭의 차이를 감사 기록에서 구분했으며 일반 클릭 선택은 정상 확인했다. keyboard held 상태 전수 재검사·일본어 실문구 검사는 하지 않았다.
- **요청 범위 완료, 열린 구현 결함0. 남은 판단은 사용자 최종 시각 수용 여부다.** 다음 개선·추가 감사·새 사이클은 사용자 지시 전 시작하지 않는다.
