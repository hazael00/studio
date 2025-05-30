
import { PageHeader } from '@/components/ui/page-header';
import { MapComponent } from '@/components/karting-hub/map-component';
import { TrackCard } from '@/components/karting-hub/track-card';
import type { Track } from '@/types/karting';
import { MapPinned, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Datos de ejemplo para las pistas. Eventualmente, esto vendrá de una base de datos.
const tracksData: Track[] = [
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
    setupGuidePdfUrl: "#", // Placeholder
    strategyGuidePdfUrl: "#", // Placeholder
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout simple"
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
    setupGuidePdfUrl: "#",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "track layout complex"
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
    layoutImageHint: "temporary track layout"
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
    strategyGuidePdfUrl: "#",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "professional track layout"
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
    setupGuidePdfUrl: "#",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "modern track layout"
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
    strategyGuidePdfUrl: "#",
    layoutImageUrl: "https://placehold.co/100x60.png",
    layoutImageHint: "uk track layout"
  },
];

export default function KartingHubPage() {
  // Lógica de filtrado y búsqueda se implementará aquí en el futuro.
  const filteredTracks = tracksData;

  return (
    <div>
      <PageHeader
        title="Karting Hub Global"
        description="Explora pistas de karting de todo el mundo. Encuentra detalles, configuraciones y más."
        icon={MapPinned}
      />

      {/* Sección de Filtros (Placeholder) */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="searchTrack" className="block text-sm font-medium text-muted-foreground mb-1">Buscar Pista</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="searchTrack" placeholder="Nombre de pista, ciudad..." className="pl-10" />
            </div>
          </div>
          <div>
            <label htmlFor="countryFilter" className="block text-sm font-medium text-muted-foreground mb-1">País</label>
            <Select>
              <SelectTrigger id="countryFilter">
                <SelectValue placeholder="Todos los países" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                <SelectItem value="mx">México</SelectItem>
                <SelectItem value="it">Italia</SelectItem>
                <SelectItem value="us">USA</SelectItem>
                <SelectItem value="be">Bélgica</SelectItem>
                <SelectItem value="uk">Reino Unido</SelectItem>
                {/* ... más países ... */}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="featureFilter" className="block text-sm font-medium text-muted-foreground mb-1">Características</label>
            <Select>
              <SelectTrigger id="featureFilter">
                <SelectValue placeholder="Cualquier característica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquiera</SelectItem>
                <SelectItem value="homologated">Homologada FIA</SelectItem>
                <SelectItem value="night_lights">Iluminación Nocturna</SelectItem>
                <SelectItem value="rental_karts">Karts de Renta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Aplicar Filtros
          </Button>
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
