# Paperlogy 1.001 — 적용 전 준비

현재 화면에는 적용하지 않았습니다. `lib/fonts/paperlogy.ts`는 어디에서도 가져오지 않는 독립 등록 파일입니다. 기존 layout, body, 전역 CSS, 테마, 페이지, 컴포넌트는 변경하지 않았습니다.

## 자산과 출처

- `ttf/`: 사용자가 제공한 `D:/WebDL/Paperlogy-1.001`의 원본 9개를 파일명·바이트 그대로 복사했습니다.
- `woff2/`: 위 TTF를 FontTools 4.67.0 / Brotli 1.2.1로 변환한 9개 파일입니다. 글리프 삭제·서브셋·굵기 메타데이터 수정 없이 변환했고 TTF는 보존했습니다.
- `OFL-license.txt`: [공식 소개 페이지](https://freesentation.blog/paperlogyfont)가 연결하는 [라이선스 전문](https://www.designptn.com/wp-content/uploads/2024/08/OFL-license.txt)을 그대로 보관했습니다. SIL Open Font License 1.1입니다. 재배포 시 함께 포함하세요.
- 변환 도구는 사용자 승인 후 프로젝트 밖의 임시 Python 환경에만 설치했습니다. 프로젝트 패키지 및 lockfile에는 추가하지 않았습니다.

## 파일·굵기 연결

등록은 `next/font/local`을 사용하며, 경로는 `lib/fonts/paperlogy.ts` 기준 `../../public/fonts/paperlogy/woff2/`입니다. 각 파일의 `style`은 `normal`입니다.

| CSS 굵기 | 파일명 (TTF/WOFF2 공통 stem) | 원본 내부 굵기 |
| --- | --- | --- |
| 100 | Paperlogy-1Thin | 250 |
| 200 | Paperlogy-2ExtraLight | 250 |
| 300 | Paperlogy-3Light | 300 |
| 400 | Paperlogy-4Regular | 400 |
| 500 | Paperlogy-5Medium | 500 |
| 600 | Paperlogy-6SemiBold | 600 |
| 700 | Paperlogy-7Bold | 700 |
| 800 | Paperlogy-8ExtraBold | 800 |
| 900 | Paperlogy-9Black | 900 |

Thin/ExtraLight의 원본 `OS/2.usWeightClass`는 둘 다 250입니다. 원본을 수정하는 대신 파일의 스타일명에 맞춰 웹 등록에서 100/200을 명시했습니다.

`preload: false`이므로 9개 굵기를 일괄 preload하지 않습니다. 현재는 등록 파일을 import하지 않아 기존 페이지에 Paperlogy CSS·preload가 추가되지 않습니다. 추후 해당 클래스를 사용하면 브라우저는 실제 텍스트에 필요한 굵기를 선택합니다.

## 추후 명시적 적용 시 예시

아래 코드는 설명용이며 현재 컴포넌트에 추가하지 않았습니다.

```tsx
import { paperlogy } from '@/lib/fonts/paperlogy'

// 승인된 요소에만 적용합니다. 글자 크기와 행간은 별도로 바꾸지 않습니다.
<span className={paperlogy.className} style={{ fontWeight: 700 }}>
  선택한 문구
</span>
```

사용할 설정은 `paperlogy`, 적용 클래스는 `paperlogy.className`입니다. 전역 `body`나 루트 layout에 자동 연결하지 마세요. 기존의 명시적 `font-family` 규칙과 우선순위가 충돌할 수 있으므로, 실제 적용할 요소에서 계산된 폰트와 한글·일본어·영문 표시, 줄바꿈을 확인하세요. 실제 적용과 배포는 별도 지시 후 진행합니다.
