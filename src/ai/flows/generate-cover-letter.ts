'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a cover letter.
 *
 * The flow takes a job description and resume content as input and uses an AI model
 * to generate a tailored cover letter.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  jobDescription: z.string().describe('The full job description text.'),
  resumeContent: z.string().describe('The full text content of the user\'s resume.'),
  userName: z.string().describe('The name of the user.'),
  tone: z.enum(['Professional', 'Enthusiastic', 'Formal']).default('Professional').describe('The desired tone for the cover letter.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const generateCoverLetterPrompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are a professional career coach and expert cover letter writer.
Based on the provided resume content and the job description, write a compelling and professional cover letter for a user named {{{userName}}}.

The cover letter should:
1. Be tailored specifically to the job description.
2. Highlight the most relevant skills and experiences from the resume.
3. Match the tone of the job description (e.g., formal, casual, enthusiastic).
4. Be structured as a standard cover letter with an introduction, body paragraphs, and a conclusion.
5. Address the hiring manager if possible, or use a generic salutation if not.
6. The writing style and tone MUST be {{{tone}}}.

**User's Resume Content:**
---
{{{resumeContent}}}
---

**Job Description:**
---
{{{jobDescription}}}
---
`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await generateCoverLetterPrompt(input);
    return output!;
  }
);
