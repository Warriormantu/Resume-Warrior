import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rocket, Lightbulb } from "lucide-react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Mantu Gupta",
        role: "Founder & Lead Developer",
        avatar: "/images/developer-photo.jpg"
    }
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">About Resume Warrior</h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
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
                        Founded by a team of career coaches and tech enthusiasts, Resume Warrior was born from a desire to make high-quality resume creation accessible to everyone.
                    </CardContent>
                </Card>
             </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-headline mb-12">Meet the Developer</h2>
            <div className="flex justify-center">
                {teamMembers.map(member => (
                    <div key={member.name} className="flex flex-col items-center">
                        <Image
                            src={member.avatar}
                            alt={member.name}
                            width={224}
                            height={224}
                            className="w-56 h-56 rounded-full object-cover mb-4 shadow-xl ring-4 ring-background transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        />
                        <h3 className="font-bold font-headline text-xl">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
