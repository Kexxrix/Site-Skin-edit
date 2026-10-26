figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const set=await figma.getNodeByIdAsync("487:5107"),changed=new Set();
const fonts={};for(const t of set.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts[JSON.stringify(s.fontName)]=s.fontName;
await Promise.all(Object.values(fonts).map(f=>figma.loadFontAsync(f)));
function move(parent,child,index){parent.insertChild(index,child);changed.add(parent.id);changed.add(child.id);}
function one(root,name){const n=root.findOne(n=>n.name===name);if(!n)throw Error("Missing "+name+" in "+root.name);return n;}
function height(n,h){n.resize(n.width,h);if("counterAxisSizingMode"in n)n.counterAxisSizingMode="FIXED";changed.add(n.id);}
const result=[];
for(const c of set.children){
 const index=Number(c.name.match(/Layout=(\d+)/)[1]),row=c.children.find(n=>n.type==="FRAME");
 if(index===1){const p=one(c,"Content axis");move(p,one(c,"Notice · inline"),0);}
 if(index===5)move(row,one(c,"Notice · inline"),1);
 if(index===6){move(row,one(c,"Notice area"),1);const plate=one(c,"Wide navigation rail");height(plate,44);plate.cornerRadius=22;}
 if(index===9){const p=one(c,"Detached utility island");move(p,one(c,"Notice · inline"),0);}
 if(index===10){
   const notice=one(c,"Notice · inline"),quick=one(c,"Quick links"),account=one(c,"Account block beside brand"),divider=one(c,"Functional divider");
   [row.children[0],notice,quick,divider,account].forEach((n,i)=>move(row,n,i));
   height(account,44);height(one(c,"Member access"),44);
   for(const name of ["Login","Join","Anonymous"])height(one(c,name),44);
 }
 if(index===18){const plate=one(c,"Navigation spotlight plate");height(plate,44);plate.cornerRadius=22;}
 if([1,5,6,9,10,18].includes(index)){c.description="로고 → 단일 가로 공지 → 출석체크·베팅내역·고객지원 → 로그인·회원가입·무기명 회원가입. 기존 헤더 구조와 스킨 유지.";changed.add(c.id);}
 const semantic=["Logo","Notice · inline","CheckIn","Betting","Telegram","Login","Join","Anonymous"].map(name=>{const n=c.findOne(n=>n.type==="INSTANCE"&&n.name===name);return n?{id:n.id,name,x:n.absoluteTransform[0][2]-c.absoluteTransform[0][2],y:n.absoluteTransform[1][2]-c.absoluteTransform[1][2],w:n.width,h:n.height}:null;}).filter(Boolean);
 const xs=semantic.map(n=>n.x);
 result.push({id:c.id,name:c.name,sequence:semantic.map(n=>n.name),x:xs,ordered:xs.every((x,i)=>i===0||x>xs[i-1]),height:c.height,
  equalCapsule:[6,10,18].includes(index)?{plate:one(c,index===6?"Wide navigation rail":index===10?"Account block beside brand":"Navigation spotlight plate").height,buttons:["Login","Join","Anonymous"].map(n=>one(c,n).height)}:null});
}
return {createdNodeIds:[],mutatedNodeIds:[...changed],headers:result,summary:{headers:set.children.length,allOrdered:result.every(n=>n.ordered),allCapsules44:result.filter(n=>n.equalCapsule).every(n=>n.equalCapsule.plate===44&&n.equalCapsule.buttons.every(h=>h===44))}};
