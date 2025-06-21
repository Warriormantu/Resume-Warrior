'use client';

import { useParams, useRouter } from 'next/navigation';
import { getTemplateById } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit } from 'lucide-react';
import { ResumePreview } from '@/components/ResumePreview';
import { sampleResumeData } from '@/lib/sampleData';


export default function BuyPage() {
    const params = useParams();
    const router = useRouter();
    const template = getTemplateById(params.templateId as string);

    if (!template) {
        return <div className="container py-12 text-center">Template not found.</div>;
    }
    
    return (
        <div className="container py-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h1 className="text-3xl font-bold font-headline mb-2">{template.name}</h1>
                    <p className="text-muted-foreground mb-6">Preview of the template.</p>
                    <div className="rounded-lg shadow-lg border overflow-hidden aspect-[8.5/11]">
                        <div className="w-[166.67%] h-[166.67%] origin-top-left scale-[0.6]">
                            <ResumePreview data={sampleResumeData} template={template} />
                        </div>
                    </div>
                </div>
                <div className="sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Use This Template</CardTitle>
                            <CardDescription>All our templates are free to use. Get started now!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Free to use</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> PDF & Image downloads</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> AI-powered editing</li>
                            </ul>
                            <Button className="w-full" size="lg" onClick={() => router.push(`/editor/${template.id}`)}>
                                <Edit className="mr-2 h-4 w-4" /> Use Template
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
