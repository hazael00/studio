
import type { Part } from '@/types/parts';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, DollarSign, Info, PackageCheck, PackageX, Hourglass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PartCardProps {
  part: Part;
  onViewDetailsClick: (part: Part) => void;
}

const statusIcons: Record<Part['status'], React.ReactElement> = {
  Available: <PackageCheck className="w-4 h-4 text-green-500" />,
  'Pre-Order': <Hourglass className="w-4 h-4 text-yellow-500" />,
  Discontinued: <PackageX className="w-4 h-4 text-red-500" />,
};

export function PartCard({ part, onViewDetailsClick }: PartCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <Image
          src={part.imageUrl}
          alt={part.name}
          width={400}
          height={250}
          className="object-cover w-full h-56"
          data-ai-hint={part.imageHint}
        />
        <Badge 
            variant={part.status === 'Available' ? 'default' : part.status === 'Pre-Order' ? 'secondary' : 'destructive'} 
            className="absolute top-2 right-2 flex items-center gap-1"
        >
          {statusIcons[part.status]}
          {part.status}
        </Badge>
      </div>
      <CardHeader className="flex-grow pb-2">
        <CardTitle className="text-xl mb-1">{part.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {part.partNumber && `PN: ${part.partNumber}`}
        </CardDescription>
        <div className="flex items-center gap-2 pt-1">
          <Tag className="w-4 h-4 text-primary" /> 
          <span className="text-sm font-medium text-primary">{part.category}</span>
        </div>
        <div className="text-sm text-foreground pt-1">
          Marca: <span className="font-semibold">{part.brand}</span>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground h-12 overflow-hidden text-ellipsis">{part.description.substring(0, 100)}...</p>
        {part.priceRange && (
          <div className="flex items-center gap-2 mt-2">
            <DollarSign className="w-5 h-5 text-green-600" /> 
            <span className="text-lg font-semibold text-green-600">{part.priceRange}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onViewDetailsClick(part)}>
          <Info className="mr-2 h-4 w-4" /> Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
