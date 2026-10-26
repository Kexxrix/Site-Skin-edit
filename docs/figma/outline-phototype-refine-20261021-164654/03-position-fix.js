await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(cfg.pageId));const changed=[];const fonts=new Map();for(const d of cfg.cards)for(const t of figma.getNodeById(d.id).findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
for(const d of cfg.cards){const n=figma.getNodeById(d.id),t=figma.getNodeById(d.titleId),b=figma.getNodeById(d.ctaId);t.layoutPositioning="ABSOLUTE";b.layoutPositioning="ABSOLUTE";t.x=18;b.x=18;t.y=176;b.y=220;
if(d.variant==="A0"||d.variant==="B1"){t.y=204;b.x=d.variant==="A0"?334.6667:324.6667;b.y=202;}
if(d.variant==="A1"){t.y=178;b.y=218;}
if(d.variant==="A2"){t.y=176;b.x=324.6667;b.y=202;}
if(d.variant==="B2"){t.y=18;b.y=202;for(const id of d.displayIds){const a=figma.getNodeById(id);a.x=18;changed.push(id);}}
if(d.variant==="B3")t.y=177;
if(d.variant==="A3"){t.resize(486,32);t.textAutoResize="HEIGHT";t.textAlignHorizontal="CENTER";}
if(d.key==="OutlineDepth"){for(const id of d.displayIds){const a=figma.getNodeById(id);a.y=0;changed.push(id);}for(const id of d.extraDisplayIds){const a=figma.getNodeById(id);if(a.type==="TEXT"){a.y=3;changed.push(id);}}}
if(d.variant==="B0"&&d.role==="Payback")for(const id of d.displayIds){figma.getNodeById(id).y=0;changed.push(id);}
changed.push(t.id,b.id);
}return{mutatedNodeIds:changed,reason:"Absolute positioning for newly reparented caption/CTA; left anchored photo word in B2; no text bounds above card"};
