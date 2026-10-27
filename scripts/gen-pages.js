/*
 * gen-pages.js — genera las 7 paginas de servicio (servicios/*.html) y servicios/index.html (redirect).
 *
 * ADVERTENCIA: SOBRESCRIBE servicios/*.html por completo. Cualquier cambio hecho a mano en esos
 * archivos se pierde al correrlo. Los cambios a las paginas de servicio se hacen AQUI (plantilla,
 * textos SEO, h1/lead, iconos) y luego se regenera.
 *
 * Cuando correrlo: al cambiar la plantilla comun (nav, footer, chat, <head>, versiones ?v=N de
 * css/js), los textos de cabecera de un servicio, o al agregar/quitar un servicio.
 * NO hace falta para cambiar precios, niveles o features: eso vive en servicios.js y lo pinta
 * service-page.js en el navegador.
 *
 * Uso (desde la raiz del repo):   node scripts/gen-pages.js
 * Probar sin tocar el repo:       node scripts/gen-pages.js <carpeta-de-salida>
 * Despues de correrlo: revisar `git diff servicios/` antes de hacer commit.
 */
const fs = require('fs'), path = require('path');
const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');
const SITE = 'https://lazycompanies.com';

const ICONS = {
  web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  crm: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="6" rx="1"/>',
  agentes: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V16h-.5A2.5 2.5 0 0 1 4 13.5z"/><path d="M7.5 10.2h2l1.5-3.2 2 6.4 1.5-3.2h2"/>',
  conversion: '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
  agendamiento: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
  apps: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10 5.5h4M10.5 18.5h3"/>',
  procesos: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.5 6H13a3 3 0 0 1 3 3v.5M8.5 18H13a3 3 0 0 0 3-3v-.5"/>'
};

