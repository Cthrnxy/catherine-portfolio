let prototypes=[];
function refreshGuides(){prototypes.forEach(p=>{
 p.guide.textContent=p.complete?(p.kind==='location'?'Click the arrow to continue':'All flows completed'):'Click the screen to find interactive areas';
 if(p.kind==='location')p.q('.flow-next').hidden=!p.complete;
})}
function restartAll(){
 if(prototypes.length!==2)return;
 prototypes[0].root.hidden=false;prototypes[1].root.hidden=true;
 prototypes.forEach(p=>p.reset());refreshGuides();
}
const assets={current:'images/current.png',next:'images/next.png',currentReturn:'images/current.png',currentFinal:'images/current.png',exploreCurrent:'images/explore-current.png',exploreNext:'images/explore-next.png',enroll:'images/enroll.png',enrollCurrent:'images/enroll-current.png',enrollApproved:'images/enroll-approved.png',empty:'images/current-empty.png',flowArrow:'images/flow-arrow.svg'};
const vectors={unit:{src:'images/arrow-left.svg',start:[126,5.77354],end:[0,5.77356]},switch:{src:'images/switch-arrow-left.svg',start:[195,5.77358],end:[0,5.77356]},approval:{src:'images/approval-arrow-right.svg',start:[1,7.59564],end:[114,5.59563]},approvalDiagonal:{src:'images/approval-diagonal.svg',start:[1,1],end:[135,233]},approvalMobile:{src:'images/approval-arrow-left.svg',start:[424.473,5.77356],end:[0,5.77356]},approvalMobileDiagonal:{src:'images/approval-mobile-diagonal.svg',start:[439.157,1],end:[0,243]}};
const unitText='Separates where users are moving from and where they are moving to.Different colors and illustrations make each location easy to recognize.';
const switchText='Uses a consistent position and visual state across Home and Explore, making the current location easy to identify.';
const approvalText='Users confirm approval from a landlord or property manager without requiring that third party to join the app. The response then determines the next flow: approved units unlock direct transfer, while unapproved units continue through the marketplace flow.';
const locationNotes={
 current:[{title:'Current / Next Unit cards',text:unitText,side:'right',anchors:[{x:361,y:151,vector:'unit'}]}],
 next:[{title:'Current / Next Unit cards',text:unitText,side:'right',anchors:[{x:356,y:140.5,vector:'unit'}]}],
 currentReturn:[],currentFinal:[],
 exploreCurrent:[{title:'Current / Next switch',text:switchText,side:'right',anchors:[{x:263,y:712,vector:'switch'}]}],
 exploreNext:[{title:'Current / Next switch',text:switchText,side:'right',anchors:[{x:273.5,y:707,vector:'switch'}]}]
};
const approvalNotes=[{title:'Be Approved process',text:approvalText,side:'left',anchors:[{x:7,y:312,vector:'approval',mobile:{x:57.684326171875,y:315,vector:'approvalMobile'}},{x:7,y:598,vector:'approvalDiagonal',mobile:{x:43,y:608,vector:'approvalMobileDiagonal'}}]}];

