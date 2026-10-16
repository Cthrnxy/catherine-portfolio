(()=>{
 'use strict';
 if(window.parent===window)return;
 const stage=document.getElementById('stage');
 if(!stage)return;
 const send=data=>window.parent.postMessage(data,window.location.origin);
 let pending=false,lastHeight=0;
 const measure=()=>{
  pending=false;
  const height=Math.ceil(Math.max(stage.getBoundingClientRect().bottom,stage.offsetTop+stage.scrollHeight));
  if(height>0&&height!==lastHeight){lastHeight=height;send({type:'design-decision:size',height});}
 };
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(measure);}};
 window.addEventListener('message',event=>{
  if(event.source!==window.parent||event.origin!==window.location.origin||event.data?.type!=='design-decision:settings')return;
  const data=event.data;
  for(const [key,value] of Object.entries(data.styles||{})){
   if(key.startsWith('--case-')&&typeof value==='string')stage.style.setProperty(key,value);
  }
  window.designDecisionViewportHeight=data.viewportHeight;
  window.dispatchEvent(new Event('resize'));
  schedule();
 });
 window.scrollDecisionTarget=(target,block)=>{
  const rect=target.getBoundingClientRect();
  send({type:'design-decision:scroll',top:rect.top,bottom:rect.bottom,block});
 };
 new ResizeObserver(schedule).observe(stage);
 new MutationObserver(schedule).observe(stage,{childList:true,subtree:true,attributes:true,characterData:true});
 window.addEventListener('load',schedule);
 document.fonts?.ready.then(schedule);
 window.addEventListener('pointermove',event=>send({type:'design-decision:pointer',x:event.clientX}),{passive:true});
 window.addEventListener('keydown',event=>{if(event.key==='Escape')send({type:'design-decision:escape'});});
 send({type:'design-decision:ready'});schedule();
})();
