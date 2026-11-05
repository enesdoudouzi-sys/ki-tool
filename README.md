# KI-Suite – Doudouzi & Ergün

Statische Sammlung browserbasierter Werkzeuge für Prozessoptimierung, E-Mail-Arbeit, Gastronomie, Logistik und Textanalyse.

**Live-Demo:** https://enesdoudouzi-sys.github.io/ki-tool/

## Datenschutz und Datenverarbeitung

Die Website enthält Funktionen mit unterschiedlichen Datenflüssen:

- Die lokale Textanalyse lädt Modelle von Hugging Face in den Browser. Die Modellanalyse des eingegebenen Textes läuft lokal.
- KI-gestützte Funktionen wie Assistent, E-Mail-Antworten, Angebotsgenerator und einzelne Branchenwerkzeuge senden Eingaben über den Cloudflare-Worker `ki-proxy.enesdoudouzi.workers.dev` an einen externen KI-Anbieter.
- Vor der ersten KI-Anfrage pro Browser-Sitzung wird eine Bestätigung angezeigt. Bitte keine Passwörter oder besonders vertraulichen personenbezogenen Daten eingeben.
- Speicher- und Aufbewahrungsregeln des Workers und KI-Anbieters müssen anhand ihrer tatsächlichen Konfiguration in der Datenschutzerklärung beschrieben werden. Die statische Website kann deren Verhalten nicht garantieren.

## Lokal starten

Die Seiten verwenden für GitHub Pages den URL-Pfad `/ki-tool/`. Für einen lokalen Preview muss die Website unter demselben Pfad erreichbar sein. Starte einen statischen Server im übergeordneten Verzeichnis, in dem der Ordner `ki-tool` liegt, zum Beispiel `python3 -m http.server 8000`, und öffne `http://localhost:8000/ki-tool/`.

## Qualitätssicherung

GitHub Actions prüft lokale Dateiverweise und PWA-Icons. GitHub CodeQL analysiert JavaScript. Hinweise zu den Grenzen der Sicherheit und Datenverarbeitung stehen in `SECURITY.md`.
