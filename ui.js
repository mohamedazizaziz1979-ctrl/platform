/* ==========================================================
   UI — الأيقونات، الصفحات، اللوحات، الألعاب، وربط الأحداث.
   يقرأ من ENGINE (S, CONTENT, saveProg...) ولا يُعرَّف هنا أي بيانات منهج.
   ========================================================== */

/* ============ الأيقونات ============ */
const ICONS={
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 layers:'<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
 moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 vol:'<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
 stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
 head:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',
 game:'<path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-3.9 3.1l-1.5 6.6A3 3 0 0 0 6.2 18l1.5-1.5h8.6l1.5 1.5a3 3 0 0 0 4.9-3.3l-1.5-6.6A4 4 0 0 0 17.3 5z"/>',
 check:'<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14l-3-3"/>',
 clip:'<path d="M9 4h6v3H9z"/><path d="M7 5H5v16h14V5h-2"/><path d="M9 12h6M9 16h4"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15v3M12 9v9M17 5v13"/>',
 chev:'<path d="M6 9l6 6 6-6"/>',
 left:'<path d="M15 18l-6-6 6-6"/>',
 panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/>',
 down:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
 copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
 redo:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>'
};
const ic=(n,s=20)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const spk=(t,sm)=>`<button class="spk${sm?' sm':''}" data-act="say" data-t="${esc(t)}" aria-label="استمع إلى النطق">${ic('vol',sm?17:21)}</button>`;

function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2600)}

function closeGate(){const g=$('.gate');if(g)g.remove()}
function openGate(){
  closeGate();
  const has=!!localStorage.getItem('ne.teacherpin');
  const div=document.createElement('div');div.className='gate';
  div.innerHTML=has?
    `<div class="card"><h3>دخول المعلم</h3><p class="muted">أدخل رمز المعلم لفتح لوحة التحكم.</p>
     <input type="password" inputmode="numeric" id="gPin" placeholder="الرمز" autocomplete="off">
     <div class="err" id="gErr"></div>
     <div class="row"><button class="btn primary" data-g="ok">دخول</button><button class="btn" data-g="cancel">إلغاء</button></div></div>`
    :`<div class="card"><h3>إعداد رمز المعلم</h3><p class="muted">هذه أول مرة على هذا الجهاز. اختر رمزًا لن يعرفه الطلاب (4 أحرف على الأقل).</p>
     <input type="password" inputmode="numeric" id="gPin" placeholder="اختر رمزًا" autocomplete="off">
     <input type="password" inputmode="numeric" id="gPin2" placeholder="أعد كتابة الرمز" autocomplete="off">
     <div class="err" id="gErr"></div>
     <div class="row"><button class="btn primary" data-g="set">حفظ ودخول</button><button class="btn" data-g="cancel">إلغاء</button></div></div>`;
  document.body.appendChild(div);
  $('#gPin').focus();
  const err=m=>{$('#gErr').textContent=m};
  div.onclick=e=>{
    if(e.target===div){closeGate();return}
    const g=e.target.closest('[data-g]');if(!g)return;
    if(g.dataset.g==='cancel'){closeGate();return}
    if(g.dataset.g==='set'){
      const p1=$('#gPin').value,p2=$('#gPin2').value;
      if(p1.length<4)return err('الرمز 4 أحرف على الأقل.');
      if(p1!==p2)return err('الرمزان غير متطابقين.');
      localStorage.setItem('ne.teacherpin',p1);unlockTeacher();return;
    }
    if(g.dataset.g==='ok'){
      const p=$('#gPin').value;
      if(p!==localStorage.getItem('ne.teacherpin'))return err('الرمز غير صحيح.');
      unlockTeacher();return;
    }
  };
  div.onkeydown=e=>{if(e.key==='Enter'){const btn=div.querySelector('[data-g="ok"],[data-g="set"]');btn&&btn.click()}if(e.key==='Escape')closeGate()};
}
function unlockTeacher(){TEACHER.on=true;sessionStorage.setItem('ne.teacher','1');closeGate();toast('تم فتح لوحة المعلم');go({view:'add'})}
function lockTeacher(){TEACHER.on=false;sessionStorage.removeItem('ne.teacher');go({view:'home'})}

function go(patch){stopAll();Object.assign(S,patch);render();window.scrollTo({top:0})}

/* ============ الوضع الليلي والقائمة ============ */
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);store.set('ne.theme',t);renderTop()}
function currentTheme(){const a=document.documentElement.getAttribute('data-theme');if(a)return a;return matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}
const mobile=()=>matchMedia('(max-width:900px)').matches;
function toggleSide(){const app=$('#app');if(mobile()){app.classList.toggle('mobile-open')}else{UI.side=UI.side==='open'?'collapsed':'open';app.dataset.side=UI.side;store.set('ne.side',UI.side)}}

