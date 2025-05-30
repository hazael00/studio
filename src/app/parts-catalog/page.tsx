
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, Search, Package, Users, Globe, DraftingCompass, Info, X, Star, MessageSquare, Edit3 } from 'lucide-react';
import type { Part, Supplier, Review } from '@/types/parts';
import { PartCard } from '@/components/parts-catalog/part-card';

const initialReviews: Review[] = [
  { id: 'review-001', user: 'PilotoPro77', rating: 5, comment: '¡Increíble rendimiento! Vale cada centavo.', date: '2024-05-15', avatarHint: 'helmet visor' },
  { id: 'review-002', user: 'KartMaster', rating: 4, comment: 'Muy buen motor, fácil de ajustar. El envío fue rápido.', date: '2024-05-10', avatarHint: 'race suit' },
  { id: 'review-003', user: 'SpeedyGonzales', rating: 5, comment: 'Calidad superior, se nota la diferencia en la pista. Lo recomiendo.', date: '2024-05-20', avatarHint: 'kart steering wheel' }
];

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
    averageRating: 4.8,
    reviews: initialReviews,
    tags: ["High Performance", "Rotax Series", "EVO Technology"]
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
    averageRating: 4.5,
    reviews: [initialReviews[0], initialReviews[1]],
    tags: ["FIA Homologated", "Premium Quality", "Racing"]
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
    averageRating: 4.2,
    reviews: [initialReviews[2]],
    tags: ["Rotax Max Challenge", "Durable Compound"]
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
    tags: ["Self-adjusting", "OTK Original"]
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
    tags: ["Data Acquisition", "GPS", "Telemetry"]
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
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Simple half star logic
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
        {halfStar && <Star key="half" className="w-5 h-5 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />} {/* Half-filled star */}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
      </div>
    );
  };

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
              fill
              className="rounded-lg object-cover"
              data-ai-hint="3d kart diagram"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center rounded-lg p-4">
              <h3 className="text-2xl font-semibold text-background mb-2 text-center">Interacción 3D Próximamente</h3>
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
                    <TableCell className="text-center">
                      {supplier.rating ? (
                        <div className="flex items-center justify-center gap-1">
                          {supplier.rating.toFixed(1)} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                        </div>
                      ) : <span className="text-xs text-muted-foreground">N/A</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      {supplier.website ? (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <Globe className="mr-1 h-4 w-4" /> Visitar
                          </a>
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
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPart.name}</DialogTitle>
              <DialogDescription>{selectedPart.brand} - {selectedPart.category}</DialogDescription>
                 {selectedPart.averageRating && (
                    <div className="flex items-center gap-2 pt-1">
                      {renderStars(selectedPart.averageRating)}
                      <span className="text-sm text-muted-foreground">({selectedPart.averageRating.toFixed(1)} de {selectedPart.reviews?.length || 0} reseñas)</span>
                    </div>
                  )}
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="relative aspect-video w-full">
                  <Image 
                    src={selectedPart.imageUrl} 
                    alt={selectedPart.name} 
                    fill
                    className="rounded-md object-contain"
                    data-ai-hint={selectedPart.imageHint}
                  />
                </div>
                {selectedPart.tags && selectedPart.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1 text-md">Etiquetas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPart.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
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
                 <Badge 
                    variant={selectedPart.status === 'Available' ? 'default' : selectedPart.status === 'Pre-Order' ? 'secondary' : 'destructive'} 
                    className="w-fit text-sm py-1 px-3"
                  >
                   {selectedPart.status}
                </Badge>
              </div>
            </div>
            
            {selectedPart.supplierIds && selectedPart.supplierIds.length > 0 && (
              <div className="py-4 border-t">
                <h3 className="font-semibold mb-3 text-xl">Proveedores Conocidos y Precios (Ejemplo):</h3>
                <div className="space-y-3">
                  {selectedPart.supplierIds.map(supplierId => {
                    const supplier = initialSuppliersData.find(s => s.id === supplierId);
                    // Mock price - in reality this would come from supplier data
                    const mockPrice = selectedPart.priceRange ? parseFloat(selectedPart.priceRange.split(" - ")[0].replace("$","").replace(",","")) * (1 + (Math.random() * 0.2 - 0.1)) : null;

                    return supplier ? (
                      <Card key={supplier.id} className="bg-muted/50 p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-md">{supplier.name}</p>
                            <p className="text-xs text-muted-foreground">{supplier.region} - {supplier.country}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-md font-semibold text-primary">
                              {mockPrice ? `$${mockPrice.toFixed(2)}` : "Consultar"}
                            </p>
                            {supplier.website ? (
                              <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  <Globe className="mr-1 h-3 w-3" /> Visitar
                                </a>
                              </Button>
                            ) : <span className="text-xs text-muted-foreground">Web no disponible</span>}
                          </div>
                        </div>
                      </Card>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="py-4 border-t">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-xl flex items-center gap-2"><MessageSquare />Calificaciones y Reseñas</h3>
                <Button variant="outline" disabled> <Edit3 className="mr-2 h-4 w-4" /> Escribir Reseña</Button>
              </div>
              {selectedPart.reviews && selectedPart.reviews.length > 0 ? (
                <div className="space-y-4">
                  {selectedPart.reviews.map(review => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://placehold.co/40x40.png`} alt={review.user} data-ai-hint={review.avatarHint || "person avatar"} />
                          <AvatarFallback>{review.user.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{review.user}</p>
                            <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center my-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aún no hay reseñas para esta pieza. ¡Sé el primero!</p>
              )}
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
