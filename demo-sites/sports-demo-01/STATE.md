# 최신 GitHub 백업 기준 — MERCURY v24 / 2026-10-01

- 통합 저장소 `https://github.com/Kexxrix/Site-Skin-edit`의 MERCURY 백업 기준을 PUBLIC v24 / 소스 `8385d4bbc74394006db637e87466f4a171f6e02d` / `mercury-variation`으로 갱신했다. 현재 사이트 추적 파일 317개·기존 타입 선언 파일 1개와 운영 문서 5개, 총 323개를 원본 바이트 기준으로 대조한다.
- 수집 범위·파일별 SHA-256·제외 목록·공개 배포 조회 결과는 통합 저장소의 `backup/site-snapshots/20261001-mercury-v24/`에 기록한다. 기존 입력·검수 이력과 다른 사이트 자료는 보존한다.
- 앱 코드·디자인·동작 수정, 새 빌드/브라우저 QA, Sites 재배포 없이 GitHub 백업만 수행한다. `.git`, 의존성·캐시·임시 빌드·비밀정보·원본 세션 로그는 이번 수집에서 제외하며, 기준 태그·복원 ZIP·기존 미추적 `tsconfig.tsbuildinfo`를 유지한다.

---

# 최신 완료 기준 — 워드마크 v3 PUBLIC v24 / 2026-09-30

- 사용자 요청대로 `D:/DesignAssets/MERCURY/01_원본수집/로고/mercury-wordmark_v3.png`를 원본 그대로 `site/public/branding/mercury-wordmark_v3.png`에 복사하고, `app/mercury-sports.tsx`의 이미지 경로 한 곳만 바꿨다. 기존 로고·배경·종목 아이콘과 CSS 크기·배치를 유지했다.
- 로컬/공개 1920×1080에서 v3 로고 1798×526 원본, 표시 폭 248px·중심 x=960·위로 5px, 기존 배경 유지 및 화면 표시를 확인했다. 공개 이미지 SHA-256 `9B6DDE375A5312BA2B232E68B957560DF6DCE0427A30D17F008FCF3959E3C558`은 원본/로컬/빌드와 일치한다. 타입 검사·빌드 통과. 기존 빌드 경고와 앞서 기록한 기능 아이콘 사전 로딩 문제는 이번 수정 범위에 포함하지 않았다.
- 소스 `8385d4bbc74394006db637e87466f4a171f6e02d`, `mercury-variation` 유지, Sites 원격 main 일치 확인. 버전 `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_b5329190244c819187d9e1b9901cbaf1` (v24), 배포 `appgdep_6abce866ee6c8191aec45e69fb80713c`, succeeded, 2026-09-30 19:46 KST. 기존 공개 주소와 public 범위 유지.
- 증거: `E:/codexwork/Site-Skin-edit-backups/20260930-mercury-v24-logo/`의 `local-logo-v3.png/json`, `public-logo-v3-full.png/json`, `mercury-v24-deploy.tar`. 빌드 정리 중 ENOTEMPTY가 발생한 dist 잔여물은 같은 폴더의 `build-cleanup-remainder`에 보존하고 다시 빌드했다. 설치된 Sites 보조 스크립트 경로가 없어 기존 소스 푸시 방식과 네이티브 tar로 패키징/필수 항목 검증 후 native Sites 도구로 저장·배포했다.
- 추적 파일은 clean, 기존 미추적 `tsconfig.tsbuildinfo`의 바이트와 상태 보존. 이번 요청에서 추가 디자인 수정·통합 GitHub 백업·오케스트레이션 메시지는 수행하지 않았다.

---

# 최신 완료 기준 — 헤더·종목 아이콘 PUBLIC v23 / 2026-09-30

- 사용자가 로컬 화면을 확인한 뒤 공개 반영과 오케스트레이션 업데이트를 요청했다. 아래 두 로컬 작업의 워드마크·헤더 배경 및 종목 아이콘 10개를 기존 공개 주소 `https://mercury.kexxadrix.chatgpt.site`에 배포했다. 기존 공개 범위 public을 유지했다.
- 소스 커밋 `ca6e86783b601d724a6893982b730e5c9174eab6`, 작업 브랜치 `mercury-variation` 유지, Sites 원격 main 일치 확인. 앱 소스 3개와 PNG 12개가 포함됐으며 기존 자산·데이터·나머지 UI는 보존했다.
- 버전 `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_21c14b0e8ef48191ac0adc98d798345e` (v23), 배포 `appgdep_6abcb1fc32c081919c0f1512b6e3b0ce`, succeeded, 2026-09-30 15:54 KST.
- 로컬 타입 검사·빌드·이미지/필터 검증은 동일 입력의 통과 결과를 재사용했다. 공개 1920×1080에서 새 워드마크·배경과 상단 종목 10개·왼쪽 9개, 기존 20/22px 크기, 워드마크 248px·중앙 x=960·위로 5px, 배경 center top / auto no-repeat, 전체 61경기 카운트를 확인했다. 교체 PNG 12개의 공개 HTTP 응답 SHA-256은 모두 원본과 일치하며, 실제 img 누락과 오류 화면은 없었다.
- 공개 확인 중 기존 기능 아이콘 5개의 HTTP Link 사전 로딩 URL에 한글 인코딩이 깨져 404가 발생함을 확인했다. 실제 DOM 이미지 요청/표시는 정상이다. 이번 교체 자산 검증은 통과했지만 콘솔 무오류 검사는 통과로 기록하지 않았다. 해당 사전 로딩 문제와 기존 빌드 경고는 이번 승인 범위 밖으로 남겼다.
- 배포 패키징의 Windows 드라이브 경로 오류는 TAR_OPTIONS=--force-local로 해당 단계만 다시 실행해 해결했다. 증거: `E:/codexwork/Site-Skin-edit-backups/20260930-mercury-v23-deploy/mercury-public-v23.png`, `mercury-public-v23-header.png`, `public-verification.json`, `mercury-v23-deploy.tar.gz`.
- 이번에는 Sites 공개 반영만 수행했다. 통합 GitHub 백업 체크아웃에서 확인한 sports-demo-01 최신 백업은 여전히 v20 / `39058409d43d3f36fc5a894cd0618207c332bb43`이다. 미추적 `tsconfig.tsbuildinfo`의 바이트와 미추적 상태를 보존했다.

---

# 최신 로컬 작업 — 종목 아이콘 교체 / 2026-09-30 (미배포)

- 사용자 지정 `D:/DesignAssets/MERCURY/02_작업중`의 PNG 12개를 시각적으로 대조했다. 현재 노출된 전체·축구·농구·야구·배구·아이스하키·포뮬라1·복싱·MMA·모터스포츠에 대응하는 10개를 `site/public/sports/mercury-gold-20260930/`로 원본 이름·바이트·256×256 크기·알파를 보존하여 복사했다. 시도 10 / 성공 10 / 실패 0 / 미사용 2(현재 메뉴에 없는 테니스·미식축구). 원본과 기존 자산은 보존했다.
- `app/demo-data.ts`의 종목 아이콘 경로를 교체하고 최신 인기 게임도 같은 매핑을 사용하도록 연결했다. 상단 탭의 20px·왼쪽 목록의 22px 슬롯, 기존 CSS·메뉴 구성·데이터·이벤트 처리는 유지했다. 앞서 적용한 워드마크·배경 로컬 변경도 보존했다.
- `tsc --noEmit --incremental false`, `npm run build` 통과. 로컬 `http://127.0.0.1:5276/`의 1920×1080에서 Playwright/Chrome으로 상단 10개·왼쪽 9개·최신 인기 게임 아이콘 로딩과 대응을 확인했다. HTTP 응답 SHA-256은 원본 10개와 모두 일치한다. 전체·상단·왼쪽 목록 캡처를 직접 검토했다.
- 축구 선택 시 실제 카드 32개, 전체 복귀 시 61개 카운트를 확인했다. 누락 이미지·프레임워크 오류 화면·콘솔 경고/오류·런타임 오류는 없었다. 기존 빌드의 큰 청크·vinext 경로 분류 경고는 유지했다.
- 증거와 원본 매핑: `E:/codexwork/Site-Skin-edit-backups/20260930-mercury-sport-icons-local/`의 `asset-mapping.json`, `verification.json`, `mercury-icons-local.png`, `mercury-icons-tabs.png`, `mercury-icons-sidebar.png`.
- 배포·push·커밋하지 않았다. 공개 기준 v22 유지, 이번 변경은 `mercury-variation`의 미커밋 로컬 수정이며 사용자 최종 디자인 승인은 별도다.

