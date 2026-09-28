# ALDEBARAN 상단 보조 메뉴 아이콘 색상 변경

완료: PUBLIC v23, 2026-09-28T02:15:59.790903+00:00 (2026-09-28 11:15:59 KST) 배포 succeeded.
공개 주소: https://aldebaran.kexxadrix.chatgpt.site

## 변경 파일

- `site/app/aldebaran-wog-r5.css:60`의 기존 `.ab5-notice-links svg`에 `color: var(--ab5-small-accent)` 한 속성만 추가.
- 공지사항·이벤트게시판·출석체크·고객센터·이용규정 앞 아이콘 5개만 #FCD73E.
- diff 1파일/1줄 교체. TSX·공용 svg·다른 메뉴/패널 변경 없음.

## 검증

- 기준 PUBLIC v22/source `fd3356b6b2814b269c81e3bec3112ff999a1570b`, 현지 clean. 공식 source-open 성공 후 최소 변경.
- 로컬 1920×1080 CSS viewport, zoom 1, DPR 1, 폰트 로드 완료에서 5개 각각 기본/hover 측정.
- 아이콘 color/stroke 모두 rgb(252, 215, 62). 기본 글자는 기존 rgb(245, 244, 244), hover 글자는 기존 rgb(255, 100, 31) 그대로.
- 버튼·텍스트·아이콘 위치/크기, 12×12px 아이콘, 4px 내부 간격, 14px 메뉴 간격, 폰트·웨이트·배경·불투명도·transform 모두 변경 전과 동일.
- 실제 화면 1회 확인: `after-1920.png`. 콘솔 error/warn 0, 프레임워크 오류 화면 없음.
- `npm run build` 1회, exit 0. 기존 bundle-size/plugin-timing/route-classification 알림만 남음.
- 포인터 hover만 검사. 메뉴 클릭, 거래·슬립·스포츠·전체 회귀는 하지 않음. viewport override는 해제했고 기존 사용자 공개 탭은 reload하지 않음.
- 공개 배포 검증은 native Sites의 terminal succeeded 결과로 완료. 별도 공개 브라우저 회귀는 범위상 실행하지 않음.

## 소스·산출물·배포

- source: `6be8c176b374999501952d24520c8411b29b153f`
- 원격 검증 SHA: `6be8c176b374999501952d24520c8411b29b153f`
- version: `appgprj_6ab0f3255cdc819180a427bf6d0846f4~appgver_b18020b377348191b72cf159dde3bda5`
- deployment: `appgdep_6ab9cdcd29b88191901e97dcc6438c3e`
- archive: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03/runs/utility-icon-color-20260928/implementation/aldebaran-utility-icon-color.tar.gz`
- archive SHA-256: `b74a087c4f0b7a8239f4b24c5b4a9580a26d69ea464ca35865ffbfb952724054`
- CSS SHA-256: `f53c9c0536646426d63e55bff59eda0eb0f0c96de4d2da93152a3524e1f21378`
- native archive 검증/저장 성공: 291 files.
- 최종 현지 작업 트리 clean.

## 배포 도구 경로 장애와 해결

공식 소스 열기에는 성공했지만 뒤이은 workflow 실행 시 기존 Sites 플러그인 폴더와 `site-workflow.mjs`가 없어 MODULE_NOT_FOUND가 발생했다. 재설치하지 않았다. 조정 작업의 명시적 대체 경로 허용에 따라 기존 Git/tar와 공식 Sites write credential·native save/deploy로 완료했다.

원격 parent/현지 HEAD 일치, 비어 있는 index, 승인된 CSS 한 속성 외 수정 없음, 산출물 작성 시 CSS SHA-256 일치를 먼저 확인했다. 기존 Git으로 해당 파일만 commit하고 force 없이 push한 뒤 원격 SHA를 다시 확인했다. 정상 build 산출물을 이전 성공 archive와 같은 `dist/server`, `dist/client`, `dist/.openai/hosting.json` 구조로 묶어 필수 entry와 hash를 검사했고 native save가 이를 검증·수락했다. credential은 hidden stdin/일시적 환경 설정으로만 전달했으며 파일·명령 인자에 저장하지 않았다.

## 보존·한계

텍스트 기본/hover 색, 아이콘 모양·크기·위치·간격, 모든 다른 스타일/동작, 데이터·자산, 다른 사이트, GitHub 백업, 운영 문서는 유지했다. 이번 범위 내 미완료 없음. 무관한 회귀 검사는 실행하지 않았다. Sites 보조 스크립트 설치 경로 부재는 남아 있으나 이번 공개 배포는 검증된 native 절차로 완료했다. 사용자 미감 승인과 기술·시각 검증은 구분한다.

