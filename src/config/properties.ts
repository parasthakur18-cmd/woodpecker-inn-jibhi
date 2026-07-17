// Property config — future-proof for multi-property scaling.
export interface PropertyConfig {
  propertyName: string;
  website: string;
  whatsappNumber: string; // digits only, with country code
  roomTypes: string[];
}

export const PROPERTIES: Record<string, PropertyConfig> = {
  woodpecker: {
    propertyName: "The Woodpecker Inn",
    website: "thewoodpeckerinn.in",
    whatsappNumber: "919317224562",
    roomTypes: [
      "Deluxe Double Room with Balcony",
      "King Room",
      "Queen Room with Balcony",
      "Classic Quad Room",
      "Standard Double Room",
      "Dormitory",
    ],
  },
  // forest-pinnacle: { ... },
  // blue-mont-sojha: { ... },
};

export const ACTIVE_PROPERTY: PropertyConfig = PROPERTIES.woodpecker;
