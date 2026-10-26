# 2열 퀵 메뉴 · 홀수 항목 수정

**Changed files**

- Figma `BIT365 BlackGold WOG/Sidebar`의 `Style=Tiles` (`263:978`): 쪽지·베팅규정 인스턴스와 두 빈칸 장식.
- 이 폴더의 state.json, README.md, tiles-recess.png. 프런트엔드 소스 변경 없음.

**What changed**

- 쪽지와 베팅규정을 206×66에서 다른 버튼과 같은 100×66으로 축소했습니다.
- 각각 오른쪽에 같은 크기의 음각 홈을 배치했습니다. 어두운 면과 안쪽 그림자, 얇은 하단 반사로 버튼 자리의 흔적을 표현했습니다.
- 기존 WRAP 자동 배치 구조를 유지했습니다. 메뉴와 홈 사이 간격은 기존 6px입니다.
- 메인 컴포넌트를 수정하여 비교 화면과 1920px 전체 화면에 연결된 인스턴스가 함께 갱신됐습니다.

**Verification**

- 메인 컴포넌트와 두 비교 인스턴스: 14개 메뉴 모두 100×66, 음각 홈 2개도 100×66 확인.
- 두 홀수 행의 메뉴와 홈이 같은 y 좌표로 정렬됨 확인.
- 홈은 내용이 없는 장식용 Frame이며 연결된 동작은 0개입니다.
- 232×830 인스턴스 렌더를 원본 크기로 확인: PASS.
- Raised/Inset 메인 컴포넌트, NavigationItem 및 GroupHeader 세트의 수정 전후 해시 동일.

**Not changed**

- 다른 두 사이드바 안과 공용 메뉴 버튼 컴포넌트.
- 메뉴 이름·순서·아이콘·선택 상태·금색 그라데이션·TITAN SOLUSION.
- 헤더·본문과 모바일 작업.

**Remaining risks**

- 이번 수정 범위에서 발견된 문제 없음.

[수정된 인스턴스](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=265-1337)

