# 08 · 골드블랙 라이브러리형

- 비교 화면: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=410-15089
- 1920 블랙 골드: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=410-14429
- 1920 화이트 골드: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=410-12627

기존 Library의 왼쪽 카테고리 레일과 세로 구분선을 제거했습니다.
새 LibraryGold 스타일은 별도로 생성한 PNG 아이콘 14개를 사용합니다.
화이트·블랙 골드 스킨에서 같은 골드블랙 배지를 사용하며, 기존 컬러형도 유지합니다.
기존 메뉴 14개, 28px 아이콘, 13px 글자, 36px 행을 유지했습니다. 레일을 제거한 목록 폭은216px입니다.

## 편집
전체 화면 인스턴스의 Sidebar style에서 LibraryGold를 선택합니다.
메뉴 인스턴스의 Icon으로 골드블랙 이미지14개를 교체하고 Label, Show grip도 수정할 수 있습니다.
Default / Hover / Selected 상태와 WhiteGold / BlackGold 스킨 전환 후에도 교체한 아이콘이 유지됩니다.
그립은 시각적 디자인이며 실제 정렬 기능을 구현한 사이트는 아닙니다.

## 보관 및 검증
results/에 투명 PNG14개, prompts/에 실제 프롬프트, run.json에 경로·해시·적용 상태를 저장했습니다.
메뉴와 글자, 레이아웃은 Figma 네이티브 컴포넌트입니다. 아이콘만 생성 PNG입니다.
PNG 형식·RGBA·투명도·1254×1254 크기·읽기·SHA-256을 확인했습니다.
아이콘/상태/스킨 교체 테스트, 레일 제거, 메뉴 순서, 인스턴스 연결, 최종 렌더 검수 완료.
이전6개 스타일 및 원본 페이지 마스터2개 해시 일치. Library도 레일 제거 이후 구조를 보존했습니다.
모바일은 요청에 따라 검수 범위에서 제외했습니다. 생성 및 Figma 적용 완료이며 최종 사용자 승인은 별도입니다.

