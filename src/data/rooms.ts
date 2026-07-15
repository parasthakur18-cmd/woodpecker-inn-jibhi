import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";
import duplexRoom from "@/assets/duplex-room.jpg.asset.json";
import cafeView from "@/assets/cafe-view.jpg";

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  inventory: number;
  inventoryLabel: string; // "1 Room" | "6 Beds"
  capacity: string;
  bedType: string;
  size?: string;
  startingPrice: string;
  badges: string[]; // e.g. Mountain View, Balcony
  features: string[];
};

export const rooms: Room[] = [
  {
    slug: "king-mountain-view",
    name: "King Mountain View Room",
    tagline: "Signature suite with the best view in the house",
    description:
      "Our most sought-after room. Floor-to-ceiling windows frame the Jibhi valley, a king bed faces the mountains, and every morning starts with sunrise over the deodars.",
    image: roomValley,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Guests",
    bedType: "King Bed",
    size: "320 sq ft",
    startingPrice: "₹4,499",
    badges: ["Mountain View", "Balcony", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Panoramic mountain view", "King bed", "Private balcony", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "deluxe-mountain-view",
    name: "Deluxe Mountain View Room",
    tagline: "Warm wooden interiors with a full mountain frame",
    description:
      "Handcrafted pine interiors, a plush queen bed and wide windows opening onto the mountains. Our most-loved category for couples.",
    image: roomLuxury,
    inventory: 4,
    inventoryLabel: "4 Rooms",
    capacity: "2 Guests",
    bedType: "Queen Bed",
    size: "260 sq ft",
    startingPrice: "₹2,999",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Wooden interiors", "Queen bed", "Mountain-facing window", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "premium-balcony",
    name: "Premium Balcony Room",
    tagline: "Private balcony overlooking the pine forest",
    description:
      "Step straight from your bed onto a private balcony. The most spacious of our balcony rooms, designed for slow mornings with a cup of chai.",
    image: duplexRoom.url,
    inventory: 10,
    inventoryLabel: "10 Rooms",
    capacity: "2 Guests",
    bedType: "Queen Bed",
    size: "280 sq ft",
    startingPrice: "₹2,499",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Queen bed", "Forest view", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "superior-queen",
    name: "Superior Queen Room",
    tagline: "Refined comfort with a queen bed",
    description:
      "A quiet, well-appointed room with a comfortable queen bed and a large window letting in the mountain light. Ideal for a peaceful getaway.",
    image: roomFamily,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Guests",
    bedType: "Queen Bed",
    size: "240 sq ft",
    startingPrice: "₹2,299",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Queen bed", "Mountain view", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "queen-balcony",
    name: "Queen Balcony Room",
    tagline: "Queen bed with your own private balcony",
    description:
      "A cozy queen room with a private balcony to soak in the pine-scented air and mountain silence.",
    image: duplexRoom.url,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Guests",
    bedType: "Queen Bed",
    size: "250 sq ft",
    startingPrice: "₹2,699",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Queen bed", "Mountain view", "Complimentary breakfast"],
  },
  {
    slug: "standard-double",
    name: "Standard Double Room",
    tagline: "Simple, comfortable and easy on the wallet",
    description:
      "A clean, comfortable double room with all the essentials for a restful stay in the mountains.",
    image: roomLuxury,
    inventory: 2,
    inventoryLabel: "2 Rooms",
    capacity: "2 Guests",
    bedType: "Double Bed",
    size: "200 sq ft",
    startingPrice: "₹1,899",
    badges: ["Free Wi-Fi", "Attached Bathroom"],
    features: ["Double bed", "Attached bathroom", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "classic-family",
    name: "Classic Family Room",
    tagline: "Spacious room made for family trips",
    description:
      "Extra floor space, multiple beds and room for the kids to spread out. Perfect for families exploring Jibhi together.",
    image: roomFamily,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Adults + 2 Children",
    bedType: "1 King + 1 Twin",
    size: "400 sq ft",
    startingPrice: "₹3,499",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Multiple beds", "Extra floor space", "Mountain view", "Complimentary breakfast for all"],
  },
  {
    slug: "mixed-dorm",
    name: "Mixed Backpacker Dorm",
    tagline: "Social, budget-friendly & full of good stories",
    description:
      "Six cozy bunks in a mixed dorm, made for backpackers and solo travellers who love meeting new people.",
    image: cafeView,
    inventory: 6,
    inventoryLabel: "6 Beds",
    capacity: "1 Guest per bed",
    bedType: "Single Bunk",
    size: "6 beds shared",
    startingPrice: "₹599",
    badges: ["Free Wi-Fi", "Shared Bathroom", "Lockers"],
    features: ["6 bunk beds", "Personal locker", "Reading light", "Shared bathroom", "Community lounge"],
  },
  {
    slug: "female-dorm",
    name: "Female Dormitory",
    tagline: "Women-only dorm, safe and social",
    description:
      "A women-only dorm with 4 comfortable bunks — a safe, welcoming space for solo female travellers.",
    image: cafeView,
    inventory: 4,
    inventoryLabel: "4 Beds",
    capacity: "1 Guest per bed",
    bedType: "Single Bunk",
    size: "4 beds shared",
    startingPrice: "₹699",
    badges: ["Women Only", "Free Wi-Fi", "Shared Bathroom", "Lockers"],
    features: ["4 bunk beds", "Personal locker", "Reading light", "Shared bathroom", "Women-only floor"],
  },
];

export const getRoomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
