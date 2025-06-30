'use client';

import { useEffect, useRef, useState } from 'react';
import type { Template } from '@/lib/templates';
import type { ResumeData } from '@/lib/types';
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
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
  Library,
  GripVertical,
  Paintbrush
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import { getRephrasedPoints, getAiSummary } from '@/app/actions';
import { sampleResumeData } from '@/lib/sampleData';
import { ResumePreview } from '@/components/ResumePreview';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SortableExperienceCard = ({
  index,
  onRemove,
  onRephrase,
  rephrasingIndex,
}: {
  index: number;
  onRemove: (index: number) => void;
  onRephrase: (index: number) => void;
  rephrasingIndex: number | null;
}) => {
  const { control, getValues, watch } = useFormContext<ResumeData>();
  const fieldId = getValues(`experience.${index}.id`);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
      <Card className="p-4 bg-background">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Experience #{index + 1}</h4>
            <div className="flex items-center">
              <Button type="button" variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
                <GripVertical className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField name={`experience.${index}.title`} control={control} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
            <FormField name={`experience.${index}.company`} control={control} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField name={`experience.${index}.startDate`} control={control} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)} />
            <FormField name={`experience.${index}.endDate`} control={control} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="month" {...field} disabled={watch(`experience.${index}.isCurrent`)} /></FormControl></FormItem>)} />
          </div>
          <FormField
            control={control}
            name={`experience.${index}.isCurrent`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    I currently work here
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField name={`experience.${index}.points`} control={control} render={({ field }) => (<FormItem><FormLabel>Key Responsibilities/Achievements</FormLabel><FormControl><Textarea {...field} value={Array.isArray(field.value) ? field.value.join('\n') : ''} onChange={e => field.onChange(e.target.value.split('\n'))} placeholder="Enter each point on a new line." rows={4} /></FormControl></FormItem>)} />
          <Button type="button" size="sm" onClick={() => onRephrase(index)} disabled={rephrasingIndex === index}>
            {rephrasingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            AI Rephrase Points
          </Button>
        </div>
      </Card>
    </div>
  );
};

const SortableEducationCard = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: (index: number) => void;
}) => {
  const { control, getValues } = useFormContext<ResumeData>();
  const fieldId = getValues(`education.${index}.id`);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
       <Card className="p-4 bg-background">
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                   <h4 className="font-semibold">Education #{index + 1}</h4>
                    <div className="flex items-center">
                        <Button type="button" variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
                            <GripVertical className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
               </div>
                <FormField name={`education.${index}.institution`} control={control} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                <FormField name={`education.${index}.degree`} control={control} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField name={`education.${index}.startDate`} control={control} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)}/>
                    <FormField name={`education.${index}.endDate`} control={control} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl></FormItem>)}/>
                </div>
           </div>
       </Card>
    </div>
  );
};


const SortableProjectCard = ({
  index,
  onRemove,
  onRephrase,
  rephrasingIndex,
}: {
  index: number;
  onRemove: (index: number) => void;
  onRephrase: (index: number) => void;
  rephrasingIndex: number | null;
}) => {
  const { control, getValues } = useFormContext<ResumeData>();
  const fieldId = getValues(`projects.${index}.id`);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
       <Card className="p-4 bg-background">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Project #{index + 1}</h4>
                    <div className="flex items-center">
                        <Button type="button" variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
                            <GripVertical className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
                <FormField name={`projects.${index}.name`} control={control} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                <FormField name={`projects.${index}.url`} control={control} render={({ field }) => (<FormItem><FormLabel>Project URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)}/>
                <FormField name={`projects.${index}.description`} control={control} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={2}/></FormControl></FormItem>)}/>
                <FormField name={`projects.${index}.points`} control={control} render={({ field }) => (<FormItem><FormLabel>Key Points/Features</FormLabel><FormControl><Textarea {...field} value={Array.isArray(field.value) ? field.value.join('\n') : ''} onChange={e => field.onChange(e.target.value.split('\n'))} placeholder="Enter each point on a new line." rows={3}/></FormControl></FormItem>)}/>
                <Button type="button" size="sm" onClick={() => onRephrase(index)} disabled={rephrasingIndex === index}>
                    {rephrasingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    AI Rephrase Points
                </Button>
            </div>
        </Card>
    </div>
  );
};

const SortableCustomCard = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: (index: number) => void;
}) => {
  const { control, getValues } = useFormContext<ResumeData>();
  const fieldId = getValues(`custom.${index}.id`);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
       <Card className="p-4 bg-background">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <FormField name={`custom.${index}.title`} control={control} render={({ field }) => (<FormItem className="flex-grow"><FormLabel className="sr-only">Section Title</FormLabel><FormControl><Input {...field} placeholder="Section Title (e.g., Awards)" className="text-lg font-semibold" /></FormControl></FormItem>)}/>
                    <div className="flex items-center">
                        <Button type="button" variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
                            <GripVertical className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
                <FormField name={`custom.${index}.content`} control={control} render={({ field }) => (<FormItem><FormLabel className="sr-only">Section Content</FormLabel><FormControl><Textarea {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value)} placeholder="Enter each point on a new line." rows={4}/></FormControl></FormItem>)}/>
            </div>
        </Card>
    </div>
  );
};

