from pathlib import Path
import json

base = Path(__file__).resolve().parent
project = base.parents[2]
implementation = base.parent / 'implementation'
publication = json.loads((implementation / 'publication.json').read_text(encoding='utf-8-sig'))
release = json.loads((implementation / 'source-release.json').read_text(encoding='utf-8-sig'))
public = json.loads((implementation / 'public-qa.json').read_text(encoding='utf-8-sig'))
assert publication['deployment']['status'] == 'succeeded'
assert release['exactBuildInputMatchesCommittedFiles']
assert public['all61MarketCountsMatchReference'] and public['health']['cards'] == 61
assert not public['health']['imageErrors'] and not public['console']
assert public['accountUnchanged'] and not public['finalBetConfirmationPerformed']

status = '**현재 상태: MERCURY POLISH 구현·로컬 검수·PUBLIC v11 배포·공개 핵심 확인 완료. 사용자 피드백 대기. 다음 사이클은 시작하지 않는다.**'
for name in ['AGENTS.md', 'STATE.md', 'DESIGN_SPEC.md', 'DECISIONS.md']:
    path = project / name
    content = path.read_text(encoding='utf-8-sig')
    assert content.startswith('# 최신 작업 기준 — MERCURY POLISH / 2026-09-28\n')
    if status not in content:
        content = content.replace('\n\n', '\n\n' + status + '\n\n', 1)
    path.write_text(content, encoding='utf-8')

