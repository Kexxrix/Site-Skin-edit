# Grok 15초 텍스트 전용 영상 검수

검수일: 2026-09-10. 사용자 제공 원본을 보존한 읽기 전용 분석입니다.

- 입력: [grok-b1fa9b2b-e7cb-4ccd-bdc0-1f085bba34cf.mp4](D:/WebDL/grok-b1fa9b2b-e7cb-4ccd-bdc0-1f085bba34cf.mp4)
- 비교: [실험 프롬프트](../../prompts/grok-text-only-15s-test.txt)
- ffprobe: 15.000초, 1280 × 720, 24 fps, H.264, 2,776,860 bytes. 영상 스트림 1개, 오디오 스트림 없음.
- 원본 SHA-256: 8BC6181C801FE2EC438A7F558BFC7A2002279D7A2F083E2485B14FA9CFCD89F0
- 표본: 0.00–14.50초, 0.50초 간격, PNG 30장. frame-001.png의 시간은 0초이며 frame-NNN.png의 시간은 (NNN - 1) × 0.5초입니다.
- 방법: 원본 크기의 추출 프레임을 시각 검수. 정상 속도의 영상 재생이나 360프레임 전수 검수로 표시하지 않습니다. 각 항목은 표본에서 확인된 사실입니다.

## 관찰 결과

| 표본 시간 | 관찰 및 프롬프트와의 비교 | 증거 |
| --- | --- | --- |
| 0.0초 | Meet TITAN과 아이보리 배경, 얇은 원호·오렌지 원이 보임. Meet는 TITAN보다 가볍지만 요청한 작은 높이와의 차이는 약함 | [frame 001](./frames/frame-001.png) |
| 1.0 / 1.5 / 2.5초 | Core systems가 Core systtems로 보임. t가 추가됨. Built와 in-house의 완성 상태는 읽히지만 문구 전체가 큰 비중을 차지함 | [frame 003](./frames/frame-003.png), [frame 006](./frames/frame-006.png) |
| 3.0 / 3.5초 | CAT VILLAGE / Casino & slots가 읽힘. 설명까지 큰 비중을 차지하고 중앙 배치로 구현됨 | [frame 007](./frames/frame-007.png) |
| 4.0초 | CAT VILLAGE / Casino & slots와 Sportsbook이 중첩. 이전 제품명을 완전히 지운 다음 Sportsbook만 보이게 하라는 지시 미준수 | [frame 009](./frames/frame-009.png) |
| 4.5 / 5.0초 | Sportsbook 단독·남색 배경 확인. 5.0초는 Operations로 전환할 목표 시각 4.9초보다 뒤지만 아직 이전 장면 | [frame 010](./frames/frame-010.png), [frame 011](./frames/frame-011.png) |
| 5.5 / 6.0초 | Operations, / refined의 굵기·Italic 차이와 민트 배경 구현. 6.0초에도 Operations가 남아 목표 5.8초와 시차 있음 | [frame 012](./frames/frame-012.png), [frame 013](./frames/frame-013.png) |
| 6.5초 | Operations가 남은 가운데 Sudden odds shift / Bets auto-blocked가 겹침 | [frame 014](./frames/frame-014.png) |
| 7.0 / 7.5 / 8.0초 | 조건과 결과가 함께 읽힘. 잠금 도형이 있지만 신호선은 완만한 곡선으로, 급변을 나타내는 꺾임이 약함. 8.0초에도 이 장면이 남음 | [frame 015](./frames/frame-015.png), [frame 017](./frames/frame-017.png) |
| 8.5 / 9.0 / 9.5초 | Limit changes / Effective next round와 두 표식이 보임. 8.5초에는 두 원이 모두 오렌지로, 두 번째만 강조하라는 지시와 다름. 9.5초에는 다음 Partner earnings가 아니라 한도 장면이 남음 | [frame 018](./frames/frame-018.png), [frame 020](./frames/frame-020.png) |
| 10.0 / 10.5 / 11.0초 | Partner earnings와 주황색 Auto-callculated. 요청한 Auto-calculated보다 l이 하나 추가되어 있음 | [frame 021](./frames/frame-021.png), [frame 022](./frames/frame-022.png), [frame 023](./frames/frame-023.png) |
| 11.5초 | 계산 문구와 Recorded / In the back office가 중첩. Recorded는 목표 12.0초보다 이른 이 표본부터 보임 | [frame 024](./frames/frame-024.png) |
| 12.0 / 12.5초 | Recorded / In the back office가 읽힘. 12.0초에는 이전 계산 문구가 희미하게 남음. 기록 카드와 큰 빈 프레임이 있으나 이 표본에서는 카드가 프레임 안에 정착한 최종 상태로 보이지 않음 | [frame 025](./frames/frame-025.png), [frame 026](./frames/frame-026.png) |
| 13.0 / 13.5초 | Recorded 끝부분 글자가 뒤틀린 상태. 글자 전체를 변형 없이 이동시키라는 지시 미준수 | [frame 027](./frames/frame-027.png), [frame 028](./frames/frame-028.png) |
| 14.0초 | TITAN / SOLUTION 뒤에 변형된 Recorded와 기록 화면이 남음. 목표 13.9초까지 끝낼 브랜드 입장 미완료 | [frame 029](./frames/frame-029.png) |
| 14.5초 | TITAN / SOLUTION 단독으로 읽힘. 두 줄은 같은 대문자 높이로 보이고 SOLUTION은 자연스럽게 더 넓음 | [frame 030](./frames/frame-030.png) |

## 판단의 범위

전체 메시지 순서, 배경 명암, 일부 서체 위계는 구현되었습니다. 영문 철자 정확성, 서로 다른 장면의 카피 분리, 전환 중 글자 형태, 지정 시각은 미달 항목입니다. 영어라서 철자가 안전하다거나 Seedance로 옮기면 해결된다고 결론 내릴 수 없습니다.

영상의 모든 프레임과 모든 색·크기 값을 계측하지 않았으므로 정확한 오류 지속 시간, 각 컷 경계, 전체 읽기 시간에 대한 확정 수치는 제시하지 않습니다. 비용과 Seedance의 실제 성능은 이 검수 범위에 없습니다.

[참조·프롬프트 보강안](../../seedance-reference-strengthening-v3.md)에 다음 시험의 목적과 2장 참조 설계, 5초 동작표를 정리했습니다. 새 이미지·영상 생성과 유료 제출은 하지 않았습니다.
