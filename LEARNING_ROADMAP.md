# AI Automation & Cloud Solutions Engineer – Lernpfad

Dieses Repository wird parallel als produktives Referenzprojekt und als praktisches Lernlabor ausgebaut.

## Lernmodule

| # | Schwerpunkt | Umsetzung im Projekt | Status |
|---|---|---|---|
| 1 | Python, FastAPI, REST | API-Grundgerüst, Validierung, OpenAPI, Tests | 🟡 Gestartet |
| 2 | n8n, Webhooks, OAuth2 | Workflow für eine echte Suite-Aktion; OAuth ohne Secrets im Frontend | ⬜ Offen |
| 3 | PostgreSQL, Redis | Persistenz, Datenmodell, Cache und TTL | ⬜ Offen |
| 4 | RAG, Vector Database | Dokumente indexieren, Embeddings, Quellenbelege | ⬜ Offen |
| 5 | AWS oder Azure | API deployen, Logs, Monitoring und Kostenkontrolle | ⬜ Offen |
| 6 | Terraform, Docker, Kubernetes | Reproduzierbare Infrastruktur und Containerbetrieb | ⬜ Offen |
| 7 | OWASP, Security, DSGVO | Threat Model, Zugriffsschutz, Secrets, Datenminimierung | 🟡 Laufend |
| 8 | SaaS, Multi-Tenancy | Mandantentrennung, Rollen, Quoten und Abrechnungsvorbereitung | ⬜ Offen |

## Arbeitsprinzip

Jedes Modul hat vier Ergebnisse:

1. **Lernen:** kurze Erklärung und offizielle, möglichst kostenlose Lernressourcen.
2. **Bauen:** eine konkrete Erweiterung im KI-Tool.
3. **Prüfen:** Tests, Security- und Qualitätschecks.
4. **Nachweisen:** Dokumentation, Commit und nachvollziehbarer Projektstand.

## Regeln

- Neue Arbeit zunächst auf einem Feature-Branch.
- Keine Secrets, API-Keys oder Kundendaten committen.
- Keine produktiven Änderungen ohne Tests.
- Erst nach Prüfung per Pull Request nach `main` übernehmen.
- Zertifikate ergänzen praktische Projektnachweise, ersetzen sie aber nicht.

## Modul 1 – FastAPI

Siehe [backend/README.md](backend/README.md). Ziel: eine lokal lauffähige REST-API verstehen, testen und später mit dem bestehenden Browser-Frontend verbinden.