const S = [
  { key:'web', num:'01',
    name:{es:'Web',en:'Web'},
    title:'Páginas web y sistemas web a la medida | Lazy Company',
    desc:'Páginas y sistemas web a la medida en Colombia: desde una web profesional hasta webs con IA, CRM y automatizaciones. Niveles de solución y rangos de inversión en COP.',
    ogdesc:'Webs a la medida, conectadas a CRM, agendamiento e IA. Explora niveles y rangos de inversión.',
    h1:{es:'Una web que <em>captura, responde y convierte</em>',en:'A website that <em>captures, responds and converts</em>'},
    lead:{es:'Sitios y sistemas web construidos a la medida. No vendemos plantillas: diseñamos y conectamos tu web con lo que tu negocio necesita para vender.',en:'Custom-built websites and web systems. We don’t sell templates: we design and connect your site to whatever your business needs to sell.'},
    drives:{es:'Tipo y complejidad del proyecto',en:'Project type and complexity'},
    sdesc:'Sitios y sistemas web a la medida, con diseño personalizado, CRM, automatizaciones, agendamiento e inteligencia artificial.' },
  { key:'crm', num:'02',
    name:{es:'CRM',en:'CRM'},
    title:'Implementación de CRM con automatización e IA | Lazy Company',
    desc:'Implementamos, personalizamos, automatizamos y conectamos tu CRM: pipeline, seguimiento automático, WhatsApp e IA. Niveles y rangos de inversión en COP.',
    ogdesc:'Implementación de CRM con automatizaciones, WhatsApp e IA. Explora niveles y rangos de inversión.',
    h1:{es:'Un CRM <em>implementado, automatizado y conectado</em>',en:'A CRM that is <em>implemented, automated and connected</em>'},
    lead:{es:'No somos un software CRM: implementamos, personalizamos, automatizamos y conectamos el CRM de tu operación comercial con el resto de tus herramientas.',en:'We’re not CRM software: we implement, customize, automate and connect the CRM behind your sales operation with the rest of your tools.'},
    drives:{es:'Nivel de implementación, automatización e IA',en:'Implementation level, automation and AI'},
    sdesc:'Implementación, personalización, automatización y conexión de CRM con WhatsApp, email, APIs e inteligencia artificial.' },
  { key:'agentes', num:'03',
    name:{es:'Agentes Automatizados',en:'Automated Agents'},
    title:'Agentes de IA para WhatsApp y web | Lazy Company',
    desc:'Agentes de IA que atienden, califican y agendan por WhatsApp, Instagram y web, 24/7. Tres planes (Esencial, Automatizado e Integrado) con implementación y operación mensual en COP.',
    ogdesc:'Agentes de IA para WhatsApp, Instagram y web. Tres planes con implementación y operación mensual.',
    h1:{es:'Agentes de IA que <em>atienden, califican y agendan</em>',en:'AI agents that <em>answer, qualify and schedule</em>'},
    lead:{es:'Agentes de IA entrenados con tu información que atienden, califican y agendan por WhatsApp o web, las 24 horas. Separamos siempre lo que pagas una vez (implementación) de lo que pagas cada mes (operación).',en:'AI agents trained on your information that answer, qualify and schedule via WhatsApp or web, 24/7. We always separate what you pay once (implementation) from what you pay monthly (operation).'},
    drives:{es:'Implementación + conversaciones mensuales',en:'Implementation + monthly conversations'},
    sdesc:'Agentes de inteligencia artificial para WhatsApp y web que atienden, califican leads y agendan, con implementación única y operación mensual.' },
  { key:'conversion', num:'04',
    name:{es:'Conversión de Ventas',en:'Sales Conversion'},
    title:'Sistemas de conversión de ventas con IA | Lazy Company',
    desc:'Sistemas que capturan, califican, siguen y convierten leads automáticamente: CRM, WhatsApp, agentes de IA y automatización del funnel. Rangos de inversión en COP.',
    ogdesc:'Capturamos, calificamos, seguimos y convertimos leads automáticamente. Explora niveles y rangos.',
    h1:{es:'Sistemas que <em>convierten leads</em> automáticamente',en:'Systems that <em>convert leads</em> automatically'},
    lead:{es:'Construimos sistemas que capturan, califican, siguen y convierten leads automáticamente.',en:'We build systems that capture, qualify, follow up and convert leads automatically.'},
    drives:{es:'Complejidad del funnel y de las automatizaciones',en:'Funnel and automation complexity'},
    sdesc:'Sistemas de captura, calificación, seguimiento y conversión automática de leads con CRM, WhatsApp, email e inteligencia artificial.' },
  { key:'agendamiento', num:'05',
    name:{es:'Agendamiento',en:'Scheduling'},
    title:'Sistemas de agendamiento automático con IA | Lazy Company',
    desc:'Citas que se agendan, confirman, recuerdan y reprograman solas, conectadas a tu CRM y WhatsApp, con agentes de IA opcionales. Rangos de inversión en COP.',
    ogdesc:'Citas que se agendan, confirman y reprograman solas. Explora niveles y rangos de inversión.',
    h1:{es:'Citas que se <em>agendan solas</em>',en:'Appointments that <em>book themselves</em>'},
    lead:{es:'Sistemas de citas que se agendan, confirman, recuerdan y reprograman solos, conectados a tu CRM y a tus canales.',en:'Appointment systems that book, confirm, remind and reschedule on their own, connected to your CRM and channels.'},
    drives:{es:'Complejidad del sistema y cantidad de integraciones',en:'System complexity and number of integrations'},
    sdesc:'Sistemas de agendamiento automático con confirmaciones, recordatorios y reprogramaciones, conectados a CRM, WhatsApp e inteligencia artificial.' },
  { key:'procesos', num:'06',
    name:{es:'Procesos Internos',en:'Internal Processes'},
    title:'Automatización de procesos internos con IA | Lazy Company',
    desc:'Automatizamos las tareas y procesos que hoy consumen horas de tu equipo: integraciones entre herramientas, APIs, documentos e IA. Rangos de inversión en COP.',
    ogdesc:'Automatizamos las tareas y procesos que hoy consumen horas de tu equipo. Explora niveles y rangos.',
    h1:{es:'Automatizamos lo que hoy <em>consume horas de tu equipo</em>',en:'We automate what today <em>consumes your team’s hours</em>'},
    lead:{es:'Automatizamos las tareas y procesos que hoy consumen horas de tu equipo.',en:'We automate the tasks and processes that today consume your team’s hours.'},
    drives:{es:'Complejidad del proceso y cantidad de sistemas conectados',en:'Process complexity and number of connected systems'},
    sdesc:'Automatización de procesos internos con integraciones entre herramientas, APIs, bases de datos, documentos e inteligencia artificial.' },
  { key:'apps', num:'07',
    name:{es:'Apps',en:'Apps'},
    title:'Desarrollo de apps: web app, PWA y app nativa iOS/Android | Lazy Company',
    desc:'Web apps, PWA y apps nativas para iOS y Android: tres tipos de aplicación con implementación y mantenimiento en COP. Elige el que tu negocio necesita.',
    ogdesc:'Web app simple, PWA o app nativa iOS/Android. Explora los tres tipos de aplicación y sus valores de referencia.',
    h1:{es:'Tu negocio en el <em>celular de tus clientes</em>',en:'Your business on <em>your customers’ phones</em>'},
    lead:{es:'Desde una web app simple hasta una app nativa en las tiendas: construimos el tipo de aplicación que tu negocio necesita para estar en el celular de tus clientes.',en:'From a simple web app to a native app in the stores: we build the type of application your business needs to be on your customers’ phones.'},
    drives:{es:'Tipo de aplicación y plataformas',en:'Application type and platforms'},
    sdesc:'Desarrollo de web apps, PWA y aplicaciones nativas para iOS y Android, con implementación y mantenimiento mensual.' }
];

