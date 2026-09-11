# 제작 자료 목록과 백업 방식

이 목록은 중요한 진입점입니다. 전체 파일은 저장소 `backup/source-files.json`, 외부 경로 대응은 `backup/external-references.json`, 최종 저장소 파일 무결성은 `backup/repository-files.json`을 참조하십시오. 최종 백업 수집 시점·개수·바이트·제외 범위는 `backup/summary.json`에 기록합니다.

## 기본 폴더

| 폴더 | 보관 내용 |
| --- | --- |
| [generated-images](../../generated-images) | 실행별 가이드·프롬프트·참조·run.json·후속 검수·AE 제작 전체 |
| [device-models](../../device-models) | iPhone17/iPad10 Blender 원본, GLB, 모델 manifest |
| [TEMP](../../TEMP) | 현재 제작에 사용하는 사용자 iPad/iPhone 원본 영상 |
| [.agents/skills/theme-image-pipeline](../../.agents/skills/theme-image-pipeline) | 생성·검수 방식, 누적 사례, 제품 브리프와 모션 기획 |
| [docs/siteskin](../siteskin) | 사이트의 실제 화면·구조·디자인 검토 근거 |
| [Skill](../../Skill) | 프로젝트에서 보관하는 제작 도구·폰트 관련 자료 |
| `titan_promotion` | 프로젝트 전체 백업 시 포함하는 웹사이트의 현재 작업 파일. 내부 Git 이력·의존성 캐시는 별도 |
| `external-sources` | 프로젝트가 참조하는 외부 원본 중 내부에 동일 해시 파일이 없는 자료의 복사본 |

## 가이드·생성형 영상

| 실행 | 내용 |
| --- | --- |
| [titan-video-frames](../../generated-images/titan-video-frames-20260909-174303/INDEX.md) | 초기 장면, 실제 화면 참조, shotlist |
| [titan-furin-wide](../../generated-images/titan-furin-wide-20260909-183213) | 태블릿 와이드 시작 이미지와 실제 MP4 검토 |
| [titan-furin-caption](../../generated-images/titan-furin-caption-20260909-185424/README.md) | 문구를 포함한 시작 이미지·Grok 프롬프트·고정 실패 검수 |
| [titan-cobalt-wide](../../generated-images/titan-cobalt-wide-20260909-191455) | 휴대폰 시작 구도·비율 검수 |
| [Grok type A/B](../../generated-images/titan-grok-type-test-20260910-130048/README.md) | TITAN 단어 움직임 요청과 실제 결과 비교 |
| [Grok type C](../../generated-images/titan-grok-type-stress-20260910-144248/README.md) | 강한 타이포·배경 액션, 후반 문구 회복 |
| [Grok 장문 V1–V4](../../generated-images/titan-grok-partner-earnings-test-20260910-152728/README.md) | 자동 계산·기록 문구, 암전/퇴장/복귀/낙하 시험의 성공·실패 |
| [Seedance 전체](../../generated-images/titan-seedance-full-story-20260910-174620/README.md) | 8개 독립 가이드·프롬프트·참조 ZIP·설정 |
| [브랜드 엔딩](../../generated-images/titan-seedance-ending-equal-type-20260910-181022/README.md) | 같은 대문자 높이·굵기의 TITAN/SOLUTION |
| [이야기 구성](../../generated-images/titan-korean-sequence-20260910-190140) | 한국어/영어 콘티와 표현·참조 강화안 |
| [첫 AE 본 제작 가이드](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/MOTION-REFERENCE.ko.md) | Meet, Core/Built/in-house, CAT VILLAGE, 제작 지시·출력 |
| [후속 세 가이드](../../generated-images/titan-scenes-04-06-guides-20260911-192815/GUIDE.md) | 실제 마커 06/07/08에 해당하는 가이드. 옛 폴더 별칭 주의 |
| [피드백 01 반영](../../generated-images/titan-feedback01-motion-guides-20260911-195303/MOTION-DESIGN.ko.md) | Sportsbook 원호 제거, 전체 장면 오버레이 축소, 릴·차단 동작 |

사진 생성의 초기 실패·재시도·사이트 적용본도 영상의 브랜드·참조 맥락을 위해 보존합니다. `run.json`은 초기 생성 상태, `adoption`·후속 QA·사용자 판정 문서는 그 이후 상태일 수 있습니다. 파일을 하나만 읽어 최신 결론을 정하지 마십시오.

## AE 제작 자료

