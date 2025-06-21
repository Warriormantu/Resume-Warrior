import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-center">Terms of Service</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>By accessing and using Resume_Warrior, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline">2. Service Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service.</p>
            <p>Paid templates are for personal use only and may not be redistributed or resold.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
