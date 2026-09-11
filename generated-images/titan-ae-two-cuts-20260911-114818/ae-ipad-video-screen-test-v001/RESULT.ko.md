# iPad 화면 영상 재질 테스트 결과

2026-09-11 / After Effects Beta **27.0x43** / Advanced 3D (`ADBE Calder`)

## 보고 대상과 이후 작업 기준

- 수신: **Site-Skin-edit → 이미지와 영상 제작** 스레드 (`01a084c3-735f-7fd2-8ef7-a044226bd7a3`).
- 작성: **애프터이팩트 모션그래픽 작업** 스레드 (`01a08e67-bb59-7c63-a4ec-e879119b7530`).
- 사용자 지시에 따라 **이후 AE 작업은 베타 버전에서 이어갑니다.** 일반판으로 되돌리거나 일반판을 자동 실행하지 않습니다.
- 이 문서는 영상 재질 매핑의 구현 결과와 재사용 방법 보고입니다. 레터링·이징·두 장면의 새로운 연결 동작을 제작하라는 명령이나 그 제작이 완료됐다는 보고가 아닙니다. 기존 제작 대기 상태와 사용자 승인 범위를 그대로 유지합니다.
- 보고용 문서 보강 중에는 AEP·영상·모델을 수정하거나 재렌더하지 않았습니다. 베타 연결 상태를 읽기 전용으로 재확인했고, 두 출력 MP4의 크기와 SHA-256이 `verification.json`의 검증본과 일치하는지 확인했습니다.

결과 폴더의 절대 경로:

```text
E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-ipad-video-screen-test-v001
```

## 판정

**가능함을 실제 확인했습니다.** `E:/하데스오프닝.mp4`를 iPad 모델의 `iPad10.SCREEN` 할당에만 연결했습니다. 별도 평면 추적이나 Blender 영상 렌더를 합성한 결과가 아니라, AE의 영상 레이어 재질 기능입니다.

검증 범위는 기존 컴포지션과 같은 **처음 3초, 2400×1024, 30fps**입니다. 14.4167초 원본 전체 구간 검증으로 확대 해석하지 않습니다. iPhone은 이번 적용 대상이 아닙니다.

## 결과 파일

- `TITAN-iPad-VideoScreen-v001.aep`: 적용 및 검증 컴포지션이 들어 있는 작업 사본.
- `TITAN-iPad-VideoScreen-v001-Baseline.aep`: 변경 전 현재 작업 상태를 보존한 사본.
- `iPad-VideoScreen-Test-3s.mp4`: iPad 단독, 기존 기기 모션, 4,557,157바이트.
- `TITAN-iPad-VideoScreen-Preview-3s.mp4`: 기존 메인 시퀀스에 적용된 결과, 3,778,108바이트.
- `verification.json`: 메타데이터, 전체 디코딩 결과, 속성 비교, 파일 지문, 한계.
- `baseline-*.png`, `mapped-*.png`, `qa-*.png`, `output-*.png`, `final-reopened-*.png`: 검증 스틸. `connected-*` 및 `source-visible-*`는 초기 회색 화면 문제를 기록한 중간 결과이지 최종 결과가 아닙니다.
- `ae-beta-client.mjs`, `log-*.json`: 베타 전용 MCP 호출과 실행 기록. 일반판을 호출하지 않으며 임의 스크립트 평가 기능은 비활성화했습니다.
- `verify-results.py`: 생성된 로그와 영상을 읽는 재검증 스크립트. `verification.json`만 씁니다.

## 실제 연결 방법

1. 현재 작업을 위 Baseline AEP로 저장한 뒤 별도의 적용 AEP로 Save As.
2. `SCREEN_iPad10_HADES_VIDEO_v001` 프리컴프를 2360×1640, 30fps, 3초로 생성.
3. 기존 프로젝트의 `하데스오프닝.mp4` Footage(ID 200)를 재사용. 원본 Interpret Footage 24fps는 변경하지 않음.
4. 잘리지 않는 Fit으로 맞춤: `2360 / 1920 × 100 = 122.9166667%`. 영상 높이는 `1080 × 2360 / 1920 = 1327.5px`, 위아래 여백은 각각 `(1640 - 1327.5) / 2 = 156.25px`. 여백은 검은 솔리드로 채움. 기기 축과 UV 변형은 변경하지 않음.
5. 실제 모델이 있는 `TITAN_DEVICE_iPad_3D_v003` 안에 프리컴프를 `SCREEN_iPad10_VIDEO_SOURCE` 레이어로 추가. 마지막 5번 레이어에 배치하고 비디오 스위치 OFF.
6. 모델 `DEVICE_iPad10_MODEL` 선택 → Properties → Material Assignment → Add Override → **iPad10.SCREEN** → Material → **SCREEN_iPad10_VIDEO_SOURCE**.
7. 신규 Material 소스 드롭다운은 MCP의 속성 목록에 노출되지 않아 **Computer Use로 실제 UI 선택**. 오프셋·회전·스케일과 새 재질의 Roughness/Metallic/Emission 등은 임의 조정하지 않음.