/* ============ الشريط الجانبي والعلوي ============ */
function navBtn(act,label,icon,cur,extra=''){return `<button class="nav" data-act="${act}" ${extra} ${cur?'aria-current="page"':''} title="${label}">${ic(icon)}<span class="lbl">${label}</span></button>`}
function renderSide(){
  const inLesson=S.view==='lesson';
  let h=navBtn('home','الرئيسية','home',S.view==='home');
  h+=`<button class="nav" data-act="grp" aria-expanded="${UI.grp}" title="المراحل الدراسية">${ic('layers')}<span class="lbl">المراحل الدراسية</span>${ic('chev',16).replace('class="ic"','class="ic chev"')}</button>`;
  h+=`<div class="g-body" ${UI.grp?'':'hidden'}>${STAGES.map(s=>`<button class="nav" data-act="stage" data-stage="${s.id}" ${S.stage===s.id&&S.view!=='home'?'aria-current="page"':''}><span class="dot" style="background:${s.id==='primary'?'var(--gold)':'#38C1CC'}"></span><span class="lbl">${s.short}</span></button>`).join('')}</div>`;
  if(inLesson){
    const L=curLesson();
    h+=`<p class="side-title">الدرس الحالي<span class="en">${esc(L.en)}</span></p>`;
    h+=TABS.map(t=>navBtn('tab',t[1],t[2],S.tab===t[0],`data-tab="${t[0]}"`)).join('');
  }
  if(TEACHER.on)h+=navBtn('addLesson','لوحة المعلم','plus',S.view==='add');
  h+=navBtn('progress','تقدّمي','chart',S.view==='progress');
  $('#nav').innerHTML=h;
  const dark=currentTheme()==='dark';
  $('#foot').innerHTML=
    `<button class="nav" data-act="theme" title="الوضع الليلي">${ic(dark?'sun':'moon')}<span class="lbl">${dark?'الوضع النهاري':'الوضع الليلي'}</span></button>`+
    `<button class="nav" data-act="toggleSide" title="طي القائمة">${ic('panel')}<span class="lbl">طي القائمة</span></button>`+
    `<div class="tfoot"><button class="tbtn" data-act="teacherGate" aria-label="لوحة المعلم" title="لوحة المعلم">${ic(TEACHER.on?'lock':'lock',16)}</button></div>`;
}
function renderTop(){
  $('#menuBtn').innerHTML=ic('menu',22);
  $('#themeBtn').innerHTML=ic(currentTheme()==='dark'?'sun':'moon',22);
  const c=[];const home=`<button data-act="home">الرئيسية</button>`;
  if(S.view==='home')c.push(`<b>الرئيسية</b>`);
  else{c.push(home);
    if(S.view==='progress'||S.view==='add')c.push(`<b>${S.view==='add'?'لوحة المعلم':'تقدّمي'}</b>`);
    if(S.stage&&S.view!=='progress'&&S.view!=='add'){const s=STAGES.find(x=>x.id===S.stage);c.push(S.view==='stage'?`<b>${s.short}</b>`:`<button data-act="stage" data-stage="${s.id}">${s.short}</button>`)}
    if(S.grade&&(S.view==='grade'||S.view==='lesson')){c.push(S.view==='grade'?`<b>${gradeName(S.grade)}</b>`:`<button data-act="grade" data-grade="${S.grade}">${gradeName(S.grade)}</button>`)}
    if(S.view==='lesson')c.push(`<b class="en">${esc(curLesson().en)}</b>`)}
  $('#crumbs').innerHTML=c.join(`<span aria-hidden="true">/</span>`);
}

/* ============ الصفحات ============ */
const TABS=[['video','شرح الدرس','play'],['vocab','المفردات','book'],['listen','الاستماع','head'],['games','الألعاب','game'],['recite','التسميع','check'],['exam','الاختبار الشامل','clip']];

