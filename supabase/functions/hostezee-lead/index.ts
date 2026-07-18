import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const HOSTEZEE_URL = "https://hostezee.in/api/v1/website-leads";
const TIMEOUT_MS = 15000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, message: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("HOSTEZEE_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ success: false, message: "Hostezee API key is not configured on the server." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid JSON body." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(HOSTEZEE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await upstream.text();
    return new Response(text || JSON.stringify({ success: upstream.ok }), {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err) {
    clearTimeout(timeout);
    const aborted = (err as { name?: string })?.name === "AbortError";
    return new Response(
      JSON.stringify({
        success: false,
        message: aborted
          ? "The request to Hostezee timed out. Please try again."
          : "Could not reach Hostezee. Please try again.",
      }),
      {
        status: aborted ? 504 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