---

# 최신 로컬 작업 — 워드마크·헤더 배경 교체 / 2026-09-30 (미배포)

- 사용자 제공 `D:/DesignAssets/MERCURY/01_원본수집/로고/mercury-wordmark_v2.png`와 `D:/DesignAssets/MERCURY/01_원본수집/헤더배경/image_BG.png`를 `site/public/branding/mercury-wordmark_v2.png`, `site/public/branding/image_BG_v2.png`로 원본 바이트 그대로 복사했다. 이전 자산과 사용자 원본은 보존했다.
- `app/mercury-sports.tsx`의 워드마크 경로와 `app/mercury-sports.css`의 배경 이미지 경로만 교체했다. 배경 `center top / auto no-repeat`, 헤더 본체 높이 100px, 워드마크 폭 248px·전체 폭 중앙·위로 5px 배치를 유지했다.
- 타입 검사와 빌드, diff 공백 검사를 통과했다. Browser 플러그인 부재로 번들 Playwright와 설치된 Chrome을 사용해 `http://127.0.0.1:5276/`의 1920×1080 화면을 확인했다. 새 이미지 HTTP 응답의 SHA-256이 원본과 일치하며 누락 이미지·프레임워크 오류 화면·런타임 오류는 없었다. 국내형 전환 후 워드마크 클릭 시 해외형 복귀를 확인했다.
- 로고 1798×526 원본 → 248×72.546875 표시, 중심 x=960, 수직 이동 약 -5px. 배경 1920×161 원본을 기존 방식대로 상단 100px에 표시한다. 헤더와 전체 화면 캡처를 직접 확인했다.
- 콘솔에는 교체 대상과 무관한 충전·환전 아이콘 preload credentials 경고 2건이 관측되었다. 자동 검사의 무경고 조건은 실패했지만 요청된 이미지 교체·표시·홈 동작 검사는 통과했다. 기존 빌드의 큰 청크·vinext 경로 분류 경고도 유지했다.
- 증거: `E:/codexwork/Site-Skin-edit-backups/20260930-mercury-header-local/mercury-header-local.png`, `mercury-header-detail.png`, `verification.json`.
- 사용자 지시에 따라 배포·push·커밋하지 않았다. 공개 배포 기준은 아래 v22 그대로이며, 이번 변경은 `mercury-variation`의 미커밋 로컬 수정이다. 기존 미추적 `tsconfig.tsbuildinfo`의 바이트와 상태를 보존했다.

---

# 최신 완료 기준 — MERCURY 좌측 6개 배너·워드마크 PUBLIC v22 / 2026-09-30

- `MERCURY_LeftRail_Update_20260930.zip` 기준으로 국내형→해외형→E-스포츠→인플레이→슬롯→카지노를 배치했다. 제공 PNG 5장은 원본 바이트를 그대로 복사하고 해시 일치를 확인했으며 해외형 이미지는 유지했다.
- 배너 302×62px·간격 4px·기능 버튼 아래 8px 유지. HTML 라벨은 기존 골드 그라데이션, 24px/800, 왼쪽 12px·세로 중앙으로 조정했다. 기존 라운드·윤곽선·상단 반사광·호버와 기능 버튼 6개는 유지했다.
- 별도 엠블럼 요소만 제거하고 기존 248px 워드마크를 헤더 중앙(x=960)에 배치, 위로 5px 이동했다. 원본 로고 파일·헤더 높이·배경·계정 버튼·메뉴·공지와 중앙·우측 영역은 유지했다.
- 타입 검사·빌드 통과. 로컬 1920×1080에서 이미지·순서·문구 위치·간격·국내/해외 전환·신규/기존 안내 팝업·로고 홈 동작 확인. 공개 화면에서 이미지·6개 순서·치수·간격·겹침 없음·워드마크 정렬을 확인했다. E-스포츠·인플레이는 기존 준비 중 안내를 재사용하며 새 페이지·API·데이터는 추가하지 않았다.
- 소스 `906cddca5d6a32d9d153e2e5b7bce6ad2dcaba86`, 브랜치 `mercury-variation` 유지, Sites main 원격 일치 확인. 버전 `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_63ed59a8384c81919f171f7dcb6951c3` (v22).
- 배포 `appgdep_6abc7fbaa5188191afea328a9e36898a`, succeeded, 2026-09-30 12:19 KST, https://mercury.kexxadrix.chatgpt.site . 기존 public 공개 범위 유지.
- 결과 캡처: `E:/codexwork/Site-Skin-edit-backups/20260930-mercury-left-rail-v22/mercury-public-v22-verified.png`. 미추적 `tsconfig.tsbuildinfo`와 기존 원본·백업 보존. 기존 청크 크기·vinext 경로 분류 경고는 범위 밖으로 유지했다.

---

# 최신 완료 기준 — MERCURY 좌측 버튼 순서 PUBLIC v21 / 2026-09-29

- 빠른 메뉴를 충전·환전·고객센터 → 이벤트·출석부·공지사항 → 국내형·해외형·슬롯·카지노 순서로 이동했다. 기능 버튼 두 줄 사이 4px, 둘째 줄과 첫 배너 사이 8px.
- 앱 변경은 `app/mercury-sports.tsx`와 `app/mercury-sports.css`의 순서·간격뿐이다. 기존 크기·효과·클릭 처리 및 검색 이하의 코드와 다른 영역은 유지했다.
- 타입 검사, 프로젝트 빌드, 로컬·공개 1920×1080 화면에서 순서·간격·크기 유지·겹침 없음 확인. 기존 빌드 경고는 유지하며 Windows 패키징은 네이티브 tar로 완료했다.
- 소스 `af49ea1732d04e252382a75c5cb94be8578e5144`, 로컬 `mercury-variation` 유지, Sites 원격 main 반영. 버전 `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_c6db9d3b0e1481919d80fa2d675f3309` (v21).
- 배포 `appgdep_6abb9f54bffc819197587441146e8dc0`, succeeded, 2026-09-29 20:22 KST, https://mercury.kexxadrix.chatgpt.site . 공개 범위 public 유지.
- 공개 캡처: `E:/codexwork/Site-Skin-edit-backups/20260929-mercury-rail-order-v21/mercury-public-v21.png`. 기존 미추적 `tsconfig.tsbuildinfo`는 바이트와 미추적 상태 모두 보존했다.

---

# 최신 완료 기준 — MERCURY 커스텀 디자인 PUBLIC v20 / 2026-09-29

