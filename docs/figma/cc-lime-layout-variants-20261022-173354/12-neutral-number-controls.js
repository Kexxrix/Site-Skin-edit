const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);
const mutatedNodeIds=[];
for(const id of ["930:1995","925:1784"]){
 const top=await figma.getNodeByIdAsync(id),buttons=top.findAll(n=>n.name.startsWith("Select "));
 const first=buttons.find(n=>n.name.includes("페이백")),normal=buttons.find(n=>n.name.includes("회원"));
 for(const key of ["fills","strokes","effects","strokeWeight","strokeAlign"])first[key]=JSON.parse(JSON.stringify(normal[key]));
 mutatedNodeIds.push(first.id);
}
return {mutatedNodeIds,reason:"모든 번호를 동일한 이동 컨트롤로 표현하여 슬라이드 이동 뒤 고정 활성 표시가 남지 않도록 정리"};
