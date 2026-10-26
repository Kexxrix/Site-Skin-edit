# WOG 사이드바 바리에이션 제작 결과

Figma 페이지 **13 · WOG 입체 사이드바**에 원본과 새 3종, 버튼 상태별 비교, 동일한 1920px 본문을 사용한 전체 화면 비교를 생성했습니다.

**Changed files**

- Figma: 새 페이지 `261:552`와 전용 컴포넌트 18개, 컴포넌트 세트 3개.
- 기존 비교용 Page/1920 메인 컴포넌트 `218:1787`: Sidebar style의 교체 후보에 새 세트를 추가했습니다. 기본 값은 기존 기본형 그대로입니다.
- 이 출력 폴더: 생성·변경 노드 기록, 비교 PNG, 검증 JSON과 본 보고서. 프런트엔드 소스는 수정하지 않았습니다.

**What changed**

| Style | 표시명 | 구성 |
| --- | --- | --- |
| Raised | 베벨 리스트 | 돌출된 버튼 면, 표면 반사 경계, 외곽 그림자, 어두운 아이콘 홈 |
| Inset | 골드 아이콘 도크 | 안쪽 단차의 버튼 면, 금색 아이콘 플레이트 |
| Tiles | 2열 퀵 메뉴 | 아이콘과 라벨을 세로로 배치한 2열 구성, 홀수 마지막 항목은 전체 폭 |

WOG의 버튼에서 확인한 밝은 상단 림, 표면의 명암 경계, 안쪽 하이라이트와 바깥 그림자를 참고했습니다. 기존 블랙 골드의 금색 그라데이션을 정확히 재사용했습니다. WOG의 원본 그림이나 아이콘을 복사하지 않았습니다.

세 안은 **BIT365 BlackGold WOG/Sidebar**의 `Style`로 교체할 수 있습니다. 메뉴 버튼은 `Style` 3종 × `State` 4종(Default, Hover, Selected, Pressed)으로 구성했습니다. Label, Icon, Badge, Show badge는 편집 가능합니다.

전체 페이지 인스턴스는 `Sidebar style` 속성에서 기존 기본형 또는 새 WOG 컴포넌트를 선택합니다. 새 사이드바의 중첩 인스턴스를 선택하면 `Style`로 세 안을 전환할 수 있습니다. Hover/Pressed는 디자인 상태이며 웹 동작이나 프로토타입 연결은 이번 범위에 포함하지 않았습니다.

- [원본 + 3안 비교](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=265-883)
- [1920px 전체 화면 비교](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=266-1408)
- [사이드바 컴포넌트 세트](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=265-840)

**Verification**

- Figma 렌더 이미지 확인: 원본 크기의 사이드바 비교와 1920px 전체 화면 구성을 확인했습니다.
- 인스턴스 실제 교체: Inset → Tiles → Raised 순서로 교체했습니다. 14개 메뉴, 로컬 Label/Icon/Badge/Show badge, Selected 상태와 TITAN SOLUSION 문구가 유지됐습니다.
- 메뉴 텍스트의 가로 넘침 검사: 발견되지 않았습니다.
- 1920px 전체 화면 3안: 헤더 1920×64, 사이드바 폭 232. 본문 해시가 모두 `ca527a55`로 동일합니다.
- 기존 09 페이지: 2,670개 노드, 해시 `c47cd377` 유지.
- 기존 10 컴포넌트 페이지: 1,016개 노드, 해시 `a762a4bb` 유지.
- 골드 Paint 배열: 기존 소스와 정확히 일치.
- 임시 교체 검사용 인스턴스 삭제 확인.
- PNG 두 파일: 읽기, 크기와 SHA-256 확인. 자세한 기록은 verification.json에 있습니다.

**Not changed**

- 기존 기본형과 09·10 페이지.
- 기존 메뉴 이름·순서·아이콘·선택 항목, TITAN SOLUSION 표기.
- 기존 골드 그라데이션, 헤더와 본문 디자인, 적용 이미지.
- 모바일 작업과 프런트엔드 소스.

**Remaining risks**

- 이번 범위에서 기술적 결함은 발견되지 않았습니다. 모바일과 웹 상호작용은 미검증이며, 시각적 채택 여부는 사용자 검토 전입니다.

