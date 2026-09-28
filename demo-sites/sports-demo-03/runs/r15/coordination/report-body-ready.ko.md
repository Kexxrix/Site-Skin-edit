# ALDEBARAN R15 수정 보고서 — 최종 배포 대기 초안

상태: 로컬 구현·한정 검증 완료. 타입/빌드·공개 배포 결과는 최종 완료 자료로 채운다.

## 변경 내용

| 항목 | 적용 결과 |
| --- | --- |
| R15-01 | 베팅하기 버튼만 배경 #F1B000, 글자·티켓 #171717. 기존 크기·라운드·활성/비활성 동작 보존. |
| R15-02 | 축구32+농구6+야구16+배구0+아이스하키7=61. 정상45경기와 선택ID 보존, NFL16개는 독립 야구 경기로 교체. 배구 선택 시 양쪽 경기 없음. |
| R15-03 | 계정 버튼 3열×2행, 높이38px·간격4px. 사용자 추가 요청을 반영한 글자12px·아이콘16px·내부간격6px. 보유머니·보너스 행 박스와 금일적중 표시 제거, 우측 경계 정렬. 실제 값·동작 보존. |
| R15-04 | 중앙 일반 글자만 다음 지원 굵기로 한 번 감량. 글꼴·색·크기·행높이 보존. 실제 배당과 N+는 보호. |
| R15-05 | 실제 고유 마켓 배열에서 N+·상세·필터·슬립 연결. 경기마다 제공 유형·구간·라인 차이 적용. 다중 선택지·정확한 스코어·종목 고유 구간 지원. |

## 실제 경기별 마켓 수

합계 **4,476마켓 / 11,485선택지**. 미리보기·선택지·아코디언을 중복 마켓으로 세지 않는다. 선수 로스터 없이 구현한 경기·팀·구간·통계 마켓이며 실시간 경기/배당 연동은 아니다.

| 종목 | 경기 수 | 최소 | 중앙값 | 최대 |
| --- | ---: | ---: | ---: | ---: |
| 축구 | 32 | 46 | 67 | 111 |
| 농구 | 6 | 51 | 82.5 | 115 |
| 야구 | 16 | 25 | 65 | 102 |
| 아이스하키 | 7 | 51 | 65 | 79 |
| 배구 | 0 | 해당 없음 | 해당 없음 | 해당 없음 |

카탈로그 115개 중 73개 유형 구현, 40개 선수 템플릿은 검증 명단 없음, 진출 마켓 1개는 토너먼트 정보 없음으로 제외. 첫 이닝 득점 여부 1개는 동일한 0.5 총점과 별칭 중복을 제거해 제공한다.

## 웨이트 전후

현재 사용 가능한 Pretendard JP face는 400/500/700/800/900이다. 700 다음은 500, 400은 최저이므로 보존했다. 계산된 CSS값 850은 기존 900 face에 대응하므로800으로 변경; 보호 대상950은 변경하지 않았다.