- 사용자 요청으로 현재 로컬 상태를 기존 공개 주소 https://mercury.kexxadrix.chatgpt.site 에 배포했다. 공개 범위는 public 유지.
- 소스 커밋: `db9d15c3446a0c650ec84c6d3f655443a26fea4f`. 로컬 작업 브랜치 `mercury-variation`을 유지하고 Sites 원격 `main`에 같은 커밋을 반영했다.
- 버전: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_77fa25b874c48191aedf87eb85310438` (v20). 배포: `appgdep_6abb92d88a488191a3018eaff931922c`, succeeded, 2026-09-29 19:29 KST.
- 반영: 중앙 로고·카지노 원본 배경·블랙 메탈 메뉴 헤더, 국내형 축구 우선 정렬, 좌측 원본 이미지 버튼 4개(국내형→해외형→슬롯→카지노), 하단 흰색 16px 아이콘, 이미지 상단 흰색 하이라이트, 상단 3개·이미지 4개 버튼 호버.
- 검증: 타입 검사와 빌드 통과. 공개 화면에서 최신 헤더·좌측 레일·국내형 분데스리가 우선·61경기·이미지 로딩을 확인했다. 기존 500kB 청크 및 vinext 경로 분류 unknown 경고는 남아 있다.
- GitHub 백업 대상은 기존 `Kexxrix/Site-Skin-edit`의 `demo-sites/sports-demo-01`이며 위 소스와 운영 문서를 기준으로 한다. 다른 사이트·원본 에셋·기존 백업·미추적 `tsconfig.tsbuildinfo`는 보존한다.

---

# 최신 작업 기준 — MERCURY 로컬 기준 백업 / 2026-09-29

**현재 작업: 기준 백업과 로컬 브랜치 준비만 완료한 뒤 다음 디자인 지시를 기다린다.**

- 실제 시작 HEAD: dde4dbd16d2ae2d667926b7e87bf92f4383bd59c (마지막 이 스레드 배포 기록 PUBLIC v19). 과거 v15/v11은 이력이며 최신 복원 기준이 아니다.
- 소스 내용 변경 없는 baseline 빈 커밋: a20e66994e751a4af7f6a7e2cd45935d43b3b1a9
- 기준 태그: mercury-baseline-20260929. 후속 로컬 작업 브랜치: mercury-variation.
- 작업 경로: E:\codexwork\Site-Skin-edit\demo-sites\sports-demo-01\site. 새 worktree 없이 같은 체크아웃을 사용한다.
- 복원 ZIP: E:\codexwork\Site-Skin-edit-backups\20260929-153800-mercury-baseline\MERCURY-restore.zip. 소스·설정·잠금 파일·자산 296개, 운영 문서, Git bundle과 파일별 해시를 포함한다.
- node_modules·캐시·임시 빌드 출력·작업 임시물은 백업에서 제외하고 기존 로컬 원본은 보존한다. 미추적 tsconfig.tsbuildinfo는 커밋하지 않는다. 현재 복원 대상에 .env/개인키 파일은 발견되지 않았다.
- 이번 단계에는 디자인/기능/데이터 수정, 앱 실행·재검수·빌드, 원격 push·배포를 하지 않는다. ALDEBARAN과 공개 MERCURY는 변경하지 않는다.
- 이후 순서: **디자인 지시 → 이 브랜치에서 로컬 수정 → 화면 확인 → MERCURY 배포**. 배포 단계 전 자동 게시나 원격 HEAD로 로컬 기준 덮어쓰기를 하지 않는다.
- 백업 파일 일치·ZIP 무결성·bundle 복원 검증 결과는 같은 백업 폴더의 verification.json에 보관한다. 아래 기존 관측과 증거는 그대로 보존한다.

---

# 최신 작업 기준 — MERCURY POLISH / 2026-09-28

**현재 상태: MERCURY POLISH 구현·로컬 검수·PUBLIC v11 배포·공개 핵심 확인 완료. 사용자 피드백 대기. 다음 사이클은 시작하지 않는다.**

사용자가 `MERCURY_POLISH_20260928.zip`의 `01_CODEX_TASK.md` 실행을 지시했다. [최신 지시서](input/mercury-polish-20260928/MERCURY_POLISH_20260928/01_CODEX_TASK.md)가 이번 범위의 기준이다. 아래 이전 이력·관측·증거 경로는 보존하되, 과거 77경기·3마켓·기존 팔레트 고정 조건은 이번 범위에서 대체한다.

- MERCURY PUBLIC v10 / 현지 HEAD `af940990c2939a94ebdb89204c2e92ce881275c3`에서 이어 간다. 기존 미추적 `tsconfig.tsbuildinfo`를 보존한다.
- 구조·데이터·리그·마켓·동작·치수는 최신 ALDEBARAN을 따른다. 참조 시작 HEAD `6be8c176b374999501952d24520c8411b29b153f`, clean 상태. ALDEBARAN과 Figma는 읽기 전용이다.
- 색상·gradient는 Figma `cQpTC1jE82WL3h6zdXNx2Q / 243:4`를 따른다. Figma에 남은 77경기·고정3+·스코어·구종목은 콘텐츠 기준이 아니다.
- 현재 화면은 전체61 = 축구32+농구6+야구16+배구0+아이스하키7+포뮬라1/복싱/MMA/모터스포츠 각0이다. 실제 공급 데이터·검색·필터·집계를 함께 연결한다. 헤더 E스포츠 메뉴는 보존한다.
- 61경기, 종목별 확장마켓·필터·라인·안내·선택ID·실제 N+ 집계를 ALDEBARAN에서 읽어 이식한다. 숫자·배당을 임의 생성하거나 표본 값을 하드코딩하지 않는다.
- 제공 PNG 5개 원본 바이트·비율·알파를 보존하고 기존 골드 아이콘과 함께 매핑한다. MERCURY 로고·브랜드·사진·배너는 보존한다.
- 일반 경기 카드 중앙은 VS, 이전 스코어/7회초/종료 부가표시만 참조 일반 카드에 맞춘다. 원본 결과/과거 정산을 변조하지 않는다.
- 계정·머니·과거내역을 유지하며 맞지 않는 이전 슬립은 기존 사용 불가/제거 흐름으로 처리한다. 저장소 전체 초기화 금지.
- 기존 Sites 구현 담당 `01a0a97b-1268-7cf3-8aad-ba460ecf4f98`가 소스·자산·검증·배포를 단독 담당한다. 조정 담당은 운영문서4개·Figma 읽기근거·참조보존·결과 취합을 담당한다. 새 구현자/별도독립감사/WOG/이미지생성/재설치/새 테스트체계를 추가하지 않는다.
- 1920×1080 CSS viewport/100%/폰트로드 상태로 배색·버튼·아이콘·VS·종목·N+·필터·선택/해제/교체·슬립·금액·비활성·독립스크롤을 확인한다. 최종 베팅 확정은 실행하지 않는다.
- 타입검사/빌드 후 같은 MERCURY 공개 URL에 반영하고 공개 핵심변경을 재확인한다. 기록은 STATE와 `runs/mercury-polish-20260928/`의 JSON/스크린샷에 남긴다. 별도 운영 MD나 다음 사이클을 만들지 않는다.

## 2026-09-28 폴리싱 완료 — PUBLIC v11

- 공개 URL: https://mercury.kexxadrix.chatgpt.site/ — 기존 MERCURY 프로젝트와 public 권한 유지. 배포 succeeded: 2026-09-28 16:08:46 KST. 조정 담당도 Sites 상태를 직접 재조회했다.
- 소스 commit / 원격 main: `0d5e9e91b92974ebe72060da0925514eb516aea8`. 검증한 빌드 입력과 커밋의 변경11파일 바이트가 일치한다.
- version: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_84dad855b5b48191b4f6f24200dd7806` (v11). deployment: `appgdep_6aba126cd2688191b31dc2ebcb8b2ad2`.
- 입력 ZIP SHA-256: `364bb93961baa8f90bad45eb9947c60678534b908d0b08aaae4c526467b3384e`. 원문·제공 자산은 `input/mercury-polish-20260928/MERCURY_POLISH_20260928/`에 보존했다.

### 수정 파일과 적용 내용

- `site/app/demo-data.ts`: ALDEBARAN prematch-r15의 61경기와 확장 마켓·선택 ID를 연결하고 종목 순서/개수와 신규 아이콘 매핑을 적용했다.
- `site/app/prematch-r15.json`: 참조 확정 마켓 데이터를 추가했다. 참조 데이터셋은 `aldebaran-prematch-r15-20260923`, sourceKind는 `synthetic-model`이다. 이번 작업에서 새 배당을 만들거나 실시간 데이터라고 주장하지 않는다. Git CRLF→LF 정규화만 있으며 JSON 값은 참조와 동일하다.
- `site/app/mercury-market-view.ts`: 종목별 확장 마켓의 필터·라인·그룹·설명·N+ 계산을 연결했다. 마켓 수와 그룹 수를 구별한다.
- `site/app/mercury-sports.tsx`: 상단10/좌측9 종목, 국기/리그 슬롯, VS, 실제 N+, 목록/상세 선택 연결을 적용했다.
- `site/app/mercury-sports.css`: Figma의 블랙·골드·주황 라벨·청록 배당·골드/회색 gradient와 선택+hover 우선순위, 신규 PNG의 투명 여백 중앙 보정을 적용했다. 일반 퀵메뉴·비선택 필터·계정 버튼은 평면, 헤더는 #0B0B0B 단색이다.
- `site/app/page.tsx`: 새 경기 집합과 마켓 선택·계산을 기존 세션/머니/내역에 연결했다. 슬립 유지 상태는 기존 계정 키의 `-slip` 키를 사용하고, 무효 선택만 제외한다. 계정 저장소를 초기화하지 않는다.
- `site/public/sports/polish/mercury-sport-{all,formula1,boxing,motorsport,mma}.png`: 제공 PNG5개를 원본 SHA-256 그대로 복사했다. 원본 비율/알파/색 유지, 이미지 필터·재생성·픽셀 편집 없음.
- 운영문서 `AGENTS.md`, `STATE.md`, `DESIGN_SPEC.md`, `DECISIONS.md`: 이번 기준/완료 상태를 최신으로 반영하고 이전 원문·관측·증거 경로를 보존했다. 별도 운영 보고 MD는 만들지 않았다.

