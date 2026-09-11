# TITAN 영상 제작 인덱스

작성 기준: 2026-09-11, 한국 시간. 목적은 지금 진행하는 제작을 보존하면서 별도 GPT 작업이 감사·표현 연구를 수행할 수 있도록 실제 결과와 의사결정의 흐름을 전달하는 것입니다. 이 문서는 대화 내용을 그대로 옮긴 로그가 아니라 사용자 요구, 작업 산출물, 실행 보고서에 근거한 제작 기록입니다.

## 읽는 순서

1. [CURRENT-STATE](CURRENT-STATE.ko.md): 최신 범위, 유지할 것, 진행 중인 출력.
2. [HISTORY](HISTORY.ko.md): 생성형 영상 시험부터 AE 본 제작까지의 상세 이력.
3. [WORKFLOW-AND-LESSONS](WORKFLOW-AND-LESSONS.ko.md): 실제로 확인한 제어 범위와 실패·품질 판단.
4. [ASSET-CATALOG](ASSET-CATALOG.ko.md): 프롬프트, 원본, AEP·MP4·QA 자료 진입점.
5. [AUDIT-HANDOFF](AUDIT-HANDOFF.ko.md): 별도 작업에서 사용할 복사 가능한 의뢰문과 보고 형식.

## 빠른 진입점

| 자료 | 경로 | 읽을 때 주의 |
| --- | --- | --- |
| 전체 이야기 | [English storyboard v2](../../generated-images/titan-korean-sequence-20260910-190140/english-storyboard-v2.md) | 문구·순서·제품 의미의 기준. 옛 화면비·시험 길이를 현재 제작에 자동 적용하지 않음 |
| 기존 5.7초 제작 결과 | [결과 보고](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/ae-production-brief-v001/ae-output-v001/RESULT.ko.md) | 파일명 01-03은 가이드 묶음 기준. 전체 AE 마커 번호와 다름 |
| 최신 06·07·08 지시서 | [WORK-INSTRUCTIONS](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/WORK-INSTRUCTIONS.ko.md) | 제작 실행의 구체 기준 |
| 프레임별 계획 | [timeline-plan.json](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/timeline-plan.json) | 공식 마커 매핑과 레거시 내부 키 설명 포함 |
| 일시 정지 이후 재개 | [execution-status.json](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/execution-status.json), [재개 전달 기록](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/resume-dispatch.json) | 이전 중단 기록보다 최신 지시가 우선 |
| 최신 10.5초 검토본 | [v002 결과 보고](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/ae-output-v002/RESULT.ko.md) | 06/07/08 추가 제작·기술 검증 완료. 사용자 최종 모션·미감 승인 대기 |
| 실제 모델 | [device-models](../../device-models/README.ko.md) | 관리된 iPhone17·iPad10 원본·내보내기·해시 |

## 상태를 읽는 규칙

- **관찰됨:** 실제 영상·이미지·파일·AE 평가값 등 확인한 대상과 범위를 명시합니다.
- **기술 검증 통과:** 해당 버전의 규격·프레임·설정·디코딩·재열기 등 보고서에 적힌 검증만 통과했다는 뜻입니다.
- **사용자 검토 통과:** 사용자가 명시한 평가 범위를 보존합니다. 테스트 성공과 최종 납품 승인까지 확대하지 않습니다.
- **제안 / 미검증:** 기능 문서가 있거나 아이디어를 설명했어도 실제 결과를 만들고 검토하지 않았다면 이 상태입니다.
- **진행 중:** 현재 저장된 AEP와 스크립트가 있어도 완성 렌더·QA 보고가 없다면 완료로 취급하지 않습니다.

새 작업은 이 저장소를 읽고 분석·연구 결과를 작성하는 역할입니다. 제작 변경은 원래 작업에 의견을 되돌리고 최신 사용자 지시와 합의한 뒤 수행합니다. 백업 과정은 AE 프로젝트를 열거나 재저장하지 않습니다.

백업 준비 중에는 v002가 진행 중이었지만 업로드 과정에서 완료 보고가 도착했습니다. 최신 결과 보고와 검증 파일까지 추가 반영했습니다. 지시 전달 당시의 `execution-status.json`은 실행 이력이고, 제작 결과는 그 이후 작성된 v002 `RESULT.ko.md`와 `verification.json`을 우선 확인하십시오.
