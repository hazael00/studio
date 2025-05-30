
export interface Part {
  id: string;
  name: string;
  description: string;
  category: 'Engine' | 'Chassis' | 'Tires' | 'Brakes' | 'Transmission' | 'Electronics' | 'Bodywork' | 'Other';
  brand: string;
  partNumber?: string; // Added
  priceRange?: string; // e.g., "$100 - $150" or "Consult"
  imageUrl: string;
  imageHint: string; // For Unsplash search, e.g., "kart engine"
  status: 'Available' | 'Discontinued' | 'Pre-Order'; // Added
  compatibilityInfo?: string; // Textual description of compatibility
  technicalSpecs?: Record<string, string>; // e.g., { "Weight": "5kg", "Material": "Aluminum" }
  supplierIds?: string[]; // IDs of suppliers who offer this part
}

export interface Supplier {
  id: string;
  name: string;
  region: string; // e.g., "North America", "Europe", "Asia"
  country: string; // e.g., "USA", "Italy", "Mexico"
  city?: string;
  website?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  specialties?: string[]; // e.g., ["Rotax Engines", "Tony Kart Chassis"]
  logoUrl?: string;
  logoImageHint?: string;
  offersOnlineSales?: boolean;
  shippingInfo?: string; // Notes on shipping capabilities/regions
  rating?: number; // Added (1-5)
  servicesOffered?: string[]; // Added (e.g., "Engine Tuning", "Chassis Repair")
}

export interface SetupRecommendation {
  id: string;
  trackId: string; // Foreign key to Track
  conditionDescription: string; // e.g., "Sunny, Dry, 25°C", "Rainy, Wet, 15°C"
  notes?: string;
  partsSetup: Array<{
    partId: string; // Foreign key to Part
    setting: string; // e.g., "Carburetor: High 1.5 turns, Low 2 turns", "Tire Pressure: 0.8 bar"
  }>;
}
