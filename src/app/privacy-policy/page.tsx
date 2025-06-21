import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-center">Privacy Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Data Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>We collect information you provide directly to us, such as when you create a resume, purchase a template, or contact us for support. This includes your name, email, and the content of your resume.</p>
            <p>We use this information to operate, maintain, and provide you with the features and functionality of the service.</p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline">Data Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Your resume data is yours. We do not sell or share your personal resume data with third parties for marketing purposes. Data may be used anonymously to improve our AI models.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
