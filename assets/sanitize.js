/* Eingabe-Bereinigung – suite-weit */
(function(){
  // HTML-Sonderzeichen escapen (verhindert XSS in innerHTML)
  window.KISan = {
    html: function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;'); },
    // Eingabe kürzen + Whitespace bereinigen
    input: function(s, max){ return String(s||'').trim().substring(0, max||2000); },
    // Nur Buchstaben, Zahlen, übliche Sonderzeichen erlauben
    safe: function(s){ return String(s||'').replace(/[<>'"`;]/g,'').trim(); },
    // E-Mail-Format prüfen
    email: function(s){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s||'').trim()); },
  };

  // Alle Formulare: Enter-Spam verhindern + Eingabelängen begrenzen
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('input[type=text], input[type=email]').forEach(function(el){
      if (!el.maxLength || el.maxLength < 0) el.maxLength = 500;
    });
    document.querySelectorAll('textarea').forEach(function(el){
      if (!el.maxLength || el.maxLength < 0) el.maxLength = 5000;
    });
  });
})();