### 데이터와 화면 검증

- 전체61 = 축구32 + 농구6 + 야구16 + 배구0 + 아이스하키7 + 포뮬라1/복싱/MMA/모터스포츠 각0. 상단은 전체 포함10, 좌측9개 순서 일치. NFL16은 현재 목록/검색/합계에서 제외하고 원본 기록은 유지했다. 헤더/퀵메뉴 E스포츠는 보존했다.
- 61개 경기 객체·마켓 그룹·11,485개 선택 ID가 ALDEBARAN과 일치한다. 참조 자산 경로 모두 유효하며 전체61개 카드의 N+가 각 실제 마켓 수와 일치한다.
- 표본: 토론토 랩터스80, 메이플리프스79, 몬트리올52, 바이에른 뮌헨111, 첫 야구65. 농구/축구/야구/아이스하키의 전체·승무패·핸디캡·언더오버·기타 필터와 선택 연동을 실제 브라우저에서 확인했다.
- Figma243:4는 읽기 전용으로 관찰했다. 패키지의 주요25개 노드와 현재 Figma의 면/테두리 색상 일치. 이번 지정 색·gradient는 반영했지만 Figma에 남은77경기/고정3+/스코어는 가져오지 않았다.
- 실제1920×1080 CSS viewport, 브라우저 scale1, 폰트 loaded. ALDEBARAN과 대응22개 요소의 위치/치수/간격 등 비교 차이0. MERCURY 브랜드, 지정 Figma 팔레트, PNG 투명 여백 보정은 의도한 예외다.
- 로컬 기본·국내형2열·0경기·선택 목록/상세 hover 화면을 확인했다. 팀 중앙은 모두 VS이며 기존 장식 이미지나 헤더 영상을 추가하지 않았다. 상단10개 탭이 한 줄에 들어간다.
- 선택+hover는 골드 gradient와 #171717 팀명/배당을 유지하고, 해제 시 #81FFFF 배당으로 복귀한다. 라벨/N+/아이콘은 원본 형태를 유지하며 중앙 정렬했고, hover 시 요소 위치/크기를 유지한다.

### 기능·빌드·공개 확인

- 로컬: 5개0경기 상태의 목록/상세 비움, NFL 검색0결과, 마켓 접기/펼치기, 목록/상세 동일 선택, 경기 내 교체/해제, 삭제/초기화, 슬립 유지 재로드/무효 ID 제외, 최소/최대/문자 금액 차단, 국내형2열, 네 영역 독립 스크롤 통과.
- 계산: 1.56 × 1.51 = 2.3556; 화면 총배당은2.36, 10,000원 × 2.3556 = 23,556원. 계산용 원래 정밀도와 표시 반올림을 구분했다.
- 최종 확인 팝업은 열고 닫았으며 최종 베팅 확정은 실행하지 않았다. 실제 disabled와 안내/입력 차단을 유지한다. 검수 전후 계정·머니·과거내역 원문이 같다.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false` 및 `npm run build` 종료0. 배포 파일 검증 중 버퍼 한도/줄바꿈 차이를 해결했고, Windows 생성물 정리 ENOTEMPTY 잔여물은 증거 폴더에 보존 후 최종 빌드 통과. 기능/데이터 값 변경이 없어 이미 통과한 UI 검증은 재사용했다.
- 공개 v11: 실제1920×1080/scale1/폰트 loaded, 제목 MERCURY · 스포츠, 상단10/좌측9/61카드/allVS, 모든 N+ 일치, 신규5PNG 정상, 선택 hover, 모터스포츠0경기/상세 비움, 국내형61카드 및 해외형 복귀 확인. 이미지 오류0, 확인한 콘솔 오류0.
- 공개 계정 원문은 보존했다. 신규 슬립 키는 keep=false로 초기화됐으며 최종 화면은 전체/해외형/선택 없음이다. 조정 담당은 공개 최종 캡처를 직접 읽고 실제 배포 succeeded를 재조회했다.

### 보존·증거·남은 범위

- ALDEBARAN 추적317파일/HEAD `6be8c176b374999501952d24520c8411b29b153f`/clean 상태를 시작/종료 해시로 확인했다. 수정·재배포하지 않았다. Figma에는 쓰기를 실행하지 않았다.
- MERCURY 기존277추적파일 중 변경은 위5개 코드파일뿐이다. 기존 로고·사진·배너·폰트·원본 경기 기록/스냅샷·저장 키와 이전 증거 보존. 신규 JSON/PNG 외 불필요한 자산 추가 없음. 종료 상태는 원래 `?? tsconfig.tsbuildinfo`만 남으며 원본 SHA를 유지한다.
- 증거 루트: `runs/mercury-polish-20260928/`. 구현 자료 `implementation/{data-comparison.json,asset-copy.json,geometry-comparison.json,functional-qa.json,icon-qa.json,scroll-qa.json,source-preservation.json,source-release.json,publication.json,public-qa.json}`. 조정 자료 `coordination/{intake.json,operating-documents-before.json,figma-live-style-check.json,preservation-check.json,deployment-readback.json}`.
- 공개 최종 화면: [mercury-public-final.png](runs/mercury-polish-20260928/implementation/mercury-public-final.png). 국내형/선택 hover 캡처도 같은 폴더에 보존했다. 새 ALDEBARAN 캡처의 도구 타일 오류는 실패본으로 분리하고, 같은 v23/HEAD의 이전 정상1920 캡처를 재사용했다. 현재 DOM 치수는 별도로 다시 측정했다.
- 미완료: 요청 범위 내 발견된 미완료 항목 없음. 남은 경고는 확장 데이터로 인한 500kB 초과 클라이언트 청크와 vinext 정적 경로 분류 unknown이다. 별도 성능 최적화/프레임워크 변경은 범위에 포함하지 않았다.
- 미검증/제외: 최종 베팅 확정, 실제 결제·인증 백엔드, 모바일/반응형, WOG/별도 독립 감사, 사용자 최종 시각 수용. 이번 구현 결과에서 다음 사이클을 자동 시작하지 않고 사용자 피드백을 기다린다.

---

# 최신 작업 기준 — ALDEBARAN 구조 이식 / 2026-09-28

사용자 최신 직접 지시를 적용한다. 현재 MERCURY에서 이어서 최신 ALDEBARAN의 실제 스포츠 화면 구조·컴포넌트·치수·간격·정렬·버튼·구분선·스크롤 방식을 이식한다. 과거 R9의 3열 카드/헤더/레일 치수 보존, 상세 마켓 제외, 두 모션만 수정 조건은 이번 구조 이식 범위에서 대체한다. 아래 이전 원문과 증거 경로는 보존 이력이다.

- 대상은 sports-demo-01/site MERCURY. sports-demo-03/site ALDEBARAN PUBLIC v23/source6be8c176b374999501952d24520c8411b29b153f는 읽기 전용 참조이며 변경/재배포하지 않는다.
- 헤더/상단·보조 메뉴/좌측 메뉴·검색·종목·배너/중앙 종목 탭/리그별 경기 목록·카드/상세 마켓·필터/우측 계정·슬립을 실제 참조 구조로 적용한다. 구3열 화면에 부분 덧붙이기 금지.
- 기존 MERCURY 블랙·골드·텍스트·선택·강조·배당·보조 정보 색을 역할별로 재사용한다. ALDEBARAN 주황·노랑·청녹색과 새 포인트색을 추가하지 않는다. 팀/리그/국기 자산 자체색은 보존한다.
- 헤더 치수/메뉴는 참조와 같게 하되 기존 MERCURY 어두운색 단색으로 한다. 영상/영상대체이미지/장식gradient 없음. MERCURY 로고 원본비율을 유지하고 기존 자산을 새영역에 맞춰 사용한다.
- 기존 MERCURY 데이터·가격·선택ID·로컬 계정/슬립을 새구조에 연결한다. ALDEBARAN 데이터를 덮어쓰지 않는다. 종목→목록→경기→상세마켓→배당→슬립 및 0경기·미선택·선택·비활성 동작과 실제 카운트 일치가 완료 조건이다.
- 1920×1080 CSS viewport/100%/같은 브라우저·폰트로드 조건으로 두 화면을 비교한다. 데이터/브랜드/색상 예외를 분리하며 구조·치수·스크롤 일치를 실제화면과 측정으로 검증한다.
- 기존 Sites 담당 01a0a97b-1268-7cf3-8aad-ba460ecf4f98가 MERCURY 소스/구현/검증/공개배포를 맡고, 조정 담당은 운영문서4개와 증거취합을 맡는다. 새 구현자·별도독립감사·WOG·새플러그인·이미지생성은 추가하지 않는다.
- 같은 MERCURY 공개주소에 구현·보완·검증 후 배포한다. 토큰제한/대표요소완료를 이유로 멈추지 않으며 다음 작업은 자동 시작하지 않는다.
- 상태와 최종 수정 보고는 STATE에 기록한다. 별도 운영/감사/인계 MD는 만들지 않으며 측정·자산매핑·스크린샷은 runs/aldebaran-structure-20260928/에 남긴다. 현재 상태: 전체 구조 이식·검증 및 PUBLIC v10 배포 완료(2026-09-28 12:22:29 KST). 같은 공개 주소를 유지한다. 추가 구현·다음 사이클은 시작하지 않으며 사용자 피드백을 기다린다.

## 2026-09-28 전체 구조 이식 완료 — PUBLIC v10

- 앱 재시작으로 중단된 기존 Sites 구현 담당을 재개했다. 저장된 원본·자료를 재사용했고 새 작업 스레드를 만들지 않았다.
- 앱 변경: app/page.tsx, app/layout.tsx, app/mercury-sports.tsx, app/mercury-sports.css, app/mercury-market-view.ts. 실제 ALDEBARAN 구조를 이식하고 MERCURY 데이터·브랜드 역할에 연결했다.
- 기본 해외형은 경기 목록+상세 마켓, 국내형은 ALDEBARAN 실제 모드와 같은 2열 목록이다. 구3열 화면은 렌더링하지 않는다.
- 1920×1080·100%·폰트 로드 상태의 실제 화면과 38개 요소를 대조했다. 비교한 위치·치수·패딩·간격·라운드·overflow·글자 크기/웨이트는 브랜드 엠블럼+레터링 사이 8px 예외를 제외하고 동일하다.
- 종목 수, 0경기/검색 0결과, 경기 선택, 마켓 필터, 선택·교체·삭제, 금액 검증, 확인창 열기/닫기를 확인했다. 배당 2.10×1.84=3.864, 10,000원×3.864=38,640원. 최종 베팅 확정은 실행하지 않았다.
- 독립 스크롤: 목록0→500, 좌측0→144, 우측0→439에서 다른 영역 위치를 유지했다. 1920×500 보조 조건에서 상세마켓0→155와 다른 영역 위치 유지 확인 후 1920×1080으로 복원했다.
- 타입 검사와 npm run build 성공. ALDEBARAN 추적317파일/HEAD/clean 상태와 MERCURY 원본 데이터4파일 해시가 동일하다. 기존 MERCURY 추적274파일 중 변경은 page/layout뿐이며 신규3파일을 추가했다. 기존 tsconfig.tsbuildinfo 원본 해시도 보존됐다.
- 증거: runs/aldebaran-structure-20260928/implementation/{geometry-comparison.json,functional-qa.json,scroll-qa.json,source-preservation.json,mercury-final-european.png,aldebaran-reference.png}, coordination/{source-review.json,preservation-check.json}. 참조 타일 캡처 실패본은 별도 이름으로 보존했고 최종 비교에 사용하지 않았다.
- 공개 URL: https://mercury.kexxadrix.chatgpt.site/ — 같은 프로젝트·공개 주소 유지. 배포 상태 **succeeded**, 완료 시각 2026-09-28 12:22:29 KST.
- 배포 소스: `af940990c2939a94ebdb89204c2e92ce881275c3`. 원격 main, 실제 빌드 입력5파일, 커밋 파일 바이트/해시가 일치한다. 원래 `?? tsconfig.tsbuildinfo`만 남으며 원본 해시를 유지한다.
- Sites version: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_de4de7ceb30c81918e280fc74ad703fa` (v10). Deployment: `appgdep_6ab9dd63e9508191bba9f0da7f9f8fa4`.
- 배포 증거: `runs/aldebaran-structure-20260928/implementation/completion.json`, `source-release.json`. 기존 공식 helper 경로가 앱 재시작 후 소실되어 재설치 없이 기존 native Git/tar 업로드 절차를 사용했다.
- 구조 예외: MERCURY 원본 엠블럼+레터링, 기존 종목·리그 로고·배너 자산, 77경기와 경기당3마켓을 유지했다. 참조의 국기 슬롯에는 MERCURY 기존 리그 로고를 사용한다. 참조 공개 계정은 로그인 상태를 바꾸지 않았고, MERCURY 최종 화면은 GUEST/미선택 상태다. 데이터·계정 내용 길이와 로고 차이는 구조 결함으로 취급하지 않는다.
- 확인 범위: 실제 로컬 렌더링·DOM 측정·기능·스크롤과 플랫폼 배포 succeeded를 확인했다. 별도 공개 브라우저 기능 재검사는 수행하지 않았다. 공개 페이지 열기 요청은 Codex 패널에 전달됐다.
- 미완료: 요청된 이식·검증·배포 범위 내 발견된 미완료 항목 없음. 최종 베팅 확정은 실행하지 않았고 모바일/반응형 재배치는 범위 밖이다. 디자인의 최종 수용은 사용자 피드백을 기다린다.

