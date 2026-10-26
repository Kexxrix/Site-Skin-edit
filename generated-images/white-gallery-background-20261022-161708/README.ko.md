# White Gallery — 옅은 생성 추상 배경

- 작성일: 2026-10-22, Asia/Seoul
- 대상: [페이지 24 White Gallery](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP/?node-id=884-6638)
- 변경 범위: 기존 고정 레이아웃의 배경에 이미지 추가.
- 생성 도구: Codex 내장 image_gen. 1회 생성, 1장 선택·검수·적용. 사용자 승인·실서비스 채택은 미확정.

## 결과

`results/white-gallery-abstract-background-v1.png` — PNG RGB, 실제 크기 1289 × 1220.

펄 화이트·옅은 회색의 반투명 곡면과 리본 형태, 부드러운 확산광·그림자를 담았다. 중앙을 조용하게 남기고 여백 쪽에 추상 형태가 드러나도록 구성했다. 원본 파일은 리사이즈·크롭·압축하지 않았다.

실제 프롬프트는 `prompts/white-gallery.txt`에 있다. 작업 직전 Figma 전체 화면을 팔레트와 배경 노출 위치 참고용으로 첨부했으며, UI·사진·인물 재생성을 요청하지 않았다.

## 적용

- 새 이미지 배경 레이어: `896:7502`
- 이름: White Gallery · Generated abstract background
- 기존 화면 크기: 1920 × 1819.199951 유지
- 배치: 원래 모든 콘텐츠 아래의 절대 배치, x=0 / y=0
- 채움: IMAGE / FILL / opacity 0.55
- Figma 이미지 해시: `fda37e82d22561161085cfda7303f5872632cd28`
- 기존 바탕색을 유지하고 그 위에 옅게 합성했다. 헤더·버튼·사진·글자·카드는 별도 원본 레이어로 남아 있다.
- 새 배경은 잠금 상태이며, visibility를 끄면 이전 단색 배경으로 복구된다.

## 검증

- 파일 읽기, 실제 형식·크기, 이동 전후 SHA-256 일치 확인.
- 새 배경을 제외한 전체 콘텐츠 스냅샷 해시: `3b484d0c`, 적용 전후 동일.
- 기존 위치·폭·높이 유지: (100, 6268), 1920 × 1819.199951.
- 다른 화면 11개와 공유 마스터 44개, 총 55/55 보호 스냅샷 및 기존 위치 동일.
- 1920px 전체 Figma 렌더를 열어 배경의 은은함, 글자 대비, 기존 사진과의 관계, 패널 경계, 레이어 순서를 확인했다. 추가 수정 생성은 필요하지 않았다.
- 레이아웃·원본 사진·인물 마스크·카피·아이콘·버튼·컴포넌트 연결·기존 스킨은 변경하지 않았다.
- 웹 코드·로컬 서버·배포는 변경하지 않았다. 실제 웹의 배경 로딩·성능·반응형은 미검수다.

## 기록

- `run.json`: 원본/최종 경로, 실제 프롬프트, 참조, 해시, 상태
- `qa/asset-move.json`, `qa/file-verification.json`: 파일 이동 및 검증
- `qa/baseline.json`: 변경 전 콘텐츠·보호 대상
- `qa/01-create-holder.js`, `qa/02-apply-and-verify.js`: 실행 기록
- `qa/apply-state.json`: 생성/변경 ID 및 보존 결과
- `qa/reference-before.png`, `qa/white-gallery-applied.png`: 전후 원본 크기 렌더
- `qa/before-after.png`: 비교 미리보기

수량: 시도 1 / 성공 1 / 실패 0 / 건너뜀 0 / agent 선택 1 / Figma 적용 1 / 사용자 승인 0 / 기각 0.

