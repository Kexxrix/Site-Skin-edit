# MERCURY White 버튼 가독성 — 최종 인계

**http://127.0.0.1:5418/** 에 수정안을 반영했습니다. 고정 소스는 **697a5711c8684eadd7c7f9068fe2974d47a91fb7**, 기준은 **f9e5847acccbe6bd2790abab9b448d15494ffe17**, 브랜치는 `mercury-white-20261007`입니다. 사용자께서 버튼 개선에 “진행해봐”, 서버 반영에 “재시작해”라고 승인하셨습니다. 독립 QA 결과와 사용자 최종 미감 승인은 아직 없습니다.

## 변경과 보존

변경 파일은 `app/mercury-white.css`, `theme/mercury-white-button-polish.json` 두 개입니다. 일반/서비스/MAX 버튼은 크림 단색과 짙은 글자, 선택 스포츠/마켓/배당은 옅은 살구 단색과 진한 주황 테두리, LV·횟수·작은 칩은 단색으로 정리했습니다. 금속 띠를 없애고 1px 윗면 highlight를 사용합니다. hover는 밝기 필터 대신 배경·테두리로 표시하며, focus는 2px 짙은 outline, disabled는 차분한 단색과 읽히는 글자를 사용합니다.

승인 v6 JSON은 3132바이트·SHA-256 `f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5`로 원문과 site 사본, Git 바이트가 같습니다. 기본 계산 CSS도 바꾸지 않았습니다. 파생 역할·승인·색·조정 근거는 별도 JSON에 기록했습니다. 레이아웃·폰트 소스·데모 데이터·이벤트 함수·헤더/로고/배너 자산을 유지했습니다.

서비스 금색 PNG 9개는 실제 16px 불투명 픽셀 대비 중앙값이 1.89–2.31:1이었습니다. 90/85/80/75/70/65% 표시 밝기를 분석했고, 9개 모두 중앙값 3:1을 넘는 가장 밝은 시험 단계인 70%를 적용했습니다. 왼쪽 보조 버튼 3개와 오른쪽 서비스 버튼 6개에만 적용합니다. PNG 바이트, 전역 v6 brightness90/contrast101/saturate104, 다른 스포츠/헤더 아이콘은 유지했습니다. 개선 후 중앙값은 3.08–3.76:1입니다. 금속 highlight의 최소 대비도 따로 기록하며 **모든 금색 픽셀이 3:1이라고 주장하지 않습니다.** 각 아이콘은 읽히는 글자 라벨을 동반합니다.

## 실제 프로덕션 검사

Windows·Node24.14.0·기존 Playwright Chromium의 새 비영구 컨텍스트를 사용했습니다. Browser plugin not available. 개인 브라우저·IAB·live 저장소를 사용하지 않았습니다. 초기 CSS 임시 삽입 검사는 `pre-activation-*` 및 `after-*` 근거입니다. 최종 `production-*` 검사와 캡처는 **새 프로덕션 빌드가 실제5418에서 제공한 화면이며 CSS 삽입이 없습니다.**

| 항목 | 결과 | 근거 |
|---|---|---|
| 페이지 식별·콘텐츠·오버레이·런타임 | PASS | MERCURY화이트, 실제 콘텐츠/캡처, JS예외0·일반 local실패0 |
| 동작/UI | 24 PASS / 0 FAIL | `production-ui-results.json` |
| 상태·대비 | 10 PASS / 0 FAIL | `production-state-contrast-results.json` |
| 전체 타입·빌드·신규 모듈 lint | exit0 | `typecheck.log`, `build.log`, `lint-new.log` |
| 관련 page lint | 기존1 / 신규0 재사용 | page 소스 바이트 동일, 이전 EffectSetState 진단 |
| source·원문·자산·빌드 전달 | PASS | `final-source.json`, `build-transfer-validation.json` |
| 서버 반영·분리 지속 실행·안정성 | PASS | `server-activation.json`, `server-final.json`, `served-css-proof.json` |

106개 정상 버튼/작은 칩의 단색·글자 대비와 배당 숫자, 실제 선택·hover·키보드 focus·disabled, mask/PNG 아이콘을 확인했습니다. 글자 대비는 일반14.07:1, hover12.61:1, 선택/칩11.45:1, disabled5.07:1이며 선택 테두리/배경은3.50:1입니다. 소형 금색 아이콘 수치는 별도의 다색 픽셀 검사로 구분합니다.

