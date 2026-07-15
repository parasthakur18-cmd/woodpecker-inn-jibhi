// Helper to build WhatsApp links that avoid the api.whatsapp.com redirect
// (blocked on some networks/DNS filters). Uses wa.me on mobile and
// web.whatsapp.com on desktop, both of which are widely reachable.
export const buildWhatsAppUrl = (phone: string, text?: string) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const encoded = text ? encodeURIComponent(text) : "";
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const base = isMobile
    ? `https://wa.me/${cleanPhone}`
    : `https://web.whatsapp.com/send?phone=${cleanPhone}`;
  if (!encoded) return base;
  return isMobile ? `${base}?text=${encoded}` : `${base}&text=${encoded}`;
};

export const openWhatsApp = (phone: string, text?: string) => {
  const url = buildWhatsAppUrl(phone, text);
  window.open(url, "_blank", "noopener,noreferrer");
};
