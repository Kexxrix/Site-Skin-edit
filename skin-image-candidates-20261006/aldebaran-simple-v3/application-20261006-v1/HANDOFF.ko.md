# 알데바란 화이트·흑연 v3 아이콘 적용 인계

사용자의 “아이콘들 적용시켜” 승인에 따라 기존 화이트 작업본에18종을 적용했습니다. 확인 주소는 http://127.0.0.1:5384/ 입니다. 구현 검수는 완료했고 부모가 배정한 독립QA는 별도 진행합니다.

- 앱: E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site
- 대상은 기존Git없는 로컬복제본이며 HEAD/브랜치는 해당없음입니다. 새Git·commit을 만들지 않았습니다. 참조 다크 원본HEAD는6be8c176b374999501952d24520c8411b29b153f입니다.
- 변경 앱파일: app/aldebaran-wog-r5.tsx(경로매핑), app/aldebaran-white.css(아이콘24px·최신리스트아이콘열·원색보존).
- 신규 자산: public/icons/aldebaran-simple-v3-20261006/*.png18개,646,302bytes. 승인 aligned/256 사본이며 원본픽셀·색상재편집 없음입니다.
- 이전23종·전체기존자산·다크원본·사용자현재소스는 보존했습니다. 사전소스는 before-source/와 before-files.json에 있습니다.
- 주요외곽17개 geometry·본문·selectionID·기존 JSX eventhandler가 변경 전과 같습니다. 아이콘에 따른 종목탭폭/공지링크내 위치/최신리스트아이콘열만 조정했습니다.
- 폰트·배당텍스트색·경기/배당 데이터·기능·공개배포·MERCURY는 변경하지 않았습니다. 거래 제출0회, 기존사용자브라우저·IAB·저장값 미사용입니다.

| 검사 | 결과/근거 |
| --- | --- |
| 타입 | tsc --noEmit --incremental false,exit0;type-result.json |
| 빌드 | vinext build,exit0;build-result.json |
| 관련lint | 변경TSX기존21→21동일,새finding0;lint-result.json. 전체PASS아님 |
| 페이지/오버레이 | ALDEBARAN · 스포츠,aldebaran-white,정상본문,오류오버레이없음 |
| 원본보존 | 다크320개·화이트기존public243개 SHA동일;preservation-and-regression.json |
| 자산 | 새PNG18개HTTP200·사이트/원본SHA동일;asset-copy-record.json,interaction-qa.json |
| 화면 | 1920×1080,1366×900,390×844;고정1920가로탐색유지,누락이미지0 |
| 상태/동작 | 일반·호버·선택·비활성,종목10필터,검색,마켓필터,선택·금액표시·삭제,국내/해외전환,공지·이벤트·출석·쪽지·고객센터·내역,충전/환전창열기·닫기.22check통과 |
| 앱런타임 | pageerror0·로컬request실패0·HTTP오류0·warning0 |

외부Adobe3리소스는 실행환경의net::ERR_NETWORK_ACCESS_DENIED로 실패했습니다. 변경 전 동일한3요청이 실패했으며 로컬Pretendard계열·폰트파일/설정은 유지했습니다. 기존빌드의500kBchunk/plugin timings/routeclassification안내와 lint21진단을이번범위에서보존했습니다.

브라우저 플러그인이 없어 기존Playwright와 격리 headlessChrome을 사용했습니다. 사용자프로필/저장값을 읽지않고 독립 context에서만 동작했습니다. 출석체크는 이격리저장소에만 기록했고 거래/문의제출은 하지 않았습니다.

서버는 실제 실행중인화이트vinext PID27700을 재사용했습니다. 이번launcher35604는 기존서버감지후종료했습니다(server.stderr.log). 서버를중복실행·종료·재시작하지않았고 최종HTTP200을확인했습니다. server.pid는 초기launcher기록으로 남겼으며 실제runningPID는 application-manifest.json을 따릅니다.

대표 초기화면은 after-1920.png입니다. Page-screen-uploads.json의 primary에Page파일참조가 있습니다. final-1920.png는 입력검증을 거친 회귀상태(빈금액touched/invalid)를 보여주는 별도증거입니다. Page본문은부모가정리합니다.

실제파일목록·각SHA·승인/로컬채택·검사기록은 application-manifest.json,18종기존사용위치는 APPLICATION-ROLE-MAP.ko.md를따릅니다. 현재승인은로컬아이콘적용이고 공개배포승인으로확대하지않습니다. 전체최종미감승인과독립QA결과는이구현기록으로대신하지않습니다.

독립QA결함이전달되면 해당아이콘연결/스타일범위에서만수정하고 두앱파일/자산의새해시를부모에게전달합니다.
