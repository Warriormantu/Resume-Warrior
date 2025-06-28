'use server';

// Import all flows to ensure they are bundled with the server actions.
import '@/ai/flows/rephrase-resume-points.ts';
import '@/ai/flows/generate-resume-from-prompt.ts';
import '@/ai/flows/generate-summary.ts';
import '@/ai/flows/generate-cover-letter.ts';
import '@/ai/flows/rephrase-cover-letter.ts';
import '@/ai/flows/analyze-resume.ts';

import {
  generateResumeFromPrompt,
  type GenerateResumeFromPromptOutput,
} from '@/ai/flows/generate-resume-from-prompt';
import {
  generateCoverLetter,
  type GenerateCoverLetterInput,
  type GenerateCoverLetterOutput,
} from '@/ai/flows/generate-cover-letter';
import { rephraseCoverLetter } from '@/ai/flows/rephrase-cover-letter';
import {
  analyzeResume,
  type AnalyzeResumeInput,
  type AnalyzeResumeOutput,
} from '@/ai/flows/analyze-resume';
import { rephraseResumePoints } from '@/ai/flows/rephrase-resume-points';
import {
  generateSummary,
  type GenerateSummaryInput,
} from '@/ai/flows/generate-summary';

export async function generateResumeAction(
  prompt: string
): Promise<GenerateResumeFromPromptOutput | null> {
  if (!prompt) return null;
  try {
    return await generateResumeFromPrompt({ prompt });
  } catch (error) {
    console.error(`Error in generateResumeAction:`, error);
    return null;
  }
}

export async function generateCoverLetterAction(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput | null> {
  if (!input.jobDescription || !input.resumeContent || !input.userName)
    return null;
  try {
    return await generateCoverLetter(input);
  } catch (error) {
    console.error(`Error in generateCoverLetterAction:`, error);
    return null;
  }
}

export async function rephraseCoverLetterAction(
  coverLetter: string
): Promise<{ rephrasedCoverLetter: string } | null> {
  if (!coverLetter) return null;
  try {
    return await rephraseCoverLetter({ coverLetter });
  } catch (error) {
    console.error(`Error in rephraseCoverLetterAction:`, error);
    return null;
  }
}

export async function analyzeResumeAction(
  input: AnalyzeResumeInput
): Promise<AnalyzeResumeOutput | null> {
  if (!input.resumeContent || !input.jobDescription) return null;
  try {
    return await analyzeResume(input);
  } catch (error) {
    console.error(`Error in analyzeResumeAction:`, error);
    return null;
  }
}

export async function getRephrasedPoints(
  points: string[]
): Promise<string[] | null> {
  if (!points || points.length === 0) return [];

  const input = {
    skills: [],
    experiencePoints: points,
  };

  try {
    const output = await rephraseResumePoints(input);
    return output ? output.rephrasedExperiencePoints : null;
  } catch (error) {
    console.error(`Error in getRephrasedPoints:`, error);
    return null;
  }
}

export async function getAiSummary(
  input: GenerateSummaryInput
): Promise<string | null> {
  if (!input.name || !input.experience?.length || !input.skills?.length)
    return null;
  try {
    const output = await generateSummary(input);
    return output ? output.summary : null;
  } catch (error) {
    console.error(`Error in getAiSummary:`, error);
    return null;
  }
}