function viewHome(){
  const steps=[['شرح الدرس','فيديو وملخص مكتوب','play'],['المفردات','نطق كل كلمة بضغطة','book'],['الاستماع','النص كاملًا مع تظليل الجملة','head'],['الألعاب','ثلاث ألعاب لكل درس','game'],['التسميع','اكتب الكلمة من معناها','check'],['الاختبار الشامل','سبعة أسئلة بنمط الامتحان','clip']];
  return `<section class="hero">
    <div>
      <h1>تعلّم الإنجليزية درسًا بعد درس، بالنطق والتدريب والاختبار</h1>
      <p class="lead">منهج اللغة الإنجليزية في التعليم المصري من الابتدائي حتى الإعدادي. كل صف فيه وحدات، وكل وحدة فيها دروس، وكل درس يمرّ بست محطات.</p>
      <div class="row"><button class="btn primary" data-act="open" data-grade="pp1" data-u="0" data-l="0">${ic('play',18)} ابدأ الدرس التجريبي</button>
      <button class="btn" data-act="stage" data-stage="prep">تصفّح المراحل</button></div>
    </div>
    <aside class="path" aria-label="رحلة الدرس"><h3>رحلة كل درس</h3><ol>
      ${steps.map(s=>`<li><span class="node">${ic(s[2],20)}</span><div><b>${s[0]}</b><div class="muted" style="font-size:14px;line-height:1.4">${s[1]}</div></div></li>`).join('')}
    </ol></aside>
  </section>
  <section class="stages">${STAGES.map(s=>`<div class="stage ${s.cls}"><h2>${s.ar}</h2><p class="muted" style="margin:0">${s.desc}</p>
     <div class="chips">${s.grades.map(g=>`<button class="chip ${CONTENT[g[0]]?'live':''}" data-act="grade" data-grade="${g[0]}">${g[1].replace('الصف ','')}</button>`).join('')}</div></div>`).join('')}</section>
  <p class="note">المحتوى الحالي تجريبي: الصف الأول الإعدادي، الوحدة الأولى، بدرسين كاملين. باقي الصفوف جاهزة بالهيكل نفسه وتنتظر إضافة المنهج.</p>`;
}
function viewStage(){
  const s=STAGES.find(x=>x.id===S.stage);
  return `<div class="${s.cls}"><h1>${s.ar}</h1><p class="muted">${s.desc}. اختر الصف لعرض وحداته.</p>
   <div class="grid">${s.grades.map(g=>{const c=CONTENT[g[0]];return `<button class="gcard ${c?'':'soon'}" data-act="grade" data-grade="${g[0]}"><h3 style="margin:0">${g[1]}</h3><small>${c?c.units.length+' وحدة متاحة':'المحتوى قريبًا'}</small></button>`}).join('')}</div></div>`;
}
function viewGrade(){
  const s=stageOf(S.grade),c=CONTENT[S.grade];
  let h=`<div class="${s.cls}"><h1>${gradeName(S.grade)}</h1>`;
  if(!c)return h+`<div class="empty"><h3>لم يُضف منهج هذا الصف بعد</h3><p>الهيكل جاهز: أضف وحداته ودروسه إلى كائن CONTENT بنفس بنية الصف الأول الإعدادي، وسيظهر هنا تلقائيًا.</p></div></div>`;
  h+=`<p class="muted">اختر الدرس لتبدأ.</p>`;
  c.units.forEach((u,ui)=>{
    h+=`<div class="unit"><div class="unit-h"><span class="unit-n">${ui+1}</span><div><h2 class="en" style="margin:0">Unit ${ui+1}: ${esc(u.en)}</h2><span class="muted">${esc(u.ar||'')}</span></div></div>`;
    u.lessons.forEach((l,li)=>{const p=lessonPct(`${S.grade}.${ui}.${li}`);
      h+=`<button class="lrow" data-act="open" data-grade="${S.grade}" data-u="${ui}" data-l="${li}">${ic('book',20)}<span><b class="en">${esc(l.en)}</b> <span class="muted">— ${esc(l.ar||'')}</span></span><span class="bar" title="${p}%"><i style="width:${p}%"></i></span></button>`});
    h+=`</div>`});
  return h+`</div>`;
}
function viewLesson(){
  const s=stageOf(S.grade),L=curLesson(),u=CONTENT[S.grade].units[S.u];
  return `<div class="${s.cls}"><header class="lhead"><p class="en">Unit ${S.u+1}: ${esc(u.en)} · Lesson ${S.l+1}</p><h1 class="en">${esc(L.en)}</h1><p>${esc(L.ar||'')}</p></header>
   <div class="tabs" role="tablist">${TABS.map(t=>`<button class="tab" role="tab" aria-selected="${S.tab===t[0]}" data-act="tab" data-tab="${t[0]}">${ic(t[2],18)}${t[1]}</button>`).join('')}</div>
   <div id="panel"></div></div>`;
}
function viewAdd(){
  const opts=STAGES.map(s=>`<optgroup label="${s.ar}">${s.grades.map(g=>`<option value="${g[0]}" ${g[0]==='pp1'?'selected':''}>${g[1]}</option>`).join('')}</optgroup>`).join('');
  const mine=[];
  Object.keys(LOCAL).forEach(g=>LOCAL[g].units.forEach((u,ui)=>u.lessons.forEach((l,li)=>mine.push(`<div class="lrow" style="cursor:default"><span><b class="en">${esc(l.en)}</b> <span class="muted">— ${gradeName(g)} · ${esc(u.en)}</span></span><button class="btn sm" style="margin-inline-start:auto" data-act="delLesson" data-g="${g}" data-ui="${ui}" data-li="${li}">${ic('trash',16)} حذف</button></div>`))));
  return `<h1>لوحة المعلم</h1>
  <div class="tbadge"><span>${ic('lock',16)} أنت في وضع المعلم — هذا القسم غير ظاهر للطلاب</span><button class="btn sm" data-act="lockTeacher">خروج</button></div>
  <p class="muted">أضف درسًا جديدًا واحفظه، وسيظهر بكل أقسامه. الألعاب والتسميع تُبنى تلقائيًا من المفردات.</p>
  <div class="card form">
    <label for="fGrade">الصف</label><select class="f" id="fGrade">${opts}</select>
    <label for="fUnit">الوحدة</label><select class="f" id="fUnit"></select>
    <div class="g2" id="fNew" hidden><div><label for="fUE">اسم الوحدة بالإنجليزية</label><input class="tin en f" id="fUE" type="text"></div><div><label for="fUA">اسم الوحدة بالعربية</label><input class="tin f" id="fUA" type="text"></div></div>
    <div class="g2"><div><label for="fLE">اسم الدرس بالإنجليزية *</label><input class="tin en f" id="fLE" type="text"></div><div><label for="fLA">اسم الدرس بالعربية</label><input class="tin f" id="fLA" type="text"></div></div>
    <label for="fVocab">المفردات * <small>سطر لكل كلمة بالشكل: الكلمة | المعنى | جملة مثال (المثال اختياري). أربع كلمات على الأقل.</small></label>
    <textarea class="ta en f" id="fVocab" rows="8" placeholder="mother | أم | My mother cooks dinner."></textarea>
    <div class="g2"><div><label for="fLT">عنوان نص الاستماع</label><input class="tin en f" id="fLT" type="text"></div><div><label for="fVid">رابط فيديو الشرح <small>(يوتيوب / Vimeo / mp4)</small></label><input class="tin en f" id="fVid" type="text" placeholder="https://"></div></div>
    <label for="fLX">نص الاستماع كاملًا</label><textarea class="ta en f" id="fLX" rows="6"></textarea>
    <label for="fNotes">ملخص الشرح المكتوب <small>(اختياري)</small></label><textarea class="ta f" id="fNotes" rows="3"></textarea>
    <label for="fExam">الاختبار الشامل <small>(اختياري، بصيغة JSON — أجهّزه لك من الـ PDF)</small></label><textarea class="ta en f" id="fExam" rows="4" dir="ltr" placeholder='{"conv":[...],"cloze":{...},"read":{...},"mcq":[...],"rewrite":[...],"fix":[...],"para":{...}}'></textarea>
    <div class="err" id="fErr" role="alert"></div>
    <button class="btn primary" data-act="saveLesson">${ic('plus',18)} حفظ الدرس</button>
  </div>
  <div class="card" style="margin-top:16px"><h2>دروسي المضافة على هذا الجهاز</h2>${mine.join('')||'<p class="muted">لا توجد دروس مضافة بعد.</p>'}</div>
  <div class="card form" style="margin-top:16px"><h2>التصدير والنشر للطلاب</h2>
    <p class="muted">الدروس المحفوظة هنا تظهر على جهازك فقط. لتظهر للطلاب: نزّل الملف، وسمّه <code>content.json</code>، وارفعه على GitHub في نفس مجلد <code>index.html</code>.</p>
    <div class="row"><button class="btn primary" data-act="dl">${ic('down',18)} تنزيل content.json</button><button class="btn" data-act="cp">${ic('copy',18)} نسخ المحتوى</button></div>
    <label for="fOut">المحتوى الكامل <small>(انسخه إن لم يبدأ التنزيل)</small></label><textarea class="ta en f" id="fOut" rows="5" dir="ltr" readonly>${esc(exportText())}</textarea>
    <label for="fImport">استيراد ملف محتوى <small>(لنقل دروسك من جهاز إلى آخر)</small></label><input type="file" id="fImport" accept=".json,application/json">
  </div>`;
}
function fillUnits(){const g=$('#fGrade').value,us=(CONTENT[g]||{units:[]}).units;
  $('#fUnit').innerHTML=us.map((u,i)=>`<option value="${i}">Unit ${i+1}: ${esc(u.en)}</option>`).join('')+`<option value="__new">+ وحدة جديدة</option>`;$('#fNew').hidden=$('#fUnit').value!=='__new'}
