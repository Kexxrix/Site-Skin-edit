# 화이트골드 ESPN 플랫 사이드바 기본 적용

## 변경 위치

- Figma 페이지: 15 · BIT365 · 화이트 골드 (307:552)
- 기본 화면 마스터: BIT365 WhiteGold/Page/1920 (317:1490)
- Sidebar style 기본값: WOG Raised (313:552) → ESPN Panel (313:1287)
- 기존 전체 화면 비교 인스턴스 6개는 개별 Sidebar style 선택값을 다시 고정해 모두 보존했다.
- 사이트 소스 파일 변경 없음. 이 폴더에는 검증 JSON과 전후 화면 PNG만 추가했다.

## 결과

1920px 기본 화면에 ESPN의 섹션 패널 방식 플랫 사이드바를 연결했다. 기존 WhiteGold ESPN/Sidebar 컴포넌트를 재사용했다. 서비스·스포츠·게임·게시판별 구분, 기존 폰트·아이콘·간격·메뉴, TITAN SOLUSION 텍스트를 유지했다. 중복 페이지나 컴포넌트를 생성하지 않았다.

- 적용된 기본 화면: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=317-1490
- 교체 가능한 ESPN Panel 인스턴스: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=319-4856
- 기존 6종 비교: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=318-2063

## 검증

- 새 인스턴스 생성 시 Sidebar style 값과 실제 사이드바 메인 컴포넌트 모두 ESPN Panel (313:1287): 통과.
- 화면 1920 × 1899.2, 사이드바 폭 232px, 기존 헤더·본문 크기 유지: 통과.
- WOG·ESPN 사이드바 컴포넌트 세트, 화이트 헤더·본문의 작업 전후 검사값 일치: 통과.
- 기존 6종 비교 화면의 크기·배치·폰트·텍스트·이미지·색상 검사값 일치: 통과.
- 기본 화면은 편집 가능한 텍스트 194개, 인스턴스 60개 등을 포함한 개별 레이어 구조이며, 전체 UI를 합친 이미지가 없다.
- Pretendard JP와 Font Awesome 6 Free 사용 확인: 통과.
- 최종 1920 화면 PNG 시각 확인: 정렬·간격·이미지·글자 표시 이상 없음.
- 검증용 임시 인스턴스는 제거했다.

## 보존 / 남은 범위

기존 다크와 WOG 디자인, 모든 비교 화면, 헤더·본문·이미지·메뉴 내용을 보존했다. 모바일과 태블릿은 이번 범위에서 검증하지 않았다. 실제 사이트 코드 구현은 포함하지 않는다.

