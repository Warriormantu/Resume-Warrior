'use server';

import { generateResumeFromPrompt } from '@/ai/flows/generate-resume-from-prompt';
import type { GenerateResumeFromPromptOutput } from '@/ai/flows/generate-resume-from-prompt';

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
