// src/ai/flows/social-media-content-generation.ts
'use server';
/**
 * @fileOverview A social media content generation AI agent for generating content related to karting and Santiago's brand.
 *
 * - generateSocialMediaContent - A function that handles the social media content generation process.
 * - GenerateSocialMediaContentInput - The input type for the generateSocialMediaContent function.
 * - GenerateSocialMediaContentOutput - The return type for the generateSocialMediaContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaContentInputSchema = z.object({
  topic: z.string().describe('The topic for the social media content.'),
  platform: z
    .enum(['TikTok', 'Instagram', 'Twitter', 'Facebook'])
    .describe('The social media platform for which the content is being generated.'),
  style: z
    .string()
    .optional()
    .describe(
      'The desired style for the content, e.g., motivational, humorous, informative. Defaults to a blend of excitement and inspiration.'
    ),
  keywords: z
    .string()
    .optional()
    .describe(
      'Additional keywords or phrases to incorporate into the content. Example: karting, racing, Santiago Díaz de la Vega.'
    ),
});
export type GenerateSocialMediaContentInput = z.infer<typeof GenerateSocialMediaContentInputSchema>;

const GenerateSocialMediaContentOutputSchema = z.object({
  title: z.string().describe('A viral title for the social media content.'),
  content: z.string().describe('The generated social media content.'),
  hashtags: z.string().describe('Relevant hashtags for the content.'),
});
export type GenerateSocialMediaContentOutput = z.infer<typeof GenerateSocialMediaContentOutputSchema>;

export async function generateSocialMediaContent(input: GenerateSocialMediaContentInput): Promise<GenerateSocialMediaContentOutput> {
  return generateSocialMediaContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'socialMediaContentPrompt',
  input: {schema: GenerateSocialMediaContentInputSchema},
  output: {schema: GenerateSocialMediaContentOutputSchema},
  prompt: `You are S4NT1, the digital avatar of Santiago Díaz de la Vega, a 13-year-old Mexican karting driver.

  Generate engaging social media content for the specified platform based on the given topic, style, and keywords.

  Platform: {{{platform}}}
  Topic: {{{topic}}}
  Style: {{style}}
  Keywords: {{keywords}}

  Follow these guidelines:
  - Use phrases like: “¡Épico!”, “¡Obvio, papá!”, “¡Nos vemos en la pista, cracks!”, “¡Living!”, “¡Está grueso!”.
  - Incorporate emojis to convey enthusiasm and empathy.
  - Respond as if you’re in a videocall or stream.
  - Your lema is: “Yo no nací para frenar, nací para ganar.”
  - Be emotional, likeable, competitive, curious and 100% buena vibra.

  Output a title, content and relevant hashtags.
  `,
});

const generateSocialMediaContentFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaContentFlow',
    inputSchema: GenerateSocialMediaContentInputSchema,
    outputSchema: GenerateSocialMediaContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
