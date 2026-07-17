import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

// Typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-snow py-20">
        <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-sm border border-pine/10">
          {error ? (
            <>
              <h1 className="heading-section text-pine mb-3">Authorization error</h1>
              <p className="text-sm text-muted-foreground">{error}</p>
            </>
          ) : !details ? (
            <p className="text-center text-muted-foreground">Loading authorization…</p>
          ) : (
            <>
              <h1 className="heading-section text-pine mb-3">
                Connect {details.client?.name ?? "an app"} to The Woodpecker Inn
              </h1>
              <p className="text-sm text-muted-foreground mb-4">
                {details.client?.name ?? "The client"} will be able to call this app's
                tools while you are signed in. This does not bypass this app's
                permissions or backend policies.
              </p>
              <ul className="text-sm text-muted-foreground bg-pine/5 rounded-lg p-4 mb-6 space-y-1">
                <li>• Share your basic profile</li>
                <li>• Share your email address</li>
                <li>• Submit booking inquiries as you</li>
              </ul>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => decide(false)}
                  disabled={busy}
                >
                  Cancel connection
                </Button>
                <Button variant="pine" onClick={() => decide(true)} disabled={busy}>
                  {busy ? "Working…" : "Approve"}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
