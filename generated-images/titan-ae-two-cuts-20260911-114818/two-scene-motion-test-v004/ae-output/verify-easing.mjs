import {run} from './ae-client.mjs';
import {readFile,writeFile} from 'node:fs/promises';
const tr=n=>['Transform',n];
const review02=process.argv.includes('--review02');
const main=review02?458:330,ipad=review02?485:356;
const c=1.70158,backPeak=1-2*c/(3*(c+1));
const curves={easeOutBack:u=>1+(c+1)*(u-1)**3+c*(u-1)**2,easeOutQuint:u=>1-(1-u)**5,easeInOutQuad:u=>u<.5?2*u*u:1-(-2*u+2)**2/2,easeInQuad:u=>u*u,easeOutCubic:u=>1-(1-u)**3};
const cases=[];
const add=(name,comp,layer,property,frames,curve,start,end,axis=0,localOffset=0)=>cases.push({name,comp,layer,property,frames,curve,start,end,axis,localOffset});
const animators=['V004_Staggered_Back','V004_e1_Back','V004_e2_Back','V004_t_Back'];
for(let i=0;i<4;i++)add(['M','e1','e2','t'][i],main,'C01_TXT_MEET',['Text','Animators',animators[i],'Properties','ADBE Text Position 3D'],[5*i,24+5*i],'easeOutBack',[620,460,330,230][i],0,1);
add('arc-scale',main,'C01_ARC',tr('Scale'),[24,51],'easeOutQuint',27,100);
add('arc-center-x',main,'C01_ARC',tr('Position'),[24,51],'easeOutQuint',815,675);
add('TITAN-horizontal',main,'C01_TXT_TITAN',tr('Position'),[39,93],'easeInOutQuad',2720,1373.48754882812);
add('type-push',main,'C02_TYPE_RECOIL_CTRL',tr('Position'),[167,174],'easeOutQuint',0,-190);
add('type-return',main,'C02_TYPE_RECOIL_CTRL',tr('Position'),[174,210],'easeOutBack',-190,0);
add('ipad-enter',ipad,'DEVICE_iPad_VIEW',tr('Position'),[155,167],'easeInQuad',65,-17.5,0,4.1);
add('ipad-contact-advance',ipad,'DEVICE_iPad_VIEW',tr('Position'),[167,174],'easeOutQuint',-17.5,-32.5,0,4.1);
add('ipad-retreat',ipad,'DEVICE_iPad_VIEW',tr('Position'),[174,review02?204:214],'easeOutCubic',-32.5,review02?-10:0,0,4.1);
add('ipad-real-y-rotation',ipad,'DEVICE_iPad_VIEW',tr('Y Rotation'),[review02?180:174,214],'easeOutCubic',0,review02?35:-30,null,4.1);
const requests=[];
for(const item of cases){
  item.samples=[];
  for(const u of item.curve==='easeOutBack'?[0,.25,.5,backPeak,.75,1]:[0,.25,.5,.75,1]){
    const globalTime=(item.frames[0]+(item.frames[1]-item.frames[0])*u)/30;
    const time=globalTime-item.localOffset;
    item.samples.push({u,time,globalTime,expected:curves[item.curve](u),requestIndex:requests.length});
    requests.push({operation:'property.get',args:{comp:item.comp,layer:item.layer,property:item.property,time}});
  }
}
const dot={curve:'easeInOutQuad',frames:[51,93],samples:[]};
for(const u of [0,.125,.25,.375,.5,.625,.75,.875,1]){
  const time=(51+42*u)/30;
  dot.samples.push({u,time,expected:curves.easeInOutQuad(u),requestIndex:requests.length});
  requests.push({operation:'property.get',args:{comp:main,layer:'C01_DOT',property:tr('Position'),time}});
}
const records=await run({label:review02?'easing-review02-readback':'easing-readback',calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:requests,stopOnError:true},timeoutMs:120000}}]});
const responses=records[0].response.result.results;
for(const item of cases){
  for(const s of item.samples){const r=responses[s.requestIndex];s.actualValue=r.value;s.hasExpression=r.hasExpression;const value=item.axis===null?r.value:r.value[item.axis];s.actualNormalized=(value-item.start)/(item.end-item.start);s.error=Math.abs(s.actualNormalized-s.expected);}
  item.maxNormalizedError=Math.max(...item.samples.map(x=>x.error));item.pass=item.maxNormalizedError<=0.0001;
}
// Independent numeric arc-length geometry audit of the original cubic Shape Path.
const b=JSON.parse(await readFile(new URL('./log-baseline-catalog-2026-09-11T07-32-11-574Z.json',import.meta.url),'utf8'));
const layer=b.results.find(x=>x.call.name==='ae_layer_info'&&x.call.args.compNameOrId===127).response.result.layers.find(l=>l.name==='C01_ARC');
const shape=layer.contentsGroup.groups[0].groups[0].groups[0].properties.find(p=>p.name==='Path').value;
const points=[],lengths=[];let total=0;
for(let i=0;i<shape.vertices.length-1;i++){
  const a=shape.vertices[i],d=shape.vertices[i+1],b=a.map((v,k)=>v+shape.outTangents[i][k]),c=d.map((v,k)=>v+shape.inTangents[i+1][k]);
  for(let j=i===0?0:1;j<=12000;j++){
    const t=j/12000,q=1-t,p=[0,1].map(k=>q*q*q*a[k]+3*q*q*t*b[k]+3*q*t*t*c[k]+t*t*t*d[k]);
    if(points.length)total+=Math.hypot(p[0]-points.at(-1)[0],p[1]-points.at(-1)[1]);points.push(p);lengths.push(total);
  }
}
for(const s of dot.samples){
  const r=responses[s.requestIndex];s.actualValue=r.value;s.hasExpression=r.hasExpression;
  let best=Infinity,bestLength=0;
  for(let i=0;i<points.length-1;i++){
    const a=points[i],b=points[i+1],v=[b[0]-a[0],b[1]-a[1]],p=r.value;
    const t=Math.max(0,Math.min(1,((p[0]-a[0])*v[0]+(p[1]-a[1])*v[1])/(v[0]*v[0]+v[1]*v[1])));
    const distance=Math.hypot(p[0]-a[0]-t*v[0],p[1]-a[1]-t*v[1]);
    if(distance<best){best=distance;bestLength=lengths[i]+t*(lengths[i+1]-lengths[i]);}
  }
  s.pathDistancePixels=best;s.actualArcLengthProgress=bestLength/total;s.normalizedError=Math.abs(s.actualArcLengthProgress-s.expected);
}
dot.totalArcLengthPixels=total;dot.geometryTolerancePixels=.1;dot.maxPathDistancePixels=Math.max(...dot.samples.map(s=>s.pathDistancePixels));dot.maxNormalizedError=Math.max(...dot.samples.map(s=>s.normalizedError));dot.pass=dot.maxPathDistancePixels<=.1&&dot.maxNormalizedError<=.0001;
const result={method:'Live Beta property.get(time) reads; independent JavaScript reference easing and dense cubic arc-length integration. No frame-time rounding.',normalizedTolerance:.0001,backPeakU:backPeak,cases,dot,allPassed:cases.every(x=>x.pass)&&dot.pass};
await writeFile(new URL(review02?'./EASING-VERIFICATION-review02.json':'./EASING-VERIFICATION.json',import.meta.url),JSON.stringify(result,null,2),{flag:'wx'});
console.log(JSON.stringify({allPassed:result.allPassed,cases:cases.map(x=>({name:x.name,error:x.maxNormalizedError,pass:x.pass})),dot:{pass:dot.pass,maxNormalizedError:dot.maxNormalizedError,maxPathDistancePixels:dot.maxPathDistancePixels}},null,2));
