'use server';

/**
 * @fileOverview This file defines a Genkit flow for rephrasing resume points.
 *
 * The flow takes a set of skills and experience points as input and uses an AI model to rephrase them
 * to be more impactful and professional.
 *
 * @exports {rephraseResumePoints} - The main function to trigger the rephrasing flow.
 * @exports {RephraseResumePointsInput} - The input type for the rephraseResumePoints function.
 * @exports {RephraseResumePointsOutput} - The output type for the rephraseResumePoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseResumePointsInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills to rephrase.'),
  experiencePoints: z.array(z.string()).describe('A list of experience points to rephrase.'),
});
export type RephraseResumePointsInput = z.infer<typeof RephraseResumePointsInputSchema>;

const RephraseResumePointsOutputSchema = z.object({
  rephrasedSkills: z.array(z.string()).describe('The rephrased list of skills.'),
  rephrasedExperiencePoints: z.array(z.string()).describe('The rephrased list of experience points.'),
});
export type RephraseResumePointsOutput = z.infer<typeof RephraseResumePointsOutputSchema>;

export async function rephraseResumePoints(input: RephraseResumePointsInput): Promise<RephraseResumePointsOutput> {
  return rephraseResumePointsFlow(input);
}

const rephraseResumePointsPrompt = ai.definePrompt({
  name: 'rephraseResumePointsPrompt',
  input: {schema: RephraseResumePointsInputSchema},
  output: {schema: RephraseResumePointsOutputSchema},
  prompt: `You are a resume expert. You will take the skills and experience points provided and rephrase them to be more impactful and professional.

Skills:
{{#each skills}}- {{{this}}}
{{/each}}

Experience Points:
{{#each experiencePoints}}- {{{this}}}
{{/each}}`,
});

const rephraseResumePointsFlow = ai.defineFlow(
  {
    name: 'rephraseResumePointsFlow',
    inputSchema: RephraseResumePointsInputSchema,
    outputSchema: RephraseResumePointsOutputSchema,
  },
  async input => {
    const {output} = await rephraseResumePointsPrompt(input);
    return output!;
  }
);
