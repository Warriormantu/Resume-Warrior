'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { generateResumeAction } from '@/app/actions';
import type { ResumeData } from '@/lib/types';

export function GenerateResumeForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Prompt is empty',
        description: 'Please describe your experience to generate a resume.',
      });
      return;
    }
    setIsLoading(true);

    try {
      const result = await generateResumeAction(prompt);
      if (result) {
        const fullResumeData: ResumeData = {
            personalInfo: {
                name: result.personalInfo?.name || 'Your Name',
                jobTitle: result.personalInfo?.jobTitle || '',
                email: result.personalInfo?.email || '',
                phone: result.personalInfo?.phone || '',
                address: result.personalInfo?.address || '',
                linkedin: '',
                portfolio: '',
            },
            summary: result.summary || '',
            experience: result.experience?.map(exp => {
                const isCurrent = !!exp.endDate?.toLowerCase().includes('present');
                return {
                    ...exp,
                    location: '', 
                    isCurrent: isCurrent, 
                    endDate: isCurrent ? '' : exp.endDate,
                    points: exp.points || []
                };
            }) || [],
            education: result.education?.map(edu => ({
                ...edu, 
                fieldOfStudy: '',
                endDate: edu.endDate || ''
            })) || [],
            projects: result.projects?.map(proj => ({ ...proj, points: proj.points || [] })) || [],
            custom: result.custom?.map(c => ({...c})) || [],
            skills: result.skills || [],
        };

        localStorage.setItem('resume-draft', JSON.stringify(fullResumeData));
        toast({
          title: 'Draft Generated!',
          description: 'Redirecting you to the editor...',
        });
        router.push('/editor/classic-professional');
      } else {
        throw new Error('Failed to generate resume draft.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Wand2 className="text-primary"/>Generate a Resume Draft with AI</CardTitle>
        <CardDescription>
          Don't know where to start? Just describe your experience and let our AI create a resume draft for you in seconds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., I'm a software engineer with 5 years of experience in React and Node.js. I worked at TechCorp where I built a new e-commerce platform..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Draft
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
