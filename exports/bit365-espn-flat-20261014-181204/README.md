# ESPN 플랫 사이드바 3종

**Changed files**

- Figma 새 페이지 **14 · ESPN 플랫 사이드바** (`284:552`).
- 새 전용 사이드바 3개, 메뉴 버튼 상태 12개, 섹션 제목 3개 — 총 18개 컴포넌트, 3개 세트.
- 기존 WOG 3종의 TITAN SOLUSION 박스 3개 제거. 메인 컴포넌트의 텍스트를 12px Medium으로 정리해 인스턴스에 반영.
- 기존 Page/1920 메인 컴포넌트의 Sidebar style 교체 후보에 새 세트를 추가. 기본 값 유지.
- 이 폴더: 생성·변경 ID 기록, 검증 JSON, 최종 비교 PNG와 본 보고서. 프런트엔드 소스 변경 없음.

**What changed**

[ESPN](https://www.espn.com/)의 좌측 단락 패널, 일정한 행 높이, 아이콘과 글자 사이의 간격, 얇은 구분선을 확인해 현재 블랙·골드 색상에 적용했습니다. ESPN의 원본 아이콘이나 이미지는 복사하지 않았습니다. 기존 Font Awesome 아이콘을 재사용했습니다.

| Style | 표시명 | 구성 |
| --- | --- | --- |
| Panel | 섹션 패널 | 단락별 평면 패널, 내부 1px 행 구분선 |
| Rail | 플랫 레일 | 연속 목록, 섹션 사이 구분선 |
| Grid | 컴팩트 2열 | 같은 크기의 평면 타일, 홀수 마지막 버튼의 오른쪽은 장식용 빈 칸 |

목록 글자 14px, 타일 글자 13px, 아이콘 18px, 아이콘 영역 24×24px, 목록 행 높이 42px, 타일 100×66px. 글자는 Pretendard JP Medium, 선택 상태는 SemiBold입니다. 그림자·베벨 효과는 없습니다.

새 Sidebar 인스턴스의 **Style**에서 Panel / Rail / Grid를 교체합니다. 전체 페이지 인스턴스는 **Sidebar style**에서 기존 또는 새 사이드바를 선택할 수 있습니다. 메뉴의 Label / Icon / Badge / Show badge를 편집할 수 있으며 Default / Hover / Selected / Pressed 디자인 상태를 제공합니다.

- [3종 비교 화면](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=291-828)
- [1920px 전체 화면 비교](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=292-1338)
- [Sidebar 컴포넌트 세트](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=286-1404)
- [기존 WOG 3종의 텍스트 푸터 반영](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=265-883)

**Verification**

- 최종 비교 화면을 정상 배율로 검수: 글자·아이콘 크기와 정렬, 구분선 경계, 선택 상태 대비, 푸터 확인.
- 목록형 모든 아이콘 영역과 글자 행의 수직 중심: 각각 y=21로 일치.
- 세 안의 메뉴 각각 14개. 글자·아이콘 영역·구분선의 컨테이너 밖 넘침 없음. 입체 효과 없음.
- 인스턴스 실제 교체 Rail → Grid → Panel: 로컬 Label/Icon/Badge/Show badge와 Selected 상태, 14개 메뉴, TITAN SOLUSION 유지.
- 1920px 3안의 본문 좌표·크기·텍스트·폰트·이미지·색상 해시 `3841429c`가 원본과 동일.
- 기존 WOG 3종: 메뉴 영역 수정 전후 해시 일치. 푸터 박스 제거를 구조와 렌더에서 확인.
- 전용 변수 15개: 값·범위·WEB 코드 구문 확인. 임시 교체 검사용 인스턴스 제거.
- 초기 렌더에서 발견한 구분선 위치와 선택 배경 대비를 수정했습니다. 최종 PNG가 통과 결과입니다. 첫 캡처는 검수 이력으로 유지했습니다.
- 최종 PNG 3개의 읽기와 SHA-256 확인.

**Not changed**

- 기존 기본형, 승인된 3종의 메뉴 디자인과 2열 음각 빈칸.
- 현재 블랙·골드 팔레트와 기존 골드 그라데이션.
- 메뉴 이름·순서·아이콘·선택 항목, TITAN SOLUSION 표기.
- 헤더·본문·콘텐츠 이미지, 프런트엔드 소스.

**Remaining risks**

- 이번 작업 범위에서 발견된 기술적 문제 없음.
- 모바일과 실제 웹/프로토타입 동작은 이번 범위에 포함하지 않았습니다.
- 새 3종의 시각적 채택 여부는 사용자 검토 전입니다.

