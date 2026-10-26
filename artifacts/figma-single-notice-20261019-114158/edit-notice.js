figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const ticker=await figma.getNodeByIdAsync("484:3633");
const phrase="서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요.";
const changed=new Set(),removed=[],states=[];
for(const c of ticker.children){
  const step=Number(c.name.match(/Step=(\d+)/)[1]);
  const theme=c.name.includes("BlackGold")?"BlackGold":"WhiteGold";
  const view=c.children.find(n=>n.type==="FRAME"&&n.name.startsWith("Notice viewport"));
  const track=view.children[0];
  const texts=track.children.filter(n=>n.type==="TEXT");
  const text=texts[0];
  for(const segment of text.getStyledTextSegments(["fontName"]))await figma.loadFontAsync(segment.fontName);
  text.characters=phrase;
  text.textAutoResize="WIDTH_AND_HEIGHT";
  text.leadingTrim="NONE";
  text.name="Notice message · single";
  for(const duplicate of texts.slice(1)){removed.push(duplicate.id);duplicate.remove();}
  track.resize(view.width,20);
  track.x=0;track.y=0;
  track.name="Notice single-message track";
  track.constraints={horizontal:"STRETCH",vertical:"MIN"};
  const x=[0,view.width/2,view.width+24,-text.width-24][step-1];
  text.x=x;text.y=0;
  text.constraints={horizontal:["MIN","CENTER","MAX","MIN"][step-1],vertical:"MIN"};
  view.clipsContent=true;
  view.overflowDirection="NONE";
  c.description="한 문구만 표시하는 좌→우 자동 공지. 문구가 오른쪽으로 완전히 나간 뒤 왼쪽 바깥에서 재진입. 복제 문구·카운터·화살표 없음. 텍스트 트림 없음.";
  for(const node of [c,view,track,text])changed.add(node.id);
  states.push({id:c.id,step,theme,viewportId:view.id,trackId:track.id,textId:text.id,text: text.characters,x:text.x,textWidth:text.width,viewportWidth:view.width,constraint:text.constraints.horizontal});
}
for(const state of states){
  const next=states.find(n=>n.theme===state.theme&&n.step===(state.step===4?1:state.step+1));
  await (await figma.getNodeByIdAsync(state.id)).setReactionsAsync([{
    trigger:{type:"AFTER_TIMEOUT",timeout:.01},
    actions:[{type:"NODE",destinationId:next.id,navigation:"CHANGE_TO",
      transition:state.step===3?null:{type:"SMART_ANIMATE",easing:{type:"LINEAR"},duration:10},
      resetScrollPosition:false}]
  }]);
}
ticker.description="단일 공지 문구 · 좌→우 가로 자동 이동 · 30초 순환 · 한 문구만 통과 후 재진입 · 문구 복제 없음 · 카운터·화살표 없음";
changed.add(ticker.id);
return {createdNodeIds:[],mutatedNodeIds:[...changed],removedNodeIds:removed,states,summary:{themeCount:2,stateCount:states.length,messagesPerState:1,periodSeconds:30}};
