
"use client";

import type { Track } from '@/types/karting';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MapPin, Flag, UserCheck, MoreVertical, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const { toast } = useToast();

  const handleReportData = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    toast({
      title: "Reportar Datos Incorrectos",
      description: `Funcionalidad para reportar datos incorrectos para la pista "${track.name}" próximamente.`,
    });
  };

  const handleClaimTrack = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    toast({
      title: "Reclamar Pista",
      description: `Funcionalidad para reclamar la propiedad de la pista "${track.name}" próximamente.`,
    });
  };

  return (
    <Link href={`/karting-hub/${track.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="flex flex-col overflow-hidden shadow-lg h-full group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
          <div className="relative">
            <Image
              src={track.imageUrl}
              alt={track.name}
              width={400}
              height={250}
              className="object-cover w-full h-56"
              data-ai-hint={track.imageHint}
            />
            {track.layoutImageUrl && (
                <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-md shadow-md">
                    <Image
                        src={track.layoutImageUrl}
                        alt={`${track.name} layout`}
                        width={80}
                        height={50}
                        className="object-contain"
                        data-ai-hint={track.layoutImageHint || "track layout"}
                    />
                </div>
            )}
          </div>
          <CardHeader className="flex-grow pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{track.name}</CardTitle>
                <CardDescription className="text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" /> {track.location} ({track.countryCode})
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Más acciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleReportData}>
                    <Flag className="mr-2 h-4 w-4" />
                    Reportar Datos Incorrectos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleClaimTrack}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Reclamar esta Pista
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm pt-2 flex-grow">
            <p className="text-muted-foreground h-16 overflow-hidden text-ellipsis">{track.description}</p>
            <div className="flex justify-between text-foreground pt-1">
              <span>Longitud: <span className="font-semibold">{track.length}</span></span>
              {track.corners && <span>Curvas: <span className="font-semibold">{track.corners}</span></span>}
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button variant="outline" className="w-full">
              Ver Detalles de Pista <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
