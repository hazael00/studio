
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  MapPin, ExternalLink, FileText, Download, ShoppingCart, CalendarDays, Users, 
  Settings, ArrowLeft, Building, ParkingCircle, Lightbulb, Utensils, 
  Camera, Video, Trophy as TrophyIcon, WebcamIcon 
} from 'lucide-react';

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

  const hasAnyPdfResource = resourceItems.some(item => item.url && item.url !== "#");

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
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><strong>Longitud:</strong> {track.length}</div>
              <div><strong>Curvas:</strong> {track.corners}</div>
              {track.website && (
                <div className="col-span-1 sm:col-span-2">
                  <strong>Sitio Web:</strong>{' '}
                  <Button variant="link" asChild className="p-0 h-auto">
                    <a href={track.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {track.website} <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
              {track.webcamUrl && (
                 <div className="col-span-1 sm:col-span-2">
                    <Button variant="outline" asChild>
                      <a href={track.webcamUrl} target="_blank" rel="noopener noreferrer">
                        <WebcamIcon className="mr-2 h-4 w-4" /> Ver Webcam en Vivo
                      </a>
                    </Button>
                  </div>
              )}
            </CardContent>
          </Card>

          {track.features && track.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Características y Servicios</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {track.features.map(feature => (
                  <Badge key={feature} variant="secondary">{feature}</Badge>
                ))}
              </CardContent>
            </Card>
          )}

          {track.galleryImageUrls && track.galleryImageUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Camera /> Galería de Imágenes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {track.galleryImageUrls.map((url, index) => (
                  <div key={index} className="aspect-square relative rounded-md overflow-hidden shadow-md">
                    <Image 
                      src={url} 
                      alt={`Galería ${track.name} ${index + 1}`} 
                      fill
                      style={{objectFit: 'cover'}}
                      data-ai-hint={track.galleryImageHints?.[index] || "track photo"}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          
          {track.videoUrls && track.videoUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video /> Videos Destacados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {track.videoUrls.map((url, index) => (
                  <div key={index} className="p-2 border rounded-md">
                     <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm">
                       <ExternalLink className="h-4 w-4" /> Ver Video {index + 1} (Ej: {url.includes("youtube") ? "YouTube" : "Enlace Externo"})
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {track.lapRecords && track.lapRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrophyIcon /> Récords de Vuelta (Ejemplo)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Tiempo</TableHead>
                      <TableHead>Piloto</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {track.lapRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.category}</TableCell>
                        <TableCell className="font-mono">{record.time}</TableCell>
                        <TableCell>{record.driver}</TableCell>
                        <TableCell>{record.date || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
              {hasAnyPdfResource ? (
                resourceItems.map((item) => {
                  const isValidUrl = item.url && item.url !== "#";
                  if (!isValidUrl && !item.isFree && typeof item.price !== 'number') return null;

                  return (
                    <div key={item.label} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md ${isValidUrl && !item.isFree ? 'bg-accent/10 border border-accent' : 'bg-muted/50'}`}>
                      <div className="flex items-center mb-2 sm:mb-0">
                        <FileText className={`mr-2 h-5 w-5 ${isValidUrl && !item.isFree ? 'text-accent' : 'text-primary'}`} />
                        <div>
                            <span>{item.label}</span>
                            {!item.isFree && isValidUrl && typeof item.price === 'number' && (
                            <span className="block sm:inline ml-0 sm:ml-2 text-xs font-semibold text-accent">
                                (${item.price.toFixed(2)} USD)
                            </span>
                            )}
                        </div>
                      </div>
                      {isValidUrl ? (
                        item.isFree ? (
                          <Button size="sm" asChild className="w-full sm:w-auto">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" /> Descargar
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="default" className="bg-accent hover:bg-accent/90 w-full sm:w-auto" disabled>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Comprar Guía
                          </Button>
                        )
                      ) : (
                        <Badge variant="outline" className="w-full sm:w-auto text-center py-1.5 px-3 justify-center">No disponible</Badge>
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
              <CardTitle>Servicios en Pista</CardTitle>
              <CardDescription>Reserva tu tanda, renta karts o infórmate sobre eventos (Próximamente).</CardDescription>
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