const attr = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const bi = o => `data-es="${attr(o.es)}" data-en="${attr(o.en)}"`;

const EXPLAINER = `
<section class="wrap">
  <div class="explainer">
    <h2 data-es="¿Qué es una conversación?" data-en="What is a conversation?">¿Qué es una conversación?</h2>
    <div class="explainer-grid">
      <div>
        <p data-es="Una conversación es una interacción iniciada por un usuario con el agente dentro de una ventana de atención de 24 horas por canal. Mensajes consecutivos del mismo usuario dentro de esa ventana cuentan como una conversación, no como mensajes individuales." data-en="A conversation is an interaction started by a user with the agent within a 24-hour service window per channel. Consecutive messages from the same user within that window count as one conversation, not as individual messages.">Una conversación es una interacción iniciada por un usuario con el agente dentro de una ventana de atención de 24 horas por canal. Mensajes consecutivos del mismo usuario dentro de esa ventana cuentan como una conversación, no como mensajes individuales.</p>
        <p class="fine" data-es="Esta definición es comercial y puede diferir de las reglas de medición de WhatsApp/Meta u otros proveedores." data-en="This definition is commercial and may differ from the measurement rules of WhatsApp/Meta or other providers.">Esta definición es comercial y puede diferir de las reglas de medición de WhatsApp/Meta u otros proveedores.</p>
        <p class="fine" data-es="Al superar el cupo de conversaciones, se evalúa en conjunto una ampliación del plan antes de generar cargos adicionales." data-en="When the conversation quota is exceeded, a plan upgrade is assessed together with you before any additional charges are generated.">Al superar el cupo de conversaciones, se evalúa en conjunto una ampliación del plan antes de generar cargos adicionales.</p>
      </div>
      <div class="mini-chat" role="img" aria-label="Ejemplo de una conversación">
        <div class="bub c" data-es="Hola, quiero saber el precio." data-en="Hi, I’d like to know the price.">Hola, quiero saber el precio.</div>
        <div class="bub a" data-es="Claro, ¿qué producto te interesa?" data-en="Sure, which product are you interested in?">Claro, ¿qué producto te interesa?</div>
        <div class="bub c" data-es="El plan premium." data-en="The premium plan.">El plan premium.</div>
        <div class="bub a" data-es="Te explico..." data-en="Let me explain...">Te explico...</div>
        <div class="mini-chat-eq" data-es="= 1 conversación, no 4 mensajes" data-en="= 1 conversation, not 4 messages">= 1 conversación, no 4 mensajes</div>
      </div>
    </div>
  </div>
</section>
`;

const CALC = `
<section class="wrap calc" id="calcula-tu-plan">
  <div class="calc-head">
    <span class="label" style="text-align:left;" data-es="Herramienta" data-en="Tool">Herramienta</span>
    <h2 data-es="Calcula <em>tu plan</em>" data-en="Calculate <em>your plan</em>">Calcula <em>tu plan</em></h2>
    <p data-es="Elige el volumen de conversaciones y el modelo de IA para estimar tu implementación y tu mensualidad. Complementa los tres planes de arriba." data-en="Choose your conversation volume and AI model to estimate your implementation and monthly fee. It complements the three plans above.">Elige el volumen de conversaciones y el modelo de IA para estimar tu implementación y tu mensualidad. Complementa los tres planes de arriba.</p>
  </div>
  <div id="agent-calc"></div>
</section>
`;

