(()=>{
 'use strict';
 const frames=[...document.querySelectorAll('[data-design-decision]')];
 if(!frames.length)return;
 const settings=frame=>{
  const heading=document.querySelector('.solution h2')||document.querySelector('.story h2');
  const label=document.querySelector('#solutions .eyebrow')||document.querySelector('#overview .eyebrow');
  const shell=document.querySelector('#solutions .shell')||document.querySelector('.shell');
  if(!heading||!label||!shell)return;
  const styles={};
  for(const [prefix,node] of [['heading',heading],['label',label]]){
   const style=getComputedStyle(node);
   for(const [suffix,property] of Object.entries({family:'fontFamily',size:'fontSize',weight:'fontWeight','line-height':'lineHeight',spacing:'letterSpacing',color:'color',transform:'textTransform'}))styles['--case-'+prefix+'-'+suffix]=style[property];
  }
  styles['--case-stage-width']=shell.getBoundingClientRect().width+'px';
  frame.contentWindow?.postMessage({type:'design-decision:settings',styles,viewportHeight:window.innerHeight},window.location.origin);
 };
 const load=frame=>{if(frame.dataset.loaded)return;frame.dataset.loaded='true';frame.src=frame.dataset.src;};
 window.addEventListener('message',event=>{
  const frame=frames.find(item=>item.contentWindow===event.source);
  if(!frame||event.origin!==window.location.origin||!event.data||typeof event.data.type!=='string')return;
  if(event.data.type==='design-decision:ready'){settings(frame);return;}
  if(event.data.type==='design-decision:size'){
   const height=Number(event.data.height);if(Number.isFinite(height)&&height>0&&height<10000)frame.style.height=Math.ceil(height)+'px';return;
  }
  if(event.data.type==='design-decision:scroll'){
   const top=Number(event.data.top),bottom=Number(event.data.bottom);
   if(!Number.isFinite(top)||!Number.isFinite(bottom))return;
   const rect=frame.getBoundingClientRect();
   const start=rect.top+top,end=rect.top+bottom;
   const offset=event.data.block==='start'?start-24:start<24?start-24:end>window.innerHeight-24?end-window.innerHeight+24:0;
   if(offset)window.scrollBy({top:offset,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
   return;
  }
  if(event.data.type==='design-decision:pointer'){
   const x=Number(event.data.x);if(Number.isFinite(x))document.dispatchEvent(new MouseEvent('mousemove',{clientX:frame.getBoundingClientRect().left+x,bubbles:true}));return;
  }
  if(event.data.type==='design-decision:escape')document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 });
 frames.forEach(frame=>frame.addEventListener('load',()=>settings(frame)));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}},{rootMargin:'300px 0px',threshold:.01});frames.forEach(frame=>observer.observe(frame));}
 else frames.forEach(load);
 document.fonts?.ready.then(()=>frames.forEach(frame=>{if(frame.dataset.loaded)settings(frame);}));
 window.addEventListener('resize',()=>frames.forEach(frame=>{if(frame.dataset.loaded)settings(frame);}));
})();
