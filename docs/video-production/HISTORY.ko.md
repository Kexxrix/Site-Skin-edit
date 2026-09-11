# TITAN 영상 제작 상세 이력

이 기록은 2026-09-09~11의 프로젝트 산출물과 사용자 피드백을 연결합니다. AE 시험의 출발점이 된 기존 Hello World 작업은 2026-08-06 폴더에 있으며 09-11에 읽기 전용으로 확인했습니다. 수치는 해당 버전의 실행 보고에 근거하고, 이번 문서 작성 과정에서 모든 과거 영상을 다시 재생한 것은 아닙니다.

## 1. 사이트 목적과 생성형 영상 시험

초기 과제는 TITAN 사이트에 맞는 업무 사진과 홍보 영상 첫 프레임을 마련하는 일이었습니다. 사진에서 외형·조명만 강조하면 개발·상담·기술 회의·아이디어 회의의 의미가 약해진다는 피드백이 있었습니다. 이후 실제 사이트 화면과 사용자의 업무별 참조를 넣고 손·도구·행동을 구분했습니다. 이 사진 작업은 영상의 브랜드·장면 의도를 이해할 배경이며, 현재 AE 제작과는 구별합니다.

영상에서는 FURIN 태블릿, COBALT 휴대폰, 타이포 중심 장면을 시험했습니다. 생성된 첫 프레임이 좋아도 실제 영상이 확대량·정지 구간·자막 위치·UI를 그대로 보존하지 못하는 사례가 확인됐습니다. 예를 들어 FURIN 와이드 요청의 4초와 실제 약 6.04초 길이가 달랐고, 고정하도록 지시한 글자의 위치·크기와 기기 화면도 변했습니다. 이는 그 시험의 관찰 결과이며 모든 도구에 대한 보편적 결론이 아닙니다.

이어 Grok에서 짧은 `TITAN`, `TITAN / SOLUTION`, 긴 `PARTNER EARNINGS / AUTO-CALCULATED & RECORDED`의 움직임을 비교했습니다. 큰 액션과 후반 글자의 회복은 일부 결과에서 좋았지만, 원래 문구가 남아 있고 추가 글자만 움직이거나 장식이 판독 구간을 가리는 문제가 있었습니다. 거의 같은 모션의 파일 두 개를 독립 생성 두 번의 성공으로 세지 않았습니다.

V3의 **원래 구성 → 요소가 화면 밖으로 퇴장 → 배경만 남음 → 요소 복귀** 방식은 사용자가 자연스럽고 편집하기 좋다고 채택했습니다. 이후 V4에서 낱글자 낙하·자석 복귀를 지시했을 때 배경 액션은 좋았으나 원래 문구 잔류·추가 글자 낙하로 의도는 실패했습니다. 따라서 시각적 매력, 원래 요소의 수·형태·경로·시간 제어, 편집 활용 가능성을 분리했습니다.

근거: [사진·영상 누적 이력](../../.agents/skills/theme-image-pipeline/references/titan-image-history-20260909-10.md), [모션 검토](../../.agents/skills/theme-image-pipeline/references/titan-video-motion-review-20260910.md), [Grok 장문 시험](../../generated-images/titan-grok-partner-earnings-test-20260910-152728/README.md). 원본 외부 MP4는 백업의 외부 참조 목록에서 원래 경로와 저장 경로를 연결합니다.

## 2. 이야기 구성과 Seedance 가이드

개별 6초 후보에서 일부를 골라 편집하는 시험 뒤, 전체 제품 의미를 단계적으로 설명하는 구성으로 확장했습니다. Seedance용 8개 가이드, 브랜드 엔딩의 같은 대문자 높이·굵기, 한국어 이야기 정리와 영문 카피 v2가 보존돼 있습니다. 이 자료는 계획·프롬프트·가이드이며 해당 전체 영상의 최종 완성을 뜻하지 않습니다.

전체 이야기의 16비트는 Meet TITAN, Core systems/Built/in-house, CAT VILLAGE, Sportsbook, Operations/refined, 배당 급변/자동 차단, 한도 변경/다음 라운드 적용, 수익 자동 계산, 백오피스 기록, 브랜드 엔딩을 연결합니다. 방향을 한정하지 않는 급변, 다음 라운드 적용, 계산·기록과 지급의 구분 같은 제품 의미를 바꾸지 않는 것이 중요합니다.

