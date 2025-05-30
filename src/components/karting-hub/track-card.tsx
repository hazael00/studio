
import type { Track } from '@/types/karting';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Download, BarChartHorizontalBig, FileText } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  onOpenResourcesModal: (track: Track) => void;
}

export function TrackCard({ track, onOpenResourcesModal }: TrackCardProps) {
  const hasResources = track.technicalSheetPdfUrl || track.basicSetupGuidePdfUrl || track.advancedSetupGuidePdfUrl || track.setupGuidePdfUrl || track.strategyGuidePdfUrl;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
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
        <CardTitle className="text-xl mb-1">{track.name}</CardTitle>
        <CardDescription className="text-sm flex items-center gap-1">
          <MapPin className="w-4 h-4 text-muted-foreground" /> {track.location} ({track.countryCode})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm pt-2 flex-grow">
        <p className="text-muted-foreground h-16 overflow-hidden text-ellipsis">{track.description}</p>
        <div className="flex justify-between text-foreground pt-1">
          <span>Longitud: <span className="font-semibold">{track.length}</span></span>
          <span>Curvas: <span className="font-semibold">{track.corners}</span></span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 items-stretch">
        {track.website && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={track.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Sitio Web
            </a>
          </Button>
        )}
        {hasResources && (
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => onOpenResourcesModal(track)}>
                <FileText className="mr-2 h-4 w-4" /> Ver Recursos
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