| 역할 / CSS 선택자 | 전 | 후 | 보호/예외 |
| --- | ---: | ---: | --- |
| `.ab5-league-head` | 900 | 800 | 한 단계 감량 |
| `.ab5-league-label small` | 500 | 400 | 한 단계 감량 |
| `.ab5-card-time` | 800 | 700 | 한 단계 감량 |
| `.ab5-card-league` | 800 | 700 | 한 단계 감량 |
| `.ab5-team` | 900 | 800 | 한 단계 감량 |
| `.ab5-score` | 900 | 800 | 한 단계 감량 |
| `.ab5-primary-markets .ab5-odd-label` | 850 | 800 | 850 resolves to installed 900; changed to next face 800 |
| `.ab5-primary-markets .ab5-odd-value` | 950 | 950 | 950 declared / installed face 900; protected unchanged |
| `.ab5-market-name` | 700 | 500 | 한 단계 감량 |
| `.ab5-market-line` | 900 | 800 | 한 단계 감량 |
| `.ab5-match-title` | 800 | 700 | 한 단계 감량 |
| `.ab5-match-start` | 700 | 500 | 한 단계 감량 |
| `.ab5-market-tabs button` | 800 | 700 | 한 단계 감량 |
| `.ab5-market-head` | 900 | 800 | 한 단계 감량 |
| `.ab5-market-head small` | 500 | 400 | 한 단계 감량 |
| `.ab5-market-rows .ab5-odd-label` | 700 | 500 | 한 단계 감량 |
| `.ab5-market-rows .ab5-odd-value` | 900 | 900 | 변경 제외 |
| `.ab5-line-box` | 900 | 800 | 한 단계 감량 |
| `.ab5-data-note` | 400 | 400 | lowest loaded face 400 preserved |
| `.ab5-market-open__count` | 700 | 700 | 변경 제외 |
| `.ab5-menu-item` | 900 | 900 | 변경 제외 |
| `.ab5-sport-label` | 700 | 700 | 변경 제외 |
| `.ab5-user-actions button` | 600 | 600 | 변경 제외 |

## 검증

- 데이터 구조 검사: 61경기, 기존 선택 ID 1664개 보존, NFL16개 제거, 배당 방향 비교 1839쌍 통과.
- 종목별2경기, 총8경기·10마켓 경로: 클릭선택/Space해제/슬립의 마켓·구간·기준값·규칙 연결 확인.
- 배구0의 목록/상세 빈 상태, 종목 복귀와 유효슬립 유지 확인.
- 23역할 폰트 비교, 계정 우측1903px 정렬/버튼38px/글자12px/아이콘16px/넘침0 확인.
- 로컬1920×1080/100%: 계정 추가피드백, 111+와17개 스코어 선택지 화면 확인.
- 타입·빌드·공개: 최종 자료 대기.

## 61경기 상세 집계

