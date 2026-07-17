import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getHotelInfo from "./tools/get-hotel-info";
import createBookingInquiry from "./tools/create-booking-inquiry";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "woodpecker-inn-mcp",
  title: "The Woodpecker Inn",
  version: "0.1.0",
  instructions:
    "Tools for The Woodpecker Inn (Jibhi, Himachal Pradesh). Use `get_hotel_info` for property details and `create_booking_inquiry` to submit a booking request on behalf of the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getHotelInfo, createBookingInquiry],
});