검사 경로는 경기 선택 → 금액5000원 → 배당1.56/예상7800원, 검색·종목 필터·리그 접기·마켓 전환·선택 교체/해제·슬립 저장/복원·팝업 열기/닫기입니다. 실제 거래 실행은0, GET외 요청0, 잔액1,000,000원·내역0을 유지했습니다. 사용자 저장소 대신 검수 컨텍스트만 사용했습니다.

2560/1920/1366 화면에서 고정1920 배치·중앙 정렬·가로 접근, JavaScript 비활성 첫 화면, 예전 편집 저장값 무시를 확인했습니다. 이미지164개 모두 경로·자연 크기·표시 치수가 기준과 같고 필터 차이는 승인된9개뿐입니다. 일반 렌더의 local요청 실패와 JS예외는0입니다. Adobe Typekit3개는 기존 `net::ERR_NETWORK_ACCESS_DENIED`로 실제 폰트 로딩은 미검증입니다. JS비활성 컨텍스트의 의도적 차단 `csp`는 앱 오류와 구분했습니다.

## 실제 화면 증거

직접 픽셀 열람한 최종 증거: `production-entry-full.png`, `production-selected.png`, `production-hover.png`, `production-focus.png`, `production-disabled-control.png`, `production-no-js.png`, `production-narrow-right.png`. 실제 f9 기준은 `before-full.png`/`before-quick.png`/`before-user.png`입니다. 초기 임시CSS 캡처와 최종 production 캡처를 구분해 주십시오. 좁은 캔버스는 축소 재배치하지 않고 가로 이동으로 접근합니다.

초기 검수에서 기존 선택 focus의 검정 outline을 짙은 회색만 기대해 실패한 기록은 `harness-initial-state/`에 보존했습니다. 검정/짙은 회색 모두 실제 대비와2px outline을 검사하도록 기대값만 수정했습니다. JavaScript 비활성 컨텍스트에서 검수용 addStyleTag 이벤트 대기가 멈춘 경우도 앱 수정 없이 동기DOM 삽입과250ms 스타일 확인으로 해결했습니다. 해당 비청취 QA 프로세스만 식별해 중단했고, 빠진 전체 런타임 근거를 얻기 위해 최종24개를 다시 실행했습니다. 새production 검사에는 CSS삽입 자체가 없습니다.

## 서버와 승인 이력

별도5419 숨김 지속 검수 서버 시도는 자동 승인 검토에서 거부됐습니다. 실제 사유는 **“별도 5419 서버와 실행·로그 파일을 생성하는 지속적 부작용이며, 사용자가 명시한 서버 변경 금지와 원래 작업 범위를 벗어납니다.”** 실행·재시도·우회하지 않았고5419 listener0입니다.

그 후 사용자 원문 “재시작해”를 전달받아 5418의 PID17860·시작07:31:12UTC·loopback listener를 확인한 뒤 **그 프로세스만** 종료했습니다. 기존 dist를 `runtime-retired-f9/dist`에 보존하고 검증된 새 build292개를 site/dist에 복사해 SHA-256 전부 일치를 확인했습니다. 숨김 cmd wrapper의 내부 로그 리다이렉션 방식으로 5418을1회 재실행했습니다. 서비스·스케줄러·앱/보안 설정·캐시·배포 변경은 없습니다.

새5418 PID31792·시작08:23:29UTC, wrapperPID15556입니다. 실행 쉘 종료 후에도 같은 PID·HTTP200·stderr0과 실제 새 CSS URL/해시/역할을 확인했습니다. 기존5417/PID35992·시작03:54:38UTC는 유지했습니다. 최종 안정성 시각은 `server-final.json`을 따릅니다. 원본 편집기340개와 원본MERCURY337개 HEAD·Git 상태·파일 해시, 공개 자원249개를 보존했습니다.

## 인계 파일과 남은 한계

`final-source.json`에 소스343개·변경 파일·승인 원문·최종 build·선정 증거의 SHA-256과 검사/서버/승인/차단 이력을 기록했습니다. `mercury-white-polish-source.zip`은 정확한 커밋 소스만 포함합니다. f9 소스ZIP·전체manifest·원문·직전 캡처·원래dist·문서는 `baseline/`에서 확인하실 수 있습니다. 원격 push/배포/헤더·로고 재생성0입니다.

사용자 첨부 PNG의 기존 Library404 `file_id does not match the Library file` 접근 실패는 재시도하지 않았으며 pixels_viewed=false입니다. 첨부 픽셀과 실제 Adobe 폰트 로딩 비교는 아직 차단되어 있습니다. 독립 QA는 이697고정본을 기준으로 수행해야 하며 이전 f9 QA와 구분해 주십시오.
