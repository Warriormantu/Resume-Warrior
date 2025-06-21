import { getTemplateById } from "@/lib/templates";
import { ResumeEditor } from "./ResumeEditor";

type EditorPageProps = {
    params: {
        templateId: string;
    }
}

export default function EditorPage({ params }: EditorPageProps) {
    const template = getTemplateById(params.templateId);

    if (!template) {
        return <div className="container py-12 text-center">Template not found.</div>
    }

    // In a real app, you might check if a paid template has been purchased
    // before rendering the editor. For this project, we allow access.

    return (
        <div>
            <ResumeEditor template={template} />
        </div>
    );
}
