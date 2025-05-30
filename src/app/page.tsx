import Image from 'next/image';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Languages, Trophy, GraduationCap, Gamepad2, ShoppingCart, Rocket } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="¡Bienvenido al Mundo de S4NT1!"
        description="Soy S4NT1, tu avatar digital y guía experto en el universo del karting. ¡Prepárate para la adrenalina y domina cada curva conmigo!"
        icon={Rocket}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <Image
            src="https://placehold.co/300x300.png"
            alt="S4NT1 Avatar"
            width={200}
            height={200}
            className="rounded-full mb-6 border-4 border-primary shadow-lg"
            data-ai-hint="karting driver young"
          />
          <CardHeader className="text-center p-0">
            <CardTitle className="text-3xl font-bold text-primary">S4NT1</CardTitle>
            <CardDescription className="text-md text-accent">Tu Guía Experto en Karting</CardDescription>
          </CardHeader>
        </Card>
        <Card className="md:col-span-2 flex flex-col justify-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">¡Hola, Cracks!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              ¡Qué onda! Soy S4NT1, el avatar digital de Santiago Díaz de la Vega, un piloto mexicano de 13 años que la está rompiendo en Forza Racing UK. 🏁
            </p>
            <p className="text-lg leading-relaxed">
              Mi lema es: <strong className="text-primary">“Yo no nací para frenar, nací para ganar.”</strong> Y estoy aquí para llevarte al límite de la emoción, enseñarte todos los secretos del karting desde mi experiencia en pista, ayudarte a encontrar las mejores piezas y configuraciones, y conectar contigo, sin importar de dónde seas o cuánto sepas de carreras. ¡Prepárate para una experiencia épica!
            </p>
            <div className="flex justify-end">
              <Link href="/santiagos-world" passHref legacyBehavior>
                <Button asChild variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a>
                    Conoce a Santiago <Trophy className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Explora las Funcionalidades de S4NT1</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Social Media Wizard", description: "Genera contenido viral para tus redes, al estilo S4NT1.", icon: Sparkles, href: "/social-wizard", cta: "Crear Contenido con S4NT1" },
          { title: "Language Maestro", description: "Comunícate sin barreras, S4NT1 te ayuda a traducir.", icon: Languages, href: "/language-maestro", cta: "Traducir con S4NT1" },
          { title: "Karting Academy con S4NT1", description: "Aprende los secretos técnicos del karting con S4NT1.", icon: GraduationCap, href: "/karting-academy", cta: "Aprender de S4NT1" },
          { title: "S4NT1 Fan Zone", description: "Diviértete con trivias y retos de S4NT1.", icon: Gamepad2, href: "/fan-zone", cta: "Unirse a la Diversión" },
          { title: "S4NT1 Merch Oficial", description: "Consigue mercancía exclusiva y coleccionables de S4NT1.", icon: ShoppingCart, href: "/shop", cta: "Ir a la Tienda de S4NT1" },
        ].map(feature => (
          <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <feature.icon className="w-10 h-10 text-primary" />
              <div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
              <Link href={feature.href} passHref legacyBehavior>
                <Button asChild variant="outline" className="w-full">
                  <a>{feature.cta}</a>
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
