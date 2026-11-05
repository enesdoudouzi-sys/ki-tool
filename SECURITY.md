# Sicherheit und Datenschutz

## Datenfluss

Dieses Repository enthält nur statische Website-Dateien. Es enthält nicht den Quellcode des Cloudflare-Workers unter `ki-proxy.enesdoudouzi.workers.dev`. Die Website kann deshalb dessen Authentifizierung, Rate Limits, Protokollierung, Aufbewahrung und Anbieterkonfiguration nicht absichern oder überprüfen.

KI-Funktionen senden eingegebene Texte und je nach Funktion Gesprächsverläufe an den Worker und einen externen KI-Anbieter. Die lokale Textanalyse verwendet dagegen Modelle im Browser. Datenschutzhinweise müssen diese Funktionen klar unterscheiden und mit den tatsächlichen Einstellungen des Workers und Anbieters abgeglichen werden.

## Hosting-Hinweis

GitHub Pages bietet in diesem Repository keine Konfiguration für beliebige HTTP-Sicherheitsheader. CSP-Meta-Tags sind kein vollständiger Ersatz: insbesondere `frame-ancestors` muss als HTTP-Header geliefert werden. Wenn diese Header verbindlich gesetzt werden sollen, ist ein Hosting mit Header-Konfiguration (zum Beispiel Cloudflare Pages mit einer `_headers`-Datei) erforderlich.

## Vor produktiver Nutzung

- Worker: Rate Limits, Eingabegrößen, erlaubte Modelle, Kostenlimits und Fehlerbehandlung prüfen.
- Datenschutz: Datenempfänger, Zwecke, Speicherfristen und Rechtsgrundlage dokumentieren.
- Browser-Ausgabe: Nutzerdaten und Modellantworten als Text rendern oder vor HTML-Ausgabe sicher escapen.
- Hosting: CSP und weitere Sicherheitsheader als HTTP-Header setzen.
- KI-Ausgaben: Ergebnisse als Vorschläge behandeln und fachlich prüfen.
