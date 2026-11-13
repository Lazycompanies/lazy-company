/* Lazy Company — comportamiento compartido: menu movil y chat de Sofia (todas las paginas con nav/chat).
   Al cambiar este archivo, subir ?v=N en todos los HTML (y en scripts/gen-pages.js). */
(function(){
  /* ---- menu movil ---- */
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('hamburger');
  function setMenu(open){
    if(!menu || !burger) return;
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  window.toggleMobileMenu = function(){ setMenu(!(menu && menu.classList.contains('open'))); };
  if(menu) menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });

  /* ---- chat de Sofia ----
     El cerebro vive en un Cloudflare Worker (codigo en scripts/sofia-worker.js, se pega a mano en Cloudflare).
     Se le envia el idioma del sitio y la pagina actual para que responda en ES/EN con contexto. */
  var input = document.getElementById('chat-input');
  if(!input) return;
  var WORKER_URL = 'https://lazy-agent.aeromarcos.workers.dev';
  var WA_URL = 'https://wa.me/573014112090';
  var chatHistory = [], isChatOpen = false, busy = false;
  var T = {
    es: { ph:'Escribe tu pregunta...', typing:'Sofía está escribiendo...', send:'Enviar', close:'Cerrar chat',
          err:'No pude conectarme ahora mismo. Escríbenos por WhatsApp: ' + WA_URL },
    en: { ph:'Type your question...', typing:'Sofía is typing...', send:'Send', close:'Close chat',
          err:"I couldn't connect right now. Message us on WhatsApp: " + WA_URL }
  };
  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'es'; }
  function applyChatLang(){
    var t = T[lang()];
    input.placeholder = t.ph;
    var send = document.getElementById('chat-send'), close = document.getElementById('chat-close');
    if(send) send.setAttribute('aria-label', t.send);
    if(close) close.setAttribute('aria-label', t.close);
  }
  applyChatLang();
  // lang.js cambia <html lang>; se sigue ese cambio para traducir los textos del chat
  new MutationObserver(applyChatLang).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  window.toggleChat = function(){
    isChatOpen = !isChatOpen;
    document.getElementById('chat-box').classList.toggle('open', isChatOpen);
    if(isChatOpen) input.focus();
  };
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  // Texto seguro: se escapa todo y luego se convierten **negrita** y URLs https en enlaces.
  function format(text){
    var h = esc(text);
    h = h.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/https?:\/\/[^\s<]+/g, function(url){
      var tail = '';
      while(/[.,;:!?)\]]$/.test(url)){ tail = url.slice(-1) + tail; url = url.slice(0, -1); }
      var label = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      if(/^wa\.me\//.test(label)) label = 'WhatsApp';
      return '<a href="' + url + '" target="_blank" rel="noopener">' + label + '</a>' + tail;
    });
    return h.replace(/\n/g, '<br>');
  }
  function appendMessage(text, type){
    var msgs = document.getElementById('chat-messages');
    var div = document.createElement('div');
    div.className = 'msg ' + type;
    div.innerHTML = type === 'user' ? esc(text).replace(/\n/g,'<br>') : format(text);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }
  window.sendMessage = async function(){
    var text = input.value.trim();
    if(!text || busy) return;
    busy = true;
    input.value = ''; input.style.height = 'auto';
    appendMessage(text, 'user');
    chatHistory.push({ role:'user', content:text });
    var l = lang();
    var typing = appendMessage(T[l].typing, 'typing');
    try{
      var res = await fetch(WORKER_URL, { method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ messages: chatHistory.slice(-20), lang: l, page: location.pathname }) });
      var data = await res.json();
      typing.remove();
      if(data.reply){
        appendMessage(data.reply, 'sofia');
        chatHistory.push({ role:'assistant', content:data.reply });
      } else {
        appendMessage(T[l].err, 'sofia');
        chatHistory.pop();   // la pregunta sin respuesta no se reenvia en el historial
      }
    }catch(err){
      typing.remove();
      appendMessage(T[l].err, 'sofia');
      chatHistory.pop();
    }
    busy = false;
  };
  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); window.sendMessage(); }
  });
  input.addEventListener('input', function(){
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });
})();
