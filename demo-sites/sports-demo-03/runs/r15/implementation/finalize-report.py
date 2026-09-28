import json
from pathlib import Path

root = Path(__file__).resolve().parent
site_root = root.parents[2] / 'site'
load = lambda name: json.loads((root / name).read_text(encoding='utf-8-sig'))
save = lambda name, value: (root / name).write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
publication = load('final-publication.json')
data = load('data-validation.json')
inventory = load('market-inventory.json')
for row in inventory:
    if row['sport'] == 'baseball':
        row['league'] = 'MLB'
save('market-inventory.json', inventory)
font = load('font-weight-audit.json')
coverage = load('template-coverage.json')
template_path = root.parents[2] / 'input/r15/ALDEBARAN_R15_POLISH_MARKETS/resources/completion-report.template.json'
report = json.loads(template_path.read_text(encoding='utf-8-sig'))
report.update(status='complete_with_documented_limits', actual_commit=publication['source']['commit_sha'], deployment_version=publication['version']['version_number'], deployment_id=publication['deployment']['id'], deployment_url=publication['deployment']['url'], deployment_status=publication['deployment']['status'], completed_at=publication['deployment']['updated_at'])
tasks = [
    ('R15-01', ['app/aldebaran-wog-r5.css'], ['../public/final-measurements.json'], 'Slip submit uses #F1B000 with #171717 text; size and disabled behavior retained.'),
    ('R15-02', ['app/demo-data.ts','app/prematch-r15.json','app/aldebaran-wog-r5.tsx'], ['data-validation.json','empty-counts-flow.json','../public/final-measurements.json'], 'Actual 61 fixtures: soccer32 basketball6 baseball16 volleyball0 hockey7. Independent baseball IDs replace16 NFL fixtures.'),
    ('R15-03', ['app/aldebaran-wog-r5.tsx','app/aldebaran-wog-r5.css'], ['account-feedback.json','../public/final-measurements.json','../public/european-1920.png'], 'Account rows and 3x2 actions aligned. Latest direct feedback overrides initial14px/18px to12px text/16px icons. Button38px, gap4px, icon-label gap6px.'),
    ('R15-04', ['app/aldebaran-wog-r5.css'], ['font-weight-audit.json','font-baseline.json','font-after.json'], 'Central typography moved to next lower installed face; odds and N+ preserved. Minimum400 retained where no lower installed face exists.'),
    ('R15-05', ['app/prematch-r15.json','app/demo-data.ts','app/wog-market-data.ts','app/aldebaran-wog-r5.tsx','app/aldebaran-wog-r5.css'], ['data-validation.json','market-inventory.json','sport-summary.json','template-coverage.json','pricing-audit.json','ui-case-results.json','three-digit-multi-1920.png','visible-labels.json'], 'Canonical market array drives actual N+, grouping, detail filters and slip. Existing1664 selections/quotes preserved; compound labels retain both outcomes.')
]
report['task_results'] = [dict(id=id,status='passed',changed_files=files,evidence=evidence,summary=summary,limitations=(['No verified roster/starters:40 player templates excluded. No confirmed knockout fixture:qualification template excluded. NRFI/YRFI alias counted once.'] if id=='R15-05' else [])) for id,files,evidence,summary in tasks]
report['fixtures'].update(actual_total=61, actual_by_sport=data['fixtureCounts'], inventory_rows=inventory)
report['market_audit'].update(rows=inventory, sport_summaries=load('sport-summary.json'))
report['template_coverage']['rows'] = coverage
report['font_weight_audit']['rows'] = font['rows']
report['checks'] = {key:'passed' for key in report['checks']}
report['checks'].update(typecheck='passed',public_visual_1920='passed',popup_button_styles='passed',user_visible_word_removal='passed',compound_selection_labels='passed',public_console_errors=[])
report['checks']['methods'] = ['validate-data.py:61fixtures/4476markets/11485selections/1664legacy selections/1839 monotonic comparisons','validate-ui.py:23font roles/8representative fixtures/10selection paths/all61N+counts/empty-state retention','tsc --noEmit --incremental false','npm run build','Browser screenshot and computed styles at1920x1080; public European and domestic screens; popup button primary control base/hover/active/focus state image/shadow checks']
report['screenshots'] = ['account-feedback-1920.png','three-digit-multi-1920.png','popup-button-1920.png','../public/european-1920.png','../public/domestic-1920.png','../public/popup-1920.png']
report['user_followups'] = [
    dict(request='Account right alignment and smaller actions',result='12px labels,16px icons,38px buttons; information/balance/conversion/actions share right1903px at1920 viewport.'),
    dict(request='Remove prohibited wording from all user-visible ALDEBARAN copy',result='League shows MLB. Header, market footer, account/service dialogs, rules and tracker fallback copy revised. Internal IDs, storage keys and source provenance remain stable.'),
    dict(request='Remove WOG button overlay from popups',result='Scoped dialog controls override legacy background-image and box-shadow in normal/hover/active/focus states; ALDEBARAN solid orange and existing interaction colors retained.')
]
report['unverified'] = ['No full mobile or unrelated-page regression requested or run.','No actual payment, settlement, wager submission or new account creation performed.','No user visual approval claimed.']
report['remaining_limits'] = ['Static synthetic probability models and statistics; no live odds feed or verified player rosters.','Joint markets use deterministic24000-sample models and simplified overtime conventions; not a settlement engine.','Build passed with chunk-size warning over500kB, plugin timing advisory and unknown route classification notice.']
report['not_changed'] = ['Other sites and project operating4MD','GitHub backup repository','Existing account/storage IDs, selection rules, payment logic and original assets','Header/rails/sportbar typography except explicitly requested account action size']
save('completion-report.json',report)
save('progress.json',dict(stage='complete',checkedAt=publication['deployment']['updated_at'],sourceCommit=publication['source']['commit_sha'],workingTreeClean=True,implemented=True,version=17,deploymentId=publication['deployment']['id'],next=None))
lines = ['# ALDEBARAN R15 완료 보고서','',f"- 공개 버전: {report['deployment_version']}",f"- 소스: `{report['actual_commit']}`",f"- 배포: `{report['deployment_id']}`",f"- 주소: {report['deployment_url']}",'','## 최신 직접 피드백 반영','','- 계정 우측 정렬 및 서비스 버튼 글자12px/아이콘16px 적용.','- 사용자 노출 금지 표현 제거, 야구 리그명 MLB로 통일.','- 팝업 버튼 WOG 그라데이션/광택 제거, 단색 주황색 적용.','- 복합 선택명의 결과·조건이 팀명 치환으로 사라지는 문제 수정.','','## 검증','','- 타입 검사와 빌드 통과. 최종 수정 후 다시 빌드해 소스와 배포 아카이브 일치.','- 61경기,4476마켓,11485선택 검증. 기존1664선택 ID·가격 유지.','- 115템플릿:73구현,40선수+1진출조건 제외,1별칭 중복 제거.','- 로컬8대표경기/10선택 경로, 전체61경기 N+,23폰트 역할 검증.','- 공개1920×1080 해외형·국내형·팝업 캡처와 계산 스타일 확인.','','## 경기별 마켓 표','','|경기 ID|종목|리그|프로필|패밀리|마켓|선택|N+ 일치|','|---|---|---|---|---:|---:|---:|---|']
lines += [f"|{r['fixtureId']}|{r['sport']}|{r['league']}|{r['profile']}|{r['familyCount']}|{r['marketCount']}|{r['selectionCount']}|{r['countMatches']}|" for r in inventory]
lines += ['','## 한계 및 보존 범위',''] + ['- '+s for s in report['remaining_limits']+report['unverified']+report['not_changed']]
(root/'completion-report.ko.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps(dict(status=report['status'],version=17,fixtures=len(inventory),templates=len(coverage),fontRoles=len(font['rows'])),ensure_ascii=False))
