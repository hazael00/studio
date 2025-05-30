
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MapComponent } from '@/components/karting-hub/map-component';
import { TrackCard } from '@/components/karting-hub/track-card';
import { initialTracksData } from '@/lib/karting-data'; // Import from new location
import type { Track } from '@/types/karting';
import { MapPinned, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  { value: "Evento Especial Anual", label: "Evento Especial Anual" },
  { value: "Escuela de Pilotos", label: "Escuela de Pilotos" },
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
        description="Explora pistas de karting de todo el mundo. Encuentra detalles, recursos y más."
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
