/* Gemeinsame Export-Bibliothek für die KI-Suite: PDF, Excel/CSV, PowerPoint.
   Alles clientseitig, Bibliotheken werden erst beim Klick nachgeladen (CDN). */
(function () {
  const CDN = {
    jspdf: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    autotable: "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js",
    xlsx: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
    pptx: "https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js",
  };
  const loaded = {};
  function loadScript(src) {
    if (loaded[src]) return loaded[src];
    loaded[src] = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = () => res();
      s.onerror = () => rej(new Error("Konnte Bibliothek nicht laden: " + src));
      document.head.appendChild(s);
    });
    return loaded[src];
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }
  const GREEN = [14, 61, 46], GREEN2 = [22, 163, 74];

  const KIExport = {
    // rows: Array<Array<any>>
    csv(filename, headers, rows) {
      const esc = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
      const lines = [headers.map(esc).join(";")].concat(rows.map(r => r.map(esc).join(";")));
      downloadBlob(new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }), filename);
    },

    async xlsx(filename, sheetName, headers, rows) {
      await loadScript(CDN.xlsx);
      const ws = XLSX.utils.aoa_to_sheet([headers].concat(rows));
      ws["!cols"] = headers.map((h, i) => ({ wch: Math.min(60, Math.max(12, ...[h].concat(rows.map(r => String(r[i] || ""))).map(s => String(s).length) )) }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, (sheetName || "Daten").slice(0, 31));
      XLSX.writeFile(wb, filename);
    },

    /* opts: { title, subtitle, sections:[ {type:'kv',title,items:[[k,v]]} | {type:'table',title,head:[...],body:[[...]]} | {type:'text',title,text} ] } */
    async pdf(filename, opts) {
      await loadScript(CDN.jspdf);
      await loadScript(CDN.autotable);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      doc.setFillColor.apply(doc, GREEN); doc.rect(0, 0, W, 72, "F");
      doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(18);
      doc.text(opts.title || "Report", 40, 40);
      if (opts.subtitle) { doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(opts.subtitle, 40, 58); }
      let y = 100;
      const ensure = (need) => { if (y + need > doc.internal.pageSize.getHeight() - 50) { doc.addPage(); y = 50; } };
      (opts.sections || []).forEach(sec => {
        ensure(40);
        if (sec.title) { doc.setTextColor.apply(doc, GREEN); doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text(sec.title, 40, y); y += 14; }
        doc.setTextColor(30, 30, 30);
        if (sec.type === "text") {
          doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
          const lines = doc.splitTextToSize(sec.text || "", W - 80);
          lines.forEach(ln => { ensure(16); doc.text(ln, 40, y); y += 14; });
          y += 8;
        } else if (sec.type === "kv") {
          doc.autoTable({ startY: y + 2, theme: "plain", styles: { fontSize: 10.5, cellPadding: 3 },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 180, textColor: GREEN } }, body: sec.items });
          y = doc.lastAutoTable.finalY + 16;
        } else if (sec.type === "table") {
          doc.autoTable({ startY: y + 2, head: [sec.head], body: sec.body,
            styles: { fontSize: 9.5, cellPadding: 4 }, headStyles: { fillColor: GREEN2, textColor: 255 },
            alternateRowStyles: { fillColor: [240, 247, 243] } });
          y = doc.lastAutoTable.finalY + 16;
        }
      });
      const PH = doc.internal.pageSize.getHeight();
      doc.setFontSize(8); doc.setTextColor(140);
      doc.text("Erstellt mit der KI-Suite von Doudouzi & Ergün · " + new Date().toLocaleDateString("de-DE"), 40, PH - 24);
      doc.save(filename);
    },

    /* opts: { title, subtitle, slides:[ {title, bullets:[...]} | {title, table:{head,body}} ] } */
    async pptx(filename, opts) {
      await loadScript(CDN.pptx);
      const pptx = new PptxGenJS();
      pptx.defineLayout({ name: "W", width: 10, height: 5.63 });
      pptx.layout = "W";
      const title = pptx.addSlide();
      title.background = { color: "0E3D2E" };
      title.addText(opts.title || "Report", { x: 0.6, y: 1.9, w: 8.8, fontSize: 34, bold: true, color: "FFFFFF" });
      if (opts.subtitle) title.addText(opts.subtitle, { x: 0.6, y: 2.9, w: 8.8, fontSize: 15, color: "C9E7D6" });
      title.addText("Doudouzi & Ergün · Prozessoptimierung & KI", { x: 0.6, y: 5.0, w: 8.8, fontSize: 11, color: "9DBCA9" });
      (opts.slides || []).forEach(sl => {
        const s = pptx.addSlide();
        s.addText(sl.title || "", { x: 0.5, y: 0.35, w: 9, fontSize: 24, bold: true, color: "0E3D2E" });
        s.addShape(pptx.ShapeType.line, { x: 0.5, y: 1.0, w: 9, h: 0, line: { color: "16A34A", width: 2 } });
        if (sl.bullets) {
          s.addText(sl.bullets.map(b => ({ text: b, options: { bullet: true, breakLine: true } })),
            { x: 0.7, y: 1.3, w: 8.6, h: 3.8, fontSize: 15, color: "1F2A24", valign: "top" });
        }
        if (sl.table) {
          const head = sl.table.head.map(h => ({ text: h, options: { bold: true, color: "FFFFFF", fill: "16A34A" } }));
          const body = sl.table.body.map(r => r.map(c => ({ text: String(c) })));
          s.addTable([head].concat(body), { x: 0.5, y: 1.3, w: 9, fontSize: 11, border: { pt: 0.5, color: "D9E0DB" }, color: "1F2A24" });
        }
      });
      await pptx.writeFile({ fileName: filename });
    },
  };
  window.KIExport = KIExport;
})();
