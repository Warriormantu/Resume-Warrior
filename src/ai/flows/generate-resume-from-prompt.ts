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
  personalInfo: z.object({
    name: z.string().describe("The user's full name."),
    jobTitle: z.string().describe("The user's job title or a professional headline.").optional(),
    email: z.string().describe("The user's email address."),
    phone: z.string().describe("The user's phone number."),
    address: z.string().describe("The user's city and state."),
  }),
  summary: z.string().describe("A 2-3 sentence professional summary."),
  experience: z.array(z.object({
    id: z.string().describe("A unique ID for this experience, e.g., '1'."),
    title: z.string().describe("The job title."),
    company: z.string().describe("The company name."),
    startDate: z.string().describe("The start date in YYYY-MM format."),
    endDate: z.string().describe("The end date in YYYY-MM format, or 'Present' if current."),
    points: z.array(z.string()).describe("Bulleted list of key achievements."),
  })),
  education: z.array(z.object({
     id: z.string().describe("A unique ID for this education, e.g., '1'."),
     institution: z.string().describe("The name of the school or university."),
     degree: z.string().describe("The degree or certificate obtained."),
     startDate: z.string().describe("The start date in YYYY-MM format."),
     endDate: z.string().describe("The end date in YYYY-MM format."),
  })),
  projects: z.array(z.object({
    id: z.string().describe("A unique ID for this project, e.g., '1'."),
    name: z.string().describe("The name of the project."),
    description: z.string().describe("A brief description of the project."),
    url: z.string().optional().describe("A URL to the project if available."),
    points: z.array(z.string()).describe("Bulleted list of key features or contributions."),
  })).optional().describe("A list of personal or professional projects."),
  publications: z.array(z.object({
    id: z.string().describe("A unique ID for this publication, e.g., '1'."),
    title: z.string().describe("The title of the publication."),
    authors: z.array(z.string()).describe("List of authors."),
    journal: z.string().describe("The journal or conference name."),
    year: z.string().describe("The publication year in YYYY format."),
    url: z.string().optional().describe("A URL to the publication if available."),
  })).optional().describe("A list of publications, relevant for academic or research roles."),
  skills: z.array(z.object({
    id: z.string().describe("A unique ID for this skill, e.g., '1'."),
    name: z.string().describe("The name of the skill."),
  })).describe("A list of relevant skills."),
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
  prompt: `You are an expert resume writer. A user will provide a prompt describing their background. Your task is to generate a complete, professional resume draft based on this prompt. The output MUST be a valid JSON object that conforms to the provided output schema. Fill in all the fields (personalInfo, summary, experience, education, projects, skills) as best you can based on the user's prompt. For dates, use YYYY-MM format. For current jobs, use 'Present' as the end date. Also generate a suitable job title based on the prompt. For academic or research roles, include a list of publications. For each skill, provide a unique ID.

User Prompt:
{{{prompt}}}`,
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
