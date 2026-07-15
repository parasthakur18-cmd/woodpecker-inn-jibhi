import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";
import duplexRoom from "@/assets/duplex-room.jpg.asset.json";
import cafeView from "@/assets/cafe-view.jpg";
import deluxeHero from "@/assets/deluxe-double-balcony-hero.png.asset.json";
import deluxe2 from "@/assets/deluxe-double-balcony-2.png.asset.json";
import deluxe3 from "@/assets/deluxe-double-balcony-3.png.asset.json";
import doubleHero from "@/assets/double-balcony-hero.png.asset.json";
import double2 from "@/assets/double-balcony-2.png.asset.json";
import kingHero from "@/assets/king-balcony-hero.png.asset.json";
import king2 from "@/assets/king-balcony-2.png.asset.json";
import queenBalconyHero from "@/assets/queen-balcony-hero.png.asset.json";
import quadHero from "@/assets/classic-quadruple-hero.png.asset.json";
import quad2 from "@/assets/classic-quadruple-2.png.asset.json";
import mixedDormHero from "@/assets/mixed-dorm-hero.png.asset.json";
import standardDoubleHero from "@/assets/standard-double-hero.png.asset.json";

export type RoomHighlight = { icon: string; label: string };

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  image: string;
  heroImage?: string;
  gallery?: string[];
  inventory: number;
  inventoryLabel: string;
  capacity: string;
  bedType: string;
  size?: string;
  startingPrice: string;
  badges: string[];
  features: string[];
  highlights?: RoomHighlight[];
  amenities?: string[];
  checkIn?: string;
  checkOut?: string;
};

const defaultHighlights: RoomHighlight[] = [
  { icon: "users", label: "Up to 2 Guests" },
  { icon: "bed", label: "Double Bed" },
  { icon: "mountain", label: "Mountain & Valley View" },
  { icon: "tree", label: "Private Balcony" },
  { icon: "wifi", label: "Free High-Speed Wi-Fi" },
  { icon: "tv", label: "Smart TV" },
  { icon: "bath", label: "Attached Private Bathroom" },
  { icon: "flame", label: "24×7 Hot & Cold Water" },
];

const defaultAmenities = [
  "Comfortable Double Bed",
  "Private Balcony",
  "Mountain View",
  "Smart TV",
  "Attached Bathroom",
  "Western Toilet",
  "24×7 Hot & Cold Water",
  "Complimentary High-Speed Wi-Fi",
  "Fresh Linen & Towels",
  "Complimentary Drinking Water",
  "Charging Points",
  "Daily Housekeeping",
  "Large Windows with Natural Light",
];

