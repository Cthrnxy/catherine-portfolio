(()=>{
 'use strict';
 const frames=[...document.querySelectorAll('[data-design-decision]')];
 if(!frames.length)return;
 const settings=frame=>{
  const heading=document.querySelector('.solution h2')||document.querySelector('.story h2');
  if(!heading)return;
  const style=getComputedStyle(heading);
  frame.contentWindow?.postMessage({type:'design-decision:settings',headingSize:parseFloat(style.fontSize),headingWeight:style.fontWeight,headingFamily:style.fontFamily,headingLineHeight:style.lineHeight,headingSpacing:style.letterSpacing},'*');
 };
 const load=frame=>{if(frame.dataset.loaded)return;frame.dataset.loaded='true';frame.src=frame.dataset.src;};
 window.addEventListener('message',event=>{
  const frame=frames.find(item=>item.contentWindow===event.source);
  if(!frame||!event.data||typeof event.data.type!=='string')return;
  if(event.data.type==='design-decision:ready'){settings(frame);return;}
  if(event.data.type==='design-decision:size'){
   const height=Number(event.data.height);if(Number.isFinite(height)&&height>0&&height<10000)frame.style.height=Math.ceil(height)+'px';return;
  }
  if(event.data.type==='design-decision:pointer'){
   const x=Number(event.data.x);if(Number.isFinite(x))document.dispatchEvent(new MouseEvent('mousemove',{clientX:frame.getBoundingClientRect().left+x,bubbles:true}));return;
  }
  if(event.data.type==='design-decision:escape')document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 });
 frames.forEach(frame=>frame.addEventListener('load',()=>settings(frame)));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}},{rootMargin:'300px 0px',threshold:.01});frames.forEach(frame=>observer.observe(frame));}
 else frames.forEach(load);
 window.addEventListener('resize',()=>frames.forEach(frame=>{if(frame.dataset.loaded)settings(frame);}));
})();
