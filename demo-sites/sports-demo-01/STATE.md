# MERCURY — 현재 상태

문서 세트: **MOTION R9 · 2026-09-18** · 이전 R8/v8 완료 기록 보존  
STATUS: **R9 PUBLIC v9 배포·공개 기본 화면 확인 완료 / 사용자 피드백 대기 / 별도 검수는 사용자 지시로 미실시.**  
사용자 확정: NHL 등 기존 리그 로고 표현·팀명 현재 수준 통과. 전체 R8 디자인 최종 수용은 별도다.

## 0. MOTION R9 — 현재 실행

- 입력 [R9 STATE 원문](input/mercury-motion-r9-package/MERCURY_MOTION_R9/STATE.md)을 먼저 읽었다. ZIP SHA-256 `2C6585AB07793A56C89D61EDCF2BE45A81DECDD63946720515DE7C5420681B2A`. 원문 한 파일이며 새 이미지 자산은 없다. [입력 기록](runs/r9/coordination/intake.json).
- 이전 네 운영 문서의 전체 본문·SHA는 [변경 전 문서](runs/r9/coordination/previous-operating-documents.json)에 보존했다. 아래 v8 및 R8 v7의 실제 관측·증거 경로와 기존 입력/QA 파일은 그대로 유지한다.
- 대상: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site/`, https://mercury.kexxadrix.chatgpt.site/ , project_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`. 기록상 직전 공개 v8/commit `4f582b7ef30721b9f6f23fa62e845f63d7569a2c`; 실제 현지 HEAD·사용자 변경·호스팅 확인 후 이어 작업한다.
- 기존 구현 담당 `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작이 소스·Sites·기본 확인·배포를 맡는다. 진행 담당은 네 문서와 결과 취합만 맡는다. 별도 검수 작업은 배정·호출하지 않았다.
- 동작 참고는 `sports-demo-02/site/`의 현재 SIRIUS 코드다. 입력에서 사용자가 두 동작의 작동감을 승인했다고 전달했다. 참고 소스에서 실제 값·처리를 확인해 사용하며 문서의 제안값을 실제 값으로 단정하지 않는다. SIRIUS는 읽기만 하고 수정·재배포하지 않는다.
- 범위: MERCURY 각 3열 카드 섹션 최초6·추가6·접기6, 실제 목록 높이 아코디언과 중복 입력·위치/초점/선택 보존. 중앙 한 화면 이후 우하단 맨 위로, 중앙만 감속 이동, 사용자 입력 취소·모션 축소 처리. 버튼은 MERCURY 블랙·골드로 표현한다.
- 보존: 헤더·로고·레일 순서/폭·3열 카드/간격·폰트·이미지/배너·현재77경기 데이터·검색/필터/슬립/계산/계정 및 기존3000 서버. 추가 베팅 상세·SIRIUS 헤더/남색 스킨 이식·새 라이브러리·다음 단계 작업은 제외한다.
- 절차: 구현 → 통상 빌드·6→12→6/중앙 상단 복귀/선택 유지의 짧은 확인 → 같은 PUBLIC 주소 갱신·기본 화면 확인 → 사용자 피드백 대기. R8의 독립 QA·WOG·전수 감사 조건은 사용자 재개 지시 전까지 적용하지 않는다. 오래된 미검증 사항을 이번 모션의 새 완료 조건으로 만들지 않는다.

| R9 결과 항목 | 현재 상태 |
| --- | --- |
| 현지 시작 HEAD / 사용자 변경 | `4f582b7ef30721b9f6f23fa62e845f63d7569a2c` / 기존 미추적 `tsconfig.tsbuildinfo` 유지. 종료 시에도 같은 파일만 미추적이며 SHA-256 `CDFB9B8DA2935431333BCBEF72742BFC1B8CA54AFC857B2131B1B292A324AFB7` 보존 |
| 참고한 SIRIUS 소스와 실제 모션 값 | HEAD `0bdff8e9d67df19e4ae004e9ceb79715143fadc6`의 `app/page.tsx`, `app/match-motion.tsx`, `app/match-list.css`를 구현 담당이 직접 읽음. 높이 전환200ms ease-out / 상단 이동400ms, `scrollTop = start × (1 - progress)^3`. 모션 모듈 원본/복사본 SHA-256 `727E3DFD455F6232D18FD8B22A1A5E576930E1CD6675AC57BE4AFA7F50A17100` 일치. 입력 취소·중복 방지·초점·모션 축소 처리를 함께 재사용 |
| 변경 파일 | [page.tsx](site/app/page.tsx), [globals.css](site/app/globals.css), [match-motion.tsx](site/app/match-motion.tsx). 소스3파일 외 데이터·이미지·폰트·의존성 변경 없음. [구현·보존 원기록](runs/r9/implementation/changes.json) |
| 빌드·짧은 동작 확인 | 최종 `npm run build`, `tsc --noEmit --incremental false` 종료0. [짧은 현지 관측](runs/r9/implementation/basic-observation.json): 실제1920×940, 카드284px·3열·12px 간격 유지, 6→12→6·선택 배당/10,000원 유지. 두 번째 펼침에서 읽던 중앙 위치289px 유지. 12개 확장·선택/금액·좌우 스크롤0/18px를 유지하며 중앙959→0, 키보드 초점 중앙 복귀·버튼 숨김. 초기 자동화 초점 이동이 더보기를 보이게 스크롤한 이력은 별도 기록 |
| 실제 배치 조정 | 중앙 바깥816px 중 하단50px를 상단 버튼 공간으로 두어 실제 스크롤 높이766px. 카드 폭은 그대로. 상단 버튼36px·우측12px·하단14px, 면 `#141414`/테두리 `#806b3d`/기존 골드 화살표로 카드 조작과 겹치지 않음 |
| 공개 commit / version / deployment ID | PUBLIC v9, 2026-09-18 17:12:28 KST succeeded. commit `ba0e578207f39d8e59ef72859c0e50fecf4f067b`; version_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_6d96e4e250d8819199b109ed50dbc0a5`; deployment_id `appgdep_6aacf25b1d4081919370dcd266e580e7`. 기존 MERCURY URL·public 범위 유지. 아래 v8/v7은 이전 완료 기록 |
| 별도 검수 | 사용자 지시로 미실시 |
| 공개 화면 / 캡처 | [공개 기본 화면1920×940](runs/r9/public/mercury-r9-default-1920x940.jpg), [공개 관측](runs/r9/public/basic-observation.json), [완료·실제 배포 정보](runs/r9/public/completion.json). 구현 담당이 렌더와 접근성 트리에서 제목·기본18카드·3개 더보기를 확인. 확인 중 콘솔 표본 오류0. 진행 담당은 저장된 공개 캡처와 결과 기록을 읽고 취합했으며 별도 브라우저 검사는 하지 않음 |
| 남은 문제 / 미검증 | 요청된 짧은 확인에서 구현 오류는 발견하지 못함. 모션 축소·휠/터치 취소 분기는 원본 재사용이며 별도 동작 확인하지 않음. 전체 경기/필터 전수 감사 없음. 공개 DOM evaluate 연결이 앱 노드를 반환하지 않아 공개 computed-style 실측은 주장하지 않음; 치수·기능 관측은 현지, 공개 확인은 렌더·접근성 트리·캡처로 구분 |
| 보존 / 정리 / 사용자 판단 | SIRIUS 동일 HEAD·git clean, 재배포 요청 없음. 기타 프로젝트·기존3000 서버 유지. 구현용5287 서버 종료·viewport 복구·공개 탭 유지. 다음 작업 없이 MERCURY 적용 결과의 사용자 피드백 대기 |

간단한 실행 기록·캡처는 `runs/r9/implementation/`, `runs/r9/public/`에 남겼다. 네 운영 문서는 R9로 병합했고 이전 기록은 위 JSON과 아래 원래 경로에 보존했다. 새 운영 MD나 별도 PASS 보고는 만들지 않았다. 실제 완료는 이 절의 기록이며 입력 원문의 실행 전 표시는 원문 보존을 위해 수정하지 않았다.

## 0.1. 보존 기록 — 2026-09-18 오른쪽 배너 교체

- 입력: `D:/WebDL/ChatGPT Image 2026년 9월 17일 오후 06_46_00 (9).png`, 1672×941 PNG, 2,109,408바이트, SHA-256 `d56425d3aa57a2eb11f067f87dfc5db65496e4e511561f945a4b2efc8e392b99`.
- 기존 Sites 구현 담당에게 오른쪽 사진만 별도 원본 복사·참조 교체, 필요한 최소 크롭 조정과 기존 공개 주소 갱신을 배정했다. 왼쪽 원본·문구·CTA·다른 UI는 유지한다.
- 현지 적용: `site/public/banners/r8/mercury-event-woman.png`를 원본 SHA와 동일하게 복사하고 `site/app/page.tsx` 오른쪽 이미지 경로1곳만 변경했다. CSS 수정 없이 기존320×220px·object-position30% 50%를 유지한다.
- [현지 검사](qa/r8/right-banner-20260918/local-checks.json): 새 사진 정상 로드·얼굴과 문구/CTA 비겹침·이벤트 CTA 안내 모달 정상. [현지 전체 화면](qa/r8/right-banner-20260918/local-screen.png)은1920×940이며 진행 담당도 직접 열어 확인했다. local-right-banner.png는 도구가 잘못된 위치를 캡처해 유효 증거에서 제외했다.
- [현재 공개](https://mercury.kexxadrix.chatgpt.site/): **v8**, 2026-09-18 **11:11:32 KST succeeded**. commit `4f582b7ef30721b9f6f23fa62e845f63d7569a2c`. [배포 결과](qa/r8/right-banner-20260918/deployment.json). version_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_17d5048ffa688191ba833e48df9e071a`, deployment_id `appgdep_6aac9dbf8c4c8191afe647721163929d`. project와 public 범위는 그대로다.
- [기술 검사](qa/r8/right-banner-20260918/technical-checks.json): 빌드·diff check·배포 패키지 원본 SHA 통과. v7 대비 Site 변경은 `app/page.tsx` 경로1줄과 새 PNG1개뿐이다. CSS·왼쪽 사진·문구·CTA·나머지 코드/자산은 그대로다. 기존 미추적 `tsconfig.tsbuildinfo`는 보존했다.
- [비로그인 공개 검사](qa/r8/right-banner-20260918/anonymous-public.json): 페이지200·좌/우 각각의 자산 참조, 새PNG200·image/png·원본 SHA 일치. [진행 담당 별도 검사](qa/r8/right-banner-20260918/coordinator-asset-check.json)에서도 원본 일치를 확인했다.
- [공개 브라우저 확인](qa/r8/right-banner-20260918/public-browser.json)과 [최종 공개 화면](qa/r8/right-banner-20260918/public-banner-verified.jpg):1920×940, 새 오른쪽 사진·기존320×220 슬롯·30% 50% 크롭·얼굴/문구/CTA 비겹침을 진행 담당도 직접 열어 확인했다. public-right-banner-screen.png는 초기 불완전 페인트를 캡처해 완료 증거에서 제외했다.
- 이번 요청의 미완료·확인된 신규 결함은 없다. CTA 클릭은 현지 빌드에서 확인했고 공개에서는 사진/문구/CTA 표시와 자산을 확인했다. 변경 없는 전체 기능·독립 WOG 감사는 재실행하지 않았다. 아래 R8 v7 감사 PASS는 이전 소스 기록이며 새 사진의 독립 감사로 혼용하지 않는다. 사용자 최종 미감 수용은 별도다.
- 직전 운영 문서4개는 SHA 일치 사본 `input/pre-right-banner-docs-20260918-110110/`에 보존했다. 아래 §1~7은 R8 v7 완료 당시 관측과 증거다.

