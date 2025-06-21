import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12">
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
                    <CardDescription>Have a question or feedback? We'd love to hear from you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your message..." />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
