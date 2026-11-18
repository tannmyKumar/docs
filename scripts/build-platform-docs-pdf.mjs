/**
 * Build docs/Dhankirti-Platform-Documentation.pdf from docs/platform markdown sources.
 *
 * Usage (from repo root):
 *   node docs/scripts/build-platform-docs-pdf.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const platformDocsDir = path.join(repoRoot, "docs", "platform");
const outPdf = path.join(repoRoot, "docs", "Dhankirti-Platform-Documentation.pdf");

const DOC_FILES = [
  "00-overview.md",
  "01-roles-permissions.md",
  "api/02-api-overview.md",
  "api/03-api-catalog.md",
  "api/04-api-usage-map.md",
  "pages/05-customer-web.md",
  "pages/06-mobile-app.md",
  "pages/07-internal-web-overview.md",
  "pages/08-internal-by-role.md",
  "pages/09-internal-pages-live.md",
  "pages/10-internal-goal3-planned.md",
  "pages/11-broker-web.md",
];

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(text) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

function isTableSeparator(line) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((c) => c.trim());
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeBuf = [];
  let listType = null;

  function closeList() {
    if (listType) {
      out.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCode) {
        closeList();
        inCode = true;
        codeLang = line.slice(3).trim();
        codeBuf = [];
      } else {
        out.push(
          `<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeBuf.join("\n"))}</code></pre>`,
        );
        inCode = false;
        codeBuf = [];
      }
      i += 1;
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      closeList();
      i += 1;
      continue;
    }

    if (line.trim() === "---") {
      closeList();
      out.push("<hr />");
      i += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      closeList();
      const level = heading[1].length;
      const id = heading[2]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      out.push(`<h${level} id="${id}">${inlineFormat(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      closeList();
      const headers = parseTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      out.push("<table><thead><tr>");
      for (const h of headers) out.push(`<th>${inlineFormat(h)}</th>`);
      out.push("</tr></thead><tbody>");
      for (const row of rows) {
        out.push("<tr>");
        for (let c = 0; c < headers.length; c += 1) {
          out.push(`<td>${inlineFormat(row[c] ?? "")}</td>`);
        }
        out.push("</tr>");
      }
      out.push("</tbody></table>");
      continue;
    }

    const ul = /^[-*]\s+(.+)$/.exec(line);
    if (ul) {
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        out.push("<ul>");
      }
      out.push(`<li>${inlineFormat(ul[1])}</li>`);
      i += 1;
      continue;
    }

    const ol = /^(\d+)\.\s+(.+)$/.exec(line);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        out.push("<ol>");
      }
      out.push(`<li>${inlineFormat(ol[2])}</li>`);
      i += 1;
      continue;
    }

    closeList();
    out.push(`<p>${inlineFormat(line)}</p>`);
    i += 1;
  }

  closeList();
  return out.join("\n");
}

function buildHtmlDocument(bodyHtml) {
  const generatedAt = new Date().toISOString().slice(0, 10);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Dhankirti Platform Documentation</title>
  <style>
    @page { margin: 18mm 14mm; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
    }
    h1 { font-size: 20pt; margin: 0 0 12pt; page-break-before: always; border-bottom: 2px solid #0b3d2e; padding-bottom: 6pt; }
    h1:first-of-type { page-break-before: avoid; }
    h2 { font-size: 14pt; margin: 18pt 0 8pt; color: #0b3d2e; page-break-after: avoid; }
    h3 { font-size: 12pt; margin: 14pt 0 6pt; page-break-after: avoid; }
    p, li { margin: 0 0 6pt; }
    ul, ol { margin: 0 0 10pt 18pt; padding: 0; }
    code {
      font-family: Consolas, "Courier New", monospace;
      font-size: 9pt;
      background: #f3f5f4;
      padding: 1px 4px;
      border-radius: 3px;
    }
    pre {
      background: #f3f5f4;
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    pre code { background: transparent; padding: 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 14pt;
      font-size: 8.5pt;
      page-break-inside: auto;
    }
    th, td {
      border: 1px solid #cfd8d4;
      padding: 5px 6px;
      vertical-align: top;
      text-align: left;
    }
    th { background: #e8f2ee; font-weight: 600; }
    tr { page-break-inside: avoid; }
    hr { border: none; border-top: 1px solid #cfd8d4; margin: 16pt 0; }
    a { color: #0b3d2e; text-decoration: none; }
    .cover {
      page-break-after: always;
      padding-top: 80pt;
    }
    .cover h1 { border: none; font-size: 28pt; page-break-before: avoid; }
    .cover p { font-size: 12pt; color: #444; }
    .toc li { margin-bottom: 4pt; }
  </style>
</head>
<body>
  <section class="cover">
    <h1>Dhankirti Platform Documentation</h1>
    <p>API catalog, usage map, and page-wise documentation</p>
    <p>Customer · Internal (RM / Operations / Accounts / Admin) · Mobile · Broker (planned) · Goal 3 (planned)</p>
    <p>Generated: ${generatedAt}</p>
    <p><em>This document does not contain credentials or secrets.</em></p>
  </section>
  ${bodyHtml}
</body>
</html>`;
}

async function main() {
  const parts = [];
  for (const rel of DOC_FILES) {
    const full = path.join(platformDocsDir, rel);
    if (!fs.existsSync(full)) {
      throw new Error(`Missing doc file: ${rel}`);
    }
    const md = fs.readFileSync(full, "utf8");
    parts.push(`<!-- ${rel} -->\n${markdownToHtml(md)}`);
  }

  const html = buildHtmlDocument(parts.join("\n"));
  const tmpHtml = path.join(repoRoot, "docs", ".platform-docs-tmp.html");
  fs.writeFileSync(tmpHtml, html, "utf8");

  const require = createRequire(path.join(repoRoot, "backend-platform", "package.json"));
  const puppeteer = require("puppeteer");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outPdf,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:8px;width:100%;padding:0 14mm;color:#666;">Dhankirti Platform Documentation</div>`,
      footerTemplate: `<div style="font-size:8px;width:100%;padding:0 14mm;color:#666;display:flex;justify-content:space-between;"><span>Confidential — internal use</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
      margin: { top: "16mm", bottom: "16mm", left: "12mm", right: "12mm" },
    });
  } finally {
    await browser.close();
    try {
      fs.unlinkSync(tmpHtml);
    } catch {
      // ignore
    }
  }

  const stat = fs.statSync(outPdf);
  console.log(`Wrote ${outPdf} (${Math.round(stat.size / 1024)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
