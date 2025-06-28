
import {createApiHandler} from '@genkit-ai/next';

// Import all the flows to ensure they are registered with Genkit
// and included in the production build by Next.js.
import '@/ai/flows/analyze-resume';
import '@/ai/flows/generate-cover-letter';
import '@/ai/flows/generate-resume-from-prompt';
import '@/ai/flows/generate-summary';
import '@/ai/flows/rephrase-cover-letter';
import '@/ai/flows/rephrase-resume-points';

export const {GET, POST} = createApiHandler();
