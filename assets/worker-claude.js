/**
 * Cloudflare Worker — Anthropic Claude Proxy für ki-tool
 * Env var: ANTHROPIC_API_KEY
 *
 * Deploy: Cloudflare Dashboard → Workers → Code ersetzen
 */

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-5-5";
const ALLOWED_ORIGIN = "https://enesdoudouzi-sys.github.io";

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(ALLOWED_ORIGIN) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError("Ungültige Anfrage", 400);
    }

    const messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return jsonError("Keine Nachrichten übergeben", 400);
    }

    // System-Prompt aus dem ersten Eintrag trennen (falls vorhanden)
    let system = undefined;
    let chatMessages = messages;
    if (messages[0]?.role === "system") {
      system = messages[0].content;
      chatMessages = messages.slice(1);
    }

    const anthropicBody = {
      model: MODEL,
      max_tokens: 1024,
      messages: chatMessages,
      ...(system ? { system } : {}),
    };

    let resp;
    try {
      resp = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(anthropicBody),
      });
    } catch (e) {
      return jsonError("Verbindung zur KI fehlgeschlagen", 502);
    }

    const data = await resp.json();

    if (!resp.ok) {
      const msg = data?.error?.message || `HTTP ${resp.status}`;
      return jsonError(msg, resp.status >= 500 ? 502 : 400);
    }

    const text = data?.content?.[0]?.text ?? "";
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json", ...corsHeaders(ALLOWED_ORIGIN) },
    });
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonError(message, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(ALLOWED_ORIGIN) },
  });
}
