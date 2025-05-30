
"use client";

import type { Track } from '@/types/karting';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  tracks: Track[];
}

export function MapComponent({ tracks }: MapComponentProps) {
  // Por ahora, este componente es un marcador de posición.
  // La integración real del mapa (Google Maps, Leaflet, etc.) es más compleja.
  // Podríamos mostrar marcadores simples si tuviéramos coordenadas.
  return (
    <Card className="shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          Mapa Global de Pistas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
          <Image
            src="https://placehold.co/1200x600.png"
            alt="Mapa Global de Pistas Placeholder"
            layout="fill"
            objectFit="cover"
            data-ai-hint="world map illustration"
          />
          <p className="absolute text-center text-foreground/80 p-4 bg-background/50 rounded-md">
            Visualización de mapa interactivo próximamente.
          </p>
        </div>
        {tracks.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {tracks.slice(0,10).map(track => (
              <div key={track.id} className="p-2 bg-secondary/50 rounded-md text-center truncate" title={track.name}>
                <MapPin className="w-3 h-3 inline-block mr-1 text-primary"/> {track.name}
              </div>
            ))}
            {tracks.length > 10 && <div className="p-2 bg-secondary/50 rounded-md text-center">... y {tracks.length -10} más</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
