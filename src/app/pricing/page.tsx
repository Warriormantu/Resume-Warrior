import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const freeTier = {
    name: "Completely Free",
    price: "₹0",
    description: "Everything you need to build a professional resume.",
    features: [
        "Access to all templates", 
        "Professional and creative designs",
        "AI-powered content generation",
        "Drag & drop editor",
        "PDF and Image downloads",
        "No hidden costs or subscriptions"
    ],
    cta: "Get Started for Free",
    href: "/templates"
};


export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
          Good news! All our features and templates are now completely free to use.
        </p>
      </div>
      <div className="flex justify-center">
        <Card className="flex flex-col max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">{freeTier.name}</CardTitle>
            <CardDescription>{freeTier.description}</CardDescription>
            <div>
              <span className="text-4xl font-bold">{freeTier.price}</span>
               <span className="text-muted-foreground"> forever</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {freeTier.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={freeTier.href}>{freeTier.cta}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
