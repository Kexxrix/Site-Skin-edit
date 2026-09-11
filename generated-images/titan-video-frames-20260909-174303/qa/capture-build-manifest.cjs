const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const root = 'E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
(async () => {
  const inspections = JSON.parse(await fs.readFile(path.join(root,'qa','capture-sports-details.json'),'utf8'));
  const inspectFile = async filename => {
    const absolutePath=path.join(root,'sources',filename), bytes=await fs.readFile(absolutePath), stat=await fs.stat(absolutePath);
    if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error('Not a PNG: '+filename);
    return {file:filename,absolutePath,format:'png',pixelSize:{width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)},bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),savedAt:stat.mtime.toISOString()};
  };
  const cat=await inspectFile('cat-village-tablet.png');
  const reasons={
    aures:'스포츠 첫 경기 우측 팀명이 잘리며 아래 카지노 사진이 화면의 큰 부분을 차지함.',
    cobalt:'스포츠 카드 2개와 다음 경기 일부가 보임. 팀명, 점수, 배당의 대비가 높고 카지노 이미지가 섞이지 않아 상세 크롭 후보 중 가독성이 가장 좋음.',
    lumiere:'스포츠 한 경기의 배당은 읽히지만 상단 메뉴 일부가 잘리고 아래 카지노 사진이 커서 스포츠 강조가 약함.'
  };
  const candidates=[];
  for(const entry of inspections){
    if(entry.error){candidates.push(entry);continue;}
    const file=await inspectFile(path.basename(entry.screenshot));
    if(file.sha256!==entry.sha256)throw new Error('Capture hash changed: '+entry.id);
    candidates.push({id:entry.id,url:entry.url,httpStatus:entry.httpStatus,...file,requestedViewport:entry.requestedViewport,deviceScaleFactor:entry.deviceScaleFactor,emulation:'narrow desktop browser viewport',scroll:entry.scrollState,mobile_native:false,desktop_detail_crop:true,uiModified:false,comparison:reasons[entry.id],navigation:{iframes:entry.navigation.iframes,mobileControls:entry.navigation.mobileControls,providedLinks:entry.navigation.links}});
  }
  const manifest={
    createdAt:new Date().toISOString(),
    method:'Headless Chrome through bundled Playwright; raw viewport screenshots. Only public page reads and scrolling. No login, bets, DOM/CSS/content changes, image deformation, or added data.',
    tablet:{id:'cat-village',url:'https://titan-solution-t01.pages.dev/',httpStatus:200,...cat,requestedViewport:{width:1200,height:900},deviceScaleFactor:1,scroll:{x:0,y:0},uiModified:false,visibleState:'로고, 추천 게임 카드, 고양이 캐릭터 일러스트가 보이는 기본 공개 화면. 모달 없음.',sourceDataNote:'공개 데모가 원래 표시하는 문구와 샘플 숫자를 그대로 캡처함.'},
    sportsbook:{mobileNativeAvailable:false,layoutFinding:'All three supplied demos use main width/min-width 1920px. No mobile-view link, iframe app, or separate mobile sports route was exposed by the inspected DOM.',recommendedCandidate:'cobalt',selectionStatus:'candidate_only_pending_parent',chosenFile:null,candidates}
  };
  await fs.writeFile(path.join(root,'sources','capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(JSON.stringify({manifest:path.join(root,'sources','capture-manifest.json'),verifiedImages:1+candidates.filter(c=>!c.error).length,recommendedCandidate:'cobalt',selectionStatus:manifest.sportsbook.selectionStatus}));
})();
