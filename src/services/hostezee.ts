// Hostezee Website Lead API integration.
// The Hostezee API key is stored server-side; the browser only calls our
// internal edge function proxy. UI code must never call fetch directly.
import { supabase } from "@/integrations/supabase/client";

export interface WebsiteLeadRequest {
  property_name: string;
  website: string;
  guest_name: string;
  mobile_number: string;
  email: string;
  adults: number;
  children: number;
  room_type: string;
  check_in: string;
  check_out: string;
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  device_type: string;
  browser: string;
}

export interface WebsiteLeadResponse {
  success: boolean;
  message?: string;
  lead_id?: string;
  [key: string]: unknown;
}

export interface WebsiteLeadError {
  status: number | null;
  code:
    | "network"
    | "timeout"
    | "offline"
    | "unauthorized"
    | "forbidden"
    | "bad_request"
    | "server"
    | "config"
    | "unknown";
  message: string;
}

const PROXY_FUNCTION = "hostezee-lead";

const errorFromStatus = (status: number, message?: string): WebsiteLeadError => {
  if (status === 400)
    return { status, code: "bad_request", message: message ?? "Invalid enquiry data." };
  if (status === 401)
    return { status, code: "unauthorized", message: message ?? "Unauthorized." };
  if (status === 403)
    return { status, code: "forbidden", message: message ?? "Forbidden." };
  if (status === 504)
    return { status, code: "timeout", message: message ?? "Request timed out." };
  if (status >= 500)
    return { status, code: "server", message: message ?? "Hostezee is temporarily unavailable." };
  return { status, code: "unknown", message: message ?? `Request failed (${status}).` };
};

export const submitWebsiteLead = async (
  payload: WebsiteLeadRequest
): Promise<WebsiteLeadResponse> => {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw {
      status: null,
      code: "offline",
      message: "You appear to be offline. Please check your connection and try again.",
    } as WebsiteLeadError;
  }

  const { data, error } = await supabase.functions.invoke<WebsiteLeadResponse>(
    PROXY_FUNCTION,
    { body: payload }
  );

  if (error) {
    // supabase-js wraps non-2xx as FunctionsHttpError; try to read the body.
    let body: WebsiteLeadResponse | null = null;
    const ctx = (error as unknown as { context?: Response }).context;
    if (ctx && typeof ctx.text === "function") {
      try {
        const raw = await ctx.text();
        body = raw ? (JSON.parse(raw) as WebsiteLeadResponse) : null;
      } catch {
        body = null;
      }
    }
    const status = ctx?.status ?? 0;
    if (status > 0) throw errorFromStatus(status, body?.message);
    throw {
      status: null,
      code: "network",
      message: body?.message ?? "Could not reach Hostezee. Please try again.",
    } as WebsiteLeadError;
  }

  if (!data || data.success !== true) {
    throw {
      status: 200,
      code: "unknown",
      message: data?.message ?? "Enquiry could not be submitted.",
    } as WebsiteLeadError;
  }

  return data;
};