const COMPARE = `
<section class="wrap compare" id="tipos-de-app">
  <div class="compare-head">
    <h2 data-es="¿Qué tipo de app <em>necesitas</em>?" data-en="What type of app <em>do you need</em>?">¿Qué tipo de app <em>necesitas</em>?</h2>
    <p data-es="Cada nivel corresponde a un tipo de aplicación distinto, no a un tamaño. Estas son sus diferencias." data-en="Each level is a different type of application, not a different size. Here is how they differ.">Cada nivel corresponde a un tipo de aplicación distinto, no a un tamaño. Estas son sus diferencias.</p>
  </div>
  <div class="compare-grid">
    <article class="cmp">
      <span class="cmp-tier" data-es="Esencial" data-en="Essential">Esencial</span>
      <h3 data-es="Web App Simple" data-en="Simple Web App">Web App Simple</h3>
      <dl>
        <dt data-es="Qué es" data-en="What it is">Qué es</dt><dd data-es="Un sitio optimizado para verse y sentirse como app en el celular: responsive, sin instalación ni funciones offline." data-en="A site optimized to look and feel like an app on mobile: responsive, with no installation and no offline features.">Un sitio optimizado para verse y sentirse como app en el celular: responsive, sin instalación ni funciones offline.</dd>
        <dt data-es="Para qué sirve" data-en="What it’s for">Para qué sirve</dt><dd data-es="Lanzar rápido una experiencia móvil: consultas, formularios y servicios sencillos para tus clientes." data-en="Launching a mobile experience quickly: lookups, forms and simple services for your customers.">Lanzar rápido una experiencia móvil: consultas, formularios y servicios sencillos para tus clientes.</dd>
        <dt data-es="Diferencia clave" data-en="Key difference">Diferencia clave</dt><dd class="key" data-es="La más económica y la más rápida de lanzar." data-en="The most affordable and the fastest to launch.">La más económica y la más rápida de lanzar.</dd>
      </dl>
    </article>
    <article class="cmp">
      <span class="cmp-tier" data-es="Automatizado · Recomendado" data-en="Automated · Recommended">Automatizado · Recomendado</span>
      <h3 data-es="PWA (Progressive Web App)" data-en="PWA (Progressive Web App)">PWA (Progressive Web App)</h3>
      <dl>
        <dt data-es="Qué es" data-en="What it is">Qué es</dt><dd data-es="Una aplicación web instalable desde el navegador: funciona offline y puede enviar notificaciones push, sin pasar por las tiendas de apps." data-en="A web application installable from the browser: it works offline and can send push notifications, without going through app stores.">Una aplicación web instalable desde el navegador: funciona offline y puede enviar notificaciones push, sin pasar por las tiendas de apps.</dd>
        <dt data-es="Para qué sirve" data-en="What it’s for">Para qué sirve</dt><dd data-es="Dar una experiencia tipo app, con ícono en el celular y avisos, sin el costo ni los tiempos de publicar en las tiendas." data-en="Delivering an app-like experience, with a phone icon and notifications, without the cost or lead time of publishing in the stores.">Dar una experiencia tipo app, con ícono en el celular y avisos, sin el costo ni los tiempos de publicar en las tiendas.</dd>
        <dt data-es="Diferencia clave" data-en="Key difference">Diferencia clave</dt><dd class="key" data-es="El balance entre alcance y funcionalidad." data-en="The balance between reach and functionality.">El balance entre alcance y funcionalidad.</dd>
      </dl>
    </article>
    <article class="cmp">
      <span class="cmp-tier" data-es="Integrado" data-en="Integrated">Integrado</span>
      <h3 data-es="App Nativa iOS/Android" data-en="Native iOS/Android App">App Nativa iOS/Android</h3>
      <dl>
        <dt data-es="Qué es" data-en="What it is">Qué es</dt><dd data-es="Una app real publicada en App Store y/o Google Play, con acceso a funciones nativas del dispositivo." data-en="A real app published on the App Store and/or Google Play, with access to native device features.">Una app real publicada en App Store y/o Google Play, con acceso a funciones nativas del dispositivo.</dd>
        <dt data-es="Para qué sirve" data-en="What it’s for">Para qué sirve</dt><dd data-es="Ofrecer la mejor experiencia posible y tener presencia en las tiendas oficiales." data-en="Offering the best possible experience and having a presence in the official stores.">Ofrecer la mejor experiencia posible y tener presencia en las tiendas oficiales.</dd>
        <dt data-es="Diferencia clave" data-en="Key difference">Diferencia clave</dt><dd class="key" data-es="Máximo rendimiento y presencia en tiendas, pero es la más costosa y la más lenta de aprobar." data-en="Maximum performance and store presence, but it is the most expensive and the slowest to get approved.">Máximo rendimiento y presencia en tiendas, pero es la más costosa y la más lenta de aprobar.</dd>
      </dl>
    </article>
  </div>
</section>
`;

