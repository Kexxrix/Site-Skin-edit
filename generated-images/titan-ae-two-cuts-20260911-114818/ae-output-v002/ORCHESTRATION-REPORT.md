# TITAN 첫 두 컷 — 오케스트레이션 전달 보고서

- 작성일: 2026-09-11. 파일 무결성 재확인 시작: 2026-09-11T12:48:51+09:00.
- 작성 목적: 오케스트레이션 스레드가 구현 결과, 실제 영상·AEP, 근거 기록과 남은 판단을 한 문서에서 확인하도록 전달합니다.
- 제작 스레드: 애프터이팩트 모션그래픽 작업 / ID `01a08e67-bb59-7c63-a4ec-e879119b7530`.
- 전달 방식: 동일 PC에서 읽을 수 있는 로컬 Markdown 보고서입니다. 특정 수신 스레드에 메시지를 자동 발송하지 않았습니다.

## 1. 결론과 채택 경계

**기술 검증 통과. 검토 대상은 ae-output-v002의 파일입니다. 사용자 미감 승인·사이트 채택은 아직 아닙니다.**

첫 두 컷만 구현했습니다: `Meet TITAN` → 차콜 와이프 → `Core systems` → `Built` → `in-house` 추가 및 마지막 문구 유지.
전체 콘티, 제품 컷, 오디오, 사이트 코드 반영, 배포는 진행하지 않았습니다.

v001에는 렌더 도중 밑줄이 사라진 결과가 포함되어 있습니다. **v001 MP4나 프레임을 최종 결과로 채택하지 마세요.**
v001의 구현·실패 로그는 추적용으로 보존했고, 누락된 밑줄을 복구하여 v002에서 전체 90프레임을 다시 렌더했습니다.

## 2. 즉시 확인할 파일

공통 루트:

```text
E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002
```

| 구분 | 파일 | 바이트 | 상태 |
|---|---|---:|---|
| 검토 영상 | [TITAN-TwoCuts-3s-v002.mp4](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/TITAN-TwoCuts-3s-v002.mp4) | 78,821 | 메타데이터·전체 디코딩·이전 재생 검수 통과 |
| 편집 가능한 AE 프로젝트 | [TITAN-TwoCuts-3s-v002.aep](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/TITAN-TwoCuts-3s-v002.aep) | 543,077 | 저장 파일에서 별도 aerender로 렌더 성공 |
| 컷 01 비교용 정착 화면 | [compare-F18-meet-titan.png](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/compare-F18-meet-titan.png) | 51,845 | 2400×1024, F18의 무변형 복사 |
| 컷 02 비교용 정착 화면 | [compare-F75-built-in-house.png](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/compare-F75-built-in-house.png) | 54,811 | 2400×1024, F75의 무변형 복사 |
| 구현·검증 개요 | [README.md](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/README.md) | — | 타임라인·복구·주의사항 |
| 기계 판독용 결과 목록 | [manifest.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/manifest.json) | — | 파일 크기·SHA-256·검증 요약 |
| 이번 보고서 작성 시 재검증 | [orchestration-report-audit.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/orchestration-report-audit.json) | — | 파일 무결성, 기존 QA 읽기, 프레임 검사 및 디코딩 재확인 |

AEP 안에서 열 대상 컴포지션은 **`TITAN_TwoCuts_75x32_3s_v001`**입니다.
파일/출력 폴더는 v002지만 기존 대상 컴포지션 이름은 유지했습니다. 별도의 v002 컴포지션이 있다는 뜻이 아닙니다.
AEP에는 보존한 기존 Hello World 컴포지션도 포함됩니다. 파일 전체를 새로 초기화한 독립 프로젝트는 아닙니다.

주요 저장본의 SHA-256:

```text
AEP  aba719d9c019852dd25fb6b9b8bfcc4ec2cd2fbffab86a82c7e9a0345d94cf74
MP4  81582752c0dd79bea2fcc33d10a9ddfff4ab2ad838d118ab830e6d8e0f67d371
F18  5df92015f47597c9e6f3c1d9203fd8ae6ee6725c6ac71259f58f47cdf37b2383
F75  fe4e14d9a73c6d73ddc9f43c09e26f4f45ba0707acb5e9d010877c48d25bdd63
```

## 3. 구현 기준과 실제 구성

