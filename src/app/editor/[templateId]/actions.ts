'use server';
import { rephraseResumePoints } from '@/ai/flows/rephrase-resume-points';
import { generateSummary, type GenerateSummaryInput } from '@/ai/flows/generate-summary';

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
