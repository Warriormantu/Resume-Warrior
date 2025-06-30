
import * as React from 'react';
import type { ResumeData } from '@/lib/types';
import type { Template } from '@/lib/templates';

import { ClassicProfessional } from './resume-templates/ClassicProfessional';
import { ModernCreative } from './resume-templates/ModernCreative';
import { BoldMinimalist } from './resume-templates/BoldMinimalist';
import { CorporateLadder } from './resume-templates/CorporateLadder';
import { SleekTech } from './resume-templates/SleekTech';
import { AcademicResearcher } from './resume-templates/AcademicResearcher';

const templateComponents: Record<string, React.FC<{ data: ResumeData }>> = {
    'classic-professional': ClassicProfessional,
    'modern-creative': ModernCreative,
    'bold-minimalist': BoldMinimalist,
    'corporate-ladder': CorporateLadder,
    'sleek-tech': SleekTech,
    'academic-researcher': AcademicResearcher,
};

type ResumePreviewProps = {
    data: ResumeData;
    template: Template;
    accentColor?: string;
    accentColorBg?: string;
    fontFamily?: string;
};

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
    ({ data, template, accentColor = '#009cff', accentColorBg = 'rgba(0, 156, 255, 0.1)', fontFamily = 'Inter' }, ref) => {
    
    const TemplateComponent = templateComponents[template.id] || ClassicProfessional;

    const previewStyle = {
        '--resume-accent-color': accentColor,
        '--resume-accent-color-bg': accentColorBg,
        fontFamily: fontFamily,
    } as React.CSSProperties;
    
    return (
        <div 
            ref={ref} 
            id="resume-preview-container"
            className="bg-white text-black p-8 shadow-lg" 
            style={{ width: '816px', minHeight: '1056px', ...previewStyle }}
        >
            <TemplateComponent data={data} />
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
