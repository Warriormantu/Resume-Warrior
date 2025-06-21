'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, FileScan, CheckCircle, XCircle } from 'lucide-react';
import { analyzeResumeAction } from '@/app/actions';
import type { AnalyzeResumeOutput } from '@/ai/flows/analyze-resume';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ResumeAnalyzerPage() {
  const { toast } = useToast();
  const [resumeContent, setResumeContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeContent.trim() || !jobDescription.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please paste both your resume and the job description.',
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeResumeAction({
        resumeContent,
        jobDescription,
      });

      if (result) {
        setAnalysisResult(result);
        toast({
          title: 'Analysis Complete!',
          description: 'Your resume analysis is ready below.',
        });
      } else {
        throw new Error('Failed to analyze resume.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          AI Resume Analyzer
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
          Get an instant analysis of how well your resume matches a job description and find out how to improve it.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <FileScan className="text-primary" />
              Analyze Your Resume
            </CardTitle>
            <CardDescription>
              Paste your resume content and the job description for the role you're targeting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="resume-content" className="font-medium">Your Resume Content</label>
                <Textarea
                  id="resume-content"
                  placeholder="Paste the full content of your resume here..."
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  rows={12}
                  disabled={isLoading}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                 <label htmlFor="job-description" className="font-medium">Job Description</label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  disabled={isLoading}
                   className="bg-muted"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="sticky top-24 h-fit">
          <Card className="shadow-lg min-h-[500px]">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Analysis Results
              </CardTitle>
              <CardDescription>
                Your resume match score and improvement suggestions will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col justify-center items-center h-96 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analyzing... this may take a moment.</p>
                </div>
              )}
              {!isLoading && analysisResult && (
                <div className="space-y-6 animate-fade-in-up">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Match Score</h3>
                            <span className="font-bold text-2xl text-primary">{analysisResult.matchScore}%</span>
                        </div>
                        <Progress value={analysisResult.matchScore} className="h-3" />
                    </div>
                    
                    <Separator />
                    
                    <div>
                        <h3 className="font-semibold mb-2">Analysis Summary</h3>
                        <p className="text-sm text-muted-foreground">{analysisResult.analysisSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-600"><CheckCircle size={18}/>Matching Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {analysisResult.matchingKeywords.map(keyword => (
                                    <Badge key={keyword} variant="secondary" className="bg-green-100 text-green-800">{keyword}</Badge>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-600"><XCircle size={18}/>Missing Keywords</h3>
                             <div className="flex flex-wrap gap-2">
                                {analysisResult.missingKeywords.length > 0 ? analysisResult.missingKeywords.map(keyword => (
                                    <Badge key={keyword} variant="secondary" className="bg-amber-100 text-amber-800">{keyword}</Badge>
                                )) : <p className="text-sm text-muted-foreground">None! Great job.</p>}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
                        <div className="text-sm text-muted-foreground bg-secondary p-4 rounded-md whitespace-pre-line">
                           {analysisResult.suggestions}
                        </div>
                    </div>

                </div>
              )}
              {!isLoading && !analysisResult && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-muted-foreground text-center">Your analysis will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
