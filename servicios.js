/* Lazy Company — catalogo de soluciones (FUENTE UNICA de precios, funcionalidades y tasa USD).
   Lo leen las paginas servicios/*.html via service-page.js. Valores en COP.
   Para cambiar un precio o una funcionalidad, editar solo este archivo.

   Modelo: 3 niveles identicos en los 6 servicios -> Esencial, Automatizado (Recomendado), Integrado.
   Formas de precio:  R(min,max[,true]) rango  |  EX(n) valor fijo  |  FROM(n) "desde".
   Por nivel: impl (pago unico), monthly (mensualidad, opcional), maint (mantenimiento opcional, solo Web).

   ⚠ VERSIONADO ANTI-CACHE: cada vez que cambien los precios o la tasa USD_COP_RATE,
   subir el numero de version (?v=N) en TODOS los HTML que cargan este archivo, para que
   el navegador no sirva una copia en cache con precios viejos:
     <script src="../servicios.js?v=N"></script>
   HTML que lo referencian hoy (buscar con: grep -rn "servicios.js?v=" .):
     servicios/web.html, crm.html, agentes.html, conversion.html, agendamiento.html, procesos.html
   (index.html y servicios.html no cargan este archivo.)
   Si tambien cambian service-page.js o service-page.css, subir su ?v= en esos mismos HTML.
   Version actual de servicios.js: 2 */
