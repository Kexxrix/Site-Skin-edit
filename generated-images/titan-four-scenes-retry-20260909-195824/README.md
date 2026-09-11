# TITAN 업무 사진 4장 재생성

Codex 내장 이미지 생성으로 각각 한 번씩 생성한 독립 PNG 4장입니다. 현재 사이트 캡처와 사용자가 제공한 4개 장면 비교 이미지를 각 호출에 실제로 첨부했습니다. 생성 당시에는 사이트에 적용하지 않았으며, 2026-09-10 사용자 요청으로 네 장을 로컬에 적용했습니다. 현재 상태는 [적용 기록](adoption-20260910.json)을 확인하세요.

| 결과 | 장면 | 실제 파일 |
| --- | --- | --- |
| 01 | 개발자·기획자의 코드 검토 | [01-development-planning.png](results/01-development-planning.png) |
| 02 | 고객 응대 | [02-customer-support.png](results/02-customer-support.png) |
| 03 | 시스템 구조를 설명하는 기술 회의 | [03-technical-meeting.png](results/03-technical-meeting.png) |
| 04 | 태블릿 기획안을 검토하는 아이디어 회의 | [04-idea-meeting.png](results/04-idea-meeting.png) |

네 파일 모두 실제 PNG 1122×1402px, 약 4:5 세로 비율입니다. 원본을 리사이즈·크롭·재인코딩하지 않았습니다. 이번 도구 출력만 프로젝트로 이동했으며 전후 SHA-256 일치와 읽기 가능 여부를 확인했습니다.

## 프롬프트와 참조

- 실제 요청: [requests.json](prompts/requests.json)
- [01 프롬프트](prompts/01-development-planning.txt), [02 프롬프트](prompts/02-customer-support.txt), [03 프롬프트](prompts/03-technical-meeting.txt), [04 프롬프트](prompts/04-idea-meeting.txt)
- [현재 사이트](references/current-hero-1440.png): 사용 맥락과 배치 위치 참조
- [사용자 비교 이미지](references/user-four-scene-quality-reference.png): 사진의 완성도와 역할 표현 참조

## 검수

원본 네 장에서 업무의 행동을 각각 확인했습니다. 손·눈·기기 연결의 큰 오류는 발견하지 못했습니다. 파일 검증만으로 추천하지 않고 장면의 목적과 사진의 표현, 배치 적합성을 함께 보았습니다.

- [312.5×400px 슬롯 검수](qa/slots-1440.png): 네 장의 핵심 행동 유지
- [236.5×400px 중앙 크롭](qa/slots-1024.png): 01은 손끝과 코드 일부 잘림. 03은 보드 오른쪽 범위 감소
- [좁은 슬롯 위치 조정 제안](qa/slots-1024-adjusted.png): 01을 20% 50%, 03을 70% 50%로 표시하여 핵심 단서 보존 확인. 생성 당시의 CSS 표시 제안이며, 2026-09-10 적용에서 이 위치를 반영함
- [브라우저 검수 기록](qa/browser-framing.json), [전체 실행 기록](run.json)

02의 마이크 제스처는 전형적인 상담 광고 연출에 가깝고, 04는 작은 화면에서 다소 복잡할 수 있습니다. 인물·공간·의상은 비교 참조와 시각적 유사성이 남아 있습니다. 생성된 코드·도식은 연출 단서이며 실제 회사 시스템을 증명하는 자료가 아닙니다. 새 사진의 네 역할 분리는 확인했지만, 생성 경로나 프롬프트 길이에 따른 보편적인 품질 우열을 증명한 실험은 아닙니다.

시도 4, 생성 4, 실패 0, 건너뜀 0, 검수 통과 4, 에이전트 납품 선택 4, 적용 요청에 따른 사용자 선택 4, 로컬 사이트 채택 4, 거절 0. 검수 통과는 위의 크롭 제안을 포함한 정지 이미지 범위입니다.

생성 직후 검수에서는 사이트 app/components/public 63개 파일의 해시가 기준선과 동일했습니다. 이후 2026-09-10 적용에서는 hero.tsx 한 파일을 변경하고 새 PNG 네 장을 public에 복사했습니다. 기존 사진 파일, 영상, CSS, 이전 생성물과 참조 원본은 보존했습니다.
