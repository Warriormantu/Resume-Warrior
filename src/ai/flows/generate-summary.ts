'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a professional summary.
 *
 * The flow takes a set of skills and experience as input and uses an AI model to generate a professional summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummaryInputSchema = z.object({
  name: z.string().describe("The user's full name."),
  experience: z.array(z.object({
    title: z.string().describe("The job title."),
    company: z.string().describe("The company name."),
  })).describe('A list of professional experiences.'),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).describe('A list of skills.'),
});
export type GenerateSummaryInput = z.infer<typeof GenerateSummaryInputSchema>;

const GenerateSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated professional summary (2-4 sentences).'),
});
export type GenerateSummaryOutput = z.infer<typeof GenerateSummaryOutputSchema>;

export async function generateSummary(input: GenerateSummaryInput): Promise<GenerateSummaryOutput> {
  return generateSummaryFlow(input);
}

const generateSummaryPrompt = ai.definePrompt({
  name: 'generateSummaryPrompt',
  input: {schema: GenerateSummaryInputSchema},
  output: {schema: GenerateSummaryOutputSchema},
  prompt: `You are a professional resume writer. Based on the provided name, skills, and work experience, write a concise and impactful professional summary (2-4 sentences) for a resume.

Name: {{{name}}}

Work Experience:
{{#each experience}}
- {{this.title}} at {{this.company}}
{{/each}}

Skills:
{{#each skills}}
- {{{this.name}}}
{{/each}}
`,
});

const generateSummaryFlow = ai.defineFlow(
  {
    name: 'generateSummaryFlow',
    inputSchema: GenerateSummaryInputSchema,
    outputSchema: GenerateSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateSummaryPrompt(input);
    return output!;
  }
);
