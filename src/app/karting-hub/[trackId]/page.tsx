
"use client";

import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { initialTracksData } from '@/lib/karting-data';
import type { Track } from '@/types/karting';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, ExternalLink, FileText, Download, ShoppingCart, CalendarDays, Users, Settings, ArrowLeft, Building, ParkingCircle, Lightbulb, Utensils } from 'lucide-react';

const TrackDetailPage: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const trackId = params.trackId as string;

  const track: Track | undefined = initialTracksData.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="container mx-auto py-10 text-center">
        <PageHeader title="Pista no Encontrada" description="La pista que buscas no existe o ha sido movida." />
        <Button onClick={() => router.push('/karting-hub')}>Volver al Directorio</Button>
      </div>
    );
  }

  const resourceItems = [
    {
      label: "Ficha Técnica",
      url: track.technicalSheetPdfUrl,
      isFree: true,
    },
    {
      label: "Guía de Setup Básica",
      url: track.basicSetupGuidePdfUrl,
      isFree: true,
    },
    {
      label: "Guía de Setup Avanzada",
      url: track.advancedSetupGuidePdfUrl,
      isFree: false,
      price: track.advancedPdfPrice,
    },
  ];

  const hasAnyResource = resourceItems.some(item => item.url && item.url !== "#");

  return (
    <div className="container mx-auto">
      <Button variant="outline" onClick={() => router.push('/karting-hub')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Directorio
      </Button>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl mb-8">
        <Image
          src={track.imageUrl}
          alt={`Imagen de ${track.name}`}
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint={track.imageHint}
          priority
        />
        {track.layoutImageUrl && (
          <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-lg shadow-md border border-border">
            <Image
              src={track.layoutImageUrl}
              alt={`Layout de ${track.name}`}
              width={120}
              height={75}
              className="object-contain"
              data-ai-hint={track.layoutImageHint || "track layout"}
            />
          </div>
        )}
      </div>

      <PageHeader title={track.name} description={`${track.location} (${track.countryCode})`} icon={MapPin} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descripción General</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{track.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles Técnicos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Longitud:</strong> {track.length}</div>
              <div><strong>Curvas:</strong> {track.corners}</div>
              {track.website && (
                <div className="col-span-2">
                  <strong>Sitio Web:</strong>{' '}
                  <Button variant="link" asChild className="p-0 h-auto">
                    <a href={track.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {track.website} <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {track.features && track.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Características Destacadas</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {track.features.map(feature => (
                  <Badge key={feature} variant="secondary">{feature}</Badge>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Recursos Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hasAnyResource ? (
                resourceItems.map((item) => {
                  const isValidUrl = item.url && item.url !== "#";
                  if (!isValidUrl && !item.price) return null; // Skip if no URL and no price for advanced guide

                  return (
                    <div key={item.label} className={`flex justify-between items-center p-3 rounded-md ${isValidUrl && !item.isFree ? 'bg-accent/10 border border-accent' : 'bg-muted/50'}`}>
                      <div className="flex items-center">
                        <FileText className={`mr-2 h-5 w-5 ${isValidUrl && !item.isFree ? 'text-accent' : 'text-primary'}`} />
                        <span>{item.label}</span>
                        {!item.isFree && isValidUrl && typeof item.price === 'number' && (
                          <span className="ml-2 text-sm font-semibold text-accent">
                            (${item.price.toFixed(2)} USD)
                          </span>
                        )}
                      </div>
                      {isValidUrl ? (
                        item.isFree ? (
                          <Button size="sm" asChild>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" /> Descargar
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="default" className="bg-accent hover:bg-accent/90" disabled>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
                          </Button>
                        )
                      ) : (
                        <Badge variant="outline">No disponible</Badge>
                      )}
                    </div>
                  );
                })
              ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">No hay recursos PDF específicos para esta pista por el momento.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Servicios en Pista (Próximamente)</CardTitle>
              <CardDescription>Reserva tu tanda, renta karts o infórmate sobre eventos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" disabled>
                <CalendarDays className="mr-2 h-4 w-4" /> Reservar Pista
              </Button>
              <Button className="w-full" variant="outline" disabled>
                <Users className="mr-2 h-4 w-4" /> Rentar Karts
              </Button>
               <Button className="w-full" variant="outline" disabled>
                <Building className="mr-2 h-4 w-4" /> Ver Próximos Eventos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackDetailPage;
