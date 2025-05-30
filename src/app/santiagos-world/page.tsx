import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Trophy, Zap, MapPin, Dumbbell, Utensils, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const santiagoData = {
  bio: "Santiago Díaz de la Vega es un joven y talentoso piloto mexicano de 13 años, actualmente compitiendo en Forza Racing UK. Con una pasión ardiente por la velocidad y una determinación de acero, Santiago busca dejar su huella en el mundo del karting profesional.",
  achievements: [
    { id: 1, title: "Campeón Nacional Mini Max 2022", description: "Demostrando su habilidad desde temprana edad.", icon: Trophy, imageHint: "karting trophy" },
    { id: 2, title: "Podio en SKUSA SuperNationals", description: "Compitiendo contra los mejores del mundo.", icon: Star, imageHint: "karting podium" },
    { id: 3, title: "Forza Racing UK - Piloto Promesa", description: "Actualmente destacando en el competitivo serial británico.", icon: Zap, imageHint: "uk flag racing" },
  ],
  favoriteTracks: [
    { id: 1, name: "Autódromo de Interlagos (Kartódromo)", description: "Un circuito técnico y desafiante en Brasil.", icon: MapPin, imageHint: "interlagos track" },
    { id: 2, name: "South Garda Karting", description: "Pista icónica en Italia, cuna de campeones.", icon: MapPin, imageHint: "south garda karting" },
  ],
  training: {
    title: "Rutina de Campeón",
    description: "Santiago combina entrenamiento físico intenso, simulador y mucha práctica en pista para mantenerse al máximo nivel.",
    icon: Dumbbell,
    imageHint: "gym training"
  },
  nutrition: {
    title: "Combustible para Ganar",
    description: "Una dieta balanceada y específica para atletas de alto rendimiento es clave en su preparación.",
    icon: Utensils,
    imageHint: "healthy food athlete"
  }
};

export default function SantiagosWorldPage() {
  return (
    <div>
      <PageHeader
        title="El Mundo de Santiago Díaz de la Vega"
        description="Conoce más sobre la trayectoria, logros y pasiones de S4NT1, tu piloto favorito."
        icon={Trophy}
      />

      <Card className="mb-8 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Biografía</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{santiagoData.bio}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6 mt-10 text-center">Logros Destacados 🏆</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {santiagoData.achievements.map(ach => (
          <Card key={ach.id} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
               <Image src={`https://placehold.co/300x200.png`} alt={ach.title} width={300} height={200} className="rounded-t-md mb-4" data-ai-hint={ach.imageHint}/>
              <ach.icon className="w-12 h-12 text-primary mb-2" />
              <CardTitle>{ach.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">{ach.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><santiagoData.training.icon className="w-6 h-6 text-accent" /> {santiagoData.training.title}</CardTitle>
          </CardHeader>
           <Image src={`https://placehold.co/600x300.png`} alt={santiagoData.training.title} width={600} height={300} className="w-full object-cover h-48" data-ai-hint={santiagoData.training.imageHint}/>
          <CardContent className="pt-4">
            <p>{santiagoData.training.description}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><santiagoData.nutrition.icon className="w-6 h-6 text-accent" /> {santiagoData.nutrition.title}</CardTitle>
          </CardHeader>
          <Image src={`https://placehold.co/600x300.png`} alt={santiagoData.nutrition.title} width={600} height={300} className="w-full object-cover h-48" data-ai-hint={santiagoData.nutrition.imageHint}/>
          <CardContent className="pt-4">
            <p>{santiagoData.nutrition.description}</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-semibold mb-6 mt-10 text-center">Pistas Favoritas 🗺️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {santiagoData.favoriteTracks.map(track => (
          <Card key={track.id} className="hover:shadow-xl transition-shadow duration-300">
             <Image src={`https://placehold.co/400x250.png`} alt={track.name} width={400} height={250} className="rounded-t-md w-full object-cover h-56" data-ai-hint={track.imageHint}/>
            <CardHeader>
              <track.icon className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{track.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{track.description}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Ver Detalles de Pista</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
