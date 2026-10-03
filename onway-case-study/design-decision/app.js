const $=id=>document.getElementById(id);
$('baggage-arrow-icon').src='images/flow-arrow.svg';
const images={dashboard:'images/dashboard.png',travelers:'images/travelers.png',citizenship:'images/citizenship.png',menu:'images/menu.png',home:'images/dashboard.png',bagEntry:'images/baggage-empty.png',bagOverweight:'images/baggage-five.png',bagExtra:'images/baggage-six.png',bagDanger:'images/baggage-dangerous.png',bagCarry:'images/baggage-carry-on.png'};
const names={dashboard:'Pre-flight checklist',travelers:'Group checklist',citizenship:'Citizenship',menu:'Navigation menu',home:'Pre-flight checklist',bagEntry:'Baggage details',bagOverweight:'Overweight feedback',bagExtra:'Additional-bag feedback',bagDanger:'Dangerous goods',bagCarry:'Carry-on allowance'};
let scene='dashboard',menuReturn='citizenship',firstScreenObserved=false,flowOneComplete=false,flowTwoComplete=false,timers=new Set(),epoch=0;
const n=(title,text,side,y,x)=>({title,text,side,y,x});
const original={
 dashboard:[n('Process card','Travelers can quickly see what still needs attention','right',304/844,350/390),n('Checklist','Category  a complex process into four parts of the trips','right',549/844,374/390)],
 travelers:[{...n('Organized by travelers','Each person has their own checklist that individual and group upload documents easier.','left',421/844,17/390),mobile:{x:353/390,y:422/844}},n('Individual process bar','Group or main traveler can see who still need attention at a glance','right',175/844,353/390)],
 citizenship:[{...n('Clear task length','Traveler always know where they are in the task and how many steps left in that part','left',117/812,23/390),mobile:{x:342/390,y:139/812}},n('Hamburger menu ','Back to main page if user want to work on other step','right',79/812,374/390)]
};
const baggageFlow=['bagEntry','bagOverweight','bagExtra','bagDanger','bagCarry'];
const baggageNotes={
 bagOverweight:[{...n('Share details in advance','Travelers provide detail information to the airline before check-in, reducing information entry at the check-in counter.','right',376/812,364/390),width:310}],
 bagExtra:[{...n('Identify potential issues early','Show relevant requirements and reminders within each task, helping travelers address potential problems before reaching the airport.','left',591/812,21/390),width:362,mobile:{x:363.85791015625/390,y:591/812}}],
 bagDanger:[{...n('Arrive prepared and confident','Help travelers complete preparation in advance, leaving fewer tasks to handle at the airport and reducing uncertainty on travel day.','left',287/812,18/390),width:369,mobile:{x:359.5341796875/390,y:279.5/812}}],
 bagCarry:[{...n('Preview the check-in process','Guide travelers through preparation tasks step by step, with airline rules explained upfront so they know what to expect and how to meet the requirements during check-in.','left',252/812,18/390),width:363,offset:8}]
};

function cancel(){timers.forEach(clearTimeout);timers.clear();epoch++}
function later(fn,delay){const token=epoch,t=setTimeout(()=>{timers.delete(t);if(token===epoch)fn()},delay);timers.add(t)}
function positionAnnotations(){
 const phone=$('phone'),stage=$('stage'),notes=$('annotation'),arrow=$('baggage-next');
 const mobile=innerWidth<=768;
 const phoneRect=phone.getBoundingClientRect(),stageRect=stage.getBoundingClientRect();
 const phoneLeft=phoneRect.left-stageRect.left,phoneTop=phoneRect.top-stageRect.top;
 const help=document.querySelector('.screen-help');
 const helpBottom=innerWidth>1120?help.getBoundingClientRect().bottom-stageRect.top+24:0;
 let bottom=Math.max(phoneTop+phoneRect.height,helpBottom);const last={left:helpBottom,right:0};
 [...notes.children].sort((a,b)=>a._anchor.y-b._anchor.y).forEach(el=>{
  const a=el._anchor,side=mobile?'right':a.side,isLeft=side==='left';
  el.classList.toggle('left',isLeft);el.classList.toggle('right',!isLeft);
  const line=el.querySelector('.connector');line.src=a.width?(isLeft?'images/baggage-line-left.svg':'images/baggage-line-right.svg'):(isLeft?'images/line-left.svg':'images/line-right.svg');
  const anchor=mobile&&a.mobile?a.mobile:a;
  const targetX=phoneLeft+phoneRect.width*anchor.x,targetY=phoneTop+phoneRect.height*anchor.y;
  const top=Math.max(0,targetY-el.offsetHeight/2+(a.offset||0),last[side]);
  el.style.top=top+'px';last[side]=top+el.offsetHeight+16;bottom=Math.max(bottom,last[side]);
  const edgeX=el.offsetLeft+(isLeft?el.offsetWidth:0),edgeY=top+el.offsetHeight/2;
  const dx=targetX-edgeX,dy=targetY-edgeY,length=Math.hypot(dx,dy),angle=Math.atan2(dy,dx)-(isLeft?0:Math.PI);
  line.style.width=length+'px';line.style.top=(el.offsetHeight/2)+'px';
  line.style.transform=`translateY(-50%) rotate(${angle}rad) scaleY(${164/Math.max(1,length)})`;
 });
 if(!arrow.hidden){
  let center=phoneRect.height*.86;
  const arrowLeft=phoneLeft+arrow.offsetLeft,arrowRight=arrowLeft+arrow.offsetWidth;
  [...notes.children].forEach(el=>{
   const top=parseFloat(el.style.top),end=top+el.offsetHeight,noteLeft=el.offsetLeft;
   if(arrowRight>noteLeft&&arrowLeft<noteLeft+el.offsetWidth&&center+arrow.offsetHeight/2>top-10&&center-arrow.offsetHeight/2<end+10)
    center=end+arrow.offsetHeight/2+12;
  });
  arrow.style.top=center+'px';bottom=Math.max(bottom,phoneTop+center+arrow.offsetHeight/2);
 }
 stage.style.minHeight=Math.ceil(bottom)+'px';
}

