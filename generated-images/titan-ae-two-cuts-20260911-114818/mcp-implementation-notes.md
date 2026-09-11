# TITAN 첫 두 컷 — After Effects MCP 구현 메모

작성일: 2026-09-11. 이 문서는 다음 AE 작업을 위한 구현 조사입니다. **이번 조사에서는 AE 프로젝트를 변경하거나 새 컷을 실행·렌더하지 않았습니다.**

## 1. 기준과 확인 범위

최종 배치, 색상, 폰트 크기·weight, 프레임별 타이밍은 이 실행 폴더의 [motion-instructions.md](motion-instructions.md)가 결정합니다. 작성된 최신 문서를 반드시 먼저 읽습니다. 이 메모의 명령 예시는 디자인·타이밍을 추가로 확정하지 않습니다.

- 제작 규격: **2400×1024, 75:32, 30fps, 3초 = 90프레임**. 16:9로 변경하지 않습니다.
- 네이티브 텍스트 5개: `Meet`, `TITAN`, `Core systems`, `Built`, `in-house`.
- 컷 1: 따뜻한 아이보리 배경, 작은 Regular `Meet`, SemiBold `TITAN`, 간단한 곡선과 주황 점.
- 컷 2: 차콜 배경에서 `Core systems` → 주황 `Built` → 아이보리 `in-house`가 추가됩니다. 앞선 단어를 유지하여 마지막에는 문장을 완성합니다.
- 프레임 F의 시간은 `F / 30`초입니다. F0–F89가 90개 프레임이며 마지막 샘플은 `89 / 30`초입니다.

| 구분 | 확인된 내용 | 이 확인으로 보장하지 않는 것 |
|---|---|---|
| 현재 MCP catalog | 실제 `ae_catalog` 조회: 197개 operation, 필요한 텍스트·도형·키프레임·매트·렌더 명령 지원, `eval.run=disabled` | 새 컷의 시각적 완성, 모든 매개변수 조합의 실행 성공 |
| 기존 Hello World | `motion-mcp.mjs`와 실제 요청·응답 로그 확인. setup 8개, animate 23개 operation의 batch 결과 `failed:0`. 프레임 렌더 로그 확인 | Hello World의 좌표·변형·규격이 TITAN에도 적합하다는 판단 |
| 현재 로컬 인코더 | `ffmpeg -version`, `ffprobe -version`: 8.1.1, FFmpeg의 libx264 포함 확인 | 아직 생성하지 않은 TITAN 영상의 인코딩·재생 성공 |
| 이번 새 컷 | 구현 방법과 전달 규격만 정리 | AE 제작, 렌더, 이미지 가이드와의 비교, 사용자 승인 |

기존 구현 근거: `C:/Users/User/Documents/Codex/2026-08-06/d/ae-hello-motion-3s/motion-mcp.mjs`와 같은 폴더의 `logs/`. 기존 파일은 읽기 전용으로 확인했습니다.

## 2. 기존 작업과 독립 출력 보존

시작 시 `ae_project_info({})`, `ae_context({})`, `ae_version_info({})`로 현재 파일 경로·dirty 상태·컴포지션·지원 버전을 기록합니다. 기존 컴포지션과 레이어 상태도 대상에 한정해 기록합니다.

현재 프로젝트가 dirty이면 저장되지 않은 메모리 상태를 기존 AEP의 디스크 상태로 대체하면 안 됩니다. 기존 프로젝트를 닫거나 다시 열거나 `project.new`, `project.clear`를 실행하지 않습니다. 별도 파일 보존이 필요하면 **충돌 없는 새 경로로 Save As**하고, 원래 AEP를 덮어쓰지 않습니다. Save As는 활성 프로젝트 경로와 dirty 표시를 바꾸므로 그 사실과 이전 상태를 기록합니다.

새 이름의 컴포지션과 새 AE 출력 폴더를 사용합니다. 폴더에는 AEP, `frames/`, MP4, 요청·응답 로그, 검증 결과를 함께 둡니다. 참조 이미지와 기존 결과를 덮어쓰지 않습니다. 작업 완료 후 기존 레이어 상태를 시작 기록과 비교합니다.

## 3. 명령 호출과 오류 검사

