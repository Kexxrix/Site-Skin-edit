from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,shutil
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];SITE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site')
def load(name):return json.loads((ROOT/name).read_text(encoding='utf-8'))
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
preserved=load('source-preservation.json');qa=load('odds-QA.json');dialogs=load('dialogs-stable-QA.json');uploads=load('Page-uploads.json')
assert qa['failure'] is None and len(qa['checks'])==10 and len(dialogs['checks'])==2
for u in uploads['uploads']:
    p=ROOT/u['file'];assert sha(p)==u['sha256'] and p.stat().st_size==u['byte_size'] and u['file_access_confirmed']
    with Image.open(p) as im:assert im.format=='PNG';im.verify()
snapshot=ROOT/'after-app';snapshot.mkdir()
for row in preserved['changed_files']:
    file=SITE/row['path'];assert sha(file)==row['sha256'];shutil.copy2(file,snapshot/file.name);assert sha(snapshot/file.name)==row['sha256']
report={'completed_utc':datetime.now(timezone.utc).isoformat(),'target':str(SITE),'HEAD_branch':'N/A;existing Gitless local white copy',
 'status':'Scoped odds text implementation and implementation QA complete;independent QA assigned separately',
 'user_icon_approval':'확인했음. 아이콘은 쓰면 되겠어.','approved_icons_kept':True,
 'changes':'Default odds graphite;existing selected dark graphite chosen after white comparison;two inline wrappers isolate mixed money/odds text',
 'changed_files':preserved['changed_files'],'documentation':'sports-demo-03-white/STATE.md appended latest v1.4,prior records preserved',
 'after_source_snapshot':'after-app/','baseline_source_snapshot':'before-app/','baseline_inventory':'baseline-files.json',
 'color_scope':['liveR5 list odds','liveR5 detail odds','selected odds labels+numbers','slip individual+total odds','confirmation individual+total odds','history individual+total odds'],
 'retained_semantic_colors':['account balance','potential payout money','notice/event/attendance accents','disabled/locked states'],
 'odds_direction_colors':'No dedicated rising/falling color channel in active R5 odds markup;archived modules untouched',
 'contrast_basis':{'source':'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html','small_text_minimum':4.5,'judgment':'unrounded ratios from settled computed sRGB colors;visual native-size review also performed;not a whole-site conformance claim'},
 'contrasts':{'default':9.571538397227945,'default_hover':7.628691344917841,'selected_graphite':4.801582987182178,
             'selected_hover_graphite':5.451082943380378,'selected_white_rejected':2.9599750528988746,
             'selected_hover_white_rejected':2.607292166365253,'slip':8.997529379172098,'confirmation':8.222784345134599,'history':8.997529379172098},
 'font_geometry':'Original fonts/sizes/weights/padding/dimensions retained;14px/950 list and14px/900 detail computed;12px labels',
 'background':'Existing #ff641f selected/#ff793d selected-hover retained;actual background-image:none',
 'validation':{'native_state_measurements':len(qa['rows']),'initial_graphite_odds_elements':566,'implementation_checks':10,'settled_dialog_checks':2,
               'states':['normal','hover','selected','selected-hover','keyboard-focus','selected-focus-hover'],
               'viewports':['1920x1080','1366x900','390x844'],'type':load('type-result.json'),'build':load('build-result.json'),'lint':load('lint-result.json'),
               'runtime':'No app/page/localHTTP/PNG error or warnings;preexisting externalAdobe3 URLs denied in each isolatedcontext',
               'dialog_scope':'Test fixture in isolated localStorage;confirmation/history opened and closed,no transactions submitted',
               'comparison':'Temporary browser-only white/graphite styles;live code untouched during comparison',
               'transitions':'Computed color measurements waited for CSS animations/transitions;portals separately asserted cumulative opacity1'},
 'preservation':preserved,'Page_uploads':uploads,'Page_body_edited':False,'server_final':load('server-final-check.json'),
 'no_deployment_push_commit_or_git_creation':True,'MERCURY5416_touched':False,'existing_IAB_or_user_browser_storage_used':False,
 'images_regenerated':0,'transactions_submitted':0,'new_paid_API_packages_or_security_changes':False,
 'remaining':'Parent-managed independent QA and final color visual review;known preexisting font-network restriction/lint/build advisories',
 'valid_evidence':['comparison-stable/selected-ink-comparison.png','odds-before-after.png','after-selected-1920.png','dialogs-stable/confirmation.png','dialogs-stable/history.png'],
 'preliminary_evidence':'Root-level initial comparison/measurements and initial portal screenshots captured transitions;preserved forhistory,not used for final judgment'}
with (ROOT/'completion.json').open('x',encoding='utf-8') as f:json.dump(report,f,ensure_ascii=False,indent=2)
print(json.dumps({'changed_files':report['changed_files'],'Page_verified_images':3,'type':report['validation']['type']['exit_code'],'build':report['validation']['build']['exit_code'],'new_lint':0,'server':report['server_final']}))
