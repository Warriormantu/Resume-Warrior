'use client';

import { useParams } from 'next/navigation';
import { getTemplateById } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ResumePreview } from '@/components/ResumePreview';
import { sampleResumeData } from '@/lib/sampleData';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function BuyPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const template = getTemplateById(params.templateId as string);

    if (!template) {
        return <div className="container py-12 text-center">Template not found.</div>;
    }

    const handlePayment = async () => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1DPQoVjVpLpQ8D', // Use a public test key
            amount: template.price * 100, // Amount in paise
            currency: 'INR',
            name: 'Resume_Warrior',
            description: `Purchase of ${template.name} Template`,
            image: '/icon.svg',
            handler: function (response: any) {
                toast({
                    title: "Payment Successful!",
                    description: `You can now use the ${template.name} template.`,
                });
                // In a real app, you would verify payment on the server and grant access.
                router.push(`/editor/${template.id}`);
            },
            prefill: {
                name: 'Test User',
                email: 'test.user@example.com',
                contact: '9999999999',
            },
            notes: {
                template_id: template.id,
            },
            theme: {
                color: '#191970', // Midnight Blue
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: "Something went wrong. Please try again.",
            });
        });
        rzp.open();
    };


    return (
        <div className="container py-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h1 className="text-3xl font-bold font-headline mb-2">{template.name}</h1>
                    <p className="text-muted-foreground mb-6">Preview of the premium template.</p>
                    <div className="rounded-lg shadow-lg border overflow-hidden aspect-[8.5/11]">
                        <div className="w-[166.67%] h-[166.67%] origin-top-left scale-[0.6]">
                            <ResumePreview data={sampleResumeData} template={template} />
                        </div>
                    </div>
                </div>
                <div className="sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Complete Your Purchase</CardTitle>
                            <CardDescription>Unlock this premium template for a one-time payment.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-6">₹{template.price}</div>
                            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> One-time payment</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Lifetime access to this template</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> PDF & Image downloads</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> AI-powered editing</li>
                            </ul>
                            <Button className="w-full" size="lg" onClick={handlePayment}>
                                <CreditCard className="mr-2 h-4 w-4" /> Buy Now for ₹{template.price}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
