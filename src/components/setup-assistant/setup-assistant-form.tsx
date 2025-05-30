
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, AlertTriangle } from 'lucide-react';
// TODO: Import Genkit flow when ready
// import { getSetupRecommendation, type SetupRecommendationInput, type SetupRecommendationOutput } from '@/ai/flows/setup-recommendation-flow';

const trackOptions = [
  { value: "Kartódromo KBR (Ciudad de México, México)", label: "KBR (Ciudad de México, México)" },
  { value: "South Garda Karting (Lonato, Italia)", label: "South Garda Karting (Lonato, Italia)" },
  { value: "Karting Genk (Genk, Bélgica)", label: "Karting Genk (Genk, Bélgica)" },
  { value: "Adria Karting Raceway (Adria, Italia)", label: "Adria Karting Raceway (Adria, Italia)" },
  { value: "PF International Kart Circuit (Brandon, Reino Unido)", label: "PF International (Brandon, Reino Unido)" },
];

// Define a more specific output type for recommendations for UI rendering
interface DisplayRecommendation {
  category: string;
  advice: string;
}

interface DisplaySetupRecommendationOutput {
  recommendationTitle: string;
  recommendations: DisplayRecommendation[];
  safetyDisclaimer: string;
}


const formSchema = z.object({
  trackName: z.string().min(1, { message: "Selecciona una pista." }),
  weatherConditions: z.string().min(10, { message: "Describe el clima con al menos 10 caracteres." }),
  kartSetup: z.string().min(5, { message: "Describe tu kart/motor con al menos 5 caracteres." }),
  userNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SetupAssistantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationOutput, setRecommendationOutput] = useState<DisplaySetupRecommendationOutput | null>(null);
  const { toast } = useToast();

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setRecommendationOutput(null);
    toast({
      title: "Procesando tu solicitud...",
      description: "S4NT1 está analizando los datos para generar tu setup.",
    });

    try {
      // TODO: Replace with actual Genkit flow call
      // const input: SetupRecommendationInput = data;
      // const result: SetupRecommendationOutput = await getSetupRecommendation(input);
      // setRecommendationOutput(result);

      // Mock data for now:
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      const mockResult: DisplaySetupRecommendationOutput = {
        recommendationTitle: "Setup Óptimo para KBR en Condiciones Soleadas",
        recommendations: [
          { category: "Chasis", advice: "Aumentar caster positivo en 2 grados para mejorar entrada en curva." },
          { category: "Chasis", advice: "Reducir ancho de vía trasero en 5mm para mayor rotación." },
          { category: "Motor (Carburador)", advice: "Aguja de alta: 1 vuelta y 1/4. Aguja de baja: 1 vuelta y 1/2." },
          { category: "Neumáticos", advice: "Presión en frío: Delanteros 0.75 bar, Traseros 0.80 bar." },
          { category: "Pilotaje", advice: "Frenar un poco más tarde en la curva 3 y buscar el vértice interior." }
        ],
        safetyDisclaimer: "¡Importante! Estos son puntos de partida. Ajusta según tus sensaciones y prueba en un entorno seguro. S4NT1 no se hace responsable por el mal uso de estas recomendaciones."
      };
      setRecommendationOutput(mockResult);

      toast({
        title: "¡Setup Recomendado Listo!",
        description: "S4NT1 ha generado tus recomendaciones.",
      });
    } catch (error) {
      console.error("Error generating setup recommendation:", error);
      toast({
        title: "Error al Generar Recomendación",
        description: "No se pudo obtener la recomendación. Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Ingresa los Datos de tu Sesión</CardTitle>
          <CardDescription>Cuanta más información proporciones a S4NT1, más precisas serán las recomendaciones.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="trackName">Pista</Label>
              <Controller
                name="trackName"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="trackName">
                      <SelectValue placeholder="Selecciona una pista" />
                    </SelectTrigger>
                    <SelectContent>
                      {trackOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.trackName && <p className="text-sm text-destructive mt-1">{errors.trackName.message}</p>}
            </div>

            <div>
              <Label htmlFor="weatherConditions">Condiciones Climáticas</Label>
              <Textarea
                id="weatherConditions"
                {...register("weatherConditions")}
                placeholder="Ej: Soleado, seco, 25°C, pista con temperatura de 35°C, poco agarre al inicio de la tanda."
                rows={3}
              />
              {errors.weatherConditions && <p className="text-sm text-destructive mt-1">{errors.weatherConditions.message}</p>}
            </div>

            <div>
              <Label htmlFor="kartSetup">Configuración Actual de Kart/Motor</Label>
              <Input
                id="kartSetup"
                {...register("kartSetup")}
                placeholder="Ej: Rotax Max Senior, Chasis Tony Kart 401RR, Neumáticos Mojo D5"
              />
              {errors.kartSetup && <p className="text-sm text-destructive mt-1">{errors.kartSetup.message}</p>}
            </div>

            <div>
              <Label htmlFor="userNotes">Notas Adicionales / Problemas (Opcional)</Label>
              <Textarea
                id="userNotes"
                {...register("userNotes")}
                placeholder="Ej: El kart subvira en curvas lentas, falta tracción a la salida de las horquillas."
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
              {isLoading ? "S4NT1 Analizando..." : "Obtener Recomendación de S4NT1"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && !recommendationOutput && (
        <Card className="shadow-xl flex flex-col items-center justify-center min-h-[300px]">
          <CardContent className="text-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
            <p className="text-xl font-semibold text-foreground mb-2">S4NT1 está consultando su base de datos y experiencia...</p>
            <p className="text-muted-foreground">Esto podría tomar unos segundos.</p>
          </CardContent>
        </Card>
      )}

      {recommendationOutput && !isLoading && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Bot className="w-8 h-8" /> {recommendationOutput.recommendationTitle}
            </CardTitle>
            <CardDescription>S4NT1 ha preparado estas sugerencias para ti:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendationOutput.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-md shadow-sm">
                <p className="font-semibold text-accent text-sm mb-1">{rec.category}</p>
                <p className="text-sm">{rec.advice}</p>
              </div>
            ))}
            <div className="mt-6 p-4 border-l-4 border-destructive bg-destructive/10 rounded-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-destructive mb-1">Advertencia de Seguridad</h4>
                  <p className="text-xs text-destructive/80">{recommendationOutput.safetyDisclaimer}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

