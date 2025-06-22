'use client';

import { useParams } from 'next/navigation';
import { getTemplateById } from "@/lib/templates";
import { ResumeEditor } from "./ResumeEditor";

export default function EditorPage() {
    const params = useParams<{ templateId: string }>();
    const template = getTemplateById(params.templateId);

    if (!template) {
        return <div className="container py-12 text-center">Template not found.</div>
    }

    return (
        <div>
            <ResumeEditor template={template} />
        </div>
    );
}
