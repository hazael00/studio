
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
  technicalSheetPdfUrl?: string; // Ficha técnica general de la pista
  basicSetupGuidePdfUrl?: string; // Guía de setup básica y gratuita
  advancedSetupGuidePdfUrl?: string; // Guía de setup avanzada (potencialmente de pago)
  advancedPdfPrice?: number; // Precio en USD para la guía avanzada, ej: 1 para $1.00

  // Campos anteriores, pueden ser deprecados o mapeados a los nuevos
  setupGuidePdfUrl?: string; // Se podría usar como basicSetupGuidePdfUrl si no hay otro
  strategyGuidePdfUrl?: string; // Podría ser otra guía básica o avanzada

  layoutImageUrl?: string; // Placeholder para imagen del trazado
  layoutImageHint?: string; // Placeholder
  features?: string[]; // Características de la pista, ej: "Homologada FIA", "Iluminación Nocturna"
}