우선순위는 [motion-instructions.md](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/motion-instructions.md)의 문구·폰트·색·타이밍이 이미지 가이드보다 높습니다.
[mcp-implementation-notes.md](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/mcp-implementation-notes.md)는 명령 사용과 보존 절차의 기준입니다.

- 2400×1024, 정사각 픽셀, 30fps, 3.000초, F00–F89.
- 계산: 3초 × 30프레임/초 = 90프레임. 마지막 샘플은 89÷30 = 2.9666667초, outPoint는 3.0초.
- 비율: 2400÷1024 = 75÷32 = 2.34375. MP4 SAR 1:1, DAR 75:32.
- 네이티브 Text 5개 + Shape 3개(원호·점·밑줄) + Solid 2개 + 비활성 참조 2개 = 총 12레이어.
- 색상: 아이보리 #F5F3EE / 차콜 #24262A / 주황 #FA871F.
- 참조 2개는 잠긴 Guide Layer이며 enabled=false. 최종 렌더 설정도 Guide Layers All Off.
- 3D·카메라·모션 블러·오디오·루프 연결 없음. 글자를 래스터 이미지로 대체하지 않음.
- `eval.run`을 활성화하지 않고 허용된 MCP 명령으로 구현. 원호 위 점 이동에만 해당 위치 속성의 expression 사용.

| 정확한 문구 | 실제 폰트 | 보이는 높이 목표 | 정착 기준선 |
|---|---|---:|---:|
| Meet | Pretendard-Regular | 100px | y=560 |
| TITAN | Pretendard-SemiBold | 136px | y=560 |
| Core systems | Pretendard-Medium | 112px | y=440 |
| Built | Pretendard-Bold | 145px | y=630 |
| in-house | Pretendard-Medium | 122px | y=630 |

`in-house`는 일반 하이픈 U+002D입니다. 실제 fontSize는 위의 보이는 경계 높이와 다르며 [text-layout.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/text-layout.json)에 기록되어 있습니다.
Meet–TITAN 및 Built–in-house 사이 간격은 실제 글자 경계 기준 45px입니다.
둘째 컷 아랫줄 실제 폭 약 1072.45px는 지시 범위 1050–1150px 안입니다.
밑줄 길이는 문서가 허용한 실제 Built 폭에 맞춰 약 388.27px로 설정했습니다.

| 프레임 | 동작 |
|---|---|
| F00–F14 | Meet·TITAN·원호·점 진입 및 정착 |
| F14–F23 | 첫 컷 유지 / F18 비교 |
| F24–F33 | 차콜 Solid가 왼쪽에서 전 화면을 덮음 |
| F34–F40 | Core systems 진입 |
| F43–F49 | Built 진입 |
| F46–F55 | 밑줄 전개 |
| F55–F61 | in-house 진입 |
| F61–F89 | 완성 문구·밑줄 유지 / F75 비교 |

텍스트 위치·Trim End는 cubic-out, 와이프는 smoothstep, opacity는 선형입니다.
상세 시작·끝 프레임과 각 속성의 원래 지시는 motion-instructions.md를 따릅니다.

## 4. 구현 기록으로 가는 경로

| 확인 목적 | 근거 파일 |
|---|---|
| 최초 구성 생성 | [v001 construction-operations.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/qa/construction-operations.json) |
| 최초 키프레임·표현식 설정 | [v001 animation-operations.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/qa/animation-operations.json) |
| 구현 중 outPoint 교정 기록 | [v001 qa-repair.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/qa/qa-repair.json) |
| 밑줄 소실 검출 당시 | [v001 interruption-status.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v001/qa/interruption-status.json) |
| 복구 범위·실행 | [recovery-session.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/recovery-session.json), [recovery-operations.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/recovery-operations.json) |
| 원래 프로젝트와 복구 후 상태 | [project-before.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/project-before.json), [project-after.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/project-after.json) |
| 설치 폰트·실측 레이아웃 | [fonts.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/fonts.json), [text-layout.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/text-layout.json) |
| 저장 AEP 기반 최종 렌더 | [background-render.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/background-render.json), [성공 stdout](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/aerender-retry-stdout.log), [성공 stderr](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/aerender-retry-stderr.log) |

v001 로그는 구현 이력으로만 참고합니다. 최종 미디어의 품질 판정은 v002 렌더·검증 자료를 사용해야 합니다.
전체 프레임은 `E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/frames/frame-000.png`부터 `frame-089.png`까지입니다.

