# 테마에서 이미지 세트로

각 코드 블록은 한 장을 위한 템플릿이다. `{...}`를 채우고 필요 없는 조건은 지운다. 사용자가 요청한 역할과 장수만 만든다.

## 공통 시각 규칙 기록

테마/브랜드 정확한 문구, 사용자 지정 특징, 이미지에서 추론한 특징을 나누어 기록한다. 선택된 참조마다 `경로 / 맡길 정보 / 복제하면 안 되는 정보`를 적는다. 공유할 항목은 팔레트의 역할, 소재의 반사·거칠기, 빛과 그림자, 형태·외곽선·깊이, 장식 밀도 정도면 충분하다. 별도 DNA 이미지 시트는 만들 필요 없다.

## 첫 컨셉 또는 배경

```text
Generate ONE {ASPECT_RATIO} image for {ROLE}: {THEME}.
Create {WORLD_AND_MOOD} through {MATERIALS_AND_SHAPE_LANGUAGE}, with {PALETTE_AND_LIGHTING}.
Composition: {FOCAL_POINT_CAMERA_AND_QUIET_AREAS}. Keep the planned {UI_OR_CHARACTER_ZONE} visually usable.
Rendering: {RENDERING_LANGUAGE_AND_SURFACE_DETAIL}.
{REFERENCE_ROLES_IF_ATTACHED}
{EXPLICIT_INCLUSIONS_AND_EXCLUSIONS}
Create the artwork itself, without a website mockup, interface labels, invented brand text, watermark or collage. Return one image.
```

CGI 요청은 사진·일러스트와 섞지 않고 모델링된 볼륨, PBR 재질, 베벨과 접촉 그림자, 반사·조명 등 원하는 표면 특성을 설명한다. “AAA” 하나만으로 결과를 보장하지 않는다. 사진 품질은 피부·헤어·소재·광원·원근으로 설명하고 자세는 별도 지정한다.

카지노는 서비스 종류다. 실제 카지노 실내가 요청된 경우에는 해당 장소를 표현하지만, 지옥·해변·세탁소 같은 테마에서 임의로 테이블·슬롯을 필수 소품으로 추가하지 않는다.

## UI 한 장 공통부

```text
Generate ONE standalone {ASSET_ROLE} for {EXACT_BRAND_OR_THEME}.
Attachment 1 supplies {PRIMARY_REFERENCE_TRAITS}. {OTHER_ATTACHMENT_ROLES}
Inherit only {SHARED_PALETTE_MATERIAL_LIGHT_DEPTH}; do not copy {EXCLUDED_REFERENCE_CONTENT}.
Functional shape: {ROLE_GEOMETRY_AND_ASPECT_RATIO}. Viewpoint: {VIEWPOINT}.
Keep {CONTENT_SAFE_AREA} clear, place ornament only in {ORNAMENT_AREA}, and make {TRANSPARENT_AREA} truly transparent.
Maintain a crisp readable silhouette at {INTENDED_DISPLAY_CONTEXT}; details support the role without dominating it.
{EXACT_TEXT_RULE}
One asset only, no collage, full website mockup, watermark or unrelated objects. Return one image.
```

| 역할 | 형상과 참조 선택 | 글자·분리 규칙 |
| --- | --- | --- |
| 헤더 로고 | 짧은 높이에서도 읽히는 글자 중심 구성; 배경/브랜드 기준의 재질·색만 상속 | 브랜드 철자 그대로, 별도 심볼·광경 없이 글자만 요청 |
| 메인 로고 | 선택된 글자 형태 유지, 요청된 심볼을 결합; 고정 화면비를 강요하지 않음 | 가짜 부제·추가 문구 금지; 텍스트와 심볼의 위계 검수 |
| 섹션 타이틀 패널 | 넓고 빈 중앙, 양 끝 장식 허용; 선택된 로고/UI 가족을 참고 | 타이틀은 구현에서 렌더링하므로 기본은 무문자 |
| GNB 버튼 패널 | 실제 버튼처럼 절제된 끝 장식, 넓은 라벨 공간; 비율 미지정이면 4:1~5:1을 초기 제안으로 사용 | 아이콘과 글자를 합쳐 그리지 않음; 길이는 3슬라이스 후보 검토 |
| GNB·메뉴 아이콘 | 첫 아이콘은 선택된 패널과 핵심 재질 참조; 다음은 패널과 선택된 아이콘 중 필요한 최소 세트 | 한 의미, 패널·글자 없이 개별 투명 이미지. 표시에 비해 과대 배치하지 않음 |
| 선택적 카드 프레임 | 해당 카드의 콘텐츠가 가려지지 않는 장식·개구부 | 사용자 이미지·문구·상태 표시와 분리 |

투명 생성 결과에도 불투명한 배경이나 희미한 잔여 픽셀이 남을 수 있다. 생성 프롬프트를 만족했다고 단정하지 말고 실제 알파와 밝고 어두운 배경 합성을 확인한다.

## 후보와 계보

탐색이 필요하면 사용자가 요청한 장수 안에서 소재/명암은 고정하고 실루엣·장식 배치를 변화시킨다. 한 후보를 선택한 뒤 다음 역할을 만든다. 불합격 후보들의 특징을 섞어 새 DNA를 만들지 않는다. 모든 변경을 공유 규칙으로 승격하지 말고 해당 에셋만의 장식으로 남길 수 있다.

필요 역할이 이미 충족됐다면 새 이미지 대신 재사용한다. 예를 들어 과한 양 끝 장식 때문에 GNB로 부적합하지만 타이틀 패널로 적합한 결과는 실제 역할을 바꾸어 기록할 수 있다. 사용자 선택을 에이전트 취향으로 교체하지 않는다.
