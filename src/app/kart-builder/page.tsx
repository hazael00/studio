
import { PageHeader } from '@/components/ui/page-header';
import { Palette } from 'lucide-react'; // Icon for design/customization

export default function KartBuilderPage() {
  return (
    <div>
      <PageHeader
        title="Crea tu Kart Ideal"
        description="Próximamente: Una herramienta interactiva y visual para configurar el kart de tus sueños. Selecciona piezas, ajusta configuraciones, explora diseños y obtén presupuestos en tiempo real."
        icon={Palette}
      />
      <div className="mt-8 text-center">
        <p className="text-lg text-muted-foreground">
          ¡Estamos trabajando en esta emocionante funcionalidad! Vuelve pronto para diseñar y personalizar tu kart.
        </p>
        {/* 
          Aquí se integrarán los componentes del Kart Builder:
          - VisualKartCanvas
          - PartSelectorPanel
          - ConfigurationOptions
          - RealTimeBudgetDisplay
          - ProfileLoaderSaver
        */}
      </div>
    </div>
  );
}
