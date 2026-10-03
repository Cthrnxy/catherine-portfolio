(()=>{
 'use strict';
 if(window.parent===window)return;
 const page=document.querySelector('.page');
 let height=-1,pointerQueued=false,pointerX=0;
 const send=message=>window.parent.postMessage(message,'*');
 const reportSize=()=>{const next=Math.ceil(page.getBoundingClientRect().height);if(next>0&&next!==height){height=next;send({type:'design-decision:size',height:next});}};
 const receive=event=>{
  if(event.source!==window.parent||event.data?.type!=='design-decision:settings')return;
  const data=event.data,size=Number(data.headingSize);
  if(!Number.isFinite(size)||size<16||size>100)return;
  const values={'--section-title-size':size+'px','--guide-weight':String(data.headingWeight),'--guide-family':String(data.headingFamily),'--guide-line-height':String(data.headingLineHeight),'--guide-spacing':String(data.headingSpacing)};
  let changed=false;
  for(const [property,value] of Object.entries(values)){
   if(document.documentElement.style.getPropertyValue(property)!==value){document.documentElement.style.setProperty(property,value);changed=true;}
  }
  if(changed)window.dispatchEvent(new Event('resize'));
  reportSize();
 };
 window.addEventListener('message',receive);
 new ResizeObserver(reportSize).observe(page);
 window.addEventListener('resize',reportSize);
 document.fonts.ready.then(reportSize);
 document.addEventListener('mousemove',event=>{pointerX=event.clientX;if(pointerQueued)return;pointerQueued=true;requestAnimationFrame(()=>{pointerQueued=false;send({type:'design-decision:pointer',x:pointerX});});},{passive:true});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')send({type:'design-decision:escape'});});
 send({type:'design-decision:ready'});reportSize();
})();
