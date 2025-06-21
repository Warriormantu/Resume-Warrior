import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Free",
        price: "₹0",
        description: "Get started with our basic templates.",
        features: ["Access to all free templates", "Standard editor", "PDF and Image downloads"],
        cta: "Get Started",
        href: "/templates"
    },
    {
        name: "Premium Template",
        price: "₹49",
        priceSuffix: "per template",
        description: "Unlock a premium, professionally designed template.",
        features: ["One-time purchase", "Premium design and layout", "All features from the free plan"],
        cta: "Browse Premium Templates",
        href: "/templates"
    }
]

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
          Choose a plan that works for you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tiers.map(tier => (
          <Card key={tier.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div>
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.priceSuffix && <span className="text-muted-foreground"> {tier.priceSuffix}</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
