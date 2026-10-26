# Paperlogy WOFF2 준비 완료 · 2026-10-26

- WOFF2 9개: `assets/fonts/paperlogy/woff2/`. 100~900 매핑 유지.
- `paperlogy.css`: WOFF2 우선, 원본 TTF fallback. `.font-paperlogy`의 font-family 규칙 유지. 기존 사이트 import·preload 추가 없음.
- 도구: fontTools 4.67.0, Brotli 1.2.1. `setup.json`에 기록한 사용자 캐시의 격리 환경에 설치. 앱 의존성·시스템 폰트·lockfile 변경 없음.
- 사용 API: [fontTools WOFF2 compress](https://fonttools.readthedocs.io/en/stable/ttLib/woff2.html). 설치 패키지 출처·휠 해시는 `install-report.json`, 버전은 `tool-requirements.txt`에 기록.

## 변환 검증

서브셋 처리 없이 전체 폰트를 변환했습니다. 원본 TTF와 제공 폴더의 파일은 모두 SHA-256 동일합니다. WOFF2를 다시 읽어 9개 폰트의 전체 글리프 윤곽선·힌트 바이트·문자 매핑·글자 폭·글리프 순서·unitsPerEm을 비교했습니다. 변환 대상 glyf/loca와 컨테이너 관련 head/DSIG를 제외한 원시 테이블도 동일합니다. 각 파일의 해시와 검사 결과는 `conversion.json`에 있습니다.

파일 합계: TTF 11,799,396바이트 → WOFF2 3,902,380바이트. 감소율 = `(1 - 3,902,380 / 11,799,396) × 100 = 66.93%`.

## 브라우저·보존 검증

독립 QA에서 CSS 등록만 하면 폰트 요청 0건, 400을 명시 선택하면 Regular WOFF2 1개만 요청됐습니다. QA에서 9개 굵기를 명시 검사해 WOFF2 9/9 loaded·굵기 일치·실제 글자 표시를 확인했고 TTF 요청은 0건이었습니다. TTF 자체는 원본 해시와 이전 TTF 브라우저 검수 결과를 재사용했고, 이번에는 CSS의 fallback 경로와 형식 연결을 확인했습니다.

비선택 표본의 폰트·크기·행간·위치·크기는 동일합니다. 기존 사이트 파일 1,227개의 작업 전후 해시도 동일하며 기존 소스의 Paperlogy 참조는 0건입니다. 이 검수는 운영 화면의 픽셀 비교가 아니라 독립 등록 QA와 소스 보존 검사입니다.

`browser-verification.json`, `verification.json`에 근거를 보관합니다. 이전 TTF 준비 기록은 그대로 보존했습니다. 실제 사이트 적용·채택 후 줄바꿈 검수·배포는 수행하지 않았습니다.
