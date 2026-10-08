# MERCURY White — PUBLIC v1 배포 / 2026-10-08

- 현재 공개 주소: https://mercury-white.kexxadrix.chatgpt.site/ . 링크가 있으면 누구나 볼 수 있는 PUBLIC v1이며 배포 상태는 `succeeded`다.
- 현재 승인된 아이콘 선택 색상까지 포함하여 배포했다. 배포 전 동결한 로컬 소스 345개는 그대로이며 기존 5418/PID41768, 5417/PID35992를 유지했다.
- 별도 배포 사본은 `publish/site/`, 소스 커밋 `694efe89b8f230030c21f554d674ab71617a60bc`다. 이 사본에만 호스팅 어댑터 설정·ignore·Sites 연결 파일을 추가했다.
- 빌드·타입 검사 통과. 실제 공개 화면에서 이미지 126개 정상, Figma 아이콘 41곳 및 전체/축구 아이콘 선택 상태를 확인했다. Sites public 설정과 실제 공개 브라우저 표시를 확인했다. 터미널 무인증 요청은 403으로 제한되어 별도 기록했다.
- 최신 인계는 [RELEASE.ko.md](RELEASE.ko.md), 통합 GitHub 수집 기준은 `backup/site-snapshots/20261008-mercury-white-public-v1/`이다. 아래의 미배포·등록만 수행했다는 표현은 당시 이력이며 이번 배포 지시로 대체됐다.

---

# MERCURY White — 종목 아이콘 선택 상태 / 2026-10-08

- 사용자 브라우저 코멘트에 따라 선택 종목 아이콘은 어둡게, 선택 해제 시 원래 금색으로 표시한다. 전체 탭은 기본 금색 atlas를 사용하고 선택할 때만 기존 어두운 트로피 이미지를 사용한다.
- 앱 수정은 `app/mercury-white.css` 하나다. 이미지 파일·컴포넌트·데이터·팔레트·레이아웃은 유지했고 검사 대상 272개 중 나머지 271개 해시가 동일하다.
- 빌드 통과, 1927×932 브라우저에서 전체 포함 10개 탭 선택·해제 검사 통과. 사이드바·최신 인기 게임 아이콘의 색상 필터는 변경되지 않았다. 이미지 오류 0개, 콘솔 오류·경고 0개. CSS만 변경되어 직전 타입 검사 결과를 재사용했다.
- 현재 로컬 5418은 PID41768, 5417/PID35992는 유지한다. 새 빌드 294개 및 실제 응답 CSS 일치를 검증했고 이전 dist를 `qa/sport-icon-state-20261008/runtime-before/dist`에 보존했다.
- QA는 실제 빌드를 임시 5498로 전달하면서 외부 Typekit을 차단하고 저장소를 메모리로 격리했다. UI·동작 오버라이드는 없다. 임시 탭·서버는 종료했고 사용자 탭은 조작하지 않았다. 커밋·push·공개 배포 없음.
- [축구 선택 화면](qa/sport-icon-state-20261008/soccer-selected.png), [전체 선택 화면](qa/sport-icon-state-20261008/all-selected.png), [브라우저 검증](qa/sport-icon-state-20261008/browser-verification.json), [실행 검증](qa/sport-icon-state-20261008/runtime-verification.json).

---

# MERCURY White — 메뉴 가독성·최신 인기 게임 아이콘 / 2026-10-08 (이전 단계)

