# TITAN 01·02·03씬 본 제작 결과

2026-09-11. **새 프로젝트 제작·출력·기술 검증 완료. 사용자 미감 승인·최종 채택은 별도입니다.** 전체 20초 영상 완성이 아니라, 원래 시간표의 첫 5.700초/171프레임 제작본입니다.

## Changed files

- [TITAN-Production-Scenes01-03-v001.aep](TITAN-Production-Scenes01-03-v001.aep): 빈 프로젝트에서 새로 구성한 편집 가능 원본. 846,343 bytes.
- [TITAN-Scenes01-03-v001.mp4](TITAN-Scenes01-03-v001.mp4): 2400×1024, 30fps, 171프레임, 무음. 13,196,761 bytes.
- [verification.json](verification.json), [actual-timeline.json](actual-timeline.json), [preset-usage.json](preset-usage.json): 실측·계획 차이, 소스·출력 해시, 적용 프리셋과 판정.
- `qa/`: 최종 프레임 28장, 전환 비교 시트 3장, 원본/화면 비교, 네이티브 프로젝트 내보내기와 재생 기록.
- `00–17` 실행 파일과 `ae-client.mjs`, `logs/`: 이번 새 제작의 실행·수정 이력. **일회성 실행 기록이며 현재 AEP에 처음부터 다시 실행하면 중복 생성될 수 있습니다.**
- [PRESERVED-PREVIOUS-UNSAVED-NOT-PRODUCTION.aep](PRESERVED-PREVIOUS-UNSAVED-NOT-PRODUCTION.aep): 새 작업 전에 열려 있던 미저장 프로젝트의 별도 보존본. 본 제작의 출발 파일로 사용하지 않았습니다.

## What changed

### 빈 프로젝트와 네이티브 구조

`project.new` 후 `numItems=0`, `dirty=false`, `file=null`을 확인하고 새 AEP를 저장했습니다. 근거는 `logs/2026-09-11T09-29-03-361Z.json`입니다. 이전 AEP·컴프·키프레임·표현식·좌표를 가져오지 않았습니다.

- `TITAN_MASTER_20S`: 실제 20초/600프레임, 작업 영역 0–5.7초. 24개 레이어 중 Text 12개, Shape 5개, AV 7개(비활성 참조 가이드 3개 포함).
- `DEVICE_iPad10_3D`: 새 GLB, 카메라, 환경광, 화면 재질 소스. Advanced 3D(`ADBE Calder`). 메인 컴프는 이 3D 컴프를 사용하는 Classic 3D 합성입니다.
- `SCREEN_iPad10_CAT_VIDEO_CONTAIN`: 2360×1640, 60fps. 지정 원본 MP4를 100% 속도와 균일 스케일로 사용합니다.
- 글꼴: 설치 확인된 Pretendard-Regular / Bold / SemiBold. 생성 PNG는 잠금·비활성 가이드이며 출력되지 않습니다.

### 제작 시간표

| 항목 | 실제 구성 | 확인 근거 |
|---|---|---|
| Meet / TITAN | F000–010 문자·깊이 등장, F010–030 판독 | 네이티브 프리셋 셀렉터, F003/007/010/020 |
| 1→2 | F031–044, 동일 `SHARED_LINE_01_to_03`와 끝점 연동 도트 | [1→2 시트](qa/transition-01-02.png) |
| Core / Built / in-house | F039–046 / F066–073 / F093–100 | 실제 셀렉터 키와 F047/070/073/096/100 |
| 2→3 | F108부터 와이프·문구 퇴장, CAT F114–122, Casino F117–124 등장 | [2→3 시트](qa/transition-02-03.png) |
| Fill→Outline | F132 100/0 → F135 50/50 → F138 0/100 | 동일 글꼴·크기·자간·위치의 Text 사본과 실측 불투명도 |
| iPad | F114 실제 깊이 4500·비스듬한 자세 → F135 깊이 0·정면 | [기기·획 전환 시트](qa/fill-outline-device.png) |
| 판독 유지·후속 준비 | F138–170 기기·Outline 유지, F164–170 도트/선 이동 | F138/155/163/170 |

`39 + 75 + 57 = 171프레임`, `171 ÷ 30 = 5.700초`입니다. 전체 마스터는 `600 ÷ 30 = 20초`; 이후 `600 − 171 = 429프레임`, `429 ÷ 30 = 14.300초`는 예약 마커만 남겼습니다. 다음 Sportsbook 시작은 F171입니다.

### 실제 적용한 프리셋

| 설치된 Adobe 프리셋 | 대상 | 조정 |
|---|---|---|
| 3D Basic Rotate X Cascade In.ffx | S01_Meet | F000–010, X 회전 65°, 이동 [0,42,0], 문자 범위 45% |
| 3D Basic Position Z Cascade In.ffx | S01_TITAN | F002–010, 깊이 220, 범위 65% |
| Slide Up By Word.ffx | Core systems / Built / in-house / CAT VILLAGE / Casino Slot | 각 의미별 시작·종료 프레임, 수평/수직 이동량 변경, 단어 기반 범위 유지 |

