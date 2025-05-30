import { PageHeader } from '@/components/ui/page-header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { GraduationCap, Wrench, BarChart3, Settings } from 'lucide-react';

const academyTopics = [
  {
    id: "carburetor",
    title: "Ajuste de Carburador: El Corazón del Motor",
    icon: Settings,
    imageHint: "kart engine",
    content: [
      {
        subTitle: "¿Qué es un carburador?",
        text: "El carburador es un dispositivo que mezcla aire y combustible en las proporciones adecuadas para la combustión en un motor. En karting, su correcto ajuste es crucial para el rendimiento."
      },
      {
        subTitle: "Ajustes básicos",
        text: "Los principales ajustes son las agujas de alta y baja, que regulan el flujo de combustible a diferentes regímenes del motor. Un ajuste fino depende de la altitud, temperatura y humedad."
      },
      {
        subTitle: "Síntomas de mal ajuste",
        text: "Un motor que 'ratea', se ahoga, o no entrega potencia puede tener un carburador mal ajustado. Escuchar el motor y leer la bujía son claves para el diagnóstico."
      }
    ]
  },
  {
    id: "telemetry",
    title: "Telemetría: Los Datos que Hablan",
    icon: BarChart3,
    imageHint: "telemetry data",
    content: [
      {
        subTitle: "Introducción a la telemetría",
        text: "La telemetría en karting implica recolectar datos del kart y del piloto durante la conducción. Sensores miden RPM, velocidad, tiempos por vuelta, fuerzas G, temperatura, etc."
      },
      {
        subTitle: "Análisis de datos",
        text: "Analizar estos datos permite entender el comportamiento del kart, optimizar trazadas, puntos de frenada, y mejorar la configuración del chasis y motor."
      },
      {
        subTitle: "Herramientas comunes",
        text: "Sistemas como MyChron o Alfano son populares. Permiten descargar los datos a un software para un análisis detallado."
      }
    ]
  },
  {
    id: "chassis",
    title: "Configuración de Chasis: Equilibrio y Agarre",
    icon: Wrench,
    imageHint: "kart chassis",
    content: [
      {
        subTitle: "Importancia del chasis",
        text: "El chasis es el esqueleto del kart. Su flexibilidad y configuración afectan directamente el agarre y la maniobrabilidad."
      },
      {
        subTitle: "Ajustes clave",
        text: "Convergencia/divergencia, caster, camber, ancho de vías (delantero y trasero), y altura son algunos de los parámetros ajustables para adaptar el kart a la pista y estilo de pilotaje."
      },
      {
        subTitle: "Impacto en el pilotaje",
        text: "Un chasis bien configurado permite al piloto ser más rápido y consistente. Entender cómo cada ajuste afecta el comportamiento es fundamental."
      }
    ]
  }
];

export default function KartingAcademyPage() {
  return (
    <div>
      <PageHeader
        title="Karting Academy S4NT1"
        description="¡Domina los secretos del karting! Aprende desde lo básico hasta técnicas avanzadas con explicaciones claras."
        icon={GraduationCap}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {academyTopics.map(topic => (
          <Card key={topic.id} className="flex flex-col items-center p-4 bg-card hover:shadow-lg transition-shadow">
            <topic.icon className="w-16 h-16 text-primary mb-3" />
            <CardTitle className="text-center text-lg">{topic.title.split(":")[0]}</CardTitle>
          </Card>
        ))}
      </div>


      <Accordion type="single" collapsible className="w-full space-y-4">
        {academyTopics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden shadow-lg">
            <AccordionItem value={topic.id} className="border-b-0">
              <AccordionTrigger className="p-6 bg-primary/10 hover:bg-primary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <topic.icon className="w-6 h-6 text-primary" />
                  <span className="text-xl font-semibold">{topic.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-card">
                <Image 
                  src={`https://placehold.co/800x300.png`} 
                  alt={topic.title} 
                  width={800} 
                  height={300} 
                  className="rounded-md mb-6 w-full object-cover"
                  data-ai-hint={topic.imageHint}
                />
                {topic.content.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold text-lg text-accent mb-1">{item.subTitle}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}