---

# MERCURY — 현재 상태

문서 세트: **MOTION R9 · 2026-09-18** · 이전 R8/v8 완료 기록 보존  
STATUS: **R9 PUBLIC v9 배포·공개 기본 화면 확인 완료 / 사용자 피드백 대기 / 별도 검수는 사용자 지시로 미실시.**  
사용자 확정: NHL 등 기존 리그 로고 표현·팀명 현재 수준 통과. 전체 R8 디자인 최종 수용은 별도다.

## 0. MOTION R9 — 현재 실행

- 입력 [R9 STATE 원문](input/mercury-motion-r9-package/MERCURY_MOTION_R9/STATE.md)을 먼저 읽었다. ZIP SHA-256 `2C6585AB07793A56C89D61EDCF2BE45A81DECDD63946720515DE7C5420681B2A`. 원문 한 파일이며 새 이미지 자산은 없다. [입력 기록](runs/r9/coordination/intake.json).
- 이전 네 운영 문서의 전체 본문·SHA는 [변경 전 문서](runs/r9/coordination/previous-operating-documents.json)에 보존했다. 아래 v8 및 R8 v7의 실제 관측·증거 경로와 기존 입력/QA 파일은 그대로 유지한다.
- 대상: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site/`, https://mercury.kexxadrix.chatgpt.site/ , project_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`. 기록상 직전 공개 v8/commit `4f582b7ef30721b9f6f23fa62e845f63d7569a2c`; 실제 현지 HEAD·사용자 변경·호스팅 확인 후 이어 작업한다.
- 기존 구현 담당 `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작이 소스·Sites·기본 확인·배포를 맡는다. 진행 담당은 네 문서와 결과 취합만 맡는다. 별도 검수 작업은 배정·호출하지 않았다.
- 동작 참고는 `sports-demo-02/site/`의 현재 SIRIUS 코드다. 입력에서 사용자가 두 동작의 작동감을 승인했다고 전달했다. 참고 소스에서 실제 값·처리를 확인해 사용하며 문서의 제안값을 실제 값으로 단정하지 않는다. SIRIUS는 읽기만 하고 수정·재배포하지 않는다.
- 범위: MERCURY 각 3열 카드 섹션 최초6·추가6·접기6, 실제 목록 높이 아코디언과 중복 입력·위치/초점/선택 보존. 중앙 한 화면 이후 우하단 맨 위로, 중앙만 감속 이동, 사용자 입력 취소·모션 축소 처리. 버튼은 MERCURY 블랙·골드로 표현한다.
- 보존: 헤더·로고·레일 순서/폭·3열 카드/간격·폰트·이미지/배너·현재77경기 데이터·검색/필터/슬립/계산/계정 및 기존3000 서버. 추가 베팅 상세·SIRIUS 헤더/남색 스킨 이식·새 라이브러리·다음 단계 작업은 제외한다.
- 절차: 구현 → 통상 빌드·6→12→6/중앙 상단 복귀/선택 유지의 짧은 확인 → 같은 PUBLIC 주소 갱신·기본 화면 확인 → 사용자 피드백 대기. R8의 독립 QA·WOG·전수 감사 조건은 사용자 재개 지시 전까지 적용하지 않는다. 오래된 미검증 사항을 이번 모션의 새 완료 조건으로 만들지 않는다.

| R9 결과 항목 | 현재 상태 |
| --- | --- |
| 현지 시작 HEAD / 사용자 변경 | `4f582b7ef30721b9f6f23fa62e845f63d7569a2c` / 기존 미추적 `tsconfig.tsbuildinfo` 유지. 종료 시에도 같은 파일만 미추적이며 SHA-256 `CDFB9B8DA2935431333BCBEF72742BFC1B8CA54AFC857B2131B1B292A324AFB7` 보존 |
| 참고한 SIRIUS 소스와 실제 모션 값 | HEAD `0bdff8e9d67df19e4ae004e9ceb79715143fadc6`의 `app/page.tsx`, `app/match-motion.tsx`, `app/match-list.css`를 구현 담당이 직접 읽음. 높이 전환200ms ease-out / 상단 이동400ms, `scrollTop = start × (1 - progress)^3`. 모션 모듈 원본/복사본 SHA-256 `727E3DFD455F6232D18FD8B22A1A5E576930E1CD6675AC57BE4AFA7F50A17100` 일치. 입력 취소·중복 방지·초점·모션 축소 처리를 함께 재사용 |
| 변경 파일 | [page.tsx](site/app/page.tsx), [globals.css](site/app/globals.css), [match-motion.tsx](site/app/match-motion.tsx). 소스3파일 외 데이터·이미지·폰트·의존성 변경 없음. [구현·보존 원기록](runs/r9/implementation/changes.json) |
| 빌드·짧은 동작 확인 | 최종 `npm run build`, `tsc --noEmit --incremental false` 종료0. [짧은 현지 관측](runs/r9/implementation/basic-observation.json): 실제1920×940, 카드284px·3열·12px 간격 유지, 6→12→6·선택 배당/10,000원 유지. 두 번째 펼침에서 읽던 중앙 위치289px 유지. 12개 확장·선택/금액·좌우 스크롤0/18px를 유지하며 중앙959→0, 키보드 초점 중앙 복귀·버튼 숨김. 초기 자동화 초점 이동이 더보기를 보이게 스크롤한 이력은 별도 기록 |
| 실제 배치 조정 | 중앙 바깥816px 중 하단50px를 상단 버튼 공간으로 두어 실제 스크롤 높이766px. 카드 폭은 그대로. 상단 버튼36px·우측12px·하단14px, 면 `#141414`/테두리 `#806b3d`/기존 골드 화살표로 카드 조작과 겹치지 않음 |
| 공개 commit / version / deployment ID | PUBLIC v9, 2026-09-18 17:12:28 KST succeeded. commit `ba0e578207f39d8e59ef72859c0e50fecf4f067b`; version_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_6d96e4e250d8819199b109ed50dbc0a5`; deployment_id `appgdep_6aacf25b1d4081919370dcd266e580e7`. 기존 MERCURY URL·public 범위 유지. 아래 v8/v7은 이전 완료 기록 |
| 별도 검수 | 사용자 지시로 미실시 |
| 공개 화면 / 캡처 | [공개 기본 화면1920×940](runs/r9/public/mercury-r9-default-1920x940.jpg), [공개 관측](runs/r9/public/basic-observation.json), [완료·실제 배포 정보](runs/r9/public/completion.json). 구현 담당이 렌더와 접근성 트리에서 제목·기본18카드·3개 더보기를 확인. 확인 중 콘솔 표본 오류0. 진행 담당은 저장된 공개 캡처와 결과 기록을 읽고 취합했으며 별도 브라우저 검사는 하지 않음 |
| 남은 문제 / 미검증 | 요청된 짧은 확인에서 구현 오류는 발견하지 못함. 모션 축소·휠/터치 취소 분기는 원본 재사용이며 별도 동작 확인하지 않음. 전체 경기/필터 전수 감사 없음. 공개 DOM evaluate 연결이 앱 노드를 반환하지 않아 공개 computed-style 실측은 주장하지 않음; 치수·기능 관측은 현지, 공개 확인은 렌더·접근성 트리·캡처로 구분 |
| 보존 / 정리 / 사용자 판단 | SIRIUS 동일 HEAD·git clean, 재배포 요청 없음. 기타 프로젝트·기존3000 서버 유지. 구현용5287 서버 종료·viewport 복구·공개 탭 유지. 다음 작업 없이 MERCURY 적용 결과의 사용자 피드백 대기 |

간단한 실행 기록·캡처는 `runs/r9/implementation/`, `runs/r9/public/`에 남겼다. 네 운영 문서는 R9로 병합했고 이전 기록은 위 JSON과 아래 원래 경로에 보존했다. 새 운영 MD나 별도 PASS 보고는 만들지 않았다. 실제 완료는 이 절의 기록이며 입력 원문의 실행 전 표시는 원문 보존을 위해 수정하지 않았다.

## 0.1. 보존 기록 — 2026-09-18 오른쪽 배너 교체

- 입력: `D:/WebDL/ChatGPT Image 2026년 9월 17일 오후 06_46_00 (9).png`, 1672×941 PNG, 2,109,408바이트, SHA-256 `d56425d3aa57a2eb11f067f87dfc5db65496e4e511561f945a4b2efc8e392b99`.
- 기존 Sites 구현 담당에게 오른쪽 사진만 별도 원본 복사·참조 교체, 필요한 최소 크롭 조정과 기존 공개 주소 갱신을 배정했다. 왼쪽 원본·문구·CTA·다른 UI는 유지한다.
- 현지 적용: `site/public/banners/r8/mercury-event-woman.png`를 원본 SHA와 동일하게 복사하고 `site/app/page.tsx` 오른쪽 이미지 경로1곳만 변경했다. CSS 수정 없이 기존320×220px·object-position30% 50%를 유지한다.
- [현지 검사](qa/r8/right-banner-20260918/local-checks.json): 새 사진 정상 로드·얼굴과 문구/CTA 비겹침·이벤트 CTA 안내 모달 정상. [현지 전체 화면](qa/r8/right-banner-20260918/local-screen.png)은1920×940이며 진행 담당도 직접 열어 확인했다. local-right-banner.png는 도구가 잘못된 위치를 캡처해 유효 증거에서 제외했다.
- [현재 공개](https://mercury.kexxadrix.chatgpt.site/): **v8**, 2026-09-18 **11:11:32 KST succeeded**. commit `4f582b7ef30721b9f6f23fa62e845f63d7569a2c`. [배포 결과](qa/r8/right-banner-20260918/deployment.json). version_id `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_17d5048ffa688191ba833e48df9e071a`, deployment_id `appgdep_6aac9dbf8c4c8191afe647721163929d`. project와 public 범위는 그대로다.
- [기술 검사](qa/r8/right-banner-20260918/technical-checks.json): 빌드·diff check·배포 패키지 원본 SHA 통과. v7 대비 Site 변경은 `app/page.tsx` 경로1줄과 새 PNG1개뿐이다. CSS·왼쪽 사진·문구·CTA·나머지 코드/자산은 그대로다. 기존 미추적 `tsconfig.tsbuildinfo`는 보존했다.
- [비로그인 공개 검사](qa/r8/right-banner-20260918/anonymous-public.json): 페이지200·좌/우 각각의 자산 참조, 새PNG200·image/png·원본 SHA 일치. [진행 담당 별도 검사](qa/r8/right-banner-20260918/coordinator-asset-check.json)에서도 원본 일치를 확인했다.
- [공개 브라우저 확인](qa/r8/right-banner-20260918/public-browser.json)과 [최종 공개 화면](qa/r8/right-banner-20260918/public-banner-verified.jpg):1920×940, 새 오른쪽 사진·기존320×220 슬롯·30% 50% 크롭·얼굴/문구/CTA 비겹침을 진행 담당도 직접 열어 확인했다. public-right-banner-screen.png는 초기 불완전 페인트를 캡처해 완료 증거에서 제외했다.
- 이번 요청의 미완료·확인된 신규 결함은 없다. CTA 클릭은 현지 빌드에서 확인했고 공개에서는 사진/문구/CTA 표시와 자산을 확인했다. 변경 없는 전체 기능·독립 WOG 감사는 재실행하지 않았다. 아래 R8 v7 감사 PASS는 이전 소스 기록이며 새 사진의 독립 감사로 혼용하지 않는다. 사용자 최종 미감 수용은 별도다.
- 직전 운영 문서4개는 SHA 일치 사본 `input/pre-right-banner-docs-20260918-110110/`에 보존했다. 아래 §1~7은 R8 v7 완료 당시 관측과 증거다.

## 1. 보존한 R8 v7 버전과 작업 위치

- 공개 주소: https://mercury.kexxadrix.chatgpt.site/ · public 유지.
- Site 루트: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site`.
- project_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`.
- 최신 공개 **v7**, 2026-09-17 **20:02:21 KST succeeded**. commit `e5f4552d2e2011163365d1ccdd602d3bef7a7f3f`. [배포 결과](qa/r8/public/deployment.json).
- version_id: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_bb786aed744081919387ea6f40afdc0d`, deployment_id: `appgdep_6aabc89f9d148191929b8459794090b2`.
- 작업 시작 공개 v6/현지 HEAD는 `8b821074dffb0c51b5119210e6ac082177928b59`였다. [v6 완료 기록](qa/r7/public/completion.json)을 보존했다.
- R8 동결 sourceId: `ceb450e890ee845d811c719d597eae0c80e0e6185f9013c19ba2f7c2574715e3` /272파일. [감사 manifest](qa/r8/implementation/audit-ready.json).
- 감사 production http://127.0.0.1:5277/ 은 패키징 전 종료했다. 최종 LISTEN 없음 확인. 기존 개발 서버 http://localhost:5276/ 은 ::1:5276/PID45756으로 유지하며 IPv4 바인딩을 임의 변경하지 않았다.
- [감사 소스·패키지 대응](qa/r8/public/source-and-package.json):272파일 동결 바이트 일치. 기존 두 JSON의 Git 줄바꿈 정규화만 따로 기록했다. 공식 Sites 패키저를 Git Bash로 실행했으며 runtime cache를 제외했다.
- [진행 담당 별도 공개 HTTP 검사](qa/r8/coordination/public-http-check.json):20:04:42 KST, 쿠키/자격증명 없는 페이지200·MERCURY 제목·감사 CSS200/SHA 일치. 구현 담당의 [공개 HTTP 검사](qa/r8/public/anonymous-http.json)는 새PNG9개와CSS의200·원본SHA 일치도 확인했다.
- [공개 브라우저 검사](qa/r8/public/browser-smoke.json): LIVE3·종목8개·서비스119×36·양측배너/CTA·6개 추가 펼침과선택유지·검색·계산을 확인했다. 이미지 failed/pending0·콘솔표본 오류/경고0·금지문구0, guest/선택0/최초6·6·6/세열scrollTop0으로 복원했다. 공개 확인에서는 새 영수증·계정·입출금 변경 없이 기존 내역을 보존했다. 모달 종료 애니메이션 중의 초기 단일 판정 실패는 정지 후 재확인으로 정상 동작을 확인했다.
- [최종 공개1920 원본](qa/r8/public/public-final-original-1920.png), [공개 양측 배너](qa/r8/public/public-banners-1920.jpg)를 진행 담당도 직접 열어 확인했다. public-final-settled-1920.jpg는 이전 중앙 스크롤 위치, public-final-initial-verified-1920.jpg는 실제1671×940으로 전체 초기 화면 근거에서 제외했다. 정상 최종PNG는1920×940이며 리사이즈/합성하지 않았다.
- [최종 완료 기록](qa/r8/public/completion.json): 같은 감사 소스·v7·공개 검증·정리 결과를 보존했다. tracked clean, 기존 미추적 tsconfig.tsbuildinfo만 유지. 임시 검수 탭을 닫고 viewport를 복원했으며 공개 탭을 유지했다. 다음 사이클은 시작하지 않는다.

