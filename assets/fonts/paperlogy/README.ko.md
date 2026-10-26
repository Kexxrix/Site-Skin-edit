# Paperlogy 1.001 · 선택형 로컬 폰트

## 준비 상태

프로젝트 공용 자산입니다. 현재 사이트·컴포넌트·페이지에서 이 CSS를 가져오거나 클래스를 사용하지 않습니다. body·전역 기본 폰트·기존 테마·크기·행간·레이아웃은 변경하지 않았습니다. 시스템 폰트 설치와 배포도 하지 않았습니다.

- 원본 제공 폴더: `D:/WebDL/Paperlogy-1.001`
- 프로젝트 자산: `assets/fonts/paperlogy/ttf/` (원본 파일명과 바이트 보존)
- 웹폰트 파생 자산: `assets/fonts/paperlogy/woff2/` (전체 글리프 보존, 9개 굵기)
- 등록 CSS: `assets/fonts/paperlogy/paperlogy.css`
- 선택 클래스: `.font-paperlogy` (font-family만 지정, 굵기·크기·행간은 지정하지 않음)
- 라이선스: [`LICENSE.txt`](LICENSE.txt). [공식 페이지](https://freesentation.blog/paperlogyfont)의 링크에서 받은 OFL 1.1 전문과 저작권 고지를 함께 보관합니다.
- 원본/복사본 SHA-256, 버전, 굵기, 출처: [`manifest.json`](manifest.json)

## 굵기 매핑

| CSS font-weight | 스타일 | 파일 |
| --- | --- | --- |
| 100 | Thin | `ttf/Paperlogy-1Thin.ttf` |
| 200 | ExtraLight | `ttf/Paperlogy-2ExtraLight.ttf` |
| 300 | Light | `ttf/Paperlogy-3Light.ttf` |
| 400 | Regular | `ttf/Paperlogy-4Regular.ttf` |
| 500 | Medium | `ttf/Paperlogy-5Medium.ttf` |
| 600 | SemiBold | `ttf/Paperlogy-6SemiBold.ttf` |
| 700 | Bold | `ttf/Paperlogy-7Bold.ttf` |
| 800 | ExtraBold | `ttf/Paperlogy-8ExtraBold.ttf` |
| 900 | Black | `ttf/Paperlogy-9Black.ttf` |

파일의 이름·서브패밀리를 기준으로 100~900을 명시적으로 연결했습니다. 제공된 Thin·ExtraLight 원본의 OS/2 `usWeightClass` 값은 둘 다 250입니다. 이 값을 수정하지 않고 CSS의 각 `font-weight` 선언으로 브라우저의 선택을 구분합니다. 원본 TTF는 가변 폰트가 아닌 개별 정적 파일입니다.

WOFF2도 위와 같은 굵기 매핑을 사용합니다. 각 TTF의 파일명에서 확장자만 `.woff2`로 바꾼 파일이 `woff2/`에 있습니다. 예: `woff2/Paperlogy-4Regular.woff2` → 400. 각 파생 파일의 경로·SHA-256·크기는 `manifest.json`의 해당 굵기 항목에 기록합니다.

## 추후 명시적 선택 시 사용 예시

다음은 문서용 예시이며 현재 앱에 추가하지 않았습니다.

1. 사용할 사이트가 정해지면 이 폴더를 통째로 해당 사이트의 `public/fonts/paperlogy/`에 복사합니다. `LICENSE.txt`, `woff2/`, `ttf/` 상대 경로를 함께 유지합니다.
2. 필요한 화면에서 CSS를 연결하고 원하는 요소에만 클래스를 붙입니다.

```html
<!-- 향후 적용할 때만 추가 -->
<link rel="stylesheet" href="/fonts/paperlogy/paperlogy.css">
<h2 class="font-paperlogy">페이백 포인트</h2>
<button class="font-paperlogy">이벤트 보기</button>
```

```css
/* 클래스 대신 해당 요소의 기존 스타일 안에서 직접 선택할 수도 있습니다. */
.chosen-title {
  font-family: "Paperlogy", var(--font-ui, system-ui), sans-serif;
  /* 기존 font-weight, font-size, line-height 설정은 별도 유지 */
}
```

입력·버튼에 자체 font-family가 있으면 부모의 상속만으로 바뀌지 않을 수 있으므로, 적용 시 해당 요소를 명시적으로 선택합니다. 이번 준비에서는 폼 컨트롤의 상속 규칙도 변경하지 않았습니다.

## 로딩과 WOFF2

`@font-face`는 9개 굵기를 등록하지만 사용하는 글자가 해당 굵기를 요청할 때만 파일을 가져옵니다. preload, JavaScript 선로딩, 기존 엔트리의 CSS import를 추가하지 않았습니다. QA 페이지에서 전체 굵기를 명시적으로 검사하는 코드는 운영 코드와 분리되어 있습니다.

후속 사용자 승인에 따라 fontTools 4.67.0·Brotli 1.2.1을 격리된 도구 환경 `C:/Users/User/.cache/codex-tools/paperlogy-woff2-20261026-113926/`에 설치하고 WOFF2 9개를 생성했습니다. 앱 의존성·lockfile·시스템 설치 폰트는 변경하지 않았습니다. [공식 fontTools WOFF2 변환 API](https://fonttools.readthedocs.io/en/stable/ttLib/woff2.html)를 사용했습니다.

CSS는 WOFF2를 첫 후보, 원본 TTF를 fallback으로 등록합니다. 서브셋·글자 모양·글자 폭 수정 없이 전체 글리프를 보존했습니다. 모든 글리프의 윤곽선과 힌트, 문자 매핑, 글자 폭, 원본 TTF 해시를 검사했습니다. 변환 도구는 프로젝트에서 import하거나 배포할 필요가 없습니다.

## 검수 자료

최신 WOFF2 검수는 `artifacts/paperlogy-woff2-20261026-113926/`에 보관합니다. `conversion.json`은 변환·윤곽선·매핑 검사, `browser-verification.json`은 실제 로딩, `verification.json`은 소스 보존과 종합 결과입니다. 최초 TTF 검수 `artifacts/paperlogy-setup-20261026-113033/`도 보존했습니다. 별도 QA는 기존 사이트에 이 폰트를 적용하지 않고 수행합니다. 실제 사이트 채택·배포·채택 후 줄바꿈 검수는 별도 지시 대상입니다.

검증 결과: TTF 9개 원본/복사본 SHA-256 일치, WOFF2 경로·굵기 9개 정상, 브라우저 실제 WOFF2 로딩 9/9 통과. CSS 등록만으로 폰트 요청 0건, 400을 명시 선택하면 Regular WOFF2 1개만 요청되었습니다. WOFF2 로딩 중 TTF 요청은 없었습니다. 비선택 표본의 font-family·굵기·크기·행간·위치·크기는 동일했습니다.

기존 사이트 관련 파일 1,227개의 해시가 작업 전후 동일하며 기존 소스의 Paperlogy 참조는 0건입니다. 기존 사이트를 재기동하거나 운영 화면을 다시 렌더한 픽셀 비교는 수행하지 않았습니다. 화면 보존은 기존 파일 무변경·연결 없음과 독립 브라우저 표본의 비적용 검증으로 확인했습니다.
