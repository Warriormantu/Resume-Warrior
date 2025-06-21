'use server';

/**
 * @fileOverview This file defines a Genkit flow for rephrasing a cover letter.
 *
 * The flow takes existing cover letter text and uses an AI model to rephrase it,
 * potentially improving its tone, clarity, and impact.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseCoverLetterInputSchema = z.object({
  coverLetter: z.string().describe('The original cover letter text.'),
});
export type RephraseCoverLetterInput = z.infer<typeof RephraseCoverLetterInputSchema>;

const RephraseCoverLetterOutputSchema = z.object({
  rephrasedCoverLetter: z.string().describe('The rephrased cover letter text.'),
});
export type RephraseCoverLetterOutput = z.infer<typeof RephraseCoverLetterOutputSchema>;

export async function rephraseCoverLetter(input: RephraseCoverLetterInput): Promise<RephraseCoverLetterOutput> {
  return rephraseCoverLetterFlow(input);
}

const rephraseCoverLetterPrompt = ai.definePrompt({
  name: 'rephraseCoverLetterPrompt',
  input: {schema: RephraseCoverLetterInputSchema},
  output: {schema: RephraseCoverLetterOutputSchema},
  prompt: `You are a professional career coach and expert cover letter writer.
A user has generated a cover letter and wants you to rephrase it.
Rewrite the following cover letter to improve its professional tone, clarity, and impact.
Try to offer a different angle or wording while preserving the core message and key details.

**Original Cover Letter:**
---
{{{coverLetter}}}
---
`,
});

const rephraseCoverLetterFlow = ai.defineFlow(
  {
    name: 'rephraseCoverLetterFlow',
    inputSchema: RephraseCoverLetterInputSchema,
    outputSchema: RephraseCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await rephraseCoverLetterPrompt(input);
    return output!;
  }
);
