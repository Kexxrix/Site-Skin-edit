# 배경색이 있는 섹션 제목 바의 좌우 여백

작업일: 2026-10-22

## 변경
24페이지의 배경색이 채워진 제목 바 11곳에 auto-layout 좌우 padding만 추가했다.

- GGR Crimson 사이드바 서비스·스포츠·게임·게시판: 좌우 12px, 4곳.
- GGR Crimson 스포츠·라이브 카지노·슬롯 로비: 좌우 16px, 3곳.
- 같은 조건의 HT Polished Gold 사이드바 제목: 좌우 12px, 4곳.
- 채움 없는 기존 Gold·CC Lime·ZXC 제목 바는 변경하지 않았다.

Figma: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=840-3015

## 검증
수정 결과는 result.json에 보관했다.

11개 제목 바의 외곽 위치·크기 및 부모 gap이 동일하다. 메인 제목은 x16부터 시작하고, 전체보기 또는 마지막 화살표의 오른쪽에도 16px이 확보됐다. 사이드바 제목은 x12에서 시작한다. 두 화면의 전체 크기·위치도 유지됐다.

본문 카드·메뉴 행·아이콘·폰트·색상·세로 여백·원본 컴포넌트는 수정하지 않았다. 텍스트는 기존 폰트를 load한 후 부모 auto-layout padding을 변경했다. 원본 master의 padding은 변경되지 않았다.

Figma 실제 렌더를 확인했다:
- qa/ggr-sidebar.png
- qa/ht-sidebar.png
- qa/sports-heading.png
- qa/live-heading.png

아이콘·제목·전체보기·화살표가 색상 바 양 끝에 붙지 않고 안쪽에 표시된다. 추가 잘림·겹침은 발견하지 못했다. 웹 코드·서버·배포는 변경하지 않았다.

