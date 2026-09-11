# TITAN SOLUTION — Grok 시작 프레임 4개

각 행의 **시작 이미지 PNG를 Grok Imagine에 첨부**하고, 같은 행의 **Grok 모션 프롬프트 전체를 복사**해 사용합니다. 이미지 안의 실제 제품 화면은 이미 코드로 합성했습니다. 빈 회색 화면이 있는 results 폴더의 plate 파일은 첨부하지 마세요.

| 순서 | 장면 · 화면 방향 | Grok 첨부 이미지 | 복사할 모션 프롬프트 |
| --- | --- | --- | --- |
| 01 | CAT VILLAGE · 오른쪽 태블릿의 사선 정면 | [01 시작 이미지](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/derived/01-tablet-start-character.png) | [01 Grok 프롬프트](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/01-tablet-grok.txt) |
| 02 | COBALT · 왼쪽 휴대폰을 내려다보는 대각선 | [02 시작 이미지](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/derived/02-phone-start.png) | [02 Grok 프롬프트](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/02-phone-grok.txt) |
| 03 | 자동 정산 · 기록판 세 장이 정렬되는 매크로 | [03 시작 이미지](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/results/03-ledger-start.png) | [03 Grok 프롬프트](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/03-ledger-grok.txt) |
| 04 | 제품 엔드숏 · 태블릿 왼쪽 + 휴대폰 오른쪽 | [04 시작 이미지](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/derived/04-products-start.png) | [04 Grok 프롬프트](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/04-products-grok.txt) |

[씬별 편집 구간·한국어 자막·사용 방법](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/SHOTLIST.md)

## 사용 기준

- 파일은 각각 독립 PNG, **1672 × 941px (약 16:9)**입니다. 기본 이미지 생성 결과의 해상도를 유지했습니다.
- **4초 × 4개 = 16초** 분량의 원소스를 목표로 합니다. 실제 편집에서 약 15초로 다듬을 수 있습니다.
- 4초는 편집 목표입니다. Grok 웹 화면에 정확히 4초 옵션이 있다고 확인한 것은 아닙니다. 더 길게 생성되면 앞의 약 4초를 사용하도록 프롬프트에 동작 완료 후 정지를 넣었습니다.
- 한국어 메시지와 TITAN SOLUTION 표기는 편집기에서 넣습니다. 이미지·영상 모델에 글자를 새로 쓰게 하지 않습니다.
- CAT VILLAGE는 실제 공개 데모의 캐릭터·로고·게임 카드가 보이는 캡처입니다. COBALT는 사용자가 선택한 **실제 PC 경기 목록의 휴대폰 비율 크롭**이며, 모바일 전용 UI 캡처는 아닙니다.
- 03은 계산 결과가 정리되어 기록되는 과정을 나타내는 연출 이미지입니다. 실제 백오피스 UI나 송금 처리 화면이 아닙니다.

## 검수 결과와 한계

선택한 시작 이미지 4개를 직접 보고, 파일 읽기·실제 형식·크기·고유 해시·원본 보존을 확인했습니다. 화면 합성은 태블릿/휴대폰의 표시 영역 안에서만 수행했으며 베젤과 배경의 변경 픽셀은 0개입니다. 실제 화면 원본은 재생성하거나 새 문구·수치를 추가하지 않았습니다.

938 × 400px의 넓은 사이트 영역에 가운데 cover로 표시하면 **02 휴대폰의 위·아래 끝이 잘립니다**. 경기 목록은 보이지만 기기 전체를 유지하려면 최종 영상 편집 또는 사이트 배치에서 프레이밍을 다시 확인해야 합니다. 나머지 장면은 주요 피사체가 해당 넓은 영역 안에 남습니다. [실제 브라우저 크롭 비교](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/qa/display-proof.png)

Grok 영상 생성은 사용자가 진행할 단계입니다. 정지 프레임 검수만 완료했으며, 영상에서 UI 글자·숫자·기기 형태가 유지되는지는 아직 검증하지 않았습니다. 현재 사이트 코드와 적용된 사진은 이번 작업에서 변경하지 않았습니다.

## 제작 기록

- [실행 기록과 파일 해시](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/run.json)
- [파일 검증 결과](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/qa/final-verification.json)
- [실제 화면 캡처 기록](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/sources/capture-manifest.json)
- 생성에 실제 사용한 이미지 프롬프트: [01](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/01-tablet-image.txt), [02 최종](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/02-phone-overhead-v002-image.txt), [03](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/03-ledger-image.txt), [04](/E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/prompts/04-products-image.txt)
- 최초 휴대폰 plate는 태블릿과 구도가 비슷하다는 사용자 피드백에 따라 교체했습니다. 이전 plate와 초기 CAT 합성은 기록용으로 보존했으며, 위 표에는 최종 선택한 첨부 파일만 연결했습니다.

## 병행 사진 연구

별도로 **동양인 인물 사진 2개**를 생성하고 실제 313 × 400·238 × 400 크롭에서 비교했습니다. A는 코발트 의상·사선광·작업대 대각선이 작은 크기에서도 남아 우선 후보로 선택했습니다. B는 얼굴과 손의 집중된 구도가 강하지만 제도 작업으로 읽히는 한계가 있습니다.

[사진 A](/E:/codexwork/Site-Skin-edit/generated-images/titan-photo-study-20260909-174115/results/01-light-and-structure.png) · [사진 B](/E:/codexwork/Site-Skin-edit/generated-images/titan-photo-study-20260909-174115/results/02-the-review-moment.png) · [비교와 연구 기록](/E:/codexwork/Site-Skin-edit/generated-images/titan-photo-study-20260909-174115/REPORT.md)

사진 자체의 연출은 개선 후보를 확보했지만, 타이탄만의 업무 장면이라는 차별성까지 해결했다고 보지는 않습니다. 사용자 승인 및 사이트 채택은 아직 없습니다.

