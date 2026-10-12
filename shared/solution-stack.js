(()=>{
 'use strict';
 for(const stack of document.querySelectorAll('.solution-stack')){
  const cards=[...stack.querySelectorAll('.solution-stack-card')];
  let selected=null,hoverLocked=false,unlockTimer;
  function front(card){
   if(selected===card)return;
   const previousImage=selected?.querySelector('img:not(.solution-stack-outgoing)');
   clearTimeout(unlockTimer);
   hoverLocked=false;
   stack.querySelectorAll('.solution-stack-outgoing').forEach(image=>image.remove());
   stack.querySelectorAll('.solution-stack-incoming').forEach(image=>image.classList.remove('solution-stack-incoming'));
   const deck=[...cards.filter(c=>c!==card),card];
   deck.forEach((c,slot)=>{
    const active=c===card;
    c.style.setProperty('--stack-slot',slot);
    c.style.setProperty('--stack-order',slot+1);
    c.dataset.front=String(active);
    c.setAttribute('aria-pressed',String(active));
   });
   if(selected&&!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches){
    hoverLocked=true;
    const outgoing=previousImage.cloneNode(true);
    outgoing.className='solution-stack-outgoing';
    outgoing.alt='';
    outgoing.setAttribute('aria-hidden','true');
    card.append(outgoing);
    card.querySelector('img:not(.solution-stack-outgoing)').classList.add('solution-stack-incoming');
    unlockTimer=setTimeout(()=>{
     outgoing.remove();
     card.querySelector('img').classList.remove('solution-stack-incoming');
     hoverLocked=false;
    },520);
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
