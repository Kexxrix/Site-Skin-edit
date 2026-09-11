# Hello World — Stretch / Accelerating Zoom

- 편집 파일: `Hello-World-Stretch-3s.aep`
- 영상: `Hello-World-Stretch-3s.mp4`
- 작업 컴포지션: `Hello_World_Stretch_3s`
- 규격: 1920×1080, 30fps, 3초 / 90프레임. 오디오 없음.

## 모션

- 0–1초: 100%에서 112%로 완만하게 확대.
- 1–1.7초: 글자별 벡터 경로의 위 또는 아래 부분을 늘리며 확대 가속.
- 마지막 4프레임에 짧게 투명도를 낮춰 퇴장 마무리.
- 1.7–3초: 중앙이 약간 밝은 회색 배경만 유지.

## 편집 및 보존

`Hello World - Source Outlines`의 Scale, Opacity, 글자별 Path에 표현식이 적용되어 있습니다. 베이크된 영상이나 단순 세로 스케일이 아니라 편집 가능한 벡터 경로 애니메이션입니다. 글꼴과 문구는 기존 결과를 유지했습니다.

기존 5초 컴포지션 `Codex_Hello_World_1920x1080`과 원본 텍스트는 보존했습니다. 기존 AEP 파일을 덮어쓰지 않고 새 AEP로 저장했습니다. 작업 시작 전에 존재한 미사용 회색 솔리드도 그대로 두었습니다.

배경은 AE 기본 Gradient Ramp의 방사형 그라디언트이며, Ramp Scatter 32로 8비트 배경의 밴딩을 완화했습니다. 새로운 외부 효과 플러그인이나 외부 미디어 파일이 필요하지 않습니다.

## 검증 자료

- `verification.json`: 원본 레이어 상태 비교, 컴포지션 규격, 확대율·투명도 값, 글자 10개의 경로 변형 검사.
- `animation-spec.json`: 적용한 모션 수치와 MCP 작업 기록.
- `frames/`: AE에서 렌더링한 최종 90프레임 PNG 시퀀스.
- `preview/`: 중간 시각 검토용 이미지. 최종 배경은 `frames/`와 영상 기준입니다.
- `motion-mcp.mjs`, `logs/`: 재현·검증용 MCP 클라이언트와 요청/응답 기록. AE 임의 스크립트 실행 옵션은 활성화하지 않았습니다.