MCP에서 확인한 화면 경로는 `ADBE3D Material Parade > iPad10.SCREEN`입니다. 소스 드롭다운 자체에 대한 쓰기 API를 확인한 것은 아니므로 이 경로에 임의의 소스 번호를 쓰면 안 됩니다. UI 연결 후 해당 화면 그룹에는 Opacity, Roughness, Metallic, Emission 등의 속성이 추가로 노출됐습니다.

기능 근거: [Adobe 사용 안내](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-materials/use-layers-as-material-sources.html), [Adobe 베타 공지](https://community.adobe.com/announcements-532/layers-as-materials-now-available-in-after-effects-beta-1640990).

## 후속 제작에서 재사용하는 방법

### 1. 베타 연결과 현재 작업을 먼저 확인

- 이번에 사용한 실행 파일: `C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/AfterFX (Beta).exe`.
- 연결 설정이 베타를 가리킨다는 사실만으로 충분하지 않습니다. 실제 `ae_version_info`의 버전·빌드와 `ae_project_info`의 파일 경로를 먼저 확인합니다. 이번 성공 환경은 27.0x43입니다.
- 기존에 떠 있던 MCP 서버가 과거 일반판 실행 경로를 유지할 수 있어, 이번에는 `ae-beta-client.mjs`에서 `AE_MCP_EXE`를 위 베타 실행 파일로 명시한 새 연결을 사용했습니다. 일반 MCP 연결이 지금도 과거 경로를 쓰는지는 후속 작업 시 재확인이 필요합니다.
- 조회에는 읽기 전용 연결을 사용하고, 허용된 실제 프로젝트 수정 때만 쓰기 연결을 사용합니다. 임의 스크립트 평가(`eval.run`)나 앱 보안 설정 변경으로 우회하지 않습니다.
- 보고 전 재확인 로그 `log-2026-09-11T07-00-17-572Z.json`은 27.0x43 및 이 폴더의 적용 AEP를 반환했습니다. 이 조회에서는 `dirty: true`가 표시됐습니다. 변경 원인을 추정해 버리지 않고 현재 상태를 그대로 두었으므로, 후속 작업에서 프로젝트를 다시 열기 전에 현재 변경분을 확인·보존해야 합니다.

### 2. 검증된 구조를 유지

```text
하데스오프닝.mp4
  → SCREEN_iPad10_HADES_VIDEO_v001 (영상 + 검은 Fit 여백만 포함)
    → SCREEN_iPad10_VIDEO_SOURCE (iPad 모델과 같은 컴포지션, 표시 OFF)
      → DEVICE_iPad10_MODEL / iPad10.SCREEN의 Material
        → 기존 기기 부모 모션과 카메라로 렌더
```

- 같은 AEP에서 다음 수정본을 만들 때는 이 연결이 이미 적용된 사본을 새 이름으로 저장한 후 필요한 변경만 합니다. 이전 Baseline이나 테스트 결과를 덮어쓰지 않습니다.
- 화면 내용만 바꿀 경우 화면용 프리컴프 내부를 수정하고, 모델 전체·다른 재질·기기 축을 같이 바꾸지 않습니다. 다른 영상을 쓸 때는 길이·프레임률·비율·오디오 유무를 다시 확인합니다.
- 화면 프리컴프 안에 iPad 모델 컴포지션이나 그 부모를 넣으면 순환 참조가 생길 수 있습니다. 화면 프리컴프는 영상과 필요한 2D 내용만 포함해야 합니다.
- 신규 Material 소스 선택은 이번 빌드에서 **UI로 확인된 단계**입니다. 이를 전부 MCP API만으로 자동화했다고 보고하면 안 됩니다. 다른 파일의 레이어 번호·아이템 ID는 다시 조회합니다.

### 3. 길이가 늘어나는 제작은 별도 검증

현재 연결된 메인, iPad 컴포지션, 화면 프리컴프와 관련 레이어의 검증 범위는 3초입니다. 후속 시퀀스를 더 길게 만들기로 승인된 경우 부모 타임라인만 늘려서는 충분하지 않습니다. iPad 컴포지션, 화면 프리컴프, 소스/모델/카메라/환경 레이어의 사용 구간을 함께 점검하고, 연장 구간에서도 영상이 진행하는지 다시 출력해서 확인합니다. 14.4167초 원본을 넘어서는 구간에 루프·정지·속도 변경을 임의 적용하지 않습니다.

`QA_iPad_VIDEO_Front_Oblique_Back_v001`은 가림 검증용입니다. 이 컴포지션의 시험 회전을 본편 기기 모션으로 채택하지 않습니다. 이번 결과가 입증한 것은 **화면 영상이 실제 3D 재질로 동작하면서 기기 변환을 따라간다**는 점이며, 후속 레터링 반동·충돌처럼 보이는 연출·지정 이징의 정확도와 완성도는 별도 테스트 대상입니다.

## 검증

- 원본 영상 프리컴프는 정상 렌더됨. 0.2초의 문, 2.2초의 성, 2.9초의 얼굴 등 서로 다른 영상 내용이 화면에 표시됨.
- AE Preview를 실제 재생해 프레임 9의 문 장면과 프레임 85의 얼굴 장면 진행을 관찰한 후 정지함.
- 2D 소스 레이어 OFF 상태에서 재질 평가와 시간 진행이 유지됨. 영상 사각형이 모델 밖에 중복 합성되지 않음. 입력과 출력 모두 오디오 스트림 없음.
- `QA_iPad_VIDEO_Front_Oblique_Back_v001`은 별도 복제 컴포지션. 이 안의 부모 Y 회전 키 값만 정면/−65도/180도로 바꿔 정면·사선·뒷면을 렌더. 뒷면에서는 영상이 관통하지 않고 후면 몸체와 카메라가 표시됨.
- 원래 iPad 컴포지션의 부모 모션, 모델 변환, 카메라 및 환경 레이어는 조회 가능한 상태와 키프레임 비교에서 동일함. 메인과 iPhone 역시 동일함. 애니메이션 속성의 현재 시간 평가값만 비교에서 제외하고 실제 키프레임과 나머지 필드는 비교함.
- 프로젝트 색 관리 등 설정은 파일명과 아이템 수를 제외하고 동일함.
- 두 MP4는 H.264 / 2400×1024 / 30fps / 3초 / **90프레임**. FFmpeg 전체 디코딩 모두 종료 코드 0.
- 실제 MP4에서 프레임을 추출해 iPad 단독과 메인 결과를 시각 검사함.
- 최종 AEP를 다시 열고 2.9초 재렌더. 재열기 전 PNG와 픽셀이 동일해 연결 유지가 확인됨.
- 기준 화면과 비교 시 화면 밖에는 339픽셀의 미세 차이가 있음. 그중 채널 차이 2 초과는 22픽셀, 최대 차이는 9/255. 화면 밖 재질 수정은 하지 않았지만 완전한 픽셀 일치라고 주장하지 않음.

## 확인된 주의점과 미검증 범위

- **최초 Material 선택 후 회색 화면이 유지됐습니다. 저장한 AEP를 다시 열자 정상 적용됐습니다.** 단순 갱신/캐시 문제인지 다른 베타 문제인지는 확인할 수 없습니다. 이를 앱 재시작, 원본 GLB 수정, 보안 설정 변경으로 우회하지 않았습니다.
- 원본 전체 14.4167초, iPhone 영상 매핑, 다른 AE 빌드와 장시간 안정성은 검증하지 않았습니다.
- 화면 밝기·반사는 현재 3D 조명과 새 재질 기본값의 영향을 받습니다. 영상 RGB를 발광 채널에도 연결했다고 주장하지 않으며 색 보정·밝기 연출은 이번에 추가하지 않았습니다.
- 브라우저의 로컬 파일 URL 재생은 보안 정책으로 차단됐습니다. 우회하지 않았고, MP4 전체 디코딩 및 추출 프레임 검사와 AE 내 실제 재생으로 검증했습니다.
- AEP는 외부 파일 참조형입니다. 아래 원본 파일을 이동하거나 삭제하면 재연결이 필요합니다.

## 유지해야 하는 외부 파일

- `E:/하데스오프닝.mp4`
- `C:/Users/User/Documents/Codex/2026-09-07/new-chat/work/device-mockup-blender-20260911/exports/iPad10.glb`
- `C:/Users/User/Documents/Codex/2026-09-07/new-chat/work/device-mockup-blender-20260911/exports/iPhone17.glb`
- `E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/results/01-meet-titan.png`
- `E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/results/02-built-in-house.png`

기존 베타 Working AEP, 원본 GLB·Blender·MP4 및 다른 작업 폴더는 덮어쓰지 않았습니다. 적용 원본과 실패/중간/최종 결과는 위 파일명으로 구분했습니다.