현재 AE 마스터의 화면은 2400×1024, 30fps입니다. 이전 콘티의 16:9·12초 편집·8초 테스트 길이를 혼합해 현재 제작 규격을 바꾸지 않습니다.

근거: [전체 Seedance 가이드](../../generated-images/titan-seedance-full-story-20260910-174620/README.md), [동일 높이 엔딩](../../generated-images/titan-seedance-ending-equal-type-20260910-181022/README.md), [영문 이야기 v2](../../generated-images/titan-korean-sequence-20260910-190140/english-storyboard-v2.md).

## 3. 09-11 — 기존 Hello World를 통한 AE 제어 확인

사용자가 다른 작업에서 만든 Hello World 모션을 확인하도록 요청했습니다. 기존 `Hello_World_Stretch_3s`는 1920×1080, 30fps, 3초/90프레임, 무음, 3레이어였습니다. AE 25.4x86에서 MCP 연결, 컴프·레이어·표현식 읽기, 시점별 값 평가를 확인했습니다. 표현식 16개 중 Shape Path 표현식은 14개였습니다.

0.0/1.3/1.7초의 라이브 프레임을 렌더하고 기존 MP4를 디코딩했습니다. 기존 프로젝트는 시작부터 dirty 상태였고 저장하지 않았습니다. 저장된 AEP와 현재 메모리 상태가 같다고 가정하지 않았으며 원래 AEP·MP4 해시를 보존했습니다. 전체 라이브 모션을 재생한 검사는 아니었습니다.

이 단계는 새 TITAN 애니메이션 제작이 아니라 현재 도구의 읽기·평가·렌더 경로를 확인하는 출발점입니다. [검사 기록](../../generated-images/ae-hello-world-check-20260911-111523/run.json)에 세부 근거가 있고, 원래 Hello World 폴더의 AEP·MP4·스크립트도 외부 참조 자료로 백업합니다.

## 4. 첫 AE 두 컷 — 밑줄 누락 실패와 최소 복원

첫 두 컷은 `Meet TITAN`과 `Core systems / Built in-house`를 짧은 네이티브 타이포로 구현하는 단계였습니다. 2400×1024, 30fps, 3초/90프레임에서 Text·Shape·배경·Guide를 구성했습니다.

초기 v001에서 `C02_UNDERLINE` 레이어가 사라졌고 마지막 판독 구간의 의도와 맞지 않았습니다. MP4가 정상 디코딩된다는 것만으로 완료 처리하지 않고, 그 상태의 AEP와 로그를 보존해 실패로 기록했습니다. 누락 원인은 확인하지 못했으며 사용자 조작으로 단정하지 않았습니다.

v002에서는 별도 AEP에서 밑줄만 복원했습니다. Text 5개, Shape 3개, Solid 2개, Guide 2개로 총 12레이어를 검증했습니다. 기존 Hello World 항목은 남아 있었으므로 이 버전을 빈 프로젝트에서 독립 제작한 것으로 기록하지 않습니다. 별도 aerender 실행으로 90개 PNG를 출력한 뒤 MP4를 만들었습니다. 처음 선택한 출력 템플릿 문제로 0프레임이 나온 실행도 로그에 남겼고, 실제 파일 수를 확인한 재출력만 성공으로 셌습니다.

67개 속성 검사를 통과했고 지정 hold 구간의 픽셀 동일성을 확인했습니다. 가이드의 비활성·렌더 제외, 소스 파일 해시와 기존 항목 보존도 검사했습니다. 이때는 3D·카메라·기기 화면·소리가 없는 타이포 시험입니다.

근거: [v001 실패 상태](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/STATUS.md), [v002 상세 결과](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/ORCHESTRATION-REPORT.md), [MCP 구현 메모](../../generated-images/titan-ae-two-cuts-20260911-114818/mcp-implementation-notes.md).

## 5. 실제 3D 기기 — v003

다음 단계에서 실제 iPhone·iPad GLB, 3D Null·Camera·환경을 적용했습니다. 2D 마스터 안에 Advanced 3D 기기 컴프를 배치하는 구조입니다. AE 25.4x86에서 기기 일부가 화면 오른쪽으로 잘리는 구도는 의도한 구성으로 유지했습니다.

