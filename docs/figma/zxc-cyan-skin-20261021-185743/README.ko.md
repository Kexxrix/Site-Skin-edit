# ZXC Navy Cyan — 24페이지 추가 스킨

- 작업일: 2026-10-21 (Asia/Seoul)
- 참고 사이트: https://zxc.bet/?ref=tokkis&ref_event=18cf84b5-2e28-45cf-a335-6a7d621c2a2d
- Figma: https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=829-2453
- 페이지: 24 / 795:1330
- 화면: ZXC Navy Cyan · 24 기본형 고정 · 1920 / 829:2453

## 접근 확인

Chrome에서 로그인 없이 공개 홈 화면을 열람했다. 자동 텍스트 추출 경로는 사용할 수 없었으나 실제 브라우저 화면과 계산된 CSS를 확인했다. 계정 생성·로그인·베팅·결제는 수행하지 않았다.

직전 추가 테마 제작 요청의 새 참고 사이트로 해석해 기존 골드·CC Lime·HT Gold 옆에 독립 시안을 추가했다. 기존 화면을 교체하거나 최종안으로 채택하지 않았다.

## 적용한 테마

- 페이지 #101820, 헤더 #17222b, 사이드바 #1a2630, 패널 #24333f.
- 하늘색 #63c7f2 포인트, 흰색 #f4f9fc 본문, 보조색 #a8bac6.
- 평면형 회원가입·바로가기 버튼과 얇은 로그인/무기명가입 테두리.
- 원본 사이드바 아이콘에 Figma 이미지 필터만 적용해 은색 계열로 조정.
- 기존 콘텐츠 사진·정밀 인물 마스크 위에 흰 제목과 하늘색 영문 아웃라인.
- 공개 홈의 은하수 이미지를 별도 이미지 레이어로 사용. 회색조 필터와 별도 그라데이션 음영 레이어로 가독성을 조정하고 높이 1080에서 남색으로 이어지도록 구성.
- 레이아웃과 컴포넌트 구조는 24페이지 원본 유지. 새 사진이나 인물은 생성하지 않았다.

## 보존 및 구조 검증

검증 파일: final-state.json, 재사용 가능한 읽기 전용 점검: 05-verify.js.

- 원본과 새 스킨의 기존 노드 629개 대응.
- 기존 컨테이너 위치·크기·gap·padding·corner·clip 차이 0건.
- Main content gap 16 유지.
- 94개 인스턴스의 원본 컴포넌트 연결 모두 동일.
- 기존 이미지 노드 100개의 imageHash와 크롭/변환 동일.
- 사이드바 아이콘 14개의 비파괴 필터만 변경.
- 배너 인물 마스크 3개와 벡터 경로 동일.
- 문구 변경 0건.
- 기존 화면 3개 및 원본 컴포넌트 44개, 총 47개 스냅숏 동일.
- 표시 텍스트 151개에 독립 텍스트 스타일 19개 적용. 사용 폰트 7종 load 성공, missing font 및 text trim 0건.
- 스킨 색상 변수 35개에 명시적 scope, mode 값, WEB code syntax 존재.
- 테마의 Black 웨이트 변경에 따른 자연 텍스트 폭 차이: 페이백 포인트·데일리 리워드 150→149px. 카드 및 부모 배치 변화 없음.

첫 점검의 보존 비교는 루트 좌표 제외 옵션을 빠뜨려 전 항목 불일치로 표시됐다. 원래 기준과 동일하게 snap(node,true)로 재검사하여 47/47 일치를 확인했다. 폰트 상태도 해당 호출에서 실제 load 후 판정했다. 해당 점검 오류 때문에 기존 화면을 수정하지 않았다.

## 시각 검수

최종 통과 이미지: qa/final-full-page-png.png.

- 전체 페이지에서 헤더·사이드바·카드 간격·레이어·사진 크롭·제목 가독성·파트너 그리드 확인.
- qa/sidebar.png: 좌우 테두리 및 활성 메뉴 경계 잘림 없음.
- qa/banners.png: 인물 마스크, 사진, 흰 타이틀, 하늘색 영문 윤곽과 CTA 확인.
- qa/background-png-isolated.png: 은하수 실제 렌더 확인.
- 이전 qa/full-page.png, qa/final-full-page.png, qa/background-isolated.png 등은 배경 렌더 문제 해결 전 기록이다. 최종 결과로 사용하지 않는다.

WebP 업로드 후 이 파일의 배경이 검게 렌더되는 문제가 있어 원본을 보존하고 PNG 사본을 만들었다. 디코딩 픽셀·모드·크기 동일성을 확인한 PNG를 적용해 화면에서 해결을 확인했다. Figma의 일반적인 WebP 지원 여부를 이 사례로 단정하지 않는다.

## 배경 자산

공개 화면에서 직접 관측한 소스:
https://zxc.bet/images/v4/milky-way-emerald-desktop-v2.webp

- 원본: reference/milky-way-emerald-desktop-v2.webp
- 크기: 1672×941, 83,984 bytes
- SHA-256: 2fef6d625f82dd25d433c4e735ddd6e8a409a2385bbaf4f9956ec7d7b21070eb
- 파생 PNG: reference/milky-way-emerald-desktop-v2.png
- 크기: 1672×941, 1,291,321 bytes
- SHA-256: 9630cbaf9542b9b34e8bef1d6a75078c180f371ab2d15dbf186ccea32f22193d
- 변환 근거: reference/format-copy.json
- 최종 Figma imageHash: a883d38dc13361265dda07423ee8de1781c6573d

## 남은 제한 및 미변경 사항

참고 사이트의 SCore 폰트는 현재 Figma 환경에서 사용할 수 없어 기존 Pretendard JP 계열을 유지·조정했다. 영문 디스플레이는 기존 Bebas Neue다.

게이트웨이 이미지에 포함된 금색 영문은 비트맵에 포함되어 있으므로 보존했다. 기존 사진 자체·로고·서비스 문구·혜택 조건·파트너 로고를 변경하지 않았다.

웹 코드·로컬 서버·배포는 변경하지 않았다. 1920 Figma 시안 검수 결과이며 새로운 모바일 동작이나 실제 웹 반응형 검증을 뜻하지 않는다. 사용자 채택은 미정이다.

