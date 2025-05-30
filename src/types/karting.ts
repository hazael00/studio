
export interface Track {
  id: string;
  name: string;
  location: string; // e.g., "Ciudad, País"
  countryCode: string; // e.g., "MX", "IT", "US" (para banderas o marcadores)
  length: string; // e.g., "1.2 km"
  corners: number;
  description: string;
  imageUrl: string;
  imageHint: string;
  mapCoordinates?: { lat: number; lng: number }; // Opcional, para futura integración de mapa
  website?: string;
  contact?: string;
  
  technicalSheetPdfUrl?: string; 
  basicSetupGuidePdfUrl?: string; 
  advancedSetupGuidePdfUrl?: string; 
  advancedPdfPrice?: number; 

  layoutImageUrl?: string; 
  layoutImageHint?: string; 
  features?: string[]; 

  webcamUrl?: string;
  galleryImageUrls?: string[];
  galleryImageHints?: string[];
  videoUrls?: string[]; // e.g., YouTube links
  lapRecords?: { category: string; time: string; driver: string; date?: string; }[];
}
