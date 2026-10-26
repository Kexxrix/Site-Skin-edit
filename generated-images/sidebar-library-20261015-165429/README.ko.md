# 07 · 게임 라이브러리형
Figma 비교 화면: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=397-12461

컴포넌트 페이지: 16 · 레퍼런스 사이드 패널 · 컴포넌트
비교 페이지: 17 · 레퍼런스 사이드 패널 · 비교

- 전체 화면의 Sidebar style 속성에서 Library와 기존 6개 스타일을 교체합니다.
- 메뉴의 Icon 속성으로 PNG 배지 14개를 교체합니다. Label과 Show grip도 편집 가능합니다.
- 메뉴 상태: Default / Hover / Selected. 스킨: WhiteGold / BlackGold.
- 232px 사이드바, 40px 레일, 28px PNG 아이콘, 13px 메뉴 글자, 36px 메뉴 행, 11px 단락 제목.
- 기존 메뉴 14개와 순서, 하단 TITAN SOLUSION 텍스트 유지.
- 메뉴 글자와 레이아웃은 Figma 네이티브 편집 구조입니다.
- 오른쪽 점 그립은 시각적 표현이며 실제 웹 정렬 기능을 구현한 상태가 아닙니다.

## 결과
- PNG 14개 / 메뉴 상태 6개 / 레일 상태 4개 / 그립 1개 / 사이드바 2개 추가.
- 기존 비교 화면을 스타일 7종 × 스킨 2종으로 확장.
- 1920 화이트: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=397-10161
- 1920 블랙: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=397-11787

## 검증
- PNG 14개: 실제 PNG/RGBA, 1254×1254, 투명도와 고유 SHA-256 확인.
- 아이콘을 바꾸고 상태를 전환한 뒤 이미지 선택이 유지되는지 검사 통과.
- 기존 사이드바 변형 12개와 페이지 마스터 2개의 작업 전후 속성 해시 일치.
- 최종 비교 렌더와 1920 블랙 전체 화면 검수.
- 모바일은 사용자 우선순위에 따라 이번 범위에서 제외.
- results/에 원본 이미지, prompts/에 실제 생성 프롬프트, run.json에 경로와 적용 상태, qa/에 검증 자료.
- 생성 및 Figma 적용 완료. 최종 사용자 승인은 별도.