## 1. 보존한 R8 v7 버전과 작업 위치

- 공개 주소: https://mercury.kexxadrix.chatgpt.site/ · public 유지.
- Site 루트: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site`.
- project_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`.
- 최신 공개 **v7**, 2026-09-17 **20:02:21 KST succeeded**. commit `e5f4552d2e2011163365d1ccdd602d3bef7a7f3f`. [배포 결과](qa/r8/public/deployment.json).
- version_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_bb786aed744081919387ea6f40afdc0d`, deployment_id: `appgdep_6aabc89f9d148191929b8459794090b2`.
- 작업 시작 공개 v6/현지 HEAD는 `8b821074dffb0c51b5119210e6ac082177928b59`였다. [v6 완료 기록](qa/r7/public/completion.json)을 보존했다.
- R8 동결 sourceId: `ceb450e890ee845d811c719d597eae0c80e0e6185f9013c19ba2f7c2574715e3` /272파일. [감사 manifest](qa/r8/implementation/audit-ready.json).
- 감사 production http://127.0.0.1:5277/ 은 패키징 전 종료했다. 최종 LISTEN 없음 확인. 기존 개발 서버 http://localhost:5276/ 은 ::1:5276/PID45756으로 유지하며 IPv4 바인딩을 임의 변경하지 않았다.
- [감사 소스·패키지 대응](qa/r8/public/source-and-package.json):272파일 동결 바이트 일치. 기존 두 JSON의 Git 줄바꿈 정규화만 따로 기록했다. 공식 Sites 패키저를 Git Bash로 실행했으며 runtime cache를 제외했다.
- [진행 담당 별도 공개 HTTP 검사](qa/r8/coordination/public-http-check.json):20:04:42 KST, 쿠키/자격증명 없는 페이지200·MERCURY 제목·감사 CSS200/SHA 일치. 구현 담당의 [공개 HTTP 검사](qa/r8/public/anonymous-http.json)는 새PNG9개와CSS의200·원본SHA 일치도 확인했다.
- [공개 브라우저 검사](qa/r8/public/browser-smoke.json): LIVE3·종목8개·서비스119×36·양측배너/CTA·6개 추가 펼침과선택유지·검색·계산을 확인했다. 이미지 failed/pending0·콘솔표본 오류/경고0·금지문구0, guest/선택0/최초6·6·6/세열scrollTop0으로 복원했다. 공개 확인에서는 새 영수증·계정·입출금 변경 없이 기존 내역을 보존했다. 모달 종료 애니메이션 중의 초기 단일 판정 실패는 정지 후 재확인으로 정상 동작을 확인했다.
- [최종 공개1920 원본](qa/r8/public/public-final-original-1920.png), [공개 양측 배너](qa/r8/public/public-banners-1920.jpg)를 진행 담당도 직접 열어 확인했다. public-final-settled-1920.jpg는 이전 중앙 스크롤 위치, public-final-initial-verified-1920.jpg는 실제1671×940으로 전체 초기 화면 근거에서 제외했다. 정상 최종PNG는1920×940이며 리사이즈/합성하지 않았다.
- [최종 완료 기록](qa/r8/public/completion.json): 같은 감사 소스·v7·공개 검증·정리 결과를 보존했다. tracked clean, 기존 미추적 tsconfig.tsbuildinfo만 유지. 임시 검수 탭을 닫고 viewport를 복원했으며 공개 탭을 유지했다. 다음 사이클은 시작하지 않는다.

## 2. R8-01~05 결과

| ID | 구현 결과 | 현재 검증 |
| --- | --- | --- |
| R8-01 | 첫6개 중 실제 MLB 진행 시점3개,7회초·점수·LIVE 점. 기존77개/분류26·26·25 유지 | 원자료 독립 재수신 및 play/점수/시각 대조, 고정값·일반/reduced-motion 확인 |
| R8-02 | 충전/환전119×36px, 아이콘16px+라벨 한 줄.2열과 기존 클릭 동작 유지 | 기본/hover/focus+held·inset·무이동 확인 |
| R8-03 | 새 금속 종목 PNG8개를 좌측8행·전체 카드 종목 표시에 적용 | 0경기3종목 포함 매핑·RGBA·실루엣, 원본SHA 일치 |
| R8-04 | 제공 사진1장을 독립 크롭으로 좌240px/우220px 배너에 사용. 사진/DOM문구/CTA/CSS프레임 분리 | 얼굴 비가림·상태·CTA와 기존 슬롯/이벤트 메뉴 동일 동작 확인 |
| R8-05 | 자체 검사·독립 A/B/C PASS, 검수 캡처 보완·재확인·공개 v7 배포 | 공개 HTTP·원본자산/CSS·실제 화면과동작 확인 완료 |

NHL 등 리그 크기/받침/형태와 팀명 한글·영문 혼용은 사용자 통과로 잠갔다.1920 고정 셸·열272/1280/320·카드284px·독립 스크롤·숨긴 스크롤바·축소 헤더·지정 폰트·선택/해제/교체/잠금/계산/내역과 기존 F01/F02 보완을 보존한다.

## 3. 진행 자료와 배너 세부 값

- 현지 scoreboard25종에 진행 스냅샷이 없어 기존77개 중 MLB3개의 ESPN play-by-play만 추가 수집했다. [수집 기록](qa/r8/implementation/progress-collection.json), [원자료 대응](qa/r8/implementation/data-provenance.json), [진행 담당 별도 확인](qa/r8/coordination/progress-source-check.json).
- 경기401816943의 play4018169431200000059:7회초·1:1·2026-09-16T00:13:51Z. 경기401816960의 play4018169601200000059:7회초·6:3·2026-09-16T19:08:53Z. 경기401816961의 play4018169611200000059:7회초·5:1·2026-09-16T20:59:54Z. 모두 실제 과거 중간이닝 기록이며 홈·원정 순서다.
- 전체 표시 상태는 진행3/예정61/종료13. 기존77개 ID와 원본 완료 기록은 보존하고 별도 `live-snapshots.json`으로 당시 진행 표시를 적용했다. 현재 실시간 수신·자동 점수/시계/배당 갱신·재생이 아니다. LIVE 점만2.4초 밝기 변화, reduced-motion에서는 정지한다.
- ‘가능하면2종목’ 기본목표와 달리 MLB1종목이다. 실제 근거와 기존77개 보존을 우선한 실행 선택이며 사용자 요구 숫자를 임의 축소한 것은 아니다. DECISIONS D27에 기록했다.
- 좌측 사진240px·object-position40% 50%, 우측220px·30% 50%. 문구폭145px, 제목20px/24px, CTA는CSS height34px·기존Button min-height에 따른 실제 높이36px·하단17px. 자세한 독립 위치/크롭/오버레이 값은 DECISIONS D28과 CSS 변수에 있다. 승인된 최종 시안 수치와 구분한다.
- 좌측: `MERCURY SLOTS / 빛나는 밤, / 새로운 즐거움. / 슬롯 둘러보기`. 우측: `MERCURY / 당신의 밤을 / 더 특별하게. / 이벤트 보기`. 사진은 같은 원본1장이다. 새로운 슬롯·이벤트 페이지나 별도 편집 패널은 추가하지 않았다.

## 4. 독립 감사와 증거

- 진행·문서: `01a0a8e7-acda-7ab0-a42a-44beb1b41e50` / 데모 사이트 전체 오케스트레이션.
- 기존 구현·Sites 배포: `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작.
- 독립 감사: `01a0ad4e-4703-7e60-a0aa-b3da5b765769` / MERCURY R6 독립 품질 감사. 기존 작업 제목을 유지하며 R8로 재배정했다. 감사자는 소스·문서·배포를 수정하지 않는다.
- [초기 v6·WOG 관찰](qa/r8/audit/initial-v6-20260917/initial-audit.json): 첫6개 진행0/종료4/예정2, 세로 서비스, 구 종목 도상, 사진 없는 배너를 R8-I01~04로 기록했다. WOG의 작은 한 줄 서비스·사진/라벨 분리·마감을 추가 직접 관찰했으며 색상/외형/자산은 복제하지 않았다. WOG 자체1px 눌림 이동도 따라 하지 않았다.
- 본검수 증거는 `qa/r8/audit/ceb450e8/`. 원자료 재수신·진행/모션·양측 배너·서비스·전체77개와12번 확장·8종목(빈3종목 포함)·숨은검색·슬립/계산·로컬 영수증/새로고침·기존내역 보존·1920/2560을 직접 확인했다. 입력 동일한 과거 심층 검사는 [기존 증거 대응](qa/r8/audit/ceb450e8/unchanged-function-evidence.json)을 통해 재사용한다.
- [감사 종료 소스](qa/r8/audit/ceb450e8/source-verification-after.json):272파일 모두 sourceId 일치, 불일치/추가/누락0. [브라우저 건강](qa/r8/audit/ceb450e8/final-browser-health.json): 수집 로그 오류/경고 없음, 표시 이미지/노출 문구 이상 없음. 전체 네트워크 수집 완전성을 뜻하지 않는다.
- [최종 독립 감사](qa/r8/audit/ceb450e8/audit-result.json):19:33:38~19:57:37 KST, A 사양 / B WOG 관찰 대비 마감 / C 기능 모두 PASS, 독립53/53 통과. 확정 결함0·추가 소스 수정 요청 없음. 일부 초기 캡처의 지연 페인트·크기 문제는 정규 증거에서 제외하고 [실제2560 원본](qa/r8/audit/ceb450e8/16-wide-2560-original.png), [1920 양측 배너 원본](qa/r8/audit/ceb450e8/17-banners-1920-original.png), [눌림 원본](qa/r8/audit/ceb450e8/18-left-banner-held-original.png)으로 보완·재확인했다. JSON21개·이미지18개의 읽기 검증도 완료했다.
- 실제 제공 CSS `index.BRM1po-v.css`, SHA `341f9bffc483d7cca33a4303fddc6047e6e8eb64bb641f5f07b8913385872df4`가 빌드와 일치했다. 브라우저 override·마우스·viewport를 복원하고 감사자 탭만 닫았다. guest/잔액1,000,000 복원, 기존 내역 보존, localhost 감사용 영수증1개가 추가됐다. 공개본과 사용자 최종 수용은 별도 확인이다.
- [독립 감사자의 공개 인수 대조](qa/r8/audit/ceb450e8/public-handoff-verification.json): v7 완료 기록의 sourceId/272파일/CSS SHA와 최종 공개1920 PNG를 직접 대조해4/4 통과·추가 결함 없음. 이는 기록·원본 화면 대조이며 공개 브라우저 스모크를 감사자가 새로 실행했다는 뜻이 아니다.

