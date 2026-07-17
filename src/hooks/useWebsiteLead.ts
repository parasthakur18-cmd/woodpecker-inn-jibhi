import { useCallback, useState } from "react";
import { z } from "zod";
import { collectClientMeta } from "@/lib/clientMeta";
import {
  submitWebsiteLead,
  type WebsiteLeadError,
  type WebsiteLeadRequest,
  type WebsiteLeadResponse,
} from "@/services/hostezee";

export interface LeadFormInput {
  guest_name: string;
  mobile_number: string;
  email?: string;
  adults?: number;
  children?: number;
  room_type?: string;
  check_in?: string;
  check_out?: string;
}

export interface LeadContext {
  property_name: string;
  website: string;
}

const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

const leadSchema = z
  .object({
    guest_name: z
      .string()
      .trim()
      .min(2, "Please enter your full name (min 2 characters).")
      .max(100, "Name must be under 100 characters."),
    mobile_number: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => /^(?:91)?[6-9]\d{9}$/.test(v), {
        message: "Enter a valid 10-digit Indian mobile number.",
      })
      .transform((v) => (v.length === 12 ? v.slice(2) : v)),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(255)
      .optional()
      .or(z.literal("")),
    adults: z.number().int().min(1, "At least 1 adult is required.").max(20).optional(),
    children: z.number().int().min(0).max(20).optional(),
    room_type: z.string().max(120).optional().or(z.literal("")),
    check_in: z.string().optional().or(z.literal("")),
    check_out: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.check_in && data.check_in < todayISO()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["check_in"],
        message: "Check-in cannot be before today.",
      });
    }
    if (data.check_in && data.check_out && data.check_out <= data.check_in) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["check_out"],
        message: "Check-out must be after check-in.",
      });
    }
  });

export interface UseWebsiteLeadResult {
  submit: (input: LeadFormInput) => Promise<WebsiteLeadResponse | null>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const useWebsiteLead = (ctx: LeadContext): UseWebsiteLeadResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (input: LeadFormInput) => {
      if (loading) return null;
      setError(null);

      const parsed = leadSchema.safeParse(input);
      if (!parsed.success) {
        const first = parsed.error.issues[0]?.message ?? "Please check the form.";
        setError(first);
        return null;
      }

      const meta = collectClientMeta();
      const payload: WebsiteLeadRequest = {
        property_name: ctx.property_name,
        website: ctx.website,
        guest_name: parsed.data.guest_name,
        mobile_number: parsed.data.mobile_number,
        email: parsed.data.email || "",
        adults: parsed.data.adults ?? 2,
        children: parsed.data.children ?? 0,
        room_type: parsed.data.room_type || "",
        check_in: parsed.data.check_in || "",
        check_out: parsed.data.check_out || "",
        landing_page: meta.page_url,
        referrer: meta.referrer,
        utm_source: meta.utm_source ?? "",
        utm_medium: meta.utm_medium ?? "",
        utm_campaign: meta.utm_campaign ?? "",
        device_type: meta.device_type,
        browser: meta.browser,
      };

      setLoading(true);
      try {
        const res = await submitWebsiteLead(payload);
        return res;
      } catch (err) {
        const e = err as WebsiteLeadError;
        setError(
          e?.message ??
            "We couldn't submit your enquiry at the moment. Please try again."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [ctx.property_name, ctx.website, loading]
  );

  const reset = useCallback(() => setError(null), []);

  return { submit, loading, error, reset };
};
