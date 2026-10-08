# MERCURY White — PUBLIC v1

2026-10-08 17:25:23 KST에 사용자 승인 상태를 별도 공개 사이트로 배포했다. 링크가 있으면 누구나 볼 수 있도록 공개하라는 후속 지시를 반영했다.

- 공개 주소: https://mercury-white.kexxadrix.chatgpt.site/
- 사이트 ID: `appgprj_6ac7523068808191aa0f1014883e0752`
- 저장 버전: v1 / `appgprj_6ac7523068808191aa0f1014883e0752~appgver_e991ccf82a608191afecc2b820724434`
- 배포 ID: `appgdep_6ac75355ae408191bd56f83e2dca519a`, 상태 `succeeded`, 접근 `public`.
- 배포 소스: `publish/site/`, 커밋 `694efe89b8f230030c21f554d674ab71617a60bc`.
- 로컬 작업 원본: `site/`, 기본 커밋 `b425507730a4f39dd393645ef4273653a7c13176`와 승인된 후속 미커밋 변경. 5418/PID41768 및 편집기 5417/PID35992를 유지했다.

배포에는 차콜 배지, Figma 아이콘, 활성 메뉴의 짙은 브론즈 글자, 최신 인기 게임 아이콘 및 종목 선택/해제 아이콘 색상까지 포함한다. 디자인·동작·이미지·승인 입력 팔레트는 새로 수정하지 않았다. 동결한 로컬 소스 345개가 그대로이며, 별도 배포 사본에서만 기존 의존성을 사용하는 Vite 호스팅 설정과 `.gitignore`를 조정하고 `.openai/hosting.json`을 추가했다.

## 검증

- 배포 사본에서 `npm run build`, `tsc --noEmit --incremental false` 통과.
- Sites 저장 v1, 배포 `succeeded`, 접근 `public`을 커넥터에서 확인.
- 터미널의 인증 없는 HTTP 요청은 403을 반환하여 이 경로의 공개 응답·배포 자산 해시 검증은 완료하지 못했다. 접근 정책 public과 실제 공개 URL의 브라우저 렌더를 확인한 사실과 구분한다. 403 요청은 재시도하거나 우회하지 않았다.
- 실제 공개 HTTPS 화면을 1927×932 기준으로 확인. Figma 아이콘 41곳, 메뉴 글자 `#6b481b`, 전체→축구→전체 선택 상태 복원 확인. 이미지 126개, 로딩 미완료 0개, 깨진 이미지 0개, 수집된 브라우저 오류·경고 0개. 기본 전체 종목/토론토 경기 화면으로 복원했다.
- 공개 화면에는 CSS·동작·저장소 오버라이드를 넣지 않았다. 임시 프록시 시작은 자동 승인에서 거절되어 재시도하지 않았고, 이미 열린 실제 공개 페이지를 검사했다. 외부 폰트 요청을 수동 재시도하지 않았다.
- 빌드의 기존 500 kB 청크 경고와 vinext 경로 분류 한계는 남아 있다. 공개 페이지에서 오류 화면은 관찰되지 않았다. 외부 폰트 제공·새 모바일 QA·전체 린트 통과를 이번 검증으로 주장하지 않는다.

## GitHub 보관

통합 저장소: https://github.com/Kexxrix/Site-Skin-edit

최신 수집 명세는 `backup/site-snapshots/20261008-mercury-white-public-v1/source-files.json`이다. 로컬 작업 원본·배포 사본·입력·문서·적격 QA 및 공개 검증 기록을 보관하며, 의존성·빌드·캐시·퇴역 실행 사본·비밀값·중복 압축 파일은 제외한다. 원본 소스 저장소의 브랜치·HEAD·remote 없음 상태는 유지하고 기존 통합 백업 checkout에서만 커밋·push한다. 이전 스냅샷과 다른 사이트의 파일은 삭제하지 않는다.

배포·검수 및 커밋 후 원격 검증 기록은 `E:/codexwork/Site-Skin-edit-backups/20261008-mercury-white-deploy/`에 둔다. `github-remote-verification.json`은 실제 완료 후 생성되는 최종 원격 결과다. 배포 소스 SHA와 통합 GitHub 백업 SHA는 서로 다르다.
