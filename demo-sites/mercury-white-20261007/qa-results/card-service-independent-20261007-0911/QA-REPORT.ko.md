# MERCURY 최종 카드 외곽선·서비스 버튼 독립 QA

판정: **신규 집중 검사 31 PASS / 0 FAIL**, 새 차단 결함 없습니다. 실제 `http://127.0.0.1:5418/`에서 고정 HEAD `b425507730a4f39dd393645ef4273653a7c13176`를 격리된 headless Playwright 컨텍스트로 검사했습니다. CSS 주입·사용자 GUI/프로필·기존 localStorage 사용 없이 실행했습니다. 실행 구간은 2026-10-07 09:13:36–09:13:55 UTC입니다.

## 새로 검증한 결과

- 선택·검토 카드 전체 외곽선은 `#b76016` 1px border와 1px inset 선입니다. 자식 hover/focus에서도 유지되고 선택 해제·슬립 삭제 후 정상 복귀합니다. 선택 전후 61개 카드 크기가 동일합니다.
- 충전·환전·고객센터는 일반/hover/focus에서 실제 헤더 메뉴 패널과 정확히 같은 6구간 background-image를 사용합니다. 텍스트·PNG mask 색상 `#2b2826`, filter 없음, focus 표시 유지. 6개 gradient stop 기준 최소 대비 10.3178:1입니다.
- 스포츠·마켓·배당 선택색 9상태는 이전 독립 f9 실행의 실제 computed style과 일치합니다. 비선택 버튼 6종의 크림색/hover/focus 및 살구색 칩 개선도 유지됩니다.
- 고객센터 정보 팝업 열기·닫기 정상, 이미지 164개 로드 완료, 잔액 그대로입니다. 앱 예외·localhost 요청 실패·변경 HTTP 요청은 0건입니다.
- 소스 343개와 빌드 산출물 292개의 SHA가 구현자 고정 manifest와 검사 전후 모두 일치하며 추적 파일 작업 트리는 깨끗합니다. 이번 추가 변경은 CSS와 JSON 설명 파일 2개뿐입니다. 원본 JSON 입력과 사이트 복사본도 기존 SHA를 유지합니다.

## 재현 및 근거

실제 5418 페이지에서 경기 배당을 선택 → 카드 전체 테두리 확인 → 배당 hover/focus → 선택 해제 및 슬립 삭제 → 원상복귀를 확인합니다. 헤더 서비스 3버튼은 클릭 없이 hover와 키보드 focus를 확인하고 헤더 메뉴 패널의 computed background-image와 비교합니다. 고객센터만 정보 팝업을 열고 닫았습니다. 실제 결제·충전·환전·베팅 제출은 수행하지 않았습니다.

- [독립 검수 스크립트](check.mjs), [31개 assertion 원문](checks.json), [최종 요약 및 HTTP/PID](summary.json)
- [검사 전 소스 SHA](source-start.json), [검사 후 소스 SHA](source-end.json), [최종 소스 SHA](final-source.json), [브라우저 실서빙 CSS](served-css.json)
- 최소 스크린샷: [선택 카드](01-chosen-card.png), [서비스 버튼](02-services-header-gradient.png)

실서빙 CSS는 `/_next/static/css/index.CIlfXfuu.css`, SHA256 `a1901d8fcefc84277c7723e0755e8e6e958a01fd2cbbe8c259c90e1f8fb13a35`입니다. 최종 HTTP/CSS 200 및 PID 확인 시각은 `summary.json`에 기록했습니다. 5418 PID 23780(08:56:03 UTC 시작), 기존 5417 PID 35992(03:54:38 UTC 시작)를 확인했습니다. QA 중 서버 실행·종료·빌드·앱 소스 변경은 하지 않았습니다.

## 재사용·미실행

이전 독립 검수 65 UI / 11 source PASS의 광범위 동작·레이아웃·데이터·자산 검사는 변경 없는 범위의 근거로 재사용했습니다. 이번 31 PASS와 별도입니다. 전체 시나리오 재실행·빌드·타입 검사는 반복하지 않았습니다. 첨부 참조 이미지 픽셀 비교 및 외부 Typekit 폰트 로드는 미실행/환경 제한이며, Typekit 요청 3건의 네트워크 차단은 앱·로컬 자산 결함과 구분했습니다.
