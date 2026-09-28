# ALDEBARAN R15 수정 보고서

**R15-01~05 및 구현 중 사용자 추가 지시 반영 완료 · PUBLIC v17.** 기존 R14 기록과 증거는 보존했다. 기술 검증 완료 상태이며 사용자 시각 승인과 구분한다.

- 공개 주소: [ALDEBARAN](https://aldebaran.kexxadrix.chatgpt.site/)
- 최종 source: `7c7284fc8dd21b1e84f4bd8dc5fe7f53f9bc6b23` (현지 clean 확인)
- PUBLIC v17 / succeeded: 2026-09-23 16:10:28 KST
- project: `appgprj_6ab0f3255cdc819180a427bf6d0846f4`
- version: `appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_dff080e010a48191b9d5e4a118225fca`
- deployment: `appgdep_6ab37b51a63c819182f809026a660a54`
- 최종 배포 파일: [aldebaran-r15-final.tar.gz](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/aldebaran-r15-final.tar.gz)
- 시작 source: `35a63c764301efe7eb334d70ba9cf6599297bd37` / PUBLIC v15. 중간 v16 공개 검수 이후 표시 결함과 추가 피드백을 보완하여 v17로 마무리했다.

## 구현 중 추가 지시와 보완

- 계정 우측 경계를1903px로 일치시켰다. 보유머니·보너스 행의 오른쪽 padding만10→0, 6버튼 글자14→12px·아이콘18→16px를 반영했다. 38px 높이·3열2행·간격4px·내부간격6px 유지.
- 사용자 노출 금지 표현을 경기/안내/계정/쪽지/규정/팝업에서 제거하고 야구 리그 표기를MLB로 통일했다. 합성 데이터라는 기술적 성격은 내부 기록에 유지한다.
- 팝업 버튼의 남아 있던 금색 그라데이션·광택을 제거했다. 기본/hover/active/focus 상태에서 단색 주황 계열·배경 이미지없음·그림자없음을 검증했다.
- 복합 선택명(홈/원정 조합·더블찬스·승리차)의 조건이 팀명 치환에서 잘리는 결함을 수정하고 표시를 재확인했다.

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
- 타입 검사 및 기존 build 통과. 최초1회 후 추가 사용자 지시·공개 검수 결함 보완으로 최종1회 재실행(빌드 총2회).
- 최종 공개 해외형/국내형/팝업 1920×1080 확인. 국내형61카드·2열·상세패널0, 공개 검수 콘솔 오류0. 금지 노출 표현 없음, 팝업 배경 이미지/그림자 없음 확인.

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
| aldebaran-r15-baseball-01 | 야구 / MLB | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-02 | 야구 / MLB | extended | 102 | 262 | 일치 |
| aldebaran-r15-baseball-03 | 야구 / MLB | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-04 | 야구 / MLB | standard | 67 | 190 | 일치 |
| aldebaran-r15-baseball-05 | 야구 / MLB | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-06 | 야구 / MLB | compact | 25 | 70 | 일치 |
| aldebaran-r15-baseball-07 | 야구 / MLB | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-08 | 야구 / MLB | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-09 | 야구 / MLB | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-10 | 야구 / MLB | compact | 26 | 74 | 일치 |
| aldebaran-r15-baseball-11 | 야구 / MLB | standard | 67 | 190 | 일치 |
| aldebaran-r15-baseball-12 | 야구 / MLB | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-13 | 야구 / MLB | compact | 29 | 110 | 일치 |
| aldebaran-r15-baseball-14 | 야구 / MLB | standard | 65 | 156 | 일치 |
| aldebaran-r15-baseball-15 | 야구 / MLB | extended | 102 | 234 | 일치 |
| aldebaran-r15-baseball-16 | 야구 / MLB | compact | 26 | 74 | 일치 |

## 보존과 한계

R14 N+ 모양·배너6장·40%오버레이·헤더영상·좌측자산·기존내부프레임·스크롤·계정데이터·다른사이트 보존. 검수 중 존재하던 유효 슬립은 삭제하지 않았다. 계정/잔액은 저장 상태를 사용하며 로컬·공개 캡처 사이의 로그인 상태와 금액 차이를 고정 표준값으로 해석하지 않는다.

검증된 선수명단 없음, 실시간피드·신규모바일·새라우트·실거래제출·전체회귀는 범위 밖이다. 기술 검증은 사용자 미감 승인을 대체하지 않는다.

## 변경 파일

- [app/aldebaran-center-r4.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-center-r4.tsx): 사용자노출문구정리
- [app/aldebaran-wog-r5.css](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.css): 버튼·계정패널·중앙웨이트·다중선택지·팝업스타일
- [app/aldebaran-wog-r5.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.tsx): 실제N+·상세/슬립·빈배구·계정·복합선택명·노출문구
- [app/demo-data.ts](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/demo-data.ts): 독립야구fixture와확장마켓스냅샷연결
- [app/prematch-r15.json](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/prematch-r15.json): 61경기·정규화마켓·합성배당·capability/profile스냅샷
- [app/tracker-demo.ts](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/tracker-demo.ts): 사용자노출문구정리
- [app/wog-market-data.ts](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/wog-market-data.ts): 사용자노출문구정리
- [app/wog-service-views.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/wog-service-views.tsx): 팝업·서비스화면의사용자노출문구정리
- 운영 문서 AGENTS.md / STATE.md / DESIGN_SPEC.md / DECISIONS.md: 기존 원문 보존, R15 최신 기준·추가 지시·최종 결과 병합.

## 화면과 검증 자료

- [최종 공개 해외형](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/public/european-1920.png)
- [최종 공개 국내형](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/public/domestic-1920.png)
- [최종 공개 팝업](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/public/popup-1920.png)
- [세 자리 N+ 및 다중 선택지](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/three-digit-multi-1920.png)
- [상세 완료 JSON](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/completion-report.json)
- [61경기 표 CSV](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/coordination/market-inventory.csv)
- [115템플릿 적용·제외 표 CSV](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/coordination/template-coverage.csv)
- [웨이트 전후 실측](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/font-weight-audit.json)
- [데이터 검사](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/data-validation.json)
- [대표 선택경로](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/ui-case-results.json)
- [공개 화면 측정](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/public/final-measurements.json)
- [최종 native 배포 응답](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/final-publication.json)
- [최종 빌드 로그](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r15/implementation/final-build.log)

## 남은 제한

선수/선발/토너먼트 메타데이터가 없는41유형은 사유를 기록하고 제외했다. 배당은 합성 확률 모델이며 복합 마켓은 고정24000샘플과 단순화된 연장 규칙을 사용한다. 실시간 피드·정산 엔진은 구현하지 않았다. 실제 결제·신규계정·베팅제출·모바일·무관 전체회귀 검수는 수행하지 않았다. 빌드는 통과했으나500kB 초과청크 경고·plugin timing·route classification 알림이 남아 있다. 이번 작업을 종료하고 다음 피드백을 기다린다.
