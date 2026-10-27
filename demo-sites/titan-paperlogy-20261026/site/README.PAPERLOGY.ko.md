# Titan Solution — Paperlogy 비교본

원본: `E:/codexwork/Site-Skin-edit/titan_promotion`

복제본: `E:/codexwork/Site-Skin-edit/demo-sites/titan-paperlogy-20261026/site`

미리보기: http://127.0.0.1:3001/

## 오로라 네 페이지 연결 — 2026-10-27

- V1·V2·V3의 프로젝트 목록에 `AURORA Black`, `AURORA White`, `AURORA Black Video`, `AURORA White Video`를 토지노 분류로 추가했습니다. 세 버전의 데모 데이터는 동일합니다.
- 기존 15개 항목은 유지하고 네 개를 추가해 총 19개입니다. 카지노 9개, 토지노 10개이며, V3의 토지노 필터 두 번째 페이지에서 오로라 네 개를 함께 확인할 수 있습니다.
- 연결 주소는 순서대로 `http://127.0.0.1:5430/black`, `/white`, `/black-video`, `/white-video`입니다. 오로라 화면에서 모드 전환 버튼을 제거하고 각 주소의 디자인을 고정했습니다.
- 썸네일은 실제 페이지의 1920×1080 캡처이며 `public/assets/aurora-*.png` 네 파일을 사용합니다. 상담 선택 목록에도 네 항목이 포함됩니다.
- 로컬 연결이므로 이 앱의 `3001` 서버와 오로라의 `5430` 서버가 모두 필요합니다. 원본 `titan_promotion`, 3002 영문판, GitHub와 공개 배포는 변경하지 않았습니다.
- 검증: 별도 타입 검사·프로덕션 빌드 통과. V1·V2·V3의 19개 데모·상담 선택 목록, V3 전체/카지노/토지노 페이지, 네 카드 새 창 이동, 상담 자동 선택, 1440px·390px 카드 배치를 확인했습니다. 기존 15개 데이터는 변경 전과 동일하며 가로 넘침·제목 넘침·관련 콘솔 오류 없음. 기록: `C:/Users/User/AppData/Local/Temp/aurora-four-pages-titan-20261027-153609/`의 `demo-data-verification.json`, `thumbnail-verification.json`, `titan-browser-verification.json` 및 화면 캡처.

## 현재 적용 버전 — 2026-10-26