path = project / 'STATE.md'
content = path.read_text(encoding='utf-8')
start = content.index('## 현재 실행 상태')
end = content.index('\n---\n', start)
section = '''## 2026-09-28 폴리싱 완료 — PUBLIC v11

- 공개 URL: https://mercury.kexxadrix.chatgpt.site/ — 기존 MERCURY 프로젝트와 public 권한 유지. 배포 succeeded: 2026-09-28 16:08:46 KST. 조정 담당도 Sites 상태를 직접 재조회했다.
- 소스 commit / 원격 main: `0d5e9e91b92974ebe72060da0925514eb516aea8`. 검증한 빌드 입력과 커밋의 변경11파일 바이트가 일치한다.
- version: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_84dad855b5b48191b4f6f24200dd7806` (v11). deployment: `appgdep_6aba126cd2688191b31dc2ebcb8b2ad2`.
- 입력 ZIP SHA-256: `364bb93961baa8f90bad45eb9947c60678534b908d0b08aaae4c526467b3384e`. 원문·제공 자산은 `input/mercury-polish-20260928/MERCURY_POLISH_20260928/`에 보존했다.

### 수정 파일과 적용 내용

- `site/app/demo-data.ts`: ALDEBARAN prematch-r15의 61경기와 확장 마켓·선택 ID를 연결하고 종목 순서/개수와 신규 아이콘 매핑을 적용했다.
- `site/app/prematch-r15.json`: 참조 확정 마켓 데이터를 추가했다. 참조 데이터셋은 `aldebaran-prematch-r15-20260923`, sourceKind는 `synthetic-model`이다. 이번 작업에서 새 배당을 만들거나 실시간 데이터라고 주장하지 않는다. Git CRLF→LF 정규화만 있으며 JSON 값은 참조와 동일하다.
- `site/app/mercury-market-view.ts`: 종목별 확장 마켓의 필터·라인·그룹·설명·N+ 계산을 연결했다. 마켓 수와 그룹 수를 구별한다.
- `site/app/mercury-sports.tsx`: 상단10/좌측9 종목, 국기/리그 슬롯, VS, 실제 N+, 목록/상세 선택 연결을 적용했다.
- `site/app/mercury-sports.css`: Figma의 블랙·골드·주황 라벨·청록 배당·골드/회색 gradient와 선택+hover 우선순위, 신규 PNG의 투명 여백 중앙 보정을 적용했다. 일반 퀵메뉴·비선택 필터·계정 버튼은 평면, 헤더는 #0B0B0B 단색이다.
- `site/app/page.tsx`: 새 경기 집합과 마켓 선택·계산을 기존 세션/머니/내역에 연결했다. 슬립 유지 상태는 기존 계정 키의 `-slip` 키를 사용하고, 무효 선택만 제외한다. 계정 저장소를 초기화하지 않는다.
- `site/public/sports/polish/mercury-sport-{all,formula1,boxing,motorsport,mma}.png`: 제공 PNG5개를 원본 SHA-256 그대로 복사했다. 원본 비율/알파/색 유지, 이미지 필터·재생성·픽셀 편집 없음.
- 운영문서 `AGENTS.md`, `STATE.md`, `DESIGN_SPEC.md`, `DECISIONS.md`: 이번 기준/완료 상태를 최신으로 반영하고 이전 원문·관측·증거 경로를 보존했다. 별도 운영 보고 MD는 만들지 않았다.

### 데이터와 화면 검증

- 전체61 = 축구32 + 농구6 + 야구16 + 배구0 + 아이스하키7 + 포뮬라1/복싱/MMA/모터스포츠 각0. 상단은 전체 포함10, 좌측9개 순서 일치. NFL16은 현재 목록/검색/합계에서 제외하고 원본 기록은 유지했다. 헤더/퀵메뉴 E스포츠는 보존했다.
- 61개 경기 객체·마켓 그룹·11,485개 선택 ID가 ALDEBARAN과 일치한다. 참조 자산 경로 모두 유효하며 전체61개 카드의 N+가 각 실제 마켓 수와 일치한다.
- 표본: 토론토 랩터스80, 메이플리프스79, 몬트리올52, 바이에른 뮌헨111, 첫 야구65. 농구/축구/야구/아이스하키의 전체·승무패·핸디캡·언더오버·기타 필터와 선택 연동을 실제 브라우저에서 확인했다.
- Figma243:4는 읽기 전용으로 관찰했다. 패키지의 주요25개 노드와 현재 Figma의 면/테두리 색상 일치. 이번 지정 색·gradient는 반영했지만 Figma에 남은77경기/고정3+/스코어는 가져오지 않았다.
- 실제1920×1080 CSS viewport, 브라우저 scale1, 폰트 loaded. ALDEBARAN과 대응22개 요소의 위치/치수/간격 등 비교 차이0. MERCURY 브랜드, 지정 Figma 팔레트, PNG 투명 여백 보정은 의도한 예외다.
- 로컬 기본·국내형2열·0경기·선택 목록/상세 hover 화면을 확인했다. 팀 중앙은 모두 VS이며 기존 장식 이미지나 헤더 영상을 추가하지 않았다. 상단10개 탭이 한 줄에 들어간다.
- 선택+hover는 골드 gradient와 #171717 팀명/배당을 유지하고, 해제 시 #81FFFF 배당으로 복귀한다. 라벨/N+/아이콘은 원본 형태를 유지하며 중앙 정렬했고, hover 시 요소 위치/크기를 유지한다.

### 기능·빌드·공개 확인

- 로컬: 5개0경기 상태의 목록/상세 비움, NFL 검색0결과, 마켓 접기/펼치기, 목록/상세 동일 선택, 경기 내 교체/해제, 삭제/초기화, 슬립 유지 재로드/무효 ID 제외, 최소/최대/문자 금액 차단, 국내형2열, 네 영역 독립 스크롤 통과.
- 계산: 1.56 × 1.51 = 2.3556; 화면 총배당은2.36, 10,000원 × 2.3556 = 23,556원. 계산용 원래 정밀도와 표시 반올림을 구분했다.
- 최종 확인 팝업은 열고 닫았으며 최종 베팅 확정은 실행하지 않았다. 실제 disabled와 안내/입력 차단을 유지한다. 검수 전후 계정·머니·과거내역 원문이 같다.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false` 및 `npm run build` 종료0. 배포 파일 검증 중 버퍼 한도/줄바꿈 차이를 해결했고, Windows 생성물 정리 ENOTEMPTY 잔여물은 증거 폴더에 보존 후 최종 빌드 통과. 기능/데이터 값 변경이 없어 이미 통과한 UI 검증은 재사용했다.
- 공개 v11: 실제1920×1080/scale1/폰트 loaded, 제목 MERCURY · 스포츠, 상단10/좌측9/61카드/allVS, 모든 N+ 일치, 신규5PNG 정상, 선택 hover, 모터스포츠0경기/상세 비움, 국내형61카드 및 해외형 복귀 확인. 이미지 오류0, 확인한 콘솔 오류0.
- 공개 계정 원문은 보존했다. 신규 슬립 키는 keep=false로 초기화됐으며 최종 화면은 전체/해외형/선택 없음이다. 조정 담당은 공개 최종 캡처를 직접 읽고 실제 배포 succeeded를 재조회했다.

### 보존·증거·남은 범위

- ALDEBARAN 추적317파일/HEAD `6be8c176b374999501952d24520c8411b29b153f`/clean 상태를 시작/종료 해시로 확인했다. 수정·재배포하지 않았다. Figma에는 쓰기를 실행하지 않았다.
- MERCURY 기존277추적파일 중 변경은 위5개 코드파일뿐이다. 기존 로고·사진·배너·폰트·원본 경기 기록/스냅샷·저장 키와 이전 증거 보존. 신규 JSON/PNG 외 불필요한 자산 추가 없음. 종료 상태는 원래 `?? tsconfig.tsbuildinfo`만 남으며 원본 SHA를 유지한다.
- 증거 루트: `runs/mercury-polish-20260928/`. 구현 자료 `implementation/{data-comparison.json,asset-copy.json,geometry-comparison.json,functional-qa.json,icon-qa.json,scroll-qa.json,source-preservation.json,source-release.json,publication.json,public-qa.json}`. 조정 자료 `coordination/{intake.json,operating-documents-before.json,figma-live-style-check.json,preservation-check.json,deployment-readback.json}`.
- 공개 최종 화면: [mercury-public-final.png](runs/mercury-polish-20260928/implementation/mercury-public-final.png). 국내형/선택 hover 캡처도 같은 폴더에 보존했다. 새 ALDEBARAN 캡처의 도구 타일 오류는 실패본으로 분리하고, 같은 v23/HEAD의 이전 정상1920 캡처를 재사용했다. 현재 DOM 치수는 별도로 다시 측정했다.
- 미완료: 요청 범위 내 발견된 미완료 항목 없음. 남은 경고는 확장 데이터로 인한 500kB 초과 클라이언트 청크와 vinext 정적 경로 분류 unknown이다. 별도 성능 최적화/프레임워크 변경은 범위에 포함하지 않았다.
- 미검증/제외: 최종 베팅 확정, 실제 결제·인증 백엔드, 모바일/반응형, WOG/별도 독립 감사, 사용자 최종 시각 수용. 이번 구현 결과에서 다음 사이클을 자동 시작하지 않고 사용자 피드백을 기다린다.
'''
path.write_text(content[:start] + section + content[end:], encoding='utf-8')

previous = json.loads((base / 'operating-documents-before.json').read_text(encoding='utf-8-sig'))
for name, original in previous.items():
    assert (project / name).read_text(encoding='utf-8-sig').endswith(original['text']), name
print(json.dumps({'updated': list(previous), 'allPreviousHistoryPreserved': True, 'version': publication['version']['version_number']}, ensure_ascii=False))
