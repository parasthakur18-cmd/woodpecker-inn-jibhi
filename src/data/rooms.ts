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
  gallery?: string[];
  inventory: number;
  inventoryLabel: string;
  capacity: string;
  bedType: string;
  size?: string;
  startingPrice: string;
  badges: string[];
  features: string[];
};

export const rooms: Room[] = [
  {
    slug: "deluxe-double-balcony",
    name: "Deluxe Double Room with Balcony",
    tagline: "Our most-loved room — wooden warmth and a private balcony",
    description:
      "A beautifully finished double room with handcrafted wooden interiors and a private balcony opening onto the pine-covered mountains.",
    image: roomLuxury,
    inventory: 4,
    inventoryLabel: "4 Rooms",
    capacity: "2 Guests",
    bedType: "Double Bed",
    size: "260 sq ft",
    startingPrice: "₹3,499",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Double bed", "Mountain view", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "double-balcony",
    name: "Double Room with Balcony",
    tagline: "Comfortable double room with your own balcony",
    description:
      "A cozy double room with a private balcony to soak in the pine-scented air and mountain silence.",
    image: duplexRoom.url,
    inventory: 2,
    inventoryLabel: "2 Rooms",
    capacity: "2 Guests",
    bedType: "Double Bed",
    size: "240 sq ft",
    startingPrice: "₹2,899",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Double bed", "Mountain view", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "king-balcony",
    name: "King Room with Balcony",
    tagline: "Signature king room with the best view in the house",
    description:
      "Our most sought-after room. A king bed faces the mountains and a private balcony frames the entire Jibhi valley.",
    image: roomValley,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Guests",
    bedType: "King Bed",
    size: "320 sq ft",
    startingPrice: "₹4,499",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Panoramic mountain view", "King bed", "Private balcony", "Room heater", "Complimentary breakfast"],
  },
  {
    slug: "superior-queen",
    name: "Superior Queen Room",
    tagline: "Refined comfort with a queen bed",
    description:
      "A quiet, well-appointed room with a comfortable queen bed and a large window letting in the mountain light.",
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
    name: "Queen Room with Balcony",
    tagline: "Queen bed with your own private balcony",
    description:
      "A cozy queen room with a private balcony to enjoy slow mornings and a cup of chai in the mountains.",
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
    slug: "classic-quadruple",
    name: "Classic Quadruple Room",
    tagline: "Spacious room made for families and small groups",
    description:
      "Extra floor space and four beds for families or groups of friends exploring Jibhi together.",
    image: roomFamily,
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "4 Guests",
    bedType: "4 Beds",
    size: "400 sq ft",
    startingPrice: "₹3,499",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Four beds", "Extra floor space", "Mountain view", "Complimentary breakfast for all"],
  },
  {
    slug: "mixed-dorm",
    name: "Bed in 6-Bed Mixed Dormitory",
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
    name: "Bed in 4-Bed Female Dormitory",
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
