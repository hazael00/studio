
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

      <Card className="mb-8 shadow-xl bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="https://placehold.co/120x120.png"
              alt="S4NT1 Avatar"
              width={100}
              height={100}
              className="rounded-full border-4 border-primary shadow-lg"
              data-ai-hint="karting driver avatar cool"
            />
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl text-primary mb-1">¡Qué onda, soy S4NT1!</CardTitle>
              <CardDescription className="text-md">
                ¡Bienvenido a mi Asistente de Setup IA! Aquí es donde la magia sucede.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Usa el formulario de abajo para darme los detalles de tu sesión en pista. Cuanto más preciso seas, ¡mejores serán mis consejos! Juntos encontraremos esa configuración que te hará volar. 🚀
          </p>
          <p className="text-sm text-accent italic">
            Más abajo encontrarás un espacio para preguntarme directamente tus dudas sobre setups o ajustes específicos. ¡Estoy aquí para ayudarte a ser más rápido! (Funcionalidad de chat en desarrollo)
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <SetupAssistantForm />
        </div>

        <Card className="md:col-span-1 shadow-lg lg:sticky lg:top-8">
          <CardHeader>
            <CardTitle className="text-xl">Pregúntale a S4NT1</CardTitle>
            <CardDescription>¿Tienes dudas específicas? Escríbelas aquí. (Funcionalidad de chat en desarrollo)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="santi-question" className="sr-only">Tu pregunta para S4NT1</Label>
              <Textarea
                id="santi-question"
                placeholder="Ej: ¿Cómo afecta el caster al comportamiento del kart en lluvia?"
                rows={4}
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
