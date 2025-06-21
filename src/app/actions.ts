'use server';

import { generateResumeFromPrompt } from '@/ai/flows/generate-resume-from-prompt';
import type { GenerateResumeFromPromptOutput } from '@/ai/flows/generate-resume-from-prompt';
import { generateCoverLetter, type GenerateCoverLetterInput, type GenerateCoverLetterOutput } from '@/ai/flows/generate-cover-letter';

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
