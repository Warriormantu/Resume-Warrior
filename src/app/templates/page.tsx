import { templates } from "@/lib/templates";
import { TemplateCard } from "@/components/TemplateCard";

export default function TemplatesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Choose Your Template
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
          Select a template to start building your professional resume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template, index) => (
          <div key={template.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <TemplateCard template={template} />
          </div>
        ))}
      </div>
    </div>
  );
}
