# ALDEBARAN · BlackGold · Paperlogy

Figma의 [1303:11608 화면](https://www.figma.com/design/PoUHKHsm9xOYavWBQ7uAGP?node-id=1303-11608)을 구현한 독립 로컬 미리보기입니다.

- 기준: A0 · 정밀 마스크 · 골드 그라데이션 · BlackGold · Paperlogy · 1920
- 기본 주소: http://127.0.0.1:5430/
- 공개 배포: 하지 않음. Sites 호스팅 설정이나 배포 워크플로는 포함하지 않습니다.
- 앱: `site/`. 기존 LUNA의 React/Vinext 컴포넌트, 배당 샘플, 캐러셀 및 대화상자 패턴을 재사용했습니다.
- 원본 LUNA, TITAN, Figma 파일은 수정하지 않았습니다.

## 로컬 실행

Node.js 22.13 이상이 필요합니다. 이 환경에서는 기존 잠금 파일로 설치했습니다.

```powershell
Set-Location 'E:\codexwork\Site-Skin-edit\demo-sites\aldebaran-blackgold-paperlogy-20261026\site'
npm.cmd ci
npm.cmd run dev
```

서버는 127.0.0.1:5430에 연결됩니다. 포트가 사용 중이면 다른 서버를 종료하지 말고 사용 상태를 확인하세요.

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint -- app components/ui/dialog.tsx components/ui/button.tsx lib/utils.ts
npm.cmd run build
npm.cmd start
```

`start`는 빌드된 로컬 앱을 같은 포트에서 실행하므로 `dev`와 동시에 실행하지 않습니다.

## 구현 범위

- 88px GoldFlow 헤더, 232px 사이드바, 골드 배당 카드와 게임 목록.
- 배너 3개는 원본 사진, 큰 영문 텍스트, Figma에서 내려받은 전경 알파 마스크, 하단 그라데이션, 한국어 제목과 CTA를 별도 레이어로 구현했습니다.
- Figma 원본 자산 106개를 로컬 저장하고 실제 형식과 SHA-256을 확인했습니다. 만료되는 Figma 다운로드 URL을 런타임에 사용하지 않습니다.
- Paperlogy 400~900의 6개 WOFF2와 OFL 라이선스를 포함합니다. 실제 폰트 사용 여부를 브라우저에서 확인했습니다.
- 1920px에서는 메인 콘텐츠 x=277px, 너비=1592px, 섹션 간격=16px로 기준과 맞췄습니다.
- 작은 화면은 배너·경기 카드의 세로 배치, 2열 콘텐츠 카드와 접이식 메뉴로 조정했습니다. 별도 모바일 Figma가 제공되지 않아 이 부분은 기존 로비 반응형 방식을 이어받았습니다.
- 배당 선택과 해제, 목록 좌우 이동/전체보기, 메뉴·콘텐츠 이동 및 안내 대화상자가 작동합니다.
- 로그인, 가입, 결제, 실제 베팅·게임 서비스와 연결되지 않은 디자인 미리보기입니다. 기준에 포함된 색상 스와치는 다른 디자인을 새로 구현하지 않고 안내를 표시합니다.

## 확인한 범위

2026-10-26: 타입 검사, 지정 파일 린트, 프로덕션 빌드 통과. Chromium 로컬 화면 1920×1080, 1366×900, 390×900에서 화면 및 주요 동작을 검수했습니다. 다른 브라우저와 실제 모바일 기기는 확인하지 않았습니다.

자산 정보는 [asset-manifest.json](asset-manifest.json)에 기록합니다. 원본 사이트 전체 복사나 새 이미지 생성은 하지 않았습니다.
