# 한지 / 바이오 — 생성 이미지 배경 적용

- 작성일: 2026-10-22, Asia/Seoul
- 생성 방식: Codex 내장 image_gen, 독립 배경 이미지 2장. 각 기존 전체 화면을 팔레트·배치 참고용으로 첨부했다.
- 범위: 페이지 24의 기존 한지와 바이오 시안 배경만 변경.
- 레이아웃·카드·사진·인물·로고·문구·버튼·컴포넌트 연결은 유지했다.
- 신규 배경의 사용자 승인·실서비스 채택은 미확정이다.

## Figma

- [Hanji Ink](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP/?node-id=884-7328)
- [Bio Membrane](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP/?node-id=884-8017)

현재 두 시안의 기존 배경 프레임에 생성된 PNG를 FILL로 적용했다. 배경 크기는 1920 × 1819.199951로 유지했다. 원본 PNG는 크롭·리사이즈·압축하지 않았다.

## 이미지

| 역할 | 결과 | 실제 형식·크기 |
|---|---|---|
| 한지 | `results/hanji-ink-background-v1.png` | PNG RGB 1289 × 1221 |
| 바이오 | `results/bio-membrane-background-v1.png` | PNG RGB 1289 × 1221 |

한지는 종이 섬유·번진 먹·마른 붓결·대나무와 낮은 대비의 산수 워시를 담았다. 바이오는 반투명 유기막·굴절·미세 물방울·깊이 있는 녹색 재질을 담았다. 두 파일 모두 UI나 텍스트를 생성한 이미지가 아니라 독립 배경 소재다. 실제 프롬프트는 `prompts/hanji.txt`, `prompts/bio.txt`에 보존했다.

## 적용 및 검수

- 원래 벡터 장식: 한지 65개, 바이오 15개를 숨겼다. 삭제하지 않았다.
- 원래 한지 NOISE 효과를 배경 프레임에서 해제해 생성 이미지의 질감을 사용했다.
- 텍스트·사진·아이콘·버튼은 계속 별도 편집 가능한 원본 레이어다.
- 배경을 제외한 두 화면의 전체 노드 속성 스냅샷 해시가 변경 전과 일치했다.
- 다른 화면 10개와 공유 마스터 44개, 총 54개 보호 스냅샷 및 기존 화면 위치가 모두 일치했다.
- 원본 이미지 파일과 인물 마스크는 변경하지 않았다.
- PNG 읽기·실제 형식·크기 검사와 이동 전후 SHA-256 일치 검증을 통과했다.
- 최종 1920px 전체 Figma 렌더 2개를 열어 배경 노출 영역, 헤더 로고, 글자 대비, 기존 사진과의 관계를 확인했다. 별도 수정 재생성은 필요하지 않았다.
- 실제 웹 코드·서버·배포는 변경하지 않았다. 실제 웹에서의 배경 로딩/반응형/성능은 이번 검증 범위가 아니다.

## 복구

`qa/baseline.json`의 각 target.art에 원래 fill, effects, effectStyleId, 이름, 자식 visibility가 보존돼 있다. 이 속성을 해당 배경 프레임에 복원하고 원래 자식 visibility를 되돌리면 이전 벡터 방식으로 복구할 수 있다. 원본 사진이나 콘텐츠를 복원할 필요는 없다.

## 기록

- `run.json`: 도구·원본/최종 경로·프롬프트/참조·해시·적용/선택 상태
- `qa/asset-moves.json`: 이번 성공 출력 2개만 프로젝트 안으로 이동한 이력
- `qa/file-verification.json`: 실제 파일 형식/크기/읽기 검사
- `qa/baseline.json`: 적용 전 배경 및 보호 스냅샷
- `qa/01-apply-backgrounds.js`, `qa/apply-state.json`: 적용 코드 및 변경 ID
- `qa/hanji-applied.png`, `qa/bio-applied.png`: 최종 전체 화면
- `qa/comparison.png`: 두 결과의 비교 미리보기

수량: 시도 2 / 생성 성공 2 / 실패 0 / 건너뜀 0 / agent 선택 2 / Figma 적용 2 / 사용자 승인 0 / 기각 0. 생성 성공과 사용자 승인·실서비스 채택을 구분한다.

