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

  /* ---- chat de Sofia ---- */
  var input = document.getElementById('chat-input');
  if(!input) return;
  var WORKER_URL = 'https://lazy-agent.aeromarcos.workers.dev';
  var chatHistory = [], isChatOpen = false;
  window.toggleChat = function(){
    isChatOpen = !isChatOpen;
    document.getElementById('chat-box').classList.toggle('open', isChatOpen);
    if(isChatOpen) input.focus();
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
  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); window.sendMessage(); }
  });
  input.addEventListener('input', function(){
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });
})();
