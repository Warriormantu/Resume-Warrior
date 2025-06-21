import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Sparkles, Download } from "lucide-react";
import Link from "next/link";
import { ResumePreview } from "@/components/ResumePreview";
import { sampleResumeData } from "@/lib/sampleData";
import { templates } from "@/lib/templates";

export default function Home() {
  const featuredTemplate = templates.find(t => t.id === 'modern-creative') || templates[0];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 lg:py-40 text-center bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4 animate-fade-in-up">
            Build Your Professional Resume in Minutes
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Choose a template, fill in your details, and let our AI assistant
            help you craft the perfect resume to land your dream job.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" variant="secondary">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="mx-auto bg-accent/20 text-accent p-3 rounded-full w-fit">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">1. Select a Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Browse our gallery of professionally designed resume templates.
                  Find the perfect look for your industry.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="mx-auto bg-accent/20 text-accent p-3 rounded-full w-fit">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">2. AI-Powered Editing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Fill in your details and use our AI to rephrase and enhance your
                  experience points for maximum impact.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <div className="mx-auto bg-accent/20 text-accent p-3 rounded-full w-fit">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">3. Download Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Instantly download your finished resume as a high-quality PDF
                  or image file, ready to be sent to employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="rounded-lg shadow-lg border overflow-hidden">
                <div className="scale-75 origin-top-left -translate-x-12 -translate-y-16">
                    <ResumePreview data={sampleResumeData} template={featuredTemplate} />
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold font-headline mb-4">AI That Works For You</h2>
                <p className="text-muted-foreground mb-6">Our generative AI helps you overcome writer's block and fine-tune your resume content. Transform your bullet points from simple statements to compelling achievements that catch a recruiter's eye.</p>
                <Button asChild variant="default">
                    <Link href="/templates">Get Started Now</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
