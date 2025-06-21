'use server';
import { rephraseResumePoints } from '@/ai/flows/rephrase-resume-points';

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
