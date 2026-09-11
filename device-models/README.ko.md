# 3D 기기 모델 관리

이 폴더는 `Site-Skin-edit` 프로젝트에서 앞으로 제작하거나 수정하는 3D 모델의 보관 위치다. 편집 가능한 원본과 내보낸 모델을 기기별·버전별로 함께 관리한다.

## 현재 보관한 모델

| 기기·버전 | Blender 원본 | 기기 단독 GLB | 복사·검증 기록 |
|---|---|---|---|
| iPhone 17 · v001 | [iPhone17.blend](E:/codexwork/Site-Skin-edit/device-models/iPhone17/v001/source/iPhone17.blend) | [iPhone17.glb](E:/codexwork/Site-Skin-edit/device-models/iPhone17/v001/exports/iPhone17.glb) | [manifest.json](E:/codexwork/Site-Skin-edit/device-models/iPhone17/v001/manifest.json) |
| iPad 10세대 · v001 | [iPad10.blend](E:/codexwork/Site-Skin-edit/device-models/iPad10/v001/source/iPad10.blend) | [iPad10.glb](E:/codexwork/Site-Skin-edit/device-models/iPad10/v001/exports/iPad10.glb) | [manifest.json](E:/codexwork/Site-Skin-edit/device-models/iPad10/v001/manifest.json) |

이번에는 `.blend` 2개와 `.glb` 2개, 총 4개를 **복사**했다. 각 사본은 원본과 바이트 수·SHA-256이 일치한다. 모델을 다시 생성하거나 변환하지 않았다. `.blend`에는 기기와 촬영 환경이 있고, `.glb`에는 기기만 있다.

화면 재질은 각각 `iPhone17.SCREEN`, `iPad10.SCREEN`이며 화면 메쉬·UV가 분리되어 있다. 이번 보관 작업에서 화면 영상이나 AE 재질 연결은 변경하지 않았다.

## 기존 AE 연결 보존

기존 파일은 다음 폴더에 그대로 남아 있다.

```text
C:\Users\User\Documents\Codex\2026-09-07\new-chat\work\device-mockup-blender-20260911\models\
C:\Users\User\Documents\Codex\2026-09-07\new-chat\work\device-mockup-blender-20260911\exports\
```

현재 AE 프로젝트가 이 경로를 사용하고 있으므로 기존 파일을 삭제·이동·이름 변경·덮어쓰기하지 않는다. 이 관리 폴더를 만들었다는 이유로 AE의 소스를 자동으로 재연결하지 않는다. 사용자가 기존 AE 연결의 변경을 별도로 지시할 때만 해당 작업 범위에서 처리한다.

앞으로 새 모델을 만들거나 기존 모델을 수정할 때는 아래 관리 폴더에 결과를 저장한다. 과거 작업 문서에 다른 생성 위치가 적혀 있더라도 새 모델의 보관 위치는 이 규칙을 따른다. 기존 AE 링크와 앞으로 생성할 결과의 저장 위치를 구분한다.

## 폴더 구조

```text
E:\codexwork\Site-Skin-edit\device-models\
├─ README.ko.md
├─ iPhone17\
│  └─ v001\
│     ├─ source\iPhone17.blend
│     ├─ exports\iPhone17.glb
│     └─ manifest.json
└─ iPad10\
   └─ v001\
      ├─ source\iPad10.blend
      ├─ exports\iPad10.glb
      └─ manifest.json
```

새 기기는 `device-models/<기기 식별자>/v001/`부터 시작한다. 기존 기기의 수정본은 현재 사용 중인 버전과 생성된 버전을 확인하고, 충돌하지 않는 다음 버전 폴더 `v002`, `v003` 등에 저장한다. 새 번호가 가장 크다는 이유만으로 사용자 승인본이라고 판단하지 않는다.

## 앞으로의 작업 규칙

1. 작업 시작 전에 실제 프로젝트 루트, 기기·버전 폴더, 기존 AE 연결과 사용자 최신 지시를 확인한다.
2. `source/`에는 편집 가능한 모델 원본, `exports/`에는 AE 등에서 사용할 내보내기 파일을 저장한다. 이미 관리 중인 버전의 파일은 사용자가 명시하지 않으면 덮어쓰지 않는다.
3. 새 버전이 이전 모델에서 파생되었다면 사용한 기기·버전·파일을 `manifest.json`에 기록한다. 신규 생성인지 복사인지도 구분한다.
4. 모델이 외부 텍스처·영상 등을 참조한다면 실제 의존 파일의 경로와 포함 여부를 기록한다. 기존 의존 파일을 임의로 이동하거나 삭제하지 않는다. 생성 이미지의 저장 위치는 프로젝트의 별도 이미지 규칙을 따른다.
5. 버전별 `manifest.json`에 파일 상대 경로, 바이트 수, SHA-256, 원본 또는 파생 경로, 생성/복사 시각, 모델·스크린 식별 정보, 검증 상태를 남긴다. 생성 완료, 기술 검증, 사용자 승인, AE 프로젝트 채택을 구분한다.
6. 단순 복사는 원본·사본의 SHA-256과 읽기 가능 여부를 확인한다. 모델을 수정하거나 새로 내보냈다면 파일 존재뿐 아니라 모델 열기·외부 의존성·내보내기 재가져오기·관련 렌더를 검증한다. AE 관련 동작은 실제 AE 확인 범위를 따로 보고한다.
7. 새 버전을 추가하면 이 문서의 보관 목록을 갱신한다. 기존 버전과 원본 파일은 별도 요청 없이 정리하거나 삭제하지 않는다.

이번 복사는 새 AE 연결을 만들거나 재검증하는 작업이 아니다. 기존에 사용자가 확인한 모델과 동일한 파일을 프로젝트 내부에서도 관리할 수 있도록 보관한 것이다.
