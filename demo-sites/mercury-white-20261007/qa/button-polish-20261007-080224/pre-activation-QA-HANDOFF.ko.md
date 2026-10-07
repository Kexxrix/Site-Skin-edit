# MERCURY White 버튼 가독성 — 고정본 인계

고정 소스 **697a5711c8684eadd7c7f9068fe2974d47a91fb7**, 기준 **f9e5847acccbe6bd2790abab9b448d15494ffe17**입니다. 사용자 “진행해봐” 승인에 따라 그라데이션 버튼과 작은 칩을 폴리싱했습니다. **5418 사용자 화면에는 아직 적용하지 않았습니다.**

## 결과와 변경 범위

`app/mercury-white.css`에 파생 역할과 상태 CSS, `theme/mercury-white-button-polish.json`에 기준·승인·색·조정 근거를 기록했습니다. 승인 v6 원문과 기존 계산 CSS는 보존했습니다. 일반/서비스/MAX는크림 단색, 선택 스포츠/마켓/배당은옅은살구·진한주황테두리, LV/횟수/작은칩은단색입니다. 금속띠 대신1px윗면highlight를 사용하고 hover에서필터로글자를밝히지않습니다. focus는2px짙은outline, disabled는읽히는짙은문자와차분한단색을 유지합니다. 폰트·크기·좌표·이벤트함수는 바꾸지 않았습니다.

서비스 금색 PNG의 원본과 전역 보정은 그대로입니다. 오른쪽6개/왼쪽보조3개, 합계9개만 실제16px에서 불투명픽셀 대비중앙값1.89–2.31:1을 확인한 후 표시brightness90→70%로 조정했습니다. 90/85/80/75/70/65단계를 분석했고 모두중앙값3:1을 넘는 가장밝은 시험단계가70%였습니다. 개선후3.08–3.76:1이고 highlight의 최소 대비는 별도기록하므로 모든금색픽셀이3:1이라는접근성주장은 하지않습니다. 각아이콘은읽히는텍스트라벨을동반합니다. mask서비스아이콘은짙은글자색과동일하게사용했습니다.

## 환경과 검사

Windows, Node24.14.0, 설치된 Playwright Chromium의 새비영구컨텍스트. Browser plugin not available. 개인브라우저·IAB·사용자live저장소 없음. 서버는빌드f9를메모리에읽은기존5418입니다. CSS파생파일을해당격리페이지에만임시삽입하여시각/동작을검사했습니다. **새productionbuild를실행한UI검사와구분해야합니다.**

| 검사 | 결과 | 근거 |
|---|---|---|
| 페이지식별/실제콘텐츠/오버레이 | PASS | MERCURY화이트·1920캔버스·실제캡처 |
| 동작/UI | 24PASS/0FAIL | `ui-results.json`, 선택→5000×1.56→7800, 검색·필터·접기·마켓·팝업·슬립복원 |
| 상태/대비 | 10PASS/0FAIL | `state-contrast-results.json`, 일반·선택·hover·focus·disabled·칩·숫자·mask/PNG |
| 런타임 | PASS, 외부폰트예외기록 | JS예외0/일반local요청실패0/GET외요청0, AdobeTypekit만기존네트워크차단 |
| 타입/빌드/신규모듈lint | exit0 | `typecheck.log`, `build.log`, `lint-new.log` |
| 관련page lint | 기존1/신규0 재사용 | pageTSX바이트동일, 기존세션EffectSetState진단 |
| 소스/자산/기존빌드보존 | PASS | 기존소스341개·공개자원249개·기존dist292개, v6해시일치 |
| 실제5418새빌드반영 | 미실시 | PID17860/f9유지, 재실행승인필요 |

실측텍스트대비: 일반14.07:1, hover12.61:1, 선택/칩11.45:1, disabled5.07:1. 선택테두리와배경3.50:1. 주요버튼72개/작은칩 등의정상스타일과숫자대비, 실제선택/키보드포커스/disabled를확인했습니다. DOM/canvas계산에사용한조건을JSON에기록합니다. 폰트실제Adobe로딩은미검증입니다.

2560/1920/1366뷰포트의고정1920배치·중앙정렬·좁은창가로접근을재확인했습니다. 이미지164개전체경로/자연크기/표시치수는기준과같으며 필터차이는승인된9개뿐입니다. header/logo/banner의픽셀변경은없습니다. 거래버튼disabled와잔액1,000,000원/내역0을유지했고 거래·push·배포0입니다.

처음상태검사는선택focus가원래검정outline을유지한것을짙은회색기대값으로실패처리했습니다. 검정/짙은회색둘다실제대비와2pxoutline을검사하도록검수기대값만수정했습니다. 앱소스는바꾸지않았고최초결과는`harness-initial-state/`에보존합니다. JavaScript비활성컨텍스트에서addStyleTag의event대기가끝나지않아해당비청취QA프로세스만중단했습니다. 동기DOMstyle삽입후250ms스타일확인을사용해해당검사를수정했으며, 중단과정에서없는전체console근거를얻기위해최종24개전체를재실행했습니다. `harness-no-js/`, `no-js-diagnostic.json`에원인/초기결과를보존했습니다. CSS/앱을그결함때문에수정하지않았습니다.

## 시각 증거

직접픽셀열람: `after-full.png`, `after-quick.png`, `after-user.png`, `after-selected.png`, `after-hover.png`, `after-focus.png`, `polish-no-js.png`, `after-disabled-control.png`, `after-narrow-right.png`. `before-full.png`/`before-quick.png`/`before-user.png`가실제f9기준입니다. `after-disabled.png`는요약영역캡처로disabled버튼자체증거와구분합니다. 모든수정캡처는격리컨텍스트CSS삽입증거이며user5418적용화면이라고표현하지않습니다.

## 보존·적용 차단

f9소스ZIP/전체manifest/승인JSON/직전캡처/기존dist/프로젝트문서를`baseline/`에보존합니다. 기존편집기340개·원본MERCURY337개는HEAD/상태/파일해시가같고 기존5417PID35992와5418PID17860은그대로HTTP200입니다. `server-preserved.json` 참조. 실제source변경은08:05:22UTC, 마지막의도적수정08:08:42UTC입니다. 고정이후코드변경없음.

별도5419의숨김지속검수서버실행은자동승인검토에서거부됐습니다. 사유: **“별도 5419 서버와 실행·로그 파일을 생성하는 지속적 부작용이며, 사용자가 명시한 서버 변경 금지와 원래 작업 범위를 벗어납니다.”** 5419listener0,재시도/우회0입니다. 현재productionserver는시작시SSR/manifest/staticcache를메모리에저장하므로빌드파일만바꾸어도적용되지않습니다. 기존server와dist를수정하지않았습니다. 다음필요승인작업은 **검증된빌드를5418에적용하고5418만1회재실행**이며잠깐접속중단가능성이있습니다.5417/원본/개인저장소는유지합니다.

새productionbuild는`build-site/dist/`에있고추적소스343개가고정본과같다는것을검증합니다. `final-source.json`에모든소스/빌드/선정증거SHA-256과서버상태·차단을기록합니다. `mercury-white-polish-source.zip`은의존성/QA/개인캐시를제외한정확한Git소스묶음입니다. 사용자첨부PNG의기존Library404오류는다시시도하지않았고pixelsviewedfalse입니다. 독립QA/사용자미감최종승인은미실시입니다.