operation은 다음 형식으로 호출합니다. **이 문서의 코드는 실행 예시이며 이번 조사에서 실행하지 않았습니다.**

```js
ae_do({
  operation: "batch.run",
  args: {
    ops: [
      { operation: "comp.create", args: {
        name: "충돌 없는 새 컴포지션 이름",
        width: 2400, height: 1024, fps: 30, duration: 3
      } }
    ],
    stopOnError: true
  }
})
```

- `batch.run`의 기본값은 실패 후에도 계속 실행입니다. `stopOnError:true`를 명시합니다. 이전에 성공한 child를 자동 롤백하는 옵션은 아닙니다.
- 최상위 `isError`, envelope의 `ok`뿐 아니라 `result.failed`, `result.results`의 각 child 오류와 warnings를 검사합니다. 반환된 `structuredContent` 또는 text JSON을 해석한 뒤 재귀적으로 검사합니다. 기존 클라이언트도 이 검사를 수행합니다.
- 모든 `ae_do` 호출은 자동 undo group 하나입니다. batch도 한 그룹이며 수동 `beginUndoGroup/endUndoGroup`을 추가하지 않습니다. Undo/Redo는 배치에 넣지 않고 단독 호출만 가능합니다.
- `eval.run`은 현재 비활성화입니다. 이번 두 컷은 catalog 명령으로 구성하고 임의 eval이나 별도 JSX 실행을 추가하지 않습니다.
- 레이어 추가·이동으로 1-based index가 달라질 수 있습니다. 고유 레이어 이름을 사용하고 구조 변경 뒤 `comp.info`·`layer.info`로 확인합니다. `groupIndex`와 속성 경로도 실제 반환값·트리에서 확인합니다.

## 4. 텍스트와 bounds 기반 정렬

| 목적 | operation과 실제 매개변수 |
|---|---|
| 텍스트 생성 | `layer.create_text`: `comp,name,text`; `boxSize` 생략 시 point text |
| 스타일 지정 | `text.set_style`: `comp,layer,font,fontSize,fillColor,tracking,justification,applyFill,applyStroke,fauxBold,fauxItalic` |
| 폰트 조회 | `font.list`: `familyContains,limit`; `font.info`: `postScriptName` 또는 `family,style` |
| 누락 폰트 조회 | `font.list_missing`: 매개변수 없음 |
| 글자 경계 | `layer.bounds`: `comp,layer,time,includeExtents` |
| 줄·넘침 확인 | `text.measure`: `comp,layer` |
| 위치·앵커·크기 | `transform.set`: `comp,layer,position,anchorPoint,scale,opacity` |
| 레이어 구간 | `layer.set_props`: `comp,layer,props:{inPoint,outPoint}` |

`font`는 PostScript 이름입니다. root의 별도 live 조회에서 `Pretendard-Regular`, `Pretendard-Medium`, `Pretendard-SemiBold`, `Pretendard-Bold`가 확인되었으며, 실제 제작 시 다시 조회하고 최종 모션 지시서의 weight 배정을 적용합니다. 생성 이미지가 특정 설치 폰트의 글자 윤곽과 픽셀 단위로 일치한다고 가정하지 않습니다.

기존 Character 패널 설정이 섞이지 않도록 `applyFill:true`, `applyStroke:false`, `fauxBold:false`, `fauxItalic:false`를 명시하고 반환된 실제 스타일을 확인합니다. 색은 0–1 값, fontSize는 px입니다. `transform.set`의 scale은 백분율입니다.

스타일 적용 후 `layer.bounds`를 조회합니다. 반환된 layer-space 경계가 `{left,top,width,height}`라면 중앙 앵커는 `[left + width/2, top + height/2]`, 좌상단 앵커는 `[left,top]`입니다. 선택한 앵커와 목표 position을 함께 설정합니다. 기존 레이어의 앵커만 바꾸면 화면 위치가 달라질 수 있습니다. 실제 줄바꿈, 글자 잘림, stroke에 의한 경계 증가도 확인합니다.

