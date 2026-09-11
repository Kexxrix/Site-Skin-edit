---
name: site-font-setup
description: Set up the proven Pretendard JP and optional registered Adobe font runtime before styling a new website or static HTML preview. Use when starting a site, checking missing font setup, or reusing this project's font baseline.
---

# Site Font Setup

사이트 구현의 첫 단계다. 프로젝트의 최소 HTML/엔트리 파일을 만든 직후, 카드·버튼·페이지 스타일을 만들기 전에 적용한다. 가벼운 정적 사이트도 예외가 아니다. 이미 지정된 다른 폰트가 있으면 사용자 선택을 보존한다.

## 실행

이 스킬의 실제 위치를 기준으로 스크립트를 실행한다. 아래 `<skill-dir>`와 `<project-root>`를 실제 경로로 바꾼다. Python 3.10 이상, 추가 패키지 불필요.

```text
python "<skill-dir>/scripts/install_typography.py" --project "<project-root>"
python "<skill-dir>/scripts/install_typography.py" --project "<project-root>" --verify-only
```

- 직접 서빙하는 HTML은 두 명령에 `--static` 추가.
- 기본 JS/TS 엔트리는 `src/main.tsx`, `.jsx`, `.ts`, `.js` 중 하나를 감지한다. 다르거나 여러 개면 `--entry src/custom-entry.tsx`처럼 실제 파일을 지정한다.
- Next.js 같은 HTML 없는 프레임워크에 엔트리를 억지로 만들지 않는다. 포함된 CSS와 폰트를 프레임워크의 전역 CSS·문서 head에 맞게 연결하고 같은 브라우저 검수를 수행한다. 이 어댑터는 자동 설치 지원 범위 밖이다.

## 보존할 폰트 계약

- Pretendard JP v1.3.9, 400/500/700/800/900을 번들에서 해시 검증 후 로컬 설치. 라이선스 함께 유지.
- `--font-ui`, `--font-heisei-mincho`, `--font-omni-gothic`, `--font-score` 변수 제공. 기본 UI와 폼 컨트롤에 적용한다.
- 기존 사용자 프리셋은 Adobe kit `hyf2mwn`, `gig5kam`, `aqm4sxy`. Adobe 폰트 바이너리는 포함하거나 내려받지 않는다.
- 다른 소유자에게 배포하거나 로컬 폰트만 요청하면 `--adobe-kit-mode off`를 설치·검증 모두에 지정한다. 기존 Adobe 블록은 자동 삭제하지 않는다.
- 설치 자체는 오프라인으로 가능하다. Adobe 서체의 실제 활성화는 네트워크 및 해당 웹 프로젝트 설정에 의존하며, embed가 있다는 이유로 로딩 성공을 선언하지 않는다.
- 기존 파일이 다르면 중단하고 차이를 확인한다. 덮어쓰기 옵션으로 사용자 수정을 지우지 않는다.

## 완료 기준

파일 검사 후 [브라우저 검수](references/browser-check.md)를 수행한다. 한글·영문·숫자, 실제 UI 폰트 로딩, 폼 폰트 상속, 줄바꿈을 확인한다. 컴포넌트의 의도하지 않은 system-font 덮어쓰기를 필요한 범위에서만 수정한다. `font-family` 문자열만으로 실제 글꼴 렌더링 성공을 주장하지 않는다.
