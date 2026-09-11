# AE MCP — Blender 기기 모델 제어 사전조사

확인일: 2026-09-11. 대상은 현재 연결된 After Effects 25.4x86이다. 아이폰·아이패드 모델은 다른 작업에서 제작 중이며, 이번 조사에서는 모델 파일·렌더 이미지를 받거나 검수하지 않았다. AE와 Blender의 제작 상태를 변경하지 않았다.

## 판단

기기를 3D 공간에서 배치·이동·회전시키고 카메라·조명과 함께 애니메이션하는 데 필요한 현재 MCP 명령 경로가 있다. AE는 GLB 등의 네이티브 모델 임포트와 Advanced 3D 렌더링을 지원한다. 다만 **이번 모델의 MCP 임포트부터 최종 렌더까지 성공했다는 뜻은 아니다.** 모델 품질과 실제 자동화는 파일이 나온 뒤 별도로 시험해야 한다.

[Adobe 모델 임포트](https://helpx.adobe.com/after-effects/desktop/import-files/import-and-add-3d-models/import-3d-model.html)는 24.1 이후 네이티브 3D 임포트를 설명한다. GLB를 종속 리소스·텍스처를 담는 단일 패키지라는 이유로 우선 형식으로 안내한다. [Advanced 3D 설명](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/advanced-3d-renderer/advanced-3d-renderer.html)은 모델·카메라·조명·다른 3D 레이어의 통합 렌더를 설명한다.

## 현재 MCP에서 확인한 범위

ae_context, ae_version_info, ae_catalog의 관련 카테고리, 읽기 전용 comp.list_renderers를 조회했다. 모델을 임포트하거나 레이어를 생성하지 않았다.

| 작업 | 현재 확인한 명령 | 검증 범위 |
|---|---|---|
| 모델 파일 등록 | project.import_file(path) | 일반 파일 임포트 명령 존재. 실제 GLB 반환 항목과 모델 레이어 생성은 아직 미검증 |
| 컴포지션에 추가 | layer.create_footage(comp, sourceItemId, name) | 기존 프로젝트 항목을 레이어로 추가하는 경로 존재 |
| 모델 렌더러 지정 | comp.set_renderer(comp, renderer:\"advanced3d\") | 사용 가능한 renderer 목록에서 Advanced 3D 확인. 실제 설정 변경 안 함 |
| XYZ 위치·크기·앵커 | transform.set의 position/scale/anchorPoint 3차원 배열 | 매개변수 지원 확인 |
| X/Y 회전·Orientation | property.list → property.set / keyframe.set_batch | 모델을 올린 뒤 실제 속성 경로를 조회해야 함. transform.set의 단일 rotation 인수로 3축 회전 전체를 지정한다고 가정하지 않음 |
| 시간에 따른 이동·회전·이징 | keyframe.set_batch, keyframe.set_easing, expression.set | 해당 모델 속성이 실제 쓰기·애니메이션 가능한지는 임포트 후 확인 |
| 카메라·조명 | layer.create_camera, layer.create_light | 생성과 일반 속성 제어 경로 확인. HDRI 소스 연결·세부 재질 속성까지 이번에 실증한 것은 아님 |
| 기기와 화면을 묶어 이동 | layer.set_parent | AE 레이어 간 부모 연결 지원. GLB 내부 하위 메시가 개별 AE 레이어로 자동 분리되는 것은 보장하지 않음 |
| 결과 검수 | ae_render_frame | 기존 2D 작업에서 사용한 렌더 경로. 이번 3D 장면의 렌더 품질은 아직 미검증 |

실제 renderer 매핑은 아래와 같다. 내부 이름만 보고 혼동하지 않는다.

- classic3d → `ADBE Advanced 3d`
- advanced3d → `ADBE Calder`
- cinema4d → `ADBE Ernst`

조회 당시 컴포지션은 Classic 3D였으며 변경하지 않았다. 후속 시험용 새 컴포지션에서 friendly name `advanced3d`를 사용한다.

catalog에 보이는 `layer.create_parametric_mesh`는 명세상 **AE 26.3 이상**이다. 현재 25.4에서 실행 가능하다고 판단하지 않는다. 현재 기기의 형상·베벨·UV·상세 재질 제작은 Blender에서 완성하는 범위다. `eval.run`도 현재 비활성화이며 이번 조사에서 활성화하지 않았다.

## 사용자가 지정한 화면 매핑 순서

후속 지시: 기기 모델링 상태를 먼저 확인하고 사용할 수 있다고 판단하면, **디스플레이 이미지를 모델 자체에 매핑**한다. 이 순서가 현재 작업 기준이다.

1. 회색 화면의 모델과 렌더 이미지를 검수한다. 기기 형상·비율·두께·유리·금속 표현과 실제 사용 적합성을 판단한다.
2. 사용하기로 판단한 모델의 화면 메시/재질에 Blender에서 디스플레이 이미지를 매핑한다.
3. 매핑된 텍스처를 포함한 GLB를 내보낸다. 원본 blend와 비교용 렌더 이미지를 보존한다.
4. AE에서는 GLB의 화면 텍스처가 정상 표시되는지 먼저 확인한 뒤 모델 전체의 위치·회전·크기, 카메라·조명을 애니메이션한다.

이를 위해 본체·유리·화면 표시 면의 역할을 구분하고 화면 UV를 유지하는 것을 권장한다. 현재 출력의 메시·재질·UV 상태는 아직 확인하지 않았다. AE의 별도 화면 평면이나 AE 내부의 직접 재질 소스 교체는 이번 제작 방식에 포함하지 않는다.

버전 구분을 위한 조사 기록: AE의 이미지·영상·프리컴프를 직접 재질로 쓰는 Layers as Materials는 **AE Beta 27.0x41** 발표 기능이다. 현재 지정한 Blender 사전 매핑 방식은 이 기능에 의존하지 않는다. [Adobe 베타 발표](https://community.adobe.com/announcements-532/layers-as-materials-now-available-in-after-effects-beta-1640990)

## 모델이 나온 뒤 최소 시험

새 3D 테스트 컴포지션에서 기기 하나만 사용한다. 먼저 GLB를 가져와 정면·약 30도 측면 정지 프레임을 검수한다. 이후 짧게 Y 회전과 위치 이동을 주고 같은 기기가 연속적으로 유지되는지 확인한다. 카메라·조명은 각각 한 변수씩 확인한다.

판단 항목은 실루엣·두께·모서리·카메라/버튼의 형태, 면의 뒤집힘·노멀·텍스처 누락, 금속·유리의 반사, 화면 면의 위치, 가까운 거리에서의 디테일, 렌더 안정성이다. Blender의 PNG가 좋아 보여도 AE의 재질·조명 결과가 동일하다고 간주하지 않는다.

제작물은 원본 blend, 기기별 GLB, 비교용 렌더 PNG, 단위·축·원점·화면 면 정보를 함께 받으면 좋다. 채택 판단은 모델과 렌더를 확인한 뒤 한다. 이번 조사는 기존 2컷 AE 지시서의 범위를 늘리거나 제작 중인 다른 작업에 변경을 요청하지 않는다.

## Blender 전달 권장사항

- 아이폰과 아이패드는 각각 GLB로 내보내고 원본 blend도 보존한다. 지금처럼 첫 전달은 회색 화면의 정적 모델로 진행할 수 있다.
- Body, Screen, 필요한 경우 Glass를 구분한다. Screen의 재질을 본체와 공유하지 않고 화면 전용 UV와 위쪽 방향·종횡비를 기록한다.
- 기본 재질은 Principled BSDF의 PBR 값과 이미지 텍스처로 구성한다. 복잡한 절차적 재질은 필요한 텍스처 맵으로 베이크한다.
- glTF 2.0 Binary에 UV, Normals, 필요한 Tangents와 재질을 포함하고, 대상 기기만 선택해서 내보낸다. 실제 크기·단위·축·원점을 함께 기록한다.

[Blender glTF 공식 문서](https://docs.blender.org/manual/en/4.2/addons/import_export/scene_gltf2.html)는 물체 변환·본·shape key 애니메이션 지원과 재질·조명·물리 애니메이션의 내보내기 제한을 설명한다. 화면에 넣은 동영상이나 재질 애니메이션이 GLB 안에 그대로 들어간다고 약속하지 않는다.

이미 만들어진 내장 애니메이션은 AE에서 클립을 선택하고 시간을 조절하는 경로가 있지만, 이것이 내부 리그를 편집한다는 뜻은 아니다. 이번 기기 모델에는 우선 전체 기기의 변환만 적용하면 된다. [Adobe 내장 모델 애니메이션](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/animate-embedded-3d-model/embedded-3d-model-animations.html)