- 브라우저 코멘트에 따라 활성 메뉴 글자를 짙은 브론즈 `#6b481b` 단색으로 조정하고 밝은 그라데이션·흐린 그림자를 제거했다. 금색 밑줄과 글자 크기·굵기·배치는 유지했다.
- 최신 인기 게임 5곳의 이전 PNG 직접 참조를 공통 `SportIcon`으로 교체했다. 종목 탭과 동일한 Figma 이미지·크롭을 사용하고 기존 14×14 크기는 유지했다. 이미지 파일과 경기 데이터는 변경하지 않았다.
- 앱 변경은 `app/mercury-sports.tsx`, `app/mercury-white.css` 두 파일이다. 검사 대상 app/public/theme 272개 중 나머지 270개는 SHA-256이 동일하다.
- 빌드와 타입 검사 통과. 1927×932에서 화면을 확인했고 최신 경기 클릭·국내형 전환·해외형 전환 3개 동작이 통과했다. 이미지 오류 0개, 브라우저 오류·경고 0개, 프레임워크 오류 화면 없음. 모바일 재검수와 전체 린트 재실행은 하지 않았다.
- 현재 로컬 5418은 PID24972이다. 새 빌드 294개와 실제 CSS 응답 일치를 확인했다. 이전 dist는 `qa/readability-latest-20261008/runtime-before/dist`에 보존했다. 5417/PID35992와 사용자 탭·저장 상태는 변경하지 않았다.
- 브라우저 검수는 실제 5418 응답을 임시 5498로 전달하고 외부 Typekit 요청을 빈 로컬 응답으로 대체하며 저장소를 메모리로 격리했다. UI와 동작 코드는 그대로다. 임시 탭·서버는 종료했다. 새 커밋·push·공개 배포 없음.
- [화면](qa/readability-latest-20261008/after-latest-1927.png), [브라우저 검증](qa/readability-latest-20261008/browser-verification.json), [빌드·원본 보존 검사](qa/readability-latest-20261008/static-verification.json), [실행 빌드 검증](qa/readability-latest-20261008/runtime-verification.json).

---

# MERCURY White — Figma 아이콘·색상 반영 / 2026-10-08 (이전 단계)