## 5. 검증 결과와 근거 범위

| 검사 | 확인 결과 | 근거 |
|---|---|---|
| 파일 무결성 | 주요 결과 4개 크기·SHA-256이 manifest와 일치 | 이번 report-audit |
| 규격·프레임 | 90/90 PNG가 2400×1024, 완전 불투명 | [verification.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/verification.json) 및 이번 읽기 전용 재검증 |
| 문구·레이어·폰트 | 정확한 Text 5개, Shape 3개, 참조 비활성 상태 | 저장 project-after 및 검증 스크립트 |
| 키프레임 샘플 | 기록된 67/67 검사 통과, 최대 오차 약 0.004978 | [property-tests.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/property-tests.json) |
| 전환 경계 | F00 아이보리 단색, F33 차콜 단색, 와이프 진행 위치 검사 통과 | 프레임 픽셀 검사 |
| 첫 컷 유지 | F14–F24 전체 픽셀 해시 동일 | 이번 전체 프레임 해시 비교 |
| 둘째 컷 유지 | F61–F89 전체 픽셀 해시 동일, 밑줄 포함 | 프레임 검사 및 F75/F89 육안 확인 기록 |
| 최종 렌더 | 별도 Adobe aerender 프로세스, 90장, 종료 코드 0, 성공 로그 오류·경고 없음 | background-render 및 성공 로그 |
| MP4 | H.264 / yuv420p, 2400×1024, 30/1fps, 3.000000초, 90프레임, 무음 | [media-probe.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/media-probe.json) 및 이번 ffprobe 재확인 |
| 전체 디코딩 | ffmpeg 종료 코드 0, 오류 출력 없음 | manifest 및 이번 재실행 |
| 실제 브라우저 재생 | 재생 중 0.200639초 확인, 3초 정상 종료, 시작·끝 화면 및 밑줄 확인, 콘솔 경고·오류 없음 | [playback.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/playback.json) |
| 보존 | 기존 프로젝트 항목 5개와 원본 AEP·가이드 2장 보존 확인 | before/after 비교 및 원본 해시 재검증 |

검증 범위를 구분합니다.

- 이번 보고서 작성 시 다시 수행: 파일 크기·해시, 기록 파일 읽기/JSON 파싱, 90프레임·저장 프로젝트 스냅샷 검사, ffprobe, 전체 디코딩.
- 제작·최종 검수 때 수행하고 이번에는 기록으로 확인: AE 라이브 속성 67개 조회, 가이드 대비 정착·경계 프레임 육안 비교, 브라우저 실제 재생.
- 이번 보고서 작성에서는 AE를 열거나 조작하거나 다시 저장하지 않았고, 영상을 새로 렌더하지 않았습니다.
- 브라우저 검수는 연속 재생의 시작·종료 상태와 해당 화면을 관찰한 것입니다. 모든 프레임을 실시간 화면으로 따로 관찰했다는 뜻은 아닙니다. 중간 동작은 렌더 프레임·속성 검사로 보완했습니다.
- 기술 검증 통과는 사용자 취향 승인이나 상업적 채택의 증거가 아닙니다.

## 6. 실패·복구와 주의사항

1. v001 대화형 프레임 렌더 중 `C02_UNDERLINE`이 사라져 F66/F67 사이 결과가 달라졌습니다. 사용자는 직접 수정하지 않았다고 설명했습니다.
2. PC 동시 사용 중 입력 충돌 가능성이 제기됐지만 확정 원인은 아닙니다. 사용자 또는 다른 스레드의 조작으로 단정하지 않습니다.
3. 누락된 밑줄만 복구했습니다. 다른 레이어·기존 Hello World·원본 가이드는 유지했습니다.
4. 충돌 없는 v002 AEP를 저장하고 대화형 AE를 재사용하지 않는 별도 aerender에서 전체 90프레임을 렌더했습니다. `-reuse`를 쓰지 않았고 종료 정책은 `DO_NOT_SAVE_CHANGES`였습니다.
5. 최초 출력 모듈 이름 오류는 0프레임 실패 시도입니다. 최종 성공은 실제 설치 템플릿 `PNG Image`의 PNG Sequence 출력입니다. 실패 로그와 성공 로그를 섞어 판정하지 않습니다.

