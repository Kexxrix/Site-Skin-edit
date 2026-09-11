# TITAN v003 — 기기 배경·타이포 모션 제작 결과

2026-09-11, After Effects 25.4x86. [v3 실행 지시서](../device-background-motion-instructions-v3.md)를 기준으로 제작·렌더·기술/시각 검토를 완료했습니다. **사용자 미감 승인이나 사이트 채택 완료를 의미하지 않습니다.**

### Changed files

새 출력 폴더 안에만 생성·수정했습니다.

- [편집 가능한 AEP](TITAN-TwoCuts-Devices-Kinetic-3s-v003.aep): 기존 프로젝트를 Save As하고 타이탄 원본 컴포지션을 복제한 v003.
- [최종 MP4](TITAN-TwoCuts-Devices-Kinetic-3s-v003.mp4): 2400×1024, 30fps, 3.000초, 90프레임, H.264/yuv420p, 무음.
- 정착 PNG: [F18 — Meet TITAN + iPhone](frames-final/F018.png), [F75 — Built in-house + iPad](frames-final/F075.png).
- 주요 동작: [F05](frames-final/F005.png), [F09](frames-final/F009.png), [F14](frames-final/F014.png), [F28](frames-final/F028.png), [F33](frames-final/F033.png), [F34](frames-final/F034.png), [F45](frames-final/F045.png), [F49](frames-final/F049.png), [F54](frames-final/F054.png), [F57](frames-final/F057.png), [F64](frames-final/F064.png).
- [최종 90프레임 원본](render-frames-v02/), [선별 PNG 16개](frames-final/), [manifest](manifest.json), [검증 결과](qa/verification.json), [재현 가능한 검사 스크립트](qa/verify.cjs).

최종본은 **render-frames-v02 / frames-final / 위 MP4**입니다. 초기 render-frames / frames 및 [보정 전 검토 영상](qa/motion-r01-before-built-pivot-fix.mp4)은 작업 이력으로 보존했으며 최종본이 아닙니다.

### What changed

- 첫 컷 오른쪽에 네이티브 iPhone GLB, 둘째 컷 오른쪽에 네이티브 iPad GLB를 합성했습니다. 제공된 회색 SCREEN 재질을 유지했고 스튜디오 PNG를 영상 배경으로 사용하지 않았습니다.
- 마스터는 Classic 3D 그대로, 기기 전용 두 컴포지션만 Advanced 3D입니다. 각 기기는 ThreeDModelLayer + 3D 제어 Null + 고정 카메라 + 환경광 구조이며, 마스터에서는 Collapse Transformations off인 2D AV 레이어로 합성했습니다.
- TITAN: F03–F14 대각선 진입, 90→104→100% 균일 스케일, −6→+0.8→0° 회전. Built: F43–F54 이동 및 88→106→100% 균일 스케일, 회전 없음.
- Meet/Core의 짧은 진입, 원호·점 F14 완성, 밑줄 F46–F54, in-house F55–F64의 오른쪽 진입을 맞췄습니다. 위치는 cubic-out을 사용하며 단어 전체가 함께 움직입니다.
- Built/in-house만 짧은 Directional Blur를 적용했습니다. Built는 14→10→0px(F43/F45/F49), in-house는 14→9→0px(F55/F57/F61)입니다. 정착 화면에는 블러가 없습니다.
- TITAN은 중심 앵커로 바꾸고 position을 보정했습니다. Built는 중심 앵커에서 미세한 정착 래스터 차이가 발견되어 **기존 기준선 앵커로 복구**했습니다. 확대·이동 동작은 유지했습니다. [보정 근거와 최종 키](qa/built-pivot-fix.json)

| 실제 최종 배치 | iPhone | iPad |
|---|---:|---:|
| 마스터 AV position | 2080, 512 | 2296, 512 |
| 모델 기본 균일 scale | 100% | 66% |
| 전면 축 보정 | 모델 X rotation +90° | 모델 X rotation +90° |
| 제어 Null 최종 yaw / roll | −10° / +3° | −18° / −3° |
| 전체 투영 크기 | 400×782px | 833×648px |
| 마스터의 왼쪽 경계 | x=1879 | x=1864 |
| 최종 문구와 간격 | 약 244px | 약 122px |

카메라는 두 컴포지션 모두 position [0,0,−333.3333435], point of interest [0,0,0], zoom 3333.33333325, DOF off이며 애니메이션이 없습니다. 환경광 intensity 100, background visible off입니다. 기기 이동은 3D 제어 Null의 XYZ/회전/균일 스케일 키로 구현했습니다. [실제 카메라·조명 조회](qa/camera-environment-final.json), [모션 명령 기록](qa/motion-implementation.json)

iPad는 오른쪽으로 크롭되지만 알파 면적 기준 약 **65.6%**가 화면 안에 남습니다. in-house 진입 F55–F64에서는 글자 오른쪽 경계에 블러 길이 전체를 여유로 더해 계산해도 최소 **71.6px**를 확보했습니다. F55 왼쪽 경계를 x=1948로 두어 지시서의 약 x=1930보다 여유 있게 조정했습니다. 실제 마지막 이동은 투영 경계 기준 1948−1864=84px입니다.

