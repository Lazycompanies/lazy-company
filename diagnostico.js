/* Lazy Company — diagnóstico gratuito (diagnostico.html).
   Parte 1: preguntas, puntaje y recomendación (funciones puras: corren igual en el navegador y en Node para pruebas).
   Parte 2: interfaz del wizard (solo en el navegador).
   Sin cifras inventadas: el impacto se describe en lenguaje cualitativo (brand book, sección 03 y 12).
   Subir ?v=N en diagnostico.html al cambiar este archivo. */
(function(root){
  'use strict';

  /* ================= PARTE 1 · DATOS Y LÓGICA ================= */

  var Q = [
    { id:'sector', type:'single',
      t:{es:'¿A qué se dedica tu negocio?', en:'What does your business do?'},
      opts:[
        ['retail',      'Retail / Moda',             'Retail / Fashion'],
        ['servicios',   'Servicios profesionales',   'Professional services'],
        ['salud',       'Salud / Estética',          'Health / Beauty'],
        ['inmobiliaria','Inmobiliaria',              'Real estate'],
        ['restaurantes','Restaurantes',              'Restaurants'],
        ['educacion',   'Educación',                 'Education'],
        ['otro',        'Otro',                      'Other']
      ] },
    { id:'canales', type:'multi',
      t:{es:'¿Por dónde te escriben tus clientes?', en:'Where do your customers reach you?'},
      hint:{es:'Elige todos los que apliquen.', en:'Choose all that apply.'},
      opts:[
        ['whatsapp',  'WhatsApp',        'WhatsApp'],
        ['instagram', 'Instagram',       'Instagram'],
        ['llamadas',  'Llamadas',        'Phone calls'],
        ['formulario','Formulario web',  'Web form'],
        ['presencial','Presencial',      'In person']
      ] },
    { id:'volumen', type:'single',
      t:{es:'¿Cuántas consultas recibes al mes?', en:'How many inquiries do you get per month?'},
      opts:[
        ['<50',     'Menos de 50',      'Fewer than 50'],
        ['50-200',  '50 – 200',         '50 – 200'],
        ['200-500', '200 – 500',        '200 – 500'],
        ['>500',    'Más de 500',       'More than 500'],
        ['no_se',   'No estoy seguro',  'Not sure']
      ] },
    { id:'manejo', type:'single',
      t:{es:'¿Quién atiende hoy esas consultas?', en:'Who handles those inquiries today?'},
      opts:[
        ['yo',          'Yo mismo',                       'Me, myself'],
        ['equipo',      'Un equipo pequeño',              'A small team'],
        ['automatizado','Ya tenemos algo automatizado',   'We already have some automation'],
        ['no_damos',    'No damos abasto',                'We can’t keep up']
      ] },
    { id:'friccion', type:'multi', max:2,
      t:{es:'¿Qué te quita más tiempo o clientes?', en:'What costs you the most time or customers?'},
      hint:{es:'Elige hasta 2.', en:'Choose up to 2.'},
      opts:[
        ['perdemos',    'Perdemos clientes por no responder rápido',  'We lose customers by not replying fast'],
        ['manual',      'Mucho trabajo manual repetitivo',             'Lots of repetitive manual work'],
        ['seguimiento', 'Es difícil hacer seguimiento',                'Following up is hard'],
        ['agenda',      'Agendar citas es un problema',                'Booking appointments is a hassle'],
        ['web',         'Nuestra web no ayuda a vender',               'Our website doesn’t help us sell']
      ] },
    { id:'herramientas', type:'multi', exclusive:'nada',
      t:{es:'¿Qué usas hoy?', en:'What do you use today?'},
      hint:{es:'Elige todos los que apliquen.', en:'Choose all that apply.'},
      opts:[
        ['web',    'Página web propia',          'My own website'],
        ['crm',    'CRM o lista de clientes',    'A CRM or customer list'],
        ['agenda', 'Agenda online',              'Online booking'],
        ['nada',   'Nada de esto todavía',       'None of these yet']
      ] },
    { id:'meta', type:'single',
      t:{es:'¿Cuál es tu meta principal?', en:'What is your main goal?'},
      opts:[
        ['vender',      'Vender más',              'Sell more'],
        ['tiempo',      'Ahorrar tiempo',          'Save time'],
        ['organizar',   'Organizar el negocio',    'Get organized'],
        ['profesional', 'Verme más profesional',   'Look more professional']
      ] }
  ];

  var has = function(arr, v){ return Array.isArray(arr) && arr.indexOf(v) !== -1; };
  var VOL_RANK = {'<50':0, 'no_se':1, '50-200':1, '200-500':2, '>500':3};

  /* ---- puntaje de potencial de automatización (0–100) ----
     volumen ≤28 · canales ≤16 · quién atiende ≤20 · fricciones ≤18 · herramientas que faltan ≤18 = 100 */
  function score(a){
    var s = 0;
    s += ({'<50':5, '50-200':15, '200-500':22, '>500':28, 'no_se':12})[a.volumen] || 0;
    var c = 0;
    (a.canales || []).forEach(function(k){ c += (k === 'whatsapp' || k === 'instagram') ? 5 : 2; });
    s += Math.min(16, c);
    s += ({yo:16, equipo:12, automatizado:4, no_damos:20})[a.manejo] || 0;
    s += Math.min(18, (a.friccion || []).length * 9);
    var tools = a.herramientas || [];
    var missing = has(tools, 'nada') ? 3 : ['web','crm','agenda'].filter(function(k){ return !has(tools, k); }).length;
    s += missing * 6;
    return Math.max(0, Math.min(100, Math.round(s)));
  }
  function level(n){
    if(n >= 75) return 'muy_alto';
    if(n >= 55) return 'alto';
    if(n >= 35) return 'medio';
    return 'bajo';
  }

  /* ---- puntos por servicio: cada regla suma puntos y deja un motivo (para la frase "por qué") ----
     Criterio: lo que el cliente marca como dolor (friccion) pesa 5 en su servicio principal;
     una herramienta que le falta pesa 2-3 (no la marco como problema, es una oportunidad). */
  var SERVICES = ['agentes','crm','agendamiento','conversion','procesos','web','apps']; // orden = desempate
  function serviceScores(a){
    var tools = has(a.herramientas, 'nada') ? [] : (a.herramientas || []);
    var f = a.friccion || [], ch = a.canales || [], v = VOL_RANK[a.volumen] || 0;
    var P = {}; SERVICES.forEach(function(k){ P[k] = {pts:0, why:[]}; });
    function add(svc, pts, why){ P[svc].pts += pts; if(why) P[svc].why.push([pts, why]); }

    // Agentes automatizados: atención inmediata en los canales de chat
    if(has(f, 'perdemos')) add('agentes', 5, 'perdemos');
    if(has(ch, 'whatsapp')) add('agentes', 3, 'whatsapp');
    if(has(ch, 'instagram')) add('agentes', 2, 'instagram');
    if(v >= 2) add('agentes', 2, 'volumen'); else if(v === 1) add('agentes', 1);
    if(a.manejo === 'no_damos') add('agentes', 3, 'no_damos');
    else if(a.manejo === 'yo') add('agentes', 2, 'yo');

    // Conversión de ventas: captar, calificar y seguir hasta la venta
    if(has(f, 'seguimiento')) add('conversion', 3, 'seguimiento');
    if(has(f, 'perdemos')) add('conversion', 2, 'perdemos');
    if(a.meta === 'vender') add('conversion', 3, 'vender');
    if(v >= 1) add('conversion', 1);
    if(has(ch, 'formulario')) add('conversion', 1);

    // CRM: tener a cada cliente y su historial en un solo lugar
    if(has(f, 'seguimiento')) add('crm', 5, 'seguimiento');
    if(!has(tools, 'crm')) add('crm', 2, 'sin_crm');
    if(a.meta === 'organizar') add('crm', 2, 'organizar');
    if(a.manejo === 'equipo') add('crm', 1);
    if(v >= 2) add('crm', 1);

    // Agendamiento: citas que se agendan, confirman y recuerdan solas
    var citas = ['salud','servicios','educacion'].indexOf(a.sector) !== -1;
    if(has(f, 'agenda')) add('agendamiento', 5, 'agenda');
    if(a.sector === 'salud') add('agendamiento', 3, 'sector_citas');
    else if(a.sector === 'servicios') add('agendamiento', 2, 'sector_citas');
    else if(a.sector === 'educacion' || a.sector === 'restaurantes') add('agendamiento', 1, 'sector_citas');
    if(!has(tools, 'agenda') && (citas || has(f, 'agenda'))) add('agendamiento', 2, 'sin_agenda');
    if(a.meta === 'tiempo') add('agendamiento', 1);

    // Procesos internos: tareas repetitivas y datos entre herramientas
    if(has(f, 'manual')) add('procesos', 5, 'manual');
    if(a.meta === 'tiempo') add('procesos', 2, 'tiempo');
    if(a.manejo === 'equipo') add('procesos', 1);
    if(a.manejo === 'automatizado') add('procesos', 1, 'automatizado');
    if(v >= 3) add('procesos', 1);

    // Web: presencia que explica la oferta y capta clientes
    if(!has(tools, 'web')) add('web', 3, 'sin_web');
    if(has(f, 'web')) add('web', 5, 'web_floja');
    if(a.meta === 'profesional') add('web', 3, 'profesional');
    if(a.sector === 'inmobiliaria' || a.sector === 'retail') add('web', 1);

    // Apps: solo cuando la web ya está resuelta y hay volumen en negocios de compra recurrente
    if(a.sector === 'restaurantes' || a.sector === 'retail') add('apps', 2, 'sector_app');
    if(has(tools, 'web') && !has(f, 'web')) add('apps', 1, 'web_resuelta');
    if(v >= 2) add('apps', 1);
    if(a.sector === 'educacion') add('apps', 1);
    if(a.meta === 'vender' && (a.sector === 'restaurantes' || a.sector === 'retail')) add('apps', 1);
    if(!has(tools, 'web') || has(f, 'web')) P.apps.pts = Math.min(P.apps.pts, 1); // sin web primero va la web

    return P;
  }
  function recommend(a, n){
    var P = serviceScores(a);
    return SERVICES.slice().sort(function(x, y){
      return (P[y].pts - P[x].pts) || (SERVICES.indexOf(x) - SERVICES.indexOf(y));
    }).slice(0, n || 3).map(function(k){
      var why = P[k].why.slice().sort(function(p, q){ return q[0] - p[0]; });
      return { id:k, pts:P[k].pts, why: why.length ? why[0][1] : 'default' };
    });
  }

  /* ---- textos del resultado ---- */
  var SVC = {
    agentes:      {es:'Agentes Automatizados', en:'Automated Agents',   url:'servicios/agentes.html'},
    crm:          {es:'CRM',                   en:'CRM',                url:'servicios/crm.html'},
    agendamiento: {es:'Agendamiento',          en:'Scheduling',         url:'servicios/agendamiento.html'},
    conversion:   {es:'Conversión de Ventas',  en:'Sales Conversion',   url:'servicios/conversion.html'},
    procesos:     {es:'Procesos Internos',     en:'Internal Processes', url:'servicios/procesos.html'},
    web:          {es:'Web',                   en:'Web',                url:'servicios/web.html'},
    apps:         {es:'Apps',                  en:'Apps',               url:'servicios/apps.html'}
  };
  var WHY = {
    agentes:{
      perdemos:{es:'Dijiste que pierdes clientes por no responder rápido: un agente de IA contesta al instante, también de noche y fines de semana.', en:'You said you lose customers by not replying fast: an AI agent answers instantly, nights and weekends included.'},
      no_damos:{es:'Tu equipo no da abasto: un agente atiende las preguntas frecuentes y les deja a ustedes solo lo que de verdad necesita una persona.', en:'Your team can’t keep up: an agent handles the frequent questions and leaves you only what truly needs a person.'},
      whatsapp:{es:'Tus clientes te escriben por WhatsApp: un agente responde, califica y agenda ahí mismo, sin que tengas que estar pendiente.', en:'Your customers message you on WhatsApp: an agent replies, qualifies and books right there, without you watching the phone.'},
      instagram:{es:'Recibes consultas por Instagram: un agente responde los mensajes directos al momento y no se queda ninguno sin contestar.', en:'You get inquiries on Instagram: an agent answers DMs right away so none go unanswered.'},
      yo:{es:'Hoy atiendes tú: un agente responde por ti las consultas de siempre para que recuperes tu tiempo.', en:'You handle inquiries yourself today: an agent answers the usual questions for you so you get your time back.'},
      volumen:{es:'Con tu volumen de consultas, un agente asegura que cada mensaje reciba respuesta, aunque lleguen muchos a la vez.', en:'With your inquiry volume, an agent makes sure every message gets a reply, even when many arrive at once.'},
      'default':{es:'Un agente de IA atiende y califica a tus clientes por chat, a cualquier hora.', en:'An AI agent serves and qualifies your customers by chat, at any hour.'}
    },
    conversion:{
      seguimiento:{es:'Hacer seguimiento te cuesta: un sistema de conversión le escribe a cada interesado en el momento justo, hasta cerrar o descartar.', en:'Following up is hard for you: a conversion system contacts each lead at the right moment, until it closes or is ruled out.'},
      vender:{es:'Tu meta es vender más: captamos, calificamos y seguimos a cada lead para que menos oportunidades se enfríen.', en:'Your goal is to sell more: we capture, qualify and follow every lead so fewer opportunities go cold.'},
      perdemos:{es:'Se te escapan clientes: el sistema retoma a quien preguntó y no compró, sin que tengas que acordarte.', en:'Customers slip away: the system re-engages whoever asked but didn’t buy, without you having to remember.'},
      'default':{es:'Un embudo automático que convierte más consultas en ventas.', en:'An automated funnel that turns more inquiries into sales.'}
    },
    crm:{
      seguimiento:{es:'Te cuesta hacer seguimiento: con un CRM ves en qué punto está cada cliente y el sistema te avisa qué sigue.', en:'Following up is hard: with a CRM you see where each customer stands and the system tells you what’s next.'},
      sin_crm:{es:'Todavía no usas un CRM: tener a todos tus clientes y su historial en un solo lugar es la base para automatizar lo demás.', en:'You don’t use a CRM yet: having every customer and their history in one place is the foundation for automating the rest.'},
      organizar:{es:'Quieres organizar el negocio: el CRM ordena clientes, conversaciones y ventas en un solo tablero.', en:'You want to get organized: a CRM puts customers, conversations and sales on a single board.'},
      'default':{es:'Un CRM conectado a tus canales, para no perder de vista a ningún cliente.', en:'A CRM connected to your channels, so no customer falls through the cracks.'}
    },
    agendamiento:{
      agenda:{es:'Agendar citas es un problema hoy: las citas se agendan, confirman y recuerdan solas, y bajan las ausencias.', en:'Booking is a hassle today: appointments book, confirm and remind themselves, and no-shows drop.'},
      sector_citas:{es:'Tu tipo de negocio vive de citas y reservas: que se agenden solas te libera horas de mensajes de ida y vuelta.', en:'Your kind of business runs on appointments: letting them book themselves frees hours of back-and-forth.'},
      sin_agenda:{es:'No tienes agenda online: tus clientes podrían reservar solos, a cualquier hora, sin escribirte.', en:'You have no online booking: customers could book on their own, any time, without messaging you.'},
      'default':{es:'Citas que se agendan, confirman y reprograman solas.', en:'Appointments that book, confirm and reschedule themselves.'}
    },
    procesos:{
      manual:{es:'Hay mucho trabajo manual repetitivo: automatizamos esas tareas y conectamos tus herramientas para que los datos pasen solos.', en:'There’s a lot of repetitive manual work: we automate those tasks and connect your tools so data flows on its own.'},
      tiempo:{es:'Tu meta es ahorrar tiempo: las tareas internas que hoy hace alguien a mano pueden correr solas.', en:'Your goal is to save time: internal tasks someone does by hand today can run on their own.'},
      automatizado:{es:'Ya tienes algo automatizado: el siguiente paso es conectar esas piezas para que trabajen juntas.', en:'You already automate something: the next step is connecting those pieces so they work together.'},
      'default':{es:'Tus procesos internos, conectados y sin pasos manuales.', en:'Your internal processes, connected and free of manual steps.'}
    },
    web:{
      web_floja:{es:'Tu web no te ayuda a vender: una web clara que explique tu oferta y capte contactos trabaja por ti todo el día.', en:'Your website doesn’t help you sell: a clear site that explains your offer and captures leads works for you all day.'},
      sin_web:{es:'Todavía no tienes web propia: es tu vitrina abierta las 24 horas y el lugar donde empiezan tus automatizaciones.', en:'You don’t have your own website yet: it’s your storefront open 24 hours and where your automations begin.'},
      profesional:{es:'Quieres verte más profesional: una web a la medida es lo primero que ve un cliente antes de escribirte.', en:'You want to look more professional: a custom website is the first thing a customer sees before reaching out.'},
      'default':{es:'Una web que capta, responde y convierte.', en:'A website that captures, responds and converts.'}
    },
    apps:{
      sector_app:{es:'En tu tipo de negocio los clientes vuelven a comprar: una app en su celular facilita pedir, reservar y volver.', en:'In your kind of business customers come back: an app on their phone makes ordering, booking and returning easier.'},
      web_resuelta:{es:'Tu web ya está resuelta: el siguiente paso natural es estar en el celular de tus clientes, a un toque.', en:'Your website is already sorted: the natural next step is being on your customers’ phones, one tap away.'},
      'default':{es:'Tu negocio en el celular de tus clientes.', en:'Your business on your customers’ phones.'}
    }
  };
  var IMPACT = {
    agentes:{es:'Responderías al instante, también fuera de horario y en fines de semana.', en:'You’d reply instantly, after hours and on weekends too.'},
    conversion:{es:'Menos clientes interesados se quedarían sin respuesta o sin seguimiento.', en:'Fewer interested customers would be left without a reply or a follow-up.'},
    crm:{es:'Sabrías en qué punto está cada cliente sin revisar chats ni libretas.', en:'You’d know where every customer stands without digging through chats or notebooks.'},
    agendamiento:{es:'Tu agenda se llenaría sola y dejarías de coordinar horarios por mensaje.', en:'Your calendar would fill itself and you’d stop coordinating times by message.'},
    procesos:{es:'Tu equipo dejaría de copiar datos a mano entre herramientas.', en:'Your team would stop copying data by hand between tools.'},
    web:{es:'Tendrías una vitrina que explica tu oferta y capta clientes mientras duermes.', en:'You’d have a storefront that explains your offer and captures customers while you sleep.'},
    apps:{es:'Tus clientes te tendrían a un toque en su celular para volver a comprar.', en:'Your customers would have you one tap away on their phone to buy again.'}
  };
  var LEVEL = {
    bajo:{es:'Bajo', en:'Low', d:{es:'Tu operación todavía es manejable a mano. Hay mejoras puntuales que te ahorrarían trabajo hoy y te preparan para crecer.', en:'Your operation is still manageable by hand. A few targeted improvements would save work today and prepare you to grow.'}},
    medio:{es:'Medio', en:'Medium', d:{es:'Ya hay tareas que se repiten y consultas que se pueden atender mejor. Automatizar lo principal te daría orden y tiempo.', en:'There are already repetitive tasks and inquiries that could be handled better. Automating the essentials would give you order and time.'}},
    alto:{es:'Alto', en:'High', d:{es:'Tu negocio tiene volumen y fricciones claras. Un sistema conectado haría buena parte del trabajo por ti.', en:'Your business has volume and clear friction points. A connected system would do a good part of the work for you.'}},
    muy_alto:{es:'Muy alto', en:'Very high', d:{es:'Estás atendiendo mucho a mano y se te escapan oportunidades. Es justo el tipo de negocio que más gana al automatizar.', en:'You’re handling a lot by hand and opportunities slip away. It’s exactly the kind of business that gains most from automation.'}}
  };

  function optLabel(qid, val, lang){
    var q = Q.filter(function(x){ return x.id === qid; })[0];
    var o = q && q.opts.filter(function(x){ return x[0] === val; })[0];
    return o ? o[lang === 'en' ? 2 : 1] : val;
  }
  function result(a, lang){
    lang = lang === 'en' ? 'en' : 'es';
    var n = score(a), lv = level(n), recs = recommend(a, 3);
    return {
      score:n, level:lv, levelLabel:LEVEL[lv][lang], levelText:LEVEL[lv].d[lang],
      services: recs.map(function(r){
        var w = WHY[r.id][r.why] || WHY[r.id]['default'];
        return { id:r.id, pts:r.pts, name:SVC[r.id][lang], url:SVC[r.id].url, why:w[lang] };
      }),
      impact: recs.map(function(r){ return IMPACT[r.id][lang]; })
    };
  }
  function whatsappText(a, r, lang){
    var names = r.services.map(function(s){ return s.name; });
    var list = names.length > 1 ? names.slice(0, -1).join(', ') + (lang === 'en' ? ' and ' : ' y ') + names[names.length - 1] : names[0];
    var sector = a.sector === 'otro' && a.sector_otro ? a.sector_otro : optLabel('sector', a.sector, lang);
    return lang === 'en'
      ? 'Hi! I took the Lazy Company diagnosis (' + r.levelLabel.toLowerCase() + ' automation potential, ' + r.score + '/100). My business: ' + sector + '. I’m interested in ' + list + '.'
      : 'Hola, hice el diagnóstico de Lazy Company (potencial ' + r.levelLabel.toLowerCase() + ', ' + r.score + '/100). Mi negocio: ' + sector + '. Me interesa ' + list + '.';
  }

  var api = { Q:Q, score:score, level:level, serviceScores:serviceScores, recommend:recommend, result:result, whatsappText:whatsappText, optLabel:optLabel };
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
  root.LazyDiag = api;

  /* ================= PARTE 2 · INTERFAZ ================= */
  if(typeof document === 'undefined') return;
  var app = document.getElementById('diag');
  if(!app) return;

  var UI = {
    es:{ start:'Empezar', back:'Atrás', next:'Continuar', step:'Paso', of:'de', otherPh:'¿Cuál? (opcional)',
         capTitle:'Tu diagnóstico está listo', capLead:'Déjanos tus datos para ver el resultado completo: qué servicios encajan con tu negocio y por qué.',
         potential:'Potencial de automatización', recs:'Servicios recomendados',
         name:'Nombre', email:'Correo', phone:'WhatsApp', consent:'Autorizo el tratamiento de mis datos según la <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad</a>.',
         submit:'Ver mi diagnóstico completo', sending:'Preparando tu diagnóstico…',
         eName:'Escribe tu nombre.', eEmail:'Revisa tu correo (ej. nombre@correo.com).', ePhone:'Revisa tu número: solo dígitos, entre 7 y 15.', eConsent:'Necesitamos tu autorización para continuar.',
         resTitle:'Tu diagnóstico', resLevel:'Potencial', resWhy:'Por qué te lo recomendamos', resImpact:'Lo que cambiaría en tu día a día', resMore:'Ver el servicio →',
         resCta:'Hablar por WhatsApp sobre mi diagnóstico', resNote:'Respondemos personalmente. Sin compromiso.', restart:'Hacer el diagnóstico de nuevo', ofTotal:'/100' },
    en:{ start:'Start', back:'Back', next:'Continue', step:'Step', of:'of', otherPh:'Which one? (optional)',
         capTitle:'Your diagnosis is ready', capLead:'Leave your details to see the full result: which services fit your business and why.',
         potential:'Automation potential', recs:'Recommended services',
         name:'Name', email:'Email', phone:'WhatsApp', consent:'I authorize the processing of my data under the <a href="privacidad.html" target="_blank" rel="noopener">Privacy policy</a>.',
         submit:'See my full diagnosis', sending:'Preparing your diagnosis…',
         eName:'Please enter your name.', eEmail:'Check your email (e.g. name@email.com).', ePhone:'Check your number: digits only, 7 to 15.', eConsent:'We need your authorization to continue.',
         resTitle:'Your diagnosis', resLevel:'Potential', resWhy:'Why we recommend it', resImpact:'What would change day to day', resMore:'See the service →',
         resCta:'Talk on WhatsApp about my diagnosis', resNote:'We reply personally. No commitment.', restart:'Take the diagnosis again', ofTotal:'/100' }
  };
  var L = function(){ return (document.documentElement.lang || 'es').slice(0,2) === 'en' ? 'en' : 'es'; };
  var esc = function(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = { step:-1, a:{ canales:[], friccion:[], herramientas:[] }, lead:null, phase:'intro' }; // phase: intro | q | capture | result
  var stage = app.querySelector('.dg-stage'), bar = app.querySelector('.dg-bar i'), meta = app.querySelector('.dg-meta');

  function progress(){
    var total = Q.length, t = UI[L()];
    var done = state.phase === 'intro' ? 0 : state.phase === 'q' ? state.step : total;
    bar.style.transform = 'scaleX(' + (done / total) + ')';
    meta.textContent = state.phase === 'q' ? t.step + ' ' + (state.step + 1) + ' ' + t.of + ' ' + total : '';
    app.classList.toggle('dg-started', state.phase !== 'intro');
  }
  function swap(html, focusSel){
    var go = function(){
      stage.innerHTML = html;
      stage.classList.remove('dg-out'); void stage.offsetWidth; stage.classList.add('dg-in');
      progress();
      var f = stage.querySelector(focusSel || 'h2'); if(f){ f.setAttribute('tabindex','-1'); f.focus({preventScroll:true}); }
      if(app.getBoundingClientRect().top < 0) app.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
    };
    if(!stage.innerHTML || reduced){ go(); return; }
    stage.classList.remove('dg-in'); stage.classList.add('dg-out');
    setTimeout(go, 180);
  }

  function renderIntro(){
    var lang = L(), t = UI[lang];
    var intro = lang === 'en'
      ? {h:'Free diagnosis', p:'7 quick questions, about a minute, almost no typing. At the end you’ll see your automation potential and which services fit your business.'}
      : {h:'Diagnóstico gratuito', p:'7 preguntas rápidas, cerca de un minuto y casi sin escribir. Al final verás tu potencial de automatización y qué servicios encajan con tu negocio.'};
    swap('<div class="dg-intro"><h2>' + intro.h + '</h2><p>' + intro.p + '</p><button class="dg-btn" type="button" data-go="start">' + t.start + '</button></div>');
  }
  function renderQ(){
    var q = Q[state.step], lang = L(), t = UI[lang], val = state.a[q.id];
    var multi = q.type === 'multi';
    var opts = q.opts.map(function(o){
      var on = multi ? has(val, o[0]) : val === o[0];
      return '<button type="button" class="dg-opt' + (on ? ' on' : '') + '" data-v="' + o[0] + '" aria-pressed="' + on + '"><span>' + esc(o[lang === 'en' ? 2 : 1]) + '</span></button>';
    }).join('');
    var other = q.id === 'sector'
      ? '<div class="dg-other"' + (val === 'otro' ? '' : ' hidden') + '><input type="text" maxlength="80" autocomplete="off" placeholder="' + t.otherPh + '" value="' + esc(state.a.sector_otro || '') + '" aria-label="' + t.otherPh + '"></div>' : '';
    var needNext = multi || (q.id === 'sector' && val === 'otro');
    var ready = multi ? (val || []).length > 0 : !!val;
    swap('<fieldset class="dg-q"><legend><h2>' + q.t[lang] + '</h2>' + (q.hint ? '<p class="dg-hint">' + q.hint[lang] + '</p>' : '') + '</legend>' +
         '<div class="dg-opts' + (q.opts.length > 5 ? ' dg-opts--many' : '') + '" role="group">' + opts + '</div>' + other +
         '<div class="dg-nav"><button type="button" class="dg-link" data-go="back">← ' + t.back + '</button>' +
         '<button type="button" class="dg-btn" data-go="next"' + (needNext ? '' : ' hidden') + (ready ? '' : ' disabled') + '>' + t.next + '</button></div></fieldset>');
    if(multi) paintMulti(q, val || []);
  }
  function select(v){
    var q = Q[state.step];
    if(q.type === 'single'){
      state.a[q.id] = v;
      if(q.id === 'sector' && v === 'otro'){ renderQ(); var i = stage.querySelector('.dg-other input'); if(i) i.focus(); return; }
      if(q.id === 'sector') delete state.a.sector_otro;
      stage.querySelectorAll('.dg-opt').forEach(function(b){ var on = b.getAttribute('data-v') === v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      setTimeout(next, reduced ? 80 : 320); // seleccion unica: avanza sola
      return;
    }
    var arr = (state.a[q.id] || []).slice(), i = arr.indexOf(v);
    if(i !== -1) arr.splice(i, 1);
    else {
      if(q.exclusive) arr = v === q.exclusive ? [] : arr.filter(function(x){ return x !== q.exclusive; });
      if(q.max && arr.length >= q.max) return; // con el maximo alcanzado, primero hay que desmarcar una
      arr.push(v);
    }
    state.a[q.id] = arr;
    paintMulti(q, arr);
    var nx = stage.querySelector('[data-go="next"]'); if(nx) nx.disabled = arr.length === 0;
  }
  function paintMulti(q, arr){
    var full = q.max && arr.length >= q.max;
    stage.querySelectorAll('.dg-opt').forEach(function(b){
      var on = arr.indexOf(b.getAttribute('data-v')) !== -1;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
      b.classList.toggle('off', !!full && !on); b.setAttribute('aria-disabled', full && !on ? 'true' : 'false');
    });
  }
  function next(){
    if(state.phase === 'q' && state.step < Q.length - 1){ state.step++; renderQ(); return; }
    state.phase = 'capture'; renderCapture();
  }
  function back(){
    if(state.phase === 'capture'){ state.phase = 'q'; state.step = Q.length - 1; renderQ(); return; }
    if(state.step <= 0){ state.phase = 'intro'; state.step = -1; renderIntro(); return; }
    state.step--; renderQ();
  }

  function renderCapture(){
    var lang = L(), t = UI[lang], r = result(state.a, lang), d = state.lead || {};
    var blurred = r.services.map(function(s){ return '<li><span class="dg-blur" aria-hidden="true">' + esc(s.name) + '</span></li>'; }).join('');
    swap('<div class="dg-cap">' +
      '<div class="dg-teaser" aria-label="' + t.potential + ': ' + r.levelLabel + '"><span class="dg-k">' + t.potential + '</span>' +
        '<strong class="dg-lv">' + r.levelLabel + '</strong><span class="dg-num dg-blur" aria-hidden="true">' + r.score + t.ofTotal + '</span>' +
        '<span class="dg-k">' + t.recs + '</span><ol class="dg-teaser-list">' + blurred + '</ol></div>' +
      '<form class="dg-form" novalidate>' +
        '<h2>' + t.capTitle + '</h2><p class="dg-lead">' + t.capLead + '</p>' +
        '<label class="dg-f"><span>' + t.name + '</span><input name="nombre" type="text" autocomplete="name" maxlength="120" required value="' + esc(d.nombre || '') + '"><em class="dg-err" data-for="nombre"></em></label>' +
        '<label class="dg-f"><span>' + t.email + '</span><input name="correo" type="email" autocomplete="email" inputmode="email" maxlength="160" required value="' + esc(d.correo || '') + '"><em class="dg-err" data-for="correo"></em></label>' +
        '<label class="dg-f"><span>' + t.phone + '</span><span class="dg-phone"><input name="prefijo" type="text" inputmode="tel" maxlength="5" value="' + esc(d.prefijo || '+57') + '" aria-label="Prefijo"><input name="whatsapp" type="tel" autocomplete="tel-national" inputmode="tel" maxlength="20" required value="' + esc(d.numero || '') + '"></span><em class="dg-err" data-for="whatsapp"></em></label>' +
        // anti-spam: campo trampa invisible para personas; los bots suelen llenarlo
        '<div class="dg-hp" aria-hidden="true"><label>Empresa <input name="empresa_web" type="text" tabindex="-1" autocomplete="off"></label></div>' +
        '<label class="dg-check"><input name="consentimiento" type="checkbox"' + (d.consentimiento ? ' checked' : '') + '><span>' + t.consent + '</span></label><em class="dg-err" data-for="consentimiento"></em>' +
        '<div class="dg-nav"><button type="button" class="dg-link" data-go="back">← ' + t.back + '</button><button type="submit" class="dg-btn">' + t.submit + '</button></div>' +
      '</form></div>', 'h2');
  }
  function validate(form){
    var t = UI[L()], ok = true, err = {};
    var nombre = form.nombre.value.trim(), correo = form.correo.value.trim();
    var pref = form.prefijo.value.replace(/[^\d+]/g, ''), num = form.whatsapp.value.replace(/[\s\-().]/g, '');
    if(!nombre) err.nombre = t.eName;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) err.correo = t.eEmail;
    if(!/^\d{7,15}$/.test(num) || !/^\+?\d{1,4}$/.test(pref)) err.whatsapp = t.ePhone;
    if(!form.consentimiento.checked) err.consentimiento = t.eConsent;
    form.querySelectorAll('.dg-err').forEach(function(e){ e.textContent = err[e.getAttribute('data-for')] || ''; });
    form.querySelectorAll('input').forEach(function(i){ i.toggleAttribute('aria-invalid', !!err[i.name === 'prefijo' ? 'whatsapp' : i.name]); });
    ok = !Object.keys(err).length;
    if(!ok){ var first = form.querySelector('[aria-invalid]'); if(first) first.focus(); }
    return ok ? { nombre:nombre, correo:correo, prefijo:(pref.charAt(0) === '+' ? pref : '+' + pref), numero:num, consentimiento:true } : null;
  }

  /* Registro del lead con el mismo esquema de la tabla "leads" acordada (Supabase). */
  function buildLead(d){
    var lang = L(), r = result(state.a, lang);
    return {
      nombre:d.nombre, correo:d.correo, whatsapp:d.prefijo + ' ' + d.numero,
      sector:state.a.sector, sector_otro:state.a.sector === 'otro' ? (state.a.sector_otro || null) : null,
      canal_contacto:state.a.canales, volumen_consultas:state.a.volumen, manejo_actual:state.a.manejo,
      friccion_principal:state.a.friccion, herramientas_actuales:state.a.herramientas, meta_principal:state.a.meta,
      puntaje_resultado:r.score, servicios_recomendados:r.services.map(function(s){ return s.id; }),
      idioma:lang, origen:'diagnostico_web', consentimiento:true
    };
  }
  function guardarLead(lead){
    /* ===== PENDIENTE SUPABASE (conectar esta tarde) =====
       Reemplazar este bloque por el insert real, con la clave ANON (solo puede insertar, por RLS):
         const { error } = await supabase.from('leads').insert(lead, { returning: 'minimal' });
         if(error) console.error('[diagnostico] no se pudo guardar el lead en Supabase:', error);
       `returning: 'minimal'` es obligatorio: sin permiso de SELECT, devolver la fila haria fallar el insert.
       Nunca bloquear al usuario: si falla, igual se muestra el resultado (abajo).
       Mientras tanto: copia local en este navegador, solo para pruebas. */
    try{
      var k = 'lazy_diag_leads', arr = JSON.parse(localStorage.getItem(k) || '[]');
      arr.push(Object.assign({ created_at:new Date().toISOString() }, lead));
      localStorage.setItem(k, JSON.stringify(arr.slice(-20)));
    }catch(e){ console.error('[diagnostico] no se pudo guardar el lead (local):', e); }
    return Promise.resolve();
  }
  function submit(form){
    var d = validate(form); if(!d) return;
    state.lead = d;
    var btn = form.querySelector('[type="submit"]'); btn.disabled = true; btn.textContent = UI[L()].sending;
    var bot = form.empresa_web && form.empresa_web.value.trim() !== '';
    var p = bot ? Promise.resolve() : guardarLead(buildLead(d)); // si es bot: no se guarda, pero no se le avisa
    p.catch(function(e){ console.error('[diagnostico] error al guardar:', e); })
     .then(function(){ state.phase = 'result'; renderResult(); });
  }

  function renderResult(){
    var lang = L(), t = UI[lang], r = result(state.a, lang);
    var wa = 'https://wa.me/573014112090?text=' + encodeURIComponent(whatsappText(state.a, r, lang));
    var svc = r.services.map(function(s, i){
      return '<li class="dg-svc"><span class="dg-idx">0' + (i + 1) + '</span><div><h3>' + esc(s.name) + '</h3><p>' + esc(s.why) + '</p><a href="' + s.url + '">' + t.resMore + '</a></div></li>';
    }).join('');
    var imp = r.impact.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('');
    var name = state.lead && state.lead.nombre ? esc(state.lead.nombre.split(' ')[0]) + ', ' : '';
    swap('<div class="dg-res">' +
      '<div class="dg-score"><span class="dg-k">' + t.potential + '</span>' +
        '<div class="dg-gauge" style="--p:' + r.score + '"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="v" cx="60" cy="60" r="52" pathLength="100"/></svg><strong>' + r.score + '<small>' + t.ofTotal + '</small></strong></div>' +
        '<strong class="dg-lv">' + r.levelLabel + '</strong><p>' + esc(r.levelText) + '</p></div>' +
      '<div class="dg-main"><h2>' + name + (lang === 'en' ? 'these are the services that fit your business best' : 'estos son los servicios que más encajan con tu negocio') + '</h2>' +
        '<ol class="dg-svcs">' + svc + '</ol>' +
        '<h3 class="dg-sub">' + t.resImpact + '</h3><ul class="dg-impact">' + imp + '</ul>' +
        '<a class="dg-btn dg-wa" href="' + wa + '" target="_blank" rel="noopener">' + t.resCta + '</a><p class="dg-note">' + t.resNote + '</p>' +
        '<button type="button" class="dg-link" data-go="restart">↺ ' + t.restart + '</button></div>' +
    '</div>', 'h2');
  }

  function render(){ ({intro:renderIntro, q:renderQ, capture:renderCapture, result:renderResult})[state.phase](); }

  stage.addEventListener('click', function(e){
    var o = e.target.closest('.dg-opt'); if(o){ select(o.getAttribute('data-v')); return; }
    var g = e.target.closest('[data-go]'); if(!g) return;
    var go = g.getAttribute('data-go');
    if(go === 'start'){ state.phase = 'q'; state.step = 0; renderQ(); }
    else if(go === 'next') next();
    else if(go === 'back') back();
    else if(go === 'restart'){ state = { step:-1, a:{ canales:[], friccion:[], herramientas:[] }, lead:state.lead, phase:'intro' }; renderIntro(); }
  });
  stage.addEventListener('input', function(e){
    if(e.target.closest('.dg-other')) state.a.sector_otro = e.target.value.trim().slice(0, 80);
  });
  stage.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && e.target.closest('.dg-other')){ e.preventDefault(); next(); }
  });
  stage.addEventListener('submit', function(e){ e.preventDefault(); submit(e.target); });

  // re-pintar en el otro idioma sin perder respuestas (lang.js cambia <html lang>)
  var lastLang = L();
  new MutationObserver(function(){ var now = L(); if(now === lastLang) return; lastLang = now;
    if(state.phase === 'capture'){ var f = stage.querySelector('form'); if(f) state.lead = Object.assign({}, state.lead, { nombre:f.nombre.value, correo:f.correo.value, prefijo:f.prefijo.value, numero:f.whatsapp.value, consentimiento:f.consentimiento.checked }); }
    render(); }).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  renderIntro();
})(typeof window !== 'undefined' ? window : globalThis);
