# ALDEBARAN R13 수정 보고서

2026-09-23 · 요청2항목 구현·한정 검수·기존 주소 PUBLIC v14 배포 완료. 사용자 최종 시각 피드백 대기.

R13은 이번 작업지시 번호다. 실제 공개 배포는 v13에서 v14로 갱신됐다.

[공개 사이트](https://aldebaran.kexxadrix.chatgpt.site/)

## 무엇을 변경했는가

| 항목 | 이전 | 최종 결과 |
|---|---|---|
| R13-01 추가베팅 숫자 | 텍스트 노드, 11px/굵기900/줄높이16.5px | 전용span, 11px/700/줄높이12px. 동적 마켓 수 유지 |
| 같은 버튼의 화살표 | 범용24×24도형을12×12로 축소 | 전용inlineSVG6×10, viewBox0 0 6 10, path M1 1 L5 5 L1 9, stroke1.25px, round cap/join |
| 같은 버튼의 내부 간격 | gap2px, 좌우padding2px, min-width27px | gap3px, 좌우padding5px, min-width0/content-width. 고정폭·자릿수 예약 없음 |
| R13-02 좌측 LIVE 칩 | ‘최신 인기 게임’ 앞 주황 칩 | 이 칩만 배경#F1B000·전경#171717. 다른 칩은 보존 |

숫자와 화살표의 과도한 축소·굵기 불균형을 지정 수치로 정리했다. 버튼 높이24px·모서리5px·노랑/전경색·우측 위치는 유지했다. 한 자리 8의 실제 크기는28.09375×24px, 두 자리10은33.421875×24px이며 두 경우 모두 가운데 정렬되고 잘리지 않는다. 폭은 숫자 글리프+SVG6+gap3+좌우padding10+border2로 정해진다. 예를 들어 숫자8은7.09375+6+3+10+2=28.09375px다.

좌측 LIVE는 기존34.703125×24px, 글자10.5px/800/줄높이10.5px, padding0 6px, radius4px를 유지했다. 원래 border가0이므로 새 border를 만들지 않았다. 제목과 게임 목록도 보존했다.

## 변경 파일

- [aldebaran-wog-r5.css](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.css): 버튼·숫자span·전용SVG 규격과 좌측 최신게임LIVE 색상만 조정.
- [aldebaran-wog-r5.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.tsx): 동적 숫자span과 전용inlineSVG 적용. 이 변경으로 미사용이 된 ChevronRight import만 제거.

앱 diff는2파일, 6줄 추가·4줄 삭제다. 공용Chevron 도형이나 전역SVG 규칙은 변경하지 않았다. 운영 AGENTS/STATE/DESIGN_SPEC/DECISIONS에는 R13 변경분과 실제 결과를 병합했고 기존 원문과 증거 경로를 보존했다.

## 검증

- 기존 로컬 미리보기1920×1080/100%에서 숫자·SVG의 실제 크기, stroke1.25px, 한/두자리 정렬·잘림, LIVE의 색상·규격·목록 보존을 확인했다.
- 숫자span, SVG영역, path가 그려지는 위치, 버튼 여백, Enter·Space 모두 기존 경기 상세를 열고 슬립 선택은0으로 유지됐다. 기존 공용 button svg의 pointer-events:none 때문에 SVG/path 영역의 실제 클릭 target은BUTTON이다. 부모 카드의 closest(button) 제외 규칙은 유지된다.
- 국내형은 원래 추가베팅 버튼이0개인 구조를 유지했고, 공통 좌측LIVE 색상을 확인했다. 새 버튼이나 상세 패널을 만들지 않았다.
- 타입 검사1회: node node_modules/typescript/bin/tsc --noEmit --incremental false — exit0.
- 기존 npm run build 1회 및 공식 source/push/package 흐름 — exit0. diff check·git clean 확인.
- 공개 국내형·해외형에서 두 대상의 계산값과1920 최종 화면을 확인했다. 공개에서는 모드 이동만 했고, 상세 입력 검증은 같은 소스의 로컬 결과를 재사용했다. 원래 사용자 공개 탭·입력·선택 상태를 보존했다.

최초 로딩 중 LIVE너비34.5px 측정은 안정화 전 값이었다. 읽기 전용 PUBLICv13의 안정화된34.703125px와 최종값이 같음을 확인했다. 두자리 버튼의 잘못 잘린 임시캡처는 정상 전체화면으로 교체했고 최종 파일의 형식·치수·SHA-256을 검증했다.

## 배포 결과

- 주소: https://aldebaran.kexxadrix.chatgpt.site/ — PUBLIC v14, succeeded.
- 성공 시각: 2026-09-23 12:16:06 KST.
- 이전 소스: 74da3a356c7697d42641997a94025f0dccfef01b.
- 최종 소스: 0996e1cb909b69531064bed54911f3103ea0e47d.
- 프로젝트: appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- 버전: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_9f71c0e50068819199afc6f867eee80b.
- 배포: appgdep_6ab344647ab881918c4c055744658174.

이번 실행에서는 기존 공식 Sites helper가 다시 존재해 그대로 사용했다. 부재·복구 원인은 미확인이다. 재설치·새 의존성·원격 빌드 fallback은 없었다. localhost5303 미리보기는 유지한다.

## 보존·미검증·남은 판단

직전7항목(정렬8/0/39, VS#797979, 드래그방지, 카드 선택 확대 등), 데이터·배당·슬립·접근성 이름·기존 버튼/키보드 처리, 헤더NEW/LIVE와 다른 칩, 다른 사이트·GitHub 백업은 보존했다.

요청한 두 항목의 구현 미완료는 없다. 범위를 벗어난 전체 회귀·다른 화면 폭·계정·결제·베팅 제출은 수행하지 않았다. 기존 chunk-size/plugin-timing/route-classification 빌드 경고는 남아 있다. 기술 검증과 사용자 미감 승인은 별개이며, 다음 변경은 피드백 후 진행한다.

## 최종 화면과 근거

- [해외형 공개 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/public/european-1920.jpg)
- [국내형 공개 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/public/domestic-1920.jpg)
- [실제 두자리 버튼 로컬 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/implementation/two-digit-button.jpg)
- [완료 기록](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/implementation/completion.json)
- [동작·측정 증거](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/implementation/evidence.json)
- [공개 확인](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/public/browser-confirmation.json)
- [원본 배포 응답](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r13/public/native-publication.json)