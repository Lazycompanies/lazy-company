/* Lazy Company — catálogo de soluciones + pre-cotizador (servicios.html)
   Rangos en COP. Fuente única de datos: editar aquí para cambiar precios. */
(function(){
  var WA = '573014112090';
  function b(es,en){ return {es:es,en:en}; }
  // Rango: [min, max, plus]  |  Desde: [min, null, false, true]
  function R(min,max,plus){ return {min:min,max:max,plus:!!plus}; }
  function FROM(min){ return {min:min,from:true}; }

  var UI = {
    solutions: b('¿Qué podemos construir?','What can we build?'),
    level: b('Elige tu nivel','Choose your level'),
    levelAgents: b('Volumen de conversaciones al mes','Monthly conversation volume'),
    investment: b('Inversión','Investment'),
    implementation: b('Implementación','Implementation'),
    implSub: b('pago único','one-time'),
    operation: b('Operación mensual','Monthly operation'),
    perMonth: b('/ mes','/ month'),
    cop: 'COP',
    from: b('Desde','From'),
    custom: b('A medida','Custom'),
    selected: b('Seleccionado','Selected'),
    include: b('Puede incluir','May include'),
    costDrives: b('Lo que define el precio','What drives the price'),
    reference: b('Tu referencia','Your reference'),
    exact: b('El valor exacto se define según integraciones y complejidad.','The exact value is defined by integrations and complexity.'),
    cta: b('Solicitar cotización','Request a quote'),
    ctaCard: b('Quiero esta solución','I want this solution'),
    ctaCustom: b('Construir este sistema','Build this system'),
    close: b('Cerrar','Close'),
    allPrev: b('Todo lo del nivel anterior','Everything in the previous level'),
    upTo: b('Hasta','Up to'),
    convMonth: b('conversaciones/mes','conversations/month')
  };

  var NOTE_GENERAL = b(
    'Los costos de plataformas externas, licencias, infraestructura o servicios de terceros pueden cobrarse por separado.',
    'Costs of external platforms, licenses, infrastructure or third-party services may be charged separately.');
  var NOTE_RANGE = b(
    'Los rangos son una referencia inicial. El valor final depende del alcance, integraciones, volumen, complejidad y funcionalidades requeridas.',
    'Ranges are an initial reference. The final value depends on scope, integrations, volume, complexity and required features.');

  var PREV = 'PREV'; // marcador "Todo lo anterior"

  var SERVICES = {
    web: {
      name: b('Web','Web'),
      intro: b('Sitios y sistemas web construidos a la medida. No vendemos plantillas: diseñamos y conectamos tu web con lo que tu negocio necesita para vender.',
               'Custom-built websites and web systems. We don’t sell templates: we design and connect your site to whatever your business needs to sell.'),
      drives: b('Tipo y complejidad del proyecto','Project type and complexity'),
      priceLabel: 'investment',
      variants: [
        { name: b('Web Starter','Web Starter'), impl: R(1500000,2500000),
          tag: b('Para negocios que necesitan una presencia digital profesional y sencilla.','For businesses that need a simple, professional digital presence.'),
          features: [b('Landing page o sitio pequeño','Landing page or small site'), b('Diseño responsive','Responsive design'), b('Diseño personalizado, no plantilla','Custom design, not a template'), b('WhatsApp','WhatsApp'), b('Formularios','Forms'), b('Analytics','Analytics'), b('SEO técnico básico','Basic technical SEO'), b('Publicación','Publishing')] },
        { name: b('Web Profesional','Web Professional'), impl: R(2500000,5000000),
          tag: b('Para empresas que necesitan una página web corporativa más completa.','For companies that need a more complete corporate website.'),
          features: [b('Diseño UX/UI','UX/UI design'), b('Varias secciones/páginas','Multiple sections/pages'), b('Animaciones','Animations'), b('Formularios avanzados','Advanced forms'), b('WhatsApp','WhatsApp'), b('Analytics','Analytics'), b('SEO técnico','Technical SEO'), b('CMS','CMS'), b('Integraciones básicas','Basic integrations'), b('Optimización de conversión','Conversion optimization')] },
        { name: b('Web + Sistemas','Web + Systems'), impl: R(5000000,9000000),
          tag: b('Para empresas que necesitan que su web se conecte con otros sistemas.','For companies whose website needs to connect with other systems.'),
          features: [PREV, b('CRM','CRM'), b('Formularios conectados','Connected forms'), b('Automatizaciones','Automations'), b('APIs','APIs'), b('Agendamiento','Scheduling'), b('Captura y clasificación de leads','Lead capture and classification'), b('Integraciones externas','External integrations'), b('Dashboards o sistemas internos básicos','Dashboards or basic internal systems')] },
        { name: b('Web Inteligente','Smart Web'), impl: R(9000000,18000000,true),
          tag: b('Para empresas que quieren convertir su web en un sistema inteligente.','For companies that want to turn their website into an intelligent system.'),
          note: b('Desde $9M cuando el proyecto supera el alcance estándar.','From $9M when the project goes beyond the standard scope.'),
          features: [b('IA','AI'), b('Agente de IA','AI agent'), b('Base de conocimiento','Knowledge base'), b('Captura y calificación de leads','Lead capture and qualification'), b('CRM','CRM'), b('Automatizaciones','Automations'), b('Agendamiento','Scheduling'), b('Pagos','Payments'), b('APIs','APIs'), b('Sistemas personalizados','Custom systems'), b('Integraciones complejas','Complex integrations')] }
      ]
    },

    crm: {
      name: b('CRM','CRM'),
      intro: b('No somos un software CRM: implementamos, personalizamos, automatizamos y conectamos el CRM de tu operación comercial con el resto de tus herramientas.',
               'We’re not CRM software: we implement, customize, automate and connect the CRM behind your sales operation with the rest of your tools.'),
      drives: b('Nivel de implementación, automatización e IA','Implementation level, automation and AI'),
      priceLabel: 'implementation',
      extraNote: b('El software/licencia del CRM puede cobrarse aparte.','The CRM software/license may be charged separately.'),
      variants: [
        { name: b('CRM Base','CRM Base'), impl: R(2000000,3500000),
          tag: b('Para empresas que necesitan organizar clientes y oportunidades.','For companies that need to organize customers and opportunities.'),
          features: [b('Configuración','Setup'), b('Pipeline','Pipeline'), b('Campos personalizados','Custom fields'), b('Usuarios','Users'), b('Contactos','Contacts'), b('Etapas comerciales','Sales stages'), b('Formularios','Forms'), b('Automatizaciones básicas','Basic automations')] },
        { name: b('CRM Automatizado','Automated CRM'), impl: R(3500000,6000000),
          tag: b('Para empresas que quieren automatizar el seguimiento comercial.','For companies that want to automate sales follow-up.'),
          features: [PREV, b('Automatizaciones','Automations'), b('Lead routing','Lead routing'), b('Seguimiento automático','Automatic follow-up'), b('Notificaciones','Notifications'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Lead scoring','Lead scoring'), b('Dashboards','Dashboards'), b('Integraciones','Integrations')] },
        { name: b('CRM + IA','CRM + AI'), impl: R(6000000,10000000),
          tag: b('Para empresas que quieren incorporar IA a su operación comercial.','For companies that want to bring AI into their sales operation.'),
          features: [PREV, b('IA para clasificación de leads','AI lead classification'), b('IA para análisis de conversaciones','AI conversation analysis'), b('IA para resúmenes','AI summaries'), b('IA para seguimiento','AI follow-up'), b('IA para generación de respuestas','AI response generation'), b('Agentes conectados al CRM','Agents connected to the CRM'), b('Automatización avanzada','Advanced automation')] },
        { name: b('CRM a Medida / Enterprise','Custom / Enterprise CRM'), impl: R(10000000,20000000,true), custom: true,
          tag: b('Para empresas con procesos comerciales complejos.','For companies with complex sales processes.'),
          features: [b('Arquitectura personalizada','Custom architecture'), b('Múltiples pipelines','Multiple pipelines'), b('Múltiples equipos','Multiple teams'), b('APIs','APIs'), b('ERP','ERP'), b('Facturación','Invoicing'), b('WhatsApp','WhatsApp'), b('IA','AI'), b('Dashboards','Dashboards'), b('Automatizaciones complejas','Complex automations'), b('Sistemas internos','Internal systems')] }
      ]
    },

    agentes: {
      name: b('Agentes Automatizados','Automated Agents'),
      intro: b('Agentes de IA entrenados con tu información que atienden, califican y agendan por WhatsApp o web, las 24 horas. Separamos siempre lo que pagas una vez (implementación) de lo que pagas cada mes (operación).',
               'AI agents trained on your information that answer, qualify and schedule via WhatsApp or web, 24/7. We always separate what you pay once (implementation) from what you pay monthly (operation).'),
      drives: b('Implementación + conversaciones mensuales','Implementation + monthly conversations'),
      isAgents: true,
      extraNote: b('Los costos de Meta/WhatsApp, cuando apliquen, pueden cobrarse por separado según las tarifas vigentes de Meta.',
                   'Meta/WhatsApp costs, when applicable, may be charged separately according to Meta’s current rates.'),
      variants: [
        { name: b('Agente 1.000','Agent 1,000'), chip: b('1.000 conversaciones','1,000 conversations'), vol: '1.000',
          impl: R(3000000,4500000), monthly: R(600000,900000),
          tag: b('Hasta 1.000 conversaciones/mes','Up to 1,000 conversations/month'),
          features: [b('1 agente','1 agent'), b('WhatsApp o web','WhatsApp or web'), b('Base de conocimiento','Knowledge base'), b('Entrenamiento','Training'), b('Respuestas automáticas','Automatic replies'), b('Captura de leads','Lead capture'), b('Escalamiento a humano','Handoff to a human'), b('Monitoreo básico','Basic monitoring')] },
        { name: b('Agente 2.500','Agent 2,500'), chip: b('2.500 conversaciones','2,500 conversations'), vol: '2.500',
          impl: R(4000000,5500000), monthly: R(900000,1300000),
          tag: b('Hasta 2.500 conversaciones/mes','Up to 2,500 conversations/month'),
          features: [PREV, b('CRM','CRM'), b('Calificación de leads','Lead qualification'), b('Seguimiento','Follow-up'), b('Agendamiento','Scheduling'), b('Automatizaciones','Automations'), b('Integraciones básicas','Basic integrations')] },
        { name: b('Agente 5.000','Agent 5,000'), chip: b('5.000 conversaciones','5,000 conversations'), vol: '5.000',
          impl: R(5000000,7500000), monthly: R(1300000,1900000),
          tag: b('Hasta 5.000 conversaciones/mes','Up to 5,000 conversations/month'),
          features: [PREV, b('Múltiples flujos','Multiple flows'), b('CRM','CRM'), b('Agendamiento','Scheduling'), b('Seguimiento','Follow-up'), b('Integraciones API','API integrations'), b('Analítica','Analytics'), b('Escalamiento inteligente','Smart escalation'), b('Procesos comerciales','Sales processes')] },
        { name: b('Agente 7.500','Agent 7,500'), chip: b('7.500 conversaciones','7,500 conversations'), vol: '7.500',
          impl: R(6500000,9000000), monthly: R(1800000,2500000),
          tag: b('Hasta 7.500 conversaciones/mes','Up to 7,500 conversations/month'),
          features: [PREV, b('Mayor volumen','Higher volume'), b('Múltiples procesos','Multiple processes'), b('Integraciones avanzadas','Advanced integrations'), b('Múltiples agentes o áreas','Multiple agents or areas'), b('Analítica avanzada','Advanced analytics'), b('Automatizaciones complejas','Complex automations')] },
        { name: b('Agente 10.000','Agent 10,000'), chip: b('10.000 conversaciones','10,000 conversations'), vol: '10.000',
          impl: R(8000000,12000000,true), monthly: R(2300000,3500000,true),
          tag: b('Hasta 10.000 conversaciones/mes','Up to 10,000 conversations/month'),
          features: [b('Arquitectura avanzada','Advanced architecture'), b('Múltiples agentes','Multiple agents'), b('Múltiples canales','Multiple channels'), b('CRM','CRM'), b('APIs','APIs'), b('Sistemas internos','Internal systems'), b('Automatización avanzada','Advanced automation'), b('Analítica','Analytics'), b('Soporte prioritario','Priority support')] },
        { name: b('Agentes +10.000','Agents 10,000+'), chip: b('+10.000','10,000+'), custom: true,
          impl: FROM(12000000), monthly: FROM(3500000),
          tag: b('Solución a medida','Custom solution'),
          note: b('El precio final depende del volumen, canales, integraciones, complejidad y consumo de IA.','The final price depends on volume, channels, integrations, complexity and AI usage.'),
          features: [b('Volumen, canales e integraciones definidos contigo','Volume, channels and integrations defined with you'), b('Arquitectura y consumo de IA dimensionados a tu operación','Architecture and AI usage sized to your operation')] }
      ]
    },

    conversion: {
      name: b('Conversión de Ventas','Sales Conversion'),
      intro: b('Construimos sistemas que capturan, califican, siguen y convierten leads automáticamente.',
               'We build systems that capture, qualify, follow up and convert leads automatically.'),
      drives: b('Complejidad del funnel y de las automatizaciones','Funnel and automation complexity'),
      priceLabel: 'investment',
      variants: [
        { name: b('Conversión Básica','Basic Conversion'), impl: R(3500000,5000000),
          tag: b('Lo esencial para capturar y dar seguimiento a cada lead.','The essentials to capture and follow up on every lead.'),
          features: [b('Captura de leads','Lead capture'), b('CRM','CRM'), b('Pipeline','Pipeline'), b('Seguimiento','Follow-up'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Notificaciones','Notifications'), b('Automatizaciones básicas','Basic automations')] },
        { name: b('Conversión Automatizada','Automated Conversion'), impl: R(5000000,8000000),
          tag: b('Un funnel que trabaja solo, de la captura al agendamiento.','A funnel that runs on its own, from capture to scheduling.'),
          features: [PREV, b('Lead scoring','Lead scoring'), b('Seguimiento automático','Automatic follow-up'), b('Recuperación de leads','Lead recovery'), b('WhatsApp','WhatsApp'), b('Automatización del funnel','Funnel automation'), b('Agendamiento','Scheduling'), b('CRM','CRM'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: b('Conversión con IA','AI Conversion'), impl: R(8000000,12000000),
          tag: b('Un agente de ventas que califica, conversa y recupera oportunidades.','A sales agent that qualifies, converses and recovers opportunities.'),
          features: [b('Agente de ventas','Sales agent'), b('IA para calificación','AI qualification'), b('IA para conversaciones','AI conversations'), b('Seguimiento automático','Automatic follow-up'), b('Recuperación de oportunidades','Opportunity recovery'), b('CRM','CRM'), b('Agendamiento','Scheduling'), b('Pagos','Payments'), b('Personalización de conversaciones','Conversation personalization'), b('Analítica','Analytics')] },
        { name: b('Sistema Comercial Avanzado','Advanced Sales System'), impl: R(12000000,20000000,true), custom: true,
          tag: b('Para empresas con procesos comerciales complejos.','For companies with complex sales processes.'),
          features: [b('Múltiples agentes','Multiple agents'), b('CRM','CRM'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Pagos','Payments'), b('IA','AI'), b('APIs','APIs'), b('Automatización completa del funnel','Full funnel automation'), b('Dashboards','Dashboards'), b('Integraciones empresariales','Enterprise integrations')] }
      ]
    },

    agendamiento: {
      name: b('Agendamiento','Scheduling'),
      intro: b('Sistemas de citas que se agendan, confirman, recuerdan y reprograman solos, conectados a tu CRM y a tus canales.',
               'Appointment systems that book, confirm, remind and reschedule on their own, connected to your CRM and channels.'),
      drives: b('Complejidad del sistema y cantidad de integraciones','System complexity and number of integrations'),
      priceLabel: 'investment',
      variants: [
        { name: b('Agendamiento Simple','Simple Scheduling'), impl: R(1500000,2500000),
          tag: b('Para empezar a recibir citas sin cruces ni llamadas.','To start taking appointments without conflicts or calls.'),
          features: [b('Calendario','Calendar'), b('Formularios','Forms'), b('Confirmación','Confirmation'), b('Recordatorios','Reminders'), b('Email','Email'), b('WhatsApp','WhatsApp')] },
        { name: b('Agendamiento Automatizado','Automated Scheduling'), impl: R(2500000,4000000),
          tag: b('Gestión completa de la cita, sin intervención humana.','Full appointment management, no human intervention.'),
          features: [PREV, b('WhatsApp','WhatsApp'), b('Confirmaciones','Confirmations'), b('Cancelaciones','Cancellations'), b('Reprogramaciones','Rescheduling'), b('CRM','CRM'), b('Seguimiento','Follow-up'), b('Automatizaciones','Automations')] },
        { name: b('Agendamiento + IA','Scheduling + AI'), impl: R(4000000,6500000),
          tag: b('Un agente que conversa, entiende lo que necesita el cliente y agenda.','An agent that chats, understands what the customer needs and books.'),
          features: [b('Agente de IA','AI agent'), b('Conversación natural','Natural conversation'), b('Identificación de necesidades','Needs identification'), b('Consulta de disponibilidad','Availability lookup'), b('Agendamiento','Scheduling'), b('Reprogramación','Rescheduling'), b('CRM','CRM'), b('Seguimiento','Follow-up')] },
        { name: b('Agendamiento Complejo','Complex Scheduling'), impl: R(6500000,10000000,true), custom: true,
          tag: b('Para operaciones con varios profesionales, calendarios o sedes.','For operations with multiple professionals, calendars or locations.'),
          features: [b('Múltiples profesionales','Multiple professionals'), b('Múltiples calendarios','Multiple calendars'), b('Múltiples sedes','Multiple locations'), b('Reglas complejas','Complex rules'), b('Pagos','Payments'), b('IA','AI'), b('APIs','APIs'), b('CRM','CRM'), b('Integraciones personalizadas','Custom integrations')] }
      ]
    },

    procesos: {
      name: b('Procesos Internos','Internal Processes'),
      intro: b('Automatizamos las tareas y procesos que hoy consumen horas de tu equipo.',
               'We automate the tasks and processes that today consume your team’s hours.'),
      drives: b('Complejidad del proceso y cantidad de sistemas conectados','Process complexity and number of connected systems'),
      priceLabel: 'investment',
      variants: [
        { name: b('Automatización Simple','Simple Automation'), impl: R(2500000,4000000),
          tag: b('Para procesos pequeños.','For small processes.'),
          features: [b('Formularios','Forms'), b('Emails','Emails'), b('Notificaciones','Notifications'), b('Documentos','Documents'), b('Organización de información','Information organization'), b('Reportes simples','Simple reports')] },
        { name: b('Automatización de Procesos','Process Automation'), impl: R(4000000,8000000),
          tag: b('Para conectar varias herramientas.','To connect several tools.'),
          features: [b('CRM','CRM'), b('Bases de datos','Databases'), b('APIs','APIs'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Documentos','Documents'), b('Reportes','Reports'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: b('Procesos con IA','AI Processes'), impl: R(8000000,15000000),
          tag: b('Para que la IA haga el trabajo repetitivo de tu equipo.','To let AI do your team’s repetitive work.'),
          features: [b('Agentes internos','Internal agents'), b('Procesamiento de documentos','Document processing'), b('Clasificación','Classification'), b('Extracción de información','Information extraction'), b('Análisis de datos','Data analysis'), b('Generación de reportes','Report generation'), b('IA conectada a sistemas','AI connected to systems'), b('Automatización avanzada','Advanced automation')] },
        { name: b('Sistema Empresarial a Medida','Custom Enterprise System'), impl: R(15000000,30000000,true), custom: true,
          tag: b('Para empresas con procesos complejos.','For companies with complex processes.'),
          features: [b('APIs','APIs'), b('Bases de datos','Databases'), b('IA','AI'), b('Dashboards','Dashboards'), b('Múltiples sistemas','Multiple systems'), b('ERP','ERP'), b('CRM','CRM'), b('Automatizaciones avanzadas','Advanced automations'), b('Arquitectura personalizada','Custom architecture')] }
      ]
    }
  };

  /* ---------- helpers ---------- */
  var modal = document.getElementById('svc-modal');
  if(!modal) return;
  var elTitle = document.getElementById('m-title');
  var elIcon = document.getElementById('m-icon');
  var elBody = document.getElementById('m-body');
  var elBar = document.getElementById('m-bar');
  var elClose = document.getElementById('m-close');
  var current = null, selIdx = 0, lastTrigger = null;

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'es'; }
  function t(o){ return typeof o === 'string' ? o : o[lang()]; }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function money(n){ return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }

  // Devuelve HTML de un rango, con cada extremo sin cortarse a mitad de cifra
  function rangeHTML(p, suffix){
    if(p.from){
      return '<span class="p-from">'+esc(t(UI.from))+'</span> <span class="pn">'+money(p.min)+'</span>'+(suffix||'');
    }
    return '<span class="pn">'+money(p.min)+'</span><span class="pdash"> – </span><span class="pn">'+money(p.max)+(p.plus?'+':'')+'</span>'+(suffix||'');
  }
  function rangeText(p){
    if(p.from) return t(UI.from)+' '+money(p.min);
    return money(p.min)+' – '+money(p.max)+(p.plus?'+':'');
  }

  function featuresHTML(v){
    return v.features.map(function(f){
      return '<li>'+esc(f === PREV ? t(UI.allPrev) : t(f))+'</li>';
    }).join('');
  }

  function priceBlock(s, v){
    if(s.isAgents){
      return '<div class="price-dual">'+
        '<div class="price-box"><span class="price-label">'+esc(t(UI.implementation))+' <i>'+esc(t(UI.implSub))+'</i></span>'+
          '<div class="price">'+rangeHTML(v.impl)+' <span class="cop">COP</span></div></div>'+
        '<div class="price-box alt"><span class="price-label">'+esc(t(UI.operation))+'</span>'+
          '<div class="price">'+rangeHTML(v.monthly)+' <span class="cop">COP '+esc(t(UI.perMonth))+'</span></div></div>'+
      '</div>';
    }
    var label = t(s.priceLabel === 'implementation' ? UI.implementation : UI.investment);
    return '<div class="price-box single"><span class="price-label">'+esc(label)+'</span>'+
      '<div class="price">'+rangeHTML(v.impl)+' <span class="cop">COP</span></div></div>';
  }

  function waLink(s, v){
    var msg = (lang()==='en' ? 'Hi, I’d like a quote for: ' : 'Hola, quiero cotizar: ') + t(s.name) + ' – ' + t(v.name) + '. ' +
      (lang()==='en' ? 'Reference seen: ' : 'Referencia vista: ');
    msg += s.isAgents
      ? (lang()==='en' ? 'implementation ' : 'implementación ') + rangeText(v.impl) + ' COP + ' + (lang()==='en' ? 'monthly ' : 'operación ') + rangeText(v.monthly) + ' COP' + (lang()==='en' ? '/month' : '/mes')
      : rangeText(v.impl) + ' COP';
    return 'https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
  }

  function explainerHTML(){
    var es = lang()==='es';
    return '<section class="explainer">'+
      '<h4>'+(es?'¿Qué es una conversación?':'What is a conversation?')+'</h4>'+
      '<div class="explainer-grid">'+
        '<div>'+
          '<p>'+(es?'Una conversación representa una interacción completa entre un cliente y el agente dentro de una sesión. No cobramos por cada mensaje individual.':'A conversation is one complete interaction between a customer and the agent within a session. We don’t charge per individual message.')+'</p>'+
          '<div class="split"><div><b>'+(es?'Conversaciones del plan Lazy':'Lazy plan conversations')+'</b><span>'+(es?'Lo que defines al elegir el nivel de tu agente.':'What you define when choosing your agent’s level.')+'</span></div>'+
          '<div><b>'+(es?'Costos de mensajería de Meta':'Meta messaging costs')+'</b><span>'+(es?'Se manejan por separado, según las tarifas vigentes de Meta, cuando apliquen.':'Handled separately, per Meta’s current rates, when applicable.')+'</span></div></div>'+
        '</div>'+
        '<div class="mini-chat" aria-label="'+(es?'Ejemplo de una conversación':'Example of one conversation')+'">'+
          '<div class="bub c">'+(es?'Hola, quiero saber el precio.':'Hi, I’d like to know the price.')+'</div>'+
          '<div class="bub a">'+(es?'Claro, ¿qué producto te interesa?':'Sure, which product are you interested in?')+'</div>'+
          '<div class="bub c">'+(es?'El plan premium.':'The premium plan.')+'</div>'+
          '<div class="bub a">'+(es?'Te explico...':'Let me explain...')+'</div>'+
          '<div class="mini-chat-eq">'+(es?'= 1 conversación, no 4 mensajes':'= 1 conversation, not 4 messages')+'</div>'+
        '</div>'+
      '</div></section>';
  }

  function render(){
    var s = current; if(!s) return;
    elTitle.textContent = t(s.name);
    var v = s.variants[selIdx];

    var chips = s.variants.map(function(vr,i){
      var label = s.isAgents ? t(vr.chip) : t(vr.name);
      return '<button type="button" class="chip'+(i===selIdx?' on':'')+'" data-i="'+i+'" aria-pressed="'+(i===selIdx)+'">'+esc(label)+'</button>';
    }).join('');

    var cards = s.variants.map(function(vr,i){
      var on = i===selIdx;
      return '<article class="var-card'+(on?' on':'')+'" data-i="'+i+'" tabindex="0" role="button" aria-pressed="'+on+'">'+
        '<div class="var-top"><h3>'+esc(t(vr.name))+'</h3>'+
          (vr.custom ? '<span class="badge">'+esc(t(UI.custom))+'</span>' : '')+
          (on ? '<span class="sel">✓ '+esc(t(UI.selected))+'</span>' : '')+'</div>'+
        '<p class="var-tag">'+esc(t(vr.tag))+'</p>'+
        priceBlock(s, vr)+
        (vr.note ? '<p class="var-note">'+esc(t(vr.note))+'</p>' : '')+
        '<span class="inc-label">'+esc(t(UI.include))+'</span>'+
        '<ul class="feat">'+featuresHTML(vr)+'</ul>'+
        '<a class="btn-card" href="'+waLink(s,vr)+'" target="_blank" rel="noopener">'+esc(t(vr.custom ? UI.ctaCustom : UI.ctaCard))+' →</a>'+
      '</article>';
    }).join('');

    elBody.innerHTML =
      '<p class="m-intro">'+esc(t(s.intro))+'</p>'+
      '<div class="drives"><span>'+esc(t(UI.costDrives))+'</span> '+esc(t(s.drives))+'</div>'+
      (s.isAgents ? explainerHTML() : '')+
      '<div class="chips-wrap"><span class="chips-label">'+esc(t(s.isAgents ? UI.levelAgents : UI.level))+'</span><div class="chips" role="group">'+chips+'</div></div>'+
      '<h4 class="build-h">'+esc(t(UI.solutions))+'</h4>'+
      '<div class="var-grid">'+cards+'</div>'+
      '<div class="notes">'+
        (s.extraNote ? '<p>'+esc(t(s.extraNote))+'</p>' : '')+
        '<p>'+esc(t(NOTE_RANGE))+'</p>'+
        '<p>'+esc(t(NOTE_GENERAL))+'</p>'+
      '</div>';

    var barPrice = s.isAgents
      ? '<div class="bar-prices"><div><span>'+esc(t(UI.implementation))+'</span><b>'+rangeText(v.impl)+'</b></div>'+
        '<div><span>'+esc(t(UI.operation))+'</span><b>'+rangeText(v.monthly)+' '+esc(t(UI.perMonth))+'</b></div></div>'
      : '<div class="bar-prices"><div><span>'+esc(t(s.priceLabel==='implementation'?UI.implementation:UI.investment))+'</span><b>'+rangeText(v.impl)+' COP</b></div></div>';
    elBar.innerHTML =
      '<div class="bar-info"><span class="bar-ref">'+esc(t(UI.reference))+' · '+esc(t(v.name))+'</span>'+barPrice+
      '<span class="bar-exact">'+esc(t(UI.exact))+'</span></div>'+
      '<a class="btn-primary bar-cta" href="'+waLink(s,v)+'" target="_blank" rel="noopener">'+esc(t(UI.cta))+'</a>';

    elClose.setAttribute('aria-label', t(UI.close));
  }

  function open(id, trigger){
    if(!SERVICES[id]) return;
    current = SERVICES[id]; selIdx = 0; lastTrigger = trigger || null;
    var tpl = document.querySelector('[data-service="'+id+'"] .svc-icon');
    elIcon.innerHTML = tpl ? tpl.outerHTML : '';
    render();
    modal.hidden = false;
    document.body.classList.add('modal-open');
    elBody.scrollTop = 0;
    requestAnimationFrame(function(){ modal.classList.add('show'); elClose.focus(); });
    try{ history.replaceState(null,'','#'+id); }catch(e){}
  }

  function close(){
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    var done = function(){ modal.hidden = true; };
    setTimeout(done, 220);
    current = null;
    try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){}
    if(lastTrigger) lastTrigger.focus();
  }

  function select(i){
    selIdx = i; render();
  }

  /* ---------- events ---------- */
  document.querySelectorAll('[data-service]').forEach(function(card){
    card.addEventListener('click', function(){ open(card.getAttribute('data-service'), card); });
  });
  modal.addEventListener('click', function(e){
    if(e.target.closest('[data-close]') || e.target === elClose || e.target.closest('#m-close')){ close(); return; }
    if(e.target.closest('a')) return; // los CTA siguen su enlace
    var chip = e.target.closest('.chip');
    if(chip){ select(+chip.getAttribute('data-i')); return; }
    var card = e.target.closest('.var-card');
    if(card){ select(+card.getAttribute('data-i')); }
  });
  modal.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ close(); return; }
    if((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('var-card')){
      e.preventDefault(); select(+e.target.getAttribute('data-i'));
      var again = elBody.querySelector('.var-card.on'); if(again) again.focus();
    }
    if(e.key === 'Tab'){
      var f = modal.querySelectorAll('a[href],button,[tabindex="0"]');
      if(!f.length) return;
      var first = f[0], last = f[f.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  // Re-render al cambiar idioma (lang.js modifica <html lang>)
  new MutationObserver(function(){ if(current) render(); })
    .observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

  // Enlace directo: servicios.html#agentes
  var h = (location.hash||'').replace('#','');
  if(SERVICES[h]){ var trg = document.querySelector('[data-service="'+h+'"]'); open(h, trg); }
})();