function page(s){
  const url = `${SITE}/servicios/${s.key}.html`;
  const name = s.name.es;
  const ld = {
    '@context':'https://schema.org', '@type':'Service',
    name: `${name} · Lazy Company`, serviceType: name, description: s.sdesc, url,
    provider:{'@type':'Organization', name:'Lazy Company', url:SITE, logo:`${SITE}/logo.png`},
    areaServed:'CO'
  };
  const others = S.filter(o=>o.key!==s.key).map(o=>`<a href="${o.key}.html" ${bi(o.name)}>${o.name.es}</a>`).join('\n      ');
  const chipsLabel = s.key==='apps' ? {es:'Elige tu tipo de app',en:'Choose your app type'} : {es:'Elige tu nivel',en:'Choose your level'};
  const wa = 'https://wa.me/573014112090?text=Hola%2C%20quiero%20automatizar%20mi%20negocio';
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${s.title}</title>
<meta name="description" content="${attr(s.desc)}">
<meta name="robots" content="index, follow">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="../favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="../favicon-180.png">

<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${attr(s.title)}">
<meta property="og:description" content="${attr(s.ogdesc)}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Lazy Company">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(s.title)}">
<meta name="twitter:description" content="${attr(s.ogdesc)}">
<meta name="twitter:image" content="${SITE}/og-image.png">

<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&family=Space+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../service-page.css?v=6">
</head>
<body data-service="${s.key}">

<nav>
  <a class="logo" href="../index.html">Lazy<em>Company</em></a>
  <ul class="nav-links">
    <li><a href="../index.html" data-es="Inicio" data-en="Home">Inicio</a></li>
    <li><a class="active" href="../servicios.html" data-es="Servicios" data-en="Services">Servicios</a></li>
    <li><a href="../nosotros.html" data-es="Nosotros" data-en="About">Nosotros</a></li>
    <li><a class="nav-cta" href="${wa}" target="_blank" data-es="Hablar por WhatsApp" data-en="Talk on WhatsApp">Hablar por WhatsApp</a></li>
    <li><button id="lang-toggle" aria-label="Change language">EN</button></li>
  </ul>
  <button class="lang-toggle-m" aria-label="Change language">EN</button>
  <button class="nav-hamburger" id="hamburger" aria-label="Menu" onclick="toggleMobileMenu()"><span></span><span></span><span></span></button>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="../index.html" data-es="Inicio" data-en="Home">Inicio</a>
  <a href="../servicios.html" data-es="Servicios" data-en="Services">Servicios</a>
  <a href="../nosotros.html" data-es="Nosotros" data-en="About">Nosotros</a>
  <a class="m-cta" href="${wa}" target="_blank" data-es="Hablar por WhatsApp" data-en="Talk on WhatsApp">Hablar por WhatsApp</a>
</div>

<div class="wrap crumb">
  <a class="back" href="../servicios.html" data-es="← Volver a servicios" data-en="← Back to services">← Volver a servicios</a>
</div>

<header class="head">
  <svg class="svc-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[s.key]}</svg>
  <span class="label" data-es="Servicio" data-en="Service">Servicio</span>
  <h1 ${bi(s.h1)}>${s.h1.es}</h1>
  <p class="lead" ${bi(s.lead)}>${s.lead.es}</p>
  <div class="drives"><span data-es="Lo que define el precio" data-en="What drives the price">Lo que define el precio</span><em style="font-style:normal;" ${bi(s.drives)}>${s.drives.es}</em></div>
