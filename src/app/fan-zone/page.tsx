import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Gamepad2, HelpCircle, Trophy, Gift } from 'lucide-react';

const fanZoneContent = {
  trivia: {
    title: "Trivia de Karting con S4NT1",
    description: "¡S4NT1 te reta! Pon a prueba tus conocimientos sobre él y el mundo del karting.",
    questions: [
      { id: 1, question: "¿Cuál es el lema de S4NT1?", answer: "Yo no nací para frenar, nací para ganar." },
      { id: 2, question: "¿En qué categoría compite Santiago (S4NT1) actualmente?", answer: "Forza Racing UK (OKJ/Mini dependiendo la temporada)" },
      { id: 3, question: "Menciona una pista favorita de S4NT1.", answer: "Autódromo de Interlagos (Kartódromo) o South Garda Karting" },
    ],
    imageHint: "quiz game console"
  },
  challenges: {
    title: "Retos Semanales de S4NT1",
    description: "¡Participa en desafíos creativos lanzados por S4NT1 y gana su reconocimiento!",
    currentChallenge: "S4NT1 te reta: Diseña el casco más 'fresa-cool' para él. ¡Sube tu diseño a Instagram con #S4NT1CascoChallenge!",
    imageHint: "fan art challenge winner"
  },
  anecdotes: {
    title: "Anécdotas de Pista de S4NT1",
    description: "S4NT1 comparte sus historias más épicas y divertidas directamente desde las carreras.",
    story: "S4NT1 recuerda: 'Una vez en una carrera con lluvia intensa, ¡casi todos trompeaban menos yo! Logré remontar 10 posiciones. ¡Estuvo grueso!'",
    imageHint: "karting rain race action"
  }
};

export default function FanZonePage() {
  return (
    <div>
      <PageHeader
        title="S4NT1 Fan Zone"
        description="¡La diversión nunca termina con S4NT1! Participa en trivias, retos y conoce más de cerca a tu piloto favorito."
        icon={Gamepad2}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trivia Card */}
        <Card className="shadow-xl hover:scale-105 transition-transform duration-300">
          <Image src={`https://placehold.co/400x250.png`} alt={fanZoneContent.trivia.title} width={400} height={250} className="rounded-t-md w-full object-cover h-56" data-ai-hint={fanZoneContent.trivia.imageHint}/>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="w-6 h-6 text-primary" /> {fanZoneContent.trivia.title}</CardTitle>
            <CardDescription>{fanZoneContent.trivia.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside text-sm">
              {fanZoneContent.trivia.questions.map(q => <li key={q.id}>{q.question}</li>)}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">¡Jugar Trivia de S4NT1!</Button>
          </CardFooter>
        </Card>

        {/* Challenges Card */}
        <Card className="shadow-xl hover:scale-105 transition-transform duration-300">
          <Image src={`https://placehold.co/400x250.png`} alt={fanZoneContent.challenges.title} width={400} height={250} className="rounded-t-md w-full object-cover h-56" data-ai-hint={fanZoneContent.challenges.imageHint}/>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="w-6 h-6 text-primary" /> {fanZoneContent.challenges.title}</CardTitle>
            <CardDescription>{fanZoneContent.challenges.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-1">Reto Actual de S4NT1:</p>
            <p className="text-sm text-accent">{fanZoneContent.challenges.currentChallenge}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Ver Más Retos de S4NT1</Button>
          </CardFooter>
        </Card>

        {/* Anecdotes Card */}
        <Card className="shadow-xl hover:scale-105 transition-transform duration-300">
         <Image src={`https://placehold.co/400x250.png`} alt={fanZoneContent.anecdotes.title} width={400} height={250} className="rounded-t-md w-full object-cover h-56" data-ai-hint={fanZoneContent.anecdotes.imageHint}/>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift className="w-6 h-6 text-primary" /> {fanZoneContent.anecdotes.title}</CardTitle>
            <CardDescription>{fanZoneContent.anecdotes.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="italic text-sm">{fanZoneContent.anecdotes.story}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Leer Más Anécdotas de S4NT1</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
