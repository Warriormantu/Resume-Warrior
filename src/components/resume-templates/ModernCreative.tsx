
import type { ResumeData } from '@/lib/types';

export function ModernCreative({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, projects, skills, custom } = data;
    return (
        <div className="font-sans text-slate-800 flex break-words leading-relaxed">
            <div className="w-1/3 bg-slate-100 p-6 rounded-l-lg">
                 <header className="mb-6 resume-section">
                    <h1 className="text-3xl font-bold font-headline" style={{ color: 'var(--resume-accent-color)' }}>{personalInfo.name}</h1>
                    {personalInfo.jobTitle && <p className="text-md text-slate-700 mt-1">{personalInfo.jobTitle}</p>}
                    <div className="text-xs text-slate-600 mt-2 space-y-1">
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.address}</p>
                        {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
                        {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
                    </div>
                </header>
                <section className="resume-section">
                     <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>SKILLS</h2>
                     <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span 
                                key={skill.id} 
                                className="text-xs font-medium px-2 py-1 rounded"
                                style={{
                                    backgroundColor: 'var(--resume-accent-color-bg)',
                                    color: 'var(--resume-accent-color)'
                                }}
                            >
                                {skill.name}
                            </span>
                        ))}
                     </div>
                </section>
            </div>
            <div className="w-2/3 py-6 pr-6">
                <section className="mb-6 resume-section">
                    <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>SUMMARY</h2>
                    <p className="text-sm text-slate-700">{summary}</p>
                </section>
                <section className="mb-6 resume-section">
                    <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>EXPERIENCE</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline gap-4">
                                <h3 className="text-md font-bold text-slate-800">{exp.title}</h3>
                                <p className="text-xs text-slate-600 flex-shrink-0 whitespace-nowrap">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                            </div>
                            <p className="text-sm font-semibold text-slate-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                            <ul className="list-disc list-inside mt-1 text-sm text-slate-700 space-y-1">
                                {exp.points?.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="mb-6 resume-section">
                    <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>EDUCATION</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-baseline gap-4">
                               <h3 className="text-md font-bold text-slate-800">{edu.institution}</h3>
                               <p className="text-xs text-slate-600 flex-shrink-0 whitespace-nowrap">{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="text-sm text-slate-600">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</p>
                        </div>
                    ))}
                </section>
                 {projects && projects.length > 0 && (
                    <section className="mb-6 resume-section">
                        <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>PROJECTS</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4">
                                <h3 className="text-md font-bold text-slate-800">{proj.name}</h3>
                                {proj.url && <p className="text-sm text-slate-500 italic">{proj.url}</p>}
                                {proj.description && <p className="text-sm text-slate-700 mt-1">{proj.description}</p>}
                                {proj.points && proj.points.length > 0 && (
                                <ul className="list-disc list-inside mt-1 text-sm text-slate-700 space-y-1">
                                    {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}
                 {custom?.map(section => (
                    section.title && section.content && (
                        <section key={section.id} className="mb-6 resume-section">
                            <h2 className="text-md font-bold font-headline text-primary mb-2 uppercase tracking-wider" style={{ color: 'var(--resume-accent-color)' }}>{section.title.toUpperCase()}</h2>
                             <ul className="list-disc list-inside mt-1 text-sm text-slate-700 space-y-1">
                                {section.content.split('\n').filter(p => p).map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </section>
                    )
                ))}
            </div>
        </div>
    );
}