## 5. 변경 파일과 기술 검증

- [page.tsx](site/app/page.tsx): 한 줄 서비스, 새 종목 표시, LIVE 표시, 편집 가능한 공통 배너 및 기존 CTA 연결.
- [globals.css](site/app/globals.css): 서비스 크기·종목 표시·배너별 크롭/문구/프레임·상태 효과.
- [demo-data.ts](site/app/demo-data.ts): 종목8개 매핑·진행 스냅샷 결합·안정된 경기/마켓 생성 후 진행 우선 표시.
- 신규 [live-snapshots.json](site/app/live-snapshots.json), `site/public/sports/r8/` PNG8개, [배너 사진](site/public/banners/r8/mercury-slots-woman.png).
- [v6 소스 대응](qa/r8/coordination/source-delta-v6.json): 기존262파일 삭제0, 수정3·추가10. 원본 match-records/logo-presentation·리그/팀 자산·브랜드·폰트·의존성/lock·Button primitive 유지. TITAN/HADES/3000은 변경하지 않았다. 기존 미추적 `tsconfig.tsbuildinfo`도 보존한다.
- [기술 검사](qa/r8/implementation/technical-checks.json): typecheck·변경 TypeScript lint·build·diff-check 통과. Sites helper의 Windows npm 경로 실패는 기존 Node/npm CLI 빌드로 해결했으며 의존성/소스 변경으로 우회하지 않았다.
- [데이터642검사](qa/r8/implementation/data-check.json), [브라우저60검사](qa/r8/implementation/browser-checks.json) 통과.1.84×1.56=2.8704→표시2.870,10,000×2.8704=28,704원. [선별9개 이미지 SHA](qa/r8/coordination/adopted-asset-check.json) 원본 일치.
- [좌측 중간 화면](qa/r8/implementation/left-banner-intermediate-scrolled.jpg) 이후 양쪽을 완성했다. [안정된 초기 화면](qa/r8/implementation/final-initial-settled-1920.jpg), [양측 배너](qa/r8/implementation/final-both-banners-1920.jpg), [2560 화면](qa/r8/implementation/final-wide-2560.jpg).
- 초기 `final-initial-1920.jpg`의 일부 배당 글자 결손은 다음 정상 캡처에서 사라졌다. 구현자·진행 담당이 새 settled 파일을 각각 직접 열어 정상 표시를 확인했다. 해당 초기 캡처와 일부 도구의 지연 프레임/축소 캡처는 정상 치수·완료 근거에서 제외하고 실제 코드 결함으로 단정하지 않았다.

