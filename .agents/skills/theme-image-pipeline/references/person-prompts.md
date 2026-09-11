# 인물 생성 템플릿

단계별 참조와 검수는 [인물 공정](character-workflow.md)을 따른다. 아래 변수는 실제 값으로 바꾼다. 신규 마스터 템플릿과 일반화된 자세 템플릿 전체가 모든 인물에서 검증된 것은 아니다. 실제 제출 원문은 [보관 이력](tested-prompts/README.md)과 구분한다.

## 사용할 순서

| 단계 | 첨부 순서 | 제출 내용 |
|---|---|---|
| F | 인물 원본 1장 | F 전체 |
| O | 선택한 의상 샘플 1장 | O 전체 |
| M | 얼굴·상체 → 전신 의상 | M 전체 |
| C, 필요할 때 | 기존 전신 → 얼굴·상체 → 의상 | C 전체 |
| P | 확인한 전신 기준 → 얼굴·상체 → 의상 | P 공통 + 자세 블록 하나 |

F/O 참조를 이미 승인했다면 건너뛴다. C는 매번 필수 공정이 아니다. 체형까지 확인한 기준이 있으면 P부터 시작한다.

## F — 정면 얼굴·상체

변수: `IDENTITY_DETAILS`에는 실제 원본에서 유지할 헤어·장신구 등을 적는다. 원본에 없는 외모 특징을 만들어 넣지 않는다. `REFERENCE_CLOTHING`의 기본 예는 원본 체형을 읽을 수 있는 단순한 아이보리 캐미솔이다.

```text
Generate ONE image now: a single frontal photographic identity and upper-body reference of the adult woman in attachment 1. Use only this attachment for the person, not earlier conversation identities.
Preserve her distinctive facial features, skin tone, hair and these identifying details: {{IDENTITY_DETAILS}}. Preserve her natural upper-body physique, including the bust volume, shoulder width and bust-to-waist relationship visible in the source. Do not replace her with a generic face or a different body type.
One frontal view. Face and shoulders square to the camera, head upright without sideways tilt, eyes into the lens, relaxed neutral expression. Portrait 4:5, complete hair through the upper waist so both facial features and upper-body proportions are readable.
Clothing: {{REFERENCE_CLOTHING}}. Plain light-gray studio background, even neutral light, realistic fine skin and hair detail, natural portrait perspective.
This reference supplies facial identity AND upper-body appearance. Its large face-on-canvas is not a full-body head-size guide, and it does not define lower-body anatomy that is not visible.
No side views, collage, labels, text, props or other people. Return only one image.
```

## O — 얼굴 없는 전신 의상

변수: `GARMENT_DETAILS`에는 샘플의 실제 구조·색·소재·장식·하의·신발을 적는다. `COMPLETION_RULE`에는 샘플에 없는 부분을 어떻게 처리할지 적는다. 예: 검은 일자 바지 하단과 낮은 굽 검은 신발을 보완 디자인으로 완성.

```text
Generate ONE head-excluded complete-outfit catalog photograph now, portrait 9:16. Use attachment 1 for garment design, not any previous conversation outfit or face.
Reproduce these visible garment details faithfully: {{GARMENT_DETAILS}}.
For areas absent from the source, follow this explicit completion rule: {{COMPLETION_RULE}}. Inferred completion is a new design choice, not a verified hidden part of the original product.
A neutral adult female fitting model stands straight, hands relaxed, feet naturally apart on one level floor. Crop the head at the base of the neck; include the whole garment, both legs, ankles and shoes with space below the soles. Keep continuous believable anatomy and balanced torso-to-leg proportions for a readable garment reference.
This image supplies clothing construction, fabric, color, decoration, accessories and shoes. Its fitting model is NOT the authority for the final person's facial identity, bust size, waist width or body type.
Light neutral-gray studio with soft even lighting and readable fabric detail. Remove shopping captions, watermarks, color swatches and unrelated props. One frontal view, no collage. Image only.
```

실제 의상에 포함된 장신구·가방을 유지해야 하면 유지 목록에 적는다. 무조건 제거하지 않는다. 전신 의상 참조 자체가 완성됐다는 사실과 최종 인물의 체형이 보존됐다는 사실을 혼동하지 않는다.

## M — 신규 정면 전신 기준

`SCENE`은 테마·배경·조명, `FRAME`은 화면비와 여백 조건이다. 아래는 전신 9:16 기본형이다. 기존 구도를 정확히 유지해야 하고 기준 이미지가 있으면 C를 사용한다.

