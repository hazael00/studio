'use server';
/**
 * @fileOverview A kart setup recommendation AI agent.
 *
 * - getSetupRecommendation - A function that provides kart setup recommendations based on various inputs.
 * - SetupRecommendationInput - The input type for the getSetupRecommendation function.
 * - SetupRecommendationOutput - The return type for the getSetupRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SetupRecommendationInputSchema = z.object({
  trackName: z
    .string()
    .describe(
      "El nombre de la pista de karting y su ubicación (país). Ejemplo: 'South Garda Karting, Italia'"
    ),
  weatherConditions: z
    .string()
    .describe(
      "Descripción detallada de las condiciones climáticas actuales. Incluir temperatura ambiente, si está soleado, nublado o lluvioso, si la pista está seca, húmeda o mojada, y cualquier otra observación relevante como viento o humedad. Ejemplo: 'Soleado, seco, 25°C, pista caliente con temperatura de 35°C, poco agarre al inicio de la tanda, sin viento.'"
    ),
  kartDetails: z
    .string()
    .describe(
      "Descripción del kart y motor. Incluir marca del chasis, modelo (si se conoce), tipo de motor y categoría. Ejemplo: 'Chasis Tony Kart Racer 401RR, Motor Rotax Max Senior EVO, categoría Senior Max.'"
    ),
  tireInfo: z
    .string()
    .describe(
      "Tipo y condición de los neumáticos. Ejemplo: 'Neumáticos Mojo D5, nuevos' o 'Neumáticos LeCont Blancos, 20 vueltas de uso.'"
    ),
  driverExperience: z
    .enum(['Principiante', 'Intermedio', 'Avanzado', 'Profesional'])
    .describe('Nivel de experiencia del piloto.'),
  currentIssues: z
    .string()
    .optional()
    .describe(
      "Problemas específicos que el piloto está experimentando con el setup actual o sensaciones en pista. Ejemplo: 'El kart subvira en curvas lentas', 'Falta tracción a la salida de las horquillas', 'El motor no tiene buena respuesta en baja.'"
    ),
});
export type SetupRecommendationInput = z.infer<
  typeof SetupRecommendationInputSchema
>;

export const SetupRecommendationOutputSchema = z.object({
  recommendationTitle: z
    .string()
    .describe(
      "Un título conciso y descriptivo para el conjunto de recomendaciones. Ejemplo: 'Setup Óptimo para KBR en Condiciones Soleadas y Secas'"
    ),
  chassisAdjustments: z
    .array(
      z.object({
        adjustment: z
          .string()
          .describe(
            "Nombre del ajuste de chasis, ej: 'Convergencia Delantera', 'Caster', 'Ancho de Vía Trasero', 'Altura Trasera'."
          ),
        recommendation: z
          .string()
          .describe(
            "La recomendación específica para ese ajuste, ej: 'Aumentar 2mm positivo', 'Neutral', 'Reducir 5mm'."
          ),
      })
    )
    .describe('Ajustes recomendados para el chasis.'),
  engineTuning: z
    .array(
      z.object({
        component: z
          .string()
          .describe(
            "Componente del motor a ajustar, ej: 'Carburador Aguja Alta', 'Carburador Aguja Baja', 'Chiclé Principal'."
          ),
        recommendation: z
          .string()
          .describe(
            "La recomendación específica para ese componente, ej: '1 vuelta y 1/4 desde cerrado', '125'."
          ),
      })
    )
    .describe(
      'Ajustes recomendados para el motor, especialmente carburación si aplica.'
    ),
  tirePressures: z
    .object({
      frontCold: z
        .string()
        .describe(
          "Presión recomendada para los neumáticos delanteros en frío (ej: '0.75 bar', '10.5 PSI')."
        ),
      rearCold: z
        .string()
        .describe(
          "Presión recomendada para los neumáticos traseros en frío (ej: '0.80 bar', '11.0 PSI')."
        ),
      notes: z
        .string()
        .optional()
        .describe(
          "Notas adicionales sobre la presión de neumáticos, ej: 'Ajustar según temperatura de pista.'"
        ),
    })
    .describe('Presiones de neumáticos recomendadas.'),
  drivingTips: z
    .array(
      z
        .string()
        .describe(
          'Consejo específico de pilotaje relevante para el setup o las condiciones.'
        )
    )
    .optional()
    .describe('Consejos de pilotaje para complementar el setup.'),
  generalNotes: z
    .string()
    .optional()
    .describe(
      'Observaciones generales o explicaciones adicionales sobre las recomendaciones.'
    ),
  safetyDisclaimer: z
    .string()
    .describe(
      'Una advertencia estándar de seguridad sobre la aplicación de los ajustes y la responsabilidad del usuario.'
    ),
});
export type SetupRecommendationOutput = z.infer<
  typeof SetupRecommendationOutputSchema
>;

export async function getSetupRecommendation(
  input: SetupRecommendationInput
): Promise<SetupRecommendationOutput> {
  return setupRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'setupRecommendationPrompt',
  input: {schema: SetupRecommendationInputSchema},
  output: {schema: SetupRecommendationOutputSchema},
  prompt: `Eres S4NT1, un ingeniero de pista y coach de karting de renombre mundial, conocido por tu habilidad para optimizar setups. Tu objetivo es ayudar a pilotos a encontrar la configuración perfecta para su kart.

Un piloto te pide ayuda con el siguiente setup:

**Información de la Pista:**
Pista: {{{trackName}}}

**Condiciones Climáticas:**
Clima: {{{weatherConditions}}}

**Detalles del Kart y Motor:**
Kart y Motor: {{{kartDetails}}}
Neumáticos: {{{tireInfo}}}

**Nivel de Experiencia del Piloto:**
Experiencia: {{{driverExperience}}}

**Problemas Actuales / Sensaciones (si los hay):**
{{#if currentIssues}}
Problemas: {{{currentIssues}}}
{{else}}
El piloto no reportó problemas específicos, busca un setup base óptimo.
{{/if}}

**Tu Tarea:**
Proporciona recomendaciones detalladas para el setup del kart. Debes generar un título para la recomendación, ajustes específicos para el chasis (como Convergencia Delantera/Trasera, Caster, Camber, Ancho de Vía Delantero/Trasero, Altura Delantera/Trasera, Rigidez de Barras), motor (especialmente carburación con ajustes de agujas y chiclés si aplica), presiones de neumáticos en frío, y opcionalmente algunos consejos de pilotaje. Incluye notas generales si es necesario y siempre finaliza con una advertencia de seguridad estándar.

**Formato de Salida Esperado (JSON):**
Debes responder en el formato JSON especificado por SetupRecommendationOutputSchema. Presta especial atención a la estructura de \`chassisAdjustments\`, \`engineTuning\`, y \`tirePressures\`.

**Consideraciones Importantes para S4NT1:**
- Sé específico en tus recomendaciones. Por ejemplo, para el carburador, indica "Aguja de alta: 1 vuelta y 1/4 desde cerrado". Para el chasis, "Convergencia delantera: 2mm abierto".
- Adapta tus recomendaciones al nivel de experiencia del piloto. Un principiante podría necesitar un setup más estable y fácil de conducir.
- Considera los problemas reportados por el piloto al dar tus recomendaciones.
- Si no tienes información suficiente para un ajuste específico, puedes omitirlo o indicar que se requiere más información.
- Tu lema es: "Yo no nací para frenar, nací para ganar." ¡Pero la seguridad es primero! La advertencia de seguridad debe ser algo como: "¡Importante! Estas recomendaciones son puntos de partida. Ajusta según tus sensaciones y prueba siempre en un entorno seguro. S4NT1 y esta plataforma no se hacen responsables por el uso, mal uso o consecuencias derivadas de estas recomendaciones. La responsabilidad final del setup y la seguridad en pista recae en el piloto y su equipo."

**Ejemplo de Ajustes de Chasis:**
\`chassisAdjustments: [{ "adjustment": "Convergencia Delantera", "recommendation": "2mm abierto" }, { "adjustment": "Caster", "recommendation": "Positivo, posición media" }]\`

**Ejemplo de Ajustes de Motor (si aplica motor de 2T con carburador):**
\`engineTuning: [{ "component": "Carburador Aguja Alta", "recommendation": "1 vuelta 1/8 desde cerrado" }, { "component": "Carburador Aguja Baja", "recommendation": "1 vuelta 1/2 desde cerrado" }]\`

**Ejemplo de Presiones de Neumáticos:**
\`tirePressures: { "frontCold": "0.75 bar", "rearCold": "0.80 bar", "notes": "Ajustar +/- 0.05 bar según evolución de la pista." }\`

Ahora, proporciona el setup completo en el formato JSON solicitado.`,
});

const setupRecommendationFlow = ai.defineFlow(
  {
    name: 'setupRecommendationFlow',
    inputSchema: SetupRecommendationInputSchema,
    outputSchema: SetupRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    // Ensure safetyDisclaimer is always present, even if LLM forgets
    return {
      ...output!,
      safetyDisclaimer: output?.safetyDisclaimer || "¡Importante! Estas recomendaciones son puntos de partida. Ajusta según tus sensaciones y prueba siempre en un entorno seguro. S4NT1 y esta plataforma no se hacen responsables por el uso, mal uso o consecuencias derivadas de estas recomendaciones. La responsabilidad final del setup y la seguridad en pista recae en el piloto y su equipo."
    };
  }
);