`TITAN`의 대각 움직임, Built의 기준점·스케일·정착, in-house 블러 등을 조정하고 기존 타이포의 보호 영역 픽셀을 비교했습니다. 기기의 회전 축·정면을 실제 렌더로 확인했습니다. 초기 삼각형 모양의 렌더 이상은 장면 원점·카메라 거리·스케일 조정으로 해소했으나, 깊이 정밀도 문제라는 설명은 확정 원인이 아닌 가설로 남겼습니다. GLB 자체를 임의로 바꾸지 않았습니다.

119개 속성 검사, 90프레임 출력, 마지막 hold와 원본 해시·기존 항목 보존을 확인했습니다. 이 단계의 스크린은 회색 placeholder이므로 **실제 3D 모델 성공과 영상 화면 연결 성공을 구분**해야 합니다.

근거: [v003 상세 결과](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v003-devices/ORCHESTRATION-REPORT.md), [기기 배경 모션 지시](../../generated-images/titan-ae-two-cuts-20260911-114818/device-background-motion-instructions-v3.md).

## 6. AE Beta — 실제 iPad 영상 재질 시험

After Effects Beta 27.0x43에서 영상 레이어를 모델 화면 재질로 사용하는 경로를 시험했습니다. 당시 입력은 `E:/하데스오프닝.mp4`, 1920×1080·24fps·약 14.42초이며 첫 3초만 검증했습니다. 2360×1640 화면 컴프에 비율을 유지해 맞추고 상하 패딩을 뒀습니다.

`iPad10.SCREEN`에 영상 소스를 지정하는 마지막 메뉴 선택은 UI가 필요했습니다. 2D로 표시되지 않는 소스 레이어가 재질 입력으로 평가되는 구조이며, 단순히 영상을 기기 위에 올린 합성과 구분합니다. 연결 직후 회색이던 상태는 Save/Reopen 뒤 회복됐고 구체 원인은 단정하지 않았습니다.

정면·사선·뒷면에서 앞뒤 가림을 확인하고, iPad 단독 및 전체 3초 영상을 출력했습니다. 저장 후 2.9초 재렌더도 비교했습니다. 다른 AE 버전, 전체 원본 길이, iPhone의 새 재질까지 이 단계에서 성공한 것으로 기록하지 않습니다. 이후 현재 작업은 Beta 기준으로 진행하고 실제 연결된 버전을 확인하도록 했습니다.

근거: [iPad 영상 재질 시험 결과](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-ipad-video-screen-test-v001/RESULT.ko.md), [3D 모델 연구 기록](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-3d-model-research-20260911.md).

## 7. 두 장면 모션 테스트 v004 — 접촉·반동·사용자 성공 판정

3초 기능 시험에서 8초/240프레임의 두 장면 테스트로 확장했습니다. Meet의 문자별 등장, 원호와 도트, TITAN의 긴 이동, iPad의 진입·문구와 접촉·문구 밀림·후퇴·반동·회전 정착을 구체 프레임과 곡선으로 설계했습니다. 기존 영상 재질 연결을 재사용했습니다.

review-01에서 review-02로 가면서 첫 장면의 iPhone을 숨기고 iPad의 정면·마지막 자세와 후퇴/회전 타이밍을 수정했습니다. iPad가 문구에 접촉하는 시점은 F167, 후퇴·회전 구간과 최종 자세는 TIMELINE에 기록했습니다. Built의 기준점과 방향성, 글자와 기기의 관계를 실제 영상으로 비교했습니다.

실제 AE 평가값과 목표 곡선의 오차 검사, 240프레임 출력·전체 디코딩, 재열기, 정상 속도 재생 검증을 수행한 보고가 있습니다. 재열기 PNG에서 일부 매우 작은 픽셀 차이를 수치로 공개했으므로 전체 SHA가 동일하다고 바꾸어 말하지 않습니다.

사용자는 **이번 테스트는 성공**이라고 평가했고 텐션과 연결 흐름에는 개선 여지가 있다고 했습니다. 더 빠르게 재생했을 때 텐션이 괜찮다는 의견도 기록했습니다. 시험 길이가 늘어난 영향은 가능한 설명이지만 유일한 원인으로 검증한 것은 아닙니다. 이는 현재 테스트 성공이지 전체 20초 영상이나 사이트 최종 채택 승인이 아닙니다.

근거: [결과](../../generated-images/titan-ae-two-cuts-20260911-114818/two-scene-motion-test-v004/ae-output/RESULT.ko.md), [실제 타임라인](../../generated-images/titan-ae-two-cuts-20260911-114818/two-scene-motion-test-v004/ae-output/TIMELINE.ko.md), [사용자 판정](../../generated-images/titan-ae-two-cuts-20260911-114818/two-scene-motion-test-v004/ae-output/USER-ACCEPTANCE.ko.md).