```text
Generate ONE photographic full-body image now, portrait 9:16. Use only the two attachments in this message.
Attachment 1 defines the adult woman's face, hair, skin, identifying details AND natural upper-body physique. Preserve her referenced bust volume and projection, shoulder width and bust-to-waist relationship at the correct full-body scale.
Attachment 2 defines the garment design, fabric, color, closures, decoration and shoes ONLY. Fit that outfit to the woman from attachment 1. Do not copy the outfit fitting model's slender or fuller body shape. Preserve the garment's actual neckline and construction while tailoring its fabric around the target physique.
One anatomically continuous woman standing naturally upright, centered, shoulders/ribcage/pelvis frontal, head level, eyes into the lens. Arms relaxed, hands visible, feet naturally apart on the same floor. Keep balanced head-to-torso-to-leg proportions, natural limb lengths and realistic full-body perspective. Do not copy the portrait reference's large head-on-canvas size.
Show the complete hair, hands, both shoes and floor contact with comfortable margins. Use a level full-body camera at sufficient distance; do not compress the legs or stretch the torso to fit the canvas.
Scene and lighting: {{SCENE}}.
Framing and usable margins: {{FRAME}}.
Natural photographic skin and fabric detail, credible contact shadows. One image only, no text, collage or unrelated people.
```

검수할 때는 전체 비례와 상체 볼륨을 따로 확인한다. 두 항목이 모두 맞아야 다음 자세의 체형 기준으로 쓸 수 있다.

## C — 기존 전신의 상체 체형 보정

이번 실제 보정에서 볼륨 변화가 관찰된 경로다. 다른 인물·의상에서의 성공률은 아직 측정하지 않았다. `FLOOR_CONTACT`에는 해당 기준에서 읽은 접점 위치를 적되 수치가 불명확하면 실제 기준의 위치를 유지하라는 설명으로 쓴다.

```text
Generate ONE 9:16 full-body photograph now by editing attachment 1. Change only the upper-body physique and garment fit to follow attachment 2; keep the rest of the image.
REFERENCE PRIORITY: Attachment 2 defines the adult woman's facial identity, hair, identifying details AND her natural upper-body physique. Preserve the bust volume and projection, shoulder width and bust-to-waist relationship visible there, without exaggerating beyond that reference. Transfer those proportions at full-body scale, not the portrait's large face-on-canvas scale.
Attachment 1 supplies the camera, room, standing pose, head size, limb lengths and floor placement. Its upper-body silhouette is the part to correct. Attachment 3 supplies garment construction, fabric, color, closures, decoration, lower garments and shoes ONLY, not its fitting model's body type.
Fit the same garment to the referenced physique, showing natural three-dimensional fabric curvature. Preserve the neckline, closures, seams, coverage and design rather than changing the clothing to suggest a different body. Keep the existing lower-body proportions.
Same complete standing pose, face, hair, eyes, hands and shoes within the frame. Keep the exact composition, camera height, distance and perspective, background landmarks, lighting and floor lines. No zoom, reframing or subject relocation. Floor contact: {{FLOOR_CONTACT}}.
One photographic image only, no text or collage.
```

## P — 기준 이미지에서 자세 변경

이 공통부에 아래 자세 블록 하나만 붙인다. 이미 확인한 체형과 서로 충돌하는 참조를 그대로 섞지 않는다. 먼저 기준의 체형을 수정·확인한 뒤 파생한다.

```text
Create ONE new 9:16 full-figure photograph by editing attachment 1, the selected standing master. Use only these three attachments.
Attachment 1 supplies the accepted person-and-outfit combination, coherent full-body proportions, camera position, distance, crop, room geometry, lighting and floor. Preserve that person's body type when changing pose.
Attachment 2 confirms facial identity, hair, identifying details AND upper-body physique, including the visible bust volume and shoulder-to-waist relationship. It is not restricted to the face alone. Attachment 3 confirms garment design and shoes ONLY; it must not replace the woman's body with the fitting model's physique.
Keep natural garment curvature over the same upper-body volume in the new pose. Preserve the original clothing construction, closures and decorations.
LOCKED CAMERA: retain the standing camera height, distance, field of view, crop and head size. No zoom, lowering the camera, face auto-centering or stretching the body to fill the frame. Keep background landmarks and floor perspective stable. Preserve the same limb lengths and credible floor contact.
Use the camera-fixed horizontal floor-clock coordinates specified in the pose block. Read torso, head, gaze, hands and legs separately; do not use anatomical left/right.
Return one photographic image only, no text or collage.
```

### P1 — 정면 전신

```text
POSE: Stand naturally upright, both feet planted, shoulders/ribcage/pelvis square to the camera. Head level and frontal; eyes meet the lens. Arms relaxed with hands visible. Complete hair, both hands and both shoes remain inside the master's framing, with the same scale and floor location.
```

