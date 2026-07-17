import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "create_booking_inquiry",
  title: "Create a booking inquiry",
  description:
    "Submit a new booking inquiry for The Woodpecker Inn on behalf of the signed-in user. Staff will follow up via email/WhatsApp.",
  inputSchema: {
    name: z.string().trim().min(1).describe("Guest full name"),
    phone: z.string().trim().min(6).describe("Contact phone with country code"),
    checkIn: z.string().describe("Check-in date, YYYY-MM-DD"),
    checkOut: z.string().describe("Check-out date, YYYY-MM-DD"),
    guests: z.number().int().min(1).max(20).describe("Number of guests"),
    message: z.string().trim().optional().describe("Special requests, optional"),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ name, phone, checkIn, checkOut, guests, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return {
        content: [{ type: "text", text: "No email on the signed-in user" }],
        isError: true,
      };
    }

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
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

    if (error) {
      return {
        content: [{ type: "text", text: `Failed to create inquiry: ${error.message}` }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Inquiry received. Reference: ${data.id}. The team will contact ${email} within 24 hours.`,
        },
      ],
      structuredContent: { inquiry: data },
    };
  },
});
