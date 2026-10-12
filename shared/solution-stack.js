(()=>{
 'use strict';
 for(const stack of document.querySelectorAll('.solution-stack')){
  const cards=[...stack.querySelectorAll('.solution-stack-card')];
  let selected=null,hoverLocked=false,unlockTimer;
  function front(card){
   if(selected===card)return;
   const deck=[...cards.filter(c=>c!==card),card];
   deck.forEach((c,slot)=>{
    const active=c===card;
    c.style.setProperty('--stack-slot',slot);
    c.style.setProperty('--stack-order',slot+1);
    c.dataset.front=String(active);
    c.setAttribute('aria-pressed',String(active));
   });
   if(selected){
    hoverLocked=true;
    clearTimeout(unlockTimer);
    unlockTimer=setTimeout(()=>{hoverLocked=false},520);
   }
   selected=card;
  }
  cards.forEach(card=>{
   card.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'&&!hoverLocked)front(card)});
   card.addEventListener('focus',()=>front(card));
   card.addEventListener('click',()=>front(card));
  });front(cards[0]);
 }
})();
