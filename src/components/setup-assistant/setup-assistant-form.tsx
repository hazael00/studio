
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
import { Loader2, Bot, AlertTriangle, Settings2, Thermometer, GaugeIcon, User, NotebookText } from 'lucide-react';
import { getSetupRecommendation, type SetupRecommendationInput, type SetupRecommendationOutput } from '@/ai/flows/setup-recommendation-flow';

const trackOptions = [
  { value: "Kartódromo KBR (Ciudad de México, México)", label: "KBR (Ciudad de México, México)" },
  { value: "South Garda Karting (Lonato, Italia)", label: "South Garda Karting (Lonato, Italia)" },
  { value: "Karting Genk (Genk, Bélgica)", label: "Karting Genk (Genk, Bélgica)" },
  { value: "Adria Karting Raceway (Adria, Italia)", label: "Adria Karting Raceway (Adria, Italia)" },
  { value: "PF International Kart Circuit (Brandon, Reino Unido)", label: "PF International (Brandon, Reino Unido)" },
  { value: "Otro/No listado", label: "Otro/No listado (especificar en notas)" },
];

const driverExperienceOptions = [
  { value: "Principiante", label: "Principiante" },
  { value: "Intermedio", label: "Intermedio" },
  { value: "Avanzado", label: "Avanzado" },
  { value: "Profesional", label: "Profesional" },
];

