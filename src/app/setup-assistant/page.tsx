
import { PageHeader } from '@/components/ui/page-header';
import { SetupAssistantForm } from '@/components/setup-assistant/setup-assistant-form';
import { Bot, Mic, Send } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SetupAssistantPage() {
  return (
    <div>
      <PageHeader
        title="Asistente de Setup IA S4NT1"
        description="Obtén recomendaciones de configuración para tu kart basadas en la pista, el clima y tu experiencia. S4NT1 te ayudará a encontrar el setup perfecto."
        icon={Bot}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <SetupAssistantForm />
        </div>

        <Card className="md:col-span-1 shadow-lg lg:sticky lg:top-8">
          <CardHeader className="items-center text-center p-4">
            <Image
              src="https://placehold.co/200x250.png"
              alt="S4NT1 Digital Assistant"
              width={150}
              height={187} // Adjusted to maintain aspect ratio for a 200x250 source if width is 150
              className="rounded-md mb-4 shadow-lg border-2 border-primary"
              data-ai-hint="karting technician half-body animated"
            />
            <CardTitle className="text-xl text-primary">¡Hola, soy S4NT1!</CardTitle>
            <CardDescription className="text-sm text-muted-foreground px-2">
              Tu copiloto IA para el setup perfecto. Dime los detalles de tu sesión y te ayudaré a volar en la pista. 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="santi-question" className="sr-only">Tu pregunta para S4NT1</Label>
              <Textarea
                id="santi-question"
                placeholder="Ej: ¿Cómo afecta el caster al comportamiento del kart en lluvia?"
                rows={3}
                className="bg-muted"
                disabled
              />
            </div>
             <div className="flex flex-col sm:flex-row gap-2">
                <Button disabled className="w-full sm:flex-1">
                  <Send className="mr-2 h-4 w-4" /> Enviar Pregunta
                </Button>
                <Button variant="outline" disabled className="w-full sm:flex-1">
                  <Mic className="mr-2 h-4 w-4" /> Hablar con S4NT1
                </Button>
             </div>
             <p className="text-xs text-center text-muted-foreground">
                La interacción por chat y voz estará disponible próximamente.
              </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
