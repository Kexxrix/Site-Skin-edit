# MERCURY White — 선택만 복원한 최종본

사용자께서 “선택된 버튼은 기존꺼로 유지해야겠는데 색이 너무 약해. 그라데이션 버튼들은 해결됐으니 지금상태로 유지하고”라고 요청하셨습니다. **선택된 종목·배당·마켓만 f9/v6로 복원했고, 일반·서비스·작은 칩의 개선은 유지했습니다.**

실행 주소는 **http://127.0.0.1:5418/**, 고정 커밋은 **22bba115d3df595c968f32c2ed8ba802ef454ad0**, 직전 기준은 **697a5711c8684eadd7c7f9068fe2974d47a91fb7**, 선택 기준은 **f9e5847acccbe6bd2790abab9b448d15494ffe17**입니다. 독립QA·사용자 최종 미감 승인은 아직 없습니다.

## 변경 내용

변경 파일은 `app/mercury-white.css`, `theme/mercury-white-button-polish.json` 두 개입니다. 선택된 요소의 여섯 개 파생 역할 덮어쓰기를 제거하여 승인 v6 계산값을 그대로 상속했습니다. 선택 부모의 추가 흰색 highlight를 제거하고 원래 focus 그림자와 종목 focus테두리를 복원했습니다. 전체JSON이나 일반버튼 개선을 되돌리지 않았습니다.

- 종목 `[aria-pressed=true]`: 배경#ffc26f·글자#2b2826·테두리/focus#ff8800.
- 배당/마켓 `[aria-pressed=true]`: #ffbd61 기반 warm그라데이션, 검정글자·테두리#ff8800·검정focus. 실제fill은#ffc370→#ffbd61→#ffb752입니다.
- 일반/서비스/MAX/작은칩/disabled: 직전697과 같습니다. 선택 종목의 숫자칩도 현행 단색입니다. 서비스9개 scoped PNG필터와 원본픽셀, 전역v6 보정은 그대로입니다.

승인 원문과 기본CSS는 수정하지 않았습니다. 원문3132바이트·SHA-256 `f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5`이며 site사본과Git바이트가 같습니다. 파생 기록만v2입니다. 레이아웃·폰트소스·데이터·동작·자산은 보존됐습니다.

## 실제 렌더 검사

Windows·Node24.14.0·설치된 Playwright Chromium, 새 비영구 컨텍스트를 사용했습니다. Browser plugin not available. 개인브라우저·IAB·user live저장소를 조작하지 않았습니다. 최종검사는 **실제5418의 새 프로덕션 빌드**이며 CSS삽입은 없습니다.

| 검사 | 결과 | 증거 |
|---|---|---|
| 선택3그룹 × normal/hover/focus | 기준과 완전일치 | `f9-selected-reference.json`, `selected-restoration-results.json` |
| 비선택12그룹 × 상태 | 직전697과 완전일치 | `before-state-reference.json`, `selected-restoration-results.json` |
| 이미지164개 경로/크기/필터 | 동일 | 위 결과JSON |
| 선택·비선택 집중비교 | 7PASS/0FAIL | 위 결과JSON |
| 전체 동작/UI | 24PASS/0FAIL | `restore-ui-results.json` |
| 빌드·소스/빌드해시·Git diff | PASS | `build.log`, `preservation-results.json`, `final-source.json` |
| 타입·신규모듈lint | 이전exit0 재사용 | `reused-checks.json`, 소스 입력동일 |
| 관련page lint | 기존1/신규0 재사용 | page.tsx 바이트동일, 기존EffectSetState |
| 실제server/CSS/분리실행 | PASS | `server-final.json`, `served-css-proof.json` |

기준은 기존5417의c5 편집기에 정확한 승인v6를 넣은 격리렌더입니다. f9와 같은 계산코드/기본CSS/표현으로 3선택그룹의 normal/hover/focus 계산스타일을 새로 측정했습니다. 이는 개인live화면이나 첨부PNG가 아닙니다. 색·gradient·border·shadow·outline·filter·font·fontSize·width·height가 일치합니다. 비선택은 재시작 전 실제697화면과 재시작 후22화면을 비교했습니다.

페이지 식별·실제콘텐츠·오버레이·선택교체/해제·검색/필터/접기·마켓·팝업·슬립유지/복원·2560/1920/1366배치·JavaScript비활성 첫렌더를 확인했습니다. 5000×1.56=7800이며 Guest거래버튼disabled, 잔액1,000,000원·내역0입니다. JS예외0·일반local요청실패0·GET외요청0입니다. AdobeTypekit3개차단과JS비활성 컨텍스트의 의도적csp는 기존환경조건으로 구분했습니다.

직접픽셀열람한 실제 화면은 `after-first-entry.png`, `selected-full.png`, `after-sports.png`, `after-quick.png`, `selected-hover.png`, `selected-focus.png`, `retained-disabled.png`입니다. `before-first-entry.png`가697기준, `f9-reference-sports.png`/`f9-reference-odds.png`는 승인v6선택기준입니다. 원래고정캔버스와pane별스크롤을 유지합니다.

## 서버·고정본 보존

사용자가 승인한5418재시작 범위에서 PID31792·시작08:23:29UTC·loopback listener를 식별한 뒤 해당 프로세스만 종료했습니다. 기존dist를`runtime-retired-697/dist`에 보존하고 검증된22빌드를 복사해292파일SHA-256 전부일치를확인했습니다. 숨김cmd wrapper의 내부로그리다이렉션 방식으로1회 실행했습니다. 이번follow-up1회, 전체버튼개선/피드백반영 누적2회입니다. 새5418PID36312·시작08:40:51UTC, wrapperPID22268이며 실행쉘종료 후동일PID·HTTP200·stderr0을확인했습니다. 기존5417/PID35992·시작03:54:38UTC는유지합니다.

기존편집기340개·원본MERCURY337개 HEAD/상태/파일해시, 공개자원249개를 보존했습니다. 697 소스ZIP/manifest/캡처/문서/dist는`baseline/`에 남깁니다. f9기록도 이전QA에보존합니다. 기존빌드용staging폴더는 재사용했지만 이전실행빌드와 고정archive는 별도 보존했습니다. 서비스·스케줄러·보안·앱설정·캐시·개인저장소 변경, 거래·push·배포·이미지재생성은0입니다.

`final-source.json`은최종commit·소스343개·변경파일·입력·빌드292개·선정증거 SHA-256과 실제CSS해시를 포함합니다. `mercury-white-selected-restored-source.zip`에는 정확한커밋소스만 있습니다. 독립QA는22고정본을 기준으로 하며697/f9검사와 구분해 주십시오.

## 첨부 접근과 남은 한계

새 선택예시 `libfile_dad322f7f4f481919480b35b4f18ed64`, PNG99753바이트는 Library메타데이터와prepare_materialize에 성공했습니다. 실제파일을받는 지원helper가 **`library file transfer failed: download failed`**로1회 실패했습니다. 재시도/우회하지 않았고픽셀을보지못했습니다. `attachment-receipt.json`에단계를구분해기록했습니다. 요청본문과원문/기준소스로복원을완료했습니다.

이전첨부PNG404와 실제Adobe폰트 로딩 차단은 별도한계입니다. 앞선5419실행거절은 재시도/우회하지 않았으며, 사용자승인에 따라5418에반영했습니다. 새반영의 실행차단은 없습니다. 독립QA·최종미감승인은 아직 없습니다.