(function(){
  var WA = '573014112090';
  function b(es,en){ return {es:es,en:en}; }
  function R(min,max,plus){ return {min:min,max:max,plus:!!plus}; }   // rango
  function EX(n){ return {min:n,exact:true}; }                         // valor fijo
  function FROM(min){ return {min:min,from:true}; }                    // "Desde"

  // ==== TASA DE CAMBIO (unico lugar para actualizarla) ====
  // COP por 1 USD. TRM oficial 7-oct-2026: 3.216,01 + ~1 % de margen.
  // Solo se usa para mostrar precios aproximados en USD cuando el sitio esta en ingles.
  var USD_COP_RATE = 3250;
  // Convierte COP -> USD redondeado al multiplo de $10 mas cercano
  function toUSD(cop){ return Math.round(cop / USD_COP_RATE / 10) * 10; }

  var NOTE_GENERAL = b(
    'Los costos de plataformas externas, licencias, infraestructura o servicios de terceros pueden cobrarse por separado.',
    'Costs of external platforms, licenses, infrastructure or third-party services may be charged separately.');
  var NOTE_RANGE = b(
    'Los valores son una referencia inicial. El precio final depende del alcance, integraciones, volumen, complejidad y funcionalidades requeridas.',
    'Values are an initial reference. The final price depends on scope, integrations, volume, complexity and required features.');

  var PREV = 'PREV'; // marcador "Todo lo del nivel anterior"
  var T_ESE = b('Esencial','Essential'), T_AUT = b('Automatizado','Automated'), T_INT = b('Integrado','Integrated');

  var SERVICES = {

    web: {
      name: b('Web','Web'),
      monthlyLabel: b('Mensualidad','Monthly fee'),
      extraNote: b('El mantenimiento mensual es opcional y no forma parte del nivel.','Monthly maintenance is optional and is not part of the level.'),
      variants: [
        { name: T_ESE, impl: R(1500000,2500000), maint: R(100000,200000),
          tag: b('Para negocios que necesitan una presencia digital profesional y sencilla.','For businesses that need a simple, professional digital presence.'),
          features: [b('Landing page o sitio pequeño','Landing page or small site'), b('Diseño responsive','Responsive design'), b('Diseño personalizado, no plantilla','Custom design, not a template'), b('WhatsApp','WhatsApp'), b('Formularios','Forms'), b('Analytics','Analytics'), b('SEO técnico básico','Basic technical SEO'), b('Publicación','Publishing')] },
        { name: T_AUT, rec: true, impl: R(3000000,5500000), maint: R(250000,450000),
          tag: b('Para empresas que necesitan una web completa que capture y organice sus leads.','For companies that need a complete website that captures and organizes leads.'),
          features: [PREV, b('Diseño UX/UI','UX/UI design'), b('Varias secciones/páginas','Multiple sections/pages'), b('Animaciones','Animations'), b('CMS','CMS'), b('Formularios avanzados y conectados','Advanced, connected forms'), b('Automatizaciones','Automations'), b('Captura y clasificación de leads','Lead capture and classification'), b('Integraciones básicas','Basic integrations'), b('Optimización de conversión','Conversion optimization')] },
        { name: T_INT, impl: FROM(6000000), maint: FROM(500000),
          tag: b('Para empresas que quieren que su web sea un sistema inteligente y conectado.','For companies that want their website to be an intelligent, connected system.'),
          features: [PREV, b('CRM','CRM'), b('APIs e integraciones externas','APIs and external integrations'), b('Agendamiento','Scheduling'), b('Dashboards o sistemas internos','Dashboards or internal systems'), b('Agente de IA con base de conocimiento','AI agent with knowledge base'), b('Pagos','Payments'), b('Sistemas personalizados','Custom systems'), b('Integraciones complejas','Complex integrations')] }
      ]
    },

    crm: {
      name: b('CRM','CRM'),
      monthlyLabel: b('Mensualidad','Monthly fee'),
      extraNote: b('El software/licencia del CRM puede cobrarse aparte.','The CRM software/license may be charged separately.'),
      variants: [
        { name: T_ESE, impl: EX(1200000), monthly: R(0,200000),
          tag: b('Para empresas que necesitan organizar clientes y oportunidades.','For companies that need to organize customers and opportunities.'),
          features: [b('Configuración','Setup'), b('Pipeline','Pipeline'), b('Campos personalizados','Custom fields'), b('Usuarios','Users'), b('Contactos','Contacts'), b('Etapas comerciales','Sales stages'), b('Formularios','Forms'), b('Automatizaciones básicas','Basic automations')] },
        { name: T_AUT, rec: true, impl: EX(2500000), monthly: R(250000,500000),
          tag: b('Para empresas que quieren automatizar el seguimiento comercial.','For companies that want to automate sales follow-up.'),
          features: [PREV, b('Lead routing','Lead routing'), b('Seguimiento automático','Automatic follow-up'), b('Notificaciones','Notifications'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Lead scoring','Lead scoring'), b('Dashboards','Dashboards'), b('Integraciones','Integrations')] },
        { name: T_INT, impl: FROM(4500000), monthly: FROM(500000),
          tag: b('Para empresas con procesos comerciales complejos que quieren incorporar IA.','For companies with complex sales processes that want to bring in AI.'),
          features: [PREV, b('IA para clasificación de leads','AI lead classification'), b('IA para análisis de conversaciones y resúmenes','AI conversation analysis and summaries'), b('IA para seguimiento y generación de respuestas','AI follow-up and response generation'), b('Agentes conectados al CRM','Agents connected to the CRM'), b('Múltiples pipelines y equipos','Multiple pipelines and teams'), b('APIs, ERP y facturación','APIs, ERP and invoicing'), b('Arquitectura personalizada','Custom architecture')] }
      ]
    },

    agentes: {
      name: b('Agentes Automatizados','Automated Agents'),
      isAgents: true,
      monthlyLabel: b('Operación mensual','Monthly operation'),
      extraNote: b('Los costos de Meta/WhatsApp, cuando apliquen, pueden cobrarse por separado según las tarifas vigentes de Meta.',
                   'Meta/WhatsApp costs, when applicable, may be charged separately according to Meta’s current rates.'),
      variants: [
        { name: T_ESE, impl: EX(1200000), monthly: EX(200000),
          tag: b('Incluye 300 conversaciones al mes.','Includes 300 conversations per month.'),
          features: [b('300 conversaciones/mes','300 conversations/month'), b('1 canal (WhatsApp o Instagram, a elegir)','1 channel (WhatsApp or Instagram, your choice)'), b('Hasta 10 preguntas frecuentes configuradas','Up to 10 configured FAQs'), b('1 idioma','1 language'), b('Pruebas funcionales','Functional testing'), b('1 sesión de capacitación','1 training session')],
          excl: [b('Integraciones con CRM u otros sistemas','Integrations with a CRM or other systems'), b('Captura y clasificación de prospectos','Lead capture and classification'), b('Flujos automatizados','Automated flows'), b('Canales adicionales','Additional channels'), b('Reporte mensual','Monthly report')] },
        { name: T_AUT, rec: true, impl: EX(2800000), monthly: EX(500000),
          tag: b('Incluye 1.000 conversaciones al mes.','Includes 1,000 conversations per month.'),
          features: [b('1.000 conversaciones/mes','1,000 conversations/month'), b('2 canales (WhatsApp + Instagram)','2 channels (WhatsApp + Instagram)'), b('Hasta 30 preguntas/intenciones','Up to 30 questions/intents'), b('Captura y clasificación de prospectos','Lead capture and classification'), b('Hasta 3 flujos automatizados','Up to 3 automated flows'), b('1 integración sencilla (CRM u hoja de cálculo)','1 simple integration (CRM or spreadsheet)'), b('Reporte mensual básico','Basic monthly report')],
          excl: [b('Chat web como canal','Web chat as a channel'), b('Más de 3 flujos o flujos personalizados','More than 3 flows or custom flows'), b('Más de 1 integración','More than 1 integration'), b('Reglas avanzadas de clasificación y derivación','Advanced classification and routing rules'), b('Prioridad de soporte','Priority support')] },
        { name: T_INT, impl: FROM(4800000), monthly: FROM(800000),
          tag: b('Incluye 3.000 conversaciones al mes.','Includes 3,000 conversations per month.'),
          features: [b('3.000 conversaciones/mes','3,000 conversations/month'), b('Hasta 3 canales (WhatsApp + Instagram + chat web)','Up to 3 channels (WhatsApp + Instagram + web chat)'), b('Flujos personalizados (hasta 6)','Custom flows (up to 6)'), b('Hasta 3 integraciones compatibles','Up to 3 compatible integrations'), b('Reglas de clasificación y derivación','Classification and routing rules'), b('Revisión mensual y prioridad de soporte','Monthly review and priority support')],
          excl: [b('Canales adicionales a los 3 incluidos','Channels beyond the 3 included'), b('Integraciones por encima de las 3 incluidas','Integrations beyond the 3 included'), b('Conversaciones por encima del cupo (se evalúa una ampliación del plan)','Conversations above the quota (a plan upgrade is assessed)'), b('Costos de plataformas de terceros (Meta/WhatsApp, cuando apliquen)','Third-party platform costs (Meta/WhatsApp, when applicable)')] }
      ]
    },

    conversion: {
      name: b('Conversión de Ventas','Sales Conversion'),
      monthlyLabel: b('Mensualidad','Monthly fee'),
      variants: [
        { name: T_ESE, impl: R(1200000,2000000),
          tag: b('Lo esencial para capturar y dar seguimiento a cada lead.','The essentials to capture and follow up on every lead.'),
          features: [b('Captura de leads','Lead capture'), b('CRM','CRM'), b('Pipeline','Pipeline'), b('Seguimiento','Follow-up'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Notificaciones','Notifications'), b('Automatizaciones básicas','Basic automations')] },
        { name: T_AUT, rec: true, impl: R(2500000,4500000),
          tag: b('Un funnel que trabaja solo, de la captura al agendamiento.','A funnel that runs on its own, from capture to scheduling.'),
          features: [PREV, b('Lead scoring','Lead scoring'), b('Seguimiento automático','Automatic follow-up'), b('Recuperación de leads','Lead recovery'), b('Automatización del funnel','Funnel automation'), b('Agendamiento','Scheduling'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: T_INT, impl: FROM(5000000),
          tag: b('Un sistema comercial con IA para procesos complejos.','An AI-powered sales system for complex processes.'),
          features: [PREV, b('Agente de ventas con IA','AI sales agent'), b('IA para calificación y conversaciones','AI qualification and conversations'), b('Recuperación de oportunidades','Opportunity recovery'), b('Pagos','Payments'), b('Personalización de conversaciones','Conversation personalization'), b('Analítica y dashboards','Analytics and dashboards'), b('APIs e integraciones empresariales','APIs and enterprise integrations'), b('Múltiples agentes','Multiple agents')] }
      ]
    },

    agendamiento: {
      name: b('Agendamiento','Scheduling'),
      monthlyLabel: b('Mensualidad','Monthly fee'),
      variants: [
        { name: T_ESE, impl: R(700000,1300000), monthly: R(0,150000), monthlyOptional: true,
          tag: b('Para empezar a recibir citas sin cruces ni llamadas.','To start taking appointments without conflicts or calls.'),
          features: [b('Calendario','Calendar'), b('Formularios','Forms'), b('Confirmación','Confirmation'), b('Recordatorios','Reminders'), b('Email','Email'), b('WhatsApp','WhatsApp')] },
        { name: T_AUT, rec: true, impl: R(1500000,2800000), monthly: R(150000,350000),
          tag: b('Gestión completa de la cita, sin intervención humana.','Full appointment management, no human intervention.'),
          features: [PREV, b('Cancelaciones','Cancellations'), b('Reprogramaciones','Rescheduling'), b('CRM','CRM'), b('Seguimiento','Follow-up'), b('Automatizaciones','Automations')] },
        { name: T_INT, impl: FROM(3000000), monthly: FROM(350000),
          tag: b('Un agente que agenda y soporta varios profesionales, calendarios o sedes.','An agent that books and supports multiple professionals, calendars or locations.'),
          features: [PREV, b('Agente de IA con conversación natural','AI agent with natural conversation'), b('Identificación de necesidades y consulta de disponibilidad','Needs identification and availability lookup'), b('Múltiples profesionales, calendarios y sedes','Multiple professionals, calendars and locations'), b('Reglas complejas','Complex rules'), b('Pagos','Payments'), b('APIs e integraciones personalizadas','APIs and custom integrations')] }
      ]
    },

    procesos: {
      name: b('Procesos Internos','Internal Processes'),
      monthlyLabel: b('Mensualidad','Monthly fee'),
      variants: [
        { name: T_ESE, impl: R(900000,1800000),
          tag: b('Para procesos pequeños.','For small processes.'),
          features: [b('Formularios','Forms'), b('Emails','Emails'), b('Notificaciones','Notifications'), b('Documentos','Documents'), b('Organización de información','Information organization'), b('Reportes simples','Simple reports')] },
        { name: T_AUT, rec: true, impl: R(2000000,4000000),
          tag: b('Para conectar varias herramientas.','To connect several tools.'),
          features: [b('CRM','CRM'), b('Bases de datos','Databases'), b('APIs','APIs'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Documentos','Documents'), b('Reportes','Reports'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: T_INT, impl: FROM(4500000),
          tag: b('Para que la IA y tus sistemas trabajen juntos en procesos complejos.','To let AI and your systems work together on complex processes.'),
          features: [b('Agentes internos','Internal agents'), b('Procesamiento de documentos','Document processing'), b('Clasificación y extracción de información','Classification and information extraction'), b('Análisis de datos y generación de reportes','Data analysis and report generation'), b('IA conectada a sistemas','AI connected to systems'), b('ERP y múltiples sistemas','ERP and multiple systems'), b('Dashboards','Dashboards'), b('Arquitectura personalizada','Custom architecture')] }
      ]
    }
  };

  window.LazyCatalog = {USD_COP_RATE:USD_COP_RATE, toUSD:toUSD, WA:WA, PREV:PREV, NOTE_RANGE:NOTE_RANGE, NOTE_GENERAL:NOTE_GENERAL, SERVICES:SERVICES};
})();
