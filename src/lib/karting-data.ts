
import type { Track } from '@/types/karting';

export const initialTracksData: Track[] = [
  {
    id: "kbr-mex",
    name: "Kartódromo KBR",
    location: "Ciudad de México, México",
    countryCode: "MX",
    length: "1.1 km",
    corners: 12,
    description: "Pista técnica y rápida, sede de campeonatos nacionales e internacionales. Excelente para desarrollar habilidades de manejo.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "karting track mexico",
    website: "https://www.kartodromokbr.com",
    technicalSheetPdfUrl: "/pdf/kbr-technical-sheet.pdf",
    basicSetupGuidePdfUrl: "/pdf/kbr-basic-setup.pdf",
    advancedSetupGuidePdfUrl: "/pdf/kbr-advanced-setup.pdf",
    advancedPdfPrice: 1.99,
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout simple",
    features: ["Homologada FIA", "Karts de Renta", "Tienda de Partes", "Escuela de Pilotos", "Restaurante"],
    webcamUrl: "https://www.example.com/kbr-webcam", // Example
    galleryImageUrls: [
      "https://placehold.co/400x300.png",
      "https://placehold.co/400x300.png",
      "https://placehold.co/400x300.png"
    ],
    galleryImageHints: ["track corner action", "paddock area", "kart race start"],
    videoUrls: ["https://www.youtube.com/watch?v=exampleKBR"],
    lapRecords: [
      { category: "Mini Max", time: "58.320s", driver: "S. Diaz", date: "2023-10-15" },
      { category: "Senior Max", time: "55.110s", driver: "J. Perez", date: "2023-11-01" }
    ]
  },
  {
    id: "sgk-ita",
    name: "South Garda Karting",
    location: "Lonato del Garda, Italia",
    countryCode: "IT",
    length: "1.2 km",
    corners: 10,
    description: "Una de las pistas más famosas del mundo, conocida por sus carreras de alto nivel y su desafiante trazado. Ha albergado múltiples campeonatos mundiales y europeos.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "south garda karting aerial",
    website: "https://www.southgardakarting.it",
    technicalSheetPdfUrl: "/pdf/sgk-technical-sheet.pdf",
    basicSetupGuidePdfUrl: "/pdf/sgk-basic-setup.pdf",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout complex",
    features: ["Homologada FIA", "Restaurante de Lujo", "Tienda de Partes Pro", "Eventos Internacionales", "Museo del Karting"],
    galleryImageUrls: [
      "https://placehold.co/400x300.png",
      "https://placehold.co/400x300.png",
    ],
    galleryImageHints: ["italian karting track", "world championship event"],
    videoUrls: ["https://www.youtube.com/watch?v=exampleSGK1", "https://www.youtube.com/watch?v=exampleSGK2"],
    lapRecords: [
      { category: "OKJ", time: "47.890s", driver: "A. Antonelli", date: "2022-07-20" },
      { category: "KZ2", time: "45.995s", driver: "P. Hiltbrand", date: "2023-03-10" }
    ]
  },
  {
    id: "skusa-usa",
    name: "SKUSA SuperNationals Track (LVCC)",
    location: "Las Vegas, USA",
    countryCode: "US",
    length: "1.3 km", 
    corners: 14, 
    description: "Pista temporal icónica montada en el Las Vegas Convention Center para el prestigioso evento SuperNationals. Rápida, exigente y con muros cercanos.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "las vegas karting race",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "temporary track layout",
    features: ["Evento Especial Anual", "Ubicación Urbana Única", "Competición de Estrellas"],
    // No PDFs for temporary track generally
  },
  {
    id: "genk-bel",
    name: "Karting Genk",
    location: "Genk, Bélgica",
    countryCode: "BE",
    length: "1.36 km",
    corners: 15,
    description: "'Home of Champions'. Una pista de clase mundial que ha visto competir a muchas estrellas de F1 en sus inicios. Ofrece un trazado variado y técnico.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "karting genk track",
    website: "https://www.kartinggenk.be",
    basicSetupGuidePdfUrl: "/pdf/genk-basic-setup.pdf",
    advancedSetupGuidePdfUrl: "/pdf/genk-advanced-setup.pdf",
    advancedPdfPrice: 2.49,
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "professional track layout",
    features: ["Homologada FIA", "Iluminación Nocturna", "Karts de Renta", "Brasserie", "Escuela de Pilotos de Alto Nivel"],
    webcamUrl: "https://www.example.com/genk-webcam",
  },
   {
    id: "adria-ita",
    name: "Adria Karting Raceway",
    location: "Adria, Italia",
    countryCode: "IT",
    length: "1.302 km",
    corners: 9,
    description: "Complejo moderno con instalaciones de primera, frecuentemente utilizado para eventos FIA Karting y WSK. Pista rápida con buenas oportunidades de adelantamiento.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "adria karting raceway",
    website: "https://www.adriaraceway.com",
    technicalSheetPdfUrl: "/pdf/adria-technical-sheet.pdf",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "modern track layout",
    features: ["Homologada FIA", "Restaurante Panorámico", "Paddock Cubierto Extenso", "Hotel en el Circuito"],
    lapRecords: [
      { category: "OK", time: "48.050s", driver: "L. Travisanutto", date: "2021-05-15" }
    ]
  },
  {
    id: "pf-int-uk",
    name: "PF International Kart Circuit",
    location: "Brandon, Reino Unido",
    countryCode: "UK",
    length: "1.382 km",
    corners: 14,
    description: "Una de las pistas más importantes del Reino Unido, sede de campeonatos mundiales y europeos de la FIA. Conocida por su puente y su sección técnica.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "pf international karting",
    website: "https://tvkc.co.uk",
    basicSetupGuidePdfUrl: "/pdf/pfi-basic-setup.pdf",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "uk track layout",
    features: ["Homologada FIA", "Karts de Renta (Club)", "Tienda de Partes", "Puente Icónico", "Amplias Zonas Verdes"],
  },
  {
    id: "valencia-esp",
    name: "Kartódromo Internacional Lucas Guerrero",
    location: "Chiva, Valencia, España",
    countryCode: "ES",
    length: "1.428 km",
    corners: 16,
    description: "Pista moderna y versátil, sede de eventos internacionales y con excelentes instalaciones. Ofrece múltiples configuraciones de trazado.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "karting valencia spain",
    website: "https://www.kartodromolucasguerrero.com/",
    features: ["Homologada FIA", "Karts de Renta (Varias categorías)", "Restaurante con Terraza", "Iluminación Nocturna Total", "Múltiples Trazados Configurables", "Escuela de Karting"],
    advancedSetupGuidePdfUrl: "/pdf/valencia-advanced-setup.pdf",
    advancedPdfPrice: 0.99,
  }
];
