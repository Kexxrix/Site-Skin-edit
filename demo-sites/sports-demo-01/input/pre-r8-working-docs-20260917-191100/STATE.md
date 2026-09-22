# MERCURY — 현재 상태

문서 세트: **MVP R7 · 2026-09-17**  
STATUS: **R7-01~08 전체 구현·독립 감사·두 결함 보완·재확인 완료(A/B/C PASS). 같은 주소에 공개 v6 배포 성공, 최종 공개 화면·스모크 검증 PASS.**  
DESIGN_APPROVAL: 사용자 최종 디자인 수용은 별도다. 이번 배포를 마친 뒤 다음 검수 지시를 기다린다.

## 1. 공개 주소와 검증 소스

- 기존 공개 주소: https://mercury.kexxadrix.chatgpt.site/ · public 유지, 새 Site를 만들지 않는다.
- Site 루트: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site`.
- project_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`.
- 최종 감사 소스: `3cb5e2b2fc738a6973592b8b4f050227d27872d2739732a6366edf87fed59702` /262파일.
- [감사 소스 manifest](qa/r7/implementation/audit-ready-fixed.json). 감사 production URL http://127.0.0.1:5277/ 은 검수 후 종료했다. 기존 개발 서버 http://localhost:5276/ 은 보존했다. 개발 서버의127.0.0.1은 현재 IPv4 바인딩되지 않는다.
- 최종 감사 CSS: `index.WjcoLJFK.css`, SHA `6becef993ee5d2aed10d45abf3dfe17ea667ba6ea863db870dfc9b44aa0e5d92`.
- 최신 공개 **v6**, 2026-09-17 **17:58:42 KST succeeded**. commit `8b821074dffb0c51b5119210e6ac082177928b59`. [배포 응답](qa/r7/public/deployment.json).
- version_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_1b2dcb237b288191a1b9e7fb4d3c99bc`. deployment_id: `appgdep_6aababb6243c8191b908cb16fbe32d7e`. [감사 소스·배포 패키지 대응](qa/r7/public/source-and-package.json).
- [최종 공개 화면1920×940](qa/r7/public/public-final-settled-1920.jpg), [전체 펼침 하단](qa/r7/public/public-expanded-bottom-1920.jpg). 진행 담당도 최종 공개 JPEG를 직접 열어 확인했다.
- [최종 완료 기록](qa/r7/public/completion.json):18:08 KST, tracked clean·기존 미추적 tsconfig.tsbuildinfo 유지. [캡처 형식 검사](qa/r7/public/capture-filenames.json): 공개 원본12장은 JPEG1920×940이며 잘못 붙었던 확장자만 .jpg로 바로잡아 바이트SHA를 보존했다.

## 2. R7-01~08 완료 내역

| ID | 반영 결과 | 검증 |
| --- | --- | --- |
| R7-01 | 국내형 스포츠로 제목·연결 안내·접근성 이름 통일 | 독립 확인 |
| R7-02 | 충전/환전2열 유지·119×64px로 높이 압축 | 실제 치수·상태 확인 |
| R7-03 | 본문/하단/메타/계정/팝업/내역/오류/접근성의 데모 해설 삭제·일반 서비스 용어 사용 | 모든 해당 상태 직접 관찰 |
| R7-04 | 종목/팀 원형 받침, 리그 형태 예외.127개 받침 제거·40개 유지 | Jets 단일 예외 보완 후 독립 재확인 |
| R7-05 | 실제 그림 높이와 중심 보정. 일반 종목/리그20px, 넓은 퍽/NHL15px로 맞춤 | 원본 alpha와 실제 화면 비교 |
| R7-06 | 고유 실제 fixture77개. 실시간26/국내형26/인기25, 중복0 | 원자료·팀/리그·시각·상태/점수·자산 대조 |
| R7-07 | 최초6/6/6, 각 클릭6개 추가. 마지막2/2/1개 후 버튼 제거 | 모든 확장단계·검색/필터·선택/스크롤·키보드 확인 |
| R7-08 | 헤더 심볼36×36·레터링144×42, 헤더68 유지·상하 여백 확보 | 실제 화면·원본 비율 확인 |

치수는 검수 후 채택한 구현값이며 사용자 승인 시안과 구분한다. 1920 고정 셸, 열272/1280/320, 카드284px, 독립 스크롤·숨긴 스크롤바, 중립 블랙·골드·아이보리, 지정 폰트와 기존 선택·금액·내역 기능을 유지한다.

## 3. 변경 파일과 원본 보존

- [page.tsx](site/app/page.tsx): 분류별 펼침, 표시 문구, 로고 표시, 접근성 알림의 기준 컨테이너.
- [globals.css](site/app/globals.css): 브랜드/서비스/로고/더보기 표시와 포커스·눌림 상태.
- [demo-data.ts](site/app/demo-data.ts), [match-records.json](site/app/match-records.json):77개 실제 경기와 마켓·일반 표시 명칭.
- [layout.tsx](site/app/layout.tsx): MERCURY 스포츠 제목·설명.
- [logo-presentation.json](site/app/logo-presentation.json): 원본 투명 여백에 맞춘 표시 수치·개별 받침 여부. 신규 스포츠 PNG132개는 `site/public/sports/r7/`.
- 이전 v5의129개 파일은 모두 남아 있다. 수정5개·추가133개이며 기존 파일 삭제0. [v5 대비 파일 대응](qa/r7/coordination/source-delta-v5.json)은 초기 감사본 기준이고, 이후 같은 파일 안의 두 보완은 [수정 delta](qa/r7/implementation/fixes-static.json)에 기록한다.
- 원본 브랜드2개·수집 스포츠 PNG·폰트·의존성/lock·Sites 프로젝트·공통 Button의 R6 이동 제거를 보존했다. TITAN/HADES는 수정하지 않았다. 기존 미추적 `tsconfig.tsbuildinfo`를 삭제하거나 커밋하지 않는다.

## 4. 독립 감사와 보완·재확인

- 진행·문서: `01a0a8e7-acda-7ab0-a42a-44beb1b41e50` / 데모 사이트 전체 오케스트레이션.
- 기존 Site 구현·배포: `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작.
- 기존 독립 감사: `01a0ad4e-4703-7e60-a0aa-b3da5b765769` / MERCURY R6 독립 품질 감사. 기존 작업 제목을 유지하며 R7에 재배정. 소스·운영 문서·배포 수정 없이 관찰/증거/피드백을 수행했다.
- [초기 v5 관찰](qa/r7/audit/initial-v5-20260917/initial-audit-and-scope.json):16:35~16:36 KST. [WOG 직접 관찰](qa/r6/audit/initial-20260917/initial-audit.json)은 같은 날12:00~12:07 KST의 기존 감사자 근거를 재사용했다. WOG 외형/색상/코드/자산은 복제하지 않았다.
- [전체 감사](qa/r7/audit/26f0d1ff/audit-result.json):17:05:28~17:35:17 KST, source `26f0d1ff56324d8cc2554aa38239d3bdf3da6acf8b8aa418d48ad03dff13d007`.262파일 시작·종료 일치.77개 카드 전체·모든 확장 단계·9종목 필터·숨은 Le Mans 검색·계정/금액/정밀 계산/저장 내역/팝업·2560·모션 확인. 당시 A/B 수정 필요·C 로컬 기능 통과.
- **R7-F01:** 검은 카드에 묻힌 New York Jets 로고에만 원형 받침 복구. 원본PNG/비율/내용 유지, 받침40·생략127로 조정.
- **R7-F02:** focus-visible box-shadow의 `!important` 한 곳만 제거. 포커스 outline을 유지하면서 눌림 inset이 공존하도록 보완. 일반 포인터와 R6의1px 이동 문제는 회귀하지 않았다.
- [보완 범위](qa/r7/implementation/fixes-static.json): globals.css·logo-presentation.json 두 파일만 변경, 다른260파일과 모든PNG 바이트 동일. [자체 영향 검사](qa/r7/implementation/fixes-browser.json).
- [최종 독립 재확인](qa/r7/audit/3cb5e2b2/recheck-result.json):17:44:58~17:52:21 KST. 최종262파일·실제CSS 시작/종료 일치. Jets/Winnipeg Jets 가독성, 금색·일반 서비스/일반·선택 배당/슬립/확인 모달6군의 settled focus+active·outline2px·inset·좌표4축delta0을 확인했다. 기본/hover/selected/disabled/Tab제외 회귀 없음.
- **최종 A 사양 / B 관찰한 WOG 마감 기준 / C 로컬 기능 모두 PASS. R7-F01/F02 모두 closed_verified, 열린 R7 결함0.** 전체 기능·77개·2560·모션의 통과 근거는 입력이 같은260파일 대응으로 재사용했다. 감사 PASS는 사용자 미감 승인이 아니다.
- 사전 검수에서도 작은 리그 도상과 접근성 알림이 root scrollHeight를 늘린 결함을 보완했다. [실패 캡처](qa/r7/implementation/production-expanded-bottom.png)는 보존하고, [정상 전체 펼침](qa/r7/implementation/final-expanded-bottom-1920.png)과 독립 확장 검사에서 windowY0/root940을 재확인했다.

