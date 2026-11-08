/* Dark-Mode für die ganze Suite – ein Skript für alle Seiten */
(function(){
  var css = ''
  + ':root[data-theme="dark"]{--bg:#0b0d10;--bg2:#15181e;--card:#13161b;--ink:#f3f4f6;--ink-2:#cbd0d8;--muted:#9aa3af;--line:#242932;--line-2:#2c323c;--accent:#34d399;--accent-2:#34d399;--accent-soft:#122018;--green:#34d399;--green-2:#34d399;--green-3:#34d399;--green-soft:#122018;--amber:#fbbf24;--amber-soft:#2a2410;--red:#f87171;--red-soft:#2a1416;--s-ink:#f3f4f6;--s-muted:#9aa3af;--s-line:#242932;--s-bg2:#15181e;--s-accent:#34d399;--s-accent-2:#34d399;--s-accent-soft:#122018;}'
  + 'html[data-theme="dark"] .btn-dark,html[data-theme="dark"] .tbnav a.cta,html[data-theme="dark"] .cta a,html[data-theme="dark"] .finalcta a,html[data-theme="dark"] .hero-cta,html[data-theme="dark"] .lf-btn,html[data-theme="dark"] button.run{color:#0b0d10 !important}'
  + 'html[data-theme="dark"] body{background:#0b0d10 !important;color:#f3f4f6}'
  + 'html[data-theme="dark"] .tool,html[data-theme="dark"] .m,html[data-theme="dark"] .tg,html[data-theme="dark"] .step,html[data-theme="dark"] .bf,html[data-theme="dark"] .card,html[data-theme="dark"] .method,html[data-theme="dark"] .phase,html[data-theme="dark"] .rec,html[data-theme="dark"] .nl,html[data-theme="dark"] .mail,html[data-theme="dark"] .uc{background:#13161b;border-color:#242932}'
  + 'html[data-theme="dark"] .btn-ghost,html[data-theme="dark"] .btn-sec,html[data-theme="dark"] .btn-sm,html[data-theme="dark"] .chip{background:#15181e;color:#f3f4f6;border-color:#2c323c}'
  + 'html[data-theme="dark"] input,html[data-theme="dark"] select,html[data-theme="dark"] textarea{background:#15181e;color:#f3f4f6;border-color:#2c323c}'
  + 'html[data-theme="dark"] input::placeholder,html[data-theme="dark"] textarea::placeholder{color:#6b7280}'
  + 'html[data-theme="dark"] .topbar{border-color:#242932}'
  + 'html[data-theme="dark"] .tbnav a:hover{background:#15181e}'
  + 'html[data-theme="dark"] .msg .bubble,html[data-theme="dark"] .result,html[data-theme="dark"] .post,html[data-theme="dark"] .summary{color:#f3f4f6}'
  + '.ki-tog{background:none;border:0;cursor:pointer;font-size:15px;line-height:1;padding:7px 9px;border-radius:8px;color:var(--muted)}'
  + '.ki-tog:hover{background:var(--bg2)}';
  var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);

  var r=document.documentElement, KEY='ki-theme';
  function sysDark(){ return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
  var saved=''; try{saved=localStorage.getItem(KEY)||'';}catch(e){}
  r.setAttribute('data-theme', saved || (sysDark()?'dark':'light'));

  function initToggle(){
    var nav=document.querySelector('.tbnav'); if(!nav || document.getElementById('kiTog')) return;
    var b=document.createElement('button'); b.id='kiTog'; b.className='ki-tog'; b.type='button';
    b.title='Hell/Dunkel'; b.setAttribute('aria-label','Hell/Dunkel umschalten');
    b.textContent = r.getAttribute('data-theme')==='dark'?'☀️':'🌙';
    var cta=nav.querySelector('.cta'); if(cta) nav.insertBefore(b, cta); else nav.appendChild(b);
    b.addEventListener('click', function(){
      var next = r.getAttribute('data-theme')==='dark'?'light':'dark';
      r.setAttribute('data-theme', next); try{localStorage.setItem(KEY,next);}catch(e){}
      b.textContent = next==='dark'?'☀️':'🌙';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initToggle); else initToggle();

  // Hamburger Menu
  function initBurger(){
    var nav = document.querySelector('.tbnav'); if(!nav || document.getElementById('kiBurger')) return;
    var burger = document.createElement('button');
    burger.id='kiBurger'; burger.className='ki-burger'; burger.type='button';
    burger.setAttribute('aria-label','Menü öffnen'); burger.innerHTML='&#9776;';
    nav.appendChild(burger);

    var overlay = document.createElement('div'); overlay.className='ki-mobile-menu';
    var panel = document.createElement('div'); panel.className='ki-mobile-panel';
    var closeBtn = document.createElement('button'); closeBtn.className='ki-mobile-close'; closeBtn.textContent='✕';
    panel.appendChild(closeBtn);

    // Links aus tbnav klonen
    nav.querySelectorAll('a').forEach(function(a){
      var clone = a.cloneNode(true); panel.appendChild(clone);
    });
    overlay.appendChild(panel); document.body.appendChild(overlay);

    function open(){ overlay.classList.add('open'); document.body.style.overflow='hidden'; }
    function close(){ overlay.classList.remove('open'); document.body.style.overflow=''; }
    burger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
    panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initBurger); else initBurger();
})();