## 2. R8-01~05 결과

| ID | 구현 결과 | 현재 검증 |
| --- | --- | --- |
| R8-01 | 첫6개 중 실제 MLB 진행 시점3개,7회초·점수·LIVE 점. 기존77개/분류26·26·25 유지 | 원자료 독립 재수신 및 play/점수/시각 대조, 고정값·일반/reduced-motion 확인 |
| R8-02 | 충전/환전119×36px, 아이콘16px+라벨 한 줄.2열과 기존 클릭 동작 유지 | 기본/hover/focus+held·inset·무이동 확인 |
| R8-03 | 새 금속 종목 PNG8개를 좌측8행·전체 카드 종목 표시에 적용 | 0경기3종목 포함 매핑·RGBA·실루엣, 원본SHA 일치 |
| R8-04 | 제공 사진1장을 독립 크롭으로 좌240px/우220px 배너에 사용. 사진/DOM문구/CTA/CSS프레임 분리 | 얼굴 비가림·상태·CTA와 기존 슬롯/이벤트 메뉴 동일 동작 확인 |
| R8-05 | 자체 검사·독립 A/B/C PASS, 검수 캡처 보완·재확인·공개 v7 배포 | 공개 HTTP·원본자산/CSS·실제 화면과동작 확인 완료 |

