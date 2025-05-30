
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // Added Dialog components
import { ShoppingCart, Search, Package, Users, Globe, DraftingCompass, Info, X } from 'lucide-react';
import type { Part, Supplier } from '@/types/parts';
import { PartCard } from '@/components/parts-catalog/part-card';

const initialPartsData: Part[] = [
  {
    id: 'engine-001',
    name: 'Motor Rotax Max Senior EVO',
    description: 'Motor de alto rendimiento para categoría Senior, con tecnología EVO para una entrega de potencia optimizada y mayor durabilidad. Ideal para competidores serios.',
    category: 'Engine',
    brand: 'Rotax',
    partNumber: 'ROTAX-MAX-SR-EVO',
    priceRange: '$3,500 - $4,000',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart engine rotax',
    status: 'Available',
    compatibilityInfo: 'Compatible con chasis estándar Senior Max. Requiere batería y sistema de escape específicos.',
    technicalSpecs: { Bore: '54mm', Stroke: '54.5mm', Power: '30hp @ 11,500 RPM', Cooling: 'Water-cooled' },
    supplierIds: ['supplier-001', 'supplier-003'],
  },
  {
    id: 'chassis-001',
    name: 'Chasis Tony Kart Racer 401RR',
    description: 'Chasis de competición homologado por la FIA, fabricado con tubos de cromo molibdeno de alta calidad. Ofrece una excelente respuesta y adaptabilidad a diferentes condiciones de pista.',
    category: 'Chassis',
    brand: 'Tony Kart',
    priceRange: '$4,500 - $5,200',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart chassis tonykart',
    status: 'Available',
    compatibilityInfo: 'Adecuado para motores OK, KZ, y Rotax. Diversas opciones de configuración de rigidez.',
    technicalSpecs: { TubingDiameter: '30mm/32mm', Wheelbase: '1045mm', AxleDiameter: '50mm' },
    supplierIds: ['supplier-002'],
  },
  {
    id: 'tires-001',
    name: 'Neumáticos Mojo D5 (Set)',
    description: 'Juego de neumáticos slick de compuesto medio, conocido por su consistencia y durabilidad. Utilizado en múltiples campeonatos Rotax.',
    category: 'Tires',
    brand: 'Mojo',
    priceRange: '$200 - $250',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart tires mojo',
    status: 'Pre-Order',
    technicalSpecs: { Compound: 'Medium', Type: 'Slick', FrontSize: '10x4.60-5', RearSize: '11x7.10-5' },
    supplierIds: ['supplier-001', 'supplier-002', 'supplier-003'],
  },
  {
    id: 'brakes-001',
    name: 'Sistema de Freno OTK BSD',
    description: 'Sistema de freno trasero completo, autoajustable, con pinza de pistón simple y disco flotante. Ofrece una frenada potente y modulable.',
    category: 'Brakes',
    brand: 'OTK',
    partNumber: 'OTK-BSD-001',
    priceRange: '$600 - $700',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart brake system',
    status: 'Available',
    technicalSpecs: { DiscMaterial: 'Steel', PistonCount: '1', DiscType: 'Floating' },
    supplierIds: ['supplier-002'],
  },
   {
    id: 'electronics-001',
    name: 'MyChron 5S 2T',
    description: 'Sistema de adquisición de datos con GPS integrado y dos entradas de temperatura. Ideal para análisis de rendimiento y telemetría.',
    category: 'Electronics',
    brand: 'AiM',
    priceRange: '$700 - $800',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart data logger',
    status: 'Discontinued',
    compatibilityInfo: 'Universal, requiere soportes específicos según el volante. Software de análisis MyChron disponible para PC.',
    supplierIds: ['supplier-003'],
  },
];

