(function(){
  var STORAGE_KEY = 'lazy_lang';

  function applyLang(lang){
    document.querySelectorAll('[data-en]').forEach(function(el){
      var text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
      if(text !== null) el.innerHTML = text;
    });
    document.documentElement.lang = lang;
    var btn = document.getElementById('lang-toggle');
    if(btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }

  function initLang(){
    var saved = 'es';
    try{ saved = localStorage.getItem(STORAGE_KEY) || 'es'; }catch(e){}
    applyLang(saved);
    var btn = document.getElementById('lang-toggle');
    if(btn){
      btn.addEventListener('click', function(){
        var current = document.documentElement.lang === 'en' ? 'en' : 'es';
        applyLang(current === 'en' ? 'es' : 'en');
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();
