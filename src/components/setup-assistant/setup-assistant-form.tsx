
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Loader2, Bot, AlertTriangle, Settings2, Thermometer, GaugeIcon, User, NotebookText, Info, MapPin, CloudSun, UserCircle, GripVertical, TrendingUp } from 'lucide-react';
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

interface InfoPopoverProps {
  explanation: string;
}

const InfoButtonPopover: React.FC<InfoPopoverProps> = ({ explanation }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-accent">
        <Info className="h-4 w-4" />
        <span className="sr-only">Más información</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80 text-sm" side="right" align="start">
      {explanation}
    </PopoverContent>
  </Popover>
);


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
    <>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Ingresa los Datos de tu Sesión</CardTitle>
          <CardDescription>Cuanta más información proporciones a S4NT1, más precisas serán las recomendaciones.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="trackName" className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />Pista</Label>
                <InfoButtonPopover explanation="Selecciona la pista donde vas a correr o la que más se parezca. Si no está en la lista, elige 'Otro' y especifica el nombre y ubicación en 'Notas Adicionales'. Esto ayuda a S4NT1 a considerar características específicas del trazado (tipo de asfalto, curvas, etc.)." />
              </div>
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
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="weatherConditions" className="flex items-center gap-2"><CloudSun className="w-4 h-4 text-primary" />Condiciones Climáticas</Label>
                <InfoButtonPopover explanation="Describe el ambiente: temperatura, si está soleado, nublado o lluvioso, y cómo está la pista (seca, húmeda, mojada). Detalles como el viento o la humedad también son útiles. El clima afecta mucho el agarre y el rendimiento del motor." />
              </div>
              <Textarea
                id="weatherConditions"
                {...register("weatherConditions")}
                placeholder="Ej: Soleado, seco, 25°C, pista con temperatura de 35°C, poco agarre al inicio de la tanda, sin viento."
                rows={3}
              />
              {errors.weatherConditions && <p className="text-sm text-destructive mt-1">{errors.weatherConditions.message}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                 <Label htmlFor="kartDetails" className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-primary" />Detalles del Kart/Motor</Label>
                 <InfoButtonPopover explanation="Especifica la marca y modelo de tu chasis, el tipo de motor y la categoría. Ejemplo: 'Chasis Tony Kart Racer 401RR, Motor Rotax Max Senior EVO, categoría Senior Max'. Conocer tu material es clave." />
              </div>
              <Input
                id="kartDetails"
                {...register("kartDetails")}
                placeholder="Ej: Chasis Tony Kart Racer 401RR, Motor Rotax Max Senior EVO"
              />
              {errors.kartDetails && <p className="text-sm text-destructive mt-1">{errors.kartDetails.message}</p>}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="tireInfo" className="flex items-center gap-2"><GripVertical className="w-4 h-4 text-primary" />Información de Neumáticos</Label>
                <InfoButtonPopover explanation="Indica el tipo de neumáticos (marca y modelo, ej: Mojo D5, LeCont Rojos) y su estado (nuevos, cuántas vueltas tienen). Los neumáticos son tu único contacto con la pista, ¡importantísimos!" />
              </div>
              <Input
                id="tireInfo"
                {...register("tireInfo")}
                placeholder="Ej: Mojo D5 nuevos, LeCont Blancos (20 vueltas)"
              />
              {errors.tireInfo && <p className="text-sm text-destructive mt-1">{errors.tireInfo.message}</p>}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="driverExperience" className="flex items-center gap-2"><UserCircle className="w-4 h-4 text-primary" />Experiencia del Piloto</Label>
                <InfoButtonPopover explanation="Selecciona tu nivel. Un setup para un principiante buscará más estabilidad, mientras que un piloto avanzado podría preferir un kart más ágil. ¡Sé honesto para mejores recomendaciones!" />
              </div>
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
              <div className="flex items-center gap-2 mb-1">
                 <Label htmlFor="currentIssues" className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Sensaciones / Problemas (Opcional)</Label>
                <InfoButtonPopover explanation="Aquí puedes detallar cualquier problema que estés sintiendo con el setup actual (ej: 'el kart subvira en curvas lentas', 'falta tracción a la salida de las horquillas') o cualquier otra observación relevante que no encaje en los otros campos." />
              </div>
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
        <Card className="shadow-xl flex flex-col items-center justify-center min-h-[300px] lg:sticky lg:top-8 mt-8 lg:mt-0">
          <CardContent className="text-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
            <p className="text-xl font-semibold text-foreground mb-2">S4NT1 está consultando su base de datos y experiencia...</p>
            <p className="text-muted-foreground">Esto podría tomar unos segundos.</p>
          </CardContent>
        </Card>
      )}

      {recommendationOutput && !isLoading && (
        <Card className="shadow-xl lg:sticky lg:top-8 mt-8 lg:mt-0">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Bot className="w-8 h-8" /> {recommendationOutput.recommendationTitle}
            </CardTitle>
            <CardDescription>S4NT1 ha preparado estas sugerencias para ti:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
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
    </>
  );
}

