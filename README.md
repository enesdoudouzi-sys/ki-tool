<div align="center">

<img src="assets/og-image.png" alt="Doudouzi & Ergün – KI-Suite" width="100%">

# KI-Suite für Unternehmen

**Praktische Browser-Tools für E-Mail, Prozesse, Gastronomie, Logistik und Textanalyse.**

<a href="https://enesdoudouzi-sys.github.io/ki-tool/">
  <img src="https://img.shields.io/badge/Live%20Demo-Öffnen-15803d?style=for-the-badge" alt="Live-Demo öffnen">
</a>
<img src="https://img.shields.io/badge/Interface-HTML%20%2B%20JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=111" alt="HTML und JavaScript">
<img src="https://img.shields.io/badge/KI-Transformers.js-ffd21e?style=for-the-badge" alt="Transformers.js">

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=20&pause=1400&color=15803D&center=true&vCenter=true&width=720&lines=E-Mails+schneller+bearbeiten;Prozesse+sichtbar+verbessern;KI-Werkzeuge+f%C3%BCr+den+Arbeitsalltag" alt="E-Mails schneller bearbeiten, Prozesse verbessern, KI-Werkzeuge für den Arbeitsalltag">

</div>

---

## Live ausprobieren

Die Werkzeuge laufen als statische Website. Für einzelne KI-Funktionen ist eine Internetverbindung erforderlich.

