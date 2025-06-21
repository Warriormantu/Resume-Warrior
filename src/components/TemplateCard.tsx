import type { Template } from "@/lib/templates";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ResumePreview } from "./ResumePreview";
import { sampleResumeData } from "@/lib/sampleData";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const isFree = template.price === 0;
  const linkHref = isFree ? `/editor/${template.id}` : `/buy/${template.id}`;

  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <div className="absolute top-2 right-2 z-10">
          {isFree ? (
             <Badge variant="secondary">Free</Badge>
          ) : (
            <Badge variant="default">₹{template.price}</Badge>
          )}
        </div>
        <div className="aspect-[8.5/11] w-full overflow-hidden bg-gray-100 group-hover:opacity-90 transition-opacity">
            <div className="w-[333.33%] h-[333.33%] origin-top-left scale-[0.3]">
                <ResumePreview data={sampleResumeData} template={template} />
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline text-lg">{template.name}</CardTitle>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full" variant={isFree ? 'default' : 'secondary'}>
          <Link href={linkHref}>
            {isFree ? 'Use Template' : 'Buy Now'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