const EXAM_KEYS=['conv','cloze','read','mcq','rewrite','fix','para'];
function saveLesson(){
  const v=id=>($('#'+id).value||'').trim(),err=m=>{const e=$('#fErr');e.textContent=m;e.scrollIntoView({block:'center',behavior:'smooth'})};
  const g=v('fGrade');let uEn,uAr='';
  if($('#fUnit').value==='__new'){uEn=v('fUE');uAr=v('fUA');if(!uEn)return err('اكتب اسم الوحدة بالإنجليزية.')}
  else{const u=CONTENT[g].units[+$('#fUnit').value];uEn=u.en;uAr=u.ar||''}
  const lEn=v('fLE');if(!lEn)return err('اكتب اسم الدرس بالإنجليزية.');
  const vocab=v('fVocab').split('\n').map(r=>r.split(/\||\t/).map(x=>x.trim())).filter(a=>a[0]&&a[1]).map(a=>({w:a[0],ar:a[1],ex:a[2]||''}));
  if(vocab.length<4)return err('أدخل أربع كلمات على الأقل بالشكل: الكلمة | المعنى | المثال.');
  const lesson={en:lEn,ar:v('fLA'),vocab};
  if(v('fLX')){if(!/[.!?]/.test(v('fLX')))return err('نص الاستماع يجب أن يحتوي على جمل تنتهي بنقطة أو علامة استفهام.');lesson.listen={title:v('fLT')||lEn,text:v('fLX')}}
  if(v('fVid'))lesson.video=v('fVid');
  if(v('fNotes'))lesson.notes=v('fNotes');
  if(v('fExam')){let x;try{x=JSON.parse(v('fExam'))}catch(e){return err('صيغة الاختبار غير صحيحة (JSON): '+e.message)}
    const miss=EXAM_KEYS.filter(k=>!(k in x));if(miss.length)return err('ينقص الاختبار: '+miss.join('، '));lesson.exam=x}
  LOCAL[g]=LOCAL[g]||{units:[]};
  let t=LOCAL[g].units.find(x=>norm(x.en)===norm(uEn));if(!t){t={en:uEn,ar:uAr,lessons:[]};LOCAL[g].units.push(t)}
  const i=t.lessons.findIndex(x=>norm(x.en)===norm(lEn));if(i>=0)t.lessons[i]=lesson;else t.lessons.push(lesson);
  store.set('ne.custom',LOCAL);rebuild();toast('تم حفظ الدرس');go({view:'grade',grade:g,stage:stageOf(g).id});
}
function viewProgress(){
  let rows='';
  Object.keys(CONTENT).forEach(g=>CONTENT[g].units.forEach((u,ui)=>u.lessons.forEach((l,li)=>{
    const k=`${g}.${ui}.${li}`,p=PROG[k]||{},pc=lessonPct(k);
    rows+=`<button class="lrow" data-act="open" data-grade="${g}" data-u="${ui}" data-l="${li}"><span><b class="en">${esc(l.en)}</b><br><span class="muted" style="font-size:14px">${gradeName(g)} · ${p.recite?'التسميع '+p.recite+'% · ':''}${p.exam?'الاختبار '+p.exam+'% · ':''}${p.games?'ألعاب '+p.games:''}</span></span><span class="bar" title="${pc}%"><i style="width:${pc}%"></i></span></button>`})));
  return `<h1>تقدّمي</h1><p class="muted">يُحفظ التقدّم على هذا الجهاز فقط.</p>${rows||'<div class="empty">لم تبدأ أي درس بعد.</div>'}`;
}