| 단계 | 주요 진입점 | 함께 볼 자료 |
| --- | --- | --- |
| 기존 Hello World 확인 | [run.json](../../generated-images/ae-hello-world-check-20260911-111523/run.json) | 진단 이미지, 외부 원본 AEP/MP4·제작 폴더 |
| 타이포 v001 실패 | [STATUS](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/STATUS.md) | 누락 밑줄, 보존 AEP, 실제 출력 |
| 밑줄 복원 v002 | [ORCHESTRATION-REPORT](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/ORCHESTRATION-REPORT.md) | manifest, 네이티브 검사, PNG 시퀀스·MP4·스크립트 |
| 실제 기기 v003 | [ORCHESTRATION-REPORT](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v003-devices/ORCHESTRATION-REPORT.md) | 기기 구조·카메라·소스 hash·타이포 보호 검사 |
| iPad 영상 재질 | [RESULT](../../generated-images/titan-ae-two-cuts-20260911-114818/ae-ipad-video-screen-test-v001/RESULT.ko.md) | 정면·사선·뒷면, 재열기, 기기 단독/전체 MP4 |
| 두 씬 8초 v004 | [RESULT](../../generated-images/titan-ae-two-cuts-20260911-114818/two-scene-motion-test-v004/ae-output/RESULT.ko.md) | review-01/02, TIMELINE, VISUAL-REVIEW, USER-ACCEPTANCE |
| 첫 5.7초 본 제작 | [RESULT](../../generated-images/titan-three-scenes-motion-ref-20260911-174559/ae-production-brief-v001/ae-output-v001/RESULT.ko.md) | actual-timeline, preset-usage, verification, QA, 00–17 실행 기록 |
| 현재 06/07/08 확장 | [최신 지시서](../../generated-images/titan-feedback01-motion-guides-20260911-195303/ae-production-brief-v001/WORK-INSTRUCTIONS.ko.md) | source-manifest, timeline-plan, 번호 정정·재개 기록, 진행 중 ae-output-v002 |

생성된 guide·reference 이미지와 실제 AE 렌더를 구분하십시오. `qa`에는 실패 상태·중간 비교·최종 검사 자료가 함께 있으며, 해당 보고서가 어느 파일을 최종으로 판정했는지 확인해야 합니다. 이름에 `PRESERVED`가 있는 AEP는 원본 보존용이며 자동으로 제작 기준으로 선택하지 않습니다.

## 외부 참조와 원본 보존

프로젝트 문서·JSON·실행 파일에 기록된 외부 로컬 미디어 경로를 검색합니다. `D:/WebDL`의 사용자 제공 Grok MP4, 과거 `E:/하데스오프닝.mp4`, 기존 Hello World 자료 등이 대상입니다. 내부에 같은 SHA-256의 파일이 있으면 중복 복사 대신 동일 파일 경로로 연결합니다. 내부에 없으면 `external-sources`에 충돌을 피하는 해시 접미사를 붙여 복사하고 원래 경로·참조 문서·바이트·해시를 기록합니다.

과거 Codex 기본 생성 경로는 프로젝트로 이동한 뒤 존재하지 않을 수 있습니다. 이 경우 동일 실행 기록의 original/final 경로와 해시로 연결합니다. 원본이 없고 대응을 확인할 수 없는 항목은 누락 경로로 남기며, 이름만 같은 파일을 동일 원본이라고 확정하지 않습니다. 외부 웹 참조의 완성 영상이나 설치 소프트웨어 전체를 임의로 다운로드·복사하는 작업은 포함하지 않습니다.

AEP 내부의 원래 절대 경로는 수정하지 않습니다. 이 백업은 감사·연구 자료이며 AE의 Collect Files로 만든 자동 재연결 패키지는 아닙니다. 다른 환경에서는 모델·영상·폰트·Beta 버전과 로컬 참조를 따로 확인해야 합니다.

## 백업 검증 방식

1. 원본 작업 폴더와 분리된 새 체크아웃에 복사합니다. 기존 사이트의 nested Git 저장소는 gitlink가 아닌 현재 일반 파일로 보관합니다. 원래 `.git`·Git 이력은 복사하지 않습니다.
2. `.git`, `node_modules`, `.next`와 재생성 가능한 캐시 디렉터리를 제외합니다. 원본·가이드·실패/중간/최종 출력·영상·모델·제작 스크립트·검증 자료는 포함합니다.
3. 파일마다 원본을 복사 전후 해시·크기로 비교하고 대상 해시 일치를 확인합니다. 쓰는 중인 파일은 재시도합니다. 제작 전체를 멈추는 원자적 스냅샷은 아닙니다.
4. 파일 이름과 텍스트/ZIP 내부의 강한 자격증명 패턴을 검사합니다. 이 검사는 가능한 모든 비밀 정보의 부재를 증명하는 것은 아닙니다.
5. GitHub 파일 크기 제한에 걸리는 항목, 누락·gitlink·로컬 절대 링크 문제, 문서 UTF-8과 내부 링크를 점검합니다.
6. 업로드 후 별도 새 clone에서 파일 수·바이트·SHA-256과 원격 커밋을 비교합니다. 실제 결과는 `backup/` 검증 기록과 완료 보고에 남깁니다.

AE 프로젝트를 열거나 재저장하지 않으므로 AE 메모리에만 있는 미저장 변경과 마지막 수집 뒤의 새 파일은 포함되지 않습니다. 이번 요청은 특정 시점의 백업이며 이후 자동 동기화가 설정됐다고 간주하지 않습니다.