## 8. 표현 연구 — 참조 영상과 프리셋·라이브러리

사용자는 타이포 내부 연결, 아웃라인, 글자·그래픽·입체물의 역할 교대 등 더 풍부한 표현을 원했습니다. K/DA의 THE BADDEST 공식 가사 영상 주요 시점과 약 1:37–1:38 연속 동작, Ben Gabelman의 공개 GIF 4종을 관찰했습니다. 전체 프레임이나 제작 원본 AE/C4D 프로젝트를 확보한 분석은 아닙니다.

읽는 글자와 공간을 만드는 큰 아웃라인의 분리, 앞 장면의 선을 다음 그래픽으로 넘기기, 특정 획을 Shape로 파생시키는 방법을 제안했습니다. 원작이 정확히 어떤 소프트웨어·플러그인·모핑 방식으로 만들어졌는지 완성 영상만으로 단정하지 않았습니다. 굴절·복잡한 입체 재질은 이 프로젝트에서 미검증입니다.

별도 무료 모션 리소스 조사에서는 설치된 Adobe Text 프리셋과 `apply_preset` 경로, 공개 aftr·Rebound·aeFunctions·DuAEF Expression Library 등을 검토했습니다. 라이선스·버전·MCP 연결 가능성과 실제 적용을 구분했고, 조사 단계에서 새 패널을 설치하거나 표현을 적용하지 않았습니다. 이후 본 제작에서 실제로 사용한 것은 아래의 Adobe 프리셋입니다.

근거: [THE BADDEST 표현 연구](../../generated-images/titan-ae-two-cuts-20260911-114818/motion-language-reference-review-20260911.md), [무료 리소스 조사](../../generated-images/titan-ae-two-cuts-20260911-114818/free-motion-resources-research-20260911.md). 이 문서들은 연구 당시 1차 출처와 확인 한계를 보존합니다.

## 9. 빈 프로젝트에서 첫 5.7초 본 제작

이전 시험을 그대로 늘리는 대신 `project.new` 뒤 항목 0·dirty false·file null을 확인하고 새 본 제작을 시작했습니다. 이전 AEP·컴프·좌표를 가져오지 않았고, 이미 열려 있던 미저장 프로젝트는 별도 보존했습니다. 새 `TITAN_MASTER_20S`는 20초/600프레임이며 우선 171프레임/5.7초를 출력했습니다.

주요 구성은 Meet/TITAN 등장, 동일한 선과 끝점 도트로 다음 문구 연결, Core/Built/in-house 누적, CAT VILLAGE 전환, 채움→아웃라인, 실제 iPad의 깊이 이동과 정면 정착입니다. 24개 레이어 중 Text 12개, Shape 5개, AV 7개이며 AV에는 비활성 가이드 3개가 포함됩니다. 가이드 PNG를 완성 화면으로 렌더하지 않았습니다.

실제 적용한 세 프리셋은 `3D Basic Rotate X Cascade In`, `3D Basic Position Z Cascade In`, `Slide Up By Word`입니다. 총 7개 Text 레이어에 적용한 뒤 시간·이동량·선택 범위를 조정했습니다. 네이티브 표현식 30개를 사용했으며 aftr/Rebound 패널을 설치·사용한 것은 아닙니다.

이번 iPad 입력은 과거 하데스 테스트 영상 대신 사용자 지정 `TEMP/아이패드.mp4`입니다. 60fps 원본을 정상 속도로 사용해 F114에서 원본 2초, F170에서 약 3.8667초가 보이도록 연결했습니다. 화면 contain은 122.916667% 균일 스케일과 상하 156.25px 패딩입니다. 실제 기기 스케일은 [900,900,900]으로 유지하고 깊이·원근으로 화면상 크기를 바꿨습니다. 자동화 메뉴 선택이 적용되지 않아 사용자가 마지막 iPad 재질 선택을 수행했고, 재열기·렌더로 연결을 검증했습니다.

최종 보고는 2400×1024·30fps·171프레임·5.7초·무음, 누락 폰트/footage 0, 원본 해시 보존, 관련 속성 128회 평가, 저장 후 재열기와 정상 속도 재생을 기록합니다. 전용 `expressionError` 조회가 없어 평가값·렌더·경고 표시를 함께 확인한 한계도 명시했습니다. 사용자는 이후 일단 통과시키고 다음 제작을 진행하도록 지시했습니다. 옛 보고서의 사용자 승인 대기 문구는 보고 당시 상태입니다.

