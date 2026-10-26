figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const set=await figma.getNodeByIdAsync("487:5107"),out=[],roles=["Logo","Notice · inline","CheckIn","Betting","Telegram","Login","Join","Anonymous"];
for(const c of set.children){
 const nodes=roles.map(name=>c.findOne(n=>n.type==="INSTANCE"&&n.name===name));if(nodes.some(n=>!n))throw Error("Missing role "+c.name);
 const boxes=nodes.map(n=>({name:n.name,...n.absoluteBoundingBox})),root=c.absoluteBoundingBox,centers=boxes.map(n=>n.y+n.height/2);
 const overlaps=[];for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];if(Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>.1&&Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>.1)overlaps.push([a.name,b.name]);}
 const notice=nodes[1],view=notice.findOne(n=>n.type==="FRAME"&&n.name.startsWith("Notice viewport")),texts=view.findAllWithCriteria({types:["TEXT"]});
 const cap=c.findOne(n=>n.type==="FRAME"&&["Wide navigation rail","Account block beside brand","Navigation spotlight plate"].includes(n.name))||(c.name.includes("Layout=07")&&!c.name.includes("07 GoldBand")?c.findOne(n=>n.type==="FRAME"&&n.name==="Quick links"):null);
 out.push({id:c.id,name:c.name,width:c.width,height:c.height,ordered:boxes.every((n,i)=>i===0||n.x>boxes[i-1].x),centerSpread:Math.max(...centers)-Math.min(...centers),
 inside:boxes.every(n=>n.x>=root.x-.01&&n.x+n.width<=root.x+root.width+.01&&n.y>=root.y-.01&&n.y+n.height<=root.y+root.height+.01),overlaps,
 oneNotice:texts.length===1&&texts[0].characters==="서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요.",noTrim:c.findAllWithCriteria({types:["TEXT"]}).every(t=>t.leadingTrim==="NONE"),
 capsule:cap?cap.height:null,auth:cap?nodes.slice(5).map(n=>n.height):null,flatBand:c.name.match(/Layout=07[A-D]/)?{fillType:c.fills[0].type,effects:c.effects.length,style:c.fillStyleId,horizontal:c.fills[0].type==="SOLID"||JSON.stringify(c.fills[0].gradientTransform)===JSON.stringify([[1,0,0],[0,1,0]])}:null});
}
return {headers:out,summary:{directions:set.componentPropertyDefinitions.Layout.variantOptions.length,variants:set.children.length,all1920:out.every(n=>n.width===1920),allOrdered:out.every(n=>n.ordered),allSingleRow:out.every(n=>n.centerSpread<.01),allInside:out.every(n=>n.inside),zeroOverlap:out.every(n=>n.overlaps.length===0),allOneNotice:out.every(n=>n.oneNotice),allNoTrim:out.every(n=>n.noTrim),capsulesMatch:out.filter(n=>n.capsule!==null).every(n=>n.capsule===44&&n.auth.every(h=>h===44)),newBandsFlatHorizontal:out.filter(n=>n.flatBand).every(n=>n.flatBand.effects===0&&n.flatBand.horizontal),legacyFiveUnchangedCount:(await figma.getNodeByIdAsync("473:3635")).children.length}};
