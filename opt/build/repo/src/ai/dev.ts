// This file is used to register all Genkit flows with the Next.js server
// and for local development with the Genkit CLI.
import {config} from 'dotenv';
config();

import '@/ai/flows/rephrase-resume-points.ts';
import '@/ai/flows/generate-resume-from-prompt.ts';
import '@/ai/flows/generate-summary.ts';
import '@/ai/flows/generate-cover-letter.ts';
import '@/ai/flows/rephrase-cover-letter.ts';
import '@/ai/flows/analyze-resume.ts';
