# Royal Cobalt · Frost Azure · GGR Crimson 배경 적용
기록일: 2026-10-22

기존 24 기본형의 세 테마에 새로 생성한 래스터 배경을 적용했다. 웹 코드·서버·배포는 변경하지 않았다.

## 적용 대상

| 테마 | Figma 프레임 | 새 배경 레이어 | 이미지 강도 | 표현 |
|---|---|---|---|---|
| Royal Cobalt | 868:4209 | 899:7502 | 85% | 코발트 유리, 단정한 굴절과 검정 공간 |
| Frost Azure | 868:4894 | 899:7515 | 60% | 자연 서리와 얼음 결정, 짙은 네이비 |
| GGR Crimson | 840:3015 | 899:7528 | 85% | 흑요석, 붉은 광선과 연무 |

세 배경은 별도 잠금 사각형의 IMAGE fill이다. 원본 1920 × 1819.199951 화면 뒤에 ABSOLUTE로 놓고 양방향 STRETCH 제약을 설정했다. 새로운 컴포넌트 복제나 원본 인스턴스 분리는 하지 않았다.

## 이미지 파일과 프롬프트

- [Royal Cobalt](results/royal-cobalt-glass-background-v1.png) / [프롬프트](prompts/cobalt.txt)
- [Frost Azure](results/frost-azure-ice-background-v1.png) / [프롬프트](prompts/frost.txt)
- [GGR Crimson](results/ggr-crimson-obsidian-background-v1.png) / [프롬프트](prompts/crimson.txt)

Built-in image_gen을 각각 1회 사용했다. 실제 출력은 모두 PNG, RGB, 1289 × 1221이다. 요구한 배경 비율은 1920:1819였고, 파일을 추가 크롭·리사이즈하지 않고 Figma FILL로 배치했다. 기존 화면을 직접 열람하여 색과 노출 영역을 확인했으며 생성 도구에는 스크린샷을 첨부하지 않았다. 실제 프롬프트를 위 경로에 보존했다.

## 검수와 수정 이력

1. 새 원본 세 장에서 테마 구분, 불필요한 문자·인물·UI가 없는지 확인했다. 중앙은 어둡고 가장자리에 재질이 나타나도록 구성했다.
2. Figma 전체 화면 렌더에서 기존 콘텐츠 위계와 사진·버튼·제목을 확인했다.
3. Frost 하단의 얼음 무늬와 일부 파트너 로고가 겹쳐 보였다. 이미지 자체는 그대로 보존하고 배경 레이어에 하단 네이비 그라데이션을 추가했다. 첫 도포 순서에서는 이미지 밑에 놓여 효과가 약했으므로 paint 순서를 이미지 → 그라데이션으로 수정했다. 최종 전체 화면에서 하단의 복잡도를 낮추고 로고 구분을 확인했다.
4. 최종 검수 후 레이아웃·패널·타이포 추가 수정은 하지 않았다.

- [세 화면 비교](qa/comparison.png)
- [Cobalt 전체](qa/cobalt-applied.png)
- [Frost 전체](qa/frost-applied.png)
- [Crimson 전체](qa/crimson-applied.png)
- [기준선](qa/baseline.json), [적용 검증](qa/apply-state.json), [Frost 최종 상태](qa/frost-final-state.json)
- [이동 및 형식 검증](qa/asset-moves.json)

## 보존 검증

새 배경을 제외한 전체 하위 트리 스냅샷의 FNV-1a 값이 전후 동일하다.

| 대상 | 이전 | 이후 | 결과 |
|---|---|---|---|
| Royal Cobalt | 51db86d5 | 51db86d5 | 동일 |
| Frost Azure | a8c02b8f | a8c02b8f | 동일 |
| GGR Crimson | f526354d | f526354d | 동일 |

검증에는 노드 크기·위치·텍스트·폰트·간격·채움·효과·변수 연결·원본 이미지가 포함된다. 화면당 인스턴스 94개, 기존 이미지 포함 노드 100개가 유지된다. 각 화면에 배경 이미지 노드 1개씩만 추가됐다. Frost의 기존 헤더 눈·카드 모서리 장식도 유지했다.

다른 화면 9개와 공유 마스터 44개의 스냅샷 및 캔버스 위치가 그대로다. 성공한 이번 생성 파일만 프로젝트 안으로 이동했고 전후 SHA-256 일치, PNG 실제 형식, 치수와 읽기를 검사했다. 다른 원본·선택본은 이동·덮어쓰기하지 않았다.

## 수량과 승인

시도 3 / 생성 3 / 실패 0 / 건너뜀 0 / 작업자 검수 통과 3 / Figma 적용 3 / 거절 0.
사용자 최종 미감 승인과 웹 채택·배포는 아직 기록하지 않는다.

## 교체와 복구

각 프레임의 `Generated image background` 레이어를 잠금 해제하고 IMAGE fill을 교체하거나 불투명도를 조정한다. Frost 하단 그라데이션은 같은 레이어의 별도 paint로 분리돼 있다. 배경 레이어만 숨기면 기존 단색 배경으로 돌아간다.

확인 범위는 1920px Figma 화면이며 실제 웹의 반응형 배경 처리와 런타임 성능은 이번 작업 대상이 아니다.

