
import type { Supplier } from '@/types/parts';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Star, Settings, LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SupplierCardProps {
  supplier: Supplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {supplier.logoUrl && (
        <div className="relative h-40 bg-muted flex items-center justify-center p-4">
          <Image
            src={supplier.logoUrl}
            alt={`${supplier.name} logo`}
            width={150}
            height={100}
            className="object-contain"
            data-ai-hint={supplier.logoImageHint || "company logo"}
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-xl mb-1">{supplier.name}</CardTitle>
        <CardDescription className="text-sm flex items-center gap-1">
          <MapPin className="w-4 h-4 text-muted-foreground" /> {supplier.city ? `${supplier.city}, ` : ''}{supplier.country} ({supplier.region})
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        {supplier.rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < supplier.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({supplier.rating.toFixed(1)})</span>
          </div>
        )}
        {supplier.specialties && supplier.specialties.length > 0 && (
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">Especialidades:</h4>
            <div className="flex flex-wrap gap-1">
              {supplier.specialties.slice(0, 3).map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
              {supplier.specialties.length > 3 && <Badge variant="secondary">...</Badge>}
            </div>
          </div>
        )}
        {supplier.servicesOffered && supplier.servicesOffered.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">Servicios:</h4>
            <div className="flex flex-wrap gap-1">
              {supplier.servicesOffered.slice(0,3).map(service => <Badge key={service} variant="outline" className="text-xs">{service}</Badge>)}
              {supplier.servicesOffered.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {supplier.website ? (
          <Button className="w-full" asChild>
            <a href={supplier.website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Visitar Web
            </a>
          </Button>
        ) : (
           <Button className="w-full" variant="secondary" disabled>
              <LinkIcon className="mr-2 h-4 w-4" /> Web no disponible
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
