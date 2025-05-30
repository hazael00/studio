
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
  // Campos para PDFs descargables
  setupGuidePdfUrl?: string; // Placeholder
  strategyGuidePdfUrl?: string; // Placeholder
  layoutImageUrl?: string; // Placeholder para imagen del trazado
  layoutImageHint?: string; // Placeholder
  features?: string[]; // Características de la pista, ej: "Homologada FIA", "Iluminación Nocturna"
}

