import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rocket, Lightbulb } from "lucide-react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Alex Johnson",
        role: "Founder & CEO",
        avatar: "https://placehold.co/200x200.png",
        aiHint: "ceo portrait"
    },
    {
        name: "Maria Garcia",
        role: "Lead Developer",
        avatar: "https://placehold.co/200x200.png",
        aiHint: "developer portrait"
    },
    {
        name: "Sam Chen",
        role: "Head of Product",
        avatar: "https://placehold.co/200x200.png",
        aiHint: "product manager"
    },
     {
        name: "Emily White",
        role: "UX/UI Designer",
        avatar: "https://placehold.co/200x200.png",
        aiHint: "designer portrait"
    }
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">About Resume_Warrior</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                We're on a mission to help job seekers everywhere conquer the job market with powerful, professional resumes.
            </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
             <div className="grid md:grid-cols-3 gap-8 text-center">
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                            <Rocket className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline mt-4">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        To empower job seekers by providing them with the best tools to create professional, modern, and effective resumes that stand out to recruiters.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                            <Lightbulb className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline mt-4">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                         To be the most trusted and innovative resume-building platform, leveraging AI to help individuals achieve their career aspirations.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                            <Users className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline mt-4">Our Story</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        Founded by a team of career coaches and tech enthusiasts, Resume_Warrior was born from a desire to make high-quality resume creation accessible to everyone.
                    </CardContent>
                </Card>
             </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-headline mb-12">Meet the Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="flex flex-col items-center">
                        <img
                            src={member.avatar}
                            alt={member.name}
                            data-ai-hint={member.aiHint}
                            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                        />
                        <h3 className="font-bold font-headline">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
