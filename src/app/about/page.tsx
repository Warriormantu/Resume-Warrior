import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-center">About Resume_Warrior</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>At Resume_Warrior, we believe that a great resume is the key that unlocks career opportunities. Our mission is to empower job seekers by providing them with the best tools to create professional, modern, and effective resumes that stand out to recruiters.</p>
            <p>We combine professionally designed templates with cutting-edge AI technology to help you craft a compelling narrative of your skills and experiences. Whether you're a recent graduate or a seasoned professional, Resume_Warrior is here to help you conquer the job market.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
