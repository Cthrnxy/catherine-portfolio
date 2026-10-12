(()=>{
 'use strict';
 window.DecisionTour=class DecisionTour{
  constructor(config){
   this.config=config;this.pages=config.pages;this.index=0;this.timer=null;this.completed=false;
   const q=s=>document.querySelector(s);this.root=q('.decision-tour');this.viewport=q('.tour-viewport');this.surface=q('.tour-surface');this.screen=q('.tour-screen');this.notes=q('.tour-notes');this.controls=q('.tour-controls');this.markers=q('.tour-markers');this.prev=q('[data-tour-prev]');this.next=q('[data-tour-next]');this.count=q('.tour-count');this.guide=q('.tour-guidance');this.status=q('.tour-status');
   this.root.dataset.theme=config.theme;
   this.prev.addEventListener('click',()=>this.go(this.index-1));this.next.addEventListener('click',()=>this.go(this.index+1));q('.tour-restart').addEventListener('click',()=>this.go(0));
   this.viewport.addEventListener('scroll',()=>this.onScroll(),{passive:true});
   this.root.addEventListener('click',event=>{if(event.target.closest('button'))return;for(const h of this.controls.children){h.classList.remove('is-flashing');void h.offsetWidth;h.classList.add('is-flashing')}});
   this.render();
  }
  go(index){if(index<0||index>=this.pages.length)return;this.index=index;this.completed=false;this.render()}
  route(id){const index=this.pages.findIndex(p=>p.id===id);if(index>=0)this.go(index)}
  render(){
   clearTimeout(this.timer);this.timer=null;const p=this.pages[this.index],height=p.height||this.config.height,width=this.config.width;
   this.surface.querySelector('.tour-ghost')?.remove();const programs=['custodial','appliance','english'];
   const ghost=programs.includes(this.currentPage?.id)&&programs.includes(p.id)&&this.currentPage.image!==p.image&&this.screen.complete&&this.screen.naturalWidth?this.screen.cloneNode():null;this.currentPage=p;
   this.root.dataset.page=p.id;this.viewport.scrollTop=0;this.viewport.classList.toggle('is-scrollable',!!p.scroll);this.viewport.style.setProperty('--screen-ratio',width+'/'+(p.scroll?this.config.height:height));this.viewport.setAttribute('aria-label',p.alt+(p.scroll?' — scroll to view the full page':''));
   this.screen.classList.remove('is-entering');void this.screen.offsetWidth;if(!ghost)this.screen.classList.add('is-entering');this.screen.src=p.image;this.screen.alt=p.alt;this.screen.width=width;this.screen.height=height;
   if(ghost){ghost.className='tour-screen tour-ghost';ghost.alt='';ghost.setAttribute('aria-hidden','true');this.surface.append(ghost);const fade=()=>{if(!ghost.isConnected)return;ghost.classList.add('is-leaving');ghost.addEventListener('animationend',()=>ghost.remove(),{once:true});if(matchMedia('(prefers-reduced-motion: reduce)').matches)ghost.remove()};this.screen.decode().then(fade,()=>ghost.remove())}
   this.notes.replaceChildren();this.markers.replaceChildren();
   (p.notes||[]).forEach((note,i)=>{const item=document.createElement('li');item.className='tour-note';const badge=document.createElement('span');badge.className='tour-badge';badge.textContent=i+1;badge.setAttribute('aria-hidden','true');const copy=document.createElement('div'),title=document.createElement('h3'),body=document.createElement('p');title.textContent=note.title;body.textContent=note.text;copy.append(title,body);item.append(badge,copy);this.notes.append(item);
    const anchors=note.anchors||[[note.x,note.y]];anchors.forEach(([x,y])=>{if(!Number.isFinite(x)||!Number.isFinite(y))return;const marker=document.createElement('span');marker.className='tour-marker';marker.textContent=i+1;marker.setAttribute('aria-hidden','true');marker.style.left=(Math.min(.96,Math.max(.04,x))*100)+'%';marker.style.top=(Math.min(.98,Math.max(.02,y))*100)+'%';this.markers.append(marker)})});
   if(!this.notes.children.length){const item=document.createElement('li');item.className='tour-context';item.textContent=p.context||'Use the highlighted control or the arrows below to continue through the process.';this.notes.append(item)}
   this.controls.replaceChildren();(p.hotspots||[]).forEach((hotspot,i)=>{const button=document.createElement('button');button.type='button';button.className='tour-hotspot';button.setAttribute('aria-label',hotspot.label);const [x,y,w,h]=hotspot.rect;button.style.left=x/width*100+'%';button.style.top=y/height*100+'%';button.style.width=w/width*100+'%';button.style.height=h/height*100+'%';button.style.setProperty('--hot-radius',(hotspot.radius||8)/width*100+'cqw');button.addEventListener('click',event=>{event.stopPropagation();this.route(hotspot.next)});
    if(i===0){const hint=document.createElement('span');hint.className='tour-tap';hint.setAttribute('aria-hidden','true');hint.innerHTML='<svg viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 12V3a1.5 1.5 0 0 1 3 0v7l2-1 3 1 2 2v7l-3 4H8l-5-8a1.4 1.4 0 0 1 2-2l3 3"/></svg><span>TAP HERE</span>';button.append(hint)}this.controls.append(button)});
   this.prev.disabled=this.index===0;this.next.disabled=this.index===this.pages.length-1;this.count.textContent=(this.index+1)+'/'+this.pages.length;this.guide.textContent=p.scroll?'Scroll within the screen to view the complete page':p.autoNext?'Carousel changes automatically every 3 seconds':p.guidance||'Click the highlighted area or use the arrows below';this.completed=this.index===this.pages.length-1&&!p.scroll;this.status.textContent=this.completed?'You’ve explored all design decisions.':p.scroll?'Scroll to the bottom to complete this flow':'';
   if(p.autoNext)this.timer=setTimeout(()=>this.route(p.autoNext),3000);
   document.dispatchEvent(new Event('decision-tour:change'));
  }
  onScroll(){const p=this.pages[this.index];if(p.scroll&&this.viewport.scrollHeight>this.viewport.clientHeight&&this.viewport.scrollTop+this.viewport.clientHeight>=this.viewport.scrollHeight-3){this.completed=true;this.status.textContent='You’ve explored all design decisions.';this.guide.textContent='All flows completed'}}
 };
})();