function autoNotes(list){
 $('annotation').replaceChildren();list.forEach((a,i)=>{
  const el=document.createElement('aside');el.className='annotation right'+(a.width?' baggage':'');el._anchor=a;if(a.width)el.style.setProperty('--note-width',a.width+'px');
  const title=document.createElement('h2');title.textContent=a.title;const text=document.createElement('p');text.textContent=a.text;
  const line=document.createElement('img');line.src=a.width?'images/baggage-line-right.svg':'images/line-right.svg';line.alt='';line.className='connector';el.append(title,text,line);$('annotation').append(el);
  later(()=>{positionAnnotations();el.classList.add('show')},300+i*520);
 });positionAnnotations();
}
function hot(label,b,fn,small=false){
 const el=document.createElement('button');el.type='button';el.className='hotspot'+(small?' small':'');el.setAttribute('aria-label',label);
 ['left','top','width','height'].forEach((p,i)=>el.style[p]=b[i]+'px');
 el.addEventListener('click',e=>{e.stopPropagation();fn()});
 el.addEventListener('animationend',e=>{if(e.animationName==='hotspot-flash')el.classList.remove('flash')});$('controls').append(el);return el;
}
const rect=(x,y,w,h)=>[x,y,w,h];
function route(next){scene=next;render()}
function render(){
 cancel();$('controls').replaceChildren();$('annotation').replaceChildren();const isBaggage=baggageFlow.includes(scene),complete=scene==='home'&&flowOneComplete&&flowTwoComplete;$('phone').style.setProperty('--screen-height',isBaggage||scene==='citizenship'?812:844);$('prototype').classList.toggle('baggage-flow',isBaggage);$('baggage-next').hidden=!isBaggage;$('baggage-next').classList.remove('flash');$('baggage-next').setAttribute('aria-label',scene==='bagCarry'?'Finish baggage flow':'Next baggage screen');$('screen-guide').textContent=complete?'All flows completed':isBaggage?'Click the arrow to continue':'Click the screen to find interactive areas';$('screen').src=images[scene];$('screen').alt='Onway — '+names[scene];$('step-count').textContent=names[scene];
 switch(scene){
  case 'dashboard':hot('Explore travel document checklist',rect(38,467,314,88),()=>route('travelers'));if(firstScreenObserved)autoNotes(original.dashboard);break;
  case 'travelers':hot('Open Catherine’s checklist',rect(16,136,358,108),()=>route('citizenship'));autoNotes(original.travelers);break;
  case 'citizenship':hot('Open hamburger menu',rect(342,68,32,31),()=>{menuReturn='citizenship';route('menu')},true);autoNotes(original.citizenship);break;
  case 'menu':{
   hot('Go to dashboard',rect(113.88,180.616,272.22,46.42),()=>{flowOneComplete=true;route('home')});
   const arrow=hot('Left arrow: return to task',rect(121,413,32,67),()=>route(menuReturn),true);arrow.classList.add('menu-return');arrow.textContent='‹';break;
  }
  case 'home':hot('Open baggage',rect(38,667,314,88),()=>route('bagEntry'));break;
  case 'bagEntry':break;
  case 'bagOverweight':case 'bagExtra':case 'bagDanger':case 'bagCarry':
   autoNotes(baggageNotes[scene]);break;
 }positionAnnotations();
}
$('baggage-next').addEventListener('click',()=>{
 const i=baggageFlow.indexOf(scene);if(i!==-1){if(i===baggageFlow.length-1)flowTwoComplete=true;route(baggageFlow[i+1]||'home')}
});
$('baggage-next').addEventListener('animationend',()=>$('baggage-next').classList.remove('flash'));

function flashHotspots(){
 const targets=baggageFlow.includes(scene)?[$('baggage-next')]:[...$('controls').querySelectorAll('.hotspot')];
 targets.forEach(el=>{el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')});
}
$('prototype').addEventListener('click',e=>{if(e.target.closest('button,input,select,a'))return;flashHotspots()});
$('restart').addEventListener('click',()=>{flowOneComplete=false;flowTwoComplete=false;route('dashboard')});
$('screen').addEventListener('load',positionAnnotations);window.addEventListener('resize',positionAnnotations);
document.fonts.ready.then(positionAnnotations);
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!firstScreenObserved&&scene==='dashboard'){firstScreenObserved=true;autoNotes(original.dashboard);observer.disconnect()}},{threshold:.2});observer.observe($('phone'));
render();
