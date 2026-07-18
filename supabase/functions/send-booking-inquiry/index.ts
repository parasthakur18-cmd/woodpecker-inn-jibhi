import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://esm.sh/zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

const InquirySchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(255),
    phone: z
      .string()
      .trim()
      .min(6)
      .max(20)
      .regex(/^[+()\-\s.\d]+$/, "Invalid phone number format"),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guests: z.coerce.number().int().min(1).max(20),
    message: z.string().trim().max(1000).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.checkIn < todayISO())
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["checkIn"], message: "Check-in cannot be in the past" });
    if (d.checkOut <= d.checkIn)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["checkOut"], message: "Check-out must be after check-in" });
  });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const parsed = InquirySchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Invalid inquiry payload");
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const { name, email, phone, checkIn, checkOut, guests, message } = parsed.data;

    console.log("Processing new booking inquiry");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: dbData, error: dbError } = await supabase
      .from("booking_inquiries")
      .insert({
        name,
        email,
        phone,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        message: message ?? null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error saving inquiry");
      throw new Error("Failed to save inquiry");
    }

    console.log("Inquiry saved to database:", dbData.id);

    const checkInDate = new Date(checkIn).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const checkOutDate = new Date(checkOut).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = message ? escapeHtml(message) : "";

    await resend.emails.send({
      from: "The Woodpecker Inn <onboarding@resend.dev>",
      to: ["support@thewoodpeckerinn.in"],
      reply_to: email,
      subject: `New Booking Inquiry from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html><head><style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E3D32; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #eee; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1E3D32; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #8B5A2B; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          .cta { display: inline-block; background: #1E3D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style></head><body>
          <div class="container">
            <div class="header"><h1>🏔️ New Booking Inquiry</h1></div>
            <div class="content">
              <div class="field"><span class="label">Guest Name:</span> ${safeName}</div>
              <div class="field"><span class="label">Email:</span> <a href="mailto:${safeEmail}">${safeEmail}</a></div>
              <div class="field"><span class="label">Phone:</span> <a href="tel:${safePhone}">${safePhone}</a></div>
              <div class="field"><span class="label">Check-in:</span> ${checkInDate}</div>
              <div class="field"><span class="label">Check-out:</span> ${checkOutDate}</div>
              <div class="field"><span class="label">Number of Guests:</span> ${guests}</div>
              ${safeMessage ? `<div class="message-box"><span class="label">Special Requests:</span><p>${safeMessage}</p></div>` : ""}
            </div>
            <div class="footer">
              <p>The Woodpecker Inn | VPO Jibhi, Gadagushaini, Himachal Pradesh 175123</p>
              <p>Inquiry ID: ${dbData.id}</p>
            </div>
          </div>
        </body></html>
      `,
    });

    console.log("Notification email sent for inquiry:", dbData.id);

    await resend.emails.send({
      from: "The Woodpecker Inn <onboarding@resend.dev>",
      to: [email],
      subject: "We received your booking inquiry - The Woodpecker Inn",
      html: `
        <!DOCTYPE html>
        <html><head><style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E3D32; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #eee; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
        </style></head><body>
          <div class="container">
            <div class="header"><h1>🏔️ Thank You, ${safeName}!</h1></div>
            <div class="content">
              <p>We've received your booking inquiry for The Woodpecker Inn and are excited to help plan your mountain getaway!</p>
              <div class="highlight">
                <p><strong>Your Inquiry Details:</strong></p>
                <p>📅 Check-in: ${checkInDate}</p>
                <p>📅 Check-out: ${checkOutDate}</p>
                <p>👥 Guests: ${guests}</p>
              </div>
              <p>Our team will review your request and get back to you within 24 hours.</p>
              <p>Warm regards,<br><strong>The Woodpecker Inn Team</strong></p>
            </div>
            <div class="footer">
              <p>The Woodpecker Inn | VPO Jibhi, Gadagushaini, Himachal Pradesh 175123</p>
            </div>
          </div>
        </body></html>
      `,
    });

    console.log("Confirmation email sent for inquiry:", dbData.id);

    const ownerWhatsAppNumber = "919317224562";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const whatsappMessage = `🏔️ *New Booking Inquiry*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📧 *Email:* ${email}\n📅 *Check-in:* ${checkInDate}\n📅 *Check-out:* ${checkOutDate}\n👥 *Guests:* ${guests}${message ? `\n💬 *Message:* ${message}` : ""}\n\n🔗 Reply to guest: https://wa.me/${cleanPhone}`;
    const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return new Response(
      JSON.stringify({ success: true, inquiryId: dbData.id, whatsappUrl }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-booking-inquiry function:", error?.message ?? "unknown");
    return new Response(
      JSON.stringify({ error: "Failed to process inquiry" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
