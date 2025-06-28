'use server';

import type { GenerateResumeFromPromptOutput } from '@/ai/flows/generate-resume-from-prompt';
import type { GenerateCoverLetterInput, GenerateCoverLetterOutput } from '@/ai/flows/generate-cover-letter';
import type { AnalyzeResumeInput, AnalyzeResumeOutput } from '@/ai/flows/analyze-resume';
import type { GenerateSummaryInput } from '@/ai/flows/generate-summary';

function getBaseUrl() {
    // Use the `URL` environment variable provided by Netlify, or fall back to localhost for local development.
    return process.env.URL || 'http://localhost:9002';
}

async function callGenkitFlow<T>(flowName: string, input: any): Promise<T | null> {
    const baseUrl = getBaseUrl();
    try {
        const response = await fetch(`${baseUrl}/api/genkit/${flowName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API call to ${flowName} failed with status ${response.status}:`, errorText);
            return null;
        }

        const result = await response.json();
        return result.output;

    } catch (error) {
        console.error(`Error calling ${flowName}:`, error);
        return null;
    }
}


export async function generateResumeAction(prompt: string): Promise<GenerateResumeFromPromptOutput | null> {
    if (!prompt) return null;
    return callGenkitFlow<GenerateResumeFromPromptOutput>('generateResumeFromPromptFlow', { prompt });
}

export async function generateCoverLetterAction(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput | null> {
    if (!input.jobDescription || !input.resumeContent || !input.userName) return null;
    return callGenkitFlow<GenerateCoverLetterOutput>('generateCoverLetterFlow', input);
}

export async function rephraseCoverLetterAction(coverLetter: string): Promise<{ rephrasedCoverLetter: string } | null> {
    if (!coverLetter) return null;
    const output = await callGenkitFlow<{ rephrasedCoverLetter: string }>('rephraseCoverLetterFlow', { coverLetter });
    return output ? { rephrasedCoverLetter: output.rephrasedCoverLetter } : null;
}

export async function analyzeResumeAction(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput | null> {
    if (!input.resumeContent || !input.jobDescription) return null;
    return callGenkitFlow<AnalyzeResumeOutput>('analyzeResumeFlow', input);
}

export async function getRephrasedPoints(points: string[]): Promise<string[] | null> {
  if (!points || points.length === 0) return [];

  const input = {
      skills: [],
      experiencePoints: points,
  };
  
  const output = await callGenkitFlow<{ rephrasedExperiencePoints: string[] }>('rephraseResumePointsFlow', input);
  return output ? output.rephrasedExperiencePoints : null;
}

export async function getAiSummary(input: GenerateSummaryInput): Promise<string | null> {
    if (!input.name || !input.experience?.length || !input.skills?.length) return null;
    
    const output = await callGenkitFlow<{ summary: string }>('generateSummaryFlow', input);
    return output ? output.summary : null;
}