/* ============ لوحات الدرس ============ */
function mountPanel(){
  const el=$('#panel');if(!el)return;const L=curLesson();
  if(S.tab==='video')panelVideo(el,L);
  if(S.tab==='vocab')panelVocab(el,L);
  if(S.tab==='listen')panelListen(el,L);
  if(S.tab==='games')panelGames(el,L);
  if(S.tab==='recite')panelRecite(el,L);
  if(S.tab==='exam')panelExam(el,L);
}
function videoEmbed(u){
  if(!u)return null;let m=u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);
  if(m)return `<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${m[1]}" title="شرح الدرس" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(m)return `<iframe class="vid" src="https://player.vimeo.com/video/${m[1]}" title="شرح الدرس" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  if(/\.(mp4|webm)(\?|$)/i.test(u))return `<video class="vid" controls preload="metadata" src="${esc(u)}"></video>`;
  return null;
}
function panelVideo(el,L){
  const v=videoEmbed(L.video);
  el.innerHTML=`<div class="card"><h2>شرح الدرس</h2>`+
    (v?v:`<div class="empty"><h3>لم يُضف فيديو الشرح لهذا الدرس بعد</h3><p>أضف الحقل <code class="en">video</code> داخل الدرس برابط يوتيوب أو Vimeo أو ملف mp4.</p></div>`)+
    (L.notes?`<div style="margin-top:16px"><h3>ملخص الشرح</h3><p>${esc(L.notes).replace(/\n/g,'<br>')}</p></div>`:'')+`</div>`;
}
function panelVocab(el,L){
  saveProg('vocab',1);
  el.innerHTML=`<div class="card"><div class="ghead"><h2 style="margin:0">معاني المفردات <span class="pill">${L.vocab.length} كلمة</span></h2>
    <button class="btn sm" data-act="vocabAll">${ic('play',16)} استمع للكل</button></div>
    ${L.vocab.map((v,i)=>`<div class="vrow" id="v${i}">${spk(v.w)}<div class="w en">${esc(v.w)}</div><div class="m">${esc(v.ar)}</div>
      <div class="ex en">${spk(v.ex,true)}<span>${esc(v.ex)}</span></div></div>`).join('')}</div>`;
}
function sentences(t){return t.match(/[^.!?]+[.!?]+["”']?/g).map(s=>s.trim())}
function panelListen(el,L){
  if(!L.listen){el.innerHTML=`<div class="card"><div class="empty" style="border:0"><h3>لم يُضف نص الاستماع لهذا الدرس بعد</h3></div></div>`;return}
  const ss=sentences(L.listen.text);
  el.innerHTML=`<div class="card"><div class="ghead"><h2 class="en" style="margin:0">${esc(L.listen.title)}</h2>
    <div class="row"><button class="btn primary" data-act="playText">${ic('play',18)} استمع للنص كاملًا</button>
    <button class="btn" data-act="stopText">${ic('stop',18)} إيقاف</button></div></div>
    <div class="row" style="margin-bottom:14px"><span class="muted">السرعة</span><div class="seg" id="speed">
      <button data-act="speed" data-r=".7" aria-pressed="false">بطيئة</button><button data-act="speed" data-r=".9" aria-pressed="true">عادية</button><button data-act="speed" data-r="1.1" aria-pressed="false">سريعة</button></div>
      <span class="muted" style="font-size:14px">اضغط على أي جملة لسماعها وحدها</span></div>
    <p class="listen en" id="ltext">${ss.map((s,i)=>`<span class="sent" data-act="sent" data-i="${i}">${esc(s)}</span>`).join(' ')}</p></div>`;
  el._ss=ss;
}
function panelGames(el,L){
  el.innerHTML=`<div class="gmenu">
    <button class="gm" data-act="game" data-g="match">${ic('game',26)}<h3 style="margin:0">طابق الكلمات</h3><span class="muted">صِل كل كلمة بمعناها</span></button>
    <button class="gm" data-act="game" data-g="listen">${ic('head',26)}<h3 style="margin:0">اسمع واختر</h3><span class="muted">اسمع الكلمة واختر معناها</span></button>
    <button class="gm" data-act="game" data-g="scramble">${ic('layers',26)}<h3 style="margin:0">رتّب الحروف</h3><span class="muted">كوّن الكلمة من حروف مبعثرة</span></button></div>
    <div class="card" id="gameArea"><div class="empty" style="border:0">اختر لعبة للبدء</div></div>`;
}
function result(score,msg,again){return `<div class="result"><div class="score">${score}</div><h3>${msg}</h3><button class="btn primary" data-act="game" data-g="${again}">${ic('redo',18)} العب مرة أخرى</button></div>`}
function launchGame(g){
  const el=$('#gameArea'),L=curLesson();stopAll();
  document.querySelectorAll('.gm').forEach(b=>b.setAttribute('aria-pressed',b.dataset.g===g));
  ({match:gMatch,listen:gListen,scramble:gScramble})[g](el,L);
}
function gMatch(el,L){
  const pairs=shuffle(L.vocab).slice(0,6),en=shuffle(pairs),ar=shuffle(pairs);
  let sE=null,sA=null,moves=0,bad=null;const done=new Set();
  const tile=(p,t)=>{const sel=(t==='e'?sE:sA)===p.w,isBad=bad&&bad[t]===p.w,d=done.has(p.w);
    return `<button class="tile ${t==='e'?'en':''} ${d?'ok':''} ${sel?'sel':''} ${isBad?'bad':''}" data-t="${t}" data-id="${esc(p.w)}" ${d?'disabled':''}>${esc(t==='e'?p.w:p.ar)}</button>`};
  const draw=()=>{el.innerHTML=`<div class="ghead"><b>صِل كل كلمة إنجليزية بمعناها العربي</b><span class="pill">المحاولات: ${moves}</span></div>
    <div class="mgrid"><div class="mcol">${en.map(p=>tile(p,'e')).join('')}</div><div class="mcol">${ar.map(p=>tile(p,'a')).join('')}</div></div>`};
  el.onclick=e=>{const b=e.target.closest('.tile');if(!b||bad)return;
    if(b.dataset.t==='e'){sE=b.dataset.id;say(sE)}else sA=b.dataset.id;
    if(sE&&sA){moves++;
      if(sE===sA){done.add(sE);sE=sA=null;draw();if(done.size===pairs.length){saveProg('games');el.innerHTML=result(moves+' محاولة','أحسنت! طابقت كل الكلمات','match')}}
      else{bad={e:sE,a:sA};sE=sA=null;draw();setTimeout(()=>{bad=null;draw()},550)}}
    else draw()};
  draw();
}
function gListen(el,L){
  const rounds=shuffle(L.vocab).slice(0,8);let i=0,score=0;
  const q=()=>{
    if(i>=rounds.length){saveProg('games');el.innerHTML=result(score+' / '+rounds.length,score>=rounds.length*.75?'ممتاز!':'حاول مرة أخرى لتحسين نتيجتك','listen');return}
    const w=rounds[i],opts=shuffle([w,...shuffle(L.vocab.filter(v=>v!==w)).slice(0,3)]);let ans=false;
    el.innerHTML=`<div class="ghead"><b>السؤال ${i+1} من ${rounds.length}</b><span class="pill">الدرجة: ${score}</span></div>
      <div style="text-align:center">${spk(w.w).replace('spk"','spk" style="width:76px;height:76px"')}<p class="muted">اضغط لسماع الكلمة ثم اختر معناها</p></div>
      <div class="opts">${opts.map(o=>`<button class="opt" data-w="${esc(o.w)}">${esc(o.ar)}</button>`).join('')}</div>`;
    el.onclick=e=>{const b=e.target.closest('.opt');if(!b||ans)return;ans=true;const ok=b.dataset.w===w.w;if(ok)score++;
      b.classList.add(ok?'ok':'no');if(!ok)el.querySelector(`.opt[data-w="${CSS.escape(w.w)}"]`).classList.add('ok');
      setTimeout(()=>{i++;q()},1000)};
    setTimeout(()=>say(w.w),250)};
  q();
}
function gScramble(el,L){
  let pool=L.vocab.filter(v=>/^[a-z]+$/i.test(v.w));if(pool.length<3)pool=L.vocab.map(v=>({...v,w:v.w.replace(/\s/g,'')}));
  const rounds=shuffle(pool).slice(0,6);let i=0,score=0;
  const q=()=>{
    if(i>=rounds.length){saveProg('games');el.innerHTML=result(score+' / '+rounds.length,'انتهت اللعبة','scramble');return}
    const w=rounds[i],target=w.w.toLowerCase();let letters=shuffle(target.split('').map((c,k)=>({c,k}))),picked=[];
    if(letters.map(x=>x.c).join('')===target&&target.length>1)letters=letters.reverse();
    const draw=(fb)=>{el.innerHTML=`<div class="ghead"><b>الكلمة ${i+1} من ${rounds.length}</b><span class="pill">الدرجة: ${score}</span></div>
      <div class="big">${esc(w.ar)}</div>
      <div class="slots">${target.split('').map((_,k)=>`<div class="slot en">${picked[k]?esc(picked[k].c):''}</div>`).join('')}</div>
      <div class="tiles">${letters.map(l=>`<button class="tile en" data-k="${l.k}" ${picked.includes(l)?'disabled':''}>${esc(l.c)}</button>`).join('')}</div>
      <div class="fb ${fb||''}" id="fb"></div>
      <div class="row" style="justify-content:center"><button class="btn sm" data-r="back">تراجع</button><button class="btn sm" data-r="hint">${ic('vol',16)} استمع</button></div>`};
    draw();
    el.onclick=e=>{const b=e.target.closest('button');if(!b)return;
      if(b.dataset.r==='back'){picked.pop();draw();return}
      if(b.dataset.r==='hint'){say(w.w);return}
      if(!b.classList.contains('tile')||b.disabled)return;
      picked.push(letters.find(l=>String(l.k)===b.dataset.k));draw();
      if(picked.length===target.length){const ok=picked.map(p=>p.c).join('')===target;
        $('#fb').textContent=ok?'صحيح ✓':'حاول مرة أخرى';$('#fb').className='fb '+(ok?'ok':'no');
        if(ok){score++;say(w.w);el.onclick=null;setTimeout(()=>{i++;q()},1100)}else setTimeout(()=>{picked=[];draw()},800)}};
  };
  q();
}
function panelRecite(el,L){
  const start=mode=>{
    const items=shuffle(L.vocab);let i=0;const missed=[];
    const ask=()=>{
      if(i>=items.length){const pct=Math.round((items.length-missed.length)/items.length*100);saveProg('recite',pct);
        el.innerHTML=`<div class="card result"><div class="score">${pct}%</div><h3>${items.length-missed.length} من ${items.length} كلمة صحيحة</h3>
          ${missed.length?`<p class="muted">كلمات تحتاج مراجعة</p><div class="tiles">${missed.map(m=>`<span class="tile en" style="display:inline-flex;align-items:center;gap:8px">${esc(m.w)} ${spk(m.w,true)}</span>`).join('')}</div>`:'<p>لم تخطئ في أي كلمة!</p>'}
          <button class="btn primary" data-r="again">${ic('redo',18)} تسميع جديد</button></div>`;
        el.onclick=e=>{if(e.target.closest('[data-r=again]'))panelRecite(el,L)};return}
      const w=items[i];
      el.innerHTML=`<div class="card"><div class="ghead"><b>${mode==='write'?'اكتب الكلمة الإنجليزية':'اسمع ثم اكتب ما سمعته'}</b><span class="pill">${i+1} / ${items.length}</span></div>
        ${mode==='write'?`<div class="big">${esc(w.ar)}</div>`:`<div style="text-align:center">${spk(w.w).replace('spk"','spk" style="width:76px;height:76px"')}</div>`}
        <input class="tin en center" id="ans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="إجابتك">
        <div class="fb" id="fb"></div>
        <div class="row" style="justify-content:center"><button class="btn primary" data-r="check">تحقّق</button></div></div>`;
      const inp=$('#ans');inp.focus();if(mode==='listen')setTimeout(()=>say(w.w),250);
      let checked=false;
      const check=()=>{if(checked){i++;ask();return}
        const ok=norm(inp.value)===norm(w.w);checked=true;if(!ok)missed.push(w);
        $('#fb').className='fb '+(ok?'ok':'no');$('#fb').innerHTML=ok?'صحيح ✓':`الإجابة الصحيحة: <span class="en">${esc(w.w)}</span>`;
        say(w.w);inp.disabled=true;el.querySelector('[data-r=check]').textContent=i+1>=items.length?'عرض النتيجة':'التالي'};
      el.onclick=e=>{const b=e.target.closest('[data-r=check]');if(b)check()};
      inp.onkeydown=e=>{if(e.key==='Enter')check()};
    };
    ask();
  };
  el.onclick=e=>{const b=e.target.closest('[data-mode]');if(b)start(b.dataset.mode)};
  el.innerHTML=`<div class="gmenu"><button class="gm" data-mode="write">${ic('check',26)}<h3 style="margin:0">اكتب من المعنى</h3><span class="muted">يظهر المعنى العربي واكتب الكلمة</span></button>
    <button class="gm" data-mode="listen">${ic('head',26)}<h3 style="margin:0">اسمع واكتب</h3><span class="muted">تسمع الكلمة وتكتب إملاءها</span></button></div>
    <p class="muted">التسميع يغطي كل مفردات الدرس (${L.vocab.length} كلمة) بترتيب عشوائي.</p>`;
}


/* ============ الاختبار الشامل ============ */
const fmtBr=s=>esc(s).replace(/\(([^)]+)\)/g,'<b class="br">($1)</b>');
const wc=s=>(s.trim().match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g)||[]).length;
function panelExam(el,L){
  if(!L.exam){el.innerHTML=`<div class="card"><div class="empty" style="border:0"><h3>لم يُضف الاختبار الشامل لهذا الدرس بعد</h3></div></div>`;return}
  const X=L.exam;let it=0;
  const sel=(opts,a)=>`<span class="it" data-kind="sel" data-ans="${a}" data-show="${esc(opts[a])}"><select class="en"><option value="">اختر…</option>${opts.map((o,i)=>`<option value="${i}">${esc(o)}</option>`).join('')}</select></span>`;
  const rad=(name,o,a)=>`<div class="it opts" data-kind="radio" data-ans="${a}" data-show="${esc(o[a])}">${o.map((t,i)=>`<label class="op"><input type="radio" name="${name}" value="${i}"><span class="en">${esc(t)}</span></label>`).join('')}</div>`;
  const txt=a=>`<span class="it" data-kind="txt" data-ans="${esc(a)}" data-show="${esc(a.split('|')[0])}"><input class="tin en" type="text" size="14" autocomplete="off" autocapitalize="off" spellcheck="false"></span>`;
  const box=[...X.cloze.box].sort();
  let n=0;
  const cloze=X.cloze.text.replace(/\{(\d+)\}/g,(m,d)=>sel(box,box.indexOf(X.cloze.ans[d-1])));
  el.innerHTML=`<div class="exam">
   <div class="q"><h3><span class="en">Q1: Complete the conversation.</span><small>السؤال الأول: محادثة</small></h3>
     ${X.conv.map(l=>`<div class="dl en"><b>${esc(l.who)}:</b> ${l.gap?sel(l.gap.o,l.gap.a):esc(l.text)}</div>`).join('')}</div>
   <div class="q"><h3><span class="en">Q2: Complete the passage with words from the box.</span><small>قطعة قصيرة وصندوق كلمات</small></h3>
     <div class="box en">${box.map(b=>`<span>${esc(b)}</span>`).join('')}</div><p class="en" style="line-height:2.4;font-size:18px">${cloze}</p></div>
   <div class="q"><h3><span class="en">Q3: Read the passage, then answer the questions.</span><small>قطعة قراءة وخمسة أسئلة</small></h3>
     <div class="passage en"><b>${esc(X.read.title)}</b><br>${esc(X.read.text)}</div>
     <p class="en"><b>A) Choose the correct answer.</b></p>
     ${X.read.mcq.map((m,i)=>`<div class="qq en"><p>${i+1}. ${esc(m.q)}</p>${rad('r'+i,m.o,m.a)}</div>`).join('')}
     <p class="en"><b>B) Answer the following questions from the passage.</b></p>
     ${X.read.wr.map((w,i)=>`<div class="qq en"><p>${i+3}. ${esc(w.q)}</p><textarea class="ta en" rows="2"></textarea><div class="model en" hidden><b>Model answer:</b> ${esc(w.m)}</div></div>`).join('')}</div>
   <div class="q"><h3><span class="en">Q4: Choose the correct answer.</span><small>اختيار من متعدد</small></h3>
     ${X.mcq.map((m,i)=>`<div class="qq en"><p>${i+1}. ${esc(m.q)}</p>${rad('m'+i,m.o,m.a)}</div>`).join('')}</div>
   <div class="q"><h3><span class="en">Q5: Rewrite the following sentences using the words between brackets.</span><small>أعد كتابة الجمل مستخدمًا ما بين القوسين</small></h3>
     ${X.rewrite.map((r,i)=>`<div class="qq en"><p>${i+1}. ${esc(r.s)} <b class="br">(${esc(r.b)})</b></p><textarea class="ta en" rows="2"></textarea><div class="model en" hidden><b>Model answer:</b> ${esc(r.m)}<br><small>قد توجد صياغات صحيحة أخرى.</small></div></div>`).join('')}</div>
   <div class="q"><h3><span class="en">Q6: Correct the words between brackets.</span><small>صحّح ما بين القوسين</small></h3>
     ${X.fix.map((f,i)=>`<div class="qq en"><p>${i+1}. ${fmtBr(f.s)} → ${txt(f.a)}</p></div>`).join('')}</div>
   <div class="q"><h3><span class="en">Q7: Paragraph writing.</span><small>اكتب فقرة لا تقل عن 100 كلمة</small></h3>
     <p class="en"><b>${esc(X.para.topic)}</b></p><ul class="en muted">${X.para.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
     <textarea class="ta en" id="para" rows="9" aria-label="Your paragraph"></textarea><p class="wc no" id="wc">0 / 100 words</p>
     <div class="model" hidden id="paraNote">راجع فقرتك: مقدمة، ثم تفاصيل، ثم ختام. وتأكد من استخدام مفردات الدرس وصيغ المضارع الصحيحة.</div></div>
   <div class="sum"><span id="sumTxt">أجب عن الأسئلة ثم سلّم الاختبار</span><button class="btn" data-r="submit">تسليم الاختبار</button></div></div>`;
  const para=$('#para'),wcEl=$('#wc');
  para.oninput=()=>{const n=wc(para.value);wcEl.textContent=n+' / 100 words';wcEl.className='wc '+(n>=100?'ok':'no')};
  el.onclick=e=>{const b=e.target.closest('[data-r]');if(!b)return;
    if(b.dataset.r==='retry'){panelExam(el,L);window.scrollTo({top:0});return}
    if(b.dataset.r!=='submit')return;
    let right=0;const items=el.querySelectorAll('.it');
    items.forEach(t=>{let v='',ok=false;const k=t.dataset.kind;
      if(k==='sel')v=t.querySelector('select').value;
      if(k==='radio'){const c=t.querySelector('input:checked');v=c?c.value:''}
      if(k==='txt'){v=t.querySelector('input').value;ok=t.dataset.ans.split('|').map(norm).includes(norm(v))}
      else ok=v===t.dataset.ans;
      t.classList.add(ok?'right':'wrong');if(ok)right++;
      if(!ok){const f=document.createElement('span');f.className='fix'+(k==='radio'?'':' inl');f.textContent='✓ '+t.dataset.show;t.after(f)}
      t.querySelectorAll('input,select').forEach(x=>x.disabled=true)});
    el.querySelectorAll('.model').forEach(m=>m.hidden=false);
    el.querySelectorAll('textarea').forEach(x=>x.readOnly=true);
    const pct=Math.round(right/items.length*100);saveProg('exam',pct);
    $('#sumTxt').innerHTML=`الدرجة الآلية: <b>${right} / ${items.length}</b> (${pct}%) — الأسئلة الكتابية تُقارن بالإجابة النموذجية أو تُصحّح بواسطة المعلم`;
    b.dataset.r='retry';b.textContent='إعادة الاختبار';
    $('#sumTxt').scrollIntoView({block:'center',behavior:'smooth'});
  };
}


/* ============ الأحداث ============ */
const ACT={
  home:()=>go({view:'home',stage:null,grade:null}),
  stage:a=>go({view:'stage',stage:a.dataset.stage,grade:null}),
  grade:a=>{const g=a.dataset.grade;go({view:'grade',grade:g,stage:stageOf(g).id})},
  open:a=>{const g=a.dataset.grade;go({view:'lesson',grade:g,stage:stageOf(g).id,u:+a.dataset.u,l:+a.dataset.l,tab:'vocab'})},
  tab:a=>go({tab:a.dataset.tab,view:'lesson'}),
  progress:()=>go({view:'progress'}),
  teacherGate:()=>TEACHER.on?go({view:'add',stage:null,grade:null}):openGate(),
  addLesson:()=>TEACHER.on?go({view:'add',stage:null,grade:null}):openGate(),
  lockTeacher:()=>lockTeacher(),
  saveLesson:()=>{if(TEACHER.on)saveLesson()},
  delLesson:a=>{if(!TEACHER.on)return;const g=a.dataset.g,u=LOCAL[g].units[+a.dataset.ui];u.lessons.splice(+a.dataset.li,1);if(!u.lessons.length)LOCAL[g].units.splice(+a.dataset.ui,1);if(!LOCAL[g].units.length)delete LOCAL[g];store.set('ne.custom',LOCAL);rebuild();toast('تم الحذف');render()},
  dl:()=>{if(!TEACHER.on)return;const b=new Blob([exportText()],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='content.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3000);toast('لو لم يبدأ التنزيل استخدم زر النسخ')},
  cp:()=>{if(!TEACHER.on)return;const t=$('#fOut');t.select();const done=()=>toast('تم نسخ المحتوى');
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(done,()=>{try{document.execCommand('copy');done()}catch(e){toast('حدّد النص وانسخه يدويًا')}});
    else{try{document.execCommand('copy');done()}catch(e){toast('حدّد النص وانسخه يدويًا')}}},
  theme:()=>applyTheme(currentTheme()==='dark'?'light':'dark'),
  toggleSide:()=>toggleSide(),
  closeSide:()=>$('#app').classList.remove('mobile-open'),
  grp:()=>{if(!mobile()&&UI.side==='collapsed'){UI.side='open';$('#app').dataset.side='open';UI.grp=true}else UI.grp=!UI.grp;renderSide()},
  say:(a)=>say(a.dataset.t,null,a),
  vocabAll:()=>{const L=curLesson();playSeq(L.vocab.map(v=>v.w),i=>{document.querySelectorAll('.vrow.hl').forEach(e=>e.classList.remove('hl'));const r=$('#v'+i);r.classList.add('hl');r.scrollIntoView({block:'nearest',behavior:'smooth'})},()=>document.querySelectorAll('.vrow.hl').forEach(e=>e.classList.remove('hl')),.8)},
  playText:()=>{const ss=$('#panel')._ss;saveProg('listen',1);const sp=document.querySelectorAll('.sent');
    playSeq(ss,i=>{sp.forEach(s=>s.classList.remove('on'));sp[i].classList.add('on')},()=>sp.forEach(s=>s.classList.remove('on')),TTS.rate)},
  stopText:()=>stopAll(),
  sent:a=>{const ss=$('#panel')._ss,i=+a.dataset.i;stopAll();a.classList.add('on');const u=utter(ss[i]);u.onend=u.onerror=()=>a.classList.remove('on');saveProg('listen',1);if(TTS.ok)speechSynthesis.speak(u);else toast('المتصفح لا يدعم النطق الصوتي')},
  speed:a=>{TTS.rate=+a.dataset.r;document.querySelectorAll('#speed button').forEach(b=>b.setAttribute('aria-pressed',b===a))},
  game:a=>launchGame(a.dataset.g)
};
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-act]');if(!a)return;
  const f=ACT[a.dataset.act];if(!f)return;
  f(a);
  if(mobile()&&['home','stage','grade','open','tab','progress','addLesson','teacherGate'].includes(a.dataset.act))$('#app').classList.remove('mobile-open');
});
document.addEventListener('change',e=>{
  if(e.target.id==='fGrade')fillUnits();
  if(e.target.id==='fUnit')$('#fNew').hidden=e.target.value!=='__new';
  if(e.target.id==='fImport'){if(!TEACHER.on)return;const f=e.target.files[0];if(!f)return;
    f.text().then(t=>{try{const d=JSON.parse(t);LOCAL=mergeContent(LOCAL,d);store.set('ne.custom',LOCAL);rebuild();toast('تم استيراد المحتوى');render()}catch(_){toast('الملف غير صالح')}})}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#app').classList.remove('mobile-open')});

function render(){
  if(S.view==='add'&&!TEACHER.on)S.view='home';
  const v={home:viewHome,stage:viewStage,grade:viewGrade,lesson:viewLesson,progress:viewProgress,add:viewAdd}[S.view];
  $('#main').innerHTML=v();renderSide();renderTop();
  if(S.view==='lesson')mountPanel();
  if(S.view==='add')fillUnits();
}
(function init(){
  const t=store.get('ne.theme',null);if(t)document.documentElement.setAttribute('data-theme',t);
  UI.side=store.get('ne.side','open');if(mobile())UI.side='open';$('#app').dataset.side=UI.side;
  rebuild();render();
  try{fetch('content.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{if(d&&typeof d==='object'){FILE=d;rebuild();if(S.view!=='add')render()}}).catch(()=>{})}catch(e){}
})();
