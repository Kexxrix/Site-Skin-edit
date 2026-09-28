# 최종 글자 크기 일치 — PUBLIC v21

국가·리그 구분 이름을 12px에서 14px로 확대해 우측 상세 경기 제목의 실제14px와 맞췄다. 변경 파일은 `site/app/aldebaran-wog-r5.css` 하나이며 `.ab5-league-label`에 font-size:14px 한 속성만 추가했다.

로컬1920×1080/100%에서 8헤더 모두일치·잘림없음 확인. #FCD73E, 웨이트800, 줄높이18px, 헤더39px, 카운트10px, 국기/화살표치수, 우측제목·카드내제목과 SPORTS/LIVE1px보정은 유지했다. 실제화면을 구현담당과 조정담당이 확인했고 `npm run build` 통과. TS변경이없어 직전타입검사결과재사용. 사용자상태유지/뷰포트복구. 새동작시험·전체회귀·공개브라우저재검사없음.

- PUBLICv21 https://aldebaran.kexxadrix.chatgpt.site / succeeded 2026-09-23 18:15:16KST.
- source 5b4a1476d757871932cd3378db8da9b9f266a6d0.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_3485daacd1b08191b47a01c150c0c076.
- deployment appgdep_6ab3988efe2481919abf1ccc450a4f68.
- 증거 runs/league-header-color-20260923/implementation/title-size/의 completion-report.json, qa.json, local-after-1920.png, source.diff, build.log.

아래 과거 버전 결과는 보존 이력이다.

---

# 최종 색상 정정 — PUBLIC v20

사용자 v19 확인 후 국가·리그 구분 헤더 이름만 #F1B000 → #FCD73E로 정정했다. `site/app/aldebaran-wog-r5.css` 한 파일의 색상 값 한 곳만 변경했다. 라벨 정렬과 다른 요소는 유지한다.

로컬8헤더 RGB(252,215,62), 경기 수/국기/화살표/배경/선/카드 내부 리그명/기존노랑 유지와 실제1920화면을 확인했다. `npm run build` 통과. CSS색상만 바뀌어 직전 타입검사 결과를 재사용했고 새 동작/공개브라우저 회귀는 하지 않았다.

- 공개 https://aldebaran.kexxadrix.chatgpt.site / v20 / succeeded 2026-09-23 18:08:34 KST.
- source 14a1fd33b5c84912bd9d9ebc285557d4aa2632ab.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_c36aba2231e48191b6fd78cdbc4875b9.
- deployment appgdep_6ab39700d1608191aae20877414a3842.
- 증거 runs/league-header-color-20260923/implementation/final-color/의 completion-report.json, qa.json, local-after-1920.png, source.diff, build.log.

아래 v19 결과와 이전 색상은 보존 이력이다.

---

# ALDEBARAN 리그명 색상 및 좌측 라벨 정렬 변경 보고

2026-09-23. PUBLIC v19 배포 완료. https://aldebaran.kexxadrix.chatgpt.site

## 변경 파일과 내용

- `site/app/aldebaran-wog-r5.css`: 국가·리그 구분 헤더 이름에 #F1B000 적용. 좌측 SPORTS/LIVE 내부 글자에만 translateY(1px).
- `site/app/aldebaran-wog-r5.tsx`: 해당 두 라벨의 텍스트에 span을 추가하여 박스와 분리.
- 운영 네 문서, 요청 기록 및 본 보고서: 최신 결과를 기록하고 이전 내용 보존.

소스 변경은 2파일/4줄 추가/3줄 삭제다. 직전 요청인 리그명 색상 변경 진행 중에 SPORTS/LIVE 정렬 지시가 추가되어 한 번의 빌드·배포로 반영했다.

## 실제 확인

- 로컬 1920×1080, 브라우저100%(zoom1/dpr1)에서 확인.
- 표시 중인 국가·리그 헤더8개 모두 #F1B000. 경기 수·국기SVG fill·화살표·배경·구분선·카드 내부 리그명·기존 #FCD73E 포인트 전후 동일.
- SPORTS/LIVE는 원래 flex 가로/세로 중앙, 상하padding0, line-height10.5px여서 구조나 박스를 조정하지 않았다. 두 텍스트만 동일하게 아래1px 보정했다.
- 박스는 SPORTS 53.59375×24, LIVE 34.703125×24 및 기존 좌표 그대로. 글꼴 Pretendard JP/10.5px/800, 색상/라운드/주변간격 유지. 텍스트 y만 각각+1px.
- 구현 담당과 조정 담당이 두 라벨이 포함된 실제 전체 화면을 검토했다. 시각적 상하 여백이 개선됐으며 박스/주변 배치 이동은 보이지 않았다. 사용자 시각 승인은 별도다.
- 대표 아코디언 접기1회 후 펼침 복구. 사용자 선택·입력·슬립유지 상태와 뷰포트 복원.
- `tsc --noEmit --incremental false`, `npm run build` 통과. 새 검사 스위트/전면 회귀 없음.

## 배포

- 기준 PUBLICv18/source bc52561601bb131c515533028336afbc16c9de17.
- 최종 source e4fbe01d95406961af2a3ba56689c9ed948d134c, PUBLICv19.
- version appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_3294a99bb9408191834d35fb5f2bec27.
- deployment appgdep_6ab394fbd93c81919ecc456cada84362, succeeded 2026-09-23 18:00:03 KST.

## 보존 및 한계

데이터·기능·다른칩·카드리그명·기존노란포인트·모든다른자산/사이트 유지. 배구0경기는 표시헤더가 없어 공용선택자 적용만 확인했다. 이번에는 로컬 수정부위 검수와 Sites 배포 성공을 확인했으며 별도 공개 브라우저 재검사/모바일/전체회귀는 하지 않았다. 기존 bundle/plugin timing/route분류 알림은 비차단이며 신규 실패없음.

## 증거

`runs/league-header-color-20260923/implementation/`의 completion-report.json, qa.json, badges-before.json, badges-after.json, local-after-1920.png, source.diff, build.log.

before 전체 화면은 직전 동일v18 증거를 재사용하고 이번 DOMbaseline은 새로 측정했다. badges-before.png는 크롭이 라벨을 포함하지 않아 시각근거에서 제외했다. 이전 운영문서 원문은 coordination/previous-operating-documents.json에 보존.

요청한 두 범위 완료. 다음 사용자 피드백 대기.
