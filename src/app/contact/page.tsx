import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">Send us a message</CardTitle>
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
            <div className="space-y-8 pt-4">
                 <div>
                    <h2 className="text-3xl font-bold font-headline mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground text-lg">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                            <Mail className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl">Email</h3>
                            <p className="text-muted-foreground">mantuassum@gmail.com</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                            <Phone className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl">Phone</h3>
                            <p className="text-muted-foreground">(+91) 8299721726</p>
                            <p className="text-muted-foreground">Mon-Fri from 9am to 5pm.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                            <MapPin className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl">Office</h3>
                            <p className="text-muted-foreground">123 Resume Lane, HR Tech City</p>
                            <p className="text-muted-foreground">Bangalore, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
