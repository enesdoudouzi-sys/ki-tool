# Security-Audit – KI-Suite

**Repository:** `enesdoudouzi-sys/ki-tool`  
**Audit-Typ:** statische Erstprüfung des GitHub-Repositories  
**Stand:** 2026-11-04  
**Branch:** `hardening/phase-1-security-audit`

## Umfang und Grenzen

Geprüft wurden die im Repository vorhandenen HTML-, JavaScript- und PWA-Dateien sowie die dokumentierte Architektur. Es wurde kein dynamischer Penetrationstest durchgeführt. Der externe Cloudflare Worker (`ki-proxy.enesdoudouzi.workers.dev`) und seine Konfiguration liegen nicht in diesem Repository und konnten nicht geprüft werden.

## Befunde

### Hoch – Sicherheitsrichtlinien als Meta-Tags sind kein Ersatz für HTTP-Header

Die Seiten setzen unter anderem `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy` und eine CSP über `http-equiv`. Mehrere dieser Richtlinien werden über HTML-Meta-Tags nicht wirksam unterstützt. Insbesondere `frame-ancestors` kann nicht über eine CSP-Meta-Deklaration erzwungen werden.

**Maßnahme:** Für wirksame Header muss das Hosting/CDN HTTP-Header ausliefern. GitHub Pages bietet keine frei konfigurierbaren Response-Header. Vor einer Migration muss die Zielplattform festgelegt werden. Bis dahin Meta-CSP nur als zusätzliche Defense-in-Depth behandeln, nicht als Header-Schutz ausweisen.

### Hoch – API-Proxy ist außerhalb dieses Repositories

Der Browser spricht den Worker direkt an. Die Sicherheit hängt daher wesentlich von Worker-seitiger Authentifizierung, Rate-Limits, Input-Limits, CORS-Allowlist, Fehlerbehandlung und Secret-Verwaltung ab.

**Maßnahme:** Worker-Code und Konfiguration separat auditieren. Keine Provider-API-Schlüssel im Frontend oder in Git committen. Rate-Limits und Kostenlimits serverseitig erzwingen.

### Mittel – XSS-Risiko muss pro DOM-Senke geprüft werden

Ein globales Escape-/Sanitizer-Hilfsobjekt schützt nicht automatisch jede Verwendung von `innerHTML`. Jede dynamische DOM-Ausgabe muss kontextgerecht escaped oder vorzugsweise mit `textContent` und DOM-APIs aufgebaut werden. HTML aus KI-Antworten darf nicht ungeprüft gerendert werden.

**Maßnahme:** Alle dynamischen HTML-Senken und Datenflüsse einzeln prüfen; Sanitizer nicht als universelle Lösung behandeln.

### Mittel – CSP muss die tatsächlichen KI-Ladepfade abbilden

Die Suite nutzt externe Bibliotheken und laut README Transformers.js/Hugging Face. Eine zu enge `connect-src`-/`script-src`-Policy kann Modell-Downloads blockieren; eine zu breite Policy schwächt den Schutz.

**Maßnahme:** CSP anhand der tatsächlich benötigten Origins pro Seite testen und so restriktiv wie möglich halten. Keine pauschale Freigabe von `*`.

### Mittel – Datenschutz und Speicherung

Browser-Speicher, Chat-Verläufe, Eingaben und Protokolle müssen auf personenbezogene oder vertrauliche Inhalte geprüft werden. Für die spätere SaaS-Phase sind Aufbewahrungsfristen, Löschung, Export, Einwilligung/Informationspflichten und Mandantentrennung festzulegen.

## Bereits vorhandene Schutzmaßnahmen

- Gemeinsame Eingabe-Hilfsfunktionen in `assets/sanitize.js`.
- Eingabelängen werden für Textfelder und Textareas begrenzt.
- API-Aufruf läuft über einen separaten Worker statt eines sichtbaren Provider-Schlüssels im Frontend (laut Code/README).
- Security-Header-/CSP-Meta-Deklarationen wurden ergänzt; deren Grenzen sind oben dokumentiert.

## Priorisierte nächste Schritte

1. Worker-Repository/-Code bereitstellen und serverseitige Kontrollen auditieren.
2. Dynamische DOM-Senken und KI-Ausgaben auf allen Modulseiten systematisch prüfen.
3. Hosting-Entscheidung für echte HTTP-Sicherheitsheader treffen (z. B. CDN/Edge vor GitHub Pages oder Migration).
4. CSP mit Browser-Reports/Tests pro Modul enger konfigurieren.
5. Vor Login und Datenbank: Bedrohungsmodell, Datenklassifizierung und Löschkonzept erstellen.

## Abgrenzung

Dieser Bericht ist eine technische Erstprüfung, keine Zertifizierung, keine Rechtsberatung und keine Garantie für Fehlerfreiheit.