이번 두 컷에는 글자 윤곽의 직접 변형이 필요하지 않으므로 outline 변환을 추가하지 않습니다. Hello World는 글자 일부를 늘리는 요구 때문에 path 표현식이 필요했던 사례입니다. 윤곽 변형이 별도로 요구될 때만 원본 텍스트를 보존한 뒤 shape를 만듭니다. [Adobe의 텍스트→도형 설명](https://helpx.adobe.com/after-effects/desktop/drawing-painting-and-paths/shapes-and-shape-attributes/creating-shapes-masks.html)

## 5. 곡선·점·선과 매트

| 목적 | operation과 실제 매개변수 |
|---|---|
| 실제 배경 레이어 | `layer.create_solid`: `comp,name,color:[r,g,b]` |
| 빈 도형·그룹 | `layer.create_shape`: `comp,name`; `shape.add_group`: `comp,layer,name` |
| 주황 점 | `shape.add_ellipse`: `comp,layer,groupIndex,size:[지름,지름]` |
| 도형 채우기 | `shape.add_fill`: `comp,layer,groupIndex,color:[r,g,b,a],opacity` |
| 곡선·직선 | `shape.add_path`: `comp,layer,groupIndex,vertices,inTangents,outTangents,closed:false` |
| stroke | `shape.add_stroke`: `comp,layer,groupIndex,color:[r,g,b,a],width` |
| 선 그리기 | `shape.add_trim_paths`: `comp,layer,groupIndex,start,end,offset` |
| 사각형 매트 | `shape.add_rect`: `comp,layer,groupIndex,size,position,roundness` |
| 매트 연결 | `layer.set_track_matte`: `comp,layer,matteLayer,matteType:"alpha"` |

Path·Stroke·Trim Paths를 같은 그룹에 만들고 Trim End를 애니메이션합니다. `shape.add_stroke`에는 line-cap 매개변수가 없습니다. `property.list({comp,layer,property:[...]})`로 실제 stroke 속성을 조회한 뒤 `property.set({comp,layer,property:[...],value})`을 사용합니다. 존재하지 않는 매개변수나 확인하지 않은 enum 값을 추측해서 넣지 않습니다.

매트는 최종 모션 지시서에서 필요한 reveal에만 적용합니다. 현재 catalog는 AE 23 이상에서 매트가 대상 바로 위에 있을 필요가 없다고 명시합니다. [Adobe 트랙 매트 설명](https://helpx.adobe.com/after-effects/using/track-mattes-and-traveling-mattes.html)

## 6. 키프레임과 이징

- `keyframe.set_batch({comp,layer,property,times,values})`: times와 values는 같은 길이. time 단위는 초입니다.
- `keyframe.add({comp,layer,property,time,value})`: 단일 키프레임.
- `keyframe.set_easing({comp,layer,property,keyIndex,preset})`: `linear|ease|easeIn|easeOut|hold`.
- 커스텀 곡선은 preset을 생략하고 `inSpeed,outSpeed,inInfluence,outInfluence`를 지정합니다. preset이 있으면 커스텀 값을 덮습니다.
- `keyframe.set_interpolation({comp,layer,property,keyIndex,inType,outType,temporalContinuous,temporalAutoBezier})`: in/out은 `linear|bezier|hold`.

검증된 transform 경로 형식은 `["ADBE Transform Group","ADBE Position"]`, 같은 그룹의 `ADBE Scale`, `ADBE Opacity`입니다. shape 경로는 생성 후 조회합니다. `keyIndex`는 시간순 1-based이므로 앞쪽에 키를 추가한 뒤 예전 번호를 재사용하지 않습니다.

가속·감속은 구간 길이와 speed/influence를 함께 정하고 중간 프레임·재생으로 확인합니다. preset 이름만으로 목표 속도 곡선을 검증했다고 보고하지 않습니다. [Adobe 속도 곡선 설명](https://helpx.adobe.com/after-effects/desktop/animate-in-after-effects/speed-between-keyframes/speed.html)

## 7. 참조 이미지와 렌더 제외

이미지별로 `project.import_file({path:"절대 경로",name:"REF_CUT_01"})` → 반환 item id로 `layer.create_footage({comp,sourceItemId,name:"REF_CUT_01"})` → `layer.set_guide({comp,layer:"REF_CUT_01",guide:true})` → `layer.set_props({comp,layer:"REF_CUT_01",props:{locked:true}})` 순서입니다. 실제 이미지 경로는 최종 패키지를 확인해 사용합니다.

가이드는 구도·색·타이포 위계를 비교하는 참조입니다. 최종 검수·출력 전 `layer.set_props`로 가이드만 `enabled:false`로 설정합니다. 큐 렌더를 사용하면 Guide Layers가 **All Off**인지 확인합니다. Current Settings는 최상위 컴포지션의 가이드를 렌더할 수 있으므로 `guide:true`만으로 모든 출력 경로에서 제외된다고 단정하지 않습니다. [Adobe 렌더 설정](https://helpx.adobe.com/after-effects/desktop/render-and-export/basics-of-rendering-and-exporting/basics-rendering-exporting.html)

## 8. 90프레임 렌더와 FFmpeg

먼저 가이드가 꺼진 시작·전환·단어 추가·최종 유지 프레임을 확인합니다. 이후 F0–F89를 각각 다음 도구로 새 `frames/` 폴더에 렌더합니다.

```js
ae_render_frame({
  compNameOrId: "새 컴포지션 이름",
  time: frame / 30,
  outPath: "새 출력 폴더/frames/frame-000.png",
  colorManaged: "auto"
})
```

파일명은 `frame-000.png`–`frame-089.png`로 연속 저장합니다. `render.frame` operation은 raw 캡처라 색관리 프로젝트에서 화면과 다를 수 있으므로 위 `ae_render_frame` 도구를 우선합니다. 응답의 `colorPipeline`·`colorWarning`과 실제 PNG를 확인합니다.

기존 Hello World 클라이언트는 파일이 존재하면 렌더를 건너뛰므로, 새 작업은 새 폴더를 사용하고 파일 존재만으로 최신 렌더라고 판정하지 않습니다. 90개 파일의 연속 번호·읽기 가능 여부·2400×1024 크기를 확인한 뒤 인코딩합니다.

아래 PowerShell은 **향후 실행 예시**입니다. `$aeOutput`은 실제 새 출력 폴더로 지정해야 합니다. `-n`으로 기존 MP4 덮어쓰기를 방지하며, 리사이즈·크롭 필터를 사용하지 않습니다. [FFmpeg 옵션](https://ffmpeg.org/ffmpeg.html), [image2 입력](https://ffmpeg.org/ffmpeg-formats.html#image2-1)

```powershell
$aeOutput = '<충돌 없는 새 AE 출력 폴더의 절대 경로>'
$aeFrames = Join-Path $aeOutput 'frames/frame-%03d.png'
$aeVideo = Join-Path $aeOutput 'titan-two-cuts.mp4'
ffmpeg -n -hide_banner -framerate 30 -start_number 0 -i $aeFrames -frames:v 90 -c:v libx264 -crf 18 -pix_fmt yuv420p -r 30 -an -movflags +faststart $aeVideo
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=width,height,r_frame_rate,avg_frame_rate,nb_read_frames:format=duration -of json $aeVideo
ffmpeg -v error -i $aeVideo -f null -
```

각 명령의 종료 코드를 확인합니다. probe 기대값은 2400×1024, 30/1 fps, 90프레임, 3초입니다. 전체 디코딩과 별도로 실제 MP4 재생에서 가독성·단어 유지·잔상·전환·색을 확인합니다. [ffprobe 검증 옵션](https://ffmpeg.org/ffprobe.html)

`render.start`는 기존 큐 전체를 실행하므로 이 경로에서는 사용하지 않습니다. 큐 출력이 별도로 필요하면 `render.add_to_queue({comp,outputPath})`, `render.list_templates({})`, `render.set_output({queueIndex,renderTemplate,outputTemplate,outputPath,timeSpanStart:0,timeSpanDuration:3,skipFrames:0})`로 실제 템플릿·대상 큐를 확인해야 합니다. 기존 큐를 비우거나 기존 항목 설정을 임의 변경하지 않습니다.

완료 보고에서는 네이티브 레이어 검증, PNG 시각 검수, MP4 probe·디코딩·재생, 별도 AEP 저장, 기존 작업 보존을 각각 구분합니다. 이번 문서 작성은 이 제작·검증 단계의 완료를 의미하지 않습니다.