마지막 제작 검수 당시 대화형 AE는 v002 AEP 경로, dirty=true, 선택 레이어 0, 대상 레이어 12, 큐 0이었습니다.
이 상태는 [live-delivery.json](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/qa/live-delivery.json)의 **당시 스냅샷**이지 현재 상태를 다시 조회한 결과가 아닙니다.
후속 스레드는 AEP를 여는 등의 조작 전에 현재 dirty 상태를 읽기 전용으로 확인하고, 저장되지 않은 편집을 덮거나 버리지 않아야 합니다.
이번에 검증한 영상은 현재 메모리 상태가 아니라 위 해시의 저장 AEP에서 렌더한 결과입니다.

추가 제한:

- AEP의 비활성 가이드는 원래 results 폴더를 참조합니다. 다른 PC로 옮겨 편집할 때 원본 가이드와 Pretendard 폰트가 필요할 수 있습니다. 패키징/Collect Files는 수행하지 않았습니다.
- H.264는 손실 압축이며 bt709 행렬만 확인됩니다. 명시적인 primaries/transfer 태그는 확인되지 않아 모든 플레이어에서 RGB 색이 완전히 같다고 보장하지 않습니다.
- 원본 가이드·Hello World·v001의 삭제·이동·덮어쓰기, 전체 기존 렌더 큐 실행, 사이트 적용은 하지 않았습니다.
- 로컬 파일 경로는 같은 PC에서 접근할 수 있습니다. 원격/클라우드 스레드가 같은 디스크에 접근할 수 있다고 확인한 것은 아닙니다.

## 7. 오케스트레이션 스레드의 확인 순서

1. 이 보고서의 v002 MP4·AEP 경로와 SHA-256을 기준으로 대상을 고정합니다.
2. manifest.json과 qa/verification.json을 읽어 규격·문구·레이어·프레임 유지 검사 결과를 확인합니다.
3. MP4를 재생하고 F18/F75를 원본 [컷 01 가이드](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/results/01-meet-titan.png) 및 [컷 02 가이드](E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/results/02-built-in-house.png)와 비교합니다. 폰트·색·타이밍은 motion-instructions.md 우선입니다.
4. 속성이나 복구 원인을 더 확인할 때만 큰 project JSON과 operation 로그를 엽니다.
5. 기술 검토 결과와 사용자 미감 승인 여부를 분리해서 기록합니다. 후속 수정·사이트 적용·추가 컷은 별도 사용자 지시가 필요합니다.

### 읽기 전용 재검증 명령 — PowerShell

`verify.mjs`는 저장된 프로젝트 JSON·검사 기록·PNG·AEP 해시를 읽고 결과를 stdout으로 출력합니다. 라이브 AE를 조작하거나 새로 렌더하지 않습니다. AE 속성 67개를 재조회하는 명령은 아닙니다.

```powershell
$titanOutput = 'E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002'
& 'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' "$titanOutput/qa/verify.mjs"
ffprobe -v error -count_frames -show_entries stream=codec_name,codec_type,width,height,pix_fmt,sample_aspect_ratio,display_aspect_ratio,r_frame_rate,avg_frame_rate,duration,nb_frames,nb_read_frames -show_entries format=duration,size -of json "$titanOutput/TITAN-TwoCuts-3s-v002.mp4"
ffmpeg -v error -i "$titanOutput/TITAN-TwoCuts-3s-v002.mp4" -f null -
Get-FileHash -LiteralPath "$titanOutput/TITAN-TwoCuts-3s-v002.aep","$titanOutput/TITAN-TwoCuts-3s-v002.mp4" -Algorithm SHA256
```

Node 및 sharp 경로는 이 PC의 번들 런타임 기준입니다. 다른 환경에서는 해당 의존성 경로를 확인해야 합니다.

## 8. 전달용 한 문단

> TITAN 첫 두 컷 AE 구현 결과를 검토해주세요. 보고서는 `E:/codexwork/Site-Skin-edit/generated-images/titan-ae-two-cuts-20260911-114818/ae-output-v002/ORCHESTRATION-REPORT.md`입니다. 같은 폴더의 v002 MP4·AEP·F18/F75 PNG 및 manifest/qa 기록을 함께 확인해주세요. 기술 검증은 통과했으나 사용자 미감 승인은 미확정입니다. v001 미디어는 채택하지 말고, 검토 중에는 원본·AE 프로젝트·사이트를 변경하지 마세요.

