// Hostezee Website Lead API integration.
// All calls to Hostezee must go through this module — UI code must never call fetch directly.

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

const REQUEST_TIMEOUT_MS = 15000;

const getConfig = (): { url: string; key: string } | WebsiteLeadError => {
  const url = import.meta.env.VITE_HOSTEZEE_API_URL as string | undefined;
  const key = import.meta.env.VITE_HOSTEZEE_API_KEY as string | undefined;
  if (!url || !key) {
    return {
      status: null,
      code: "config",
      message:
        "Hostezee API is not configured. Please set VITE_HOSTEZEE_API_URL and VITE_HOSTEZEE_API_KEY.",
    };
  }
  return { url, key };
};

const errorFromStatus = (status: number, message?: string): WebsiteLeadError => {
  if (status === 400)
    return { status, code: "bad_request", message: message ?? "Invalid enquiry data." };
  if (status === 401)
    return { status, code: "unauthorized", message: message ?? "Unauthorized." };
  if (status === 403)
    return { status, code: "forbidden", message: message ?? "Forbidden." };
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

  const cfg = getConfig();
  if ("code" in cfg) throw cfg;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(cfg.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    const aborted = (err as { name?: string })?.name === "AbortError";
    throw {
      status: null,
      code: aborted ? "timeout" : "network",
      message: aborted
        ? "The request took too long. Please try again."
        : "Could not reach Hostezee. Please try again.",
    } as WebsiteLeadError;
  }
  clearTimeout(timeout);

  let data: WebsiteLeadResponse | null = null;
  try {
    data = (await response.json()) as WebsiteLeadResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw errorFromStatus(response.status, data?.message);
  }

  if (!data || data.success !== true) {
    throw {
      status: response.status,
      code: "unknown",
      message: data?.message ?? "Enquiry could not be submitted.",
    } as WebsiteLeadError;
  }

  return data;
};
