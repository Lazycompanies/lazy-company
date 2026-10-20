/* Lazy Company — calculadora "Calcula tu plan" (solo servicios/agentes.html)
   Toda la logica y los valores viven en servicios.js (C.estimateAgent y SERVICES.agentes.calc).
   Este archivo solo dibuja el control y lo conecta. Muestra unicamente precio de venta. */
(function(){
  var C = window.LazyCatalog;
  var s = C && C.SERVICES && C.SERVICES.agentes;
  var cfg = s && s.calc;
  var root = document.getElementById('agent-calc');
  if(!cfg || !root) return;

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'es'; }
  function b(es,en){ return {es:es,en:en}; }
  function esc(x){ return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function fmtNum(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang()==='en' ? ',' : '.'); }
  function money(n){ return '$' + fmtNum(lang()==='en' ? C.toUSD(n) : n); }
  function cur(){ return lang()==='en' ? 'USD' : 'COP'; }

  var TXT = {
    volLabel:  b('Conversaciones por mes','Conversations per month'),
    modelLabel:b('Modelo de IA','AI model'),
    implLabel: b('Implementación estimada','Estimated implementation'),
    implSub:   b('pago único','one-time'),
    monLabel:  b('Mensualidad estimada','Estimated monthly fee'),
    perMonth:  b('/ mes','/ month'),
    cta:       b('Cotizar por WhatsApp','Quote on WhatsApp'),
    hv:        b('Para este volumen, el valor final se confirma con nuestro equipo según infraestructura y soporte requerido.','For this volume, the final price is confirmed with our team based on the infrastructure and support required.'),
    foot:      b('Estimado de referencia. El valor final se confirma según integraciones y complejidad del proyecto.','Reference estimate. The final price is confirmed according to the project’s integrations and complexity.'),
    fx:        b('','Prices shown in USD (approx., based on COP rate).'),
    unit:      b('conversaciones/mes','conversations/month')
  };

  var conv = 1000, model = cfg.models[0].id;
  var LMIN = Math.log(cfg.min), LMAX = Math.log(cfg.max);

  // control logaritmico (0-1000): las marcas 300 / 1.000 / 3.000 quedan bien separadas
  function snap(c){
    var st = c < 1000 ? 10 : (c < 5000 ? 50 : 100);
    return Math.min(cfg.max, Math.max(cfg.min, Math.round(c / st) * st));
  }
  function posToConv(p){ return snap(Math.exp(LMIN + (LMAX - LMIN) * p / 1000)); }
  function convToPos(c){ return Math.round(1000 * (Math.log(Math.min(cfg.max, Math.max(cfg.min, c))) - LMIN) / (LMAX - LMIN)); }

  var ticksHTML = [{c:cfg.min,edge:'l'}]
    .concat(cfg.anchors.map(function(a){ return {c:a.conv}; }))
    .concat([{c:cfg.max,edge:'r'}])
    .map(function(t){
      return '<button type="button" class="tick'+(t.edge?' edge-'+t.edge:'')+'" data-c="'+t.c+'" style="--p:'+(convToPos(t.c)/1000)+'"></button>';
    }).join('');

  var modelsHTML = cfg.models.map(function(m,i){
    return '<label class="model"><input type="radio" name="agent-model" value="'+esc(m.id)+'"'+(i===0?' checked':'')+'>'+
      '<span class="model-body"><span class="model-head"><b data-k="m-'+esc(m.id)+'-name"></b> <em data-k="m-'+esc(m.id)+'-label"></em></span>'+
      '<span class="model-desc" data-k="m-'+esc(m.id)+'-desc"></span></span></label>';
  }).join('');

  root.innerHTML =
    '<div class="calc-card">'+
      '<div class="calc-controls">'+
        '<label class="price-label" id="calc-vol-lab" for="calc-num" data-k="volLabel"></label>'+
        '<div class="calc-vol"><input id="calc-num" class="calc-num" type="number" inputmode="numeric" min="'+cfg.min+'" max="'+cfg.max+'" step="10" value="'+conv+'"><span class="calc-unit" data-k="unit"></span></div>'+
        '<input id="calc-range" class="calc-range" type="range" min="0" max="1000" step="1" value="'+convToPos(conv)+'" aria-labelledby="calc-vol-lab">'+
        '<div class="calc-ticks">'+ticksHTML+'</div>'+
        '<span class="price-label model-lab" id="calc-model-lab" data-k="modelLabel"></span>'+
        '<div class="calc-models" role="radiogroup" aria-labelledby="calc-model-lab">'+modelsHTML+'</div>'+
      '</div>'+
      '<div class="calc-out" aria-live="polite">'+
        '<div class="price-dual">'+
          '<div class="price-box"><span class="price-label"><span data-k="implLabel"></span> <i data-k="implSub"></i></span><div class="price" id="calc-impl"></div></div>'+
          '<div class="price-box alt"><span class="price-label" data-k="monLabel"></span><div class="price" id="calc-mon"></div></div>'+
        '</div>'+
        '<p class="fine" id="calc-hv" data-k="hv" hidden></p>'+
        '<p class="fx-note" id="calc-fx" hidden></p>'+
        '<a class="btn-primary calc-cta" id="calc-cta" href="#" target="_blank" rel="noopener" data-k="cta"></a>'+
      '</div>'+
    '</div>'+
    '<p class="calc-foot" data-k="foot"></p>';

  var elNum = root.querySelector('#calc-num'), elRange = root.querySelector('#calc-range');
  var elImpl = root.querySelector('#calc-impl'), elMon = root.querySelector('#calc-mon');
  var elHv = root.querySelector('#calc-hv'), elFx = root.querySelector('#calc-fx'), elCta = root.querySelector('#calc-cta');

  function modelObj(id){ return cfg.models.filter(function(m){ return m.id === id; })[0]; }

  // textos segun idioma
  function texts(){
    var l = lang();
    [].forEach.call(root.querySelectorAll('[data-k]'), function(el){
      var k = el.getAttribute('data-k'), v;
      var mm = /^m-(.+)-(name|label|desc)$/.exec(k);
      if(mm){ var m = modelObj(mm[1]); v = m[mm[2] === 'name' ? 'name' : (mm[2] === 'label' ? 'label' : 'desc')][l]; if(mm[2] === 'label') v = '(' + v + ')'; }
      else v = TXT[k][l];
      el.textContent = v;
    });
    [].forEach.call(root.querySelectorAll('.tick'), function(t){ t.textContent = fmtNum(+t.getAttribute('data-c')); t.setAttribute('aria-label', fmtNum(+t.getAttribute('data-c')) + ' ' + TXT.unit[l]); });
    elFx.textContent = TXT.fx[l]; elFx.hidden = l !== 'en';
  }

  function fillTrack(){
    var w = elRange.offsetWidth, p = elRange.value / 1000;
    elRange.style.setProperty('--fill', (15 + (w - 30) * p) + 'px');
  }

  function update(){
    var e = C.estimateAgent(conv, model);
    elImpl.innerHTML = '<span class="pn">'+money(e.impl)+'</span> <span class="cop">'+cur()+'</span>';
    elMon.innerHTML  = '<span class="pn">'+money(e.monthly)+'</span> <span class="cop">'+cur()+' '+esc(TXT.perMonth[lang()])+'</span>';
    elHv.hidden = !(conv > cfg.highVolume);
    elRange.setAttribute('aria-valuetext', fmtNum(conv)+' '+TXT.unit[lang()]);

    var l = lang(), en = l === 'en', m = modelObj(model);
    var part = function(ll){ var c = ll === 'en' ? 'USD' : 'COP';
      return (ll==='en' ? 'implementation ' : 'implementación ') + money2(e.impl, ll) + ' ' + c + ' + ' + (ll==='en' ? 'monthly fee ' : 'mensualidad ') + money2(e.monthly, ll) + ' ' + c + (ll==='en' ? '/month' : '/mes'); };
    var msg = (en ? 'Hi, I used the agent calculator. Model: ' : 'Hola, usé la calculadora de agentes. Modelo: ') + m.name[l] +
      (en ? ', conversations per month: ' : ', conversaciones/mes: ') + fmtNum(conv) +
      (en ? '. Estimate: ' : '. Estimado: ') + part(l) +
      (en ? ' (approx.; in COP: ' + part('es') + ')' : '.');
    elCta.href = 'https://wa.me/' + C.WA + '?text=' + encodeURIComponent(msg);
  }
  function money2(n, ll){ return '$' + String(ll==='en' ? C.toUSD(n) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ll==='en' ? ',' : '.'); }

  elRange.addEventListener('input', function(){
    conv = posToConv(+elRange.value); elNum.value = conv; fillTrack(); update();
  });
  elNum.addEventListener('input', function(){
    var v = parseInt(elNum.value, 10);
    if(isNaN(v) || v < cfg.min || v > cfg.max) return;         // mientras escribe no se corrige
    conv = v; elRange.value = convToPos(conv); fillTrack(); update();
  });
  elNum.addEventListener('change', function(){
    var v = parseInt(elNum.value, 10); if(isNaN(v)) v = conv;
    conv = Math.min(cfg.max, Math.max(cfg.min, v)); elNum.value = conv; elRange.value = convToPos(conv); fillTrack(); update();
  });
  [].forEach.call(root.querySelectorAll('.tick'), function(t){
    t.addEventListener('click', function(){ conv = +t.getAttribute('data-c'); elNum.value = conv; elRange.value = convToPos(conv); fillTrack(); update(); });
  });
  [].forEach.call(root.querySelectorAll('input[name="agent-model"]'), function(r){
    r.addEventListener('change', function(){ if(r.checked){ model = r.value; update(); } });
  });

  window.addEventListener('resize', fillTrack);
  new MutationObserver(function(){ texts(); update(); }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

  texts(); update(); fillTrack();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(fillTrack);
})();
