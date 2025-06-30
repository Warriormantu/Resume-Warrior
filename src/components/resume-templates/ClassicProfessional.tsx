
import type { ResumeData } from '@/lib/types';

export function ClassicProfessional({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-slate-800 break-words leading-relaxed">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold font-headline text-slate-800">{personalInfo.name}</h1>
                {personalInfo.jobTitle && <p className="text-lg font-semibold text-slate-700 mt-1 mb-2">{personalInfo.jobTitle}</p>}
                <p className="text-sm text-slate-600">
                    {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
                    {personalInfo.linkedin && ` | ${personalInfo.linkedin}`}
                    {personalInfo.portfolio && ` | ${personalInfo.portfolio}`}
                </p>
            </header>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">SUMMARY</h2>
                <p className="text-sm text-slate-700">{summary}</p>
            </section>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between items-baseline gap-4">
                             <h3 className="text-md font-bold text-slate-800">{exp.title}</h3>
                             <p className="text-xs text-slate-600 flex-shrink-0 whitespace-nowrap">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 text-sm text-slate-700">
                            {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
            <section className="mb-4">
                <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">EDUCATION</h2>
                {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <div className="flex justify-between items-baseline gap-4">
                           <h3 className="text-md font-bold text-slate-800">{edu.institution}</h3>
                           <p className="text-xs text-slate-600 flex-shrink-0 whitespace-nowrap">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm text-slate-600">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</p>
                     </div>
                ))}
            </section>
            {projects && projects.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">PROJECTS</h2>
                    {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="text-md font-bold text-slate-800">{proj.name}</h3>
                        {proj.url && <p className="text-sm text-slate-600 italic">{proj.url}</p>}
                        {proj.description && <p className="text-sm text-slate-700 mt-1">{proj.description}</p>}
                        {proj.points && proj.points.length > 0 && (
                        <ul className="list-disc list-inside mt-1 text-sm text-slate-700">
                            {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                        )}
                    </div>
                    ))}
                </section>
            )}

            {custom?.map(section => (
                section.title && section.content && (
                    <section key={section.id} className="mb-4">
                        <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">{section.title.toUpperCase()}</h2>
                        <ul className="list-disc list-inside mt-1 text-sm text-slate-700">
                            {section.content.split('\n').filter(p => p).map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </section>
                )
            ))}

            <section>
                 <h2 className="text-lg font-bold font-headline border-b-2 border-slate-400 pb-1 mb-2 text-slate-700">SKILLS</h2>
                 <p className="text-sm text-slate-700">{skills.map(s => s.name).join(' | ')}</p>
            </section>
        </div>
    );
}
