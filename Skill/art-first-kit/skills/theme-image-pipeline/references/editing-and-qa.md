# 투명 처리·지각적 크롭·크기 조절

## 편집 분기

- `manual`: 사용자가 직접 편집한다고 선택한 경우 원본, 남길 대상/제거할 영역, 저장 경로를 전달하고 `awaiting_user_edit`로 기록한다. 같은 에셋에 경쟁하는 자동 편집을 시작하지 않는다. 반환 파일을 실제로 검수한다.
- `agent`: 사용자가 편집을 맡기거나 에셋 완성까지 위임한 경우 수행한다. 내장 생성 편집, 사용 가능한 분할/마스크 도구, 아래 로컬 스크립트 중 목적에 맞는 방법을 쓴다. 새로운 대형 모델 설치는 패키지 실행의 전제 조건이 아니다.

현재 사용자의 작업 지시와 이미 위임된 범위를 따른다. 사용자가 PC 앞에 있다는 이유로 수동으로 바꾸거나, 자동 모드를 골랐다는 이유로 스케줄러·감시 작업을 생성하지 않는다.

원경 제거와 바깥 여백 크롭은 서로 다른 작업이다. 예를 들어 “인물과 누운 의자·침대·천을 남긴다”면 인물만 남기는 마스크는 실패다. 검은 의상·흑요석과 배경을 혼동하지 않는다.

## 지각적 크롭

`alpha > 0`의 외곽만 자르면 희미한 잔여 픽셀 때문에 빈 영역이 남는다. 반대로 임의의 높은 임계값은 얇은 장식·머리카락을 잘라낼 수 있다. 먼저 이미지를 보고 실제 사용 외곽을 판단한다.

1. 실제 알파 유무와 여러 임계값의 후보 bbox를 읽고 밝은/어두운/체커 배경에서 확인한다.
2. 단순한 바깥 여백이면 실제로 확인한 `--crop` 좌표로 새 파일을 만든다. 알파 임계값이 목적에 맞을 때만 `--trim-alpha`를 사용한다. 이 옵션은 경계만 정하며 내부의 불필요한 배경을 지우지 않는다.
3. 내부 구멍·원경·붙어 있는 잔여 배경은 검수한 마스크를 사용한다. 패키지는 모든 이미지의 의미적 배경을 자동 인식하는 분할 모델을 포함하지 않는다.
4. 결과를 다시 보고 외곽 잔여물, 잘림, 필요한 오브젝트 보존을 확인한다. 낮은 알파 수치라는 이유만으로 불필요한 부분이라고 판정하지 않는다.

Python 3.10 이상과 Pillow가 필요하다. 기존 환경을 우선 사용하고 없을 때만 `python -m pip install Pillow`로 설치한다.

```text
python "<skill-dir>/scripts/prepare_asset.py" "<source>" --proof "<run>/qa/source-proof.png" --report "<run>/qa/source.json"
python "<skill-dir>/scripts/prepare_asset.py" "<source>" --crop LEFT TOP RIGHT BOTTOM --out "<run>/derived/trimmed.png" --proof "<run>/qa/trimmed-proof.png" --report "<run>/qa/trimmed.json"
python "<skill-dir>/scripts/prepare_asset.py" "<source>" --mask "<reviewed-mask>" --out "<run>/derived/cutout.png" --proof "<run>/qa/cutout-proof.png"
```

마스크는 원본과 같은 크기의 grayscale이며 흰색은 보존, 검정은 제거다. 기존 알파와 곱하며 원본 RGB는 재생성하지 않는다. 크롭 좌표는 Pillow의 `[left, top, right, bottom)` 기준이다. 출력 파일이 있으면 거부한다. 이미지 편집 권한이 없는 분석 요청에서는 첫 번째 읽기/QA 작업만 수행한다.

내장 생성기로 배경을 제거하면 보존 대상의 얼굴·의상·장식도 바뀔 수 있다. 원본과 비교하고 픽셀을 보존했다고 잘못 보고하지 않는다. 이미지별 마스크를 일반적인 고정 좌표 규칙으로 저장하지 않는다.

## 가로 패널 3슬라이스

기존 검증된 패널 도구를 포함했다. 좌우 끝은 원형 비율을 보존하고 가운데만 수평 늘림/줄임한다.

```text
python "<skill-dir>/scripts/slice_panel.py" "<trimmed-panel>" --out-dir "<new-output-directory>" --left LEFT_CAP_PIXELS --right RIGHT_CAP_PIXELS --width TARGET_WIDTH --height TARGET_HEIGHT
```

출력: `panel-sizer.html` 독립 조절 앱, 원본 사본, 좌/중/우 PNG, 지정 크기의 PNG, CSS 예제와 `slices.json`. HTML은 서버·API 없이 동작하고 새 PNG/WebP 불러오기, 4:1/5:1 선택과 PNG 저장을 지원한다.

양 끝 보존 폭은 이미지마다 직접 확인한다. 기본 예시의 숫자를 다른 디자인에 복사하지 않는다. 출력 높이가 H, 원본 높이가 h이면 양 끝 폭을 각각 H/h 배율로 유지한다. 목표 폭이 양 끝 합보다 작으면 거부한다. 가운데 텍스처는 수평 변형되므로 절단면·무늬 압축은 육안 검수한다. **9슬라이스는 포함되지 않았다.**

## 기록과 전달

각 에셋 기록에 `id`, `role`, `parent_ids`, 첨부 순서/경로/해시, 프롬프트 경로, 원본과 후처리본 경로/해시, 생성 도구, 실제 크기/비율/알파, 검수 항목별 관찰, 선택 주체, 다음 작업을 남긴다. 파일 검사 성공과 시각적 채택은 별개다.

예:
```json
{
  "id": "gnb-panel-v001",
  "role": "gnb-panel",
  "parent_ids": ["main-logo-v001"],
  "references": [{"id": "main-logo-v001", "inherits": ["material", "light"], "excludes": ["lettering"]}],
  "prompt_path": "prompts/gnb-panel-v001.txt",
  "original_path": "results/gnb-panel-v001.png",
  "derived_path": null,
  "status": "generated",
  "checks": {},
  "selection": {"by": null, "evidence": null},
  "next_action": "inspect at actual UI size"
}
```

중단 후에는 실제 파일과 마지막 상태를 대조하고 미완료 작업부터 계속한다. 파일이 없는데 프롬프트 로그만 있는 경우 생성 완료로 복구하지 않는다. 요청 수·생성 수·실패·건너뜀·검수 통과·선택·사용자 승인 수를 구분한다.
