'use server';

/**
 * @fileOverview Defines a Genkit flow for analyzing a resume against a job description.
 * - analyzeResume - Analyzes a resume and job description to provide a match score and suggestions.
 * - AnalyzeResumeInput - Input type for the analyzeResume function.
 * - AnalyzeResumeOutput - Return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeContent: z.string().describe("The user's full resume text."),
  jobDescription: z.string().describe('The full job description text.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  matchScore: z.number().min(0).max(100).describe('A score from 0-100 indicating how well the resume matches the job description.'),
  analysisSummary: z.string().describe('A brief, one-paragraph summary explaining the match score and overall fit.'),
  matchingKeywords: z.array(z.string()).describe('A list of keywords from the job description that were found in the resume.'),
  missingKeywords: z.array(z.string()).describe('A list of important keywords from the job description that are missing from the resume.'),
  suggestions: z.string().describe('Actionable suggestions for improving the resume to better match the job description. Provide as a single string with newlines for separating points.'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const analyzeResumePrompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert career coach and resume analyst. Your task is to analyze a resume against a given job description and provide a comprehensive analysis.

Analyze the provided resume and job description to determine how well the resume is tailored for the role.

**Analysis Steps:**
1.  **Calculate Match Score:** Carefully compare the skills, experience, and qualifications in the resume with the requirements in the job description. Provide a match score from 0 to 100. A score of 100 means a perfect match.
2.  **Write Analysis Summary:** Write a concise summary explaining the score. Mention the key strengths and weaknesses of the resume in relation to the job.
3.  **Identify Keywords:** Extract key skills and technologies from the job description. Identify which of these are present in the resume (matchingKeywords) and which are absent (missingKeywords).
4.  **Provide Suggestions:** Offer concrete, actionable suggestions for how the user can improve their resume. This could include adding missing keywords, rephrasing experience to align with the job description, or highlighting specific projects. Format the suggestions as a single string with newline characters for separation.

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

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumePrompt(input);
    return output!;
  }
);