세 종류를 총 7개 Text 레이어에 실제 적용했고, 기본 애니메이터를 유지하면서 Offset 키를 -100→100으로 재설정했습니다. 30개의 네이티브 표현식은 도형 경로, 이동, 채움/획 가시성 등에 사용됩니다. 공개 aftr/Rebound 코드나 새 패널은 설치·사용하지 않았습니다. 원본 프리셋 파일은 재배포하지 않습니다.

### iPad 영상 재질

- 모델: `E:/codexwork/Site-Skin-edit/device-models/iPad10/v001/exports/iPad10.glb`.
- 영상: `E:/codexwork/Site-Skin-edit/TEMP/아이패드.mp4`.
- `iPad10.SCREEN` 재질에 `SCREEN_MATERIAL_SOURCE`를 연결했습니다. 자동화 메뉴 선택이 적용되지 않아 사용자가 마지막 재질 선택을 직접 수행했고, 이후 재질 속성·재열기·렌더로 연결을 확인했습니다.
- 실제 기기 스케일은 전 구간 [900,900,900]으로 균일합니다. 화면상의 크기 변화는 실제 3D 깊이·원근 이동으로 만듭니다. 축은 새 모델의 렌더를 보고 보정했습니다.
- `원본 시간 = 마스터 시간 − 1.8초`: F114는 원본 2.000초, F170은 3.866667초입니다. 60fps 소스를 30fps로 재해석하지 않았습니다.
- 화면 내부 contain: `2360 ÷ 1920 × 100 = 122.916667%`, 콘텐츠 2360×1327.5, 상하 각각 `(1640 − 1327.5) ÷ 2 = 156.25px` 어두운 패딩입니다. 외부 홍보 프레임에는 레터박스를 넣지 않았습니다.
- [F114 화면](qa/final-screen-F114.png)과 [F170 화면](qa/final-screen-F170.png)을 원본 대응 프레임과 비교했습니다. CAT 메인 화면에서 라이브카지노 화면으로 실제 변화하며, 상하 반전·미러·화면 이탈·이중 노출은 검수 프레임에서 발견하지 못했습니다. 원본 포인터·일본어 UI는 유지됩니다.

## Verification

| 검사 | 결과 |
|---|---|
| 실행 환경 | After Effects Beta 27.0x43, build 43 |
| 새 AEP 저장·재열기 | 성공. 재열기 후 재질·기기·타이포 F155 렌더 확인 |
| 최종 저장 상태 | 저장 후 `dirty=false` 확인 |
| MP4 실측 | 2400×1024, 1:1 픽셀, 30/1fps, 정확히 171프레임·5.700000초 |
| 계획 대비 차이 | 크기·fps·마스터 길이·출력 프레임/길이 차이 모두 0 |
| 무음 | 오디오 스트림 0 |
| 전체 디코딩 | `ffmpeg -v error -i ... -f null -`: 종료 0, 오류 출력 없음 |
| 파일 수집 아님 / 원본 보존 | source-manifest의 모든 입력 바이트 수·SHA-256 동일 |
| 누락 | `font.list_missing=0`, `footage.list_missing=0` |
| 표현식 | 30개 활성 확인, 관련 속성 128회 평가 성공. 단독 `expressionError` 조회는 도구에 없어 값 변화·렌더·AE 경고 표시 부재를 함께 확인 |
| 1배속 종단 재생 | 최종 MP4를 0→5.7초까지 재생. 실제 경과 5.7019초, rate=1, 브라우저 표시 dropped=0 |
| 시각 검수 | 최종 프레임/전환 시트와 원본 화면 비교, Computer Use로 재열기된 AE 화면 확인 |

원본 재생은 정상 속도에서 수행했습니다. 시각 판정의 근거는 재생 중 스냅샷과 프레임 비교이며, 이를 연속적인 인간 시청·미감 승인으로 기록하지 않습니다. 최종 감각적 텐션과 채택은 사용자 검토가 필요합니다.

주요 해시:

- AEP: `fef5fff8170fcf67c925195a04f97acbbd0a930831f832538522821e866ac2a4`.
- MP4: `4d0b6baeecfb7239ce2ba77634552c71db88f7966ef765b0e708d97bc3863b66`.

## Not changed

기존 시험 AEP/MP4, GLB/Blender 원본, 지정 MP4, 참조 PNG, 사이트 코드·배포는 변경하지 않았습니다. 다음 Sportsbook을 포함한 나머지 14.3초는 만들지 않았습니다. 기존 생성물 이동·삭제·덮어쓰기를 하지 않았습니다.

## Remaining risks

- AEP는 현재 GLB·MP4·가이드 PNG의 로컬 경로를 참조합니다. 다른 PC로 옮기는 소스 수집 패키지는 아닙니다.
- 다른 After Effects 버전, 특히 Beta의 다른 빌드에서의 3D 재질 호환성은 검증하지 않았습니다.
- 생성·기술 검증과 사용자 미감 승인·사이트 채택은 별도입니다.

로컬 검토 화면은 `http://127.0.0.1:8872/`입니다. 서버를 다시 열 필요가 있으면 이 폴더에서 `node ./14-review-server.mjs --final`을 사용합니다. 외부 공개·업로드는 하지 않았습니다.