- 사용자 요청에 따라 Figma `333:2`의 아이콘 36곳, 숫자 배지, 선택 종목·마켓·경기 카드 테두리, 활성 메뉴의 금색 글자와 밑줄을 반영했다. 이미지 원본 2개를 별도 경로에 추가하고 피그마의 자르기 위치를 CSS로 재현했다.
- 현재 [로컬 화면](http://127.0.0.1:5418/)은 PID40968이다. 새 빌드 294개를 검증하고 5418만 한 번 재시작했다. 5417/PID35992와 기존 사용자 탭은 유지했다.
- 이번 앱 수정은 `app/mercury-sports.tsx`, `app/mercury-white.css` 두 파일과 `public/icons/mercury-figma-20261008/`의 PNG 두 개다. 기존 파일 344개 중 342개는 SHA-256이 동일하며 승인 v6 입력도 보존했다.
- 빌드·타입 검사, 1920×1080 화면 비교, 아이콘 36곳과 이미지 오류 0개, 종목·마켓·선택·메뉴 동작 6개를 확인했다. 린트는 기존 40개에서 39개로 줄었고 신규 진단은 없다.
- 동작 QA는 현재 5418 빌드의 응답을 임시 5498 서버로 전달하면서 저장소를 메모리로 격리하고 외부 Typekit만 로컬 빈 응답으로 바꿨다. 초기 직접 브라우저 격리 시도와 최종 통과 근거를 구분해 기록했다. 임시 서버·탭은 종료했다.
- [변경 및 검수 기록](qa/figma-sync-20261008/change-record.json), [최종 파일 검증](qa/figma-sync-20261008/final-verification.json), [최종 화면](qa/figma-sync-20261008/browser-verified-1920.png)을 따른다. 새 커밋·GitHub 백업·공개 배포는 하지 않았다.

---

# MERCURY White — 웜 차콜 배지 로컬 반영 / 2026-10-07 (이전 단계)

- 사용자 승인에 따라 SPORTS·LIVE·LV.0·BET 배지 4종에 배경 `#36312b`, 글자 `#f5e8c5`, 안쪽 테두리 `#806c49`를 적용했다. 크기·폰트·숫자칩·헤더 NEW/LIVE 칩·선택 탭과 배당의 주황색은 유지했다.
- 현재 [로컬 화면](http://127.0.0.1:5418/)에 반영됐으며 5418/PID18312가 실행 중이다. 이번 반영에서 5418만 한 번 재시작했고 기존 5417/PID35992는 유지했다.
- 앱 소스는 `b425507730a4f39dd393645ef4273653a7c13176` 기준에 `app/mercury-white.css`, `theme/mercury-white-button-polish.json` 두 파일이 미커밋 변경된 상태다. GitHub 백업 `11f6f9dc1e6923ce1d6e6bb9652c0e71a64f0705`에는 이번 배지 변경이 아직 포함되지 않는다. 새 커밋·push·배포는 하지 않았다.
- 빌드 exit 0, 실제 브라우저 8 PASS / 0 FAIL, 소스 341개 유지·변경 2개, 새 빌드 292개 일치·기존 빌드 292개 보존을 확인했다. 실제 서빙 CSS는 `index.C9jghax1.css`, SHA-256 `1ebd85b1977896b4b06e974fa2789dbfd34acdf07134601e0d3e4230b5546ab1`이다.
- [검수 기록](qa/badge-charcoal-20261007-101259/QA-REPORT.ko.md)과 [최종 검증](qa/badge-charcoal-20261007-101259/final-verification.json)을 따른다. 기존 외부 Typekit 폰트 검증 제한은 유지한다.

---

# MERCURY White — 로컬 정식 등록 / GitHub 보관 기준 / 2026-10-07 (배지 변경 전)

- 최신 사용자 지시: 현재 머큐리 화이트를 로컬과 GitHub에 등록하며 **공개 배포는 하지 않는다**.
- 정식 관리명은 **MERCURY White**, 시작 문서는 [INDEX.ko.md](INDEX.ko.md). 로컬 주소 http://127.0.0.1:5418/ , 앱 소스 `b425507730a4f39dd393645ef4273653a7c13176`, 브랜치 `mercury-white-20261007`이다.
- 현재 소스 343개·빌드 파일 292개가 최신 고정 명세와 일치하고, 실제 HTML/CSS 200 및 CSS 해시를 확인했다. 동일 입력의 최신 독립 QA 31 PASS / 0 FAIL 결과를 재사용한다.
- 앱·디자인·자산·승인 팔레트·서버는 유지한다. 새 Sites 등록·호스팅 연결·공개 배포는 실행하지 않았다. 앱 저장소의 remote 없음 상태도 유지한다.
- 통합 GitHub 수집 기준: `backup/site-snapshots/20261007-mercury-white-local/`. 등록·원격 검증 기록은 `E:/codexwork/Site-Skin-edit-backups/20261007-mercury-white-register/`에 둔다.
- 아래 22/f9/697 커밋과 미등록·백업 전 표현은 해당 단계의 과거 이력이다. 최종 카드/서비스 보완 b425와 현재 등록 기준을 우선한다.

---

# MERCURY White — 선택 상태 복원 완료 / 2026-10-07 (이전 단계)

**http://127.0.0.1:5418/** 에 최종 빌드를 반영했습니다. 소스는 `site/`, 브랜치는 `mercury-white-20261007`, 고정 커밋은 **22bba115d3df595c968f32c2ed8ba802ef454ad0**입니다. 원격 연결·push·배포는 없습니다.

사용자 피드백에 따라 선택된 종목·배당·마켓만 기존 f9/v6의 선명한 표현으로 복원했습니다. 종목은#ffc26f/글자#2b2826/테두리#ff8800, 배당·마켓은#ffbd61기반 warm그라데이션/검정글자/테두리#ff8800입니다. normal·hover·focus9상태가 기존 편집기에 승인 v6를 넣은 격리 렌더의 계산 스타일과 완전히 같습니다. 원래 focus그림자도 포함합니다.

일반·서비스·MAX·작은칩·비활성 버튼의 가독성 개선은 직전697그대로입니다. 12개 비선택 그룹의 normal/hover/focus/disabled 계산 스타일과 이미지164개의 경로·크기·필터가 같음을 확인했습니다. 선택 종목 안의 숫자칩도 현행 단색을 유지합니다. 서비스 PNG9개의 scoped brightness70%와 기존 전역v6설정, 원본픽셀을 유지했습니다.

승인 v6 원문과 site사본은3132바이트·SHA-256 `f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5`로 보존됐습니다. 생성된 기본 CSS도 유지하고 `app/mercury-white.css`와 별도 `theme/mercury-white-button-polish.json` v2만 바뀌었습니다. 레이아웃·폰트소스·데이터·동작·헤더/로고/배너는 그대로입니다.

실제 프로덕션 UI24 PASS, 선택/비선택 비교7 PASS, 빌드exit0입니다. 타입·신규모듈lint는 입력이 같은 이전통과 검사를 재사용했고 관련page진단은 기존1/신규0입니다. 최종 Git diff형식 검사와 소스/빌드/자산 해시를 확인했습니다. 개인브라우저·IAB·사용자live저장소를 사용하지 않았습니다. Browser plugin not available, 기존 Playwright의 새비영구 컨텍스트에서 실제5418화면을 검사했고 CSS삽입은 없습니다.

새5418 PID36312·시작08:40:51UTC, wrapperPID22268입니다. 사용자가 승인한 재시작 범위에서 이번복원반영을 위해5418만1회 재실행했습니다. 기존5417/PID35992·시작03:54:38UTC는 유지했습니다. 최종HTTP200/동일PID/분리실행/stderr0/실제CSS 근거는 새QA의server-final.json과served-css-proof.json입니다. 서비스·스케줄러·보안·앱설정·캐시 변경은 없습니다.

직전697의 소스ZIP/manifest/캡처/문서/기존dist는 `qa/selected-restore-20261007-083206/baseline/`와 `runtime-retired-697/dist/`에 보존했습니다. 이전f9기록도 기존QA폴더에 유지합니다. 컴파일용 `qa/button-polish-20261007-080224/build-site`는 재사용하는 staging폴더로, 현재22빌드를 만들었으며 고정자료와 구분합니다.

최신 인계는 `qa/selected-restore-20261007-083206/QA-HANDOFF.ko.md`, 전체해시는 같은폴더`final-source.json`, 부모진행조회는`qa/progress-selected-restore.json`입니다. 사용자최종미감 승인과 독립QA는 아직 없습니다. 실제거래/원격push/배포/이미지재생성0입니다.

선택예시 PNG `libfile_dad322f7f4f481919480b35b4f18ed64`는 메타데이터와prepare_materialize에 성공했지만 지원helper가 `library file transfer failed: download failed`로1회 실패했습니다. 재시도/우회하지 않았고 실제픽셀은 못봤습니다. 기존첨부PNG Library404와 AdobeTypekit3개네트워크차단도 별도 한계로 유지합니다.


## 최신 후속 완료 — 2026-10-07

커밋 `b425507730a4f39dd393645ef4273653a7c13176`. 경기 카드 전체 선택/검토 테두리를 추가했고 카드61개치수변화0입니다. 충전·환전·고객센터는 실제헤더메뉴그라데이션을 normal/hover/focus에적용, 글자/마스크최소10.31:1입니다. 기존v6선택9상태·다른11버튼·이미지164개유지. 실제빌드8PASS/0FAIL/빌드exit0, 타입/lint동일입력의통과재사용. CSS/파생기록2파일만변경, 승인v6원문3132바이트/기존SHA보존입니다.

5418 PID23780·시작08:56:03UTC/HTTP200/분리실행144초이상/stderr0. 기존5417/PID35992유지. 실제dist292파일/staging해시동일, 이전22빌드는 qa/card-outline-service-20261007-085124/runtime-retired-22/dist보존. 최신인계 같은QA폴더의 QA-HANDOFF.ko.md 및 final-source.json. 새ZIP0. 첨부3개는메타데이터만확인/픽셀전달불가. 외부폰트WinError10013차단은재시도하지않았으며실제로컬CSS해시일치. 원본/공개사이트·앱설정·배포·실제거래변경0. 사용자최종미감승인별도입니다.