const SortableSkillItem = ({
  index,
  fieldId,
  onRemove,
}: {
  index: number;
  fieldId: string;
  onRemove: (index: number) => void;
}) => {
  const { control } = useFormContext<ResumeData>();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 touch-none">
      <Button type="button" variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4" />
      </Button>
      <FormField
        control={control}
        name={`skills.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-grow">
            <FormControl>
              <Input {...field} placeholder={`Skill #${index + 1}`} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
};


export function ResumeEditor({ template }: { template: Template }) {
  const { toast } = useToast();
  const form = useForm<ResumeData>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: sampleResumeData,
  });

  const [accentColor, setAccentColor] = useState('#009cff');
  const [fontFamily, setFontFamily] = useState('Inter');

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

  const { fields: expFields, append: appendExp, remove: removeExp, move: moveExp } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu, move: moveEdu } = useFieldArray({
    control: form.control,
    name: "education"
  });
  
  const { fields: projFields, append: appendProj, remove: removeProj, move: moveProj } = useFieldArray({
    control: form.control,
    name: "projects"
  });
  
  const { fields: customFields, append: appendCustom, remove: removeCustom, move: moveCustom } = useFieldArray({
    control: form.control,
    name: "custom"
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill, move: moveSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });


  const watchedData = form.watch();
  const previewRef = useRef<HTMLDivElement>(null);
  const [rephrasingIndex, setRephrasingIndex] = useState<number | null>(null);
  const [rephrasingProjectIndex, setRephrasingProjectIndex] = useState<number | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (
    event: DragEndEvent,
    moveFn: (from: number, to: number) => void,
    fields: { id: string }[]
  ) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveFn(oldIndex, newIndex);
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    toast({ title: 'Generating PDF...', description: 'Please wait a moment.' });
    
    const element = previewRef.current;
    element.classList.add('print-force');

    try {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        
        element.classList.remove('print-force');

        const imgData = canvas.toDataURL('image/png');
        if (imgData.length < 100) {
            throw new Error('Generated image data is empty.');
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${watchedData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
    } catch (error) {
        console.error("PDF generation failed:", error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not generate the PDF. Please try again.',
        });
        element.classList.remove('print-force');
    }
  };

  const handleDownloadImage = async () => {
    if (!previewRef.current) return;
    toast({ title: 'Generating Image...', description: 'Please wait a moment.' });
    
    const element = previewRef.current;
    element.classList.add('print-force');

    try {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });

        element.classList.remove('print-force');
        
        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl.length < 100) {
            throw new Error('Generated image data is empty.');
        }

        const link = document.createElement('a');
        link.download = `${watchedData.personalInfo.name.replace(' ', '_')}_Resume.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error("Image generation failed:", error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not generate the image. Please try again.',
        });
        element.classList.remove('print-force');
    }
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
  
  const handleRephraseProjectPoints = async (projectIndex: number) => {
    setRephrasingProjectIndex(projectIndex);
    const points = form.getValues(`projects.${projectIndex}.points`);
    const rephrased = await getRephrasedPoints(points || []);
    if (rephrased) {
        form.setValue(`projects.${projectIndex}.points`, rephrased);
        toast({ title: 'AI Rephrase Successful', description: 'Your project points have been updated.' });
    } else {
        toast({ variant: "destructive", title: 'AI Rephrase Failed', description: 'Could not rephrase points at this time.' });
    }
    setRephrasingProjectIndex(null);
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
  
  const accentColorBg = hexToRgba(accentColor, 0.1);

  return (
    <FormProvider {...form}>
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-56px)]">
        <div className="w-full bg-secondary p-8 overflow-y-auto max-h-[calc(100vh-56px)]">
          <h1 className="text-2xl font-bold font-headline mb-1">Editing: {template.name}</h1>
          <p className="text-muted-foreground mb-6">Fill in your details below. The preview will update automatically.</p>
          
          <Form {...form}>
            <form className="space-y-4">
              <Accordion type="multiple" defaultValue={['appearance', 'personal', 'summary', 'experience', 'education', 'projects', 'custom', 'skills']} className="w-full">
                {/* Appearance */}
                <AccordionItem value="appearance">
                    <AccordionTrigger><Paintbrush className="mr-2"/>Appearance</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        <div className="grid grid-cols-2 gap-4">
                            <FormItem>
                                <FormLabel>Accent Color</FormLabel>
                                <FormControl>
                                    <Input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="p-1 h-10"/>
                                </FormControl>
                            </FormItem>
                            <FormItem>
                                <FormLabel>Font Family</FormLabel>
                                 <Select value={fontFamily} onValueChange={setFontFamily}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a font" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Inter">Sans Serif (Inter)</SelectItem>
                                        <SelectItem value="Lora">Serif (Lora)</SelectItem>
                                        <SelectItem value="Space Grotesk">Modern (Space Grotesk)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                {/* Personal Info */}
                <AccordionItem value="personal">
                  <AccordionTrigger><User className="mr-2"/>Personal Information</AccordionTrigger>
                  <AccordionContent className="space-y-4 p-1">
                    <FormField name="personalInfo.name" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="personalInfo.jobTitle" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Job Title / Headline</FormLabel><FormControl><Input placeholder="e.g. Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
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
                      <DndContext id="experience-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, moveExp, expFields)}>
                        <SortableContext items={expFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-4">
                                {expFields.map((field, index) => (
                                    <SortableExperienceCard
                                        key={field.id}
                                        index={index}
                                        onRemove={removeExp}
                                        onRephrase={handleRephrase}
                                        rephrasingIndex={rephrasingIndex}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                      </DndContext>
                        <Button type="button" variant="outline" onClick={() => appendExp({ id: `${Date.now()}`, title: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, points: [] })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Experience
                        </Button>
                    </AccordionContent>
                </AccordionItem>

                 {/* Education */}
                <AccordionItem value="education">
                    <AccordionTrigger><GraduationCap className="mr-2"/>Education</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        <DndContext id="education-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, moveEdu, eduFields)}>
                            <SortableContext items={eduFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-4">
                                    {eduFields.map((field, index) => (
                                        <SortableEducationCard key={field.id} index={index} onRemove={removeEdu} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                       <Button type="button" variant="outline" onClick={() => appendEdu({ id: `${Date.now()}`, institution: '', degree: '', startDate: '', fieldOfStudy: '', endDate: '' })}>
                           <PlusCircle className="mr-2 h-4 w-4"/> Add Education
                       </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Projects */}
                <AccordionItem value="projects">
                    <AccordionTrigger><Rocket className="mr-2"/>Projects</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        <DndContext id="projects-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, moveProj, projFields)}>
                            <SortableContext items={projFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-4">
                                {projFields.map((field, index) => (
                                    <SortableProjectCard 
                                        key={field.id} 
                                        index={index} 
                                        onRemove={removeProj}
                                        onRephrase={handleRephraseProjectPoints}
                                        rephrasingIndex={rephrasingProjectIndex}
                                    />
                                ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <Button type="button" variant="outline" onClick={() => appendProj({ id: `${Date.now()}`, name: '', description: '', url: '', points: [] })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Project
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Custom Sections */}
                <AccordionItem value="custom">
                    <AccordionTrigger><Library className="mr-2"/>Additional Sections</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        <DndContext id="custom-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, moveCustom, customFields)}>
                            <SortableContext items={customFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-4">
                                {customFields.map((field, index) => (
                                    <SortableCustomCard 
                                        key={field.id} 
                                        index={index} 
                                        onRemove={removeCustom}
                                    />
                                ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <Button type="button" variant="outline" onClick={() => appendCustom({ id: `${Date.now()}`, title: '', content: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Section
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                {/* Skills */}
                <AccordionItem value="skills">
                    <AccordionTrigger><Wrench className="mr-2"/>Skills</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-1">
                        <DndContext id="skills-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, moveSkill, skillFields)}>
                            <SortableContext items={skillFields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2">
                                    {skillFields.map((field, index) => (
                                        <SortableSkillItem
                                            key={field.id}
                                            fieldId={field.id}
                                            index={index}
                                            onRemove={removeSkill}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <Button type="button" variant="outline" onClick={() => appendSkill({ id: `${Date.now()}`, name: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Skill
                        </Button>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </div>
        <div className="w-full bg-background p-8 overflow-y-auto max-h-[calc(100vh-56px)] hidden lg:block">
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-4 flex gap-4 justify-center">
                <Button onClick={handleDownloadPDF}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                <Button onClick={handleDownloadImage} variant="outline"><ImageIcon className="mr-2 h-4 w-4"/> Download PNG</Button>
            </div>
            <div className="flex justify-center">
                <div className="origin-top transform scale-[0.75]">
                    <ResumePreview 
                        data={watchedData} 
                        template={template} 
                        ref={previewRef}
                        accentColor={accentColor}
                        accentColorBg={accentColorBg}
                        fontFamily={fontFamily}
                     />
                </div>
            </div>
        </div>
        {/* Download buttons for mobile view */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-20 p-4 border-t flex gap-4 justify-center">
             <Button onClick={handleDownloadPDF}><Download className="mr-2 h-4 w-4" /> PDF</Button>
             <Button onClick={handleDownloadImage} variant="outline"><ImageIcon className="mr-2 h-4 w-4"/> PNG</Button>
        </div>
      </div>
    </FormProvider>
  );
}
