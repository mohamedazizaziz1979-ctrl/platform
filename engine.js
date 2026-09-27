/* ==========================================================
   ENGINE — حالة التطبيق، تخزين التقدّم، دمج المحتوى، والنطق.
   لا يوجد هنا أي بناء لواجهة (HTML)؛ فقط منطق وبيانات حيّة.
   ========================================================== */

/* ============ أدوات ============ */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>String(s).trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ');
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
/* المحتوى = المدمج + content.json المرفوع مع الموقع + الدروس المضافة على هذا الجهاز */
let FILE={},LOCAL=store.get('ne.custom',{}),CONTENT=BASE;
function mergeContent(a,b){
  const o=JSON.parse(JSON.stringify(a||{}));
  for(const g in (b||{})){
    const bu=(b[g]&&b[g].units)||[];o[g]=o[g]||{units:[]};
    bu.forEach(u=>{let t=o[g].units.find(x=>norm(x.en)===norm(u.en));
      if(!t){t={en:u.en,ar:u.ar||'',lessons:[]};o[g].units.push(t)}
      (u.lessons||[]).forEach(l=>{const i=t.lessons.findIndex(x=>norm(x.en)===norm(l.en));if(i>=0)t.lessons[i]=l;else t.lessons.push(l)})})
  }
  return o;
}
function rebuild(){CONTENT=mergeContent(mergeContent(BASE,FILE),LOCAL)}
const exportText=()=>JSON.stringify(mergeContent(FILE,LOCAL),null,1);

/* ============ النطق ============ */
const TTS={voice:null,rate:.9,token:0,ok:'speechSynthesis' in window};
function pickVoice(){if(!TTS.ok)return;const v=speechSynthesis.getVoices();TTS.voice=v.find(x=>/^en[-_]US/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null}
if(TTS.ok){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function stopAll(){TTS.token++;if(TTS.ok)speechSynthesis.cancel();document.querySelectorAll('.sent.on,.vrow.hl,.spk.on').forEach(e=>e.classList.remove('on','hl'))}
function utter(text,rate){const u=new SpeechSynthesisUtterance(text);u.lang='en-US';if(TTS.voice)u.voice=TTS.voice;u.rate=rate||TTS.rate;return u}
function say(text,rate,btn){
  if(!TTS.ok){toast('المتصفح لا يدعم النطق الصوتي');return}
  stopAll();const u=utter(text,rate);
  if(btn){btn.classList.add('on');u.onend=u.onerror=()=>btn.classList.remove('on')}
  speechSynthesis.speak(u)
}
function playSeq(items,onItem,onDone,rate){
  if(!TTS.ok){toast('المتصفح لا يدعم النطق الصوتي');return}
  stopAll();const t=TTS.token;let i=0;
  const next=()=>{if(t!==TTS.token)return;if(i>=items.length){onDone&&onDone();return}
    const k=i++;onItem(k);const u=utter(items[k],rate);u.onend=next;u.onerror=next;speechSynthesis.speak(u)};
  next()
}

/* ============ الحالة ============ */
const S={view:'home',stage:null,grade:null,u:0,l:0,tab:'vocab'};
const UI={side:'open',grp:true};
/* وضع المعلم: بوابة رمز دخول تُخفي أدوات التحكم عن الطلاب. تنبيه أمانة:
   هذا حماية بسيطة على المتصفح فقط، وليست حماية خادم حقيقية. */
const TEACHER={on:sessionStorage.getItem('ne.teacher')==='1'};
let PROG=store.get('ne.progress',{});
const pkey=()=>`${S.grade}.${S.u}.${S.l}`;
function saveProg(field,val,key){key=key||pkey();const p=PROG[key]||(PROG[key]={});if(field==='games')p.games=(p.games||0)+1;else p[field]=Math.max(p[field]||0,val);store.set('ne.progress',PROG)}
const stageOf=g=>STAGES.find(s=>s.grades.some(x=>x[0]===g));
const gradeName=g=>{const s=stageOf(g);return s?s.grades.find(x=>x[0]===g)[1]:''};
const curLesson=()=>CONTENT[S.grade].units[S.u].lessons[S.l];
const lessonPct=k=>{const p=PROG[k]||{};let n=0;if(p.vocab)n++;if(p.listen)n++;if(p.games)n++;if(p.recite)n++;if(p.exam)n++;return n*20};