</header>
${s.key==='agentes' ? EXPLAINER : (s.key==='apps' ? COMPARE : '')}
<main class="wrap build">
  <span class="chips-label" ${bi(chipsLabel)}>${chipsLabel.es}</span>
  <div class="chips" id="chips" role="group"></div>
  <h2 class="build-h" data-es="¿Qué podemos construir?" data-en="What can we build?">¿Qué podemos construir?</h2>
  <div class="var-grid" id="var-grid"></div>
  <noscript><p class="notes" style="border:0;">Activa JavaScript para ver los niveles y rangos, o <a href="${wa}" style="text-decoration:underline;">escríbenos por WhatsApp</a>.</p></noscript>
  <div class="notes" id="notes"></div>
</main>

${s.key==='agentes' ? CALC : ''}
<section class="wrap others">
  <h2 data-es="Otros servicios" data-en="Other services">Otros servicios</h2>
  <div class="others-list">
      ${others}
  </div>
</section>

<footer>
  <div class="logo">Lazy<em>Company</em></div>
  <div class="footer-links">
    <a href="../index.html" data-es="Inicio" data-en="Home">Inicio</a>
    <a href="../servicios.html" data-es="Servicios" data-en="Services">Servicios</a>
    <a href="../nosotros.html" data-es="Nosotros" data-en="About">Nosotros</a>
    <a href="https://wa.me/573014112090" target="_blank" data-es="Contacto" data-en="Contact">Contacto</a>
  </div>
  <p class="footer-bottom" data-es="© 2026 Lazy Company · Trabaja menos. Vende más. Vive mejor." data-en="© 2026 Lazy Company · Work less. Sell more. Live better.">© 2026 Lazy Company · Trabaja menos. Vende más. Vive mejor.</p>
  <p class="footer-bottom" style="margin-top:6px;"><a href="../privacidad.html" style="color:var(--ink-mid); text-decoration:underline;" data-es="Política de privacidad" data-en="Privacy policy">Política de privacidad</a></p>
</footer>

<div class="quote-bar" id="quote-bar" aria-live="polite"></div>

<div id="chat-widget">
  <div id="chat-box">
    <div id="chat-header">
      <div class="chat-avatar">S</div>
      <div class="chat-header-info">
        <span class="chat-name">Sofía</span>
        <span class="chat-status"><span class="status-dot"></span><span data-es="En línea · Lazy Company" data-en="Online · Lazy Company">En línea · Lazy Company</span></span>
      </div>
      <button id="chat-close" onclick="toggleChat()" aria-label="Cerrar chat">×</button>
    </div>
    <div id="chat-messages">
      <div class="msg sofia" data-es="¡Hola! Soy Sofía, asesora de Lazy Company. ¿En qué te puedo ayudar hoy?" data-en="Hi! I'm Sofía, Lazy Company's advisor. How can I help you today?">¡Hola! Soy Sofía, asesora de Lazy Company. ¿En qué te puedo ayudar hoy?</div>
    </div>
    <div id="chat-input-area">
      <textarea id="chat-input" placeholder="Escribe tu pregunta..." rows="1"></textarea>
      <button id="chat-send" onclick="sendMessage()" aria-label="Enviar"><svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></button>
    </div>
  </div>
  <button id="chat-toggle" onclick="toggleChat()" aria-label="Chat"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></button>
</div>

<script src="../lang.js?v=2"></script>
<script src="../servicios.js?v=7"></script>
<script src="../service-page.js?v=5"></script>
${s.key==='agentes' ? '<script src="../agent-calculator.js?v=3"></script>' : ''}
</body>
</html>
`;
}

fs.mkdirSync(path.join(ROOT,'servicios'),{recursive:true});
for(const s of S){ fs.writeFileSync(path.join(ROOT,'servicios',s.key+'.html'), page(s)); }

// /servicios/ -> servicios.html
fs.writeFileSync(path.join(ROOT,'servicios','index.html'),
`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><title>Servicios | Lazy Company</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/servicios.html">
<meta http-equiv="refresh" content="0; url=../servicios.html"></head>
<body><a href="../servicios.html">Servicios</a><script>location.replace('../servicios.html');</script></body></html>
`);
console.log('ok', S.length);
