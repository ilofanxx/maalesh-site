const root=document.documentElement,still=matchMedia('(prefers-reduced-motion: reduce)').matches;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function setLang(l){root.lang=l;root.dir=l==='ar'?'rtl':'ltr';store('lang',l)}
// العربي هو الأصل، والإنجليزي فقط إذا اختاره الزائر
setLang(store('lang')==='en'?'en':'ar');
document.getElementById('lang').onclick=()=>setLang(root.lang==='ar'?'en':'ar');

// المشهد: يشتغل لحاله عند فتح الصفحة
const scene=document.getElementById('scene');
function play(){if(still)return;scene.classList.remove('play');void scene.offsetWidth;scene.classList.add('play')}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(play,250));
document.getElementById('replay').onclick=play;

// الظهور عند النزول
root.classList.add('js');
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el=>{
  const sib=[...el.parentElement.children].filter(c=>c.classList.contains('rv'));
  el.style.setProperty('--d',Math.min(sib.indexOf(el),4)*90+'ms');
  rv.observe(el);
});

// زر التحميل الثابت: يظهر لما يختفي زر الواجهة، ويختفي عند قسم التحميل
const sticky=document.getElementById('sticky'),seen=new Set();
const so=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?seen.add(e.target):seen.delete(e.target));sticky.classList.toggle('on',seen.size===0)},{threshold:.2});
so.observe(document.getElementById('hero-cta'));so.observe(document.getElementById('download'));
