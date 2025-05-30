
import { PageHeader } from '@/components/ui/page-header';
import { SetupAssistantForm } from '@/components/setup-assistant/setup-assistant-form';
import { SlidersHorizontal, Bot } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SetupAssistantPage() {
  return (
    <div>
      <PageHeader
        title="Asistente de Setup IA S4NT1"
        description="Obtén recomendaciones de configuración para tu kart basadas en la pista, el clima y tu experiencia. S4NT1 te ayudará a encontrar el setup perfecto."
        icon={Bot} // Changed icon to Bot to emphasize AI
      />

      <Card className="mb-8 shadow-xl bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="https://placehold.co/150x150.png"
              alt="S4NT1 Avatar"
              width={120}
              height={120}
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
            Dime cómo está la pista, el clima, los detalles de tu kart, tu experiencia y cómo te sientes en él, y usaré toda mi experiencia para darte la configuración perfecta. ¡Vamos a volar en la pista! 🚀
          </p>
          <p className="text-sm text-accent italic">
            P.D. Si tienes dudas sobre qué poner o cómo funciona algún ajuste, ¡no dudes en preguntar en el futuro! Estoy aquí para ayudarte a ir más rápido.
          </p>
        </CardContent>
      </Card>

      <SetupAssistantForm />
    </div>
  );
}