## 5. 기술·데이터·화면 검증

- [기술 검사](qa/r7/implementation/technical-checks.json): typecheck·변경 앱/Button lint·build 통과. 두 보완 후 production 재빌드 및 실제 새CSS 일치 확인.
- [계산 검사20개](qa/r7/implementation/calculation-check.json) 모두 통과.1.84×1.56=2.8704→표시2.870,10,000×2.8704=28,704원.
- [브라우저 자체 검사](qa/r7/implementation/browser-checks.json), [정상1920 치수](qa/r7/implementation/final-layout.json), [보완 후1920 화면](qa/r7/implementation/fix-final-initial-1920.png), [2560 화면](qa/r7/implementation/final-wide-2560.png).1920×940은 시험 viewport이며 사용자 모니터 실측값이 아니다.2560에서도 셸1920/x320·카드폭 동일.
- [데이터 출처](qa/r7/implementation/data-provenance.json), [자산 대응](qa/r7/implementation/asset-mapping.json).2026.09.16 보존자료와09.17 보충자료의 정적 스냅샷77개(예정61·종료16), 현재 라이브 갱신이나 실제 배당이 아니다. 출처·기준 시각은 내부에 보존한다.
- [진행 담당 별도77개 대조](qa/r7/coordination/selected-records-check.json): sourceSHA/eventID/홈원정ID·원어명/시각/상태·점수/이미지 존재 일치, 실패0. [감사본 대응](qa/r7/coordination/audit-data-evidence-reuse.json).
- [164개 선택 자산의 원본·대상SHA](qa/r7/coordination/asset-preservation-check.json), [브랜드 원본 동일성](qa/r7/coordination/brand-original-check.json) 확인.132개 새 파일 외 기존 자산 재사용이 포함된164개 매핑이다.
- 전체 감사에서 표시 이미지318개 정상. 재확인 현재 상태106개 정상·콘솔 경고/오류0. 과거 favicon.ico404/탐색 취소 요청·잘린 이벤트 버퍼를 포함하므로 전체 네트워크 오류0을 주장하지 않는다.
- [최종 공개 브라우저 검사](qa/r7/public/browser-smoke.json): 동일한 최종 sourceId와 CSS에서77개 고유 경기·모든12개 확장 단계·마지막26/26/25와 버튼 제거·선택2개 유지·Le Mans 검색·Jets 받침·금액 계산·포커스와 눌림6군을 확인했다. 모든 확장 단계 rootHeight940/windowY0, 공개 전체 펼침 이미지318개 failed0/pending0, 최종 초기화 상태82개 failed0/pending0, 수집된 콘솔 오류0. 검색 직후 로딩 중 이미지4개를 최종 깨짐으로 판정하지 않았다.
- [로그인 없는 공개 HTTP 검사](qa/r7/public/anonymous-http.json): 페이지·감사 CSS·Jets PNG·favicon.svg 모두200. CSS/PNG SHA가 감사본과 일치한다. [진행 담당 별도 공개 HTTP/CSS 검사](qa/r7/coordination/public-http-check.json)도200·제목·CSS SHA 일치를 확인했다. 이4개 요청을 전체 네트워크 무결성으로 확대 해석하지 않는다.
- 공개 화면은 guest·선택0·최초6/6/6으로 정리했다. 확인 모달은 취소하고 새 내역을 만들지 않았으며 기존 내역을 보존했다. 독립 감사의 동일 소스2560·9종목·계정/저장 내역·모션·폰트 검사는 재사용했다.