### P2 — 몸통 회전과 렌즈 응시

[시계 좌표 정의](character-workflow.md)의 영문 블록을 P 공통부에 붙인 뒤 사용한다. `BODY_CLOCK`은 예를 들어 `7:30` 또는 `4:30`이다.

```text
POSE: At the master's floor position and scale, turn shoulders, ribcage, pelvis and shoe toes together toward {{BODY_CLOCK}} on the camera-fixed floor clock. Keep a clear three-quarter torso. Turn the head back toward 6, keep the chin level, and aim both eyes into the camera lens at 6. Arms relaxed, hands visible. Keep complete hair, hands and shoes inside the frame.
```

### P3 — 몸통·고개·눈 분리

시계 좌표 정의를 먼저 붙인다. 각도와 방향의 정확한 독립 제어는 미보장이다.

```text
POSE: At the standing master's floor position, point the chest and pelvis toward {{BODY_CLOCK}}, the nose toward {{HEAD_CLOCK}}, and the gaze toward {{GAZE_CLOCK}} on the same camera-fixed floor clock. Keep the head upright with level chin. Arms relaxed, hands visible. Preserve the full figure, scale and floor placement. The eye target does not change the nose target.
```

### P4 — 스쿼트

자세 자체는 초기 시험에서 확인했다. 아래는 상체 체형 보존 공통부와 결합한 일반화 문장이며 체형 보정 후 스쿼트를 추가 생성한 것은 아니다.

```text
POSE: Lower into a balanced deep squat at the standing master's floor spot. Knees deeply flexed, hips low, both shoe soles planted, torso inclined naturally for balance. Both hands rest separately on the knees. Head and eyes: {{HEAD_AND_GAZE}}.
Keep the original standing camera and person scale. The compact squatting figure occupies the lower part of the portrait, leaving a broad continuous area of the SAME room above. Do not enlarge the head, stretch the torso or raise the floor. Keep the whole visible silhouette, hair, elbows, knees and shoes inside the canvas. Preserve the master floor plane and footprint, allowing small natural depth differences between contacts.
```

### P5 — 무릎을 꿇고 뒤꿈치에 앉기

시계 좌표 정의를 먼저 붙이고 `BODY_CLOCK`을 채운다.

자세와 볼륨 표현은 확인했지만 인물 스케일·접점이 정확히 유지되지는 않았다. `FLOOR_CONTACT`에는 실제 기준 위치를 적는다.

```text
POSE: Kneel on both knees and sit the hips back on the heels, lower legs folded backward naturally. Torso upright in a gentle three-quarter turn toward {{BODY_CLOCK}} on the camera-fixed floor clock. Both hands rest separately on the thighs. Head turns toward the camera, eyes meet the lens. Preserve the same upper-body physique and natural clothing fit in this pose.
Keep the standing camera height, distance, crop and head size. The lowered figure occupies the lower part of the image, leaving a large uninterrupted area of the SAME background above. Entire visible outline including hair, fingertips, knees and shoes stays inside the frame.
Keep knees and folded feet on the same floor near the original standing footprint. Foremost knee or shoe contact: {{FLOOR_CONTACT}}. Folded-back feet may lie slightly higher in perspective. Do not raise the floor, shift the person backward, elongate the torso, zoom or add a chair. Maintain physically credible occlusion rather than inventing an extra visible foot.
```

## 화면비·크롭을 바꾸는 작업

카우보이·뷰티샷 또는 다른 화면비가 요청되면 P의 `9:16 full-figure`, 완전 전신 포함 조건과 고정 카메라 조건을 그대로 둔 채 서로 반대되는 크롭 지시를 추가하지 않는다. 요청한 새 프레이밍으로 해당 조건을 교체하고, 얼굴·체형·의상 참조 역할만 유지한다. 이 경우 구도 변화에 대한 별도 검수가 필요하다.

## 제출 직전 확인

- 남은 `{{...}}`가 없는가?
- 첨부 순서와 실제 파일이 역할 설명과 일치하는가?
- 얼굴 참조가 상체 체형까지 담당하는가?
- 의상 모델의 체형을 복사하라는 문장이 없는가?
- 기준 전신에 이미 잘못된 체형이 있으면 그 상태를 고정하라고 쓰지 않았는가?
- 완전 전신과 상반신 크롭, 고정 카메라와 새 구도 지시가 충돌하지 않는가?
- 이번에 생성할 이미지 수는 한 장인가?

프롬프트 안에 작업 로그·검수표·진행 설명을 섞지 않는다. 그런 기록은 로컬 문서에 남기고, GPT에는 이미지 생성 지시와 해당 참조만 전달한다.
