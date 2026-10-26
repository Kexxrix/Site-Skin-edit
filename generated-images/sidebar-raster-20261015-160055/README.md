# 이미지 아이콘 패널 · Figma 추가

[집중 비교 화면](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=381-10355)

[전체 6종 비교](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=352-1058)

## 추가한 구성

- 비대칭 라운드 세로 패널: 화이트 골드/블랙 골드 2종
- 생성한 투명 PNG 아이콘 14종. 각 아이콘은 PNG 이미지 레이어 1개를 가진 개별 컴포넌트
- 메뉴 Label은 편집 가능한 텍스트, Icon은 INSTANCE_SWAP 속성. 글꼴/벡터 아이콘 사용 없음
- 아이콘 슬롯 40px, 메뉴 글자 14px, 행 52px, 기존 메뉴 14개와 순서 유지
- 기본/호버/선택 상태 6종, 1920 전체 화면 2개 추가
- 기존 Sidebar 컴포넌트의 Style=IconPanel로 선택 가능. 전체 페이지의 Sidebar style 속성에서도 교체 가능
- TITAN SOLUSION은 박스 없는 텍스트 유지

## 검증

- fourteenPNGs: PASS
- rasterOnlyIconComponents: PASS
- twoThemeMenus: PASS
- states: PASS
- linked1920: PASS
- sixthOption: PASS
- previousColumnsPositioned: PASS
- oldWOGESPNAndPageMasters: PASS
- originalNineSidebarHashes: PASS
- captureRemoved: PASS

집중 비교 화면은 실제 크기로 시각 검수했으며, 블랙 골드 1920 전체 화면도 확인했습니다. 본문 이미지/헤더/골드 그라데이션은 기존 전체 페이지 마스터를 사용했습니다. 비교 전용 카드의 색상 상속 표시 문제는 주석 프레임의 표시색만 확정해 해결했으며 제작용 컴포넌트의 변수 연결은 유지했습니다.

기존 10개 레퍼런스 사이드바 중 9개는 작업 전후 구조·시각 속성 해시가 동일합니다. 화이트 책등형(351:1218) 1개는 해시 차이가 감지됐습니다. 금번 직접 수정 노드 목록에는 해당 컴포넌트나 그 하위 노드가 없으며 원인을 확정하지 못했습니다. 기존 상태를 덮어쓰거나 추정으로 복원하지 않았습니다. WOG/ESPN 및 기존 전체 페이지 마스터 4개는 해시 동일합니다.

## 파일

- results/: 생성 PNG 원본 14개. 모두 PNG/RGBA 1254×1254, 원본 비트맵 편집·크롭·리사이즈 없음
- prompts/: 실제 생성 프롬프트 14개
- run.json: 원래 도구 경로, 최종 경로, SHA-256, 적용 상태
- qa/focused-final.png: 최종 집중 비교 화면
- qa/black-1920.png: 1920 전체 화면
- qa/figma-state.json, verification.json: 생성 노드 및 검사 기록

아이콘 생성 및 Figma 적용 완료 상태이며 최종 미감에 대한 사용자 승인은 별도입니다. 모바일 검수는 요청에 따라 제외했습니다. 로컬 사이트 코드 수정이나 배포는 수행하지 않았습니다.

