# Titan Solution — Paperlogy 비교본

원본: `E:/codexwork/Site-Skin-edit/titan_promotion`

복제본: `E:/codexwork/Site-Skin-edit/demo-sites/titan-paperlogy-20261026/site`

미리보기: http://127.0.0.1:3001/

## 실행

이 폴더에서 아래 명령을 사용합니다. 기존 프로젝트의 동일 버전 의존성을 복사했으며 패키지와 lockfile은 변경하지 않았습니다.

```powershell
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001
```

## 적용 범위

- 본문·제목·로고·숫자·메뉴·폼에 로컬 Paperlogy WOFF2 적용.
- 굵기 100~900 매핑, `preload: false` 유지.
- 원본 그리드, 컨테이너 너비, 이미지·영상 크기, 콘텐츠와 동작 유지.
- 로고·숫자·포트폴리오 제목의 글자 크기, 카드 상담 버튼의 좌우 패딩, 일부 설명문과 모바일 FAQ의 크기를 보정. 숫자는 기존 행 높이를 유지.
- 이미지·영상에 포함된 글자는 원본 미디어 그대로 유지.

## 확인 결과

- 360, 375, 390, 414, 600, 768, 820, 1024, 1200, 1280, 1440, 1920px에서 기본 화면 비교. 페이지 높이 차이는 0~1px이며 가로 넘침 없음.
- 모바일 360/390/414px에서 FAQ 7개씩 실제 펼침 비교: 21개 상태의 높이 일치.
- 모바일 메뉴 열기/닫기, 솔루션 상담 선택, 포트폴리오 상담 추가 정상.
- 이미지 17개 정상 로드, 소개 영상 정상 로드, 관련 콘솔 오류 없음.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false` 통과.
- `node node_modules/next/dist/bin/next build` 통과. 빌드의 타입 검사 생략 설정은 원본과 같으므로 위 타입 검사를 별도로 수행함.
- 원본 110개 파일의 SHA-256 일치 확인. 원본 적용 및 공개 배포는 수행하지 않음.

폰트 원본·라이선스·굵기 매핑은 `public/fonts/paperlogy/README.ko.md`를 참고하세요.