export const rooms: Room[] = [
  {
    slug: "deluxe-double-balcony",
    name: "Deluxe Double Room with Balcony",
    tagline: "Wake up to breathtaking mountain views from your private balcony.",
    description:
      "A beautifully finished double room with handcrafted wooden interiors and a private balcony opening onto the pine-covered mountains.",
    longDescription:
      "Experience the beauty of Jibhi from the comfort of our Deluxe Double Room with Balcony. Thoughtfully designed for couples and travelers seeking a peaceful mountain escape, this room offers a comfortable double bed, a private balcony with breathtaking mountain views, modern amenities, and a relaxing atmosphere surrounded by nature.",
    image: deluxeHero.url,
    heroImage: deluxeHero.url,
    gallery: [deluxe2.url, deluxe3.url],
    inventory: 4,
    inventoryLabel: "4 Rooms",
    capacity: "2 Guests",
    bedType: "1 Double Bed",
    size: "260 sq ft",
    startingPrice: "₹3,499",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Double bed", "Mountain view", "Room heater", "Complimentary breakfast"],
    highlights: defaultHighlights,
    amenities: defaultAmenities,
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "double-balcony",
    name: "Double Room with Balcony",
    tagline:
      "Enjoy a comfortable mountain stay with a private balcony overlooking the beautiful surroundings of Jibhi.",
    description:
      "A cozy double room with a private balcony to soak in the pine-scented air and mountain silence.",
    longDescription:
      "Relax in our Double Room with Balcony, thoughtfully designed for couples and travelers looking for a peaceful stay in the heart of Jibhi. Enjoy the comfort of a spacious double bed, a private balcony with refreshing mountain views, modern amenities, and a cozy atmosphere that makes every stay memorable.",
    image: doubleHero.url,
    heroImage: doubleHero.url,
    gallery: [double2.url],
    inventory: 2,
    inventoryLabel: "2 Rooms",
    capacity: "2 Guests",
    bedType: "1 Double Bed",
    size: "240 sq ft",
    startingPrice: "₹2,899",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Private balcony", "Double bed", "Mountain view", "Room heater", "Complimentary breakfast"],
    highlights: defaultHighlights,
    amenities: defaultAmenities,
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "king-balcony",
    name: "King Room with Balcony",
    tagline:
      "Experience extra comfort with a spacious king-size bed and a private balcony overlooking the beautiful mountains of Jibhi.",
    description:
      "Our most sought-after room. A king bed faces the mountains and a private balcony frames the entire Jibhi valley.",
    longDescription:
      "Our King Room with Balcony offers extra space, comfort, and stunning mountain views, making it an ideal choice for couples seeking a peaceful getaway in Jibhi. Relax on your private balcony, enjoy the fresh mountain air, and unwind in a cozy room designed for a memorable stay.",
    image: kingHero.url,
    heroImage: kingHero.url,
    gallery: [king2.url],
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "2 Guests",
    bedType: "1 King Size Bed",
    size: "320 sq ft",
    startingPrice: "₹4,499",
    badges: ["Balcony", "Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Panoramic mountain view", "King bed", "Private balcony", "Room heater", "Complimentary breakfast"],
    highlights: [
      { icon: "users", label: "Up to 2 Guests" },
      { icon: "bed", label: "King Size Bed" },
      { icon: "tree", label: "Private Balcony" },
      { icon: "mountain", label: "Mountain & Valley View" },
      { icon: "wifi", label: "Complimentary High-Speed Wi-Fi" },
      { icon: "bath", label: "Attached Private Bathroom" },
      { icon: "flame", label: "24×7 Hot & Cold Water" },
    ],
    amenities: [
      "King Size Bed",
      "Private Balcony",
      "Mountain & Valley View",
      "Attached Private Bathroom",
      "Western Toilet",
      "24×7 Hot & Cold Water",
      "Complimentary High-Speed Wi-Fi",
      "Fresh Linen & Towels",
      "Complimentary Drinking Water",
      "Charging Points",
      "Daily Housekeeping",
      "Large Windows with Natural Light",
    ],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "queen-balcony",
    name: "Queen Room with Balcony",
    tagline: "Queen bed with your own private balcony",
    description:
      "A cozy queen room with a private balcony to enjoy slow mornings and a cup of chai in the mountains.",
    image: queenBalconyHero.url,
    heroImage: queenBalconyHero.url,
    gallery: [],
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
    tagline: "A comfortable and affordable stay surrounded by the peaceful beauty of Jibhi.",
    description:
      "A clean, comfortable double room with all the essentials for a restful stay in the mountains.",
    longDescription:
      "Our Standard Double Room offers a comfortable and relaxing stay for couples and travelers looking to experience the natural beauty of Jibhi. Thoughtfully designed with all the essential amenities, this room provides a peaceful retreat after a day of exploring the mountains.",
    image: standardDoubleHero.url,
    heroImage: standardDoubleHero.url,
    gallery: [],
    inventory: 2,
    inventoryLabel: "2 Rooms",
    capacity: "2 Guests",
    bedType: "1 Double Bed",
    size: "200 sq ft",
    startingPrice: "₹1,899",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Double bed", "Attached bathroom", "Room heater", "Complimentary breakfast"],
    highlights: [
      { icon: "users", label: "Up to 2 Guests" },
      { icon: "bed", label: "Double Bed" },
      { icon: "mountain", label: "Mountain View" },
      { icon: "wifi", label: "Complimentary High-Speed Wi-Fi" },
      { icon: "bath", label: "Attached Private Bathroom" },
      { icon: "flame", label: "24×7 Hot & Cold Water" },
    ],
    amenities: [
      "Double Bed",
      "Mountain View",
      "Attached Private Bathroom",
      "Western Toilet",
      "24×7 Hot & Cold Water",
      "Complimentary High-Speed Wi-Fi",
      "Fresh Linen & Towels",
      "Complimentary Drinking Water",
      "Charging Points",
      "Daily Housekeeping",
      "Large Windows with Natural Light",
    ],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "classic-quadruple",
    name: "Classic Quadruple Room",
    tagline:
      "Spacious and comfortable accommodation, perfect for families and small groups looking to enjoy a memorable stay in the beautiful mountains of Jibhi.",
    description:
      "Extra floor space and multiple beds for families or groups of friends exploring Jibhi together.",
    longDescription:
      "Our Classic Quadruple Room is designed for families and small groups who want to stay together while enjoying the peaceful surroundings of Jibhi. With comfortable bedding, ample space, beautiful mountain views, and essential modern amenities, it offers a relaxing and memorable mountain stay.",
    image: quadHero.url,
    heroImage: quadHero.url,
    gallery: [quad2.url],
    inventory: 1,
    inventoryLabel: "1 Room",
    capacity: "4 Guests",
    bedType: "Multiple Beds",
    size: "400 sq ft",
    startingPrice: "₹3,499",
    badges: ["Mountain View", "Free Wi-Fi", "Attached Bathroom"],
    features: ["Multiple beds", "Extra floor space", "Mountain & valley view", "Complimentary breakfast for all"],
    highlights: [
      { icon: "users", label: "Up to 4 Guests" },
      { icon: "bed", label: "Comfortable Beds" },
      { icon: "mountain", label: "Mountain & Valley View" },
      { icon: "wifi", label: "Complimentary High-Speed Wi-Fi" },
      { icon: "bath", label: "Attached Private Bathroom" },
      { icon: "flame", label: "24×7 Hot & Cold Water" },
    ],
    amenities: [
      "Comfortable Beds",
      "Spacious Room",
      "Mountain & Valley View",
      "Attached Private Bathroom",
      "Western Toilet",
      "24×7 Hot & Cold Water",
      "Complimentary High-Speed Wi-Fi",
      "Fresh Linen & Towels",
      "Complimentary Drinking Water",
      "Charging Points",
      "Daily Housekeeping",
      "Large Windows with Natural Light",
    ],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "mixed-dorm",
    name: "Bed in 6-Bed Mixed Dormitory",
    tagline:
      "Comfortable, affordable, and perfect for solo travelers and backpackers exploring the beautiful mountains of Jibhi.",
    description:
      "Six cozy bunks in a mixed dorm, made for backpackers and solo travellers who love meeting new people.",
    longDescription:
      "Stay in our comfortable 6-Bed Mixed Dormitory, designed for solo travelers, backpackers, and adventure seekers. Enjoy a clean and welcoming shared space, comfortable bedding, beautiful mountain surroundings, and a friendly atmosphere that makes it easy to meet fellow travelers while exploring Jibhi.",
    image: mixedDormHero.url,
    heroImage: mixedDormHero.url,
    gallery: [],
    inventory: 6,
    inventoryLabel: "6 Beds",
    capacity: "1 Guest per Bed",
    bedType: "1 Bed in a 6-Bed Shared Dormitory",
    size: "Shared Dormitory",
    startingPrice: "₹599",
    badges: ["Free Wi-Fi", "Shared Bathroom", "Mountain View"],
    features: ["6 bunk beds", "Personal locker", "Reading light", "Shared bathroom", "Community lounge"],
    highlights: [
      { icon: "users", label: "1 Guest" },
      { icon: "bed", label: "1 Bed in a 6-Bed Shared Dormitory" },
      { icon: "mountain", label: "Mountain View" },
      { icon: "wifi", label: "Complimentary High-Speed Wi-Fi" },
      { icon: "bath", label: "Shared Bathroom" },
      { icon: "flame", label: "24×7 Hot & Cold Water" },
    ],
    amenities: [
      "Comfortable Single Bed",
      "Shared Dormitory",
      "Mountain View",
      "Shared Bathroom",
      "Western Toilet",
      "24×7 Hot & Cold Water",
      "Complimentary High-Speed Wi-Fi",
      "Fresh Linen",
      "Charging Point",
      "Daily Housekeeping",
      "Large Windows with Natural Light",
    ],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
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