const initialSuppliersData: Supplier[] = [
  {
    id: 'supplier-001',
    name: 'KartStore Pro',
    region: 'North America',
    country: 'USA',
    city: 'Indianapolis',
    website: 'https://kartstorepro.example.com',
    specialties: ['Rotax Engines', 'Tires'],
    logoUrl: 'https://placehold.co/150x80.png',
    logoImageHint: 'kart store logo',
    offersOnlineSales: true,
    rating: 4.5,
    servicesOffered: ['Engine Tuning', 'Online Sales']
  },
  {
    id: 'supplier-002',
    name: 'EuroKart Racing Parts',
    region: 'Europe',
    country: 'Italy',
    city: 'Lonato',
    website: 'https://eurokart.example.com',
    specialties: ['Tony Kart Chassis', 'OTK Components'],
    logoUrl: 'https://placehold.co/150x80.png',
    logoImageHint: 'racing parts logo',
    offersOnlineSales: true,
    rating: 4.8,
    servicesOffered: ['Chassis Setup', 'International Shipping']
  },
  {
    id: 'supplier-003',
    name: 'MexiKarts S.A. de C.V.',
    region: 'Latin America',
    country: 'Mexico',
    city: 'CDMX',
    specialties: ['Local Brands', 'AiM Electronics'],
    offersOnlineSales: false,
    rating: 4.2,
    servicesOffered: ['Trackside Support']
  },
  {
    id: 'supplier-004',
    name: 'Asia Karting Supplies',
    region: 'Asia',
    country: 'Singapore',
    city: 'Singapore',
    website: 'https://asiakartsupplies.example.com',
    specialties: ['Yamaha Engines', 'Birel ART Chassis'],
    offersOnlineSales: true,
    rating: 4.0,
    servicesOffered: ['Online Sales', 'Regional Shipping']
  },
  {
    id: 'supplier-005',
    name: 'Down Under Karts',
    region: 'Oceania',
    country: 'Australia',
    city: 'Melbourne',
    specialties: ['Australian Kart Components', 'Safety Gear'],
    offersOnlineSales: true,
    rating: 4.3,
    servicesOffered: ['Custom Suit Fitting', 'National Shipping']
  }
];

const partCategoryOptions = [
  { value: "all", label: "Todas las categorías" },
  { value: "Engine", label: "Motor" },
  { value: "Chassis", label: "Chasis" },
  { value: "Tires", label: "Neumáticos" },
  { value: "Brakes", label: "Frenos" },
  { value: "Transmission", label: "Transmisión" },
  { value: "Electronics", label: "Electrónica" },
  { value: "Bodywork", label: "Carrocería" },
  { value: "Other", label: "Otros" },
];

const supplierRegionOptions = [
  { value: "all", label: "Todas las regiones" },
  { value: "North America", label: "Norteamérica" },
  { value: "Europe", label: "Europa" },
  { value: "Asia", label: "Asia" },
  { value: "Latin America", label: "Latinoamérica" },
  { value: "Oceania", label: "Oceanía" },
  { value: "Africa", label: "África" },
];


