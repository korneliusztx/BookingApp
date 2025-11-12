// A Genkit flow for suggesting salon services based on user-provided images.

'use server';

/**
 * @fileOverview Suggests salon services based on user-provided images of current and desired hairstyles.
 *
 * - suggestServices - A function that handles the salon service suggestion process.
 * - SuggestServicesInput - The input type for the suggestServices function.
 * - SuggestServicesOutput - The return type for the suggestServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServicesInputSchema = z.object({
  currentHairStyle: z
    .string()
    .describe(
      "A photo of the user's current hairstyle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  desiredHairStyle: z
    .string()
    .describe(
      "A photo of the user's desired hairstyle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalNotes: z.string().optional().describe('Any additional notes or preferences from the user.'),
});

export type SuggestServicesInput = z.infer<typeof SuggestServicesInputSchema>;

const SuggestServicesOutputSchema = z.object({
  suggestedServices: z.array(
    z.string().describe('A list of salon service names that are suitable for the user.')
  ).describe('A list of suggested salon services based on the provided images and notes.'),
});

export type SuggestServicesOutput = z.infer<typeof SuggestServicesOutputSchema>;

export async function suggestServices(input: SuggestServicesInput): Promise<SuggestServicesOutput> {
  return suggestServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServicesPrompt',
  input: {schema: SuggestServicesInputSchema},
  output: {schema: SuggestServicesOutputSchema},
  prompt: `You are an AI-powered salon service advisor. A user will provide you with a picture of their current hairstyle and a picture of their desired hairstyle, along with any additional notes. Your goal is to suggest a list of suitable salon services for the user to achieve the desired look.

Current Hairstyle: {{media url=currentHairStyle}}
Desired Hairstyle: {{media url=desiredHairStyle}}

{{#if additionalNotes}}
Additional Notes: {{{additionalNotes}}}
{{/if}}

Based on the current and desired hairstyles, suggest a list of salon services that would help the user achieve the desired look. Consider any additional notes provided by the user.

Please provide the suggested services.`, 
});

const suggestServicesFlow = ai.defineFlow(
  {
    name: 'suggestServicesFlow',
    inputSchema: SuggestServicesInputSchema,
    outputSchema: SuggestServicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
