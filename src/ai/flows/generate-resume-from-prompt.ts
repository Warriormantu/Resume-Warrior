'use server';

/**
 * @fileOverview Generates a resume draft from a user-provided prompt.
 *
 * - generateResumeFromPrompt - A function that generates a resume draft from a prompt.
 * - GenerateResumeFromPromptInput - The input type for the generateResumeFromPrompt function.
 * - GenerateResumeFromPromptOutput - The return type for the generateResumeFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeFromPromptInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired role and experience.'),
});

export type GenerateResumeFromPromptInput = z.infer<
  typeof GenerateResumeFromPromptInputSchema
>;

const GenerateResumeFromPromptOutputSchema = z.object({
  resumeDraft: z.string().describe('A draft of the resume in text format.'),
});

export type GenerateResumeFromPromptOutput = z.infer<
  typeof GenerateResumeFromPromptOutputSchema
>;

export async function generateResumeFromPrompt(
  input: GenerateResumeFromPromptInput
): Promise<GenerateResumeFromPromptOutput> {
  return generateResumeFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeFromPromptPrompt',
  input: {schema: GenerateResumeFromPromptInputSchema},
  output: {schema: GenerateResumeFromPromptOutputSchema},
  prompt: `You are an expert resume writer. Generate a resume draft based on the following prompt:\n\n{{{prompt}}}`,
});

const generateResumeFromPromptFlow = ai.defineFlow(
  {
    name: 'generateResumeFromPromptFlow',
    inputSchema: GenerateResumeFromPromptInputSchema,
    outputSchema: GenerateResumeFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
