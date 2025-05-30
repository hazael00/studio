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
import { generateSocialMediaContent, type GenerateSocialMediaContentInput, type GenerateSocialMediaContentOutput } from '@/ai/flows/social-media-content-generation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  topic: z.string().min(5, { message: "El tema debe tener al menos 5 caracteres." }),
  platform: z.enum(['TikTok', 'Instagram', 'Twitter', 'Facebook']),
  style: z.string().optional(),
  keywords: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SocialMediaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GenerateSocialMediaContentOutput | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 'Instagram',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      const input: GenerateSocialMediaContentInput = {
        topic: data.topic,
        platform: data.platform,
        style: data.style || undefined, // Ensure optional fields are undefined if empty
        keywords: data.keywords || undefined,
      };
      const result = await generateSocialMediaContent(input);
      setGeneratedContent(result);
      toast({
        title: "¡Contenido generado!",
        description: "Tu contenido para redes sociales está listo.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el contenido. Intenta de nuevo.",
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
          <CardTitle>Generador de Contenido</CardTitle>
          <CardDescription>Completa los campos para que S4NT1 cree magia para tus redes.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="topic">Tema Principal</Label>
              <Input id="topic" {...register("topic")} placeholder="Ej: Mi última carrera en..." />
              {errors.topic && <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>}
            </div>

            <div>
              <Label htmlFor="platform">Plataforma</Label>
              <Controller
                name="platform"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Selecciona una plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.platform && <p className="text-sm text-destructive mt-1">{errors.platform.message}</p>}
            </div>

            <div>
              <Label htmlFor="style">Estilo (Opcional)</Label>
              <Input id="style" {...register("style")} placeholder="Ej: Motivacional, divertido, técnico" />
            </div>

            <div>
              <Label htmlFor="keywords">Palabras Clave (Opcional)</Label>
              <Input id="keywords" {...register("keywords")} placeholder="Ej: karting, velocidad, #S4NT1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? "Generando..." : "¡Generar Contenido Épico!"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card className="shadow-lg flex items-center justify-center">
          <CardContent className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">S4NT1 está cocinando algo increíble...</p>
          </CardContent>
        </Card>
      )}

      {generatedContent && !isLoading && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>¡Contenido Listo!</CardTitle>
            <CardDescription>Aquí está tu post, listo para brillar ✨</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Título Viral:</Label>
              <p className="font-semibold text-lg p-2 bg-muted rounded-md">{generatedContent.title}</p>
            </div>
            <div>
              <Label>Contenido del Post:</Label>
              <Textarea readOnly value={generatedContent.content} rows={8} className="bg-muted" />
            </div>
            <div>
              <Label>Hashtags Sugeridos:</Label>
              <p className="p-2 bg-muted rounded-md text-sm">{generatedContent.hashtags}</p>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(\`\${generatedContent.title}\n\n\${generatedContent.content}\n\n\${generatedContent.hashtags}\`)}>
              Copiar Todo
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
