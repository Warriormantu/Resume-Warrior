import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Palette, Sparkles, Download, Star, Move, LayoutTemplate, Eye, FileText } from "lucide-react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { GenerateResumeForm } from "@/components/GenerateResumeForm";
import { TemplateCard } from "@/components/TemplateCard";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Marketing Manager",
    quote: "Resume Warrior's AI helped me rephrase my experience in a way I never could have on my own. I got three interviews within a week!",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
  {
    name: "Michael B.",
    role: "Software Engineer",
    quote: "The Sleek Tech template was perfect for my field. The editor is intuitive and the final PDF looked incredibly professional.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    name: "Jessica P.",
    role: "Recent Graduate",
    quote: "As a recent grad, I was lost. Resume Warrior gave me the confidence and the tools to build a resume that landed me my first job.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "person smiling"
  },
   {
    name: "David C.",
    role: "Project Manager",
    quote: "I switched careers and had to tailor my resume completely. This tool made it so easy. The AI suggestions were spot on.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "professional man"
  }
];

const companyLogos = [
  { name: "TechCorp", logo: "https://placehold.co/150x60.png", aiHint: "tech logo" },
  { name: "Innovate Inc.", logo: "https://placehold.co/150x60.png", aiHint: "startup logo" },
  { name: "Solutions Ltd.", logo: "https://placehold.co/150x60.png", aiHint: "corporate logo" },
  { name: "QuantumLeap", logo: "https://placehold.co/150x60.png", aiHint: "modern logo" },
  { name: "Apex Industries", logo: "https://placehold.co/150x60.png", aiHint: "industrial logo" },
  { name: "NextGen", logo: "https://placehold.co/150x60.png", aiHint: "future logo" }
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content",
    description: "Overcome writer's block with AI-generated summaries and rephrased bullet points for maximum impact.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description: "Choose from a variety of free and premium, professionally designed templates to match your industry.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your resume update in real-time as you type, ensuring it looks perfect before you download.",
  },
  {
    icon: Move,
    title: "Drag & Drop Editor",
    description: "Easily reorder experience, education, and project sections to highlight your key strengths.",
  },
  {
    icon: Download,
    title: "Multiple Export Options",
    description: "Download your finished resume as a high-quality, ATS-friendly PDF or a PNG image file.",
  },
  {
    icon: FileText,
    title: "CV & Resume Support",
    description: "Create both concise resumes for job applications and detailed CVs for academic or research roles.",
  },
];

export default function Home() {
  const featuredTemplates = templates.slice(0, 3);

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
                <p className="text-muted-foreground">
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
                <p className="text-muted-foreground">
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
                <p className="text-muted-foreground">
                  Instantly download your finished resume as a high-quality PDF
                  or image file, ready to be sent to employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
              Our features are designed to help you create a standout resume with ease.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-primary/10 text-primary p-3 rounded-full mt-1 shrink-0">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-headline mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
         <div className="container px-4 md:px-6">
            <GenerateResumeForm />
         </div>
      </section>
      
      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Explore Our Featured Templates</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get started with one of our popular designs. Find even more options on our templates page.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredTemplates.map((template, index) => (
                    <div key={template.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <TemplateCard template={template} />
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild>
                    <Link href="/templates">View All Templates</Link>
                </Button>
            </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold text-center font-headline mb-12">
            Loved by Professionals Worldwide
          </h2>
          <div className="relative">
            <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="min-w-[320px] md:min-w-[380px] flex-shrink-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400"/>)}
                    </div>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
            <h2 className="text-center text-xl font-semibold text-muted-foreground mb-8">
                Trusted by Professionals at Top Companies
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                {companyLogos.map((company, index) => (
                    <img key={index} src={company.logo} alt={company.name} data-ai-hint={company.aiHint} className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"/>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
}
