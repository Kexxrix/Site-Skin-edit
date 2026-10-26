# HT 골드 사이드바 — 좌우 아웃라인 잘림 수정

- 대상: [24페이지 HT Polished Gold 사이드바](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=818-1900)
- 변경: 비활성 메뉴 13개와 카테고리 바 4개의 테두리를 OUTSIDE → INSIDE로 변경.
- 원인: 216px 너비의 메뉴·타이틀 바깥으로 1px 그린 stroke가 같은 너비의 Items/Group/스크롤 viewport에서 잘렸다.
- strokesIncludedInLayout을 false로 설정해 테두리를 안쪽에 표시해도 글자·아이콘이 밀리지 않게 했다.
- 기존 선택 행은 이미 INSIDE이므로 변경하지 않았다.

## 검증

사이드바 전체 자손의 x/y/width/height, padding, gap, corner, clip 및 overflow를 비교해 기하 차이 0건을 확인했다. 232×956 사이드바, 216×44 메뉴, 22px 아이콘, 텍스트 위치를 유지했다. 스크롤 viewport의 clipsContent=true 및 VERTICAL overflow는 유지했다.

골드 원본·CC Lime·공용 Sidebar/Menu 마스터 3개의 전후 스냅샷 해시가 모두 일치했다. sidebar-after.png에서 회색 메뉴와 금색 타이틀 바의 좌우 테두리가 온전히 보이는 것을 확인했다.

## 범위

HT 골드 화면의 사이드바 인스턴스 17개 항목만 수정했다. 공용 원본, 다른 스킨, 헤더/배너/본문, 웹 코드와 서버는 변경하지 않았다. 이번 수정 범위에서 남은 문제는 발견하지 못했다.

- 실행: 01-fix.js
- 구조 검증: result.json
- 최종 시각 검수: sidebar-after.png

