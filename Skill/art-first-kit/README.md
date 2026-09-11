# Art First Kit

사이트의 폰트 설정과 일관된 테마 이미지 제작을 다른 프로젝트에서 재사용하는 Codex 스킬 패키지다. 기존 사이트 구조나 특정 테마의 이미지를 복사하지 않는다.

- `site-font-setup`: 사이트 스타일링 전에 Pretendard JP와 기존 Adobe font 프리셋 설치·검수. 정적 HTML과 일반 JS/TS 엔트리 지원.
- `theme-image-pipeline`: 내장 이미지 생성, 컨셉→배경→선택적 인물→로고·패널·아이콘, 참조 계보, 체형·시계 좌표, 편집 분기, 투명 검수·크롭·3슬라이스.

## 다른 프로젝트에 설치

Python 3.10 이상이 필요하다. 압축을 풀고 패키지 폴더에서 실행한다. 대상 프로젝트 폴더는 먼저 존재해야 한다.

```powershell
python .\install.py --project "E:\work\새프로젝트"
python .\install.py --project "E:\work\새프로젝트" --verify-only
```

두 스킬 전체가 대상의 `.agents/skills/`에 복사된다. 원본 패키지를 옮겨도 설치된 스킬은 독립적으로 동작한다. 동일 파일은 재사용하고 수정된 파일·이름 충돌은 덮어쓰지 않는다. 기존 설치 업데이트는 충돌 내용을 검토한 뒤 사용자가 보존할 수정을 정리하는 방식이며 강제 덮어쓰기 기능은 없다.

대상 프로젝트의 새 Codex 작업에서 아래 문장을 사용한다. 이미 열린 작업의 스킬 목록은 자동 갱신되지 않을 수 있다. 목록에 없으면 프로젝트의 `.agents/skills/site-font-setup/SKILL.md`와 `.agents/skills/theme-image-pipeline/SKILL.md`를 직접 읽도록 지시할 수 있다.

```text
$site-font-setup 사이트 구현의 첫 단계로 폰트를 설치하고 실제 브라우저에서 확인해.
$theme-image-pipeline 테마는 [테마], 브랜드 정확한 표기는 [이름], 필요한 이미지는 [역할·개수], 비율은 [비율].
Codex 내장 도구로 생성하고 검수해. 편집은 [agent 또는 manual], 결과는 [저장 경로].
이미지 제작 후 [요청한 범위]의 사이트 배치만 구현해.
```

이미지만 필요한 프로젝트는 두 번째 스킬만 사용한다. 테마만으로 시작 가능하며 캐릭터는 필수가 아니다. 사이트 제작 요청이 없으면 사이트를 추가로 만들지 않는다.

## 폰트 설치 예

프로젝트 루트에서:

```powershell
python .agents/skills/site-font-setup/scripts/install_typography.py --project .
# 정적 HTML
python .agents/skills/site-font-setup/scripts/install_typography.py --project . --static
# 동일 옵션에 --verify-only를 더하면 쓰기 없이 검사
```

기본 프리셋은 Pretendard JP 5개 굵기와 이 사용자의 기존 Adobe kit 3개다. 폰트 파일·라이선스가 번들에 있어 Pretendard 설치에는 인터넷이 필요 없다. Adobe 폰트 파일은 포함하지 않으며 실제 로딩에는 외부 kit 연결이 필요하다. Adobe를 사용하지 않을 때는 설치와 검증 모두 `--adobe-kit-mode off`를 추가한다. 다른 소유자·웹 프로젝트에서 기존 Adobe kit 사용 가능 여부는 별도로 확인한다.

HTML 없는 프레임워크(예: Next.js)는 자동 설치 대상이 아니다. 스킬이 프레임워크에 맞는 전역 CSS/head 연결과 검수를 안내한다.

## 선택적 이미지 후처리

이미지 생성은 Codex의 내장 기능이 필요하다. 로컬 검사·마스크·크롭·패널 조절 스크립트는 Python과 Pillow를 사용한다. 설치기는 이미지 생성을 호출하거나 대형 분할 모델을 설치하지 않는다. 의미를 판단한 마스크 준비와 결과 육안 검수가 자동 배경제거에 남아 있는 작업이다.

`.codex-plugin/plugin.json`도 포함한 플러그인 형식이다. 이번 납품에서는 전역 스킬·개인 마켓플레이스·앱 설정을 변경하지 않았다. 위 프로젝트 로컬 설치가 검증 대상이다.

검증된 사례와 한계는 [이력](skills/theme-image-pipeline/references/provenance.md), 패키지 자체 검증은 `validation.json`, 구성 파일 해시는 `MANIFEST.sha256.json`에서 확인한다.
