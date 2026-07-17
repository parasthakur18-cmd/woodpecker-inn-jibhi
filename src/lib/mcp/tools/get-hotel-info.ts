import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const HOTEL_INFO = {
  name: "The Woodpecker Inn",
  location: "VPO Jibhi, Gadagushaini, Himachal Pradesh 175123, India",
  phone: "+91 93172 24562",
  whatsapp: "+91 93172 24562",
  email: "support@thewoodpeckerinn.in",
  website: "https://www.thewoodpeckerinn.in",
  instagram: "https://www.instagram.com/thewoodpeckerinnjibhi/",
  rooms: [
    "Deluxe Double with Balcony",
    "King Room with Balcony",
    "Queen Room with Balcony",
    "Double Room with Balcony",
    "Standard Double",
    "Classic Quadruple",
    "Mixed Dorm",
    "Female Dorm",
  ],
  amenities: [
    "In-house cafe",
    "Pet-friendly",
    "Free Wi-Fi",
    "Valley views",
    "24/7 support",
  ],
  positioning:
    "Boutique mountain retreat in Jibhi Valley, Himachal Pradesh — designed for digital nomads and luxury travelers.",
};

export default defineTool({
  name: "get_hotel_info",
  title: "Get hotel info",
  description:
    "Returns The Woodpecker Inn's location, contact details, room types, and amenities.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(HOTEL_INFO, null, 2) }],
    structuredContent: HOTEL_INFO,
  }),
});
