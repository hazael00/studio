import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingCart, Tag, Star } from 'lucide-react';

const products = [
  {
    id: "merch-001",
    name: "Gorra Oficial S4NT1",
    description: "Luce el estilo de S4NT1 con esta gorra exclusiva. ¡Diseño 'fresa-cool' garantizado!",
    price: "$29.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Merch Firmada",
    imageHint: "racing cap merchandise"
  },
  {
    id: "sticker-001",
    name: "Pack de Stickers S4NT1 Épicos",
    description: "Decora tu laptop, casco o lo que quieras con estos stickers llenos de energía.",
    price: "$9.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Stickers",
    imageHint: "cool racing stickers"
  },
  {
    id: "card-001",
    name: "Trading Card S4NT1 Edición Limitada",
    description: "Una pieza de colección para verdaderos fans. ¡Consíguela antes de que se agoten!",
    price: "$19.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Coleccionables Digitales",
    imageHint: "collectible trading card"
  },
  {
    id: "merch-002",
    name: "Playera S4NT1 'Nací para Ganar'",
    description: "Viste el lema de S4NT1 y muestra tu espíritu competitivo. Calidad premium.",
    price: "$34.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Merch Firmada",
    imageHint: "racing t-shirt design"
  },
  {
    id: "digital-001",
    name: "Fondo de Pantalla Exclusivo S4NT1",
    description: "Lleva a S4NT1 a tu escritorio o móvil con este diseño vibrante.",
    price: "$4.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Coleccionables Digitales",
    imageHint: "digital art wallpaper"
  },
  {
    id: "sticker-002",
    name: "Sticker Holográfico S4NT1",
    description: "Un sticker con efecto holográfico que no pasará desapercibido. ¡Brilla como S4NT1!",
    price: "$7.99 USD",
    image: "https://placehold.co/400x400.png",
    category: "Stickers",
    imageHint: "holographic sticker"
  }
];

export default function ShopPage() {
  return (
    <div>
      <PageHeader
        title="S4NT1 Shop"
        description="¡Consigue la mercancía oficial de S4NT1! Desde ropa hasta coleccionables digitales, ¡todo con la vibra de un campeón!"
        icon={ShoppingCart}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-64"
                data-ai-hint={product.imageHint}
              />
              <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {product.category}
              </div>
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl mb-1">{product.name}</CardTitle>
              <CardDescription className="text-sm h-16 overflow-hidden">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-2">{product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <ShoppingCart className="mr-2 h-4 w-4" /> Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
