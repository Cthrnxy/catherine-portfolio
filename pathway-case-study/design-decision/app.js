'use strict';
const $=s=>document.querySelector(s);
const stage=$('#stage'),viewport=$('#viewport'),screen=$('#screen'),controls=$('#controls'),annotations=$('#annotations'),guide=$('#guide'),nextFlow=$('#next-flow'),status=$('#status');
const ratio=1280/1069.31005859375;
const r=(x,y,w,h)=>[x*ratio,y*ratio,w*ratio,h*ratio];
const hot=(label,rect,next,radius=16)=>({label,rect,next,radius});
const note=(title,body,x,y,side='bottom')=>({title,body,anchor:[x,y],side});
const largeButtons=note('Large buttons and clear hierarchy','Make key actions easy to identify and reduce cognitive load.',217.5,734);
const language=note('Visible language selection','helps users access the service in a more familiar language.',909,133,'right');
const warmth=note('Warm colors, clear spacing, and familiar imagery','Create a more approachable experience for first-time or low-digital-literacy users.',1082,607,'right');
const signinNote=note('Simple sign-in with a phone number or Member ID','lowers the barrier for users who may struggle with traditional account systems.',931,420,'right');
const steps=note('Step-by-step job search','Reduce information overload by showing only what users need at each stage.',640,704);
const categories=note('Category-based browsing','Helps users find jobs without needing to know specific job titles or search terms.',640,744);
const saved=note('Saved activity','Allows advisors to understand user interests and provide more relevant follow-up support.',1065,93);
const interest=note('Saved activity','Allows advisors to understand user interests and provide more relevant follow-up support.',943,112);
const navigation=note('Navigation between jobs','Lets users compare opportunities without returning to the main list.',1214,420);
const carousel=note('Carousel','Lets users explore programs one at a time without feeling overwhelmed. Navigation controls make it easy to move between different options.',640,767);
const summary=note('Large images and clear summary','Help users quickly understand what each program offers.',1092,620);
const learn=note('Learn More actions','let users explore additional details only when they are interested.',202,607);
const scenes={
 home:{flow:1,image:'home',alt:'Pathway Job Center home screen',notes:[largeButtons,language,warmth],hotspots:[hot('Sign in',r(910.666,41.91,101.628,44.833),'signin',12),hot('Check In',r(56.564,513.239,250.35,99.951),'signin',20)]},
 signin:{flow:1,image:'signin',alt:'Sign in with a phone number or Member ID',notes:[signinNote],hotspots:[hot('Fill the phone or membership number',[379,406,522,56],'signinFilled',12)]},
 signinFilled:{flow:1,image:'signin-filled',alt:'Sign-in form with an example phone number',notes:[signinNote],hotspots:[hot('Sign in',r(315.885,406.528,210.059,44.833),'signedHome',12)]},
 signedHome:{flow:1,image:'signed-home',alt:'Signed-in Pathway home screen',notes:[],hotspots:[],advance:'jobHome'},
 jobHome:{flow:2,image:'signed-home',alt:'Signed-in home screen, Find Jobs',notes:[],hotspots:[hot('Find Jobs',r(192.971,390.333,250.35,99.951),'jobCategories',20)]},
 jobCategories:{flow:2,image:'job-categories',alt:'Choose a job category',notes:[steps],hotspots:[hot('Hospitality',r(62.285,275.71,219.584,291.667),'hospitality',20)]},
 hospitality:{flow:2,image:'hospitality',height:1072,alt:'Hospitality job opportunities',notes:[categories],hotspots:[hot('Janitor at Summer Hotel',r(373.277,281.845,321.391,128.584),'job',12)]},
 job:{flow:2,image:'job',alt:'Janitor job details',notes:[saved],hotspots:[hot('Save this job',r(862.693,18.458,55,55),'jobLiked',12)]},
 jobLiked:{flow:2,image:'job-liked',alt:'Saved Janitor job',notes:[interest],hotspots:[hot("I'm Interested",r(721.988,23.714,130.602,45.129),'jobContact',8)]},
 jobContact:{flow:2,image:'job-contact',alt:'Job interest recorded',notes:[navigation],hotspots:[hot('Next job',r(1014.205,285.707,55.105,128.584),'host',12)]},
 host:{flow:2,image:'host',alt:'Host job at House of Nanking',notes:[],hotspots:[],advance:'custodial'},
 custodial:{flow:3,image:'custodial',alt:'Custodial Training program',notes:[carousel,summary],hotspots:[]},
 appliance:{flow:3,image:'appliance',alt:'Appliance Repairing program',notes:[carousel,summary],hotspots:[]},
 english:{flow:3,image:'english',alt:'English Class program',notes:[carousel,summary],hotspots:[hot('Custodial',[231,698,200.097,60.714],'custodialSelected',30)]},
 custodialSelected:{flow:3,image:'custodial',alt:'Custodial Training program, Learn more',notes:[learn],hotspots:[hot('Learn more',[175.161,549.603,200.097,70.32],'detail',16)]},
 detail:{flow:3,image:'program-detail',height:3231,alt:'Custodial program details, overview, eligibility, careers and support services',notes:[],hotspots:[]}
};
let current='home',timer=null,epoch=0,completed=false,scale=1,noteEntries=[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const carouselInterval=3000;
const carouselScenes=new Set(['custodial','appliance','english','custodialSelected']);
let outgoingFrame=null,fadeAnimation=null,scrollAnimation=null,preloadedDetail=null;
const preloadedPrograms=[];
function imageSource(name){return 'images/'+name+'.png';}
function clearCrossfade(){
 if(fadeAnimation)fadeAnimation.cancel();
 fadeAnimation=null;
 if(outgoingFrame)outgoingFrame.remove();
 outgoingFrame=null;
}
function cancelScrollReveal(){if(scrollAnimation!==null)cancelAnimationFrame(scrollAnimation);scrollAnimation=null;}
function revealProgramContent(){
 cancelScrollReveal();
 const target=Math.min(780*scale,viewport.scrollHeight-viewport.clientHeight);
 if(reduced.matches){viewport.scrollTop=target;return;}
 const start=viewport.scrollTop,started=performance.now();
 const tick=now=>{const progress=Math.min(1,(now-started)/950),eased=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;viewport.scrollTop=start+(target-start)*eased;if(progress<1)scrollAnimation=requestAnimationFrame(tick);else scrollAnimation=null;};
 scrollAnimation=requestAnimationFrame(tick);
}
function crossfade(previousFrame,thisEpoch){
 previousFrame.removeAttribute('id');previousFrame.className='carousel-frame';previousFrame.alt='';previousFrame.setAttribute('aria-hidden','true');
 screen.after(previousFrame);outgoingFrame=previousFrame;
 const reveal=()=>{
  if(epoch!==thisEpoch||outgoingFrame!==previousFrame)return;
  fadeAnimation=previousFrame.animate([{opacity:1},{opacity:0}],{duration:600,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
  fadeAnimation.finished.then(()=>{if(outgoingFrame===previousFrame){previousFrame.remove();outgoingFrame=null;fadeAnimation=null;}},()=>{});
 };
 screen.decode().then(reveal,()=>{if(epoch===thisEpoch)clearCrossfade();});
}
function stopTimer(){clearTimeout(timer);timer=null;}
function setGuidance(){stage.dataset.complete=String(completed);const scene=scenes[current];guide.textContent=completed?'All flows completed':scene.advance?'Click the arrow to start the next flow':current==='detail'?'Scroll within the screen to explore the program':current==='custodial'||current==='appliance'?`Carousel changes automatically every ${carouselInterval/1000} seconds`:current==='english'?'Carousel paused · Click Custodial to continue':current==='custodialSelected'?'Click Learn more to reveal the content below':'Click the screen to find interactive areas';nextFlow.hidden=!scene.advance;nextFlow.setAttribute('aria-label',scene.flow===1?'Start the job search flow':'Start the program exploration flow');}
function showScene(name,{keepNotes=false}={}){
 const previousFrame=!reduced.matches&&carouselScenes.has(current)&&carouselScenes.has(name)&&scenes[current].image!==scenes[name].image&&screen.complete&&screen.naturalWidth?screen.cloneNode():null;
 clearCrossfade();
 cancelScrollReveal();
 stopTimer();epoch++;const thisEpoch=epoch;current=name;completed=false;const scene=scenes[name];stage.dataset.scene=name;stage.dataset.flow=scene.flow;
 viewport.scrollTop=0;const height=scene.height||799;stage.style.setProperty('--source-height',height+'px');screen.height=height;screen.src=imageSource(scene.image);screen.alt=scene.alt;
 if(previousFrame)crossfade(previousFrame,thisEpoch);
 if(name==='custodial'&&!preloadedPrograms.length){for(const program of ['appliance','english']){const img=new Image();img.src=imageSource(program);preloadedPrograms.push(img);}}
 if(name==='custodialSelected'&&!preloadedDetail){preloadedDetail=new Image();preloadedDetail.src=imageSource('program-detail');}
 controls.replaceChildren();for(const h of scene.hotspots){const b=document.createElement('button');b.type='button';b.className='hotspot'+(h.label==='Learn more'?' learn-more-cue':'');b.setAttribute('aria-label',h.label);const [x,y,w,hg]=h.rect;Object.assign(b.style,{left:x+'px',top:y+'px',width:w+'px',height:hg+'px'});b.style.setProperty('--source-radius',h.radius+'px');b.addEventListener('click',()=>showScene(h.next));controls.append(b);}
 if(!keepNotes){annotations.replaceChildren();noteEntries=scene.notes.map(n=>{const card=document.createElement('article');card.className='annotation'+(scene.flow===3?'':' enter');const title=document.createElement('h2');title.textContent=n.title;const body=document.createElement('p');body.textContent=n.body;card.append(title,body);const horizontal=document.createElement('span');horizontal.className='connector-segment';horizontal.setAttribute('aria-hidden','true');const vertical=document.createElement('span');vertical.className='connector-segment';vertical.setAttribute('aria-hidden','true');const connector=document.createElement('span');connector.className='connector';connector.setAttribute('aria-hidden','true');const img=document.createElement('img');img.src='images/annotation-arrow.svg';img.alt='';img.width=472;img.height=29;connector.append(img);annotations.append(horizontal,vertical,connector,card);return {n,card,connector,horizontal,vertical};});}
 stage.classList.toggle('side-notes',scene.notes.some(n=>n.side==='right'));
 setGuidance();position();status.textContent=scene.alt;
 if(name==='custodial'||name==='appliance'){timer=setTimeout(()=>{if(epoch!==thisEpoch)return;showScene(name==='custodial'?'appliance':'english',{keepNotes:true});},carouselInterval);}
 if(name==='detail')requestAnimationFrame(()=>{if(epoch===thisEpoch)revealProgramContent();});
}
function drawConnector(el,start,end){const dx=start[0]-end[0],dy=start[1]-end[1],length=Math.hypot(dx,dy)||1;const weight=Math.max(.32,Math.min(.65,scale));const a=dx/469.197,b=dy/469.197,c=-dy/length*weight,d=dx/length*weight;el.style.transform=`matrix(${a},${b},${c},${d},${end[0]-c*14.4337},${end[1]-d*14.4337})`;}
function position(){
 const mobile=innerWidth<=768, narrow=innerWidth<480;
 const kiosk=$('.kiosk');const bezel=Math.max(4,Math.min(12,kiosk.clientWidth*.012));stage.style.setProperty('--bezel',bezel+'px');
 scale=viewport.clientWidth/1280;stage.style.setProperty('--screen-scale',String(scale));stage.style.setProperty('--content-height',((scenes[current].height||799)*scale)+'px');stage.style.setProperty('--screen-radius',(12*scale)+'px');stage.style.setProperty('--kiosk-radius',(28*scale)+'px');
 const s=stage.getBoundingClientRect(),v=viewport.getBoundingClientRect();const origin=[v.left-s.left,v.top-s.top];const kHeight=kiosk.offsetHeight,kWidth=kiosk.offsetWidth;
 let rightBottom=0,bottomCount=noteEntries.filter(e=>mobile||e.n.side!=='right').length,bottomIndex=0,bottomTop=kHeight+32,lastBottom=bottomTop;
 for(const e of noteEntries){const side=!mobile&&e.n.side==='right';let left,top,width;
 if(side){width=parseFloat(getComputedStyle(stage).getPropertyValue('--note-width'));left=kWidth+24;e.card.style.width=width+'px';const targetY=origin[1]+e.n.anchor[1]*scale;top=Math.max(0,rightBottom,targetY-e.card.offsetHeight/2);rightBottom=top+e.card.offsetHeight+24;}
 else{const columns=narrow?1:bottomCount;width=Math.min(296,(kWidth-24*(columns-1))/Math.max(1,columns));e.card.style.width=width+'px';left=narrow?(kWidth-width)/2:(kWidth-(width*columns+24*(columns-1)))/2+bottomIndex*(width+24);top=narrow?lastBottom:bottomTop;bottomIndex++;lastBottom=Math.max(lastBottom,top+e.card.offsetHeight+20);}
 e.card.style.left=left+'px';e.card.style.right='auto';e.card.style.top=top+'px';
 let start=side?[left,top+e.card.offsetHeight/2]:[left+width/2,top];const target=[origin[0]+e.n.anchor[0]*scale,origin[1]+e.n.anchor[1]*scale-viewport.scrollTop];
 // Keep connectors inside the current visible UI area when a long page scrolls.
 e.connector.hidden=target[1]<origin[1]||target[1]>origin[1]+viewport.clientHeight;
 e.horizontal.hidden=true;e.vertical.hidden=true;
 if(narrow&&!side&&bottomIndex>1&&!e.connector.hidden){
  // Route long small-screen connectors around the annotation cards.
  const railX=kWidth-8+(bottomIndex-2)*3,routeY=kHeight+16,edgeY=top+e.card.offsetHeight/2,thickness=Math.max(1.6,5*Math.min(.65,scale));
  e.horizontal.hidden=false;e.vertical.hidden=false;
  Object.assign(e.horizontal.style,{left:(left+width)+'px',top:(edgeY-thickness/2)+'px',width:Math.max(0,railX-left-width)+'px',height:thickness+'px'});
  Object.assign(e.vertical.style,{left:(railX-thickness/2)+'px',top:routeY+'px',width:thickness+'px',height:Math.max(0,edgeY-routeY)+'px'});
  start=[railX,routeY];
 }
 drawConnector(e.connector,start,target);
 }
 const nextHeight=scenes[current].advance?72:0;Object.assign(nextFlow.style,{top:(kHeight+20)+'px',left:(kWidth-nextFlow.offsetWidth)+'px'});
 stage.style.minHeight=Math.max(kHeight+nextHeight,rightBottom-24,noteEntries.length?lastBottom:0)+'px';
}
function flashHotspots(){for(const el of [...controls.children,...(!nextFlow.hidden?[nextFlow]:[])]){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');}}
$('.shell').addEventListener('click',e=>{if(e.target.closest('button,a')||current==='detail')return;flashHotspots();});
for(const event of ['wheel','touchstart','pointerdown','keydown'])viewport.addEventListener(event,cancelScrollReveal,{passive:true});
viewport.addEventListener('scroll',()=>{position();if(current==='detail'&&!completed&&viewport.scrollHeight>viewport.clientHeight&&viewport.scrollTop+viewport.clientHeight>=viewport.scrollHeight-2){completed=true;setGuidance();status.textContent='All three flows completed';}},{passive:true});
nextFlow.addEventListener('click',()=>{const next=scenes[current].advance;if(next)showScene(next);});
$('#restart').addEventListener('click',()=>{stopTimer();completed=false;showScene('home');});
screen.addEventListener('load',position);window.addEventListener('resize',position);new ResizeObserver(position).observe(viewport);document.fonts.ready.then(position);
showScene('home');
