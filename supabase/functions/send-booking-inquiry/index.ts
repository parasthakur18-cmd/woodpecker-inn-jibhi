import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BookingInquiry {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, checkIn, checkOut, guests, message }: BookingInquiry = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !checkIn || !checkOut || !guests) {
      console.error("Missing required fields:", { name, email, phone, checkIn, checkOut, guests });
      throw new Error("Missing required fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      throw new Error("Invalid email format");
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 255 || phone.length > 20) {
      console.error("Field length exceeded");
      throw new Error("Field length exceeded");
    }

    console.log("Processing booking inquiry from:", name, email);

    // Create Supabase client with service role to bypass RLS for insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store the inquiry in the database
    const { data: dbData, error: dbError } = await supabase
      .from("booking_inquiries")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        check_in: checkIn,
        check_out: checkOut,
        guests: Number(guests),
        message: message?.trim() || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save inquiry");
    }

    console.log("Inquiry saved to database:", dbData.id);

    // Format dates for email
    const checkInDate = new Date(checkIn).toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    const checkOutDate = new Date(checkOut).toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Send email notification to the hotel
    const emailResponse = await resend.emails.send({
      from: "The Woodpecker Inn <onboarding@resend.dev>", // Use your verified domain
      to: ["thewoodpeckerinn@gmail.com"],
      reply_to: email,
      subject: `New Booking Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3D32; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #eee; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1E3D32; }
            .value { color: #555; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #8B5A2B; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
            .cta { display: inline-block; background: #1E3D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏔️ New Booking Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Guest Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${phone}">${phone}</a></span>
              </div>
              <div class="field">
                <span class="label">Check-in:</span>
                <span class="value">${checkInDate}</span>
              </div>
              <div class="field">
                <span class="label">Check-out:</span>
                <span class="value">${checkOutDate}</span>
              </div>
              <div class="field">
                <span class="label">Number of Guests:</span>
                <span class="value">${guests}</span>
              </div>
              ${message ? `
              <div class="message-box">
                <span class="label">Special Requests:</span>
                <p class="value">${message}</p>
              </div>
              ` : ''}
              <a href="https://wa.me/${phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(name)},%20thank%20you%20for%20your%20booking%20inquiry%20at%20The%20Woodpecker%20Inn!" class="cta">
                Reply via WhatsApp
              </a>
            </div>
            <div class="footer">
              <p>The Woodpecker Inn, Jibhi Valley</p>
              <p>Inquiry ID: ${dbData.id}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the guest
    await resend.emails.send({
      from: "The Woodpecker Inn <onboarding@resend.dev>",
      to: [email],
      subject: "We received your booking inquiry - The Woodpecker Inn",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3D32; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #eee; }
            .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏔️ Thank You, ${name}!</h1>
            </div>
            <div class="content">
              <p>We've received your booking inquiry for The Woodpecker Inn and are excited to help plan your mountain getaway!</p>
              
              <div class="highlight">
                <p><strong>Your Inquiry Details:</strong></p>
                <p>📅 Check-in: ${checkInDate}</p>
                <p>📅 Check-out: ${checkOutDate}</p>
                <p>👥 Guests: ${guests}</p>
              </div>
              
              <p>Our team will review your request and get back to you within 24 hours with availability and pricing details.</p>
              
              <p>In the meantime, feel free to reach out:</p>
              <ul>
                <li>📞 Call us: <a href="tel:+919317224562">+91 93172 24562</a></li>
                <li>💬 WhatsApp: <a href="https://wa.me/919317224562">Chat with us</a></li>
              </ul>
              
              <p>We look forward to hosting you in the beautiful Jibhi Valley!</p>
              
              <p>Warm regards,<br><strong>The Woodpecker Inn Team</strong></p>
            </div>
            <div class="footer">
              <p>The Woodpecker Inn | Jibhi Valley, Himachal Pradesh</p>
              <p>📍 <a href="https://maps.google.com/?q=Jibhi,+Himachal+Pradesh">View on Map</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent to guest:", email);

    return new Response(
      JSON.stringify({ success: true, inquiryId: dbData.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