### Verification

| 확인 항목 | 결과 |
|---|---|
| 속성·키·중간 감속 값 | 119/119 통과, 최대 수치 오차 0.002649 |
| PNG 원본 | 90/90 디코딩, 전부 2400×1024·완전 불투명 |
| F00 / F33 | 각각 아이보리 #F5F3EE / 차콜 #24262A 단색 |
| 첫 컷 정착 | F14–F24 픽셀 동일 |
| 둘째 컷 정착 | F64–F89 픽셀 동일, 89−64+1=26프레임, 26÷30≈0.867초 |
| 기존 정착 타이포·도형 보존 | v002 대비 F18/F75의 x=0–1799, y=0–1023 영역 변경 픽셀 0 |
| 원본 보존 | 파일 7개 SHA-256 동일, 기존 프로젝트 항목 12개 전체 JSON 동일 |
| MP4 | 3초·30fps·90프레임·75:32·정사각 픽셀·무음, 전체 디코딩 오류 0 |
| 실제 재생 | 최종본 재생 중 0.184624초, 전환 0.962236초, 종료 3초 관찰; 브라우저 경고/오류 없음 |

[속성 검사](qa/property-tests-final.json), [전체 검사](qa/verification.json), [원본 상태](qa/session-start.json), [최종 AE 스냅샷](qa/project-after.json), [재생 기록](qa/playback.json)

새 AEP를 저장한 뒤 별도 aerender 프로세스로 대상 컴포지션만 렌더했습니다. 대화형 AE의 렌더 큐는 비어 있으며 기존 큐를 실행하지 않았습니다. 최종 stdout에는 F88까지만 기록되고 완료 문구가 빠졌으므로, 로그 문구만으로 완료를 판단하지 않았습니다. 종료 코드 0, 새 폴더의 실제 F00–F89 파일, 모든 프레임·MP4 전체 디코딩을 함께 확인했습니다. [렌더 출처·명령](qa/background-render.json)

시각 검토에서는 iPhone의 회색 화면·다이내믹 아일랜드·테두리와 iPad의 회색 화면·좌측 베젤·금속 윤곽을 확인했습니다. 원호·점·밑줄, 차콜 와이프, 주요 진입 및 정착 프레임을 확인했고, 이전 v002 재생과 비교해 TITAN의 대각선/회전 액션과 Built의 확대 진입이 강화된 것으로 판단했습니다. 이는 담당자의 시각 검토이며 사용자 승인과 구분합니다.

| 핵심 산출물 | bytes | SHA-256 |
|---|---:|---|
| AEP | 1050460 | 4a9dc134c061b0d64eebddefb0e2b36b45750abeeb1dc6851e541d01ac585b1a |
| MP4 | 195745 | 4805902bab7d12460cda2066c9ec7e9984b910e0c2fda6bfa63de8965da78c0c |
| F18 PNG | 110808 | ab3a3ad956e7d61b2eb61a3611d15ae4e518ebd1bdb83d670793d0ce2aaa9402 |
| F75 PNG | 103794 | 655b8e6f8bf56fb0d0d68fbeb39216d597c26528450b79b8afb6b6204bd0eb22 |

### Not changed

원본 v002 AEP, Hello World 두 컴포지션, 타이탄 원본, 사용자의 별도 iPhone 테스트, 두 GLB·Blender 파일과 이미지 가이드를 보존했습니다. 폰트·문구·정착 크기·기준선·45px 단어 간격·색상도 보존했습니다.

스크린 UI 매핑, 모델 수정·재생성, Blender 작업, 다른 컷, 오디오, 루프 연결, 사이트 코드·배포는 수행하지 않았습니다. eval.run도 활성화하지 않았습니다. Creative Production의 원본 보존·정확한 문구·결정적 내보내기 규칙을 적용하되, 이번 지시대로 이미지 생성 대신 네이티브 AE로 제작했습니다.

### Remaining risks

- AEP는 원래 GLB/가이드 파일 경로를 참조합니다. 다른 PC로 옮길 경우 소스 재연결과 Pretendard 폰트가 필요합니다. 수집된 독립 배포용 프로젝트는 아닙니다.
- 네이티브 3D는 이번 After Effects 25.4x86 환경에서 검증했습니다. 다른 버전의 동일 렌더는 검증하지 않았습니다.
- 초기 카메라/모델 스케일에서는 회색 화면에 삼각형 형태의 렌더 아티팩트가 있었습니다. 모델 파일을 고치지 않고 AE 안의 장면 원점·카메라 거리·스케일을 조정해 해결했습니다. 깊이 정밀도가 원인인지는 확정하지 않았습니다.
- Advanced 3D 카메라의 DOF 설정 명령은 지원되지 않았으나, 실제 조회 값이 이미 off(0)여서 이를 유지했습니다. 최종 기기와 정착 글자는 선명합니다.
- 최종 납품 범위에서 추가 시각·기술 결함은 찾지 못했습니다. 사용자 미감 승인과 사이트 채택은 아직 수행되지 않았습니다.

