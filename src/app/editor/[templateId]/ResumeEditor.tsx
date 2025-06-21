'use client';

import { useEffect, useRef, useState } from 'react';
import type { Template } from '@/lib/templates';
import type { ResumeData } from '@/lib/types';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResumeSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Download,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  PlusCircle,
  Loader2,
  User,
  BookUser,
  Briefcase,
  GraduationCap,
  Wrench,
  Rocket,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import { getRephrasedPoints, getAiSummary } from './actions';
import { sampleResumeData } from '@/lib/sampleData';
import { ResumePreview } from '@/components/ResumePreview';

export function ResumeEditor({ template }: { template: Template }) {
  const { toast } = useToast();
  const form = useForm<ResumeData>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: sampleResumeData,
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem('resume-draft');
    if (savedDraft) {
        try {
            const draftData = JSON.parse(savedDraft);
            form.reset(draftData);
            toast({
                title: 'Draft Applied',
                description: 'Your AI-generated draft has been loaded into the editor.',
            });
        } catch (e) {
            console.error("Failed to parse resume draft from localStorage", e);
             toast({
                variant: 'destructive',
                title: 'Error Loading Draft',
                description: 'Could not load the generated draft.',
            });
        } finally {
            localStorage.removeItem('resume-draft');
        }
    }
  }, [form, toast]);

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "education"
  });
  
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({
    control: form.control,
    name: "projects"
  });


  const watchedData = form.watch();
  const previewRef = useRef<HTMLDivElement>(null);
  const [rephrasingIndex, setRephrasingIndex] = useState<number | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    toast({ title: 'Generating PDF...', description: 'Please wait a moment.' });
    const canvas = await html2canvas(previewRef.current, { scale: 3 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${watchedData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
  };

  const handleDownloadImage = async () => {
    if (!previewRef.current) return;
    toast({ title: 'Generating Image...', description: 'Please wait a moment.' });
    const canvas = await html2canvas(previewRef.current, { scale: 3 });
    const link = document.createElement('a');
    link.download = `${watchedData.personalInfo.name.replace(' ', '_')}_Resume.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleRephrase = async (experienceIndex: number) => {
    setRephrasingIndex(experienceIndex);
    const points = form.getValues(`experience.${experienceIndex}.points`);
    const rephrased = await getRephrasedPoints(points || []);
    if(rephrased) {
        form.setValue(`experience.${experienceIndex}.points`, rephrased);
        toast({ title: 'AI Rephrase Successful', description: 'Your experience points have been updated.' });
    } else {
        toast({ variant: "destructive", title: 'AI Rephrase Failed', description: 'Could not rephrase points at this time.' });
    }
    setRephrasingIndex(null);
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const { personalInfo, experience, skills } = form.getValues();

    const summaryInput = {
      name: personalInfo.name,
      experience: experience.map(exp => ({ title: exp.title, company: exp.company })),
      skills: skills,
    };

    const newSummary = await getAiSummary(summaryInput);

    if (newSummary) {
      form.setValue('summary', newSummary);
      toast({ title: 'AI Summary Generated', description: 'Your professional summary has been updated.' });
    } else {
      toast({ variant: 'destructive', title: 'AI Summary Failed', description: 'Could not generate a summary at this time.' });
    }
    setIsGeneratingSummary(false);
  };

  return (
    <FormProvider {...form}>
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-56px)]">
        <div className="w-full bg-secondary p-8 overflow-y-auto max-h-[calc(100vh-56px)]">
          <h1 className="text-2xl font-bold font-headline mb-1">Editing: {template.name}</h1>
          <p className="text-muted-foreground mb-6">Fill in your details below. The preview will update automatically.</p>
          
          <Form {...form}>
            <form className="space-y-4">
              <Accordion type="multiple" defaultValue={['personal', 'summary', 'experience', 'education', 'projects', 'skills']} className="w-full">
                {/* Personal Info */}
                <AccordionItem value="personal">
                  <AccordionTrigger><User className="mr-2"/>Personal Information</AccordionTrigger>
                  <AccordionContent className="space-y-4 p-1">
                    <FormField name="personalInfo.name" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="personalInfo.email" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name="personalInfo.phone" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                    <FormField name="personalInfo.address" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="personalInfo.linkedin" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField name="personalInfo.portfolio" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Portfolio/Website URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                 {/* Summary */}
                <AccordionItem value="summary">
                    <AccordionTrigger><BookUser className="mr-2"/>Professional Summary</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                         <FormField name="summary" control={form.control} render={({ field }) => (
                            <FormItem><FormControl><Textarea {...field} rows={5}/></FormControl><FormMessage /></FormItem>
                         )}/>
                         <Button type="button" size="sm" onClick={handleGenerateSummary} disabled={isGeneratingSummary}>
                            {isGeneratingSummary ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate with AI
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Experience */}
                <AccordionItem value="experience">
                    <AccordionTrigger><Briefcase className="mr-2"/>Work Experience</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        {expFields.map((field, index) => (
                            <Card key={field.id} className="p-4 bg-background">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                       <h4 className="font-semibold">Experience #{index + 1}</h4>
                                       <Button type="button" variant="ghost" size="icon" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField name={`experience.${index}.title`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                        <FormField name={`experience.${index}.company`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    </div>
                                     <div className="grid md:grid-cols-2 gap-4">
                                        <FormField name={`experience.${index}.startDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)}/>
                                        <FormField name={`experience.${index}.endDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="month" {...field} disabled={form.watch(`experience.${index}.isCurrent`)} /></FormControl></FormItem>)}/>
                                    </div>
                                    <FormField name={`experience.${index}.isCurrent`} control={form.control} render={({ field }) => (<FormItem className="flex items-center gap-2"><FormControl><Input type="checkbox" className="w-4 h-4" {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)}/></FormControl><FormLabel className="!mt-0">I currently work here</FormLabel></FormItem>)}/>
                                    <FormField name={`experience.${index}.points`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Key Responsibilities/Achievements</FormLabel><FormControl><Textarea {...field} value={Array.isArray(field.value) ? field.value.join('\n') : ''} onChange={e => field.onChange(e.target.value.split('\n'))} placeholder="Enter each point on a new line." rows={4}/></FormControl></FormItem>)}/>
                                    <Button type="button" size="sm" onClick={() => handleRephrase(index)} disabled={rephrasingIndex === index}>
                                        {rephrasingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                                        AI Rephrase Points
                                    </Button>
                                </div>
                            </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendExp({ id: `${Date.now()}`, title: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, points: [] })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Experience
                        </Button>
                    </AccordionContent>
                </AccordionItem>

                 {/* Education */}
                <AccordionItem value="education">
                    <AccordionTrigger><GraduationCap className="mr-2"/>Education</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                       {eduFields.map((field, index) => (
                           <Card key={field.id} className="p-4 bg-background">
                                <div className="space-y-4">
                                   <div className="flex justify-between items-center">
                                       <h4 className="font-semibold">Education #{index + 1}</h4>
                                       <Button type="button" variant="ghost" size="icon" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                   </div>
                                    <FormField name={`education.${index}.institution`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField name={`education.${index}.startDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)}/>
                                        <FormField name={`education.${index}.endDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)}/>
                                    </div>
                               </div>
                           </Card>
                       ))}
                       <Button type="button" variant="outline" onClick={() => appendEdu({ id: `${Date.now()}`, institution: '', degree: '', startDate: '', fieldOfStudy: '', endDate: '' })}>
                           <PlusCircle className="mr-2 h-4 w-4"/> Add Education
                       </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Projects */}
                <AccordionItem value="projects">
                    <AccordionTrigger><Rocket className="mr-2"/>Projects</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        {projFields.map((field, index) => (
                            <Card key={field.id} className="p-4 bg-background">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold">Project #{index + 1}</h4>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeProj(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                    <FormField name={`projects.${index}.name`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <FormField name={`projects.${index}.url`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Project URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                                    <FormField name={`projects.${index}.description`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={2}/></FormControl></FormItem>)}/>
                                    <FormField name={`projects.${index}.points`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Key Points/Features</FormLabel><FormControl><Textarea {...field} value={Array.isArray(field.value) ? field.value.join('\n') : ''} onChange={e => field.onChange(e.target.value.split('\n'))} placeholder="Enter each point on a new line." rows={3}/></FormControl></FormItem>)}/>
                                </div>
                            </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendProj({ id: `${Date.now()}`, name: '', description: '', url: '', points: [] })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Project
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Skills */}
                <AccordionItem value="skills">
                    <AccordionTrigger><Wrench className="mr-2"/>Skills</AccordionTrigger>
                    <AccordionContent className="p-1">
                        <FormField name="skills" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skills (comma separated)</FormLabel>
                                <FormControl><Input {...field} value={Array.isArray(field.value) ? field.value.join(', ') : ''} onChange={e => field.onChange(e.target.value.split(',').map(s => s.trim()))} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </div>
        <div className="w-full bg-background p-8 overflow-y-auto max-h-[calc(100vh-56px)] hidden lg:block">
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-4 flex gap-4 justify-center">
                <Button onClick={handleDownloadPDF}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                <Button onClick={handleDownloadImage} variant="outline"><ImageIcon className="mr-2 h-4 w-4"/> Download Image</Button>
            </div>
            <div className="aspect-[8.5/11]">
                <div className="w-[111.11%] h-[111.11%] origin-top scale-[0.9] lg:w-[166.67%] lg:h-[166.67%] lg:scale-[0.6] xl:w-[125%] xl:h-[125%] xl:scale-[0.8]">
                  <ResumePreview data={watchedData} template={template} ref={previewRef} />
                </div>
            </div>
        </div>
        {/* Download buttons for mobile view */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-20 p-4 border-t flex gap-4 justify-center">
             <Button onClick={handleDownloadPDF}><Download className="mr-2 h-4 w-4" /> PDF</Button>
             <Button onClick={handleDownloadImage} variant="outline"><ImageIcon className="mr-2 h-4 w-4"/> Image</Button>
        </div>
      </div>
    </FormProvider>
  );
}
