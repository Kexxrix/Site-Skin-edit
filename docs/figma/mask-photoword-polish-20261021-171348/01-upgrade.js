await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(cfg.pageId));
const made=[],changed=[],removed=[],cards=[],compactStyles={};
const keep=cfg.cards.filter(c=>['A0','B2'].includes(c.variant));const fonts=new Map();for(const d of keep)for(const t of figma.getNodeById(d.id).findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
for(const d of keep){const n=figma.getNodeById(d.id);const out={...d};
if(d.variant==='A0'){
 const group=n.children.find(c=>c.name==='Portrait in front · native mask'),mask=group.children.find(c=>c.isMask),old=mask.children.filter(c=>c.type==='VECTOR');
 const svg=figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="522.666667" height="256" viewBox="0 0 1568 768"><path fill="white" fill-rule="nonzero" d="'+contours[d.role]+'"/></svg>');
 const vectors=[...svg.children];for(const v of vectors){mask.appendChild(v);v.name='Silhouette · traced '+d.role;made.push(v.id);}removed.push(svg.id);svg.remove();for(const v of old){removed.push(v.id);v.remove();}
 mask.name='Portrait / prop silhouette · refined editable vector';changed.push(mask.id,group.id,n.id);out.maskId=mask.id;out.contourIds=vectors.map(v=>v.id);
 n.description='A0. 기존 와이드 실버 구성 유지. 동일한 원본 사진의 머리·머리카락·어깨·팔·소품을 각각 추적한 벡터 알파 마스크. 522.67 × 256 / R6. 텍스트·사진·마스크·금색 바로가기 분리.';
}else{
 const t=figma.getNodeById(d.displayIds[0]),edge=figma.getNodeById(d.displayIds[1]),prop=edge.componentPropertyReferences?.characters;
 const font=t.fontName;t.fontSize=82;t.lineHeight={unit:'PIXELS',value:94};t.letterSpacing={unit:'PIXELS',value:0};t.textAutoResize='WIDTH_AND_HEIGHT';let ls=(264-t.width)/t.characters.length;t.letterSpacing={unit:'PIXELS',value:ls};ls+=(264-t.width)/t.characters.length;
 const style=figma.createTextStyle();style.name='P23/Selected/B2/'+d.role+'/Compact photo word';style.fontName=font;style.fontSize=82;style.lineHeight={unit:'PIXELS',value:94};style.letterSpacing={unit:'PIXELS',value:ls};style.leadingTrim='NONE';await t.setTextStyleIdAsync(style.id);t.textAutoResize='WIDTH_AND_HEIGHT';t.x=18;t.y=69;t.strokes=[];
 const photo=t.parent.children.find(c=>c.type==='RECTANGLE');photo.fills=photo.fills.map(p=>p.type==='IMAGE'?{...p,filters:{...(p.filters||{}),exposure:.24,contrast:.3,shadows:.14}}:p);
 removed.push(edge.id);edge.remove();if(prop&&prop!==t.componentPropertyReferences?.characters)n.deleteComponentProperty(prop);
 changed.push(n.id,t.id,photo.id,t.parent.id);out.displayIds=[t.id];out.compactStyleId=style.id;compactStyles[d.role]=style.id;
 n.description='B2. 상단 한글 제목과 금색 바로가기 유지. 사진 글자 폭 약 264px로 축소. 중복 외곽선 레이어 삭제. 원본 사진·텍스트 마스크 유지, 글자 내부 사진만 노출을 보정. 522.67 × 256 / R6.';
}cards.push(out);}
// Update temporary tracing views from the same native vectors, for visual inspection only.
for(const f of qaFrames.frames){const frame=figma.getNodeById(f.id),old=figma.getNodeById(f.contour),master=figma.getNodeById(keep.find(d=>d.variant==='A0'&&d.role===f.role).id),mask=master.findOne(c=>c.name==='Portrait / prop silhouette · refined editable vector').clone();frame.appendChild(mask);mask.isMask=false;mask.x=0;mask.y=0;mask.rescale(3);mask.name='New contour · cyan';made.push(mask.id);for(const v of mask.findAllWithCriteria({types:['VECTOR']})){v.fills=[];v.strokes=[{type:'SOLID',color:{r:0,g:1,b:1}}];v.strokeWeight=2;made.push(v.id);}removed.push(old.id);old.remove();changed.push(frame.id);}
return{createdNodeIds:made,mutatedNodeIds:changed,removedNodeIds:removed,cards,compactStyles};
