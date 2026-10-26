
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const variants=[{"id":"592:5386","theme":"BlackGold","w":520,"h":228,"r":6,"panelCount":7,"fillStyle":"S:2bda6f9d936f37b73a1c4a87b28de7d2c1c459d4,","effectStyle":"S:0dc777e2bef38f3b85f7ec16f454e6f929d16cc3,","boundTextCount":15},{"id":"592:5431","theme":"WhiteGold","w":520,"h":228,"r":6,"panelCount":7,"fillStyle":"S:d28d27aadb237f57ef20c2cf12addaa0ebede343,","effectStyle":"S:a238bca55460c1086984efa917e4078198e69610,","boundTextCount":15}],styleMap={"BlackGold":{"card":"S:2bda6f9d936f37b73a1c4a87b28de7d2c1c459d4,","button":"S:61b84ae6433a0378b84bdc7ef5eb4b397ac451f9,","cardEffect":"S:0dc777e2bef38f3b85f7ec16f454e6f929d16cc3,","buttonEffect":"S:c3aaf66699d04820e928bbb4fcfd809da862d8ad,"},"WhiteGold":{"card":"S:d28d27aadb237f57ef20c2cf12addaa0ebede343,","button":"S:fa875f87bdaa0b70ebd03cc7500183b26a7a5fd0,","cardEffect":"S:a238bca55460c1086984efa917e4078198e69610,","buttonEffect":"S:e081479b5080fa3f3e60e4f79d113d98852f4873,"}},ids=['574:41922','574:41923','574:41924','574:43030','574:43031','574:43032'];
const marketNames=new Set(['Home result','Draw result','Away result','Home handicap','Away handicap','Under','Over']);
function path(n,a){const out=[];while(n.id!==a.id){out.unshift(n.parent.children.findIndex(c=>c.id===n.id));n=n.parent;}return out;}
function at(n,path){for(const i of path)n=n.children[i];return n;}
function signature(n){return JSON.stringify({texts:n.findAllWithCriteria({types:['TEXT']}).map(t=>[t.name,t.characters]).sort(),images:n.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>[c.name,c.fills.find(f=>f.type==='IMAGE').imageHash]).sort()});}
const mutated=[],cards=[];
for(const id of ids){
 const c=await figma.getNodeByIdAsync(id),theme=c.componentProperties.Theme.value,master=await figma.getNodeByIdAsync(variants.find(v=>v.theme===theme).id),before=signature(c),props=c.componentProperties,geometry={w:c.width,h:c.height,sh:c.layoutSizingHorizontal,sv:c.layoutSizingVertical};
 const imageState=c.findAll(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({path:path(n,c),fills:n.fills}));
 const fonts=new Map();for(const t of c.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 c.swapComponent(master);const values={};for(const [key,def]of Object.entries(c.componentProperties)){const old=Object.entries(props).find(([k,v])=>k.split('#')[0]===key.split('#')[0]&&v.type===def.type);if(old)values[key]=old[1].value;}c.setProperties(values);
 c.resize(geometry.w,geometry.h);c.layoutSizingHorizontal=geometry.sh;c.layoutSizingVertical=geometry.sv;
 c.fillStyleId=styleMap[theme].card;c.effectStyleId=styleMap[theme].cardEffect;mutated.push(c.id);
 for(const im of imageState){const n=at(c,im.path);n.fills=im.fills;mutated.push(n.id);}
 const panels=c.findAll(n=>n.type==='FRAME'&&marketNames.has(n.name));
 for(const panel of panels){panel.fillStyleId=styleMap[theme].button;panel.effectStyleId=styleMap[theme].buttonEffect;mutated.push(panel.id);}
 cards.push({id:c.id,theme,main:c.mainComponent.id,w:c.width,h:c.height,r:c.cornerRadius,contentPreserved:signature(c)===before,gradient:c.fills.some(f=>f.type==='GRADIENT_LINEAR'),effectCount:c.effects.length,visiblePanels:panels.length,allPanelsRaised:panels.every(p=>p.fills.some(f=>f.type==='GRADIENT_LINEAR')&&p.effects.length===3),textCount:c.findAllWithCriteria({types:['TEXT']}).length});
}
const sections=[];for(const id of ['574:41902','574:43010']){const root=await figma.getNodeByIdAsync(id);sections.push({screen:id,section:root.children[1].children[1].children[2].id,w:root.children[1].children[1].children[2].width,h:root.children[1].children[1].children[2].height});}
return {createdNodeIds:[],mutatedNodeIds:[...new Set(mutated)],cards,sections,allPassed:cards.every(c=>c.contentPreserved&&c.gradient&&c.effectCount===2&&c.allPanelsRaised&&c.h===228&&c.r===6)};