NHL 등 리그 크기/받침/형태와 팀명 한글·영문 혼용은 사용자 통과로 잠갔다.1920 고정 셸·열272/1280/320·카드284px·독립 스크롤·숨긴 스크롤바·축소 헤더·지정 폰트·선택/해제/교체/잠금/계산/내역과 기존 F01/F02 보완을 보존한다.

## 3. 진행 자료와 배너 세부 값

- 현지 scoreboard25종에 진행 스냅샷이 없어 기존77개 중 MLB3개의 ESPN play-by-play만 추가 수집했다. [수집 기록](qa/r8/implementation/progress-collection.json), [원자료 대응](qa/r8/implementation/data-provenance.json), [진행 담당 별도 확인](qa/r8/coordination/progress-source-check.json).
- 경기401816943의 play4018169431200000059:7회초·1:1·2026-09-16T00:13:51Z. 경기401816960의 play4018169601200000059:7회초·6:3·2026-09-16T19:08:53Z. 경기401816961의 play4018169611200000059:7회초·5:1·2026-09-16T20:59:54Z. 모두 실제 과거 중간이닝 기록이며 홈·원정 순서다.
- 전체 표시 상태는 진행3/예정61/종료13. 기존77개 ID와 원본 완료 기록은 보존하고 별도 `live-snapshots.json`으로 당시 진행 표시를 적용했다. 현재 실시간 수신·자동 점수/시계/배당 갱신·재생이 아니다. LIVE 점만2.4초 밝기 변화, reduced-motion에서는 정지한다.
- ‘가능하면2종목’ 기본목표와 달리 MLB1종목이다. 실제 근거와 기존77개 보존을 우선한 실행 선택이며 사용자 요구 숫자를 임의 축소한 것은 아니다. DECISIONS D27에 기록했다.
- 좌측 사진240px·object-position40% 50%, 우측220px·30% 50%. 문구폭145px, 제목20px/24px, CTA는CSS height34px·기존Button min-height에 따른 실제 높이36px·하단17px. 자세한 독립 위치/크롭/오버레이 값은 DECISIONS D28과 CSS 변수에 있다. 승인된 최종 시안 수치와 구분한다.
- 좌측: `MERCURY SLOTS / 빛나는 밤, / 새로운 즐거움. / 슬롯 둘러보기`. 우측: `MERCURY / 당신의 밤을 / 더 특별하게. / 이벤트 보기`. 사진은 같은 원본1장이다. 새로운 슬롯·이벤트 페이지나 별도 편집 패널은 추가하지 않았다.

## 4. 독립 감사와 증거

