# KI-Suite API (Lernbaustein 1)

Ein bewusst kleiner Python-/FastAPI-Dienst als erster Schritt von der statischen KI-Suite zu einer API-basierten Architektur.

## Lokal starten

Voraussetzung: Python 3.10 oder neuer.

```bash
cd backend
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows PowerShell:
# .venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --reload
```

- Health Check: http://127.0.0.1:8000/health
- Interaktive API-Dokumentation: http://127.0.0.1:8000/docs

## Tests

Im Ordner `backend` ausführen:

```bash
pytest -q
```

## Endpunkte

| Methode | Pfad | Zweck |
|---|---|---|
| GET | `/health` | Statusprüfung |
| POST | `/api/v1/text/preview` | Zeichen-, Wort- und Zeilenanzahl |

Der Preview-Endpunkt speichert keine Eingaben und ruft keinen KI-Anbieter auf. Er ist ein sicherer Einstieg zum Lernen von Request-Validierung, HTTP-Statuscodes, JSON und automatisierten API-Tests.

## Deine Lernaufgaben

1. Starte die API lokal und rufe `/health` auf.
2. Öffne `/docs` und sende einen POST-Request.
3. Ändere die maximale Textlänge und beobachte die Validierung.
4. Ergänze einen Test für Text mit mehreren Leerzeichen.
5. Erkläre den Unterschied zwischen GET und POST sowie HTTP 200 und 422.

## Nächster Ausbauschritt

Die API wird anschließend mit dem bestehenden Frontend verbunden. Danach folgen Provider-Anbindung über sichere serverseitige Secrets, strukturierte Fehlerbehandlung, Authentifizierung und Rate Limiting. API-Schlüssel gehören niemals in das Browser-Frontend oder ins Git-Repository.
