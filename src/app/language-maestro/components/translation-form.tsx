"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { translateMessage, type TranslateMessageInput, type TranslateMessageOutput } from '@/ai/flows/realtime-multilingual-chat';
import { Loader2, ArrowRightLeft } from 'lucide-react';

const languageOptions = [
  { value: 'en', label: 'Inglés (English)' },
  { value: 'es', label: 'Español (Spanish)' },
  { value: 'fr', label: 'Francés (Français)' },
  { value: 'de', label: 'Alemán (Deutsch)' },
  { value: 'pt', label: 'Portugués (Português)' },
  { value: 'it', label: 'Italiano (Italiano)' },
  { value: 'ja', label: 'Japonés (日本語)' },
  { value: 'ko', label: 'Coreano (한국어)' },
  { value: 'zh', label: 'Chino (中文)' },
];

const formSchema = z.object({
  message: z.string().min(1, { message: "El mensaje no puede estar vacío." }),
  sourceLanguage: z.string().min(1, { message: "Selecciona el idioma original."}),
  targetLanguage: z.string().min(1, { message: "Selecciona el idioma a traducir."}),
}).refine(data => data.sourceLanguage !== data.targetLanguage, {
  message: "El idioma original y el de destino no pueden ser iguales.",
  path: ["targetLanguage"],
});

type FormData = z.infer<typeof formSchema>;

export function TranslationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceLanguage: 'es',
      targetLanguage: 'en',
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setTranslatedText(null);
    try {
      const input: TranslateMessageInput = data;
      const result: TranslateMessageOutput = await translateMessage(input);
      setTranslatedText(result.translatedMessage);
      toast({
        title: "¡Traducción Completa!",
        description: "Tu mensaje ha sido traducido.",
      });
    } catch (error) {
      console.error("Error translating message:", error);
      toast({
        title: "Error de Traducción",
        description: "No se pudo traducir el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Traductor Multilingüe</CardTitle>
          <CardDescription>Escribe tu mensaje y S4NT1 lo llevará a cualquier idioma.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="message">Mensaje Original</Label>
              <Textarea id="message" {...register("message")} placeholder="Escribe aquí tu mensaje..." rows={5} />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sourceLanguage">Idioma Original</Label>
                 <Controller
                  name="sourceLanguage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="sourceLanguage">
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map(lang => <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sourceLanguage && <p className="text-sm text-destructive mt-1">{errors.sourceLanguage.message}</p>}
              </div>
              <div>
                <Label htmlFor="targetLanguage">Traducir A</Label>
                <Controller
                  name="targetLanguage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="targetLanguage">
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map(lang => <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.targetLanguage && <p className="text-sm text-destructive mt-1">{errors.targetLanguage.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightLeft className="mr-2 h-4 w-4" />}
              {isLoading ? "Traduciendo..." : "¡Traducir Mensaje!"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
         <Card className="shadow-lg flex items-center justify-center">
          <CardContent className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">S4NT1 está procesando tu traducción...</p>
          </CardContent>
        </Card>
      )}

      {translatedText && !isLoading && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mensaje Traducido</CardTitle>
            <CardDescription>¡Aquí tienes tu mensaje en el nuevo idioma! 🌍</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea readOnly value={translatedText} rows={8} className="bg-muted text-lg" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(translatedText)}>
              Copiar Traducción
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
