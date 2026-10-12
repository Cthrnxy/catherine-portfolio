(()=>{
 'use strict';
 for(const stack of document.querySelectorAll('.solution-stack')){
  const cards=[...stack.querySelectorAll('.solution-stack-card')];
  function front(card){cards.forEach(c=>{const active=c===card;c.dataset.front=String(active);c.setAttribute('aria-pressed',String(active))});}
  cards.forEach(card=>{
   card.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')front(card)});
   card.addEventListener('pointerdown',()=>{card.wasBehind=card.dataset.front!=='true'});
   card.addEventListener('focus',()=>front(card));
   card.addEventListener('click',event=>{const bringForward=card.wasBehind||card.dataset.front!=='true';card.wasBehind=false;if(bringForward){event.preventDefault();front(card)}});
  });front(cards[0]);
 }
})();
