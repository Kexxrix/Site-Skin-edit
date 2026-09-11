# 무료 모션·레터링 리소스와 AE MCP 연결 조사

2026-09-11 · 공개 원본 문서·라이선스·선별 소스 및 현재 설치된 MCP 구현을 확인한 조사입니다. 외부 패키지 설치, AE 적용, 렌더, 시각적 채택 검사는 수행하지 않았습니다.

## 판단

**현재 AE 파이프라인에 연결할 수 있는 공개 리소스가 있습니다.** 가장 짧은 경로는 `.ffx`를 적용하거나, 공개 표현식·텍스트 애니메이터 정의를 기존 MCP의 네이티브 작업으로 구성하는 것입니다. 새 MCP 서버는 일부 후보의 선택지이며, 모든 후보에 필요한 것은 아닙니다.

다음 품질 시험에서는 레터링 등장 방식, 공통 타이밍, 글자·도형의 장면 간 연결을 각각 비교하는 것이 좋습니다. 프리셋의 수나 GitHub 기능 목록만으로 K/DA 수준의 완성도나 TITAN 적합성을 판단할 수는 없습니다.

이 문서의 적용 제안은 [THE BADDEST 참조 분석](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/motion-language-reference-review-20260911.md)의 관찰과 기존 TITAN 콘티를 기준으로 합니다. 해당 영상 제작에 아래 도구가 사용되었다는 증거는 없습니다.

## 1. 현재 환경에서 확인한 연결 경로

설치된 `@kumoproductions/mcp-aftereffects`는 `0.2.0`입니다. 이번에 도구 카탈로그와 설치 소스를 확인했습니다. 기존 시험의 AE Beta 지정 클라이언트 설정도 확인했으나, 이번 조사에서 AE에 쓰기 명령을 보내지는 않았습니다.

| 리소스 형식 | 현재 MCP 경로 | 확인 범위와 조건 |
| --- | --- | --- |
| AE 애니메이션 프리셋 `.ffx` | `timeline.set_time` → `layer.apply_preset` | 절대 경로·컴프·대상 레이어를 받음. 구현이 대상 레이어만 선택하여 적용하고 이전 선택을 복원함. 적용 시점은 먼저 CTI로 지정. 파일별 효과·폰트·버전 의존성은 별도 검사 필요 |
| 표현식 코드 | `expression.set` | 표현식을 지원하는 속성에 코드 입력 가능. 반환 성공만으로 표현식 평가·렌더 성공이 보장되지 않으므로 실제 오류 확인 필요 |
| 데이터로 가져오는 표현식 라이브러리 `.jsx` | `project.import_file` + `expression.set` | aeFunctions가 문서화한 `footage(...).sourceData.getFunctions()` 방식. 일반 실행 스크립트·패널 JSX와 다른 사용 방식. 가져온 아이템 이름과 의존 파일을 유지해야 함 |
| 텍스트 애니메이터 정의 | `text.add_animator` + `property.set` + `keyframe.set_batch` + `keyframe.set_easing` | 위치·크기·회전·투명도·자간·블러, 선택자, 키프레임 구성 경로 확인. 외부 도구의 인수를 그대로 보내는 것이 아니라 실제 속성 경로에 맞춰 변환해야 함 |
| AE 프로젝트 `.aep` | `project.import_file`의 `importAs: project` → 컴프·레이어 편집 | 카탈로그와 `ImportAsType.PROJECT` 구현 확인. 실제 배포 파일에 AEP가 있어야 하며, 누락 미디어·폰트·외부 효과 검사 필요 |
| CEP 패널·일반 실행 JSX | 후보별 API 또는 별도 연동 | 현재 카탈로그에 해당 패널 전용 작업은 없음. 현재 `eval.run`도 비활성화 상태. 패널이 존재한다는 이유만으로 MCP에서 모든 기능을 호출할 수 있다고 판정하지 않음 |

로컬 증거: [프리셋 적용 구현](C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/operations/layer-advanced.js:113), [표현식 입력 구현](C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/operations/expression.js:4), [텍스트 애니메이터 구현](C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/operations/text.js:719), [프로젝트 가져오기 구현](C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/operations/project.js:35).

## 2. 우선 검토 후보

아래의 ‘경로 확인’은 문서·소스 수준의 판정입니다. 이번 조사에서 실제 적용·렌더를 완료한 후보는 없습니다.

