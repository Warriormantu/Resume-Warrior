'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Clipboard, FileText } from 'lucide-react';
import { generateCoverLetterAction, rephraseCoverLetterAction } from '@/app/actions';

export default function CoverLetterGeneratorPage() {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeContent, setResumeContent] = useState('');
  const [userName, setUserName] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || !resumeContent.trim() || !userName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide your name, the job description, and your resume content.',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedLetter('');

    try {
      const result = await generateCoverLetterAction({
        jobDescription,
        resumeContent,
        userName,
      });

      if (result?.coverLetter) {
        setGeneratedLetter(result.coverLetter);
        toast({
          title: 'Cover Letter Generated!',
          description: 'Your tailored cover letter is ready below.',
        });
      } else {
        throw new Error('Failed to generate cover letter.');
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
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
        title: 'Copied to clipboard!',
    });
  }

  const handleRephraseLetter = async () => {
    if (!generatedLetter.trim()) {
      toast({
        variant: 'destructive',
        title: 'No letter to rephrase',
        description: 'Please generate a cover letter first.',
      });
      return;
    }
    setIsRephrasing(true);
    try {
      const result = await rephraseCoverLetterAction(generatedLetter);
      if (result?.rephrasedCoverLetter) {
        setGeneratedLetter(result.rephrasedCoverLetter);
        toast({
          title: 'Cover Letter Rephrased!',
          description: 'The AI has provided a new version of your letter.',
        });
      } else {
        throw new Error('Failed to rephrase cover letter.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Rephrasing Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsRephrasing(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          AI Cover Letter Generator
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
          Create a professional cover letter tailored to any job description in seconds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <FileText className="text-primary" />
              Provide Your Details
            </CardTitle>
            <CardDescription>
              Enter your name, paste the job description, and your resume content below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Your Full Name</Label>
                <Input
                  id="user-name"
                  placeholder="e.g., Alex Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume-content">Your Resume Content</Label>
                <Textarea
                  id="resume-content"
                  placeholder="Paste the full content of your resume here..."
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  rows={12}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="sticky top-24 h-fit">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center justify-between">
                Generated Cover Letter
                {generatedLetter && (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRephraseLetter} disabled={isRephrasing || isLoading}>
                            {isRephrasing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Rephrase
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} disabled={isRephrasing || isLoading}>
                            <Clipboard className="mr-2 h-4 w-4" />
                            Copy
                        </Button>
                    </div>
                )}
              </CardTitle>
              <CardDescription>
                Your AI-generated cover letter will appear here. Review and edit as needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Textarea
                  className="bg-muted min-h-[400px] whitespace-pre-wrap text-sm font-sans"
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  placeholder="Your generated letter will be displayed here..."
                  disabled={isLoading}
                  rows={20}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