| Werkzeug | Demo | Kurzbeschreibung |
|---|---|---|
| E-Mail-Dashboard | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/email-dashboard/) | E-Mails sortieren, priorisieren und Antwortentwürfe erstellen |
| E-Mail-Filter | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/email-filter/) | E-Mail-Text lokal kategorisieren und Stimmung einschätzen |
| Prozess-Check | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/prozess-check/) | Abläufe, Wartezeiten und Verbesserungsmöglichkeiten untersuchen |
| Logistik-KI | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/logistik/) | Beispiele und Textarbeit für Logistikprozesse |
| Gastro-Paket | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/gastro/) | Werkzeuge für Bewertungen, Social Media und Telefon-Demos |
| Angebotsgenerator | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/angebot/) | Beratungsangebote aus den eingegebenen Eckdaten entwerfen |
| KI-Assistent | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/assistent/) | Mit einem KI-Assistenten schreiben und Ideen ausarbeiten |
| Textanalyse | [Öffnen](https://enesdoudouzi-sys.github.io/ki-tool/textanalyse/) | Kategorien, Stimmung und Entitäten untersuchen |

## Screenshots

Die Vorschauen werden aus der öffentlichen Live-Demo erzeugt. Ein Klick öffnet das jeweilige Werkzeug.

<p align="center">
  <a href="https://enesdoudouzi-sys.github.io/ki-tool/">
    <img src="https://image.thum.io/get/width/1200/crop/760/noanimate/https://enesdoudouzi-sys.github.io/ki-tool/" alt="Screenshot der KI-Suite Startseite" width="90%" loading="lazy">
  </a>
  <br><em>Startseite der KI-Suite</em>
</p>

<p align="center">
  <a href="https://enesdoudouzi-sys.github.io/ki-tool/email-dashboard/">
    <img src="https://image.thum.io/get/width/1200/crop/760/noanimate/https://enesdoudouzi-sys.github.io/ki-tool/email-dashboard/" alt="Screenshot des E-Mail-Dashboards" width="90%" loading="lazy">
  </a>
  <br><em>E-Mail-Dashboard</em>
</p>

<p align="center">
  <a href="https://enesdoudouzi-sys.github.io/ki-tool/prozess-check/">
    <img src="https://image.thum.io/get/width/1200/crop/760/noanimate/https://enesdoudouzi-sys.github.io/ki-tool/prozess-check/" alt="Screenshot des Prozess-Checks" width="90%" loading="lazy">
  </a>
  <br><em>Prozess-Check</em>
</p>

## So funktioniert die Datenverarbeitung

Die Anwendung besteht aus statischen HTML-, CSS- und JavaScript-Dateien. Je nach Werkzeug unterscheiden sich die Datenwege:

```mermaid
flowchart LR
    U[Nutzer im Browser] --> L[Lokale Analyse<br/>Transformers.js]
    U -->|Bestätigung vor erster Anfrage| W[Cloudflare Worker]
    W --> A[Externer KI-Anbieter]
    L --> U
    A --> W --> U
```

- Die Textanalyse für Kategorien, Stimmung und Entitäten läuft mit Modellen, die der Browser von Hugging Face lädt.
- KI-Antworten, Chat und weitere generative Funktionen senden die dafür eingegebenen Texte über den Worker an einen externen KI-Anbieter.
- Vor KI- und Kontaktanfragen fragt die Website in der aktuellen Browser-Sitzung nach einer Bestätigung.
- Bitte keine Passwörter oder besonders vertraulichen personenbezogenen Daten eingeben.

Die Website kann die Protokollierung und Aufbewahrung durch Worker oder KI-Anbieter nicht kontrollieren. Die Datenschutzerklärung muss mit deren aktueller Konfiguration abgeglichen werden.

## Lokal starten

Die GitHub-Pages-Version verwendet den URL-Pfad `/ki-tool/`. Für eine lokale Vorschau muss das Repository ebenfalls unter diesem Pfad bereitgestellt werden. Lege den Projektordner `ki-tool` in ein Verzeichnis und starte den Server eine Ebene darüber:

```bash
python3 -m http.server 8000
```

Öffne anschließend [http://localhost:8000/ki-tool/](http://localhost:8000/ki-tool/).

## Projektstruktur

```text
.
├── index.html              # Startseite und Werkzeugübersicht
├── assets/                 # gemeinsame Skripte, Styles und Grafiken
├── assistent/              # Chat-Demo
├── email-dashboard/        # E-Mail-Dashboard
├── email-filter/           # lokaler E-Mail-Filter
├── gastro/                 # Gastronomie-Werkzeuge
├── logistik/               # Logistik-Werkzeug
├── angebot/                # Angebotsgenerator
├── prozess-check/          # Prozessanalyse
├── textanalyse/            # lokale Textanalyse und KI-Funktionen
├── scripts/                # Qualitätsprüfungen
└── .github/workflows/      # GitHub Actions und CodeQL
```

## Verwendete Technologien

- HTML, CSS und modernes JavaScript
- [Transformers.js](https://huggingface.co/docs/transformers.js) für lokale Modelle im Browser
- Cloudflare Worker als Proxy für generative KI-Anfragen
- GitHub Pages für das statische Hosting
- GitHub Actions und CodeQL für automatisierte Prüfungen

## Qualität und Sicherheit

- `scripts/check_site.py` prüft lokale Seitenverweise und PWA-Icons.
- GitHub Actions führt die Prüfung bei Pushes und Pull Requests aus.
- CodeQL analysiert JavaScript auf bekannte Sicherheitsprobleme.
- Dependabot hält GitHub-Actions-Versionen im Blick.

**Noch offene technische Punkte:** Der Worker-Quellcode liegt nicht in diesem Repository; seine Rate Limits, Kostenlimits und Aufbewahrung müssen im Worker-Projekt geprüft werden. GitHub Pages kann hier keine beliebigen HTTP-Sicherheitsheader konfigurieren. Die CI-Läufe sollten außerdem im GitHub-Konto erfolgreich gestartet und überprüft werden.

## Mitwirken

Fehlerberichte und konkrete Verbesserungsvorschläge sind willkommen. Bitte keine echten Kundendaten, Zugangsdaten oder vertraulichen E-Mails in Issues oder Beispielen veröffentlichen.

---

<div align="center">
  <sub>Entwickelt von Doudouzi & Ergün · KI-gestützte Prozessoptimierung</sub>
</div>
