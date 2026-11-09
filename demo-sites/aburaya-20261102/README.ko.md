# ABURAYA 로컬 데모

Figma의 ABURAYA 화면을 별도 HTML·CSS·JavaScript 사이트로 구현했다.

## 실행

`site` 폴더에서 `npm start`를 실행한 뒤 http://127.0.0.1:5443/ 에 접속한다.
패키지 설치와 빌드는 필요 없다. `npm run check`는 JavaScript 구문을 검사한다.

## 화면과 동작

- 추천게임 `#home`, 라이브카지노 `#live`, 슬롯게임 `#slots`, 공지 `#notice`.
- 헤더·하단 메뉴를 유지하면서 배경은 700ms 교차 전환, 본문은 460ms 세로 전환한다. 동작 줄이기 설정을 지원한다.
- 추천게임 5개와 이전·다음 버튼, 카지노 공급사 8개, 슬롯 공급사 14개, 슬롯 분류 3개를 연결했다.
- 게임·공급사 선택은 이미지 미리보기용 데모 팝업을 연다. 실제 게임 서버는 연결하지 않는다.
- 공지는 Figma의 4개 목록과 20개 상세 화면을 연결했다. 상세에서 돌아오면 선택한 목록 페이지를 유지한다.
- 로그인·회원등록·로그아웃, 입출금 금액 확인, 메일·문의 팝업은 로컬 시연 전용이다. 입력을 저장하거나 전송하지 않는다.
- 1920×1080 원본 구도를 기준으로 작은 데스크톱에서는 비례 축소한다. 760px 이하에서는 같은 리소스로 세로 그리드와 고정 메뉴를 구성한다.

## 원본과 파일

- Figma 파일: `PoUHKHsm9xOYavWBQ7uAGP`. 홈 `1924:1623`, 카지노 `1959:1831`, 슬롯 `1959:1832`, 공지 `1959:1833`, 공지 상세·목록 `1968:1375`.
- `input/figma-*.tsx`: Figma에서 받은 상세 레이아웃. `asset-map.json`과 `asset-manifest.json`: 다운로드 출처, 로컬 경로와 검증 기록.
- `site/screens/*.html`, `site/notices/*.html`, `site/design.css`: Figma 레이어를 정적 HTML·CSS로 변환한 원본.
- `site/app.js`, `site/app.css`: 화면 전환, 데모 동작, 웹 글꼴 보정과 반응형 배치.
- `site/assets/`: Figma에서 받은 이미지·SVG 102개. `site/fonts/`: Paperlogy·Pretendard JP와 라이선스.
- `input/compile-design.cjs`: 기존 워크스페이스 도구를 사용하는 최초 변환 스크립트. 사이트 실행에는 필요하지 않다.

기존 토토로월드, 다른 데모, Figma 원본은 수정하지 않았다. 외부 배포와 사용자 최종 승인은 별도다.

## 파비콘 및 GitHub 업로드 (2026-11-09)

- `site/favicon.ico`: 16·32·48px 프레임. `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-512x512.png`, `apple-touch-icon.png`(180px) 포함.
- 현재 사이트의 등불 아이콘을 비율·색·투명도를 유지해 파비콘 크기로 변환했다. 원본 이미지는 유지했다. `index.html`에서 ICO·16/32px PNG·Apple 아이콘을 연결한다.
- `input/favicon-20261109.json`에 원본·출력 해시와 검증 기록이 있다. ICO의 16/32/48px 프레임은 같은 크기 PNG와 RGBA 픽셀이 일치한다.
- GitHub 경로: `Kexxrix/Site-Skin-edit` → `demo-sites/aburaya-20261102/`. `site/` 전체를 웹 루트로 제공하면 된다. 설치나 빌드 과정 없이 이미지·영상·폰트까지 함께 동작한다.
- 실제 회원·결제·게임 서버 연결 및 공개 사이트 배포는 이번 업로드 범위에 포함하지 않는다.
