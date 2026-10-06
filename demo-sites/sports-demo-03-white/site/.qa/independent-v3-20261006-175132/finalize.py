from pathlib import Path
import json, hashlib, datetime
Q=Path(__file__).resolve().parent
SITE=Q.parent.parent
C=Path('E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3')
B=C/'application-20261006-v1'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
start=json.loads((Q/'static-start.json').read_text(encoding='utf8'))
browser=json.loads((Q/'browser-suite.json').read_text(encoding='utf8'))
code=json.loads((Q/'code-checks.json').read_text(encoding='utf8'))
manifest=json.loads((B/'before-files.json').read_text(encoding='utf-8-sig'))
end={'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'target':str(SITE),'source_fixed_by_implementer':{'app/aldebaran-white.css':{'sha256':'4ba328dbe9af737d50d5dc7cd29cc34b70c7dd10fb0205d4184362fb148c498d','bytes':7889},'app/aldebaran-wog-r5.tsx':{'sha256':'5a3c1b4d65f6455831b70aa7945bdcc9dbf6b147c7b405d0911af2e04d9e655e','bytes':29631}}}
for key,base in [('target_files',SITE),('protected_original_files',Path(manifest['reference_source']))]:
    originals=manifest[key];prev=json.loads((Q/(key+'-start-hashes.json')).read_text(encoding='utf8'));checks=[]
    for item,first in zip(originals,prev):
        p=base/item['path'];now=sha(p) if p.is_file() else None
        checks.append({'path':item['path'],'sha256':now,'bytes':p.stat().st_size if p.is_file() else None,'same_as_start':now==first['now'],'same_as_before':now==item['sha256']})
    end[key]={'count':len(checks),'same_as_start':sum(x['same_as_start'] for x in checks),'same_as_before':sum(x['same_as_before'] for x in checks),'changed_during_qa':[x for x in checks if not x['same_as_start']],'changed_since_application':[x for x in checks if not x['same_as_before']]}
    if key=='target_files':end['existing_public']={'count':sum(x['path'].startswith('public/') for x in checks),'preserved':sum(x['path'].startswith('public/') and x['same_as_before'] for x in checks)}
    (Q/(key+'-end-hashes.json')).write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8')
end['fixed_source_match']={name:sha(SITE/name)==data['sha256'] and (SITE/name).stat().st_size==data['bytes'] for name,data in end['source_fixed_by_implementer'].items()}
end['baseline_source_unchanged']=all(sha(B/'before-source'/name)==s for name,s in start['baseline_source_hashes'].items())
copy=json.loads((B/'asset-copy-record.json').read_text(encoding='utf-8-sig'))
end['new_assets']=[{'name':a['name'],'sha256':sha(SITE/'public/icons/aldebaran-simple-v3-20261006'/a['name']),'same_as_start':sha(SITE/'public/icons/aldebaran-simple-v3-20261006'/a['name'])==a['sha256'],'same_as_copy_record':any(r['sha256']==a['sha256'] and Path(r['target']).name==a['name'] for r in copy),'derivatives_still_match':all(sha(C/n)==a['sha256'] for n in a['matching_derivatives'])} for a in start['assets']]
end['git_exists']=(SITE/'.git').exists()
(Q/'static-end.json').write_text(json.dumps(end,ensure_ascii=False,indent=2),encoding='utf8')
role_names={'sport-all':'전체/트로피','sport-soccer':'축구','sport-basketball':'농구','sport-baseball':'야구','sport-volleyball':'배구','sport-hockey':'아이스하키','sport-formula1':'포뮬라1','sport-boxing':'복싱','sport-mma':'MMA','sport-motorsport':'모터스포츠','action-deposit':'충전','action-withdraw':'환전','action-support':'고객센터','action-message':'쪽지','action-gift':'이벤트/페이백','action-notice':'공지사항','action-attendance':'출석','state-empty-slip':'빈 슬립/빈 상세/베팅 버튼'}
role_rows=[]
for a in start['assets']:
    role=a['name'][:-4];uses=[i for i in browser['initial']['icons'] if i['src'].endswith('/'+a['name'])]
    locations=[]
    for i in uses:
        label=i['label'].replace('\n',' / ')
        loc=f"{i.get('buttonClass') or i['parent']} ({label}) {i['w']:g}×{i['h']:g}px"
        if loc not in locations:locations.append(loc)
    role_rows.append(f"| {role} | {role_names[role]} | {len(uses)} | {'; '.join(locations)} |")
passed=sum(c['status']=='PASS' for c in browser['checks']);failed=sum(c['status']=='FAIL' for c in browser['checks'])
report=f'''# ALDEBARAN White · v3 18종 독립 QA

판정: **검사 범위 통과**. 브라우저 체크 {passed} PASS / {failed} FAIL. 새 제품 결함과 수정 요청은 발견하지 못했습니다. 타입 검사는 exit 0입니다. 전체 lint 명령은 기존 진단 21개로 exit 1이며, 변경 전/후 독립 정적 대조 21→21, 새 진단 0입니다. 전체 lint PASS로 분류하지 않습니다.

- 대상: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site`, `http://127.0.0.1:5384/`, 실제 title `ALDEBARAN · 스포츠`, body `aldebaran-site aldebaran-white`.
- 검수 시작/종료 UTC: `{start['time']}` / `{end['time']}`.
- 읽은 지침: root `AGENTS.md`, white `AGENTS.md`와 `STATE.md`. 적용 baseline은 후보 폴더의 `application-20261006-v1/before-files.json` 및 `before-source/`입니다.
- QA가 쓴 파일은 본 새 `.qa/independent-v3-20261006-175132/` 기록뿐입니다. 앱·기존 기록·PNG·다크 스킨·MERCURY·Git·호스팅·5384 서버를 수정, 실행, 종료하지 않았습니다.
- headless Chrome 새 비영구 Playwright 컨텍스트를 사용했습니다. 사용자 실제 브라우저, IAB, 저장값, GUI에는 접근하지 않았습니다. 검수 Chrome은 모두 닫았습니다.

## 통과 근거

1. 초기 실제 DOM에서 18종 38개 인스턴스가 렌더됐습니다. 같은 `GraphiteIcon` 및 기존 스포츠 위치의 이미지 경로만 매핑됐고, 원래 없던 역할이나 아이콘 사용처를 추가한 JSX는 없습니다. 모든 18 HTTP 응답 200, 응답 SHA-256 = 사이트 PNG = `exports/aligned/256/` 파생본 = 고정 `asset-copy-record.json`입니다. PNG 모두 256×256 RGBA이며 투명 픽셀과 정상 alpha 외곽을 갖습니다.
2. 기존 grayscale/filter/mask가 색을 바꾸지 않습니다. 실제 computed `filter:none`, `mask-image:none`, 일반 `opacity:1`입니다. `베팅하기` 비활성 티켓은 기존 `.48`을 유지했습니다. sports tab/tree/latest와 top notice/quick/user 기능은 24px, 빈 슬립 48px, 빈 상세 30px, 비활성 베팅 티켓 18px입니다. 고객센터 본문 아이콘은 기존 18px 슬롯입니다. 아이콘의 버튼 외곽 이탈 0이며 화면에서 라벨 겹침·클리핑을 발견하지 못했습니다.
3. 10개 스포츠의 일반/hover/키보드 focus/선택 상태가 정상이고 선택 탭은 한 개입니다. 실제 경기 수 전체61, 축구32, 농구6, 야구16, 배구0, 하키7, F1/복싱/MMA/모터스포츠0을 확인했습니다. 국가/리그 필터와 국내/해외 모드 전환도 정상입니다.
4. 기능 7종의 일반/hover/키보드 focus를 검사했습니다. 충전·환전·고객센터·공지·이벤트·출석·쪽지·페이백·빈 내역·규정 팝업은 열람 후 닫기만 실행했습니다. 고객센터의 새 support PNG, 내역의 기존 history PNG와 검색 empty의 기존 PNG가 정상 로딩됩니다. 버튼 높이와 라벨 배치는 정상입니다.
5. 1920×1080, 1366×900, 390×844에서 header/body/center/grid/pane/rail/quick/user/slip/card 등 외곽 geometry 차이 0, 본문 텍스트 및 selection ID 동일, 가로 전체 폭 1920px 동일입니다. 1366에서 오른쪽 가로 이동 554px을 확인했습니다. 390의 가로 탐색 필요도 baseline과 같습니다. 24px 확대에 따라 스포츠 탭은 폭 +4px, 일부 top notice 버튼은 폭 +12px과 가로 위치 이동이 있으며, 전체 높이·외곽·폰트·배당 영역에는 변화가 없습니다.
6. 실제 변경 전 `before-browser.json`과 현재 1920 DOM의 본문과 selection ID도 같았습니다. 좁은 화면의 직접 비교는 기존 서버의 CSS 응답만 exact before CSS로 대체하고 이전 PNG 경로를 복원한 격리 참조 페이지를 사용했습니다. 앱 소스/서버를 바꾸지 않았으며, TSX 아이콘 매핑 외 statements와 JSX 이벤트 57/57의 텍스트 일치가 별도로 확인됩니다.
7. 배당/문구 색 CSS 선언은 diff상 그대로입니다. 데이터·계산·page/service 코드 해시와 JSX handler가 보존됐고, 거래 제출 없이 선택·5,000원 입력으로 `1.56 × 5,000 = 7,800`을 확인했습니다. 방문자 상태로 베팅 버튼은 계속 비활성입니다. 선택/금액을 비운 후 종료 저장값은 loggedIn=false, balance=1,000,000, history=[], keep=false입니다.
8. 관련 page error, 로컬 HTTP 4xx/5xx, 로컬 request 실패, 누락 이미지 모두 0입니다. 거래/계정 변경/문의/출석 제출은 실행하지 않았으며 GET/HEAD 외 요청도 발생하지 않았습니다.

## 원본 및 고정 소스 보존

| 대상 | 결과 |
| --- | --- |
| white 기존 파일 | 343개 중 기존 baseline 대비 두 앱 파일만 변경; QA 시작→종료 343/343 일치 |
| white 기존 public | 243/243 기존 해시 보존 |
| 보호 다크 원본 | 320/320 baseline 및 QA 시작→종료 일치 |
| 적용 PNG | 18/18 시작→종료 및 고정 copy record 일치 |
| before-source snapshot | 시작→종료 모두 동일 |
| 전달받은 최종 TSX/CSS | 아래 해시·바이트 수 모두 동일 |

- `app/aldebaran-white.css`: 7889 bytes, `4ba328dbe9af737d50d5dc7cd29cc34b70c7dd10fb0205d4184362fb148c498d`.
- `app/aldebaran-wog-r5.tsx`: 29631 bytes, `5a3c1b4d65f6455831b70aa7945bdcc9dbf6b147c7b405d0911af2e04d9e655e`.
- `rules/history/logout/success-check/empty-search` fallback 경로는 기존 `graphite-20261002`이며 파일과 매핑을 보존했습니다. history와 empty-search는 실제 화면 검사했고, 로그인/완료 상태를 만들지 않아 logout/success-check의 실제 렌더는 미실행입니다.

## 실제 18종 역할·사용처

| 역할 | 의미 | 초기 DOM 수 | 위치·표시 크기 |
| --- | --- | --- | --- |
{chr(10).join(role_rows)}

`action-attendance`는 출석 달력의 체크 날짜에도 기존 GraphiteIcon을 통해 14px로 연결되지만, 출석 저장을 금지한 검수 범위에서는 그 저장 상태를 만들지 않았습니다. `state-empty-slip`은 빈 종목의 상세에도 기존 ticket 사용처를 통해 30px로 확인됐습니다. 페이백의 gift 사용은 기존 역할을 그대로 이어받은 것입니다.

## 실패와 미실행을 구분한 제한

- **기존 실패**: full lint exit 1 / 21건. 독립 static baseline/current 모두 21건이고 새 진단 0이며, 실제 프로젝트 타입 검사는 통과했습니다. diagnostics 로그를 보존했습니다.
- **외부 환경 실패**: baseline에서 외부 Adobe 3 요청은 sandbox `ERR_NETWORK_ACCESS_DENIED`였다고 전달받았습니다. 이 독립 Chrome에서는 `https://use.typekit.net/aqm4sxy.css`가 HTTP412 / ERR_ABORTED였고 현재와 baseline 참조 페이지 양쪽에서 동일했습니다. 외부 폰트 제한이며 이번 PNG의 새 제품 결함으로 분류하지 않습니다. 로컬 폰트/본문 대조에 새 차이는 없었습니다.
- **미실행**: 실제/데모 베팅 확정, 충전 제출, 환전 제출, 계정 접속·정보 저장, 출석 기록, 문의 보관; 이에 따른 활성 베팅·로그인 logout·완료 success·체크 날짜 14px attendance 상태. 존재하지 않는 기능 버튼 selected/disabled 상태는 인위적으로 만들지 않았습니다.
- **미실행**: 다른 브라우저·운영체제, 외부 Adobe 폰트 완전 정상 연결 상태, 전체 접근성 규격 감사. 좁은 화면은 기존 고정폭 디자인에 대한 회귀 확인이며 새 반응형 디자인 평가는 아닙니다.
- **build**: 독립 QA는 앱/빌드 산출물 변경을 피하려고 재실행하지 않았습니다. 부모에게서 구현자의 build exit0 결과를 전달받았으나 독립 실행 결과로 집계하지 않습니다.

## 실제 크기 미감·가독성 판단

24px에서 공/트로피/하키/F1/복싱/MMA/헬멧의 주 단서가 구분되고, 원색 스포츠와 흑연 기능 아이콘이 화이트·주황 표면에서 읽힙니다. 기능 PNG의 투명 여백 때문에 실제 그림은 24px 슬롯보다 작지만 라벨과의 간격이 안정적이며, 봉투·화살표·헤드셋·선물·종·달력 의미를 식별할 수 있습니다. 빈 슬립 티켓은 48px 슬롯에서 약 33×16px의 간결한 실루엣으로 보입니다. 고객센터 본문 18px 헤드셋과 비활성 18px 티켓은 보조 그림 수준이므로 설명 라벨과 함께 읽는 것이 적절합니다. 검수 화면에서 색 소실·클리핑·읽기 방해는 발견하지 못했으며, 최종 미감 승인은 사용자 판단으로 남깁니다.

## 증거

실제 화면 4장: [1920 초기](01-current-1920.png), [MMA 선택·빈 상태](02-mma-selected-empty.png), [고객센터 팝업](03-support-popup.png), [1366 오른쪽 가로 탐색](04-current-1366-right.png).

- `browser-suite.json`: 42개 체크, 상태별 computed style/geometry, 요청 기록, 3뷰포트 baseline 대조와 계산.
- `browser-initial.json`: 초기 독립 DOM, 18종 로딩, stylesheets, 콘솔/요청.
- `static-start.json`, `static-end.json`, `*-start-hashes.json`, `*-end-hashes.json`: 보존·PNG alpha·해시 근거.
- `aldebaran-wog-r5.tsx.diff`, `aldebaran-white.css.diff`: baseline과 직접 unified diff.
- `ast-comparison.json`: 전체 관련 JSX event 57/57 및 아이콘 매핑 외 statements 보존.
- `code-checks.json`, `type-stdout.log`, `type-stderr.log`, `lint-*-stdout.log`: 독립 명령·exit code·진단 비교.

남은 수정 요청/차단 이슈: **없음**. 위 미실행 범위만 남습니다.
'''
(Q/'REPORT.ko.md').write_text(report,encoding='utf8')
print(json.dumps({'fixed_source_match':end['fixed_source_match'],'target':end['target_files'],'original':end['protected_original_files'],'existing_public':end['existing_public'],'assets':len(end['new_assets']),'all_assets_same':all(x['same_as_start'] and x['same_as_copy_record'] and x['derivatives_still_match'] for x in end['new_assets']),'baseline_source_unchanged':end['baseline_source_unchanged'],'checks':[passed,failed],'report':str(Q/'REPORT.ko.md')},ensure_ascii=False,indent=2))
