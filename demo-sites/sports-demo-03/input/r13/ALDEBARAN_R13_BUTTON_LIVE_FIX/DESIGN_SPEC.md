# ALDEBARAN R13 — 두 항목 상세 사양

## R13-01. 추가베팅 버튼

목표: 작은 노란 버튼에서 숫자는 과하게 뭉치지 않고 화살표는 또렷하며 두 요소가 균형 있게 보이도록 한다.

### 현재 확인된 구현과 진단

직전 공개 DOM에서 다음 값을 확인했다.

- 버튼 `ab5-market-open`: 높이 24px, 라운드 5px, 좌우 패딩 2px, gap 2px, 노란 1px border.
- 숫자: 11px, font-weight 900, line-height 16.5px. 별도 span 없이 버튼의 텍스트 노드.
- 범용 `lucide-chevron-right`: viewBox 24×24, 실제 SVG 요소 12×12px, 경로 `m9 18 6-6-6-6`, computed stroke-width 1.7px.
- 축소율 = 12/24 = 0.5. 경로 중심선의 표시 크기 = (6×0.5) × (12×0.5) = 3×6px. 선의 표시 두께 ≈ 1.7×0.5 = 0.85px. 경로 크기는 stroke의 외곽 두께를 제외한 값이다.
- SVG 내부 여백과 작은 선, 숫자의 높은 굵기가 시각적 불균형의 원인으로 판단된다. 텍스트 `>`를 SVG로 바꾸는 작업은 아니다. 현재도 SVG다.

### 적용값

| 요소 | 값 |
| --- | --- |
| 버튼 높이 | 24px |
| 버튼 폭 | 내용 기반, 고정 폭 및 자릿수 예약 없음 |
| 라운드 | 5px |
| 배경 / border | #F1B000 / 기존 1px 유지 |
| 숫자와 화살표 색 | #171717 |
| 숫자 | 현재 폰트 유지, 11px, font-weight 700, line-height 12px |
| 좌우 패딩 | 각각 5px |
| 상하 패딩 | 0px, flex 중앙 정렬 |
| 숫자 span ↔ SVG gap | 3px |
| SVG 요소 / viewBox | 6×10px / 0 0 6 10 |
| SVG 경로 | M1 1 L5 5 L1 9 |
| SVG stroke | 1.25px, currentColor, fill none |
| cap / join | round / round |
| 정렬 | 버튼 안 수평·수직 중앙, 버튼 자체는 현재 우측 위치 유지 |

전용 SVG 경로 중심선 크기는 4×8px이며 stroke를 포함한 실제 잉크 범위는 그보다 약간 크다. 요소와 viewBox가 같은 크기라 이전의 0.5배 축소가 없다.

폭 계산은 현재 숫자 글리프 폭 + SVG 6px + gap 3px + 양쪽 패딩 10px + 양쪽 border 2px다. 글리프 폭은 적용 폰트에 따라 달라지므로 총 폭을 별도 숫자로 고정하지 않는다. 브라우저 실측값이 소수 px인 것 자체를 오류로 판단하지 않는다.

숫자를 전용 span으로 감싸고 그 뒤에 SVG를 inline으로 둔다. 기존 count 값/조건과 버튼 aria-label/핸들러를 유지한다. SVG에는 `aria-hidden="true"`, `focusable="false"`를 지정한다. PNG로 바꾸거나 문자 `>`를 사용하지 않는다.

기존 범용 SVG CSS가 크기/stroke를 덮어쓰지 않도록 이 버튼 안의 전용 클래스에만 규칙을 지정한다. 전체 SVG의 선 두께, shape-rendering, transform을 일괄 조절하지 않는다. 이 도형에 CSS scale/회전을 적용하지 않는다.

참조 CSS는 현지 규칙의 구조에 맞춰 병합하며 동일 규칙을 중복 누적하지 않는다. 제시값은 이번 적용 시작값이다. 실제 100% 화면에서 확인한 뒤 사용자에게 보여주며, 승인 없이 다른 UI까지 조정하지 않는다.

## R13-02. 좌측 최신 인기 게임 LIVE 칩

대상: `references/left-latest-live-target.png`의 왼쪽 위, ‘최신 인기 게임’ 바로 앞에 있는 주황 LIVE 칩.

- 배경: #F1B000.
- 글자: #171717.
- border가 이미 있다면 그 색만 #F1B000으로 맞춘다. 새 border를 만들지 않는다.
- 기존 폰트/굵기/글자 크기/line-height/칩 크기/패딩/라운드/위치 모두 유지한다.
- 제목과 아래 시간·종목 아이콘·팀명·게임 목록을 변경하지 않는다.
- 상단 헤더의 NEW/LIVE 칩, 다른 메뉴의 LIVE 표시, 다른 브랜드에는 변경을 전파하지 않는다.

## 참조 이미지 용도

| 파일 | 용도 |
| --- | --- |
| more-button-current.png | 사용자가 문제로 지적한 추가베팅 버튼 부분 |
| more-button-desired-context.png | 사용자가 원하는 작은 버튼의 카드 내 맥락. 카드 전체 재작업 지시가 아님 |
| left-latest-live-target.png | 이번 노란색 변경 대상의 위치. 첨부 속 주황색은 변경 전 상태 |

스크린샷 배율로 새로운 레이아웃 치수를 추정하지 않는다. 규격은 위 표와 현재 현지 기준을 적용한다.