class Prototype{
 constructor(id,kind){
  this.root=document.getElementById(id);this.kind=kind;this.stage=this.q('.stage');this.phone=this.q('.phone');this.screen=this.q('.screen');this.controls=this.q('.controls');this.notes=this.q('.annotations');this.guide=this.q('.screen-guide');this.timers=new Set();this.observed=false;
  this.q('.restart-cta').addEventListener('click',restartAll);
  this.root.addEventListener('click',e=>{if(!e.target.closest('button,a,input,select'))this.flash()});
  this.screen.addEventListener('load',()=>this.position());
  this.observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){this.observed=true;if(this.kind==='location')this.notes.querySelectorAll('.annotation').forEach((el,i)=>this.later(()=>el.classList.add('show'),300+i*520));this.observer.disconnect()}},{threshold:.2});
  this.observer.observe(this.phone);this.reset();
 }
 q(selector){return this.root.querySelector(selector)}
 later(fn,delay){const t=setTimeout(()=>{this.timers.delete(t);fn()},delay);this.timers.add(t)}
 reset(){this.scene=this.kind==='location'?'current':'enroll';this.currentApproved=false;this.nextApproved=false;this.complete=false;const arrow=this.q('.flow-next');if(arrow)arrow.classList.remove('flash');this.render()}
 route(scene){this.scene=scene;if(this.kind==='location')this.complete=scene==='currentFinal';this.render()}
 hot(label,b,fn,extra=''){
  const el=document.createElement('button');el.type='button';el.className='hotspot '+extra;el.setAttribute('aria-label',label);['left','top','width','height'].forEach((p,i)=>el.style[p]=b[i]+'px');el.addEventListener('click',e=>{e.stopPropagation();fn()});el.addEventListener('animationend',()=>el.classList.remove('flash'));this.controls.append(el);return el;
 }
 flash(filter=()=>true){const arrow=this.q('.flow-next');const targets=[...this.controls.querySelectorAll('.hotspot')];if(arrow&&!arrow.hidden)targets.push(arrow);targets.forEach(el=>{if(filter(el)){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')}})}
 render(){
  this.timers.forEach(clearTimeout);this.timers.clear();this.controls.replaceChildren();this.notes.replaceChildren();this.root.dataset.scene=this.scene;
  this.guide.textContent=this.complete?'You’ve explored this flow':'Click the screen to find interactive areas';
  let image=assets[this.scene];let list=[];
  if(this.kind==='location'){
   list=locationNotes[this.scene];const steps={current:{box:[130,686,131,40],to:'next',label:'Switch to Next Unit'},next:{box:[130,686,131,40],to:'currentReturn',label:'Switch to Current Unit'},currentReturn:{box:[23.29736328125,747.22314453125,74,74],to:'exploreCurrent',label:'Open Explore'},exploreCurrent:{box:[129.5,690,131,40],to:'exploreNext',label:'Switch to Next Unit'},exploreNext:{box:[109,748,74,74],to:'currentFinal',label:'Return to Home'}};
   const step=steps[this.scene];if(step)this.hot(step.label,step.box,()=>this.route(step.to));
  }else if(this.scene==='enroll'){
   list=approvalNotes;image=this.currentApproved?(this.nextApproved?assets.enrollApproved:assets.enrollCurrent):assets.enroll;
   if(!this.currentApproved&&this.nextApproved){const patch=document.createElement('img');patch.src=assets.enrollApproved;patch.className='check-patch';patch.alt='';patch.setAttribute('aria-hidden','true');patch.style.clipPath='inset(598px 347px 226px 23px)';this.controls.append(patch)}
   const a=this.hot('Confirm current unit landlord approval',[23,304,20,20],()=>{this.currentApproved=!this.currentApproved;this.render()},'checkbox');a.setAttribute('aria-pressed',String(this.currentApproved));
   const b=this.hot('Confirm next unit landlord approval',[23,598,20,20],()=>{this.nextApproved=!this.nextApproved;this.render()},'checkbox');b.setAttribute('aria-pressed',String(this.nextApproved));
   this.hot('Save approved units',[21,751,347,42],()=>{if(this.currentApproved&&this.nextApproved){this.complete=true;this.route('empty')}else this.flash(el=>el.classList.contains('checkbox')&&el.getAttribute('aria-pressed')==='false')},'save');
  }
  this.screen.src=image;this.screen.alt='Relo — '+({current:'Current Unit',next:'Next Unit',currentReturn:'Current Unit before Explore',currentFinal:'Current Unit — first flow complete',exploreCurrent:'Explore Current Unit',exploreNext:'Explore Next Unit',enroll:'Approval agreements',empty:'Saved Current Unit'}[this.scene]);this.q('.step-count').textContent=this.screen.alt;
  list.forEach((note,i)=>{
   const el=document.createElement('aside');el.className='annotation';el.note=note;const h=document.createElement('h2');h.textContent=note.title;const p=document.createElement('p');p.textContent=note.text;el.append(h,p);
   note.anchors.forEach(()=>{const wrap=document.createElement('span');wrap.className='connector';const img=document.createElement('img');img.alt='';wrap.append(img);el.append(wrap)});this.notes.append(el);if(this.kind==='approval')el.classList.add('show');else if(this.observed)this.later(()=>el.classList.add('show'),300+i*520);
  });this.position();refreshGuides();
 }
 position(){
  if(this.root.hidden)return;
  const mobile=innerWidth<=768,pr=this.phone.getBoundingClientRect(),sr=this.stage.getBoundingClientRect(),px=pr.left-sr.left,py=pr.top-sr.top,scale=pr.width/390;
  const helpBottom=innerWidth>1120?this.q('.screen-help').getBoundingClientRect().bottom-sr.top+24:0;const last={left:helpBottom,right:0};let bottom=Math.max(pr.height+py,helpBottom);
  [...this.notes.children].forEach(el=>{
   const note=el.note,side=mobile?'right':note.side;el.classList.toggle('left',side==='left');el.classList.toggle('right',side==='right');
   const anchors=note.anchors.map(a=>mobile&&a.mobile?a.mobile:a);const centerY=anchors.reduce((sum,a)=>sum+a.y,0)/anchors.length*scale+py;
   const top=Math.max(0,centerY-el.offsetHeight/2,last[side]);el.style.top=top+'px';last[side]=top+el.offsetHeight+16;bottom=Math.max(bottom,last[side]);
   [...el.querySelectorAll('.connector')].forEach((wrap,i)=>{
    const anchor=anchors[i],v=vectors[anchor.vector],img=wrap.firstChild;img.src=v.src;
    const edgeX=side==='left'?el.offsetWidth:0,edgeY=el.offsetHeight/2+(anchors.length>1?(i===0?-25:25):0);
    const tx=px+anchor.x*scale-el.offsetLeft,ty=py+anchor.y*scale-top;
    const sx=v.start[0],sy=v.start[1],ex=v.end[0],ey=v.end[1],sl=Math.hypot(ex-sx,ey-sy),dl=Math.hypot(tx-edgeX,ty-edgeY);
    const ux=(ex-sx)/sl,uy=(ey-sy)/sl,dx=(tx-edgeX)/dl,dy=(ty-edgeY)/dl,k=dl/sl;
    const a=dx*k*ux+dy*uy,b=dy*k*ux-dx*uy,c=dx*k*uy-dy*ux,d=dy*k*uy+dx*ux;
    wrap.style.transform=`matrix(${a},${b},${c},${d},${edgeX-a*sx-c*sy},${edgeY-b*sx-d*sy})`;
    wrap.target={x:px+anchor.x*scale,y:py+anchor.y*scale};
   });
  });this.stage.style.minHeight=Math.ceil(bottom)+'px';
 }
}
prototypes=[new Prototype('location-flow','location'),new Prototype('approval-flow','approval')];
prototypes[0].q('.flow-next img').src=assets.flowArrow;
prototypes[0].q('.flow-next').addEventListener('animationend',()=>prototypes[0].q('.flow-next').classList.remove('flash'));
prototypes[0].q('.flow-next').addEventListener('click',()=>{
 if(!prototypes[0].complete)return;
 prototypes[0].root.hidden=true;prototypes[1].root.hidden=false;
 prototypes[1].render();
 const focusTarget=prototypes[1].complete?prototypes[1].q('.restart-cta'):prototypes[1].q('.hotspot');
 focusTarget.focus({preventScroll:true});
});
refreshGuides();
window.addEventListener('resize',()=>prototypes.forEach(p=>p.position()));document.fonts.ready.then(()=>prototypes.forEach(p=>p.position()));
