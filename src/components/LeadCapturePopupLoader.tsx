import { lazy, Suspense, useEffect, useState } from "react";

const LeadCapturePopup = lazy(() => import("./LeadCapturePopup"));

const SESSION_KEY = "wpi_lead_popup_shown_v1";

export const LeadCapturePopupLoader = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setShow(true);
    }, 3000);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <LeadCapturePopup onClose={() => setShow(false)} />
    </Suspense>
  );
};
