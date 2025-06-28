'use server';

import { generateResumeFromPrompt } from '@/ai/flows/generate-resume-from-prompt';
import type { GenerateResumeFromPromptOutput } from '@/ai/flows/generate-resume-from-prompt';
import { generateCoverLetter, type GenerateCoverLetterInput, type GenerateCoverLetterOutput } from '@/ai/flows/generate-cover-letter';
import { rephraseCoverLetter } from '@/ai/flows/rephrase-cover-letter';
import { analyzeResume, type AnalyzeResumeInput, type AnalyzeResumeOutput } from '@/ai/flows/analyze-resume';
import { rephraseResumePoints } from '@/ai/flows/rephrase-resume-points';
import { generateSummary, type GenerateSummaryInput } from '@/ai/flows/generate-summary';

export async function generateResumeAction(prompt: string): Promise<GenerateResumeFromPromptOutput | null> {
    if (!prompt) {
        return null;
    }
    try {
        const result = await generateResumeFromPrompt({ prompt });
        return result;
    } catch(error) {
        console.error("Error in generateResumeAction:", error);
        return null;
    }
}

export async function generateCoverLetterAction(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput | null> {
    if (!input.jobDescription || !input.resumeContent || !input.userName) {
        return null;
    }
    try {
        const result = await generateCoverLetter(input);
        return result;
    } catch (error) {
        console.error("Error in generateCoverLetterAction:", error);
        return null;
    }
}

export async function rephraseCoverLetterAction(coverLetter: string): Promise<{ rephrasedCoverLetter: string } | null> {
    if (!coverLetter) {
        return null;
    }
    try {
        const result = await rephraseCoverLetter({ coverLetter });
        return result;
    } catch (error) {
        console.error("Error in rephraseCoverLetterAction:", error);
        return null;
    }
}

export async function analyzeResumeAction(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput | null> {
    if (!input.resumeContent || !input.jobDescription) {
        return null;
    }
    try {
        const result = await analyzeResume(input);
        return result;
    } catch (error) {
        console.error("Error in analyzeResumeAction:", error);
        return null;
    }
}

export async function getRephrasedPoints(points: string[]): Promise<string[] | null> {
  if (!points || points.length === 0) {
    return [];
  }
  try {
    const result = await rephraseResumePoints({
      skills: [], // Not rephrasing skills here, just experience
      experiencePoints: points,
    });
    return result.rephrasedExperiencePoints;
  } catch (error) {
    console.error("AI rephrasing failed:", error);
    return null;
  }
}

export async function getAiSummary(input: GenerateSummaryInput): Promise<string | null> {
    if (!input.name || !input.experience?.length || !input.skills?.length) {
        return null;
    }
    try {
        const result = await generateSummary(input);
        return result.summary;
    } catch (error) {
        console.error("AI summary generation failed:", error);
        return null;
    }
}