근거: [본 제작 결과](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/ae-production-brief-v001/ae-output-v001/RESULT.ko.md), [실측 검증](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/ae-production-brief-v001/ae-output-v001/verification.json), [실제 프리셋 사용](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/ae-production-brief-v001/ae-output-v001/preset-usage.json).

## 10. 후속 세 가이드·피드백 01과 전환 명확화

이어 Sportsbook, Operations/refined, Sudden odds shift→Bets auto-blocked의 가이드와 모션 지시를 만들었습니다. 사용자의 피드백에 따라 Sportsbook 가이드의 반복 원호를 제거했습니다. 피드백에 보인 Built 이미지는 반복 구조의 예시이며 새 Operations 카피를 Built로 바꾸라는 의미가 아니었습니다.

가장 중요한 정정은 Operations→급변 장면의 전환입니다. **급변 장면 전체를 크게 확대해 앞 장면 위에 올린 후 축소해서 최종 화면으로 정착**시키는 방식입니다. 앞 Operations 장면을 작은 썸네일·카드로 바꾸는 것이 아닙니다. 최종 급변 화면 내부 셀을 기준으로 앵커·위치·스케일을 계산하고 타이포·릴·배경이 함께 변환하도록 지시했습니다. 그 뒤 반대 방향 릴 가속·동시 정지·Bets/auto-blocked 등장·읽기 hold를 정했습니다.

가이드 묶음을 04–06이라고 부른 것이 실제 AE 마커와 충돌했습니다. 사용자의 스크린샷을 기준으로 **06 Sportsbook, 07 Operations/refined, 08 Sudden odds shift**로 정정했습니다. 중간에 07–09로 추론한 것도 철회했습니다. 기존 09 Bets auto-blocked 마커는 결과 이벤트로 보존합니다. 잘못된 버전은 QA 역사 파일로, 최신 기준은 WORK-INSTRUCTIONS·timeline-plan·numbering-correction·실행 상태로 구분했습니다.

사용자가 일시 정지를 지시한 동안 새 AE 제작은 진행하지 않았고, 이후 “작업 지시서 전달하고 애팩 작업 시작하게 해”라는 명시적 지시로 재개했습니다. 2026-09-11 20:23:57 KST 재개 전달 기록이 있습니다. 같은 작업의 사용자 최신 지시가 이전 정지 기록보다 우선합니다.

근거: [최신 모션 설계](../../generated-images/titan-feedback01-motion-guides-20260911-195303/MOTION-DESIGN.ko.md), [실행 지시서](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/WORK-INSTRUCTIONS.ko.md), [번호 정정](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/numbering-correction.json), [재개 전달](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/resume-dispatch.json).

## 11. 백업 시점의 진행 중 작업

최신 AEP의 바이트가 과거 결과 보고와 다르다는 것을 발견해 원본 덮어쓰기나 원인 추정을 하지 않고 현재본·미저장본·네이티브 기준 상태를 보존하도록 지시했습니다. 새로운 `ae-output-v002`에서 06 실제 iPhone, 07 타이포·패널, 08 전체 오버레이·릴 제작을 이어가고 있습니다.

담당 작업은 iPhone 화면 재질의 마지막 선택을 사용자가 완료했고, F182/F219와 저장·재열기 후 연결을 확인했다고 보고했습니다. 후속 사용자 지시로 `SCREEN_iPhone17_VIDEO_CONTAIN` 내부의 작은 검정 원형 마스크로 녹화 붉은 점을 숨겼으며 원본 영상은 보존했다고 보고했습니다. 이는 담당 작업의 진행 보고로 확인한 내용입니다. 해당 샘플 검사가 전체 10.5초 최종 렌더 검증을 대체하지 않습니다.

백업용 체크아웃은 현재 AE 제작 폴더와 분리합니다. 파일을 읽어 복사하고 전후 해시를 비교하며 AE를 열거나 재저장하지 않습니다. 새 GPT 작업의 감사·연구는 [인계문](AUDIT-HANDOFF.ko.md)에 따라 진행할 수 있고, 제안은 원래 작업으로 되돌립니다. 제작 중 파일의 최종 상태는 [CURRENT-STATE](CURRENT-STATE.ko.md)와 백업 manifest를 함께 읽어야 합니다.