- 진행·문서: `01a0a8e7-acda-7ab0-a42a-44beb1b41e50` / 데모 사이트 전체 오케스트레이션.
- 기존 구현·Sites 배포: `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` / 스포츠 데모 01 대표 UI 제작.
- 독립 감사: `01a0ad4e-4703-7e60-a0aa-b3da5b765769` / MERCURY R6 독립 품질 감사. 기존 작업 제목을 유지하며 R8로 재배정했다. 감사자는 소스·문서·배포를 수정하지 않는다.
- [초기 v6·WOG 관찰](qa/r8/audit/initial-v6-20260917/initial-audit.json): 첫6개 진행0/종료4/예정2, 세로 서비스, 구 종목 도상, 사진 없는 배너를 R8-I01~04로 기록했다. WOG의 작은 한 줄 서비스·사진/라벨 분리·마감을 추가 직접 관찰했으며 색상/외형/자산은 복제하지 않았다. WOG 자체1px 눌림 이동도 따라 하지 않았다.
- 본검수 증거는 `qa/r8/audit/ceb450e8/`. 원자료 재수신·진행/모션·양측 배너·서비스·전체77개와12번 확장·8종목(빈3종목 포함)·숨은검색·슬립/계산·로컬 영수증/새로고침·기존내역 보존·1920/2560을 직접 확인했다. 입력 동일한 과거 심층 검사는 [기존 증거 대응](qa/r8/audit/ceb450e8/unchanged-function-evidence.json)을 통해 재사용한다.
- [감사 종료 소스](qa/r8/audit/ceb450e8/source-verification-after.json):272파일 모두 sourceId 일치, 불일치/추가/누락0. [브라우저 건강](qa/r8/audit/ceb450e8/final-browser-health.json): 수집 로그 오류/경고 없음, 표시 이미지/노출 문구 이상 없음. 전체 네트워크 수집 완전성을 뜻하지 않는다.
- [최종 독립 감사](qa/r8/audit/ceb450e8/audit-result.json):19:33:38~19:57:37 KST, A 사양 / B WOG 관찰 대비 마감 / C 기능 모두 PASS, 독립53/53 통과. 확정 결함0·추가 소스 수정 요청 없음. 일부 초기 캡처의 지연 페인트·크기 문제는 정규 증거에서 제외하고 [실제2560 원본](qa/r8/audit/ceb450e8/16-wide-2560-original.png), [1920 양측 배너 원본](qa/r8/audit/ceb450e8/17-banners-1920-original.png), [눌림 원본](qa/r8/audit/ceb450e8/18-left-banner-held-original.png)으로 보완·재확인했다. JSON21개·이미지18개의 읽기 검증도 완료했다.
- 실제 제공 CSS `index.BRM1po-v.css`, SHA `341f9bffc483d7cca33a4303fddc6047e6e8eb64bb641f5f07b8913385872df4`가 빌드와 일치했다. 브라우저 override·마우스·viewport를 복원하고 감사자 탭만 닫았다. guest/잔액1,000,000 복원, 기존 내역 보존, localhost 감사용 영수증1개가 추가됐다. 공개본과 사용자 최종 수용은 별도 확인이다.
- [독립 감사자의 공개 인수 대조](qa/r8/audit/ceb450e8/public-handoff-verification.json): v7 완료 기록의 sourceId/272파일/CSS SHA와 최종 공개1920 PNG를 직접 대조해4/4 통과·추가 결함 없음. 이는 기록·원본 화면 대조이며 공개 브라우저 스모크를 감사자가 새로 실행했다는 뜻이 아니다.

## 5. 변경 파일과 기술 검증

- [page.tsx](site/app/page.tsx): 한 줄 서비스, 새 종목 표시, LIVE 표시, 편집 가능한 공통 배너 및 기존 CTA 연결.
- [globals.css](site/app/globals.css): 서비스 크기·종목 표시·배너별 크롭/문구/프레임·상태 효과.
- [demo-data.ts](site/app/demo-data.ts): 종목8개 매핑·진행 스냅샷 결합·안정된 경기/마켓 생성 후 진행 우선 표시.
- 신규 [live-snapshots.json](site/app/live-snapshots.json), `site/public/sports/r8/` PNG8개, [배너 사진](site/public/banners/r8/mercury-slots-woman.png).
- [v6 소스 대응](qa/r8/coordination/source-delta-v6.json): 기존262파일 삭제0, 수정3·추가10. 원본 match-records/logo-presentation·리그/팀 자산·브랜드·폰트·의존성/lock·Button primitive 유지. TITAN/HADES/3000은 변경하지 않았다. 기존 미추적 `tsconfig.tsbuildinfo`도 보존한다.
- [기술 검사](qa/r8/implementation/technical-checks.json): typecheck·변경 TypeScript lint·build·diff-check 통과. Sites helper의 Windows npm 경로 실패는 기존 Node/npm CLI 빌드로 해결했으며 의존성/소스 변경으로 우회하지 않았다.
- [데이터642검사](qa/r8/implementation/data-check.json), [브라우저60검사](qa/r8/implementation/browser-checks.json) 통과.1.84×1.56=2.8704→표시2.870,10,000×2.8704=28,704원. [선별9개 이미지 SHA](qa/r8/coordination/adopted-asset-check.json) 원본 일치.
- [좌측 중간 화면](qa/r8/implementation/left-banner-intermediate-scrolled.jpg) 이후 양쪽을 완성했다. [안정된 초기 화면](qa/r8/implementation/final-initial-settled-1920.jpg), [양측 배너](qa/r8/implementation/final-both-banners-1920.jpg), [2560 화면](qa/r8/implementation/final-wide-2560.jpg).
- 초기 `final-initial-1920.jpg`의 일부 배당 글자 결손은 다음 정상 캡처에서 사라졌다. 구현자·진행 담당이 새 settled 파일을 각각 직접 열어 정상 표시를 확인했다. 해당 초기 캡처와 일부 도구의 지연 프레임/축소 캡처는 정상 치수·완료 근거에서 제외하고 실제 코드 결함으로 단정하지 않았다.

## 6. 문서·입력·이전 증거 보존

- 루트 AGENTS/STATE/DESIGN_SPEC/DECISIONS 네 개가 최신 R8 운영 문서다. 새 운영MD는 만들지 않는다. [입력 검사](qa/r8/coordination/intake.json):42파일·이미지11개 SHA/해상도 일치·문서 R8 표기 확인.
- R8 입력 원문과 리소스는 `input/mercury-mvp-r8-package/MERCURY_MVP_R8/`에 유지한다. ZIP SHA `810EEA652E9E2DFE76F8F078572D43023A8E9A70E01156BEA8B5B163576217B2`.
- 직전 네 운영 문서는 SHA 일치 사본 [R7 최종 STATE](input/pre-r8-working-docs-20260917-191100/STATE.md)와 같은 폴더에 보존했다. [v6 공개 완료](qa/r7/public/completion.json), [R7 감사](qa/r7/audit/3cb5e2b2/recheck-result.json), 이전 R5/R6/R7 입력과 QA 경로를 유지한다.
- [v6 경기 기준](qa/r8/coordination/baseline-v6-records.json), [v6 로고 기준](qa/r8/coordination/baseline-v6-logo-presentation.json)은 변경 전 commit에서 읽어 보존했다. 원본 사진/종목/브랜드 이미지를 재생성·변형·삭제하지 않았다.

## 7. 남은 작업·미검증·판단

- 미완료: 이번 R8 구현·독립 감사·보완 확인·같은 주소 공개 배포 범위에는 없다.
- 독립 감사 PASS·열린 R8 결함0·공개 v7 배포 succeeded 및 공개 스모크/최종 화면 확인 완료. 소스 결함 수정은 추가로 요구되지 않았으며 부정확한 검수 캡처만 정상 원본으로 보완·재확인했다.
- 사용자 최종 디자인 수용은 별도다. 실제 라이브 수신·거래/인증/입출금 백엔드·모바일 재배치는 범위 밖이다. 일본어가 없어 Heisei 실제 일본어 글리프는 해당 없음.
- 기존 전체 저장소 lint19개는 변경 파일 밖이며 그대로다. 외부 Adobe 폰트 의존성을 유지한다. 잘린 네트워크 이벤트 수집이나 과거 favicon.ico 탐색404를 숨기고 전체 네트워크 오류0이라고 보고하지 않는다.
- 토큰/사용량 상한에 따른 중단 조건은 없고 별도 감시 시스템을 만들지 않는다. 이번 R8 공개 확인 후 다음 사용자 지시를 기다리며 자동으로 다음 사이클을 시작하지 않는다.
