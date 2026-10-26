# BIT365 사이드바 세부 수정

대상: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=352-1058

## 수정

- 책등형 카드 간격: 16 → 12px. 메뉴 행 높이와 글자 14px 유지.
- 메뉴 아이콘 30종: 18 → 16px. 정렬 슬롯 24px 유지. HUD 카테고리 아이콘 8개도 16px.
- 번호형 목차의 번호/제목: 24/18 → 13/13px. 제목 행 48 → 32px. 펼침/접힘 16종 모두 적용.
- 쇼케이스 선택 버튼의 하단 골드 라인/발광 제거. 번호형 선택 항목의 하단 라인도 제거. 단락 구분선 유지.
- 상단 혜택 타일: 아이콘 30 → 26px, 글자 11 → 12px. 흰 배경과 짙은 글자(onGold) 토큰 연결. 국소 색상 오버라이드 없음.

## 검증

- allTenMastersHaveMenus: PASS
- menuGlyphs16: PASS
- indexSubordinate: PASS
- spineGaps12: PASS
- selectedUnderlinesRemoved: PASS
- benefitsReadable: PASS
- ten1920InstancesLinked: PASS
- protectedOriginalsUnchanged: PASS

컴포넌트 원본과 5종 × 2스킨 비교 이미지를 확인했고, 1920px 블랙골드 쇼케이스 전체 화면을 렌더링해 확인함. 전체 화면 10개의 메뉴 내용/순서/크기와 컴포넌트 연결은 구조 검사로 확인함.

기존 WOG/ESPN 사이드바 및 기존 페이지 마스터 4개는 작업 전후 해시 동일. 기존 메뉴 내용, 본문 이미지, 골드 그라데이션, TITAN SOLUSION 텍스트 유지. 로컬 웹 소스 수정 없음. 모바일은 이번 검증 범위에서 제외.

## 결과물

- before.png / after.png: 두 스킨 5종 비교 화면
- showcase-master-before.png / showcase-master-after.png: 블랙골드 쇼케이스 원본
- showcase-black-1920.png: 1920 전체 화면
- changes.json: 수정/삭제 노드와 생성 스타일 ID
- verification.json: 검증 값

