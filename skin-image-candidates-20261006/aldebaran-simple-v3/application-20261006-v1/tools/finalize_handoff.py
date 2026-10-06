from pathlib import Path
from datetime import datetime,timezone
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text(encoding='utf-8'))
roles={
'sport-all':'종목 전체 탭',
'sport-soccer':'축구 탭·인기 스포츠 리스트·최신 인기 게임',
'sport-basketball':'농구 탭·인기 스포츠 리스트·최신 인기 게임',
'sport-baseball':'야구 탭·인기 스포츠 리스트·해당 최신 경기',
'sport-volleyball':'배구 탭·인기 스포츠 리스트',
'sport-hockey':'아이스하키 탭·인기 스포츠 리스트·최신 인기 게임',
'sport-formula1':'포뮬라1 탭·인기 스포츠 리스트',
'sport-boxing':'복싱 탭·인기 스포츠 리스트',
'sport-mma':'MMA 탭·인기 스포츠 리스트',
'sport-motorsport':'모터스포츠 탭·인기 스포츠 리스트',
'action-deposit':'충전 빠른 메뉴·계정 동작',
'action-withdraw':'환전 빠른 메뉴·계정 동작',
'action-support':'고객센터 공지 링크·빠른 메뉴·계정 동작·고객센터 창',
'action-message':'계정 쪽지 동작',
'action-gift':'이벤트게시판 링크·페이백 동작',
'action-notice':'공지사항 링크',
'action-attendance':'출석체크 링크·달력의 체크 상태',
'state-empty-slip':'빈 슬립·기존 티켓 역할(빈 상세·베팅 버튼)',
}
copies=load('asset-copy-record.json');protection=load('preservation-and-regression.json');qa=load('interaction-qa.json')
assert qa['failure'] is None and len(qa['checks'])==22
for row in copies:
    row['role_key']=Path(row['target']).stem;row['existing_usage']=roles[row['role_key']]
    row['approval']='User requested icon application (Sentinel_3cc294c6274c81918a6b32201d3dbcf5)'
    row['local_site_adopted']=True;row['public_deployment']=False
report={'completed_utc':datetime.now(timezone.utc).isoformat(),'target':'E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site',
 'target_HEAD':None,'target_branch':None,'target_git_reason':'Existing local-only copy has no Git repository;none created',
 'reference_original_HEAD':load('before-files.json')['reference_HEAD'],'scope':'18 approved icons and minimum sizing/native-color style overrides',
 'status':'Local implementation and implementation QA complete;parent-assigned independent QA pending',
 'approval_source':'Sentinel_3cc294c6274c81918a6b32201d3dbcf5','local_icon_application_approved':True,
 'server':{'url':'http://127.0.0.1:5384/','running_PID':27700,'HTTP':200,
           'operation':'Reused already-running vinext server for this exact white app. Launcher35604 exited after detecting existing27700;no shutdown/restart/duplicate server.',
           'evidence':'server.stderr.log;netstat listener;HTTP200;isolated Chrome page identity and source PNG hashes'},
 'changed_files':protection['changed_file_hashes'],'asset_count':18,'asset_bytes':sum(r['bytes'] for r in copies),'assets':copies,
 'unused_approved_assets':[],'legacy_roles_preserved':['rules','history','logout','success-check','empty-search'],
 'preservation':protection,'type':load('type-result.json'),'build':load('build-result.json'),'lint':load('lint-result.json'),
 'implementation_QA':{'passed_checks':22,'viewports':['1920x1080','1366x900','390x844'],'source':'interaction-qa.json',
                      'page_errors':0,'local_request_failures':0,'HTTP_errors':0,'missing_images':0,'framework_overlay':False,
                      'transactions_submitted':0,'isolated_storage_only':True,'known_external_failures':qa['failedRequests']},
 'limitations':['External Adobe3 resources blocked by execution network;same failures existed before icon change',
                'Existing lint21 diagnostics retained;new findings0;full lint not PASS',
                'Existing build chunk>500kB/plugin timings/route classification advisories retained',
                'Independent QA belongs to separately assigned parent thread;not asserted complete here',
                'Actual transactions/authenticated submissions/public deployment not performed'],
 'Page_screen_uploads':load('Page-screen-uploads.json'),'source_images_overwritten_or_removed':False,
 'site_code_outside_target_changed':False,'remote_push_or_deployment':False,'package_or_security_changes':False,
 'user_browser_or_existing_IAB_used':False,'MERCURY_server_touched':False}
with (ROOT/'application-manifest.json').open('x',encoding='utf-8') as f:json.dump(report,f,ensure_ascii=False,indent=2)
table=['# 알데바란 v3 실제 사용 매핑','', '18종 모두 기존 사용 위치에 연결했습니다. 새 UI 항목은 추가하지 않았습니다. PNG는 승인된 aligned/256 파생본의 정확한 바이트 사본입니다.','', '| 파일 | 기존 사용 위치 | SHA-256 |','| --- | --- | --- |']
for row in copies:table.append('| '+Path(row['target']).name+' | '+row['existing_usage']+' | '+row['sha256']+' |')
table+=['','기존 graphite-20261002의 rules/history/logout/success-check/empty-search와 전체 원본 자산을 보존했습니다. 새18종에 해당하지 않는 기능 이미지는 교체하지 않았습니다.',
        '주요 기능·종목 슬롯은24px, 빈슬립48px, 고객센터 창18px, 달력 체크14px, 실제 비활성 베팅버튼18px·opacity.48은 기존 상태 의미를 유지합니다.']
(ROOT/'APPLICATION-ROLE-MAP.ko.md').write_text('\n'.join(table)+'\n',encoding='utf-8')
print(json.dumps({'file':'application-manifest.json','source_files':2,'new_PNGs':18,'asset_bytes':report['asset_bytes'],'implementation_QA_checks':22}))
