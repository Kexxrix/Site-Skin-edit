# TITAN 전체 영상: 첨부 순서와 실행 설정

사용할 프롬프트: [09-seedance-full-video.txt](09-seedance-full-video.txt). 기존 `-draft` 파일은 작성 이력이며 전송용은 이 파일이다.

현재 납품 범위는 이미지 8장과 영상 프롬프트다. Higgsfield 업로드·영상 생성·크레딧 사용은 실행하지 않았다. 실제 영상의 철자·동작·시간·루프는 생성 후 확인할 항목이다.

## 설정

| 항목 | 값 |
| --- | --- |
| 서비스 / 모델 | Higgsfield / Seedance 2.5 |
| 입력 | References, 아래 독립 이미지 8장 |
| 생성 단위 | 전체 이야기 한 번 생성, 여러 장면과 전환 포함 |
| Duration | 12초. 전송 시 UI에서 정확한 12초 선택 가능 여부 확인 |
| Ratio | **16:9** |
| Resolution | **1080p** 선택. 이전 현행 UI에서 선택지를 확인했으나 실제 생성 파일은 미검증 |
| Audio | 가능하면 Off. 프롬프트에도 무음·내레이션 없음 명시 |
| Bitrate | 현재 기본값 유지 |
| 화면 구성 | 자연스러운 전체 화면. 레터박스·필러박스·테두리 없음 |

## 첨부 순서

생성된 순서와 무관하게 **파일명 01→08 순서로 첨부**한다. UI가 만드는 참조 태그와 프롬프트의 `@Image1`~`@Image8`을 맞춘다. 아래 목표 시각은 연출 지시이며 고정 키프레임으로 검증된 기능이 아니다.

| 참조 | 실제 파일 | 목표 구간 | 문구 / 역할 |
| --- | --- | --- | --- |
| @Image1 | [01-meet-titan.png](../results/01-meet-titan.png) | 0–1.5초 | MEET / TITAN |
| @Image2 | [02-core-development.png](../results/02-core-development.png) | 1.5–2.8초 | CORE SYSTEMS / BUILT IN-HOUSE, 두 개발자 |
| @Image3 | [03-development-products-bridge.png](../results/03-development-products-bridge.png) | 2.8–3.1초 | 인물이 담긴 사진 패널에서 제품으로 넘어가는 중간 상태 |
| @Image4 | [04-core-products.png](../results/04-core-products.png) | 3.1–4.3초 | CAT VILLAGE 태블릿 + COBALT 휴대폰 |
| @Image5 | [05-controls.png](../results/05-controls.png) | 4.3–6.5초 | CONTROLS / REFINED IN PRACTICE, 특정 선택 잠금 |
| @Image6 | [06-records-bridge.png](../results/06-records-bridge.png) | 6.5–7.2초 | PARTNER EARNINGS / AUTO-CALCULATED & RECORDED, 기록 정렬 중 |
| @Image7 | [07-partner-records.png](../results/07-partner-records.png) | 7.2–10초 | 같은 정산 문구, 정리된 기록 |
| @Image8 | [08-titan-solution.png](../results/08-titan-solution.png) | 10–12초 | TITAN / SOLUTION |

슬래시는 위 표에서 줄바꿈만 뜻한다. 화면에 추가할 문자가 아니다. 03과 06은 별도 정지 슬라이드가 아니라 전환 도중의 상태다.

## 실제 이미지에 맞춘 모션

- 02→03→04는 두 줄 문구를 유지하면서 왼쪽 정렬을 이어간다. 실제 이미지 간 글자 크기·위치가 조금 달라서 완전한 픽셀 고정 대신 부드러운 크기·위치 조정을 지시했다. 04의 밝은 배경으로 전환하면서 글자는 흰색에서 검정으로 바뀐다.
- 인물은 사진 패널 안에 남고 기기가 별도로 등장한다. 제품 화면의 작은 일본어·한국어는 재생성 차이가 있으므로 정확한 UI 복제 자료로 취급하지 않는다.
- 05는 실제 결과의 **큰 경기 패널 오른쪽 아래 선택 셀**을 잠금 대상으로 연결한다. 급변 신호와 잠금은 설명용 그래픽이다. 5.2초 무렵 제어가 완료되고 약 6.3초까지 보이게 한다.
- 06→07은 같은 두 줄과 세 묶음의 기록을 연결한다. 지급 완료·자동 송금·새로운 실적 수치는 넣지 않는다. 7.2~9.6초의 약 2.4초를 주 판독 구간으로 확보하고 그 뒤 브랜드 전환을 시작한다.
- 08은 01의 TITAN 위치·크기를 시각적으로 이어간다. 완성 브랜드는 10.4~11.8초의 약 1.4초 동안 유지한다. 마지막 0.2초에 SOLUTION을 완전히 내보낸 뒤 다음 MEET 입장으로 연결하도록 지시했다. 매끄러운 루프의 실제 성공은 미검증이다.

시간 합계: `1.5 + 1.3 + 0.3 + 1.2 + 2.2 + 0.7 + 2.8 + 2.0 = 12.0초`.

## 검수 경계

중요 문구와 얼굴·기기는 16:9 원본에서 확인한다. 영상에서도 같은 구도가 유지된다는 보장은 없다. 사이트의 약 2.34:1 영역에 나중에 `cover`로 표시하면 추가 세로 크롭이 발생하므로 그 적용 화면에서 다시 확인한다. 검정 띠를 넣어 해결하지 않는다.

검수 기록과 생성 원본의 경로·해시는 [README](../README.md), [run.json](../run.json), [저장 검증 로그](../qa/saved-outputs.jsonl)에 기록한다. 원래 화면 캡처와 기존 이미지·사이트는 변경하지 않았다.