## 6. 운영 문서·이전 기록 보존

- 이 루트 AGENTS/STATE/DESIGN_SPEC/DECISIONS 네 파일이 최신 MVP R7 운영 문서다. 새 운영MD를 추가하지 않는다. [접수 검사](qa/r7/coordination/intake.json).
- [R7 입력 원문](input/mercury-mvp-r7-package/MERCURY_MVP_R7/STATE.md), 브랜드2개·참고19개 보존. ZIP SHA `FB9E9B6C23D6959D96A41EBB96253CF81513448403C578992EB8F338622B7FCE`.
- 직전 현지 운영4문서는 SHA일치 사본 [R6 최종 STATE](input/pre-r7-working-docs-20260917-163217/STATE.md)와 같은 폴더에 보존했다. 과거 관측 결과·증거 경로를 삭제/덮어쓰지 않았다.
- [R5 원래 STATE](input/mercury-mvp-r5/STATE.md), [R5 소스 검사](input/mercury-mvp-r5/evidence/step-01/final-checks.json), [R5 브라우저 검사](input/mercury-mvp-r5/evidence/step-01/browser-verification-final.json), [v3 배포](input/mercury-mvp-r5/evidence/public-step-01/deployment-result.json), R2/R5/R6 입력 아카이브 유지.
- [v5 배포](qa/r6/public-v5/deployment.json), [v5 완료·증거](qa/r6/public-v5/completion.json), [v5 화면](qa/r6/public-v5/public-full-1920.jpg), [R6 F01 재확인](qa/r6/audit/recheck-5c032b0e/recheck-result.json), [R6 F02 production 재확인](qa/r6/audit/recheck-a3bef90e/recheck-result.json) 보존.

## 7. 미완료·미검증·남은 판단

- 미완료: 이번 R7-01~08 구현·감사 보완·재확인·같은 주소 공개 배포 범위에는 없다.
- 미검증/범위 밖: 실제 인증/입출금/베팅 백엔드와 모바일 재배치는 추가하지 않았다. 경기 자료는 보존 시점의 정적 스냅샷이며 현재 경기/배당을 갱신하는 서비스가 아니다. 일본어 문구가 없어 Heisei 실제 일본어 글리프는 해당 없음.
- 기존 전체 저장소 lint19개는 변경 파일 밖 항목이다. 외부 Adobe 폰트 의존성은 유지한다.
- 전체 감사 캡처04는 도구 축소1920×703으로 정규치수 증거에서 제외했다. 재확인 JPEG10개는 모두 원본1920×940. 모달 입장 애니메이션과 정지 후 눌림을 구분했고, locator가 먼저 스크롤한 Enter스모크를 중앙 스크롤 보존의 재입증으로 쓰지 않았다.
- 사용자 최종 시각 수용은 대기한다. 토큰/주간36%/+20%/조회실패/대표요소 완료 중단 조건은 폐기했다. 별도 감시 시스템이나 자동 다음 사이클은 만들지 않는다.


