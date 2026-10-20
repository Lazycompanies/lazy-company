/* Lazy Company — render de las paginas servicios/*.html
   Lee precios y funcionalidades de servicios.js (window.LazyCatalog). No contiene precios. */
(function(){
  var C = window.LazyCatalog;
  var key = document.body.getAttribute('data-service');
  var s = C && C.SERVICES[key];

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'es'; }
  function t(o){ return typeof o === 'string' ? o : o[lang()]; }
  function esc(x){ return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  // ES: $1.000.000 COP  |  EN: $310 USD (aprox., tasa fija en servicios.js)
  function cur(){ return lang()==='en' ? 'USD' : 'COP'; }
  function moneyIn(n, l){
    if(l==='en') return '$' + String(C.toUSD(n)).replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  }
  function money(n){ return moneyIn(n, lang()); }
  function b(es,en){ return {es:es,en:en}; }

  var UI = {
    implementation: b('Implementación','Implementation'),
    investment: b('Inversión','Investment'),
    implSub: b('pago único','one-time'),
    optional: b('opcional','optional'),
    maint: b('Mantenimiento opcional','Optional maintenance'),
    perMonth: b('/ mes','/ month'),
    from: b('Desde','From'),
    rec: b('Recomendado','Recommended'),
    selected: b('Seleccionado','Selected'),
    include: b('Puede incluir','May include'),
    exclude: b('No incluye','Not included'),
    reference: b('Tu referencia','Your reference'),
    exact: b('El valor exacto se define según integraciones y complejidad.','The exact value is defined by integrations and complexity. Prices in USD are approximate.'),
    fx: b('','Prices shown in USD (approx., based on COP rate).'),
    cta: b('Solicitar cotización','Request a quote'),
    ctaCard: b('Quiero esta solución','I want this solution'),
    allPrev: b('Todo lo del nivel anterior','Everything in the previous level')
  };

  // precio unico, rango o "desde"
  function rangeHTML(p){
    if(p.from) return '<span class="p-from">'+esc(t(UI.from))+'</span><span class="pn">'+money(p.min)+'</span>';
    if(p.exact) return '<span class="pn">'+money(p.min)+'</span>';
    return '<span class="pn">'+money(p.min)+'</span><span class="pn pn2">– '+money(p.max)+(p.plus?'+':'')+'</span>';
  }
  function rangeTextIn(p, l){
    if(p.from) return (l==='en' ? 'From ' : 'Desde ')+moneyIn(p.min, l);
    if(p.exact) return moneyIn(p.min, l);
    return moneyIn(p.min, l)+' – '+moneyIn(p.max, l)+(p.plus?'+':'');
  }
  function rangeText(p){ return rangeTextIn(p, lang()); }

  if(s){
    var elChips = document.getElementById('chips');
    var elGrid = document.getElementById('var-grid');
    var elNotes = document.getElementById('notes');
    var elBar = document.getElementById('quote-bar');
    // arranca en el nivel recomendado
    var sel = Math.max(0, s.variants.map(function(v){ return !!v.rec; }).indexOf(true));

    var implLabel = function(v){ return t(v.monthly ? UI.implementation : UI.investment); };

    var priceBlock = function(v){
      var hasM = !!v.monthly;
      var impl = '<div class="price-box'+(hasM?'':' single')+'"><span class="price-label">'+esc(implLabel(v))+(hasM ? ' <i>'+esc(t(UI.implSub))+'</i>' : '')+'</span>'+
        '<div class="price">'+rangeHTML(v.impl)+' <span class="cop">'+cur()+'</span></div></div>';
      if(!hasM){
        var maint = v.maint
          ? '<p class="maint-line"><b>'+esc(t(UI.maint))+'</b> '+esc(rangeText(v.maint))+' '+cur()+' '+esc(t(UI.perMonth))+'</p>' : '';
        return impl + maint;
      }
      var mon = '<div class="price-box alt"><span class="price-label">'+esc(t(s.monthlyLabel))+(v.monthlyOptional ? ' <i>'+esc(t(UI.optional))+'</i>' : '')+'</span>'+
        '<div class="price">'+rangeHTML(v.monthly)+' <span class="cop">'+cur()+' '+esc(t(UI.perMonth))+'</span></div></div>';
      return '<div class="price-dual">'+impl+mon+'</div>';
    };

    // descripcion del precio para el mensaje de WhatsApp, en el idioma l
    var describe = function(v, l){
      var en = l==='en', c = en ? 'USD' : 'COP';
      var txt = function(p, suf){ return rangeTextIn(p, l)+' '+c+(suf||''); };
      var out = (v.monthly ? (en ? 'implementation ' : 'implementación ') : (en ? 'price ' : 'inversión ')) + txt(v.impl);
      if(v.monthly){
        var lab = s.isAgents ? (en ? 'monthly operation ' : 'operación mensual ') : (en ? 'monthly fee ' : 'mensualidad ');
        out += ' + ' + lab + txt(v.monthly, en ? '/month' : '/mes') + (v.monthlyOptional ? (en ? ' (optional)' : ' (opcional)') : '');
      }
      if(v.maint) out += ' + ' + (en ? 'optional maintenance ' : 'mantenimiento opcional ') + txt(v.maint, en ? '/month' : '/mes');
      return out;
    };

    var waLink = function(v){
      var en = lang()==='en';
      var msg = (en ? 'Hi, I’d like a quote for: ' : 'Hola, quiero cotizar: ') + t(s.name) + ' – ' + (en ? 'level ' : 'nivel ') + t(v.name) + '. ' + (en ? 'Reference seen: ' : 'Referencia vista: ') + describe(v, lang());
      if(en) msg += ' (approx.; in COP: ' + describe(v, 'es') + ')';
      return 'https://wa.me/'+C.WA+'?text='+encodeURIComponent(msg);
    };

    var li = function(f){ return '<li>'+esc(f === C.PREV ? t(UI.allPrev) : t(f))+'</li>'; };

    var render = function(){
      var v = s.variants[sel];

      elChips.innerHTML = s.variants.map(function(vr,i){
        return '<button type="button" class="chip'+(i===sel?' on':'')+'" data-i="'+i+'" aria-pressed="'+(i===sel)+'">'+esc(t(vr.name))+'</button>';
      }).join('');

      elGrid.setAttribute('data-n', s.variants.length);
      var fx = document.getElementById('fx-note');
      if(!fx){ fx = document.createElement('p'); fx.id = 'fx-note'; fx.className = 'fx-note'; elGrid.parentNode.insertBefore(fx, elGrid); }
      fx.textContent = t(UI.fx); fx.hidden = lang() !== 'en';

      elGrid.innerHTML = s.variants.map(function(vr,i){
        var on = i===sel;
        return '<article class="var-card'+(on?' on':'')+(vr.rec?' rec':'')+'" data-i="'+i+'">'+
          '<div class="var-top"><h3>'+esc(t(vr.name))+'</h3>'+
            (vr.rec ? '<span class="badge rec">'+esc(t(UI.rec))+'</span>' : '')+
            (on ? '<span class="sel">✓ '+esc(t(UI.selected))+'</span>' : '')+'</div>'+
          '<div class="price-wrap">'+priceBlock(vr)+'</div>'+
          '<div class="var-desc"><p class="var-tag">'+esc(t(vr.tag))+'</p>'+
          (vr.note ? '<p class="var-note">'+esc(t(vr.note))+'</p>' : '')+'</div>'+
          '<span class="inc-label">'+esc(t(UI.include))+'</span>'+
          '<ul class="feat'+(vr.excl ? '' : ' grow')+'">'+vr.features.map(li).join('')+'</ul>'+
          (vr.excl ? '<span class="inc-label exc-label">'+esc(t(UI.exclude))+'</span><ul class="feat excl grow">'+vr.excl.map(li).join('')+'</ul>' : '')+
          '<a class="btn-card" href="'+waLink(vr)+'" target="_blank" rel="noopener">'+esc(t(UI.ctaCard))+' →</a>'+
        '</article>';
      }).join('');

      // nota al pie de las tarjetas (si el servicio la define)
      var tn = document.getElementById('tier-note');
      if(s.tierNote){
        if(!tn){ tn = document.createElement('p'); tn.id = 'tier-note'; tn.className = 'tier-note'; elNotes.parentNode.insertBefore(tn, elNotes); }
        tn.innerHTML = t(s.tierNote);
      }

      elNotes.innerHTML =
        (s.extraNote ? '<p>'+esc(t(s.extraNote))+'</p>' : '')+
        '<p>'+esc(t(C.NOTE_RANGE))+'</p>'+
        '<p>'+esc(t(C.NOTE_GENERAL))+'</p>';

      var barPrice = '<div class="bar-prices"><div><span>'+esc(implLabel(v))+'</span><b>'+rangeText(v.impl)+' '+cur()+'</b></div>'+
        (v.monthly ? '<div><span>'+esc(t(s.monthlyLabel))+(v.monthlyOptional ? ' ('+esc(t(UI.optional))+')' : '')+'</span><b>'+rangeText(v.monthly)+' '+cur()+' '+esc(t(UI.perMonth))+'</b></div>' : '')+
        '</div>';
      elBar.innerHTML = '<div class="quote-inner"><div class="bar-info"><span class="bar-ref">'+esc(t(UI.reference))+' · '+esc(t(v.name))+'</span>'+barPrice+
        '<span class="bar-exact">'+esc(t(UI.exact))+'</span></div>'+
        '<a class="btn-primary bar-cta" href="'+waLink(v)+'" target="_blank" rel="noopener">'+esc(t(UI.cta))+'</a></div>';

      syncBarHeight();
      equalize();
    };

    // tarjetas del mismo alto: precio y descripcion alinean sus bloques entre columnas
    var equalize = function(){
      ['.price-wrap','.var-desc','.feat:not(.excl)'].forEach(function(sel){
        var els = [].slice.call(elGrid.querySelectorAll(sel));
        els.forEach(function(e){ e.style.minHeight = ''; });
        if(window.matchMedia('(max-width:700px)').matches) return;
        var h = Math.max.apply(null, els.map(function(e){ return e.offsetHeight; }));
        els.forEach(function(e){ e.style.minHeight = h + 'px'; });
      });
    };

    var syncBarHeight = function(){
      document.documentElement.style.setProperty('--bar-h', elBar.offsetHeight + 'px');
    };

    // Schema Service: los rangos salen de servicios.js (no se duplican en el HTML)
    var addOffers = function(){
      var node = document.querySelector('script[type="application/ld+json"]');
      if(!node) return;
      try{
        var data = JSON.parse(node.textContent);
        var lows = s.variants.map(function(v){ return v.impl.min; });
        var highs = s.variants.map(function(v){ return v.impl.max || v.impl.min; });
        data.offers = { '@type':'AggregateOffer', priceCurrency:'COP', lowPrice:String(Math.min.apply(null,lows)), highPrice:String(Math.max.apply(null,highs)), offerCount:s.variants.length };
        node.textContent = JSON.stringify(data);
      }catch(e){}
    };

    var choose = function(i, scroll){
      sel = i; render();
      if(scroll){
        var on = elGrid.querySelector('.var-card.on');
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(on) on.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'center'});
      }
    };

    elChips.addEventListener('click', function(e){
      var c = e.target.closest('.chip'); if(c) choose(+c.getAttribute('data-i'), true);
    });
    elGrid.addEventListener('click', function(e){
      if(e.target.closest('a')) return; // los CTA siguen su enlace
      var c = e.target.closest('.var-card'); if(c && !c.classList.contains('on')) choose(+c.getAttribute('data-i'), false);
    });
    window.addEventListener('resize', function(){ syncBarHeight(); equalize(); });
    window.addEventListener('load', equalize);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(equalize);
    new MutationObserver(render).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

    render();
    addOffers();
  }

  /* ---- reveal, menu movil y chat de Sofia (igual que el resto del sitio) ---- */
  document.querySelectorAll('.head > *, .explainer, .others > *').forEach(function(el){ el.classList.add('fade-in'); });
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.fade-in').forEach(function(el){ revealObserver.observe(el); });

  window.toggleMobileMenu = function(){
    document.getElementById('mobile-menu').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('open');
    document.body.style.overflow = document.getElementById('mobile-menu').classList.contains('open') ? 'hidden' : '';
  };
  document.querySelectorAll('.mobile-menu a').forEach(function(a){ a.addEventListener('click', function(){
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
    document.body.style.overflow = '';
  }); });

  var WORKER_URL = 'https://lazy-agent.aeromarcos.workers.dev';
  var chatHistory = [], isChatOpen = false;
  window.toggleChat = function(){
    isChatOpen = !isChatOpen;
    document.getElementById('chat-box').classList.toggle('open', isChatOpen);
    if(isChatOpen) document.getElementById('chat-input').focus();
  };
  function appendMessage(text, type){
    var msgs = document.getElementById('chat-messages');
    var div = document.createElement('div');
    div.className = 'msg ' + type;
    div.innerHTML = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }
  window.sendMessage = async function(){
    var input = document.getElementById('chat-input');
    var text = input.value.trim();
    if(!text) return;
    input.value = ''; input.style.height = 'auto';
    appendMessage(text, 'user');
    chatHistory.push({ role:'user', content:text });
    var typing = appendMessage('Sofía está escribiendo...', 'typing');
    try{
      var res = await fetch(WORKER_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages: chatHistory }) });
      var data = await res.json();
      typing.remove();
      var reply = data.reply || 'Hubo un error. Escríbenos al WhatsApp: +57 301 411 2090';
      appendMessage(reply, 'sofia');
      chatHistory.push({ role:'assistant', content:reply });
    }catch(err){
      typing.remove();
      appendMessage('Hubo un error de conexión. Escríbenos al WhatsApp: +57 301 411 2090', 'sofia');
    }
  };
  document.getElementById('chat-input').addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); window.sendMessage(); }
  });
  document.getElementById('chat-input').addEventListener('input', function(){
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });
})();
