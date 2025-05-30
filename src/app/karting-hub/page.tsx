
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MapComponent } from '@/components/karting-hub/map-component';
import { TrackCard } from '@/components/karting-hub/track-card';
import type { Track } from '@/types/karting';
import { MapPinned, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTracksData: Track[] = [
  {
    id: "kn-mex",
    name: "Kartódromo KBR",
    location: "Ciudad de México, México",
    countryCode: "MX",
    length: "1.1 km",
    corners: 12,
    description: "Pista técnica y rápida, sede de campeonatos nacionales e internacionales. Excelente para desarrollar habilidades de manejo.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "karting track mexico",
    website: "https://www.kartodromokbr.com",
    setupGuidePdfUrl: "/pdf/kbr-setup-guide.pdf", // Updated
    strategyGuidePdfUrl: "#",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout simple",
    features: ["Homologada FIA", "Karts de Renta", "Tienda de Partes"]
  },
  {
    id: "sgk-ita",
    name: "South Garda Karting",
    location: "Lonato del Garda, Italia",
    countryCode: "IT",
    length: "1.2 km",
    corners: 10,
    description: "Una de las pistas más famosas del mundo, conocida por sus carreras de alto nivel y su desafiante trazado.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "south garda karting aerial",
    website: "https://www.southgardakarting.it",
    setupGuidePdfUrl: "/pdf/sgk-setup-guide.pdf", // Updated
    strategyGuidePdfUrl: "/pdf/sgk-strategy-guide.pdf", // Added
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout complex",
    features: ["Homologada FIA", "Restaurante", "Tienda de Partes"]
  },
  {
    id: "skusa-usa",
    name: "SKUSA SuperNationals Track (LVCC)",
    location: "Las Vegas, USA",
    countryCode: "US",
    length: "1.3 km", // Varies year to year
    corners: 14, // Varies
    description: "Pista temporal para el prestigioso evento SuperNationals. Rápida, exigente y con muros cercanos.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "las vegas karting race",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "temporary track layout",
    features: ["Evento Especial"],
    setupGuidePdfUrl: "#",
    strategyGuidePdfUrl: "#",
  },
  {
    id: "genk-bel",
    name: "Karting Genk",
    location: "Genk, Bélgica",
    countryCode: "BE",
    length: "1.36 km",
    corners: 15,
    description: "'Home of Champions'. Una pista de clase mundial que ha visto competir a muchas estrellas de F1.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "karting genk track",
    website: "https://www.kartinggenk.be",
    setupGuidePdfUrl: "#", 
    strategyGuidePdfUrl: "/pdf/genk-strategy-guide.pdf", // Updated
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "professional track layout",
    features: ["Homologada FIA", "Iluminación Nocturna", "Karts de Renta"]
  },
   {
    id: "adria-ita",
    name: "Adria Karting Raceway",
    location: "Adria, Italia",
    countryCode: "IT",
    length: "1.302 km",
    corners: 9,
    description: "Complejo moderno con instalaciones de primera, frecuentemente utilizado para eventos FIA Karting.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "adria karting raceway",
    website: "https://www.adriaraceway.com",
    setupGuidePdfUrl: "/pdf/adria-setup-guide.pdf", // Updated
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "modern track layout",
    features: ["Homologada FIA", "Restaurante"],
    strategyGuidePdfUrl: "#",
  },
  {
    id: "pf-int-uk",
    name: "PF International Kart Circuit",
    location: "Brandon, Reino Unido",
    countryCode: "UK",
    length: "1.382 km",
    corners: 14,
    description: "Una de las pistas más importantes del Reino Unido, sede de campeonatos mundiales y europeos.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "pf international karting",
    website: "https://tvkc.co.uk",
    strategyGuidePdfUrl: "/pdf/pfi-strategy-guide.pdf", // Updated
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "uk track layout",
    features: ["Homologada FIA", "Karts de Renta", "Tienda de Partes"],
    setupGuidePdfUrl: "#",
  },
  {
    id: "valencia-esp",
    name: "Kartódromo Internacional Lucas Guerrero",
    location: "Chiva, Valencia, España",
    countryCode: "ES",
    length: "1.428 km",
    corners: 16,
    description: "Pista moderna y versátil, sede de eventos internacionales y con excelentes instalaciones.",
    imageUrl: "https://placehold.co/400x250.png",
    imageHint: "karting valencia spain",
    website: "https://www.kartodromolucasguerrero.com/",
    features: ["Homologada FIA", "Karts de Renta", "Restaurante", "Iluminación Nocturna"],
    setupGuidePdfUrl: "#",
    strategyGuidePdfUrl: "#",
  }
];

const countryOptions = [
  { value: "all", label: "Todos los países" },
  { value: "MX", label: "México" },
  { value: "IT", label: "Italia" },
  { value: "US", label: "USA" },
  { value: "BE", label: "Bélgica" },
  { value: "UK", label: "Reino Unido" },
  { value: "ES", label: "España" },
];

const featureOptions = [
  { value: "all", label: "Cualquier característica" },
  { value: "Homologada FIA", label: "Homologada FIA" },
  { value: "Iluminación Nocturna", label: "Iluminación Nocturna" },
  { value: "Karts de Renta", label: "Karts de Renta" },
  { value: "Restaurante", label: "Restaurante" },
  { value: "Tienda de Partes", label: "Tienda de Partes" },
  { value: "Evento Especial", label: "Evento Especial" },
];


export default function KartingHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState('all');

  const filteredTracks = useMemo(() => {
    return initialTracksData.filter(track => {
      const matchesSearchTerm = searchTerm === '' ||
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = selectedCountry === 'all' || track.countryCode === selectedCountry;
      
      const matchesFeature = selectedFeature === 'all' || (track.features && track.features.includes(selectedFeature));

      return matchesSearchTerm && matchesCountry && matchesFeature;
    });
  }, [searchTerm, selectedCountry, selectedFeature]);

  return (
    <div>
      <PageHeader
        title="Karting Hub Global"
        description="Explora pistas de karting de todo el mundo. Encuentra detalles, configuraciones y más."
        icon={MapPinned}
      />

      <div className="mb-8 p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="searchTrack" className="block text-sm font-medium text-muted-foreground mb-1">Buscar Pista</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="searchTrack" 
                placeholder="Nombre de pista, ciudad..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="countryFilter" className="block text-sm font-medium text-muted-foreground mb-1">País</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger id="countryFilter">
                <SelectValue placeholder="Todos los países" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="featureFilter" className="block text-sm font-medium text-muted-foreground mb-1">Características</label>
            <Select value={selectedFeature} onValueChange={setSelectedFeature}>
              <SelectTrigger id="featureFilter">
                <SelectValue placeholder="Cualquier característica" />
              </SelectTrigger>
              <SelectContent>
                {featureOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <MapComponent tracks={filteredTracks} />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Directorio de Pistas ({filteredTracks.length})</h2>
      </div>
      
      {filteredTracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No se encontraron pistas con los filtros seleccionados.</p>
      )}
    </div>
  );
}
