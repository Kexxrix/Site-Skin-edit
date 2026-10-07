# MERCURY White — 로컬 정식 등록 / GitHub 보관 기준 / 2026-10-07

- 최신 사용자 지시: 현재 머큐리 화이트를 로컬과 GitHub에 등록하며 **공개 배포는 하지 않는다**.
- 정식 관리명은 **MERCURY White**, 시작 문서는 [INDEX.ko.md](INDEX.ko.md). 로컬 주소 http://127.0.0.1:5418/ , 앱 소스 `b425507730a4f39dd393645ef4273653a7c13176`, 브랜치 `mercury-white-20261007`이다.
- 현재 소스 343개·빌드 파일 292개가 최신 고정 명세와 일치하고, 실제 HTML/CSS 200 및 CSS 해시를 확인했다. 동일 입력의 최신 독립 QA 31 PASS / 0 FAIL 결과를 재사용한다.
- 앱·디자인·자산·승인 팔레트·서버는 유지한다. 새 Sites 등록·호스팅 연결·공개 배포는 실행하지 않았다. 앱 저장소의 remote 없음 상태도 유지한다.
- 통합 GitHub 수집 기준: `backup/site-snapshots/20261007-mercury-white-local/`. 등록·원격 검증 기록은 `E:/codexwork/Site-Skin-edit-backups/20261007-mercury-white-register/`에 둔다.
- 아래 22/f9/697 커밋과 미등록·백업 전 표현은 해당 단계의 과거 이력이다. 최종 카드/서비스 보완 b425와 현재 등록 기준을 우선한다.

---

# MERCURY White — 선택 상태 복원 완료 / 2026-10-07 (이전 단계)

**http://127.0.0.1:5418/** 에 최종 빌드를 반영했습니다. 소스는 `site/`, 브랜치는 `mercury-white-20261007`, 고정 커밋은 **22bba115d3df595c968f32c2ed8ba802ef454ad0**입니다. 원격 연결·push·배포는 없습니다.

사용자 피드백에 따라 선택된 종목·배당·마켓만 기존 f9/v6의 선명한 표현으로 복원했습니다. 종목은#ffc26f/글자#2b2826/테두리#ff8800, 배당·마켓은#ffbd61기반 warm그라데이션/검정글자/테두리#ff8800입니다. normal·hover·focus9상태가 기존 편집기에 승인 v6를 넣은 격리 렌더의 계산 스타일과 완전히 같습니다. 원래 focus그림자도 포함합니다.

일반·서비스·MAX·작은칩·비활성 버튼의 가독성 개선은 직전697그대로입니다. 12개 비선택 그룹의 normal/hover/focus/disabled 계산 스타일과 이미지164개의 경로·크기·필터가 같음을 확인했습니다. 선택 종목 안의 숫자칩도 현행 단색을 유지합니다. 서비스 PNG9개의 scoped brightness70%와 기존 전역v6설정, 원본픽셀을 유지했습니다.

승인 v6 원문과 site사본은3132바이트·SHA-256 `f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5`로 보존됐습니다. 생성된 기본 CSS도 유지하고 `app/mercury-white.css`와 별도 `theme/mercury-white-button-polish.json` v2만 바뀌었습니다. 레이아웃·폰트소스·데이터·동작·헤더/로고/배너는 그대로입니다.

실제 프로덕션 UI24 PASS, 선택/비선택 비교7 PASS, 빌드exit0입니다. 타입·신규모듈lint는 입력이 같은 이전통과 검사를 재사용했고 관련page진단은 기존1/신규0입니다. 최종 Git diff형식 검사와 소스/빌드/자산 해시를 확인했습니다. 개인브라우저·IAB·사용자live저장소를 사용하지 않았습니다. Browser plugin not available, 기존 Playwright의 새비영구 컨텍스트에서 실제5418화면을 검사했고 CSS삽입은 없습니다.

새5418 PID36312·시작08:40:51UTC, wrapperPID22268입니다. 사용자가 승인한 재시작 범위에서 이번복원반영을 위해5418만1회 재실행했습니다. 기존5417/PID35992·시작03:54:38UTC는 유지했습니다. 최종HTTP200/동일PID/분리실행/stderr0/실제CSS 근거는 새QA의server-final.json과served-css-proof.json입니다. 서비스·스케줄러·보안·앱설정·캐시 변경은 없습니다.

직전697의 소스ZIP/manifest/캡처/문서/기존dist는 `qa/selected-restore-20261007-083206/baseline/`와 `runtime-retired-697/dist/`에 보존했습니다. 이전f9기록도 기존QA폴더에 유지합니다. 컴파일용 `qa/button-polish-20261007-080224/build-site`는 재사용하는 staging폴더로, 현재22빌드를 만들었으며 고정자료와 구분합니다.

최신 인계는 `qa/selected-restore-20261007-083206/QA-HANDOFF.ko.md`, 전체해시는 같은폴더`final-source.json`, 부모진행조회는`qa/progress-selected-restore.json`입니다. 사용자최종미감 승인과 독립QA는 아직 없습니다. 실제거래/원격push/배포/이미지재생성0입니다.

선택예시 PNG `libfile_dad322f7f4f481919480b35b4f18ed64`는 메타데이터와prepare_materialize에 성공했지만 지원helper가 `library file transfer failed: download failed`로1회 실패했습니다. 재시도/우회하지 않았고 실제픽셀은 못봤습니다. 기존첨부PNG Library404와 AdobeTypekit3개네트워크차단도 별도 한계로 유지합니다.


## 최신 후속 완료 — 2026-10-07

커밋 `b425507730a4f39dd393645ef4273653a7c13176`. 경기 카드 전체 선택/검토 테두리를 추가했고 카드61개치수변화0입니다. 충전·환전·고객센터는 실제헤더메뉴그라데이션을 normal/hover/focus에적용, 글자/마스크최소10.31:1입니다. 기존v6선택9상태·다른11버튼·이미지164개유지. 실제빌드8PASS/0FAIL/빌드exit0, 타입/lint동일입력의통과재사용. CSS/파생기록2파일만변경, 승인v6원문3132바이트/기존SHA보존입니다.

5418 PID23780·시작08:56:03UTC/HTTP200/분리실행144초이상/stderr0. 기존5417/PID35992유지. 실제dist292파일/staging해시동일, 이전22빌드는 qa/card-outline-service-20261007-085124/runtime-retired-22/dist보존. 최신인계 같은QA폴더의 QA-HANDOFF.ko.md 및 final-source.json. 새ZIP0. 첨부3개는메타데이터만확인/픽셀전달불가. 외부폰트WinError10013차단은재시도하지않았으며실제로컬CSS해시일치. 원본/공개사이트·앱설정·배포·실제거래변경0. 사용자최종미감승인별도입니다.
