# MERCURY White 웜 차콜 배지 적용

2026-10-07 사용자 승인: “웜~ 차콜 괜찮은데 적용해봐”. 실제 로컬 `http://127.0.0.1:5418/`에 반영했다. 공개 배포와 GitHub push는 없다.

## 변경

- `site/app/mercury-white.css`: 배지 전용 선택자에 배경 `#36312b`, 글자 `#f5e8c5`, 1px 안쪽 테두리 `#806c49` 적용. SPORTS·LIVE·LV.0·BET 4종만 대상이다.
- `site/theme/mercury-white-button-polish.json`: 파생 명세 v4와 사용자 승인·범위 기록. 원본 v6 JSON과 생성된 기본 CSS는 보존했다.
- 앱 HEAD `b425507730a4f39dd393645ef4273653a7c13176` 위의 미커밋 변경 두 파일이다. 등록 문서 INDEX·STATE·AGENTS에 현재 상태를 기록했다.

## 검증

- 기존 staging에서 `npm run build`: exit 0. 기존 vinext의 route Unknown 안내는 유지된다. 앱 로직 변경이 없어 동일 입력의 타입·lint 검사를 반복하지 않았다.
- Browser plugin not available. 기존 Playwright의 새로운 비영구 컨텍스트에서 실제 5418을 검사했다. CSS 삽입 없이 1935×932 및 900×932 화면을 사용했다. 개인 브라우저/IAB/저장소를 사용하지 않았다.
- 브라우저 8 PASS / 0 FAIL: 배지 4종 색·크기·폰트, 숫자칩/헤더칩/서비스/카드 외곽선 유지, 선택 종목·마켓·배당의 normal/hover/keyboard-focus, 카드 61개 크기, 이미지 164개 경로·크기·필터, 배당 선택·해제, 좁은 화면, 런타임 오류·로컬 자산·변경 요청 검사.
- 실제 스크린샷 `after-desktop.png`, `after-sports.png`를 열어 배지와 주변 배치가 유지된 것을 확인했다. 앱 예외·실패한 로컬 요청·변경 요청은 0건이다.
- 소스 343개 중 341개 SHA-256 유지, 승인 JSON 해시 유지. 새 dist 292개가 staging과 일치하고 이전 dist 292개도 `runtime-retired-b425/dist/`에 원래 해시로 보존했다.
- 실제 서빙 CSS `index.C9jghax1.css`의 SHA-256은 `1ebd85b1977896b4b06e974fa2789dbfd34acdf07134601e0d3e4230b5546ab1`이며 빌드 파일과 일치한다.

## 검사 과정과 제한

- 초기 배지 비교는 그려지지 않는 0px border의 `currentColor`를 불변값으로 잘못 취급했다. 실제 보이는 테두리는 inset box-shadow이며 검사 대상을 수정했다. 앱 추가 수정은 없었다.
- 첫 before 배당 색 측정은 기존 160ms 전환 도중 값이었다. 220ms 대기와 키보드 focus를 추가하고, b425 QA에서도 재사용한 독립 QA의 승인 v6 안정 상태와 비교했다. 카드·배지·이미지 및 기타 스타일은 이번 before와 비교했다. `after.json`에 비교 기준을 기록했다.
- 첫 비강제 Stop-Process는 PowerShell null-reference 오류로 실패했고 기존 서버가 유지됐음을 확인했다. 동일 경로·PID23780을 재확인한 뒤 해당 프로세스만 종료했다. 성공한 재시작은 한 번이며 현재 5418/PID18312, 편집기 5417/PID35992는 유지된다.
- 기존 제한을 지켜 Typekit 외부 요청 3개는 전송 전에 차단했다. 따라서 이번 검증은 로컬 제공 폰트 기준이며 외부 Typekit 로딩 성공을 확인한 것은 아니다. 기존 이미지 전송을 재시도하지 않았다.
- 실제 거래·로그인·문의 제출은 하지 않았다. 새 Git 커밋·GitHub push·Sites 등록·배포도 하지 않았다.

최종 근거: `after.json`, `final-verification.json`, `server-activation.json`, `build.log`, `source-before.json`, `source-after.json`.