| 후보 | 무료 범위·라이선스 | 활용할 수 있는 부분 | 현재 MCP 연결 판정 |
| --- | --- | --- | --- |
| [aftr](https://github.com/Arman-Luthra/aftr) | 소스 MIT | 단어 등장, 문자별 스케일·회전·블러 등장, 공통 이징·시간 조절 | **이식 경로 있음. 자체 MCP도 구현됨.** 현재 연결을 유지하려면 텍스트 정의를 네이티브 MCP 작업으로 변환. 전체 도구 사용 시 별도 CEP 패널·컨트롤러 설치와 Beta 검증 필요 |
| [Rebound](https://github.com/meszmate/rebound) | 주 소스 MIT, Windows 배포물 있음 | 베지어, 스프링, 오버슈트, 순차 타이밍, 후속 움직임 | **수학·표현식 부분 이식 후보.** 자체 MCP는 확인하지 못함. 패널의 내부 브리지와 현재 MCP는 별개 |
| [aeFunctions](https://github.com/motiondeveloper/aefunctions) | MIT, `.jsx` 릴리스 있음 | 키프레임 시간 처리, 바운스, 원운동, 글자 크기에 반응하는 박스 | **직접 연결 경로 확인.** 라이브러리 가져오기 + 표현식 설정. 최신 Beta 동작과 릴리스별 함수 범위는 시험 필요 |
| [DuAEF Expression Library](https://github.com/RxLaboratory/DuAEF_ExpressionLib) | LGPL-3.0, 전체 DuAEF 프레임워크와 구분 | 베지어 보간, 오버슈트, 경로·좌표 계산 | **직접 연결 경로 확인.** 필요한 함수와 명시된 의존 함수를 표현식에 구성. 재배포 시 라이선스 조건 검토 필요 |
| [Animation Composer](https://misterhorse.com/animation-composer-for-after-effects) | 무료 플랜과 Starter Pack, 독점 라이선스 | 준비된 타이틀·전환·그래픽, 빠른 시각 비교 | **조건부.** 공개 MCP/API를 확인하지 못함. 패널에서 적용 후 만들어진 AE 요소를 MCP로 조정할 수 있는지 개별 확인 필요 |
| [Mobilo Bold](https://animography.net/products/mobilo) | Bold Animated 버전 €0. Regular 정식판·정적 폰트는 별도 | 글자 자체가 형성되는 다양한 모션, 획·면·색 변형 연구 | **파일 형식 확인 후 판단.** 편집 가능한 경로·키프레임 포함 안내. AEP 포함 시 가져오기 경로 사용 가능. JSX/Font Manager 배포만으로 직접 적용 가능하다고 단정하지 않음 |

### aftr — 문자 등장 모션의 구체적 소스 후보

[텍스트 구현](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/panel/jsx/commands/text.jsx)에서 `wordReveal`, `charScale`, `bunchRotate`, `blurFade`와 선택자·이징 설정을 확인했습니다. [프리셋 정의](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/presets/text-presets.json)는 스타일·이징·시간 조절을 분리합니다. 이 구조는 TITAN의 같은 카피를 여러 움직임으로 비교하는 시험에 적합한 후보입니다.

[자체 MCP 구현](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/controller/src/mcpServer.js)도 존재합니다. 다만 현재 프로젝트는 다른 MCP를 이미 사용하므로, **작은 텍스트 정의부터 현재 작업으로 변환하는 안을 우선 제안**합니다. 이는 아직 구현하지 않은 제안입니다.

주의점: 문서의 호환 범위는 AE 2024–2026이며 현재 사용 중인 27.x Beta 검증 증거는 없습니다. 프리셋 JSON의 머리말은 일부 스타일이 임시라고 쓰지만 개별 항목은 `ready`라고 적어 상태 설명이 일치하지 않습니다. 기본 폰트도 우리 폰트로 자동 간주하면 안 됩니다. [MIT 라이선스](https://github.com/Arman-Luthra/aftr/blob/628397d700d6282fe2be4d42f4a388392250947a/LICENSE).

### Rebound — 연결되는 속도와 반동을 설계하는 후보

[프리셋 소스](https://github.com/meszmate/rebound/blob/0f9fd6c526514d20b688b13c393061606f166ad5/client/js/presets/defaults.js)에 베지어 제어점과 Elastic 계열을 확인했습니다. [구조 문서](https://github.com/meszmate/rebound/blob/0f9fd6c526514d20b688b13c393061606f166ad5/docs/ARCHITECTURE.md)는 패널에서 ExtendScript 호스트를 부르는 내부 브리지를 설명합니다. 이것이 곧 외부 MCP API는 아닙니다.

곡선 계산값을 현 MCP의 이징 또는 샘플 키프레임으로 변환하거나, 필요한 표현식을 구성하는 접근이 가능합니다. 특히 글자·밑줄·기기 반동이 같은 시간 기준을 공유하도록 만드는 시험에 활용할 수 있습니다. ‘Kinetic’ 기능 이름만으로 레터링 전용 기능이라고 분류하지 않았습니다. 확인한 구현은 소스 레이어 속도를 다른 레이어의 변형 속성에 연결하는 기능입니다.

[v0.1.0 릴리스](https://github.com/meszmate/rebound/releases/tag/v0.1.0)의 Windows ZXP 존재를 확인했습니다. 조사한 `main` 소스와 배포 버전의 기능 범위가 같다고 보장하지 않습니다. 제작자도 초기 개발 단계임을 밝힙니다. [MIT 라이선스](https://github.com/meszmate/rebound/blob/0f9fd6c526514d20b688b13c393061606f166ad5/LICENSE).

### aeFunctions / DuAEF — 기존 MCP에 붙이기 쉬운 모션 계산 재료

aeFunctions는 [공식 사용법](https://www.motiondeveloper.com/tools/aefunctions)에서 `.jsx`를 프로젝트 데이터로 가져와 표현식에서 호출하는 방식을 안내합니다. `attachKeys`, `bounceKeys`, `circularMotion`, `getLayerBoundsPath` 등이 제공됩니다. [2.0.3 릴리스](https://github.com/motiondeveloper/aefunctions/releases/tag/2.0.3)에 `aefunctions.jsx` 파일이 있는 것을 GitHub API로 확인했습니다. 릴리스는 2021년 자료이므로 Beta 실사용 검증을 남겨둡니다. [MIT 라이선스](https://github.com/motiondeveloper/aefunctions/blob/a6a777177fe0e0acb5451a0f0f265fecd41153a1/LICENSE).

DuAEF Expression Library는 필요한 함수를 표현식에 포함하는 방식을 직접 문서화합니다. [베지어 함수](https://github.com/RxLaboratory/DuAEF_ExpressionLib/blob/43cddc4bb36f52ccddc5c7930718123943b7812e/src/interpolations/bezierInterpolation.js)와 루프·경로 함수가 존재하며, 의존성은 각 파일의 `@requires`에 표시됩니다. 전체 프레임워크를 설치할 필요가 없는 활용 경로입니다. 다만 이 라이브러리는 [LGPL-3.0](https://github.com/RxLaboratory/DuAEF_ExpressionLib/blob/43cddc4bb36f52ccddc5c7930718123943b7812e/LICENSE)이므로, 수정 코드를 묶어 배포하는 단계에서는 그 조건을 확인해야 합니다.

두 후보는 완성된 고급 타이틀 묶음이 아닙니다. 타이밍·좌표·보조 그래픽의 반복 계산을 줄이는 재료로 보는 것이 적절합니다.

### Animation Composer — 준비된 결과를 비교하기 좋은 무료 패널

[현재 무료 플랜](https://misterhorse.com/pricing)은 1,000개 이상의 에셋을 안내하지만, 이를 모두 무료 레터링 프리셋 수라고 해석하면 안 됩니다. 공식 AE 페이지에는 프리셋·전환·타이포·그래픽과 AE 2025 이상 호환 안내가 있습니다. Beta 호환은 별도 확인 대상입니다.

제작사는 [무료 Starter Pack의 상업 영상 사용](https://help.misterhorse.com/hc/en-us/articles/10574659019549-Can-I-use-the-Starter-Pack-for-commercial-purposes)을 허용한다고 안내합니다. 그러나 완성 영상 사용과 프리셋·편집 소스 재배포는 조건이 다릅니다. [기본 약관](https://misterhorse.com/terms-of-use)과 [템플릿 제작자 예외 조건](https://misterhorse.com/template-authors)을 구분해야 합니다.

공식 제품·도움말에서 공개 API를 찾지 못했으므로 자동 적용을 확정하지 않았습니다. 후보를 패널에서 선택·적용하고, 생성된 레이어·표현식의 조정 가능성을 살피는 방식이 후속 시험 후보입니다.

### Mobilo — 글자 자체의 모션을 분석하는 후보

공식 제품 설명은 문자별 세 변형과 편집 가능한 아트워크·키프레임을 안내합니다. 무료 대상은 **Bold Animated 버전**입니다. 특정 서체의 글자 아트워크이므로 기존 TITAN 폰트에 그대로 입히는 범용 텍스트 프리셋과는 다릅니다. 무료 주문 파일의 실제 AEP/JSX 구성은 아직 받지 않아 확인하지 못했습니다.

[공식 FAQ](https://animography.net/pages/faq)는 개인·상업 작업 사용, 서체 재배포 제한, 소스 전달 시 수령자의 라이선스 필요를 안내합니다. 따라서 문자 형성 방식의 연구 가치와 실제 브랜드·배포 사용 조건을 함께 검토해야 합니다. 유료 Font Manager를 필수 무료 도구로 소개하지 않습니다.

## 3. 외부 리소스 적용 경로를 확인할 로컬 기준 자료

설치 폴더 `C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/Presets/Text` 아래에서 **`.ffx` 300개**를 파일 목록으로 확인했습니다. 추가 리소스 비용 없이 현재 AE 설치에서 사용할 수 있는 자료이며, AE 자체가 무료라는 뜻은 아닙니다.

예를 들어 아래 파일은 실제 존재합니다.

- `3D Text/3D Basic Rotate X Cascade In.ffx`
- `3D Text/3D Basic Position Z Cascade In.ffx`
- `3D Text/3D Flip In Rotate X.ffx`

이 중 하나로 MCP 적용 시점·문자별 설정·편집 가능성을 먼저 검증하면 외부 다운로드와 별개로 `.ffx` 경로를 확인할 수 있습니다. 기본 프리셋을 최종 디자인으로 채택하자는 뜻은 아닙니다. Adobe도 [텍스트 프리셋 적용 및 키프레임 편집](https://www.adobe.com/us/learn/after-effects/web/animate-text-presets)을 안내합니다.

## 4. TITAN에 맞춘 다음 시험 제안

아래는 다음 제작 요청에 사용할 제안이며, 이번 조사에서 실행하지 않았습니다.

1. **문자별 등장 비교:** 같은 `Meet TITAN` 문구·폰트·최종 배치로 기존 방식, aftr에서 변환한 문자 모션, 선택한 네이티브 프리셋을 비교합니다. 등장·정착 시간과 글자 간 간격을 통일해 장식과 타이밍의 효과를 구분합니다.
2. **글자와 선의 연결:** `Built`의 밑줄이 다음 프레임을 준비하도록 연결점을 설계하고, 공개 보간·스프링 코드가 그 연결의 속도와 정착을 개선하는지 확인합니다. 프리셋이 장면의 의미나 연결점을 대신 정해주지는 않습니다.
3. **아웃라인·채움의 역할 교대:** 읽히는 원문과 큰 아웃라인 사본을 구분하여 짧게 비교합니다. Mobilo는 획이 형성되는 방식의 연구 후보이며, 임의의 두 단어가 자동 모핑된다고 기대하지 않습니다.
4. **검사:** 원속도와 확인용 느린 속도를 분리하여 읽기 시간·텐션·컷 연결을 봅니다. 누락 폰트·효과·표현식 오류, 의도치 않은 레이어 추가, 저장 후 재열기와 렌더 결과를 확인한 후 채택합니다.

우선순위 제안은 **aftr 텍스트 정의의 소규모 변환 + Rebound/DuAEF의 공통 모션 타이밍 검토**입니다. `.ffx` 경로 자체는 설치된 기본 프리셋으로 먼저 검사할 수 있습니다. 준비된 타이틀의 시각 탐색에는 Animation Composer, 글자 아트워크 연구에는 Mobilo가 별도 후보입니다.

## 5. 확인 수준과 남은 항목

- 확인됨: 공식 무료 범위·라이선스 표시, 네 GitHub 저장소의 선택 소스, aftr의 MCP 구현, Rebound의 내부 브리지, aeFunctions/Rebound의 릴리스 파일 메타데이터, 현재 MCP의 관련 카탈로그·구현, 로컬 Text `.ffx` 개수와 표본 파일.
- 확인 필요: 각 외부 리소스의 AE 27.x Beta 실동작, 배포 파일의 실제 구성, 누락 폰트·효과, 최종 렌더와 시각적 품질, 편집 소스 전달 조건.
- 이번 조사에서 수행하지 않음: 외부 패키지 설치·등록, 프리셋 적용, AE 환경설정 변경, 새 영상 제작·렌더.
- 변경 파일: 이 조사 문서 1개. 기존 승인 시험의 AEP·MP4·3D 리소스 및 콘티는 수정하지 않았습니다.

조회한 소스 기준 커밋: aftr `628397d700d6282fe2be4d42f4a388392250947a`, Rebound `0f9fd6c526514d20b688b13c393061606f166ad5`, aeFunctions `a6a777177fe0e0acb5451a0f0f265fecd41153a1`, DuAEF ExpressionLib `43cddc4bb36f52ccddc5c7930718123943b7812e`. `main/master` 소스와 릴리스 산출물의 동일성은 확인하지 않았습니다.
