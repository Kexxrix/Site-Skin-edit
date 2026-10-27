# TITAN · AURORA 작업 백업 — 2026-10-27

사용자가 선택한 공개 저장소 Kexxrix/Site-Skin-edit의 main에 두 작업 폴더의 현재 소스·설정·자산을 보관합니다. 기준 커밋은 7c2959e4b5f9ca33f9117ef54e4d1bcd63f84e1d입니다. 실행 중인 원본 작업 폴더는 읽기만 하고 별도의 업로드 사본에서 수집했습니다.

## 포함 내용

- TITAN Paperlogy: 같은 포트에서 전환하는 V1·V2·V3, 기존 레이아웃 수정, 한국어 구성, Paperlogy 폰트, 고화질 소개 영상, 19개 프로젝트(카지노 9개·토지노 10개), 오로라 네 페이지 링크 및 카지노 필터 전환 시 기존 카드 애니메이션 재실행.
- AURORA: 제공된 메탈릭 골드 워드마크와 현재 디자인, /black·/white·/black-video·/white-video의 고정된 네 페이지, 모드 선택기 제거 및 관련 자산. 기존 작업 경로 이름 aldebaran-blackgold-paperlogy-20261026은 유지합니다.
- 최신 네 페이지/연결 검사와 후속 필터 모션 검사의 JSON 및 데스크톱·모바일 화면 증거.

## 수집 및 검증

- 원본 파일 333개(266,554,933바이트): TITAN 181개, AURORA 152개. 기준 커밋 대비 수정 30개 + 추가 84개 = 114개이며, 나머지 219개는 동일합니다. 문서·검수 증거는 별도로 추가합니다.
- 모든 수집 대상의 원본·업로드 사본 SHA-256 일치를 확인했습니다. source-files.json에는 파일별 SHA-256, Git blob SHA-1, 원본 경로와 변경 상태를 기록했습니다.
- 기존 원격에만 있던 24개 파일과 과거 검수 기록은 유지했습니다. 삭제는 없습니다.
- 이번 업로드에서는 의존성 설치나 빌드를 다시 실행하지 않았습니다. 앞선 오로라 타입 검사·lint·빌드 및 TITAN 타입 검사·빌드·브라우저 QA를 보존했습니다. TITAN의 마지막 필터 키 수정 이후에는 별도 타입 검사와 데스크톱·모바일·모션 감소 설정 브라우저 검사를 통과했으며 전체 빌드는 그 직전에 수행한 결과입니다.
- summary.json, source-files.json, excluded.json, evidence-files.json 및 evidence/에서 범위와 검증 근거를 확인할 수 있습니다. 각 프로젝트의 이전 README·검수 기록은 작성 당시 이력입니다.

## 실행

두 앱은 각각의 site 폴더에서 실행합니다. 다른 PC에서 복원할 경우 기존 lockfile에 맞는 설치 후 실행합니다.

- TITAN: demo-sites/titan-paperlogy-20261026/site에서 pnpm install --frozen-lockfile, 이어서 pnpm dev --hostname 127.0.0.1 --port 3001. 기본 화면은 V3이며 /?version=v1, /?version=v2, /?version=v3로 전환합니다.
- AURORA: demo-sites/aldebaran-blackgold-paperlogy-20261026/site에서 npm ci, 이어서 npm run dev. 주소는 http://127.0.0.1:5430/black, /white, /black-video, /white-video입니다. package.json의 Node 버전 조건을 따릅니다.
- TITAN에 포함된 오로라 링크는 로컬 주소이므로 3001과 5430 서버가 함께 실행되어야 합니다.

## 유지한 범위

원본 titan_promotion 저장소, 기존 로컬 작업 파일, 다른 프로젝트와 공개 사이트 배포는 변경하지 않았습니다. node_modules·빌드 산출물·캐시·환경 변수 파일은 새로 업로드하지 않았습니다. 생성 이미지 제작 폴더 전체는 이번 두 사이트 백업 범위에 포함하지 않았으며 실제 사이트 폴더의 자산은 포함했습니다. GitHub 업로드, 공개 사이트 배포, 사용자 디자인 승인은 서로 별개입니다.
