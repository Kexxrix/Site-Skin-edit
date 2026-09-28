# ALDEBARAN R14 수정 보고서

2026-09-23 · 지정2항목 구현·한정 검수·기존 공개 주소 PUBLIC v15 배포 완료. 사용자 최종 시각 피드백 대기.

R14는 작업지시 번호다. 실제 공개 배포는 직전v14에서v15로 갱신됐다.

[공개 사이트](https://aldebaran.kexxadrix.chatgpt.site/)

## 변경 요약

| 항목 | 이전 | 최종 반영 |
|---|---|---|
| R14-01 추가베팅 표시 | 11px 숫자와 전용 화살표SVG, gap3 | 8+·10+처럼 동적 개수 뒤에 ASCII+를 붙인 단일 문자열/한span. 12px/700/line12, gap0 |
| R14-02 우측 안내 배너 | 기존 img_banner_01/03/04/05/06/07 배경 | 제공 Banner_01~06 원본6장을 역할별로 연결. 기존문구·정렬·박스·동작·검정40%단일오버레이 보존 |

숫자+는 추가 마켓 개수와 상세 진입을 표시한다. 기존 개수 산정, 노출 조건, 0개 처리, 팀명과 정확한 상세 마켓 수를 설명하는 aria-label은 그대로다. +를 개수에1을 더하거나 ‘이상’으로 재해석하지 않았다. 모바일에서 같은 의미로 상세 베팅에 진입한다는 의도는 기록했으며 이번에 모바일·반응형·새 라우트는 구현하지 않았다.

## 버튼 결과

- 현재 폰트12px/굵기700/줄높이12px, 숫자와+가 하나의span·같은기준선이다. 별도SVG·아이콘·가상요소·상첨자는 없다.
- CSS letter-spacing0, gap0, 좌우padding5px, 내용기반폭/min-width0. 브라우저 측정 JSON은 letter-spacing을normal로 직렬화했으며 소스 선언0을 확인했다.
- 높이24px, radius5px, #F1B000/#171717, 기존1px노랑border·우측정렬 유지.
- 실측8+는27.5625×24px,10+는33.390625×24px. 라벨전체의 가로·세로 중심이 일치하고 잘림이 없다. 실제100% 화면 확인 후 추가 보정은0px다.
- 라벨·여백·Enter·Space·실제두자리라벨 입력은 기존 상세 경기 전환으로 이어지며 슬립선택0을 유지했다. 부모 카드의 버튼 제외 규칙도 보존했다. 국내형에 원래 없던 추가베팅 버튼은 만들지 않았다.

## 배너 원본과 매핑

새 파일은 site/public/banners/aldebaran/r14/에 원본 그대로 복사했다. 6장 모두306×61px RGBA8bit PNG이며 원본 대비SHA-256이6/6일치한다. 이전공유파일은 삭제·덮어쓰지 않았다.

| 새 파일 | 역할 | 기존 HTML 부제 유지 |
|---|---|---|
| Banner_01.png | 텔레그램 고객센터 | 문의 및 제휴 안내 |
| Banner_02.png | 텔레그램 공식채널 | 이벤트 및 공지 안내 |
| Banner_03.png | ALDEBARAN 이용안내 | 서비스 이용 방법 |
| Banner_04.png | 실시간 중계 안내 | 경기 중계 일정 확인 |
| Banner_05.png | 스포츠 라인업 | 경기별 선수 정보 |
| Banner_06.png | 미성년자 이용불가 | 만 19세 이상 이용 |

기존 박스306×60.625px, aspect-ratio323/64, background-size cover, 배너간gap4px, radius4px를 유지했다. 원본높이61px에 맞춰 CSS를 반올림하지 않았다. 제목·부제의 글꼴/색/간격/좌측여백/세로중앙 및 클릭핸들러도 유지했다.

배경은 새PNG → 검정40% gradient한겹 → 기존HTML텍스트 순서다. 추가filter·어둡기레이어·이미지에구운오버레이·예전아이콘은 없다. 원본사진의 크롭이나 색보정은 하지 않았다. 기존cover 표시 방식은 그대로다.

## 변경 파일

- [aldebaran-wog-r5.css](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.css): 숫자+ 규격으로 변경하고 이 버튼의 미사용chevron 규칙만 제거.
- [aldebaran-wog-r5.tsx](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/site/app/aldebaran-wog-r5.tsx): 한span에 동적개수+접미사, 배너6역할의 이미지참조 갱신. 기존문구·handler는 유지.
- public/banners/aldebaran/r14/Banner_01.png부터Banner_06.png까지 원본복사6개 추가.

코드 변경은2파일 5줄추가·6줄삭제다. 운영4MD와 이 보고서는 작업기록으로 별도갱신했으며 이전문서전체와증거경로를 보존했다.

## 검증과 배포

- 기존 로컬1920×1080/100%에서1/2자리 버튼 실물·동작과 배너6장 전체를 확인했다. 운영데이터는수정하지 않았다.
- 타입검사1회: node node_modules/typescript/bin/tsc --noEmit --incremental false — exit0.
- 기존npm run build1회, 공식Sites source/push/package흐름 — exit0. diff check통과, git clean.
- 같은공개주소에서 실제계산값·1자리버튼+6배너1920화면을확인했다. 두자리의 실제시각근거는동일소스의로컬캡처다. 공개전체기능검사를반복하지않았다.
- 공개캡처는우측배너6장이보이도록레일을내린상태다. 캡처후원래상단으로복원했고기존사용자탭·입력·계정·슬립은보존했다. viewport override도복원했다.

공개v15 / succeeded / 2026-09-23 12:51:59 KST.

- 이전commit: 0996e1cb909b69531064bed54911f3103ea0e47d.
- 최종commit: 35a63c764301efe7eb334d70ba9cf6599297bd37.
- project: appgprj_6ab0f3255cdc819180a427bf6d0846f4.
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_5563cc9f51e881919d104a21fe7ad0ef.
- deployment: appgdep_6ab34ccbb5c08191b06649629311ca3c.

## 보존·미검증·남은 판단

완료된좌측LIVE노랑, 헤더NEW/LIVE·영상·로고, 좌측CASINO/SLOT, 기존정렬8/0/39·VS#797979·드래그방지·카드선택·공용SVG, 데이터/배당/슬립, 다른사이트와GitHub백업은보존했다.

요청두항목의 구현미완료는없다. 광범위회귀·다른화면폭·모바일·계정/결제/베팅제출·배너목적지전체재방문은수행하지않았다. 0개처리는소스보존을확인했으며별도합성0개fixture는만들지않았다. 기존chunk-size/plugin-timing/route-classification 경고는남아있고새검사실패는없다. 사용자미감승인은별도이며다음변경은피드백후진행한다.

## 최종 화면과 증거

- [공개 숫자+ 버튼 및 배너6장 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/public/plus-button-and-six-banners-1920.jpg)
- [실제 두자리 버튼 로컬 화면](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/implementation/two-digit-and-banners.jpg)
- [완료 기록](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/implementation/completion.json)
- [한정 검증 근거](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/implementation/evidence.json)
- [원본 복사·해시 기록](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/implementation/asset-copy.json)
- [공개 화면 확인](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/public/browser-confirmation.json)
- [배포 원본 응답](E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/r14/public/native-publication.json)

공개캡처 JPEG1920×1080,265011bytes, SHA-256 634521a99e2ab7d413de2eeba3b463b60390249d947f5e56093dd49eec941934. 다른최종검수이미지도public/image-validation.json에기록했다. 초기공개브라우저읽기범위·오래된레일raster는브라우저캡처처리로해결했으며제품코드와검사횟수를늘리지않았다. 미리보기 http://localhost:5303/ 는유지했다.