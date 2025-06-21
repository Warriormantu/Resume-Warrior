import * as React from 'react';
import type { ResumeData } from '@/lib/types';
import type { Template } from '@/lib/templates';

import { ClassicProfessional } from './resume-templates/ClassicProfessional';
import { ModernCreative } from './resume-templates/ModernCreative';

// For simplicity, other templates will reuse existing components as placeholders
const templateComponents: Record<string, React.FC<{ data: ResumeData }>> = {
    'classic-professional': ClassicProfessional,
    'modern-creative': ModernCreative,
    'bold-minimalist': ClassicProfessional,
    'corporate-ladder': ModernCreative,
    'sleek-tech': ClassicProfessional,
    'academic-researcher': ClassicProfessional
};

export const ResumePreview = React.forwardRef<HTMLDivElement, { data: ResumeData; template: Template }>(({ data, template }, ref) => {
    const TemplateComponent = templateComponents[template.id] || ClassicProfessional;
    
    return (
        <div ref={ref} className="bg-white text-black p-8 shadow-lg w-full aspect-[8.5/11] h-full">
            <TemplateComponent data={data} />
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