- V3는 GitHub `RickyJayPark/titan_promotion`의 `main` 커밋 `32c903d090d3bf5fc772cb7aeb8603eed1c6db9b`(FAQ레이아웃수정 및 기타 레이아웃 수정)을 기준으로 갱신. 커밋 시각은 2026-10-26 19:43:16 KST. 이전 기준은 `9a80ec784b1bb5c6601d948298ec6cd211b5aee5`.
- FAQ 번호 카드·데스크톱 2열/모바일 1열·답변 패널과 상단 FAQ 메뉴를 적용. V3 상담·솔루션·플랫폼·텔레그램 버튼의 최신 모양, 모바일 팀 사진 표시 조정, 공통 Reveal 표시 개선도 반영.
- 앞서 승인된 주황색 건축 배경·하단 그라데이션을 유지하기 위해 원격의 추상 배경/영상 후광 스타일은 적용하지 않음. 같은 포트의 통합 버전 선택기를 유지하며 원격의 `/compare` 경로·다른 포트 재작성 규칙은 적용하지 않음. 고화질 원본 영상은 이미 같은 상태. V1·V2 전용 소스, V2 한국어·검은 포트폴리오 배경, 로컬 Paperlogy 폰트는 유지.
- 이번 백업·원격 원문·검수 기록: `E:/codexwork/Site-Skin-edit-backups/20261026-titan-3001-32c903d-faq`. 이번 변경 파일: `app/globals.css`, `components/reveal.tsx`, `components/site-header.tsx`, `components/support.tsx`, `components/support.module.css`, `components/contact.module.css`, `components/platform.module.css`, `components/solutions.module.css`, `components/telegram-contact.module.css`, `components/why-titan.module.css`, 이 문서.
- `32c903d` 적용 검증: 별도 타입 검사·프로덕션 빌드 통과. 1440px·360px에서 FAQ 7개씩 실제 펼침, 단일 답변 표시, 데스크톱 전체 너비 답변·모바일 1열 배치 확인. 키보드 Enter 접기·모바일 FAQ 메뉴 이동 정상. 가로 넘침·FAQ 글자 잘림·관련 콘솔 오류 없음. 같은 포트의 V3→V2→V1→V3 전환, V2 한국어·단색 포트폴리오, V3 배경·고화질 영상 유지 확인.
- 첫 화면의 제목·통계·영상 배치, 포트폴리오 카드, Why Titan의 팀 사진과 번호 목록, 솔루션·플랫폼·구축 안내·FAQ·상담 폼의 최신 레이아웃 적용. 데모 19개와 기존 분류·페이지 기능 유지.
- 버전 전환을 하나의 `3001` 페이지로 통합: V1 → `/?version=v1`, V2 → `/?version=v2`, V3 → `/?version=v3`. 기본 주소는 V3. 공통 선택기가 모든 버전에 표시되며 새로고침·뒤로가기·앞으로가기에서도 현재 버전과 활성 표시를 유지.
- 기존 로컬 Paperlogy 파일과 `app/layout.tsx`, 전역 폰트 변수 유지. 새 CSS의 로고·통계·단계 번호 폰트 참조도 Paperlogy에 연결.
- 브라우저에서 확인된 원본 커밋의 표시 문제 두 곳 보정: 버전 버튼을 헤더 밖에 배치해 스크롤 시 로고 겹침 방지, 479px 이하 화면에서 첫 화면 버튼의 `max-width: 100%` 유지로 오른쪽 잘림 방지.
- 변경 전 파일은 `E:/codexwork/Site-Skin-edit-backups/20261026-titan-3001-9a80ec7/before`에 보관. 원격 원문·변경 계획·해시 검증·화면 증거는 같은 폴더의 `upstream`, `plan.json`, `verified-files.json`, `qa`에 보관.
- 최종 수정 후 별도 타입 검사와 프로덕션 빌드 통과. 1440·1024·390·360px 가로 넘침과 텍스트 잘림 없음. 첫 페이지·마지막 페이지 표시, 상담 자동 선택, 모바일 메뉴·FAQ, 영상 재생, V1·V2·V3 실제 이동 확인. 관련 콘솔 오류 없음. 기존 전체 페이지·분류 조합 검증은 아래 이전 검수 기록 참조.
- `titan_promotion` 원본과 3002 영문 임시판은 변경하지 않았으며, GitHub 업로드·공개 배포는 수행하지 않음.

### 세 버전 통합 및 고화질 영상 복원

- V1은 `titan_promotion`의 기존 한글 화면과 Outfit·Poppins·Pretendard 폰트를 보존한 사본, V2는 Paperlogy 폰트·레이아웃을 유지하면서 한국어로 복원한 화면, V3는 위 최신 커밋을 적용한 한글 Paperlogy 화면. `components/versions/v1`, `components/versions/v2`에 별도 컴포넌트·CSS·데모 데이터를 포함하므로 다른 포트의 서버에 의존하지 않음.
- V2 후속 수정: 메뉴·본문·FAQ·상담 폼·접근성 문구·메타데이터를 한국어로 복원하고, 포트폴리오의 격자무늬 배경 참조를 제거해 단색 검정으로 연결. 기존 배경 이미지 파일, 상단 주황색 건축 배경·그라데이션, 고화질 영상은 유지.
- 공통 `components/version-switch.tsx`와 CSS에서 같은 페이지의 버전 링크와 활성 상태를 렌더링. 기존 `site-header`의 포트 이동 버튼·스타일 제거. 전환 시 선택한 버전의 첫 화면으로 이동.
- 선택기와 겹치지 않도록 통합 V1·V2의 텔레그램 표시를 오른쪽 아래로 배치. 나머지 원래 디자인·문구·데모 구성 유지.
- 기존 자산과 내용이 다른 과거 썸네일은 `public/versions/v1/assets`, `public/versions/v2/assets`에 원본 그대로 복사하여 각 버전에서 참조. 기존 이미지·영상 파일은 덮어쓰거나 변환하지 않음.
- 사용자 지시에 따라 세 버전 모두 `/videos/TITAN-KO-5scene-19s-v003.mp4` 고화질 원본 사용. H.264, 2400×1024, 30fps, 19초, 25,253,744바이트. V3의 경량 `-web.mp4` 참조만 원본으로 변경했으며 파일 자체는 유지.
- 통합 변경 파일: `app/page.tsx`, `components/version-switch.tsx`, `components/version-switch.module.css`, `components/site-header.tsx`, `components/site-header.module.css`, `components/hero.tsx`, `components/versions/v1/*`, `components/versions/v2/*`, `public/versions/*/assets/*`, 이 문서.
- 통합 작업 백업과 브라우저 검수 증거: `E:/codexwork/Site-Skin-edit-backups/20261026-titan-unified-versions`.
- 통합 검증: 타입 검사·프로덕션 빌드 통과. 같은 포트에서 V3→V1→V2→V3 및 역방향 전환, V2 새로고침, 브라우저 뒤로가기·앞으로가기, V1·V2 모바일 메뉴와 상담 자동 선택 확인. 1440px·360px의 세 버전과 390px 영문판에서 가로 넘침·텍스트 잘림·화면 밖 요소 없음. 선택기 1개와 활성 표시 유지, 관련 콘솔 오류 없음. 원본 영상의 실제 2400×1024 로드·재생 확인.

