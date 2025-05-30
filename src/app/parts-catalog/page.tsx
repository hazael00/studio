
import { PageHeader } from '@/components/ui/page-header';
import { Wrench } from 'lucide-react'; // Or ShoppingBag, Cog

export default function PartsCatalogPage() {
  return (
    <div>
      <PageHeader
        title="Catálogo Global de Piezas y Proveedores"
        description="Explora un catálogo completo de piezas de karting, componentes, y encuentra proveedores. Próximamente: búsqueda detallada, filtros y herramientas de comparación."
        icon={Wrench}
      />
      <div className="mt-8 text-center">
        <p className="text-lg text-muted-foreground">
          Esta sección está en construcción. ¡Vuelve pronto para descubrir un mundo de componentes de karting!
        </p>
        {/* 
          Aquí se integrarán los componentes:
          - <PartFilters />
          - <PartsList parts={filteredParts} />
          - <ProviderDirectory providers={allProviders} /> 
        */}
      </div>
    </div>
  );
}
