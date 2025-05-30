
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Search, Package, Users, Globe } from 'lucide-react';
import type { Part, Supplier } from '@/types/parts';
import { PartCard } from '@/components/parts-catalog/part-card';
// import { SupplierCard } from '@/components/parts-catalog/supplier-card'; // No longer used here
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const initialPartsData: Part[] = [
  {
    id: 'engine-001',
    name: 'Motor Rotax Max Senior EVO',
    description: 'Motor de alto rendimiento para categoría Senior.',
    category: 'Engine',
    brand: 'Rotax',
    partNumber: 'ROTAX-MAX-SR-EVO',
    priceRange: '$3,500 - $4,000',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart engine rotax',
    status: 'Available',
    compatibilityInfo: 'Compatible con chasis estándar Senior Max.',
    technicalSpecs: { Bore: '54mm', Stroke: '54.5mm', Power: '30hp' },
    supplierIds: ['supplier-001', 'supplier-003'],
  },
  {
    id: 'chassis-001',
    name: 'Chasis Tony Kart Racer 401RR',
    description: 'Chasis de competición homologado por la FIA.',
    category: 'Chassis',
    brand: 'Tony Kart',
    priceRange: '$4,500 - $5,200',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart chassis tonykart',
    status: 'Available',
    compatibilityInfo: 'Adecuado para motores OK, KZ, y Rotax.',
    supplierIds: ['supplier-002'],
  },
  {
    id: 'tires-001',
    name: 'Neumáticos Mojo D5 (Set)',
    description: 'Juego de neumáticos slick de compuesto medio.',
    category: 'Tires',
    brand: 'Mojo',
    priceRange: '$200 - $250',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart tires mojo',
    status: 'Pre-Order',
    technicalSpecs: { Compound: 'Medium', Type: 'Slick' },
    supplierIds: ['supplier-001', 'supplier-002', 'supplier-003'],
  },
  {
    id: 'brakes-001',
    name: 'Sistema de Freno OTK BSD',
    description: 'Sistema de freno trasero completo, autoajustable.',
    category: 'Brakes',
    brand: 'OTK',
    partNumber: 'OTK-BSD-001',
    priceRange: '$600 - $700',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart brake system',
    status: 'Available',
    supplierIds: ['supplier-002'],
  },
   {
    id: 'electronics-001',
    name: 'MyChron 5S 2T',
    description: 'Sistema de adquisición de datos con GPS y dos entradas de temperatura.',
    category: 'Electronics',
    brand: 'AiM',
    priceRange: '$700 - $800',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'kart data logger',
    status: 'Discontinued',
    compatibilityInfo: 'Universal, requiere soportes específicos.',
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
        title="Catálogo Global de Piezas y Proveedores"
        description="Explora un catálogo completo de piezas de karting, componentes, y encuentra proveedores."
        icon={Wrench}
      />

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Catálogo de Piezas</h2>
        </div>
        <div className="mb-6 p-4 bg-card rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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
          </div>
        </div>
        {filteredParts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map(part => <PartCard key={part.id} part={part} />)}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">No se encontraron piezas con los filtros seleccionados.</p>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Directorio de Proveedores</h2>
        </div>
         <div className="mb-6 p-4 bg-card rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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
          </div>
        </div>
        {filteredSuppliers.length > 0 ? (
          <div className="overflow-x-auto bg-card rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Región</TableHead>
                  <TableHead>País</TableHead>
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
                        <Button variant="link" size="sm" asChild>
                          <Link href={supplier.website} target="_blank" rel="noopener noreferrer">
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
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">No se encontraron proveedores con los filtros seleccionados.</p>
        )}
      </section>
    </div>
  );
}

