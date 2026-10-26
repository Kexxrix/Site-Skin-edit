# Paperlogy 준비 검증 · 2026-10-26

## 결과

프로젝트 공용 `assets/fonts/paperlogy/`만 준비했습니다. 기존 사이트·페이지의 적용 및 배포는 하지 않았습니다. 추가 도구나 시스템 폰트도 설치하지 않았습니다.

## 파일·등록 검사

- 제공 TTF 9개를 원래 파일명으로 복사, 원본/사본 SHA-256 9/9 일치.
- SFNT 테이블 범위와 전체 체크섬 9/9 통과.
- 100~900 CSS 굵기와 상대 URL 9/9 일치.
- Thin·ExtraLight의 내부 weightClass가 모두 250임을 확인했으며, 바이너리를 수정하지 않고 CSS에서 각각 100·200으로 선택 가능하게 등록.
- 한글·영문·숫자·일본어 검수 문구의 글리프 존재 9/9 확인.
- 공식 페이지가 연결한 OFL 1.1 전문과 저작권 고지를 `LICENSE.txt`로 보관, SHA-256 확인.
- CSS의 최상위 규칙은 `@font-face` 9개와 `.font-paperlogy` 1개뿐. 클래스는 font-family만 지정.

## 독립 브라우저 검사

Codex in-app Chromium에서 `font-check.html`을 조작했습니다. 실제 사이트의 컴포넌트나 페이지에는 연결하지 않았습니다.

1. 등록 전 폰트 요청 0건.
2. CSS 등록 후 9개 face가 모두 unloaded이며 폰트 요청 0건.
3. 400을 명시 선택하면 `Paperlogy-4Regular.ttf` 1개만 요청, 해당 face loaded.
4. QA에서만 명시적으로 9개 굵기를 검사해 9/9 loaded·굵기 일치 확인.
5. 실제 표본을 화면에서 확인해 굵기 구분과 한글·영문·숫자의 표시를 검수.
6. Paperlogy를 선택하지 않은 표본의 family·weight·size·line-height·letter-spacing·bounds는 모든 단계에서 동일.

QA 초기에 검증 JSON 출력이 스크롤바를 만들어 표본의 x 위치가 바뀌는 시험 화면 문제가 있었습니다. 운영 CSS 변경 없이 QA 화면의 스크롤 영역을 고정한 뒤 다시 검사해 통과했습니다. 이 수정은 `font-check.html`에만 존재합니다.

브라우저 원시 기록: `browser-verification.json`. 종합 결과: `verification.json`.

## 기존 화면 보존 범위

기존 사이트 코드·스타일·폰트 등 1,227개 파일을 작업 전후 SHA-256으로 비교해 변경 0건, 기존 소스의 Paperlogy 참조 0건을 확인했습니다. 원시 기준은 `source-baseline-sha256.json`입니다.

기존 사이트를 재기동하거나 운영 화면을 다시 렌더한 픽셀 비교는 하지 않았습니다. 화면 보존의 근거는 소스 무변경·신규 연결 없음과 독립 브라우저 표본에서의 비적용 검증입니다. 실제 사이트에 적용한 뒤의 줄바꿈·서브픽셀 렌더·레이아웃 및 배포는 별도 지시가 필요합니다.

## WOFF2

현재 Python과 번들 Python 모두 fontTools·Brotli가 없어 변환을 보류했습니다. 도구 설치 0건, 존재하지 않는 WOFF2 참조 0건. TTF는 현재 상태로 브라우저에서 사용할 수 있습니다.