const formSchema = z.object({
  trackName: z.string().min(1, { message: "Selecciona una pista o especifica una." }),
  weatherConditions: z.string().min(10, { message: "Describe el clima con detalle (mínimo 10 caracteres)." }),
  kartDetails: z.string().min(10, { message: "Describe tu kart/motor (mínimo 10 caracteres)." }),
  tireInfo: z.string().min(5, { message: "Describe tus neumáticos (mínimo 5 caracteres)." }),
  driverExperience: z.enum(['Principiante', 'Intermedio', 'Avanzado', 'Profesional']),
  currentIssues: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SetupAssistantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationOutput, setRecommendationOutput] = useState<SetupRecommendationOutput | null>(null);
  const { toast } = useToast();

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverExperience: 'Intermedio',
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setRecommendationOutput(null);
    toast({
      title: "Procesando tu solicitud...",
      description: "S4NT1 está analizando los datos para generar tu setup. ¡Esto puede tomar unos segundos!",
    });

    try {
      const input: SetupRecommendationInput = data;
      const result = await getSetupRecommendation(input);
      setRecommendationOutput(result);

      toast({
        title: "¡Setup Recomendado Listo!",
        description: "S4NT1 ha generado tus recomendaciones. ¡Mucha suerte en la pista!",
      });
    } catch (error) {
      console.error("Error generating setup recommendation:", error);
      toast({
        title: "Error al Generar Recomendación",
        description: "No se pudo obtener la recomendación. Revisa los datos o intenta de nuevo más tarde.",
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
              <Label htmlFor="trackName" className="flex items-center gap-2"><Settings2 className="w-4 h-4" />Pista</Label>
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
              <Label htmlFor="weatherConditions" className="flex items-center gap-2"><Thermometer className="w-4 h-4" />Condiciones Climáticas</Label>
              <Textarea
                id="weatherConditions"
                {...register("weatherConditions")}
                placeholder="Ej: Soleado, seco, 25°C, pista con temperatura de 35°C, poco agarre al inicio de la tanda, sin viento."
                rows={3}
              />
              {errors.weatherConditions && <p className="text-sm text-destructive mt-1">{errors.weatherConditions.message}</p>}
            </div>

            <div>
              <Label htmlFor="kartDetails" className="flex items-center gap-2"><GaugeIcon className="w-4 h-4" />Detalles del Kart/Motor</Label>
              <Input
                id="kartDetails"
                {...register("kartDetails")}
                placeholder="Ej: Rotax Max Senior EVO, Chasis Tony Kart 401RR"
              />
              {errors.kartDetails && <p className="text-sm text-destructive mt-1">{errors.kartDetails.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="tireInfo" className="flex items-center gap-2"><Settings2 className="w-4 h-4" />Información de Neumáticos</Label>
              <Input
                id="tireInfo"
                {...register("tireInfo")}
                placeholder="Ej: Mojo D5 nuevos, LeCont Blancos (20 vueltas)"
              />
              {errors.tireInfo && <p className="text-sm text-destructive mt-1">{errors.tireInfo.message}</p>}
            </div>

            <div>
              <Label htmlFor="driverExperience" className="flex items-center gap-2"><User className="w-4 h-4" />Experiencia del Piloto</Label>
              <Controller
                name="driverExperience"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="driverExperience">
                      <SelectValue placeholder="Selecciona nivel de experiencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {driverExperienceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.driverExperience && <p className="text-sm text-destructive mt-1">{errors.driverExperience.message}</p>}
            </div>

            <div>
              <Label htmlFor="currentIssues" className="flex items-center gap-2"><NotebookText className="w-4 h-4" />Notas Adicionales / Problemas (Opcional)</Label>
              <Textarea
                id="currentIssues"
                {...register("currentIssues")}
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
        <Card className="shadow-xl flex flex-col items-center justify-center min-h-[300px] lg:sticky lg:top-8">
          <CardContent className="text-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
            <p className="text-xl font-semibold text-foreground mb-2">S4NT1 está consultando su base de datos y experiencia...</p>
            <p className="text-muted-foreground">Esto podría tomar unos segundos.</p>
          </CardContent>
        </Card>
      )}

      {recommendationOutput && !isLoading && (
        <Card className="shadow-xl lg:sticky lg:top-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Bot className="w-8 h-8" /> {recommendationOutput.recommendationTitle}
            </CardTitle>
            <CardDescription>S4NT1 ha preparado estas sugerencias para ti:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recommendationOutput.chassisAdjustments && recommendationOutput.chassisAdjustments.length > 0 && (
              <div>
                <h4 className="font-semibold text-accent text-lg mb-2">Ajustes de Chasis:</h4>
                <div className="space-y-2">
                  {recommendationOutput.chassisAdjustments.map((rec, index) => (
                    <div key={`chassis-${index}`} className="p-3 bg-muted/50 rounded-md shadow-sm text-sm">
                      <span className="font-medium">{rec.adjustment}:</span> {rec.recommendation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendationOutput.engineTuning && recommendationOutput.engineTuning.length > 0 && (
              <div>
                <h4 className="font-semibold text-accent text-lg mb-2">Ajustes de Motor/Carburación:</h4>
                 <div className="space-y-2">
                  {recommendationOutput.engineTuning.map((rec, index) => (
                    <div key={`engine-${index}`} className="p-3 bg-muted/50 rounded-md shadow-sm text-sm">
                      <span className="font-medium">{rec.component}:</span> {rec.recommendation}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {recommendationOutput.tirePressures && (
              <div>
                <h4 className="font-semibold text-accent text-lg mb-2">Presiones de Neumáticos (en frío):</h4>
                <div className="p-3 bg-muted/50 rounded-md shadow-sm space-y-1 text-sm">
                    <p><span className="font-medium">Delanteros:</span> {recommendationOutput.tirePressures.frontCold}</p>
                    <p><span className="font-medium">Traseros:</span> {recommendationOutput.tirePressures.rearCold}</p>
                    {recommendationOutput.tirePressures.notes && <p className="text-xs italic text-muted-foreground mt-1">{recommendationOutput.tirePressures.notes}</p>}
                </div>
              </div>
            )}

            {recommendationOutput.drivingTips && recommendationOutput.drivingTips.length > 0 && (
              <div>
                <h4 className="font-semibold text-accent text-lg mb-2">Consejos de Pilotaje:</h4>
                <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                  {recommendationOutput.drivingTips.map((tip, index) => (
                    <li key={`tip-${index}`}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendationOutput.generalNotes && (
              <div>
                <h4 className="font-semibold text-accent text-lg mb-2">Notas Generales de S4NT1:</h4>
                <p className="text-sm p-3 bg-muted/50 rounded-md shadow-sm">{recommendationOutput.generalNotes}</p>
              </div>
            )}

            {recommendationOutput.safetyDisclaimer && (
              <div className="mt-6 p-4 border-l-4 border-destructive bg-destructive/10 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-destructive mb-1">Advertencia de Seguridad</h4>
                    <p className="text-xs text-destructive/80">{recommendationOutput.safetyDisclaimer}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