export default function PartsCatalogPage() {
  const [searchTermParts, setSearchTermParts] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTermSuppliers, setSearchTermSuppliers] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetailsClick = (part: Part) => {
    setSelectedPart(part);
    setIsDetailModalOpen(true);
  };

  const filteredParts = useMemo(() => {
    return initialPartsData.filter(part => {
      const matchesSearch = searchTermParts === '' ||
        part.name.toLowerCase().includes(searchTermParts.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchTermParts.toLowerCase()) ||
        (part.partNumber && part.partNumber.toLowerCase().includes(searchTermParts.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTermParts, selectedCategory]);

  const filteredSuppliers = useMemo(() => {
    return initialSuppliersData.filter(supplier => {
      const matchesSearch = searchTermSuppliers === '' ||
        supplier.name.toLowerCase().includes(searchTermSuppliers.toLowerCase()) ||
        (supplier.specialties && supplier.specialties.join(' ').toLowerCase().includes(searchTermSuppliers.toLowerCase()));
      const matchesRegion = selectedRegion === 'all' || supplier.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchTermSuppliers, selectedRegion]);

  return (
    <div>
      <PageHeader
        title="Marketplace de Piezas y Karts S4NT1"
        description="Explora un catálogo completo de piezas de karting, componentes, y encuentra proveedores verificados."
        icon={ShoppingCart}
      />

      <Card className="mb-12 shadow-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <DraftingCompass className="w-8 h-8 text-primary" />
            Visualizador Interactivo de Kart (Próximamente)
          </CardTitle>
          <CardDescription>
            Visualiza cómo lucen las piezas en un modelo 3D de kart y entiende su función. Selecciona componentes del catálogo para verlos en acción.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/7] bg-muted rounded-lg flex items-center justify-center relative">
            <Image 
              src="https://placehold.co/1200x400.png" 
              alt="Visualizador 3D de Kart Placeholder" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
              data-ai-hint="3d kart diagram"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center rounded-lg">
              <h3 className="text-2xl font-semibold text-background mb-2">Interacción 3D Próximamente</h3>
              <p className="text-background/80 text-center max-w-md">
                Estamos desarrollando una herramienta revolucionaria para que explores y configures karts en 3D.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Catálogo de Piezas</h2>
        </div>
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 items-end">
            <div>
              <label htmlFor="searchParts" className="block text-sm font-medium text-muted-foreground mb-1">Buscar Pieza</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="searchParts"
                  placeholder="Nombre, marca, número de parte..."
                  className="pl-10"
                  value={searchTermParts}
                  onChange={(e) => setSearchTermParts(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-muted-foreground mb-1">Categoría</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="categoryFilter">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  {partCategoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {filteredParts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map(part => <PartCard key={part.id} part={part} onViewDetailsClick={handleViewDetailsClick} />)}
          </div>
        ) : (
          <Card className="text-center text-muted-foreground py-10 shadow-sm">
            <CardContent>
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>No se encontraron piezas con los filtros seleccionados.</p>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Directorio de Proveedores Verificados</h2>
        </div>
         <Card className="mb-8 shadow-md">
          <CardContent className="p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 items-end">
            <div>
              <label htmlFor="searchSuppliers" className="block text-sm font-medium text-muted-foreground mb-1">Buscar Proveedor</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="searchSuppliers"
                  placeholder="Nombre, especialidad..."
                  className="pl-10"
                  value={searchTermSuppliers}
                  onChange={(e) => setSearchTermSuppliers(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="regionFilter" className="block text-sm font-medium text-muted-foreground mb-1">Región</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="regionFilter">
                  <SelectValue placeholder="Todas las regiones" />
                </SelectTrigger>
                <SelectContent>
                  {supplierRegionOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {filteredSuppliers.length > 0 ? (
          <Card className="overflow-hidden shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nombre</TableHead>
                  <TableHead>Región</TableHead>
                  <TableHead>País / Ciudad</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-right">Sitio Web</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map(supplier => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.region}</TableCell>
                    <TableCell>{supplier.country}{supplier.city ? `, ${supplier.city}` : ''}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {supplier.specialties?.map(spec => <Badge key={spec} variant="secondary" className="whitespace-nowrap">{spec}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {supplier.servicesOffered?.map(serv => <Badge key={serv} variant="outline" className="whitespace-nowrap">{serv}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{supplier.rating ? supplier.rating.toFixed(1) + ' ⭐' : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      {supplier.website ? (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                          <Link href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <Globe className="mr-1 h-4 w-4" /> Visitar
                          </Link>
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">No disponible</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <Card className="text-center text-muted-foreground py-10 shadow-sm">
            <CardContent>
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>No se encontraron proveedores con los filtros seleccionados.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {selectedPart && (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPart.name}</DialogTitle>
              <DialogDescription>{selectedPart.brand} - {selectedPart.category}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative aspect-video w-full">
                <Image 
                  src={selectedPart.imageUrl} 
                  alt={selectedPart.name} 
                  layout="fill" 
                  objectFit="contain" 
                  className="rounded-md"
                  data-ai-hint={selectedPart.imageHint}
                />
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-lg">Descripción:</h4>
                <p className="text-sm text-muted-foreground">{selectedPart.description}</p>
              </div>

              {selectedPart.technicalSpecs && Object.keys(selectedPart.technicalSpecs).length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Especificaciones Técnicas:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {Object.entries(selectedPart.technicalSpecs).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPart.compatibilityInfo && (
                <div>
                  <h4 className="font-semibold mb-1 text-lg">Compatibilidad:</h4>
                  <p className="text-sm text-muted-foreground">{selectedPart.compatibilityInfo}</p>
                </div>
              )}
              
              {selectedPart.priceRange && (
                <div>
                  <h4 className="font-semibold mb-1 text-lg">Rango de Precio Estimado:</h4>
                  <p className="text-lg font-bold text-primary">{selectedPart.priceRange}</p>
                </div>
              )}

              {selectedPart.supplierIds && selectedPart.supplierIds.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Proveedores Conocidos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPart.supplierIds.map(supplierId => {
                      const supplier = initialSuppliersData.find(s => s.id === supplierId);
                      return supplier ? (
                        <Badge key={supplier.id} variant="secondary">
                          {supplier.website ? (
                            <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {supplier.name}
                            </a>
                          ) : (
                            supplier.name
                          )}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
               <Badge 
                  variant={selectedPart.status === 'Available' ? 'default' : selectedPart.status === 'Pre-Order' ? 'secondary' : 'destructive'} 
                  className="w-fit text-sm py-1 px-3"
                >
                 {selectedPart.status}
              </Badge>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