### 이번 변경 파일

- `components/contact.module.css`
- `components/hero.module.css`, `components/hero.tsx`
- `components/platform.module.css`
- `components/portfolio.module.css`, `components/portfolio.tsx`
- `components/site-header.module.css`, `components/site-header.tsx`
- `components/solutions.module.css`, `components/solutions.tsx`
- `components/support.module.css`
- `components/why-titan.module.css`, `components/why-titan.tsx`
- `README.PAPERLOGY.ko.md`

### 이전 2dec658 적용 시 검수 기록

- 타입 검사와 프로덕션 빌드 통과. 1440·1024·390·360px 가로 넘침 없음.
- 데모 전체 4페이지와 카지노·토지노 필터 각 2페이지, 상담 자동 선택, 모바일 메뉴·FAQ 및 경량 영상 재생 확인. 관련 콘솔 오류 없음.
- 당시 백업·검수 증거: `E:/codexwork/Site-Skin-edit-backups/20261026-titan-3001-latest-commit`.

## 실행

이 폴더에서 아래 명령을 사용합니다. 기존 프로젝트의 동일 버전 의존성을 복사했으며 패키지와 lockfile은 변경하지 않았습니다.

```powershell
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001
```

## 최초 복제 당시 적용 범위

- 본문·제목·로고·숫자·메뉴·폼에 로컬 Paperlogy WOFF2 적용.
- 굵기 100~900 매핑, `preload: false` 유지.
- 원본 그리드, 컨테이너 너비, 이미지·영상 크기, 콘텐츠와 동작 유지.
- 로고·숫자·포트폴리오 제목의 글자 크기, 카드 상담 버튼의 좌우 패딩, 일부 설명문과 모바일 FAQ의 크기를 보정. 숫자는 기존 행 높이를 유지.
- 이미지·영상에 포함된 글자는 원본 미디어 그대로 유지.

## 최초 복제 당시 확인 결과

- 360, 375, 390, 414, 600, 768, 820, 1024, 1200, 1280, 1440, 1920px에서 기본 화면 비교. 페이지 높이 차이는 0~1px이며 가로 넘침 없음.
- 모바일 360/390/414px에서 FAQ 7개씩 실제 펼침 비교: 21개 상태의 높이 일치.
- 모바일 메뉴 열기/닫기, 솔루션 상담 선택, 포트폴리오 상담 추가 정상.
- 이미지 17개 정상 로드, 소개 영상 정상 로드, 관련 콘솔 오류 없음.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false` 통과.
- `node node_modules/next/dist/bin/next build` 통과. 빌드의 타입 검사 생략 설정은 원본과 같으므로 위 타입 검사를 별도로 수행함.
- 원본 110개 파일의 SHA-256 일치 확인. 원본 적용 및 공개 배포는 수행하지 않음.

폰트 원본·라이선스·굵기 매핑은 `public/fonts/paperlogy/README.ko.md`를 참고하세요.
