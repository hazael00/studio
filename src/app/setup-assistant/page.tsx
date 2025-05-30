
import { PageHeader } from '@/components/ui/page-header';
import { SetupAssistantForm } from '@/components/setup-assistant/setup-assistant-form';
import { SlidersHorizontal } from 'lucide-react';

export default function SetupAssistantPage() {
  return (
    <div>
      <PageHeader
        title="Asistente de Setup IA S4NT1"
        description="Obtén recomendaciones de configuración para tu kart basadas en la pista, el clima y tu experiencia. S4NT1 te ayudará a encontrar el setup perfecto."
        icon={SlidersHorizontal}
      />
      <SetupAssistantForm />
    </div>
  );
}
