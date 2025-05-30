// 'use server';

/**
 * @fileOverview A flow that translates user messages in real-time to facilitate multilingual chat.
 *
 * - translateMessage - A function that translates the input message to a specified target language.
 * - TranslateMessageInput - The input type for the translateMessage function.
 * - TranslateMessageOutput - The return type for the translateMessage function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateMessageInputSchema = z.object({
  message: z.string().describe('The message to translate.'),
  targetLanguage: z.string().describe('The target language for the translation (e.g., en, es, fr).'),
  sourceLanguage: z.string().describe('The source language of the message (e.g., en, es, fr).'),
});
export type TranslateMessageInput = z.infer<typeof TranslateMessageInputSchema>;

const TranslateMessageOutputSchema = z.object({
  translatedMessage: z.string().describe('The translated message in the target language.'),
});
export type TranslateMessageOutput = z.infer<typeof TranslateMessageOutputSchema>;

export async function translateMessage(input: TranslateMessageInput): Promise<TranslateMessageOutput> {
  return translateMessageFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: TranslateMessageInputSchema},
  output: {schema: TranslateMessageOutputSchema},
  prompt: `You are a translation expert. Translate the following message from {{sourceLanguage}} to {{targetLanguage}}.\n\nMessage: {{{message}}}`,
});

const translateMessageFlow = ai.defineFlow(
  {
    name: 'translateMessageFlow',
    inputSchema: TranslateMessageInputSchema,
    outputSchema: TranslateMessageOutputSchema,
  },
  async input => {
    const {output} = await translatePrompt(input);
    return output!;
  }
);
