/* Lazy Company — catalogo de soluciones (FUENTE UNICA de precios y funcionalidades).
   Lo leen las paginas servicios/*.html via service-page.js. Rangos en COP.
   Para cambiar un precio o una funcionalidad, editar solo este archivo. */
(function(){
  var WA = '573014112090';
  function b(es,en){ return {es:es,en:en}; }
  // Rango: [min, max, plus]  |  Desde: [min, null, false, true]
  function R(min,max,plus){ return {min:min,max:max,plus:!!plus}; }
  function FROM(min){ return {min:min,from:true}; }

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
      priceLabel: 'investment',
      variants: [
        { name: b('Web Starter','Web Starter'), impl: R(4000000,5500000),
          tag: b('Para negocios que necesitan una presencia digital profesional y sencilla.','For businesses that need a simple, professional digital presence.'),
          features: [b('Landing page o sitio pequeño','Landing page or small site'), b('Diseño responsive','Responsive design'), b('Diseño personalizado, no plantilla','Custom design, not a template'), b('WhatsApp','WhatsApp'), b('Formularios','Forms'), b('Analytics','Analytics'), b('SEO técnico básico','Basic technical SEO'), b('Publicación','Publishing')] },
        { name: b('Web Profesional','Web Professional'), impl: R(5500000,7500000),
          tag: b('Para empresas que necesitan una página web corporativa más completa.','For companies that need a more complete corporate website.'),
          features: [b('Diseño UX/UI','UX/UI design'), b('Varias secciones/páginas','Multiple sections/pages'), b('Animaciones','Animations'), b('Formularios avanzados','Advanced forms'), b('WhatsApp','WhatsApp'), b('Analytics','Analytics'), b('SEO técnico','Technical SEO'), b('CMS','CMS'), b('Integraciones básicas','Basic integrations'), b('Optimización de conversión','Conversion optimization')] },
        { name: b('Web + Sistemas','Web + Systems'), impl: R(7500000,10000000),
          tag: b('Para empresas que necesitan que su web se conecte con otros sistemas.','For companies whose website needs to connect with other systems.'),
          features: [PREV, b('CRM','CRM'), b('Formularios conectados','Connected forms'), b('Automatizaciones','Automations'), b('APIs','APIs'), b('Agendamiento','Scheduling'), b('Captura y clasificación de leads','Lead capture and classification'), b('Integraciones externas','External integrations'), b('Dashboards o sistemas internos básicos','Dashboards or basic internal systems')] },
        { name: b('Web Inteligente','Smart Web'), impl: R(10000000,12000000,true),
          tag: b('Para empresas que quieren convertir su web en un sistema inteligente.','For companies that want to turn their website into an intelligent system.'),
          note: b('Proyectos que superan el alcance estándar se cotizan aparte.','Projects beyond the standard scope are quoted separately.'),
          features: [b('IA','AI'), b('Agente de IA','AI agent'), b('Base de conocimiento','Knowledge base'), b('Captura y calificación de leads','Lead capture and qualification'), b('CRM','CRM'), b('Automatizaciones','Automations'), b('Agendamiento','Scheduling'), b('Pagos','Payments'), b('APIs','APIs'), b('Sistemas personalizados','Custom systems'), b('Integraciones complejas','Complex integrations')] }
      ]
    },

    crm: {
      name: b('CRM','CRM'),
      priceLabel: 'implementation',
      extraNote: b('El software/licencia del CRM puede cobrarse aparte.','The CRM software/license may be charged separately.'),
      variants: [
        { name: b('CRM Base','CRM Base'), impl: R(1600000,2800000),
          tag: b('Para empresas que necesitan organizar clientes y oportunidades.','For companies that need to organize customers and opportunities.'),
          features: [b('Configuración','Setup'), b('Pipeline','Pipeline'), b('Campos personalizados','Custom fields'), b('Usuarios','Users'), b('Contactos','Contacts'), b('Etapas comerciales','Sales stages'), b('Formularios','Forms'), b('Automatizaciones básicas','Basic automations')] },
        { name: b('CRM Automatizado','Automated CRM'), impl: R(2800000,4800000),
          tag: b('Para empresas que quieren automatizar el seguimiento comercial.','For companies that want to automate sales follow-up.'),
          features: [PREV, b('Automatizaciones','Automations'), b('Lead routing','Lead routing'), b('Seguimiento automático','Automatic follow-up'), b('Notificaciones','Notifications'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Lead scoring','Lead scoring'), b('Dashboards','Dashboards'), b('Integraciones','Integrations')] },
        { name: b('CRM + IA','CRM + AI'), impl: R(4800000,8000000),
          tag: b('Para empresas que quieren incorporar IA a su operación comercial.','For companies that want to bring AI into their sales operation.'),
          features: [PREV, b('IA para clasificación de leads','AI lead classification'), b('IA para análisis de conversaciones','AI conversation analysis'), b('IA para resúmenes','AI summaries'), b('IA para seguimiento','AI follow-up'), b('IA para generación de respuestas','AI response generation'), b('Agentes conectados al CRM','Agents connected to the CRM'), b('Automatización avanzada','Advanced automation')] },
        { name: b('CRM a Medida / Enterprise','Custom / Enterprise CRM'), impl: R(8000000,16000000,true), custom: true,
          tag: b('Para empresas con procesos comerciales complejos.','For companies with complex sales processes.'),
          features: [b('Arquitectura personalizada','Custom architecture'), b('Múltiples pipelines','Multiple pipelines'), b('Múltiples equipos','Multiple teams'), b('APIs','APIs'), b('ERP','ERP'), b('Facturación','Invoicing'), b('WhatsApp','WhatsApp'), b('IA','AI'), b('Dashboards','Dashboards'), b('Automatizaciones complejas','Complex automations'), b('Sistemas internos','Internal systems')] }
      ]
    },

    agentes: {
      name: b('Agentes Automatizados','Automated Agents'),
      isAgents: true,
      extraNote: b('Los costos de Meta/WhatsApp, cuando apliquen, pueden cobrarse por separado según las tarifas vigentes de Meta.',
                   'Meta/WhatsApp costs, when applicable, may be charged separately according to Meta’s current rates.'),
      variants: [
        { name: b('Agente 1.000','Agent 1,000'), chip: b('1.000 conversaciones','1,000 conversations'), vol: '1.000',
          impl: R(2400000,3600000), monthly: R(550000,800000),
          tag: b('Hasta 1.000 conversaciones/mes','Up to 1,000 conversations/month'),
          features: [b('1 agente','1 agent'), b('WhatsApp o web','WhatsApp or web'), b('Base de conocimiento','Knowledge base'), b('Entrenamiento','Training'), b('Respuestas automáticas','Automatic replies'), b('Captura de leads','Lead capture'), b('Escalamiento a humano','Handoff to a human'), b('Monitoreo básico','Basic monitoring')] },
        { name: b('Agente 2.500','Agent 2,500'), chip: b('2.500 conversaciones','2,500 conversations'), vol: '2.500',
          impl: R(3200000,4400000), monthly: R(800000,1150000),
          tag: b('Hasta 2.500 conversaciones/mes','Up to 2,500 conversations/month'),
          features: [PREV, b('CRM','CRM'), b('Calificación de leads','Lead qualification'), b('Seguimiento','Follow-up'), b('Agendamiento','Scheduling'), b('Automatizaciones','Automations'), b('Integraciones básicas','Basic integrations')] },
        { name: b('Agente 5.000','Agent 5,000'), chip: b('5.000 conversaciones','5,000 conversations'), vol: '5.000',
          impl: R(4000000,6000000), monthly: R(1150000,1700000),
          tag: b('Hasta 5.000 conversaciones/mes','Up to 5,000 conversations/month'),
          features: [PREV, b('Múltiples flujos','Multiple flows'), b('CRM','CRM'), b('Agendamiento','Scheduling'), b('Seguimiento','Follow-up'), b('Integraciones API','API integrations'), b('Analítica','Analytics'), b('Escalamiento inteligente','Smart escalation'), b('Procesos comerciales','Sales processes')] },
        { name: b('Agente 7.500','Agent 7,500'), chip: b('7.500 conversaciones','7,500 conversations'), vol: '7.500',
          impl: R(5200000,7200000), monthly: R(1600000,2250000),
          tag: b('Hasta 7.500 conversaciones/mes','Up to 7,500 conversations/month'),
          features: [PREV, b('Mayor volumen','Higher volume'), b('Múltiples procesos','Multiple processes'), b('Integraciones avanzadas','Advanced integrations'), b('Múltiples agentes o áreas','Multiple agents or areas'), b('Analítica avanzada','Advanced analytics'), b('Automatizaciones complejas','Complex automations')] },
        { name: b('Agente 10.000','Agent 10,000'), chip: b('10.000 conversaciones','10,000 conversations'), vol: '10.000',
          impl: R(6400000,9600000,true), monthly: R(2050000,3150000,true),
          tag: b('Hasta 10.000 conversaciones/mes','Up to 10,000 conversations/month'),
          features: [b('Arquitectura avanzada','Advanced architecture'), b('Múltiples agentes','Multiple agents'), b('Múltiples canales','Multiple channels'), b('CRM','CRM'), b('APIs','APIs'), b('Sistemas internos','Internal systems'), b('Automatización avanzada','Advanced automation'), b('Analítica','Analytics'), b('Soporte prioritario','Priority support')] },
        { name: b('Agentes +10.000','Agents 10,000+'), chip: b('+10.000','10,000+'), custom: true,
          impl: FROM(9600000), monthly: FROM(3150000),
          tag: b('Solución a medida','Custom solution'),
          note: b('El precio final depende del volumen, canales, integraciones, complejidad y consumo de IA.','The final price depends on volume, channels, integrations, complexity and AI usage.'),
          features: [b('Volumen, canales e integraciones definidos contigo','Volume, channels and integrations defined with you'), b('Arquitectura y consumo de IA dimensionados a tu operación','Architecture and AI usage sized to your operation')] }
      ]
    },

    conversion: {
      name: b('Conversión de Ventas','Sales Conversion'),
      priceLabel: 'investment',
      variants: [
        { name: b('Conversión Básica','Basic Conversion'), impl: R(2600000,3750000),
          tag: b('Lo esencial para capturar y dar seguimiento a cada lead.','The essentials to capture and follow up on every lead.'),
          features: [b('Captura de leads','Lead capture'), b('CRM','CRM'), b('Pipeline','Pipeline'), b('Seguimiento','Follow-up'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Notificaciones','Notifications'), b('Automatizaciones básicas','Basic automations')] },
        { name: b('Conversión Automatizada','Automated Conversion'), impl: R(3750000,6000000),
          tag: b('Un funnel que trabaja solo, de la captura al agendamiento.','A funnel that runs on its own, from capture to scheduling.'),
          features: [PREV, b('Lead scoring','Lead scoring'), b('Seguimiento automático','Automatic follow-up'), b('Recuperación de leads','Lead recovery'), b('WhatsApp','WhatsApp'), b('Automatización del funnel','Funnel automation'), b('Agendamiento','Scheduling'), b('CRM','CRM'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: b('Conversión con IA','AI Conversion'), impl: R(6000000,9000000),
          tag: b('Un agente de ventas que califica, conversa y recupera oportunidades.','A sales agent that qualifies, converses and recovers opportunities.'),
          features: [b('Agente de ventas','Sales agent'), b('IA para calificación','AI qualification'), b('IA para conversaciones','AI conversations'), b('Seguimiento automático','Automatic follow-up'), b('Recuperación de oportunidades','Opportunity recovery'), b('CRM','CRM'), b('Agendamiento','Scheduling'), b('Pagos','Payments'), b('Personalización de conversaciones','Conversation personalization'), b('Analítica','Analytics')] },
        { name: b('Sistema Comercial Avanzado','Advanced Sales System'), impl: R(9000000,15000000,true), custom: true,
          tag: b('Para empresas con procesos comerciales complejos.','For companies with complex sales processes.'),
          features: [b('Múltiples agentes','Multiple agents'), b('CRM','CRM'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Pagos','Payments'), b('IA','AI'), b('APIs','APIs'), b('Automatización completa del funnel','Full funnel automation'), b('Dashboards','Dashboards'), b('Integraciones empresariales','Enterprise integrations')] }
      ]
    },

    agendamiento: {
      name: b('Agendamiento','Scheduling'),
      priceLabel: 'investment',
      variants: [
        { name: b('Agendamiento Simple','Simple Scheduling'), impl: R(1050000,1750000),
          tag: b('Para empezar a recibir citas sin cruces ni llamadas.','To start taking appointments without conflicts or calls.'),
          features: [b('Calendario','Calendar'), b('Formularios','Forms'), b('Confirmación','Confirmation'), b('Recordatorios','Reminders'), b('Email','Email'), b('WhatsApp','WhatsApp')] },
        { name: b('Agendamiento Automatizado','Automated Scheduling'), impl: R(1750000,2800000),
          tag: b('Gestión completa de la cita, sin intervención humana.','Full appointment management, no human intervention.'),
          features: [PREV, b('WhatsApp','WhatsApp'), b('Confirmaciones','Confirmations'), b('Cancelaciones','Cancellations'), b('Reprogramaciones','Rescheduling'), b('CRM','CRM'), b('Seguimiento','Follow-up'), b('Automatizaciones','Automations')] },
        { name: b('Agendamiento + IA','Scheduling + AI'), impl: R(2800000,4550000),
          tag: b('Un agente que conversa, entiende lo que necesita el cliente y agenda.','An agent that chats, understands what the customer needs and books.'),
          features: [b('Agente de IA','AI agent'), b('Conversación natural','Natural conversation'), b('Identificación de necesidades','Needs identification'), b('Consulta de disponibilidad','Availability lookup'), b('Agendamiento','Scheduling'), b('Reprogramación','Rescheduling'), b('CRM','CRM'), b('Seguimiento','Follow-up')] },
        { name: b('Agendamiento Complejo','Complex Scheduling'), impl: R(4550000,7000000,true), custom: true,
          tag: b('Para operaciones con varios profesionales, calendarios o sedes.','For operations with multiple professionals, calendars or locations.'),
          features: [b('Múltiples profesionales','Multiple professionals'), b('Múltiples calendarios','Multiple calendars'), b('Múltiples sedes','Multiple locations'), b('Reglas complejas','Complex rules'), b('Pagos','Payments'), b('IA','AI'), b('APIs','APIs'), b('CRM','CRM'), b('Integraciones personalizadas','Custom integrations')] }
      ]
    },

    procesos: {
      name: b('Procesos Internos','Internal Processes'),
      priceLabel: 'investment',
      variants: [
        { name: b('Automatización Simple','Simple Automation'), impl: R(2100000,3400000),
          tag: b('Para procesos pequeños.','For small processes.'),
          features: [b('Formularios','Forms'), b('Emails','Emails'), b('Notificaciones','Notifications'), b('Documentos','Documents'), b('Organización de información','Information organization'), b('Reportes simples','Simple reports')] },
        { name: b('Automatización de Procesos','Process Automation'), impl: R(3400000,6800000),
          tag: b('Para conectar varias herramientas.','To connect several tools.'),
          features: [b('CRM','CRM'), b('Bases de datos','Databases'), b('APIs','APIs'), b('WhatsApp','WhatsApp'), b('Email','Email'), b('Documentos','Documents'), b('Reportes','Reports'), b('Automatizaciones multietapa','Multi-stage automations')] },
        { name: b('Procesos con IA','AI Processes'), impl: R(6800000,12750000),
          tag: b('Para que la IA haga el trabajo repetitivo de tu equipo.','To let AI do your team’s repetitive work.'),
          features: [b('Agentes internos','Internal agents'), b('Procesamiento de documentos','Document processing'), b('Clasificación','Classification'), b('Extracción de información','Information extraction'), b('Análisis de datos','Data analysis'), b('Generación de reportes','Report generation'), b('IA conectada a sistemas','AI connected to systems'), b('Automatización avanzada','Advanced automation')] },
        { name: b('Sistema Empresarial a Medida','Custom Enterprise System'), impl: R(12750000,25500000,true), custom: true,
          tag: b('Para empresas con procesos complejos.','For companies with complex processes.'),
          features: [b('APIs','APIs'), b('Bases de datos','Databases'), b('IA','AI'), b('Dashboards','Dashboards'), b('Múltiples sistemas','Multiple systems'), b('ERP','ERP'), b('CRM','CRM'), b('Automatizaciones avanzadas','Advanced automations'), b('Arquitectura personalizada','Custom architecture')] }
      ]
    }
  };

  window.LazyCatalog = {WA:WA, PREV:PREV, NOTE_RANGE:NOTE_RANGE, NOTE_GENERAL:NOTE_GENERAL, SERVICES:SERVICES};
})();
