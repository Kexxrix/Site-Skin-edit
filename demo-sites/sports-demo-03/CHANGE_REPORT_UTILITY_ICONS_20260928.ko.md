# ALDEBARAN 상단 보조 메뉴 아이콘 색상 수정

완료: PUBLIC v23 / 2026-09-28 11:15:59 KST 동일 공개 주소 배포 succeeded. 공개 주소: https://aldebaran.kexxadrix.chatgpt.site/

## 변경 파일과 범위

- `site/app/aldebaran-wog-r5.css`: `.ab5-notice-links svg`의 `color`에 기존 노랑 토큰 `var(--ab5-small-accent)` 한 속성을 추가했다. 실제 값은 `#FCD73E`다.
- 대상은 상단 공지사항·이벤트게시판·출석체크·고객센터·이용규정 앞의 SVG 5개다.
- 메뉴 텍스트·아이콘 도형·크기·위치·간격·폰트·기능·다른 UI·데이터·자산은 수정하지 않았다.

## 확인 결과

- 로컬 1920×1080, 배율 100%, DPR 1, 폰트 로드 후 화면 확인.
- 다섯 아이콘 모두 기본·호버 상태의 color와 stroke가 `rgb(252, 215, 62)`로 확인됐다.
- 기본 텍스트는 기존 흰색 계열 `#F5F4F4` 그대로다. 기존 호버 시 텍스트 `#FF641F` 규칙도 변경하지 않았다.
- 아이콘 12×12px, 아이콘과 글자 간격 4px, 메뉴 간격 14px, 버튼 높이 35px 등 위치·치수가 변경 전과 같다.
- 조정 담당도 `after-1920.png`를 직접 열어 노란 아이콘과 흰색 기본 텍스트를 확인했다.
- `npm run build`는 exit 0으로 통과했다. 기존 bundle-size / plugin-timings / vinext route-classification 경고는 유지된다.
- CSS 한 속성 변경에 무관한 거래·슬립·모바일·전체 회귀는 다시 실행하지 않았다.

## 배포 진행 기록

출발은 PUBLIC v22 / source `fd3356b6b2814b269c81e3bec3112ff999a1570b`다. 이번 수정은 같은 공개 주소에 반영한다.

작업 초반 성공한 Sites 소스 열기 이후, 기존 Sites 플러그인의 `site-workflow.mjs` 경로가 없어져 자동 배포 절차 실행이 실패했다. 이 작업에서 플러그인을 삭제·이동·재설치하지 않았다. 기존 Git/tar와 공식 Sites credential·native save/deploy를 이용해 복구 배포했다. 원격 parent와 변경 CSS 1파일, 빌드 소스·산출물 일치를 확인하고 비강제 push 후 원격 HEAD가 저장 버전의 SHA와 같은지 검증했다. credential은 메모리/stdin에서만 사용했다. 새로운 배포 시스템은 만들지 않았다. Sites helper 설치 부재는 남아 있으므로 다음 배포 시 현재 도구 경로 확인이 필요하다.

## 증거와 보존

- `input/utility-icon-color-20260928/REQUEST.ko.md`
- `runs/utility-icon-color-20260928/implementation/before.json`, `after.json`, `comparison.json`, `after-1920.png`, `console.json`, `source.diff`
- `runs/utility-icon-color-20260928/coordination/baseline-document-bytes.json`, `visual-review.json`

운영 규칙 변경이 없어 AGENTS.md는 수정하지 않는다. 최종 결과는 STATE/DESIGN_SPEC/DECISIONS의 앞에 추가하고 기존 내용·증거 경로를 보존한다. 사용자 시각 승인과 무관한 기능 전체 검증은 별도다.

## 최종 공개 버전

- source: 6be8c176b374999501952d24520c8411b29b153f
- version: appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_b18020b377348191b72cf159dde3bda5
- deployment: appgdep_6ab9cdcd29b88191901e97dcc6438c3e
- 상태: succeeded / 2026-09-28T02:15:59.790903+00:00
- 로컬 HEAD·확인된 원격 HEAD·저장된 소스 SHA 일치, 작업 트리 clean.
- 배포 후 공개 브라우저 검수는 추가하지 않았고 사용자 공개 탭도 새로고침하지 않았다. 로컬 검수와 native 배포 성공은 별도 근거다.
- 추가 증거: implementation/completion-report.json, final-publication.json, final-source.diff, build.log 및 coordination/final.json.
- 범위 내 미완료 항목 없음. 다음 사용자 피드백을 기다린다.
