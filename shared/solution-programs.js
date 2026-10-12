(()=>{
 'use strict';
 for(const stack of document.querySelectorAll('.program-stack')){
  const screens=[...stack.querySelectorAll('.program-screen')];
  function front(screen){screens.forEach(s=>{s.dataset.front=String(s===screen)})}
  screens.forEach(screen=>{
   screen.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')front(screen)});
   screen.addEventListener('focusin',()=>front(screen));
   screen.addEventListener('click',()=>front(screen));
  });front(screens[0]);
 }
})();