## 6. 문서·입력·이전 증거 보존

- 루트 AGENTS/STATE/DESIGN_SPEC/DECISIONS 네 개가 최신 R8 운영 문서다. 새 운영MD는 만들지 않는다. [입력 검사](qa/r8/coordination/intake.json):42파일·이미지11개 SHA/해상도 일치·문서 R8 표기 확인.
- R8 입력 원문과 리소스는 `input/mercury-mvp-r8-package/MERCURY_MVP_R8/`에 유지한다. ZIP SHA `810EEA652E9E2DFE76F8F078572D43023A8E9A70E01156BEA8B5B163576217B2`.
- 직전 네 운영 문서는 SHA 일치 사본 [R7 최종 STATE](input/pre-r8-working-docs-20260917-191100/STATE.md)와 같은 폴더에 보존했다. [v6 공개 완료](qa/r7/public/completion.json), [R7 감사](qa/r7/audit/3cb5e2b2/recheck-result.json), 이전 R5/R6/R7 입력과 QA 경로를 유지한다.
- [v6 경기 기준](qa/r8/coordination/baseline-v6-records.json), [v6 로고 기준](qa/r8/coordination/baseline-v6-logo-presentation.json)은 변경 전 commit에서 읽어 보존했다. 원본 사진/종목/브랜드 이미지를 재생성·변형·삭제하지 않았다.

## 7. 남은 작업·미검증·판단

- 미완료: 이번 R8 구현·독립 감사·보완 확인·같은 주소 공개 배포 범위에는 없다.
- 독립 감사 PASS·열린 R8 결함0·공개 v7 배포 succeeded 및 공개 스모크/최종 화면 확인 완료. 소스 결함 수정은 추가로 요구되지 않았으며 부정확한 검수 캡처만 정상 원본으로 보완·재확인했다.
- 사용자 최종 디자인 수용은 별도다. 실제 라이브 수신·거래/인증/입출금 백엔드·모바일 재배치는 범위 밖이다. 일본어가 없어 Heisei 실제 일본어 글리프는 해당 없음.
- 기존 전체 저장소 lint19개는 변경 파일 밖이며 그대로다. 외부 Adobe 폰트 의존성을 유지한다. 잘린 네트워크 이벤트 수집이나 과거 favicon.ico 탐색404를 숨기고 전체 네트워크 오류0이라고 보고하지 않는다.
- 토큰/사용량 상한에 따른 중단 조건은 없고 별도 감시 시스템을 만들지 않는다. 이번 R8 공개 확인 후 다음 사용자 지시를 기다리며 자동으로 다음 사이클을 시작하지 않는다.
