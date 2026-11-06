const G={"arabic":{"0":[".....",".....",".###.",".###.",".###.",".....","....."],"1":["..#..","..#..","..#..","..#..","..#..","..#..","..#.."],"2":["#...#","#.##.","##...","#....","#....","#....","#...."],"3":["#.#.#","#####","#....","#....","#....","#....","#...."],"4":["..###",".#...","..##.",".#...","#....",".####","....."],"5":[".....",".###.","#...#","#...#","#...#",".###.","....."],"6":["####.","...#.","...#.","...#.","...#.","...#.","...#."],"7":["#...#","#...#",".#.#.",".#.#.",".#.#.","..#..","..#.."],"8":["..#..","..#..",".#.#.",".#.#.",".#.#.","#...#","#...#"],"9":[".###.","#...#","#...#",".####","....#","....#","....#"]},"western":{"0":[".###.","#...#","#..##","#.#.#","##..#","#...#",".###."],"1":["..#..",".##..","..#..","..#..","..#..","..#..",".###."],"2":[".###.","#...#","....#","...#.","..#..",".#...","#####"],"3":["####.","....#","....#",".###.","....#","....#","####."],"4":["...#.","..##.",".#.#.","#..#.","#####","...#.","...#."],"5":["#####","#....","####.","....#","....#","#...#",".###."],"6":[".###.","#....","#....","####.","#...#","#...#",".###."],"7":["#####","....#","...#.","..#..",".#...",".#...",".#..."],"8":[".###.","#...#","#...#",".###.","#...#","#...#",".###."],"9":[".###.","#...#","#...#",".####","....#","....#",".###."]}};
const root=document.documentElement,still=matchMedia('(prefers-reduced-motion: reduce)').matches;
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function setLang(l){root.lang=l;root.dir=l==='ar'?'rtl':'ltr';store('lang',l);word();digits()}
const btn=document.getElementById('lang');
if(btn)btn.onclick=()=>setLang(root.lang==='ar'?'en':'ar');

const cv=document.getElementById('word');
let picture=null,start=performance.now();
function word(){
  if(!cv)return;
  const w=Math.min(innerWidth*.92,900),h=w*.5,r=Math.min(devicePixelRatio||1,2);
  cv.width=w*r;cv.height=h*r;cv.style.width=w+'px';cv.style.height=h+'px';
  const o=document.createElement('canvas');o.width=cv.width;o.height=cv.height;
  const c=o.getContext('2d'),en=root.lang!=='ar',t=en?'Maalesh':'معليش';
  c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.direction=en?'ltr':'rtl';
  let size=h*.86;c.font='200 '+size+'px Alexandria';
  const m=c.measureText(t).width;if(m>o.width*.94){size*=o.width*.94/m;c.font='200 '+size+'px Alexandria'}
  c.fillText(t,o.width/2,o.height/2);picture=o;draw(performance.now());
}
function draw(now){
  if(!cv||!picture)return;
  const x=cv.getContext('2d'),W=cv.width,H=cv.height,t=(now-start)/1000,step=3,amp=H*.05;
  x.clearRect(0,0,W,H);
  for(let i=0;i<W;i+=step){
    const dy=still?0:Math.sin(i*.0075+t*2.1)*amp;
    x.drawImage(picture,i,0,step,H,i,dy,step,H);
  }
}
function loop(n){draw(n);requestAnimationFrame(loop)}

const ring=document.getElementById('ring');
if(ring){let s='';for(let i=0;i<72;i++){const a=i*5,on=i<=52;s+=`<line x1="100" y1="6" x2="100" y2="${i%6?13:17}" transform="rotate(${a} 100 100)" stroke="#fff" stroke-opacity="${on?1:.25}" stroke-width="1"/>`}ring.innerHTML=s}
function digits(){
  const d=document.getElementById('digits');if(!d)return;
  const g=G[root.lang==='ar'?'arabic':'western']['5'];
  d.innerHTML=g.map(r=>'<div>'+[...r].map(c=>`<i class="${c==='#'?'on':''}"></i>`).join('')+'</div>').join('')
}
const saved=store('lang'),first=saved||((navigator.language||'ar').startsWith('ar')?'ar':'en');
root.lang=first;root.dir=first==='ar'?'rtl':'ltr';
document.fonts.load('200 80px Alexandria',first==='ar'?'معليش':'Maalesh').then(()=>{word();if(!still)requestAnimationFrame(loop)});
digits();addEventListener('resize',word);

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.7});
document.querySelectorAll('.excuses li').forEach((l,i)=>{l.style.transitionDelay=i*90+'ms';io.observe(l)});
