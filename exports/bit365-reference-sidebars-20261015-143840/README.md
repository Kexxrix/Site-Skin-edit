# BIT365 레퍼런스 사이드 패널 구현

제작·검수 완료. 채택안은 아직 정하지 않았다. 10개 레퍼런스를 비슷한 특성끼리 묶어 5가지 구조, 화이트골드·블랙골드 10종을 구성했다. 이번 작업은 Figma 디자인이며 사이트 코드 구현이나 배포는 하지 않았다.

## 변경 위치와 파일

- Figma **16 · 레퍼런스 사이드 패널 · 컴포넌트**: 347:552
- Figma **17 · 레퍼런스 사이드 패널 · 비교**: 347:553
- [사이드바 10종 동일 배율 비교](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=352-1058)
- [1920px 전체 화면 10종](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=356-552)
- [Figma 출처·조정 기록](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=356-8064)
- 이 폴더: 범위·노드 ID·토큰·제작 기록 JSON, 최종 PNG와 검증 기록. 기존 소스 파일 변경 없음.

## 구현 목록과 참조

| 구현안 | 참조 | 사이트용 조정 |
| --- | --- | --- |
| 01 · 혜택 쇼케이스 | [Gold Casino](https://dribbble.com/shots/24102608-Gold-Casino) · [NoLimit City](https://dribbble.com/shots/26107007-Casino-Dashboard-UI-for-NoLimit-City) | 232px 폭 안에서 혜택 3개를 작은 독립 타일로 제한. 외부 VIP 문구와 라이브 승자 피드는 추가하지 않고 기존 메뉴 14개 유지. |
| 02 · 분리형 아일랜드 | [Metafy](https://dribbble.com/shots/20867106-Game-centric-sidebar-navigation) · [Game Launcher](https://dribbble.com/shots/18019661-Game-Launcher-Sidebar) · [March Madness](https://dribbble.com/shots/21293018-March-Madness-Game-Switcher) | 채팅·설치 게임·우측 영상 패널은 제외. 원래 메뉴를 분리 카드에 유지하고 기존 경기 정보 1개를 스포츠 탐색 보조로 재사용. |
| 03 · HUD 이중 레일 | [AR Craft](https://dribbble.com/shots/17803008-AR-Craft-Mobile-Game-Landing-Page-Design) | 게임 HUD의 비정형 레일은 48px 카테고리 레일로 축소. 나머지 공간에 한글 메뉴를 수평으로 표시해 아이콘 의존과 과한 네온을 제거. |
| 04 · 번호형 목차 | [Vention](https://brand.ventionteams.com/brand-positioning/) | 브랜드 문서의 목차를 서비스·스포츠·게임·게시판으로 재해석. 기본은 모두 펼친 상태이며 기능군별 접힘 속성을 제공. |
| 05 · 책등형 프레임 | [Villa Covri](https://speckyboy.com/sticky-vertical-navbars/) · [Rogue Studio](https://www.cssdesignawards.com/sites/rogue-studio/35855/) · [Editorial New](https://onepagelove.com/editorial-new) | 과거 세로 내비 아카이브의 프레임·책등만 차용. 필수 메뉴 14개는 회전하지 않고 수평 유지. 양측 레일을 추가해 본문 폭을 줄이지 않음. |

사이드바 폭 232px, 메뉴 14개의 이름·순서·선택 상태, Pretendard JP 메뉴 14px, 기존 Font Awesome 아이콘 체계를 유지했다. 혜택 타일은 기존 아이콘을 사용한 편집 가능한 골드 스타일이다. 외부 캐릭터나 완성 UI 캡처를 가져오지 않았다. 아일랜드형의 게임 사진과 경기 정보는 기존 화면의 자산·내용을 재사용했다.

## 컴포넌트 교체 방법

1. 비교 페이지의 1920 화면 인스턴스를 선택하고 **Sidebar style**에서 ReferenceSidebar/Sidebar를 선택한다. 새 5종 세트를 우선 목록으로 지정했다.
2. 사이드바 자체의 **Style**과 **Theme**에서 구조 5종과 화이트·블랙골드를 교체한다. 새 사이드바 구성 요소는 전용 컴포넌트다.
3. 번호형 목차의 Section 인스턴스는 **State = Open / Closed**로 기능군별 펼침·접힘을 비교할 수 있다. 클릭 애니메이션을 구현했다는 뜻은 아니다.

참조 라이브러리는 컴포넌트 62개, 세트 3개, 두 모드의 변수 19개로 구성했다. 기존 색상 의미 변수를 참조해 사이트 테마를 맞췄고, 금색 그라데이션은 원본과 같은 정지점·색·방향을 보존한 전용 스타일이다. 헤더·본문은 원래 구조와 자산을 재사용한다.

## 검증과 결과

- 사이드바 10종 × 메뉴 14개: 이름·순서·메뉴 폰트·TITAN SOLUSION의 일반 텍스트 표현 확인, 모두 통과.
- 메뉴 Style / Theme / State 30개 조합에서 텍스트 속성 유지: 통과.
- 전용 전체 화면에서 사이드바 교체 10회: 통과. 1920px, 사이드바 232px, 본문 1688px와 시작 위치 유지.
- 번호형 섹션 16개 펼침·접힘 상태: 통과.
- 검증용 임시 인스턴스 4개 모두 제거.
- 기존 주요 원본 8개 노드 트리의 작업 전후 검사값 일치. 기존 ESPN 기본값도 유지.
- 새 전체 화면 마스터 2개의 헤더와 본문은 기존의 레이아웃·텍스트·이미지 페인트와 일치.
- 원본 골드 그라데이션 정지점·색·방향 일치.
- 두 마스터 모두 개별 텍스트·프레임·인스턴스·이미지로 구성. 전체 UI를 합친 스크린샷 없음.
- 최종 사이드바 갤러리와 전체 10종 비교, 대표 1920 화면을 시각 검수. 글자 크기와 HUD 높이, 비교 행 높이 보정 후 통과.

## 보존과 남은 범위

기존 WOG·ESPN 작업, 화이트골드의 ESPN 기본 적용, 기존 전체 화면 6종 비교, 원래 화이트·블랙골드의 헤더·본문·이미지를 보존했다. 작업 문서도 읽기만 했다. 사이트 소스·서버·라우트·배포는 변경하지 않았다.

1920px를 우선했으며 모바일·태블릿의 별도 화면과 좁은 폭 동작은 이번에 검증하지 않았다. 오토레이아웃과 채우기 구조는 적용했지만 모든 해상도에서 동작한다고 주장하지 않는다. Figma 속성·상태 교체만 검증했으며 실제 사이트 기능이나 애니메이션을 구현하지 않았다.

Vention 공식 데스크톱과 NoLimit City 원본 정적 이미지는 이번 실행에서 직접 확인했다. 일부 Dribbble 브라우저 페이지에는 사람 확인 절차가 있어 접근 가능한 원문과 작업 문서의 수집 내용으로 구조를 재해석했다. Villa Covri·Rogue·Editorial New는 과거 아카이브이며 현재 사이트 동작 자료로 취급하지 않았다.

