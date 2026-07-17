// Lightweight, dependency-free device/browser/OS sniffing for lead metadata.
// Only used to enrich stored leads; never for feature gating.
export interface ClientMeta {
  device_type: string;
  browser: string;
  operating_system: string;
  page_url: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const detectDevice = (ua: string) => {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
};

const detectBrowser = (ua: string) => {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  return "Other";
};

const detectOS = (ua: string) => {
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
};

export const collectClientMeta = (): ClientMeta => {
  if (typeof window === "undefined") {
    return {
      device_type: "unknown",
      browser: "unknown",
      operating_system: "unknown",
      page_url: "",
      referrer: "",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };
  }
  const ua = navigator.userAgent || "";
  const params = new URLSearchParams(window.location.search);
  return {
    device_type: detectDevice(ua),
    browser: detectBrowser(ua),
    operating_system: detectOS(ua),
    page_url: window.location.href,
    referrer: document.referrer || "",
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
};
