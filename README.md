<div align="center">

# 🧠 KI-Textanalyse

**Branchenübergreifende KI-Analyse für Texte – Kategorisierung, Stimmung und Entitäten.
Läuft komplett im Browser: kein Server, kein API-Key, keine Daten-Uploads.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-16a34a?style=for-the-badge&logo=github)](https://enesdoudouzi-sys.github.io/ki-tool/)
&nbsp;
![Transformers.js](https://img.shields.io/badge/Transformers.js-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 👉 [**Live ausprobieren**](https://enesdoudouzi-sys.github.io/ki-tool/)

</div>

---

## Was das Tool macht

Man fügt einen beliebigen Text ein (E-Mail, Bewertung, Kundenanfrage, Dokument) und erhält in Sekunden drei Analysen:

| Funktion | Was sie liefert |
|---|---|
| 🏷 **Kategorisierung** | Ordnet den Text frei definierbaren Kategorien zu (Zero-Shot – funktioniert ohne Training für **jede** Branche). |
| 😊 **Stimmungsanalyse** | Erkennt positive / negative / neutrale Stimmung – mehrsprachig, auch auf Deutsch. |
| 🔍 **Entitätenerkennung** | Markiert Personen, Firmen und Orte im Text. |

Mit **Branchen-Presets** für Logistik, Gastronomie, Handel, Recht, Dienstleistung und Gesundheit – oder komplett eigenen Kategorien.

---

## Besonderheit: alles läuft lokal im Browser

Die KI-Modelle (von Hugging Face, via [Transformers.js](https://github.com/huggingface/transformers.js)) werden **einmalig** in den Browser geladen und rechnen danach **auf dem Gerät des Nutzers**.

- 🔒 **Datenschutz:** Der eingegebene Text verlässt den Browser nie.
- 💸 **Kostenlos:** kein API-Key, kein Backend, kein Konto.
- ⚡ **Offline-fähig** nach dem ersten Laden.

### Verwendete Modelle
- `Xenova/nli-deberta-v3-xsmall` – Zero-Shot-Klassifikation
- `Xenova/distilbert-base-multilingual-cased-sentiments-student` – Stimmung (mehrsprachig)
- `Xenova/bert-base-multilingual-cased-ner-hrl` – Entitätenerkennung (mehrsprachig)

---

## Technik

**Frontend:** reines HTML + JavaScript (ES-Module), keine Build-Tools
**KI:** Transformers.js 3.0.2 (WebAssembly / WebGPU im Browser)
**Hosting:** GitHub Pages (statisch)

Keine Abhängigkeit zu installieren – eine einzige `index.html`.

---

## Lokal starten

```bash
# einfach die Seite ausliefern (irgendein statischer Server), z. B.:
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

> Hinweis: Beim ersten „Analysieren" lädt der Browser die KI-Modelle von Hugging Face (einige MB).
> Danach sind sie im Cache und die Analyse ist schnell.

---

<div align="center">

Entwickelt von **Enes Doudouzi** · Demo für KI-gestützte Prozessoptimierung

</div>