| 경기 ID | 종목 / 리그 | 프로필 | 마켓 | 선택지 | N+ 일치 |
| --- | --- | --- | ---: | ---: | --- |
| record-401902644 | 농구 / NBA 프리시즌 | standard | 80 | 168 | 일치 |
| record-401881922 | 아이스하키 / NHL 프리시즌 | extended | 79 | 192 | 일치 |
| record-401857190 | 농구 / WNBA | extended | 115 | 238 | 일치 |
| record-401884790 | 축구 / 분데스리가 | extended | 111 | 276 | 일치 |
| record-401879275 | 축구 / 프리미어리그 | extended | 110 | 274 | 일치 |
| record-761815 | 축구 / MLS | standard | 67 | 188 | 일치 |
| record-401876453 | 축구 / 리그 1 | standard | 67 | 188 | 일치 |
| record-401857191 | 농구 / WNBA | compact | 52 | 112 | 일치 |
| record-401857192 | 농구 / WNBA | standard | 85 | 178 | 일치 |
| record-401857193 | 농구 / WNBA | extended | 115 | 238 | 일치 |
| record-401857194 | 농구 / WNBA | compact | 51 | 110 | 일치 |
| record-401881923 | 아이스하키 / NHL 프리시즌 | compact | 52 | 138 | 일치 |
| record-401886427 | 아이스하키 / NHL 프리시즌 | extended | 78 | 190 | 일치 |
| record-401878099 | 아이스하키 / NHL 프리시즌 | standard | 64 | 162 | 일치 |
| record-401886258 | 아이스하키 / NHL 프리시즌 | extended | 78 | 190 | 일치 |
| record-401879412 | 아이스하키 / NHL 프리시즌 | compact | 51 | 136 | 일치 |
| record-401879652 | 아이스하키 / NHL 프리시즌 | standard | 65 | 164 | 일치 |
| record-401879269 | 축구 / 프리미어리그 | compact | 47 | 147 | 일치 |
| record-401879274 | 축구 / 프리미어리그 | standard | 67 | 188 | 일치 |
| record-401878778 | 축구 / 프리미어리그 | extended | 107 | 268 | 일치 |
| record-401879271 | 축구 / 프리미어리그 | standard | 68 | 190 | 일치 |
| record-401879270 | 축구 / 프리미어리그 | compact | 46 | 145 | 일치 |
| record-761818 | 축구 / MLS | standard | 67 | 188 | 일치 |
| record-761819 | 축구 / MLS | extended | 110 | 274 | 일치 |
| record-761816 | 축구 / MLS | extended | 110 | 274 | 일치 |
| record-761817 | 축구 / MLS | compact | 49 | 151 | 일치 |
| record-761822 | 축구 / MLS | standard | 67 | 188 | 일치 |
| record-761820 | 축구 / MLS | extended | 109 | 272 | 일치 |
| record-761821 | 축구 / MLS | compact | 47 | 147 | 일치 |
| record-761823 | 축구 / MLS | extended | 108 | 270 | 일치 |
| record-761824 | 축구 / MLS | compact | 46 | 145 | 일치 |
| record-761826 | 축구 / MLS | extended | 109 | 272 | 일치 |
| record-761827 | 축구 / MLS | compact | 47 | 147 | 일치 |
| record-761825 | 축구 / MLS | standard | 67 | 188 | 일치 |
| record-761828 | 축구 / MLS | standard | 67 | 188 | 일치 |
| record-401884786 | 축구 / 분데스리가 | extended | 110 | 274 | 일치 |
| record-401884787 | 축구 / 분데스리가 | compact | 47 | 147 | 일치 |
| record-401884785 | 축구 / 분데스리가 | standard | 67 | 188 | 일치 |
| record-401884784 | 축구 / 분데스리가 | compact | 46 | 145 | 일치 |
| record-401884789 | 축구 / 분데스리가 | extended | 110 | 274 | 일치 |
| record-401876451 | 축구 / 리그 1 | extended | 111 | 276 | 일치 |
| record-401876457 | 축구 / 리그 1 | extended | 108 | 270 | 일치 |
| record-401876455 | 축구 / 리그 1 | compact | 47 | 147 | 일치 |
| record-401876454 | 축구 / 리그 1 | extended | 108 | 270 | 일치 |
| record-401876450 | 축구 / 리그 1 | standard | 67 | 188 | 일치 |
| aldebaran-r15-baseball-01 | 야구 / MLB 데모 | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-02 | 야구 / MLB 데모 | extended | 102 | 262 | 일치 |
| aldebaran-r15-baseball-03 | 야구 / MLB 데모 | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-04 | 야구 / MLB 데모 | standard | 67 | 190 | 일치 |
| aldebaran-r15-baseball-05 | 야구 / MLB 데모 | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-06 | 야구 / MLB 데모 | compact | 25 | 70 | 일치 |
| aldebaran-r15-baseball-07 | 야구 / MLB 데모 | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-08 | 야구 / MLB 데모 | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-09 | 야구 / MLB 데모 | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-10 | 야구 / MLB 데모 | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-11 | 야구 / MLB 데모 | standard | 67 | 190 | 일치 |
| aldebaran-r15-baseball-12 | 야구 / MLB 데모 | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-13 | 야구 / MLB 데모 | compact | 29 | 110 | 일치 |
| aldebaran-r15-baseball-14 | 야구 / MLB 데모 | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-15 | 야구 / MLB 데모 | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-16 | 야구 / MLB 데모 | compact | 26 | 74 | 일치 |

## 보존과 한계

R14 N+ 모양·배너6장·40%오버레이·헤더영상·좌측자산·기존내부프레임·스크롤·계정데이터·다른사이트 보존. 사용자로 보이는 기존 야구슬립1건은 삭제하지 않았다.

검증된 선수명단 없음, 실시간피드·신규모바일·새라우트·실거래제출·전체회귀는 범위 밖이다. 기술 검증은 사용자 미감 승인을 대체하지 않는다.
